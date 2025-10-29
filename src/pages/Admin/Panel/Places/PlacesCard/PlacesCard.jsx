import { Edit, Eye, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
export default function PlacesCard({place}) {
    return (
        <div key={place.id} className="mb-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-4">
                        <img src={place.image || "placeholder.svg"} alt={place.name} className="w-16 h16 rounded-lg object-cover"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1">{place.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-slate-950">
                            {place.categoryId}
                            </Badge>
                            <span className="text-sm text-slate-400">
                            {place.location.localityId}, {place.location.provinceId}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-1">{place.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                    <Link to={`/admin/panel/places/${place.id}`}>
                        <Button variant="ghost" size="sm" className="text-slate-400 cursor-pointer">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to={`/admin/panel/places/${place.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-slate-400 cursor-pointer">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(place.id)}
                        className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}