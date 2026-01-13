import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PaymentStatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg?: string;
}

const PaymentStatsCard = ({
  icon,
  label,
  value,
  bg,
}: PaymentStatsCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-2xl border shadow-sm hover:shadow-md transition-shadow",
        "border-border bg-card"
      )}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            bg
          )}
        >
          {icon}
        </div>
        <div className="flex-1">
          <CardDescription className="text-sm font-medium text-muted-foreground">
            {label}
          </CardDescription>
          <CardTitle className="text-2xl font-bold leading-none text-foreground mt-1">
            {value}
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PaymentStatsCard;
