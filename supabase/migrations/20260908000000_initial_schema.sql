-- ENUMS
create type sex_type       as enum ('male', 'female', 'other');
create type goal_type      as enum ('lose_fat', 'maintain', 'gain_muscle');
create type activity_level as enum ('sedentary', 'light', 'moderate', 'active', 'very_active');
create type meal_type      as enum ('breakfast', 'lunch', 'dinner', 'snack');

-- PROFILES (extends auth.users). id = uuid + FK.
create table public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  full_name         text,
  avatar_url        text,
  sex               sex_type,
  birth_date        date,
  height_cm         numeric(5,2),
  activity_level    activity_level default 'moderate',
  goal              goal_type      default 'maintain',
  calorie_target    integer,
  protein_target_g  integer,
  carbs_target_g    integer,
  fat_target_g      integer,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- BODY LOGS
create table public.body_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  logged_on     date not null default current_date,
  weight_kg     numeric(5,2) not null,
  body_fat_pct  numeric(4,1),
  waist_cm      numeric(5,2),
  chest_cm      numeric(5,2),
  hips_cm       numeric(5,2),
  arm_cm        numeric(5,2),
  thigh_cm      numeric(5,2),
  notes         text,
  created_at    timestamptz default now(),
  unique (user_id, logged_on)
);

-- EXERCISE CATALOG (global, no user_id). Populated by seed script.
create table public.exercises (
  id                uuid primary key default gen_random_uuid(),
  source            text not null default 'api',
  external_id       text,
  name              text not null,
  primary_muscle    text,
  secondary_muscles text[],
  equipment         text,
  category          text,
  difficulty        text,
  instructions      text[],
  media_url         text,
  raw               jsonb,
  synced_at         timestamptz default now(),
  created_by        uuid references public.profiles(id) on delete set null,
  created_at        timestamptz default now(),
  unique (source, external_id)
);

-- ROUTINES
create table public.routines (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  name         text not null,
  description  text,
  is_active    boolean default false,
  created_at   timestamptz default now()
);

-- ROUTINE DAYS
create table public.routine_days (
  id           uuid primary key default gen_random_uuid(),
  routine_id   uuid not null references public.routines(id) on delete cascade,
  name         text not null,
  order_index  int not null default 0,
  day_of_week  smallint check (day_of_week between 1 and 7)
);

create table public.routine_exercises (
  id                uuid primary key default gen_random_uuid(),
  routine_day_id    uuid not null references public.routine_days(id) on delete cascade,
  exercise_id       uuid not null references public.exercises(id) on delete restrict,
  order_index       int not null default 0,
  target_sets       int,
  target_reps       int,
  target_weight_kg  numeric(6,2),
  rest_seconds      int,
  notes             text
);

-- WORKOUT SESSIONS
create table public.workout_sessions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  routine_day_id uuid references public.routine_days(id) on delete set null,
  started_at     timestamptz not null default now(),
  finished_at    timestamptz,
  notes          text
);

create table public.workout_sets (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null references public.workout_sessions(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete restrict,
  set_number  int not null,
  reps        int,
  weight_kg   numeric(6,2),
  rpe         numeric(3,1),
  is_warmup   boolean default false,
  completed   boolean default true,
  created_at  timestamptz default now()
);

-- NUTRITION
create table public.foods (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  brand         text,
  barcode       text,
  serving_size  numeric(7,2) not null,
  serving_unit  text not null default 'g',
  calories      numeric(7,2) not null,
  protein_g     numeric(6,2) not null default 0,
  carbs_g       numeric(6,2) not null default 0,
  fat_g         numeric(6,2) not null default 0,
  fiber_g       numeric(6,2),
  is_public     boolean default true,
  created_by    uuid references public.profiles(id) on delete set null,
  created_at    timestamptz default now()
);

create table public.food_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  food_id     uuid references public.foods(id) on delete set null,
  logged_on   date not null default current_date,
  meal        meal_type not null default 'snack',
  quantity    numeric(7,2) not null default 1,
  calories    numeric(7,2) not null,
  protein_g   numeric(6,2) not null default 0,
  carbs_g     numeric(6,2) not null default 0,
  fat_g       numeric(6,2) not null default 0,
  created_at  timestamptz default now()
);

-- ROW LEVEL SECURITY
alter table public.profiles          enable row level security;
alter table public.body_logs         enable row level security;
alter table public.exercises         enable row level security;
alter table public.routines          enable row level security;
alter table public.routine_days      enable row level security;
alter table public.routine_exercises enable row level security;
alter table public.workout_sessions  enable row level security;
alter table public.workout_sets      enable row level security;
alter table public.foods             enable row level security;
alter table public.food_logs         enable row level security;

create policy "own profiles" on public.profiles
  for all to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

create policy "own body_logs" on public.body_logs
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own routines" on public.routines
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own sessions" on public.workout_sessions
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own food_logs" on public.food_logs
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own routine_days" on public.routine_days
  for all to authenticated
  using (
    exists (select 1 from public.routines r
            where r.id = routine_days.routine_id and r.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.routines r
            where r.id = routine_days.routine_id and r.user_id = auth.uid())
  );

create policy "own routine_exercises" on public.routine_exercises
  for all to authenticated
  using (
    exists (select 1 from public.routine_days d
            join public.routines r on r.id = d.routine_id
            where d.id = routine_exercises.routine_day_id and r.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.routine_days d
            join public.routines r on r.id = d.routine_id
            where d.id = routine_exercises.routine_day_id and r.user_id = auth.uid())
  );

create policy "own workout_sets" on public.workout_sets
  for all to authenticated
  using (
    exists (select 1 from public.workout_sessions s
            where s.id = workout_sets.session_id and s.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.workout_sessions s
            where s.id = workout_sets.session_id and s.user_id = auth.uid())
  );

create policy "read exercises" on public.exercises
  for select using (is_public or created_by = auth.uid());
create policy "insert own exercises" on public.exercises
  for insert to authenticated with check (created_by = auth.uid());
create policy "update own exercises" on public.exercises
  for update to authenticated using (created_by = auth.uid());

create policy "read foods" on public.foods
  for select using (is_public or created_by = auth.uid());
create policy "insert own foods" on public.foods
  for insert to authenticated with check (created_by = auth.uid());
create policy "update own foods" on public.foods
  for update to authenticated using (created_by = auth.uid());

-- AUTO-CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- INDEXES
create index on public.body_logs        (user_id, logged_on desc);
create index on public.food_logs        (user_id, logged_on desc);
create index on public.workout_sessions (user_id, started_at desc);
create index on public.workout_sets     (session_id);
create index on public.routine_days     (routine_id);
create index on public.routine_exercises(routine_day_id);
create index on public.foods            (barcode);
