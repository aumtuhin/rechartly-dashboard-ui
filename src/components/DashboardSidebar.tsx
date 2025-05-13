
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { ChartBar, Home, Settings, ChartPie, ChartLine, FileInput, Table, ListTodo, User, Palette, Calendar } from "lucide-react";

const items = [
  { title: "Overview", icon: Home, url: "/dashboard" },
  { title: "Analytics", icon: ChartBar, url: "/analytics" },
  { title: "Statistics", icon: ChartLine, url: "/statistics" },
  { title: "Reports", icon: ChartPie, url: "/reports" },
  { title: "Input Fields", icon: FileInput, url: "/inputs" },
  { title: "Data Management", icon: Table, url: "/data-management" },
  { title: "Task Management", icon: ListTodo, url: "/kanban" },
  { title: "Sprint Management", icon: Calendar, url: "/sprint-management" },
  { title: "Theme", icon: Palette, url: "/theme" },
  { title: "Settings", icon: Settings, url: "/settings" },
  {title: 'Profile', icon: User, url: '/profile'},
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
