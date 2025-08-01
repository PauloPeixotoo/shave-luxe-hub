import { Calendar, Clock, MapPin, Phone, Star, Users, Scissors, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const services = [
    { name: "Corte Clássico", price: "R$ 35", duration: "30min", icon: Scissors },
    { name: "Barba & Bigode", price: "R$ 25", duration: "20min", icon: Crown },
    { name: "Corte + Barba", price: "R$ 55", duration: "45min", icon: Star },
    { name: "Tratamento Capilar", price: "R$ 80", duration: "60min", icon: Users },
  ];

  const barbers = [
    { name: "Carlos Silva", experience: "8 anos", rating: 4.9, specialty: "Cortes modernos" },
    { name: "João Santos", experience: "5 anos", rating: 4.8, specialty: "Barbas tradicionais" },
    { name: "Pedro Lima", experience: "10 anos", rating: 5.0, specialty: "Penteados clássicos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-lg bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold gradient-text">BarberShop Premium</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Serviços</a>
            <a href="#barbers" className="text-muted-foreground hover:text-primary transition-colors">Barbeiros</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contato</a>
            <Button variant="outline" size="sm">
              Área do Barbeiro
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Seu estilo,
            <span className="gradient-text block">nossa arte</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experimente o melhor em cortes masculinos e cuidados com a barba. 
            Agende seu horário sem complicação e venha viver a experiência premium.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6">
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Horário
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Phone className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Nossos Serviços</h3>
            <p className="text-muted-foreground text-lg">Qualidade e estilo em cada atendimento</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="card-hover glass-effect border-border/50">
                <CardHeader className="text-center">
                  <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-4">{service.price}</div>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Agendar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section id="barbers" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Nossos Profissionais</h3>
            <p className="text-muted-foreground text-lg">Mestres em sua arte, especialistas em estilo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbers.map((barber, index) => (
              <Card key={index} className="card-hover glass-effect border-border/50 text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{barber.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {barber.specialty} • {barber.experience}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">{barber.rating}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Escolher Profissional
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6">Visite Nossa Barbearia</h3>
              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Rua das Flores, 123 - Centro, São Paulo - SP</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <span>Segunda a Sábado: 9h às 20h</span>
                </div>
              </div>
            </div>
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Horário de Funcionamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 text-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text">BarberShop Premium</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 BarberShop Premium. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
