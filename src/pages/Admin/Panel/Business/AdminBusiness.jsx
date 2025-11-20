import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Building2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import BusinessCard from "./BusinessCard/BusinessCard"

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState([])
  const [categories, setCategories] = useState([])
  const [localities, setLocalities] = useState([])
  const [provinces, setProvinces] = useState([])

  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  // -----------------------------
  // 1. Obtener data completa desde Supabase
  // -----------------------------
  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const [
        { data: businessData },
        { data: categoriesData },
        { data: localitiesData },
        { data: provincesData }
      ] = await Promise.all([
        supabase.from("businesses").select("*"),
        supabase.from("categories").select("*"),
        supabase.from("localities").select("*"),
        supabase.from("provinces").select("*")
      ])

      setBusinesses(businessData || [])
      setCategories(categoriesData || [])
      setLocalities(localitiesData || [])
      setProvinces(provincesData || [])

      setLoading(false)
    }

    fetchData()
  }, [])

  // -----------------------------
  // 2. Filtro de búsqueda
  // -----------------------------
  const filteredBusinesses = businesses.filter((b) => {
    const t = searchTerm.toLowerCase()

    return (
      b.name.toLowerCase().includes(t) ||
      b.description.toLowerCase().includes(t)
    )
  })

  // -----------------------------
  // 3. Render
  // -----------------------------
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Negocios</h1>
          <p className="text-slate-500">Administra todos los negocios registrados en la plataforma</p>
        </div>
        <Link to="/admin/panel/business/create">
          <Button className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Crear Negocio
          </Button>
        </Link>
      </div>

      {/* Buscador */}
      <Card>
        <CardHeader>
          <CardTitle>Todos los negocios</CardTitle>
          <CardDescription className="text-slate-500">
            Listado general
          </CardDescription>
        </CardHeader>
        <CardContent>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-slate-500 py-8">Cargando...</p>
          )}

          {/* Vacío */}
          {!loading && filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No hay negocios registrados</p>
              <Link to="/admin/panel/business/create">
                <Button className="gap-2 cursor-pointer">
                  <Plus className="h-4 w-4" />
                  Crear Primer Negocio
                </Button>
              </Link>
            </div>
          )}

          {/* Listado */}
          {!loading && filteredBusinesses.length > 0 && (
            filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                categories={categories}
                localities={localities}
                provinces={provinces}
              />
            ))
          )}

        </CardContent>
      </Card>
    </div>
  )
}
