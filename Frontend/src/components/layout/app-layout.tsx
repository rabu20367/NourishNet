
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Bell } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import NourishNetPinIcon from '@/components/icons/NourishNetPinIcon';


export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  const initialSidebarOpen = true; 
  // For SSR and initial client render, collapsibleMode will be based on this default.
  // It will then be updated after `hasMounted` is true.
  const initialCollapsibleMode = "icon"; 

  return (
    <SidebarProvider 
      defaultOpen={initialSidebarOpen} 
    >
      <Sidebar
        side="left"
        variant="sidebar" 
        // Determine collapsible mode:
        // - Before mount (SSR & initial client render): use initialCollapsibleMode
        // - After mount: use isMobile to decide between "offcanvas" (mobile) and "icon" (desktop)
        collapsible={hasMounted ? (isMobile ? "offcanvas" : "icon") : initialCollapsibleMode}
      >
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <div className="flex items-center h-full group-data-[collapsible=icon]:justify-center">
            {/* Full logo for expanded state */}
            <Image
              src="/nourishnet-logo.png"
              alt="NourishNet Logo"
              width={120} 
              height={40} 
              className="group-data-[collapsible=icon]:hidden" 
            />
            {/* Icon for collapsed state */}
            <NourishNetPinIcon
              className="hidden h-7 w-7 text-primary transition-transform duration-300 group-hover/sidebar-wrapper:rotate-[360deg] group-data-[collapsible=icon]:block" 
            />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center">
            <Settings className="h-5 w-5" />
            <span className="ml-2 group-data-[collapsible=icon]:hidden">Settings</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6 md:justify-end">
          <div className="flex items-center gap-2">
            {hasMounted && (
              <div className="md:hidden">
                 <SidebarTrigger />
              </div>
            )}
            <Image src="/nourishnet-logo.png" alt="NourishNet Logo" width={120} height={40} />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person portrait" />
              <AvatarFallback>NN</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
