import { Loader2 } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="sr-only">Chargement...</span>
    </div>
  )
}
