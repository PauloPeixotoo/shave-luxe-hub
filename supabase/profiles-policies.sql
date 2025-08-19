-- RLS policies for bookings, barbers, services using profiles.role

-- Enable RLS on tables if not already
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Policy: admins can do any action on bookings
DROP POLICY IF EXISTS bookings_admin_manage ON public.bookings;
CREATE POLICY bookings_admin_manage ON public.bookings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Policy: barbers can manage their own bookings (assumes bookings.barber_id = profiles.barber_id OR bookings.barber_id = auth.uid())
DROP POLICY IF EXISTS bookings_barber_manage ON public.bookings;
CREATE POLICY bookings_barber_manage ON public.bookings
  FOR ALL
  USING (
    auth.uid() IS NOT NULL AND (
      -- If bookings.barber_id stores a barber profile id
      bookings.barber_id = (SELECT p.barber_id FROM public.profiles p WHERE p.id = auth.uid())
      OR
      -- Or if bookings.barber_id stores user id directly
      bookings.barber_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() IS NOT NULL AND (
      bookings.barber_id = (SELECT p.barber_id FROM public.profiles p WHERE p.id = auth.uid())
      OR
      bookings.barber_id = auth.uid()
    )
  );

-- Policy: services public read
DROP POLICY IF EXISTS services_public_select ON public.services;
CREATE POLICY services_public_select ON public.services
  FOR SELECT USING (true);

-- Policy: barbers can manage services
DROP POLICY IF EXISTS services_barber_manage ON public.services;
CREATE POLICY services_barber_manage ON public.services
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'barber')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'barber')
  );

-- Policy: barbers table select is public
DROP POLICY IF EXISTS barbers_public_select ON public.barbers;
CREATE POLICY barbers_public_select ON public.barbers
  FOR SELECT USING (true);

-- Policy: admins manage barbers
DROP POLICY IF EXISTS barbers_admin_manage ON public.barbers;
CREATE POLICY barbers_admin_manage ON public.barbers
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Adjust other tables as needed
