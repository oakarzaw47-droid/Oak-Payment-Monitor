create table if not exists users (id uuid primary key default gen_random_uuid(), phone text unique not null, device_id text unique, created_at timestamptz default now());
create table if not exists payments (id uuid primary key default gen_random_uuid(), user_id uuid references users(id), method text not null check (method in ('KBZ Pay','Wave Money','AYA Pay')), amount numeric not null check (amount > 0), transaction_id text unique not null, receipt_url text, status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED')), created_at timestamptz default now(), reviewed_at timestamptz);
create table if not exists action_logs (id bigint generated always as identity primary key, payment_id uuid references payments(id), action text not null, created_at timestamptz default now());
create table if not exists notifications (id bigint generated always as identity primary key, payment_id uuid references payments(id), type text not null, sent_status text not null default 'PENDING', created_at timestamptz default now());
create index if not exists payments_status_idx on payments(status);
create index if not exists payments_created_idx on payments(created_at desc);
