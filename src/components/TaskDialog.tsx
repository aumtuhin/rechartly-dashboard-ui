
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { TaskDialogForm } from "@/components/task/TaskDialogForm";
import { TaskType, ColumnType } from "@/types/kanban";

interface TaskDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (task: TaskType | Omit<TaskType, "id">) => void;
  task: TaskType | null;
  columns: ColumnType[];
}

export const TaskDialog = ({ isOpen, setIsOpen, onSave, task, columns }: TaskDialogProps) => {
  const isEditing = Boolean(task);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <TaskDialogForm 
          task={task} 
          onSave={onSave} 
          columns={columns} 
        />
      </DialogContent>
    </Dialog>
  );
};
