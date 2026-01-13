import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Bell } from "lucide-react";

export function NotificationSettings() {
  return (
    <Card className="rounded-2xl">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-bold text-foreground">Email & App Alerts</h3>
        <p className="text-sm text-muted-foreground">
          Control when and how you get notified.
        </p>
      </div>
      <CardContent className="p-6 space-y-10">
        {[
          {
            category: "Invoice Status",
            items: [
              {
                id: "sent",
                label: "Invoice Sent",
                desc: "When you successfully send an invoice.",
              },
              {
                id: "viewed",
                label: "Invoice Viewed",
                desc: "When a client opens your invoice link.",
              },
              {
                id: "paid",
                label: "Invoice Paid",
                desc: "When a client successfully makes a payment.",
              },
            ],
          },
          {
            category: "Reminders",
            items: [
              {
                id: "upcoming",
                label: "Upcoming Due Date",
                desc: "3 days before an invoice is due.",
              },
              {
                id: "overdue",
                label: "Overdue Alert",
                desc: "When an invoice becomes overdue.",
              },
            ],
          },
        ].map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {group.category}
            </h4>
            <div className="space-y-6">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-8"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox defaultChecked id={`${item.id}-email`} />
                      <label
                        htmlFor={`${item.id}-email`}
                        className="text-xs font-medium text-foreground flex items-center gap-1 cursor-pointer"
                      >
                        <Mail size={12} />
                        Email
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id={`${item.id}-push`} />
                      <label
                        htmlFor={`${item.id}-push`}
                        className="text-xs font-medium text-foreground flex items-center gap-1 cursor-pointer"
                      >
                        <Bell size={12} />
                        Push
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
