
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Check, Palette, Sun, Moon, ColorPicker } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";

type ThemeColor = {
  name: string;
  color: string;
  variable: string;
  value: string;
};

const themeColors: ThemeColor[] = [
  {
    name: "Default",
    color: "#000000",
    variable: "--primary",
    value: "222.2 47.4% 11.2%",
  },
  {
    name: "Blue",
    color: "#2563EB",
    variable: "--primary",
    value: "217.2 91.2% 59.8%",
  },
  {
    name: "Green",
    color: "#10B981",
    variable: "--primary",
    value: "142.1 70.6% 45.3%",
  },
  {
    name: "Purple",
    color: "#8B5CF6",
    variable: "--primary",
    value: "262.1 83.3% 57.8%",
  },
  {
    name: "Rose",
    color: "#F43F5E",
    variable: "--primary",
    value: "346.8 77.2% 49.8%",
  },
  {
    name: "Orange",
    color: "#F97316",
    variable: "--primary",
    value: "24.6 95% 53.1%",
  },
];

const fontOptions = [
  { label: "Sans", value: "font-sans" },
  { label: "Serif", value: "font-serif" },
  { label: "Mono", value: "font-mono" },
];

const borderRadiusOptions = [
  { label: "Small", value: "0.375rem" },
  { label: "Default", value: "0.5rem" },
  { label: "Large", value: "1rem" },
  { label: "None", value: "0rem" },
];

const ThemeCustomization = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState<ThemeColor>(themeColors[0]);
  const [selectedFont, setSelectedFont] = useState("font-sans");
  const [selectedRadius, setSelectedRadius] = useState("0.5rem");
  const [customCSS, setCustomCSS] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Apply selected color
      document.documentElement.style.setProperty(
        selectedColor.variable,
        selectedColor.value
      );
      
      // Apply selected font
      document.documentElement.className = document.documentElement.className
        .replace(/font-(sans|serif|mono)/g, "")
        .trim();
      document.documentElement.classList.add(selectedFont);
      
      // Apply selected border radius
      document.documentElement.style.setProperty("--radius", selectedRadius);
    }
  }, [selectedColor, selectedFont, selectedRadius, mounted]);

  const handleColorChange = (color: ThemeColor) => {
    setSelectedColor(color);
    toast.success(`Theme color set to ${color.name}`);
  };

  const handleFontChange = (value: string) => {
    setSelectedFont(value);
    toast.success(`Font style updated`);
  };

  const handleRadiusChange = (value: string) => {
    setSelectedRadius(value);
    toast.success(`Border radius updated`);
  };

  const applyCustomCSS = () => {
    try {
      const styleElement = document.createElement("style");
      styleElement.textContent = customCSS;
      document.head.appendChild(styleElement);
      toast.success("Custom CSS applied");
    } catch (error) {
      toast.error("Failed to apply custom CSS");
    }
  };

  // Preview component for theme changes
  const ThemePreview = () => {
    return (
      <div className="space-y-4">
        <div className="flex gap-3">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Card Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a preview of your customized theme</p>
          </CardContent>
        </Card>
      </div>
    );
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
            <h1 className="text-3xl font-bold">Theme Customization</h1>
            <SidebarTrigger />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5" /> / <Moon className="h-5 w-5" /> 
                    Theme Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => setTheme("system")}
                    >
                      System
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Primary Color
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {themeColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        className={cn(
                          "h-12 rounded-md flex items-center justify-center",
                          selectedColor.name === color.name && "ring-2 ring-primary"
                        )}
                        style={{ backgroundColor: color.color }}
                        onClick={() => handleColorChange(color)}
                      >
                        {selectedColor.name === color.name && (
                          <Check className="h-5 w-5 text-white" />
                        )}
                        <span className="sr-only">{color.name}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedColor.name}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Typography</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Font Family</p>
                      <ToggleGroup type="single" value={selectedFont} onValueChange={(value) => value && handleFontChange(value)}>
                        {fontOptions.map((font) => (
                          <ToggleGroupItem key={font.value} value={font.value}>
                            {font.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Border Radius</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium mb-2">Roundness</p>
                    <ToggleGroup type="single" value={selectedRadius} onValueChange={(value) => value && handleRadiusChange(value)}>
                      {borderRadiusOptions.map((option) => (
                        <ToggleGroupItem key={option.value} value={option.value}>
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Custom CSS</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Enter custom CSS here..."
                    className="font-mono text-xs"
                    rows={5}
                    value={customCSS}
                    onChange={(e) => setCustomCSS(e.target.value)}
                  />
                  <Button className="mt-2" onClick={applyCustomCSS}>
                    <ColorPicker className="h-4 w-4 mr-2" />
                    Apply Custom CSS
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ThemePreview />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings Export</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => {
                    const settings = {
                      theme,
                      primaryColor: selectedColor.name,
                      font: selectedFont,
                      borderRadius: selectedRadius,
                    };
                    
                    navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
                    toast.success("Theme settings copied to clipboard");
                  }}>
                    Copy Theme Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ThemeCustomization;
