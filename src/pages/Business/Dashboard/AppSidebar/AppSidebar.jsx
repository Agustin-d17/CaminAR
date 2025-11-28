import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"
import { useBusiness } from "@/context/BusinessContext"

import {
  ChevronRight,
  LogOut,
  Settings,
  User,
  ChartColumn,
  MapPin,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    title: "Perfil",
    url: "/business/dashboard/profile",
    icon: User,
  },
  {
    title: "Analytics",
    url: "/business/dashboard/analytics",
    icon: ChartColumn,
  },
  {
    title: "Configuración",
    url: "/business/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const { business } = useBusiness()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-950">
            <MapPin className="h-4 w-4 text-white" />
          </div>

          <div className="font-semibold">
            <span className="text-2xl font-bold text-blue-950">
              Camin<span className="text-blue-400">AR</span>
            </span>
          </div>
        </div>

        {/* Si querés mostrar el negocio, ya queda listo */}
        {business && (
          <p className="px-4 pb-2 text-sm text-muted-foreground truncate">
            {business.name}
          </p>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationItems.map((item) =>
              item.items ? (
                <Collapsible key={item.title} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="ml-6 mt-1 border-l pl-2">
                        {item.items.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link className="text-sm" to={subItem.url}>
                                {subItem.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="p-5">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="outline"
          className="inline-flex items-center space-x-2 cursor-pointer hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </Button>

        <div className="p-4 border-t text-sm text-muted-foreground">
          Development version 0.3.0
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
