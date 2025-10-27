import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Building2, MapPin, ChevronRight } from "lucide-react"
// Forms
import PublicEntityForm from "./Forms/PublicEntityForm"
import TouristPlaceForm from "./Forms/TouristPlaceForm"

export default function CreatePlace() {
  const [placeType, setPlaceType] = useState(null)
  const [step, setStep] = useState(1)

  const handlePlaceTypeSelect = (type) => {
    setPlaceType(type)
    setStep(2)
  }

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/panel/places">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold ">Crear Nuevo Lugar</h1>
            <p className="mt-1 text-slate-500">Selecciona el tipo de lugar</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
          <Card
            className="cursor-pointer hover:border-gray-500 transition-colors"
            onClick={() => handlePlaceTypeSelect("public_entities")}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Building2 className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Entidad Publica</CardTitle>
              </div>
              <CardDescription>
                Oficinas, Comisarias, Iglesias, Museos, Plazas, Hospitales y más.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  Información de contacto completa
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  Horarios de atención
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  Redes sociales y sitio web
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-gray-500 transition-colors"
            onClick={() => handlePlaceTypeSelect("tourist")}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <MapPin className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Lugar Turístico</CardTitle>
              </div>
              <CardDescription >
                Miradores, Playas, Monumentos y Otras atracciones turísticas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-500" />
                  Descripción detallada
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-500" />
                  Calificación y reseñas
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-500" />
                  Galería de imágenes
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (placeType === "tourist") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStep(1)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Crear Lugar Turístico</h1>
            <p className="text-slate-500 mt-1">Completa la información del lugar turístico</p>
          </div>
        </div>

        <TouristPlaceForm setStep={setStep} />
      </div>
    )
  }

  if (placeType === "public_entities") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStep(1)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Crear Entidad Publica</h1>
            <p className="text-slate-500 mt-1">Completa la información de la entidad publica</p>
          </div>
        </div>

        <PublicEntityForm setStep={setStep} />
      </div>
    )
  }

  return null
}
