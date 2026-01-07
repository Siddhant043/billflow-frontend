import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="flex flex-col h-screen">
            <TopBar />
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
