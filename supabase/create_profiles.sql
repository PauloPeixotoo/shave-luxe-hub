-- 1) Create role enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    EXECUTE 'CREATE TYPE public.user_role AS ENUM (''barber'', ''admin'')';
  END IF;
END;
$$;