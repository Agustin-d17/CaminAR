import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, Building2 } from "lucide-react"
import businessUsersData from "@/data/businessUsers.json"
import BusinessCard from "./BusinessCard/BusinessCard"

const businessUsers = businessUsersData
export default function AdminBusinesses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBusinesses, setFilteredBusinesses] = useState([])

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este negocio?")) {
      const updatedBusinesses = businesses.filter((b) => b.id !== id)
      setBusinesses(updatedBusinesses)
      localStorage.setItem("businesses", JSON.stringify(updatedBusinesses))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Negocios</h1>
          <p className="text-slate-500">Administra todos los negocios registrados en la plataforma</p>
        </div>
        <Link to="/admin/panel/business/create">
          <Button className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Crear Negocio
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estadísticas</CardTitle>
          <CardDescription className="text-slate-500">Resumen de negocios por categoría</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-slate-500 mb-1">Total de Negocios</p>
              <p className="text-2xl font-bold">{businessUsers.length}</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-slate-500 mb-1">Restaurantes</p>
              <p className="text-2xl font-bold">
                {businessUsers.filter((b) => b.categoryId === "restaurantes").length}
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-slate-500 mb-1">Otros</p>
              <p className="text-2xl font-bold">
                {businessUsers.filter((b) => b.categoryId !== "restaurantes").length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Todos los Negocios</CardTitle>
          <CardDescription className="text-slate-500">
            Listado de negocios registrados en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar por nombre, categoría o localidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {/* Muestra las card de lugares en caso de que existan */}
          {businessUsers.length > 0 ? (
            businessUsers.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))
          ) : (
            <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">No hay negocios registrados aún</p>
            <Link to="/admin/panel/places/create">
              <Button
                className="gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Crear Primer negocio
              </Button>
            </Link>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
