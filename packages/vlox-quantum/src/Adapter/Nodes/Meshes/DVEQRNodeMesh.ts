import type { Vec3Array } from "@amodx/math";
import type { EngineSettingsData } from "@divinevoxel/vlox/Settings/EngineSettings.types";


import { DVEChunkMeshes } from "@divinevoxel/vlox/Interfaces/Render/DVEChunkMeshes.js";
import { DVEQRMesh } from "./DVEQRMesh";
import { DVEQuantumRenderer } from "../../DVEQuantumRenderer";
import { Scene } from "../../../Renderer/Scene/Scene";
import {
  CompactMeshData,
  CompactSubMesh,
} from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
import { ChunkMesh } from "@divinevoxel/vlox/Contexts/Render/Scene/Classes/ChunkMesh";
export class DVEQRNodeMesh extends DVEChunkMeshes {
  static UpdateVertexData(mesh: any, engine: any, data: any) {
    for (const [id, attribute, stride] of data) {
      switch (id) {
        case "position":
          break;
        case "normal":
          break;
        case "indices":
          break;
        default:
          break;
      }
    }
  }
  pickable = false;
  checkCollisions = false;
  serialize = false;
  clearCachedGeometry = true;

  constructor(public scene: Scene) {
    super();
  }

  createMesh(location: Vec3Array, data: CompactMeshData) {
    const dveMesh = new DVEQRMesh();

    this.scene.voxelScene.meshes.createMesh(location, data);

    //console.warn("create mesh", location, data);
    return dveMesh;
  }

  returnMesh(mesh: DVEQRMesh) {
    DVEQuantumRenderer.instance.observers.meshDisposed.notify(mesh);
  }
  updateVertexData(
    chunk: ChunkMesh,
    location: Vec3Array,
    data: CompactMeshData
  ) {
    //   dveMesh.observers.updated.notify();
    return chunk;
  }

  syncSettings(settings: EngineSettingsData) {
    if (settings.meshes.pickable) {
      this.pickable = true;
    }
    if (typeof settings.meshes.clearChachedGeometry != "undefined") {
      this.clearCachedGeometry = settings.meshes.clearChachedGeometry;
    }
    if (settings.meshes.serialize) {
      this.serialize = true;
    }
  }

  _clearCached(dveMesh: DVEQRMesh) {
    if (!this.clearCachedGeometry) return;
    /*     const mesh = dveMesh._mesh;
    mesh.geometry!.clearCachedData();
    if (mesh.subMeshes) {
      for (const sm of mesh.subMeshes) {
        sm.setBoundingInfo(this.defaultBb);
      }
    } */
  }
}
