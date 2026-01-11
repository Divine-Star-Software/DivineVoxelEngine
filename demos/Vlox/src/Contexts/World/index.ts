import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import InitDebugMapWorld from "@divinevoxel/vlox-babylon/Debug/GenMap/InitDebugMapWorld";
import { WorldSimulation } from "@divinevoxel/vlox/WorldSimulation";
import { TickInterval } from "@divinevoxel/vlox/Util/TickInterval";
import { Threads } from "@amodx/threads";
InitDebugMapWorld();
const DVEW = await StartWorld();

WorldSimulation.init({
  parent: DVEW.threads.parent,
  meshers: DVEW.threads.meshers,
  generators: DVEW.threads.generators,
});

const tickInterval = new TickInterval(() => WorldSimulation.tick(), 50);
Threads.registerTask("start-world", async () => {
  const position = { x: 0, y: 0, z: 0 };
  await WorldSimulation.Procedures.InitalLoad({
    //  logTasks: true,
    genData: {
      position,
      renderRadius: 150,
      generationRadius: 250,
      maxRadius: 300,
    },
  });
  const generator = WorldSimulation.createGenerator({
    position,
    renderRadius: 150,
    generationRadius: 250,
    maxRadius: 300,
  });

  WorldSimulation.addGenerator(generator);
  tickInterval.start();

  const dimension = WorldSimulation.getDimension(0);

  const brush = dimension.getBrush();
});

Threads.registerTask("world-ready", () => {});
