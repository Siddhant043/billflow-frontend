import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronLeft,
  Save,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  FilePlus,
  Camera,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/clients/create")({
  component: RouteComponent,
});

interface ClientFormData {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  taxId: string;
  notes: string;
}

function RouteComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    taxId: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate({ to: "/dashboard/clients" });
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving client:", formData);
    navigate({ to: "/dashboard/clients" });
  };

  const handleSaveAndCreateInvoice = () => {
    // TODO: Implement save and create invoice logic
    console.log("Saving client and creating invoice:", formData);
    navigate({ to: "/dashboard/clients" });
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-6 md:px-10 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/clients">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Add New Client</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save size={18} />
            Save Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-2xl">
            <CardContent className="p-8 space-y-8">
              {/* Primary Details */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-primary border-b border-border pb-2">
                  <Building size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    Business Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Company Name *
                    </label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-xl bg-muted/40"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Primary Contact Person
                    </label>
                    <Input
                      name="contactPerson"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="rounded-xl bg-muted/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="billing@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-xl bg-muted/40"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-xl bg-muted/40"
                    />
                  </div>
                </div>
              </section>

              {/* Additional Details */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-primary border-b border-border pb-2">
                  <MapPin size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    Billing & Tax
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Billing Address
                    </label>
                    <Textarea
                      name="address"
                      rows={3}
                      placeholder="Street address, City, State, Zip"
                      value={formData.address}
                      onChange={handleChange}
                      className="rounded-xl bg-muted/40 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Website
                      </label>
                      <Input
                        name="website"
                        type="url"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={handleChange}
                        className="rounded-xl bg-muted/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Tax ID / VAT Number
                      </label>
                      <Input
                        name="taxId"
                        type="text"
                        placeholder="e.g. US12345678"
                        value={formData.taxId}
                        onChange={handleChange}
                        className="rounded-xl bg-muted/40"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Notes */}
              <section className="space-y-4">
                <label className="text-sm font-semibold text-foreground">
                  Private Notes (Internal only)
                </label>
                <Textarea
                  name="notes"
                  rows={3}
                  placeholder="Mention specific preferences, contract links, or internal tags..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="rounded-xl bg-muted/40 resize-none"
                />
              </section>
            </CardContent>
          </Card>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          <Card className="rounded-2xl sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">
                Client Card Preview
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <Avatar className="w-16 h-16 border border-border bg-muted">
                      <AvatarFallback>
                        <User size={32} className="text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer rounded-full">
                      <Camera size={16} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground truncate max-w-[150px]">
                      {formData.name || "New Client"}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formData.contactPerson || "No contact specified"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail size={14} className="text-muted-foreground" />
                    <span className="truncate">
                      {formData.email || "No email set"}
                    </span>
                  </div>
                  {formData.phone && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone size={14} className="text-muted-foreground" />
                      <span>{formData.phone}</span>
                    </div>
                  )}
                  {formData.address && (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <MapPin
                        size={14}
                        className="text-muted-foreground mt-0.5"
                      />
                      <span className="truncate">{formData.address}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-border">
                  <Button
                    onClick={handleSaveAndCreateInvoice}
                    variant="outline"
                    className="w-full gap-2 bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    <FilePlus size={16} />
                    Save & Create Invoice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-muted border border-border">
            <CardContent className="p-6">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Pro Tip
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Adding a tax ID ensures your invoices meet legal requirements
                for international clients automatically.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
