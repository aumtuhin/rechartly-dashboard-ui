
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { KanbanColumn } from "@/components/KanbanColumn";
import { TaskDialog } from "@/components/TaskDialog";
import { TaskType, ColumnType } from "@/types/kanban";
import { useToast } from "@/hooks/use-toast";

export const KanbanBoardComponent = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });
  const [columns, setColumns] = useState<ColumnType[]>(defaultColumns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskMove = (taskId: string, targetColumnId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: targetColumnId } : task
    ));
    toast({
      description: "Task moved successfully",
    });
  };
  
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
    toast({
      description: "Task updated successfully",
    });
  };
  
  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      description: "Task deleted successfully",
    });
  };
  
  const openAddTaskDialog = () => {
    setCurrentTask(null);
    setIsDialogOpen(true);
  };
  
  const openEditTaskDialog = (task: TaskType) => {
    setCurrentTask(task);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button onClick={openAddTaskDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter(task => task.status === column.id)}
            onTaskMove={handleTaskMove}
            onTaskEdit={openEditTaskDialog}
            onTaskDelete={handleTaskDelete}
          />
        ))}
      </div>
      
      <TaskDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSave={currentTask ? handleTaskEdit : handleTaskAdd}
        task={currentTask}
        columns={columns}
      />
    </div>
  );
};

// Default data for initial setup
const defaultColumns: ColumnType[] = [
  { id: "todo", title: "To Do", color: "bg-blue-100 border-blue-300" },
  { id: "inprogress", title: "In Progress", color: "bg-yellow-100 border-yellow-300" },
  { id: "completed", title: "Completed", color: "bg-green-100 border-green-300" }
];

const defaultTasks: TaskType[] = [
  {
    id: "1",
    title: "Research competitors",
    description: "Analyze top 5 competitors in the marketplace",
    status: "todo",
    priority: "high"
  },
  {
    id: "2",
    title: "Design new landing page",
    description: "Create mockups for the new homepage design",
    status: "inprogress",
    priority: "medium"
  },
  {
    id: "3",
    title: "User feedback survey",
    description: "Create and distribute user satisfaction survey",
    status: "completed",
    priority: "low"
  }
];
