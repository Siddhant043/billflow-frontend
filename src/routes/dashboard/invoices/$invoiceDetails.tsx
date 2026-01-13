import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  Download,
  Mail,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  Pencil,
  Zap,
  Trash2,
  Paperclip,
} from "lucide-react";
import { InvoiceStatus, MOCK_CLIENTS } from "@/constants";
import { MOCK_INVOICES } from "./index";
import { cn } from "@/lib/utils";
import z from "zod";

export const Route = createFileRoute("/dashboard/invoices/$invoiceDetails")({
  component: RouteComponent,
  params: z.object({
    invoiceDetails: z.string(),
  }),
});

function RouteComponent() {
  const { invoiceDetails } = Route.useParams();
  const navigate = useNavigate();
  const invoice =
    MOCK_INVOICES.find((i) => i.id === invoiceDetails) || MOCK_INVOICES[0];
  const client = MOCK_CLIENTS.find((c) => c.id === invoice.clientId);
  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatus>(
    invoice.status
  );

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return (
          <Badge className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={14} /> PAID
          </Badge>
        );
      case InvoiceStatus.OVERDUE:
        return (
          <Badge variant="destructive" className="flex items-center gap-1.5">
            <AlertCircle size={14} /> OVERDUE
          </Badge>
        );
      case InvoiceStatus.SENT:
        return (
          <Badge className="flex items-center gap-1.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            <Clock size={14} /> SENT
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1.5">
            DRAFT
          </Badge>
        );
    }
  };

  return (
    /* ROOT */
    <div className="h-full flex flex-col">
      {/* SINGLE SCROLL CONTAINER */}
      <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10 pb-20">
        {/* ================= HEADER ACTIONS ================= */}
        <Card>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link to="/dashboard/invoices">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl"
                  >
                    <ChevronLeft size={24} />
                  </Button>
                </Link>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-xl font-bold">
                      {invoice.invoiceNumber}
                    </h1>
                    {getStatusBadge(invoiceStatus)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created on {invoice.issueDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Download size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download invoice</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Mail size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send invoice via email</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Printer size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Print invoice</TooltipContent>
                </Tooltip>
                <Separator orientation="vertical" className="h-8 mx-2" />
                <Button>
                  <Link
                    to="/dashboard/invoices/edit/$editInvoiceId"
                    className="flex items-center gap-2"
                    params={{ editInvoiceId: invoiceDetails }}
                  >
                    <Pencil size={18} />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
          {/* ================= MAIN DOCUMENT ================= */}
          <Card className="lg:col-span-8 min-h-[800px]">
            <CardContent className="p-12">
              <div className="flex justify-between items-start mb-16">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
                    <Zap size={28} fill="currentColor" />
                  </div>
                  <span className="text-2xl font-bold">BillFlow</span>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-light">INVOICE</h2>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">
                    Original Copy
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 mb-16">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">
                    Issued By
                  </h4>
                  <p className="font-bold">Alex Rivera</p>
                  <p className="text-sm text-muted-foreground">
                    789 Studio Ave, Suite 200
                    <br />
                    San Francisco, CA 94103
                  </p>
                  <p className="text-sm text-muted-foreground">
                    billing@alexrivera.com
                  </p>
                </div>

                <div className="text-right">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">
                    Billed To
                  </h4>
                  <p className="font-bold">{invoice.clientName}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {client?.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {client?.email}
                  </p>
                </div>
              </div>

              {/* TABLE */}
              <div className="mb-16 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2">
                      <TableHead>Description</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <p className="font-bold">{item.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Professional service rendering for Q2 projects.
                          </p>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          ₹{item.rate.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          ₹{item.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* TOTALS */}
              <div className="flex justify-end mb-16">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₹{invoice.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax ({invoice.taxRate}%)</span>
                    <span className="font-semibold">
                      ₹{invoice.taxAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span className="text-destructive font-semibold">
                      -₹{invoice.discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t-2">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-lg font-bold text-primary">
                      ₹{invoice.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* PAYMENT TERMS */}
              <div className="pt-16 border-t">
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">
                  Payment Terms
                </h4>
                <p className="text-xs text-muted-foreground max-w-md">
                  Please pay within 15 days from the date of issuance. Late
                  payments are subject to a 2% monthly interest charge.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ================= SIDEBAR ================= */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase">
                  Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-1.5 before:border-l">
                  {[
                    "Payment Received",
                    "Invoice Viewed",
                    "Invoice Sent",
                    "Invoice Created",
                  ].map((title, idx) => (
                    <div
                      key={idx}
                      className="relative flex items-start gap-4 pl-8"
                    >
                      <div
                        className={cn(
                          "absolute left-[-2px] w-4 h-4 rounded-full border-4 border-accent shadow-sm flex items-center justify-center",
                          idx === 0 ? "bg-emerald-500" : "bg-muted-foreground"
                        )}
                      />
                      <div>
                        <p className="text-sm font-bold">{title}</p>
                        <p className="text-xs text-muted-foreground">
                          May 12, 2024 • 10:45 AM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase">
                  Related Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Update Status
                  </label>
                  <Select
                    value={invoiceStatus}
                    onValueChange={(value) =>
                      setInvoiceStatus(value as InvoiceStatus)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={InvoiceStatus.DRAFT}>Draft</SelectItem>
                      <SelectItem value={InvoiceStatus.SENT}>Sent</SelectItem>
                      <SelectItem value={InvoiceStatus.PAID}>Paid</SelectItem>
                      <SelectItem value={InvoiceStatus.OVERDUE}>
                        Overdue
                      </SelectItem>
                      <SelectItem value={InvoiceStatus.CANCELLED}>
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Paperclip size={16} />
                  Attach Receipt
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                  Cancel Invoice
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
