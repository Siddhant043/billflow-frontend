import {
  ChartPie,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  Sidebar,
  SidebarGroup,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    label: "Invoices",
    icon: FileText,
    to: "/dashboard/invoices",
  },
  {
    label: "Clients",
    icon: Users,
    to: "/dashboard/clients",
  },
  {
    label: "Payments",
    icon: CreditCard,
    to: "/dashboard/payments",
  },
  {
    label: "Reports",
    icon: ChartPie,
    to: "/dashboard/reports",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/dashboard/settings",
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const { user, logout } = useUserStore();
  return (
    <Sidebar className="bg-sidebar">
      <SidebarHeader className="p-6">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">BillFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem
                key={item.to}
                className={cn(
                  "p-3 text-muted-foreground hover:bg-primary-foreground hover:text-primary rounded-md",
                  location.pathname === item.to &&
                    "bg-primary-foreground text-primary"
                )}
              >
                <Link to={item.to} className="flex items-center gap-2">
                  <item.icon size={22} />
                  <span className="text-md font-medium">{item.label}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="mx-auto" />
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={user?.logoUrl || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium ">{user?.fullName}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
            <Button onClick={logout} variant="ghost" size="icon">
              <LogOut size={18} />
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
