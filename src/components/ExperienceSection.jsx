"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GIF = "/cat.gif";

const experiences = [
  {
    id: "001",
    role: "Freelance Full-Stack & App Developer",
    company: "SELF_EMPLOYED",
    period: "Jan 2025 — PRESENT",
    status: "ACTIVE",
    color: "#FBFF48",
    textColor: "#000",
    tag: "CURRENT_PROCESS",
    bullets: [
      "Collaborated with 5+ startups to design, develop, and deploy scalable web and mobile applications, resulting in 95%+ client satisfaction rate",
      "Managed complete software development lifecycle from requirement gathering, UI/UX design, backend API development, database architecture, to production deployment on Vercel and Render",
      "Engineered secure authentication systems using JWT and OAuth, integrated third-party APIs, and optimized application performance resulting in 40% faster load times",
    ],
    stack: ["React", "Next.js", "Node.js", "TailwindCSS", "JWT", "OAuth", "Vercel"],
  },
  {
    id: "002",
    role: "Web Development Team Lead",
    company: "Kinetex Society, KIIT University",
    period: "Jul 2025 — PRESENT",
    status: "ACTIVE",
    color: "#FF2A2A",
    textColor: "#fff",
    tag: "TEAM_LEAD",
    bullets: [
      "Leading a team of 8 developers in designing and building responsive web platforms for university society events and projects, serving 500+ active users",
      "Overseeing code quality, implementing best practices, managing project timelines, and coordinating deployment using Next, Node.js, and MongoDB",
      "Mentoring 5 junior developers in frontend and backend development, improving team productivity by 30%",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Team Leadership", "Agile"],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);
  const chibiAnchorRef = useRef(null);
  const [chibiPos, setChibiPos] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Mount guard for portal
  useEffect(() => { setMounted(true); }, []);

  // Track the anchor's position so the portal-chibi stays in sync on scroll/resize
  useEffect(() => {
    const update = () => {
      if (!chibiAnchorRef.current) return;
      const rect = chibiAnchorRef.current.getBoundingClientRect();
      setChibiPos({
        // centre of the anchor element, then shift up by chibi height
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY,
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mounted]);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".exp-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("exp-card--visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const section = sectionRef.current;
    const onScroll = () => {
      const rect    = section.getBoundingClientRect();
      const visible = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / rect.height));
      line.style.height = `${visible * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;600;700;800;900&family=Bebas+Neue&display=swap');

        .exp-card--visible { opacity:1 !important; transform:translateY(0) !important; }

        @keyframes expPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.3)} }
        @keyframes expFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes expSweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(500%)} }
        @keyframes expLineDraw { from{height:0%} to{height:100%} }

        .exp-card-inner {
          transition: transform 0.15s cubic-bezier(0.25,1,0.5,1), box-shadow 0.15s cubic-bezier(0.25,1,0.5,1);
        }
        .exp-stack-tag {
          transition: background 0.12s, color 0.12s, transform 0.12s;
          cursor: default;
        }
        .exp-stack-tag:hover { background:#000 !important; color:#fff !important; transform:translateY(-2px); }

        .deco-gif { display:none; }
        @media (min-width:768px) { .deco-gif { display:block; } }
      `}</style>

      <section
        id="experience"
        ref={sectionRef}
        style={{
          maxWidth:   "1280px",
          margin:     "0 auto",
          padding:    "6rem 1.5rem",
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      >

        {/* ══ HEADER ══ */}
        <div style={{ position:"relative", marginBottom:"5rem" }}>

          {/* Spidey gif */}
          <img
            src="/spidey.gif" alt=""
            className="deco-gif"
            style={{ position:"absolute", top:"-55%", left:"-12%", width:"150px", zIndex:5, animation:"expFloat 3s ease-in-out infinite",filter:"drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)" }}
          />

          {/* Eyebrow */}
          <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:'"JetBrains Mono",monospace', fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", color:"#999", marginBottom:"0.8rem" }}>
            <span style={{ width:28, height:2, background:"#999", display:"inline-block" }} />
            EXPERIENCE_LOG.TXT
          </div>

          {/* Heading row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1.5rem" }}>

            {/* Big heading + stat pills */}
            <div style={{ display:"flex", alignItems:"flex-end", gap:"1.2rem", flexWrap:"wrap" }}>
              <h2 style={{
                fontFamily:'"Bebas Neue",sans-serif',
                fontSize:"clamp(3.5rem,9vw,7.5rem)",
                fontWeight:400, letterSpacing:"0.02em", lineHeight:0.88, margin:0,
              }}>
                CAREER
                <span style={{ WebkitTextStroke:"3px #000", color:"transparent" }}>_LOG</span>
              </h2>

              {/* Mini stat stack */}
              <div style={{ display:"flex", gap:1, marginBottom:"0.5rem" }}>
                {[["2","ROLES"],["5+","CLIENTS"],["95%","SAT"]].map(([n,l]) => (
                  <div key={l} style={{ background:"#000", padding:"5px 11px", textAlign:"center" }}>
                    <div style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:"1.4rem", color:"#FBFF48", lineHeight:1 }}>{n}</div>
                    <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"0.38rem", fontWeight:700, letterSpacing:"0.1em", color:"#444", marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal chip */}
            <div style={{
              fontFamily:'"JetBrains Mono",monospace', fontSize:"0.6rem", fontWeight:700,
              background:"#121212", color:"#33FF57",
              border:"2px solid #000", boxShadow:"5px 5px 0 #33FF57",
              padding:"10px 16px", lineHeight:1.85, whiteSpace:"nowrap",
              position:"relative", overflow:"hidden",
            }}>
              <div style={{ position:"absolute", inset:0, width:"30%", background:"linear-gradient(90deg,transparent,rgba(51,255,87,0.07),transparent)", animation:"expSweep 3s linear infinite", pointerEvents:"none" }} />
              <span style={{ color:"#ffffff33" }}>$ </span>grep -c "shipped" career.log<br />
              <span style={{ color:"#ffffff33" }}>→ </span>
              <span style={{ color:"#FBFF48" }}>2 entries found</span>
              <span style={{ animation:"expPulse 1s ease-in-out infinite", display:"inline-block", marginLeft:3 }}>_</span>
            </div>
          </div>

          {/* Full-width rule */}
          <div style={{ height:3, background:"#000", marginTop:"1.5rem" }} />
        </div>

        {/* ══ TIMELINE ══ */}
        <div style={{ position:"relative" }}>

          {/* Vertical track */}
          <div
            style={{ position:"absolute", left:28, top:0, bottom:0, width:4, background:"#e8e8e8" }}
            className="hidden md:block"
          >
            <div ref={lineRef} style={{ position:"absolute", top:0, left:0, width:"100%", height:"0%", background:"#000", transition:"height 0.1s linear" }} />
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"2.5rem" }} className="md:pl-20">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="exp-card"
                style={{ opacity:0, transform:"translateY(32px)", transition:`opacity 0.6s cubic-bezier(0.25,1,0.5,1) ${idx*0.12}s,transform 0.6s cubic-bezier(0.25,1,0.5,1) ${idx*0.12}s`, position:"relative" }}
              >

                {/* Timeline dot */}
                <div
                  className="hidden md:block"
                  style={{ position:"absolute", left:-56, top:32, width:28, height:28, background:exp.color, border:"4px solid #000", boxShadow:`0 0 0 2px ${exp.color}44`, zIndex:2 }}
                />

                {/* GIF above first card */}
                {idx === 0 && (
                  <img src={GIF} alt="" className="deco-gif"
                    style={{ position:"absolute", bottom:"92%", left:"58%", width:"130px", zIndex:5, filter:"drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)" }}
                  />
                )}

                {/* ── CARD ── */}
                <div
                  className="exp-card-inner"
                  style={{ border:"3px solid #000", background:"#fff", boxShadow:"8px 8px 0 #000", overflow:"hidden" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform="translate(4px,4px)"; e.currentTarget.style.boxShadow=`4px 4px 0 ${exp.color}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform="translate(0,0)"; e.currentTarget.style.boxShadow="8px 8px 0 #000"; }}
                >
                  {/* Accent bar with shimmer */}
                  <div style={{ height:6, background:exp.color, position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", inset:0, width:"40%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)", animation:"expSweep 2.5s linear infinite" }} />
                  </div>

                  <div style={{ padding:"1.8rem 2rem" }}>

                    {/* ── Top row: badges + period ── */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"1rem", marginBottom:"1.2rem", paddingBottom:"1.2rem", borderBottom:"2px dashed #e5e5e5" }}>

                      {/* Left */}
                      <div style={{ flex:1, minWidth:0 }}>
                        {/* Badges */}
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:"0.7rem" }}>
                          <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"0.5rem", fontWeight:800, letterSpacing:"0.14em", padding:"3px 9px", background:exp.color, color:exp.textColor, border:"1.5px solid #000" }}>
                            {exp.tag}
                          </span>
                          {exp.status === "ACTIVE" && (
                            <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:'"JetBrains Mono",monospace', fontSize:"0.5rem", fontWeight:800, letterSpacing:"0.12em", padding:"3px 9px", background:"#33FF57", color:"#000", border:"1.5px solid #000" }}>
                              <span style={{ width:6, height:6, borderRadius:"50%", background:"#000", flexShrink:0, animation:"expPulse 1.5s ease-in-out infinite" }} />
                              LIVE
                            </span>
                          )}
                          <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"0.5rem", fontWeight:800, letterSpacing:"0.1em", padding:"3px 9px", background:"#000", color:"#fff", border:"1.5px solid #000" }}>
                            #{exp.id}
                          </span>
                        </div>

                        {/* Role title */}
                        <h3 style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:"clamp(1.6rem,3vw,2.3rem)", letterSpacing:"0.04em", lineHeight:1, color:"#000", margin:0 }}>
                          {exp.role}
                        </h3>
                      </div>

                      {/* Right: period + chibi anchor */}
                      <div style={{ position:"relative", flexShrink:0, alignSelf:"flex-start" }}>
                        {/* Invisible anchor point — portal chibi will float above this */}
                        {idx === 1 && (
                          <div ref={chibiAnchorRef} style={{ position:"absolute", top:0, left:"50%", width:0, height:0 }} />
                        )}
                        <div style={{ fontFamily:'"JetBrains Mono",monospace', fontWeight:700, fontSize:"0.62rem", padding:"6px 12px", background:"#121212", color:"#fff", border:"2px solid #000" }}>
                          {exp.period}
                        </div>
                      </div>
                    </div>

                    {/* Company */}
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1.3rem" }}>
                      <div style={{ width:4, height:22, background:exp.color, flexShrink:0, border:"1px solid #000" }} />
                      <p style={{ fontFamily:'"JetBrains Mono",monospace', fontWeight:800, fontSize:"1rem", color:["#FBFF48","#33FF57","#FF70A6"].includes(exp.color)?"#000":exp.color, margin:0 }}>
                        @ {exp.company}
                      </p>
                    </div>

                    {/* Bullets */}
                    <ul style={{ listStyle:"none", padding:0, margin:"0 0 1.5rem 0", display:"flex", flexDirection:"column", gap:"0.55rem" }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", fontFamily:'"JetBrains Mono",monospace', fontSize:"0.73rem", color:"#444", lineHeight:1.65 }}>
                          <span style={{ marginTop:6, width:8, height:8, flexShrink:0, background:exp.color, border:"2px solid #000", display:"inline-block" }} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {exp.stack.map((s) => (
                        <span
                          key={s}
                          className="exp-stack-tag"
                          style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"0.52rem", fontWeight:700, letterSpacing:"0.08em", padding:"3px 9px", border:"1.5px solid #000", background:"transparent", color:"#333" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Watermark */}
                  <div style={{ position:"absolute", bottom:6, right:16, fontFamily:'"Bebas Neue",sans-serif', fontSize:"clamp(3rem,6vw,5rem)", color:"#000", opacity:0.04, lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
                    {exp.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Portal chibi — rendered into body, escapes all overflow:hidden containers ── */}
      {mounted && chibiPos && createPortal(
        <img
          src="/chibi8.gif"
          alt=""
          style={{
            position:  "absolute",
            top:       chibiPos.y,
            left:      chibiPos.x,
            transform: "translate(-50%, -100%)",
            width:     "80px",
            zIndex:    9999,
            pointerEvents: "none",
            userSelect: "none",
            filter:    "drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)",
            // Only show on md+ screens matching .deco-gif behaviour
            display:   typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "block",
          }}
        />,
        document.body
      )}
    </>
  );
}