import { Clock, Scissors, Crown, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Services = () => {
  const services = [
    { name: "Corte Clássico", price: "R$ 35", duration: "30min", icon: Scissors, description: "Corte tradicional com acabamento perfeito" },
    { name: "Barba & Bigode", price: "R$ 25", duration: "20min", icon: Crown, description: "Aparar e modelar barba e bigode" },
    { name: "Corte + Barba", price: "R$ 55", duration: "45min", icon: Star, description: "Combo completo com desconto especial" },
    { name: "Tratamento Capilar", price: "R$ 80", duration: "60min", icon: Users, description: "Hidratação e tratamento para cabelos" },
    { name: "Corte Degradê", price: "R$ 40", duration: "35min", icon: Scissors, description: "Corte moderno com degradê lateral" },
    { name: "Barba Completa", price: "R$ 35", duration: "30min", icon: Crown, description: "Corte, modelagem e finalização da barba" },
  ];

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-muted-foreground text-lg">Qualidade e estilo em cada atendimento</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="text-3xl font-bold gradient-text mb-4">{service.price}</div>
                  <Link to="/booking">
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Agendar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-3xl font-bold mb-6">Pronto para agendar?</h3>
            <Link to="/booking">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-4">
                Fazer Agendamento
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;