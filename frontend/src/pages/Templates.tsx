import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useTemplateStore from "@/store/templateStore";

export default function Templates() {
  const { templates, isLoading, error, fetchTemplates } = useTemplateStore();

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && <p>Loading templates...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <ul className="space-y-2">
                {templates.map((t) => (
                  <li key={t.id} className="p-2 border rounded bg-muted">
                    <h3 className="font-medium">{t.name}</h3>
                    {t.description && <p className="text-sm text-muted-foreground">{t.description}</p>}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
