import { Container, Graphics, Text, TextStyle, Ticker } from "pixi.js";

export function spawnPlayer(gs, name) {
  const player = new Container();

  const g = new Graphics();
  g.rect(-8, -5, 16, 20).fill(0x3498db);
  g.rect(-8, 13, 16, 2).fill(0x2980b9);
  g.rect(-6, -18, 12, 12).fill(0xf4c2a1);
  g.rect(-6, -8, 12, 2).fill(0xe6b596);
  g.rect(-7, -19, 14, 6).fill(0x4b2e1e);
  g.rect(-4, -15, 2, 2).fill(0xffffff);
  g.rect(2, -15, 2, 2).fill(0xffffff);
  g.rect(-3, -14, 1, 1).fill(0x000000);
  g.rect(3, -14, 1, 1).fill(0x000000);
  player.addChild(g);

  const legL = new Graphics();
  legL.rect(-6, 15, 5, 12).fill(0x2c3e50);
  legL.rect(-7, 27, 6, 4).fill(0x000000);

  const legR = new Graphics();
  legR.rect(1, 15, 5, 12).fill(0x2c3e50);
  legR.rect(1, 27, 6, 4).fill(0x000000);

  const armL = new Graphics();
  armL.rect(-10, -2, 3, 12).fill(0xf4c2a1);

  const armR = new Graphics();
  armR.rect(7, -2, 3, 12).fill(0xf4c2a1);

  player.addChild(legL, legR, armL, armR);

  const nameTag = new Text({
    text: name,
    style: new TextStyle({
      fontSize: 12,
      fill: 0xffffff,
      fontFamily: "JetBrains Mono",
      stroke: { color: 0x000000, width: 3 },
    }),
  });
  nameTag.anchor.set(0.5);
  nameTag.y = -38;
  player.addChild(nameTag);

  player.x = 400;
  player.y = 300;

  let walking = false,
    walkFrame = 0,
    direction = "down";

  const tickerFn = () => {
    if (!player.parent) return;
    if (walking) {
      walkFrame += 0.3;
      const swing = Math.sin(walkFrame) * 4;
      legL.y = swing;
      legR.y = -swing;
      armL.y = -swing * 0.7;
      armR.y = swing * 0.7;
      if (direction === "left") player.scale.x = -1;
      if (direction === "right") player.scale.x = 1;
      nameTag.scale.x = 1 / player.scale.x;
    } else {
      legL.y *= 0.85;
      legR.y *= 0.85;
      armL.y *= 0.85;
      armR.y *= 0.85;
    }
  };

  Ticker.shared.add(tickerFn);
  player._tickerFn = tickerFn;

  player.walk = (dir) => {
    walking = true;
    direction = dir;
  };
  player.stop = () => {
    walking = false;
  };

  gs.camera.addChild(player);
  gs.player = player;
}