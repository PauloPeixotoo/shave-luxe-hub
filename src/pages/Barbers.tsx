import { Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useBarbers } from "@/hooks/useSupabase";

const Barbers = () => {
  const { barbers, loading, error } = useBarbers();

  if (loading) {
    return (
      <Layout>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Nossa Equipe</h1>
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
              <h1 className="text-5xl font-bold mb-4">Nossa Equipe</h1>
              <p className="text-muted-foreground text-lg">Erro ao carregar os barbeiros: {error}</p>
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
            <h1 className="text-5xl font-bold mb-4">Nossa Equipe</h1>
            <p className="text-muted-foreground text-lg">Conheça nossos profissionais especializados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {barbers.map((barber) => (
              <Card key={barber.id} className="glass-effect border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {barber.photo_url ? (
                      <img src={barber.photo_url} alt={barber.name} className="object-cover w-full h-full" />
                    ) : (
                      <Users className="h-12 w-12 text-white" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{barber.name}</CardTitle>
                  {/* Removido specialty */}
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  {/* Removido rating e experiência */}
                  
                  {/* Removido bio */}

                  {barber.services && barber.services.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <p className="text-sm font-semibold text-primary">Especialidades:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {barber.services.map((service, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link to={`/booking?barber=${encodeURIComponent(barber.name)}`}>
                    <Button className="w-full mt-2" variant="white">
                      Agendar com {barber.name.split(' ')[0]}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Card className="glass-effect border-border/50 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Quer fazer parte da nossa equipe?</CardTitle>
                <CardDescription>
                  Estamos sempre em busca de profissionais talentosos e dedicados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Se você é um barbeiro experiente e apaixonado pelo que faz, 
                  entre em contato conosco. Oferecemos ambiente de trabalho 
                  agradável e oportunidades de crescimento.
                </p>
                <Link to="/contact">
                  <Button variant="white">
                    Entre em Contato
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

export default Barbers;