// Verifica si el usuario administrador está autenticado antes de entrar al dashboard
import React from "react"
import { Navigate } from "react-router-dom"

export default function RequireAdminAuth({ children }) {
  const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"))

  if (!currentAdmin || currentAdmin.role !== "super_admin") {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
