
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginDemo = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate("/");
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Login Demo</h1>
            <SidebarTrigger />
          </div>
          
          <div className="max-w-md mx-auto mt-12">
            <Card className="border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Login</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to sign in to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <Lock className="h-4 w-4" />
                      </div>
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                      <button 
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, rememberMe: checked as boolean})
                      }
                    />
                    <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0" onClick={() => toast.info("Sign up functionality not implemented in this demo")}>
                    Sign up
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LoginDemo;
