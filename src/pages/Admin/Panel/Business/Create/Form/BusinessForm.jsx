// BusinessForm.jsx - versión final normalizada

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

export default function BusinessForm() {
  const navigate = useNavigate()
  
  const ALLOWED_BUSINESS_CATEGORIES = [
    "59eea947-2da4-4611-b753-1db0b4b1fbe4", // Restaurantes y Cafeterías
    "5d2aa5bc-edc8-49b4-8214-a7b95a6c3d14"  // Negocios
  ]

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
    province_id: "",
    locality_id: "",
    address: "",
    lat: 0,
    lng: 0,
    image: "",
    images: ["", "", ""],
    google_maps_link: "",
    social_links: {},
    rating_value: 0,
    rating_source: "manual",
    place_id: null,
    status: "pending"
  })

  useEffect(() => {
    async function loadOptions() {
      const [{ data: cat }, { data: sub }, { data: prov }, { data: loc }] = await Promise.all([
        supabase.from("categories").select("*"),
        supabase.from("subcategories").select("*"),
        supabase.from("provinces").select("*"),
        supabase.from("localities").select("*")
      ])

      setCategories((cat || []).filter(c => ALLOWED_BUSINESS_CATEGORIES.includes(c.id)))
      setSubcategories(sub || [])
      setProvinces(prov || [])
      setLocalities(loc || [])
    }
    loadOptions()
  }, [])

  const handleUpdate = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSocialUpdate = (key, value) => {
    setFormData(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [key]: value }
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { error } = await supabase.from("businesses").insert(formData)

    if (!error) navigate("/admin/panel/business")
    else alert("Error: " + error.message)
  }

  const filteredSubcategories = subcategories.filter(s => s.category_id === formData.category_id)
  const filteredLocalities = localities.filter(l => l.province_id === formData.province_id)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Información básica */}
      <Card>
        <CardHeader><CardTitle>Información Básica</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nombre *</Label>
            <Input required value={formData.name} onChange={(e) => handleUpdate("name", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select value={formData.category_id} onValueChange={v => handleUpdate("category_id", v)}>
              <SelectTrigger><SelectValue placeholder="Categoría" /></SelectTrigger>
              <SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            
            <Select value={formData.subcategory_id} onValueChange={v => handleUpdate("subcategory_id", v)}>
              <SelectTrigger><SelectValue placeholder="Subcategoría" /></SelectTrigger>
              <SelectContent>
                {filteredSubcategories.length ? filteredSubcategories.map(sub => <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>) : <SelectItem disabled>No hay subcategorías</SelectItem>}
              </SelectContent>
            </Select>
          </div>

          <Textarea required value={formData.description} onChange={e => handleUpdate("description", e.target.value)} />
          <Textarea value={formData.full_description} onChange={e => handleUpdate("full_description", e.target.value)} />
        </CardContent>
      </Card>

      {/* Ubicación */}
      <Card>
        <CardHeader><CardTitle>Ubicación</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Select value={formData.province_id} onValueChange={v => handleUpdate("province_id", v)}>
            <SelectTrigger><SelectValue placeholder="Provincia" /></SelectTrigger>
            <SelectContent>{provinces.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
          </Select>

          <Select value={formData.locality_id} onValueChange={v => handleUpdate("locality_id", v)}>
            <SelectTrigger><SelectValue placeholder="Localidad" /></SelectTrigger>
            <SelectContent>{filteredLocalities.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}</SelectContent>
          </Select>

          <Input required value={formData.address} onChange={e => handleUpdate("address", e.target.value)} />
        </CardContent>
      </Card>

      {/* Imágenes */}
      <Card>
        <CardHeader><CardTitle>Imágenes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input required placeholder="Imagen principal" value={formData.image} onChange={e => handleUpdate("image", e.target.value)} />
          {formData.images.map((img, idx) => (
            <Input key={idx} value={img} placeholder={`Galería ${idx+1}`} onChange={e => {
              const arr = [...formData.images]
              arr[idx] = e.target.value
              handleUpdate("images", arr)
            }} />
          ))}
        </CardContent>
      </Card>

      {/* Redes */}
      <Card>
        <CardHeader><CardTitle>Redes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {["facebook", "instagram", "twitter", "website"].map(r => (
            <Input key={r} placeholder={r} onChange={e => handleSocialUpdate(r, e.target.value)} />
          ))}
          <Input placeholder="Google Maps URL" value={formData.google_maps_link} onChange={e => handleUpdate("google_maps_link", e.target.value)} />
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Crear Negocio</Button>

    </form>
  )
}
