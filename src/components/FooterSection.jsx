"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home",    id: ""         },
  { label: "Works",   id: "projects" },
  { label: "About",   id: "about"    },
  { label: "Contact", id: "contact"  },
];

// ── Smooth scroll helper ──────────────────────────────────────────────────────
function smoothScrollTo(id) {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/505.not.alive",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/sinster23",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/upayan-dutta-564977320",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const canvasRef = useRef(null);
  const [time, setTime] = useState("");

  // Live clock
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Animated noise canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;
    const draw = () => {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 30;
        img.data[i] = img.data[i+1] = img.data[i+2] = v;
        img.data[i+3] = 18;
      }
      ctx.putImageData(img, 0, 0);
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Bebas+Neue&display=swap');

        .footer-root {
          font-family: 'JetBrains Mono', monospace;
          background: #080808;
          border-top: 3px solid #1a1a1a;
          position: relative;
          overflow: hidden;
        }

        .footer-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .footer-watermark {
          position: absolute;
          bottom: -0.1em;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 18vw, 14rem);
          letter-spacing: -0.02em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          line-height: 1;
          z-index: 0;
        }

        .footer-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem 0;
        }

        .footer-topbar {
          height: 3px;
          background: linear-gradient(90deg, #33FF57, #00cc44, transparent);
          position: absolute;
          top: 0; left: 0; right: 0;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #1f1f1f;
        }

        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
        }

        .footer-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3.5rem;
          color: #fff;
          letter-spacing: 0.05em;
          line-height: 1;
          margin-bottom: 1rem;
        }

        .footer-brand-name span { color: #33FF57; }

        .footer-brand-desc {
          font-size: 0.72rem;
          color: #888;
          line-height: 1.7;
          max-width: 280px;
          margin-bottom: 1.5rem;
        }

        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #1f1f1f;
          padding: 5px 12px;
          font-size: 0.6rem;
          font-weight: 700;
          color: #33FF57;
          letter-spacing: 0.12em;
          background: #0d0d0d;
        }

        .footer-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #33FF57;
          animation: footerPulse 1.8s ease-in-out infinite;
          box-shadow: 0 0 6px #33FF57;
        }

        @keyframes footerPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .footer-col-label {
          font-size: 0.62rem;
          font-weight: 700;
          color: #33FF57;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-col-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #1f1f1f;
        }

        /* Nav links — now buttons styled as links */
        .footer-nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: #888;
          text-decoration: none;
          padding: 6px 0;
          letter-spacing: 0.04em;
          transition: color 0.15s, gap 0.15s;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .footer-nav-link:hover { color: #fff; gap: 14px; }

        .footer-nav-link .arrow {
          font-size: 0.6rem;
          color: #33FF57;
          opacity: 0;
          transition: opacity 0.15s, transform 0.15s;
          transform: translateX(-4px);
        }

        .footer-nav-link:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .footer-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1px solid #1f1f1f;
          color: #444;
          background: transparent;
          cursor: pointer;
          transition: all 0.15s;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .footer-social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #33FF57;
          transform: translateY(100%);
          transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .footer-social-btn:hover {
          color: #000;
          border-color: #33FF57;
          box-shadow: 0 0 12px rgba(51,255,87,0.25);
        }

        .footer-social-btn:hover::before { transform: translateY(0); }

        .footer-social-btn svg {
          position: relative;
          z-index: 1;
          transition: color 0.15s;
        }

        .footer-terminal {
          background: #0a0a0a;
          border: 1px solid #1f1f1f;
          padding: 12px 14px;
          margin-top: 1.2rem;
          font-size: 0.6rem;
          color: #666;
          line-height: 1.8;
        }

        .footer-terminal .green { color: #33FF57; }
        .footer-terminal .dim   { color: #666; }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 0 1.8rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .footer-copy        { font-size: 0.58rem; color: #666; letter-spacing: 0.1em; }
        .footer-system-end  { font-size: 0.58rem; color: #555; letter-spacing: 0.15em; }
        .footer-clock       { font-size: 0.58rem; color: #33FF57; letter-spacing: 0.1em; font-variant-numeric: tabular-nums; }
      `}</style>

      <footer className="footer-root">
        <canvas ref={canvasRef} className="footer-noise" />
        <div className="footer-topbar" />
        <div className="footer-watermark">BRUTAL</div>

        <div className="footer-inner">
          <div className="footer-grid">

            {/* ── Brand column ── */}
            <div>
              <div className="footer-brand-name">UPAYAN<span>.</span></div>
              <p className="footer-brand-desc">
                Designing for the future with the raw aesthetics of the past.
                No cookies, no trackers, just code.
              </p>
              <div className="footer-status">
                <div className="footer-status-dot" />
                AVAILABLE FOR WORK
              </div>

              <div className="footer-terminal">
                <span className="dim">$ </span>
                <span className="green">git status</span>
                <br />
                <span className="dim">→ </span>open to new projects
                <br />
                <span className="dim">→ </span>last deploy: <span className="green">today</span>
              </div>
            </div>

            {/* ── Sitemap column ── */}
            <div>
              <div className="footer-col-label">Sitemap</div>
              <nav>
                {NAV_LINKS.map(({ label, id }) => (
                  <button
                    key={label}
                    onClick={() => smoothScrollTo(id)}
                    className="footer-nav-link"
                  >
                    <span className="arrow">▶</span>
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* ── Socials column ── */}
            <div>
              <div className="footer-col-label">Socials</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="footer-social-btn"
                    title={s.label}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <div className="footer-col-label" style={{ marginTop: "1.5rem" }}>Contact</div>
              <a
                href="mailto:upayandutta204@gmail.com"
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  color: "#888",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.15s",
                  marginBottom: "0.4rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#33FF57")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
              >
                upayandutta204@gmail.com
              </a>
              <div style={{ fontSize: "0.6rem", color: "#555", letterSpacing: "0.06em" }}>
                Response within 24h
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom">
            <span className="footer-copy">© 2025 UPAYAN.exe // SYSTEM_END</span>
            <span className="footer-clock">{time}</span>
            <span className="footer-system-end">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </>
  );
}