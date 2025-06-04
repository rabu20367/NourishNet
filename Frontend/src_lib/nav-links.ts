import type { LucideIcon } from "lucide-react";
import {
  MapPin,
  TrendingUp,
  LayoutDashboard,
  UserPlus,
  BrainCircuit,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip?: string;
}

export const mainNavLinks: NavLink[] = [
  {
    href: "/",
    label: "Live Map",
    icon: MapPin,
    tooltip: "View Live Map (M)", // M for map if we use shortcuts
  },
  {
    href: "/impact",
    label: "Impact",
    icon: TrendingUp,
    tooltip: "Impact Dashboard (I)",
  },
  {
    href: "/forecast",
    label: "Forecasts",
    icon: BarChart2,
    tooltip: "View Forecasts (F)",
  },
  {
    href: "/donor/dashboard",
    label: "Donor Hub",
    icon: LayoutDashboard,
    tooltip: "Donor Dashboard (D)",
  },
  {
    href: "/volunteer/signup",
    label: "Volunteer",
    icon: UserPlus,
    tooltip: "Volunteer Signup (V)",
  },
  {
    href: "/ai/match",
    label: "AI Matching",
    icon: BrainCircuit,
    tooltip: "AI Donation Matching (A)",
  },
];

export const utilityNavLinks: NavLink[] = [
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    tooltip: "User Settings (S)",
  },
  {
    href: "/logout", // This would be an action, not a page for a real app
    label: "Logout",
    icon: LogOut,
    tooltip: "Logout",
  },
];
