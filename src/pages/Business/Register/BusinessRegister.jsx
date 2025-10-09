import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Facebook,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "Restaurantes",
  "Monumentos",
  "Plazas",
  "Parques",
  "Museos",
  "Playas",
  "Hoteles",
  "Cafeterías",
  "Tiendas",
  "Servicios",
];

const provincias = [
  "Tucumán",
  "Buenos Aires",
  "Córdoba",
  "Santa Fe",
  "Mendoza",
  "Salta",
  "Entre Ríos",
  "Misiones",
  "Corrientes",
  "Santiago del Estero",
];

export default function BusinessRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    // Paso 1: Creación de cuenta
    email: "",
    password: "",
    confirmPassword: "",
    // Paso 2: Información básica
    businessName: "",
    category: "",
    description: "",
    // Paso 3: Información de contacto
    address: "",
    localidad: "",
    provincia: "",
    phone: "",
    contactEmail: "",
    website: "",
    hours: "",
    googleMapsLink: "",
    facebookUrl: "",
    instagramUrl: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return formData.businessName && formData.category && formData.description;
      case 3:
        return formData.address && formData.localidad && formData.provincia && formData.phone && formData.contactEmail;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      console.log("Datos del formulario:", formData);
      // Aquí se procesaría el registro del negocio
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Crear Cuenta</h3>
            <p className="text-sm text-muted-foreground">Primero necesitamos crear tu cuenta de usuario</p>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="tu@email.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Mínimo 8 caracteres"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Repite tu contraseña"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-500">Las contraseñas no coinciden</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Básica</h3>
            <p className="text-sm text-muted-foreground">Cuéntanos sobre tu negocio</p>

            <div className="space-y-2">
              <Label htmlFor="businessName">Nombre del Negocio *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder="Ej: Restaurante El Mirador"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe tu negocio, qué ofreces y qué lo hace especial..."
                rows={4}
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información de Contacto</h3>
            <p className="text-sm text-muted-foreground">¿Dónde pueden encontrarte?</p>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección Completa *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Calle, número, barrio"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="localidad">Localidad *</Label>
                <Input
                  id="localidad"
                  value={formData.localidad}
                  onChange={(e) => handleInputChange("localidad", e.target.value)}
                  placeholder="Ej: Tafi Viejo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provincia">Provincia *</Label>
                <Select value={formData.provincia} onValueChange={(value) => handleInputChange("provincia", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provincias.map((provincia) => (
                      <SelectItem key={provincia} value={provincia.toLowerCase()}>
                        {provincia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+54 381 123-4567"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email de Contacto *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="contacto@tunegocio.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Sitio Web</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="www.tunegocio.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Horarios</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="hours"
                    value={formData.hours}
                    onChange={(e) => handleInputChange("hours", e.target.value)}
                    placeholder="Lun-Vie 9:00-18:00"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleMapsLink">Link de Google Maps</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="googleMapsLink"
                  value={formData.googleMapsLink}
                  onChange={(e) => handleInputChange("googleMapsLink", e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Pega aquí el enlace de Google Maps de tu ubicación para que los usuarios puedan encontrar el camino
                fácilmente
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-medium">Redes Sociales</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl">Facebook</Label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="facebookUrl"
                      value={formData.facebookUrl}
                      onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                      placeholder="https://facebook.com/tunegocio"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagramUrl">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="instagramUrl"
                      value={formData.instagramUrl}
                      onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                      placeholder="https://instagram.com/tunegocio"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Registra tu Negocio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Únete a CaminAR y conecta con los miles de visitantes que recibe tu ciudad cada día
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step === currentStep
                          ? "bg-primary text-primary-foreground"
                          : step < currentStep
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && <div className={`w-8 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Paso {currentStep} de 3</span>
            </div>

            <CardTitle>
              {currentStep === 1 && "Crear Cuenta"}
              {currentStep === 2 && "Información del Negocio"}
              {currentStep === 3 && "Información de Contacto"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Completa los datos para crear tu cuenta"}
              {currentStep === 2 && "Cuéntanos sobre tu negocio"}
              {currentStep === 3 && "Información de contacto y ubicación"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button type="button" onClick={nextStep} className="flex-1" disabled={!validateStep(currentStep)}>
                    Siguiente
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1" disabled={!validateStep(3)}>
                    Registrar Negocio
                  </Button>
                )}

                <Link to="/" className={currentStep === 1 ? "flex-1" : ""}>
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
