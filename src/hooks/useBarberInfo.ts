import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface BarberInfo {
  barberName: string | null;
  loading: boolean;
  error: string | null;
}

export const useBarberInfo = (): BarberInfo => {
  const { user } = useAuth();
  const [barberName, setBarberName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBarberInfo = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        // Buscar o nome do barbeiro na tabela de mapeamento
        const { data, error: fetchError } = await supabase
          .from('barber_mapping')
          .select('barber_name')
          .eq('email', user.email)
          .eq('is_active', true)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        if (data) {
          setBarberName(data.barber_name);
        } else {
          // Fallback: usar o email como nome
          setBarberName(user.email.split('@')[0]);
        }
      } catch (err) {
        console.error('Erro ao buscar informações do barbeiro:', err);
        setError(err instanceof Error ? err.message : 'Erro ao buscar informações do barbeiro');
        // Fallback: usar o email como nome
        setBarberName(user.email.split('@')[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchBarberInfo();
  }, [user?.email]);

  return { barberName, loading, error };
};
