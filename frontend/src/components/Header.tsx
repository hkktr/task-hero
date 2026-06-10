import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { USER_ROLES } from '../enums/user-role'

interface HeaderProps {
  showCancel?: boolean
  showExplore?: boolean
}

export default function Header({ showCancel = false, showExplore = false }: HeaderProps) {
  const { lang, toggle, t } = useLanguage()
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between px-8 py-6 bg-[#f9f9f9]">
      <div className="flex items-center gap-8">
        <Link
          to={isAuthenticated ? '/map' : '/'}
          className="text-[#1c6d25] text-2xl font-bold tracking-[-0.6px] leading-8"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          TaskHero
        </Link>
        {showExplore && (
          <Link to="/map" className="text-[#1c6d25] text-sm font-semibold tracking-widest uppercase">
            {t('nav.explore')}
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Language toggle */}
        <button
          onClick={toggle}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[rgba(175,179,179,0.4)] text-xs font-semibold text-[#5b6061] hover:bg-[#f2f4f4] transition-colors"
        >
          <span className={lang === 'pl' ? 'text-[#1c6d25]' : 'text-[#5b6061]'}>PL</span>
          <span className="text-[#dfe3e4]">|</span>
          <span className={lang === 'en' ? 'text-[#1c6d25]' : 'text-[#5b6061]'}>EN</span>
        </button>

        {showCancel ? (
          <button
            onClick={() => navigate(isAuthenticated ? '/map' : '/')}
            className="flex items-center gap-2 text-[#5b6061] text-xs font-medium tracking-[0.6px] uppercase cursor-pointer hover:text-[#2f3334] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t('nav.cancel')}
          </button>
        ) : (
          <>
            <Link
              to="/post/1"
              className="flex items-center gap-2 px-5 py-2 rounded-[12px] text-sm font-bold text-[#eaffe2] shadow-md"
              style={{
                background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {t('nav.newRequest')}
            </Link>

            {user?.role === USER_ROLES.ADMIN && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-4 py-2 rounded-[12px] text-sm font-bold text-[#2f3334] bg-[#f2f4f4] hover:bg-[#dfe3e4] border border-[rgba(175,179,179,0.15)] transition-colors cursor-pointer shadow-sm"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                <svg
                  className="w-4 h-4 text-[#1c6d25]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                Admin
              </Link>
            )}

            {/* <Link to="/account" className="p-2 rounded-full hover:bg-gray-100">
              <svg
                className="w-5 h-5 text-[#5b6061]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link> */}
          </>
        )}
      </div>
    </header>
  )
}
