import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// Componentes UI
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
// Iconos de lucide-react
import { ArrowLeft, Eye, EyeOff, AlertCircle, } from "lucide-react"
// Importacion de la coleccion de usuarios simulando una base de datos
import adminUsers from "@/data/adminUsers.json"


export default function AdminLogin() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // HandleLogin con simulacion de autenticacion y llamada a base de datos
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const foundUser = adminUsers.find(
      (adminUser) => 
        (adminUser.account.username === username || adminUser.account.loginEmail === username) && 
        adminUser.account.password === password
      )

      if (foundUser) {
        localStorage.setItem("currentAdmin", JSON.stringify({
          id: foundUser.id,
          role: foundUser.permissions.role,
          scope: foundUser.permissions.scope,
          name: foundUser.profile.name,
          email: foundUser.profile.email,
          loginTime: new Date().toISOString(),
        }))
        navigate("/admin/panel")
      } else {
        setError("Credenciales incorrectas o usuario no autorizado.")
      }
    } catch (error) {
      console.error("Error al iniciar sesion:", error)
      setError("Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo.")
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
            <span className="text-xl font-bold">CaminAR</span>
          </div>
          <div></div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Iniciar Sesión</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Acceso exclusivo para administradores</p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="Username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuario o correo electrónico"
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}