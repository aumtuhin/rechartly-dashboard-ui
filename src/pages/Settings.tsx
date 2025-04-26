
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render the switch when the component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    toast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <SidebarTrigger />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="darkMode" 
                  checked={theme === 'dark'}
                  onCheckedChange={handleThemeChange}
                />
                <Label htmlFor="darkMode">Dark mode</Label>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
