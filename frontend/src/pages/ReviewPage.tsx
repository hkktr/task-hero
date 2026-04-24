import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'

const MOCK = {
  title: 'Pomoc w schronisku dla zwierząt',
  description:
    'Weekendowe wyprowadzanie psów w schronisku "Cztery Łapy". Szukamy miłośników zwierząt, którzy pomogą nam w weekendowych spacerach z naszymi podopiecznymi. Brakuje nam rąk do pracy, a psy bardzo potrzebują ruchu i kontaktu z człowiekiem.',
  tags: ['Zwierzęta', 'Wsparcie', 'Weekend'],
  author: { name: 'Schronisko Cztery Łapy', role: 'Community Organizer', announcements: 4 },
  category: 'Zwierzęta',
  date: '24 Paź',
  img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=500&fit=crop',
}

export default function ReviewPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <main className="px-8 py-8 max-w-5xl mx-auto flex flex-col gap-8">

        {/* Breadcrumb / status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[rgba(157,241,151,0.3)] px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#1c6d25] animate-pulse" />
            <span className="text-xs font-semibold text-[#005c15] uppercase tracking-[1px]">Pending Review</span>
          </div>
          <span className="text-sm text-[#5b6061]">{t('admin.review')} #{MOCK.date}</span>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left column — content */}
          <div className="col-span-8 flex flex-col gap-6">

            {/* Photo */}
            <div className="relative rounded-[24px] overflow-hidden h-64 bg-[#dfe3e4]">
              <img src={MOCK.img} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                {MOCK.tags.map(tag => (
                  <span key={tag} className="bg-[#9df197] text-[#005c15] text-[10px] font-semibold uppercase tracking-[0.5px] px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Title + description */}
            <div className="bg-white rounded-[24px] p-8 flex flex-col gap-4 shadow-sm border border-[rgba(175,179,179,0.1)]">
              <h1 className="text-[32px] text-[#2f3334] leading-[36px]" style={{ fontFamily: 'Alata, sans-serif' }}>
                {MOCK.title}
              </h1>
              <p className="text-base text-[#5b6061] leading-7">{MOCK.description}</p>
            </div>

            {/* Author */}
            <div className="bg-white rounded-[24px] p-6 flex items-center gap-4 shadow-sm border border-[rgba(175,179,179,0.1)]">
              <div className="w-14 h-14 rounded-full bg-[#dfe3e4] shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=56&h=56&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-[#2f3334]">{MOCK.author.name}</p>
                <p className="text-xs font-semibold text-[#1c6d25] uppercase tracking-[1px]">{MOCK.author.role}</p>
                <p className="text-sm text-[#5b6061] mt-0.5">
                  {t('review.userHas')} {MOCK.author.announcements} {t('review.otherAnnouncements')}
                </p>
              </div>
              <button className="text-sm font-semibold text-[#1c6d25] hover:underline shrink-0">
                {t('review.fullProfile')}
              </button>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#eceeee] rounded-[24px] h-48 flex items-center justify-center border border-[rgba(175,179,179,0.1)]">
              <div className="flex items-center gap-2 text-[#5b6061]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-sm">Map placeholder</span>
              </div>
            </div>
          </div>

          {/* Right column — actions */}
          <div className="col-span-4 flex flex-col gap-4 self-start sticky top-8">

            {/* Category */}
            <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 shadow-sm border border-[rgba(175,179,179,0.1)]">
              <p className="text-xs font-semibold text-[#5b6061] uppercase tracking-[1px]">{t('review.category')}</p>
              <select defaultValue="help" className="w-full bg-[#f2f4f4] rounded-[12px] px-4 py-3 text-sm text-[#2f3334] outline-none">
                <option value="">{t('review.choose')}</option>
                <option value="animals">{t('cat.animals')}</option>
                <option value="elderly">{t('cat.elderlyCare')}</option>
                <option value="ecology">{t('cat.ecology')}</option>
                <option value="moving">{t('cat.0')}</option>
                <option value="petCare">{t('cat.1')}</option>
                <option value="gardening">{t('cat.2')}</option>
              </select>
            </div>

            {/* Accept */}
            <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 shadow-sm border border-[rgba(175,179,179,0.1)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[rgba(157,241,151,0.3)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#1c6d25]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-[#2f3334]">{t('review.accept')}</p>
              </div>
              <textarea
                placeholder={t('review.notePlaceholder')}
                rows={3}
                className="w-full bg-[#f2f4f4] rounded-[12px] px-4 py-3 text-sm text-[#2f3334] outline-none resize-none placeholder:text-[#afb3b3]"
              />
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-[12px] text-sm font-bold text-[#eaffe2] shadow-md"
                style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {t('review.accept')}
              </button>
            </div>

            {/* Reject */}
            <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 shadow-sm border border-[rgba(175,179,179,0.1)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[rgba(255,102,102,0.1)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#ff6666]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-[#2f3334]">{t('review.reject')}</p>
              </div>
              <textarea
                placeholder={t('review.rejectPlaceholder')}
                rows={3}
                className="w-full bg-[#f2f4f4] rounded-[12px] px-4 py-3 text-sm text-[#2f3334] outline-none resize-none placeholder:text-[#afb3b3]"
              />
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-[12px] text-sm font-bold text-[#5b6061] bg-[#f2f4f4] hover:bg-[#dfe3e4] transition-colors"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('review.reject')}
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
