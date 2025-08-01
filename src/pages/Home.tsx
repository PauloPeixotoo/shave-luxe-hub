import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Home = () => {
  return (
    <Layout>
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
            <Link to="/booking">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Horário
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Acesso Rápido</h3>
            <p className="text-muted-foreground text-lg">Navegue pelo nosso site</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/services">
              <div className="card-hover glass-effect border-border/50 p-8 text-center rounded-lg border">
                <h4 className="text-2xl font-bold mb-4">Nossos Serviços</h4>
                <p className="text-muted-foreground mb-4">
                  Confira todos os serviços disponíveis com preços e durações
                </p>
                <Button className="bg-gradient-primary hover:opacity-90">
                  Ver Serviços
                </Button>
              </div>
            </Link>
            <Link to="/barbers">
              <div className="card-hover glass-effect border-border/50 p-8 text-center rounded-lg border">
                <h4 className="text-2xl font-bold mb-4">Nossos Barbeiros</h4>
                <p className="text-muted-foreground mb-4">
                  Conheça nossa equipe de profissionais especializados
                </p>
                <Button className="bg-gradient-primary hover:opacity-90">
                  Ver Barbeiros
                </Button>
              </div>
            </Link>
            <Link to="/contact">
              <div className="card-hover glass-effect border-border/50 p-8 text-center rounded-lg border">
                <h4 className="text-2xl font-bold mb-4">Contato</h4>
                <p className="text-muted-foreground mb-4">
                  Informações de localização, horários e contato
                </p>
                <Button className="bg-gradient-primary hover:opacity-90">
                  Falar Conosco
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;