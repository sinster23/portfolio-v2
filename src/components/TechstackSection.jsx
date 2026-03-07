"use client";

import { useEffect, useRef, useState } from "react";

const skills = [
  { category: "FRONTEND",  name: "REACT",        hoverBg: "#61DAFB", hoverText: "#000" },
  { category: "MOBILE",    name: "REACT-NATIVE",  hoverBg: "#FF70A6", hoverText: "#000" },
  { category: "FRAMEWORK", name: "NEXT.JS",       hoverBg: "#FBFF48", hoverText: "#000" },
  { category: "LANGUAGE",  name: "TYPESCRIPT",    hoverBg: "#3B82F6", hoverText: "#000" },
  { category: "LANGUAGE",  name: "JAVASCRIPT",    hoverBg: "#FBFF48", hoverText: "#000" },
  { category: "LANGUAGE",  name: "PYTHON",        hoverBg: "#3B82F6", hoverText: "#000" },
  { category: "BACKEND",   name: "NODE.JS",       hoverBg: "#33FF57", hoverText: "#000" },
  { category: "BACKEND",   name: "GOLANG",        hoverBg: "#00ADD8", hoverText: "#000" },
  { category: "LANGUAGE",  name: "JAVA",          hoverBg: "#FF9F1C", hoverText: "#000" },
  { category: "LANGUAGE",  name: "C++",           hoverBg: "#A855F7", hoverText: "#000" },
  { category: "DATABASE",  name: "MONGODB",       hoverBg: "#33FF57", hoverText: "#000" },
  { category: "DATABASE",  name: "POSTGRESQL",    hoverBg: "#FF9F1C", hoverText: "#000" },
  { category: "QUERY",     name: "GRAPHQL",       hoverBg: "#FF2A2A", hoverText: "#fff" },
  { category: "DATA",      name: "REACT QUERY",   hoverBg: "#FF4154", hoverText: "#fff" },
  { category: "DEVOPS",    name: "DOCKER",        hoverBg: "#00C4E0", hoverText: "#000" },
  { category: "CLOUD",     name: "AWS",           hoverBg: "#FF9F1C", hoverText: "#000" },
  { category: "BACKEND",   name: "FIREBASE",      hoverBg: "#FBFF48", hoverText: "#000" },
  { category: "BACKEND",   name: "SUPABASE",      hoverBg: "#FBFF48", hoverText: "#000" },
  { category: "VERSION",   name: "GIT",           hoverBg: "#FF2A2A", hoverText: "#fff" },
  { category: "ANALYTICS", name: "POWER BI",      hoverBg: "#FBFF48", hoverText: "#000" },
  { category: "DATA",      name: "JUPYTER",       hoverBg: "#FF9F1C", hoverText: "#000" },
  { category: "STYLING",   name: "TAILWIND",      hoverBg: "#FF70A6", hoverText: "#000" },
  { category: "DATA",      name: "EXCEL",         hoverBg: "#33FF57", hoverText: "#000" },
];

function SkillCell({ skill, index, visible }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);
  const delay = index * 0.022;

  return (
    <div
      ref={ref}
      className="skill-cell"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: hov ? skill.hoverBg : "#121212",
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0) scale(1)" : "translateY(18px) scale(0.96)",
        transition: `background-color 0.18s ease, opacity 0.5s cubic-bezier(0.25,1,0.5,1) ${delay}s, transform 0.5s cubic-bezier(0.25,1,0.5,1) ${delay}s`,
      }}
    >
      {/* Top accent bar that sweeps in on hover */}
      <div style={{
        position:   "absolute",
        top:        0, left: 0,
        height:     3,
        width:      hov ? "100%" : "0%",
        background: skill.hoverBg,
        transition: "width 0.22s cubic-bezier(0.25,1,0.5,1)",
        zIndex:     2,
      }} />

      {hov && <div className="cell-shimmer" />}

      <div className="cat-label" style={{ color: hov ? skill.hoverText : "#33FF57", opacity: hov ? 0.65 : 0.6 }}>
        &gt;_ {skill.category}
      </div>
      <div className="skill-name" style={{ color: hov ? skill.hoverText : "#fff" }}>
        {skill.name}
      </div>

      {/* Index watermark */}
      <div style={{
        position:      "absolute",
        bottom:        4, right: 6,
        fontFamily:    '"JetBrains Mono",monospace',
        fontSize:      "0.38rem",
        fontWeight:    700,
        letterSpacing: "0.06em",
        color:         hov ? `${skill.hoverText}33` : "rgba(255,255,255,0.07)",
        transition:    "color 0.18s",
        userSelect:    "none",
        pointerEvents: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef  = useRef(null);
  const [headVis,  setHeadVis]  = useState(false);
  const [gridVis,  setGridVis]  = useState(false);
  const [count,    setCount]    = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeadVis(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!headVis) return;
    const t = setTimeout(() => setGridVis(true), 100);
    return () => clearTimeout(t);
  }, [headVis]);

  useEffect(() => {
    if (!gridVis) return;
    let i = 0;
    const target = skills.length;
    const id = setInterval(() => {
      i = Math.min(i + 1, target);
      setCount(i);
      if (i >= target) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [gridVis]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;600;700;800;900&family=Bebas+Neue&display=swap');

        @keyframes skSweep  { 0%{transform:translateX(-100%)} 100%{transform:translateX(600%)} }
        @keyframes skBlink  { 0%,100%{opacity:1} 50%{opacity:0} }

        .skill-cell {
          width: 12.5%;
          height: 96px;
          border-right:   1px solid rgba(255,255,255,0.08);
          border-bottom:  1px solid rgba(255,255,255,0.08);
          display:        flex;
          flex-direction: column;
          align-items:    center;
          justify-content:center;
          padding:        0.5rem;
          position:       relative;
          cursor:         pointer;
          overflow:       hidden;
        }
        .skill-cell:hover { z-index: 10; }

        .cell-shimmer {
          position:   absolute; inset: 0;
          width:      35%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          animation:  skSweep 1.2s ease forwards;
          pointer-events: none;
        }

        .cat-label {
          font-family:    'JetBrains Mono', monospace;
          font-size:      0.52rem;
          font-weight:    700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom:  0.3rem;
          transition:     color 0.18s;
        }
        .skill-name {
          font-family:    'Space Grotesk', sans-serif;
          font-size:      1rem;
          font-weight:    900;
          text-transform: uppercase;
          text-align:     center;
          transition:     color 0.18s;
        }

        @media (max-width:1024px) { .skill-cell { width:16.666%; } }
        @media (max-width:768px)  { .skill-cell { width:25%; } }
        @media (max-width:480px)  { .skill-cell { width:50%; height:80px; } }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        style={{
          padding:         "5rem 0 4rem",
          backgroundColor: "#121212",
          color:           "#fff",
          borderTop:       "4px solid #000",
          borderBottom:    "4px solid #000",
          position:        "relative",
          overflow:        "hidden",
          fontFamily:      '"Space Grotesk", sans-serif',
        }}
      >
        {/* Dot-grid texture */}
        <div style={{
          position:        "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize:  "28px 28px",
        }} />

        {/* Radial fade */}
        <div style={{
          position:   "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #121212 100%)",
        }} />

        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 10 }}>

          {/* ══ HEADER ══ */}
          <div style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-end",
            marginBottom:   "2rem",
            paddingBottom:  "1.5rem",
            borderBottom:   "3px solid #222",
            flexWrap:       "wrap",
            gap:            "1.5rem",
            opacity:    headVis ? 1 : 0,
            transform:  headVis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}>

            {/* Left: eyebrow + heading */}
            <div>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: "0.58rem", fontWeight: 700,
                letterSpacing: "0.2em", color: "#33FF57",
                marginBottom: "0.7rem",
              }}>
                <span style={{ width: 28, height: 2, background: "#33FF57", display: "inline-block" }} />
                SYSTEM_STACK.TXT
              </div>

              <h2 style={{
                fontFamily:    '"Bebas Neue",sans-serif',
                fontSize:      "clamp(3.5rem,9vw,7rem)",
                fontWeight:    400,
                letterSpacing: "0.02em",
                lineHeight:    0.88,
                margin:        0,
                color:         "#fff",
              }}>
                TECH
                <span style={{ WebkitTextStroke: "2px #33FF57", color: "transparent", marginLeft: "0.12em" }}>
                  _STACK
                </span>
              </h2>
            </div>

            {/* Right: stat pills + terminal */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>

              {/* Stat pills */}
              <div style={{ display: "flex", gap: 1 }}>
                {[
                  [String(count).padStart(2, "0"), "SKILLS"],
                  ["5+",  "DOMAINS"],
                  ["2+",  "YRS EXP"],
                ].map(([n, l]) => (
                  <div key={l} style={{ background: "#0d0d0d", border: "1px solid #222", padding: "6px 14px", textAlign: "center" }}>
                    <div style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.5rem", color: "#33FF57", lineHeight: 1 }}>{n}</div>
                    {/* ── was #333, now #888 ── */}
                    <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: "0.38rem", fontWeight: 700, letterSpacing: "0.1em", color: "#888", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Terminal chip */}
              <div style={{
                fontFamily:    '"JetBrains Mono",monospace',
                fontSize:      "0.58rem",
                fontWeight:    700,
                background:    "#0d0d0d",
                color:         "#33FF57",
                border:        "1px solid #222",
                boxShadow:     "4px 4px 0 #33FF57",
                padding:       "8px 14px",
                lineHeight:    1.8,
                whiteSpace:    "nowrap",
                position:      "relative",
                overflow:      "hidden",
              }}>
                <div style={{
                  position:   "absolute", inset: 0, width: "28%",
                  background: "linear-gradient(90deg,transparent,rgba(51,255,87,0.07),transparent)",
                  animation:  "skSweep 3s linear infinite",
                  pointerEvents: "none",
                }} />
                <span style={{ color: "#ffffff44" }}>$ </span>npm list --depth=0<br />
                <span style={{ color: "#ffffff44" }}>→ </span>
                <span style={{ color: "#FBFF48" }}>23 packages installed</span>
                <span style={{ animation: "skBlink 0.9s step-end infinite", display: "inline-block", marginLeft: 3 }}>_</span>
              </div>
            </div>
          </div>

          {/* ══ SKILLS GRID ══ */}
          <div style={{
            border:   "1px solid #222",
            display:  "flex",
            flexWrap: "wrap",
            overflow: "hidden",
          }}>
            {skills.map((skill, i) => (
              <SkillCell key={skill.name} skill={skill} index={i} visible={gridVis} />
            ))}
          </div>

          {/* ══ FOOTER STRIP ══ */}
          <div style={{
            borderTop:      "3px solid #222",
            marginTop:      "2rem",
            paddingTop:     "1rem",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            flexWrap:       "wrap",
            gap:            "0.5rem",
            fontFamily:     '"JetBrains Mono",monospace',
            fontSize:       "0.52rem",
            /* ── was #2a2a2a, now #666 ── */
            color:          "#666",
            opacity:    headVis ? 1 : 0,
            transition: "opacity 0.65s ease 0.3s",
          }}>
            <div style={{ display: "flex", gap: 24 }}>
              <span>TOTAL_NODES: <span style={{ color: "#33FF57" }}>{skills.length}</span></span>
              <span>STATUS: <span style={{ color: "#33FF57" }}>OPTIMAL</span></span>
            </div>
            <span>MEMORY_USAGE: <span style={{ color: "#33FF57" }}>128MB</span></span>
          </div>

        </div>
      </section>
    </>
  );
}