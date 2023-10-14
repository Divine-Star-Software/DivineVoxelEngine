import type { CreatePixelEntityTask } from "../Types/PixelEntities.types";

import { DVEN } from "@divinevoxel/core/Nexus/DivineVoxelEngineNexus.js";

import { PixelEntitiesNexus } from "./PixelEntitiesNexus.js";
import { PixelEntityAnimationManager } from "./Animations/PixelEntityAnimationManager.js";

export async function InitPixelEntitesNexus() {
  DVEN.TC.registerTasks<CreatePixelEntityTask>(
    "create-pixel-entity",
    async (data, onDone) => {
      if (!onDone) return;
      const entityData = await PixelEntitiesNexus.createPixelEntity(data);
      onDone(entityData);
    },
    "deferred"
  );

  DVEN.TC.registerTasks<string>(
    "destroy-pixel-entity",
    async (data, onDone) => {
      if (!onDone) return;
      PixelEntityAnimationManager.destroyEntity(data);
    },
    "deferred"
  );

  DVEN.TC.registerTasks<string>(
    "destroy-pixel-entity-type",
    async (data, onDone) => {
      if (!onDone) return;
      PixelEntityAnimationManager.destroyEntityType(data);
    },
    "deferred"
  );
}
