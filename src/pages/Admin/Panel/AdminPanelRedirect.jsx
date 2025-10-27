import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminPanelRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/admin/panel/dashboard")
  }, [navigate])

  return null
}
