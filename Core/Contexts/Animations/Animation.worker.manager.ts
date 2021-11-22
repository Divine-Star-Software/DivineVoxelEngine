import { AnimationHanlder } from "./AnimationHanlder.worker.js";

console.log("sup");
const animationHanlder = new AnimationHanlder();

const animatedChunkTemplates: number[][][] = [];

const handleWorldMessage = (event: MessageEvent) => {
  const data = event.data;

  const message = data[0];

  if (message == "update-animated-chunk") {
    const chunkX = data[1];
    const chunkZ = data[2];
    const chunkFaceTemplate = data[3];
    const chunkBlockTemplate = data[4];
    animatedChunkTemplates[chunkX] ??= [];

    animatedChunkTemplates[chunkX][chunkZ] = [
      //@ts-ignore
      chunkFaceTemplate,
      //@ts-ignore
      chunkBlockTemplate,
    ];
  }

  if (message == "register-animatied-chunk") {
    const chunkX = data[1];
    const chunkZ = data[2];
    const chunkFaceTemplate = data[3];
    const chunkBlockTemplate = data[4];
    animatedChunkTemplates[chunkX] ??= [];

    animatedChunkTemplates[chunkX][chunkZ] = [
      //@ts-ignore
      chunkFaceTemplate,
      //@ts-ignore
      chunkBlockTemplate,
    ];
  }

  if (message == "remove-animatied-chunk") {
    const chunkX = data[1];
    const chunkZ = data[2];

    if (!animatedChunkTemplates[chunkX]) return;
    if (!animatedChunkTemplates[chunkX][chunkZ]) return;
    delete animatedChunkTemplates[chunkX][chunkZ];
  }
};

const chunkSize = 16;
const chunkRadius = 4;

const start = () => {
  //run animations
  setInterval(() => {
    const chunkX = animationHanlder.playerChunkPosition[0];
    const chunkZ = animationHanlder.playerChunkPosition[1];

    const direction = animationHanlder.playerDirection[0];
    // console.log(chunkX,chunkZ,direction);

    const bottomLeftQuadStartX = chunkX - chunkSize * chunkRadius;
    const bottomLeftQuadStartZ = chunkZ - chunkSize * chunkRadius;

    const bottomRightuadStartX = chunkX + chunkSize * chunkRadius;
    const bottomRightQuadStartZ = chunkZ - chunkSize * chunkRadius;

    const topLeftuadStartX = chunkX - chunkSize * chunkRadius;
    const topLeftQuadStartZ = chunkZ + chunkSize * chunkRadius;

    const topRightuadStartX = chunkX + chunkSize * chunkRadius;
    const topRightQuadStartZ = chunkZ + chunkSize * chunkRadius;

    if (!animatedChunkTemplates[chunkX]) return;
    if (!animatedChunkTemplates[chunkX][chunkZ]) return;
    const chunkTemplate = animatedChunkTemplates[chunkX][chunkZ];
    //@ts-ignore
    animationHanlder.sendAnimation(chunkX, chunkZ, chunkTemplate);

    //adding to event que instead of call stack
    if (direction == 5 || direction == 7 || direction == 6 || direction == 1) {
      setTimeout(() => {
        for (let blx = bottomLeftQuadStartX; blx < chunkX; blx += 16) {
          if (!animatedChunkTemplates[blx]) continue;
          for (let blz = bottomLeftQuadStartZ; blz < chunkZ; blz += 16) {
            if (!animatedChunkTemplates[blx][blz]) continue;
            const chunkTemplate = animatedChunkTemplates[blx][blz];
            if (blz == chunkX && blx == chunkZ) continue;
            //@ts-ignore
            animationHanlder.sendAnimation(blx, blz, chunkTemplate);
          }
        }
      }, 0);
    }
    if (
      direction == 5 ||
      direction == 3 ||
      direction == 6 ||
      direction == 2 ||
      direction == 7
    ) {
      setTimeout(() => {
        for (let blx = bottomRightuadStartX; blx > chunkX - 16; blx -= 16) {
          if (!animatedChunkTemplates[blx]) continue;
          for (let blz = bottomRightQuadStartZ; blz < chunkZ; blz += 16) {
            if (!animatedChunkTemplates[blx][blz]) continue;
            const chunkTemplate = animatedChunkTemplates[blx][blz];
            if (blz == chunkX && blx == chunkZ) continue;
            //@ts-ignore
            animationHanlder.sendAnimation(blx, blz, chunkTemplate);
          }
        }
      }, 0);
    }
    if (direction == 0 || direction == 1 || direction == 2 || direction == 6) {
      setTimeout(() => {
        for (let blx = topLeftuadStartX; blx < chunkX; blx += 16) {
          if (!animatedChunkTemplates[blx]) continue;
          for (let blz = topLeftQuadStartZ; blz > chunkZ - 16; blz -= 16) {
            if (!animatedChunkTemplates[blx][blz]) continue;
            const chunkTemplate = animatedChunkTemplates[blx][blz];
            if (blz == chunkX && blx == chunkZ) continue;
            //@ts-ignore
            animationHanlder.sendAnimation(blx, blz, chunkTemplate);
          }
        }
      }, 0);
    }
    if (direction == 0 || direction == 2 || direction == 1 || direction == 3) {
      setTimeout(() => {
        for (let blx = topRightuadStartX; blx > chunkX - 16; blx -= 16) {
          if (!animatedChunkTemplates[blx]) continue;
          for (let blz = topRightQuadStartZ; blz > chunkZ - 16; blz -= 16) {
            if (!animatedChunkTemplates[blx][blz]) continue;
            const chunkTemplate = animatedChunkTemplates[blx][blz];
            if (blz == chunkX && blx == chunkZ) continue;
            //@ts-ignore
            animationHanlder.sendAnimation(blx, blz, chunkTemplate);
          }
        }
      }, 0);
    }
  }, 80);
};

/* addEventListener("message", (event: MessageEvent) => {
  const message = event.data[0];
  // console.log(event.data);

  if (message == "connect-animator") {
    const port = event.ports[0];

    animationHanlder.connectAnimator(port);
  }
  if (message == "connect-world") {
    const port = event.ports[0];
    port.onmessage = (event: MessageEvent) => {
      handleWorldMessage(event);
    };
  }

  if (event.data == "start") {
 //start();
  }

  if (message == "connect-player") {
    animationHanlder.setPlayerSharedArrays(
      event.data[1],
      event.data[2],
      event.data[3]
    );
  }
});
 */