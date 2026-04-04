import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const imgPeople = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=1000&fit=crop'
const imgVolunteer1 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=56&h=56&fit=crop'
const imgVolunteer2 = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=56&h=56&fit=crop'
const imgVolunteer3 = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=56&h=56&fit=crop'

export default function WelcomePage() {
  const { lang, toggle, t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#f9f9f9]" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[8px] bg-[rgba(255,255,255,0.8)] border-b border-[#f4f4f5] shadow-sm">
        <div className="flex items-center h-20 max-w-[1536px] mx-auto px-8 gap-8">
          <Link to="/" className="text-[#1c6d25] text-2xl font-bold tracking-[-0.6px] shrink-0" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            TaskHero
          </Link>
          <Link to="/map" className="text-[#1c6d25] text-xs font-semibold tracking-[1.2px] uppercase">
            {t('nav.explore')}
          </Link>
          <div className="flex-1" />
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[rgba(175,179,179,0.4)] text-xs font-semibold text-[#5b6061] hover:bg-[#f2f4f4] transition-colors"
          >
            <span className={lang === 'pl' ? 'text-[#1c6d25]' : 'text-[#5b6061]'}>PL</span>
            <span className="text-[#dfe3e4]">|</span>
            <span className={lang === 'en' ? 'text-[#1c6d25]' : 'text-[#5b6061]'}>EN</span>
          </button>
          <Link
            to="/register"
            className="px-6 py-2.5 rounded-[12px] text-sm font-bold text-[#eaffe2] shadow-md"
            style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {t('welcome.join')}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-8 max-w-[1536px] mx-auto">
        <div className="grid grid-cols-12 gap-12 items-center min-h-[730px]">
          {/* Left */}
          <div className="col-span-6 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 bg-[#9df197] px-4 py-1.5 rounded-full w-fit">
              <svg className="w-3 h-3 text-[#005c15]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-xs font-semibold tracking-[1.2px] uppercase text-[#005c15]">{t('welcome.badge')}</span>
            </div>

            <h1 className="text-[72px] text-[#2f3334] leading-[72px] tracking-[-1.8px]" style={{ fontFamily: 'Alata, sans-serif' }}>
              {t('welcome.h1a')}<br />
              <span className="text-[#1c6d25]">{t('welcome.h1b')}</span> {t('welcome.h1c').replace(t('welcome.h1b') + ' ', '')}
            </h1>

            <p className="text-xl text-[#5b6061] leading-[32.5px] max-w-[576px]">
              {t('welcome.sub')}
            </p>
          </div>

          {/* Right */}
          <div className="col-span-6 relative flex items-center justify-center h-[730px]">
            <div className="rotate-2 rounded-[32px] overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[584px]">
              <img src={imgPeople} alt="Community" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-transparent rounded-[32px]" />
            </div>
            {/* Floating card */}
            <div className="-rotate-3 absolute bottom-6 left-0 backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.4)] rounded-[16px] p-6 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] max-w-[320px]">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#d4e3ff] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-[#2f3334]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t('welcome.card.title')}</p>
                  <p className="text-xs text-[#5b6061]">{t('welcome.card.time')}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-[#2f3334] leading-[22.75px]">{t('welcome.card.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f2f4f4] py-24 px-8">
        <div className="max-w-[1536px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-[48px] text-[#2f3334] leading-[48px] text-center" style={{ fontFamily: 'Alata, sans-serif' }}>
              {t('welcome.howTitle')}
            </h2>
            <p className="text-base text-[#5b6061] text-center">{t('welcome.howSub')}</p>
          </div>

          {/* Równo wyrównane kolumny */}
          <div className="grid grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <svg className="w-7 h-5" fill="none" stroke="#2f3334" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                ),
                title: t('welcome.step1.title'),
                desc: t('welcome.step1.desc'),
              },
              {
                icon: (
                  <svg className="w-7 h-6" fill="none" stroke="#2f3334" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                  </svg>
                ),
                title: t('welcome.step2.title'),
                desc: t('welcome.step2.desc'),
              },
              {
                icon: (
                  <svg className="w-7 h-6" fill="none" stroke="#2f3334" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                ),
                title: t('welcome.step3.title'),
                desc: t('welcome.step3.desc'),
              },
            ].map((step) => (
              <div key={step.title} className="flex flex-col gap-6">
                <div className="w-16 h-16 bg-white rounded-[16px] shadow-sm flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#2f3334] leading-8" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{step.title}</h3>
                <p className="text-base text-[#5b6061] leading-[26px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bento */}
      <section className="py-24 px-8 max-w-[1536px] mx-auto">
        <div className="grid grid-cols-4 grid-rows-2 gap-6 h-[600px]">
          {/* Large green card */}
          <div className="col-span-2 row-span-2 bg-[#1c6d25] rounded-[40px] p-12 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 rounded-full bg-[#096119] blur-[32px] opacity-50" />
            <div className="flex flex-col gap-4 relative">
              <h2 className="text-[48px] text-[#eaffe2] leading-[60px]" style={{ fontFamily: 'Alata, sans-serif' }}>{t('welcome.statsTitle')}</h2>
              <p className="text-lg text-[rgba(234,255,226,0.8)] leading-7">{t('welcome.statsSub')}</p>
            </div>
            <div className="flex flex-col gap-2 relative">
              <p className="text-[72px] text-[#eaffe2] leading-[72px]" style={{ fontFamily: 'Alata, sans-serif' }}>12,480+</p>
              <p className="text-xl font-semibold text-[#eaffe2] tracking-[2px] uppercase">{t('welcome.stat3')}</p>
            </div>
          </div>

          {/* Requests Fulfilled */}
          <div className="col-span-1 bg-white border border-[rgba(175,179,179,0.1)] rounded-[40px] p-8 flex flex-col justify-center shadow-sm">
            <div className="mb-4">
              <svg className="w-7 h-7 text-[#1c6d25]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[36px] text-[#2f3334] leading-[40px]" style={{ fontFamily: 'Alata, sans-serif' }}>3,200+</p>
            <p className="text-base font-medium text-[#5b6061] mt-1">{t('welcome.stat1')}</p>
          </div>

          {/* Local Organizers */}
          <div className="col-span-1 bg-[#fec330] rounded-[40px] p-8 flex flex-col justify-center shadow-sm">
            <div className="mb-4">
              <svg className="w-5 h-5 text-[#584000]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <p className="text-[36px] text-[#584000] leading-[40px]" style={{ fontFamily: 'Alata, sans-serif' }}>850+</p>
            <p className="text-base font-medium text-[rgba(88,64,0,0.8)] mt-1">{t('welcome.stat2')}</p>
          </div>

          {/* Neighborhood Reach */}
          <div className="col-span-2 bg-[#eceeee] rounded-[40px] p-8 flex items-center justify-between">
            <div className="flex flex-col gap-2 max-w-xs">
              <h3 className="text-2xl font-bold text-[#2f3334]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t('welcome.reach')}</h3>
              <p className="text-base text-[#5b6061] leading-6">{t('welcome.reachSub')}</p>
            </div>
            <div className="flex items-center">
              {[imgVolunteer1, imgVolunteer2, imgVolunteer3].map((src, i) => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-[#f9f9f9] overflow-hidden -ml-3 first:ml-0 shrink-0">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-[#f9f9f9] bg-[#1c6d25] -ml-3 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-[#eaffe2]">+2k</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
