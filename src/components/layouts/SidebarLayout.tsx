"use client";

import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname();
  
  // Generate breadcrumb items based on path
  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    
    // Initialize with Home breadcrumb
    const items = [
    ];
    
    // Add course-related breadcrumbs
    if (pathSegments.includes('courses')) {
      // Add Courses breadcrumb
      items.push(
        <BreadcrumbItem key="courses" className="hidden md:block">
          <BreadcrumbLink href="/courses" className="text-base">
            Courses
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
      
      // If we're on a specific course page (e.g., /courses/[course_id])
      if (pathSegments.length > 1 && pathSegments[0] === 'courses' && pathSegments[1]) {
        items.push(
          <BreadcrumbItem key="course-detail" className="hidden md:block">
            <BreadcrumbLink href={`/courses/${pathSegments[1]}`} className="text-base">
              {pathSegments[1]}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      }
    }
    
    return items;
  };
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {getBreadcrumbItems()}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-8 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
