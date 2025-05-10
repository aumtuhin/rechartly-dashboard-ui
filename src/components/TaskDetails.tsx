
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/types/kanban";
import { User } from "lucide-react";

interface TaskDetailsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task: TaskType | null;
  onEdit: () => void;
}

export const TaskDetails = ({ isOpen, setIsOpen, task, onEdit }: TaskDetailsProps) => {
  if (!task) return null;

  // Function to get user name from ID
  const getUserName = (userId: string) => {
    const users = [
      { id: "user1", name: "John Doe" },
      { id: "user2", name: "Jane Smith" },
      { id: "user3", name: "Alex Johnson" },
      { id: "user4", name: "Sam Wilson" }
    ];
    return users.find(user => user.id === userId)?.name || "Unassigned";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">{task.description || "No description provided."}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Status</h4>
              <p className="text-sm text-muted-foreground capitalize">
                {task.status === "inprogress" ? "In Progress" : task.status}
              </p>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Priority</h4>
              <p className={`text-sm font-medium ${getPriorityColor(task.priority)} capitalize`}>
                {task.priority}
              </p>
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Assigned To</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              {task.assignedTo ? (
                <>
                  <User className="h-4 w-4 mr-2" />
                  <span>{getUserName(task.assignedTo)}</span>
                </>
              ) : (
                <span>Unassigned</span>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onEdit}>Edit Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
