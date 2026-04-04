import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-[rgba(125,125,125,0.2)] rounded-[15px] mx-4 my-3 px-4 py-2 flex items-center gap-3">
      {/* Search */}
      <div className="flex-1 bg-white rounded-lg px-3 py-2 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#1c1b1f] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Find your next task..."
          className="flex-1 text-[12px] text-black outline-none bg-transparent placeholder:text-black"
        />
      </div>

      {/* Filter buttons */}
      <button className="bg-white rounded-lg px-3 py-2 text-[12px] text-black flex items-center gap-1 shrink-0">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M3 6h18M7 12h10M11 18h2"/>
        </svg>
        Filtruj
      </button>

      <button className="bg-white rounded-lg px-3 py-2 text-[12px] text-black flex items-center gap-1 shrink-0">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M3 6h18M7 12h10M11 18h2"/>
        </svg>
        Sortuj
      </button>

      {/* Account icon */}
      <Link to="/account" className="bg-white rounded-lg p-2 shrink-0">
        <svg className="w-5 h-5 text-[#1c1b1f]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      </Link>

      {/* Admin link (dev) */}
      <Link to="/admin" className="bg-white rounded-lg px-3 py-2 text-[12px] text-black shrink-0">
        Admin
      </Link>
    </header>
  )
}
