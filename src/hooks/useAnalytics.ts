import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  const trackPageView = (path: string) => {
    // Simular analytics - em produção, integrar com Google Analytics, Mixpanel, etc.
    console.log('📊 Page View:', path);
    
    // Exemplo de integração com Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
      });
    }
  };

  const trackEvent = ({ event, properties }: AnalyticsEvent) => {
    console.log('📊 Event:', event, properties);
    
    // Exemplo de integração com Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
  };

  const trackBooking = (serviceName: string, barberName: string, price: number) => {
    trackEvent({
      event: 'booking_created',
      properties: {
        service_name: serviceName,
        barber_name: barberName,
        price: price,
        currency: 'BRL'
      }
    });
  };

  const trackContact = (subject: string) => {
    trackEvent({
      event: 'contact_form_submitted',
      properties: {
        subject: subject
      }
    });
  };

  const trackLogin = (userEmail: string) => {
    trackEvent({
      event: 'user_login',
      properties: {
        user_email: userEmail
      }
    });
  };

  const trackServiceView = (serviceName: string) => {
    trackEvent({
      event: 'service_viewed',
      properties: {
        service_name: serviceName
      }
    });
  };

  return {
    trackPageView,
    trackEvent,
    trackBooking,
    trackContact,
    trackLogin,
    trackServiceView
  };
};
