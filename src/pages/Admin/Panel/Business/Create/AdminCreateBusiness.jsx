import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import BusinessForm from "../Create/Form/BusinessForm"

export default function AdminCreateBusinessForm() {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/panel/business">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Crear Negocio</h1>
            <p className="text-slate-500 mt-1">Completa la información del negocio</p>
          </div>
        </div>

        <BusinessForm />
      </div>
  )
}
