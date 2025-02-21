import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { WorldSimulation } from "@divinevoxel/vlox/WorldSimulation";
import { TickInterval } from "@divinevoxel/vlox/Util/TickInterval";
import { Threads } from "@amodx/threads";
import RegisterCoreTasksWorld from "@dvegames/vlox/Core/Tasks/World/RegisterTasksWorld";
import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World/DivineVoxelEngineWorld";

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

    const dimension = WorldSimulation.getDimension(0);
    console.warn("got dimension", dimension, dimension.simulation);
    setTimeout(() => {
      console.log("add update");
      dimension.simulation.scheduleUpdate("liquid", 8, 8, 8, 0, null);
    }, 1_000);
    WorldSimulation.addGenerator(generator);
    tickInterval.start();
  });

  Threads.registerTask("world-ready", () => {});
}
