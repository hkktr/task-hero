import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'

const CATEGORY_KEYS = [
  'cat.moving',
  'cat.gardening',
  'cat.petCare',
  'cat.grocery',
  'cat.handyman',
] as const

export default function PostStep1Page() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('cat.moving')
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const isBack = (location.state as { back?: boolean } | null)?.back
  const [progress, setProgress] = useState(() => isBack ? parseInt(sessionStorage.getItem('postProgress') ?? '0') : 0)
  useEffect(() => {
    const id = setTimeout(() => { setProgress(25); sessionStorage.setItem('postProgress', '25') }, 50)
    return () => clearTimeout(id)
  }, [])

  function handleNext() {
    if (!title.trim()) {
      setTitleError(true)
      return
    }
    navigate('/post/2')
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header showCancel />

      <div className="max-w-[896px] mx-auto px-6 pt-12 pb-20 flex flex-col gap-12">
        {/* Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#1c6d25] tracking-[1.2px] uppercase">{t('post.step')} 1 {t('post.of')} 4</span>
              <h1 className="text-[36px] text-[#2f3334] leading-[40px]" style={{ fontFamily: 'Alata, sans-serif' }}>
                {t('post.step1.title')}
              </h1>
            </div>
            <span className="text-xl font-bold text-[#1c6d25]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>25%</span>
          </div>
          <div className="h-3 bg-[#e6e9e9] rounded-full overflow-hidden">
            <div className="progress-bar h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)' }} />
          </div>
        </div>

        {/* Form + sidebar */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main form */}
          <div className="col-span-8 flex flex-col gap-8">
            {/* Title */}
            <div className="bg-[#f2f4f4] rounded-[24px] p-8 flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#2f3334] leading-7" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t('post.step1.titleLabel')}
                </h2>
                <p className="text-sm text-[#5b6061] leading-[22.75px] mt-1">
                  {t('post.step1.titleHint')}
                </p>
              </div>
              <input
                type="text"
                placeholder={t('post.step1.titlePlaceholder')}
                value={title}
                onChange={e => { setTitle(e.target.value); setTitleError(false) }}
                className={`w-full bg-white rounded-[12px] px-6 py-4 text-base text-[#2f3334] outline-none shadow-sm ${titleError ? 'ring-2 ring-red-400' : ''}`}
              />
              {titleError && (
                <p className="text-sm text-red-500 mt-1">{t('post.step1.titleRequired')}</p>
              )}
            </div>

            {/* Category */}
            <div className="bg-[#f2f4f4] rounded-[24px] p-8 flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#2f3334] leading-7" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t('post.step1.catLabel')}
                </h2>
                <p className="text-sm text-[#5b6061] leading-[22.75px] mt-1">
                  {t('post.step1.catHint')}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {CATEGORY_KEYS.map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-base transition-colors ${
                      activeCategory === key
                        ? 'bg-[#9df197] text-[#005c15] font-semibold'
                        : 'bg-[#dfe3e4] text-[#5b6061] font-medium hover:bg-[#cfd4d4]'
                    }`}
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#f2f4f4] rounded-[24px] p-8 flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#2f3334] leading-7" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t('post.step1.descLabel')}
                </h2>
                <p className="text-sm text-[#5b6061] leading-[22.75px] mt-1">
                  {t('post.step1.descHint')}
                </p>
              </div>
              <textarea
                placeholder={t('post.step1.descPlaceholder')}
                rows={5}
                className="w-full bg-white rounded-[12px] px-6 py-6 text-base text-[#777b7c] outline-none shadow-sm resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={handleNext}
                className="flex items-center gap-3 px-10 py-4 rounded-[12px] text-base font-bold text-[#eaffe2] shadow-md"
                style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {t('post.step1.btn')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4">
            <div className="bg-[rgba(157,241,151,0.3)] rounded-[24px] p-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-5 text-[#005c15]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                <h3 className="text-lg font-bold text-[#005c15]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Pro Tip!</h3>
              </div>
              <p className="text-sm text-[#005c15] leading-[22.75px]">
                {t('post.step1.tip')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
