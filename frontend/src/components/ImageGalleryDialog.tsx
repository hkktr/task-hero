import { useState, useEffect, useCallback } from 'react'

interface ImageGalleryDialogProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
}

export default function ImageGalleryDialog({ images, isOpen, onClose }: ImageGalleryDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const [previousIsOpen, setPreviousIsOpen] = useState(isOpen)
  if (isOpen !== previousIsOpen) {
    setPreviousIsOpen(isOpen)
    if (isOpen) setCurrentIndex(0)
  }

  const showPrevious = useCallback(() => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1))
  }, [images.length])

  const showNext = useCallback(() => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1))
  }, [images.length])

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') showPrevious()
      if (e.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose, showPrevious, showNext])

  if (!isOpen || !images.length) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
      style={{ fontFamily: 'Inter, sans-serif' }}
      onClick={onClose}
    >
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-white">
        <span
          className="text-sm font-semibold tracking-widest uppercase bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {currentIndex + 1} / {images.length}
        </span>

        <button
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-white/25 rounded-full transition-colors backdrop-blur-sm cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            showPrevious()
          }}
          className="absolute left-6 md:left-12 p-4 bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors backdrop-blur-sm cursor-pointer"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      <img
        src={images[currentIndex]}
        alt=""
        className="max-w-[85vw] max-h-[80vh] object-contain rounded-[24px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            showNext()
          }}
          className="absolute right-6 md:right-12 p-4 bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors backdrop-blur-sm cursor-pointer"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  )
}
