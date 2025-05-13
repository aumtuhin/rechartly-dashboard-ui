
import { TaskType } from "@/types/kanban";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TaskListProps {
  tasks: TaskType[];
  onAdd?: (taskId: string) => void;
  onRemove?: (taskId: string) => void;
}

export function TaskList({ tasks, onAdd, onRemove }: TaskListProps) {
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
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Story Points</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No tasks available
              </TableCell>
            </TableRow>
          ) : (
            tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell className="capitalize">
                  {task.status === "inprogress" ? "In Progress" : task.status}
                </TableCell>
                <TableCell>
                  <Badge className={`${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{task.storyPoints || "-"}</TableCell>
                <TableCell className="text-right">
                  {onAdd && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onAdd(task.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                  {onRemove && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onRemove(task.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
