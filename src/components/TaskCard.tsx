
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, User, Info } from "lucide-react";
import { TaskType } from "@/types/kanban";

interface TaskCardProps {
  task: TaskType;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onClick }: TaskCardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent propagation if clicked on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  return (
    <Card 
      className="cursor-grab hover:shadow-md transition-shadow" 
      draggable 
      onDragStart={handleDragStart}
      onClick={handleCardClick}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-sm">{task.title}</h4>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }} 
              className="h-6 w-6"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }} 
              className="h-6 w-6"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {task.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`text-xs rounded-full px-2 py-0.5 ${getPriorityColor(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          
          {task.assignedTo && (
            <div className="flex items-center text-xs text-muted-foreground">
              <User className="h-3 w-3 mr-1" />
              <span>{getUserName(task.assignedTo)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
