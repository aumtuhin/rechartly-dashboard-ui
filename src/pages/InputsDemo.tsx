
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { TextCursor, Textarea as TextareaIcon, Checkbox as CheckboxIcon, Toggle, Sliders } from "lucide-react";
import { toast } from "sonner";

const InputsDemo = () => {
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    password: "",
    message: "",
    agreed: false,
    notifications: false,
    volume: [50]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Form submitted successfully");
    console.log("Form data:", formData);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Input Fields</h1>
            <SidebarTrigger />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text Inputs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TextCursor className="h-5 w-5" />
                    Text Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Text</Label>
                    <Input 
                      id="text" 
                      placeholder="Enter some text" 
                      value={formData.text}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Textarea */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TextareaIcon className="h-5 w-5" />
                    Textarea
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here" 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Checkbox and Switch */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckboxIcon className="h-5 w-5" />
                    Toggles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="agreed" 
                      checked={formData.agreed}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, agreed: checked as boolean})
                      }
                    />
                    <Label htmlFor="agreed">I agree to the terms and conditions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="notifications" 
                      checked={formData.notifications}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, notifications: checked})
                      }
                    />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Slider */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="h-5 w-5" />
                    Slider
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume: {formData.volume[0]}%</Label>
                    <Slider 
                      id="volume"
                      min={0}
                      max={100}
                      step={1}
                      value={formData.volume}
                      onValueChange={(value) => setFormData({...formData, volume: value})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button type="submit" className="mt-8">Submit Form</Button>
          </form>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default InputsDemo;
