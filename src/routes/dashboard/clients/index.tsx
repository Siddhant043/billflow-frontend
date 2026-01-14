import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Mail,
  FileText,
  ArrowRight,
  EllipsisVertical,
} from "lucide-react";
import { useClientList } from "@/hooks";

export const Route = createFileRoute("/dashboard/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data } = useClientList();
  console.log(data)
  return (
    <div className="flex flex-col gap-6 px-6 py-6 md:px-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your relationship with your business clients.
          </p>
        </div>
        <Button
          className="inline-flex items-center gap-2 shadow-sm"
          onClick={() => navigate({ to: "/dashboard/clients/create" })}
        >
          <Plus size={18} />
          <span className="text-xs font-semibold uppercase tracking-wide">
            Add New Client
          </span>
        </Button>
      </div>

      {/* Client grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((client: any) => (
          <Card
            key={client.id}
            className="rounded-2xl border border-border shadow-xs hover:shadow-md transition-shadow group"
            onClick={() =>
              navigate({
                to: "/dashboard/clients/$clientDetails",
                params: { clientDetails: client.id },
              })
            }
          >
            <CardContent>
              {/* Avatar + menu */}
              <div className="flex justify-between items-start mb-6">
                <Avatar className="size-14 rounded-2xl" size="lg">
                  {client.logoUrl ? (
                    <AvatarImage src={client.logoUrl} alt={client.name} />
                  ) : (
                    <AvatarFallback>
                      {client.name.charAt(0) ?? "C"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical size={16} />
                </Button>
              </div>

              {/* Name + email */}
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {client.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
                <Mail size={14} />
                <span className="truncate">{client.email}</span>
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/40 mb-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Total Invoiced
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    ₹{client?.totalInvoiced || 0}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Outstanding
                  </p>
                  <p className="text-sm font-semibold text-primary">₹{client?.totalOutstanding || 0}</p>
                </div>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <FileText size={14} />
                  <span>{client?.totalNumberOfInvoices || 0} Invoices</span>
                </div>
                <button className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>View Profile</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add new client card */}
        <Card
          className="border-dashed border-2 border-border rounded-2xl flex flex-col items-center justify-center p-12 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-colors"
          onClick={() => navigate({ to: "/dashboard/clients/create" })}
        >
          <button className="flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
              <Plus size={24} />
            </div>
            <span className="font-semibold">Add New Client</span>
          </button>
        </Card>
      </div>
    </div>
  );
}
