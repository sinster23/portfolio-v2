import React from 'react'

export default function BannerSection() {
  return (
    <section className='relative'>
      {/* ── Marquee Banner ── */}
      <div
        className="border-b-4 border-black py-3 relative z-20 overflow-hidden"
        style={{ backgroundColor: "#3B82F6" }}
      >
        <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "max-content" }}>
          <span className="font-mono font-bold text-2xl text-white whitespace-nowrap pr-8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}>
            /// OPEN FOR WORK /// FULL STACK DEVELOPMENT /// BACKEND DEVELOPMENT /// REACT NATIVE DEVELOPER /// ACCESSIBLE /// FAST /// SECURE /// OPEN FOR WORK /// FULL STACK DEVELOPMENT ///&nbsp;
          </span>
          <span className="font-mono font-bold text-2xl text-white whitespace-nowrap pr-8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}>
            /// OPEN FOR WORK /// FULL STACK DEVELOPMENT /// BACKEND DEVELOPMENT /// REACT NATIVE DEVELOPER /// ACCESSIBLE /// FAST /// SECURE /// OPEN FOR WORK /// FULL STACK DEVELOPMENT ///&nbsp;
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}