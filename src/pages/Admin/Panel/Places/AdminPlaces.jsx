import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

import PlacesCard from "./PlacesCard/PlacesCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Plus, Search, MapPin } from "lucide-react"

export default function AdminPlaces() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [places, setPlaces] = useState([])
  const [categories, setCategories] = useState([])
  const [localities, setLocalities] = useState([])
  const [provinces, setProvinces] = useState([])

  // Cargar lugares desde Supabase
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const [placesRes, categoriesRes, localitiesRes, provincesRes] = await Promise.all([
          supabase.from("places").select("*"),
          supabase.from("categories").select("*"),
          supabase.from("localities").select("*"),
          supabase.from("provinces").select("*")
        ])

        if (placesRes.error || categoriesRes.error || localitiesRes.error || provincesRes.error) {
          console.error("Error al obtener datos:", {
            places: placesRes.error,
            categories: categoriesRes.error,
            localities: localitiesRes.error,
            provinces: provincesRes.error
          })
          return
        }

        setPlaces(placesRes.data || [])
        setCategories(categoriesRes.data || [])
        setLocalities(localitiesRes.data || [])
        setProvinces(provincesRes.data || [])
      } catch (err) {
        console.error("Error general:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaces()
  }, [])

  // Filtrado de búsqueda
  const filteredPlaces = useMemo(() => {
    return places.filter((place) =>
      place.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [places, searchQuery])

  // Contadores
  const total = places.length
  const touristCount = places.filter(p => p.category_id === "34e41b4a-a123-4fef-87c2-07f6a87d7b3b").length // Lugares turísticos
  const publicCount = places.filter(p => p.category_id === "c1b89d2c-1c60-4055-9f31-01f08e4db90f").length // Entidades públicas

  if (loading) {
    return <p className="text-center text-slate-500">Cargando lugares...</p>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lugares</h1>
          <p className="text-slate-500 mt-1">
            Gestiona todos los lugares turísticos y negocios de la plataforma
          </p>
        </div>
        <Link to="/admin/panel/places/create">
          <Button className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Crear Lugar
          </Button>
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Lugares</CardTitle>
            <CardDescription className="text-slate-500">Lugares registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lugares Turísticos</CardTitle>
            <CardDescription className="text-slate-500">Monumentos, parques, museos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{touristCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entidades Públicas</CardTitle>
            <CardDescription className="text-slate-500">
              Museos, centros culturales, universidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{publicCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de lugares */}
      <Card>
        <CardHeader>
          <CardTitle>Todos los Lugares</CardTitle>
          <CardDescription className="text-slate-500">
            Lista completa de lugares turísticos y entidades públicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Buscador */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar lugares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Muestra las cards de lugares */}
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <PlacesCard key={place.id} place={place} categories={categories} localities={localities} provinces={provinces} />
            ))
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No hay lugares registrados aún</p>
              <Link to="/admin/panel/places/create">
                <Button className="gap-2 cursor-pointer">
                  <Plus className="h-4 w-4" />
                  Crear Primer Lugar
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
