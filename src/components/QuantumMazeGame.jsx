"use client";

/**
 * QuantumMazeGame.jsx
 *
 * The Quantum Maze game, adapted to run inside the MetaverseSection TV frame.
 * Stripped of next/navigation router dependency.
 * Compact layout to fit the ~900×540 viewport of the TV screen.
 *
 * Props:
 *   onExit()  — called when user clicks "← EXIT" to return to console
 */

import React, { useState, useEffect, useCallback } from "react";
import { Flame, Skull, Rocket } from "lucide-react";

// ─── Cell types ───────────────────────────────────────────────────────────────
const CELL = { G: "G", Y: "Y", R: "R" };

// ─── Maze logic (unchanged from original) ────────────────────────────────────
function generateMaze(size = 7) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      if (i === 0 && j === 0) row.push(CELL.G);
      else if (i === size - 1 && j === size - 1) row.push(CELL.G);
      else {
        const rand = Math.random();
        if (rand < 0.5) row.push(CELL.G);
        else if (rand < 0.8) row.push(CELL.Y);
        else row.push(CELL.R);
      }
    }
    grid.push(row);
  }
  return grid;
}

const cloneGrid = (grid) => grid.map((row) => [...row]);

function getAdjacent(r, c, size) {
  const adj = [];
  if (r > 0) adj.push([r - 1, c]);
  if (r < size - 1) adj.push([r + 1, c]);
  if (c > 0) adj.push([r, c - 1]);
  if (c < size - 1) adj.push([r, c + 1]);
  return adj;
}

function applyTransformation(grid, direction, playerPos, size, lastDirection) {
  let newGrid = cloneGrid(grid);

  if (direction === "right") {
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        if (newGrid[i][j] === CELL.Y) newGrid[i][j] = CELL.R;
    getAdjacent(playerPos.r, playerPos.c, size).forEach(([r, c]) => {
      if (newGrid[r][c] === CELL.G) newGrid[r][c] = CELL.Y;
    });
    if (lastDirection === "down" && playerPos.c + 1 < size) {
      for (let i = Math.max(0, playerPos.r - 1); i <= Math.min(size - 1, playerPos.r + 1); i++)
        if (newGrid[i][playerPos.c + 1] !== CELL.R) newGrid[i][playerPos.c + 1] = CELL.R;
    }
  } else if (direction === "down") {
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        if (newGrid[i][j] === CELL.R) newGrid[i][j] = CELL.G;
    const scrambleRow = 3;
    const row = [...newGrid[scrambleRow]];
    for (let i = row.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [row[i], row[j]] = [row[j], row[i]];
    }
    newGrid[scrambleRow] = row;
    if (lastDirection === "right" && playerPos.r + 1 < size) {
      for (let j = Math.max(0, playerPos.c - 1); j <= Math.min(size - 1, playerPos.c + 1); j++)
        if (newGrid[playerPos.r + 1][j] !== CELL.R) newGrid[playerPos.r + 1][j] = CELL.R;
    }
  } else if (direction === "up") {
    const yellowCells = [];
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        if (newGrid[i][j] === CELL.Y) yellowCells.push([i, j]);
    const numY = Math.floor(yellowCells.length * 0.5);
    [...yellowCells].sort(() => Math.random() - 0.5).slice(0, numY).forEach(([r, c]) => {
      newGrid[r][c] = CELL.G;
    });
    const mid = Math.floor(size / 2);
    const leftRed = [];
    for (let i = 0; i < size; i++)
      for (let j = 0; j < mid; j++)
        if (newGrid[i][j] === CELL.R) leftRed.push([i, j]);
    const numR = Math.floor(leftRed.length * 0.5);
    [...leftRed].sort(() => Math.random() - 0.5).slice(0, numR).forEach(([r, c]) => {
      newGrid[r][c] = CELL.G;
    });
  } else if (direction === "left") {
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        if (newGrid[i][j] === CELL.G) newGrid[i][j] = CELL.Y;
    const spreads = [];
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        if (grid[i][j] === CELL.R) {
          const adj = getAdjacent(i, j, size);
          if (adj.length > 0) spreads.push(adj[0]);
        }
    spreads.forEach(([r, c]) => { if (newGrid[r][c] !== CELL.R) newGrid[r][c] = CELL.R; });
  }

  return newGrid;
}

function applyQuantumCollapse(grid, size) {
  const newGrid = cloneGrid(grid);
  const startC = Math.ceil(size / 2), endR = Math.floor(size / 2);
  for (let i = 0; i < endR; i++)
    for (let j = startC; j < size; j++) {
      if (newGrid[i][j] === CELL.G) newGrid[i][j] = CELL.R;
      else if (newGrid[i][j] === CELL.R) newGrid[i][j] = CELL.G;
    }
  return newGrid;
}

function calculateEntropy(grid) {
  let total = 0, red = 0;
  grid.forEach((row) => row.forEach((cell) => { total++; if (cell === CELL.R) red++; }));
  return (red / total) * 100;
}

// ─── Single cell renderer ─────────────────────────────────────────────────────
function Cell({ cell, isPlayer, isExit, isStart, isVisited, isPermanentRed }) {
  const bg = () => {
    if (isStart && !isPlayer) return "#3b82f6";
    if (isExit && !isPlayer) return "#7c3aed";
    if (isPermanentRed) return "#7f1d1d";
    if (cell === CELL.G) return "#10b981";
    if (cell === CELL.Y) return "#f59e0b";
    if (cell === CELL.R) return "#e11d48";
    return "#374151";
  };

  const border = () => {
    if (isPlayer) return "3px solid #22d3ee";
    if (isStart && !isPlayer) return "2px solid #60a5fa";
    if (isExit) return "2px solid #a78bfa";
    if (isPermanentRed) return "2px solid #991b1b";
    if (cell === CELL.G) return "2px solid #34d399";
    if (cell === CELL.Y) return "2px solid #fbbf24";
    if (cell === CELL.R) return "2px solid #fb7185";
    return "2px solid #4b5563";
  };

  const icon = () => {
    if (isPlayer) return <img src="player.png" alt="Player" style={{ width: 44, height: 44, objectFit: "cover" }} />;
    if (isExit) return <img src="win.png" alt="Trophy" style={{ width: 44, height: 44, objectFit: "cover" }} />;
    if (isStart) return <Rocket style={{ width: 20, height: 20, color: "#fff" }} />;
    if (isPermanentRed) return <Skull style={{ width: 20, height: 20, color: "#fff" }} />;
    if (cell === CELL.G) return <img src="safe.png" alt="Safe" style={{ width: 44, height: 44, objectFit: "cover" }} />;
    if (cell === CELL.Y) return <img src="break.png" alt="Unstable" style={{ width: 44, height: 44, objectFit: "cover" }} />;
    if (cell === CELL.R) return <img src="enemy.png" alt="Enemy" style={{ width: 44, height: 44, objectFit: "cover" }} />;
    return null;
  };

  return (
    <div
      style={{
        width: 52,
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg(),
        border: border(),
        boxShadow: isPlayer ? "0 0 12px #22d3ee" : "none",
        transform: isPlayer ? "scale(1.08)" : "scale(1)",
        opacity: isVisited && !isPlayer ? 0.75 : 1,
        transition: "background 0.18s, opacity 0.18s",
        flexShrink: 0,
      }}
    >
      {icon()}
    </div>
  );
}

// ─── Main game component ──────────────────────────────────────────────────────
export default function QuantumMazeGame({ onExit }) {
  const SIZE = 7;
  const EXIT = { r: SIZE - 1, c: SIZE - 1 };

  const [grid, setGrid] = useState(() => generateMaze(SIZE));
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [visited, setVisited] = useState(new Set(["0,0"]));
  const [permanentRed, setPermanentRed] = useState(new Set());
  const [moveCount, setMoveCount] = useState(0);
  const [lastDirection, setLastDirection] = useState(null);
  const [message, setMessage] = useState("DISCOVER THE RULES!");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Entropy-based loss
  useEffect(() => {
    const entropy = calculateEntropy(grid);
    if (entropy > 40 && !gameOver) {
      setGameOver(true);
      setMessage("ENTROPY OVERLOAD! GAME OVER!");
    }
  }, [grid, gameOver]);

  // Move-limit loss
  useEffect(() => {
    if (moveCount > 25 && !gameOver && !won) {
      setGameOver(true);
      setMessage("MOVE LIMIT EXCEEDED! GAME OVER!");
    }
  }, [moveCount, gameOver, won]);

  const handleMove = useCallback(
    (direction) => {
      if (gameOver) return;
      const delta = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] }[direction];
      const nr = pos.r + delta[0];
      const nc = pos.c + delta[1];

      if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) {
        setMessage("MAZE BOUNDARY!");
        return;
      }
      if (grid[nr][nc] === CELL.R) {
        setMessage("BLOCKED BY RED!");
        return;
      }

      const posKey = `${nr},${nc}`;
      const wasVisited = visited.has(posKey);
      const newPos = { r: nr, c: nc };
      setPos(newPos);

      let newGrid = applyTransformation(grid, direction, newPos, SIZE, lastDirection);
      setLastDirection(direction);

      if (wasVisited && !permanentRed.has(posKey)) {
        newGrid[nr][nc] = CELL.R;
        setPermanentRed((prev) => new Set([...prev, posKey]));
      }
      setVisited((prev) => new Set([...prev, posKey]));

      const newMoveCount = moveCount + 1;
      setMoveCount(newMoveCount);

      if (newMoveCount % 4 === 0) {
        newGrid = applyQuantumCollapse(newGrid, SIZE);
        setMessage("⚛ QUANTUM COLLAPSE!");
      } else {
        setMessage(`MOVED ${direction.toUpperCase()}`);
      }

      setGrid(newGrid);

      if (nr === EXIT.r && nc === EXIT.c) {
        setWon(true);
        setGameOver(true);
        setMessage(`VICTORY IN ${newMoveCount} MOVES!`);
        return;
      }

      const canMove = [[-1,0],[1,0],[0,-1],[0,1]].some(([dr, dc]) => {
        const r = nr + dr, c = nc + dc;
        return r >= 0 && r < SIZE && c >= 0 && c < SIZE && newGrid[r][c] !== CELL.R;
      });
      if (!canMove) {
        setGameOver(true);
        setMessage("NO VALID MOVES! TRAPPED!");
      }
    },
    [gameOver, pos, grid, lastDirection, visited, permanentRed, moveCount, won]
  );

  // Keyboard input
  useEffect(() => {
    const map = {
      ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
      w: "up", s: "down", a: "left", d: "right",
      W: "up", S: "down", A: "left", D: "right",
    };
    const handler = (e) => {
      if (map[e.key]) { e.preventDefault(); handleMove(map[e.key]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleMove]);

  const reset = () => {
    setGrid(generateMaze(SIZE));
    setPos({ r: 0, c: 0 });
    setVisited(new Set(["0,0"]));
    setPermanentRed(new Set());
    setMoveCount(0);
    setLastDirection(null);
    setGameOver(false);
    setWon(false);
    setMessage("DISCOVER THE RULES!");
  };

  const entropy = calculateEntropy(grid);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a1628",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none",
          zIndex: 20,
          opacity: 0.3,
        }}
      />

      {/* ── Header bar ── */}
      <div
        style={{
          background: "#0d1f3c",
          borderBottom: "2px solid #0e3a6e",
          padding: "5px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#22d3ee", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em" }}>
            ⚛ QUANTUM MAZE
          </span>
          <span
            style={{
              fontSize: "0.45rem",
              color: "#0e7490",
              border: "1px solid #0e7490",
              padding: "1px 5px",
              letterSpacing: "0.08em",
            }}
          >
            v0.1.0
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Move counter */}
          <span style={{ color: moveCount > 20 ? "#f87171" : "#22d3ee", fontSize: "0.55rem", letterSpacing: "0.06em" }}>
            MOVES {moveCount}/25
          </span>
          {/* Entropy */}
          <span style={{ color: entropy > 35 ? "#f87171" : "#22d3ee", fontSize: "0.55rem", letterSpacing: "0.06em" }}>
            ENTROPY {entropy.toFixed(0)}%
          </span>
          {/* Collapse countdown */}
          <span style={{ color: "#818cf8", fontSize: "0.55rem", letterSpacing: "0.06em" }}>
            COLLAPSE IN {4 - (moveCount % 4)}
          </span>

          {/* Exit button */}
          <button
            onClick={onExit}
            style={{
              background: "transparent",
              border: "1px solid #1e3a5f",
              color: "#64748b",
              fontSize: "0.5rem",
              letterSpacing: "0.08em",
              padding: "3px 8px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← EXIT
          </button>
        </div>
      </div>

      {/* ── Body: maze + side panel ── */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 0,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* LEFT: maze area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 12px",
            gap: 6,
            overflow: "hidden",
          }}
        >
          {/* Win / lose banner */}
          {won && (
            <div
              style={{
                border: "2px solid #22c55e",
                background: "rgba(21,128,61,0.3)",
                padding: "4px 16px",
                color: "#4ade80",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textAlign: "center",
                width: "100%",
                maxWidth: 380,
              }}
            >
              🏆 VICTORY — {moveCount} MOVES
            </div>
          )}
          {gameOver && !won && (
            <div
              style={{
                border: "2px solid #f87171",
                background: "rgba(153,27,27,0.3)",
                padding: "4px 16px",
                color: "#fca5a5",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textAlign: "center",
                width: "100%",
                maxWidth: 380,
              }}
            >
              💀 {message}
            </div>
          )}

          {/* Maze grid */}
          <div
            style={{
              border: "3px solid #0e3a6e",
              boxShadow: "0 0 24px rgba(34,211,238,0.2)",
              display: "inline-flex",
              flexDirection: "column",
              background: "#0d1f3c",
              padding: 4,
              gap: 2,
            }}
          >
            {grid.map((row, r) => (
              <div key={r} style={{ display: "flex", gap: 2 }}>
                {row.map((cell, c) => (
                  <Cell
                    key={c}
                    cell={cell}
                    isPlayer={pos.r === r && pos.c === c}
                    isStart={r === 0 && c === 0}
                    isExit={EXIT.r === r && EXIT.c === c}
                    isVisited={visited.has(`${r},${c}`)}
                    isPermanentRed={permanentRed.has(`${r},${c}`)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Status message */}
          {!gameOver && (
            <div
              style={{
                border: "1px solid #0e3a6e",
                background: "rgba(13,31,60,0.8)",
                padding: "4px 14px",
                color: "#67e8f9",
                fontSize: "0.5rem",
                letterSpacing: "0.1em",
                width: "100%",
                maxWidth: 380,
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </div>

        {/* RIGHT: side panel */}
        <div
          style={{
            width: 180,
            background: "#0d1f3c",
            borderLeft: "2px solid #0e3a6e",
            display: "flex",
            flexDirection: "column",
            gap: 0,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* D-pad controls */}
          <div
            style={{
              padding: "10px 8px",
              borderBottom: "1px solid #0e3a6e",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ color: "#0e7490", fontSize: "0.42rem", letterSpacing: "0.12em", marginBottom: 2 }}>
              CONTROLS
            </span>
            <DPadBtn label="▲" onClick={() => handleMove("up")} disabled={gameOver} />
            <div style={{ display: "flex", gap: 4 }}>
              <DPadBtn label="◄" onClick={() => handleMove("left")} disabled={gameOver} />
              <div style={{ width: 32, height: 32 }} />
              <DPadBtn label="►" onClick={() => handleMove("right")} disabled={gameOver} />
            </div>
            <DPadBtn label="▼" onClick={() => handleMove("down")} disabled={gameOver} />
            <button
              onClick={reset}
              style={{
                marginTop: 6,
                background: "#7f1d1d",
                border: "1px solid #991b1b",
                color: "#fca5a5",
                fontSize: "0.45rem",
                letterSpacing: "0.08em",
                padding: "4px 12px",
                cursor: "pointer",
                fontFamily: "inherit",
                width: "100%",
              }}
            >
              RESTART
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              padding: "8px 10px",
              borderBottom: "1px solid #0e3a6e",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Stat label="POSITION" value={`(${pos.r},${pos.c})`} />
            <Stat label="VISITED" value={visited.size} />
            <Stat
              label="ENTROPY"
              value={`${entropy.toFixed(1)}%`}
              warn={entropy > 35}
            />
            <Stat
              label="MOVES LEFT"
              value={25 - moveCount}
              warn={25 - moveCount < 6}
            />
          </div>

          {/* Legend */}
          <div style={{ padding: "8px 10px", flex: 1, overflowY: "auto" }}>
            <div style={{ color: "#0e7490", fontSize: "0.42rem", letterSpacing: "0.12em", marginBottom: 6 }}>
              LEGEND
            </div>

            {/* Image-based entries */}
            {[
              { src: "player.png", label: "YOU" },
              { src: "win.png",    label: "EXIT" },
              { src: "safe.png",   label: "SAFE" },
              { src: "break.png",  label: "UNSTABLE" },
              { src: "enemy.png",  label: "BLOCKED" },
            ].map(({ src, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <img src={src} alt={label} style={{ width: 18, height: 18, objectFit: "cover", flexShrink: 0 }} />
                <span style={{ color: "#67e8f9", fontSize: "0.42rem", letterSpacing: "0.06em" }}>{label}</span>
              </div>
            ))}

            {/* Icon-only entry for permanent red (no dedicated image) */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <Skull style={{ width: 16, height: 16, color: "#f87171", flexShrink: 0 }} />
              <span style={{ color: "#67e8f9", fontSize: "0.42rem", letterSpacing: "0.06em" }}>PERM. RED</span>
            </div>

            {/* Loss conditions */}
            <div
              style={{
                marginTop: 8,
                borderTop: "1px solid #0e3a6e",
                paddingTop: 6,
                color: "#f87171",
                fontSize: "0.4rem",
                letterSpacing: "0.06em",
              }}
            >
              <div style={{ marginBottom: 3 }}>⚠ ENTROPY &gt; 40%</div>
              <div>⚠ MOVES &gt; 25</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function DPadBtn({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 32,
        height: 32,
        background: disabled ? "#1e293b" : "#0e3a6e",
        border: "1px solid #1e4d8c",
        color: disabled ? "#334155" : "#22d3ee",
        fontSize: "0.8rem",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
        transition: "background 0.1s",
      }}
    >
      {label}
    </button>
  );
}

function Stat({ label, value, warn }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "#0e7490", fontSize: "0.42rem", letterSpacing: "0.08em" }}>{label}</span>
      <span
        style={{
          color: warn ? "#f87171" : "#e2e8f0",
          fontSize: "0.48rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
      >
        {value}
      </span>
    </div>
  );
}