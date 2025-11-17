import { useState } from "react"
import { Link } from "react-router-dom"

import PlaceForm from "./Forms/PlaceForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, MapPin, ChevronRight } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

export default function AdminCreatePlace() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const PUBLIC_ENTITY_CATEGORY_ID = "c1b89d2c-1c60-4055-9f31-01f08e4db90f" 
  const TOURIST_PLACE_CATEGORY_ID = "34e41b4a-a123-4fef-87c2-07f6a87d7b3b"  
  
  const handleSelectType = (type) => {
    if (type === "public") setSelectedCategory(PUBLIC_ENTITY_CATEGORY_ID)
    if (type === "tourist") setSelectedCategory(TOURIST_PLACE_CATEGORY_ID)
    setStep(2)
  }

  // Paso 1: elegir tipo
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
            <h1 className="text-3xl font-bold">Crear Nuevo Lugar</h1>
            <p className="text-slate-500 mt-1">Selecciona el tipo de lugar</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">

          {/* Entidad pública */}
          <Card
            className="cursor-pointer hover:border-gray-500 transition-colors"
            onClick={() => handleSelectType("public")}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Building2 className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Entidad Pública</CardTitle>
              </div>
              <CardDescription>
                Oficinas, hospitales, plazas, iglesias, museos, etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  Info de contacto
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  Horarios
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Lugar turístico */}
          <Card
            className="cursor-pointer hover:border-gray-500 transition-colors"
            onClick={() => handleSelectType("tourist")}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <MapPin className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Lugar Turístico</CardTitle>
              </div>
              <CardDescription>
                Miradores, monumentos, playas, atracciones.
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
                  Calificación
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    )
  }

  // Paso 2: formulario real
  if (step === 2) {
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
            <h1 className="text-3xl font-bold">Crear Lugar</h1>
            <p className="text-slate-500 mt-1">Completa la información</p>
          </div>
        </div>

        <PlaceForm initialCategory={selectedCategory} />
      </div>
    )
  }

  return null
}
