"use client";

import { useEffect, useRef } from "react";

const TRAITS = [
  { label: "BACKEND",   color: "#FBFF48", text: "#000" },
  { label: "FRONTEND",  color: "#000",    text: "#fff" },
  { label: "AI / ML",   color: "#A855F7", text: "#fff" },
  { label: "SYSTEMS",   color: "#33FF57", text: "#000" },
];

const BULLETS = [
  "Specialized in backend & full-stack web development.",
  "Obsessed with perfection, performance, and AI.",
  "2+ years of shipping code that actually works.",
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("active");
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;600;700;800;900&display=swap');

        .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.65s cubic-bezier(0.25,1,0.5,1), transform 0.65s cubic-bezier(0.25,1,0.5,1); }
        .reveal.d1 { transition-delay: 0.05s; }
        .reveal.d2 { transition-delay: 0.13s; }
        .reveal.d3 { transition-delay: 0.21s; }
        .reveal.d4 { transition-delay: 0.29s; }
        .reveal.active { opacity: 1 !important; transform: translateY(0) !important; }

        @keyframes aboutPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(1.3); }
        }

        @keyframes aboutFloat {
          0%,100% { transform: translateY(0px) rotate(-2deg); }
          50%      { transform: translateY(-8px) rotate(-2deg); }
        }

        .about-avatar-img {
          transition: transform 0.5s cubic-bezier(0.25,1,0.5,1), filter 0.5s;
        }

        .about-trait-tag {
          transition: transform 0.12s, box-shadow 0.12s;
          cursor: default;
        }
        .about-trait-tag:hover {
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0 #000 !important;
        }

        .about-bullet-item {
          transition: padding-left 0.2s;
        }
        .about-bullet-item:hover {
          padding-left: 8px;
        }

        .about-badge {
          transition: transform 0.12s, box-shadow 0.12s;
        }
        .about-badge:hover {
          transform: translate(-2px,-2px);
          box-shadow: 6px 6px 0 #000 !important;
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        style={{
          maxWidth:   "1280px",
          margin:     "3rem auto",
          padding:    "0 1rem",
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      >
        {/* ── Outer neobrutalist frame ── */}
        <div
          style={{
            borderTop:      "1px solid #000",
            borderLeft:      "4px solid #000",
            borderRight:      "4px solid #000",
            borderBottom:      "4px solid #000",
            boxShadow:   "10px 10px 0 #000",
            background:  "#fff",
            overflow:    "hidden",
          }}
        >



          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "minmax(0,2fr) minmax(0,3fr)",
              gap:                 0,
            }}
            className="about-inner-grid"
          >
            {/* ════ LEFT COLUMN ════ */}
            <div
              style={{
                borderRight: "3px solid #000",
                display:     "flex",
                flexDirection:"column",
              }}
            >
              {/* Avatar */}
              <div
                className="about-avatar-wrap reveal d1"
                style={{
                  borderBottom: "3px solid #000",
                  overflow:     "hidden",
                  position:     "relative",
                  aspectRatio:  "1/1",
                }}
              >
                <img
                  src="/avatar.jpeg"
                  alt="upayan"
                  className="about-avatar-img"
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                />

                {/* AVATAR badge */}
                <span
                  style={{
                    position:   "absolute",
                    top:        10,
                    left:       10,
                    background: "#FF2A2A",
                    color:      "#fff",
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize:   "0.52rem",
                    fontWeight: 800,
                    padding:    "3px 8px",
                    border:     "1.5px solid #000",
                    letterSpacing: "0.1em",
                    zIndex:     10,
                  }}
                >
                  AVATAR.JPG
                </span>

                {/* Floating year tag */}
                <div
                  style={{
                    position:  "absolute",
                    bottom:    12,
                    right:     12,
                    background:"#FBFF48",
                    border:    "2px solid #000",
                    boxShadow: "3px 3px 0 #000",
                    padding:   "4px 10px",
                    fontFamily:'"JetBrains Mono",monospace',
                    fontSize:  "0.6rem",
                    fontWeight: 800,
                    animation: "aboutFloat 3s ease-in-out infinite",
                    zIndex:    10,
                  }}
                >
                  2+ YRS EXP
                </div>
              </div>

              {/* Trait tags */}
              <div
                className="reveal d2"
                style={{
                  borderBottom: "3px solid #000",
                  padding:      "16px",
                  display:      "flex",
                  flexWrap:     "wrap",
                  gap:          "7px",
                }}
              >
                {TRAITS.map((t) => (
                  <span
                    key={t.label}
                    className="about-trait-tag"
                    style={{
                      background:    t.color,
                      color:         t.text,
                      border:        "2px solid #000",
                      boxShadow:     "2px 2px 0 #000",
                      fontFamily:    '"JetBrains Mono",monospace',
                      fontSize:      "0.52rem",
                      fontWeight:    800,
                      letterSpacing: "0.1em",
                      padding:       "4px 10px",
                    }}
                  >
                    {t.label}
                  </span>
                ))}
              </div>

              {/* Location / Status */}
              <div className="reveal d3" style={{ padding:"16px", display:"flex", flexDirection:"column", gap:8 }}>
                <div
                  className="about-badge"
                  style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        8,
                    background: "#000",
                    color:      "#fff",
                    border:     "2px solid #000",
                    boxShadow:  "4px 4px 0 #000",
                    padding:    "9px 14px",
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize:   "0.6rem",
                    fontWeight: 800,
                    letterSpacing:"0.08em",
                  }}
                >
                  <span>📍</span> LOCATION: WORLDWIDE
                </div>
                <div
                  className="about-badge"
                  style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        8,
                    background: "#33FF57",
                    color:      "#000",
                    border:     "2px solid #000",
                    boxShadow:  "4px 4px 0 #000",
                    padding:    "9px 14px",
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize:   "0.6rem",
                    fontWeight: 800,
                    letterSpacing:"0.08em",
                  }}
                >
                  <span
                    style={{
                      width:9, height:9,
                      borderRadius:"50%",
                      background:"#000",
                      flexShrink:0,
                      animation:"aboutPulse 1.5s ease-in-out infinite",
                    }}
                  />
                  STATUS: AVAILABLE
                </div>
              </div>
            </div>

            {/* ════ RIGHT COLUMN ════ */}
            <div style={{ display:"flex", flexDirection:"column" }}>

              {/* Big heading block */}
              <div
                className="reveal d1"
                style={{
                  borderBottom: "3px solid #000",
                  padding:      "28px 32px 24px",
                  background:   "#FFFDF5",
                  backgroundImage:
                    "radial-gradient(#00000012 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily:    '"JetBrains Mono",monospace',
                    fontSize:      "0.58rem",
                    fontWeight:    700,
                    letterSpacing: "0.2em",
                    color:         "#999",
                    marginBottom:  "0.7rem",
                    display:       "flex",
                    alignItems:    "center",
                    gap:           8,
                  }}
                >
                  <span style={{ width:24, height:2, background:"#999", display:"inline-block" }} />
                  WHO AM I
                </div>

                <h2
                  style={{
                    fontFamily:    '"Space Grotesk",sans-serif',
                    fontWeight:    900,
                    fontSize:      "clamp(2.8rem,5.5vw,5rem)",
                    lineHeight:    0.87,
                    letterSpacing: "-0.03em",
                    margin:        0,
                  }}
                >
                  FULL<br />
                  <span
                    style={{
                      WebkitTextStroke: "3px #000",
                      color:            "transparent",
                    }}
                  >
                    STACK
                  </span>
                  <br />
                  <span style={{ color:"#A855F7" }}>DEV_</span>
                </h2>
              </div>

              {/* Bio text */}
              <div
                className="reveal d2"
                style={{
                  borderBottom: "3px solid #000",
                  padding:      "24px 32px",
                }}
              >
                <p
                  style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize:   "0.82rem",
                    lineHeight: 1.85,
                    color:      "#333",
                    margin:     0,
                  }}
                >
                  I am{" "}
                  <span
                    style={{
                      background:  "#FBFF48",
                      border:      "1px solid #000",
                      padding:     "0 4px",
                      fontWeight:  800,
                      color:       "#000",
                    }}
                  >
                    Upayan
                  </span>
                  . A creative developer who believes the web has become too
                  sanitized. I bring{" "}
                  <span style={{ fontWeight:800, color:"#000", textDecoration:"underline", textDecorationStyle:"wavy", textDecorationColor:"#A855F7" }}>
                    personality
                  </span>{" "}
                  back to code — one brutally crafted pixel at a time.
                </p>
              </div>

              {/* Bullet list */}
              <div
                className="reveal d3"
                style={{
                  borderBottom: "3px solid #000",
                  padding:      "22px 32px",
                }}
              >
                <div
                  style={{
                    fontFamily:  '"JetBrains Mono",monospace',
                    fontSize:    "0.58rem",
                    fontWeight:  700,
                    letterSpacing:"0.15em",
                    color:       "#A855F7",
                    marginBottom: "12px",
                  }}
                >
                  // README.TXT
                </div>
                <div
                  style={{
                    borderLeft: "4px solid #A855F7",
                    paddingLeft: "16px",
                    display:    "flex",
                    flexDirection:"column",
                    gap:        "10px",
                  }}
                >
                  {BULLETS.map((line, i) => (
                    <div
                      key={i}
                      className="about-bullet-item"
                      style={{
                        display:    "flex",
                        gap:        "10px",
                        alignItems: "flex-start",
                        fontFamily: '"JetBrains Mono",monospace',
                        fontSize:   "0.75rem",
                        color:      "#444",
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color:"#A855F7", fontWeight:800, flexShrink:0 }}>&gt;</span>
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini stat row */}
              <div
                className="reveal d4"
                style={{ display:"flex" }}
              >
                {[
                  { num:"5+",  label:"CLIENTS"  },
                  { num:"10+", label:"PROJECTS" },
                  { num:"95%", label:"SAT. RATE" },
                ].map((s, i, arr) => (
                  <div
                    key={s.label}
                    style={{
                      flex:          1,
                      padding:       "18px 16px",
                      borderRight:   i < arr.length - 1 ? "2px solid #e5e5e5" : "none",
                      textAlign:     "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily:    '"Space Grotesk",sans-serif',
                        fontWeight:    900,
                        fontSize:      "2rem",
                        lineHeight:    1,
                        color:         "#000",
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontFamily:    '"JetBrains Mono",monospace',
                        fontSize:      "0.5rem",
                        fontWeight:    700,
                        letterSpacing: "0.14em",
                        color:         "#bbb",
                        marginTop:     4,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Offset shadow accent bar */}
        <div
          style={{
            height:     10,
            background: "#FBFF48",
            border:     "2px solid #000",
            marginTop:  "-2px",
            marginLeft: "10px",
            marginRight:"-10px",
          }}
        />

        <style>{`
          @media (max-width: 700px) {
            .about-inner-grid {
              grid-template-columns: 1fr !important;
            }
            .about-inner-grid > div:first-child {
              border-right: none !important;
              border-bottom: 3px solid #000;
            }
          }
        `}</style>
      </section>
    </>
  );
}