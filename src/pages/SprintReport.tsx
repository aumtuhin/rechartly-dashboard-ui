
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { SprintType, TaskType } from "@/types/kanban";
import { TaskList } from "@/components/TaskList";
import { ChartContainer, ChartLegend } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SprintReport = () => {
  const { sprintId } = useParams<{ sprintId: string }>();
  
  const [sprint, setSprint] = useState<SprintType | null>(null);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  
  useEffect(() => {
    // Get sprints from localStorage
    const savedSprints = localStorage.getItem("kanban-sprints");
    const sprints: SprintType[] = savedSprints ? JSON.parse(savedSprints) : [];
    
    // Find the current sprint
    const currentSprint = sprints.find(s => s.id === sprintId);
    if (currentSprint) {
      setSprint(currentSprint);
    }
    
    // Get tasks from localStorage
    const savedTasks = localStorage.getItem("kanban-tasks");
    const allTasks: TaskType[] = savedTasks ? JSON.parse(savedTasks) : [];
    
    // Filter tasks for this sprint
    if (currentSprint) {
      const sprintTasks = allTasks.filter(task => 
        currentSprint.tasks.includes(task.id)
      );
      setTasks(sprintTasks);
    }
  }, [sprintId]);
  
  if (!sprint) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <main className="flex-1 p-8">
            <div className="flex items-center mb-8">
              <Button variant="ghost" asChild>
                <a href="/sprint-management">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Sprint Management
                </a>
              </Button>
            </div>
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                Sprint not found.
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  // Calculate sprint metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const inProgressTasks = tasks.filter(task => task.status === "inprogress").length;
  const todoTasks = tasks.filter(task => task.status === "todo").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const totalStoryPoints = tasks.reduce((sum, task) => sum + (task.storyPoints || 0), 0);
  const completedStoryPoints = tasks
    .filter(task => task.status === "completed")
    .reduce((sum, task) => sum + (task.storyPoints || 0), 0);
  
  // Data for status chart
  const statusData = [
    { name: "Completed", value: completedTasks, color: "#4ade80" },
    { name: "In Progress", value: inProgressTasks, color: "#facc15" },
    { name: "To Do", value: todoTasks, color: "#60a5fa" },
  ].filter(item => item.value > 0);

  // Data for priority distribution
  const priorityData = [
    { name: "High", value: tasks.filter(task => task.priority === "high").length, color: "#f87171" },
    { name: "Medium", value: tasks.filter(task => task.priority === "medium").length, color: "#facc15" },
    { name: "Low", value: tasks.filter(task => task.priority === "low").length, color: "#4ade80" },
  ].filter(item => item.value > 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Button variant="ghost" asChild>
                <a href="/sprint-management">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Sprint Management
                </a>
              </Button>
            </div>
            <SidebarTrigger />
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{sprint.name} Report</h1>
            <p className="text-muted-foreground">
              {format(new Date(sprint.startDate), "MMM dd, yyyy")} - {format(new Date(sprint.endDate), "MMM dd, yyyy")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalTasks}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completionRate}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Story Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalStoryPoints}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedStoryPoints}</div>
                <div className="text-xs text-muted-foreground">
                  {totalStoryPoints > 0 ? Math.round((completedStoryPoints / totalStoryPoints) * 100) : 0}% of total points
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Task Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {statusData.length > 0 ? (
                  <ChartContainer
                    config={{
                      Completed: { color: "#4ade80" },
                      "In Progress": { color: "#facc15" },
                      "To Do": { color: "#60a5fa" },
                    }}
                  >
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {priorityData.length > 0 ? (
                  <ChartContainer
                    config={{
                      High: { color: "#f87171" },
                      Medium: { color: "#facc15" },
                      Low: { color: "#4ade80" },
                    }}
                  >
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sprint Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList tasks={tasks} />
            </CardContent>
          </Card>
          
          {sprint.description && (
            <Card>
              <CardHeader>
                <CardTitle>Sprint Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{sprint.description}</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SprintReport;
