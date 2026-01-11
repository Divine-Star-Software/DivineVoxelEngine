import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";

export function GenereateSpikePond(
  brush: BrushTool,
  ether: string,
  pillar: string,
  lamp: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  minPillarHeight = 5
) {
  let maxY = 30;
  let spaceHeight = (10 + Math.random() * 3) >> 0;

  // let noHole = true;
  for (let x = 0; x < +16; x++) {
    for (let z = 0; z < 16; z++) {
      let spikeHeight = (2 + Math.random() * 4) >> 0;
      let makePillar = Math.random() > 0.98;
      let pillarHeight = (minPillarHeight + Math.random() * 5) >> 0;
      for (let y = 0; y <= maxY + spaceHeight + pillarHeight; y++) {
        let tx = x + chunkX;
        let ty = y + chunkY;
        let tz = z + chunkZ;
        brush.setXYZ(tx, ty, tz);
        if (!makePillar) {
          if (y <= maxY - spaceHeight + 1) {
            brush.setId(pillar).paint();
          }
          if (y > maxY - spaceHeight && y <= maxY - spaceHeight + spikeHeight) {
            brush.setId(pillar).paint();
          }
          if (y <= maxY && y >= maxY - spaceHeight + spikeHeight) {
            brush.setId(ether).setLevel(7).paint().setLevel(0);
          }
        } else {
          if (y < maxY + spaceHeight + pillarHeight) {
            brush.setId(pillar).paint();
          }
          if (y == maxY + spaceHeight + pillarHeight) {
            brush.setId(lamp).paint();
          }
        }
      }
    }
  }
}

export function GenerateCappedSpikePond(
  brush: BrushTool,
  ether: string,
  pillar: string,
  lamp: string,
  stone: string,
  grass: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number
) {
  let maxY = (64 + Math.random() * 5) >> 0;
  let pondY = 30;
  let holeMade = false;
  let hole = false;
  let noHole = Math.random() > 0.2;
  let add = Math.random() > 0.5 ? -1 : 1;
  let spaceHeight = (15 + Math.random() * 3 * add) >> 0;
  let lampMax = 5;
  let currentLamp = 0;
  // let noHole = true;
  for (let x = 0; x < +16; x++) {
    for (let z = 0; z < 16; z++) {
      hole = false;
      if (Math.random() > 0.9 && !holeMade && !noHole) {
        hole = true;
        holeMade = true;
      }
      let addLamp = false;
      let flip = Math.random();
      if (flip > 0.5 && flip < 0.55 && currentLamp < lampMax) {
        addLamp = true;
        currentLamp++;
      }
      let makePillar = Math.random() > 0.98;
      let pondPilar = Math.random() > 0.98;
      let pillarLiquid = Math.random() > 0.98;
      let pondPillarSpikeHeight = (2 + Math.random() * 20) >> 0;
      let pondSpikeHeight = (2 + Math.random() * 4) >> 0;
      let spikeHeight = (4 + Math.random() * 6) >> 0;
      for (let y = 0; y < 120; y++) {
        if (y >= maxY - 20 - spaceHeight && y <= maxY + 6 && hole) {
          continue;
        }
        let tx = x + chunkX;
        let ty = y + chunkY;
        let tz = z + chunkZ;
        brush.setXYZ(tx, ty, tz);
        if (pillarLiquid && y < spikeHeight + maxY + add * spaceHeight) {
          brush.setId(ether).setLevel(7).paint().setLevel(0);
          continue;
        }
        if (pondPilar && y <= pondY + pondPillarSpikeHeight) {
          if (y == pondY + pondPillarSpikeHeight) {
            brush.setId(lamp).paint();
          } else {
            brush.setId(pillar).paint();
          }
        } else {
          if (y <= 20 + pondSpikeHeight) {
            brush.setId(pillar).paint();
          }
          if (y >= 20 + pondSpikeHeight && y <= pondY) {
            brush
              .setId(ether)
              .setLevel(7)
              .setLevelState(1)
              .paint()
              .setLevel(0)
              .setLevelState(0);
          }
        }

        if (
          y >= maxY + add * spaceHeight - spikeHeight + 5 &&
          y <= spikeHeight + maxY + add * spaceHeight
        ) {
          if (x == 0 || z == 0 || x == 15 || z == 15) {
            if (Math.random() > 0.7) {
              continue;
            }
          }
          if (y < maxY + spaceHeight) {
            if (!makePillar) {
              brush.setId(stone).paint();
            } else {
              if (y == maxY + add * spaceHeight - spikeHeight + 5) {
                brush.setId(lamp).paint();
              } else {
                brush.setId(pillar).paint();
              }
            }
          } else {
            brush.setId(stone).paint();
          }
        }
      }
    }
  }
}
