"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconMenu2, IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useLocalStorage } from "usehooks-ts";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Label } from "../label";
import { Switch } from "../switch";

export const AvatarMenu = () => {
  const imageUrl = "";
  const { setTheme } = useTheme();
  const [inAppDiagramView, setInAppDiagramView] = useLocalStorage(
    "inAppDiagramView",
    false,
    { initializeWithValue: false }
  );

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {imageUrl ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={imageUrl} alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ) : (
            <IconMenu2 />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Switch
              id="in-app-diagram-view"
              checked={inAppDiagramView}
              onCheckedChange={setInAppDiagramView}
              className="data-[state=checked]:bg-green-500"
            />
            <Label htmlFor="in-app-diagram-view">In-app diagram view</Label>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Theme</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setTheme("light")}>
            <IconSunFilled /> Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <IconMoonFilled /> Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
