import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MOCK_CLIENTS } from "@/constants";
import { MOCK_INVOICES } from "../invoices/index";
import { InvoiceStatus } from "@/constants";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  Plus,
  ChevronRight,
  FileText,
  DollarSign,
  Search,
  MoreVertical,
  Star,
  IndianRupee,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/clients/$clientDetails")({
  component: RouteComponent,
});

function RouteComponent() {
  const { clientDetails: clientId } = useParams({
    from: "/dashboard/clients/$clientDetails",
  });
  const client = MOCK_CLIENTS.find((c) => c.id === clientId) || MOCK_CLIENTS[0];
  const [activeTab, setActiveTab] = useState("invoices");

  const clientInvoices = MOCK_INVOICES.filter(
    (inv) => inv.clientId === client.id
  );

  const totalInvoiced = clientInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const outstandingInvoices = clientInvoices.filter(
    (inv) => inv.status !== InvoiceStatus.PAID
  );
  const outstandingAmount = outstandingInvoices.reduce(
    (sum, inv) => sum + inv.total,
    0
  );

  const getStatusBadgeVariant = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return "default";
      case InvoiceStatus.SENT:
        return "secondary";
      case InvoiceStatus.OVERDUE:
        return "destructive";
      case InvoiceStatus.DRAFT:
        return "outline";
      case InvoiceStatus.CANCELLED:
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-8 px-6 py-6 md:px-10 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/clients">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
          <p className="text-sm text-muted-foreground">
            Client since January 2024
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side - Info Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Client Info Card */}
          <Card className="rounded-2xl border border-border shadow-sm overflow-hidden">
            <CardContent className="px-6 py-2">
              <div className="mb-6">
                <Avatar className="w-24 h-24 rounded-2xl border-4 border-background shadow-lg">
                  {client.avatar ? (
                    <AvatarImage src={client.avatar} alt={client.name} />
                  ) : (
                    <AvatarFallback className="text-lg font-bold">
                      {client.name.charAt(0) ?? "C"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {client.name}
                  </h2>
                  <Badge
                    variant="default"
                    className="mt-1 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  >
                    VIP Partner
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <Star size={20} />
                </Button>
              </div>

              <div className="space-y-4 text-sm border-t border-border pt-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail size={18} className="text-muted-foreground" />
                  {client.email}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone size={18} className="text-muted-foreground" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={18} className="text-muted-foreground" />
                  {client.address}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Globe size={18} className="text-muted-foreground" />
                  www.acmecorp.com
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
                <Button variant="outline" className="text-sm font-bold">
                  Edit Info
                </Button>
                <Button
                  variant="outline"
                  className="text-sm font-bold text-destructive hover:bg-destructive/10"
                >
                  Archive
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Balance Card */}
          <Card className="rounded-2xl bg-primary text-primary-foreground shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={20} />
                <h3 className="font-bold">Account Balance</h3>
              </div>
              <p className="text-3xl font-extrabold mb-1">
                <IndianRupee size={28} className="inline" />
                {outstandingAmount.toFixed(2)}
              </p>
              <p className="text-xs text-primary-foreground/70">
                Total lifetime value of{" "}
                <IndianRupee size={12} className="inline" />
                {totalInvoiced.toFixed(2)}
              </p>
              <Link to="/dashboard/invoices/create">
                <Button
                  variant="secondary"
                  className="mt-6 w-full bg-background/20 hover:bg-background/30 text-primary-foreground"
                >
                  New Invoice
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Tabs Content */}
        <div className="lg:col-span-8 space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList
              variant="default"
              className="border-b border-border pb-px bg-accent px-4 "
            >
              <TabsTrigger value="invoices" className="capitalize">
                Invoices
              </TabsTrigger>
              <TabsTrigger value="payments" className="capitalize">
                Payments
              </TabsTrigger>
              <TabsTrigger value="notes" className="capitalize">
                Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoices" className="space-y-4 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="relative max-w-xs flex-1">
                  <InputGroup>
                    <InputGroupAddon>
                      <Search size={16} />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="text"
                      placeholder="Search invoices..."
                      className="pl-10"
                    />
                  </InputGroup>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={20} />
                </Button>
              </div>

              {clientInvoices.length > 0 ? (
                <div className="flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
                  {clientInvoices.map((inv) => (
                    <Link
                      key={inv.id}
                      to="/dashboard/invoices/$invoiceDetails"
                      params={{ invoiceDetails: inv.id }}
                    >
                      <Card className="rounded-2xl border border-border hover:shadow-md transition-all group cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-xl flex items-center justify-center",
                                  inv.status === InvoiceStatus.PAID
                                    ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                                    : "bg-primary/10 text-primary"
                                )}
                              >
                                <FileText size={20} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                  {inv.invoiceNumber}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Issued {inv.issueDate}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex items-center gap-6">
                              <div className="hidden sm:block">
                                <p className="text-sm font-bold text-foreground">
                                  <IndianRupee size={14} className="inline" />
                                  {inv.total.toFixed(2)}
                                </p>
                                <Badge
                                  variant={getStatusBadgeVariant(inv.status)}
                                  className="text-[10px] font-bold uppercase mt-1"
                                >
                                  {inv.status}
                                </Badge>
                              </div>
                              <ChevronRight
                                size={18}
                                className="text-muted-foreground"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="rounded-2xl border border-border">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <FileText size={32} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        No invoices found
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This client doesn't have any invoices yet.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <Card className="rounded-2xl border border-border">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <DollarSign size={32} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      No recent payments
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Transactions will appear here once they are processed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-6 space-y-4">
              <Card className="rounded-2xl border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://picsum.photos/seed/user/32/32" />
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          Alex Rivera
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Today at 11:20 AM
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Client mentioned they prefer Net-15 terms for the upcoming
                    rebranding project. Ensure we update the next invoice
                    template accordingly.
                  </p>
                </CardContent>
              </Card>
              <Button
                variant="outline"
                className="w-full py-4 border-dashed border-2"
              >
                <Plus size={20} className="mr-2" />
                Add Private Note
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
