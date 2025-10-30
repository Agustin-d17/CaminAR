import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// Importa tus componentes de UI (asumo que estos son componentes JSX)
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
// Importa los iconos de lucide-react
import { ArrowLeft, Mail, Eye, EyeOff, AlertCircle } from "lucide-react"

// Componente JSX puro (eliminada la definición de tipo 'React.FC')
export default function BusinessLogin() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Manejador de formulario en JS (eliminada la definición de tipo ': React.FormEvent')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Demo credentials
      if (email === "demo@caminarte.com" && password === "demo123") {
        localStorage.setItem("currentUser", JSON.stringify({ email, role: "business" }))
        navigate("/business/dashboard")
      } else {
        setError("Email o contraseña incorrectos")
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/"> 
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-2xl font-bold text-blue-950">Camin<span className="text-blue-400">AR</span></span>
          </div>
          <div></div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Iniciar Sesión</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Accede a tu cuenta de negocio</p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Bienvenido de vuelta</CardTitle>
            <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Usuario de prueba:</p>
              <p className="text-xs text-blue-600/80 dark:text-blue-400/80">Email: demo@caminarte.com</p>
              <p className="text-xs text-blue-600/80 dark:text-blue-400/80">Contraseña: demo123</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link to="/business/register" className="text-primary hover:underline cursor-pointer"> 
                  Regístrate aquí
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}