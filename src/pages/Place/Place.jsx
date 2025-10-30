
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Star, MapPin, Instagram, Facebook, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel"
import touristSpotsData from "@/data/touristSpots.json"

const touristSpots = touristSpotsData

export default function PlacePage() {
  const { id } = useParams()
  const place = touristSpots.find((spot) => spot.id === Number.parseInt(id))

  if (!place) {
    return <div>Lugar no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="flex items-center p-4 border-b border-border relative">
        {/* Link to places page */}
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="bg-transparent text-muted-foreground hover:text-foreground"
        >
          <Link to="/places">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        {/* Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-primary">
          <span className="text-2xl font-bold text-blue-950">Camin<span className="text-blue-400">AR</span></span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Image Carousel */}
        <div className="mb-8">
          <ImageCarousel images={place.images} alt={place.name} />
        </div>

        {/* Place Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{place.name}</h1>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-lg">{place.googleRating}</span>
            </div>
          </div>

          {/* Full Description */}
          <div className="prose prose-gray max-w-none">
            <p className="text-foreground/90 leading-relaxed">{place.fullDescription}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Google Maps Button */}
            <Button asChild className="flex items-center gap-2">
              <a href={place.googleMapsLink} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" />
                Ver en Google Maps
              </a>
            </Button>

            {/* Social Links */}
            <div className="flex gap-3">
              {/* Instagram Button */}
              {place.socialLinks?.instagram && (
                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="px-4 py-2 bg-transparent"
                >
                  <a
                    href={place.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="hidden sm:inline">Instagram</span>
                  </a>
                </Button>
              )}
              {/* Facebook Button */}
              {place.socialLinks?.facebook && (
                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="px-4 py-2 bg-transparent"
                >
                  <a
                    href={place.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="hidden sm:inline">Facebook</span>
                  </a>
                </Button>
              )}
              {/* Twitter Button */}
              {place.socialLinks?.twitter && (
                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="px-4 py-2 bg-transparent"
                >
                  <a
                    href={place.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <X className="h-5 w-5" />
                    <span className="hidden sm:inline">X</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}