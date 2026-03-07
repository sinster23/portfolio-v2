"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GIF = "/chibi4.gif";

const projects = [
  {
    id: "001",
    title: "2D Metaverse Platform",
    category: ["WEB DEV", "REAL-TIME"],
    description:
      "Real-time 2D metaverse with interactive user experiences, live multiplayer rooms, and avatar-based navigation.",
    stack: ["React", "Node.js", "MongoDB", "Socket.IO", "PixiJS"],
    accentColor: "#33FF57",
    accentText: "#000",
    href: "https://github.com/sinster23/2d-metaverse",
    video: "/1.mp4",
    status: "SHIPPED",
  },
  {
    id: "002",
    title: "NexusAI",
    category: ["MOBILE DEV", "AI"],
    description:
      "AI-driven storytelling app where user choices control the narrative flow in real time.",
    stack: ["React Native", "Firebase", "GeminiAPI"],
    accentColor: "#3B82F6",
    accentText: "#fff",
    href: "https://github.com/sinster23/Nexusai",
    video: "/2.mp4",
    status: "SHIPPED",
    showGif: true,
  },
  {
    id: "003",
    title: "CodeSeekho",
    category: ["WEB DEV", "GAMIFIED"],
    description:
      "Gamified coding platform where users learn programming through interactive games, challenges, and skill-based levels.",
    stack: ["Next.js", "Node.js", "Express", "Prisma", "PostgreSQL", "Docker", "Judge0"],
    accentColor: "#FF70A6",
    accentText: "#000",
    href: "https://github.com/sinster23/codeseekho-monorepo",
    video: "/3.mp4",
    status: "SHIPPED",
  },
  {
    id: "004",
    title: "KHive",
    category: ["WEB DEV", "COMMUNITY"],
    description:
      "Scalable campus community platform with 500+ users for student interactions, events, and society discussions.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Socket.IO"],
    accentColor: "#FF2A2A",
    accentText: "#fff",
    href: "https://khive.kinetex.in",
    video: "/4.mp4",
    status: "SHIPPED",
  },
];

function ProjectCard({ project, offsetDown = false, gifAnchorRef }) {
  const cardRef  = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    if (cardRef.current) {
      cardRef.current.style.transform = "translate(5px, 5px)";
      cardRef.current.style.boxShadow = `3px 3px 0 #000`;
    }
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "translate(0, 0)";
      cardRef.current.style.boxShadow = "8px 8px 0 #000";
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`proj-reveal${offsetDown ? " md-offset-down" : ""}`}
      style={{ width: "100%", position: "relative" }}
    >
      {project.showGif && (
        <div
          ref={gifAnchorRef}
          style={{ position: "absolute", top: 0, left: "50%", width: 0, height: 0 }}
        />
      )}

      <div
        ref={cardRef}
        className="proj-card-inner"
        style={{
          border:        "3px solid #000",
          background:    "#fff",
          boxShadow:     "8px 8px 0 #000",
          transition:    "transform 0.15s cubic-bezier(0.25,1,0.5,1), box-shadow 0.15s",
          overflow:      "hidden",
          height:        "100%",
          display:       "flex",
          flexDirection: "column",
          position:      "relative",
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Accent top bar */}
        <div style={{ height: 5, background: project.accentColor, position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <div className="proj-shimmer" />
        </div>

        {/* Media block */}
        <div
          style={{
            position:    "relative",
            aspectRatio: "16/9",
            background:  "#0a0a0a",
            borderBottom:"3px solid #000",
            overflow:    "hidden",
            flexShrink:  0,
          }}
        >
          <div style={{
            position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
            background: "rgba(0,0,0,0.3)",
            transition: "opacity 0.3s",
            opacity: hovered ? 0 : 1,
          }} />

          <span style={{
            position:   "absolute", top: 10, left: 10, zIndex: 10,
            fontFamily: '"JetBrains Mono",monospace', fontSize: "0.5rem",
            fontWeight: 800, letterSpacing: "0.12em",
            padding:    "3px 8px",
            background: project.accentColor, color: project.accentText,
            border:     "1.5px solid #000",
          }}>
            PROJECT_{project.id}
          </span>

          <span style={{
            position:  "absolute", top: 10, right: 10, zIndex: 10,
            display:   "inline-flex", alignItems: "center", gap: 5,
            fontFamily:'"JetBrains Mono",monospace', fontSize: "0.5rem",
            fontWeight: 800, letterSpacing: "0.1em",
            padding:   "3px 8px",
            background: project.accentColor, color: project.accentText,
            border:    "1.5px solid #000",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: project.accentText, animation: "statusBlink 1.6s ease-in-out infinite" }} />
            {project.status}
          </span>

          <div style={{
            position:  "absolute", bottom: 10, left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10, pointerEvents: "none",
            fontFamily: '"JetBrains Mono",monospace', fontSize: "0.48rem",
            fontWeight: 700, letterSpacing: "0.12em",
            color: "#fff", background: "rgba(0,0,0,0.7)",
            padding: "3px 10px", border: "1px solid rgba(255,255,255,0.15)",
            opacity:   hovered ? 0 : 1,
            transition:"opacity 0.25s",
          }}>
            HOVER TO PLAY
          </div>

          <video
            ref={videoRef}
            src={project.video}
            muted loop playsInline preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Card content */}
        <div style={{ padding: "1.6rem 1.8rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.8rem" }}>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.category.map((cat) => (
              <span key={cat} style={{
                fontFamily: '"JetBrains Mono",monospace', fontSize: "0.48rem",
                fontWeight: 800, letterSpacing: "0.14em",
                padding:    "3px 8px",
                background: project.accentColor, color: project.accentText,
                border:     "1.5px solid #000",
              }}>{cat}</span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.8rem" }}>
            <h3 className="proj-title" style={{
              fontFamily:    '"Space Grotesk",sans-serif',
              fontWeight:    900,
              fontSize:      "clamp(1.3rem,2.5vw,1.9rem)",
              lineHeight:    1,
              color:         "#000",
              letterSpacing: "-0.02em",
              margin:        0,
              flex:          1,
            }}>
              {project.title}
            </h3>

            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flexShrink:     0,
                width:          42, height: 42,
                display:        "flex", alignItems: "center", justifyContent: "center",
                border:         "2px solid #000",
                background:     project.accentColor,
                color:          project.accentText,
                boxShadow:      "3px 3px 0 #000",
                fontSize:       "1.1rem", fontWeight: 900,
                textDecoration: "none",
                transition:     "transform 0.12s, box-shadow 0.12s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translate(2px,2px)"; e.currentTarget.style.boxShadow="1px 1px 0 #000"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translate(0,0)"; e.currentTarget.style.boxShadow="3px 3px 0 #000"; }}
            >
              ↗
            </a>
          </div>

          {/* ── was #555, now #333 for better contrast on white card ── */}
          <p style={{
            fontFamily: '"JetBrains Mono",monospace',
            fontSize:   "0.68rem",
            color:      "#333",
            lineHeight: 1.7,
            margin:     0,
            display:    "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow:   "hidden",
          }}>
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto", paddingTop: "0.5rem" }}>
            {project.stack.map((s) => (
              <span key={s} className="proj-stack-tag" style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize:   "0.48rem", fontWeight: 700, letterSpacing: "0.06em",
                padding:    "3px 8px",
                background: "#121212", color: "#fff",
                border:     "1.5px solid #000",
                transition: "background 0.12s, color 0.12s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background=project.accentColor; e.currentTarget.style.color=project.accentText; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="#121212"; e.currentTarget.style.color="#fff"; }}
              >{s}</span>
            ))}
          </div>
        </div>

        {/* Watermark */}
        <div style={{
          position:   "absolute", bottom: 6, right: 14,
          fontFamily: '"Space Grotesk",sans-serif',
          fontWeight: 900,
          fontSize:   "clamp(3rem,6vw,5rem)",
          color:      "#000", opacity: 0.04,
          lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>
          {project.id}
        </div>
      </div>
    </div>
  );
}

export default function SelectedWorksSection() {
  const sectionRef   = useRef(null);
  const gifAnchorRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [gifPos, setGifPos]   = useState(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const update = () => {
      if (!gifAnchorRef.current) return;
      const rect = gifAnchorRef.current.getBoundingClientRect();
      setGifPos({ x: rect.left + rect.width / 2, y: rect.top + window.scrollY });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [mounted]);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".proj-reveal");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("proj-reveal--visible"); }),
      { threshold: 0.06 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;600;700;800;900&family=Bebas+Neue&display=swap');

        @keyframes statusBlink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.4)} }
        @keyframes projSweep   { 0%{transform:translateX(-100%)} 100%{transform:translateX(600%)} }
        @keyframes projFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes projGlitch  { 0%{transform:translate(0)} 20%{transform:translate(-2px,2px)} 40%{transform:translate(-2px,-2px)} 60%{transform:translate(2px,2px)} 80%{transform:translate(2px,-2px)} 100%{transform:translate(0)} }
        @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .proj-shimmer {
          position:absolute; inset:0; width:35%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent);
          animation:projSweep 2.8s linear infinite;
          pointer-events:none;
        }
        .proj-reveal {
          opacity:0; transform:translateY(36px);
          transition:opacity 0.65s cubic-bezier(0.25,1,0.5,1), transform 0.65s cubic-bezier(0.25,1,0.5,1);
        }
        .proj-reveal--visible { opacity:1 !important; transform:translateY(0) !important; }
        .proj-reveal:nth-child(2){transition-delay:0.08s}
        .proj-reveal:nth-child(3){transition-delay:0.16s}
        .proj-reveal:nth-child(4){transition-delay:0.24s}
        .proj-reveal:nth-child(5){transition-delay:0.32s}

        .proj-title:hover {
          animation:projGlitch 0.3s ease both infinite;
          color:#FF2A2A !important;
        }

        .deco-gif{display:none}
        @media(min-width:768px){.deco-gif{display:block}}

        @media(max-width:767px){
          .cards-grid{grid-template-columns:1fr !important}
          .md-offset-down{margin-top:0 !important}
        }
        @media(min-width:768px){
          .md-offset-down{margin-top:5rem}
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        style={{
          backgroundColor: "#FBEC5D",
          fontFamily:      '"Space Grotesk",sans-serif',
          position:        "relative",
          overflow:        "hidden",
          borderTop:       "4px solid #000",
          borderBottom:    "4px solid #000",
        }}
      >
        {/* Halftone dot texture */}
        <div style={{
          position:        "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle,rgba(0,0,0,0.1) 1px,transparent 1px)",
          backgroundSize:  "22px 22px",
          zIndex:          0,
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 1.5rem", position: "relative", zIndex: 2 }}>

          {/* ══ HEADER ══ */}
          <div className="proj-reveal" style={{ marginBottom: "4rem" }}>

            {/* Eyebrow — was rgba(0,0,0,0.45), now rgba(0,0,0,0.65) */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.2em", color: "rgba(0,0,0,0.65)",
              marginBottom: "1rem",
            }}>
              <span style={{ width: 28, height: 2, background: "rgba(0,0,0,0.65)", display: "inline-block" }} />
              PROJECTS.EXE
              <span style={{ width: 28, height: 2, background: "rgba(0,0,0,0.65)", display: "inline-block" }} />
            </div>

            {/* Heading row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>

              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src="/chibi3.gif" alt=""
                  className="deco-gif"
                  style={{ position:"absolute", bottom:"95%", left:"34%", width:"72px", zIndex:5, filter:"drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)" }}
                />
                <h2 style={{
                  fontFamily:       '"Bebas Neue",sans-serif',
                  fontSize:         "clamp(3rem,9vw,8rem)",
                  fontWeight:       400,
                  letterSpacing:    "0.02em",
                  lineHeight:       0.88,
                  color:            "transparent",
                  WebkitTextStroke: "clamp(2px,0.6vw,5px) #000",
                  paintOrder:       "stroke fill",
                  margin:           0,
                  whiteSpace:       "nowrap",
                }}>
                  SELECTED{" "}
                  <span style={{ color:"#000", WebkitTextStroke:"0" }}>WORKS</span>
                </h2>
              </div>

              {/* Right: stat pills + terminal */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <div style={{ display: "flex", gap: 1 }}>
                  {[["04","PROJECTS"],["3+","YRS"],["100%","SHIPPED"]].map(([n,l]) => (
                    <div key={l} style={{ background:"#000", padding:"6px 12px", textAlign:"center" }}>
                      <div style={{ fontFamily:'"Bebas Neue",sans-serif', fontSize:"1.5rem", color:"#FBFF48", lineHeight:1 }}>{n}</div>
                      {/* ── was #555, now #aaa for contrast on black bg ── */}
                      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"0.38rem", fontWeight:700, letterSpacing:"0.1em", color:"#aaa", marginTop:2 }}>{l}</div>
                    </div>
                  ))}
                </div>

                {/* Terminal chip — prompt chars bumped from #ffffff33 to #ffffff66 */}
                <div style={{
                  fontFamily:'"JetBrains Mono",monospace', fontSize:"0.58rem", fontWeight:700,
                  background:"#121212", color:"#33FF57",
                  border:"2px solid #000", boxShadow:"4px 4px 0 #000",
                  padding:"8px 14px", lineHeight:1.8, whiteSpace:"nowrap",
                  position:"relative", overflow:"hidden",
                }}>
                  <div style={{ position:"absolute", inset:0, width:"30%", background:"linear-gradient(90deg,transparent,rgba(51,255,87,0.08),transparent)", animation:"projSweep 3s linear infinite", pointerEvents:"none" }} />
                  <span style={{ color:"#ffffff66" }}>$ </span>ls ./projects/<br />
                  <span style={{ color:"#ffffff66" }}>→ </span>
                  <span style={{ color:"#FBFF48" }}>4 entries found</span>
                  <span style={{ animation:"statusBlink 1s ease-in-out infinite", display:"inline-block", marginLeft:3 }}>_</span>
                </div>
              </div>
            </div>

            <div style={{ height: 3, background: "#000", marginTop: "1.5rem" }} />
          </div>

          {/* ══ CARDS GRID ══ */}
          <div
            className="cards-grid"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap:                 "2.5rem",
              alignItems:          "start",
            }}
          >
            <ProjectCard project={projects[0]} offsetDown={false} />
            <ProjectCard project={projects[1]} offsetDown={true}  gifAnchorRef={gifAnchorRef} />
            <ProjectCard project={projects[2]} offsetDown={false} />
            <ProjectCard project={projects[3]} offsetDown={true}  />
          </div>

          {/* ══ CTA ══ */}
          <div style={{ textAlign: "center", marginTop: "5rem" }} className="proj-reveal">
            <div style={{ display:"flex", alignItems:"center", gap:16, justifyContent:"center", marginBottom:"2rem" }}>
              <div style={{ flex:1, maxWidth:160, height:1, background:"rgba(0,0,0,0.3)" }} />
              {/* ── was rgba(0,0,0,0.3), now rgba(0,0,0,0.6) ── */}
              <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.2em", color:"rgba(0,0,0,0.6)" }}>
                END_OF_RECORDS
              </span>
              <div style={{ flex:1, maxWidth:160, height:1, background:"rgba(0,0,0,0.3)" }} />
            </div>

            <div style={{ position:"relative", display:"inline-block" }}>
              <img
                src="/chibi1.gif" alt=""
                className="deco-gif"
                style={{ position:"absolute", bottom:"70%", left:"50%", transform:"translateX(-50%)", width:"110px", zIndex:5, filter:"drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)"}}
              />
              <a
                href="https://github.com/sinster23?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        "inline-flex", alignItems:"center", gap:10,
                  fontFamily:     '"JetBrains Mono",monospace',
                  fontSize:       "0.8rem", fontWeight:800,
                  letterSpacing:  "0.1em",
                  background:     "#000", color:"#fff",
                  border:         "3px solid #000",
                  boxShadow:      "6px 6px 0 #000",
                  padding:        "1rem 2.5rem",
                  textDecoration: "none",
                  textTransform:  "uppercase",
                  transition:     "transform 0.15s, box-shadow 0.15s, background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform="translate(3px,3px)"; e.currentTarget.style.boxShadow="3px 3px 0 #000"; e.currentTarget.style.background="#FBFF48"; e.currentTarget.style.color="#000"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform="translate(0,0)"; e.currentTarget.style.boxShadow="6px 6px 0 #000"; e.currentTarget.style.background="#000"; e.currentTarget.style.color="#fff"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                VIEW ALL REPOS ON GITHUB ↗
              </a>
            </div>

            {/* ── was rgba(0,0,0,0.25), now rgba(0,0,0,0.55) ── */}
            <p style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:"0.55rem", marginTop:"1rem", letterSpacing:"0.18em", color:"rgba(0,0,0,0.55)" }}>
              $ git clone sinster23-ops --all
            </p>
          </div>

        </div>
      </section>

      {/* Portal gif for NexusAI */}
      {mounted && gifPos && createPortal(
        <img
          src={GIF}
          alt=""
          style={{
            position:      "absolute",
            top:           gifPos.y,
            left:          gifPos.x,
            transform:     "translate(-50%, -100%)",
            width:         "130px",
            zIndex:        9999,
            pointerEvents: "none",
            userSelect:    "none",
            filter:        "drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)",
            display:       typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "block",
          }}
        />,
        document.body
      )}
    </>
  );
}