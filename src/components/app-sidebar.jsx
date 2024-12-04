import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ContextPanel } from "@/lib/ContextPanel";


export function AppSidebar({ ...props }) {
  const {emailL,nameL} = React.useContext(ContextPanel)

  const data = {
    user: {
      name: `${nameL}`,
      email: `${emailL}`,
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "SIGA FAIR ",
        logo: GalleryVerticalEnd,
        plan: "AgSolution",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Job Offered",
        url: "/job-offered",
        icon: SquareTerminal,
        
      },
      {
        title: "Job Require",
        url: "/job-require",
        icon: SquareTerminal,
        
      },
      {
        title: "Directory",
        url: "/directory",
        icon: Bot,
        
      },
      {
        title: "Business Opp.",
        url: "/business-opp",
        icon: BookOpen,
        
      },
      {
        title: "Amount",
        url: "/amount",
        icon: Settings2,
       
      },
    ],
    projects: [
      {
        name: "Dashboard",
        url: "/home",
        icon: Frame,
      },
      {
        name: "Registrations",
        url: "/registration",
        icon: PieChart,
      },
      {
        name: "Participants",
        url: "/participant",
        icon: Map,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
      <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
