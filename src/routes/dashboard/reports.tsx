import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  TrendingUp,
  Calendar,
  Download,
  ChevronDown,
  BarChart2,
  Activity,
  UserCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/reports")({
  component: RouteComponent,
});

// Mock data from demo
const REVENUE_DATA = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
];

const PIE_DATA = [
  { name: "Paid", value: 75, color: "var(--success)" },
  { name: "Overdue", value: 15, color: "var(--destructive)" },
  { name: "Sent", value: 10, color: "var(--primary)" },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
  lastPeriod: {
    label: "Last Period",
    color: "var(--primary)",
  },
};

const TOP_CLIENTS = [
  { name: "Acme Corp", revenue: "$12,450.00", count: 18, growth: "+24%" },
  { name: "Global Designs", revenue: "$8,200.00", count: 12, growth: "+12%" },
  { name: "Stark Industries", revenue: "$7,150.00", count: 5, growth: "+45%" },
  { name: "Hooli Inc", revenue: "$4,300.00", count: 3, growth: "-2%" },
];

function RouteComponent() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10 pb-20 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Analytics & Reports
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your business performance and growth.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select defaultValue="yearly">
              <SelectTrigger className="w-[160px]">
                <Calendar size={18} className="mr-2" />
                <SelectValue placeholder="Yearly View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly View</SelectItem>
                <SelectItem value="quarterly">Quarterly View</SelectItem>
                <SelectItem value="yearly">Yearly View</SelectItem>
              </SelectContent>
            </Select>

            <Button className="gap-2">
              <Download size={18} />
              Full Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              label: "Avg Payment Time",
              value: "4.2 Days",
              trend: "-15%",
              isUp: true,
              icon: <Activity className="text-emerald-500" />,
            },
            {
              label: "Conversion Rate",
              value: "92.4%",
              trend: "+4%",
              isUp: true,
              icon: <TrendingUp className="text-primary" />,
            },
            {
              label: "Retention Rate",
              value: "88%",
              trend: "+2%",
              isUp: true,
              icon: <UserCheck className="text-violet-500" />,
            },
            {
              label: "Avg Invoice Value",
              value: "$2,840",
              trend: "-2%",
              isUp: false,
              icon: <BarChart2 className="text-amber-500" />,
            },
          ].map((card, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-bold",
                      card.isUp ? "text-emerald-600" : "text-destructive"
                    )}
                  >
                    {card.trend}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                  {card.label}
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  {card.value}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue Growth Chart */}
          <Card className="lg:col-span-8 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">
                  Revenue Growth
                </CardTitle>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-xs text-muted-foreground font-medium">
                      Revenue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                    <span className="text-xs text-muted-foreground font-medium">
                      Last Period
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px]">
                <AreaChart data={REVENUE_DATA}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/50"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                    tickFormatter={(v) => `₹${v / 1000}k`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [
                          `₹${value?.toLocaleString()}`,
                          "Revenue",
                        ]}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--primary)"
                    strokeWidth={4}
                    fillOpacity={0.1}
                    fill="var(--primary)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Invoice Status Pie Chart */}
          <Card className="lg:col-span-4 rounded-2xl flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Invoice Status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center">
              <div className="h-[175px] w-full relative">
                <ChartContainer config={chartConfig} className="h-full">
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => [`${value}%`, ""]}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-foreground">
                      75%
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Paid Rate
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full mt-8 space-y-4">
                {PIE_DATA.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Clients Table */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Top Performing Clients
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Client
                    </TableHead>
                    <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Total Revenue
                    </TableHead>
                    <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Invoices
                    </TableHead>
                    <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">
                      Growth
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOP_CLIENTS.map((client, i) => (
                    <TableRow key={i} className="hover:bg-muted/50">
                      <TableCell className="px-6 py-4 text-sm font-bold">
                        {client.name}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm font-medium">
                        {client.revenue}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm">
                        {client.count}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm font-bold text-right">
                        <span
                          className={cn(
                            client.growth.startsWith("+")
                              ? "text-emerald-600"
                              : "text-destructive"
                          )}
                        >
                          {client.growth}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
