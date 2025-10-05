import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, User } from "lucide-react";
import { useAuth } from "../hooks/useAurh";

export const DropdownProfile = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = "/"; // Redireciona para a página inicial após logout
    }

    const nameLocal = localStorage.getItem("displayName");

    if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User
          size={30}
          className=" text-muted-foreground border rounded-md p-1 cursor-pointer"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel> { user.displayName ?? nameLocal } </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleLogout()}
        >
           <LogIn />
        Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
