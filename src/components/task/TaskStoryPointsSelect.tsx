
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskStoryPointsSelectProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export const TaskStoryPointsSelect = ({ value, onChange }: TaskStoryPointsSelectProps) => {
  // Story points options
  const storyPointsOptions = [1, 2, 3, 5, 8, 13];
  
  return (
    <div className="grid gap-2">
      <Label htmlFor="storyPoints">Story Points</Label>
      <Select 
        value={value?.toString() || "none"} 
        onValueChange={(value) => onChange(value !== "none" ? parseInt(value, 10) : undefined)}
      >
        <SelectTrigger id="storyPoints">
          <SelectValue placeholder="Story points" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {storyPointsOptions.map(points => (
            <SelectItem key={points} value={points.toString()}>
              {points}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
