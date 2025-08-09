# 🔧 Solução para Tela Admin que Não Carrega

## 🚨 **Problemas Identificados:**

1. **Erro 406**: Tabela `barber_mapping` não existe no Supabase
2. **Erro "User is not defined"**: Falta import do ícone `User` no Admin.tsx
3. **Configurações RLS**: Políticas de segurança não estão configuradas

## ✅ **Soluções Aplicadas:**

### **1. ✅ Erro de Import Corrigido**
- Adicionado `User` ao import do lucide-react no `Admin.tsx`

### **2. 🔧 Execute este Script no Supabase**

**Passo 1:** Vá para o [Supabase Dashboard](https://supabase.com/dashboard)
**Passo 2:** Selecione seu projeto
**Passo 3:** Vá para **SQL Editor**
**Passo 4:** Copie e cole o script completo do arquivo `supabase/complete-setup.sql`
**Passo 5:** Clique em **Run** para executar

### **3. 🔐 Configure um Usuário de Teste**

Após executar o script, crie um usuário de teste:

**No Supabase Dashboard:**
1. Vá para **Authentication** > **Users**
2. Clique em **Add User**
3. Preencha:
   - **Email**: `admin@barbershop.com`
   - **Password**: `123456`
4. Clique em **Create User**

### **4. 🧪 Teste o Sistema**

1. **Faça login** com:
   - Email: `admin@barbershop.com`
   - Senha: `123456`

2. **Acesse** `/admin` ou `/selector`

3. **Verifique** se a tela carrega corretamente

## 📋 **O que o Script Faz:**

✅ **Cria tabela `barber_mapping`**
✅ **Configura funções SQL** (`is_barber()`, `get_barber_name()`)
✅ **Aplica políticas RLS** para todas as tabelas
✅ **Insere dados de exemplo** (barbeiros, serviços, agendamentos)
✅ **Configura autenticação** para barbeiros

## 🎯 **Usuários de Teste Disponíveis:**

| Email | Nome | Senha |
|-------|------|-------|
| `admin@barbershop.com` | Administrador | `123456` |
| `joao@barbershop.com` | João Silva | `123456` |
| `maria@barbershop.com` | Maria Santos | `123456` |

## 🔍 **Se Ainda Não Funcionar:**

1. **Verifique o console** do navegador (F12)
2. **Confirme** que o script SQL foi executado com sucesso
3. **Verifique** se o usuário foi criado corretamente
4. **Teste** com um dos emails listados acima

## 📞 **Suporte:**

Se ainda houver problemas, verifique:
- ✅ Script SQL executado com sucesso
- ✅ Usuário criado no Supabase
- ✅ Login funcionando
- ✅ Console sem erros

---

**Status:** ✅ Erro de import corrigido
**Próximo passo:** Execute o script SQL no Supabase Dashboard
