interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="text-center py-8">
      <p className="text-gray-600">{message}</p>
    </div>
  )
} 