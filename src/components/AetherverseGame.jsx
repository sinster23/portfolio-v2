"use client";

/**
 * AetherverseGame.jsx
 *
 * Self-contained PIXI metaverse game.
 * Props:
 *   playerName  — string (default "Explorer")
 *   onExit      — callback to return to console screen
 */

import { useEffect, useRef, useState } from "react";
import { Application, Container } from "pixi.js";
import { createWorldGrid, populateRooms } from "./pixi_world/worldSetup.js";
import { spawnPlayer } from "./pixi_world/player.js";
import { setupInput, gameLoop } from "./pixi_world/gameLoop.js";

export default function AetherverseGame({ playerName = "Explorer", onExit }) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const gameStateRef = useRef({
    app: null,
    colliders: [],
    player: null,
    world: null,
    camera: null,
    keys: {},
    TILE_SIZE: 32,
    ROOM_GRID: { rows: 2, cols: 2, roomWidth: 800, roomHeight: 600 },
    playerSpeed: 2,
    wallHackEnabled: false,
    cleanup: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    let cancelled = false;

    const boot = async () => {
      const app = new Application();
      await app.init({
        width: 900,
        height: 540,
        background: "#1a1a2e",
        antialias: false,
        resolution: 1,
        roundPixels: true,
      });

      if (cancelled) {
        app.destroy(true);
        return;
      }

      gameStateRef.current.app = app;
      canvasRef.current.appendChild(app.canvas);

      const gs = gameStateRef.current;
      gs.colliders = [];
      gs.world = new Container();
      app.stage.addChild(gs.world);
      gs.camera = new Container();
      gs.world.addChild(gs.camera);

      createWorldGrid(gs);
      populateRooms(gs);
      spawnPlayer(gs, playerName);
      setupInput(gs);
      app.ticker.add(() => gameLoop(gs, app));

      setLoaded(true);
    };

    boot();

    return () => {
      cancelled = true;
      const gs = gameStateRef.current;
      if (gs.cleanup) gs.cleanup();
      if (gs.app) {
        gs.app.destroy(true);
        gs.app = null;
      }
    };
  }, [playerName]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* PIXI canvas mount */}
      <div
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      {/* Loading overlay */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0d0d1a",
          }}
        >
          <span
            style={{ color: "#33FF57", fontSize: "0.8rem", letterSpacing: "0.1em" }}
          >
            INITIALISING_WORLD...
          </span>
        </div>
      )}

      {/* HUD: controls hint (top bar of TV frame is outside this component) */}
    </div>
  );
}