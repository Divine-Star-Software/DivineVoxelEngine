import type { RawVoxelData } from "@divinevoxel/core/Types/index.js";
import {
  BuildNodeMesh,
  SetNodeMesh,
} from "@divinevoxel/foundation/Default/Builder/Tasks/BuidlerTasks.types.js";
import {
  DivineVoxelEngineRender as DVER,
  DivineVoxelEngineRender,
} from "@divinevoxel/core/Contexts/Render/DivineVoxelEngineRender.js";
import { TextureManager } from "@divinevoxel/foundation/Textures/TextureManager.js";
import { LocationBoundTool } from "@divinevoxel/foundation/Default/Tools/Classes/LocationBoundTool.js";
import type { ConstructorTextureData } from "@divinevoxel/foundation/Textures/Constructor.types.js";

import { DataTool } from "@divinevoxel/foundation/Default/Tools/Data/DataTool.js";
import { EntityTool } from "./EntityTool.js";
import { DVEBabylonRenderer } from "../../../DVEBabylonRenderer.js";

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
      console.log("building texture", textureData);
      if (!textureId) return onDone(false);

      DVER.instance.core.threads.construcotrs.runPromiseTasks<BuildNodeMesh>(
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
          console.log("set node mesh", data);
          if (!data) return onDone(false);
          const mesh = DVEBabylonRenderer.instance.nodes.meshes
            .get("#dve_node_texture")
            .createMesh([data[0][1], data[0][2], data[0][3]], data[1]);
          console.log("get mesh", mesh);
          if (!mesh) return onDone(false);

          mesh._mesh.unfreezeWorldMatrix();
          (mesh._mesh as any).type = "node";
          mesh._mesh.parent =
            DVEBabylonRenderer.instance.foManager.getActiveNode()?._node ||
            null;
          onDone(new EntityTool(mesh._mesh));
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
      console.log("building voxel", voxelData);
      DVER.instance.core.threads.construcotrs.runPromiseTasks<BuildNodeMesh>(
        "build-node-mesh",
        [this.location, "#dve_node_voxel", voxelData],
        [],
        (data: SetNodeMesh | false) => {
          console.log("got voxel", data);
          if (!data) return onDone(false);
          const mesh = DVEBabylonRenderer.instance.nodes.meshes
            .get(
              this.voxel.dataTool
                .loadInRaw(voxelData)
                .getSubstnaceData()
                .getRendered()
            )
            .createMesh([data[0][1], data[0][2], data[0][3]], data[1]);
          console.log("got node mesh", mesh);
          if (!mesh) return onDone(false);

          mesh._mesh.unfreezeWorldMatrix();
          (mesh._mesh as any).type = "node";
          mesh._mesh.parent =
            DVEBabylonRenderer.instance.foManager.getActiveNode()?._node ||
            null;
          onDone(new EntityTool(mesh._mesh));
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
