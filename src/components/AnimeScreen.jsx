"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ANIME_DB, ALIASES } from "./data/AnimeData.js";

const BOOT_LINES = [
  { text: "AnimeOS 1.0.0 — powered by megaplay.buzz", color: "#a78bfa", delay: 0 },
  { text: "", delay: 60 },
  { text: "[ OK ] Fetching anime catalogue...",              color: "#33FF57", delay: 160 },
  { text: "[ OK ] Validating stream endpoints...",           color: "#33FF57", delay: 320 },
  { text: "[ OK ] sub/dub language packs loaded",            color: "#33FF57", delay: 500 },
  { text: "[ OK ] 4 series · 5 seasons · 108 episodes ready",color: "#33FF57", delay: 680 },
  { text: "", delay: 780 },
  { text: "Type `help` for commands.", color: "#a0a0c0", delay: 860 },
  { text: "", delay: 920 },
];

function processCmd(raw, onWatch) {
  const lower = raw.trim().toLowerCase();
  const parts = lower.split(/\s+/);

  if (lower === "help") {
    return [
      { text: "AnimeOS commands:", color: "#c8c8e8" },
      { text: "" },
      { text: "  ls                         List available anime",    color: "#a78bfa" },
      { text: "  info <alias>               Show seasons & episodes", color: "#a78bfa" },
      { text: "  watch <alias> s<N> ep<N> <sub|dub>",                 color: "#a78bfa" },
      { text: "  clear                      Clear terminal",          color: "#a78bfa" },
      { text: "" },
      { text: "  Example:", color: "#7a7a9a" },
      { text: "    watch jjk s1 ep3 sub",  color: "#33FF57" },
      { text: "    watch jjk s2 ep9 dub",  color: "#33FF57" },
      { text: "" },
    ];
  }

  if (lower === "clear" || lower === "cls") return [{ text: "__CLEAR__" }];

  if (lower === "ls" || lower === "ls anime") {
    const rows = Object.entries(ANIME_DB).map(([key, a]) => {
      const sCount  = Object.keys(a.seasons).length;
      const epCount = Object.values(a.seasons).reduce((s, se) => s + Object.keys(se.episodes).length, 0);
      return { text: `  [${key}]  ${a.label}  —  ${sCount}s · ${epCount} eps`, color: a.color };
    });
    return [{ text: "Available anime:", color: "#c8c8e8" }, { text: "" }, ...rows, { text: "" }];
  }

  if (parts[0] === "info" && parts[1]) {
    const alias = ALIASES[parts[1]];
    const anime = alias ? ANIME_DB[alias] : null;
    if (!anime) return [
      { text: `info: '${parts[1]}' not in library.`, color: "#FF6B6B" },
      { text: `Run 'ls' to see available anime.`,    color: "#7a7a9a" },
      { text: "" },
    ];
    const lines = [{ text: anime.label, color: anime.color }, { text: "" }];
    Object.entries(anime.seasons).forEach(([sNum, s]) => {
      lines.push({ text: `  Season ${sNum} (${s.year}) — ${Object.keys(s.episodes).length} episodes`, color: "#a0a0c0" });
      Object.entries(s.episodes).forEach(([epNum, ep]) => {
        lines.push({ text: `    ep${String(epNum).padStart(2, "0")}  ${ep.title}`, color: "#7a7a9a" });
      });
      lines.push({ text: "" });
    });
    return lines;
  }

  if (parts[0] === "watch") {
    if (parts.length < 5) return [
      { text: "usage: watch <alias> s<N> ep<N> <sub|dub>", color: "#FFD93D" },
      { text: "  e.g. watch jjk s1 ep1 sub",               color: "#7a7a9a" },
      { text: "" },
    ];

    const [, aliasRaw, seasonStr, epStr, langRaw] = parts;
    const alias = ALIASES[aliasRaw];
    const anime = alias ? ANIME_DB[alias] : null;
    if (!anime) return [
      { text: `watch: '${aliasRaw}' not in library.`, color: "#FF6B6B" },
      { text: `Run 'ls' to see available anime.`,     color: "#7a7a9a" },
      { text: "" },
    ];

    const sNum  = parseInt(seasonStr.replace("s", ""));
    const epNum = parseInt(epStr.replace("ep", ""));
    const lang  = (langRaw === "dub" || langRaw === "sub") ? langRaw : null;

    if (!lang) return [{ text: `watch: language must be 'sub' or 'dub'.`, color: "#FF6B6B" }, { text: "" }];

    const season = anime.seasons[sNum];
    if (!season) return [
      { text: `watch: ${anime.label} Season ${sNum} not available.`,         color: "#FF6B6B" },
      { text: `Available seasons: ${Object.keys(anime.seasons).join(", ")}`, color: "#7a7a9a" },
      { text: "" },
    ];

    const ep = season.episodes[epNum];
    if (!ep) return [
      { text: `watch: Episode ${epNum} not found in S${sNum}.`,                   color: "#FF6B6B" },
      { text: `Episodes 1–${Object.keys(season.episodes).length} available.`, color: "#7a7a9a" },
      { text: "" },
    ];

    setTimeout(() => onWatch({ anime, season: sNum, ep: epNum, lang, epId: ep.id, epTitle: ep.title }), 600);

    return [
      { text: `» Loading ${anime.label} S${sNum} EP${epNum} [${lang.toUpperCase()}]...`, color: anime.color },
      { text: "" },
      { text: `  [ OK ] Resolving stream endpoint`,      color: "#33FF57" },
      { text: `  [ OK ] Episode: ${ep.title}`,            color: "#33FF57" },
      { text: `  [ OK ] Language: ${lang.toUpperCase()}`, color: "#33FF57" },
      { text: "" },
      { text: `  Starting playback...`, color: "#e6edf3" },
      { text: "" },
    ];
  }

  return [
    { text: `bash: ${raw.trim()}: command not found`, color: "#FF6B6B" },
    { text: `Type 'help' for available commands.`,    color: "#7a7a9a" },
    { text: "" },
  ];
}

function AdBlockPlayer({ epId, lang, title }) {
  const embedSrc = `https://megaplay.buzz/stream/s-2/${epId}/${lang}`;
  const AD_SELECTORS = [
    '[id*="ad"]','[class*="ad-"]','[class*="-ad"]','[id*="ads"]',
    '[id*="popup"]','[class*="popup"]','[id*="overlay"]','[class*="overlay"]',
    '[id*="banner"]','[class*="banner"]','[id*="interstitial"]','[class*="interstitial"]',
    'div[style*="z-index: 9999"]','div[style*="z-index:9999"]',
    'div[style*="z-index: 99999"]','div[style*="z-index:99999"]',
    'div[style*="position:fixed"]','div[style*="position: fixed"]',
    'a[target="_blank"][style]',
  ].join(",");

  const srcdoc = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:100%;height:100%;background:#000;overflow:hidden}
  #player{width:100%;height:100%;border:none;display:block}
  ${AD_SELECTORS}{display:none!important;visibility:hidden!important;pointer-events:none!important}
</style></head><body>
<iframe id="player" src="${embedSrc}"
  allow="autoplay;fullscreen;encrypted-media" allowfullscreen
  sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
></iframe>
<script>
  window.open=()=>null;
  Object.defineProperty(window,'open',{value:()=>null,writable:false});
  const SEL=${JSON.stringify(AD_SELECTORS)};
  function nuke(root){if(!root||!root.querySelectorAll)return;try{root.querySelectorAll(SEL).forEach(el=>{if(el.id!=='player')el.style.cssText='display:none!important;visibility:hidden!important;pointer-events:none!important;'});}catch(e){}}
  new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)nuke(n.parentElement)}))).observe(document.documentElement,{childList:true,subtree:true});
  nuke(document.body);
  document.getElementById('player').addEventListener('load',function(){
    try{const doc=this.contentDocument;if(!doc)return;this.contentWindow.open=()=>null;const s=doc.createElement('style');s.textContent=SEL+'{display:none!important;visibility:hidden!important;pointer-events:none!important;}';(doc.head||doc.documentElement).appendChild(s);new MutationObserver(()=>nuke(doc.body)).observe(doc.documentElement,{childList:true,subtree:true});}catch(e){}
  });
<\/script></body></html>`;

  return (
    <iframe
      srcDoc={srcdoc}
      title={title}
      style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
    />
  );
}

export default function AnimeScreen({ onExit }) {
  const [phase, setPhase]       = useState("boot");
  const [bootIdx, setBootIdx]   = useState(0);
  const [lines, setLines]       = useState([]);
  const [input, setInput]       = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [history, setHistory]   = useState([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [booted, setBooted]     = useState(false);
  const [watching, setWatching] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState("jjk");

  const termRef  = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bootIdx >= BOOT_LINES.length) { setBooted(true); setPhase("browse"); return; }
    const item = BOOT_LINES[bootIdx];
    const tid = setTimeout(() => {
      setLines(l => [...l, { text: item.text, color: item.color }]);
      setBootIdx(i => i + 1);
    }, item.delay);
    return () => clearTimeout(tid);
  }, [bootIdx]);

  useEffect(() => { if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight; }, [lines, booted]);
  useEffect(() => { if (booted && inputRef.current) inputRef.current.focus({ preventScroll: true }); }, [booted]);

  // Keep cursorPos in sync when input changes via history/tab
  useEffect(() => { setCursorPos(input.length); }, [input]);

  const handleWatch     = useCallback((info) => { setWatching(info); setPhase("watch"); }, []);
  const handleBackFromWatch = useCallback(() => {
    setPhase("browse"); setWatching(null);
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80);
  }, []);

  const submit = useCallback(() => {
    if (!input.trim()) return;
    const result = processCmd(input, handleWatch);
    if (result[0]?.text === "__CLEAR__") {
      setLines([]); setHistory(h => [input, ...h]); setHistIdx(-1); setInput(""); setCursorPos(0); return;
    }
    setLines(l => [...l, { text: `user@animeos:~$ ${input}`, color: "#a0a0c0", isPrompt: true }, ...result]);
    setHistory(h => [input, ...h]); setHistIdx(-1); setInput(""); setCursorPos(0);
  }, [input, handleWatch]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); submit(); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      const val = history[next] ?? "";
      setInput(val); setCursorPos(val.length);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      const val = next === -1 ? "" : history[next];
      setInput(val); setCursorPos(val.length);
    } else if (e.key === "ArrowLeft") {
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
      const cmds = ["watch jjk s1 ep", "watch jjk s2 ep", "watch csm s1 ep", "watch sl s1 ep", "watch dn s1 ep", "ls", "info jjk", "info dn", "help", "clear"];
      const match = cmds.find(c => c.startsWith(lower) && c !== lower);
      if (match) { setInput(match); setCursorPos(match.length); }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault(); setLines([]);
    }
  };

  const onKeyUp = (e) => {
    e.stopPropagation();
    if (inputRef.current) setCursorPos(inputRef.current.selectionStart ?? input.length);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
    setCursorPos(e.target.selectionStart ?? e.target.value.length);
  };

  // ── BOOT ──────────────────────────────────────────────────────────────────
  if (phase === "boot") {
    return (
      <div style={{
        position: "absolute", inset: 0, background: "#090912",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace", gap: 24,
      }}>
        <style>{`
          @keyframes anSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes anPulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
        `}</style>
        <div style={{ position: "relative", width: 72, height: 72 }}>
          <svg viewBox="0 0 72 72" style={{ position: "absolute", inset: 0, animation: "anSpin 3s linear infinite" }}>
            <circle cx="36" cy="36" r="32" fill="none" stroke="#a78bfa22" strokeWidth="2" />
            <circle cx="36" cy="36" r="32" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="55 145" strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em" }}>ANI</div>
        </div>
        <div>
          <div style={{ color: "#a78bfa", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", marginBottom: 12, textAlign: "center" }}>ANIME OS v1.0</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minHeight: 110, maxWidth: 360 }}>
            {lines.map((l, i) => (
              <div key={i} style={{ fontSize: "0.5rem", color: l.color || "#7a7a9a", letterSpacing: "0.04em", lineHeight: 1.7 }}>
                {l.text || "\u00a0"}
              </div>
            ))}
            {lines.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa", animation: "anPulse 1.2s ease-in-out infinite" }} />
                <span style={{ fontSize: "0.44rem", color: "#a78bfacc", letterSpacing: "0.12em" }}>INITIALISING...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── WATCH ─────────────────────────────────────────────────────────────────
  if (phase === "watch" && watching) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#000", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace" }}>
        <style>{`@keyframes anPulse { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
        <div style={{
          height: 32, background: "#0d0d1a", borderBottom: "1px solid #2a2a40",
          display: "flex", alignItems: "center", padding: "0 12px", gap: 10, flexShrink: 0,
        }}>
          <button
            onClick={handleBackFromWatch}
            style={{ background: "transparent", border: "1px solid #555570", color: "#a0a0c0", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", padding: "2px 10px", cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.color="#a78bfa"; e.currentTarget.style.borderColor="#a78bfa"; }}
            onMouseLeave={e => { e.currentTarget.style.color="#a0a0c0"; e.currentTarget.style.borderColor="#555570"; }}
          >← ANIME OS</button>
          <div style={{ width: 1, height: 12, background: "#2a2a40" }} />
          <span style={{ color: "#a78bfa", fontSize: "0.52rem", fontWeight: 700 }}>{watching.anime.label}</span>
          <span style={{ color: "#7a7a9a", fontSize: "0.48rem" }}>S{watching.season} · EP{watching.ep}</span>
          <span style={{ color: "#a0a0c0", fontSize: "0.46rem" }}>— {watching.epTitle}</span>
          <span style={{ fontSize: "0.34rem", fontWeight: 700, color: watching.lang === "sub" ? "#a78bfa" : "#58a6ff", border: `1px solid ${watching.lang === "sub" ? "#a78bfa44" : "#58a6ff44"}`, padding: "1px 5px", letterSpacing: "0.1em" }}>
            {watching.lang.toUpperCase()}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#33FF57", animation: "anPulse 2s ease-in-out infinite" }} />
            <span style={{ color: "#33FF57", fontSize: "0.44rem", letterSpacing: "0.1em" }}>STREAMING</span>
            <div style={{ width: 1, height: 10, background: "#2a2a40" }} />
            <button
              onClick={onExit}
              style={{ background: "transparent", border: "none", color: "#555570", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.44rem", cursor: "pointer", padding: "0 2px", transition: "color 0.15s", letterSpacing: "0.06em" }}
              onMouseEnter={e => e.currentTarget.style.color = "#FF6B6B"}
              onMouseLeave={e => e.currentTarget.style.color = "#555570"}
            >EXIT</button>
          </div>
        </div>
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <AdBlockPlayer epId={watching.epId} lang={watching.lang} title={`${watching.anime.label} S${watching.season} EP${watching.ep}`} />
        </div>
      </div>
    );
  }

  // ── BROWSE ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "absolute", inset: 0, background: "#090912", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", overflow: "hidden" }}>
      <style>{`@keyframes anPulse { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>

      {/* OS top bar */}
      <div style={{ height: 26, background: "#0d0d1a", borderBottom: "1px solid #1e1e30", display: "flex", alignItems: "center", padding: "0 10px", gap: 10, flexShrink: 0 }}>
        <span style={{ color: "#a78bfa", fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.08em" }}>
          ANIME<span style={{ color: "#33FF57" }}>OS</span>
        </span>
        {["Library", "Terminal", "Settings"].map(item => (
          <span key={item} style={{ color: "#555570", fontSize: "0.48rem", cursor: "default" }}>{item}</span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#555570", fontSize: "0.44rem" }}>megaplay.buzz</span>
          <div style={{ width: 1, height: 10, background: "#2a2a40" }} />
          <button
            onClick={onExit}
            style={{ background: "transparent", border: "none", color: "#555570", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.46rem", cursor: "pointer", padding: "0 4px", transition: "color 0.15s", letterSpacing: "0.04em" }}
            onMouseEnter={e => e.currentTarget.style.color = "#FF6B6B"}
            onMouseLeave={e => e.currentTarget.style.color = "#555570"}
          >EXIT ANIMEOS</button>
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 0 }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ background: "#0a0a14", borderRight: "1px solid #1e1e30", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "7px 10px 6px", borderBottom: "1px solid #1e1e30", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#a78bfa", fontSize: "0.44rem" }}>◆</span>
            <span style={{ color: "#7a7a9a", fontSize: "0.44rem", letterSpacing: "0.14em" }}>LIBRARY</span>
            <span style={{ marginLeft: "auto", color: "#555570", fontSize: "0.4rem" }}>
              {Object.keys(ANIME_DB).length} title{Object.keys(ANIME_DB).length !== 1 ? "s" : ""}
            </span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px", display: "flex", flexDirection: "column", gap: 6, scrollbarWidth: "thin", scrollbarColor: "#2a2a40 #090912" }}>
            {Object.entries(ANIME_DB).map(([key, anime]) => {
              const isActive = selectedAnime === key;
              return (
                <div
                  key={key}
                  onClick={() => setSelectedAnime(key)}
                  style={{
                    background: isActive ? "#0f0f1e" : "#0c0c18",
                    border: `1px solid ${isActive ? anime.color + "55" : "#1e1e30"}`,
                    borderLeft: `3px solid ${isActive ? anime.color : "#2a2a40"}`,
                    borderRadius: 2,
                    padding: "10px 10px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isActive && (
                    <div style={{ position: "absolute", top: -12, right: -12, width: 60, height: 60, background: `radial-gradient(circle, ${anime.color}12, transparent 70%)`, pointerEvents: "none" }} />
                  )}
                  <div style={{
                    color: isActive ? "#e6edf3" : "#a0a0c0",
                    fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.02em",
                    marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {anime.label}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                    <span style={{ color: anime.color, fontSize: "0.34rem", fontWeight: 700, border: `1px solid ${anime.color}44`, padding: "1px 4px", letterSpacing: "0.1em" }}>LIVE</span>
                    <span style={{ color: "#555570", fontSize: "0.38rem", letterSpacing: "0.04em" }}>[{key}]</span>
                  </div>
                  <div style={{ background: "#07070d", border: "1px solid #2a2a40", borderRadius: 2, padding: "5px 8px" }}>
                    <div style={{ color: "#555570", fontSize: "0.35rem", marginBottom: 3, letterSpacing: "0.1em" }}>COMMAND</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "#f78166", fontSize: "0.44rem" }}>$</span>
                      <span style={{ color: isActive ? "#7ab87a" : "#555570", fontSize: "0.44rem", letterSpacing: "0.02em" }}>
                        watch {key} s1 ep1 sub
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "5px 10px", borderTop: "1px solid #1e1e30", display: "flex", justifyContent: "space-between", color: "#555570", fontSize: "0.38rem", letterSpacing: "0.06em" }}>
            <span>ANIMEOS v1.0</span>
            <span>UPAYAN © 2025</span>
          </div>
        </div>

        {/* ── TERMINAL ── */}
        <div
          style={{ display: "flex", flexDirection: "column", background: "#090912", overflow: "hidden" }}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          <div style={{ height: 24, background: "#0d0d1a", borderBottom: "1px solid #1e1e30", display: "flex", alignItems: "center", padding: "0 10px", gap: 5, flexShrink: 0 }}>
            {[["#ff5f57","●"],["#febc2e","●"],["#28c840","●"]].map(([c, d], i) => (
              <span key={i} style={{ color: c, fontSize: "0.55rem", lineHeight: 1 }}>{d}</span>
            ))}
            <span style={{ marginLeft: 8, color: "#6e6e8a", fontSize: "0.46rem", letterSpacing: "0.04em" }}>
              Terminal — user@animeos: ~
            </span>
            <div style={{ marginLeft: "auto", borderBottom: "2px solid #a78bfa66", padding: "1px 10px 2px", fontSize: "0.44rem", color: "#7a7a9a" }}>
              anime-shell ×
            </div>
          </div>

          <div ref={termRef} style={{ flex: 1, overflowY: "auto", padding: "8px 14px 4px", display: "flex", flexDirection: "column", cursor: "text", scrollbarWidth: "thin", scrollbarColor: "#2a2a40 #090912" }}>
            {lines.map((line, i) =>
              line.isPrompt
                ? <AnimePromptLine key={i} cmd={line.text.replace("user@animeos:~$ ", "")} />
                : <AnimeOutputLine key={i} line={line} />
            )}

            {booted && (
              <div style={{ display: "flex", alignItems: "center", marginTop: 1, flexShrink: 0 }}>
                <AnimePromptLabel />
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
                    spellCheck={false} autoComplete="off"
                    style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", background: "transparent", border: "none", outline: "none", color: "transparent", caretColor: "transparent", fontSize: "0.6rem", fontFamily: "inherit", zIndex: 2 }}
                  />
                  <div style={{ fontSize: "0.6rem", color: "#e6edf3", lineHeight: 1.5, letterSpacing: "0.02em", minHeight: "1em", pointerEvents: "none", whiteSpace: "pre" }}>
                    <AnimeSyntaxWithCursor value={input} cursorPos={cursorPos} />
                  </div>
                </div>
              </div>
            )}
            <div style={{ height: 8, flexShrink: 0 }} />
          </div>

          <div style={{ height: 18, background: "#0d0d1a", borderTop: "1px solid #1e1e30", display: "flex", alignItems: "center", padding: "0 12px", gap: 14, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa66" }} />
              <span style={{ color: "#6e6e8a", fontSize: "0.42rem" }}>anime-shell</span>
            </div>
            <span style={{ color: "#6e6e8a", fontSize: "0.42rem" }}>UTF-8</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
              <span style={{ color: "#6e6e8a", fontSize: "0.42rem" }}>Tab: autocomplete</span>
              <span style={{ color: "#6e6e8a", fontSize: "0.42rem" }}>↑↓: history</span>
              <span style={{ color: "#6e6e8a", fontSize: "0.42rem" }}>Ctrl+L: clear</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimePromptLabel() {
  return (
    <span style={{ fontSize: "0.6rem", whiteSpace: "nowrap", lineHeight: 1.5 }}>
      <span style={{ color: "#a78bfa" }}>user</span>
      <span style={{ color: "#6e6e8a" }}>@</span>
      <span style={{ color: "#58a6ff" }}>animeos</span>
      <span style={{ color: "#6e6e8a" }}>:~</span>
    </span>
  );
}

function AnimePromptLine({ cmd }) {
  return (
    <div style={{ fontSize: "0.6rem", lineHeight: 1.55, letterSpacing: "0.02em", whiteSpace: "pre-wrap", wordBreak: "break-all", flexShrink: 0 }}>
      <span style={{ color: "#a78bfa" }}>user</span>
      <span style={{ color: "#6e6e8a" }}>@</span>
      <span style={{ color: "#58a6ff" }}>animeos</span>
      <span style={{ color: "#6e6e8a" }}>:~</span>
      <span style={{ color: "#f78166" }}>$</span>
      <span style={{ color: "#8b949e" }}> </span>
      <AnimeSyntax value={cmd} />
    </div>
  );
}

function AnimeOutputLine({ line }) {
  if (line.text === "") return <div style={{ height: "0.65em", flexShrink: 0 }} />;
  return (
    <div style={{ fontSize: "0.6rem", lineHeight: 1.55, color: line.color || "#7a7a9a", letterSpacing: "0.02em", whiteSpace: "pre-wrap", wordBreak: "break-all", flexShrink: 0 }}>
      {line.text}
    </div>
  );
}

function AnimeSyntax({ value }) {
  const parts   = value.split(" ");
  const palette = ["#a78bfa", "#cae8ff", "#a5d6ff", "#d2a8ff", "#e6edf3"];
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

// Live input with cursor rendered at the correct position
function AnimeSyntaxWithCursor({ value, cursorPos }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Reset blink on cursor move
  useEffect(() => { setOn(true); }, [cursorPos]);

  const palette = ["#a78bfa", "#cae8ff", "#a5d6ff", "#d2a8ff", "#e6edf3"];

  const colourAt = (charIdx) => {
    const wordIdx = value.slice(0, charIdx).split(" ").length - 1;
    return palette[Math.min(wordIdx, palette.length - 1)];
  };

  const before    = value.slice(0, cursorPos);
  const atCursor  = value[cursorPos] ?? "";
  const after     = value.slice(cursorPos + 1);

  return (
    <span>
      {before.split("").map((ch, i) => (
        <span key={`b${i}`} style={{ color: colourAt(i) }}>{ch}</span>
      ))}

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
            color: on ? "#090912" : colourAt(cursorPos),
            fontSize: "inherit", lineHeight: "inherit",
          }}>
            {atCursor}
          </span>
        )}
      </span>

      {after.split("").map((ch, i) => (
        <span key={`a${i}`} style={{ color: colourAt(cursorPos + 1 + i) }}>{ch}</span>
      ))}
    </span>
  );
}