// src/pages/Business/Dashboard/DashboardLayout.jsx
import React from "react"
import { useLocation, Outlet } from "react-router-dom"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/pages/Business/Dashboard/AppSidebar/AppSidebar"
import { useBusiness } from "@/context/BusinessContext"

export default function DashboardLayout() {
  const location = useLocation()
  const { business, loading } = useBusiness()

  // Loading global del contexto
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si por alguna razón no hay negocio, igual RequireBusinessAuth te empuja al login
  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">No se encontró información del negocio...</p>
      </div>
    )
  }

  // Último segmento para el breadcrumb
  const lastSegment = location.pathname.split("/").filter(Boolean).pop()
  const formattedSegment =
    lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)

  return (
    <SidebarProvider>
      <AppSidebar business={business} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    {business.name || "Mi Negocio"}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex-1 p-6 bg-muted/30">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
