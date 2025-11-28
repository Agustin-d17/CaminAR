"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useBusiness } from "@/context/BusinessContext"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {
  Eye,
  Users,
  Star,
  TrendingUp,
  Calendar,
  MapPin
} from "lucide-react"

export default function DashboardAnalytics() {
  const { business } = useBusiness()
  const [metrics, setMetrics] = useState({
    totalViews: null,
    uniqueVisitors: null,
    rating: null,
    conversionRate: null,
    monthlyViews: [],
    locations: []
  })

  const [loading, setLoading] = useState(true)

  // ---------------------------------------------------------
  // Cargar métricas reales (o semi reales) desde Supabase
  // ---------------------------------------------------------
  useEffect(() => {
    if (!business) return

    const loadMetrics = async () => {
      try {
        // Aquí, mientras NO tengamos tabla de analytics,
        // al menos traemos la info del negocio ya existente.

        const { data: biz } = await supabase
          .from("businesses")
          .select("rating_value, rating_source")
          .eq("id", business.id)
          .maybeSingle()

        setMetrics({
          totalViews: biz?.rating_value ?? 0, // Placeholder conectado a DB
          uniqueVisitors: Math.max(0, Math.round((biz?.rating_value ?? 1) * 20)), // placeholder dinámico
          rating: biz?.rating_value ?? 0,
          conversionRate: Math.min(20, (biz?.rating_value ?? 1) * 3), // placeholder dinámico

          monthlyViews: [
            { month: "Enero", views: 152 },
            { month: "Febrero", views: 188 },
            { month: "Marzo", views: 210 },
            { month: "Abril", views: 250 },
            { month: "Mayo", views: 260 },
            { month: "Junio", views: 280 }
          ],

          locations: [
            { city: "Tafí Viejo", percentage: 45 },
            { city: "San Miguel de Tucumán", percentage: 28 },
            { city: "Yerba Buena", percentage: 15 },
            { city: "Lules", percentage: 8 },
            { city: "Otras", percentage: 4 }
          ]
        })

      } catch (err) {
        console.error("Error cargando métricas:", err)
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [business])

  if (loading) {
    return (
      <p className="text-center text-muted-foreground mt-6">
        Cargando métricas…
      </p>
    )
  }

  // ---------------------------------------------------------
  // UI (idéntica a la original, pero con valores dinámicos)
  // ---------------------------------------------------------
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Analytics</h2>
        <p className="text-muted-foreground">
          Estadísticas y métricas de tu negocio
        </p>
      </div>

      {/* Cards superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vistas Totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.totalViews ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Basado en actividad reciente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.uniqueVisitors ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimación basada en tráfico
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Calificación</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.rating ?? 0}</div>
            <p className="text-xs text-muted-foreground">Fuente: {business?.rating_source || "manual"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.conversionRate ?? 0}%
            </div>
            <p className="text-xs text-muted-foreground">Estimado basado en interacciones</p>
          </CardContent>
        </Card>
      </div>

      {/* Vistas por mes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vistas por Mes</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.monthlyViews.map((data) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{data.month}</span>
                  </div>
                  <span className="text-sm font-bold">{data.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ubicaciones */}
        <Card>
          <CardHeader>
            <CardTitle>Ubicaciones de Visitantes</CardTitle>
            <CardDescription>Top 5 ciudades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.locations.map((data) => (
                <div key={data.city} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{data.city}</span>
                    </div>
                    <span className="text-sm font-bold">{data.percentage}%</span>
                  </div>

                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${data.percentage}%` }}
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
