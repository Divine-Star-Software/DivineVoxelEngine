import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { WorldSimulation } from "@divinevoxel/vlox/WorldSimulation";
import { TickInterval } from "@divinevoxel/vlox/Util/TickInterval";
import { Threads } from "@amodx/threads";
import RegisterCoreTasksWorld from "@dvegames/vlox/Core/Tasks/World/RegisterTasksWorld";
import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World/DivineVoxelEngineWorld";
import { AdvancedBrush } from "@divinevoxel/vlox/Tools/Brush/AdvancedBrushTool";
import { TaskTool } from "@divinevoxel/vlox/Tools/Tasks/TasksTool";
export function SimulationTest(DVEW: DivineVoxelEngineWorld) {
  WorldSimulation.init({
    parent: DVEW.threads.parent,
    meshers: DVEW.threads.meshers,
    generators: DVEW.threads.generators,
  });

  const tickInterval = new TickInterval(() => WorldSimulation.tick(), 50);

  Threads.registerTask("start-world", async () => {
    const position = { x: 0, y: 0, z: 0 };
    console.warn("SIMULATION START");
    await WorldSimulation.Procedures.InitalLoad({
      logTasks: true,
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

    console.warn("got dimension", dimension, dimension.simulation);
    setTimeout(async () => {
      await brush
        .setId("dve_liquid_dream_ether")
        .setLevel(7)
        .setXYZ(8, 1, 8)
        .paintAsync();
        await brush
        .setXYZ(9, 1, 8)
        .paintAsync();
      brush.clear();

      setTimeout(async () => {
        console.warn("erease async");
        await brush.setXYZ(8, 1, 8).eraseAsync();
      }, 5_000);
    }, 1_000);
  });

  Threads.registerTask("world-ready", () => {});
}
