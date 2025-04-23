
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCharts from "@/components/DashboardCharts";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import StatisticsCharts from "@/components/StatisticsCharts";

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
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <DashboardCharts />
            </TabsContent>
            <TabsContent value="analytics">
              <AnalyticsCharts />
            </TabsContent>
            <TabsContent value="statistics">
              <StatisticsCharts />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
