import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'admin' | 'barber' | null>(null);

  // Admin emails can be configured via Vite env: VITE_ADMIN_EMAILS (comma separated)
  const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined)
    ? (import.meta.env.VITE_ADMIN_EMAILS as string).split(',').map(s => s.trim().toLowerCase())
    : ['owner@barbershop.com'];

  useEffect(() => {
    // Verificar se há uma sessão ativa
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      const email = session?.user?.email?.toLowerCase() ?? null;
      setRole(email && ADMIN_EMAILS.includes(email) ? 'admin' : (email ? 'barber' : null));
      setLoading(false);
    };

    getSession();

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        const email = session?.user?.email?.toLowerCase() ?? null;
        setRole(email && ADMIN_EMAILS.includes(email) ? 'admin' : (email ? 'barber' : null));
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user,
    role,
    isAdmin: role === 'admin'
  };
};
