alter table public.profiles
  add column if not exists equipment      text[]  default '{}',
  add column if not exists onboarding_done boolean default false;
