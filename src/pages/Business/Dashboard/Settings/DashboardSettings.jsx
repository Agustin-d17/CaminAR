import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Lock, Bell, Shield, Trash2 } from "lucide-react"

export default function DashboardSettings() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      navigate("/business/login")
      return
    }
    setIsLoading(false)
  }, [navigate])

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden" })
      setIsSaving(false)
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" })
      setIsSaving(false)
      return
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      const businesses = JSON.parse(localStorage.getItem("businesses") || "[]")

      const businessIndex = businesses.findIndex((b) => b.email === currentUser.email)
      if (businessIndex !== -1) {
        businesses[businessIndex].password = newPassword
        localStorage.setItem("businesses", JSON.stringify(businesses))

        setMessage({ type: "success", text: "Contraseña actualizada exitosamente" })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar la contraseña" })
    }

    setIsSaving(false)
  }

  const handleDeleteAccount = () => {
    if (confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
        const businesses = JSON.parse(localStorage.getItem("businesses") || "[]")

        const updatedBusinesses = businesses.filter((b) => b.email !== currentUser.email)
        localStorage.setItem("businesses", JSON.stringify(updatedBusinesses))
        localStorage.removeItem("currentUser")

        navigate("/")
      } catch (error) {
        setMessage({ type: "error", text: "Error al eliminar la cuenta" })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando configuración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground mt-2">Administra la configuración de tu cuenta y preferencias</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === "success" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
          }`}
        >
          <AlertCircle className="h-5 w-5" />
          <p>{message.text}</p>
        </div>
      )}

      {/* Seguridad */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Seguridad</CardTitle>
          </div>
          <CardDescription>Actualiza tu contraseña y configuración de seguridad</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Contraseña Actual</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Ingresa tu contraseña actual"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva Contraseña</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
              />
            </div>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Guardando..." : "Cambiar Contraseña"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notificaciones</CardTitle>
          </div>
          <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</p>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Notificaciones Push</Label>
              <p className="text-sm text-muted-foreground">Recibe notificaciones en tiempo real</p>
            </div>
            <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Emails de Marketing</Label>
              <p className="text-sm text-muted-foreground">Recibe ofertas y novedades</p>
            </div>
            <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>
        </CardContent>
      </Card>

      {/* Privacidad */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Privacidad</CardTitle>
          </div>
          <CardDescription>Controla la visibilidad de tu información</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Tu información de contacto es visible para los usuarios que visiten tu perfil de negocio. Puedes editar
              esta información desde la sección de Perfil.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Zona de Peligro */}
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
          </div>
          <CardDescription>Acciones irreversibles para tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, está seguro.
              </p>
              <Button variant="destructive" className="cursor-pointer" onClick={handleDeleteAccount}>
                Eliminar Cuenta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
