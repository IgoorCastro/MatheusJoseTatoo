"use client"

import type * as React from "react"
import {
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switch"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Matheis José",
    email: "matheusoliveira@hotmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Matheus José Tatoo",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Posts",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Adicionar",
          url: "/admin/upload",
        },
        {
          title: "Galeria",
          url: "/admin/portfolio",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

