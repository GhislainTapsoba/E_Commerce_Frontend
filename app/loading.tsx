import LoadingSpinner from "@/components/common/LoadingSpinner"

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center h-[calc(100vh-120px)]">
      <LoadingSpinner />
    </div>
  )
}
