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
import { NavMainUpdate } from "./nav-main-update";


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
        title: "Payment Mediation",
        url: "/amount",
        icon: Settings2,
       
      },
      {
        title: "Business Expansion",
        url: "/business-opp",
        icon: BookOpen,
        
      },
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
      
    ],
    navMain1: [
    
    
      {
        title: "Directory",
        url: "/directory",
        icon: Bot,
        
      },
      
      {
        title: "Latest News",
        url: "#",
        icon: SquareTerminal,
        
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
        name: "Id Card",
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
        <NavMainUpdate items={data.navMain1} />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
