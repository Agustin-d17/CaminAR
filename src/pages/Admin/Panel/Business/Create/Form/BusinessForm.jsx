import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import categories from "@/data/categories.json"
import provinces from "@/data/provinces.json"
import localities from "@/data/localities.json"

export default function BusinessForm() {
  const navigate = useNavigate()
  const subCategories = categories.find(cat => cat.categoryId === "negocios").subCategories
  const [businessData, setBusinessData] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    address: "",
    locality: "",
    province: "",
    phone: "",
    email: "",
    website: "",
    hours: "",
    googleMapsLink: "",
    facebook: "",
    instagram: "",
  })

  const handleBusinessSubmit = (e) => {
    e.preventDefault()
    console.log("Business data:", businessData)
    navigate("/admin/panel/business")
  }

    return (
        <form onSubmit={handleBusinessSubmit} className="max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription className="text-slate-500">Datos principales del negocio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-500">
                  Nombre del Negocio *
                </Label>
                <Input
                  id="name"
                  required
                  value={businessData.name}
                  onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-500">
                    Categoría *
                  </Label>
                  <Select
                    value={businessData.category || ""}
                    onValueChange={(value) => setBusinessData({ ...businessData, category: value, subcategory: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurante">Restaurantes y Cafeterías</SelectItem>
                      <SelectItem value="otros">Otros...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {businessData.category === "otros" && (
                  <div className="space-y-2">
                    <Label htmlFor="subcategory" className="text-slate-500">
                      Subcategoría *
                    </Label>
                    <Select
                      value={businessData.subcategory || ""}
                      onValueChange={(value) => setBusinessData({ ...businessData, subcategory: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una subcategoría" />
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
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-500">
                  Descripción *
                </Label>
                <Textarea
                  id="description"
                  required
                  value={businessData.description}
                  onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white">Información de Contacto</CardTitle>
              <CardDescription className="text-slate-400">Datos de ubicación y contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-500">
                  Dirección Completa *
                </Label>
                <Input
                  id="address"
                  required
                  value={businessData.address}
                  onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="provincia" className="text-slate-500">Provincia *</Label>
                    <Select value={businessData.province || ""} onValueChange={(value) => setBusinessData({...businessData, province: value})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu provincia" />
                        </SelectTrigger>
                        <SelectContent>
                            {provinces.map((province) => (
                                <SelectItem key={province.provinceId} value={province.name.toLowerCase()}>
                                    {province.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
              
                <div className="space-y-2">
                    <Label htmlFor="localidad" className="text-slate-500">Localidad *</Label>
                    <Select value={businessData.locality || ""} onValueChange={(value) => setBusinessData({...businessData, locality: value})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu localidad" />
                        </SelectTrigger>
                        <SelectContent>
                            {localities.map((locality) => (
                                <SelectItem key={locality.localityId} value={locality.name.toLowerCase()}>
                                    {locality.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-500">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    required
                    value={businessData.phone}
                    onChange={(e) => setBusinessData({ ...businessData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-500">
                    Email de Contacto *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={businessData.email}
                    onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-slate-500">
                    Sitio Web
                  </Label>
                  <Input
                    id="website"
                    value={businessData.website}
                    onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
                    placeholder="https://ejemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours" className="text-slate-300">
                    Horarios de Atención *
                  </Label>
                  <Input
                    id="hours"
                    required
                    value={businessData.hours}
                    onChange={(e) => setBusinessData({ ...businessData, hours: e.target.value })}
                    placeholder="Lun-Vie 9:00-18:00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleMapsLink" className="text-slate-500">
                  Link de Google Maps
                </Label>
                <Input
                  id="googleMapsLink"
                  value={businessData.googleMapsLink}
                  onChange={(e) => setBusinessData({ ...businessData, googleMapsLink: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="text-slate-500">
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    value={businessData.facebook}
                    onChange={(e) => setBusinessData({ ...businessData, facebook: e.target.value })}
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-slate-500">
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={businessData.instagram}
                    onChange={(e) => setBusinessData({ ...businessData, instagram: e.target.value })}
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Link to="/admin/panel/business">
                <Button type="button" variant="outline" className="cursor-pointer">
                    Cancelar
                </Button>
            </Link>
            <Button type="submit" className="cursor-pointer">
              Crear Negocio
            </Button>
          </div>
        </form>
    )
}