import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { FaPython, FaJs, FaCode } from "react-icons/fa";
import { DiGo, DiJava, DiRuby } from "react-icons/di";
import useTemplateStore from "@/store/templateStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function TemplatesPage() {
  // State for search query
  const [search, setSearch] = useState("");
  const { templates, isLoading, error, fetchTemplates } = useTemplateStore();
  const filteredTemplates = templates.filter((tpl) => {
    const q = search.toLowerCase();
    return (
      tpl.name?.toLowerCase().includes(q) ||
      (tpl.description && tpl.description.toLowerCase().includes(q))
    );
  });

  // Theme handling
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleTheme = () => setDark((prev) => !prev);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Show toast on error
  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <Header dark={dark} toggleTheme={toggleTheme} />
      <div className="bg-muted/40 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Templates</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Explore ready‑made project templates to kickstart your workflow.
            </p>
            <div className="max-w-md mx-auto flex items-center space-x-2">
              <Input
                placeholder="Search templates…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
          </section>
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-2xl" />
              ))}
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <span>{error}</span>
            </Alert>
          )}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted/30 mb-4">
                    <svg
                      className="h-6 w-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M9 12h6M9 16h6M9 8h6M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    No templates found
                  </h2>
                  <p className="text-muted-foreground">
                    Try adjusting your search or check back later.
                  </p>
                </div>
              ) : (
                filteredTemplates.map((tpl) => (
                  <Card
                    key={tpl.id}
                    className="h-full bg-card rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    <CardHeader className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center rounded-full uppercase">
                          {tpl.name?.charAt(0) ?? "?"}
                        </Avatar>
                        <CardTitle className="text-xl font-semibold">
                          {tpl.name}
                        </CardTitle>
                      </div>
                      {tpl.tags && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {Array.isArray(tpl.tags)
                            ? tpl.tags.map((tag: string) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))
                            : null}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-6">
                      {tpl.description && (
                        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                          {tpl.description}
                        </CardDescription>
                      )}
                      {Array.isArray(tpl.languages) &&
                        tpl.languages.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {tpl.languages.map((lang: string) => {
                              const IconMap: Record<string, any> = {
                                javascript: FaJs,
                                python: FaPython,
                                go: DiGo,
                                ruby: DiRuby,
                                java: DiJava,
                                typescript: FaJs,
                              };
                              const Icon =
                                IconMap[lang.toLowerCase()] || FaCode;
                              return (
                                <span
                                  key={lang}
                                  className="inline-flex items-center gap-1 text-xs font-medium text-foreground px-2 py-0.5 rounded border border-muted/30"
                                >
                                  <Icon className="h-4 w-4" />
                                  {lang}
                                </span>
                              );
                            })}
                          </div>
                        )}
                    </CardContent>
                    <div className="border-t border-border/30 px-6 py-4 flex justify-between items-center">
                      {/* <Badge variant="outline" className="text-xs">
                        ID: {tpl.} 
                      </Badge> */}
                      <button className="text-sm font-medium text-primary hover:underline">
                        View Details
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
          <Toaster />
        </div>
      </div>
      <Footer />
    </div>
  );
}
