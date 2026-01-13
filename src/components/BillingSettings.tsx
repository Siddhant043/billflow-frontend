import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap } from "lucide-react";

export function BillingSettings() {
  return (
    <div className="space-y-8">
      <Card className="rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-primary-foreground shadow-xl flex-shrink-0">
              <Zap size={48} fill="currentColor" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-1">
                BillFlow Pro Plan
              </h3>
              <p className="text-muted-foreground mb-4">
                Your next renewal is on{" "}
                <span className="font-bold text-foreground">June 24, 2024</span>
                .
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <Badge
                  variant="default"
                  className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary border border-primary/20"
                >
                  Annual Billing
                </Badge>
                <Badge
                  variant="default"
                  className="text-xs font-bold px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20"
                >
                  Active
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="px-6 py-3">
              Manage Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-primary" /> Payment Method
            </h4>
            <div className="p-4 bg-muted rounded-xl border border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-6 bg-foreground rounded flex items-center justify-center text-[10px] text-background font-bold italic">
                  VISA
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Visa ending in 4242
                  </p>
                  <p className="text-xs text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <Button variant="link" className="text-xs font-bold p-0 h-auto">
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-primary" /> Recent Invoices
            </h4>
            <div className="space-y-3">
              {[
                { id: "#INV-BF-2345", date: "Apr 24, 2024", amount: "$190.00" },
                { id: "#INV-BF-1982", date: "Mar 24, 2024", amount: "$190.00" },
              ].map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between text-xs py-2 border-b border-border last:border-0"
                >
                  <span className="font-bold text-primary">{inv.id}</span>
                  <span className="text-muted-foreground">{inv.date}</span>
                  <span className="font-bold text-foreground">
                    {inv.amount}
                  </span>
                </div>
              ))}
              <Button
                variant="link"
                className="w-full text-xs font-bold p-0 h-auto mt-2"
              >
                View Billing History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
