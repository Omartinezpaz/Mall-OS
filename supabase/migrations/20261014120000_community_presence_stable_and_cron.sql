-- ==============================================================================
-- Migration: 20261014120000_community_presence_stable_and_cron.sql
-- Module: Mi Comunidad (Fase 2 Blindaje: Volatilidad STABLE, Activación y Cron)
-- Author: Oscar / Mall OS Engineering
-- Reference: PostgreSQL Documentation § Function Volatility Categories
-- ==============================================================================

-- 1. Corrección crítica de volatilidad:
-- En PostgreSQL, una función que evalúa now() o CURRENT_TIMESTAMP NO PUEDE ser
-- IMMUTABLE porque el resultado depende del tiempo actual de la transacción.
-- Si se marca IMMUTABLE, el optimizador de PostgreSQL puede evaluar o cachear
-- la expresión en tiempo de planificación, provocando que presencias de hace más
-- de 15 minutos continúen marcadas erróneamente como activas.
-- La categoría correcta es STABLE.

CREATE OR REPLACE FUNCTION public.is_community_presence_active(
  p_updated_at TIMESTAMPTZ,
  p_max_minutes INT DEFAULT 15
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT p_updated_at >= (now() - (p_max_minutes || ' minutes')::interval);
$$;

-- 2. Actualización de get_visible_community_contacts para utilizar
-- la función STABLE y garantizar filtrado en tiempo real sin desfase.
-- Adicionalmente, ejecuta una expiración oportunista pasiva en la consulta.
CREATE OR REPLACE FUNCTION public.get_visible_community_contacts(
  p_mall_id UUID
)
RETURNS TABLE (
  contact_user_id UUID,
  nickname TEXT,
  relation TEXT,
  floor_id TEXT,
  zone_store_id TEXT,
  zone_name TEXT,
  is_in_mall BOOLEAN,
  is_presence_active BOOLEAN,
  minutes_ago INT,
  is_kids_mode_active BOOLEAN,
  kids_mode_challenge TEXT,
  is_sharing BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Evaluación en tiempo real:
  -- l.is_in_mall AND is_community_presence_active(l.updated_at, 15)
  -- garantiza que un usuario inactivo hace >15 minutos nunca aparezca como activo,
  -- independientemente de si el proceso batch/cron ya ejecutó.
  RETURN QUERY
  SELECT 
    c.contact_user_id,
    c.nickname,
    c.relation,
    l.floor_id,
    l.zone_store_id,
    l.zone_name,
    l.is_in_mall,
    (l.is_in_mall AND public.is_community_presence_active(l.updated_at, 15)) AS is_presence_active,
    ROUND(EXTRACT(EPOCH FROM (now() - l.updated_at)) / 60)::INT AS minutes_ago,
    l.is_kids_mode_active,
    l.kids_mode_challenge,
    l.is_sharing
  FROM public.community_contacts c
  INNER JOIN public.community_locations l 
    ON l.user_id = c.contact_user_id
  WHERE c.user_id = auth.uid()
    AND c.status = 'accepted'
    AND c.visible_to_contact = true
    AND l.is_sharing = true
    AND l.mall_id = p_mall_id;
END;
$$;

-- 3. Programación con pg_cron (si la extensión está disponible en Supabase)
-- Se programa una tarea periódica cada 5 minutos que ejecuta expire_stale_community_presence(15).
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    -- Desagendar trabajo previo si existiese para idempotencia
    PERFORM cron.unschedule('job_expire_stale_community_presence')
    WHERE EXISTS (
      SELECT 1 FROM cron.job WHERE jobname = 'job_expire_stale_community_presence'
    );

    PERFORM cron.schedule(
      'job_expire_stale_community_presence',
      '*/5 * * * *',
      'SELECT public.expire_stale_community_presence(15);'
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- En entornos locales o de prueba donde pg_cron no tenga permisos de superusuario,
  -- el filtrado dinámico de get_visible_community_contacts y el heartbeat actúan como salvaguarda.
  RAISE NOTICE 'pg_cron no disponible o sin permisos en este entorno. Se mantiene expiración dinámica STABLE.';
END;
$$;
