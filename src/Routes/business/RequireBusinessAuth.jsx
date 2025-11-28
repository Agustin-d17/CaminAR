// src/auth/RequireBusinessAuth.jsx
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Navigate } from "react-router-dom"

export default function RequireBusinessAuth({ children }) {
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      // 1. Obtener sesión actual  
      const { data: auth } = await supabase.auth.getUser()
      const user = auth?.user

      if (!user) {
        setAllowed(false)
        setLoading(false)
        return
      }

      // 2. Verificar si el user es business en tu tabla
      const { data: biz } = await supabase
        .from("businesses")
        .select("id, status")
        .eq("auth_user_id", user.id)
        .maybeSingle()

      if (!biz || (biz.status !== "active" && biz.status !== "pending")) {
        setAllowed(false)
        setLoading(false)
        return
      }

      // 3. Permitir acceso
      setAllowed(true)
      setLoading(false)
    }

    verify()
  }, [])

  if (loading) return <p className="text-center mt-10">Verificando acceso…</p>
  if (!allowed) return <Navigate to="/business/login" replace />

  return children
}
