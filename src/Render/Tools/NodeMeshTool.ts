import type { Mesh } from "@babylonjs/core";
import type { ConstructorTextureData, RawVoxelData } from "Meta/index.js";
import { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
import { DVER } from "../DivineVoxelEngineRender.js";
import { TextureManager } from "../Nodes/Textures/TextureManager.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { NodeManager } from "../Nodes/NodeManager.js";
import { DataTool } from "../../Tools/Data/DataTool.js";
import { DVEBabylon } from "../../Render/Nodes/DVEBabylon.js";

export class NodeMeshTool extends LocationBoundTool {
 constructor() {
  super();

  this.voxel.dataTool.setMode(DataTool.VOXEL_DATA_MODE);
 }
 texture = {
  build: (
   textureIdData: ConstructorTextureData,
   textureData: Uint8ClampedArray,
   onDone: (mesh: Mesh | false) => void
  ) => {
   const textureId = TextureManager.getTextureIndex(textureIdData);
   if (!textureId) return onDone(false);

   DVER.constructorCommManager.runPromiseTasks<BuildNodeMesh>(
    "build-node-mesh",
    [
     this.location,
     "#dve_node_texture",
     {
      textureId: textureId,
      textureData: textureData,
     },
    ],
    [textureData.buffer],
    (data: SetNodeMesh | false) => {
     if (!data) return onDone(false);
     onDone(NodeManager.meshes.create("#dve_node_texture", data));
     return;
    }
   );
  },
  buildAsync(
   textureIdData: ConstructorTextureData,
   textureData: Uint8ClampedArray
  ) {
   return new Promise((resolve) => {
    this.build(textureIdData, textureData, (data) => {
     resolve(data);
    });
   });
  },
 };
 voxel = {
  dataTool: new DataTool(),
  build: (voxelData: RawVoxelData, onDone: (mesh: Mesh | false) => void) => {
   DVER.constructorCommManager.runPromiseTasks<BuildNodeMesh>(
    "build-node-mesh",
    [this.location, "#dve_node_voxel", voxelData],
    [],
    (data: SetNodeMesh | false) => {
     if (!data) return onDone(false);
     const mesh = NodeManager.meshes.create(
      this.voxel.dataTool.loadInRaw(voxelData).getSubstnaceData().getRendered(),
      data
     );
     if (mesh) {
      mesh.unfreezeWorldMatrix();
      mesh.setPivotPoint(new DVEBabylon.system.Vector3(0.5, 0.5, 0.5));
     }
     (mesh as any).type = "node";
     onDone(mesh);
     return;
    }
   );
  },
  buildAsync(voxelData: RawVoxelData): Promise<Mesh | false> {
   return new Promise((resolve) => {
    this.build(voxelData, (data) => {
     resolve(data);
    });
   });
  },
 };
}
