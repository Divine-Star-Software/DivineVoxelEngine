import { RenderedMaterials } from "./RenderedMaterials";
import { VoxelModelConstructorRegister } from "./Models/VoxelModelConstructorRegister.js";
import { LiquidGeometryNode } from "./Models/Nodes/Custom/Liquid/LiquidGeomtryNode.js";
import { SchemaRegister } from "../Voxels/State/SchemaRegister.js";
import { VoxelTagStates } from "../Voxels/State/VoxelTagStates.js";
import { VoxelConstructor } from "./Models/VoxelConstructor.js";
import { FinalCompiledVoxelModelData } from "../Voxels/Types/VoxelModelCompiledData.types";

export default function (
  materials: string[],
  modelData: FinalCompiledVoxelModelData
) {
  RenderedMaterials.register(materials);

  VoxelModelConstructorRegister.registerCustomNode(
    "liquid",
    LiquidGeometryNode
  );
  VoxelModelConstructorRegister.setGeometryPalette(modelData.geometryPalette);

  VoxelModelConstructorRegister.registerGeometry(modelData.geometry);
  VoxelModelConstructorRegister.registerModels(modelData.models);

  for (const model of modelData.models) {
    SchemaRegister.registerModel(model.id, model.schema);
  }

  for (const voxel of modelData.voxels) {
    SchemaRegister.registerVoxel(voxel.id, voxel.modelId, voxel.modSchema);
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
