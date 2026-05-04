import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import { useEffect, useState } from 'react'
import { getRequest } from '../api'
import type { Request } from '../interfaces/request'
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function RequestPage() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

  const { t, lang } = useLanguage()

  const { id } = useParams()

  const [request, setRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id == null) return

    getRequest(Number(id))
      .then(setRequest)
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }, [id])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')

    const date = new Date()
    date.setHours(Number(hours), Number(minutes))

    return date.toLocaleTimeString(lang === 'pl' ? 'pl-PL' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: lang === 'en',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-[#5b6061]">{t('explore.loading')}</div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center text-[#5b6061] gap-4">
          <p>{t('point.notFound')}</p>
          <Link to="/map" className="text-[#1c6d25] font-semibold underline">
            {t('point.back')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Header />

      {/* Photo gallery */}
      <div className="px-8">
        <div className="grid grid-cols-3 gap-4 h-[400px]">
          {/* Main photo */}
          <div
            className={`relative rounded-[32px] overflow-hidden bg-[#dfe3e4] ${request.images.length === 1 ? 'col-span-3' : 'col-span-2'}`}
          >
            <img src={request.images[0]} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Side photos */}
          {request.images.length > 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex-1 relative rounded-[32px] overflow-hidden bg-[#dfe3e4]">
                <img src={request.images[1]} alt="" className="w-full h-full object-cover" />
              </div>

              {request.images.length > 2 && (
                <div className="flex-1 relative rounded-[32px] overflow-hidden bg-[#dfe3e4]">
                  <img src={request.images[2]} alt="" className="w-full h-full object-cover" />

                  {request.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                      <span className="text-white text-base font-semibold">
                        {t('point.viewAllPhotos')} ({request.images.length})
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pt-8 pb-12 grid grid-cols-12 gap-16">
        {/* Left column */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            <span className="bg-[#9df197] text-[#005c15] text-xs font-semibold uppercase tracking-[-0.3px] px-4 py-1.5 rounded-full">
              {t(`cat.${request.type}`)}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[48px] text-[#2f3334] leading-[48px] tracking-[-1.2px]"
            style={{ fontFamily: 'Alata, sans-serif' }}
          >
            {request.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-[#5b6061] leading-7">{request.description}</p>

          {/* Community joining */}
          {request.numberOfVolunteers > 0 && (
            <div className="bg-[#f2f4f4] rounded-[32px] p-8 flex flex-col gap-6">
              <h3 className="text-xl font-bold text-[#2f3334]">
                {t('point.community')} ({request.numberOfVolunteers})
              </h3>
              <div className="flex items-center gap-0">
                {[...Array(Math.min(4, request.numberOfVolunteers))].map((_, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full bg-[#dfe3e4] border-4 border-[#f2f4f4] -ml-3 first:ml-0"
                  />
                ))}
                {request.numberOfVolunteers > 4 && (
                  <div className="w-14 h-14 rounded-full bg-[#dfe3e4] border-4 border-[#f2f4f4] -ml-3 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[#5b6061]">+{request.numberOfVolunteers - 4}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Meeting point */}
          <div className="flex flex-col gap-6 pt-6">
            <h3 className="text-2xl font-bold text-[#2f3334] leading-8">{t('point.meeting')}</h3>

            {/* Map */}
            <div className="h-80 rounded-[32px] bg-[#eceeee] overflow-hidden relative">
              <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                  longitude: request.location.latLong.longitude,
                  latitude: request.location.latLong.latitude,
                  zoom: 14,
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/light-v11"
              >
                <NavigationControl position="bottom-left" showCompass={false} />
                <Marker
                  longitude={request.location.latLong.longitude}
                  latitude={request.location.latLong.latitude}
                  color="#1c6d25"
                />
              </Map>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#f2f4f4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#1c6d25]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-[#2f3334]">{request.location.fullAddress}</p>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="col-span-3 col-start-10 flex flex-col gap-8 self-start sticky top-8">
          {/* Organizer card */}
          <div className="bg-white rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center gap-0">
            <div className="w-24 h-24 rounded-full bg-[#dfe3e4] ring-4 ring-[#9df197] mb-4" />
            <h4
              className="text-xl text-[#111827] text-center leading-7 tracking-[-0.5px] mb-4"
              style={{ fontFamily: 'Alata, sans-serif' }}
            >
              {request.requestedBy.nickname}
            </h4>

            <button
              className="w-full py-4 rounded-[12px] text-lg font-semibold text-[#eaffe2] text-center mb-4 shadow-[0px_10px_15px_-3px_rgba(28,109,37,0.2)]"
              style={{ background: 'linear-gradient(170deg, #1c6d25 0%, #096119 100%)' }}
            >
              {t('point.signUp')}
            </button>

            <button className="w-full py-4 rounded-[12px] bg-[#dfe3e4] text-base font-semibold text-[#2f3334] text-center">
              {t('point.contact')}
            </button>
          </div>

          {/* Date & time */}
          <div className="bg-[#f2f4f4] rounded-[32px] p-8">
            <div className="flex items-center gap-4">
              <svg
                className="w-4.5 h-5 text-[#5b6061] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-[#5b6061] uppercase tracking-wide">{t('point.dateTime')}</p>
                <p className="text-sm font-semibold text-[#2f3334]">
                  {formatDate(request.requestDateTime.date)} • {formatTime(request.requestDateTime.from)} -{' '}
                  {formatTime(request.requestDateTime.to)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
