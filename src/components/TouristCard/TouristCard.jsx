import { Link } from "react-router-dom"
import { Star } from "lucide-react"

export function TouristCard({ id, name, description, image, rating, category }) {
  return (
    <Link to={`/place/${id}`} className="block">
      <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        {/* Background Image */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          <span className="text-white text-sm font-medium">{rating.toFixed(1)}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold text-white">{name}</h3>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  )
}
