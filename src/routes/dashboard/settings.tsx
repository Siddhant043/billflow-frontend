import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { User, Building, CreditCard, Bell, Shield, Globe } from "lucide-react";
import { ProfileSettings } from "@/components/ProfileSettings";
import { CompanySettings } from "@/components/CompanySettings";
import { InvoiceSettings } from "@/components/InvoiceSettings";
import { PaymentSettings } from "@/components/PaymentSettings";
import { NotificationSettings } from "@/components/NotificationSettings";
import { TeamSettings } from "@/components/TeamSettings";
import { BillingSettings } from "@/components/BillingSettings";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
});

type SettingsTab =
  | "profile"
  | "company"
  | "invoice"
  | "payments"
  | "notifications"
  | "team"
  | "billing";

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const tabs = [
    { id: "profile", label: "My Profile", icon: <User size={18} /> },
    { id: "company", label: "Company Details", icon: <Building size={18} /> },
    { id: "invoice", label: "Invoice Settings", icon: <Shield size={18} /> },
    {
      id: "payments",
      label: "Payment Methods",
      icon: <CreditCard size={18} />,
    },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "team", label: "Team Members", icon: <Globe size={18} /> },
    { id: "billing", label: "Billing & Plans", icon: <CreditCard size={18} /> },
  ];

  return (
    <div className="flex flex-col gap-6 px-6 py-6 md:px-10 pb-20 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account preferences and configurations.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-background text-primary shadow-sm border border-border"
                  : "text-muted-foreground hover:bg-muted hover:border-border border border-transparent"
              }`}
            >
              <span
                className={
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Settings Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "company" && <CompanySettings />}
          {activeTab === "invoice" && <InvoiceSettings />}
          {activeTab === "payments" && <PaymentSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "team" && <TeamSettings />}
          {activeTab === "billing" && <BillingSettings />}
        </div>
      </div>
    </div>
  );
}
