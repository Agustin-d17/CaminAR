import { Edit, Eye, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BusinessCard({ business }) {
    return (
        <div key={business.id} className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg border gap-4">

                {/* Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    <img
                        src={business.profile.image || "placeholder.svg"}
                        alt={business.profile.businessName}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1 truncate">
                            {business.profile.businessName}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-slate-950">
                                {business.profile.categoryId}
                            </Badge>
                            <span className="text-sm text-slate-400 truncate">
                                {business.location.localityId}, {business.location.provinceId}
                            </span>
                        </div>

                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                            {business.profile.description}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 w-full md:w-auto">
                    <Link to={`/admin/panel/business/${business.id}`}>
                        <Button variant="ghost" size="sm" className="text-slate-400 cursor-pointer">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>

                    <Link to={`/admin/panel/business/${business.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-slate-400 cursor-pointer">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(business.id)}
                        className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

            </div>
        </div>
    )
}
