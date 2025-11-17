import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { ArrowLeft, Save } from "lucide-react"

export default function AdminEditPlace() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [provinces, setProvinces] = useState([])
  const [localities, setLocalities] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    full_description: "",
    category_id: "",
    subcategory_id: "",
    image: "",
    images: [],
    rating: { value: 0, source: "" },
    google_maps_link: "",
    social_links: {
      instagram: "",
      facebook: "",
      twitter: "",
      website: "",
    },
    province_id: "",
    locality_id: "",
    location: {
      address: "",
      lat: 0,
      lng: 0,
    },
    place_id: "",
  })

  // Fetch inicial
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    setLoading(true)

    const [{ data: place }, { data: cat }, { data: sub }, { data: prov }, { data: loc }] =
      await Promise.all([
        supabase.from("places").select("*").eq("id", id).single(),
        supabase.from("categories").select("*"),
        supabase.from("subcategories").select("*"),
        supabase.from("provinces").select("*"),
        supabase.from("localities").select("*"),
      ])

    if (place) setFormData(place)
    setCategories(cat || [])
    setSubcategories(sub || [])
    setProvinces(prov || [])
    setLocalities(loc || [])
    setLoading(false)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (object, field, value) => {
    setFormData(prev => ({
      ...prev,
      [object]: { ...prev[object], [field]: value }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from("places")
      .update(formData)
      .eq("id", id)

    setSaving(false)

    if (!error) navigate(`/admin/panel/places/${id}`)
  }

  if (loading) return <p className="text-center py-10">Cargando...</p>

  // filtramos localidades por provincia
  const filteredLocalities = formData.province_id
    ? localities.filter(l => l.province_id === formData.province_id)
    : []

  // filtramos subcategorias por categoria
  const filteredSubcategories = subcategories.filter(
    s => s.category_id === formData.category_id
  )
  

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={`/admin/panel/places/${id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Editar Lugar</h1>
          <p className="text-slate-500 mt-1">{formData.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Información Básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={formData.name}
                onChange={e => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción Corta</Label>
              <Textarea
                value={formData.description}
                onChange={e => handleChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción Completa</Label>
              <Textarea
                value={formData.full_description}
                onChange={e => handleChange("full_description", e.target.value)}
                rows={6}
              />
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={formData.category_id}
                onValueChange={value => handleChange("category_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subcategoría */}
            <div className="space-y-2">
              <Label>Subcategoría</Label>
              <Select
                value={formData.subcategory_id}
                onValueChange={value => handleChange("subcategory_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una subcategoría" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubcategories.length > 0 ? (
                    filteredSubcategories.map(sub => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-sm text-slate-500">No hay subcategorías</p>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>Rating</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.rating?.value || ""}
                onChange={e => handleNestedChange("rating", "value", Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Ubicación */}
        <Card>
          <CardHeader>
            <CardTitle>Ubicación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Provincia */}
            <div className="space-y-2">
              <Label>Provincia</Label>
              <Select
                value={formData.province_id}
                onValueChange={value => handleChange("province_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una provincia" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Localidad */}
            <div className="space-y-2">
              <Label>Localidad</Label>
              <Select
                value={formData.locality_id}
                onValueChange={value => handleChange("locality_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una localidad" />
                </SelectTrigger>
                <SelectContent>
                  {filteredLocalities.map(l => (
                    <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input
                value={formData.location.address}
                onChange={e => handleNestedChange("location", "address", e.target.value)}
              />
            </div>

            {/* Coordenadas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Latitud</Label>
                <Input
                  type="number"
                  value={formData.location.lat}
                  onChange={e => handleNestedChange("location", "lat", Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Longitud</Label>
                <Input
                  type="number"
                  value={formData.location.lng}
                  onChange={e => handleNestedChange("location", "lng", Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enlaces */}
        <Card>
          <CardHeader>
            <CardTitle>Enlaces</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="space-y-2">
              <Label>Google Maps</Label>
              <Input
                value={formData.google_maps_link}
                onChange={e => handleChange("google_maps_link", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Google Place ID</Label>
              <Input
                value={formData.place_id}
                onChange={e => handleChange("place_id", e.target.value)}
              />
            </div>

            {/* Redes */}
            {["instagram", "facebook", "twitter", "website"].map(field => (
              <div className="space-y-2" key={field}>
                <Label>{field}</Label>
                <Input
                  value={formData.social_links[field] || ""}
                  onChange={e => handleNestedChange("social_links", field, e.target.value)}
                />
              </div>
            ))}

          </CardContent>
        </Card>

        {/* BOTONES */}
        <div className="flex gap-4">
          <Link to="/admin/panel/places">
            <Button variant="outline">Cancelar</Button>
          </Link>

          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>

      </form>
    </div>
  )
}
