-- ════════════════════════════════════════════════
-- Site de Casamento — Rafael & Flávia
-- Rodar no Supabase SQL Editor
-- ════════════════════════════════════════════════

-- ── Tabela de mensagens dos convidados ───────────
create table if not exists rf_mensagens (
  id          uuid        default gen_random_uuid() primary key,
  nome        text        not null,
  mensagem    text        not null,
  created_at  timestamptz default now()
);

alter table rf_mensagens enable row level security;

create policy "publico pode inserir mensagens"
  on rf_mensagens for insert to anon
  with check (true);

create policy "publico pode ler mensagens"
  on rf_mensagens for select to anon
  using (true);

-- ── Tabela de confirmações de presença (RSVP) ───
create table if not exists rf_rsvp (
  id          uuid        default gen_random_uuid() primary key,
  nome        text        not null,
  presenca    text        not null check (presenca in ('sim', 'nao')),
  adultos     int         default 1,
  criancas    int         default 0,
  email       text,
  telefone    text,
  mensagem    text,
  created_at  timestamptz default now()
);

alter table rf_rsvp enable row level security;

create policy "publico pode inserir rsvp"
  on rf_rsvp for insert to anon
  with check (true);

-- Somente autenticados (admin) leem as confirmações
create policy "admin le rsvp"
  on rf_rsvp for select to authenticated
  using (true);
