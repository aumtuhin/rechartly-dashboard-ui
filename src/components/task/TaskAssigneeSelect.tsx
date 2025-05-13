
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";

interface TaskAssigneeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const TaskAssigneeSelect = ({ value, onChange }: TaskAssigneeSelectProps) => {
  // Array of sample users
  const users = [
    { id: "user1", name: "John Doe" },
    { id: "user2", name: "Jane Smith" },
    { id: "user3", name: "Alex Johnson" },
    { id: "user4", name: "Sam Wilson" }
  ];

  return (
    <div className="grid gap-2">
      <Label htmlFor="assignedTo">Assign To</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="assignedTo">
          <SelectValue placeholder="Assign to user" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {users.map(user => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
