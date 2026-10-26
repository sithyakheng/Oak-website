-- Run this in Supabase: SQL Editor > New query > Run

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  kind text not null check (kind in ('clay','powder','duo')),
  tag text not null default '',
  short text not null default '',
  description text not null default '',
  price numeric(8,2) not null,
  compare_at numeric(8,2),
  hold int not null default 50,
  shine int not null default 10,
  size text not null default '',
  badge text,
  image_url text,
  sort int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  province text not null,
  address text not null,
  note text,
  items jsonb not null,
  subtotal numeric(8,2) not null,
  delivery_fee numeric(8,2) not null default 0,
  total numeric(8,2) not null,
  status text not null default 'new' check (status in ('new','confirmed','shipped','delivered','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table products enable row level security;
alter table orders enable row level security;
alter table messages enable row level security;

-- Anyone can read active products. Orders and messages are only written/read by the server (service role).
drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (active = true);

insert into products (slug, name, kind, tag, short, description, price, compare_at, hold, shine, size, badge, sort) values
('oak-clay', 'OAK Hair Clay', 'clay', 'Clay', 'Firm hold, matte finish.', 'A firm, flexible clay with a natural matte finish. No crunch and no stiffness, and you can rework it any time of day.', 8.00, null, 80, 15, '7 x 7 x 3.5 cm jar', null, 1),
('oak-duo', 'The OAK Duo', 'duo', 'Clay + powder', 'The full routine.', 'Clay for hold, powder for lift. Everything you need for a full day of style at a better price.', 12.00, 14.00, 80, 10, 'Clay jar + 25g powder', 'Best value', 2),
('oak-texture-powder', 'OAK Texture Powder', 'powder', 'Powder', 'Instant volume, 25g.', 'Lightweight powder that adds grip and volume at the roots. No residue, and it works on its own or under clay.', 6.00, null, 45, 5, '25g, 4.6 x 4.6 x 12.5 cm', null, 3)
on conflict (slug) do nothing;
