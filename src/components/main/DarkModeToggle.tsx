"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/ThemeContext";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center mr-4">
      <Label htmlFor="dark-mode" className="sr-only">
        Dark Mode
      </Label>
      <Switch
        id="dark-mode"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
    </div>
  );
}
