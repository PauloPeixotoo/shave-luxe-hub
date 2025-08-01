import { Calendar, Users, Scissors, TrendingUp, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

const Admin = () => {
  // Dados mock para demonstração
  const todayAppointments = [
    { id: 1, client: "João Silva", service: "Corte + Barba", time: "09:00", barber: "Carlos", status: "confirmed" },
    { id: 2, client: "Pedro Santos", service: "Corte Clássico", time: "10:30", barber: "João", status: "pending" },
    { id: 3, client: "Lucas Oliveira", service: "Barba Completa", time: "14:00", barber: "Pedro", status: "confirmed" },
    { id: 4, client: "Rafael Costa", service: "Tratamento Capilar", time: "16:30", barber: "Carlos", status: "completed" },
  ];

  const stats = [
    { title: "Agendamentos Hoje", value: "12", icon: Calendar, change: "+2" },
    { title: "Faturamento Mensal", value: "R$ 8.450", icon: TrendingUp, change: "+15%" },
    { title: "Clientes Ativos", value: "156", icon: Users, change: "+8" },
    { title: "Serviços Realizados", value: "89", icon: Scissors, change: "+12" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500/10 text-green-500";
      case "pending": return "bg-yellow-500/10 text-yellow-500";
      case "completed": return "bg-blue-500/10 text-blue-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmado";
      case "pending": return "Pendente";
      case "completed": return "Concluído";
      default: return status;
    }
  };

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-4">Área do Barbeiro</h1>
            <p className="text-muted-foreground text-lg">Gerencie seus agendamentos e acompanhe o desempenho</p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-effect border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-primary">{stat.change}</span> desde o mês passado
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Agendamentos de Hoje */}
            <div className="lg:col-span-2">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Agendamentos de Hoje
                  </CardTitle>
                  <CardDescription>
                    {new Date().toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{appointment.time}</span>
                          </div>
                          <div>
                            <p className="font-medium">{appointment.client}</p>
                            <p className="text-sm text-muted-foreground">
                              {appointment.service} • {appointment.barber}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                          {appointment.status === "pending" && (
                            <Button size="sm" variant="outline">
                              <Phone className="h-3 w-3 mr-1" />
                              Ligar
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 bg-gradient-primary hover:opacity-90">
                    Ver Todos os Agendamentos
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Ações Rápidas */}
            <div className="space-y-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Novo Agendamento
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Cadastrar Cliente
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Scissors className="mr-2 h-4 w-4" />
                    Gerenciar Serviços
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Relatórios
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">Próximos Horários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">10:30 - Pedro Santos</span>
                      <Badge variant="outline">Pendente</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">14:00 - Lucas Oliveira</span>
                      <Badge className="bg-green-500/10 text-green-500">Confirmado</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">16:30 - Rafael Costa</span>
                      <Badge className="bg-green-500/10 text-green-500">Confirmado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;