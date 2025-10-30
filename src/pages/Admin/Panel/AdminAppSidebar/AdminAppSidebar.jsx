import React from "react"
import { ChevronRight, LogOut, Settings, User, ChartColumn, LayoutDashboard, MapPin, Building2 } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
import { Link, useNavigate } from "react-router-dom"

const navigationItems = [
    {
        title: "Dashboard",
        url: "/admin/panel/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Places",
        url: "/admin/panel/places",
        icon: MapPin,
    },
    {
        title: "Business",
        url: "/admin/panel/business",
        icon: Building2,
    },
    {
      title: "Settings",
      url: "/admin/panel/settings",
      icon: Settings,
    }
]

export function AdminAppSidebar({ ...props }) {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("currentAdmin")
    navigate("/")
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-950 text-primary-foreground">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="font-semibold">
            <span className="text-2xl font-bold text-blue-950">Camin<span className="text-blue-400">AR</span></span>
          </div>
        </div>
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
                              <a href={subItem.url} className="text-sm">
                                {subItem.title}
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link to={item.url} className="p-5">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" className="inline-flex items-center space-x-2 cursor-pointer hover:text-red-600" onClick={handleLogout}>
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