import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [created, setCreated] = useState(false);

  const handleCreate = () => {
    if (projectName.trim()) {
      // In a real app you'd send to backend; here we just show a success state.
      setCreated(true);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <h1 className="text-2xl font-bold">Create Project</h1>
          <Input
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Button onClick={handleCreate}>Create</Button>
          {created && (
            <p className="mt-2 text-green-600">Project "{projectName}" created!</p>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
