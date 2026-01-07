import { useState } from "react";
import { Bell, ChevronDown, LogOut, Search } from "lucide-react";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";

const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex items-center justify-between p-2 border-b w-full">
      <InputGroup className="w-md">
        <InputGroupInput
          type="text"
          placeholder="Search for invoices, clients, etc."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
        <InputGroupAddon>
          <Button variant="ghost" size="icon">
            <Search size={16} />
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell size={16} />
          </Button>
        </div>
        <ThemeToggle />
        <Separator orientation="vertical" />
        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown size={16} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    john.doe@example.com
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut size={16} />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
