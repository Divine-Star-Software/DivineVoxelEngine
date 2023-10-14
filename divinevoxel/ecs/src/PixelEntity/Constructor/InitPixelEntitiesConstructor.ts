import type { CreatePixelEntityShapeTask } from "../Types/PixelEntities.types";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Constructor/DivineVoxelEngineConstructor.js";
import { PixelEntitiesConstructor } from "./PixelEntitiesConstructor.js";
export async function InitPixelEntitesConstructor() {
  DivineVoxelEngineConstructor.instance.TC.registerTasks<CreatePixelEntityShapeTask>(
    "create-pixel-entity-shape",
    async (data, onDone) => {
      if (!onDone) return;
      const meshData = await PixelEntitiesConstructor.createPixelEntity();
      onDone(meshData[0], meshData[1]);
    },
    "deferred"
  );
}
