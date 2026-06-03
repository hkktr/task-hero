import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'

const PENDING = [
  { id: 1, title: 'Pomoc w schronisku dla zwierząt', author: 'Schronisko Cztery Łapy', category: 'Zwierzęta', date: '24 Paź', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop' },
  { id: 2, title: 'Sprzątanie parku miejskiego', author: 'Jan Kowalski', category: 'Ekologia', date: '26 Paź', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
  { id: 3, title: 'Pomoc przy przeprowadzce', author: 'Maria Nowak', category: 'Przeprowadzka', date: '28 Paź', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop' },
  { id: 4, title: 'Opieka nad seniorem', author: 'Dom Opieki "Słoneczko"', category: 'Seniorzy', date: '30 Paź', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop' },
]

const STATS = [
  { key: 'admin.stats.pending', value: '4', accent: true },
  { key: 'admin.stats.today', value: '12', accent: false },
  { key: 'admin.stats.week', value: '38', accent: false },
  { key: 'admin.stats.avgTime', value: '2h 14m', accent: false },
] as const

export default function AdminPage() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [query, setQuery] = useState('')

  const categories = useMemo(() => Array.from(new Set(PENDING.map((p) => p.category))), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PENDING.filter((item) => {
      const matchesFilter = activeFilter === 'all' || item.category === activeFilter
      const matchesQuery = q === '' || item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <main className="flex-1 flex flex-col gap-8 px-8 pb-8">
        {/* Hero */}
        <div className="flex items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-xl">
            <h1
              className="text-[48px] font-normal text-[#2f3334] leading-[48px] tracking-[-1.2px]"
              style={{ fontFamily: 'Alata, sans-serif' }}
            >
              {t('admin.heading')} <span className="text-[#1c6d25]">{t('admin.headingAccent')}</span>.
            </h1>
            <p className="text-lg text-[#5b6061] leading-7">{t('admin.sub')}</p>
          </div>

          <div className="flex items-center gap-2 bg-[rgba(157,241,151,0.3)] px-4 py-2 rounded-full shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#1c6d25] animate-pulse" />
            <span className="text-xs font-semibold text-[#005c15] uppercase tracking-[1px]">{t('admin.live')}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="bg-white rounded-[16px] p-5 flex flex-col gap-1 border border-[rgba(175,179,179,0.15)] shadow-sm"
            >
              <p className="text-xs font-semibold text-[#5b6061] uppercase tracking-[1px]">{t(stat.key)}</p>
              <p
                className={`text-[36px] leading-[40px] ${stat.accent ? 'text-[#1c6d25]' : 'text-[#2f3334]'}`}
                style={{ fontFamily: 'Alata, sans-serif' }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative flex-1 min-w-[280px]">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777b7c]"
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('admin.search')}
              className="w-full bg-white border border-[rgba(175,179,179,0.3)] rounded-[12px] pl-11 pr-4 py-3 text-sm text-[#2f3334] outline-none placeholder:text-[#afb3b3] focus:border-[#1c6d25]"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 rounded-full text-sm border-2 transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#9df197] text-[#005c15] border-transparent font-semibold'
                  : 'bg-white text-[#2f3334] border-[rgba(175,179,179,0.3)] font-medium hover:bg-[#f2f4f4]'
              }`}
            >
              {t('admin.filterAll')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm border-2 transition-colors ${
                  activeFilter === cat
                    ? 'bg-[#9df197] text-[#005c15] border-transparent font-semibold'
                    : 'bg-white text-[#2f3334] border-[rgba(175,179,179,0.3)] font-medium hover:bg-[#f2f4f4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2f3334]">
            {filtered.length} {t('admin.count')}
          </h2>
        </div>

        {/* List / empty state */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[24px] p-16 flex flex-col items-center justify-center gap-3 border border-[rgba(175,179,179,0.15)] shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[rgba(157,241,151,0.3)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#1c6d25]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2f3334]" style={{ fontFamily: 'Alata, sans-serif' }}>
              {t('admin.empty.title')}
            </h3>
            <p className="text-sm text-[#5b6061] text-center max-w-sm">{t('admin.empty.sub')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-[16px] overflow-hidden flex items-center gap-0 shadow-sm border border-[rgba(175,179,179,0.15)] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                {/* Number */}
                <div className="w-14 flex items-center justify-center shrink-0 self-stretch bg-[#f9f9f9] border-r border-[rgba(175,179,179,0.15)]">
                  <span className="text-sm font-bold text-[#5b6061]">{String(idx + 1).padStart(2, '0')}</span>
                </div>

                {/* Photo */}
                <div className="w-24 h-24 shrink-0 overflow-hidden my-3 ml-3 rounded-[12px]">
                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 px-5 py-4 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="bg-[#9df197] text-[#005c15] text-[10px] font-semibold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#5b6061]">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {item.date}
                    </span>
                  </div>
                  <p className="text-base font-bold text-[#2f3334] leading-snug truncate">{item.title}</p>
                  <p className="text-sm text-[#5b6061] mt-0.5 truncate">
                    <span className="text-[#afb3b3]">{t('admin.postedBy')}</span> {item.author}
                  </p>
                </div>

                {/* Action */}
                <div className="px-5 shrink-0">
                  <Link
                    to="/requests/review"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-sm font-bold text-[#eaffe2] shadow-md"
                    style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {t('admin.review')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
