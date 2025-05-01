"use client";

import * as React from "react";
import {
  User,
  CreditCard,
  BookOpen,
  MapPinHouse
} from "lucide-react";

import { NavGroup } from "@/components/dashboard/nav-group";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavHome } from "@/components/dashboard/nav-home";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  platforms: [
    { 
      name: "Courses",
      url: "/courses",
      icon: BookOpen,
    },
    {
      name: "Residences",
      url: "/residences",
      icon: MapPinHouse,
    }
  ],
  settings: [
    {
      group: "Settings",
      name: "User Profile",
      url: "/",
      icon: User,
    }
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavHome />
        <NavGroup group="Platforms" items={data.platforms} />
        <NavGroup group="Settings" items={data.settings} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
