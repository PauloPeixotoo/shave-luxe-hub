import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Scissors, 
  Users, 
  Calendar, 
  Phone, 
  LogIn,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, role } = useAuth();

  const navigation = [
    { name: "Início", href: "/", icon: Home },
    { name: "Serviços", href: "/services", icon: Scissors },
    { name: "Barbeiros", href: "/barbers", icon: Users },
    { name: "Agendar", href: "/booking", icon: Calendar },
    { name: "Contato", href: "/contact", icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;
  // Hide header only when a logged-in barber is on dashboard pages
  const hideHeaderOnBarberPages = Boolean(isAuthenticated && role === 'barber' && (
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/selector')
  ));
 
  return (
    <div className="min-h-screen bg-background">
      {/* Header (hidden on barber pages) */}
      {!hideHeaderOnBarberPages && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary"></div>
                <span className="text-xl font-bold">BarberShop Premium</span>
              </Link>

              {/* Desktop Navigation - hidden when authenticated */}
              <nav className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-gray-400 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Login / Logout Button */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Login removed from header to avoid clients clicking it. Staff can access via /staff-login or /login directly. */}
              </div>

              {/* Mobile Menu Button - hide when authenticated */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-background">
              <div className="container mx-auto px-4 py-4">
                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-gray-400 hover:text-white"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  <div className="pt-2 border-t">
                    {/* Login removed from mobile menu to avoid clients clicking it. Staff can access via /staff-login or /login directly. */}
                   </div>
                 </nav>
               </div>
             </div>
           )}
        </header>
      )}
 
       {/* Main Content */}
       <main className="flex-1">
         {children}
       </main>
 
     </div>
   );
 };
 
 export default Layout;