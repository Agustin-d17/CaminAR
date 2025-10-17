import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"

export default function EditProfile() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
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

  useEffect(() => {
    // Datos demo de prueba
    const demoBusinessData = {
      name: "Restaurante El Mirador",
      category: "restaurantes",
      description: "Un lugar acogedor con las mejores vistas de Tafi Viejo y comida tradicional argentina.",
      address: "Av. Principal 123",
      locality: "Tafi Viejo",
      province: "Tucumán",
      phone: "+54 381 123-4567",
      email: "contacto@elmirador.com",
      website: "www.elmirador.com",
      hours: "Lun-Dom 12:00-23:00",
      googleMapsLink: "https://maps.google.com",
      facebook: "https://facebook.com/elmirador",
      instagram: "https://instagram.com/elmirador",
    }

    setFormData(demoBusinessData)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica real de guardado
    alert("Perfil actualizado exitosamente")
    navigate("/business/dashboard/profile")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/business/dashboard/profile">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold">Editar Perfil</h2>
          <p className="text-muted-foreground">Actualiza la información de tu negocio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Detalles principales de tu negocio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Negocio</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>Cómo los clientes pueden contactarte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="locality">Localidad</Label>
                <Input id="locality" name="locality" value={formData.locality} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Provincia</Label>
                <Input id="province" name="province" value={formData.province} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email de Contacto</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Sitio Web</Label>
                <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Horarios</Label>
                <Input
                  id="hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder="Ej: Lun-Dom 9:00-18:00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleMapsLink">Link de Google Maps</Label>
                <Input
                  id="googleMapsLink"
                  name="googleMapsLink"
                  type="url"
                  value={formData.googleMapsLink}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes Sociales</CardTitle>
            <CardDescription>Enlaces a tus perfiles sociales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  type="url"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/tu-negocio"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  type="url"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/tu-negocio"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Link to="/business/dashboard/profile">
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="cursor-pointer">
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  )
}
