import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import { signIn } from '../api'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { login: authLogin } = useAuth()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!login.trim() || !password.trim()) {
      setError(t('form.required'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await signIn(login.trim(), password)
      authLogin(token)
      navigate('/map')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showCancel />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#f0f0f0] rounded-[24px] px-10 py-12 flex flex-col gap-6">
          <h1 className="text-[30px] text-black text-center leading-[40px]">
            {t('login.title1')} <span className="text-[#1c6d25]">{t('login.title2')}</span>
          </h1>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder={t('login.login')}
              autoComplete="username"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value)
                setError(null)
              }}
              className={`w-full bg-white rounded-lg px-4 py-2.5 text-xs text-black outline-none ${error && !login.trim() ? 'ring-2 ring-red-400' : ''}`}
            />
            <input
              type="password"
              placeholder={t('login.password')}
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(null)
              }}
              className={`w-full bg-white rounded-lg px-4 py-2.5 text-xs text-black outline-none ${error && !password.trim() ? 'ring-2 ring-red-400' : ''}`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-3 rounded-[12px] pl-10 pr-3 py-4 text-[#eaffe2] text-xs font-bold disabled:opacity-60"
            style={{ background: 'linear-gradient(129deg, #1c6d25 0%, #096119 100%)' }}
          >
            {loading ? '...' : t('login.btn')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <p className="text-xs text-black text-center opacity-50">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="text-[#2e9800] opacity-100 underline" style={{ opacity: 1 }}>
              {t('login.create')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
