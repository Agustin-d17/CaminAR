import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  MapPin,
  Star,
  Instagram,
  Facebook,
  Twitter,
  Pencil,
  Trash2,
  MoreVertical
} from "lucide-react"

export default function AdminViewPlace() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [place, setPlace] = useState(null)
  const [categories, setCategories] = useState([])
  const [localities, setLocalities] = useState([])
  const [provinces, setProvinces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEverything() {
      setLoading(true)

      const { data: placeData } = await supabase
        .from("places")
        .select("*")
        .eq("id", id)
        .single()

      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*")

      const { data: localitiesData } = await supabase
        .from("localities")
        .select("*")

      const { data: provincesData } = await supabase
        .from("provinces")
        .select("*")

      setPlace(placeData)
      setCategories(categoriesData || [])
      setLocalities(localitiesData || [])
      setProvinces(provincesData || [])
      setLoading(false)
    }

    fetchEverything()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-400">Cargando...</p>
      </div>
    )
  }

  if (!place) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-400">Ups! Lugar no encontrado</p>
      </div>
    )
  }

  // Resolver nombres
  const categoryName =
    categories.find((c) => c.id === place.category_id)?.name || "Sin categoría"

  const localityName =
    localities.find((l) => l.id === place.locality_id)?.name || "Sin localidad"

  const provinceName =
    provinces.find((p) => p.id === place.province_id)?.name || "Sin provincia"

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/panel/places">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl font-bold">{place.name}</h1>
            <p className="text-slate-500 mt-1">
              {categoryName} • {localityName}, {provinceName}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Link to={`/admin/panel/places/${place.id}/edit`}>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Pencil className="h-4 w-4" />
                Editar
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="gap-2 text-red-500 cursor-pointer">
              <Trash2 className="h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* INFO GENERAL */}
      <div className="grid gap-6 md:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Descripción</p>
              <p className="mt-1">{place.description}</p>
            </div>

            {place.full_description && (
              <div>
                <p className="text-sm text-slate-500">Descripción Completa</p>
                <p className="mt-1">{place.full_description}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{place.rating_value}</span>
              <span className="text-slate-500">/ 5.0</span>
            </div>
          </CardContent>
        </Card>

        {/* IMÁGENES */}
        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {place.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${place.name} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ENLACES */}
      <Card>
        <CardHeader>
          <CardTitle>Enlaces y Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {place.google_maps_link && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-500" />
              <a
                href={place.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Ver en Google Maps
              </a>
            </div>
          )}

          {/* Redes */}
          <div className="space-y-2">
            <p className="text-sm text-slate-500 font-semibold">Redes Sociales</p>
            <div className="flex gap-4">
              {place.social_links?.instagram && (
                <a className="flex items-center gap-2">
                  <Instagram className="h-5 w-5" /> Instagram
                </a>
              )}
              {place.social_links?.facebook && (
                <a className="flex items-center gap-2">
                  <Facebook className="h-5 w-5" /> Facebook
                </a>
              )}
              {place.social_links?.twitter && (
                <a className="flex items-center gap-2">
                  <Twitter className="h-5 w-5" /> Twitter
                </a>
              )}
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
