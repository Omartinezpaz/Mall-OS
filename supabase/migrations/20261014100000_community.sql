-- ==============================================================================
-- Migration: 20261014100000_community.sql
-- Module: Mi Comunidad (Red Privada de Hospitalidad y Acompañamiento Familiar)
-- Author: Oscar / Mall OS Engineering
-- ==============================================================================

-- 1. Tablas de Contactos de Comunidad
CREATE TABLE IF NOT EXISTS public.community_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  relation TEXT NOT NULL DEFAULT 'family' CHECK (relation IN ('family', 'friend', 'partner', 'child')),
  status TEXT NOT NULL DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted', 'blocked')),
  visible_to_contact BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_community_contacts_pair UNIQUE (user_id, contact_user_id)
);

CREATE INDEX IF NOT EXISTS idx_community_contacts_user_status 
  ON public.community_contacts(user_id, status);

-- 2. Tabla de Invitaciones
CREATE TABLE IF NOT EXISTS public.community_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_community_invites_active 
  ON public.community_invites(code) 
  WHERE accepted_by IS NULL;

-- 3. Tabla de Ubicaciones / Presencia en Mall
CREATE TABLE IF NOT EXISTS public.community_locations (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  mall_id UUID NOT NULL REFERENCES public.malls(id) ON DELETE CASCADE,
  floor_id TEXT NOT NULL,
  zone_store_id TEXT,
  zone_name TEXT NOT NULL,
  is_in_mall BOOLEAN NOT NULL DEFAULT true,
  is_kids_mode_active BOOLEAN NOT NULL DEFAULT false,
  kids_mode_challenge TEXT,
  is_sharing BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_community_locations_mall_sharing 
  ON public.community_locations(mall_id, is_sharing);

-- 4. Niveles y Límites (Freemium: 3 contactos gratis / Premium: ilimitado)
CREATE TABLE IF NOT EXISTS public.community_tiers (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
  max_contacts INT NOT NULL DEFAULT 3,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- Row Level Security (RLS)
-- ==============================================================================

ALTER TABLE public.community_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_tiers ENABLE ROW LEVEL SECURITY;

-- Políticas para community_contacts
-- Altas de contactos SOLO vía RPC redeem_community_invite (consentimiento por código).
-- El propietario solo puede leer y eliminar sus propios vínculos.
CREATE POLICY "community_contacts_owner_select" ON public.community_contacts
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "community_contacts_owner_delete" ON public.community_contacts
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Políticas para community_invites
CREATE POLICY "community_invites_owner_manage" ON public.community_invites
  FOR ALL TO authenticated
  USING (from_user_id = auth.uid())
  WITH CHECK (from_user_id = auth.uid());

-- La verificación de códigos NO es pública: la RPC SECURITY DEFINER valida el código.
-- (Una política SELECT abierta permitiría enumerar códigos activos.)

-- Políticas para community_locations (Mismo Mall + Contacto Aprobado + Compartir Activo)
CREATE POLICY "community_locations_owner_manage" ON public.community_locations
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "community_locations_contacts_same_mall" ON public.community_locations
  FOR SELECT TO authenticated
  USING (
    user_id IN (
      SELECT contact_user_id 
      FROM public.community_contacts 
      WHERE user_id = auth.uid() 
        AND status = 'accepted'
        AND visible_to_contact = true
    )
    AND is_sharing = true
    AND mall_id = (
      SELECT mall_id 
      FROM public.community_locations 
      WHERE user_id = auth.uid()
    )
  );

-- Políticas para community_tiers
CREATE POLICY "community_tiers_owner_read" ON public.community_tiers
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ==============================================================================
-- RPCs Atómicas
-- ==============================================================================

-- Canjear invitación de comunidad
CREATE OR REPLACE FUNCTION public.redeem_community_invite(
  invite_code TEXT,
  my_nickname TEXT DEFAULT 'Familiar',
  my_relation TEXT DEFAULT 'family'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_invite RECORD;
  v_from_user_id UUID;
  v_tier RECORD;
  v_contacts_count INT;
BEGIN
  -- Validar código de invitación
  SELECT * INTO v_invite
  FROM public.community_invites
  WHERE code = upper(trim(invite_code))
    AND expires_at > now()
    AND accepted_by IS NULL
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'El código de invitación es inválido, ha expirado o ya fue utilizado.';
  END IF;

  v_from_user_id := v_invite.from_user_id;

  IF v_from_user_id = auth.uid() THEN
    RAISE EXCEPTION 'No puedes canjear tu propio código de invitación.';
  END IF;

  -- Comprobar límite de contactos (Plan Free: máx 3)
  SELECT * INTO v_tier
  FROM public.community_tiers
  WHERE user_id = auth.uid();

  SELECT count(*) INTO v_contacts_count
  FROM public.community_contacts
  WHERE user_id = auth.uid() AND status = 'accepted';

  IF (v_tier IS NULL OR v_tier.tier = 'free') AND v_contacts_count >= 3 THEN
    RAISE EXCEPTION 'Has alcanzado el límite de 3 contactos del plan gratuito.';
  END IF;

  -- Crear relación bidireccional
  INSERT INTO public.community_contacts (user_id, contact_user_id, nickname, relation, status)
  VALUES (auth.uid(), v_from_user_id, 'Contacto Invitador', my_relation, 'accepted')
  ON CONFLICT (user_id, contact_user_id) DO UPDATE SET status = 'accepted';

  INSERT INTO public.community_contacts (user_id, contact_user_id, nickname, relation, status)
  VALUES (v_from_user_id, auth.uid(), my_nickname, my_relation, 'accepted')
  ON CONFLICT (user_id, contact_user_id) DO UPDATE SET status = 'accepted';

  -- Marcar invitación
  UPDATE public.community_invites
  SET accepted_by = auth.uid(), accepted_at = now()
  WHERE id = v_invite.id;

  RETURN jsonb_build_object(
    'success', true,
    'contact_user_id', v_from_user_id,
    'message', 'Contacto vinculado con éxito a tu comunidad'
  );
END;
$$;

-- Revocar / Eliminar contacto de comunidad
CREATE OR REPLACE FUNCTION public.revoke_community_contact(contact_uuid UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  DELETE FROM public.community_contacts
  WHERE (user_id = auth.uid() AND contact_user_id = contact_uuid)
     OR (user_id = contact_uuid AND contact_user_id = auth.uid());

  RETURN jsonb_build_object('success', true, 'revoked_user_id', contact_uuid);
END;
$$;
