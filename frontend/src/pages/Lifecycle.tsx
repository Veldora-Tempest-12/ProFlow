import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Lifecycle() {
  const [count, setCount] = useState(0);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <h1 className="text-2xl font-bold">Lifecycle</h1>
          <p className="text-lg">Counter: {count}</p>
          <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
