import type { Mesh } from "@babylonjs/core";
import type { ConstructorTextureData } from "Meta/index.js";
import { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
import { DVER } from "../DivineVoxelEngineRender.js";
import { TextureManager } from "../Nodes/Textures/TextureManager.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { NodeManager } from "../Nodes/NodeManager.js";

export class NodeMeshTool extends LocationBoundTool {
 buildTexture(
  textureIdData: ConstructorTextureData,
  textureData: Uint8ClampedArray,
  onDone: (mesh: Mesh | false) => void
 ) {

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
 }
 asyncBuildTexture(
  textureIdData: ConstructorTextureData,
  textureData: Uint8ClampedArray
 ) {
  return new Promise((resolve) => {
   this.buildTexture(textureIdData, textureData, (data) => {
    resolve(data);
   });
  });
 }
}
