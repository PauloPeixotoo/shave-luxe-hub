-- Script completo de configuração do Supabase para o sistema de barbearia
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Criar tabela de mapeamento de barbeiros
CREATE TABLE IF NOT EXISTS barber_mapping (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  barber_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Inserir dados de exemplo para barbeiros
INSERT INTO barber_mapping (email, barber_name) VALUES
  ('admin@barbershop.com', 'Administrador'),
  ('joao@barbershop.com', 'João Silva'),
  ('maria@barbershop.com', 'Maria Santos'),
  ('carlos@barbershop.com', 'Carlos Oliveira'),
  ('ana@barbershop.com', 'Ana Costa')
ON CONFLICT (email) DO NOTHING;

-- 3. Criar função para verificar se o usuário é barbeiro
CREATE OR REPLACE FUNCTION is_barber()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM barber_mapping 
    WHERE email = auth.jwt() ->> 'email' 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Criar função para obter nome do barbeiro
CREATE OR REPLACE FUNCTION get_barber_name(user_email TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT barber_name FROM barber_mapping 
    WHERE email = user_email AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Criar função para verificar se é um barbeiro específico
CREATE OR REPLACE FUNCTION is_specific_barber(barber_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM barber_mapping 
    WHERE email = auth.jwt() ->> 'email' 
    AND barber_name = is_specific_barber.barber_name
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Configurar políticas RLS para contacts
DROP POLICY IF EXISTS "Public insert for contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON contacts;
DROP POLICY IF EXISTS "Barbers can manage contacts" ON contacts;

CREATE POLICY "Public insert for contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Barbers can view contacts" ON contacts
  FOR SELECT USING (is_barber());

CREATE POLICY "Barbers can update contacts" ON contacts
  FOR UPDATE USING (is_barber());

CREATE POLICY "Barbers can delete contacts" ON contacts
  FOR DELETE USING (is_barber());

-- 7. Configurar políticas RLS para bookings
DROP POLICY IF EXISTS "Public insert for bookings" ON bookings;
DROP POLICY IF EXISTS "Barbers can view bookings" ON bookings;
DROP POLICY IF EXISTS "Barbers can update bookings" ON bookings;
DROP POLICY IF EXISTS "Barbers can delete bookings" ON bookings;

CREATE POLICY "Public insert for bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Barbers can view bookings" ON bookings
  FOR SELECT USING (is_barber());

CREATE POLICY "Barbers can update bookings" ON bookings
  FOR UPDATE USING (is_barber());

CREATE POLICY "Barbers can delete bookings" ON bookings
  FOR DELETE USING (is_barber());

-- 8. Configurar políticas RLS para barbers
DROP POLICY IF EXISTS "Public can view barbers" ON barbers;
DROP POLICY IF EXISTS "Barbers can manage barbers" ON barbers;

CREATE POLICY "Public can view barbers" ON barbers
  FOR SELECT USING (true);

CREATE POLICY "Barbers can manage barbers" ON barbers
  FOR ALL USING (is_barber());

-- 9. Configurar políticas RLS para services
DROP POLICY IF EXISTS "Public can view services" ON services;
DROP POLICY IF EXISTS "Barbers can manage services" ON services;

CREATE POLICY "Public can view services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Barbers can manage services" ON services
  FOR ALL USING (is_barber());

-- 10. Habilitar RLS em todas as tabelas
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE barber_mapping ENABLE ROW LEVEL SECURITY;

-- 11. Configurar política para barber_mapping (apenas barbeiros podem ver)
DROP POLICY IF EXISTS "Barbers can view barber mapping" ON barber_mapping;

CREATE POLICY "Barbers can view barber mapping" ON barber_mapping
  FOR SELECT USING (is_barber());

-- 12. Inserir dados de exemplo se as tabelas estiverem vazias
INSERT INTO services (name, price, duration, description) VALUES
  ('Corte Masculino', 45.00, 30, 'Corte tradicional masculino com acabamento perfeito'),
  ('Barba', 35.00, 20, 'Acabamento de barba com navalha'),
  ('Corte + Barba', 70.00, 45, 'Combo completo: corte e barba'),
  ('Hidratação', 25.00, 15, 'Tratamento hidratante para cabelo'),
  ('Pigmentação', 40.00, 25, 'Coloração para cabelo e barba')
ON CONFLICT DO NOTHING;

INSERT INTO barbers (name, specialty, experience, image) VALUES
  ('João Silva', 'Cortes Modernos', '5 anos', '/barbers/joao.jpg'),
  ('Maria Santos', 'Barbas', '3 anos', '/barbers/maria.jpg'),
  ('Carlos Oliveira', 'Cortes Clássicos', '8 anos', '/barbers/carlos.jpg'),
  ('Ana Costa', 'Cortes Femininos', '4 anos', '/barbers/ana.jpg')
ON CONFLICT DO NOTHING;

-- 13. Inserir alguns agendamentos de exemplo
INSERT INTO bookings (client_name, client_phone, client_email, service_id, barber_id, date, time, status, total_price) VALUES
  ('Pedro Santos', '(11) 99999-1111', 'pedro@email.com', 1, 1, '2024-01-15', '14:00', 'confirmed', 45.00),
  ('Lucas Silva', '(11) 99999-2222', 'lucas@email.com', 2, 2, '2024-01-15', '15:00', 'pending', 35.00),
  ('Rafael Costa', '(11) 99999-3333', 'rafael@email.com', 3, 3, '2024-01-16', '10:00', 'completed', 70.00),
  ('Gabriel Lima', '(11) 99999-4444', 'gabriel@email.com', 1, 4, '2024-01-16', '11:00', 'confirmed', 45.00)
ON CONFLICT DO NOTHING;

-- 14. Inserir alguns contatos de exemplo
INSERT INTO contacts (name, email, phone, subject, message) VALUES
  ('Roberto Alves', 'roberto@email.com', '(11) 99999-5555', 'Agendamento', 'Gostaria de agendar um horário para corte'),
  ('Fernando Silva', 'fernando@email.com', '(11) 99999-6666', 'Dúvida', 'Vocês fazem corte feminino?'),
  ('Marcos Santos', 'marcos@email.com', '(11) 99999-7777', 'Orçamento', 'Preciso de um orçamento para evento')
ON CONFLICT DO NOTHING;

-- Mensagem de confirmação
SELECT 'Configuração completa! Todas as tabelas e políticas foram criadas com sucesso.' as status;
