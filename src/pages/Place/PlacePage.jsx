import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, MapPin, Instagram, Facebook, X } from "lucide-react"

export default function PlacePage() {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { data, error } = await supabase
          .from("places")
          .select("*")
          .eq("id", id)
          .single()

        if (error) throw error
        setPlace(data)
      } catch (error) {
        console.error("Error al obtener el lugar:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlace()
  }, [id])

  if (loading) return <div className="text-center mt-10 text-gray-400">Cargando...</div>
  if (!place) return <div className="text-center mt-10 text-gray-400">Lugar no encontrado</div>

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center p-4 border-b border-border relative">
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

        <div className="absolute left-1/2 transform -translate-x-1/2 text-primary">
          <span className="text-2xl font-bold text-blue-950">
            Camin<span className="text-blue-400">AR</span>
          </span>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <ImageCarousel images={place.images} alt={place.name} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{place.name}</h1>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-lg">{place.rating_value}</span>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-foreground/90 leading-relaxed">
              {place.full_description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex items-center gap-2 cursor-pointer">
              <a href={place.google_maps_link} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" />
                Ver en Google Maps
              </a>
            </Button>

            <div className="flex gap-3">
              {place.social_links?.instagram && (
                <Button variant="outline" size="default" asChild className="px-4 py-2 bg-transparent">
                  <a
                    href={place.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="hidden sm:inline">Instagram</span>
                  </a>
                </Button>
              )}

              {place.social_links?.facebook && (
                <Button variant="outline" size="default" asChild className="px-4 py-2 bg-transparent">
                  <a
                    href={place.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="hidden sm:inline">Facebook</span>
                  </a>
                </Button>
              )}

              {place.social_links?.twitter && (
                <Button variant="outline" size="default" asChild className="px-4 py-2 bg-transparent">
                  <a
                    href={place.social_links.twitter}
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
