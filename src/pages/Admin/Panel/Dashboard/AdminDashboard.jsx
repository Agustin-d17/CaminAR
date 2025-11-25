import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, TrendingUp, MapPin } from "lucide-react"

export default function AdminDashboard() {
  const navigate = useNavigate()


  const stats = [
    {
      title: "Total Negocios",
      value: "12",
      description: "+2 este mes",
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Usuarios Activos",
      value: "48",
      description: "+8 esta semana",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Visitas Totales",
      value: "1,234",
      description: "+15% vs mes anterior",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Ubicaciones",
      value: "8",
      description: "En Tafi Viejo",
      icon: MapPin,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Resumen general de la plataforma</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Nuevo negocio registrado", business: "Restaurante El Mirador", time: "Hace 2 horas" },
                { action: "Negocio actualizado", business: "Café Central", time: "Hace 5 horas" },
                { action: "Nueva ubicación agregada", business: "Plaza Principal", time: "Hace 1 día" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-slate-400 last:border-0">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-sm">{item.business}</p>
                    <p className="text-xs mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorías Populares</CardTitle>
            <CardDescription>Distribución de negocios por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Restaurantes", count: 5, percentage: 42 },
                { category: "Hoteles", count: 3, percentage: 25 },
                { category: "Cafeterías", count: 2, percentage: 17 },
                { category: "Otros", count: 2, percentage: 16 },
              ].map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.category}</span>
                    <span>
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
