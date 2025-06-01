import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Statistics from "./pages/Statistics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Inputs from "./pages/Inputs";
import DataManagement from "./pages/DataManagement";
import Profile from "./pages/Profile";
import KanbanBoard from "./pages/KanbanBoard";
import ThemeCustomization from "./pages/ThemeCustomization";
import SprintManagement from "./pages/SprintManagement";
import SprintReport from "./pages/SprintReport";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import TasksPage from "./pages/TasksPage";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

// Check if user is already logged in - redirect from login page
const LoginRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Login />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginRoute />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      }
    />
    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      }
    />
    <Route
      path="/statistics"
      element={
        <ProtectedRoute>
          <Statistics />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reports"
      element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route
      path="/inputs"
      element={
        <ProtectedRoute>
          <Inputs />
        </ProtectedRoute>
      }
    />
    <Route
      path="/data-management"
      element={
        <ProtectedRoute>
          <DataManagement />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/kanban"
      element={
        <ProtectedRoute>
          <KanbanBoard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/sprint-management"
      element={
        <ProtectedRoute>
          <SprintManagement />
        </ProtectedRoute>
      }
    />
    <Route
      path="/sprint-report/:sprintId"
      element={
        <ProtectedRoute>
          <SprintReport />
        </ProtectedRoute>
      }
    />
    <Route path="/" element={<Navigate to="/kanban" replace />} />
    <Route path="/kanban" element={<KanbanBoard />} />
    <Route path="/sprint-management" element={<SprintManagement />} />
    <Route path="/tasks" element={<TasksPage />} />
    <Route path="/sprint-report/:sprintId" element={<SprintReport />} />

    <Route
      path="/theme"
      element={
        <ProtectedRoute>
          <ThemeCustomization />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
