import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, Building2 } from "lucide-react"

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBusinesses, setFilteredBusinesses] = useState([])

  useEffect(() => {
    const storedBusinesses = localStorage.getItem("businesses")
    if (storedBusinesses) {
      const businessList = JSON.parse(storedBusinesses)
      setBusinesses(businessList)
      setFilteredBusinesses(businessList)
    }
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = businesses.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.contactInfo.locality.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBusinesses(filtered)
    } else {
      setFilteredBusinesses(businesses)
    }
  }, [searchTerm, businesses])

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
              <p className="text-2xl font-bold">{businesses.length}</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-slate-500 mb-1">Restaurantes</p>
              <p className="text-2xl font-bold">
                {businesses.filter((b) => b.category === "restaurantes").length}
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-slate-500 mb-1">Otros</p>
              <p className="text-2xl font-bold">
                {businesses.filter((b) => b.category !== "restaurantes").length}
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
          <div className="space-y-4">
            {filteredBusinesses.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto mb-4" />
                <p className="text-slate-500">No se encontraron negocios</p>
              </div>
            ) : (
              filteredBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors bg-slate-950/50"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">{business.name}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                          {business.category}
                        </Badge>
                        <span className="text-sm text-slate-400">
                          {business.contactInfo.locality}, {business.contactInfo.province}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-2 line-clamp-1">{business.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link to={`/admin/panel/business/${business.id}`}>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/admin/panel/business/${business.id}/edit`}>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(business.id)}
                      className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
