interface ErrorMessageProps {
  message: string
  onDismiss: () => void
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {message}
      <button 
        onClick={onDismiss} 
        className="float-right font-bold"
      >
        ×
      </button>
    </div>
  )
} 