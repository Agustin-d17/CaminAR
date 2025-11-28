// src/context/BusinessContext.jsx
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const BusinessContext = createContext(null)

export function BusinessProvider({ children }) {
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)

  // Carga el business desde la tabla usando el auth_user_id   
  const fetchBusiness = async (authUserId) => {
    if (!authUserId) {
      setBusiness(null)
      return
    }

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("auth_user_id", authUserId)
      .maybeSingle()

    if (error) {
      console.error("Error fetching business record:", error)
      setBusiness(null)
      return
    }

    setBusiness(data)
  }

  // Escucha cambios de sesión (login, logout, token refresh)
  useEffect(() => {
    let mounted = true

    const init = async () => {
      setLoading(true)

      // Sesion actual al cargar   
      const { data: sessionData } = await supabase.auth.getSession()
      const authUserId = sessionData?.session?.user?.id || null

      if (mounted) {
        await fetchBusiness(authUserId)
        setLoading(false)
      }
    }

    init()

    // Listener en tiempo real
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const authUserId = session?.user?.id || null
        await fetchBusiness(authUserId)
      }
    )

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <BusinessContext.Provider value={{ business, loading }}>
      {children}
    </BusinessContext.Provider>
  )
}

export const useBusiness = () => useContext(BusinessContext)
