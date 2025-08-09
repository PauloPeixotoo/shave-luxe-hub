# Configuração de Dashboards Separados - Sistema de Barbearia

## 🎯 **Sistema de Dashboards Implementado**

### **1. Dashboard Pessoal (`/dashboard`)**
- **Agendamentos pessoais** do barbeiro logado
- **Estatísticas individuais** (agendamentos, faturamento, etc.)
- **Gerenciamento de status** dos próprios agendamentos
- **Filtros automáticos** por barbeiro

### **2. Painel Administrativo (`/admin`)**
- **Todos os agendamentos** da barbearia
- **Estatísticas gerais** da empresa
- **Análises avançadas** e tendências
- **Gestão completa** do sistema

### **3. Seletor de Dashboard (`/selector`)**
- **Interface de escolha** após login
- **Navegação fácil** entre dashboards
- **Logout centralizado**

## 📋 **Passos para Configurar**

### **1. Executar Scripts SQL**

No SQL Editor do Supabase, execute na seguinte ordem:

```sql
-- 1. Configuração de autenticação
-- Execute o conteúdo do arquivo: supabase/auth-setup.sql

-- 2. Mapeamento de barbeiros
-- Execute o conteúdo do arquivo: supabase/barber-mapping.sql

-- 3. Dados de exemplo
-- Execute o conteúdo do arquivo: supabase/sample-barbers.sql
```

### **2. Criar Usuários de Teste**

Via Supabase Dashboard > **Authentication** > **Users**:

| Email | Senha | Nome do Barbeiro |
|-------|-------|------------------|
| `joao@barbearia.com` | `senha123` | João Silva |
| `carlos@barbearia.com` | `senha123` | Carlos Santos |
| `miguel@barbearia.com` | `senha123` | Miguel Oliveira |
| `pedro@barbearia.com` | `senha123` | Pedro Costa |
| `admin@barbearia.com` | `senha123` | Administrador |

### **3. Testar o Sistema**

1. **Faça login** com qualquer usuário acima
2. **Será redirecionado** para `/selector`
3. **Escolha** entre:
   - **Meu Dashboard**: Para ver agendamentos pessoais
   - **Painel Administrativo**: Para ver todos os agendamentos

## 🔧 **Funcionalidades por Dashboard**

### **Dashboard Pessoal (`/dashboard`)**
✅ **Agendamentos Filtrados**
- Apenas agendamentos do barbeiro logado
- Filtro automático por nome do barbeiro

✅ **Estatísticas Pessoais**
- Agendamentos hoje/semana/mês
- Faturamento pessoal
- Serviços concluídos
- Agendamentos pendentes

✅ **Gerenciamento Individual**
- Confirmar/cancelar agendamentos
- Marcar como concluído
- Ver observações dos clientes

### **Painel Administrativo (`/admin`)**
✅ **Visão Geral**
- Todos os agendamentos da barbearia
- Estatísticas gerais da empresa
- Análises de tendências

✅ **Gestão Completa**
- Gerenciar todos os agendamentos
- Ver estatísticas por barbeiro
- Análises de serviços populares

## 🗂️ **Estrutura de Arquivos**

```
src/
├── pages/
│   ├── Login.tsx                    # Página de login
│   ├── DashboardSelector.tsx        # Seletor de dashboard
│   ├── BarberDashboard.tsx          # Dashboard pessoal
│   └── Admin.tsx                    # Painel administrativo
├── hooks/
│   ├── useAuth.ts                   # Autenticação
│   ├── useBarberInfo.ts             # Informações do barbeiro
│   └── useSupabase.ts               # Hooks do Supabase
└── components/
    ├── ProtectedRoute.tsx           # Proteção de rotas
    └── RedirectIfAuthenticated.tsx  # Redirecionamento
```

## 🔐 **Segurança Implementada**

✅ **Autenticação Obrigatória**
- Todas as rotas protegidas
- Redirecionamento automático para login

✅ **Filtros por Barbeiro**
- Cada barbeiro vê apenas seus agendamentos
- Mapeamento email → nome do barbeiro

✅ **Políticas RLS**
- Controle de acesso no banco de dados
- Verificação de permissões

## 🎨 **Interface do Usuário**

### **Seletor de Dashboard**
- Interface moderna e intuitiva
- Cards explicativos para cada opção
- Botão de logout centralizado

### **Dashboard Pessoal**
- Estatísticas em cards coloridos
- Lista de agendamentos pessoais
- Botões de ação para cada agendamento

### **Painel Administrativo**
- Visão geral completa
- Análises e tendências
- Gestão de todos os dados

## 🚀 **Como Usar**

### **Para Barbeiros:**
1. Faça login com seu email
2. Escolha "Meu Dashboard"
3. Veja seus agendamentos pessoais
4. Gerencie status dos agendamentos

### **Para Administradores:**
1. Faça login com email de admin
2. Escolha "Painel Administrativo"
3. Veja todos os dados da barbearia
4. Gerencie o sistema completo

## 🔄 **Fluxo de Navegação**

```
Login → /selector → Escolha Dashboard
                ├── /dashboard (Pessoal)
                └── /admin (Administrativo)
```

## 📊 **Dados de Exemplo**

O sistema inclui dados de exemplo para testar:

- **4 barbeiros** com diferentes especialidades
- **12 agendamentos** distribuídos entre os barbeiros
- **Diferentes status** (pending, confirmed, completed)
- **Várias datas** para testar filtros

## 🛠️ **Personalização**

### **Adicionar Novo Barbeiro:**
```sql
-- 1. Criar usuário no Supabase Auth
-- 2. Inserir na tabela barber_mapping
INSERT INTO barber_mapping (email, barber_name) VALUES
('novo@barbearia.com', 'Nome do Barbeiro');

-- 3. Inserir na tabela barbers
INSERT INTO barbers (name, specialty, experience_years, bio) VALUES
('Nome do Barbeiro', 'Especialidade', 5, 'Biografia');
```

### **Modificar Estatísticas:**
Edite o arquivo `src/pages/BarberDashboard.tsx` para personalizar as estatísticas exibidas.

## 🎯 **Próximos Passos**

1. **Testar com dados reais**
2. **Personalizar estatísticas**
3. **Adicionar notificações**
4. **Implementar relatórios**
5. **Criar área de perfil**

---

**Sistema pronto para uso!** 🎉
Cada barbeiro agora tem sua própria área personalizada com dados filtrados e estatísticas individuais.
