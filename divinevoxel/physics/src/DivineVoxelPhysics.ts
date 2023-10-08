//types
import type { ColliderObject } from "Types/Physics/Collider.type.js";
//objects
import { VoxelMath } from "@divinevoxel/core/Math/index.js";
import { CollisionsHanlder } from "./Collisions/CollisionsHandler.js";
import { EntityBase } from "./Entities/EntityBase.js";
import { ColliderManager } from "./Colliders/ColliderManager.js";
import { DataTool } from "@divinevoxel/core/Tools/Data/DataTool.js";
//functions
import { RegisterDefaultColliders } from "./Colliders/Functions/RegisterDefaultColliders.js";
import { PhysicsDataTool } from "./Tools/Data/PhysicsDataTool.js";
import { DVPFlags } from "./Constants/Flags.js";
export const DVP = {
  math: VoxelMath,
  collisions: CollisionsHanlder,
  colliders: ColliderManager,
  constants: {
    flags: DVPFlags,
  },

  getDataTool() {
    return new PhysicsDataTool();
  },
};
RegisterDefaultColliders(DVP.colliders);
export type DivineVoxelEnginePhysics = typeof DVP;
