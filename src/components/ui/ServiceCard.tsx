import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
    description: string;
  };
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export const ServiceCard = ({ service, onClick, selected, className }: ServiceCardProps) => {
  return (
    <Card 
      className={cn(
        "glass-effect border-border/50 hover:shadow-lg transition-all cursor-pointer",
        selected && "ring-2 ring-primary",
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-xl">{service.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="font-semibold text-lg">
              R$ {service.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">
              {service.duration} min
            </span>
          </div>
        </div>
        
        {selected && (
          <Badge className="w-full justify-center bg-primary text-primary-foreground">
            Selecionado
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
