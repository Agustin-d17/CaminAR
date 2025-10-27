import React, { useEffect, useState } from "react"
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom"
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
import { AppSidebar } from "@/pages/Admin/Panel/AppSidebar/AppSidebar"

export default function PanelLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [adminName, setAdminName] = useState("")

  useEffect(() => {
    const currentAdmin = localStorage.getItem("currentAdmin")
    if (!currentAdmin) {
      navigate("/admin/login")
      return
    }

    try {
      const user = JSON.parse(currentUser)
      const admins = JSON.parse(localStorage.getItem("admin") || "[]")
      const admin = admins.find((b) => b.userName === user.userName)
      if (admin) {
        setAdminName(admins.basicInfo.name)
      }
    } catch (error) {
      console.error("Error loading business data:", error)
    }

    setIsLoading(false)
  }, [navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  const lastSegment = location.pathname.split("/").filter(Boolean).pop()


  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                      Panel de Administracion
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex-1 p-6 bg-muted/30"><Outlet /></main>
        </SidebarInset>
    </SidebarProvider>
  )
}
