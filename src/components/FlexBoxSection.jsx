"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ConsoleHomeScreen from "./ConsoleHomeScreen.jsx";
import NameEntryScreen from "./NameEntryScreen.jsx";
import QuantumMazeGame from "./QuantumMazeGame.jsx";
import AnimeScreen from "./AnimeScreen.jsx";

const AetherverseGame = dynamic(() => import("./AetherverseGame.jsx"), {
  ssr: false,
  loading: () => (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0d1a" }}>
      <span style={{ color: "#33FF57", fontSize: "0.8rem", letterSpacing: "0.1em", fontFamily: "monospace" }}>
        LOADING ENGINE...
      </span>
    </div>
  ),
});

export default function FlexBoxSection() {
  const [phase, setPhase] = useState("console");
  const [playerName, setPlayerName] = useState("Explorer");

  const handleConsoleSelect = (gameId) => {
    if (gameId === "metaverse") setPhase("name_entry");
    if (gameId === "quantum")   setPhase("quantum");
    if (gameId === "anime")     setPhase("anime");
  };

  const handleNameEnter = (name) => { setPlayerName(name); setPhase("metaverse"); };
  const handleExitToConsole = () => setPhase("console");

  const controlsHint =
    phase === "metaverse"  ? "WASD · MOVE  |  Z · INTERACT" :
    phase === "quantum"    ? "WASD / ARROWS · MOVE  |  REACH THE TROPHY" :
    phase === "anime"      ? "3PIECE.QZZ.IO  |  STREAMING ANIME" :
    phase === "name_entry" ? "TYPE YOUR NAME  |  ENTER · CONFIRM" :
                             "TYPE COMMAND IN TERMINAL  |  help FOR COMMANDS";

  const screenTitle =
    phase === "metaverse"  ? "AETHERVERSE v1.2" :
    phase === "name_entry" ? "LOGIN" :
    phase === "quantum"    ? "QUANTUM REALM" :
    phase === "anime"      ? "ANIME STREAMER" :
                             "GAME_HUB";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@400;700;900&family=Bebas+Neue&display=swap');

        .fb-section { font-family: 'JetBrains Mono', monospace; }

        @media (max-width: 1023px) {
          .fb-section-wrapper { display: none !important; }
        }

        @keyframes fbBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fbFadein { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fbFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fbSweep  { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes fbPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(51,255,87,0.4)} 70%{box-shadow:0 0 0 8px rgba(51,255,87,0)} }

        .mv-fadein { animation: fbFadein 0.5s cubic-bezier(0.25,1,0.5,1) both; }

        .fb-exit-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          background: transparent;
          border: 1px solid #444;
          color: #888;
          padding: 4px 12px;
          cursor: pointer;
          letter-spacing: 0.06em;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
      `}</style>

      <section
        className="fb-section fb-section-wrapper"
        id="metaverse"
        style={{
          background: "#080808",
          borderTop: "4px solid #000",
          borderBottom: "4px solid #000",
          padding: "5rem 0 6rem",
          position: "relative",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(51,255,87,0.03) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(51,255,87,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #080808 100%)",
          }}
        />

        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            padding: "0 1.5rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* ══ SECTION HEADER ══ */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3.5rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "#33FF57",
                  marginBottom: "0.7rem",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 2,
                    background: "#33FF57",
                    display: "inline-block",
                  }}
                />
                INTERACTIVE_ZONE.EXE
              </div>

              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3rem, 8vw, 6.5rem)",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  lineHeight: 0.9,
                  color: "#fff",
                  margin: 0,
                }}
              >
                FLEX
                <span
                  style={{
                    WebkitTextStroke: "2px #33FF57",
                    color: "transparent",
                    marginLeft: "0.15em",
                  }}
                >
                  _BOX
                </span>
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0d1a0d",
                  border: "1px solid #33FF5733",
                  padding: "6px 14px",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#33FF57",
                    animation:
                      "fbPulse 2s infinite, fbBlink 1.5s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    color: "#33FF57",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                  }}
                >
                  METAVERSE_ACTIVE
                </span>
              </div>

              <div style={{ display: "flex", gap: 1 }}>
                {[
                  ["3", "APPS"],
                  ["10", "COMMANDS"],
                  ["3", "ANIME"],
                ].map(([n, l]) => (
                  <div
                    key={l}
                    style={{
                      background: "#111",
                      border: "1px solid #1f1f1f",
                      padding: "6px 14px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: "1.4rem",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {n}
                    </div>
                    {/* was #333 → #888 */}
                    <div
                      style={{
                        fontSize: "0.38rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "#888",
                        marginTop: 2,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ TV + MASCOTS WRAPPER ══ */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                bottom: "18%",
                right: "clamp(-190px, -14vw, -140px)",
                width: "clamp(120px, 13vw, 190px)",
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 5,
                animation: "fbFloat 4s ease-in-out infinite",
              }}
            >
              <img
                src="/mascot2.png"
                alt="mascot2"
                style={{
                  width: "100%",
                  display: "block",
                  filter:
                    "drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)",
                }}
              />
            </div>

            <div
              style={{
                position: "absolute",
                top: "-2%",
                left: "60%",
                transform: "translateX(-50%) translateY(-85%)",
                width: "clamp(70px, 7vw, 110px)",
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 90,
              }}
            >
              <img
                src="/chibi3.gif"
                alt="chibi3"
                style={{
                  width: "100%",
                  display: "block",
                  filter:
                    "drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000)",
                }}
              />
            </div>

            {/* ── TV FRAME ── */}
            <div
              onKeyDown={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
              style={{
                background: "#0d0d0d",
                border: "3px solid #1f1f1f",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow:
                  "0 0 0 1px #000, 8px 8px 0 #33FF57, 0 32px 80px rgba(0,0,0,0.8)",
              }}
            >
              {/* Chrome top bar */}
              <div
                style={{
                  background: "#111",
                  borderBottom: "2px solid #1f1f1f",
                  padding: "0 16px",
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "25%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
                    animation: "fbSweep 4s linear infinite",
                    pointerEvents: "none",
                  }}
                />

                {[
                  ["#ff5f57", "#c0392b"],
                  ["#febc2e", "#c07a00"],
                  ["#28c840", "#1a8a2a"],
                ].map(([c, h], i) => (
                  <div
                    key={i}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: c,
                      border: `1.5px solid ${h}`,
                      flexShrink: 0,
                    }}
                  />
                ))}

                <div
                  style={{
                    marginLeft: 10,
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderBottom: "none",
                    padding: "4px 14px 5px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#33FF57",
                      animation: "fbBlink 2s ease-in-out infinite",
                    }}
                  />
                  {/* was #666 → #999 */}
                  <span
                    style={{
                      color: "#999",
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    PORTFOLIO_OS v2.1
                  </span>
                  {/* was #2a2a2a → #555 */}
                  <span style={{ color: "#555", fontSize: "0.5rem" }}>—</span>
                  <span
                    style={{
                      color: "#33FF57",
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {screenTitle}
                  </span>
                </div>

                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {/* was #2a2a2a → #666 */}
                  <span
                    style={{
                      color: "#666",
                      fontSize: "0.46rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      borderLeft: "1px solid #333",
                      paddingLeft: 10,
                    }}
                  >
                    {controlsHint}
                  </span>
                </div>
              </div>

              {/* Screen */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#0a0a12",
                  overflow: "hidden",
                }}
              >
                {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                  (pos) => {
                    const s = {
                      position: "absolute",
                      zIndex: 20,
                      pointerEvents: "none",
                    };
                    if (pos === "top-left") {
                      s.top = 8;
                      s.left = 8;
                    }
                    if (pos === "top-right") {
                      s.top = 8;
                      s.right = 8;
                    }
                    if (pos === "bottom-left") {
                      s.bottom = 8;
                      s.left = 8;
                    }
                    if (pos === "bottom-right") {
                      s.bottom = 8;
                      s.right = 8;
                    }
                    const isRight = pos.includes("right");
                    const isBottom = pos.includes("bottom");
                    return (
                      <div key={pos} style={s}>
                        <svg width="12" height="12" viewBox="0 0 12 12">
                          <path
                            d={
                              isRight
                                ? isBottom
                                  ? "M12,0 L12,12 L0,12"
                                  : "M0,0 L12,0 L12,12"
                                : isBottom
                                  ? "M0,0 L0,12 L12,12"
                                  : "M12,0 L0,0 L0,12"
                            }
                            fill="none"
                            stroke="#33FF57"
                            strokeWidth="1.5"
                            opacity="0.4"
                          />
                        </svg>
                      </div>
                    );
                  },
                )}

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 14,
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 13,
                    background:
                      "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)",
                  }}
                />

                {phase === "console" && (
                  <div
                    className="mv-fadein"
                    style={{ position: "absolute", inset: 0, zIndex: 10 }}
                  >
                    <ConsoleHomeScreen onSelect={handleConsoleSelect} />
                  </div>
                )}
                {phase === "name_entry" && (
                  <div
                    className="mv-fadein"
                    style={{ position: "absolute", inset: 0, zIndex: 10 }}
                  >
                    <NameEntryScreen
                      onEnter={handleNameEnter}
                      onBack={() => setPhase("console")}
                    />
                  </div>
                )}
                {phase === "metaverse" && (
                  <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
                    <AetherverseGame
                      playerName={playerName}
                      onExit={handleExitToConsole}
                    />
                  </div>
                )}
                {phase === "quantum" && (
                  <div
                    className="mv-fadein"
                    style={{ position: "absolute", inset: 0, zIndex: 10 }}
                  >
                    <QuantumMazeGame onExit={handleExitToConsole} />
                  </div>
                )}
                {phase === "anime" && (
                  <div
                    className="mv-fadein"
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 10,
                      overflow: "hidden",
                    }}
                  >
                    <AnimeScreen onExit={handleExitToConsole} />
                  </div>
                )}
              </div>

              {/* Chrome bottom bar */}
              <div
                style={{
                  background: "#0d0d0d",
                  borderTop: "2px solid #1a1a1a",
                  padding: "0 16px",
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexShrink: 0,
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#33FF57",
                      }}
                    />
                    {/* was #2a2a2a → #666 */}
                    <span
                      style={{
                        color: "#666",
                        fontSize: "0.42rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      PIXI.JS v8
                    </span>
                  </div>
                  <div style={{ width: 1, height: 12, background: "#333" }} />
                  <span
                    style={{
                      color: "#666",
                      fontSize: "0.42rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    NEXT.JS 14
                  </span>
                  <div style={{ width: 1, height: 12, background: "#333" }} />
                  <span
                    style={{
                      color: "#666",
                      fontSize: "0.42rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    REACT 18
                  </span>
                </div>

                <div>
                  {phase === "metaverse" && (
                    <button
                      className="fb-exit-btn"
                      onClick={handleExitToConsole}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ff4444";
                        e.currentTarget.style.borderColor = "#ff4444";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#888";
                        e.currentTarget.style.borderColor = "#444";
                      }}
                    >
                      ← EXIT
                    </button>
                  )}
                  {phase === "name_entry" && (
                    <button
                      className="fb-exit-btn"
                      onClick={() => setPhase("console")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#33FF57";
                        e.currentTarget.style.borderColor = "#33FF57";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#888";
                        e.currentTarget.style.borderColor = "#444";
                      }}
                    >
                      ← BACK
                    </button>
                  )}
                  {(phase === "anime" || phase === "quantum") && (
                    <button
                      className="fb-exit-btn"
                      onClick={handleExitToConsole}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FF9FF3";
                        e.currentTarget.style.borderColor = "#FF9FF3";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#888";
                        e.currentTarget.style.borderColor = "#444";
                      }}
                    >
                      ← EXIT
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Footer meta strip */}
            <div
              style={{
                marginTop: "1.2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  ["APPS", "3"],
                  ["COMMANDS", "10"],
                  ["ENGINE", "NEXTJS v16"],
                ].map(([k, v]) => (
                  <span
                    key={k}
                    style={{
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {/* was #2a2a2a / #444 → #555 / #888 */}
                    <span style={{ color: "#555" }}>{k}: </span>
                    <span style={{ color: "#888" }}>{v}</span>
                  </span>
                ))}
              </div>
              {/* was #1f1f1f → #555 */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.46rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#555",
                }}
              >
                BUILT_BY: UPAYAN © 2025
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}