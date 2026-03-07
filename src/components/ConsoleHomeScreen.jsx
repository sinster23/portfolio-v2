"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const GAMES = [
  {
    id: "metaverse",
    cmd: "aetherverse",
    label: "Aetherverse",
    subtitle: "Pixel office world · PIXI.js",
    version: "v1.2.0",
    tag: "LIVE",
    tagColor: "#33FF57",
    icon: "🏙️",
    desc: "Explore a living pixel office. Walk around, discover interactable objects & meet NPCs.",
    controls: "WASD to move · Z to interact",
    color: "#33FF57",
    available: true,
    size: "4.2 MB",
  },
  {
    id: "quantum",
    cmd: "quantum",
    label: "Quantum Realm",
    subtitle: "Physics particle universe",
    version: "v0.1.0",
    tag: "LIVE",
    tagColor: "#FF6B6B",
    icon: "⚛️",
    desc: "Navigate a procedurally generated particle universe. Physics-based puzzles await.",
    controls: "Arrow keys to move",
    color: "#FF6B6B",
    available: true,
    size: "1.8 MB",
  },
  {
    id: "anime",
    cmd: "anime",
    label: "Anime Streamer",
    subtitle: "megaplay.buzz · by upayan",
    version: "v1.0.0",
    tag: "LIVE",
    tagColor: "#FF9FF3",
    icon: "🎌",
    desc: "Handpicked anime episodes streamed directly in-browser. Zero buffering.",
    controls: "Click to play",
    color: "#FF9FF3",
    available: true,
    size: "stream",
  },
];

const BOOT_LINES = [
  { text: "PortfolioOS 2.1.0 LTS (GNU/Linux 6.5.0-upayan)", color: "#ccc", delay: 0 },
  { text: "", delay: 80 },
  { text: "[ OK ] Starting PIXI.js render engine...", color: "#33FF57", delay: 160 },
  { text: "[ OK ] Mounting world filesystem...", color: "#33FF57", delay: 280 },
  { text: "[ OK ] Loading NPC behaviour trees...", color: "#33FF57", delay: 400 },
  { text: "[ OK ] quantum_realm: module compiled successfully", color: "#33FF57", delay: 520 },
  { text: "[ OK ] anime_streamer: stream endpoint ready", color: "#33FF57", delay: 620 },
  { text: "", delay: 720 },
  { text: "Welcome back, upayan. Type `help` to get started.", color: "#aaa", delay: 800 },
  { text: "", delay: 860 },
];

function processCommand(input, onSelect) {
  const raw = input.trim();
  const lower = raw.toLowerCase();
  const parts = lower.split(/\s+/);

  if (lower === "help") {
    return [
      { text: "Available commands:", color: "#ccc" },
      { text: "" },
      { text: "  dev start <app>    Launch an experience", color: "#33FF57" },
      { text: "  ls apps            List installed apps", color: "#33FF57" },
      { text: "  neofetch           System information", color: "#33FF57" },
      { text: "  whoami             Current user", color: "#33FF57" },
      { text: "  cat README         Read project info", color: "#33FF57" },
      { text: "  clear              Clear terminal", color: "#33FF57" },
      { text: "" },
      { text: "  Apps:  aetherverse · quantum · anime", color: "#666" },
      { text: "" },
    ];
  }

  if (lower === "clear" || lower === "cls") return [{ text: "__CLEAR__" }];

  if (lower === "whoami") return [{ text: "upayan", color: "#33FF57" }, { text: "" }];

  if (lower === "pwd") return [{ text: "/home/upayan/portfolio", color: "#ccc" }, { text: "" }];

  if (lower === "date") return [{ text: new Date().toString(), color: "#ccc" }, { text: "" }];

  if (lower === "cat readme" || lower === "cat readme.md") {
    return [
      { text: "# Portfolio OS — README", color: "#33FF57" },
      { text: "" },
      { text: "  Interactive section of upayan's dev portfolio.", color: "#ccc" },
      { text: "  Games are real — built with PIXI.js and React.", color: "#ccc" },
      { text: "" },
      { text: "  Launch any experience using:", color: "#888" },
      { text: "    dev start aetherverse", color: "#33FF57" },
      { text: "" },
    ];
  }

  if (lower === "ls" || lower === "ls apps" || lower === "ls -la" || lower === "ls -l") {
    return [
      { text: "total 3 apps installed", color: "#666" },
      { text: "" },
      ...GAMES.map((g) => ({
        text: `  ${g.available ? "drwxr-xr-x" : "dr--r--r--"}  upayan  ${g.size.padStart(6)}  ${g.cmd}/`,
        color: g.available ? "#33FF57" : "#666",
      })),
      { text: "" },
    ];
  }

  if (lower === "neofetch") {
    return [
      { text: "        .-.        upayan@portfolio-os", color: "#33FF57" },
      { text: "       (o o)       ──────────────────────", color: "#33FF57" },
      { text: "       | O |       OS:     PortfolioOS 2.1 LTS", color: "#ccc" },
      { text: "      /|---|\\      Host:   Next.js 14", color: "#ccc" },
      { text: "     (_|   |_)     Kernel: React 18.2.0", color: "#ccc" },
      { text: "                   Engine: PIXI.js v8", color: "#ccc" },
      { text: "                   Stack:  MERN + Python + Java", color: "#ccc" },
      { text: "                   Status: Available for hire ✓", color: "#33FF57" },
      { text: "                   Apps:   1 active / 2 pending", color: "#ccc" },
      { text: "" },
    ];
  }

  if (parts[0] === "dev" && parts[1] === "start" && parts[2]) {
    const targetCmd = parts[2];
    const game = GAMES.find((g) => g.cmd === targetCmd);

    if (!game) {
      return [
        { text: `dev: error: app '${targetCmd}' not found.`, color: "#FF6B6B" },
        { text: `Run 'ls apps' to see installed applications.`, color: "#666" },
        { text: "" },
      ];
    }

    if (!game.available) {
      return [
        { text: `dev: ${game.label} is not yet available.`, color: "#FFD93D" },
        { text: `  Status: ${game.tag}`, color: "#666" },
        { text: "" },
        { text: `  ${game.cmd} is under active development. Check back soon.`, color: "#666" },
        { text: "" },
      ];
    }

    setTimeout(() => onSelect(game.id), 900);

    if (game.id === "anime") {
      return [
        { text: `» Launching ${game.label}...`, color: "#FF9FF3" },
        { text: "" },
        { text: `  [ OK ] Resolving stream endpoint`, color: "#33FF57" },
        { text: `  [ OK ] Loading anime library`, color: "#33FF57" },
        { text: `  [ OK ] Stream ready`, color: "#33FF57" },
        { text: "" },
        { text: `  Opening streamer. Enjoy! 🎌`, color: "#e6edf3" },
        { text: "" },
      ];
    }

    return [
      { text: `» Launching ${game.label}...`, color: "#33FF57" },
      { text: "" },
      { text: `  [ OK ] Initialising PIXI render engine`, color: "#33FF57" },
      { text: `  [ OK ] Loading world assets (4 rooms)`, color: "#33FF57" },
      { text: `  [ OK ] Spawning NPC actors`, color: "#33FF57" },
      { text: "" },
      { text: `  Starting ${game.label}. Enjoy! 🚀`, color: "#e6edf3" },
      { text: "" },
    ];
  }

  if (parts[0] === "dev") {
    return [
      { text: "usage: dev <command> [args]", color: "#ccc" },
      { text: "" },
      { text: "  dev start <app>   Launch an app", color: "#ccc" },
      { text: "" },
    ];
  }

  return [
    { text: `bash: ${raw}: command not found`, color: "#FF6B6B" },
    { text: `Type 'help' for available commands.`, color: "#666" },
    { text: "" },
  ];
}

export default function ConsoleHomeScreen({ onSelect }) {
  const [lines, setLines]     = useState([]);
  const [input, setInput]     = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted]   = useState(false);
  const [bootIdx, setBootIdx] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [clock, setClock]     = useState("");

  const termRef  = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bootIdx >= BOOT_LINES.length) { setBooted(true); return; }
    const item = BOOT_LINES[bootIdx];
    const tid = setTimeout(() => {
      setLines((l) => [...l, { text: item.text, color: item.color }]);
      setBootIdx((i) => i + 1);
    }, item.delay);
    return () => clearTimeout(tid);
  }, [bootIdx]);

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setClock(n.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines, booted]);

  useEffect(() => {
    if (booted && inputRef.current) inputRef.current.focus({ preventScroll: true });
  }, [booted]);

  // Keep cursorPos in sync whenever input changes (e.g. history nav, tab complete)
  useEffect(() => {
    setCursorPos(input.length);
  }, [input]);

  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  const submit = useCallback(() => {
    if (!input.trim()) return;
    const result = processCommand(input, onSelect);

    if (result[0]?.text === "__CLEAR__") {
      setLines([]);
      setHistory((h) => [input, ...h]);
      setHistIdx(-1);
      setInput("");
      setCursorPos(0);
      return;
    }

    setLines((l) => [
      ...l,
      { text: `upayan@portfolio-os:~$ ${input}`, color: "#ccc", isPrompt: true },
      ...result,
    ]);
    setHistory((h) => [input, ...h]);
    setHistIdx(-1);
    setInput("");
    setCursorPos(0);
  }, [input, onSelect]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); e.stopPropagation(); submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      const val = history[next] ?? "";
      setInput(val);
      setCursorPos(val.length);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      const val = next === -1 ? "" : history[next];
      setInput(val);
      setCursorPos(val.length);
    } else if (e.key === "ArrowLeft") {
      // Let the browser move the real caret, then sync on next frame
      requestAnimationFrame(() => {
        if (inputRef.current) setCursorPos(inputRef.current.selectionStart ?? 0);
      });
    } else if (e.key === "ArrowRight") {
      requestAnimationFrame(() => {
        if (inputRef.current) setCursorPos(inputRef.current.selectionStart ?? input.length);
      });
    } else if (e.key === "Home") {
      requestAnimationFrame(() => setCursorPos(0));
    } else if (e.key === "End") {
      requestAnimationFrame(() => setCursorPos(input.length));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const lower = input.toLowerCase();
      if (lower.startsWith("dev start ")) {
        const partial = lower.replace("dev start ", "");
        const match = GAMES.find((g) => g.cmd.startsWith(partial));
        if (match) {
          const val = `dev start ${match.cmd}`;
          setInput(val);
          setCursorPos(val.length);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault(); setLines([]);
    }
  };

  // Sync cursor after every keystroke that changes selection (typing, delete, etc.)
  const onKeyUp = (e) => {
    e.stopPropagation();
    if (inputRef.current) setCursorPos(inputRef.current.selectionStart ?? input.length);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
    setCursorPos(e.target.selectionStart ?? e.target.value.length);
  };

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "#0d1117",
      display: "flex", flexDirection: "column",
      fontFamily: "'JetBrains Mono', monospace",
      overflow: "hidden", userSelect: "none",
    }}>

      {/* GNOME top bar */}
      <div style={{
        height: 26, background: "#161b22", borderBottom: "1px solid #21262d",
        display: "flex", alignItems: "center", padding: "0 10px", gap: 12,
        flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ color: "#58a6ff", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.04em" }}>
            Portfolio<span style={{ color: "#33FF57" }}>OS</span>
          </span>
        </div>

        {["Applications", "Places", "System"].map((item) => (
          <span key={item} style={{ color: "#6e7681", fontSize: "0.5rem", cursor: "default" }}>{item}</span>
        ))}

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#6e7681", fontSize: "0.48rem" }}>en</span>
          <span style={{ color: "#6e7681", fontSize: "0.48rem" }}>▲ ▲</span>
          <span style={{ color: "#8b949e", fontSize: "0.5rem", fontVariantNumeric: "tabular-nums", letterSpacing: "0.05em" }}>
            {clock}
          </span>
          <div style={{ width: 1, height: 10, background: "#21262d" }} />
          <span style={{ color: "#6e7681", fontSize: "0.5rem" }}>upayan ▾</span>
        </div>
      </div>

      {/* Desktop */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "210px 1fr", minHeight: 0, overflow: "hidden" }}>

        {/* Left panel */}
        <div style={{ background: "#0d1117", borderRight: "1px solid #21262d", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "7px 10px 5px", borderBottom: "1px solid #21262d", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ color: "#3fb950", fontSize: "0.46rem" }}>◆</span>
            <span style={{ color: "#6e7681", fontSize: "0.48rem", letterSpacing: "0.12em" }}>INSTALLED APPS</span>
          </div>

          <div style={{
            flex: 1, overflowY: "auto", padding: "7px 7px",
            display: "flex", flexDirection: "column", gap: 5,
            scrollbarWidth: "thin", scrollbarColor: "#21262d #0d1117",
          }}>
            {GAMES.map((game) => (
              <AppCard
                key={game.id}
                game={game}
                isHovered={hoveredId === game.id}
                onHover={() => setHoveredId(game.id)}
                onLeave={() => setHoveredId(null)}
                onClickCmd={() => {
                  if (game.available) {
                    const val = `dev start ${game.cmd}`;
                    setInput(val);
                    setCursorPos(val.length);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }
                }}
              />
            ))}
          </div>

          <div style={{ padding: "5px 10px", borderTop: "1px solid #21262d", color: "#444d56", fontSize: "0.42rem", letterSpacing: "0.06em" }}>
            PIXI.JS · NEXT.JS 14 · upayan
          </div>
        </div>

        {/* Right panel — terminal */}
        <div style={{ display: "flex", flexDirection: "column", background: "#0d1117", overflow: "hidden" }} onClick={focusInput}>

          {/* Terminal title bar */}
          <div style={{
            height: 24, background: "#161b22", borderBottom: "1px solid #21262d",
            display: "flex", alignItems: "center", padding: "0 10px", gap: 5, flexShrink: 0,
          }}>
            {[["#ff5f57","●"], ["#febc2e","●"], ["#28c840","●"]].map(([c, dot], i) => (
              <span key={i} style={{ color: c, fontSize: "0.55rem", lineHeight: 1, cursor: "default" }}>{dot}</span>
            ))}
            <span style={{ marginLeft: 8, color: "#6e7681", fontSize: "0.48rem", letterSpacing: "0.04em" }}>
              Terminal — upayan@portfolio-os: ~
            </span>
            <div style={{ marginLeft: "auto", borderBottom: "2px solid #58a6ff", padding: "1px 10px 2px", fontSize: "0.44rem", color: "#8b949e" }}>
              bash ×
            </div>
          </div>

          {/* Terminal body */}
          <div ref={termRef} style={{
            flex: 1, overflowY: "auto", padding: "8px 14px 4px",
            display: "flex", flexDirection: "column", cursor: "text",
            scrollbarWidth: "thin", scrollbarColor: "#21262d #0d1117",
          }}>
            {lines.map((line, i) =>
              line.isPrompt
                ? <PromptLine key={i} cmd={line.text.replace("upayan@portfolio-os:~$ ", "")} />
                : <OutputLine key={i} line={line} />
            )}

            {booted && (
              <div style={{ display: "flex", alignItems: "center", marginTop: 1, flexShrink: 0, position: "relative" }}>
                <PromptLabel />
                <span style={{ marginRight: 6, color: "#f78166", fontSize: "0.6rem" }}>$</span>
                <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onClick={() => {
                      requestAnimationFrame(() => {
                        if (inputRef.current) setCursorPos(inputRef.current.selectionStart ?? input.length);
                      });
                    }}
                    spellCheck={false}
                    autoComplete="off"
                    style={{
                      position: "absolute", inset: 0, opacity: 0, width: "100%",
                      background: "transparent", border: "none", outline: "none",
                      color: "transparent", caretColor: "transparent",
                      fontSize: "0.6rem", fontFamily: "inherit", zIndex: 2, cursor: "text",
                    }}
                  />
                  <div style={{ fontSize: "0.6rem", color: "#e6edf3", lineHeight: 1.5, letterSpacing: "0.02em", minHeight: "1em", pointerEvents: "none", whiteSpace: "pre" }}>
                    <SyntaxSpanWithCursor value={input} cursorPos={cursorPos} />
                  </div>
                </div>
              </div>
            )}

            <div style={{ height: 8, flexShrink: 0 }} />
          </div>

          {/* Status bar */}
          <div style={{
            height: 18, background: "#161b22", borderTop: "1px solid #21262d",
            display: "flex", alignItems: "center", padding: "0 12px", gap: 14, flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3fb950" }} />
              <span style={{ color: "#444d56", fontSize: "0.42rem" }}>bash</span>
            </div>
            <span style={{ color: "#444d56", fontSize: "0.42rem" }}>UTF-8</span>
            <span style={{ color: "#444d56", fontSize: "0.42rem" }}>LF</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
              <span style={{ color: "#444d56", fontSize: "0.42rem" }}>Tab: autocomplete</span>
              <span style={{ color: "#444d56", fontSize: "0.42rem" }}>↑↓: history</span>
              <span style={{ color: "#444d56", fontSize: "0.42rem" }}>Ctrl+L: clear</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppCard({ game, isHovered, onHover, onLeave, onClickCmd }) {
  return (
    <div
      onMouseEnter={onHover} onMouseLeave={onLeave} onClick={onClickCmd}
      style={{
        background: isHovered ? "#161b22" : "transparent",
        border: `1px solid ${isHovered ? game.color + "44" : "#21262d"}`,
        borderRadius: 4, padding: "7px 9px",
        cursor: game.available ? "pointer" : "default",
        transition: "all 0.12s", position: "relative", overflow: "hidden",
      }}
    >
      {game.available && (
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
          background: game.color,
          opacity: isHovered ? 1 : 0.4,
          boxShadow: isHovered ? `0 0 6px ${game.color}` : "none",
          transition: "all 0.15s",
        }} />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 5, paddingLeft: 6 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: game.available ? "#e6edf3" : "#484f58", fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.03em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {game.label}
          </div>
          <div style={{ color: "#444d56", fontSize: "0.42rem", marginTop: 1 }}>{game.subtitle}</div>
        </div>
        <span style={{ fontSize: "0.36rem", fontWeight: 700, color: game.tagColor, border: `1px solid ${game.tagColor}44`, padding: "1px 3px", letterSpacing: "0.05em", flexShrink: 0, opacity: game.available ? 1 : 0.5 }}>
          {game.tag}
        </span>
      </div>

      <div style={{ marginTop: 5, marginLeft: 6, background: "#0a0f1a", border: "1px solid #21262d", borderRadius: 3, padding: "2px 6px", display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ color: "#f78166", fontSize: "0.42rem" }}>$</span>
        <span style={{ color: game.available ? "#3fb950" : "#444d56", fontSize: "0.44rem", fontFamily: "monospace", letterSpacing: "0.02em" }}>
          dev start {game.cmd}
        </span>
        {game.available && isHovered && (
          <span style={{ marginLeft: "auto", color: game.color, fontSize: "0.38rem", letterSpacing: "0.04em" }}>paste ↗</span>
        )}
      </div>

      <div style={{ marginTop: 4, marginLeft: 6, display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ color: "#444d56", fontSize: "0.4rem" }}>{game.version}</span>
        <span style={{ color: "#444d56", fontSize: "0.4rem" }}>{game.size}</span>
        {game.available && <span style={{ marginLeft: "auto", color: "#3fb950", fontSize: "0.4rem" }}>● ready</span>}
        {!game.available && <span style={{ marginLeft: "auto", color: "#6e7681", fontSize: "0.4rem" }}>○ locked</span>}
      </div>
    </div>
  );
}

function PromptLabel() {
  return (
    <span style={{ fontSize: "0.6rem", whiteSpace: "nowrap", lineHeight: 1.5 }}>
      <span style={{ color: "#3fb950" }}>upayan</span>
      <span style={{ color: "#6e7681" }}>@</span>
      <span style={{ color: "#58a6ff" }}>portfolio-os</span>
      <span style={{ color: "#6e7681" }}>:~</span>
    </span>
  );
}

function PromptLine({ cmd }) {
  return (
    <div style={{ fontSize: "0.6rem", lineHeight: 1.55, letterSpacing: "0.02em", whiteSpace: "pre-wrap", wordBreak: "break-all", flexShrink: 0 }}>
      <span style={{ color: "#3fb950" }}>upayan</span>
      <span style={{ color: "#6e7681" }}>@</span>
      <span style={{ color: "#58a6ff" }}>portfolio-os</span>
      <span style={{ color: "#6e7681" }}>:~</span>
      <span style={{ color: "#f78166" }}>$</span>
      <span style={{ color: "#8b949e" }}> </span>
      <SyntaxSpan value={cmd} />
    </div>
  );
}

function OutputLine({ line }) {
  if (line.text === "") return <div style={{ height: "0.65em", flexShrink: 0 }} />;
  return (
    <div style={{ fontSize: "0.6rem", lineHeight: 1.55, color: line.color || "#6e7681", letterSpacing: "0.02em", whiteSpace: "pre-wrap", wordBreak: "break-all", flexShrink: 0 }}>
      {line.text}
    </div>
  );
}

// Used in history / submitted lines (no cursor needed)
function SyntaxSpan({ value }) {
  const parts = value.split(" ");
  const palette = ["#79c0ff", "#cae8ff", "#a5d6ff", "#d2a8ff", "#e6edf3"];
  return (
    <span>
      {parts.map((p, i) => (
        <span key={i} style={{ color: palette[Math.min(i, palette.length - 1)] }}>
          {p}{i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

// Live input line: renders text + blinking cursor at the correct character position
function SyntaxSpanWithCursor({ value, cursorPos }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Reset blink whenever cursor moves
  useEffect(() => { setOn(true); }, [cursorPos]);

  const before = value.slice(0, cursorPos);
  const atCursor = value[cursorPos] ?? "";
  const after = value.slice(cursorPos + 1);

  const palette = ["#79c0ff", "#cae8ff", "#a5d6ff", "#d2a8ff", "#e6edf3"];

  // Colour helper — word index based on position in full string
  const colourAt = (charIdx) => {
    const wordIdx = value.slice(0, charIdx).split(" ").length - 1;
    return palette[Math.min(wordIdx, palette.length - 1)];
  };

  return (
    <span>
      {/* Text before cursor */}
      {before.split("").map((ch, i) => (
        <span key={`b${i}`} style={{ color: colourAt(i) }}>{ch}</span>
      ))}

      {/* Cursor block */}
      <span style={{
        display: "inline-block",
        minWidth: "0.5em",
        height: "0.85em",
        background: on ? "#e6edf3" : "transparent",
        verticalAlign: "text-bottom",
        position: "relative",
      }}>
        {atCursor && (
          <span style={{
            position: "absolute", top: 0, left: 0,
            color: on ? "#0d1117" : colourAt(cursorPos),
            fontSize: "inherit", lineHeight: "inherit",
          }}>
            {atCursor}
          </span>
        )}
      </span>

      {/* Text after cursor */}
      {after.split("").map((ch, i) => (
        <span key={`a${i}`} style={{ color: colourAt(cursorPos + 1 + i) }}>{ch}</span>
      ))}
    </span>
  );
}