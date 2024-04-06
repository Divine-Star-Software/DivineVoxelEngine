import type { RawVoxelData } from "@divinevoxel/core/Types/index.js";
import { BuildNodeMesh, SetNodeMesh } from "../Tasks/BuidlerTasks.types.js";
import {
  DivineVoxelEngineRender as DVER,
  DivineVoxelEngineRender,
} from "@divinevoxel/core/render/DivineVoxelEngineRender.js";
import { TextureManager } from "../../Textures/TextureManager.js";
import { LocationBoundTool } from "@divinevoxel/core/Tools/Classes/LocationBoundTool.js";
import type { ConstructorTextureData } from "../../Textures/Constructor.types.js";

import { DataTool } from "@divinevoxel/core/Tools/Data/DataTool.js";
import { EntityTool } from "@divinevoxel/core/Render/Tools/EntityTool.js";

export class NodeMeshTool extends LocationBoundTool {
  constructor() {
    super();

    this.voxel.dataTool.setMode(DataTool.Modes.VOXEL_DATA);
  }
  texture = {
    build: (
      textureIdData: ConstructorTextureData,
      textureData: Uint8ClampedArray,
      onDone: (mesh: EntityTool | false) => void
    ) => {
      const textureId = TextureManager.getTextureIndex(textureIdData);
      if (!textureId) return onDone(false);

      DVER.instance.constructorCommManager.runPromiseTasks<BuildNodeMesh>(
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
   /*        if (!data) return onDone(false);
          const mesh = DivineVoxelEngineRender.instance.renderer.nodes.meshes
            .get("#dve_node_texture")
            .createMesh([data[0][1], data[0][2], data[0][3]], data[1]);
          if (!mesh) return onDone(false);

          mesh..unfreezeWorldMatrix();
          (mesh as any).type = "node";
          mesh.parent = DVER.instance.renderer.foManager.getActiveNode();
          onDone(new EntityTool(mesh)); */
        }
      );
    },
    buildAsync(
      textureIdData: ConstructorTextureData,
      textureData: Uint8ClampedArray
    ) {
      return new Promise<EntityTool | false>((resolve) => {
        this.build(textureIdData, textureData, (data) => {
          resolve(data);
        });
      });
    },
  };
  voxel = {
    dataTool: new DataTool(),
    build: (
      voxelData: RawVoxelData,
      onDone: (mesh: EntityTool | false) => void
    ) => {
      DVER.instance.constructorCommManager.runPromiseTasks<BuildNodeMesh>(
        "build-node-mesh",
        [this.location, "#dve_node_voxel", voxelData],
        [],
        (data: SetNodeMesh | false) => {
/*           if (!data) return onDone(false);
          const mesh = DivineVoxelEngineRender.instance.nodes.meshes.create(
            this.voxel.dataTool
              .loadInRaw(voxelData)
              .getSubstnaceData()
              .getRendered(),
            data
          );
          if (!mesh) return onDone(false);

          mesh.unfreezeWorldMatrix();
          (mesh as any).type = "node";
          mesh.parent = DVER.instance.renderer.foManager.getActiveNode();
          onDone(new EntityTool(mesh)); */
        }
      );
    },
    buildAsync(voxelData: RawVoxelData): Promise<EntityTool | false> {
      return new Promise((resolve) => {
        this.build(voxelData, (data) => {
          resolve(data);
        });
      });
    },
  };
}
