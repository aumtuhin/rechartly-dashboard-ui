
export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo?: string; // Optional field for user assignment
  storyPoints?: number; // Story points for task sizing
  sprintId?: string; // Association with a sprint
}

export interface ColumnType {
  id: string;
  title: string;
  color: string;
}

export interface SprintType {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string; 
  status: "planned" | "active" | "completed";
  tasks: string[]; // Array of task IDs assigned to this sprint
}
