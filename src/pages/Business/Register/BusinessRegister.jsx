import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Facebook,
  Instagram,
} from "lucide-react"

import { Link, useNavigate } from "react-router-dom"

export default function BusinessRegister() {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [filteredSubcategories, setFilteredSubcategories] = useState([])
  const [provinces, setProvinces] = useState([])
  const [localities, setLocalities] = useState([])

  const [loadingDB, setLoadingDB] = useState(true)
  const [error, setError] = useState("")

  const ALLOWED_BUSINESS_CATEGORIES = [
    "59eea947-2da4-4611-b753-1db0b4b1fbe4", // Restaurantes y Cafeterías
    "5d2aa5bc-edc8-49b4-8214-a7b95a6c3d14"  // Negocios
  ]

  // --------------------------------------------------------------------
  // FORM DATA (LIMPIO Y CORRECTO)
  // --------------------------------------------------------------------
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",

    name: "",
    category_id: "",
    subcategory_id: "",
    description: "",

    address: "",
    province_id: "",
    locality_id: "",

    phone_number: "",
    contact_email: "",
    website: "",
    google_maps_link: "",
    facebook: "",
    instagram: "",
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // --------------------------------------------------------------------
  // FETCH A SUPABASE
  // --------------------------------------------------------------------
  useEffect(() => {
  const fetchData = async () => {
    try {
      const [catRes, subRes, provRes, locRes] = await Promise.all([
        supabase.from("categories").select("*"),
        supabase.from("subcategories").select("*"),
        supabase.from("provinces").select("*"),
        supabase.from("localities").select("*")
      ])

      if (catRes.error) throw catRes.error
      if (subRes.error) throw subRes.error
      if (provRes.error) throw provRes.error
      if (locRes.error) throw locRes.error

      setCategories(catRes.data.filter(c => ALLOWED_BUSINESS_CATEGORIES.includes(c.id)))
      setSubcategories(subRes.data)
      setProvinces(provRes.data)
      setLocalities(locRes.data)

    } catch (err) {
      console.error(err)
      setError("Error obteniendo datos")
    } finally {
      setLoadingDB(false)
    }
  }

  fetchData()
}, [])

  // --------------------------------------------------------------------
  // SUBCATEGORIES SEGÚN CATEGORY
  // --------------------------------------------------------------------
  useEffect(() => {
    if (!formData.category_id) {
      setFilteredSubcategories([])
      return
    }

    setFilteredSubcategories(
      subcategories.filter(s => s.category_id === formData.category_id)
    )
  }, [formData.category_id, subcategories])

  // --------------------------------------------------------------------
  // VALIDACIÓN
  // --------------------------------------------------------------------
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.email &&
          formData.password &&
          formData.confirm_password &&
          formData.password === formData.confirm_password
        )

      case 2:
        return formData.name && formData.category_id && formData.description

      case 3:
        return (
          formData.address &&
          formData.province_id &&
          formData.locality_id &&
          formData.phone_umber &&
          formData.contact_email
        )

      default:
        return false
    }
  }

  const nextStep = () => validateStep(currentStep) && setCurrentStep(currentStep + 1)
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)

  // --------------------------------------------------------------------
  // SUBMIT FINAL (AUTH + BUSINESSES)
  // --------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(3)) return

    setError("")  
    try {
      // ---------------------------------------------------------
      // 1. Crear usuario en Supabase Auth
      // ---------------------------------------------------------
      const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (signUpErr) throw new Error(signUpErr.message)

      const user = signUpData.user;
      if (!user) throw new Error("Error creando usuario");

      // ---------------------------------------------------------
      // 2. INSERT real del negocio ya con auth.uid() disponible
      // ---------------------------------------------------------
      const { error: bizErr } = await supabase.from("businesses").insert({
        auth_user_id: user.id,
        name: formData.name,
        category_id: formData.category_id,
        subcategory_id: formData.subcategory_id || null,
        description: formData.description,

        province_id: formData.province_id,
        locality_id: formData.locality_id,
        address: formData.address,

        contact: {
          phone: formData.phone_number,
          email: formData.contact_email,
        },

        social_links: {
          website: formData.website,
          facebook: formData.facebook,
          instagram: formData.instagram,
        },

        google_maps_link: formData.google_maps_link,
        status: "approved",
      })

      if (bizErr) {
         // 2A. ROLLBACK: borrar usuario creado en Auth
        await supabase.auth.admin.deleteUser(user.id);
        throw new Error("Error creando negocio. Intenta nuevamente.");
      }

      // ---------------------------------------------------------
      // 3. Redirigir a dashboard (futuro)
      // ---------------------------------------------------------
      navigate("/business/dashboard")

    } catch (err) {
      console.error(err)
      setError(err.message || "Error al registrar el negocio")
    }
  }


  // --------------------------------------------------------------------
  // UI (SIN CAMBIAR)
  // --------------------------------------------------------------------
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Crear Cuenta</h3>
            <p className="text-sm text-muted-foreground">Primero necesitamos crear tu cuenta</p>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="tu@mail.com"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Pass */}
            <div className="space-y-2">
              <Label>Contraseña *</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>

            {/* Confirm pass */}
            <div className="space-y-2">
              <Label>Confirmar Contraseña *</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={(e) => handleInputChange("confirm_password", e.target.value)}
                  placeholder="Repite tu contraseña"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Básica</h3>

            <div className="space-y-2">
              <Label>Nombre del Negocio *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ej: Café Aurora"
              />
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <Label>Categoría *</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => handleInputChange("category_id", value)}
              >
                <SelectTrigger><SelectValue placeholder="Selecciona categoría" /></SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subcategoría */}
            {filteredSubcategories.length > 0 && (
              <div className="space-y-2">
                <Label>Tipo *</Label>
                <Select
                  value={formData.subcategory_id}
                  onValueChange={(value) => handleInputChange("subcategory_id", value)}
                >
                  <SelectTrigger><SelectValue placeholder="Selecciona tipo" /></SelectTrigger>
                  <SelectContent>
                    {filteredSubcategories.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Descripción *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe tu negocio…"
                rows={4}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información de Contacto</h3>

            <div className="space-y-2">
              <Label>Dirección *</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Calle 123"
              />
            </div>

            {/* Provincia y Localidad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Provincia *</Label>
                <Select
                  value={formData.province_id}
                  onValueChange={(value) => handleInputChange("province_id", value)}
                >
                  <SelectTrigger><SelectValue placeholder="Provincia" /></SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Localidad *</Label>
                <Select
                  value={formData.locality_id}
                  onValueChange={(value) => handleInputChange("locality_id", value)}
                >
                  <SelectTrigger><SelectValue placeholder="Localidad" /></SelectTrigger>
                  <SelectContent>
                    {localities
                      .filter(l => l.province_id === formData.province_id)
                      .map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Teléfono *</Label>
                <Input
                  value={formData.phone_number}
                  onChange={(e) => handleInputChange("phone_number", e.target.value)}
                  placeholder="+54..."
                />
              </div>

              <div className="space-y-2">
                <Label>Email de Contacto *</Label>
                <Input
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange("contact_email", e.target.value)}
                  placeholder="contacto@negocio.com"
                />
              </div>
            </div>

            {/* Redes */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">Redes Sociales</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Facebook</Label>
                  <Input
                    value={formData.facebook}
                    onChange={(e) => handleInputChange("facebookLink", e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input
                    value={formData.instagram}
                    onChange={(e) => handleInputChange("instagramLink", e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sitio Web</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="www.tunegocio.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Google Maps</Label>
                <Input
                  value={formData.google_maps_link}
                  onChange={(e) => handleInputChange("google_maps_link", e.target.value)}
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // --------------------------------------------------------------------
  // UI FINAL
  // --------------------------------------------------------------------
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
            <span className="text-2xl font-bold text-blue-950">
              Camin<span className="text-blue-400">AR</span>
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-4">Registra tu Negocio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Únete a CaminAR y conecta con miles de visitantes
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Datos de inicio de sesion"}
              {currentStep === 2 && "Información del Negocio"}
              {currentStep === 3 && "Información de Contacto"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Completa los datos para crear tu cuenta"}
              {currentStep === 2 && "Cuéntanos sobre tu negocio"}
              {currentStep === 3 && "Dónde pueden encontrarte"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {renderStepContent()}

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="flex-1"
                  >
                    Siguiente <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1" disabled={!validateStep(3)}>
                    Registrar Negocio
                  </Button>
                )}

                <Link to="/" className={currentStep === 1 ? "flex-1" : ""}>
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
