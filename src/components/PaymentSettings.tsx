import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Plus, CheckCircle2, Trash2 } from "lucide-react";

export function PaymentSettings() {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-2">
            Payout Methods
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            How you receive money from your clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-background rounded-lg shadow-sm">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                    className="h-6"
                    alt="Stripe"
                  />
                </div>
                <CheckCircle2 size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  Stripe Connected
                </p>
                <p className="text-xs text-muted-foreground">
                  Payouts every 2 business days
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="p-6 rounded-2xl border-2 border-dashed h-auto flex flex-col items-center justify-center gap-3 hover:border-primary/60 hover:bg-muted"
            >
              <div className="p-2 bg-background rounded-lg border border-border">
                <Plus size={24} className="text-muted-foreground" />
              </div>
              <span className="text-sm font-bold">Connect PayPal</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Bank Accounts
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-background rounded-lg border border-border flex items-center justify-center text-muted-foreground">
                  <Building size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Wells Fargo ••••5678
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Checking Account • Default
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <Trash2 size={18} />
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full py-4 border-2 border-dashed"
            >
              + Add Bank Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
