import { useState, useEffect } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_CLIENTS } from "@/constants";
import { MOCK_INVOICES } from "../index";
import type { LineItem } from "@/types";
import {
  ArrowLeft,
  IndianRupee,
  Plus,
  Save,
  Send,
  Trash2,
  Zap,
} from "lucide-react";
import z from "zod";

export const Route = createFileRoute("/dashboard/invoices/edit/$editInvoiceId")(
  {
    component: RouteComponent,
    params: z.object({
      editInvoiceId: z.string(),
    }),
  }
);

function RouteComponent() {
  const { editInvoiceId } = Route.useParams();
  const invoice =
    MOCK_INVOICES.find((i) => i.id === editInvoiceId) || MOCK_INVOICES[0];

  const [items, setItems] = useState<LineItem[]>(invoice.items || []);
  const [clientId, setClientId] = useState(invoice.clientId);
  const [invoiceNumber, setInvoiceNumber] = useState(invoice.invoiceNumber);
  const [issueDate, setIssueDate] = useState(invoice.issueDate);
  const [dueDate, setDueDate] = useState(invoice.dueDate);
  const [taxRate, setTaxRate] = useState(invoice.taxRate);
  const [notes, setNotes] = useState(invoice.notes || "");

  // Update items when invoice changes
  useEffect(() => {
    if (invoice) {
      setItems(invoice.items || []);
      setClientId(invoice.clientId);
      setInvoiceNumber(invoice.invoiceNumber);
      setIssueDate(invoice.issueDate);
      setDueDate(invoice.dueDate);
      setTaxRate(invoice.taxRate);
      setNotes(invoice.notes || "");
    }
  }, [invoice.id]);

  const updateItem = (
    id: string,
    field: keyof LineItem,
    value: number | string
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updated: LineItem = { ...item, [field]: value as never };
        if (field === "quantity" || field === "rate") {
          const quantity =
            field === "quantity" ? (value as number) : updated.quantity;
          const rate = field === "rate" ? (value as number) : updated.rate;
          updated.amount = quantity * rate;
        }
        return updated;
      })
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2, 11),
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const discount = invoice.discount || 0;
  const total = subtotal + taxAmount - discount;

  const selectedClient =
    MOCK_CLIENTS.find((c) => c.id === clientId) ?? MOCK_CLIENTS[0];

  return (
    <div className="flex flex-col gap-6 px-6 py-6 md:px-10 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/invoices">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Invoice</h1>
            <p className="text-sm text-muted-foreground">
              Update invoice details and preview changes in real time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Save size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Save Changes
            </span>
          </Button>
          <Button className="gap-2">
            <Send size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Update &amp; Send
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form column */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-6">
              {/* Client + invoice number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Client
                  </label>
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {MOCK_CLIENTS.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Invoice Number
                  </label>
                  <Input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="rounded-xl bg-muted/40"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Issue Date
                  </label>
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="rounded-xl bg-muted/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="rounded-xl bg-muted/40"
                  />
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Items
                  </label>
                  <button
                    type="button"
                    className="text-xs font-semibold text-primary flex items-center gap-1"
                    onClick={addItem}
                  >
                    <Plus size={14} />
                    Add line item
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-3 items-end"
                  >
                    <div className="col-span-6">
                      <Input
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        className="bg-muted/40 rounded-lg text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        min={0}
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number(e.target.value) || 0
                          )
                        }
                        className="bg-muted/40 rounded-lg text-sm"
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <IndianRupee
                          size={14}
                          className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          type="number"
                          min={0}
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "rate",
                              Number(e.target.value) || 0
                            )
                          }
                          className="bg-muted/40 rounded-lg text-sm pl-7"
                        />
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center pb-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals + tax */}
              <div className="space-y-3 pt-4 border-t border-border/60">
                <div className="flex justify-end gap-10 text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Tax</span>
                    <Input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                      className="w-16 h-8 bg-muted/40 rounded-md text-center text-sm"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ₹{taxAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end gap-10 text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-semibold text-destructive">
                    -₹{discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end gap-10 pt-3 border-t border-border/60">
                  <span className="text-lg font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-primary">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2 pt-4">
                <label className="text-sm font-medium text-foreground">
                  Notes (optional)
                </label>
                <Textarea
                  rows={3}
                  placeholder="Include payment details or a friendly message..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="rounded-xl bg-muted/40 text-sm resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live preview column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <Card className="rounded-2xl shadow-lg min-h-[700px] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-foreground text-background text-[10px]">
              <span className="font-semibold tracking-[0.2em]">
                LIVE PREVIEW
              </span>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-background/40" />
                <span className="w-2 h-2 rounded-full bg-background/40" />
                <span className="w-2 h-2 rounded-full bg-background/40" />
              </div>
            </div>
            <CardContent className="p-8 flex-1 flex flex-col">
              {/* Invoice header */}
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    <Zap size={22} />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    BillFlow
                  </span>
                </div>
                <div className="text-right">
                  <h2 className="text-3xl font-light text-foreground tracking-tight">
                    INVOICE
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    #{invoiceNumber}
                  </p>
                </div>
              </div>

              {/* Billed to + details */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Billed To
                  </h4>
                  <p className="font-semibold text-foreground">
                    {selectedClient?.name}
                  </p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedClient?.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedClient?.email}
                  </p>
                </div>
                <div className="text-right">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Invoice Details
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-end gap-3">
                      <span className="text-muted-foreground">Issued:</span>
                      <span className="text-foreground font-medium">
                        {issueDate}
                      </span>
                    </div>
                    <div className="flex justify-end gap-3">
                      <span className="text-muted-foreground">Due:</span>
                      <span className="text-foreground font-medium">
                        {dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items table */}
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Description
                    </th>
                    <th className="text-center py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Qty
                    </th>
                    <th className="text-right py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Rate
                    </th>
                    <th className="text-right py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 text-sm text-foreground font-medium">
                        {item.description || (
                          <span className="text-muted-foreground/60 italic">
                            No description
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-sm text-muted-foreground text-center">
                        {item.quantity}
                      </td>
                      <td className="py-3 text-sm text-muted-foreground text-right">
                        ₹{item.rate.toFixed(2)}
                      </td>
                      <td className="py-3 text-sm text-foreground font-semibold text-right">
                        ₹{item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Preview totals */}
              <div className="space-y-2 mt-auto">
                <div className="flex justify-end gap-8 text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-semibold w-24 text-right">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                {taxRate > 0 && (
                  <div className="flex justify-end gap-8 text-sm">
                    <span className="text-muted-foreground">
                      Tax ({taxRate}%)
                    </span>
                    <span className="text-foreground font-semibold w-24 text-right">
                      ₹{taxAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-end gap-8 text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-destructive font-semibold w-24 text-right">
                      -₹{discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-end gap-8 pt-3 border-t border-border/60">
                  <span className="text-lg font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-primary w-32 text-right">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Notes preview */}
              {notes && (
                <div className="mt-8 rounded-xl bg-muted/60 px-4 py-3">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                    Notes
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notes}
                  </p>
                </div>
              )}

              <div className="mt-8 text-center">
                <p className="text-xs text-muted-foreground">
                  Thank you for your business!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
