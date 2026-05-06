import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Team() {
  const [member, setMember] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  const addMember = () => {
    if (member.trim()) {
      setMembers((prev) => [...prev, member.trim()]);
      setMember("");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <h1 className="text-2xl font-bold">Team</h1>
          <Input
            placeholder="Add team member name"
            value={member}
            onChange={(e) => setMember(e.target.value)}
          />
          <Button onClick={addMember}>Add Member</Button>
          {members.length > 0 && (
            <ul className="mt-4 space-y-2">
              {members.map((m, i) => (
                <li key={i} className="bg-muted p-2 rounded">
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
