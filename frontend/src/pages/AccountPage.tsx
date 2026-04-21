import { useRef, useState } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const MOCK_UPCOMING = [
  {
    id: 1,
    date: 'OCT 24',
    title: 'Riverside Park Clean-up & Tree Planting',
    desc: 'Meeting at the North Gate entrance at 9:00 AM.',
  },
  {
    id: 2,
    date: 'OCT 28',
    title: 'Weekend Food Distribution Center',
    desc: 'Helping sort and pack donation boxes for families.',
  },
]

export default function AccountPage() {
  const { t } = useLanguage()
  const { user } = useAuth()

  // Profile state
  const [avatar, setAvatar] = useState<string | null>(null)
  const [name, setName] = useState(user?.name ?? '')
  const [role, setRole] = useState('Community Guardian')
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(name)
  const [draftRole, setDraftRole] = useState(role)
  const fileRef = useRef<HTMLInputElement>(null)

  // Requests state
  const [requests, setRequests] = useState([
    {
      id: 1,
      date: 'OCT 24',
      title: 'Riverside Park Clean-up & Tree Planting',
      desc: 'Meeting at the North Gate entrance at 9:00 AM.',
    },
    {
      id: 2,
      date: 'OCT 28',
      title: 'Weekend Food Distribution Center',
      desc: 'Helping sort and pack donation boxes for families.',
    },
  ])

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatar(url)
  }

  function handleEditSave() {
    setName(draftName)
    setRole(draftRole)
    setEditing(false)
  }

  function handleEditCancel() {
    setDraftName(name)
    setDraftRole(role)
    setEditing(false)
  }

  function handleDeleteRequest(id: number) {
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Header showExplore />

      <main className="px-8 py-8 flex gap-12">
        {/* Left: profile */}
        <div className="flex flex-col items-center gap-3 w-52 shrink-0">
          {/* Avatar + upload */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-[#dfe3e4] overflow-hidden ring-4 ring-[#9df197]">
              {avatar ? (
                <img src={avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#5b6061]">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"
                    />
                  </svg>
                </div>
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1c6d25] flex items-center justify-center shadow-md hover:bg-[#096119] transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path strokeLinecap="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>

          {/* Name + role — view or edit */}
          {editing ? (
            <div className="flex flex-col gap-2 w-full">
              <input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full bg-white rounded-[10px] px-3 py-2 text-sm text-[#2f3334] outline-none shadow-sm text-center"
              />
              <input
                value={draftRole}
                onChange={(e) => setDraftRole(e.target.value)}
                className="w-full bg-white rounded-[10px] px-3 py-2 text-xs text-[#5b6061] outline-none shadow-sm text-center"
              />
              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleEditSave}
                  className="flex-1 py-2 rounded-[10px] text-xs font-bold text-[#eaffe2]"
                  style={{ background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)' }}
                >
                  {t('account.save')}
                </button>
                <button
                  onClick={handleEditCancel}
                  className="flex-1 py-2 rounded-[10px] text-xs font-semibold text-[#5b6061] bg-[#f2f4f4] hover:bg-[#dfe3e4] transition-colors"
                >
                  {t('account.cancel')}
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-base font-normal text-[#111827] text-center">{name}</p>
              <p className="text-xs font-semibold text-[#1c6d25] uppercase tracking-widest text-center">{role}</p>
              <button
                onClick={() => {
                  setDraftName(name)
                  setDraftRole(role)
                  setEditing(true)
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5b6061] hover:text-[#2f3334] transition-colors mt-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                  />
                </svg>
                {t('account.edit')}
              </button>
            </>
          )}
        </div>

        {/* Right: dashboard */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Impact overview */}
          <div>
            <h2 className="text-xl font-normal text-[#2f3334] mb-4">{t('account.impact')}</h2>
            <div className="flex gap-12">
              <div>
                <p className="text-[42px] font-bold text-[#2f3334] leading-none">124</p>
                <p className="text-sm text-[#5b6061] mt-1">{t('account.hours')}</p>
              </div>
              <div>
                <p className="text-[42px] font-bold text-[#2f3334] leading-none">18</p>
                <p className="text-sm text-[#5b6061] mt-1">{t('account.projects')}</p>
              </div>
            </div>
          </div>

          {/* Upcoming commitments */}
          <div>
            <h2 className="text-xl font-normal text-[#2f3334] mb-4">{t('account.upcoming')}</h2>
            <div className="flex flex-col divide-y divide-[#e5e7e7]">
              {MOCK_UPCOMING.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 items-start">
                  <div className="w-16 h-16 rounded-[12px] bg-[#dfe3e4] shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-semibold text-[#1c6d25] tracking-wide">{item.date}</p>
                    <p className="text-base font-bold text-[#2f3334]">{item.title}</p>
                    <p className="text-sm text-[#5b6061]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My requests */}
          <div>
            <h2 className="text-xl font-normal text-[#2f3334] mb-4">{t('account.myRequests')}</h2>
            {requests.length === 0 ? (
              <p className="text-sm text-[#5b6061] py-4">{t('account.noRequests')}</p>
            ) : (
              <div className="flex flex-col divide-y divide-[#e5e7e7]">
                {requests.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 items-start">
                    <div className="w-16 h-16 rounded-[12px] bg-[#dfe3e4] shrink-0" />
                    <div className="flex flex-col gap-0.5 flex-1">
                      <p className="text-xs font-semibold text-[#1c6d25] tracking-wide">{item.date}</p>
                      <p className="text-base font-bold text-[#2f3334]">{item.title}</p>
                      <p className="text-sm text-[#5b6061]">{item.desc}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleDeleteRequest(item.id)}
                          className="w-9 h-9 rounded-full bg-[#ffe4e4] flex items-center justify-center hover:bg-[#ffd0d0] transition-colors"
                        >
                          <svg
                            className="w-4 h-4 text-[#ff6666]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
