import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, MapPin } from "lucide-react"
import PlacesCard from "./PlacesCard/PlacesCard"
import touristSpotData from "@/data/touristSpots.json"

const touristSpots = touristSpotData
export default function AdminPlaces() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lugares</h1>
          <p className="text-slate-500 mt-1">
            Gestiona todos los lugares turísticos y negocios de la plataforma
          </p>
        </div>
        <Link to="/admin/panel/places/create">
          <Button className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Crear Lugar
          </Button>
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Lugares</CardTitle>
            <CardDescription className="text-slate-500">Lugares registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{touristSpots.length}</p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Lugares Turísticos</CardTitle>
            <CardDescription className="text-slate-500">
              Monumentos, parques, museos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entidades Publicas</CardTitle>
            <CardDescription className="text-slate-500">
              Restaurantes y servicios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de lugares */}
      <Card>
        <CardHeader>
          <CardTitle>Todos los Lugares</CardTitle>
          <CardDescription className="text-slate-500">
            Lista completa de lugares turísticos y entidades públicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Buscador */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar lugares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Muestra las card de lugares en caso de que existan */}
          {touristSpots.length > 0 ? (
            touristSpots.map((place) => (
              <PlacesCard key={place.id} place={place} />
            ))
          ) : (
            <div className="text-center py-12">
            <MapPin className="h-12 w-12 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">No hay lugares registrados aún</p>
            <Link to="/admin/panel/places/create">
              <Button
                className="gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Crear Primer Lugar
              </Button>
            </Link>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
