import MetricCard from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  PlusIcon,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

const metrics = [
  {
    label: "Total Revenue",
    value: "₹12,450.00",
    trend: "+12.5%",
    isUp: true,
    icon: <DollarSign className="text-indigo-600" />,
    bg: "bg-indigo-50",
  },
  {
    label: "Outstanding",
    value: "₹3,840.50",
    sub: "5 invoices",
    icon: <Clock className="text-amber-600" />,
    bg: "bg-amber-50",
  },
  {
    label: "Paid This Month",
    value: "₹8,610.00",
    trend: "+5.2%",
    isUp: true,
    icon: <CheckCircle className="text-emerald-600" />,
    bg: "bg-emerald-50",
  },
  {
    label: "Overdue",
    value: "₹1,200.00",
    sub: "2 invoices",
    icon: <AlertCircle className="text-red-600" />,
    bg: "bg-red-50",
  },
];

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 px-10 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Good Morning, John Doe</h1>
          <p className="text-sm text-muted-foreground">
            Here's what's happening with your business today.
          </p>
        </div>
        <Button>
          <PlusIcon size={20} />
          <p className="text-xs font-bold">Create Invoice</p>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            title={metric.label}
            value={metric.value}
            icon={metric.icon}
            trend={metric.trend}
            isUp={metric.isUp}
            sub={metric.sub}
            bg={metric.bg}
          />
        ))}
      </div>
    </div>
  );
}
