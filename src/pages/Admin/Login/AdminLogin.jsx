import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

// UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // 1. Login con Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (authError) {
        throw new Error("Credenciales incorrectas.")
      }

      const user = authData.user
      if (!user) {
        throw new Error("No se pudo obtener el usuario autenticado.")
      }

      // 2. Validar que este usuario exista en admin_users
      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("auth_user_id", user.id)
        .single()

      if (adminError || !admin) {
        await supabase.auth.signOut()
        throw new Error("No tienes permisos de administrador.")
      }

      // 3. Navegar al panel

      navigate("/admin/panel")
    } catch (err) {
      console.error(err)
      setError(err.message || "Error al iniciar sesión.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon" className="cursor-pointer text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-2xl font-bold text-blue-950">
              Camin<span className="text-blue-400">AR</span>
            </span>
          </div>

          <div></div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Iniciar Sesión</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acceso exclusivo para administradores
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>Ingresa tus credenciales</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ejemplo.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Contraseña</Label>
                <div className="relative">
                  <Input
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
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
