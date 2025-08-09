import { Calendar, Users, Scissors, TrendingUp, Clock, Phone, CheckCircle, XCircle, AlertCircle, DollarSign, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useBookings, useUpdateBookingStatus, useStats, useHistoricalData } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { bookings, loading: bookingsLoading, error: bookingsError, refetch } = useBookings();
  const { updateStatus, loading: updatingStatus } = useUpdateBookingStatus();
  const { stats, loading: statsLoading, error: statsError } = useStats();
  const { historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData();



  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await updateStatus(bookingId, newStatus);

      toast({
        title: "Sucesso!",
        description: `Status atualizado para ${newStatus}`,
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

  // Estatísticas calculadas em tempo real
  const statsCards = [
    { 
      title: "Agendamentos Hoje", 
      value: stats.todayBookings.toString(), 
      icon: Calendar, 
      change: stats.todayBookings > 0 ? `+${stats.todayBookings}` : "0",
      color: "text-blue-500"
    },
    { 
      title: "Faturamento Mensal", 
      value: `R$ ${stats.monthlyRevenue.toFixed(2).replace('.', ',')}`, 
      icon: DollarSign, 
      change: stats.monthlyRevenue > 0 ? `+${stats.monthlyRevenue.toFixed(2).replace('.', ',')}` : "R$ 0,00",
      color: "text-green-500"
    },
    { 
      title: "Clientes Ativos", 
      value: stats.totalClients.toString(), 
      icon: Users, 
      change: stats.totalClients > 0 ? `+${stats.totalClients}` : "0",
      color: "text-purple-500"
    },
    { 
      title: "Serviços Realizados", 
      value: stats.completedServices.toString(), 
      icon: Scissors, 
      change: stats.completedServices > 0 ? `+${stats.completedServices}` : "0",
      color: "text-orange-500"
    },
    { 
      title: "Agendamentos Pendentes", 
      value: stats.pendingBookings.toString(), 
      icon: AlertCircle, 
      change: stats.pendingBookings > 0 ? `${stats.pendingBookings} pendentes` : "0",
      color: "text-yellow-500"
    },
    { 
      title: "Faturamento Semanal", 
      value: `R$ ${stats.weeklyRevenue.toFixed(2).replace('.', ',')}`, 
      icon: TrendingUp, 
      change: stats.weeklyRevenue > 0 ? `+${stats.weeklyRevenue.toFixed(2).replace('.', ',')}` : "R$ 0,00",
      color: "text-green-600"
    }
  ];

  if (bookingsLoading || statsLoading || historicalLoading) {
    return (
      <Layout>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Painel Administrativo</h1>
              <p className="text-muted-foreground text-lg">Carregando estatísticas...</p>
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
              <h1 className="text-5xl font-bold mb-4">Painel Administrativo</h1>
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
              <h1 className="text-5xl font-bold">Painel Administrativo</h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Meu Dashboard
                </Button>
                <Button
                  variant="outline"
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
              Olá, {user?.email}! Gerencie agendamentos e visualize estatísticas em tempo real
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {statsCards.map((stat, index) => (
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

          {/* Tendências e Análises */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Serviços Mais Populares */}
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Scissors className="h-5 w-5" />
                  Serviços Mais Populares
                </CardTitle>
                <CardDescription>
                  Top 5 serviços mais solicitados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicalData.topServices.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">Nenhum dado disponível</p>
                  ) : (
                    historicalData.topServices.map((service, index) => (
                      <div key={service.service} className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-primary">#{index + 1}</span>
                          <span className="font-medium">{service.service}</span>
                        </div>
                        <Badge variant="secondary">{service.count} agendamentos</Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Barbeiros Mais Ativos */}
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Barbeiros Mais Ativos
                </CardTitle>
                <CardDescription>
                  Top 5 barbeiros com mais agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicalData.topBarbers.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">Nenhum dado disponível</p>
                  ) : (
                    historicalData.topBarbers.map((barber, index) => (
                      <div key={barber.barber} className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-primary">#{index + 1}</span>
                          <span className="font-medium">{barber.barber}</span>
                        </div>
                        <Badge variant="secondary">{barber.count} agendamentos</Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agendamentos */}
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Agendamentos Recentes
              </CardTitle>
              <CardDescription>
                Gerencie os agendamentos dos clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
                  </div>
                ) : (
                                     bookings.map((booking) => {
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
                               <p><strong>Barbeiro:</strong> {booking.barber}</p>
                             </div>
                             <div className="text-sm">
                               <p><strong>Data:</strong> {new Date(booking.date).toLocaleDateString('pt-BR')}</p>
                               <p><strong>Hora:</strong> {booking.time}</p>
                             </div>
                           </div>
                           {booking.notes && (
                             <p className="text-sm text-muted-foreground mt-2">
                               <strong>Observações:</strong> {booking.notes}
                             </p>
                           )}
                         </div>
                         <div className="flex items-center gap-2">
                           <StatusBadge status={booking.status} />
                          <div className="flex gap-1">
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  disabled={updatingStatus}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  {updatingStatus ? "..." : "Confirmar"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
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
                                onClick={() => updateBookingStatus(booking.id, 'completed')}
                                disabled={updatingStatus}
                                className="bg-blue-600 hover:bg-blue-700"
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

export default Admin;