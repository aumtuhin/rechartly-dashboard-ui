
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { PencilLine, Save, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  bio: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: user?.email || "alex.johnson@example.com",
    avatar: "",
    role: "Senior Data Analyst",
    department: "Analytics",
    location: "New York, USA",
    bio: "Experienced data analyst with a passion for turning complex data into actionable insights. Specialized in dashboard creation and data visualization.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    updates: false,
    marketing: false,
  });

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationChange = (field: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: !notificationSettings[field],
    });
  };

  const saveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const saveNotifications = () => {
    toast.success("Notification preferences updated");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <SidebarTrigger />
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Photo</CardTitle>
                    <CardDescription>
                      This is how others will recognize you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-4xl">
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <Save /> : <PencilLine />}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) =>
                            handleProfileChange("name", e.target.value)
                          }
                          readOnly={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            handleProfileChange("email", e.target.value)
                          }
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={profile.role}
                          onChange={(e) =>
                            handleProfileChange("role", e.target.value)
                          }
                          readOnly={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={profile.department}
                          onChange={(e) =>
                            handleProfileChange("department", e.target.value)
                          }
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) =>
                          handleProfileChange("location", e.target.value)
                        }
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profile.bio}
                        onChange={(e) =>
                          handleProfileChange("bio", e.target.value)
                        }
                        readOnly={!isEditing}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isEditing && (
                      <Button onClick={saveProfile}>Save Changes</Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Communication</h3>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifs">Email notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          id="email-notifs"
                          checked={notificationSettings.email}
                          onCheckedChange={() => handleNotificationChange("email")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifs">Push notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications in-app
                          </p>
                        </div>
                        <Switch
                          id="push-notifs"
                          checked={notificationSettings.push}
                          onCheckedChange={() => handleNotificationChange("push")}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Updates</h3>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="product-updates">Product updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about new features
                          </p>
                        </div>
                        <Switch
                          id="product-updates"
                          checked={notificationSettings.updates}
                          onCheckedChange={() => handleNotificationChange("updates")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing">Marketing emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive marketing and promotional emails
                          </p>
                        </div>
                        <Switch
                          id="marketing"
                          checked={notificationSettings.marketing}
                          onCheckedChange={() => handleNotificationChange("marketing")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveNotifications}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => toast.success("Password updated successfully")}>
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
