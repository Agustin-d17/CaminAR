import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function DashboardRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/business/dashboard/profile")
  }, [navigate])

  return null
}
