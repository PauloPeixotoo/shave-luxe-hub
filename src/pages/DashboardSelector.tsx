import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useBarberInfo } from "@/hooks/useBarberInfo";
import { useNavigate } from "react-router-dom";
import { Settings, User, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardSelector = () => {
  const { user, signOut } = useAuth();
  const { barberName } = useBarberInfo();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Escolha seu Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Olá, {barberName || user?.email}! Escolha como deseja acessar o sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dashboard Pessoal */}
          <Card className="glass-effect border-border/50 hover:shadow-lg transition-all hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Meu Dashboard</CardTitle>
              <CardDescription>
                Visualize seus agendamentos pessoais e estatísticas individuais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>✅ Seus agendamentos pessoais</p>
                <p>✅ Estatísticas individuais</p>
                <p>✅ Faturamento pessoal</p>
                <p>✅ Gerenciamento de status</p>
              </div>
              <Button 
                onClick={() => navigate("/dashboard")}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                Acessar Meu Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Painel Administrativo */}
          <Card className="glass-effect border-border/50 hover:shadow-lg transition-all hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
              <CardDescription>
                Gerencie todos os agendamentos e visualize estatísticas gerais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>✅ Todos os agendamentos</p>
                <p>✅ Estatísticas gerais</p>
                <p>✅ Gestão completa</p>
                <p>✅ Análises avançadas</p>
              </div>
              <Button 
                onClick={() => navigate("/admin")}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                size="lg"
              >
                Acessar Admin
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 mx-auto"
          >
            <LogOut className="h-4 w-4" />
            Sair do Sistema
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;
