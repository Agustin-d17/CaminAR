import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import categories from "@/data/categories.json"

export default function PublicEntityForm({setStep}) {
  const navigate = useNavigate()
  const subCategories = categories.find(cat => cat.categoryId === "entidades_publicas").subCategories
  const [entityData, setEntityData] = useState({
    name: "",
    category: "",
    description: "",
    fullDescription: "",
    image: "",
    googleMapsUrl: "",
    website: "",
    phone: "",
    email: "",
  })

  const handleEntitySubmit = (e) => {
    e.preventDefault()
    console.log("Public entity data submitted:", entityData)
    navigate("/admin/panel/places")
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleEntitySubmit} className="max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription className="text-slate-500">Datos principales de la entidad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="entity-name" className="text-slate-500">
                Nombre de la Entidad *
              </Label>
              <Input
                id="entity-name"
                required
                value={entityData.name}
                onChange={(e) => setEntityData({ ...entityData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entity-category" className="text-slate-500">
                Categoría *
              </Label>
              <Select
                value={entityData.category}
                onValueChange={(value) => setEntityData({ ...entityData, category: value })}
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
              <Label htmlFor="entity-description" className="text-slate-500">
                Descripción Corta *
              </Label>
              <Textarea
                id="entity-description"
                required
                value={entityData.description}
                onChange={(e) => setEntityData({ ...entityData, description: e.target.value })}
                className="min-h-[80px]"
                placeholder="Descripción breve para la tarjeta"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entity-full-description" className="text-slate-500">
                Descripción Completa *
              </Label>
              <Textarea
                id="entity-full-description"
                required
                value={entityData.fullDescription}
                onChange={(e) => setEntityData({ ...entityData, fullDescription: e.target.value })}
                className="min-h-[150px]"
                placeholder="Descripción detallada de la entidad"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="entity-image" className="text-slate-500">
                  URL de Imagen Principal *
                </Label>
                <Input
                  id="entity-image"
                  required
                  value={entityData.image}
                  onChange={(e) => setEntityData({ ...entityData, image: e.target.value })}
                  placeholder="/imagen.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entity-google-maps" className="text-slate-500">
                  Google Maps URL *
                </Label>
                <Input
                  id="entity-google-maps"
                  required
                  value={entityData.googleMapsUrl}
                  onChange={(e) => setEntityData({ ...entityData, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacto y Enlaces</CardTitle>
            <CardDescription className="text-slate-500">Información adicional de contacto</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="entity-website" className="text-slate-500">
                Sitio Web
              </Label>
              <Input
                id="entity-website"
                value={entityData.website}
                onChange={(e) => setEntityData({ ...entityData, website: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entity-phone" className="text-slate-500">
                Teléfono
              </Label>
              <Input
                id="entity-phone"
                value={entityData.phone}
                onChange={(e) => setEntityData({ ...entityData, phone: e.target.value })}
                placeholder="+54 9 ..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="entity-email" className="text-slate-500">
                Correo Electrónico
              </Label>
              <Input
                id="entity-email"
                type="email"
                value={entityData.email}
                onChange={(e) => setEntityData({ ...entityData, email: e.target.value })}
                placeholder="contacto@institucion.gov.ar"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-slate-700 cursor-pointer">
            Cancelar
          </Button>
          <Button type="submit" className="cursor-pointer">
            Crear Entidad Pública
          </Button>
        </div>
      </form>
    </div>
  )
}
