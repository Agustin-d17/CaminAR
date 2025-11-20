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

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true)

      const [placesRes, categoriesRes, localitiesRes, provincesRes] = await Promise.all([
        supabase.from("places").select("*"),
        supabase.from("categories").select("*"),
        supabase.from("localities").select("*"),
        supabase.from("provinces").select("*")
      ])

      if (placesRes.error) console.error("Error places:", placesRes.error)
      if (categoriesRes.error) console.error("Error categories:", categoriesRes.error)
      if (localitiesRes.error) console.error("Error localities:", localitiesRes.error)
      if (provincesRes.error) console.error("Error provinces:", provincesRes.error)

      setPlaces(Array.isArray(placesRes.data) ? placesRes.data : [])
      setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : [])
      setLocalities(Array.isArray(localitiesRes.data) ? localitiesRes.data : [])
      setProvinces(Array.isArray(provincesRes.data) ? provincesRes.data : [])

      setLoading(false)
    }

    fetchPlaces()
  }, [])

  const filteredPlaces = useMemo(() => {
    return places.filter((p) =>
      (p.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [places, searchQuery])

  const total = places.length

  const TOURIST_ID = "34e41b4a-a123-4fef-87c2-07f6a87d7b3b"
  const PUBLIC_ID = "c1b89d2c-1c60-4055-9f31-01f08e4db90f"

  const touristCount = places.filter((p) => p.category_id === TOURIST_ID).length
  const publicCount = places.filter((p) => p.category_id === PUBLIC_ID).length

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
            Gestiona todos los lugares turísticos y entidades públicas
          </p>
        </div>

        <Link to="/admin/panel/places/create">
          <Button className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Crear Lugar
          </Button>
        </Link>
      </div>

      {/* Stats */}
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

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle>Todos los Lugares</CardTitle>
          <CardDescription className="text-slate-500">
            Lista completa de lugares turísticos y entidades públicas
          </CardDescription>
        </CardHeader>
        <CardContent>

          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar lugares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 placeholder:text-slate-500"
              />
            </div>
          </div>

          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <PlacesCard
                key={place.id}
                place={place}
                categories={categories}
                localities={localities}
                provinces={provinces}
              />
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
