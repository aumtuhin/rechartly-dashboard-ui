
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { KanbanBoardComponent } from "@/components/KanbanBoardComponent";
import { useToast } from "@/hooks/use-toast";

const KanbanBoard = () => {
  const { toast } = useToast();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Task Management</h1>
            <SidebarTrigger />
          </div>
          <KanbanBoardComponent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default KanbanBoard;
