import { supabase } from "@/lib/supabaseClient"

export async function adminLogout() {
  try {
    // 1. Cerrar sesión en Supabase (revoca token)
    await supabase.auth.signOut()

    // 3. Redirección limpia
    window.location.href = "/admin/login"
  } catch (err) {
    console.error("Error during logout:", err)
  }
}
