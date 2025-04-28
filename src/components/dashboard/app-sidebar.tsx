"use client";

import * as React from "react";
import {
  BotMessageSquare,
  User,
  CreditCard,
  Sparkle,
  MessageCircle
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavSettings } from "@/components/dashboard/nav-settings";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
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
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "AI chat",
      url: "/",
      icon: Sparkle,
      isActive: true,
      items: [
        {
          title: "Repository Test",
          url: "/",
          icon: MessageCircle
        }
      ],
    },
  ],
  settings: [
    {
      name: "User Profile",
      url: "/",
      icon: User,
    },
    {
      name: "Billing",
      url: "/",
      icon: CreditCard,
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
        <NavMain items={data.navMain} />
        <NavSettings settings={data.settings} />
      </SidebarContent>
      <SidebarFooter>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
