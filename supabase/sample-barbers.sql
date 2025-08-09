-- Inserir dados de exemplo de barbeiros
-- Execute este script após criar as tabelas

-- Inserir barbeiros na tabela barbers
INSERT INTO barbers (name, specialty, experience_years, bio, image_url) VALUES
('João Silva', 'Corte Masculino, Barba', 8, 'Especialista em cortes modernos e barbas bem definidas', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400'),
('Carlos Santos', 'Corte + Barba, Hidratação', 5, 'Especialista em tratamentos capilares e hidratação', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400'),
('Miguel Oliveira', 'Corte Masculino, Pigmentação', 10, 'Especialista em cortes clássicos e pigmentação', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
('Pedro Costa', 'Barba, Sobrancelha', 6, 'Especialista em barbas e design de sobrancelhas', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400')
ON CONFLICT (name) DO NOTHING;

-- Inserir mapeamentos de barbeiros (email -> nome)
INSERT INTO barber_mapping (email, barber_name) VALUES
('joao@barbearia.com', 'João Silva'),
('carlos@barbearia.com', 'Carlos Santos'),
('miguel@barbearia.com', 'Miguel Oliveira'),
('pedro@barbearia.com', 'Pedro Costa'),
('barbeiro@barbearia.com', 'João Silva'), -- Fallback
('admin@barbearia.com', 'Administrador')
ON CONFLICT (email) DO NOTHING;

-- Inserir agendamentos de exemplo para diferentes barbeiros
INSERT INTO bookings (name, phone, email, service, barber, date, time, notes, status) VALUES
('Roberto Almeida', '(11) 99999-1111', 'roberto@email.com', 'Corte Masculino', 'João Silva', '2024-01-15', '10:00', 'Corte moderno', 'completed'),
('Lucas Mendes', '(11) 99999-2222', 'lucas@email.com', 'Barba', 'João Silva', '2024-01-15', '11:00', 'Barba bem definida', 'completed'),
('Fernando Costa', '(11) 99999-3333', 'fernando@email.com', 'Corte + Barba', 'Carlos Santos', '2024-01-15', '14:00', 'Corte tradicional', 'confirmed'),
('Ricardo Silva', '(11) 99999-4444', 'ricardo@email.com', 'Hidratação', 'Carlos Santos', '2024-01-15', '15:00', 'Tratamento completo', 'pending'),
('Marcos Oliveira', '(11) 99999-5555', 'marcos@email.com', 'Corte Masculino', 'Miguel Oliveira', '2024-01-15', '16:00', 'Corte clássico', 'pending'),
('André Santos', '(11) 99999-6666', 'andre@email.com', 'Pigmentação', 'Miguel Oliveira', '2024-01-15', '17:00', 'Pigmentação natural', 'confirmed'),
('Paulo Lima', '(11) 99999-7777', 'paulo@email.com', 'Barba', 'Pedro Costa', '2024-01-15', '18:00', 'Barba bem feita', 'completed'),
('Thiago Ferreira', '(11) 99999-8888', 'thiago@email.com', 'Sobrancelha', 'Pedro Costa', '2024-01-15', '19:00', 'Design de sobrancelha', 'pending')
ON CONFLICT DO NOTHING;

-- Inserir mais agendamentos para diferentes datas
INSERT INTO bookings (name, phone, email, service, barber, date, time, notes, status) VALUES
('Gabriel Martins', '(11) 99999-9999', 'gabriel@email.com', 'Corte Masculino', 'João Silva', '2024-01-16', '09:00', 'Corte moderno', 'pending'),
('Diego Souza', '(11) 99999-0000', 'diego@email.com', 'Corte + Barba', 'Carlos Santos', '2024-01-16', '10:00', 'Corte tradicional', 'pending'),
('Bruno Alves', '(11) 99999-1111', 'bruno@email.com', 'Hidratação', 'Miguel Oliveira', '2024-01-16', '11:00', 'Tratamento completo', 'pending'),
('Rafael Costa', '(11) 99999-2222', 'rafael@email.com', 'Barba', 'Pedro Costa', '2024-01-16', '12:00', 'Barba bem definida', 'pending')
ON CONFLICT DO NOTHING;
