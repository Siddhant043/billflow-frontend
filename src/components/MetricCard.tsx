import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  isUp?: boolean;
  sub?: string;
  bg?: string;
}

const MetricCard = ({
  title,
  value,
  icon,
  trend,
  isUp,
  sub,
  bg,
}: MetricCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-2xl border shadow-sm hover:shadow-md transition-shadow",
        "border-border bg-card"
      )}
    >
      <CardHeader className="">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            bg
          )}
        >
          {icon}
        </div>
        {trend && (
          <CardAction>
            <Badge
              variant="ghost"
              className={cn(
                "flex items-center gap-1 text-xs font-bold border-0 px-0",
                isUp
                  ? "text-emerald-600 dark:text-emerald-500"
                  : "text-red-600 dark:text-red-500"
              )}
            >
              {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trend}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardDescription className="text-sm font-medium mb-0 text-muted-foreground">
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-bold leading-none text-foreground">
          {value}
        </CardTitle>
        {sub && (
          <CardDescription className="text-xs mt-0 text-muted-foreground">
            {sub}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
