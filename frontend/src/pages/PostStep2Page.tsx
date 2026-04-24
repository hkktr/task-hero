import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import type { RequestFormStep2 } from '../interfaces/request-form'

export default function PostStep2Page() {
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const form: RequestFormStep2 | undefined = location.state?.form

  const [progress, setProgress] = useState(() => parseInt(sessionStorage.getItem('postProgress') ?? '0'))
  const [date, setDate] = useState(form?.dateTimeSlot?.date ?? '')
  const [dateError, setDateError] = useState<null | 'required' | 'past'>(null)
  const [timeFrom, setTimeFrom] = useState(form?.dateTimeSlot?.from ?? '')
  const [timeTo, setTimeTo] = useState(form?.dateTimeSlot?.to ?? '')
  const [timeError, setTimeError] = useState<null | 'required' | 'invalid'>(null)
  const [volunteers, setVolunteers] = useState<number>(form?.numberOfVolunteers ?? 3)

  useEffect(() => {
    const id = setTimeout(() => { setProgress(50); sessionStorage.setItem('postProgress', '50') }, 50)
    return () => clearTimeout(id)
  }, [])

  if (!form?.title) {
    return <Navigate to="/post/1" replace />
  }

  const handleNext = () => {
    if (!date || !timeFrom || !timeTo) {
      setDateError(!date ? 'required' : null)
      setTimeError(!timeFrom || !timeTo ? 'required' : null)
      return
    } else if (date < new Date().toISOString().split('T')[0]) {
      setDateError('past')
      return
    } else if (timeFrom >= timeTo) {
      setTimeError('invalid')
      return
    }

    navigate('/post/3', {
      state: {
        form: {
          ...form,
          dateTimeSlot: {
            date,
            from: timeFrom,
            to: timeTo,
          },
          numberOfVolunteers: volunteers,
        } satisfies RequestFormStep2,
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header showCancel />

      <div className="max-w-[896px] mx-auto px-6 pt-12 pb-20 flex flex-col gap-12">
        {/* Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#1c6d25] tracking-[1.2px] uppercase">{t('post.step')} 2 {t('post.of')} 4</span>
              <h1 className="text-[36px] text-[#2f3334] leading-[40px]" style={{ fontFamily: 'Alata, sans-serif' }}>
                {t('post.step2.title')}
              </h1>
            </div>
            <span className="text-xl font-bold text-[#1c6d25]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>50%</span>
          </div>
          <div className="h-3 bg-[#e6e9e9] rounded-full overflow-hidden">
            <div className="progress-bar h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)' }} />
          </div>
        </div>

        {/* Form + sidebar */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main */}
          <div className="col-span-8 flex flex-col gap-8">
            {/* When */}
            <div className="bg-[#f2f4f4] rounded-[24px] p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9df197] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#005c15]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#2f3334]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t('post.step2.when')}
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#5b6061]">{t('post.step2.date')}</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => { setDate(e.target.value); setDateError(null) }}
                  className="w-full bg-white rounded-[12px] px-6 py-4 text-base text-[#2f3334] outline-none shadow-sm"
                />
                {dateError === 'required' && (
                  <p className="text-sm text-red-500 mt-1">{t('post.step2.dateRequired')}</p>
                )}
                {dateError === 'past' && (
                  <p className="text-sm text-red-500 mt-1">{t('post.step2.datePast')}</p>
                )}
              </div>
            </div>

            {/* Timeframe */}
            <div className="bg-[#f2f4f4] rounded-[24px] p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4e3ff] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#2f3334]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t('post.step2.timeframe')}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#5b6061]">{t('post.step2.start')}</label>
                  <input
                    type="time"
                    value={timeFrom}
                    onChange={e => { setTimeFrom(`${e.target.value}:00`); setTimeError(null) }}
                    className="w-full bg-white rounded-[12px] px-6 py-4 text-base text-[#2f3334] outline-none shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#5b6061]">{t('post.step2.end')}</label>
                  <input
                    type="time"
                    value={timeTo}
                    onChange={e => { setTimeTo(`${e.target.value}:00`); setTimeError(null) }}
                    className="w-full bg-white rounded-[12px] px-6 py-4 text-base text-[#2f3334] outline-none shadow-sm"
                  />
                </div>
              </div>
              {timeError === 'required' && (
                <p className="text-sm text-red-500 mt-1">{t('post.step2.timeRequired')}</p>
              )}
              {timeError === 'invalid' && (
                <p className="text-sm text-red-500 mt-1">{t('post.step2.timeInvalid')}</p>
              )}
            </div>

            {/* Volunteers */}
            <div className="bg-[#f2f4f4] rounded-[24px] p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fec330] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#584000]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#2f3334]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t('post.step2.hands')}
                </h2>
              </div>
              <div className="bg-white rounded-[12px] px-6 py-5 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-[#2f3334]">{t('post.step2.volunteers')}</p>
                  <p className="text-sm text-[#5b6061] mt-0.5">{t('post.step2.volunteersHint')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setVolunteers(v => Math.max(1, v - 1))}
                    className="w-10 h-10 rounded-full bg-[#f2f4f4] flex items-center justify-center text-xl text-[#5b6061] font-light hover:bg-[#dfe3e4]"
                  >−</button>
                  <span className="text-xl font-bold text-[#2f3334] w-6 text-center">{volunteers}</span>
                  <button
                    onClick={() => setVolunteers(v => v + 1)}
                    className="w-10 h-10 rounded-full bg-[#f2f4f4] flex items-center justify-center text-xl text-[#5b6061] font-light hover:bg-[#dfe3e4]"
                  >+</button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigate('/post/1', { state: { form, back: true } })}
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
                className="flex items-center gap-3 px-10 py-4 rounded-[12px] text-base font-bold text-[#eaffe2] shadow-md"
                style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {t('post.step2.btn')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4">
            <div className="bg-[#f2f4f4] rounded-[24px] p-8 flex flex-col gap-4">
              <p className="text-xs font-semibold text-[#5b6061] tracking-[1.2px] uppercase">{t('post.step2.tips')}</p>
              <div className="flex flex-col gap-3">
                {[t('post.step2.tip1'), t('post.step2.tip2')].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#1c6d25] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-[#5b6061] leading-[22px]">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
