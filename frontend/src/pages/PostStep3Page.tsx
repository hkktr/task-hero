import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'

const MOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300&h=300&fit=crop',
]

export default function PostStep3Page() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [progress, setProgress] = useState(() => parseInt(sessionStorage.getItem('postProgress') ?? '0'))
  useEffect(() => {
    const id = setTimeout(() => { setProgress(75); sessionStorage.setItem('postProgress', '75') }, 50)
    return () => clearTimeout(id)
  }, [])

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
        <div className="border-2 border-dashed border-[#dfe3e4] rounded-[24px] bg-[#f9f9f9] flex flex-col items-center justify-center py-16 gap-4 cursor-pointer hover:border-[#9df197] transition-colors">
          <div className="w-14 h-14 bg-[#9df197] rounded-[16px] flex items-center justify-center">
            <svg className="w-7 h-7 text-[#005c15]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-[#2f3334]">{t('post.step3.upload')}</p>
            <p className="text-sm text-[#5b6061] mt-1">{t('post.step3.uploadHint')}</p>
          </div>
        </div>

        {/* Uploaded photos */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#2f3334]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t('post.step3.uploaded')}
            </h2>
            <span className="bg-[#f2f4f4] text-sm font-medium text-[#5b6061] px-3 py-1 rounded-full">4 {t('post.step3.files')}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {MOCK_PHOTOS.map((src, i) => (
              <div key={i} className="aspect-square rounded-[16px] overflow-hidden bg-[#dfe3e4]">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/post/2', { state: { back: true } })}
            className="flex items-center gap-2 px-6 py-4 rounded-[12px] text-base font-semibold text-[#5b6061] bg-[#f2f4f4] hover:bg-[#dfe3e4] transition-colors"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('post.back')}
          </button>
          <button
            onClick={() => navigate('/post/4')}
            className="flex items-center gap-3 px-10 py-4 rounded-[12px] text-base font-bold text-[#eaffe2] shadow-md"
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
