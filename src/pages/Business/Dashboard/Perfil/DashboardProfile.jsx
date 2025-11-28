"use client"

import { useBusiness } from "@/context/BusinessContext"
import { Link } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Calendar, Pencil } from "lucide-react"

export default function DashboardProfile() {
  const { business, loading } = useBusiness()

  if (loading) {
    return (
      <p className="text-center text-muted-foreground mt-6">
        Cargando perfil…
      </p>
    )
  }

  if (!business) {
    return (
      <p className="text-center text-red-500 mt-6">
        No se pudo cargar el negocio.
      </p>
    )
  }

  const contact = business.contact || {}
  const social = business.social_links || {}

  return (
    <div className="space-y-6">

      {/* Header + botón Editar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Mi Perfil</h2>
          <p className="text-muted-foreground">
            Información general de tu negocio
          </p>
        </div>

        <Link to="/business/dashboard/profile/edit">
          <Button className="gap-2">
            <Pencil className="h-4 w-4" />
            Editar Perfil
          </Button>
        </Link>
      </div>

      {/* Información general */}
      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Nombre</p>
            <p className="font-medium">{business.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Descripción</p>
            <p className="font-medium">{business.description || "Sin descripción"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Estado</p>
            <p className="font-medium capitalize">{business.status}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Registrado el:
            <span className="font-medium text-foreground">
              {new Date(business.created_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Ubicación */}
      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{business.address}</span>
          </div>

          <p className="text-sm text-muted-foreground">
            Provincia ID: <span className="font-medium">{business.province_id}</span>
          </p>

          <p className="text-sm text-muted-foreground">
            Localidad ID: <span className="font-medium">{business.locality_id}</span>
          </p>

          {business.google_maps_link && (
            <a
              href={business.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              Ver en Google Maps
            </a>
          )}
        </CardContent>
      </Card>

      {/* Contacto */}
      <Card>
        <CardHeader>
          <CardTitle>Contacto</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {contact.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{contact.phone}</span>
            </div>
          )}

          {contact.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{contact.email}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Redes */}
      <Card>
        <CardHeader>
          <CardTitle>Redes Sociales</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {social.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={social.website} className="text-blue-500 underline" target="_blank">
                {social.website}
              </a>
            </div>
          )}

          {social.facebook && (
            <div className="flex items-center gap-2">
              <Facebook className="h-4 w-4 text-muted-foreground" />
              <a href={social.facebook} className="text-blue-500 underline" target="_blank">
                Facebook
              </a>
            </div>
          )}

          {social.instagram && (
            <div className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-muted-foreground" />
              <a href={social.instagram} className="text-blue-500 underline" target="_blank">
                Instagram
              </a>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
