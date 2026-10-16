-- ==============================================================================
-- Migration: 20261014110000_community_presence_expiration.sql
-- Module: Mi Comunidad (Fase 2: Presencia en Vivo y Expiración por Inactividad)
-- Author: Oscar / Mall OS Engineering
-- ==============================================================================

-- 1. Índice para consultas de presencia activa y expiración por inactividad
CREATE INDEX IF NOT EXISTS idx_community_locations_mall_updated
  ON public.community_locations(mall_id, updated_at);

-- 2. Función inmutable para verificar vigencia de presencia (umbral de 15 minutos)
CREATE OR REPLACE FUNCTION public.is_community_presence_active(
  p_updated_at TIMESTAMPTZ,
  p_max_minutes INT DEFAULT 15
)
RETURNS BOOLEAN
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT p_updated_at >= (now() - (p_max_minutes || ' minutes')::interval);
$$;

-- 3. RPC: Heartbeat periódico de ubicación y presencia en el mall
CREATE OR REPLACE FUNCTION public.heartbeat_community_location(
  p_mall_id UUID,
  p_floor_id TEXT,
  p_zone_name TEXT,
  p_zone_store_id TEXT DEFAULT NULL,
  p_is_kids_mode_active BOOLEAN DEFAULT false,
  p_kids_mode_challenge TEXT DEFAULT NULL,
  p_is_sharing BOOLEAN DEFAULT true
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_updated_at TIMESTAMPTZ := now();
BEGIN
  INSERT INTO public.community_locations (
    user_id,
    mall_id,
    floor_id,
    zone_store_id,
    zone_name,
    is_in_mall,
    is_kids_mode_active,
    kids_mode_challenge,
    is_sharing,
    updated_at
  )
  VALUES (
    auth.uid(),
    p_mall_id,
    p_floor_id,
    p_zone_store_id,
    p_zone_name,
    true,
    p_is_kids_mode_active,
    p_kids_mode_challenge,
    p_is_sharing,
    v_updated_at
  )
  ON CONFLICT (user_id) DO UPDATE SET
    mall_id = EXCLUDED.mall_id,
    floor_id = EXCLUDED.floor_id,
    zone_store_id = EXCLUDED.zone_store_id,
    zone_name = EXCLUDED.zone_name,
    is_in_mall = true,
    is_kids_mode_active = EXCLUDED.is_kids_mode_active,
    kids_mode_challenge = EXCLUDED.kids_mode_challenge,
    is_sharing = EXCLUDED.is_sharing,
    updated_at = v_updated_at;

  RETURN jsonb_build_object(
    'success', true,
    'user_id', auth.uid(),
    'mall_id', p_mall_id,
    'updated_at', v_updated_at
  );
END;
$$;

-- 4. RPC: Expiración atómica de presencias inactivas tras 15 minutos sin señal
CREATE OR REPLACE FUNCTION public.expire_stale_community_presence(
  p_max_inactive_minutes INT DEFAULT 15
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_expired_count INT;
BEGIN
  UPDATE public.community_locations
  SET is_in_mall = false
  WHERE is_in_mall = true
    AND updated_at < (now() - (p_max_inactive_minutes || ' minutes')::interval);

  GET DIAGNOSTICS v_expired_count = ROW_COUNT;

  RETURN jsonb_build_object(
    'success', true,
    'expired_count', v_expired_count,
    'threshold_minutes', p_max_inactive_minutes
  );
END;
$$;

-- 5. RPC: Consultar contactos visibles con filtrado de presencia activa en tiempo real
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
  RETURN QUERY
  SELECT 
    c.contact_user_id,
    c.nickname,
    c.relation,
    l.floor_id,
    l.zone_store_id,
    l.zone_name,
    l.is_in_mall,
    (l.is_in_mall AND l.updated_at >= (now() - interval '15 minutes')) AS is_presence_active,
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
