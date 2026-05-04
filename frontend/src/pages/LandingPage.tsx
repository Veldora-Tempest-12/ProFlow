import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HiOutlineArrowRight } from "react-icons/hi";
import { BiGitBranch } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import {
  MdOutlineCheckCircle,
  MdOutlineLightbulb,
  MdOutlineAssignment,
  MdOutlineCode,
  MdOutlineBarChart,
  MdOutlineNotificationsNone,
} from "react-icons/md";

/**
 * LandingPage – Updated to use React Icons for all UI elements.
 * Maintains the dark-mode capable, clean typography and interactive
 * elements described in the original design[cite: 1].
 */
export default function LandingPage() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <div className="font-sans text-foreground bg-background min-h-svh overflow-x-hidden scroll-smooth">
      {/* Navigation */}
      <Header dark={dark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-primary/10 via-background to-background"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500 animate-pulse">
          Build better software with{" "}
          <span className="relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
              ProFlow
            </span>
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          ProFlow is a task management tracker for software projects. Track issues,
          manage sprints, and ship code — from backlog to production.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            className="hover:scale-105 hover:shadow-xl text-white transition-all"
            size="lg"
          >
            <a
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Start Building for Free{" "}
            </a>
            <HiOutlineArrowRight className="ml-2 text-xl" />
          </Button>
          <Button variant="outline">
            <a
              href="https://github.com/veldora-tempest-12/proflow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaGithub className="mr-2 text-lg" /> View on GitHub
            </a>
          </Button>
        </div>
        <div className="mt-12 w-full max-w-4xl h-64 bg-card rounded-2xl shadow-2xl shadow-primary/20 flex items-center justify-center">
          <div className="text-muted-foreground" role="img" aria-label="Dashboard mockup placeholder"></div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-16 bg-background">
        <h2 className="text-center text-3xl font-semibold mb-12">
          Everything you need to ship great software
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <MdOutlineBarChart className="mr-2 text-xl" aria-hidden="true" /> Time Tracking
            </h3>
            <div className="h-24 bg-muted rounded-md flex items-center justify-center mt-4">
              <span className="text-muted-foreground text-sm">
                [Chart preview]
              </span>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <MdOutlineNotificationsNone className="mr-2 text-xl" aria-hidden="true" /> @Mentions
            </h3>
            <div className="h-24 bg-muted rounded-md flex items-center justify-center mt-4">
              <span className="text-muted-foreground text-sm">
                [Notifications]
              </span>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <BiGitBranch className="mr-2 text-xl" aria-hidden="true" /> Git Sync
            </h3>
            <div className="h-24 bg-muted rounded-md flex items-center justify-center mt-4">
              <span className="text-muted-foreground text-sm">
                [Sync preview]
              </span>
            </div>
          </div>
          {/* Additional Features */}
          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <MdOutlineAssignment className="mr-2 text-xl" aria-hidden="true" /> Project Templates
            </h3>
            <div className="h-24 bg-muted rounded-md flex items-center justify-center mt-4">
              <span className="text-muted-foreground text-sm">
                [Templates preview]
              </span>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <FaGithub className="mr-2 text-xl" aria-hidden="true" /> Integrations
            </h3>
            <div className="h-24 bg-muted rounded-md flex items-center justify-center mt-4">
              <span className="text-muted-foreground text-sm">
                [Integrations preview]
              </span>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <MdOutlineCheckCircle className="mr-2 text-xl" aria-hidden="true" /> Activity Log
            </h3>
            <div className="h-24 bg-muted rounded-md flex items-center justify-center mt-4">
              <span className="text-muted-foreground text-sm">
                [Activity preview]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Tabs */}
      <section className="py-16 bg-gradient-to-b from-background to-background/90">
        <h2 className="text-center text-3xl font-semibold mb-8">
          From idea to shipped
        </h2>
        <Tabs defaultValue="backlog" className="max-w-4xl mx-auto px-4">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-6 bg-transparent">
            {[
              { value: "backlog", label: "Backlog", icon: MdOutlineLightbulb },
              { value: "todo", label: "To Do", icon: MdOutlineAssignment },
              {
                value: "inprogress",
                label: "In Progress",
                icon: MdOutlineCode,
              },
              { value: "done", label: "Done", icon: MdOutlineCheckCircle },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <TabsTrigger
                  key={step.value}
                  value={step.value}
                  className="flex items-center gap-1 px-4 py-2"
                >
                  <Icon className="text-lg" /> {step.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <div className="border border-border/30 rounded-xl p-8 bg-card">
            <TabsContent value="backlog">
              <p className="text-muted-foreground">
                Capture ideas and feature requests.
              </p>
            </TabsContent>
            <TabsContent value="todo">
              <p className="text-muted-foreground">
                Plan your sprint and prioritize.
              </p>
            </TabsContent>
            <TabsContent value="inprogress">
              <p className="text-muted-foreground">
                Develop with full context.
              </p>
            </TabsContent>
            <TabsContent value="done">
              <p className="text-muted-foreground">Ship with confidence.</p>
            </TabsContent>
          </div>
        </Tabs>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <h2 className="text-center text-3xl font-semibold mb-8">
          Questions? Answers.
        </h2>
        <Accordion
          itemType="single"
          className="max-w-3xl mx-auto space-y-2 px-4"
        >
          {[
            "What's the difference between Open Source and Private projects?",
            "Can I self‑host ProFlow?",
            "How does the GitHub/GitLab sync work?",
            "Is there a free trial for Team plans?",
            "What happens to my data if I cancel?",
          ].map((q, i) => (
            <AccordionItem
              key={i}
              value={String(i)}
              className="border border-border/30 rounded-md"
            >
              <AccordionTrigger className="flex w-full items-center justify-between p-4 text-left text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180">
                {q}
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-muted-foreground">
                <p>
                  Answer for "{q}" goes here. This follows the concise design
                  requirements.
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
