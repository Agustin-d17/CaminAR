import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, MapPin, Star, Instagram, Facebook, Twitter, Pencil, Trash2, MoreVertical } from "lucide-react"

export default function AdminViewBusiness() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBusiness() {
      setLoading(true)
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", id)
        .single()

      if (!error) setBusiness(data)
      setLoading(false)
    }
    
    fetchBusiness()
  }, [id])

  console.log(business)
  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-400">Cargando...</p>
      </div>
    )
  }
  

  // Not found
  if (!business) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-400">
          Ups! Negocio no encontrado con el ID proporcionado
        </p>
      </div>
    )
  }

  const p = {
    business_name: business.business_name,
    description: business.description,
    full_description: business.full_description,
    image: business.image,
    images: business.images || []
  }

  const r = business.rating || { value: 0, source: "" }
  const links = business.social_links || {}


  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/panel/business">
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl font-bold">{p.business_name}</h1>
            <p className="text-slate-500 mt-1">{business.category_id}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="flex-shrink-0 cursor-pointer">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">

            <Link to={`/admin/panel/businesses/${business.id}/edit`}>
              <DropdownMenuItem className="text-slate-500 hover:bg-slate-200 cursor-pointer gap-2">
                <Pencil className="h-4 w-4" />
                Editar
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              className="text-slate-500 hover:text-red-500 hover:bg-slate-100 cursor-pointer gap-2"
              variant="destructive"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Info + Images */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Información */}
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Descripción</p>
              <p className="mt-1">{p.description}</p>
            </div>

            {p.full_description && (
              <div>
                <p className="text-sm text-slate-500">Descripción Completa</p>
                <p className="mt-1">{p.full_description}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{r.value}</span>
              <span className="text-slate-500">/ 5.0</span>
            </div>
          </CardContent>
        </Card>

        {/* Imágenes */}
        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {p.images && p.images.length > 0 ? (
                p.images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`${p.business_name} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))
              ) : (
                <img
                  src={p.image || "/placeholder.svg"}
                  alt={p.business_name}
                  className="w-full h-32 object-cover rounded-lg col-span-2"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enlaces */}
      <Card>
        <CardHeader>
          <CardTitle>Enlaces y Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {business.google_maps_link && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-500" />
              <a
                href={business.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Ver en Google Maps
              </a>
            </div>
          )}

          {(links.instagram || links.facebook || links.twitter) && (
            <div className="space-y-2">
              <p className="text-sm text-slate-500 font-semibold">Redes Sociales</p>
              <div className="flex gap-4">

                {links.instagram && (
                  <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}

                {links.facebook && (
                  <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}

                {links.twitter && (
                  <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  )
}
