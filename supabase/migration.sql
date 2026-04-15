-- ══════════════════════════════════════════════════════════
--  Rafael & Flávia — Migração inicial
--  Rodar no SQL Editor do Supabase Dashboard
-- ══════════════════════════════════════════════════════════

-- ── Tabela: rf_mensagens ──────────────────────────────────
create table if not exists rf_mensagens (
  id         uuid        primary key default gen_random_uuid(),
  nome       text        not null,
  mensagem   text        not null,
  created_at timestamptz not null default now()
);

alter table rf_mensagens enable row level security;

-- Leitura pública (exibir no mural)
create policy "rf_mensagens_select"
  on rf_mensagens for select
  using (true);

-- Inserção pública (qualquer convidado pode escrever)
create policy "rf_mensagens_insert"
  on rf_mensagens for insert
  with check (true);


-- ── Coluna idades_criancas em rf_rsvp ────────────────────


-- ── Tabela: rf_presentes ─────────────────────────────────
create table if not exists rf_presentes (
  id             uuid        primary key default gen_random_uuid(),
  presente_nome  text        not null,
  created_at     timestamptz not null default now()
);

alter table rf_presentes enable row level security;

-- Leitura pública (contar cotas)
create policy "rf_presentes_select"
  on rf_presentes for select
  using (true);

-- Inserção pública (registrar presente)
create policy "rf_presentes_insert"
  on rf_presentes for insert
  with check (true);


-- ── Tabela: rf_rsvp ──────────────────────────────────────
create table if not exists rf_rsvp (
  id         uuid        primary key default gen_random_uuid(),
  nome       text        not null,
  presenca   text        not null check (presenca in ('sim', 'nao')),
  adultos    integer     not null default 1,
  criancas   integer     not null default 0,
  idades_criancas text,
  email      text,
  telefone   text,
  mensagem   text,
  created_at timestamptz not null default now()
);

alter table rf_rsvp add column if not exists idades_criancas text;

alter table rf_rsvp enable row level security;

-- Inserção pública (convidado confirma presença)
create policy "rf_rsvp_insert"
  on rf_rsvp for insert
  with check (true);

-- Leitura pública apenas para contagem (rodapé)
create policy "rf_rsvp_select"
  on rf_rsvp for select
  using (true);
