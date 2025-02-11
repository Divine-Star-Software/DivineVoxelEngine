import { RenderedMaterials } from "./Models/RenderedMaterials";
import { VoxelModelConstructorRegister } from "./Models/VoxelModelConstructorRegister.js";
import { LiquidGeometryNode } from "./Models/Nodes/Custom/Liquid/LiquidGeomtryNode.js";
import { VoxelConstructor } from "./Models/VoxelConstructor.js";
import { FinalCompiledVoxelModelData } from "../Voxels/Models/CompiledVoxelModel.types";
import { AOOcclusionFaceIndex } from "../Voxels/Models/Indexing/AOOcclusionFaceIndex";
import { CulledOcclusionFaceIndex } from "../Voxels/Models/Indexing/CulledOcclusionFaceIndex";

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
  VoxelModelConstructorRegister.aoIndex = new AOOcclusionFaceIndex(
    modelData.aoIndex
  );
  VoxelModelConstructorRegister.faceCullIndex = new CulledOcclusionFaceIndex(
    modelData.faceCullIndex
  );
  VoxelModelConstructorRegister.vertexHitMap = modelData.vertexHitMap;
  VoxelModelConstructorRegister.faceCullMap = modelData.faceCullMap;

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
