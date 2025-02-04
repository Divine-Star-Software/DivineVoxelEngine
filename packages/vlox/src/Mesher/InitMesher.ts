import { RenderedMaterials } from "./Models/RenderedMaterials";
import { VoxelModelConstructorRegister } from "./Models/VoxelModelConstructorRegister.js";
import { LiquidGeometryNode } from "./Models/Nodes/Custom/Liquid/LiquidGeomtryNode.js";
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

  for (const voxel of modelData.voxels) {
    VoxelModelConstructorRegister.registerVoxel(
      new VoxelConstructor(
        voxel.id,
        RenderedMaterials.meshersMap.get(voxel.materialId)!,
        VoxelModelConstructorRegister.modelData.get(voxel.modelId)!,
        voxel
      )
    );
  }
}
