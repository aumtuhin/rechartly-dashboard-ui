
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { KanbanBoardComponent } from "@/components/KanbanBoardComponent";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, ListTodo } from "lucide-react";

const KanbanBoard = () => {
  const { toast } = useToast();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Task Management</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/sprint-management">
                  <Calendar className="mr-2 h-4 w-4" />
                  Sprint Management
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/tasks">
                  <ListTodo className="mr-2 h-4 w-4" />
                  All Tasks
                </Link>
              </Button>
              <SidebarTrigger />
            </div>
          </div>
          <KanbanBoardComponent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default KanbanBoard;
