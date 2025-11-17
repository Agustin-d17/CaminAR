import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, MapPin, Star, Instagram, Facebook, Twitter, Pencil, Trash2, MoreVertical, } from "lucide-react"
import businessUserData from "@/data/businessUsers.json"

const touristSpots = businessUserData

export default function AdminViewBusiness() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [business, setBusiness] = useState(null)

  useEffect(() => {
    const foundBusiness = touristSpots.find((spot) => spot.id === parseInt(id))
    setBusiness(foundBusiness)
  }, [id])

  if (!business) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-400">Ups! Lugar no encontrado con el ID proporcionado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/panel/places">
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl font-bold">{business.profile.businessName}</h1>
            <p className="text-slate-500 mt-1">{business.categoryId}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-Blue-500 flex-shrink-0 cursor-pointer"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/admin/panel/places/${business.id}/edit`}>
              <DropdownMenuItem className="text-slate-500 hover:bg-slate-100 cursor-pointer gap-2">
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Descripción</p>
              <p className="mt-1">{business.profile.description}</p>
            </div>

            {business.profile.fullDescription && (
              <div>
                <p className="text-sm text-slate-500">Descripción Completa</p>
                <p className="mt-1">{business.profile.fullDescription}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{business.rating.value}</span>
              <span className="text-slate-500">/ 5.0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {business.profile.images && business.profile.images.length > 0 ? (
                business.profile.images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`${business.profile.businessName} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))
              ) : (
                <img
                  src={business.profile.image || "/placeholder.svg"}
                  alt={business.profile.businessName}
                  className="w-full h-32 object-cover rounded-lg col-span-2"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enlaces y Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {business.profile.links.googleMapsLink && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-500" />
              <a
                href={business.profile.links.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Ver en Google Maps
              </a>
            </div>
          )}

          {business.profile.links && (
            <div className="space-y-2">
              <p className="text-sm text-slate-500 font-semibold">Redes Sociales</p>
              <div className="flex gap-4">
                {business.profile.links.instagramLink && (
                  <a
                    href={business.profile.links.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-500 hover:text-pink-400"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {business.profile.links.facebookLink && (
                  <a
                    href={business.profile.links.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-500 hover:text-blue-400"
                  >
                    <Facebook className="h-5 w-5" /> 
                  </a>
                )}
                {business.profile.links.twitterLink && (
                  <a
                    href={business.profile.links.twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-500 hover:text-sky-400"
                  >
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
