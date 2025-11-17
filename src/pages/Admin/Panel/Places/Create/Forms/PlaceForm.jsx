import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminCreatePlaceForm() {
  const navigate = useNavigate()

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
    image: "",
    images: [],
    google_maps_link: "",
    rating: {
      value: 0,
      source: "manual"
    },
    social_links: {
      instagram: "",
      facebook: "",
      twitter: "",
      website: "",
    },
    location: {
      address: "",
      lat: 0,
      lng: 0,
    },
    place_id: ""
  })

  // load selects
  useEffect(() => {
    loadOptions()
  }, [])

  const loadOptions = async () => {
    const [{ data: cat }, { data: sub }, { data: prov }, { data: loc }] =
      await Promise.all([
        supabase.from("categories").select("*"),
        supabase.from("subcategories").select("*"),
        supabase.from("provinces").select("*"),
        supabase.from("localities").select("*"),
      ])

    setCategories(cat || [])
    setSubcategories(sub || [])
    setProvinces(prov || [])
    setLocalities(loc || [])
  }

  const filteredLocalities = formData.province_id
    ? localities.filter((l) => l.province_id === formData.province_id)
    : []

  const filteredSubcategories = formData.category_id
    ? subcategories.filter((s) => s.category_id === formData.category_id)
    : []

  const handleSubmit = async (e) => {
  e.preventDefault()

  // construir array de imágenes desde los 3 inputs
  const galleryImages = [
    formData.gallery1,
    formData.gallery2,
    formData.gallery3
  ].filter((x) => x && x.trim() !== "")

  const payload = {
    ...formData,
    images: galleryImages
  }

  // limpiar claves sueltas
  delete payload.gallery1
  delete payload.gallery2
  delete payload.gallery3

  const { error } = await supabase.from("places").insert(payload)

  if (!error) navigate("/admin/panel/places")
  else console.error(error)
}

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* INFO BASICA */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div>
            <Label>Nombre *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Categoría *</Label>
            <Select
              value={formData.category_id}
              onValueChange={(v) => setFormData({ ...formData, category_id: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Subcategoría *</Label>
            <Select
              value={formData.subcategory_id}
              onValueChange={(v) => setFormData({ ...formData, subcategory_id: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una subcategoría" />
              </SelectTrigger>
              <SelectContent>
                {filteredSubcategories.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Descripción Corta *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Descripción Completa</Label>
            <Textarea
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* UBICACIÓN */}
      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div>
            <Label>Provincia *</Label>
            <Select
              value={formData.province_id}
              onValueChange={(v) => setFormData({ ...formData, province_id: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Provincia" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Localidad *</Label>
            <Select
              value={formData.locality_id}
              onValueChange={(v) => setFormData({ ...formData, locality_id: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Localidad" />
              </SelectTrigger>
              <SelectContent>
                {filteredLocalities.map((l) => (
                  <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Dirección</Label>
            <Input
              value={formData.location.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, address: e.target.value }
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Latitud</Label>
              <Input
                type="number"
                value={formData.location.lat}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, lat: Number(e.target.value) }
                  })
                }
              />
            </div>
            <div>
              <Label>Longitud</Label>
              <Input
                type="number"
                value={formData.location.lng}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, lng: Number(e.target.value) }
                  })
                }
              />
            </div>
          </div>

          <div>
            <Label>Google Maps URL</Label>
            <Input
              value={formData.google_maps_link}
              onChange={(e) => setFormData({ ...formData, google_maps_link: e.target.value })}
            />
          </div>

        </CardContent>
      </Card>

      {/* IMÁGENES */}
      <Card>
        <CardHeader>
          <CardTitle>Imágenes</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Imagen principal */}
          <div className="space-y-2">
            <Label>Imagen Principal *</Label>
            <Input
              placeholder="https://..."
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              required
            />
          </div>

          {/* Galería: 3 imágenes fijas */}
          <div className="space-y-4">
            <Label>Galería (3 imágenes)</Label>

            <div className="space-y-3">
              <Input
                placeholder="URL Imagen 1"
                value={formData.gallery1 || ""}
                onChange={(e) =>
                  setFormData({ ...formData, gallery1: e.target.value })
                }
              />
              <Input
                placeholder="URL Imagen 2"
                value={formData.gallery2 || ""}
                onChange={(e) =>
                  setFormData({ ...formData, gallery2: e.target.value })
                }
              />
              <Input
                placeholder="URL Imagen 3"
                value={formData.gallery3 || ""}
                onChange={(e) =>
                  setFormData({ ...formData, gallery3: e.target.value })
                }
              />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* REDES */}
      <Card>
        <CardHeader>
          <CardTitle>Redes Sociales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Instagram</Label>
              <Input
                value={formData.social_links.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    social_links: { ...formData.social_links, instagram: e.target.value }
                  })
                }
              />
            </div>

            <div>
              <Label>Facebook</Label>
              <Input
                value={formData.social_links.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    social_links: { ...formData.social_links, facebook: e.target.value }
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Twitter</Label>
              <Input
                value={formData.social_links.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    social_links: { ...formData.social_links, twitter: e.target.value }
                  })
                }
              />
            </div>

            <div>
              <Label>Sitio Web</Label>
              <Input
                value={formData.social_links.website}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    social_links: { ...formData.social_links, website: e.target.value }
                  })
                }
              />
            </div>
          </div>

        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Crear Lugar</Button>
    </form>
  )
}
