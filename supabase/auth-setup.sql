-- Configuração de autenticação para o sistema de barbearia

-- 1. Habilitar autenticação por email/senha
-- (Isso já deve estar habilitado por padrão no Supabase)

-- 2. Criar políticas de segurança para as tabelas existentes
-- (Aplicar apenas para usuários autenticados)

-- Política para contacts (permitir inserção pública, leitura apenas para autenticados)
DROP POLICY IF EXISTS "Enable insert for all users" ON contacts;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contacts;

CREATE POLICY "Enable insert for all users" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users" ON contacts FOR SELECT USING (auth.role() = 'authenticated');

-- Política para bookings (permitir inserção pública, leitura e atualização apenas para autenticados)
DROP POLICY IF EXISTS "Enable insert for all users" ON bookings;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON bookings;

CREATE POLICY "Enable insert for all users" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users" ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON bookings FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para barbers (leitura pública, escrita apenas para autenticados)
DROP POLICY IF EXISTS "Enable read for all users" ON barbers;
DROP POLICY IF EXISTS "Enable write for authenticated users" ON barbers;

CREATE POLICY "Enable read for all users" ON barbers FOR SELECT USING (true);
CREATE POLICY "Enable write for authenticated users" ON barbers FOR ALL USING (auth.role() = 'authenticated');

-- Política para services (leitura pública, escrita apenas para autenticados)
DROP POLICY IF EXISTS "Enable read for all users" ON services;
DROP POLICY IF EXISTS "Enable write for authenticated users" ON services;

CREATE POLICY "Enable read for all users" ON services FOR SELECT USING (true);
CREATE POLICY "Enable write for authenticated users" ON services FOR ALL USING (auth.role() = 'authenticated');

-- 3. Criar função para verificar se o usuário é barbeiro
CREATE OR REPLACE FUNCTION is_barber()
RETURNS BOOLEAN AS $$
BEGIN
  -- Por enquanto, qualquer usuário autenticado é considerado barbeiro
  -- Você pode expandir isso para verificar uma tabela de barbeiros autorizados
  RETURN auth.role() = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Criar tabela de barbeiros autorizados (opcional)
CREATE TABLE IF NOT EXISTS authorized_barbers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'barber',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Inserir barbeiros autorizados (substitua pelos emails reais)
INSERT INTO authorized_barbers (email, name, role) VALUES
('barbeiro@barbearia.com', 'Barbeiro Principal', 'barber'),
('admin@barbearia.com', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 6. Atualizar a função para verificar barbeiros autorizados
CREATE OR REPLACE FUNCTION is_barber()
RETURNS BOOLEAN AS $$
BEGIN
  -- Verificar se o usuário está na lista de barbeiros autorizados
  RETURN EXISTS (
    SELECT 1 FROM authorized_barbers 
    WHERE email = auth.jwt() ->> 'email' 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Políticas mais restritivas usando a função is_barber()
DROP POLICY IF EXISTS "Enable admin access" ON bookings;
DROP POLICY IF EXISTS "Enable admin access" ON contacts;
DROP POLICY IF EXISTS "Enable admin access" ON barbers;
DROP POLICY IF EXISTS "Enable admin access" ON services;

CREATE POLICY "Enable admin access" ON bookings FOR ALL USING (is_barber());
CREATE POLICY "Enable admin access" ON contacts FOR ALL USING (is_barber());
CREATE POLICY "Enable admin access" ON barbers FOR ALL USING (is_barber());
CREATE POLICY "Enable admin access" ON services FOR ALL USING (is_barber());

-- 8. Manter políticas públicas para inserção de agendamentos e contatos
-- (Os clientes precisam poder criar agendamentos e enviar mensagens)
CREATE POLICY "Enable public insert for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable public insert for contacts" ON contacts FOR INSERT WITH CHECK (true);
