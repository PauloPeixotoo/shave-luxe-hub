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
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, hsl(0,70%,45%) 0%, hsl(220,80%,60%) 60%, #fff 100%)"
              }}
            >
              Seu estilo,
            </span>
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, hsl(0,70%,45%) 0%, hsl(220,80%,60%) 60%, #fff 100%)"
              }}
            >
              nossa arte
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experimente o melhor em cortes masculinos e cuidados com a barba. 
            Agende seu horário sem complicação e venha viver a experiência premium.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/booking">
              <Button size="lg" variant="white" className="text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Horário
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="white" size="lg" className="text-lg px-8 py-6">
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
                <Button variant="white">
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
                <Button variant="white">
                  Ver Barbeiros
                </Button>
              </div>
            </Link>
            <Link to="/contact">
              <div className="card-hover glass-effect border-border/50 p-8 text-center rounded-lg border">
                <h4 className="text-2xl font-bold mb-4">Contato</h4>
                <p className="text-muted-foreground mb-4">
                  Informações de localização, telefone e WhatsApp para contato
                </p>
                <Button variant="white">
                  Falar Conosco
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* Footer apenas na Home */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-primary"></div>
                <span className="text-lg font-bold">BarberShop Premium</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A melhor experiência em barbearia da cidade.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/">Início</a></li>
                <li><a href="/services">Serviços</a></li>
                <li><a href="/barbers">Barbeiros</a></li>
                <li><a href="/booking">Agendar</a></li>
                <li><a href="/contact">Contato</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contato</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Rua das Flores, 123 - Centro</li>
                <li>São Paulo - SP, 01234-567</li>
                <li>(11) 99999-9999</li>
                <li>contato@barbershoppremium.com</li>
              </ul>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <h3 className="font-semibold">Horário de Funcionamento</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Segunda a Sexta: 9h - 20h</li>
                <li>Sábado: 9h - 18h</li>
                <li>Domingo: Fechado</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 BarberShop Premium. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Home;