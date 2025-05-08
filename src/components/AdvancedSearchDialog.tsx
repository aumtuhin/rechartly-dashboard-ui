
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface AdvancedSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: any) => void;
}

export function AdvancedSearchDialog({
  isOpen,
  onClose,
  onSearch,
}: AdvancedSearchDialogProps) {
  const [filters, setFilters] = useState({
    // User filters
    userName: "",
    userEmail: "",
    userRole: "",
    
    // Project filters
    projectName: "",
    projectStatus: "",
    minProgress: "",
    maxProgress: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({
      userName: "",
      userEmail: "",
      userRole: "",
      projectName: "",
      projectStatus: "",
      minProgress: "",
      maxProgress: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Search
          </DialogTitle>
          <DialogDescription>
            Filter data using multiple criteria. Switch between tabs to search different data types.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Name</Label>
                  <Input
                    id="userName"
                    name="userName"
                    placeholder="Filter by name..."
                    value={filters.userName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    name="userEmail"
                    placeholder="Filter by email..."
                    value={filters.userEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="userRole">Role</Label>
                <select
                  id="userRole"
                  name="userRole"
                  value={filters.userRole}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Any role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    name="projectName"
                    placeholder="Filter by project name..."
                    value={filters.projectName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectStatus">Status</Label>
                  <select
                    id="projectStatus"
                    name="projectStatus"
                    value={filters.projectStatus}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Any status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minProgress">Min Progress (%)</Label>
                  <Input
                    id="minProgress"
                    name="minProgress"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={filters.minProgress}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxProgress">Max Progress (%)</Label>
                  <Input
                    id="maxProgress"
                    name="maxProgress"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="100"
                    value={filters.maxProgress}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFrom">From Date</Label>
                  <Input
                    id="dateFrom"
                    name="dateFrom"
                    type="date"
                    value={filters.dateFrom}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTo">To Date</Label>
                  <Input
                    id="dateTo"
                    name="dateTo"
                    type="date"
                    value={filters.dateTo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6 gap-2">
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
