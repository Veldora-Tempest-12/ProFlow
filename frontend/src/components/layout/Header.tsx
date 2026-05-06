import { Button } from "@/components/ui/button";
import { MdOutlineWbSunny, MdOutlineNightlight } from "react-icons/md";
import { Avatar } from "../ui/avatar";

interface HeaderProps {
  dark: boolean;
  toggleTheme: () => void;
}

export default function Header({ dark, toggleTheme }: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="flex items-center space-x-2">
        <Avatar>
          <img src="/proflow-Logo.png" alt="" />
        </Avatar>
        <span className="text-xl font-medium">ProFlow</span>
      </div>
      <div className="hidden md:flex space-x-4">
        <a href="#features" className="hover:text-primary transition-colors">
          Features
        </a>
        <a href="#templates" className="hover:text-primary transition-colors">
          Templates
        </a>
        <a href="#pricing" className="hover:text-primary transition-colors">
          Pricing
        </a>
        <a href="#changelog" className="hover:text-primary transition-colors">
          Changelog
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {dark ? (
            <MdOutlineWbSunny className="text-xl" />
          ) : (
            <MdOutlineNightlight className="text-xl" />
          )}
        </Button>
        <Button variant="ghost">
          <a href="/login">Sign In</a>
        </Button>
        <Button variant="destructive">
          <a href="/register">Get Started — Free</a>
        </Button>
      </div>
    </nav>
  );
}
