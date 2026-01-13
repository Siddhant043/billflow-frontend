import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export function CompanySettings() {
  return (
    <Card className="rounded-2xl">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Company Profile</h3>
          <p className="text-sm text-muted-foreground">
            Details used for billing and invoice headers.
          </p>
        </div>
        <Button className="gap-2">
          <Save size={18} /> Save
        </Button>
      </div>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center text-primary-foreground text-3xl font-bold">
            BF
          </div>
          <div>
            <h4 className="font-bold text-foreground">Company Logo</h4>
            <p className="text-xs text-muted-foreground mb-3">
              This will appear on all your invoices.
            </p>
            <Button variant="link" className="text-xs font-bold p-0 h-auto">
              Change Logo
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Legal Company Name
            </label>
            <Input
              type="text"
              defaultValue="BillFlow Inc."
              className="rounded-xl bg-muted/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Tax ID / VAT Number
            </label>
            <Input
              type="text"
              defaultValue="US12345678"
              className="rounded-xl bg-muted/40"
            />
          </div>
          <div className="col-span-full space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Address
            </label>
            <Textarea
              rows={2}
              defaultValue="123 Tech Avenue, Suite 500, San Francisco, CA 94107"
              className="rounded-xl bg-muted/40 resize-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
