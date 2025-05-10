
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { TaskCard } from "@/components/TaskCard";
import { TaskType, ColumnType } from "@/types/kanban";

interface KanbanColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  onTaskMove: (taskId: string, columnId: string) => void;
  onTaskEdit: (task: TaskType) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskClick: (task: TaskType) => void;
}

export const KanbanColumn = ({ 
  column, 
  tasks, 
  onTaskMove, 
  onTaskEdit, 
  onTaskDelete,
  onTaskClick
}: KanbanColumnProps) => {
  const [isOver, setIsOver] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };
  
  const handleDragLeave = () => {
    setIsOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    onTaskMove(taskId, column.id);
    setIsOver(false);
  };
  
  return (
    <Card 
      className={`${isOver ? 'border-primary border-2' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardHeader className={`${column.color} rounded-t-lg py-3`}>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{column.title}</h3>
          <span className="bg-background text-foreground rounded-full px-2 py-1 text-xs">
            {tasks.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-3 h-[calc(100vh-250px)] overflow-y-auto">
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onTaskEdit(task)}
              onDelete={() => onTaskDelete(task.id)}
              onClick={() => onTaskClick(task)}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center p-4 text-muted-foreground text-sm border border-dashed rounded-md">
              Drag tasks here
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
