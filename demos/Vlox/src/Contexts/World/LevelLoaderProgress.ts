import { Threads } from "@amodx/threads";
import { LevelLoaderProgressWorld } from "Loader/LevelLoaderProgressWorld";
import { Distance3D, Vec3Array } from "@amodx/math";
import { SectorState } from "@divinevoxel/vlox/World/Sector/SectorState";
import { WorldRegister } from "@divinevoxel/vlox/World/WorldRegister";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";
import { CardinalNeighbors2D } from "@divinevoxel/vlox/Math/CardinalNeighbors";
import { WorldSimulation } from "@divinevoxel/vlox/WorldSimulation";
let levelLoader: LevelLoaderProgressWorld;
let inte: any = null;
Threads.registerTask<OffscreenCanvas>(
  "set-offscreen-loader",
  async (canvas) => {
    levelLoader = new LevelLoaderProgressWorld(canvas);
  },
);
Threads.registerTask<OffscreenCanvas>(
  "start-level-loader-progress",
  async () => {
    const dimension = WorldSimulation.getDimension(0);

    const start: Vec3Array = [0, 0, 0];
    levelLoader.setUp([...start], [600, 600]);
    const radius = 300;
    inte = setInterval(() => {
      const search: Vec3Array[] = [[...start]];

      const added = new Set<string>();
      while (search.length) {
        const [x, y, z] = search.shift()!;

        const sector = WorldRegister.sectors.get(0, x, y, z);
        if (sector) {
          const simSector = dimension.activeSectors.get(...sector.position);
          if (simSector && simSector._rendered) {
            levelLoader.setState(sector.position, levelLoader.STATES.Meshed);
          } else {
            if (sector.buffer.byteLength == 0) {
              levelLoader.setState(sector.position, levelLoader.STATES.Locked);
            } else {
              levelLoader.setState(sector.position, levelLoader.STATES.Loaded);
              if (sector.getBitFlag(SectorState.Flags.isWorldGenDone)) {
                levelLoader.setState(
                  sector.position,
                  levelLoader.STATES.WorldGenComplete,
                );
              }
              if (sector.getBitFlag(SectorState.Flags.isWorldDecorDone)) {
                levelLoader.setState(
                  sector.position,
                  levelLoader.STATES.WorldDecorationComplete,
                );
              }
              if (sector.getBitFlag(SectorState.Flags.isWorldPropagationDone)) {
                levelLoader.setState(
                  sector.position,
                  levelLoader.STATES.WorldPropagationComplete,
                );
              }
              if (sector.getBitFlag(SectorState.Flags.isWorldSunDone)) {
                levelLoader.setState(
                  sector.position,
                  levelLoader.STATES.WorldSunComplete,
                );
              }
            }
          }
        }

        for (const [nx, nz] of CardinalNeighbors2D) {
          const newX = x + WorldSpaces.sector.bounds.x * nx;
          const newZ = z + WorldSpaces.sector.bounds.z * nz;
          const distance = Distance3D(...start, newX, 0, newZ);
          const sector = WorldRegister.sectors.get(0, newX, y, newZ);
          const key = WorldSpaces.hash.hashXYZ(newX, y, newZ);
          if (distance < radius && sector && !added.has(key)) {
            search.push([newX, 0, newZ]);
            added.add(key);
          }
        }
      }

      levelLoader.drawAll();
    }, 50);
  },
);
Threads.registerTask<OffscreenCanvas>(
  "stop-level-loader-progress",
  async () => {
    clearInterval(inte);
  },
);
