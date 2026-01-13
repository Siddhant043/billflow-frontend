import { useState } from "react";
import { InvoiceStatus } from "@/constants";
import type { Invoice } from "@/types";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Eye,
  Filter,
  Mail,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2024-001",
    clientId: "1",
    clientName: "Acme Corp",
    issueDate: "2024-05-01",
    dueDate: "2024-05-15",
    items: [
      {
        id: "li-1",
        description: "Website Redesign",
        quantity: 1,
        rate: 1000,
        amount: 1000,
      },
      {
        id: "li-2",
        description: "SEO Audit",
        quantity: 1,
        rate: 200,
        amount: 200,
      },
    ],
    subtotal: 1200,
    taxRate: 10,
    taxAmount: 120,
    discount: 0,
    total: 1320,
    status: InvoiceStatus.PAID,
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2024-002",
    clientId: "2",
    clientName: "Global Designs",
    issueDate: "2024-05-10",
    dueDate: "2024-05-24",
    items: [
      {
        id: "li-3",
        description: "Logo Design",
        quantity: 3,
        rate: 1500,
        amount: 4500,
      },
    ],
    subtotal: 4500,
    taxRate: 15,
    taxAmount: 675,
    discount: 500,
    total: 4675,
    status: InvoiceStatus.SENT,
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2024-003",
    clientId: "1",
    clientName: "Acme Corp",
    issueDate: "2024-04-20",
    dueDate: "2024-05-04",
    items: [
      {
        id: "li-4",
        description: "Monthly Maintenance",
        quantity: 1,
        rate: 800,
        amount: 800,
      },
    ],
    subtotal: 800,
    taxRate: 10,
    taxAmount: 80,
    discount: 0,
    total: 880,
    status: InvoiceStatus.OVERDUE,
  },
];

export const Route = createFileRoute("/dashboard/invoices/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("invoice");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredInvoices = MOCK_INVOICES.filter((inv) => {
    const matchesSearch =
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    let result = 0;
    switch (sortBy) {
      case "invoice":
        result = a.invoiceNumber.localeCompare(b.invoiceNumber);
        break;
      case "client":
        result = a.clientName.localeCompare(b.clientName);
        break;
      case "issueDate":
        result =
          new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
        break;
      case "dueDate":
        result = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case "status":
        result = a.status.localeCompare(b.status);
        break;
      default:
        return 0;
    }
    return sortDirection === "asc" ? result : -result;
  });

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getStatusBadgeVariant = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return {
          variant: "default" as const,
          className:
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
        };
      case InvoiceStatus.SENT:
        return {
          variant: "default" as const,
          className:
            "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
        };
      case InvoiceStatus.OVERDUE:
        return {
          variant: "destructive" as const,
          className: "border-red-200 dark:border-red-800",
        };
      case InvoiceStatus.DRAFT:
        return {
          variant: "outline" as const,
          className: "",
        };
      default:
        return {
          variant: "outline" as const,
          className: "",
        };
    }
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-6 md:px-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your client billing in one place.
          </p>
        </div>
        <Button onClick={() => navigate({ to: "/dashboard/invoices/create" })}>
          <Plus size={18} />
          <span className="text-xs font-bold">Create Invoice</span>
        </Button>
      </div>

      {/* Filters & Actions */}
      <Card className="py-0">
        <CardContent className="p-3">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 w-full md:w-auto items-center gap-4">
              <div className="flex-1 max-w-sm">
                <InputGroup>
                  <InputGroupAddon>
                    <Search className="text-muted-foreground" size={18} />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="text"
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value={InvoiceStatus.PAID}>Paid</SelectItem>
                    <SelectItem value={InvoiceStatus.SENT}>Sent</SelectItem>
                    <SelectItem value={InvoiceStatus.OVERDUE}>
                      Overdue
                    </SelectItem>
                    <SelectItem value={InvoiceStatus.DRAFT}>Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Download size={20} />
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <ArrowUpDown size={16} className="mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="issueDate">Issue Date</SelectItem>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSortDirection}
                title={`Sort ${sortDirection === "asc" ? "Descending" : "Ascending"}`}
              >
                {sortDirection === "asc" ? (
                  <ArrowUp size={20} />
                ) : (
                  <ArrowDown size={20} />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Table */}
      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Invoice #
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Client
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Issue Date
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Due Date
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
              {sortedInvoices.map((inv) => {
                const statusBadge = getStatusBadgeVariant(inv.status);
                return (
                  <TableRow key={inv.id} className="group">
                    <TableCell className="px-4 py-3">
                      <Link
                        to="/dashboard/invoices/$invoiceDetails"
                        params={{ invoiceDetails: inv.id }}
                        className="text-sm font-bold text-primary cursor-pointer hover:underline"
                      >
                        {inv.invoiceNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                          {inv.clientName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {inv.clientName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                      {inv.issueDate}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                      {inv.dueDate}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-bold text-foreground text-right">
                      ₹{inv.total.toLocaleString()}
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
                          {inv.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Send Email"
                        >
                          <Mail size={16} />
                        </Button>
                        <Link
                          to="/dashboard/invoices/$invoiceDetails"
                          params={{ invoiceDetails: inv.id }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="View Invoice"
                          >
                            <Eye size={16} />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="Delete Invoice"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {sortedInvoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Search size={32} className="text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        No invoices found matching your criteria.
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
              Showing 1-{sortedInvoices.length} of {MOCK_INVOICES.length}{" "}
              invoices
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
