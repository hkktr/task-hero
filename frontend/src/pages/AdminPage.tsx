import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import { getRequests } from '../api'
import { APPROVAL_STATUSES, type ApprovalStatus } from '../enums/approval-status'
import type { SimplifiedRequest } from '../interfaces/request'

export default function AdminPage() {
  const { t } = useLanguage()

  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>(APPROVAL_STATUSES.PENDING)
  const [requests, setRequests] = useState<SimplifiedRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getRequests({ approvalStatus })
      .then(setRequests)
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }, [approvalStatus])

  const changeApprovalStatus = (status: ApprovalStatus) => {
    if (status === approvalStatus) return

    setIsLoading(true)
    setApprovalStatus(status)
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <main className="flex-1 flex flex-col gap-8 px-8 pb-8">
        <div className="flex flex-col gap-4 max-w-xl">
          <h1
            className="text-[48px] font-normal text-[#2f3334] leading-[48px] tracking-[-1.2px]"
            style={{ fontFamily: 'Alata, sans-serif' }}
          >
            {t('admin.heading')} <span className="text-[#1c6d25]">{t('admin.headingAccent')}</span>.
          </h1>
          <p className="text-lg text-[#5b6061] leading-7">{t('admin.sub')}</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-[rgba(175,179,179,0.15)] pb-6">
          <button
            onClick={() => changeApprovalStatus(APPROVAL_STATUSES.PENDING)}
            className={`px-5 py-2.5 rounded-full text-sm border-2 transition-colors cursor-pointer ${
              approvalStatus === APPROVAL_STATUSES.PENDING
                ? 'bg-amber-400 text-amber-950 border-transparent font-semibold'
                : 'bg-white text-[#2f3334] border-[rgba(175,179,179,0.3)] font-medium hover:bg-[#f2f4f4]'
            }`}
          >
            {t(`admin.approvalStatus.${APPROVAL_STATUSES.PENDING}`)}
          </button>

          <button
            onClick={() => changeApprovalStatus(APPROVAL_STATUSES.REJECTED)}
            className={`px-5 py-2.5 rounded-full text-sm border-2 transition-colors cursor-pointer ${
              approvalStatus === APPROVAL_STATUSES.REJECTED
                ? 'bg-red-500 text-white border-transparent font-semibold'
                : 'bg-white text-[#2f3334] border-[rgba(175,179,179,0.3)] font-medium hover:bg-[#f2f4f4]'
            }`}
          >
            {t(`admin.approvalStatus.${APPROVAL_STATUSES.REJECTED}`)}
          </button>

          <button
            onClick={() => changeApprovalStatus(APPROVAL_STATUSES.APPROVED)}
            className={`px-5 py-2.5 rounded-full text-sm border-2 transition-colors cursor-pointer ${
              approvalStatus === APPROVAL_STATUSES.APPROVED
                ? 'bg-green-600 text-white border-transparent font-semibold'
                : 'bg-white text-[#2f3334] border-[rgba(175,179,179,0.3)] font-medium hover:bg-[#f2f4f4]'
            }`}
          >
            {t(`admin.approvalStatus.${APPROVAL_STATUSES.APPROVED}`)}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2f3334]">
            {t('admin.count')} {!isLoading && `(${requests.length})`}
          </h2>
        </div>

        {isLoading ? (
          <p className="text-center text-[#5b6061] py-16">{t('explore.loading')}</p>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-[24px] p-16 flex flex-col items-center justify-center gap-3 border border-[rgba(175,179,179,0.15)] shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2f3334]" style={{ fontFamily: 'Alata, sans-serif' }}>
              {t('admin.empty.title')}
            </h3>
            <p className="text-sm text-[#5b6061] text-center max-w-sm">{t('admin.empty.sub')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-[16px] overflow-hidden flex items-center gap-0 shadow-sm border border-[rgba(175,179,179,0.15)] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                {/* Number */}
                <div className="w-14 flex items-center justify-center shrink-0 self-stretch bg-[#f9f9f9] border-r border-[rgba(175,179,179,0.15)]">
                  <span className="text-sm font-bold text-[#5b6061]">{String(index + 1).padStart(2, '0')}</span>
                </div>

                {/* Photo */}
                <div className="w-24 h-24 shrink-0 overflow-hidden my-3 ml-3 rounded-[12px] bg-[#dfe3e4]">
                  <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 px-5 py-4 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="bg-gray-100 text-gray-700 text-[10px] font-semibold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full">
                      {t(`cat.${item.type}`)}
                    </span>
                  </div>

                  <p className="text-base font-bold text-[#2f3334] leading-snug truncate">{item.title}</p>

                  <div className="flex items-center gap-1 text-xs font-medium text-[#5b6061] mt-1.5 truncate">
                    <svg
                      className="w-3.5 h-3.5 text-[#1c6d25] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span className="truncate">{item.location.fullAddress}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="px-5 shrink-0">
                  <Link
                    to={`/requests/${item.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-sm font-bold text-[#eaffe2] shadow-md cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #1c6d25 0%, #096119 100%)',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
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
