-- Tabela de mapeamento de barbeiros
-- Esta tabela mapeia emails dos usuários autenticados com os nomes dos barbeiros

CREATE TABLE IF NOT EXISTS barber_mapping (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  barber_name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir mapeamentos de barbeiros
INSERT INTO barber_mapping (email, barber_name) VALUES
('barbeiro@barbearia.com', 'João Silva'),
('admin@barbearia.com', 'Administrador'),
('carlos@barbearia.com', 'Carlos Santos'),
('miguel@barbearia.com', 'Miguel Oliveira'),
('pedro@barbearia.com', 'Pedro Costa')
ON CONFLICT (email) DO NOTHING;

-- Função para obter o nome do barbeiro baseado no email
CREATE OR REPLACE FUNCTION get_barber_name(user_email VARCHAR)
RETURNS VARCHAR AS $$
BEGIN
  RETURN (
    SELECT barber_name 
    FROM barber_mapping 
    WHERE email = user_email 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para verificar se o usuário é um barbeiro específico
CREATE OR REPLACE FUNCTION is_specific_barber(user_email VARCHAR, barber_name VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM barber_mapping 
    WHERE email = user_email 
    AND barber_name = barber_name
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
