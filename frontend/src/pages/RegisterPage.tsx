import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import { register } from '../api'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({ empty: false, mismatch: false, server: '' })
  const [loading, setLoading] = useState(false)

  async function handleRegister() {
    const empty = !nickname.trim() || !email.trim() || !password.trim() || !confirm.trim()
    const mismatch = password !== confirm && password.trim() !== ''
    if (empty || mismatch) {
      setErrors({ empty, mismatch, server: '' })
      return
    }
    setLoading(true)
    setErrors({ empty: false, mismatch: false, server: '' })
    try {
      await register(nickname.trim(), email.trim(), password)
      navigate('/login')
    } catch (e: unknown) {
      setErrors({ empty: false, mismatch: false, server: e instanceof Error ? e.message : 'Registration failed' })
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
            {t('register.title1')} <span className="text-[#1c6d25]">{t('register.title2')}</span>
          </h1>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder={t('register.nickname')}
              value={nickname}
              onChange={e => { setNickname(e.target.value); setErrors({ empty: false, mismatch: false, server: '' }) }}
              className={`w-full bg-white rounded-lg px-4 py-2.5 text-xs text-black outline-none ${errors.empty && !nickname.trim() ? 'ring-2 ring-red-400' : ''}`}
            />
            <input
              type="email"
              placeholder={t('register.email')}
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors({ empty: false, mismatch: false, server: '' }) }}
              className={`w-full bg-white rounded-lg px-4 py-2.5 text-xs text-black outline-none ${errors.empty && !email.trim() ? 'ring-2 ring-red-400' : ''}`}
            />
            <input
              type="password"
              placeholder={t('register.password')}
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors({ empty: false, mismatch: false, server: '' }) }}
              className={`w-full bg-white rounded-lg px-4 py-2.5 text-xs text-black outline-none ${(errors.empty && !password.trim()) || errors.mismatch ? 'ring-2 ring-red-400' : ''}`}
            />
            <input
              type="password"
              placeholder={t('register.password')}
              value={confirm}
              onChange={e => { setConfirm(e.target.value); setErrors({ empty: false, mismatch: false, server: '' }) }}
              className={`w-full bg-white rounded-lg px-4 py-2.5 text-xs text-black outline-none ${(errors.empty && !confirm.trim()) || errors.mismatch ? 'ring-2 ring-red-400' : ''}`}
            />
            {errors.empty && <p className="text-xs text-red-500">{t('form.required')}</p>}
            {errors.mismatch && <p className="text-xs text-red-500">{t('form.passwordMismatch')}</p>}
            {errors.server && <p className="text-xs text-red-500">{errors.server}</p>}
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="flex items-center justify-center gap-3 rounded-[12px] pl-10 pr-3 py-4 text-[#eaffe2] text-xs font-bold disabled:opacity-60"
            style={{ background: 'linear-gradient(129deg, #1c6d25 0%, #096119 100%)' }}
          >
            {loading ? '...' : t('register.btn')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <p className="text-xs text-black text-center opacity-50">
            {t('register.hasAccount')}{' '}
            <Link to="/login" className="text-[#1c6d25] underline" style={{ opacity: 1 }}>
              {t('register.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
