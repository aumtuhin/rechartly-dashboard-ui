
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskType, ColumnType } from "@/types/kanban";
import { DialogFooter } from "@/components/ui/dialog";
import { TaskPrioritySelect } from "@/components/task/TaskPrioritySelect";
import { TaskStatusSelect } from "@/components/task/TaskStatusSelect";
import { TaskAssigneeSelect } from "@/components/task/TaskAssigneeSelect";
import { TaskStoryPointsSelect } from "@/components/task/TaskStoryPointsSelect";

interface TaskDialogFormProps {
  task: TaskType | null;
  onSave: (task: TaskType | Omit<TaskType, "id">) => void;
  columns: ColumnType[];
}

export const TaskDialogForm = ({ task, onSave, columns }: TaskDialogFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("unassigned");
  const [storyPoints, setStoryPoints] = useState<number | undefined>(undefined);
  const isEditing = Boolean(task);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setAssignedTo(task.assignedTo || "unassigned");
      setStoryPoints(task.storyPoints);
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setAssignedTo("unassigned");
      setStoryPoints(undefined);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const taskData: Omit<TaskType, "id"> | TaskType = isEditing 
      ? {
          ...task!,
          title,
          description,
          status,
          priority,
          assignedTo: assignedTo === "unassigned" ? undefined : assignedTo,
          storyPoints: storyPoints
        }
      : {
          title,
          description,
          status,
          priority,
          assignedTo: assignedTo === "unassigned" ? undefined : assignedTo,
          storyPoints: storyPoints
        };
    
    onSave(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <TaskStatusSelect 
            value={status} 
            onChange={setStatus}
            columns={columns} 
          />
          
          <TaskPrioritySelect 
            value={priority} 
            onChange={setPriority} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <TaskAssigneeSelect 
            value={assignedTo} 
            onChange={setAssignedTo} 
          />
          
          <TaskStoryPointsSelect 
            value={storyPoints} 
            onChange={setStoryPoints} 
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </DialogFooter>
    </form>
  );
};
