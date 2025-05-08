
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileText, Download, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AdvancedSearchDialog } from "@/components/AdvancedSearchDialog";

// Define the user data structure
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Define the project data structure
interface Project {
  id: number;
  name: string;
  status: "active" | "completed" | "pending";
  progress: number;
  startDate: string;
}

const TableExamples = () => {
  // Initial data for users table
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
  ]);

  // Initial data for projects table
  const [projects, setProjects] = useState<Project[]>([
    { id: 101, name: "Website Redesign", status: "active", progress: 65, startDate: "2025-03-15" },
    { id: 102, name: "Mobile App Development", status: "pending", progress: 20, startDate: "2025-04-01" },
    { id: 103, name: "Database Migration", status: "completed", progress: 100, startDate: "2025-02-10" },
    { id: 104, name: "API Integration", status: "active", progress: 45, startDate: "2025-03-28" },
  ]);

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // State for the user being edited
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Function to handle editing a user
  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
  };

  // Function to handle updating a user
  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
      setEditingUser(null);
      toast.success("User updated successfully");
    }
  };

  // Function to handle deleting a user
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  };

  // State for the project being edited
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Function to handle editing a project
  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
  };

  // Function to handle updating a project
  const handleUpdateProject = () => {
    if (editingProject) {
      setProjects(projects.map(project => 
        project.id === editingProject.id ? editingProject : project
      ));
      setEditingProject(null);
      toast.success("Project updated successfully");
    }
  };

  // Function to handle deleting a project
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast.success("Project deleted successfully");
  };

  // Helper function to get status badge class
  const getStatusBadgeClass = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Function to handle basic search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredUsers(users);
      setFilteredProjects(projects);
      return;
    }

    const lowerTerm = term.toLowerCase();
    
    // Filter users
    const matchedUsers = users.filter(user => 
      user.name.toLowerCase().includes(lowerTerm) ||
      user.email.toLowerCase().includes(lowerTerm) ||
      user.role.toLowerCase().includes(lowerTerm)
    );
    setFilteredUsers(matchedUsers);
    
    // Filter projects
    const matchedProjects = projects.filter(project => 
      project.name.toLowerCase().includes(lowerTerm) ||
      project.status.toLowerCase().includes(lowerTerm)
    );
    setFilteredProjects(matchedProjects);
  };

  // Function to handle advanced search
  const handleAdvancedSearch = (filters: any) => {
    let matchedUsers = [...users];
    let matchedProjects = [...projects];

    // Apply user filters
    if (filters.userName) {
      matchedUsers = matchedUsers.filter(user => 
        user.name.toLowerCase().includes(filters.userName.toLowerCase())
      );
    }
    
    if (filters.userRole) {
      matchedUsers = matchedUsers.filter(user => 
        user.role.toLowerCase() === filters.userRole.toLowerCase()
      );
    }
    
    if (filters.userEmail) {
      matchedUsers = matchedUsers.filter(user => 
        user.email.toLowerCase().includes(filters.userEmail.toLowerCase())
      );
    }
    
    // Apply project filters
    if (filters.projectName) {
      matchedProjects = matchedProjects.filter(project => 
        project.name.toLowerCase().includes(filters.projectName.toLowerCase())
      );
    }
    
    if (filters.projectStatus) {
      matchedProjects = matchedProjects.filter(project => 
        project.status === filters.projectStatus
      );
    }
    
    if (filters.minProgress) {
      matchedProjects = matchedProjects.filter(project => 
        project.progress >= filters.minProgress
      );
    }
    
    if (filters.maxProgress) {
      matchedProjects = matchedProjects.filter(project => 
        project.progress <= filters.maxProgress
      );
    }
    
    if (filters.dateFrom) {
      matchedProjects = matchedProjects.filter(project => 
        new Date(project.startDate) >= new Date(filters.dateFrom)
      );
    }
    
    if (filters.dateTo) {
      matchedProjects = matchedProjects.filter(project => 
        new Date(project.startDate) <= new Date(filters.dateTo)
      );
    }
    
    setFilteredUsers(matchedUsers);
    setFilteredProjects(matchedProjects);
    setIsAdvancedSearchOpen(false);
    toast.success("Advanced search applied");
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilteredUsers(users);
    setFilteredProjects(projects);
    toast.success("Filters reset");
  };

  // Export functions
  const exportToCSV = (data: any[], filename: string) => {
    // Convert data to CSV
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(row => {
        return headers.map(header => {
          const value = row[header];
          // Handle special characters and quotes in CSV
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        }).join(',');
      })
    ];
    
    const csvString = csvRows.join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${filename} exported as CSV`);
  };

  const generatePDF = async (data: any[], title: string) => {
    try {
      // Create a simple text representation for PDF
      // In a real app, you might want to use a library like jsPDF or pdfmake
      // for more sophisticated PDF generation
      const content = JSON.stringify(data, null, 2);
      const blob = new Blob([`${title}\n\n${content}`], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`${title} downloaded as text representation`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Data Management</h1>
            <SidebarTrigger />
          </div>
          
          {/* Search bar */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={() => setIsAdvancedSearchOpen(true)}>
              Advanced Search
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
          
          {/* Users Table */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Users Management</CardTitle>
                <CardDescription>
                  A table example with edit and delete functionality for user data.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportToCSV(filteredUsers, 'users-data')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => generatePDF(filteredUsers, 'Users Data')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                                <DialogDescription>
                                  Make changes to the user information here.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input
                                    id="name"
                                    value={editingUser?.name || ""}
                                    onChange={(e) => setEditingUser(prev => 
                                      prev ? { ...prev, name: e.target.value } : null
                                    )}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="email" className="text-right">
                                    Email
                                  </Label>
                                  <Input
                                    id="email"
                                    value={editingUser?.email || ""}
                                    onChange={(e) => setEditingUser(prev => 
                                      prev ? { ...prev, email: e.target.value } : null
                                    )}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="role" className="text-right">
                                    Role
                                  </Label>
                                  <Input
                                    id="role"
                                    value={editingUser?.role || ""}
                                    onChange={(e) => setEditingUser(prev => 
                                      prev ? { ...prev, role: e.target.value } : null
                                    )}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={handleUpdateUser}>
                                  Save changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the
                                  user from the database.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No users found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Projects Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Projects Management</CardTitle>
                <CardDescription>
                  A table example with edit and delete functionality for project data.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportToCSV(filteredProjects, 'projects-data')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => generatePDF(filteredProjects, 'Projects Data')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(project.status)}`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs mt-1 block">{project.progress}%</span>
                        </TableCell>
                        <TableCell>{project.startDate}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProject(project)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit Project</DialogTitle>
                                <DialogDescription>
                                  Make changes to the project information here.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="project-name" className="text-right">
                                    Name
                                  </Label>
                                  <Input
                                    id="project-name"
                                    value={editingProject?.name || ""}
                                    onChange={(e) => setEditingProject(prev => 
                                      prev ? { ...prev, name: e.target.value } : null
                                    )}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="status" className="text-right">
                                    Status
                                  </Label>
                                  <select
                                    id="status"
                                    value={editingProject?.status || "active"}
                                    onChange={(e) => setEditingProject(prev => 
                                      prev ? { ...prev, status: e.target.value as "active" | "completed" | "pending" } : null
                                    )}
                                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                  </select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="progress" className="text-right">
                                    Progress (%)
                                  </Label>
                                  <Input
                                    id="progress"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={editingProject?.progress || 0}
                                    onChange={(e) => setEditingProject(prev => 
                                      prev ? { ...prev, progress: parseInt(e.target.value) } : null
                                    )}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="date" className="text-right">
                                    Start Date
                                  </Label>
                                  <Input
                                    id="date"
                                    type="date"
                                    value={editingProject?.startDate || ""}
                                    onChange={(e) => setEditingProject(prev => 
                                      prev ? { ...prev, startDate: e.target.value } : null
                                    )}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={handleUpdateProject}>
                                  Save changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the
                                  project from the database.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No projects found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Advanced Search Dialog */}
          <AdvancedSearchDialog
            isOpen={isAdvancedSearchOpen}
            onClose={() => setIsAdvancedSearchOpen(false)}
            onSearch={handleAdvancedSearch}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TableExamples;
