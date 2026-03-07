import { Container, Graphics, Text, TextStyle } from "pixi.js";

const PLAYER_BOUNDS = { offsetX: -8, offsetY: -12, width: 16, height: 45 };

export function willCollide(x, y, colliders) {
  const b = {
    x: x + PLAYER_BOUNDS.offsetX,
    y: y + PLAYER_BOUNDS.offsetY,
    width: PLAYER_BOUNDS.width,
    height: PLAYER_BOUNDS.height,
  };
  return colliders.some(
    (c) =>
      b.x < c.x + c.width &&
      b.x + b.width > c.x &&
      b.y < c.y + c.height &&
      b.y + b.height > c.y
  );
}

export function setupInput(gs) {
  const down = (e) => {
    gs.keys[e.code] = true;
  };
  const up = (e) => {
    gs.keys[e.code] = false;
  };
  window.addEventListener("keydown", down);
  window.addEventListener("keyup", up);
  gs.cleanup = () => {
    window.removeEventListener("keydown", down);
    window.removeEventListener("keyup", up);
  };
}

export function gameLoop(gs, app) {
  const { player, keys, world, ROOM_GRID, colliders, wallHackEnabled } = gs;
  if (!player || !world) return;

  const speed = gs.playerSpeed;
  const ROOM_W = ROOM_GRID.cols * ROOM_GRID.roomWidth;
  const ROOM_H = ROOM_GRID.rows * ROOM_GRID.roomHeight;

  let dx = 0,
    dy = 0;
  if (keys["KeyW"] || keys["ArrowUp"]) dy -= speed;
  if (keys["KeyS"] || keys["ArrowDown"]) dy += speed;
  if (keys["KeyA"] || keys["ArrowLeft"]) dx -= speed;
  if (keys["KeyD"] || keys["ArrowRight"]) dx += speed;

  if (dx !== 0 || dy !== 0) {
    const ox = player.x,
      oy = player.y;
    let nx = ox,
      ny = oy;

    if (wallHackEnabled || !willCollide(ox + dx, oy + dy, colliders)) {
      nx = ox + dx;
      ny = oy + dy;
    } else {
      if (wallHackEnabled || !willCollide(ox + dx, oy, colliders))
        nx = ox + dx;
      if (wallHackEnabled || !willCollide(ox, oy + dy, colliders))
        ny = oy + dy;
    }

    if (nx !== ox || ny !== oy) {
      player.x = nx;
      player.y = ny;
      const adx = nx - ox,
        ady = ny - oy;
      if (Math.abs(adx) >= Math.abs(ady))
        player.walk(adx > 0 ? "right" : "left");
      else player.walk(ady > 0 ? "down" : "up");
    } else {
      player.stop();
    }
  } else {
    player.stop();
  }

  player.x = Math.max(30, Math.min(ROOM_W - 30, player.x));
  player.y = Math.max(30, Math.min(ROOM_H - 30, player.y));

  const cx = app.screen.width / 2;
  const cy = app.screen.height / 2;
  world.x = Math.max(
    -(ROOM_W - app.screen.width),
    Math.min(0, cx - player.x)
  );
  world.y = Math.max(
    -(ROOM_H - app.screen.height),
    Math.min(0, cy - player.y)
  );

  // Z interaction
  if (keys["KeyZ"] && !window._mvBubbleActive) {
    const IM = 16;
    const list = window._mvInteractables || [];
    const nearby = list.find((obj) => {
      const b = obj.bounds;
      return (
        player.x + IM > b.x &&
        player.x - IM < b.x + b.width &&
        player.y + IM > b.y &&
        player.y - IM < b.y + b.height
      );
    });
    if (nearby) {
      if (nearby.bubble && !nearby.bubble.destroyed) {
        nearby.bubble.destroy({ children: true });
        nearby.bubble = null;
        window._mvBubbleActive = false;
      } else {
        const bubble = createTextBubble(
          player.x,
          player.y - 50,
          nearby.message,
          3000
        );
        gs.camera.addChild(bubble);
        nearby.bubble = bubble;
        window._mvBubbleActive = true;
        setTimeout(() => {
          window._mvBubbleActive = false;
          nearby.bubble = null;
        }, 3000);
      }
      gs.keys["KeyZ"] = false;
    }
  }
}

export function createTextBubble(x, y, text, duration) {
  const container = new Container();
  const padding = 14,
    radius = 10,
    tailH = 8;

  const textObj = new Text({
    text,
    style: new TextStyle({
      fontSize: 13,
      fill: 0x1a1a2e,
      fontFamily: "JetBrains Mono, monospace",
      fontWeight: "bold",
      wordWrap: true,
      wordWrapWidth: 200,
      align: "center",
    }),
  });
  textObj.x = padding;
  textObj.y = padding;

  const bw = textObj.width + padding * 2;
  const bh = textObj.height + padding * 2;

  const bg = new Graphics();
  bg.roundRect(0, 0, bw, bh, radius).fill(0xffffff);
  bg.roundRect(0, 0, bw, bh, radius).stroke({ width: 2, color: 0x000000 });

  const tail = new Graphics();
  tail
    .poly([bw / 2 - 7, bh, bw / 2 + 7, bh, bw / 2, bh + tailH])
    .fill(0xffffff);
  tail
    .moveTo(bw / 2 - 7, bh)
    .lineTo(bw / 2, bh + tailH)
    .stroke({ width: 2, color: 0x000000 });
  tail
    .moveTo(bw / 2 + 7, bh)
    .lineTo(bw / 2, bh + tailH)
    .stroke({ width: 2, color: 0x000000 });

  container.addChild(bg, tail, textObj);
  container.x = x - bw / 2;
  container.y = y - bh - tailH;

  setTimeout(() => {
    if (container && !container.destroyed)
      container.destroy({ children: true });
  }, duration);
  return container;
}