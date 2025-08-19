import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];
type Booking = Database['public']['Tables']['bookings']['Row'];
type Barber = Database['public']['Tables']['barbers']['Row'];
type Service = Database['public']['Tables']['services']['Row'];

// Hook para buscar barbeiros
export const useBarbers = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const { data, error } = await supabase
          .from('barbers')
          .select('*')
          .order('name');

        if (error) throw error;
        setBarbers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar barbeiros');
      } finally {
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  return { barbers, loading, error };
};

// Hook para buscar serviços
export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('name');

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar serviços');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

// Hook para criar agendamento
export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'status'>) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar agendamento';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
};

// Hook para criar um novo barbeiro (usado no dashboard admin)
export const useCreateBarber = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBarber = async (barberData: { name: string; photo_url?: string | null; services?: string[] }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('barbers')
        .insert([{
          name: barberData.name,
          photo_url: barberData.photo_url ?? null,
          services: barberData.services ?? null
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar barbeiro';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createBarber, loading, error };
};

// Hook para buscar agendamentos (para admin)
export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, refetch: fetchBookings };
};

// Hook para buscar contatos (para admin)
export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar contatos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contacts, loading, error, refetch: fetchContacts };
};

// Hook para atualizar status de agendamento
export const useUpdateBookingStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (bookingId: string, status: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar status';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};

// Hook para estatísticas
export const useStats = () => {
  const [stats, setStats] = useState({
    todayBookings: 0,
    weeklyBookings: 0,
    monthlyBookings: 0,
    monthlyRevenue: 0,
    weeklyRevenue: 0,
    completedServices: 0,
    totalClients: 0,
    pendingBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateStats = async () => {
    try {
      // Buscar todos os agendamentos
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*');

      if (bookingsError) throw bookingsError;

      // Buscar todos os serviços para calcular faturamento
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*');

      if (servicesError) throw servicesError;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Criar mapa de preços dos serviços
      const servicePrices = new Map(services?.map(s => [s.name, s.price]) || []);

      let todayBookings = 0;
      let weeklyBookings = 0;
      let monthlyBookings = 0;
      let monthlyRevenue = 0;
      let weeklyRevenue = 0;
      let completedServices = 0;
      let pendingBookings = 0;
      const uniqueClients = new Set();

      bookings?.forEach(booking => {
        const bookingDate = new Date(booking.date);
        const servicePrice = servicePrices.get(booking.service) || 0;

        // Contar clientes únicos
        uniqueClients.add(booking.name);

        // Agendamentos por período
        if (bookingDate >= today) {
          todayBookings++;
        }
        if (bookingDate >= weekAgo) {
          weeklyBookings++;
          weeklyRevenue += servicePrice;
        }
        if (bookingDate >= monthAgo) {
          monthlyBookings++;
          monthlyRevenue += servicePrice;
        }

        // Status dos agendamentos
        if (booking.status === 'completed') {
          completedServices++;
        }
        if (booking.status === 'pending') {
          pendingBookings++;
        }
      });

      setStats({
        todayBookings,
        weeklyBookings,
        monthlyBookings,
        monthlyRevenue,
        weeklyRevenue,
        completedServices,
        totalClients: uniqueClients.size,
        pendingBookings
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular estatísticas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateStats();
  }, []);

  return { stats, loading, error, refetch: calculateStats };
};

// Hook para dados históricos e tendências
export const useHistoricalData = () => {
  const [historicalData, setHistoricalData] = useState({
    dailyBookings: [] as { date: string; count: number }[],
    weeklyRevenue: [] as { week: string; revenue: number }[],
    topServices: [] as { service: string; count: number }[],
    topBarbers: [] as { barber: string; count: number }[]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalData = async () => {
    try {
      // Buscar agendamentos dos últimos 30 dias
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('date');

      if (bookingsError) throw bookingsError;

      // Buscar serviços para calcular faturamento
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*');

      if (servicesError) throw servicesError;

      const servicePrices = new Map(services?.map(s => [s.name, s.price]) || []);

      // Agrupar por dia
      const dailyMap = new Map<string, number>();
      const weeklyMap = new Map<string, number>();
      const serviceMap = new Map<string, number>();
      const barberMap = new Map<string, number>();

      bookings?.forEach(booking => {
        const date = booking.date;
        const servicePrice = servicePrices.get(booking.service) || 0;

        // Contar agendamentos por dia
        dailyMap.set(date, (dailyMap.get(date) || 0) + 1);

        // Calcular faturamento semanal
        const weekStart = getWeekStart(date);
        weeklyMap.set(weekStart, (weeklyMap.get(weekStart) || 0) + servicePrice);

        // Contar serviços mais populares
        serviceMap.set(booking.service, (serviceMap.get(booking.service) || 0) + 1);

        // Contar barbeiros mais ativos
        barberMap.set(booking.barber, (barberMap.get(booking.barber) || 0) + 1);
      });

      // Converter para arrays ordenados
      const dailyBookings = Array.from(dailyMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      const weeklyRevenue = Array.from(weeklyMap.entries())
        .map(([week, revenue]) => ({ week, revenue }))
        .sort((a, b) => a.week.localeCompare(b.week));

      const topServices = Array.from(serviceMap.entries())
        .map(([service, count]) => ({ service, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const topBarbers = Array.from(barberMap.entries())
        .map(([barber, count]) => ({ barber, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setHistoricalData({
        dailyBookings,
        weeklyRevenue,
        topServices,
        topBarbers
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados históricos');
    } finally {
      setLoading(false);
    }
  };

  const getWeekStart = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    const diff = date.getDate() - day;
    const monday = new Date(date.setDate(diff));
    return monday.toISOString().split('T')[0];
  };

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  return { historicalData, loading, error, refetch: fetchHistoricalData };
};
