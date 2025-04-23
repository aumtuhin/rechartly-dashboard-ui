
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import StatisticsCharts from "@/components/StatisticsCharts";

const Statistics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Statistics</h1>
            <SidebarTrigger />
          </div>
          <StatisticsCharts />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Statistics;
