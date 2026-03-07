import { Container, Text, TextStyle } from "pixi.js";
import {
  createFloorTile,
  createWalls,
  createElevator,
  createdoor,
  createPlant,
  createReceptionCounter,
  createLobbySeating,
  createVendingMachine,
  createWaterDispenser,
  createInfoBoard,
  createWasteBin,
  createFloorMat,
  createDigitalClock,
  createBookshelf,
  createTable,
  createPrinter,
  createStudyTable,
  createDecorTable,
  createMeetingTable,
  createOfficeChair,
  createWhiteboard,
  createOfficeCounters,
  createCat,
  createVerticalLeftSofa,
  createSittingNPC,
  createCubicle,
} from "./furniture.js";

export function createWorldGrid(gs) {
  const { camera, ROOM_GRID, colliders, TILE_SIZE } = gs;
  const { rows, cols, roomWidth, roomHeight } = ROOM_GRID;
  const labels = ["LOBBY", "OPEN OFFICE", "MEETING ROOM", "EXEC SUITE"];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const offsetX = c * roomWidth;
      const offsetY = r * roomHeight;
      const room = new Container();
      room.x = offsetX;
      room.y = offsetY;

      // Floor tiles
      for (let ty = 0; ty < roomHeight; ty += TILE_SIZE)
        for (let tx = 0; tx < roomWidth; tx += TILE_SIZE)
          room.addChild(createFloorTile(tx, ty, TILE_SIZE));

      // Walls
      createWalls(roomWidth, roomHeight, r, c, ROOM_GRID, colliders, offsetX, offsetY)
        .forEach((w) => room.addChild(w));

      // Room label
      const label = new Text({
        text: labels[r * cols + c] || "ROOM",
        style: new TextStyle({
          fontSize: 11,
          fill: 0xffffff,
          fontFamily: "JetBrains Mono",
          stroke: { color: 0x000000, width: 3 },
        }),
      });
      label.anchor.set(0.5);
      label.x = roomWidth / 2;
      label.y = 20;
      room.addChild(label);

      camera.addChild(room);
    }
  }
}

export function populateRooms(gs) {
  const { camera, ROOM_GRID } = gs;
  const { rows, cols, roomWidth, roomHeight } = ROOM_GRID;

  window._mvInteractables = [];
  window._mvBubbleActive = false;
  window._mvColliders = gs.colliders;
  window.interactables = window._mvInteractables;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offsetX = col * roomWidth;
      const offsetY = row * roomHeight;
      const key = `${row},${col}`;

      switch (key) {
        // ── LOBBY ─────────────────────────────────────────────────────────────
        case "0,0": {
          camera.addChild(createElevator(offsetX + roomWidth / 2 - 30, offsetY + 70, camera, gs.colliders));
          camera.addChild(createDigitalClock(offsetX - 25 + roomWidth / 2 - 40, offsetY, camera, gs.colliders));
          camera.addChild(createReceptionCounter(offsetX + roomWidth / 2, offsetY + 400, camera, gs.colliders));
          camera.addChild(createLobbySeating(offsetX + 450, offsetY + 520, camera, gs.colliders));
          camera.addChild(createLobbySeating(offsetX + roomWidth - 200, offsetY + 520, camera, gs.colliders));
          camera.addChild(createVendingMachine(offsetX + 490, offsetY + 10, camera, gs.colliders));
          camera.addChild(createVendingMachine(offsetX + roomWidth - 240, offsetY + 10, camera, gs.colliders));
          camera.addChild(createWaterDispenser(offsetX + 200, offsetY + 30, camera, gs.colliders));
          camera.addChild(createWaterDispenser(offsetX + roomWidth - 60, offsetY + 30, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 40, offsetY + 145, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 40, offsetY + 340, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + roomWidth - 40, offsetY + 140, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 600, offsetY + 400, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + roomWidth - 40, offsetY + 280, camera, gs.colliders));
          camera.addChild(createInfoBoard(offsetX + 10, offsetY - 3));
          camera.addChild(createWasteBin(offsetX + 470, offsetY + 430));
          camera.addChild(createWasteBin(offsetX + roomWidth - 50, offsetY + 550));
          camera.addChild(createFloorMat(offsetX + 700, offsetY + 200));
          break;
        }

        // ── OPEN OFFICE ───────────────────────────────────────────────────────
        case "0,1": {
          const cubiclePositions = [
            { x: offsetX + 200, y: offsetY + 200 },
            { x: offsetX + 400, y: offsetY + 200 },
            { x: offsetX + 600, y: offsetY + 200 },
            { x: offsetX + 200, y: offsetY + 400 },
            { x: offsetX + 400, y: offsetY + 400 },
            { x: offsetX + 600, y: offsetY + 400 },
          ];
          cubiclePositions.forEach((pos) => camera.addChild(createCubicle(pos.x, pos.y)));
          camera.addChild(createdoor(offsetX + roomWidth / 2 + 250, offsetY + 44, camera, gs.colliders, { doorType: "office" }));
          camera.addChild(createVendingMachine(offsetX + 490, offsetY + 10, camera, gs.colliders));
          camera.addChild(createVendingMachine(offsetX + roomWidth - 240, offsetY + 10, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 40, offsetY + 120, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 40, offsetY + 340, camera, gs.colliders));
          camera.addChild(createDigitalClock(offsetX - 25 + roomWidth / 2 - 40, offsetY + 5, camera, gs.colliders));
          camera.addChild(createBookshelf(offsetX + 220, offsetY, camera, gs.colliders));
          camera.addChild(createLobbySeating(offsetX + 25, offsetY + 520, camera, gs.colliders));
          camera.addChild(createLobbySeating(offsetX + roomWidth - 260, offsetY + 520, camera, gs.colliders));
          camera.addChild(createTable(offsetX + 680, offsetY + 530, camera, gs.colliders));
          camera.addChild(createPrinter(offsetX + 720, offsetY + 550));
          camera.addChild(createWasteBin(offsetX + 350, offsetY + 450));
          camera.addChild(createWasteBin(offsetX + 150, offsetY + 40));
          camera.addChild(createStudyTable(offsetX + 440, offsetY + 565, camera, gs.colliders));
          camera.addChild(createFloorMat(offsetX + 300, offsetY + 530, Math.PI / 2));
          camera.addChild(createDecorTable(offsetX + 170, offsetY + 530, camera, gs.colliders));
          break;
        }

        // ── MEETING ROOM ──────────────────────────────────────────────────────
        case "1,0": {
          camera.addChild(createMeetingTable(offsetX + 400, offsetY + 300, camera, gs.colliders));
          const meetingChairs = [
            { x: offsetX + 320, y: offsetY + 280 },
            { x: offsetX + 480, y: offsetY + 280 },
            { x: offsetX + 320, y: offsetY + 320 },
            { x: offsetX + 480, y: offsetY + 320 },
            { x: offsetX + 400, y: offsetY + 230 },
            { x: offsetX + 400, y: offsetY + 370 },
          ];
          meetingChairs.forEach((pos) => camera.addChild(createOfficeChair(pos.x, pos.y)));
          camera.addChild(createWhiteboard(offsetX + 38, offsetY + 280, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 40, offsetY + 120, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + roomWidth - 40, offsetY + 120, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 40, offsetY + 400, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + roomWidth - 40, offsetY + 400, camera, gs.colliders));
          camera.addChild(createDigitalClock(offsetX + roomWidth / 2 - 40, offsetY));
          camera.addChild(createWasteBin(offsetX + roomWidth - 60, offsetY + 450));
          camera.addChild(createBookshelf(offsetX + roomWidth - 200, offsetY + 20, camera, gs.colliders));
          camera.addChild(createBookshelf(offsetX + roomWidth - 280, offsetY + 20, camera, gs.colliders));
          camera.addChild(createFloorMat(offsetX + 305, offsetY + 80, Math.PI / 2));
          camera.addChild(createLobbySeating(offsetX + 100, offsetY + 500, camera, gs.colliders));
          camera.addChild(createLobbySeating(offsetX + roomWidth - 280, offsetY + 500, camera, gs.colliders));
          camera.addChild(createWaterDispenser(offsetX + roomWidth - 80, offsetY + 500, camera, gs.colliders));
          camera.addChild(createDecorTable(offsetX + 390, offsetY + 510, camera, gs.colliders));
          break;
        }

        // ── EXEC SUITE ────────────────────────────────────────────────────────
        case "1,1": {
          camera.addChild(createOfficeCounters(offsetX + 560, offsetY + 70, 4, camera, gs.colliders));
          camera.addChild(createOfficeCounters(offsetX + 220, offsetY + 70, 2, camera, gs.colliders));
          camera.addChild(createOfficeCounters(offsetX + 240, offsetY + 470, 7, camera, gs.colliders));
          camera.addChild(createCat(offsetX + 120, offsetY + 400, true, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 40, offsetY + 280, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 40, offsetY + 390, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 540, offsetY + 220, camera, gs.colliders));
          camera.addChild(createPlant(offsetX + 540, offsetY + 390, camera, gs.colliders));
          camera.addChild(createFloorMat(offsetX + 60, offsetY + 210));
          camera.addChild(createVerticalLeftSofa(offsetX + 660, offsetY + 240, camera, gs.colliders));
          camera.addChild(createSittingNPC(offsetX + 655, offsetY + 290, camera, gs.colliders, gs));
          camera.addChild(createCat(offsetX + 670, offsetY + 220, false, camera, gs.colliders));
          break;
        }
      }
    }
  }
}