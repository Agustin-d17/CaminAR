import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlaceForm() {
  const navigate = useNavigate()

  const ALLOWED_PLACE_CATEGORIES = [
    "34e41b4a-a123-4fef-87c2-07f6a87d7b3b",
    "c1b89d2c-1c60-4055-9f31-01f08e4db90f"
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
    image: "",
    images: [],
    google_maps_link: "",
    rating_value: 0,
    rating_source: "manual",
    social_links: {
      instagram: "",
      facebook: "",
      twitter: "",
      website: "",
    },
    contact: {
      phone: "",
      email: ""
    },
    address: "",
    lat: 0,
    lng: 0,
    place_id: ""
  })


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

    const validCategories = (cat || []).filter(c =>
      ALLOWED_PLACE_CATEGORIES.includes(c.id)
    )

    setCategories(validCategories)
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

    const { error } = await supabase.from("places").insert(formData)

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

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Categoría *</Label>
              <Select
                value={formData.category_id}
                onValueChange={(v) =>
                  setFormData({ ...formData, category_id: v, subcategory_id: "" })
                }
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
                onValueChange={(v) =>
                  setFormData({ ...formData, subcategory_id: v })
                }
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
          </div>

          <div>
            <Label>Descripción *</Label>
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
              onChange={(e) =>
                setFormData({ ...formData, full_description: e.target.value })
              }
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
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Latitud</Label>
              <Input
                type="number"
                value={formData.lat}
                onChange={(e) =>
                  setFormData({ ...formData, lat: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Label>Longitud</Label>
              <Input
                type="number"
                value={formData.lng}
                onChange={(e) =>
                  setFormData({ ...formData, lng: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <Label>Google Maps URL</Label>
            <Input
              value={formData.google_maps_link}
              onChange={(e) =>
                setFormData({ ...formData, google_maps_link: e.target.value })
              }
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

          <div className="space-y-2">
            <Label>Imagen Principal *</Label>
            <Input
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Galería (3 imágenes)</Label>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Input
                  key={index}
                  placeholder={`URL Imagen ${index + 1}`}
                  value={formData.images?.[index] || ""}
                  onChange={(e) => {
                    const updated = [...formData.images]
                    updated[index] = e.target.value
                    setFormData({ ...formData, images: updated })
                  }}
                />
              ))}
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

          {["instagram", "facebook", "twitter", "website"].map((field) => (
            <div key={field}>
              <Label>{field}</Label>
              <Input
                value={formData.social_links[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    social_links: { ...formData.social_links, [field]: e.target.value }
                  })
                }
              />
            </div>
          ))}

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div>
            <Label>Teléfono</Label>
            <Input
              value={formData.contact.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value }
                })
              }
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.contact.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value }
                })
              }
            />
          </div>

        </CardContent>
      </Card>


      <Button type="submit" className="w-full">Crear Lugar</Button>
    </form>
  )
}
