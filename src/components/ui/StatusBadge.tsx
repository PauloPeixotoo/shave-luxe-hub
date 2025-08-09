import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  showIcon?: boolean;
  className?: string;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "confirmed":
      return {
        text: "Confirmado",
        icon: CheckCircle,
        className: "bg-green-500/10 text-green-500 border-green-500/20"
      };
    case "pending":
      return {
        text: "Pendente",
        icon: AlertCircle,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      };
    case "completed":
      return {
        text: "Concluído",
        icon: CheckCircle,
        className: "bg-blue-500/10 text-blue-500 border-blue-500/20"
      };
    case "cancelled":
      return {
        text: "Cancelado",
        icon: XCircle,
        className: "bg-red-500/10 text-red-500 border-red-500/20"
      };
    default:
      return {
        text: status,
        icon: Clock,
        className: "bg-gray-500/10 text-gray-500 border-gray-500/20"
      };
  }
};

export const StatusBadge = ({ status, showIcon = true, className }: StatusBadgeProps) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge className={cn(config.className, className)}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.text}
    </Badge>
  );
};
