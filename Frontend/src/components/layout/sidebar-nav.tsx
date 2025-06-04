'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { mainNavLinks } from '@/lib/nav-links';
import type { NavLink } from '@/lib/nav-links';
import { cn } from '@/lib/utils';

export function SidebarNav() {
  const pathname = usePathname();

  const renderLink = (link: NavLink, index: number) => {
    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
    return (
      <SidebarMenuItem key={`${link.label}-${index}`}>
        <Link href={link.href} legacyBehavior passHref>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            tooltip={{ children: link.tooltip || link.label, className: "bg-sidebar text-sidebar-foreground border-sidebar-border" }}
            className={cn(
              isActive 
                ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <a> {/*<a> tag is required by asChild with next/link legacyBehavior */}
              <link.icon />
              <span>{link.label}</span>
            </a>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <SidebarMenu className="flex-1 p-2">
        {mainNavLinks.map(renderLink)}
      </SidebarMenu>
      {/* Utility links can be added here if needed, or in footer */}
      {/* <SidebarMenu className="mt-auto p-2">
        {utilityNavLinks.map(renderLink)}
      </SidebarMenu> */}
    </div>
  );
}
