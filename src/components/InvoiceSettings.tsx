import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Info, Clock } from "lucide-react";

export function InvoiceSettings() {
  return (
    <Card className="rounded-2xl">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Global Invoice Settings
          </h3>
          <p className="text-sm text-muted-foreground">
            Set default values for new invoices.
          </p>
        </div>
        <Button className="gap-2">
          <Save size={18} /> Save Defaults
        </Button>
      </div>
      <CardContent className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Info size={16} className="text-primary" /> General
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Numbering Format
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    defaultValue="INV-"
                    className="w-20 rounded-lg bg-muted/40 text-sm text-center font-bold"
                  />
                  <Input
                    type="text"
                    defaultValue="2024-001"
                    className="flex-1 rounded-lg bg-muted/40 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Default Currency
                </label>
                <Select defaultValue="usd">
                  <SelectTrigger className="rounded-lg bg-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    <SelectItem value="inr">INR - Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Clock size={16} className="text-primary" /> Due Dates & Taxes
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Default Due In
                </label>
                <Select defaultValue="14">
                  <SelectTrigger className="rounded-lg bg-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="receipt">Upon Receipt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Default Tax Rate (%)
                </label>
                <Input
                  type="number"
                  defaultValue="10"
                  className="rounded-lg bg-muted/40 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Default Terms & Notes
          </label>
          <Textarea
            rows={3}
            className="rounded-xl bg-muted/40 text-sm resize-none"
            defaultValue="Please pay within the due date. Thank you for your business!"
          />
        </div>
      </CardContent>
    </Card>
  );
}
