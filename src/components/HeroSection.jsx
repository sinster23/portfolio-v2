"use client";

import { useEffect, useRef, useState } from "react";

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const navLinks = [
  { id: "about",      label: "/ABOUT"  },
  { id: "metaverse",  label: "/DEMO"   },
  { id: "experience", label: "/LOGS"   },
  { id: "skills",     label: "/SKILLS" },
  { id: "projects",   label: "/WORK"   },
];

export default function HeroSection() {
  const cursorRef  = useRef(null);
  const sectionRef = useRef(null);
  const barRef     = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // ── Custom cursor ──────────────────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e) => {
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    };
    document.addEventListener("mousemove", move, { passive: true });
    const hoverEls = document.querySelectorAll("a, button, input, textarea, .cursor-hover");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "60px"; cursor.style.height = "60px";
        cursor.style.backgroundColor = "#FBFF48"; cursor.style.mixBlendMode = "normal";
        cursor.style.border = "2px solid black";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width = "24px"; cursor.style.height = "24px";
        cursor.style.backgroundColor = "#fff"; cursor.style.mixBlendMode = "difference";
        cursor.style.border = "none";
      });
    });
    return () => document.removeEventListener("mousemove", move);
  }, []);

  // ── Scroll progress + nav opacity ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;600;700;800;900&family=Bebas+Neue&display=swap');

        html { scroll-behavior: smooth; }

        @keyframes heroBounce  { 0%,100%{transform:translateY(0) rotate(12deg)} 50%{transform:translateY(-14px) rotate(12deg)} }
        @keyframes heroPulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes heroFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes heroSweep   { 0%{transform:translateX(-100%)} 100%{transform:translateX(600%)} }
        @keyframes heroBlink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heroPing    { 0%{transform:scale(1);opacity:1} 70%,100%{transform:scale(2.4);opacity:0} }
        @keyframes heroReveal  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .hero-tag  { animation: heroReveal 0.7s cubic-bezier(0.25,1,0.5,1) 0.05s both; }
        .hero-h1   { animation: heroReveal 0.75s cubic-bezier(0.25,1,0.5,1) 0.15s both; }
        .hero-sub  { animation: heroReveal 0.75s cubic-bezier(0.25,1,0.5,1) 0.25s both; }
        .hero-btns { animation: heroReveal 0.75s cubic-bezier(0.25,1,0.5,1) 0.35s both; }

        .hero-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          color: #000; text-decoration: none;
          position: relative;
          transition: background 0.12s, color 0.12s;
        }
        .hero-nav-link:hover { background: #000; color: #fff; }

        .hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900; letter-spacing: 0.06em;
          border: 2px solid #000;
          padding: 1rem 2.4rem;
          text-decoration: none;
          font-size: 1rem;
          transition: transform 0.12s cubic-bezier(0.25,1,0.5,1), box-shadow 0.12s, background 0.12s, color 0.12s;
        }
        .hero-cta:hover { transform: translate(3px,3px); box-shadow: 2px 2px 0 #000 !important; }
      `}</style>

      {/* ── Custom Cursor ── */}
      <div
        ref={cursorRef}
        className="hidden lg:block"
        style={{
          pointerEvents: "none", position: "fixed", top: 0, left: 0, zIndex: 9999,
          width: "24px", height: "24px", backgroundColor: "#fff", borderRadius: "50%",
          border: "2px solid black", mixBlendMode: "difference", willChange: "transform",
          transition: "width 0.15s, height 0.15s, background-color 0.15s",
        }}
      />

      {/* ── Progress bar ── */}
      <div
        ref={barRef}
        style={{
          position: "fixed", top: 0, left: 0, height: 3, zIndex: 60,
          background: "linear-gradient(90deg,#33FF57,#FBFF48)",
          borderBottom: "1px solid #000", width: "0%", transition: "width 0.06s linear",
        }}
      />

      {/* ══ NAV ══ */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 40, padding: "1rem 1.5rem", pointerEvents: "none" }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          pointerEvents: "auto",
        }}>

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="cursor-hover"
            style={{
              fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.6rem", letterSpacing: "0.05em",
              background: "#fff", border: "2px solid #000", padding: "4px 16px",
              boxShadow: "4px 4px 0 #000", textDecoration: "none", color: "#000",
              transition: "transform 0.1s, box-shadow 0.1s, background 0.1s",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translate(2px,2px)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.background="#FBFF48"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform="translate(0,0)"; e.currentTarget.style.boxShadow="4px 4px 0 #000"; e.currentTarget.style.background="#fff"; }}
          >
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#33FF57", border:"1.5px solid #000", flexShrink:0, display:"inline-block" }} />
            upayan.exe
          </a>

          {/* Nav pill */}
          <div
            className="hidden md:flex"
            style={{
              background: "#fff", border: "2px solid #000",
              boxShadow: scrolled ? "2px 2px 0 #000" : "4px 4px 0 #000",
              padding: "4px",
              alignItems: "center", gap: 2,
              transition: "box-shadow 0.2s",
            }}
          >
            {navLinks.map(({ id, label }) => (
              <a key={id} href={`#${id}`}
                onClick={(e) => { e.preventDefault(); smoothScrollTo(id); }}
                className="hero-nav-link cursor-hover"
              >{label}</a>
            ))}

            <div style={{ width:1, height:18, background:"#ddd", margin:"0 4px", flexShrink:0 }} />

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("contact"); }}
              className="cursor-hover"
              style={{
                fontFamily:'"JetBrains Mono",monospace', fontSize:"0.6rem", fontWeight:800,
                letterSpacing:"0.1em", padding:"6px 14px",
                background:"#FBFF48", color:"#000",
                border:"1.5px solid #000", textDecoration:"none",
                transition:"background 0.12s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background="#FF70A6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="#FBFF48"; }}
            >
              HIRE ME ↗
            </a>
          </div>
        </div>
      </nav>

      {/* ══ HERO SECTION ══ */}
      <section
        ref={sectionRef}
        style={{
          minHeight:       "100vh",
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "center",
          alignItems:      "center",
          padding:         "6rem 1.5rem 4rem",
          position:        "relative",
          overflow:        "hidden",
          backgroundColor: "#FFFDF5",
          backgroundImage:
            "radial-gradient(#000 1px, transparent 1px), " +
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), " +
            "linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize:  "40px 40px, 100px 100px, 100px 100px",
          borderBottom:    "4px solid #000",
          cursor:          "none",
        }}
      >
        {/* Corner HUD brackets */}
        {[
          { top:80,  left:20,  borderTop:"2px solid #000", borderLeft:"2px solid #000" },
          { top:80,  right:20, borderTop:"2px solid #000", borderRight:"2px solid #000" },
          { bottom:56,left:20, borderBottom:"2px solid #000",borderLeft:"2px solid #000" },
          { bottom:56,right:20,borderBottom:"2px solid #000",borderRight:"2px solid #000" },
        ].map((s,i) => (
          <div key={i} className="hidden lg:block" style={{ position:"absolute", width:24, height:24, pointerEvents:"none", zIndex:5, ...s }} />
        ))}

        {/* CODE watermark */}
        <div style={{
          position:"absolute", top:"8%", right:"3%",
          fontFamily:'"Bebas Neue",sans-serif',
          fontSize:"clamp(4rem,18vw,13rem)",
          color:"#000", opacity:0.03,
          lineHeight:1, pointerEvents:"none", userSelect:"none", zIndex:1,
        }}>CODE</div>

        {/* ── Left decoratives — GIFS UNTOUCHED ── */}
        <img src="/spidey.gif" alt="spidey"
          className="absolute hidden lg:block pointer-events-none select-none"
          style={{ top:"39%", left:"calc(10% - 40px)", width:"160px", height:"auto", zIndex:21, filter:"drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)" }}
        />
        <div className="absolute hidden lg:block" style={{ top:"33%", left:"10%", zIndex:20 }}>
          <div style={{ width:64, height:64, backgroundColor:"#3B82F6", border:"4px solid black", boxShadow:"4px 4px 0 #000", transform:"rotate(12deg)", animation:"heroBounce 2s ease-in-out infinite" }} />
        </div>

        {/* ── Right decoratives — GIFS UNTOUCHED ── */}
        <img src="/chibi5.gif" alt="chibi"
          className="absolute hidden lg:block pointer-events-none select-none"
          style={{ bottom:"calc(33% + 80px)", right:"calc(10% - 20px)", width:"120px", height:"auto", zIndex:21, filter:"drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)" }}
        />
        <div className="absolute hidden lg:block" style={{ bottom:"33%", right:"10%", zIndex:20 }}>
          <div style={{ width:80, height:80, backgroundColor:"#FF70A6", borderRadius:"50%", border:"4px solid black", boxShadow:"4px 4px 0 #000", animation:"heroPulse 2s ease-in-out infinite" }} />
        </div>

        {/* ── Main content ── */}
        <div style={{ position:"relative", zIndex:20, textAlign:"center", maxWidth:"920px", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>

          {/* Status badge */}
          <div className="hero-tag" style={{ marginBottom:"1.6rem" }}>
            <div style={{
              display:   "inline-flex", alignItems:"center", gap:10,
              background:"#fff", border:"2px solid #000",
              boxShadow: "4px 4px 0 #000",
              padding:   "6px 20px",
              transform: "rotate(-1.5deg)",
              position:  "relative", overflow:"hidden",
            }}>
              {/* Animated ping dot */}
              <span style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center", width:10, height:10, flexShrink:0 }}>
                <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#33FF57", animation:"heroPing 1.4s cubic-bezier(0,0,0.2,1) infinite" }} />
                <span style={{ position:"relative", width:8, height:8, borderRadius:"50%", background:"#33FF57", border:"1.5px solid #000", display:"inline-block", flexShrink:0 }} />
              </span>
              <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.16em", color:"#000" }}>
                SYSTEM STATUS: ONLINE
              </span>
              <span style={{ animation:"heroBlink 0.9s step-end infinite", fontFamily:'"JetBrains Mono",monospace', fontSize:"0.7rem", color:"#000", marginLeft:-4 }}>_</span>
              {/* shimmer */}
              <div style={{ position:"absolute", inset:0, width:"25%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)", animation:"heroSweep 3s linear infinite", pointerEvents:"none" }} />
            </div>
          </div>

          {/* ── BIG HEADING — gifs untouched ── */}
          <h1
            className="hero-h1"
            style={{
              fontFamily:    '"Bebas Neue",sans-serif',
              fontSize:      "clamp(5rem,15vw,12rem)",
              fontWeight:    400,
              letterSpacing: "0.02em",
              lineHeight:    0.87,
              margin:        "0 0 1.5rem 0",
              color:         "#000",
            }}
          >
            <span style={{ position:"relative", display:"inline-block" }}>
              <img src="/chibi2.gif" alt=""
                className="hidden lg:block absolute pointer-events-none select-none"
                style={{ width:"clamp(70px,7vw,110px)", bottom:"85%", left:"-1vw", transform:"scaleX(-1)", zIndex:30, filter:"drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)" }}
              />
              FULL
            </span>
            {" "}
            <span style={{ position:"relative", display:"inline-block" }}>
              STA
              <span style={{ position:"relative", display:"inline-block" }}>
                <img src="/chibi1.gif" alt=""
                  className="hidden lg:block absolute pointer-events-none select-none"
                  style={{ width:"clamp(80px,8vw,120px)", bottom:"77%", left:"37%", transform:"translateX(-50%)", zIndex:30, filter:"drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)" }}
                />
                CK
              </span>
            </span>
            <br />
            {/* Outlined DEVELOPER */}
            <span style={{ WebkitTextStroke:"clamp(2px,0.35vw,4px) #000", color:"transparent" }}>
              DEVELOPER
            </span>
          </h1>

          {/* Tagline */}
          <div className="hero-sub" style={{ marginBottom:"2.5rem" }}>
            <div style={{
              background:  "#FBFF48",
              border:      "2px solid #000",
              boxShadow:   "6px 6px 0 #000",
              padding:     "1rem 2rem",
              maxWidth:    580,
              position:    "relative", overflow:"hidden",
            }}>
              <div style={{ position:"absolute", inset:0, width:"35%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)", animation:"heroSweep 3.5s linear infinite", pointerEvents:"none" }} />
              <p style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"clamp(0.7rem,1.4vw,0.95rem)", fontWeight:500, lineHeight:1.65, margin:0, color:"#000", position:"relative" }}>
                I transform ideas into immersive digital experiences
                <br />
                <strong>React · React Native · Java · Node</strong>
              </p>
            </div>
          </div>

          {/* ── CTA buttons ── */}
          <div className="hero-btns" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"1rem", alignItems:"flex-end" }}>

            {/* chibi3 gif floats above VIEW DATABASE */}
            <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center" }}>

              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); smoothScrollTo("projects"); }}
                className="cursor-hover hero-cta"
                style={{ background:"#000", color:"#fff", boxShadow:"6px 6px 0 #000" }}
                onMouseEnter={(e) => { e.currentTarget.style.background="#33FF57"; e.currentTarget.style.color="#000"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background="#000"; e.currentTarget.style.color="#fff"; }}
              >
                VIEW DATABASE ↗
              </a>
            </div>

            <button
              className="cursor-hover hero-cta"
              style={{ background:"#fff", color:"#000", boxShadow:"6px 6px 0 #000", cursor:"pointer", border:"2px solid #000" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="#FF70A6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="#fff"; }}
              onClick={async () => {
                try {
                  const res  = await fetch("/resume.pdf");
                  const blob = await res.blob();
                  const url  = URL.createObjectURL(blob);
                  const a    = document.createElement("a");
                  a.href     = url;
                  a.download = "Upayan_Resume.pdf";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                } catch {
                  // fallback: direct navigation
                  window.open("/resume.pdf", "_blank");
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              DOWNLOAD CV
            </button>
          </div>
        </div>

        {/* ── Bottom scrolling marquee ── */}
        <div style={{
          position:  "absolute", bottom:0, left:0, right:0,
          borderTop: "3px solid #000",
          background:"#000", overflow:"hidden", padding:"8px 0", zIndex:10,
        }}>
          <div style={{ display:"flex", animation:"heroMarquee 14s linear infinite", width:"max-content" }}>
            {[...Array(2)].map((_,i) => (
              <span key={i} style={{
                fontFamily:    '"Bebas Neue",sans-serif',
                fontSize:      "0.9rem", letterSpacing:"0.18em",
                color:         "#FBFF48", whiteSpace:"nowrap", paddingRight:"2rem",
              }}>
                FULL STACK DEV &nbsp;·&nbsp; REACT &nbsp;·&nbsp; NODE.JS &nbsp;·&nbsp; NEXT.JS &nbsp;·&nbsp; REACT NATIVE &nbsp;·&nbsp; MONGODB &nbsp;·&nbsp; POSTGRESQL &nbsp;·&nbsp; TYPESCRIPT &nbsp;·&nbsp; DOCKER &nbsp;·&nbsp; OPEN TO WORK &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}