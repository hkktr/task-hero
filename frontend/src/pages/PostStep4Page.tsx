import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import type { Coordinates } from '../interfaces/coordinates'
import type { RequestFormStep3 } from '../interfaces/request-form'
import { createRequest, geocodeAddress } from '../api'
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function PostStep4Page() {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN

  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const form: RequestFormStep3 | undefined = location.state?.form

  const [progress, setProgress] = useState(() => parseInt(sessionStorage.getItem('postProgress') ?? '0'))

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [isGeocoding, setIsGeocoding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmitDisabled = useMemo(() => !coordinates || isGeocoding || isSubmitting, [coordinates, isGeocoding, isSubmitting])

  useEffect(() => {
    const id = setTimeout(() => { setProgress(100); sessionStorage.setItem('postProgress', '100') }, 50)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    setCoordinates(null)

    if (!street.trim() || !city.trim() || !zipCode.trim()) {
      setIsGeocoding(false)
      return
    }

    setIsGeocoding(true)
    const query = `${street}, ${zipCode} ${city}`

    const debounceId = setTimeout(async () => {
      try {
        const result = await geocodeAddress(query)
        if (result) setCoordinates(result)
      } catch (error) {
        console.error('Błąd geokodowania:', error)
      } finally {
        setIsGeocoding(false)
      }
    }, 500)

    return () => clearTimeout(debounceId)
  }, [street, city, zipCode])

  if (!form?.imageIds) {
    return <Navigate to="/post/1" replace />
  }

  const handleSubmit = async () => {
    if (!coordinates || isGeocoding || isSubmitting) return

    setIsSubmitting(true)

    try {
      const { images: _images, ...payload} = form
      await createRequest({
        ...payload,
        location: coordinates,
      })

      sessionStorage.removeItem('postProgress')
      navigate('/map')
    } catch (error) {
      console.error(error)
      alert('Nie udało się utworzyć ogłoszenia. Spróbuj ponownie')
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header showCancel />

      <div className="max-w-[896px] mx-auto px-6 pt-12 pb-20 flex flex-col gap-12">
        {/* Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#1c6d25] tracking-[1.2px] uppercase">{t('post.step')} 4 {t('post.of')} 4</span>
              <h1 className="text-[36px] text-[#2f3334] leading-[40px]" style={{ fontFamily: 'Alata, sans-serif' }}>
                {t('post.step4.title')}
              </h1>
            </div>
            <span className="text-xl font-bold text-[#1c6d25]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>100%</span>
          </div>
          <div className="h-3 bg-[#e6e9e9] rounded-full overflow-hidden">
            <div className="progress-bar h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)' }} />
          </div>
        </div>

        {/* Form + map */}
        <div className="flex gap-8 items-start">
          {/* Form */}
          <div className="bg-[#f2f4f4] rounded-[24px] p-8 flex flex-col gap-6 w-[360px] shrink-0">
            <h2 className="text-2xl font-bold text-[#2f3334]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t('post.step4.where')}
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#5b6061] tracking-wide uppercase">{t('post.step4.street')}</label>
                <input
                  type="text"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  className="w-full bg-white rounded-[12px] px-5 py-3.5 text-base text-[#2f3334] outline-none shadow-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#5b6061] tracking-wide uppercase">{t('post.step4.city')}</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-white rounded-[12px] px-5 py-3.5 text-base text-[#2f3334] outline-none shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#5b6061] tracking-wide uppercase">{t('post.step4.postal')}</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    className="w-full bg-white rounded-[12px] px-5 py-3.5 text-base text-[#2f3334] outline-none shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Map Preview */}
          <div className="flex-1 h-80 rounded-[24px] overflow-hidden bg-[#e6e9e9] flex flex-col items-center justify-center relative">
            {isGeocoding ? (
              <p className="text-sm font-semibold text-[#5b6061] z-10 relative">{t('post.step4.geocoding')}</p>
            ) : coordinates ? (
              <Map
                mapboxAccessToken={mapboxToken}
                key={`${coordinates.latitude}-${coordinates.longitude}`}
                initialViewState={{
                  longitude: coordinates.longitude,
                  latitude: coordinates.latitude,
                  zoom: 14
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/light-v11"
              >
                <Marker longitude={coordinates.longitude} latitude={coordinates.latitude} color="#1c6d25" />
              </Map>
            ) : (
              <p className="text-sm font-semibold text-[#5b6061] z-10 relative text-center px-4">{t('post.step4.enterAddress')}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/post/3', { state: { form, back: true } })}
            className="flex items-center gap-2 px-6 py-4 rounded-[12px] text-base font-semibold text-[#5b6061] bg-[#f2f4f4] hover:bg-[#dfe3e4] transition-colors"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('post.back')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`flex items-center gap-3 px-10 py-4 rounded-[12px] text-base font-bold text-[#eaffe2] shadow-md transition-opacity ${
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {t(isSubmitting ? 'post.step4.submitting' : 'post.step4.btn')}
            {!isSubmitting && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
