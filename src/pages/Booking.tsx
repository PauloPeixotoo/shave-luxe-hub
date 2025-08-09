import { Calendar, Clock, User, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useServices, useBarbers, useCreateBooking } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const { toast } = useToast();
  const { services, loading: servicesLoading } = useServices();
  const { barbers, loading: barbersLoading } = useBarbers();
  const { createBooking, loading: isSubmitting } = useCreateBooking();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    barber: "",
    date: "",
    time: "",
    notes: ""
  });

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createBooking({
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        barber: formData.barber,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || null
      });

      // Limpar formulário
      setFormData({
        name: "",
        phone: "",
        service: "",
        barber: "",
        date: "",
        time: "",
        notes: ""
      });

      toast({
        title: "Sucesso!",
        description: "Agendamento solicitado! Entraremos em contato para confirmar.",
      });

    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o agendamento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Agendar Horário</h1>
            <p className="text-muted-foreground text-lg">Preencha os dados abaixo para solicitar seu agendamento</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário */}
            <div className="lg:col-span-2">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Dados do Agendamento
                  </CardTitle>
                  <CardDescription>
                    Preencha todos os campos obrigatórios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dados pessoais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>

                    {/* Serviço e Barbeiro */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="service">Serviço *</Label>
                        <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                          <SelectTrigger disabled={servicesLoading}>
                            <SelectValue placeholder={servicesLoading ? "Carregando..." : "Escolha um serviço"} />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.name}>
                                {service.name} - R$ {service.price.toFixed(2).replace('.', ',')} ({service.duration}min)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="barber">Barbeiro (Opcional)</Label>
                        <Select value={formData.barber} onValueChange={(value) => setFormData({...formData, barber: value})}>
                          <SelectTrigger disabled={barbersLoading}>
                            <SelectValue placeholder={barbersLoading ? "Carregando..." : "Escolha um barbeiro"} />
                          </SelectTrigger>
                          <SelectContent>
                            {barbers.map((barber) => (
                              <SelectItem key={barber.id} value={barber.name}>
                                {barber.name} - {barber.specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Data e Hora */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Data *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Horário Preferencial *</Label>
                        <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha um horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Observações */}
                    <div>
                      <Label htmlFor="notes">Observações (Opcional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Alguma preferência ou observação especial?"
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      variant="white"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar Agendamento"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informações laterais */}
            <div className="space-y-6">
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Horários
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span className="text-primary">9h - 20h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span className="text-primary">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span className="text-muted-foreground">Fechado</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scissors className="h-5 w-5" />
                    Como funciona
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                    <span>Preencha o formulário com seus dados</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                    <span>Entraremos em contato para confirmar</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                    <span>Compareça no horário agendado</span>
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

export default Booking;