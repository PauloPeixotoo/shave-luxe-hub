import { Calendar, Users, Scissors, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, DollarSign, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useBookings, useUpdateBookingStatus, useStats, useHistoricalData } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useBarberInfo } from "@/hooks/useBarberInfo";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const BarberDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { barberName, loading: barberInfoLoading } = useBarberInfo();
  const { bookings, loading: bookingsLoading, error: bookingsError, refetch } = useBookings();
  const { updateStatus, loading: updatingStatus } = useUpdateBookingStatus();
  const { stats, loading: statsLoading, error: statsError } = useStats();
  const { historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData();

  // Filtrar agendamentos apenas do barbeiro logado
  const barberBookings = useMemo(() => {
    if (!barberName || !bookings) return [];
    
    return bookings.filter(booking => 
      booking.barber.toLowerCase().includes(barberName.toLowerCase())
    );
  }, [bookings, barberName]);

  // Estatísticas personalizadas do barbeiro
  const barberStats = useMemo(() => {
    if (!barberBookings.length) return {
      todayBookings: 0,
      weeklyBookings: 0,
      monthlyBookings: 0,
      completedServices: 0,
      pendingBookings: 0,
      totalRevenue: 0
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    let todayBookings = 0;
    let weeklyBookings = 0;
    let monthlyBookings = 0;
    let completedServices = 0;
    let pendingBookings = 0;
    let totalRevenue = 0;

    barberBookings.forEach(booking => {
      const bookingDate = new Date(booking.date);
      
      if (bookingDate >= today) {
        todayBookings++;
      }
      if (bookingDate >= weekAgo) {
        weeklyBookings++;
      }
      if (bookingDate >= monthAgo) {
        monthlyBookings++;
      }

      if (booking.status === 'completed') {
        completedServices++;
      }
      if (booking.status === 'pending') {
        pendingBookings++;
      }

      // Calcular faturamento (preço estimado por serviço)
      const servicePrices: { [key: string]: number } = {
        'Corte Masculino': 30,
        'Barba': 20,
        'Corte + Barba': 45,
        'Hidratação': 25,
        'Pigmentação': 35,
        'Sobrancelha': 15
      };

      const price = servicePrices[booking.service] || 30;
      if (booking.status === 'completed') {
        totalRevenue += price;
      }
    });

    return {
      todayBookings,
      weeklyBookings,
      monthlyBookings,
      completedServices,
      pendingBookings,
      totalRevenue
    };
  }, [barberBookings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500/10 text-green-500";
      case "pending": return "bg-yellow-500/10 text-yellow-500";
      case "completed": return "bg-blue-500/10 text-blue-500";
      case "cancelled": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmado";
      case "pending": return "Pendente";
      case "completed": return "Concluído";
      case "cancelled": return "Cancelado";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return CheckCircle;
      case "pending": return AlertCircle;
      case "completed": return CheckCircle;
      case "cancelled": return XCircle;
      default: return AlertCircle;
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await updateStatus(bookingId, newStatus);

      toast({
        title: "Sucesso!",
        description: `Status atualizado para ${getStatusText(newStatus)}`,
      });

      refetch();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate("/");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        title: "Erro",
        description: "Erro ao fazer logout.",
        variant: "destructive"
      });
    }
  };

  // Estatísticas do barbeiro
  const barberStatsCards = [
    { 
      title: "Meus Agendamentos Hoje", 
      value: barberStats.todayBookings.toString(), 
      icon: Calendar, 
      change: barberStats.todayBookings > 0 ? `+${barberStats.todayBookings}` : "0",
      color: "text-blue-500"
    },
    { 
      title: "Faturamento Total", 
      value: `R$ ${barberStats.totalRevenue.toFixed(2).replace('.', ',')}`, 
      icon: DollarSign, 
      change: barberStats.totalRevenue > 0 ? `+${barberStats.totalRevenue.toFixed(2).replace('.', ',')}` : "R$ 0,00",
      color: "text-green-500"
    },
    { 
      title: "Serviços Concluídos", 
      value: barberStats.completedServices.toString(), 
      icon: Scissors, 
      change: barberStats.completedServices > 0 ? `+${barberStats.completedServices}` : "0",
      color: "text-orange-500"
    },
    { 
      title: "Agendamentos Pendentes", 
      value: barberStats.pendingBookings.toString(), 
      icon: AlertCircle, 
      change: barberStats.pendingBookings > 0 ? `${barberStats.pendingBookings} pendentes` : "0",
      color: "text-yellow-500"
    },
    { 
      title: "Agendamentos da Semana", 
      value: barberStats.weeklyBookings.toString(), 
      icon: TrendingUp, 
      change: barberStats.weeklyBookings > 0 ? `+${barberStats.weeklyBookings}` : "0",
      color: "text-purple-500"
    },
    { 
      title: "Agendamentos do Mês", 
      value: barberStats.monthlyBookings.toString(), 
      icon: Users, 
      change: barberStats.monthlyBookings > 0 ? `+${barberStats.monthlyBookings}` : "0",
      color: "text-indigo-500"
    }
  ];

  if (bookingsLoading || statsLoading || historicalLoading || barberInfoLoading) {
    return (
      <Layout>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Meu Dashboard</h1>
              <p className="text-muted-foreground text-lg">Carregando suas estatísticas...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (bookingsError || statsError || historicalError) {
    return (
      <Layout>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Meu Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Erro ao carregar dados: {bookingsError || statsError || historicalError}
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <h1 className="text-5xl font-bold">Meu Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="white"
                  size="sm"
                  onClick={() => navigate("/admin")}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Admin
                </Button>
                <Button
                  variant="white"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Olá, {barberName || user?.email}! Aqui estão suas estatísticas pessoais
            </p>
          </div>

          {/* Estatísticas do Barbeiro */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {barberStatsCards.map((stat, index) => (
              <Card key={index} className="glass-effect border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Meus Agendamentos */}
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Meus Agendamentos
              </CardTitle>
              <CardDescription>
                Gerencie seus agendamentos pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {barberBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum agendamento encontrado para você</p>
                  </div>
                ) : (
                  barberBookings.map((booking) => {
                    const StatusIcon = getStatusIcon(booking.status);
                    return (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-card/50 rounded-lg border">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <h4 className="font-semibold">{booking.name}</h4>
                              <p className="text-sm text-muted-foreground">{booking.phone}</p>
                            </div>
                            <div className="text-sm">
                              <p><strong>Serviço:</strong> {booking.service}</p>
                              <p><strong>Data:</strong> {new Date(booking.date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div className="text-sm">
                              <p><strong>Hora:</strong> {booking.time}</p>
                              <p><strong>Status:</strong> {getStatusText(booking.status)}</p>
                            </div>
                          </div>
                          {booking.notes && (
                            <p className="text-sm text-muted-foreground mt-2">
                              <strong>Observações:</strong> {booking.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(booking.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {getStatusText(booking.status)}
                          </Badge>
                          <div className="flex gap-1">
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="white"
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  disabled={updatingStatus}
                                >
                                  {updatingStatus ? "..." : "Confirmar"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="white"
                                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                  disabled={updatingStatus}
                                >
                                  {updatingStatus ? "..." : "Cancelar"}
                                </Button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="white"
                                onClick={() => updateBookingStatus(booking.id, 'completed')}
                                disabled={updatingStatus}
                              >
                                {updatingStatus ? "..." : "Concluir"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default BarberDashboard;
