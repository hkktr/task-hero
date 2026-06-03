import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import { getRequests } from '../api'
import type { SimplifiedRequest } from '../interfaces/request'

export default function CollectionPage() {
  const { t } = useLanguage()

  const [requests, setRequests] = useState<SimplifiedRequest[] | null>(null)

  useEffect(() => {
    getRequests()
      .then(setRequests)
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col gap-8 px-8 pb-8">
        {/* Hero + toggle */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4 max-w-xl">
            <h1
              className="text-[48px] font-normal text-[#2f3334] leading-[48px] tracking-[-1.2px]"
              style={{ fontFamily: 'Alata, sans-serif' }}
            >
              {t('explore.heading')} <span className="text-[#1c6d25]">{t('explore.impact')}</span>.
            </h1>
            <p className="text-lg text-[#5b6061] leading-7">{t('explore.sub')}</p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-[rgba(175,179,179,0.15)] rounded-full p-1.5 shadow-sm">
            <div
              className="px-6 py-2 rounded-full text-sm font-bold text-[#eaffe2] w-32 text-center shadow-md"
              style={{ background: 'linear-gradient(139deg, #1c6d25 0%, #096119 100%)' }}
            >
              {t('explore.gridView')}
            </div>
            <Link to="/map" className="px-6 py-2 rounded-full text-sm font-medium text-[#5b6061]">
              {t('explore.mapView')}
            </Link>
          </div>
        </div>

        {/* Search + date */}
        {/* <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#777b7c]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={t('explore.search')}
              className="w-full bg-[#dfe3e4] rounded-[12px] pl-12 pr-4 py-4.5 text-base text-[rgba(119,123,124,0.6)] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#f2f4f4] rounded-[12px] px-5 py-3 text-base font-medium text-[#2f3334] shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {t('explore.anyDate')}
          </button>
        </div> */}

        {/* Category pills */}
        {/* <div className="flex gap-2 flex-wrap">
          {CATEGORY_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setActiveFilter(i)}
              className={`px-6 py-2.5 rounded-full text-sm border-2 transition-colors ${
                activeFilter === i
                  ? 'bg-[#9df197] text-[#005c15] border-transparent font-semibold'
                  : 'bg-white text-[#2f3334] border-[rgba(175,179,179,0.3)] font-medium hover:bg-[#f2f4f4]'
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div> */}

        {/* Grid */}
        {!requests ? (
          <p className="text-center text-[#5b6061] py-10">{t('explore.loading')}</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-[#5b6061] py-10">{t('explore.noResults')}</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {requests.map((request) => (
              <Link
                key={request.id}
                to={`/requests/${request.id}`}
                className="bg-white rounded-[16px] overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-52 bg-[#dfe3e4]">
                  <img src={request.images[0]} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#1c6d25] text-[10px] font-semibold uppercase tracking-[0.5px] px-2 py-1 rounded-[6px]">
                    {t(`cat.${request.type}`)}
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-[#2f3334] line-clamp-1">{request.title}</h3>
                  <div className="flex items-center gap-1 text-[#5b6061] text-base">
                    <svg className="w-3 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="line-clamp-1">{request.location.fullAddress}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#1c6d25] text-sm font-medium">{t('explore.checkDetails')}</span>
                    <span
                      className="px-6 py-2.5 rounded-full text-sm font-bold text-[#eaffe2]"
                      style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)' }}
                    >
                      {t('explore.volunteer')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
