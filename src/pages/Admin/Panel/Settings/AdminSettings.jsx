import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Database, Bell, Shield, Globe } from "lucide-react"

export default function AdminSettings() {
  const [platformName, setPlatformName] = useState("CaminAR")
  const [platformDescription, setPlatformDescription] = useState(
    "Plataforma de turismo y negocios locales de Tafi Viejo"
  )
  const [allowRegistrations, setAllowRegistrations] = useState(true)
  const [requireApproval, setRequireApproval] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const handleSave = () => {
    const settings = {
      platformName,
      platformDescription,
      allowRegistrations,
      requireApproval,
      emailNotifications,
      maintenanceMode,
    }
    localStorage.setItem("platformSettings", JSON.stringify(settings))
    alert("Configuración guardada exitosamente")
  }

  const handleExportData = () => {
    const businesses = localStorage.getItem("businesses")
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(businesses || "[]")
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "caminarte-businesses.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-slate-500">Administra la configuración general de la plataforma</p>
      </div>

      <div className="grid gap-6">
        {/* Información General */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <CardTitle>Información General</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Configuración básica de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName" className="text-slate-500">
                Nombre de la Plataforma
              </Label>
              <Input
                id="platformName"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platformDescription" className="text-slate-500">
                Descripción
              </Label>
              <Textarea
                id="platformDescription"
                value={platformDescription}
                onChange={(e) => setPlatformDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Seguridad y Acceso */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <CardTitle>Seguridad y Acceso</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Controla el acceso y registro de usuarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-500">Permitir Registros</Label>
                <p className="text-sm text-slate-500">Permite que nuevos negocios se registren</p>
              </div>
              <Switch checked={allowRegistrations} onCheckedChange={setAllowRegistrations} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-500">Requerir Aprobación</Label>
                <p className="text-sm text-slate-500">
                  Los nuevos negocios requieren aprobación manual
                </p>
              </div>
              <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-500">Modo Mantenimiento</Label>
                <p className="text-sm text-slate-500">Desactiva temporalmente el acceso público</p>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-500" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Configura las notificaciones del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-slate-500">Notificaciones por Email</Label>
                <p className="text-sm text-slate-500">
                  Recibe alertas sobre nuevos registros y actividad
                </p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Gestión de Datos */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-500" />
              <CardTitle>Gestión de Datos</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Exporta o respalda los datos de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleExportData}
              variant="outline"
              className="cursor-pointer"
            >
              <Database className="h-4 w-4 mr-2" />
              Exportar Datos de Negocios
            </Button>
          </CardContent>
        </Card>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="cursor-pointer"
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  )
}
