import { Container, Graphics, Text, TextStyle } from "pixi.js";

// ── Helper ────────────────────────────────────────────────────────────────────
export function addWithCollider(container, displayObject, bounds, colliders) {
  container.addChild(displayObject);
  if (colliders) colliders.push(bounds);
}

// ── Floor tile ────────────────────────────────────────────────────────────────
export function createFloorTile(x, y, size) {
  const t = new Graphics();
  t.rect(x, y, size, size).fill(0x5ba3f5);
  t.rect(x + 1, y + 1, size - 8, size - 8).fill(0x7db8f7);
  t.rect(x + 3, y + 3, size - 6, size - 6).fill(0x5ba3f5);
  t.rect(x + 2, y + 2, size - 4, 1).fill(0x7db8f7);
  t.rect(x + 2, y + 2, 1, size - 4).fill(0x7db8f7);
  t.rect(x + 2, y + size - 3, size - 4, 1).fill(0x3578c7);
  t.rect(x + size - 3, y + 2, 1, size - 4).fill(0x3578c7);
  t.stroke({ width: 2, color: 0x34495e });
  return t;
}

// ── Walls ─────────────────────────────────────────────────────────────────────
export function createWalls(roomWidth, roomHeight, row, col, grid, colliders, offsetX, offsetY) {
  const walls = [];
  const thick = 32, thin = 12, gap = 80;
  const wallColor = 0x8b7355, wallShadow = 0x6b5635;
  const { rows, cols } = grid;

  function addSeg(g, x, y, w, h) {
    g.rect(x, y, w, h);
    colliders.push({ x: offsetX + x, y: offsetY + y, width: w, height: h });
  }

  // Top wall
  const topThick = row === 0 ? thick : thin;
  const tw = new Graphics();
  if (row > 0) {
    const gs = roomWidth / 2 - gap / 2 - 90;
    addSeg(tw, 0, 0, gs, topThick);
    addSeg(tw, gs + gap, 0, roomWidth - gs - gap, topThick);
  } else {
    addSeg(tw, 0, 0, roomWidth, topThick);
  }
  tw.fill(wallColor);
  tw.rect(0, topThick - 2, roomWidth, 2).fill(wallShadow);
  walls.push(tw);

  // Bottom wall
  const botThick = row === rows - 1 ? thick : thin;
  const botY = roomHeight - botThick;
  const bw = new Graphics();
  if (row < rows - 1) {
    const gs = roomWidth / 2 - gap / 2 - 90;
    addSeg(bw, 0, botY, gs, botThick);
    addSeg(bw, gs + gap, botY, roomWidth - gs - gap, botThick);
  } else {
    addSeg(bw, 0, botY, roomWidth, botThick);
  }
  bw.fill(wallColor);
  bw.rect(0, botY, roomWidth, 2).fill(wallShadow);
  walls.push(bw);

  // Left wall
  const leftThick = col === 0 ? thick : thin;
  const lw = new Graphics();
  if (col > 0) {
    const gs = roomHeight / 2 - gap / 2 - 90;
    addSeg(lw, 0, 0, leftThick, gs);
    addSeg(lw, 0, gs + gap, leftThick, roomHeight - gs - gap);
  } else {
    addSeg(lw, 0, 0, leftThick, roomHeight);
  }
  lw.fill(wallColor);
  lw.rect(leftThick - 2, 0, 2, roomHeight).fill(wallShadow);
  walls.push(lw);

  // Right wall
  const rightThick = col === cols - 1 ? thick : thin;
  const rightX = roomWidth - rightThick;
  const rw = new Graphics();
  if (col < cols - 1) {
    const gs = roomHeight / 2 - gap / 2 - 90;
    addSeg(rw, rightX, 0, rightThick, gs);
    addSeg(rw, rightX, gs + gap, rightThick, roomHeight - gs - gap);
  } else {
    addSeg(rw, rightX, 0, rightThick, roomHeight);
  }
  rw.fill(wallColor);
  rw.rect(rightX, 0, 2, roomHeight).fill(wallShadow);
  walls.push(rw);

  return walls;
}

// ── Elevator ──────────────────────────────────────────────────────────────────
export function createElevator(x, y, camera, colliders) {
  const elevator = new Graphics();
  elevator.rect(x - 32, y - 42, 64, 84).fill(0x1a252f);
  elevator.rect(x - 30, y - 40, 60, 80).fill(0x2c3e50);
  elevator.rect(x - 30, y - 40, 5, 80).fill(0x1e2a38);
  elevator.rect(x + 25, y - 40, 5, 80).fill(0x1e2a38);
  elevator.rect(x - 26, y - 38, 2, 76).fill(0x5d6d7e);
  elevator.rect(x + 24, y - 38, 2, 76).fill(0x5d6d7e);
  elevator.rect(x - 25, y - 35, 22, 70).fill(0xbdc3c7);
  elevator.rect(x - 23, y - 32, 18, 64).fill(0x95a5a6);
  for (let i = 0; i < 3; i++) {
    elevator.rect(x - 21 + i * 6, y - 30, 1, 60).fill(0x85929a);
  }
  elevator.rect(x + 3, y - 35, 22, 70).fill(0xbdc3c7);
  elevator.rect(x + 5, y - 32, 18, 64).fill(0x95a5a6);
  for (let i = 0; i < 3; i++) {
    elevator.rect(x + 7 + i * 6, y - 30, 1, 60).fill(0x85929a);
  }
  elevator.rect(x - 5, y - 4, 3, 12).fill(0x34495e);
  elevator.rect(x + 2, y - 4, 3, 12).fill(0x34495e);
  elevator.rect(x - 5, y + 1, 10, 2).fill(0x2c3e50);
  elevator.rect(x + 30, y - 22, 12, 44).fill(0x34495e);
  elevator.rect(x + 32, y - 20, 8, 40).fill(0x2c3e50);
  for (let i = 0; i < 4; i++) {
    elevator.rect(x + 33, y - 17 + i * 8, 6, 6).fill(0x1a252f);
    elevator.circle(x + 36, y - 15 + i * 8, 2).fill(i === 0 ? 0xe74c3c : 0x2c3e50);
  }
  elevator.rect(x - 28, y - 40, 56, 3).fill(0x1e2a38);
  elevator.rect(x - 28, y + 37, 56, 3).fill(0x1e2a38);
  elevator.rect(x - 1, y - 35, 2, 70).fill(0x1a252f);
  elevator.rect(x - 12, y - 45, 24, 8).fill(0x1a252f);
  elevator.rect(x - 10, y - 43, 20, 4).fill(0x000000);
  elevator.rect(x - 2, y - 42, 4, 2).fill(0xff0000);

  const bounds = { x: x - 25, y: y - 35, width: 50, height: 72, label: "elevator-doors" };
  if (colliders) addWithCollider(camera, elevator, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "elevator", bounds, message: "The Elevator doors are tightly shut", bubble: null });
  return elevator;
}

// ── Office Door ───────────────────────────────────────────────────────────────
export function createdoor(x, y, camera, colliders, options = {}) {
  const opts = { doorType: "standard", isOpen: false, color: 0x8b4513, frameColor: 0x654321, handleColor: 0xffd700, ...options };
  if (opts.doorType === "office") return createOfficeDoor(x, y, camera, colliders, opts);
  if (opts.doorType === "fancy") return createFancyDoor(x, y, camera, colliders, opts);
  if (opts.doorType === "modern") return createModernDoor(x, y, camera, colliders, opts);

  const door = new Graphics();
  door.rect(x - 30, y - 40, 60, 80).fill(opts.frameColor);
  door.rect(x - 28, y - 38, 56, 76).fill(0x8b6f47);
  door.rect(x - 25, y - 35, 50, 72).fill(opts.color);
  door.rect(x - 20, y - 28, 40, 28).stroke({ color: 0x654321, width: 2 });
  door.rect(x - 18, y - 26, 36, 24).fill(0xa0522d);
  door.rect(x - 20, y + 4, 40, 28).stroke({ color: 0x654321, width: 2 });
  door.rect(x - 18, y + 6, 36, 24).fill(0xa0522d);
  door.circle(x + 18, y, 4).fill(opts.handleColor);
  door.rect(x - 22, y - 20, 8, 6).fill(0x696969);
  door.rect(x - 22, y + 15, 8, 6).fill(0x696969);

  const bounds = { x: x - 25, y: y - 35, width: 50, height: 72, label: "door" };
  if (colliders) addWithCollider(camera, door, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "door", bounds, message: "A sturdy wooden door.", bubble: null });
  return door;
}

function createOfficeDoor(x, y, camera, colliders, opts) {
  const door = new Graphics();
  door.rect(x - 30, y - 40, 60, 80).fill(0x2f4f4f);
  door.rect(x - 25, y - 35, 50, 72).fill(0x8b4513);
  door.rect(x - 20, y - 28, 40, 30).fill(0x87ceeb).stroke({ color: 0x654321, width: 2 });
  door.rect(x - 20, y + 8, 40, 24).fill(0xa0522d).stroke({ color: 0x654321, width: 2 });
  door.rect(x + 15, y - 2, 8, 4).fill(0xc0c0c0);
  const bounds = { x: x - 25, y: y - 35, width: 50, height: 72, label: "office-door" };
  if (colliders) addWithCollider(camera, door, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "office-door", bounds, message: "An office door with frosted glass.", bubble: null });
  return door;
}

function createFancyDoor(x, y, camera, colliders, opts) {
  const door = new Graphics();
  door.rect(x - 32, y - 42, 64, 84).fill(0x8b4513);
  door.rect(x - 30, y - 40, 60, 80).fill(0xcd853f);
  door.rect(x - 25, y - 35, 50, 72).fill(0x8b4513);
  door.rect(x - 20, y - 28, 40, 18).fill(0xa0522d).stroke({ color: 0x654321, width: 2 });
  door.rect(x - 20, y - 5, 40, 18).fill(0xa0522d).stroke({ color: 0x654321, width: 2 });
  door.rect(x - 20, y + 18, 40, 14).fill(0xa0522d).stroke({ color: 0x654321, width: 2 });
  door.circle(x + 18, y, 5).fill(0xffd700);
  const bounds = { x: x - 25, y: y - 35, width: 50, height: 72, label: "fancy-door" };
  if (colliders) addWithCollider(camera, door, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "fancy-door", bounds, message: "An ornate wooden door with decorative carvings.", bubble: null });
  return door;
}

function createModernDoor(x, y, camera, colliders, opts) {
  const door = new Graphics();
  door.rect(x - 28, y - 38, 56, 76).fill(0x2f4f4f);
  door.rect(x - 25, y - 35, 50, 72).fill(0x36454f);
  door.rect(x - 18, y - 30, 3, 62).fill(0x708090);
  door.rect(x + 10, y - 8, 12, 3).fill(0xc0c0c0);
  door.rect(x - 5, y - 32, 10, 6).fill(0x1a1a1a).stroke({ color: 0xc0c0c0, width: 1 });
  const bounds = { x: x - 25, y: y - 35, width: 50, height: 72, label: "modern-door" };
  if (colliders) addWithCollider(camera, door, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "modern-door", bounds, message: "A sleek modern door.", bubble: null });
  return door;
}

// ── Office Desk ───────────────────────────────────────────────────────────────
export function createOfficeDesk(x, y, addCollider = true) {
  const desk = new Graphics();
  desk.rect(x - 40, y - 20, 80, 40).fill(0xa0522d);
  for (const dy of [-15, -5, 5, 12]) {
    desk.rect(x - 35, y + dy, 70, 1).fill(0x8b4513);
  }
  desk.rect(x - 40, y - 20, 80, 2).fill(0xcd853f);
  desk.rect(x - 40, y + 18, 80, 4).fill(0x5d4037);
  desk.rect(x + 38, y - 20, 4, 40).fill(0x5d4037);
  desk.rect(x - 38, y + 15, 6, 8).fill(0x5d4037);
  desk.rect(x + 32, y + 15, 6, 8).fill(0x5d4037);

  const monitor = new Graphics();
  monitor.rect(x - 20, y - 25, 40, 30).fill(0x95a5a6);
  monitor.rect(x - 18, y - 23, 36, 26).fill(0x1a1a2e);
  monitor.rect(x - 17, y - 22, 8, 2).fill(0x3742fa);
  monitor.rect(x - 8, y + 8, 16, 8).fill(0x57606f);
  monitor.rect(x - 6, y + 16, 12, 6).fill(0x3d4454);
  desk.addChild(monitor);

  const keyboard = new Graphics();
  keyboard.rect(x - 15, y + 10, 30, 12).fill(0x2f3640);
  keyboard.rect(x - 13, y + 12, 26, 8).fill(0x1e272e);
  desk.addChild(keyboard);

  const mouse = new Graphics();
  mouse.rect(x + 20, y + 10, 8, 12).fill(0x57606f);
  desk.addChild(mouse);

  const lamp = new Graphics();
  lamp.rect(x - 35, y - 15, 3, 25).fill(0x57606f);
  lamp.rect(x - 42, y - 18, 12, 6).fill(0xffa502);
  lamp.rect(x - 37, y + 8, 6, 4).fill(0x40444a);
  desk.addChild(lamp);

  const mug = new Graphics();
  mug.rect(x + 10, y - 5, 6, 8).fill(0x2c3e50);
  mug.rect(x + 11, y - 4, 4, 6).fill(0x8b4513);
  mug.rect(x + 16, y - 2, 2, 4).fill(0x2c3e50);
  desk.addChild(mug);

  const bounds = { x: x - 40, y: y - 20, width: 80, height: 45 };
  if (addCollider && window._mvColliders) window._mvColliders.push(bounds);
  if (!window._mvInteractables) window._mvInteractables = [];
  window._mvInteractables.push({ label: "desk", bounds, message: "A standard office desk. Nothing to do here...", bubble: null });
  window.interactables = window._mvInteractables;
  return desk;
}

// ── Office Chair ──────────────────────────────────────────────────────────────
export function createOfficeChair(x, y, addCollider = true) {
  const chair = new Graphics();
  const seatColor = 0x2c3e50, backColor = 0x34495e, highlight = 0x4a6274, shadow = 0x1a252f, baseColor = 0x7f8c8d;

  chair.rect(x - 16, y - 12, 32, 24).fill(seatColor);
  chair.rect(x - 14, y - 10, 28, 20).fill(highlight);
  chair.rect(x - 16, y - 12, 32, 2).fill(highlight);
  chair.rect(x - 14, y - 30, 28, 25).fill(backColor);
  chair.rect(x - 12, y - 28, 24, 21).fill(highlight);
  chair.rect(x - 10, y - 26, 20, 17).fill(backColor);
  chair.rect(x - 14, y - 30, 28, 2).fill(highlight);
  chair.rect(x - 20, y - 8, 8, 16).fill(seatColor);
  chair.rect(x + 12, y - 8, 8, 16).fill(seatColor);
  chair.circle(x, y + 20, 12).fill(baseColor);
  chair.circle(x, y + 20, 8).fill(highlight);
  chair.circle(x, y + 20, 4).fill(shadow);

  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5;
    const wx = x + Math.cos(angle) * 15;
    const wy = y + 20 + Math.sin(angle) * 15;
    chair.circle(wx, wy, 3).fill(0x34495e);
    chair.circle(wx - 0.5, wy - 0.5, 2).fill(baseColor);
  }

  if (addCollider && window._mvColliders) {
    window._mvColliders.push({ x: x - 16, y: y - 30, width: 32, height: 45 });
  }
  return chair;
}

// ── Cubicle ───────────────────────────────────────────────────────────────────
export function createCubicle(x, y, width = 120, height = 100) {
  const cubicle = new Container();
  const wallColor = 0x95a5a6;
  const colliders = window._mvColliders || [];

  const backWall = new Graphics();
  backWall.rect(-width / 2, -height / 2, width, 8).fill(wallColor);
  cubicle.addChild(backWall);

  const leftWall = new Graphics();
  leftWall.rect(-width / 2, -height / 2, 8, height / 2).fill(wallColor);
  cubicle.addChild(leftWall);

  const rightWall = new Graphics();
  rightWall.rect(width / 2 - 8, -height / 2, 8, height / 2).fill(wallColor);
  cubicle.addChild(rightWall);

  const desk = createOfficeDesk(0, 10, false);
  cubicle.addChild(desk);
  const chair = createOfficeChair(0, 35, false);
  cubicle.addChild(chair);

  const worldX = x, worldY = y;
  const offsetX = worldX - width / 2, offsetY = worldY - height / 2;
  colliders.push({ x: offsetX, y: offsetY, width, height: 8, label: "cubicle-back" });
  colliders.push({ x: offsetX, y: offsetY, width: 8, height: height / 2, label: "cubicle-left" });
  colliders.push({ x: offsetX + width - 8, y: offsetY, width: 8, height: height / 2, label: "cubicle-right" });
  colliders.push({ x: worldX - 40, y: worldY - 10, width: 80, height: 40, label: "cubicle-desk" });
  colliders.push({ x: worldX - 16, y: worldY + 10, width: 32, height: 45, label: "cubicle-chair" });

  cubicle.x = x;
  cubicle.y = y;
  return cubicle;
}

// ── Meeting Table ─────────────────────────────────────────────────────────────
export function createMeetingTable(x, y, camera, colliders) {
  const table = new Graphics();
  const tableColor = 0x8b4513, tableHighlight = 0xcd853f, tableShadow = 0x5d4037;

  table.ellipse(x + 3, y + 3, 78, 48).fill({ color: tableShadow, alpha: 0.6 });
  table.ellipse(x, y, 80, 50).fill(tableColor);
  table.ellipse(x, y, 76, 46).fill(tableColor);

  for (let i = 0; i < 8; i++) {
    const grainOffset = (i - 4) * 8;
    table.ellipse(x, y + grainOffset, 65 - Math.abs(grainOffset) * 0.3, 35 - Math.abs(grainOffset) * 0.2).fill({ color: tableShadow, alpha: 0.15 });
  }

  table.ellipse(x, y, 80, 50).stroke({ width: 2, color: 0x37474f });

  const legPositions = [{ x: x - 60, y: y - 30 }, { x: x + 60, y: y - 30 }, { x: x - 60, y: y + 30 }, { x: x + 60, y: y + 30 }];
  legPositions.forEach((leg) => {
    table.circle(leg.x, leg.y, 8).fill(0x37474f);
    table.circle(leg.x, leg.y, 6).fill(0x6d4c41);
    table.circle(leg.x, leg.y, 2).fill(0x3e2723);
  });

  table.ellipse(x, y, 20, 12).fill(0x3e2723);
  table.ellipse(x, y, 14, 8).fill(0x263238);

  const bounds = { x: x - 80, y: y - 50, width: 160, height: 100, label: "meeting-table" };
  if (colliders) addWithCollider(camera, table, bounds, colliders);
  return table;
}

// ── Reception Counter ─────────────────────────────────────────────────────────
export function createReceptionCounter(x, y, camera, colliders) {
  const counter = new Graphics();
  counter.rect(x - 80, y - 20, 160, 40).fill(0xa0522d);
  counter.rect(x - 75, y - 15, 150, 8).fill(0xf8f9fa);
  counter.rect(x - 80, y - 20, 160, 2).fill(0xcd853f);
  counter.rect(x - 80, y + 18, 160, 4).fill(0x5d4037);
  counter.rect(x + 78, y - 20, 4, 40).fill(0x5d4037);

  const monitor = new Graphics();
  monitor.rect(x - 20, y - 25, 40, 30).fill(0x2c3e50);
  monitor.rect(x - 18, y - 23, 36, 26).fill(0x1a1a2e);
  monitor.rect(x - 8, y + 8, 16, 8).fill(0x57606f);
  counter.addChild(monitor);

  const bounds = { x: x - 80, y: y - 23, width: 160, height: 42 };
  if (camera && colliders) addWithCollider(camera, counter, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "reception-counter", bounds, message: "An unmanned reception desk. The screen is active, but there's nothing to do here", bubble: null });
  return counter;
}

// ── Lobby Seating ─────────────────────────────────────────────────────────────
export function createLobbySeating(x, y, camera, colliders) {
  const sofa = new Graphics();
  const sofaWidth = 120, sofaHeight = 60;

  sofa.roundRect(x, y, sofaWidth, sofaHeight, 8).fill(0x34495e).stroke({ width: 2, color: 0x2c3e50 });
  sofa.roundRect(x + 5, y, sofaWidth - 10, 12, 6).fill(0x2c3e50).stroke({ width: 2, color: 0x2c3e50 });

  const cushionWidth = (sofaWidth - 20) / 3;
  for (let i = 0; i < 3; i++) {
    const cushionX = x + 10 + i * cushionWidth;
    sofa.roundRect(cushionX, y + 15, cushionWidth - 2, 35, 4).fill(0x3498db).stroke({ width: 1, color: 0x2c3e50 });
    sofa.circle(cushionX + cushionWidth / 2 - 1, y + 32, 2).fill(0x2980b9);
  }

  sofa.roundRect(x, y + 12, 15, 48, 6).fill(0x2c3e50);
  sofa.roundRect(x + sofaWidth - 15, y + 12, 15, 48, 6).fill(0x2c3e50);

  const bounds = { x: x - 4, y: y - 2, width: sofaWidth, height: sofaHeight, label: "lobby-seating" };
  if (camera && colliders) addWithCollider(camera, sofa, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "lobby-seating", bounds, message: "This sofa seems inviting, but it's part of the office decor", bubble: null });
  return sofa;
}

// ── Vertical Left Sofa ────────────────────────────────────────────────────────
export function createVerticalLeftSofa(x, y, camera, colliders) {
  const sofa = new Graphics();
  const sofaWidth = 60, sofaHeight = 120;

  sofa.roundRect(x, y, sofaWidth, sofaHeight, 8).fill(0x8d6e63).stroke({ width: 2, color: 0x5d4037 });
  sofa.roundRect(x, y, sofaWidth, sofaHeight, 8).fill(0x6d4c41);
  sofa.roundRect(x + sofaWidth - 12, y + 5, 12, sofaHeight - 10, 6).fill(0x795548);

  const cushionHeight = (sofaHeight - 20) / 3;
  for (let i = 0; i < 3; i++) {
    sofa.roundRect(x + 8, y + 10 + i * cushionHeight, 35, cushionHeight - 2, 4).fill(0xa1887f);
    sofa.circle(x + 25, y + 10 + i * cushionHeight + cushionHeight / 2 - 1, 2).fill(0x5d4037);
  }

  sofa.roundRect(x + 5, y, 40, 15, 6).fill(0x6d4c41);
  sofa.roundRect(x + 5, y + sofaHeight - 15, 40, 15, 6).fill(0x6d4c41);

  const bounds = { x: x - 4, y: y - 2, width: sofaWidth, height: sofaHeight, label: "vertical-left-sofa" };
  if (camera && colliders) addWithCollider(camera, sofa, bounds, colliders);
  return sofa;
}

// ── Plant ─────────────────────────────────────────────────────────────────────
export function createPlant(x, y, camera, colliders) {
  const plant = new Graphics();
  plant.rect(x - 12, y + 8, 24, 18).fill(0x8b4513);
  plant.rect(x - 14, y + 6, 28, 4).fill(0xa0522d);
  plant.rect(x - 10, y + 8, 20, 3).fill(0x654321);
  plant.rect(x - 1, y - 2, 2, 12).fill(0x228b22);
  plant.circle(x - 12, y - 8, 9).fill(0x006400);
  plant.circle(x + 12, y - 8, 9).fill(0x006400);
  plant.circle(x - 8, y - 12, 10).fill(0x228b22);
  plant.circle(x + 8, y - 12, 10).fill(0x228b22);
  plant.circle(x - 4, y - 18, 8).fill(0x32cd32);
  plant.circle(x + 4, y - 18, 8).fill(0x32cd32);
  plant.circle(x, y - 22, 11).fill(0x32cd32);
  plant.circle(x - 6, y - 25, 5).fill(0x90ee90);
  plant.circle(x + 6, y - 25, 5).fill(0x90ee90);

  const bounds = { x: x - 14, y: y - 30, width: 28, height: 56, label: "plant" };
  if (camera && colliders) addWithCollider(camera, plant, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "plant", bounds, message: "A small healthy plant brightens the space.", bubble: null });
  return plant;
}

// ── Whiteboard ────────────────────────────────────────────────────────────────
export function createWhiteboard(x, y, camera, colliders) {
  const board = new Graphics();
  board.rect(x - 5, y - 40, 10, 80).fill(0xffffff);
  board.rect(x - 6, y - 41, 12, 82).stroke({ width: 2, color: 0x2c3e50 });

  const bounds = { x: x - 6, y: y - 41, width: 12, height: 82, label: "whiteboard" };
  if (colliders) addWithCollider(camera, board, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "whiteboard", bounds, message: "A simple whiteboard...nothing to do here", bubble: null });
  return board;
}

// ── Bookshelf ─────────────────────────────────────────────────────────────────
export function createBookshelf(x, y, camera, colliders) {
  const shelf = new Graphics();
  const width = 60, height = 100, shelfCount = 3;

  shelf.rect(x, y, width, height).fill(0x5d4037);
  shelf.rect(x + width - 2, y + 2, 2, height - 2).fill(0x3e2723);
  shelf.rect(x, y, 1, height).fill(0x8d6e63);

  const shelfHeight = height / (shelfCount + 1);
  for (let i = 1; i <= shelfCount; i++) {
    const shelfY = y + i * shelfHeight;
    shelf.rect(x + 2, shelfY - 1, width - 4, 2).fill(0x6d4c41);
  }

  const bookColors = [0xe74c3c, 0x3498db, 0x27ae60, 0xf1c40f, 0x9b59b6, 0xe67e22, 0x1abc9c, 0x34495e, 0x8e44ad];
  for (let row = 0; row < shelfCount; row++) {
    let bx = x + 5;
    const by = y + row * shelfHeight + 5;
    while (bx < x + width - 10) {
      const bookWidth = 5 + Math.floor(Math.random() * 4);
      const bookHeight = shelfHeight - 10 - Math.floor(Math.random() * 5);
      const bookY = by + (shelfHeight - 10 - bookHeight);
      shelf.rect(bx, bookY, bookWidth, bookHeight).fill(bookColors[Math.floor(Math.random() * bookColors.length)]);
      bx += bookWidth + 2;
    }
  }

  const bounds = { x: x - 3, y, width: width + 4, height, label: "bookshelf" };
  if (camera && colliders) addWithCollider(camera, shelf, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "bookshelf", bounds, message: "A handcrafted wooden bookshelf filled with colorful books.", bubble: null });
  return shelf;
}

// ── Printer ───────────────────────────────────────────────────────────────────
export function createPrinter(x, y) {
  const printer = new Graphics();
  printer.rect(x - 20, y - 15, 40, 30).fill(0xbdc3c7);
  printer.rect(x - 15, y - 10, 30, 5).fill(0x2c3e50);
  return printer;
}

// ── Waste Bin ─────────────────────────────────────────────────────────────────
export function createWasteBin(x, y) {
  const bin = new Graphics();
  const width = 15, height = 20;
  bin.rect(x, y + 2, width, height - 2).fill(0x7f8c8d);
  bin.rect(x, y + 2, 2, height - 2).fill(0x95a5a6);
  bin.rect(x - 1, y, width + 2, 4).fill(0x5d6d7e);
  bin.rect(x + 2, y + 6, width - 4, height - 8).fill(0x2c3e50);
  bin.rect(x + 4, y + 2, width - 8, 2).fill(0x1a1a1a);
  return bin;
}

// ── Floor Mat ─────────────────────────────────────────────────────────────────
export function createFloorMat(x, y, rotation = 0) {
  const mat = new Graphics();
  const width = 80, height = 40;

  mat.roundRect(0, 0, width, height, 8).fill(0x2c3e50).stroke({ width: 2, color: 0x4a4a4a });
  mat.roundRect(3, 3, width - 6, height - 6, 6).fill(0x34495e);

  mat.pivot.set(width / 2, height / 2);
  mat.x = x;
  mat.y = y;
  mat.rotation = rotation;
  return mat;
}

// ── Vending Machine ───────────────────────────────────────────────────────────
export function createVendingMachine(x, y, camera, colliders) {
  const machine = new Container();

  const body = new Graphics();
  body.rect(x, y, 40, 80).fill(0x2c3e50);
  body.rect(x, y, 2, 80).fill(0x34495e);
  body.rect(x + 38, y + 2, 2, 78).fill(0x1a252f);

  const glassFront = new Graphics();
  glassFront.rect(x + 5, y + 10, 30, 50).fill({ color: 0x85c1e9, alpha: 0.3 }).stroke({ width: 2, color: 0x34495e });
  glassFront.rect(x + 6, y + 11, 8, 48).fill({ color: 0xffffff, alpha: 0.2 });

  const snacks = new Container();
  const snackColors = [0xe74c3c, 0xf39c12, 0x27ae60, 0x9b59b6];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const snack = new Graphics();
      snack.rect(x + 8 + col * 8, y + 15 + row * 10, 6, 6).fill(snackColors[row]);
      snacks.addChild(snack);
    }
  }

  const controlPanel = new Graphics();
  controlPanel.rect(x + 3, y + 62, 34, 16).fill(0x34495e);
  controlPanel.rect(x + 5, y + 65, 8, 3).fill(0x1a252f);
  controlPanel.rect(x + 8, y + 72, 24, 6).fill(0x000000);

  machine.addChild(body, glassFront, snacks, controlPanel);

  let time = 0;
  function animate() {
    time += 0.02;
    machine.x = Math.sin(time * 8) * 0.15;
    requestAnimationFrame(animate);
  }
  animate();

  const bounds = { x, y, width: 40, height: 82, label: "vending-machine" };
  if (colliders && camera) addWithCollider(camera, machine, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "vending-machine", bounds, message: "The vending machine hums softly. The coin slot seems jammed.", bubble: null });
  return machine;
}

// ── Digital Clock ─────────────────────────────────────────────────────────────
export function createDigitalClock(x, y, camera, colliders) {
  const clock = new Graphics();
  clock.rect(x - 2, y - 2, 84, 34).fill(0x34495e);
  clock.rect(x, y, 80, 30).fill(0x2c3e50);
  clock.rect(x + 5, y + 5, 70, 20).fill(0x0a0a0a);

  const timeText = new Text({
    text: "00:00:00",
    style: new TextStyle({ fontSize: 14, fill: 0x00ff41, fontFamily: "monospace", fontWeight: "bold" }),
  });
  timeText.x = x + 40;
  timeText.y = y + 15;
  timeText.anchor.set(0.5);
  clock.addChild(timeText);

  function updateTime() {
    const now = new Date();
    let hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    timeText.text = `${hours.toString().padStart(2, "0")} ${minutes} ${seconds}`;
  }
  updateTime();
  const interval = setInterval(updateTime, 1000);
  clock._clockInterval = interval;

  const bounds = { x: x - 2, y: y - 2, width: 84, height: 34, label: "digital-clock" };
  if (camera && colliders) addWithCollider(camera, clock, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "digital-clock", bounds, message: "The digital clock shows the current time.", bubble: null });
  return clock;
}

// ── Water Dispenser ───────────────────────────────────────────────────────────
export function createWaterDispenser(x, y, camera, colliders) {
  const dispenser = new Graphics();

  function render() {
    dispenser.clear();
    const t = Date.now() * 0.001;
    dispenser.rect(x, y, 30, 60).fill(0x3498db);
    dispenser.rect(x + 3, y + 3, 8, 54).fill(0x74b9ff);
    dispenser.rect(x + 5, y - 15, 20, 20).fill(0x85c1e9);
    dispenser.rect(x + 6, y - 14, 6, 18).fill(0xa8d5f2);
    dispenser.rect(x + 13, y - 18, 4, 3).fill(0x34495e);
    dispenser.rect(x + 8, y + 35, 14, 20).fill(0x1a5490);
    dispenser.circle(x + 10, y + 45, 3).fill(0x34495e);
    dispenser.circle(x + 20, y + 45, 3).fill(0x34495e);
    dispenser.rect(x + 4, y + 15, 22, 12).fill(0x2c3e50);
    dispenser.rect(x + 6, y + 17, 4, 3).fill(0xe74c3c);
    dispenser.rect(x + 12, y + 17, 4, 3).fill(0x3498db);
    dispenser.rect(x + 18, y + 17, 4, 3).fill(0x2ecc71);
    dispenser.rect(x + 5, y + 55, 20, 3).fill(0x95a5a6);
  }

  render();
  function animate() { render(); requestAnimationFrame(animate); }
  animate();

  const bounds = { x, y: y - 15, width: 30, height: 77, label: "water-dispenser" };
  if (camera && colliders) addWithCollider(camera, dispenser, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "water-dispenser", bounds, message: "You watch the endless flow of pixels. This water dispenser is decorative", bubble: null });
  return dispenser;
}

// ── Info Board ────────────────────────────────────────────────────────────────
export function createInfoBoard(offsetX, offsetY) {
  const infoBoard = new Graphics();
  infoBoard.rect(offsetX + 123, offsetY - 12, 34, 44).fill(0x2c3e50);
  infoBoard.rect(offsetX + 125, offsetY - 10, 30, 40).fill(0xe3f2fd);
  infoBoard.rect(offsetX + 125, offsetY - 10, 30, 40).stroke({ width: 1, color: 0x546e7a });
  infoBoard.circle(offsetX + 150, offsetY - 6, 1.5).fill(0x27ae60);

  const infoLines = [
    { x: offsetX + 127, y: offsetY - 7, width: 20, height: 2 },
    { x: offsetX + 127, y: offsetY - 2, width: 22, height: 1 },
    { x: offsetX + 127, y: offsetY + 2, width: 18, height: 1 },
    { x: offsetX + 127, y: offsetY + 6, width: 24, height: 1 },
    { x: offsetX + 127, y: offsetY + 10, width: 16, height: 1 },
  ];
  infoLines.forEach((line) => {
    infoBoard.rect(line.x, line.y, line.width, line.height).fill({ color: 0x7f8c8d, alpha: 0.6 });
  });

  return infoBoard;
}

// ── Decor Table ───────────────────────────────────────────────────────────────
export function createDecorTable(x, y, camera, colliders) {
  const table = new Graphics();
  const tableWidth = 80, tableHeight = 50;

  table.roundRect(x, y, tableWidth, tableHeight, 4).fill(0xd2691e).stroke({ width: 2, color: 0x8b4513 });

  const vaseX = x + tableWidth * 0.6, vaseY = y + tableHeight * 0.5;
  table.ellipse(vaseX, vaseY, 8, 6).fill(0x87ceeb);
  table.ellipse(vaseX, vaseY, 6, 4).fill(0x4682b4);

  const flowers = [
    { color: 0xff69b4, x: vaseX - 3, y: vaseY - 2 },
    { color: 0xffd700, x: vaseX + 2, y: vaseY - 3 },
    { color: 0xff4500, x: vaseX - 1, y: vaseY + 2 },
  ];
  flowers.forEach((flower) => table.circle(flower.x, flower.y, 2).fill(flower.color));

  table.rect(x + 8, y + 8, 20, 15).fill(0xf5f5f5).stroke({ width: 1, color: 0x696969 });

  const bounds = { x, y, width: tableWidth, height: tableHeight, label: "decor-table" };
  if (camera && colliders) addWithCollider(camera, table, bounds, colliders);
  if (!window.interactables) window.interactables = [];
  window.interactables.push({ label: "decor-table", bounds, message: "The table looks nicely decorated...better not mess with it", bubble: null });
  return table;
}

// ── Plain Table ───────────────────────────────────────────────────────────────
export function createTable(x, y, camera, colliders) {
  const table = new Graphics();
  const tableWidth = 80, tableHeight = 50;
  table.roundRect(x, y, tableWidth, tableHeight, 4).fill(0xd2691e).stroke({ width: 2, color: 0x8b4513 });

  if (camera && colliders) {
    addWithCollider(camera, table, { x, y, width: tableWidth, height: tableHeight, label: "table" }, colliders);
  }
  return table;
}

// ── Study Table ───────────────────────────────────────────────────────────────
export function createStudyTable(x, y, camera, colliders) {
  const table = new Graphics();
  table.rect(x - 62, y + 8, 6, 25).fill(0x654321);
  table.rect(x + 56, y + 8, 6, 25).fill(0x654321);
  table.rect(x - 62, y - 18, 6, 25).fill(0x5a3c1a);
  table.rect(x + 56, y - 18, 6, 25).fill(0x5a3c1a);
  table.rect(x - 60, y + 20, 120, 4).fill(0x5a3c1a);
  table.rect(x - 70, y - 20, 140, 30).fill(0x8b5a2b).stroke({ color: 0x654321, width: 2 });
  table.rect(x - 68, y - 18, 136, 2).fill(0xa66830);

  const laptop = new Graphics();
  laptop.rect(x - 40, y - 15, 35, 20).fill(0x2c3e50);
  laptop.rect(x - 36, y - 14, 27, 15).fill(0x000000);
  laptop.rect(x - 37, y - 12, 29, 12).fill(0x34495e);
  table.addChild(laptop);

  const book = new Graphics();
  book.rect(x + 8, y - 14, 29, 18).fill(0xffffff).stroke({ color: 0xbdc3c7, width: 1 });
  book.rect(x + 22, y - 12, 2, 16).fill(0xbdc3c7);
  table.addChild(book);

  const lamp = new Graphics();
  lamp.circle(x + 47, y - 5, 8).fill(0x34495e);
  lamp.rect(x + 45, y - 12, 4, 8).fill(0x34495e);
  lamp.rect(x + 42, y - 20, 8, 4).fill(0x34495e);
  lamp.moveTo(x + 40, y - 25).lineTo(x + 54, y - 25).lineTo(x + 52, y - 20).lineTo(x + 42, y - 20).lineTo(x + 40, y - 25).fill(0x34495e);
  table.addChild(lamp);

  if (camera && colliders) {
    addWithCollider(camera, table, { x: x - 70, y: y - 20, width: 140, height: 30, label: "study-table" }, colliders);
  }
  return table;
}

// ── Office Counters ───────────────────────────────────────────────────────────
export function createOfficeCounters(x, y, n, camera, colliders) {
  const officeArea = new Graphics();
  const spacing = 100;
  const startX = x - spacing * 1.5;

  for (let i = 0; i < n; i++) {
    const counterX = startX + i * spacing;

    const counter = new Graphics();
    counter.rect(counterX - 40, y - 25, 80, 50).fill(0xa0522d);
    counter.rect(counterX - 40, y - 25, 80, 2).fill(0xcd853f);
    counter.rect(counterX - 40, y + 23, 80, 4).fill(0x5d4037);

    const laptop = new Graphics();
    laptop.rect(counterX - 15, y - 15, 30, 20).fill(0x2c3e50);
    laptop.rect(counterX - 13, y - 30, 26, 15).fill(0x34495e);
    laptop.rect(counterX - 11, y - 28, 22, 11).fill(0x1a1a2e);
    counter.addChild(laptop);

    const chair = createOfficeChair(counterX, y + 60, false);
    counter.addChild(chair);

    officeArea.addChild(counter);

    const backWall = new Graphics();
    backWall.rect(counterX - 45, y - 38, 90, 6).fill(0x95a5a6);
    officeArea.addChild(backWall);

    if (i === 0) {
      const leftWall = new Graphics();
      leftWall.rect(counterX - 50, y - 38, 6, 66).fill(0x95a5a6);
      officeArea.addChild(leftWall);
      if (camera && colliders) {
        addWithCollider(camera, leftWall, { x: counterX - 50, y: y - 38, width: 6, height: 66, label: "cubicle-wall-left" }, colliders);
      }
    }

    if (i === n - 1) {
      const rightWall = new Graphics();
      rightWall.rect(counterX + 45, y - 38, 6, 66).fill(0x95a5a6);
      officeArea.addChild(rightWall);
      if (camera && colliders) {
        addWithCollider(camera, rightWall, { x: counterX + 45, y: y - 38, width: 6, height: 66, label: "cubicle-wall-right" }, colliders);
      }
    }

    if (i !== 0) {
      const sideWall = new Graphics();
      sideWall.rect(counterX - 50, y - 38, 6, 66).fill(0x95a5a6);
      officeArea.addChild(sideWall);
      if (camera && colliders) {
        addWithCollider(camera, sideWall, { x: counterX - 50, y: y - 38, width: 6, height: 66, label: `cubicle-divider-${i}` }, colliders);
      }
    }

    if (camera && colliders) {
      addWithCollider(camera, counter, { x: counterX - 40, y: y - 25, width: 80, height: 50, label: `office-counter-${i + 1}` }, colliders);
      addWithCollider(camera, backWall, { x: counterX - 45, y: y - 36, width: 90, height: 6, label: `cubicle-back-wall-${i + 1}` }, colliders);
    }
  }

  return officeArea;
}

// ── Cat ───────────────────────────────────────────────────────────────────────
export function createCat(x, y, f1 = true, camera, colliders) {
  const cat = new Container();
  let animationTime = 0, sleepCycle = 0, tailWag = 0, breathing = 0;

  const shadow = new Graphics();
  shadow.ellipse(0, 18, 35, 8).fill({ color: 0x4a3c28, alpha: 0.3 });

  const body = new Graphics();
  body.ellipse(0, 0, 22, 10).fill(f1 ? 0xf4d03f : 0xb2beb5);

  const head = new Graphics();
  head.circle(0, 0, 8).fill(f1 ? 0xf4d03f : 0xb2beb5);
  head.rect(-5, -10, 4, 5).fill(f1 ? 0xf4d03f : 0xb2beb5);
  head.rect(1, -10, 4, 5).fill(f1 ? 0xf4d03f : 0xb2beb5);

  const eyeL = new Graphics();
  eyeL.moveTo(-6, -3).lineTo(-2, -3).stroke({ width: 1.5, color: 0x2c3e50 });
  const eyeR = new Graphics();
  eyeR.moveTo(2, -3).lineTo(6, -3).stroke({ width: 1.5, color: 0x2c3e50 });

  const nose = new Graphics();
  nose.poly([0, 1, -2, 3, 2, 3]).fill(0xf1c40f);

  const whiskers = new Graphics();
  whiskers.moveTo(-8, 0).lineTo(-15, -1).moveTo(-8, 2).lineTo(-15, 3)
    .moveTo(8, 0).lineTo(15, -1).moveTo(8, 2).lineTo(15, 3).stroke({ width: 1, color: 0x000000 });

  const tail = new Graphics();
  tail.ellipse(0, 0, 10, 4).fill(f1 ? 0xf4d03f : 0xb2beb5);

  [shadow, body, tail, head, eyeL, eyeR, nose, whiskers].forEach((p) => cat.addChild(p));
  cat.x = x;
  cat.y = y;

  const sleepZs = new Container();
  cat.addChild(sleepZs);

  function animate() {
    animationTime += 0.1;
    sleepCycle += 0.05;
    tailWag = Math.sin(animationTime * 2) * 0.3;
    breathing = Math.sin(animationTime * 1.5) * 0.02;
    body.scale.y = 1 + breathing;
    tail.x = -30 + Math.sin(tailWag) * 3;
    tail.y = -5 + Math.cos(tailWag) * 2;
    tail.rotation = tailWag * 0.5;
    head.x = 18;
    head.y = -10 + Math.sin(sleepCycle) * 2;
    [eyeL, eyeR, nose, whiskers].forEach((p) => { p.x = 18; p.y = head.y; });

    if (Math.random() < 0.02) {
      const z = new Text("z", { fontSize: 8, fill: 0x5d6d7e });
      z.x = 15 + Math.random() * 10;
      z.y = -25;
      z.life = 120;
      z.maxLife = 120;
      sleepZs.addChild(z);
    }
    sleepZs.children.forEach((z) => {
      z.life--;
      z.y -= 0.5;
      z.alpha = z.life / z.maxLife;
      if (z.life <= 0) sleepZs.removeChild(z);
    });
    requestAnimationFrame(animate);
  }
  animate();

  const bounds = { x: x - 35, y: y - 25, width: 65, height: 40, label: "sleeping-cat" };
  if (camera && colliders) addWithCollider(camera, cat, bounds, colliders);
  if (!window._mvInteractables) window._mvInteractables = [];
  window._mvInteractables.push({ label: "cat", bounds, message: "A smol cat sleeping...", bubble: null });
  window.interactables = window._mvInteractables;
  return cat;
}

// ── Sitting NPC ───────────────────────────────────────────────────────────────
export function createSittingNPC(x, y, camera, colliders, gameState, npcName = "??") {
  const npc = new Graphics();
  npc.rect(-6, -18, 12, 12).fill(0xf4c2a1);
  npc.rect(-7, -19, 14, 6).fill(0x4b2e1e);
  npc.rect(-8, -5, 16, 15).fill(0xffbf00);
  npc.rect(-10, -2, 3, 8).fill(0xf4c2a1);
  npc.rect(7, 0, 3, 6).fill(0xf4c2a1);
  npc.rect(-6, 10, 12, 6).fill(0x2c3e50);
  npc.rect(-5, 16, 4, 10).fill(0x2c3e50);
  npc.rect(1, 16, 4, 10).fill(0x2c3e50);
  npc.rect(-6, 26, 5, 3).fill(0x000000);
  npc.rect(1, 26, 5, 3).fill(0x000000);

  const nameTag = new Text({
    text: npcName,
    style: new TextStyle({ fontSize: 10, fill: 0xffffff, fontFamily: "Arial", stroke: { color: 0x000000, width: 2 } }),
  });
  nameTag.anchor.set(0.5);
  nameTag.y = -30;
  npc.addChild(nameTag);
  npc.x = x;
  npc.y = y;

  const bounds = { x: x - 15, y: y - 10, width: 22, height: 40, label: `sitting-npc-${npcName}` };
  if (camera && colliders) addWithCollider(camera, npc, bounds, colliders);
  if (!window._mvInteractables) window._mvInteractables = [];
  window._mvInteractables.push({ label: `sitting-npc-${npcName}`, bounds, message: "Tf is this...", bubble: null });
  window.interactables = window._mvInteractables;
  return npc;
}