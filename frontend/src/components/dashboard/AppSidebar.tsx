import * as React from "react";
import useAuthStore from "@/store/authStore";

import { NavMain } from "@/components/dashboard/NavMain";
import { NavSecondary } from "@/components/dashboard/NavSecondary";
import { NavUser } from "@/components/dashboard/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  CommandIcon,
} from "lucide-react";
import { Button } from "../ui/button";

const fallbackUser = {
  username: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

const navData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Lifecycle",
      url: "/lifecycle",
      icon: <ListIcon />,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: <ChartBarIcon />,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: <FolderIcon />,
    },
    {
      title: "Team",
      url: "/team",
      icon: <UsersIcon />,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: <FileTextIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const storedUser = useAuthStore((state) => state.user);
  const user = storedUser ?? fallbackUser;
  const token = useAuthStore((state) => state.token);
  const getProfile = useAuthStore((state) => state.getProfile);
  React.useEffect(() => {
    if (token && !storedUser) {
      getProfile();
    }
  }, [token, storedUser, getProfile]);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">ProFlow</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="mb-2">
          <SidebarMenuItem className="flex justify-center ">
            <Button>create a project</Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
