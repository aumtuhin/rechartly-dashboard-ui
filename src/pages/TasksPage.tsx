
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { TaskList } from "@/components/TaskList";
import { TaskDialog } from "@/components/TaskDialog";
import { TaskDetails } from "@/components/TaskDetails";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { TaskType, SprintType, ColumnType } from "@/types/kanban";
import { useToast } from "@/hooks/use-toast";

const TasksPage = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    return savedTasks ? JSON.parse(savedTasks) : createDummyTasks();
  });
  
  const [sprints, setSprints] = useState<SprintType[]>(() => {
    const savedSprints = localStorage.getItem("kanban-sprints");
    return savedSprints ? JSON.parse(savedSprints) : [];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [activeSprintId, setActiveSprintId] = useState<string | null>(null);

  const columns: ColumnType[] = [
    { id: "todo", title: "To Do", color: "bg-blue-100 border-blue-300" },
    { id: "inprogress", title: "In Progress", color: "bg-yellow-100 border-yellow-300" },
    { id: "completed", title: "Completed", color: "bg-green-100 border-green-300" }
  ];

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save sprints to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kanban-sprints", JSON.stringify(sprints));
  }, [sprints]);

  // Find active sprint if it exists
  useEffect(() => {
    const active = sprints.find(sprint => sprint.status === "active");
    if (active) {
      setActiveSprintId(active.id);
    } else {
      setActiveSprintId(null);
    }
  }, [sprints]);

  const handleTaskAdd = (newTask: Omit<TaskType, "id">) => {
    const task: TaskType = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
    setIsDialogOpen(false);
    toast({
      description: "Task created successfully",
    });
  };

  const handleTaskEdit = (updatedTask: TaskType) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setIsDialogOpen(false);
    setCurrentTask(null);
    // Close details dialog if it was open
    if (isDetailsOpen) {
      setIsDetailsOpen(false);
    }
    toast({
      description: "Task updated successfully",
    });
  };

  const handleTaskDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      // Remove the task from any sprints it might be in
      setSprints(sprints.map(sprint => ({
        ...sprint,
        tasks: sprint.tasks.filter(id => id !== taskToDelete)
      })));
      
      // Delete the task
      setTasks(tasks.filter(task => task.id !== taskToDelete));
      setTaskToDelete(null);
      setIsDeleteConfirmOpen(false);
      toast({
        description: "Task deleted successfully",
      });
    }
  };

  const openAddTaskDialog = () => {
    setCurrentTask(null);
    setIsDialogOpen(true);
  };

  const openEditTaskDialog = (task: TaskType) => {
    setCurrentTask(task);
    setIsDialogOpen(true);
    // Close details dialog if it was open
    if (isDetailsOpen) {
      setIsDetailsOpen(false);
    }
  };

  const handleTaskClick = (task: TaskType) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const handleAddToSprint = (taskId: string) => {
    if (!activeSprintId) {
      toast({
        title: "No active sprint",
        description: "Please start a sprint first",
        variant: "destructive",
      });
      return;
    }

    setSprints(sprints.map(sprint => 
      sprint.id === activeSprintId
        ? { ...sprint, tasks: [...sprint.tasks, taskId] }
        : sprint
    ));
    
    toast({
      description: "Task added to sprint",
    });
  };

  const handleRemoveFromSprint = (taskId: string) => {
    setSprints(sprints.map(sprint => ({
      ...sprint,
      tasks: sprint.tasks.filter(id => id !== taskId)
    })));
    
    toast({
      description: "Task removed from sprint",
    });
  };

  const getTasksInSprints = () => {
    const taskIds = sprints.flatMap(sprint => sprint.tasks);
    return tasks.filter(task => taskIds.includes(task.id));
  };

  const getBacklogTasks = () => {
    const taskIds = sprints.flatMap(sprint => sprint.tasks);
    return tasks.filter(task => !taskIds.includes(task.id));
  };

  const getTasksInActiveSprint = () => {
    if (!activeSprintId) return [];
    const activeSprint = sprints.find(sprint => sprint.id === activeSprintId);
    if (!activeSprint) return [];
    return tasks.filter(task => activeSprint.tasks.includes(task.id));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Task Management</h1>
            <div className="flex items-center gap-4">
              <Button onClick={openAddTaskDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
              <SidebarTrigger />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="sprint">Sprint Tasks</TabsTrigger>
              <TabsTrigger value="backlog">Backlog</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TaskList 
                      tasks={tasks}
                      onAdd={activeSprintId ? handleAddToSprint : undefined}
                      onRemove={handleRemoveFromSprint}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sprint" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sprint Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeSprintId ? (
                      <TaskList 
                        tasks={getTasksInActiveSprint()} 
                        onRemove={handleRemoveFromSprint}
                      />
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No active sprint. Please start a sprint to view tasks.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="backlog" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Backlog Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TaskList 
                      tasks={getBacklogTasks()} 
                      onAdd={activeSprintId ? handleAddToSprint : undefined}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <TaskDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSave={currentTask ? handleTaskEdit : handleTaskAdd}
        task={currentTask}
        columns={columns}
      />

      <TaskDetails
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
        task={selectedTask}
        onEdit={() => {
          if (selectedTask) {
            openEditTaskDialog(selectedTask);
          }
        }}
      />

      <DeleteConfirmation
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Are you sure you want to delete this task?"
      />
    </SidebarProvider>
  );
};

// Create dummy tasks if no tasks exist
const createDummyTasks = (): TaskType[] => {
  return [
    {
      id: "task1",
      title: "Implement user authentication",
      description: "Set up login and registration functionality with JWT tokens",
      status: "todo",
      priority: "high",
      storyPoints: 8
    },
    {
      id: "task2",
      title: "Design database schema",
      description: "Create entity relationship diagrams and define tables for the application",
      status: "inprogress",
      priority: "high",
      storyPoints: 5
    },
    {
      id: "task3",
      title: "Create responsive dashboard",
      description: "Implement a responsive UI for the admin dashboard with key metrics",
      status: "todo",
      priority: "medium",
      storyPoints: 3
    },
    {
      id: "task4",
      title: "Set up CI/CD pipeline",
      description: "Configure GitHub Actions for automated testing and deployment",
      status: "todo",
      priority: "medium",
      storyPoints: 5
    },
    {
      id: "task5",
      title: "Implement notification system",
      description: "Add real-time notifications for user actions and system events",
      status: "todo",
      priority: "low",
      assignedTo: "user2",
      storyPoints: 3
    },
    {
      id: "task6",
      title: "Write API documentation",
      description: "Document all API endpoints using Swagger/OpenAPI",
      status: "completed",
      priority: "low",
      storyPoints: 2
    },
    {
      id: "task7",
      title: "Fix pagination bug",
      description: "Address issue with pagination not working correctly on search results",
      status: "inprogress",
      priority: "high",
      storyPoints: 1
    },
    {
      id: "task8",
      title: "Update dependencies",
      description: "Update all npm packages to their latest stable versions",
      status: "completed",
      priority: "low",
      storyPoints: 1
    }
  ];
};

export default TasksPage;
