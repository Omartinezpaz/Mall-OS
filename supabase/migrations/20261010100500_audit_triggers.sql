-- =============================================================================
-- Mall OS · Migración 6 · Triggers automáticos de Auditoría B2B (audit_log)
-- Fecha: 2026-10-10
-- Registra automáticamente INSERT, UPDATE y DELETE en tablas críticas de negocio.
-- =============================================================================

create or replace function public.log_audit_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id   uuid;
  v_actor_role text;
  v_mall_id    uuid;
  v_target_id  uuid;
begin
  -- Identificar al usuario autenticado
  v_actor_id := auth.uid();
  
  -- Determinar el ID del registro y el mall_id afectado
  if (tg_op = 'DELETE') then
    v_target_id := old.id;
    v_mall_id   := old.mall_id;
  else
    v_target_id := new.id;
    v_mall_id   := new.mall_id;
  end if;

  -- Determinar rol del actor en ese mall si está autenticado
  if v_actor_id is not null then
    select role into v_actor_role
    from public.memberships
    where user_id = v_actor_id and mall_id = v_mall_id
    limit 1;
    
    if v_actor_role is null then
      v_actor_role := 'authenticated';
    end if;
  else
    v_actor_role := 'system';
  end if;

  -- Insertar en la bitácora inmutable de auditoría
  insert into public.audit_log (
    actor_id,
    actor_role,
    action,
    target_type,
    target_id,
    mall_id,
    metadata,
    created_at
  ) values (
    v_actor_id,
    v_actor_role,
    tg_op,
    tg_table_name,
    v_target_id,
    v_mall_id,
    case
      when tg_op = 'INSERT' then jsonb_build_object('new', to_jsonb(new))
      when tg_op = 'DELETE' then jsonb_build_object('old', to_jsonb(old))
      when tg_op = 'UPDATE' then jsonb_build_object('old', to_jsonb(old), 'new', to_jsonb(new))
    end,
    now()
  );

  if (tg_op = 'DELETE') then
    return old;
  end if;
  return new;
end;
$$;

-- Triggers en productos
drop trigger if exists trg_audit_products on public.products;
create trigger trg_audit_products
  after insert or update or delete on public.products
  for each row execute function public.log_audit_trigger();

-- Triggers en ofertas
drop trigger if exists trg_audit_offers on public.offers;
create trigger trg_audit_offers
  after insert or update or delete on public.offers
  for each row execute function public.log_audit_trigger();

-- Triggers en eventos
drop trigger if exists trg_audit_events on public.events;
create trigger trg_audit_events
  after insert or update or delete on public.events
  for each row execute function public.log_audit_trigger();

-- Triggers en concursos
drop trigger if exists trg_audit_contests on public.contests;
create trigger trg_audit_contests
  after insert or update or delete on public.contests
  for each row execute function public.log_audit_trigger();
