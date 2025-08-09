# Configuração de Autenticação - Sistema de Barbearia

## Passos para Configurar a Autenticação

### 1. Configurar Autenticação no Supabase Dashboard

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto: `pwdhqucihbcdasbliuxe`
3. Vá para **Authentication** > **Settings**
4. Em **Auth Providers**, certifique-se de que **Email** está habilitado
5. Em **Site URL**, adicione: `http://localhost:8082` (ou a porta que você está usando)

### 2. Executar Script SQL de Configuração

No SQL Editor do Supabase, execute o conteúdo do arquivo `supabase/auth-setup.sql`:

```sql
-- Execute todo o conteúdo do arquivo supabase/auth-setup.sql
```

### 3. Criar Usuário Barbeiro

#### Opção A: Via Supabase Dashboard
1. Vá para **Authentication** > **Users**
2. Clique em **Add User**
3. Preencha:
   - **Email**: `barbeiro@barbearia.com`
   - **Password**: `senha123` (ou uma senha segura)
4. Clique em **Create User**

#### Opção B: Via SQL (mais seguro)
```sql
-- Criar usuário via SQL (substitua pelo email e senha desejados)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'barbeiro@barbearia.com',
  crypt('senha123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
);
```

### 4. Configurar Políticas de Segurança

Execute o script SQL para configurar as políticas:

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
```

### 5. Testar o Sistema

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse: `http://localhost:8082/login`

3. Faça login com:
   - **Email**: `barbeiro@barbearia.com`
   - **Senha**: `senha123`

4. Você será redirecionado para `/admin` se o login for bem-sucedido

### 6. Funcionalidades Implementadas

✅ **Login/Logout**
- Página de login com validação
- Redirecionamento automático se já logado
- Botão de logout no painel admin

✅ **Proteção de Rotas**
- Rota `/admin` protegida
- Redirecionamento para login se não autenticado
- Loading states durante verificação

✅ **Políticas de Segurança**
- Clientes podem criar agendamentos e contatos
- Apenas barbeiros autenticados podem ver/modificar dados
- Função `is_barber()` para verificação de permissões

### 7. Personalização

#### Alterar Credenciais Padrão
Edite o arquivo `supabase/auth-setup.sql` e altere:
```sql
INSERT INTO authorized_barbers (email, name, role) VALUES
('seu-email@exemplo.com', 'Seu Nome', 'barber')
```

#### Adicionar Mais Barbeiros
```sql
INSERT INTO authorized_barbers (email, name, role) VALUES
('outro-barbeiro@exemplo.com', 'Outro Barbeiro', 'barber');
```

### 8. Troubleshooting

#### Erro: "Invalid login credentials"
- Verifique se o usuário foi criado corretamente
- Confirme se o email está correto
- Verifique se a senha está correta

#### Erro: "Access denied"
- Execute o script SQL de configuração
- Verifique se as políticas RLS estão ativas
- Confirme se o usuário está na tabela `authorized_barbers`

#### Erro: "Site URL not allowed"
- Adicione `http://localhost:8082` nas configurações do Supabase
- Verifique se a porta está correta

### 9. Segurança

- ✅ Senhas criptografadas
- ✅ Políticas RLS ativas
- ✅ Verificação de barbeiros autorizados
- ✅ Tokens JWT seguros
- ✅ Logout automático

### 10. Próximos Passos

1. **Adicionar mais barbeiros** via Supabase Dashboard
2. **Personalizar permissões** por nível de acesso
3. **Implementar recuperação de senha**
4. **Adicionar notificações** por email
5. **Criar área de perfil** do barbeiro
