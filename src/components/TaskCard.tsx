
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { TaskType } from "@/types/kanban";

interface TaskCardProps {
  task: TaskType;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id);
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

  return (
    <Card 
      className="cursor-grab hover:shadow-md transition-shadow" 
      draggable 
      onDragStart={handleDragStart}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-sm">{task.title}</h4>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" onClick={onEdit} className="h-6 w-6">
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} className="h-6 w-6">
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
        </div>
      </CardContent>
    </Card>
  );
};
