import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy loading para melhor performance
const Home = lazy(() => import("@/pages/Home"));
const Index = lazy(() => import("@/pages/Index"));
const Services = lazy(() => import("@/pages/Services"));
const Barbers = lazy(() => import("@/pages/Barbers"));
const Booking = lazy(() => import("@/pages/Booking"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Login"));
const Admin = lazy(() => import("@/pages/Admin"));
const BarberDashboard = lazy(() => import("@/pages/BarberDashboard"));
const DashboardSelector = lazy(() => import("@/pages/DashboardSelector"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/index" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/barbers" element={<Barbers />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Rota de login com redirecionamento se já autenticado */}
              <Route 
                path="/login" 
                element={
                  <RedirectIfAuthenticated redirectTo="/selector">
                    <Login />
                  </RedirectIfAuthenticated>
                } 
              />
              <Route 
                path="/staff-login" 
                element={
                  <RedirectIfAuthenticated redirectTo="/selector">
                    <Login />
                  </RedirectIfAuthenticated>
                } 
              />
              
              {/* Rotas protegidas */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <BarberDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/selector" 
                element={
                  <ProtectedRoute>
                    <DashboardSelector />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rota 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          
          <Toaster />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
