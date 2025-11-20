import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AdminEditBusiness() {
  const { id } = useParams()
  const navigate = useNavigate()

  const ALLOWED_BUSINESS_CATEGORIES = [
    "59eea947-2da4-4611-b753-1db0b4b1fbe4", // Restaurantes y cafeterías
    "5d2aa5bc-edc8-49b4-8214-a7b95a6c3d14"  // Negocios
  ]

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [provinces, setProvinces] = useState([])
  const [localities, setLocalities] = useState([])

  const [formData, setFormData] = useState(null)

  // Load data + options
  useEffect(() => {
    async function load() {
      const [{ data: cat }, { data: sub }, { data: prov }, { data: loc }, { data: business }] = await Promise.all([
        supabase.from("categories").select("*"),
        supabase.from("subcategories").select("*"),
        supabase.from("provinces").select("*"),
        supabase.from("localities").select("*"),
        supabase.from("businesses").select("*").eq("id", id).single()
      ])

      if (!business) {
        alert("El negocio no existe.")
        navigate("/admin/panel/business")
        return
      }

      setCategories((cat || []).filter(c => ALLOWED_BUSINESS_CATEGORIES.includes(c.id)))
      setSubcategories(sub || [])
      setProvinces(prov || [])
      setLocalities(loc || [])
      setFormData(business)
      setLoading(false)
    }

    load()
  }, [id, navigate])

  const handleUpdate = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSocialUpdate = (key, value) => {
    setFormData(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [key]: value }
    }))
  }

  const filteredSubcategories = subcategories.filter(s => s.category_id === formData?.category_id)
  const filteredLocalities = localities.filter(l => l.province_id === formData?.province_id)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from("businesses")
      .update(formData)
      .eq("id", id)

    if (!error) navigate("/admin/panel/business")
    else alert("Error: " + error.message)
  }

  if (loading || !formData) return <p className="text-center py-10 text-slate-400">Cargando...</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/panel/business">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold">Editar Negocio</h1>
          <p className="text-slate-500 mt-1">Modifica la información necesaria</p>
        </div>
      </div>

      {/* Info Básica */}
      <Card>
        <CardHeader><CardTitle>Información Básica</CardTitle></CardHeader>
        <CardContent className="space-y-4">

          <div>
            <Label>Nombre *</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleUpdate("name", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Categoría *</Label>
              <Select
                value={formData.category_id}
                onValueChange={(v) => handleUpdate("category_id", v)}
              >
                <SelectTrigger><SelectValue placeholder="Categoría" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Subcategoría *</Label>
              <Select
                value={formData.subcategory_id}
                onValueChange={(v) => handleUpdate("subcategory_id", v)}
              >
                <SelectTrigger><SelectValue placeholder="Subcategoría" /></SelectTrigger>
                <SelectContent>
                  {filteredSubcategories.length
                    ? filteredSubcategories.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)
                    : <SelectItem disabled>No hay subcategorías</SelectItem>}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Descripción *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleUpdate("description", e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Descripción Completa</Label>
            <Textarea
              value={formData.full_description || ""}
              onChange={(e) => handleUpdate("full_description", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ubicación */}
      <Card>
        <CardHeader><CardTitle>Ubicación</CardTitle></CardHeader>
        <CardContent className="space-y-4">

          <div>
            <Label>Provincia *</Label>
            <Select
              value={formData.province_id}
              onValueChange={(v) => handleUpdate("province_id", v)}
            >
              <SelectTrigger><SelectValue placeholder="Provincia" /></SelectTrigger>
              <SelectContent>
                {provinces.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Localidad *</Label>
            <Select
              value={formData.locality_id}
              onValueChange={(v) => handleUpdate("locality_id", v)}
            >
              <SelectTrigger><SelectValue placeholder="Localidad" /></SelectTrigger>
              <SelectContent>
                {filteredLocalities.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Dirección *</Label>
            <Input
              value={formData.address}
              onChange={(e) => handleUpdate("address", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Latitud</Label>
              <Input
                type="number"
                value={formData.lat || ""}
                onChange={(e) => handleUpdate("lat", Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Longitud</Label>
              <Input
                type="number"
                value={formData.lng || ""}
                onChange={(e) => handleUpdate("lng", Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label>Google Maps URL</Label>
            <Input
              value={formData.google_maps_link || ""}
              onChange={(e) => handleUpdate("google_maps_link", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Imágenes */}
      <Card>
        <CardHeader><CardTitle>Imágenes</CardTitle></CardHeader>
        <CardContent className="space-y-4">

          <div>
            <Label>Imagen Principal *</Label>
            <Input
              value={formData.image}
              onChange={(e) => handleUpdate("image", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Galería</Label>
            {formData.images.map((img, idx) => (
              <Input
                key={idx}
                value={img || ""}
                placeholder={`URL Imagen ${idx + 1}`}
                onChange={(e) => {
                  const arr = [...formData.images]
                  arr[idx] = e.target.value
                  handleUpdate("images", arr)
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Redes */}
      <Card>
        <CardHeader><CardTitle>Redes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {["facebook", "instagram", "twitter", "website"].map(r => (
            <div key={r}>
              <Label>{r}</Label>
              <Input
                value={formData.social_links?.[r] || ""}
                onChange={(e) => handleSocialUpdate(r, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Guardar Cambios</Button>
    </form>
  )
}
