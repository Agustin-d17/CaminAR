import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import categories from "@/data/categories.json"

export default function TouristPlaceForm({setStep}) {
  const navigate = useNavigate()
  const subCategories = categories.find(cat => cat.categoryId === "lugares_turisticos").subCategories
  const [touristData, setTouristData] = useState({
    name: "",
    category: "",
    description: "",
    fullDescription: "",
    rating: "",
    image: "",
    googleMapsUrl: "",
    instagram: "",
    facebook: "",
    twitter: "",
  })

  const handleTouristSubmit = (e) => {
    e.preventDefault()
    console.log("Tourist data:", touristData)
    navigate("/admin/panel/places")
  }

    return (
      <div className="space-y-6">
        <form onSubmit={handleTouristSubmit} className="max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription className="text-slate-450">Datos principales del lugar turístico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tourist-name" className="text-slate-500">
                  Nombre del Lugar *
                </Label>
                <Input
                  id="tourist-name"
                  required
                  value={touristData.name}
                  onChange={(e) => setTouristData({ ...touristData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tourist-category" className="text-slate-500">
                  Categoría *
                </Label>
                <Select
                  value={touristData.category}
                  onValueChange={(value) => setTouristData({ ...touristData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map((subCat) => (
                      <SelectItem key={subCat.subCategoryId} value={subCat.subCategoryId}>
                        {subCat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tourist-description" className="text-slate-500">
                  Descripción Corta *
                </Label>
                <Textarea
                  id="tourist-description"
                  required
                  value={touristData.description}
                  onChange={(e) => setTouristData({ ...touristData, description: e.target.value })}
                  className="min-h-[80px]"
                  placeholder="Descripción breve para la tarjeta"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tourist-full-description" className="text-slate-500">
                  Descripción Completa *
                </Label>
                <Textarea
                  id="tourist-full-description"
                  required
                  value={touristData.fullDescription}
                  onChange={(e) => setTouristData({ ...touristData, fullDescription: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Descripción detallada del lugar"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tourist-rating" className="text-slate-500">
                    Calificación *
                  </Label>
                  <Input
                    id="tourist-rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    required
                    value={touristData.rating}
                    onChange={(e) => setTouristData({ ...touristData, rating: e.target.value })}
                    placeholder="4.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tourist-image" className="text-slate-500">
                    URL de Imagen Principal *
                  </Label>
                  <Input
                    id="tourist-image"
                    required
                    value={touristData.image}
                    onChange={(e) => setTouristData({ ...touristData, image: e.target.value })}
                    placeholder="/imagen.jpg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enlaces y Redes Sociales</CardTitle>
              <CardDescription className="text-slate-500">Información adicional del lugar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tourist-google-maps" className="text-slate-500">
                  Google Maps URL *
                </Label>
                <Input
                  id="tourist-google-maps"
                  required
                  value={touristData.googleMapsUrl}
                  onChange={(e) => setTouristData({ ...touristData, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="tourist-instagram" className="text-slate-500">
                    Instagram
                  </Label>
                  <Input
                    id="tourist-instagram"
                    value={touristData.instagram}
                    onChange={(e) => setTouristData({ ...touristData, instagram: e.target.value })}
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tourist-facebook" className="text-slate-500">
                    Facebook
                  </Label>
                  <Input
                    id="tourist-facebook"
                    value={touristData.facebook}
                    onChange={(e) => setTouristData({ ...touristData, facebook: e.target.value })}
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tourist-twitter" className="text-slate-500">
                    Twitter
                  </Label>
                  <Input
                    id="tourist-twitter"
                    value={touristData.twitter}
                    onChange={(e) => setTouristData({ ...touristData, twitter: e.target.value })}
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-gray-700 cursor-pointer">
              Cancelar
            </Button>
            <Button type="submit" className="cursor-pointer">
              Crear Lugar Turistico
            </Button>
          </div>
        </form>
      </div>
    )
}