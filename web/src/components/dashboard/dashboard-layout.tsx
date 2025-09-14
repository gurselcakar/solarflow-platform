'use client';

import { useSession } from 'next-auth/react';

import { AppSidebar } from './sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    title: string;
    url?: string;
  }>;
}

export function DashboardLayout({
  children,
  title,
  subtitle,
  breadcrumbs
}: DashboardLayoutProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session } = useSession();
  // session is available for future use

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumbs && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => (
                    <div key={item.title} className="flex items-center gap-2">
                      {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                      <BreadcrumbItem className="hidden md:block">
                        {item.url && index !== breadcrumbs.length - 1 ? (
                          <BreadcrumbLink href={item.url}>
                            {item.title}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>

        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {(title || subtitle) && (
            <div className="space-y-1">
              {title && (
                <h1 className="text-2xl font-bold tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}