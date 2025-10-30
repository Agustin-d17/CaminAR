import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Star, Instagram, Facebook, Twitter, Pencil, Trash2 } from "lucide-react"
import touristSpotData from "@/data/touristSpots.json"

const touristSpots = touristSpotData

export default function AdminViewPlace() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [place, setPlace] = useState(null)

  useEffect(() => {
    const foundPlace = touristSpots.find((spot) => spot.id === parseInt(id))
    setPlace(foundPlace)
  }, [id])

  if (!place) {
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
            <h1 className="text-3xl font-bold">{place.name}</h1>
            <p className="text-slate-500 mt-1">{place.categoryId}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={`/admin/panel/places/${place.id}/edit`}>
            <Button className="gap-2 bg-blue-950 hover:bg-blue-900 cursor-pointer">
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          </Link>

          <Button
            variant="outline"
            className="gap-2 border hover:text-red-600 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

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

            {place.fullDescription && (
              <div>
                <p className="text-sm text-slate-500">Descripción Completa</p>
                <p className="mt-1">{place.fullDescription}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{place.rating.value}</span>
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
              {place.images && place.images.length > 0 ? (
                place.images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`${place.name} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))
              ) : (
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
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
          {place.googleMapsLink && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-500" />
              <a
                href={place.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Ver en Google Maps
              </a>
            </div>
          )}

          {place.socialLinks && (
            <div className="space-y-2">
              <p className="text-sm text-slate-500 font-semibold">Redes Sociales</p>
              <div className="flex gap-4">
                {place.socialLinks.instagram && (
                  <a
                    href={place.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-pink-400"
                  >
                    <Instagram className="h-5 w-5" /> Instagram
                  </a>
                )}
                {place.socialLinks.facebook && (
                  <a
                    href={place.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400"
                  >
                    <Facebook className="h-5 w-5" /> Facebook
                  </a>
                )}
                {place.socialLinks.twitter && (
                  <a
                    href={place.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-sky-400"
                  >
                    <Twitter className="h-5 w-5" /> Twitter
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
