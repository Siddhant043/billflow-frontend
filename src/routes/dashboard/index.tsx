import { useState } from "react";
import MetricCard from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  DollarSign,
  PlusIcon,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

const metrics = [
  {
    label: "Total Revenue",
    value: "₹12,450.00",
    trend: "+12.5%",
    isUp: true,
    icon: <DollarSign className="text-indigo-600 dark:text-indigo-400" />,
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    label: "Outstanding",
    value: "₹3,840.50",
    sub: "5 invoices",
    icon: <Clock className="text-amber-600 dark:text-amber-400" />,
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    label: "Paid This Month",
    value: "₹8,610.00",
    trend: "+5.2%",
    isUp: true,
    icon: <CheckCircle className="text-emerald-600 dark:text-emerald-400" />,
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    label: "Overdue",
    value: "₹1,200.00",
    sub: "2 invoices",
    icon: <AlertCircle className="text-red-600 dark:text-red-400" />,
    bg: "bg-red-50 dark:bg-red-950/30",
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 6100 },
  { month: "May", revenue: 5500 },
  { month: "Jun", revenue: 7200 },
];

const RECENT_INVOICES = [
  {
    id: "INV-001",
    clientName: "Acme Corp",
    invoiceNumber: "INV-001",
    issueDate: "2024-01-15",
    total: 1250.0,
    status: "Paid" as const,
  },
  {
    id: "INV-002",
    clientName: "Tech Solutions",
    invoiceNumber: "INV-002",
    issueDate: "2024-01-14",
    total: 890.0,
    status: "Pending" as const,
  },
  {
    id: "INV-003",
    clientName: "Design Studio",
    invoiceNumber: "INV-003",
    issueDate: "2024-01-13",
    total: 2100.0,
    status: "Overdue" as const,
  },
  {
    id: "INV-004",
    clientName: "Marketing Agency",
    invoiceNumber: "INV-004",
    issueDate: "2024-01-12",
    total: 750.0,
    status: "Pending" as const,
  },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies Record<string, { label: string; color: string }>;

function RouteComponent() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className="flex flex-col gap-4 px-6 py-6 md:px-10 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground">
            Good Morning, John Doe!
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's what's happening with your business today.
          </p>
        </div>
        <Button onClick={() => navigate({ to: "/dashboard/invoices/create" })}>
          <PlusIcon size={20} />
          <span className="text-xs font-bold">Create Invoice</span>
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Charts and Recent Activity */}
      <div className="h-3/5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Tracking your income over the last 6 months.
                </CardDescription>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart
                data={REVENUE_DATA}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "var(--muted-foreground)" }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      formatter={(value) => [`₹${value}`, "Revenue"]}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--chart-3)"
                  fill="url(#fillRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Invoices</CardTitle>
              <Button variant="link" asChild className="h-auto p-0">
                <Link to="/dashboard/invoices">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-full items-stretch">
            <div className="flex flex-col">
              {RECENT_INVOICES.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                        {
                          "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400":
                            invoice.status === "Paid",
                          "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400":
                            invoice.status === "Overdue",
                          "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400":
                            invoice.status === "Pending",
                        }
                      )}
                    >
                      {invoice.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {invoice.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.invoiceNumber} • {invoice.issueDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">
                      ₹{invoice.total.toFixed(2)}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider",
                        {
                          "text-emerald-600 dark:text-emerald-400":
                            invoice.status === "Paid",
                          "text-red-600 dark:text-red-400":
                            invoice.status === "Overdue",
                          "text-indigo-600 dark:text-indigo-400":
                            invoice.status === "Pending",
                        }
                      )}
                    >
                      {invoice.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center h-full">
              <Button variant="outline" className="w-full h-12" asChild>
                <Link to="/dashboard/reports">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
