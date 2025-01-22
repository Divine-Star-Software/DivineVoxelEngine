import InitDataSync from "../Data/Sync/InitDataSync";
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor/DivineVoxelEngineConstructor";
import { Threads } from "@amodx/threads";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck";
import { VoxelModelConstructorRegister } from "../VoxelModels/Constructor/VoxelModelConstructorRegister";
import { SchemaRegister } from "../VoxelState/SchemaRegister";
import { LiquidGeometryNode } from "../VoxelModels/Constructor/Nodes/Custom/Liquid/LiquidGeomtryNode";
import { VoxelTagStates } from "../VoxelState/VoxelTagStates";

import { VoxelConstructor } from "../VoxelModels/Constructor/VoxelConstructor";
import { VoxelGeometryLookUp } from "../VoxelModels/Constructor/VoxelGeometryLookUp";
import { Environment } from "@amodx/core/Environment/Environment";
import ConstructorTasks from "../Contexts/Constructor/Tasks/ConstructorTasks";
export async function StartContrusctor(data: {} = {}) {
  const DVEC = new DivineVoxelEngineConstructor();
  ConstructorTasks(DVEC);
  DivineVoxelEngineConstructor.environment = Environment.nodeJS.isNode
    ? "node"
    : "browser";
  let parent = "render";
  if (DivineVoxelEngineConstructor.environment == "node") {
    parent = "server";
  }

  await Threads.init("constructor", parent);

  let ready = false;
  VoxelGeometryLookUp.init();

  InitDataSync({
    onSync(data) {
      if (data.modelData) {
        const modelData = data.modelData;
        VoxelModelConstructorRegister.registerCustomNode(
          "liquid",
          LiquidGeometryNode
        );
        VoxelModelConstructorRegister.setGeometryPalette(
          modelData.geometryPalette
        );

        VoxelModelConstructorRegister.registerGeometry(modelData.geometry);
        VoxelModelConstructorRegister.registerModels(modelData.models);

        for (const model of modelData.models) {
          SchemaRegister.registerModel(model.id, model.schema);
        }

        for (const voxel of modelData.voxels) {
          SchemaRegister.registerVoxel(
            voxel.id,
            voxel.modelId,
            voxel.modSchema
          );
        }
        VoxelTagStates.load(modelData.tagState);

        for (const voxel of modelData.voxels) {
          VoxelModelConstructorRegister.registerVoxel(
            new VoxelConstructor(
              voxel.id,
              VoxelModelConstructorRegister.modelData.get(voxel.modelId)!,
              voxel
            )
          );
        }
      }
      ready = true;
      DVEC.mesher.init(data);
    },
  });

  await CreatePromiseCheck({
    check: () => ready,
    checkInterval: 1,
  });

  return DVEC;
}
