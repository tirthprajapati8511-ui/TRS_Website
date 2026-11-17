-- Per-event access control. Run this ONCE in Supabase -> SQL Editor (after setup.sql).
--
-- Result:
--   * "Owners" (table admins) can edit everything and decide who may edit which event.
--   * An "event editor" (table event_editors) can edit ONLY the events they were given,
--     and nothing else on the site.
--   * Everyone else (the public) can only read.

create table if not exists public.admins (
  email text primary key
);

create table if not exists public.event_editors (
  event_id text not null,
  email text not null,
  added_at timestamptz not null default now(),
  primary key (event_id, email)
);

-- Everybody who already has a login right now becomes an owner.
insert into public.admins (email)
select lower(email) from auth.users where email is not null
on conflict do nothing;

create or replace function public.my_email() returns text
language sql stable as $$ select lower(coalesce(auth.jwt() ->> 'email', '')) $$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where email = public.my_email())
$$;

alter table public.admins enable row level security;
alter table public.event_editors enable row level security;

drop policy if exists "admins read own" on public.admins;
create policy "admins read own" on public.admins for select to authenticated
  using (email = public.my_email());

drop policy if exists "editors read" on public.event_editors;
create policy "editors read" on public.event_editors for select to authenticated
  using (public.is_admin() or email = public.my_email());

drop policy if exists "editors manage" on public.event_editors;
create policy "editors manage" on public.event_editors for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Only owners may write the whole site now.
drop policy if exists "site_content insert" on public.site_content;
drop policy if exists "site_content update" on public.site_content;
drop policy if exists "admins write content" on public.site_content;
drop policy if exists "admins update content" on public.site_content;
do $$
declare p record;
begin
  for p in select policyname from pg_policies
           where schemaname = 'public' and tablename = 'site_content' and cmd in ('INSERT','UPDATE')
  loop
    execute format('drop policy %I on public.site_content', p.policyname);
  end loop;
end $$;
create policy "admins write content" on public.site_content for insert to authenticated
  with check (public.is_admin());
create policy "admins update content" on public.site_content for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- An event editor saves through this function, which replaces ONLY their event
-- (matched by id) inside the stored content. Nothing else can be touched.
create or replace function public.save_event(p_id text, p_event jsonb) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not (public.is_admin() or exists (
        select 1 from public.event_editors where event_id = p_id and email = public.my_email())) then
    raise exception 'You do not have access to this event.' using errcode = '42501';
  end if;

  update public.site_content
  set data = jsonb_set(
        data, '{events,items}',
        (select coalesce(jsonb_agg(
                  case when e ->> 'id' = p_id then p_event || jsonb_build_object('id', p_id) else e end
                  order by o), '[]'::jsonb)
         from jsonb_array_elements(data #> '{events,items}') with ordinality as t(e, o))),
      updated_at = now(),
      updated_by = public.my_email()
  where id = 1;
end $$;

grant execute on function public.save_event(text, jsonb) to authenticated;
grant execute on function public.is_admin() to authenticated;
