
import { useEffect, useState } from "react";
import {
  Check,
  Palette,
  Settings2,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ThemeColor = {
  name: string;
  color: string;
  background: string;
  foreground: string;
  variable: string;
  value: string;
};

const themeColors: ThemeColor[] = [
  {
    name: "Default",
    color: "#000000",
    background: "bg-white dark:bg-gray-950",
    foreground: "text-gray-950 dark:text-white",
    variable: "--primary",
    value: "222.2 47.4% 11.2%",
  },
  {
    name: "Blue",
    color: "#2563EB",
    background: "bg-white dark:bg-gray-950",
    foreground: "text-blue-600 dark:text-blue-400",
    variable: "--primary",
    value: "217.2 91.2% 59.8%",
  },
  {
    name: "Green",
    color: "#10B981",
    background: "bg-white dark:bg-gray-950",
    foreground: "text-green-600 dark:text-green-400",
    variable: "--primary",
    value: "142.1 70.6% 45.3%",
  },
  {
    name: "Purple",
    color: "#8B5CF6",
    background: "bg-white dark:bg-gray-950",
    foreground: "text-purple-600 dark:text-purple-400",
    variable: "--primary",
    value: "262.1 83.3% 57.8%",
  },
  {
    name: "Rose",
    color: "#F43F5E",
    background: "bg-white dark:bg-gray-950",
    foreground: "text-rose-600 dark:text-rose-400",
    variable: "--primary",
    value: "346.8 77.2% 49.8%",
  },
];

const appearanceOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const fontOptions = [
  { label: "Default", value: "font-sans" },
  { label: "Serif", value: "font-serif" },
  { label: "Monospace", value: "font-mono" },
];

const borderRadiusOptions = [
  { label: "Default", value: "0.5rem" },
  { label: "Rounded", value: "1rem" },
  { label: "Square", value: "0rem" },
];

export function ThemeCustomizer() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState<ThemeColor>(themeColors[0]);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
  const [selectedRadius, setSelectedRadius] = useState(borderRadiusOptions[0]);

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
      document.documentElement.classList.add(selectedFont.value);
      
      // Apply selected border radius
      document.documentElement.style.setProperty("--radius", selectedRadius.value);
    }
  }, [selectedColor, selectedFont, selectedRadius, mounted]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleColorChange = (color: ThemeColor) => {
    setSelectedColor(color);
    toast.success(`Theme color set to ${color.name}`);
  };

  const handleFontChange = (font: typeof fontOptions[number]) => {
    setSelectedFont(font);
    toast.success(`Font set to ${font.label}`);
  };

  const handleRadiusChange = (radius: typeof borderRadiusOptions[number]) => {
    setSelectedRadius(radius);
    toast.success(`Border radius set to ${radius.label}`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Theme Customizer">
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-medium leading-none">
              <Settings2 className="h-4 w-4" />
              Appearance
            </h3>
            <div className="flex gap-2">
              {appearanceOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={theme === option.value ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => handleThemeChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-medium leading-none">
              <Palette className="h-4 w-4" />
              Theme Color
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {themeColors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={cn(
                    "h-8 w-full rounded-md border",
                    selectedColor.name === color.name && "ring-2 ring-primary"
                  )}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                  onClick={() => handleColorChange(color)}
                >
                  {selectedColor.name === color.name && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium leading-none">Font</h3>
            <div className="flex gap-2">
              {fontOptions.map((font) => (
                <Button
                  key={font.value}
                  variant={selectedFont.value === font.value ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => handleFontChange(font)}
                >
                  {font.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium leading-none">Border Radius</h3>
            <div className="flex gap-2">
              {borderRadiusOptions.map((radius) => (
                <Button
                  key={radius.value}
                  variant={selectedRadius.value === radius.value ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => handleRadiusChange(radius)}
                >
                  {radius.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
