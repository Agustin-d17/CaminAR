import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import categories from "@/data/categories.json"

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/turismo04.jpg-EpV0E3vQvm45RybzqIQQ6fDjae5WTc.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Header - removed login button */}
        <nav className="flex justify-center items-center p-4">
          <div className="text-xl font-bold text-white">CaminAR</div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%281%29-S9aTFHpDXbbV7dx3b4hEhFv4huAYGD.png"
                alt="Turismo Tafi Viejo Logo"
                className="w-full h-full object-contain rounded-full" // agregado rounded-full para hacer el logo circular
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Tafi Viejo</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Conoce los increibles lugares que te esperan en nuestra ciudad
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
            {categories.map((category) => (
              <Link key={category.categoryId} to={`/places?category=${category.categoryId}`}>
                <div className="bg-transparent border-2 border-white rounded-full p-6 text-center hover:bg-white/40 hover:scale-105 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12">
            <Link to="/places">
              <Button size="lg" className="bg-lime-600 hover:bg-lime-600/75 text-white px-8 py-3 text-lg cursor-pointer">
                Ver lugares cercanos
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* Newsletter Section */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">¡Mantente conectado!</h3>
                <p className="text-white/80 mb-6 text-lg">
                  Recibe recomendaciones personalizadas de lugares únicos y las últimas novedades de Tafi Viejo
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Ingresa tu email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary backdrop-blur-sm"
                  />
                  <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-200 hover:scale-105 cursor-pointer">
                    Suscribirse
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dise%C3%B1o%20sin%20t%C3%ADtulo%20%281%29-S9aTFHpDXbbV7dx3b4hEhFv4huAYGD.png"
                  alt="CaminArte Logo"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-semibold">CaminAR</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/business/register" className="text-white/70 hover:text-white text-sm transition-colors">
                  ¿Tenés un negocio? Unite a nosotros
                </Link>
                <Link to="/business/login">
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent cursor-pointer">
                    Iniciar Sesión
                  </Button>
                </Link>
                <p className="text-white/60 text-sm">&copy; 2026 CaminAR. Explora Tafi Viejo con nosotros.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}