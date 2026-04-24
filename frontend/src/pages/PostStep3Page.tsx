import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import { uploadImage } from '../api'
import type { Image } from '../interfaces/image'

export default function PostStep3Page() {
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const form = location.state?.form

  const [progress, setProgress] = useState(() => parseInt(sessionStorage.getItem('postProgress') ?? '0'))
  const [images, setImages] = useState<Image[]>(form?.images ?? [])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const isSubmitDisabled = useMemo(() => !images.length || isUploading, [images, isUploading])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = setTimeout(() => { setProgress(75); sessionStorage.setItem('postProgress', '75') }, 50)
    return () => clearTimeout(id)
  }, [])

  const handleFiles = async (files: FileList | File[]) => {
    setIsUploading(true)
    try {
      const uploadedImages: Image[] = []
      for (let i = 0; i < files.length; ++i) {
        const file = files[i]
        if (!file.type.startsWith('image/')) continue

        const image = await uploadImage(file)
        uploadedImages.push(image)
      }
      setImages((prev) => [...prev, ...uploadedImages])
    } catch (error) {
      console.error('Upload failed', error)
      alert('Nie udało się wgrać zdjęcia. Spróbuj ponownie')
    } finally {
      setIsUploading(false)
    }
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (!e.dataTransfer.files?.length) return

    handleFiles(e.dataTransfer.files)
  }

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    handleFiles(e.target.files)
    e.target.value = ''
  }

  const handleNext = () => {
    if (!images.length || isUploading) return

    navigate('/post/4', {
      state: {
        form: {
          ...form,
          images,
          imageIds: images.map((image) => image.id),
        },
      },
    })
  }

  if (!form?.dateTimeSlot) {
    return <Navigate to="/post/1" replace />
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header showCancel />

      <div className="max-w-[896px] mx-auto px-6 pt-12 pb-20 flex flex-col gap-12">
        {/* Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#1c6d25] tracking-[1.2px] uppercase">{t('post.step')} 3 {t('post.of')} 4</span>
              <h1 className="text-[36px] text-[#2f3334] leading-[40px]" style={{ fontFamily: 'Alata, sans-serif' }}>
                {t('post.step3.title')}
              </h1>
            </div>
            <span className="text-xl font-bold text-[#1c6d25]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>75%</span>
          </div>
          <div className="h-3 bg-[#e6e9e9] rounded-full overflow-hidden">
            <div className="progress-bar h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)' }} />
          </div>
        </div>

        {/* Upload area */}
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center py-16 gap-4 transition-colors ${
            isUploading ? 'opacity-50 cursor-not-allowed border-[#dfe3e4] bg-[#f9f9f9]' : 'cursor-pointer hover:border-[#9df197]'
          } ${isDragging ? 'border-[#1c6d25] bg-[#eaffe2]' : 'border-[#dfe3e4] bg-[#f9f9f9]'}`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileSelect}
            className="hidden"
            accept="image/*"
            multiple
          />
          <div className="w-14 h-14 bg-[#9df197] rounded-[16px] flex items-center justify-center pointer-events-none">
            <svg className="w-7 h-7 text-[#005c15]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
          <div className="text-center pointer-events-none">
            <p className="text-lg font-medium text-[#2f3334]">
              { t(isUploading ? 'post.step3.uploading' : 'post.step3.upload')}
            </p>
            <p className="text-sm text-[#5b6061] mt-1">{t('post.step3.uploadHint')}</p>
          </div>
        </div>

        {/* Uploaded photos */}
        {images.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#2f3334]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {t('post.step3.uploaded')}
              </h2>
              <span className="bg-[#f2f4f4] text-sm font-medium text-[#5b6061] px-3 py-1 rounded-full">
                {images.length} {t('post.step3.files')}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="aspect-square rounded-[16px] overflow-hidden bg-[#dfe3e4]">
                  <img src={image.uri} alt='' className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/post/2', { state: { form, back: true } })}
            className="flex items-center gap-2 px-6 py-4 rounded-[12px] text-base font-semibold text-[#5b6061] bg-[#f2f4f4] hover:bg-[#dfe3e4] transition-colors"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('post.back')}
          </button>
          <button
            onClick={handleNext}
            disabled={isSubmitDisabled}
            className={`flex items-center gap-3 px-10 py-4 rounded-[12px] text-base font-bold text-[#eaffe2] shadow-md transition-opacity ${
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
            style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {t('post.step3.btn')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
