
import {
  RemoveChunkMeshTasks,
  SetChunkMeshTask,
} from "../Tasks/RenderTasks.types.js";
import { MeshRegister } from "./MeshRegister.js";
import { LocationData } from "../../../Math/index.js";
import { Distance3D } from "../../../Math/Functions/Distance3d.js";

import { DivineVoxelEngineRender } from "../../Render/DivineVoxelEngineRender.js";
import { URIMesh } from "@divinestar/uri/Meshes/URIMesh.js";
import { DVENodeMeshAttributes } from "../../../Interfaces/Render/Nodes/DVERenderNode.types.js";

export const MeshManager = {
  runningUpdate: false,

  removeColumnsOutsideRadius(origion: LocationData, radius: number) {
    const [dimesnionId, x, y, z] = origion;
    const dimension = MeshRegister.dimensions.get(dimesnionId);
    if (!dimension) return;
    dimension.forEach((region) => {
      region.columns.forEach((column) => {
        const location = column.location;
        const distnace = Distance3D(location[1], 0, location[3], x, 0, z);
        if (distnace > radius) {
          this.chunks.removeColumn(location);
        }
      });
    });
  },

  chunks: {
    remove(data: RemoveChunkMeshTasks) {
      const [location, substance] = data;
      const mesh = MeshRegister.chunk.remove(location, substance);
      if (!mesh) return false;

      DivineVoxelEngineRender.instance.renderer.nodes.meshes
        .get(substance)!
        .returnMesh(mesh);
    },
    add(
      location: LocationData,
      substance: string,
      meshData: DVENodeMeshAttributes
    ) {
      let chunk = MeshRegister.chunk.get(location, substance);
      let mesh: URIMesh<any, any>;

      if (!chunk) {
        mesh = DivineVoxelEngineRender.instance.renderer.nodes.meshes
          .get(substance)!
          .createMesh([location[1], location[2], location[3]], meshData);

        (mesh as any).type = "chunk";
        MeshRegister.chunk.add(location, mesh, substance);
        mesh.setEnabled(true);
        mesh.isVisible = true;
      } else {
        mesh = chunk.mesh;
        DivineVoxelEngineRender.instance.renderer.nodes.meshes
          .get(substance)!
          .updateVertexData(
            [location[1], location[2], location[3]],
            meshData,
            mesh
          );
      }
    },
    update(data: SetChunkMeshTask) {
      const [location, chunks] = data;
      let i = chunks.length;
      while (i--) {
        const chunkData = chunks[i];
        const substance = chunkData[0];
        const remove = !chunkData[1];
        if (remove) {
          const mesh = MeshRegister.chunk.remove(location, substance);
          if (mesh) {
            DivineVoxelEngineRender.instance.renderer.nodes.meshes
              .get(substance)!
              .returnMesh(mesh);
          }
          continue;
        }
        let chunk = MeshRegister.chunk.get(location, substance);
        let mesh: URIMesh;
        if (!chunk) {
          mesh = DivineVoxelEngineRender.instance.renderer.nodes.meshes
            .get(substance)!
            .createMesh([location[1], location[2], location[3]], chunkData[1][1]);
          (mesh as any).type = "chunk";
          MeshRegister.chunk.add(location, mesh, substance);
        } else {
          mesh = chunk.mesh;
          DivineVoxelEngineRender.instance.renderer.nodes.meshes
            .get(substance)!
            .updateVertexData(
              [location[1], location[2], location[3]],
              chunkData[1][1],
              mesh
            );
        }
      }
    },
    removeColumn(data: LocationData) {
      const column = MeshRegister.column.remove(data);
      if (!column) return false;
      for (const [key, chunk] of column.chunks) {
        for (const [substance, mesh] of chunk) {
          DivineVoxelEngineRender.instance.renderer.nodes.meshes
            .get(substance)!
            .returnMesh(mesh.mesh);
        }
      }
    },
  },
};
