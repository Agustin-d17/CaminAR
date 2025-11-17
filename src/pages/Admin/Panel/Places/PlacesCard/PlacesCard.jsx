import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2 } from "lucide-react"

export default function PlacesCard({ place, categories = [], localities = [], provinces = [] }) {

    const categoryName = categories.find((c) => c.id === place.category_id)?.name || "Sin categoría"
    const localityName =
      localities.find((l) => l.id === place.locality_id)?.name || "Sin localidad"
    const provinceName =
      provinces.find((p) => p.id === place.province_id)?.name || "Sin provincia"

    const handleDelete = (id) => {
      if (confirm("¿Seguro que deseas eliminar este lugar?")) {
        console.log("Eliminar lugar:", id)
      }
    }
    return (
        <div className="mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg border gap-4">
                
                {/* Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    <img
                        src={place.image || "placeholder.svg"}
                        alt={place.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1 truncate">{place.name}</h3>

                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-slate-950">
                                {categoryName}
                            </Badge>
                            <span className="text-sm text-slate-400 truncate">
                                {localityName}, {provinceName}
                            </span>
                        </div>

                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                            {place.description}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 w-full md:w-auto">
                    <Link to={`/admin/panel/places/${place.id}`}>
                        <Button variant="ghost" size="sm" className="text-slate-400">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to={`/admin/panel/places/${place.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-slate-400">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(place.id)}
                        className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

            </div>
        </div>
    )
}
