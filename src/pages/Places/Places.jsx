import { useEffect, useState, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"
import { TouristCard } from "@/components/TouristCard/TouristCard"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export default function PlacesPage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")
  const [sortOption, setSortOption] = useState("alphabetical-asc")

  const [places, setPlaces] = useState([])
  const [businesses, setBusinesses] = useState([])
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ---------- FETCH ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [placesRes, businessesRes, categoriesRes] = await Promise.all([
          supabase.from("places").select("*"),
          supabase.from("businesses").select("*"),
          supabase.from("categories").select("*")
        ])

        if (placesRes.error) throw placesRes.error
        if (businessesRes.error) throw businessesRes.error
        if (categoriesRes.error) throw categoriesRes.error

        setPlaces(Array.isArray(placesRes.data) ? placesRes.data : [])
        setBusinesses(Array.isArray(businessesRes.data) ? businessesRes.data : [])
        setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : [])
      } catch (err) {
        console.error("Error al obtener datos:", err)
        setError("Error al obtener los datos.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // ---------- MERGE ----------
  const mergedSpots = useMemo(() => {
    const all = [
      ...places.map(p => ({ ...p, type: "place" })),
      ...businesses.map(b => ({ ...b, type: "business" }))
    ]

    if (!category) return all
    return all.filter(item => item.category_id === category)
  }, [category, places, businesses])

  // ---------- SORT ----------
  const sortedSpots = useMemo(() => {
    const spots = [...mergedSpots]

    switch (sortOption) {
      case "alphabetical-asc":
        return spots.sort((a, b) => (a.name || "").localeCompare(b.name || ""))
      case "alphabetical-desc":
        return spots.sort((a, b) => (b.name || "").localeCompare(a.name || ""))
      case "rating-desc":
        return spots.sort((a, b) => (b.rating_value || 0) - (a.rating_value || 0))
      case "rating-asc":
        return spots.sort((a, b) => (a.rating_value || 0) - (b.rating_value || 0))
      default:
        return spots
    }
  }, [mergedSpots, sortOption])

  const getTitle = () => {
    if (!category) return "Descubrí Tafí Viejo"
    const cat = categories.find(c => c.id === category)
    return cat?.name || category
  }

  if (loading) return <p className="text-center mt-20 text-muted-foreground">Cargando lugares...</p>
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>

  return (
    <div className="min-h-screen bg-background">

      {/* NAV */}
      <nav className="flex items-center p-4 border-b border-border relative">
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground cursor-pointer">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-primary">
          <span className="text-2xl font-bold text-blue-950">
            Camin<span className="text-blue-400">AR</span>
          </span>
        </div>
      </nav>

      {/* HEADER */}
      <header className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {getTitle()}
        </h1>

        <div className="flex justify-center items-center gap-4">
          <span className="text-lg text-muted-foreground">Ordenar por:</span>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alphabetical-asc">Alfabético A-Z</SelectItem>
              <SelectItem value="alphabetical-desc">Alfabético Z-A</SelectItem>
              <SelectItem value="rating-desc">Puntuación Mayor a Menor</SelectItem>
              <SelectItem value="rating-asc">Puntuación Menor a Mayor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* GRID */}
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sortedSpots.map((spot) => (
            <TouristCard
              key={`${spot.type}-${spot.id}`}
              id={spot.id}
              name={spot.name}
              description={spot.description}
              image={spot.image}
              rating={spot.rating_value}
              category={categories.find(c => c.id === spot.category_id)?.name}
            />
          ))}
        </div>
      </main>

      {/* Enhanced Footer with Newsletter Subscription */}
      <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* Newsletter Section */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  ¡No te pierdas nada!
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Suscríbete para recibir recomendaciones personalizadas y descubrir
                  nuevos lugares increíbles en Tafi Viejo
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Ingresa tu email"
                    className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-200 hover:scale-105">
                    Suscribirse
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%281%29-S9aTFHpDXbbV7dx3b4hEhFv4huAYGD.png"
                  alt="CaminArte Logo"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-foreground font-semibold">CaminArte</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/business/register"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  ¿Tenés un negocio? Unite a nosotros
                </Link>
                <Link to="/business/login">
                  <Button variant="outline" size="sm" className="border-black/30 text-black hover:bg-black/10 hover:text-black bg-transparent cursor-pointer">
                    Iniciar Sesión
                  </Button>
                </Link>
                <p className="text-muted-foreground text-sm">
                  &copy; 2024 CaminArte. Explora Tafi Viejo con nosotros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
