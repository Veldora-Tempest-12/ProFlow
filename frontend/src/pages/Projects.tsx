import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Projects() {
  const [projectName, setProjectName] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (projectName.trim()) {
      setSaved(true);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Input
            placeholder="Enter new project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Button onClick={handleSave}>Create Project</Button>
          {saved && (
            <p className="mt-2 text-green-600">
              Project "{projectName}" created!
            </p>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
