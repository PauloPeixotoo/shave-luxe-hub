import { Clock, Scissors, Crown, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useServices } from "@/hooks/useSupabase";

const Services = () => {
  const { services, loading, error } = useServices();

  // Mapeamento de ícones para serviços
  const getServiceIcon = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes('barba')) return Crown;
    if (name.includes('tratamento')) return Users;
    if (name.includes('degradê') || name.includes('degrade')) return Star;
    return Scissors;
  };

  if (loading) {
    return (
      <Layout>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Nossos Serviços</h1>
              <p className="text-muted-foreground text-lg">Carregando...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Nossos Serviços</h1>
              <p className="text-muted-foreground text-lg">Erro ao carregar os serviços: {error}</p>
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
            <h1 className="text-5xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-muted-foreground text-lg">Qualidade e estilo em cada atendimento</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const ServiceIcon = getServiceIcon(service.name);
              return (
                <Card key={service.id} className="glass-effect border-border/50 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <ServiceIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      {service.duration}min
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {service.description && (
                      <p className="text-muted-foreground mb-4 text-center">{service.description}</p>
                    )}
                    <div className="text-3xl font-bold gradient-text mb-4 text-center">
                      R$ {service.price.toFixed(2).replace('.', ',')}
                    </div>
                    <Link to={`/booking?service=${encodeURIComponent(service.name)}`}>
                      <Button className="w-full flex justify-center" variant="white">
                        Agendar Agora
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Card className="glass-effect border-border/50 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Pacotes Especiais</CardTitle>
                <CardDescription>
                  Oferecemos descontos para pacotes combinados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Corte + Barba</h4>
                    <p className="text-sm text-muted-foreground">Combo com desconto especial</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Pacote Mensal</h4>
                    <p className="text-sm text-muted-foreground">4 cortes por mês com desconto</p>
                  </div>
                </div>
                <Link to={`/booking?service=${encodeURIComponent('Pacote Especial')}`}>
                  <Button size="lg" variant="white" className="text-lg px-8 py-4">
                    Fazer Agendamento
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;