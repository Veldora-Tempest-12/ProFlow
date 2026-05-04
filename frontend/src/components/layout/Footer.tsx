import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background pt-12 pb-8 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <span className="font-medium">ProFlow</span>
          </div>
          <p className="text-muted-foreground">
            Task management for developers
          </p>
          <div className="flex space-x-4">
            <FaTwitter className="text-xl cursor-pointer hover:text-primary transition-colors" />
            <FaGithub className="text-xl cursor-pointer hover:text-primary transition-colors" />
            <FaDiscord className="text-xl cursor-pointer hover:text-primary transition-colors" />
            <FaLinkedin className="text-xl cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium mb-2">Product</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <a href="#features" className="hover:text-primary">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-primary">
                Pricing
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-muted-foreground">
        © 2026 ProFlow. All rights reserved.
      </div>
    </footer>
  );
}
