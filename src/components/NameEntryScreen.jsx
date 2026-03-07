"use client";

/**
 * NameEntryScreen.jsx
 *
 * Shown before entering the Aetherverse. Player types their name.
 * Props:
 *   onEnter(name)  — called when player confirms their name
 *   onBack         — called to return to console home screen
 */

import { useState } from "react";

export default function NameEntryScreen({ onEnter, onBack }) {
  const [inputVal, setInputVal] = useState("");

  const handleEnter = () => {
    const name = inputVal.trim() || "Explorer";
    onEnter(name);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0d1a",
        gap: "1.5rem",
        padding: "2rem",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Corner decorations */}
      {[
        { top: 12, left: 12 },
        { top: 12, right: 12 },
        { bottom: 12, left: 12 },
        { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 16,
            height: 16,
            border: "3px solid #33FF57",
            opacity: 0.4,
          }}
        />
      ))}

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          background: "transparent",
          border: "1px solid #333",
          color: "#555",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.58rem",
          fontWeight: 700,
          padding: "3px 10px",
          cursor: "pointer",
          letterSpacing: "0.08em",
          transition: "color 0.15s, border-color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#33FF57";
          e.currentTarget.style.borderColor = "#33FF57";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#555";
          e.currentTarget.style.borderColor = "#333";
        }}
      >
        ← BACK TO CONSOLE
      </button>

      {/* Glitch title */}
      <div style={{ position: "relative", textAlign: "center" }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          ENTER THE
          <br />
          <span style={{ color: "#33FF57" }}>AETHERVERSE</span>
        </h3>
        {/* Glitch ghost */}
        <h3
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "#ff4444",
            margin: 0,
            lineHeight: 1.1,
            opacity: 0.25,
            pointerEvents: "none",
            animation: "mvGlitch 3s infinite linear",
          }}
        >
          ENTER THE
          <br />
          AETHERVERSE
        </h3>
      </div>

      <p
        style={{
          color: "#555",
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textAlign: "center",
          maxWidth: 340,
          margin: 0,
        }}
      >
        Walk around. Press <span style={{ color: "#33FF57" }}>Z</span> near
        objects to interact.
      </p>

      {/* Name input */}
      <div
        style={{
          border: "3px solid #33FF57",
          boxShadow: "4px 4px 0 #33FF57",
          background: "#000",
          padding: "0.75rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <span
          style={{
            color: "#33FF57",
            fontSize: "0.85rem",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          &gt;_ NAME:
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEnter()}
          placeholder="type your name"
          maxLength={16}
          autoFocus
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "#fff",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.85rem",
            fontWeight: 700,
            caretColor: "#33FF57",
            outline: "none",
          }}
        />
      </div>

      <button
        onClick={handleEnter}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          background: "#33FF57",
          color: "#000",
          border: "3px solid #000",
          boxShadow: "5px 5px 0 #000",
          padding: "0.75rem 2.5rem",
          cursor: "pointer",
          transition: "transform 0.05s, box-shadow 0.05s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translate(2px, 2px)";
          e.currentTarget.style.boxShadow = "3px 3px 0 #000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "5px 5px 0 #000";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translate(5px, 5px)";
          e.currentTarget.style.boxShadow = "0 0 0 #000";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translate(2px, 2px)";
          e.currentTarget.style.boxShadow = "3px 3px 0 #000";
        }}
      >
        ENTER MY VERSE →
      </button>
    </div>
  );
}