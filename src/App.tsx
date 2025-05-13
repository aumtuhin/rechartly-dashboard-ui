
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import KanbanBoard from "@/pages/KanbanBoard";
import SprintManagement from "@/pages/SprintManagement";
import TasksPage from "@/pages/TasksPage";
import SprintReport from "@/pages/SprintReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/kanban" replace />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/sprint-management" element={<SprintManagement />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/sprint-report/:sprintId" element={<SprintReport />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
