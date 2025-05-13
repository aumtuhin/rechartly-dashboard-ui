
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronRight, Plus } from "lucide-react";
import { TaskList } from "@/components/TaskList";
import { SprintType, TaskType } from "@/types/kanban";
import { useToast } from "@/hooks/use-toast";

const SprintManagement = () => {
  const { toast } = useToast();
  const [sprints, setSprints] = useState<SprintType[]>(() => {
    const savedSprints = localStorage.getItem("kanban-sprints");
    return savedSprints ? JSON.parse(savedSprints) : [];
  });
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isNewSprintDialogOpen, setIsNewSprintDialogOpen] = useState(false);
  const [newSprint, setNewSprint] = useState<Partial<SprintType>>({
    name: "",
    description: "",
    status: "planned",
    tasks: []
  });
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [activeSprintId, setActiveSprintId] = useState<string | null>(null);

  // Save sprints to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kanban-sprints", JSON.stringify(sprints));
  }, [sprints]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Find active sprint if it exists
  useEffect(() => {
    const active = sprints.find(sprint => sprint.status === "active");
    if (active) {
      setActiveSprintId(active.id);
    } else {
      setActiveSprintId(null);
    }
  }, [sprints]);

  const handleCreateSprint = () => {
    if (!newSprint.name || !startDate || !endDate) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const sprint: SprintType = {
      id: Date.now().toString(),
      name: newSprint.name,
      description: newSprint.description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: "planned",
      tasks: []
    };

    setSprints([...sprints, sprint]);
    setIsNewSprintDialogOpen(false);
    setNewSprint({ name: "", description: "", status: "planned", tasks: [] });
    setStartDate(undefined);
    setEndDate(undefined);

    toast({
      description: "Sprint created successfully",
    });
  };

  const handleStartSprint = (sprintId: string) => {
    // Check if there's already an active sprint
    const hasActiveSprint = sprints.some(sprint => sprint.status === "active");
    
    if (hasActiveSprint) {
      toast({
        title: "Cannot start sprint",
        description: "There is already an active sprint. Please complete it first.",
        variant: "destructive",
      });
      return;
    }

    setSprints(sprints.map(sprint => 
      sprint.id === sprintId
        ? { ...sprint, status: "active" }
        : sprint
    ));
    
    toast({
      description: "Sprint started successfully",
    });
  };

  const handleCompleteSprint = (sprintId: string) => {
    setSprints(sprints.map(sprint => 
      sprint.id === sprintId
        ? { ...sprint, status: "completed" }
        : sprint
    ));
    
    toast({
      description: "Sprint completed successfully",
    });
  };

  const handleRemoveTaskFromSprint = (sprintId: string, taskId: string) => {
    setSprints(sprints.map(sprint => 
      sprint.id === sprintId
        ? { ...sprint, tasks: sprint.tasks.filter(id => id !== taskId) }
        : sprint
    ));
    
    toast({
      description: "Task removed from sprint",
    });
  };

  const calculateProgress = (sprintId: string) => {
    const sprint = sprints.find(s => s.id === sprintId);
    if (!sprint || sprint.tasks.length === 0) return 0;
    
    const completedTasks = tasks.filter(
      task => sprint.tasks.includes(task.id) && task.status === "completed"
    ).length;
    
    return Math.round((completedTasks / sprint.tasks.length) * 100);
  };

  const unassignedTasks = tasks.filter(task => !sprints.some(sprint => sprint.tasks.includes(task.id)));

  const handleAddTaskToSprint = (sprintId: string, taskId: string) => {
    setSprints(sprints.map(sprint => 
      sprint.id === sprintId
        ? { ...sprint, tasks: [...sprint.tasks, taskId] }
        : sprint
    ));
    
    toast({
      description: "Task added to sprint",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Sprint Management</h1>
            <div className="flex items-center gap-4">
              <Button onClick={() => setIsNewSprintDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Sprint
              </Button>
              <SidebarTrigger />
            </div>
          </div>
          
          <Tabs defaultValue="planned">
            <TabsList className="mb-6">
              <TabsTrigger value="planned">Planned</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            {/* Planned Sprints */}
            <TabsContent value="planned" className="space-y-6">
              {sprints.filter(sprint => sprint.status === "planned").length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center text-muted-foreground">
                    No planned sprints. Create a new sprint to get started.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sprints
                    .filter(sprint => sprint.status === "planned")
                    .map(sprint => (
                      <Card key={sprint.id}>
                        <CardHeader>
                          <CardTitle className="flex justify-between">
                            <span>{sprint.name}</span>
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(sprint.startDate), "MMM dd, yyyy")} - {format(new Date(sprint.endDate), "MMM dd, yyyy")}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm">
                            {sprint.description || "No description provided."}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {sprint.tasks.length} tasks
                            </span>
                            <Button 
                              size="sm" 
                              onClick={() => handleStartSprint(sprint.id)}
                              disabled={sprint.tasks.length === 0}
                            >
                              Start Sprint
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
            
            {/* Active Sprint */}
            <TabsContent value="active" className="space-y-6">
              {sprints.filter(sprint => sprint.status === "active").length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center text-muted-foreground">
                    No active sprint right now.
                  </CardContent>
                </Card>
              ) : (
                sprints
                  .filter(sprint => sprint.status === "active")
                  .map(sprint => (
                    <Card key={sprint.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between">
                          <span>{sprint.name}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCompleteSprint(sprint.id)}
                          >
                            Complete Sprint
                          </Button>
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(sprint.startDate), "MMM dd, yyyy")} - {format(new Date(sprint.endDate), "MMM dd, yyyy")}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {calculateProgress(sprint.id)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${calculateProgress(sprint.id)}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Sprint Tasks</h3>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              asChild
                            >
                              <a href={`/sprint-report/${sprint.id}`}>
                                View Report <ChevronRight className="ml-1 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                          
                          <TaskList 
                            tasks={tasks.filter(task => sprint.tasks.includes(task.id))}
                            onRemove={(taskId) => handleRemoveTaskFromSprint(sprint.id, taskId)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </TabsContent>
            
            {/* Completed Sprints */}
            <TabsContent value="completed" className="space-y-6">
              {sprints.filter(sprint => sprint.status === "completed").length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center text-muted-foreground">
                    No completed sprints yet.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sprints
                    .filter(sprint => sprint.status === "completed")
                    .map(sprint => (
                      <Card key={sprint.id}>
                        <CardHeader>
                          <CardTitle>{sprint.name}</CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(sprint.startDate), "MMM dd, yyyy")} - {format(new Date(sprint.endDate), "MMM dd, yyyy")}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {sprint.tasks.length} tasks
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              asChild
                            >
                              <a href={`/sprint-report/${sprint.id}`}>
                                View Report
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Unassigned Tasks Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Unassigned Tasks</h2>
            {unassignedTasks.length === 0 ? (
              <Card>
                <CardContent className="py-6 text-center text-muted-foreground">
                  No unassigned tasks available.
                </CardContent>
              </Card>
            ) : activeSprintId ? (
              <TaskList 
                tasks={unassignedTasks}
                onAdd={(taskId) => handleAddTaskToSprint(activeSprintId, taskId)}
              />
            ) : (
              <TaskList tasks={unassignedTasks} />
            )}
          </div>
        </main>
      </div>

      {/* New Sprint Dialog */}
      <Dialog open={isNewSprintDialogOpen} onOpenChange={setIsNewSprintDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Sprint</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Sprint Name</Label>
              <Input 
                id="name" 
                value={newSprint.name}
                onChange={(e) => setNewSprint({...newSprint, name: e.target.value})}
                placeholder="Sprint 1"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={newSprint.description}
                onChange={(e) => setNewSprint({...newSprint, description: e.target.value})}
                placeholder="Sprint goals and objectives"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => 
                        startDate ? date < startDate : false
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateSprint}>Create Sprint</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default SprintManagement;
