import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'

const PENDING = [
  { id: 1, title: 'Pomoc w schronisku dla zwierząt', author: 'Schronisko Cztery Łapy', category: 'Zwierzęta', date: '24 Paź', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop' },
  { id: 2, title: 'Sprzątanie parku miejskiego', author: 'Jan Kowalski', category: 'Ekologia', date: '26 Paź', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
  { id: 3, title: 'Pomoc przy przeprowadzce', author: 'Maria Nowak', category: 'Przeprowadzka', date: '28 Paź', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop' },
  { id: 4, title: 'Opieka nad seniorem', author: 'Dom Opieki "Słoneczko"', category: 'Seniorzy', date: '30 Paź', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop' },
]

export default function AdminPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <main className="px-8 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[36px] text-[#2f3334] leading-[40px]" style={{ fontFamily: 'Alata, sans-serif' }}>
              {t('admin.title')}
            </h1>
            <p className="text-base text-[#5b6061] mt-1">
              <span className="text-[#1c6d25] font-semibold">{PENDING.length}</span> {t('admin.count')}
            </p>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2 bg-[rgba(157,241,151,0.3)] px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#1c6d25] animate-pulse" />
            <span className="text-xs font-semibold text-[#005c15] uppercase tracking-[1px]">Live Queue</span>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {PENDING.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-[16px] overflow-hidden flex items-center gap-0 shadow-sm border border-[rgba(175,179,179,0.1)] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              {/* Number */}
              <div className="w-14 flex items-center justify-center shrink-0 self-stretch bg-[#f9f9f9] border-r border-[rgba(175,179,179,0.15)]">
                <span className="text-sm font-bold text-[#5b6061]">{String(idx + 1).padStart(2, '0')}</span>
              </div>

              {/* Photo */}
              <div className="w-20 h-20 shrink-0 overflow-hidden my-3 ml-3 rounded-[12px]">
                <img src={item.img} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 px-5 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#9df197] text-[#005c15] text-[10px] font-semibold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-[#5b6061]">{item.date}</span>
                </div>
                <p className="text-base font-bold text-[#2f3334] leading-snug">{item.title}</p>
                <p className="text-sm text-[#5b6061] mt-0.5">{item.author}</p>
              </div>

              {/* Action */}
              <div className="px-5 shrink-0">
                <Link
                  to="/review"
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
      </main>
    </div>
  )
}
