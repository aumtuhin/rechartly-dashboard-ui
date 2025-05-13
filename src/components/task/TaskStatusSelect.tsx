
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnType } from "@/types/kanban";

interface TaskStatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  columns: ColumnType[];
}

export const TaskStatusSelect = ({ value, onChange, columns }: TaskStatusSelectProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="status">Status</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="status">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {columns.map(column => (
            <SelectItem key={column.id} value={column.id}>
              {column.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
