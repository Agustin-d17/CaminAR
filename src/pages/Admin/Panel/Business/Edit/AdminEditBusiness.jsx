import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"

const categories = [
  "Tecnología",
  "Gastronomía",
  "Moda",
  "Servicios Profesionales",
  "Salud y Bienestar",
  "Educación",
  "Construcción",
  "Transporte y Logística",
  "Comercio Minorista",
  "Turismo y Hotelería"
];

export default function AdminEditBusiness() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fullDescription: "",
    category: "",
    rating: "",
    googleRating: "",
    image: "",
    googleMapsUrl: "",
    instagram: "",
    facebook: "",
    twitter: "",
  })

  useEffect(() => {
    const storedPlaces = localStorage.getItem("tourist_places")
    if (storedPlaces) {
      const places = JSON.parse(storedPlaces)
      const place = places.find((p) => p.id === Number(id))
      if (place) {
        setFormData({
          name: place.name || "",
          description: place.description || "",
          fullDescription: place.fullDescription || "",
          category: place.category || "",
          rating: place.rating?.toString() || "",
          googleRating: place.googleRating?.toString() || "",
          image: place.image || "",
          googleMapsUrl: place.googleMapsUrl || "",
          instagram: place.socialLinks?.instagram || "",
          facebook: place.socialLinks?.facebook || "",
          twitter: place.socialLinks?.twitter || "",
        })
      }
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const storedPlaces = localStorage.getItem("tourist_places")
    if (storedPlaces) {
      const places = JSON.parse(storedPlaces)
      const placeIndex = places.findIndex((p) => p.id === Number(id))

      if (placeIndex !== -1) {
        places[placeIndex] = {
          ...places[placeIndex],
          ...formData,
          rating: Number.parseFloat(formData.rating),
          googleRating: Number.parseFloat(formData.googleRating),
          socialLinks: {
            instagram: formData.instagram,
            facebook: formData.facebook,
            twitter: formData.twitter,
          },
        }

        localStorage.setItem("tourist_places", JSON.stringify(places))
        setTimeout(() => {
          navigate(`/admin/dashboard/places/${id}`)
        }, 500)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to={`/admin/panel/business/${id}`}>
          <Button
            variant="outline"
            size="icon"
            className="text-slate-500 bg-transparent cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Editar Negocio</h1>
          <p className="text-slate-500 mt-1">Actualiza la información del Negocio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Info Básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-500">Nombre del Lugar</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-500">Categoría</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-500">Descripción Corta</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-500">Descripción Completa</Label>
              <Textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-500">Rating</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-500">Google Rating</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.googleRating}
                  onChange={(e) => setFormData({ ...formData, googleRating: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ubicación */}
        <Card>
          <CardHeader>
            <CardTitle>Ubicación y Enlaces</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-500">URL de Imagen Principal</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/path/to/image.png"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-500">Google Maps URL</Label>
              <Input
                value={formData.googleMapsUrl}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Redes */}
        <Card >
          <CardHeader>
            <CardTitle>Redes Sociales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["instagram", "facebook", "twitter"].map((field) => (
              <div key={field} className="space-y-2">
                <Label className="text-slate-500">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4">
            <Link to="/admin/panel/business">
                <Button type="button" variant="outline" className="cursor-pointer">
                    Cancelar
                </Button>
            </Link>
            <Button type="submit" className="cursor-pointer">
              Guardar Cambios
            </Button>
          </div>
      </form>
    </div>
  )
}
