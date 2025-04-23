
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardCharts from "@/components/DashboardCharts";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <SidebarTrigger />
          </div>
          <DashboardHeader />
          <DashboardCharts />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
