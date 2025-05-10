
export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo?: string; // Optional field for user assignment
}

export interface ColumnType {
  id: string;
  title: string;
  color: string;
}
