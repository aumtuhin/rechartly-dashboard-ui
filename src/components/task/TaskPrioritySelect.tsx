
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskPrioritySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const TaskPrioritySelect = ({ value, onChange }: TaskPrioritySelectProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="priority">Priority</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="priority">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
