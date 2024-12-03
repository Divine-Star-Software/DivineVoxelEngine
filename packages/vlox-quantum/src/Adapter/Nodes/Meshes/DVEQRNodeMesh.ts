import type { Vec3Array } from "@amodx/math";
import type { EngineSettingsData } from "@divinevoxel/vlox/Types/EngineSettings.types";

import type {
  DVENodeMeshAttributes,
  NodeMeshData,
} from "@divinevoxel/vlox/Interfaces/Render/Nodes/DVERenderNode.types.js";
import { DVENodeMesh } from "@divinevoxel/vlox/Interfaces/Render/Nodes/Meshes/DVENodeMesh.js";
import { DVEQRMesh } from "./DVEQRMesh";
import { DVEQuantumRenderer } from "../../DVEQuantumRenderer";
import { Scene } from "../../../Renderer/Scene/Scene";
import { CompactMeshData } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
export class DVEQRNodeMesh extends DVENodeMesh {
  static UpdateVertexData(mesh: any, engine: any, data: DVENodeMeshAttributes) {
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

  constructor(
    public data: NodeMeshData,
    public scene: Scene
  ) {
    super(data);
  }

  createMesh(location: Vec3Array, data: CompactMeshData) {
    const dveMesh = new DVEQRMesh(DVEQuantumRenderer.instance.scene);
    if (this.data.worldMesh) {
      this.scene.voxelScene.meshes.createMesh(location,data);
    }

    //console.warn("create mesh", location, data);
    return dveMesh;
  }

  returnMesh(mesh: DVEQRMesh) {
    DVEQuantumRenderer.instance.observers.meshDisposed.notify(mesh);
  }
  updateVertexData(
    location: Vec3Array,
    data: CompactMeshData,
    dveMesh: DVEQRMesh
  ) {
    dveMesh.observers.updated.notify();
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
