import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Globe, Clock, Facebook, Instagram, Edit, Eye } from "lucide-react"

export default function DashboardProfile() {
  const [business, setBusiness] = useState(null)

  useEffect(() => {
    // Datos demo por ahora
    const demoBusinessData = {
      id: "demo-business",
      email: "demo@caminarte.com",
      name: "Restaurante El Mirador",
      category: "restaurantes",
      description: "Un lugar acogedor con las mejores vistas de Tafi Viejo y comida tradicional argentina.",
      contactInfo: {
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
      },
      createdAt: new Date().toISOString(),
    }

    setBusiness(demoBusinessData)
  }, [])

  if (!business) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Perfil del Negocio</h2>
          <p className="text-muted-foreground">Información completa de tu negocio</p>
        </div>
        <Link to="/business/dashboard/profile/edit">
          <Button className="cursor-pointer">
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Detalles principales de tu negocio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nombre del Negocio</p>
                <p className="text-lg font-semibold">{business.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categoría</p>
                <Badge variant="secondary" className="mt-1">
                  {business.category}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Descripción</p>
                <p className="text-foreground">{business.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Cómo los clientes pueden contactarte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Dirección</p>
                  <p className="text-foreground">{business.contactInfo.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {business.contactInfo.locality}, {business.contactInfo.province}
                  </p>
                </div>
              </div>

              {business.contactInfo.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Teléfono</p>
                    <p className="text-foreground">{business.contactInfo.phone}</p>
                  </div>
                </div>
              )}

              {business.contactInfo.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">{business.contactInfo.email}</p>
                  </div>
                </div>
              )}

              {business.contactInfo.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Sitio Web</p>
                    <a
                      href={business.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {business.contactInfo.website}
                    </a>
                  </div>
                </div>
              )}

              {business.contactInfo.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Horarios</p>
                    <p className="text-foreground">{business.contactInfo.hours}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {(business.contactInfo.facebook || business.contactInfo.instagram) && (
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociales</CardTitle>
                <CardDescription>Enlaces a tus perfiles sociales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {business.contactInfo.facebook && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={business.contactInfo.facebook} target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </a>
                    </Button>
                  )}
                  {business.contactInfo.instagram && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={business.contactInfo.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Gestiona tu perfil</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Link to="/business/dashboard/profile/edit">
                <Button className="w-full justify-start bg-transparent cursor-pointer" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Información
                </Button>
              </Link>
              <Button className="w-full justify-start bg-transparent cursor-pointer" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Ver Perfil Público
              </Button>
              {business.contactInfo.googleMapsLink && (
                <Button className="w-full justify-start bg-transparent cursor-pointer" variant="outline" asChild>
                  <a href={business.contactInfo.googleMapsLink} target="_blank" rel="noopener noreferrer">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ver en Google Maps
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{business.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Fecha de registro</p>
                <p className="font-medium">
                  {new Date(business.createdAt).toLocaleDateString("es-AR")}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">ID de Negocio</p>
                <p className="font-mono text-xs">{business.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
