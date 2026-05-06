import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Analytics() {
  const [show, setShow] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <Button onClick={() => setShow((v) => !v)}>
            {show ? "Hide Details" : "Show Details"}
          </Button>
          {show && (
            <div className="mt-4 p-4 border rounded bg-muted">
              <p>Analytics data placeholder – interactive charts could go here.</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
