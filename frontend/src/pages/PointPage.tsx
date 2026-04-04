import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'

const MOCK_POINT = {
  title: 'Weekend Socialization at Paws & Heart Shelter',
  tags: ['Animals', 'Weekend', 'Help Needed'],
  description1: "We're looking for enthusiastic animal lovers to join us this Saturday and Sunday. Our rescue residents need focused one-on-one time for socialization, light training, and—most importantly—lots of belly rubs.",
  description2: "No prior professional experience is required, though a calm demeanor and comfort around large breeds is preferred. We provide a brief orientation at 9:00 AM before starting our sessions. Come help make their stay at the shelter a little brighter while they wait for their forever homes!",
  communityCount: 14,
  author: 'Alex Thompson',
  role: 'Community Guardian',
  datetime: 'Oct 12-13 • 9:00 AM - 1:00 PM',
  address: 'Paws & Heart Community Shelter',
  addressSub: 'Radoszyce',
}

export default function PointPage() {
  const { id } = useParams()
  void id
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Header />

      {/* Photo gallery */}
      <div className="px-8">
        <div className="grid grid-cols-3 gap-4 h-[400px]">
          {/* Main photo */}
          <div className="col-span-2 relative rounded-[32px] overflow-hidden bg-[#dfe3e4]">
            <span className="absolute top-6 left-6 bg-[#9df197] text-[#005c15] text-xs font-semibold uppercase tracking-[0.6px] px-4 py-1.5 rounded-full">
              High Priority
            </span>
          </div>
          {/* Two stacked photos */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-[32px] overflow-hidden bg-[#dfe3e4]" />
            <div className="flex-1 relative rounded-[32px] overflow-hidden bg-[#dfe3e4]">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-base font-semibold">View All 12 Photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pt-8 pb-12 grid grid-cols-12 gap-16">
        {/* Left column */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {MOCK_POINT.tags.map(tag => (
              <span
                key={tag}
                className="bg-[#9df197] text-[#005c15] text-xs font-semibold uppercase tracking-[-0.3px] px-4 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-[48px] text-[#2f3334] leading-[48px] tracking-[-1.2px]"
            style={{ fontFamily: 'Alata, sans-serif' }}
          >
            {MOCK_POINT.title}
          </h1>

          {/* Description */}
          <div className="flex flex-col gap-6 pb-6">
            <p className="text-lg text-[#5b6061] leading-7">{MOCK_POINT.description1}</p>
            <p className="text-lg text-[#5b6061] leading-7">{MOCK_POINT.description2}</p>
          </div>

          {/* Community joining */}
          <div className="bg-[#f2f4f4] rounded-[32px] p-8 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#2f3334]">
              {t('point.community')} ({MOCK_POINT.communityCount})
            </h3>
            <div className="flex items-center gap-0">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full bg-[#dfe3e4] border-4 border-[#f2f4f4] -ml-3 first:ml-0"
                />
              ))}
              <div className="w-14 h-14 rounded-full bg-[#dfe3e4] border-4 border-[#f2f4f4] -ml-3 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#5b6061]">+10</span>
              </div>
            </div>
          </div>

          {/* Meeting point */}
          <div className="flex flex-col gap-6 pt-6">
            <h3 className="text-2xl font-bold text-[#2f3334] leading-8">{t('point.meeting')}</h3>
            <div className="h-80 rounded-[32px] overflow-hidden bg-[#eceeee] flex items-center justify-center">
              <span className="text-[#5b6061] text-sm">Map placeholder</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#f2f4f4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#1c6d25]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-[#2f3334]">{MOCK_POINT.address}</p>
                <p className="text-base text-[#5b6061]">{MOCK_POINT.addressSub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="col-span-3 col-start-10 flex flex-col gap-8 self-start sticky top-8">
          {/* Organizer card */}
          <div className="bg-white rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center gap-0">
            <div className="w-24 h-24 rounded-full bg-[#dfe3e4] ring-4 ring-[#9df197] mb-4" />
            <h4
              className="text-xl text-[#111827] text-center leading-7 tracking-[-0.5px]"
              style={{ fontFamily: 'Alata, sans-serif' }}
            >
              {MOCK_POINT.author}
            </h4>
            <p className="text-xs font-semibold text-[#1c6d25] uppercase tracking-[1.2px] mb-4">
              {MOCK_POINT.role}
            </p>

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
              <svg className="w-4.5 h-5 text-[#5b6061] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-[#5b6061] uppercase tracking-wide">{t('point.dateTime')}</p>
                <p className="text-sm font-semibold text-[#2f3334]">{MOCK_POINT.datetime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
