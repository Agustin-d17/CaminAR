// src/context/AdminContext.jsx
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Carga el admin desde la tabla usando el auth_user_id
  const fetchAdmin = async (authUserId) => {
    if (!authUserId) {
      setAdmin(null)
      return
    }

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("auth_user_id", authUserId)
      .maybeSingle()

    if (error) {
      console.error("Error fetching admin:", error)
      setAdmin(null)
      return
    }

    setAdmin(data)
  }

  // Escucha cambios de sesión (login, logout, token refresh)
  useEffect(() => {
    let mounted = true

    const setup = async () => {
      setLoading(true)

      // Sesión actual al cargar
      const { data: sessionData } = await supabase.auth.getSession()
      const authUserId = sessionData?.session?.user?.id || null

      if (mounted) {
        await fetchAdmin(authUserId)
        setLoading(false)
      }
    }

    setup()

    // Listener en tiempo real
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const authUserId = session?.user?.id || null
        await fetchAdmin(authUserId)
      }
    )

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AdminContext.Provider value={{ admin, loading }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
