import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaymentStatsCard from "@/components/PaymentStatsCard";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  CreditCard,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  date: string;
  method: string;
  status: "Completed" | "Pending";
}

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-001",
    invoiceId: "inv-001",
    invoiceNumber: "INV-2024-001",
    client: "Acme Corp",
    amount: 1320,
    date: "2024-05-05",
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "pay-002",
    invoiceId: "inv-004",
    invoiceNumber: "INV-2024-012",
    client: "Global Designs",
    amount: 2500,
    date: "2024-05-12",
    method: "Stripe",
    status: "Completed",
  },
  {
    id: "pay-003",
    invoiceId: "inv-005",
    invoiceNumber: "INV-2024-015",
    client: "Stark Industries",
    amount: 5000,
    date: "2024-05-18",
    method: "Bank Transfer",
    status: "Pending",
  },
];

export const Route = createFileRoute("/dashboard/payments")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("thisMonth");

  const filteredPayments = MOCK_PAYMENTS.filter((payment) => {
    return (
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusBadgeVariant = (status: "Completed" | "Pending") => {
    if (status === "Completed") {
      return {
        variant: "default" as const,
        className:
          "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      };
    }
    return {
      variant: "default" as const,
      className:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    };
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-6 md:px-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-sm text-muted-foreground">
            Monitor all incoming funds and payment status.
          </p>
        </div>
        <Button variant="outline">
          <Download size={18} />
          <span className="text-xs font-bold">Export CSV</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PaymentStatsCard
          label="Total Received"
          value="₹45,200.00"
          icon={
            <ArrowDownLeft className="text-emerald-600 dark:text-emerald-400" />
          }
          bg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <PaymentStatsCard
          label="Pending Clear"
          value="₹2,150.50"
          icon={<Clock className="text-amber-600 dark:text-amber-400" />}
          bg="bg-amber-50 dark:bg-amber-950/30"
        />
        <PaymentStatsCard
          label="Recent Payout"
          value="₹5,000.00"
          icon={<ArrowUpRight className="text-blue-600 dark:text-blue-400" />}
          bg="bg-blue-50 dark:bg-blue-950/30"
        />
      </div>

      {/* Filters & Actions */}
      <Card className="py-0">
        <CardContent className="p-3">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 w-full md:w-auto items-center gap-4">
              <div className="flex-1 max-w-md">
                <InputGroup>
                  <InputGroupAddon>
                    <Search className="text-muted-foreground" size={18} />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="text"
                    placeholder="Search by client or invoice..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="allTime">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter size={18} />
                      <span className="text-xs font-bold">Filters</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Status</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Invoice
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Client
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Method
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">
                  Amount
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">
                  Status
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const statusBadge = getStatusBadgeVariant(payment.status);
                return (
                  <TableRow key={payment.id} className="group">
                    <TableCell className="px-4 py-3 text-sm font-medium text-muted-foreground">
                      {payment.date}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="text-sm font-bold text-primary cursor-pointer hover:underline">
                        {payment.invoiceNumber}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-semibold text-foreground">
                      {payment.client}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CreditCard
                          size={14}
                          className="text-muted-foreground"
                        />
                        <span className="text-sm text-muted-foreground">
                          {payment.method}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-bold text-foreground text-right">
                      ₹{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex justify-center">
                        <Badge
                          variant={statusBadge.variant}
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-wider border",
                            statusBadge.className
                          )}
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="More actions"
                          >
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                          <DropdownMenuItem variant="destructive">
                            Refund
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Search size={32} className="text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        No payments found matching your criteria.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardContent className="border-t px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing 1-{filteredPayments.length} of {MOCK_PAYMENTS.length}{" "}
              payments
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
