import { Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Barbers = () => {
  const barbers = [
    { 
      name: "Carlos Silva", 
      experience: "8 anos", 
      rating: 4.9, 
      specialty: "Cortes modernos",
      bio: "Especialista em cortes modernos e degradês. Sempre atualizado com as últimas tendências.",
      services: ["Corte Clássico", "Corte Degradê", "Tratamento Capilar"]
    },
    { 
      name: "João Santos", 
      experience: "5 anos", 
      rating: 4.8, 
      specialty: "Barbas tradicionais",
      bio: "Mestre em barbas tradicionais e bigodes. Técnica refinada e atenção aos detalhes.",
      services: ["Barba & Bigode", "Barba Completa", "Corte + Barba"]
    },
    { 
      name: "Pedro Lima", 
      experience: "10 anos", 
      rating: 5.0, 
      specialty: "Penteados clássicos",
      bio: "Veterano da barbearia com vasta experiência em estilos clássicos e sofisticados.",
      services: ["Corte Clássico", "Tratamento Capilar", "Corte + Barba"]
    },
    { 
      name: "Rafael Costa", 
      experience: "3 anos", 
      rating: 4.7, 
      specialty: "Estilos jovens",
      bio: "Jovem talento com energia e criatividade para estilos modernos e ousados.",
      services: ["Corte Degradê", "Corte Clássico", "Barba & Bigode"]
    }
  ];

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Nossos Profissionais</h1>
            <p className="text-muted-foreground text-lg">Mestres em sua arte, especialistas em estilo</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {barbers.map((barber, index) => (
              <Card key={index} className="card-hover glass-effect border-border/50">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{barber.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {barber.specialty} • {barber.experience}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">{barber.rating}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm">{barber.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Serviços:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {barber.services.map((service, serviceIndex) => (
                        <span 
                          key={serviceIndex}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link to="/booking">
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Agendar com {barber.name.split(' ')[0]}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-3xl font-bold mb-6">Escolha seu barbeiro preferido</h3>
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

export default Barbers;