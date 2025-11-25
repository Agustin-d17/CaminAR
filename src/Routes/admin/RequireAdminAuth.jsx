import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Navigate } from "react-router-dom"

export default function RequireAdminAuth({ children }) {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

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

      // 2. Verificar si el user es admin en tu tabla
      const { data: adminRecord } = await supabase
        .from("admin_users")
        .select("*")
        .eq("auth_user_id", user.id)
        .maybeSingle()

      if (!adminRecord || adminRecord.status !== "active") {
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

  if (loading) return <p className="text-center mt-10">Verificando credenciales...</p>
  if (!allowed) return <Navigate to="/admin/login" replace />

  return children
}
