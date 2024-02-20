import type { Scene, Engine } from "@babylonjs/core";
import { Geometry } from "@babylonjs/core/Meshes/geometry.js";
import { Vector3 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import type { LocationData } from "@divinestar/voxelspaces";
import type { EngineSettingsData } from "Types/Data/Settings/EngineSettings.types.js";
import { ChunkMeshData, SetNodeMesh } from "Types/Tasks/RenderTasks.types";
import { NodeManager } from "../NodeManager.js";
import type { NodeMeshData } from "../types/RenderNode.types.js";
import { RenderManager } from "../../Scene/RenderManager.js";
import { FOManager } from "../../Scene/FloatingOrigin/FoManager.js";
import { VertexBuffer } from "@babylonjs/core/Meshes/buffer.js";
export class DVENodeMesh {
  meshes: Mesh[] = [];
  pickable = false;
  checkCollisions = false;
  seralize = false;
  clearCachedGeometry = true;
  defaultBb: BoundingInfo;
  scene: Scene;
  engine: Engine;
  constructor(public data: NodeMeshData) {}

  createMesh(data: SetNodeMesh) {
    if (!this.scene) {
      const scene = RenderManager.scene;
      if (!scene) {
        throw new Error(`A scene is required.`);
      }
      this.scene = scene;
      this.engine = scene.getEngine();
    }
    if (!this.defaultBb) {
      this.defaultBb = new BoundingInfo(
        Vector3.Zero(),
        new Vector3(16, 16, 16)
      );
    }

    const mesh = new Mesh(this.data.id, this.scene);
    mesh.hasVertexAlpha = false;

    const mat = NodeManager.materials.get(this.data.materialId);
    if (!mat) {
      throw new Error(`Material: ${this.data.materialId} does not exist`);
    }

    if (FOManager.activeNode) {
      mesh.parent = FOManager.activeNode;
    }

    if (!this.checkCollisions) {
      mesh.doNotSyncBoundingInfo = true;
    }
    mesh.isPickable = this.pickable;

    (mesh as any).type = !Boolean(this.data.type) ? "node" : this.data.type;

    if (!mesh.geometry) {
      const geo = new Geometry(
        Geometry.RandomId(),
        this.scene,
        undefined,
        undefined,
        mesh
      );
      geo._boundingInfo = this.defaultBb;
      geo!.useBoundingInfoFromGeometry = true;
    }

    mesh.checkCollisions = this.checkCollisions;
    mesh.doNotSerialize = this.seralize;
    mesh.alwaysSelectAsActiveMesh = true;

    this.updateVetexData(data, mesh);
    mesh.setEnabled(true);
    mesh.isVisible = true;
    mesh.material = mat.getMaterial();
    return mesh;
  }
  returnMesh(mesh: Mesh) {
    mesh.dispose();
  }
  updateVetexData(data: SetNodeMesh, mesh: Mesh) {
    mesh.unfreezeWorldMatrix();
    mesh.position.x = data[0][1];
    mesh.position.y = data[0][2];
    mesh.position.z = data[0][3];

    for (const [id, attribute, stride] of data[1]) {
      switch (id) {
        case "position":
          mesh.setVerticesBuffer(
            new VertexBuffer(
              this.engine,
              attribute,
              id,
              false,
              undefined,
              stride
            )
          );
          break;
        case "normal":
          mesh.setVerticesBuffer(
            new VertexBuffer(
              this.engine,
              attribute,
              id,
              false,
              undefined,
              stride
            )
          );
          break;
        case "indices":
          mesh.setIndices(attribute as any);

          break;
        default:
          mesh.setVerticesBuffer(
            new VertexBuffer(
              this.engine,
              attribute,
              id,
              false,
              undefined,
              stride
            )
          );
          break;
      }
    }

    mesh.freezeWorldMatrix();
    this._clearCached(mesh);
  }

  syncSettings(settings: EngineSettingsData) {
    if (settings.meshes.pickable) {
      this.pickable = true;
    }
    if (typeof settings.meshes.clearChachedGeometry != "undefined") {
      this.clearCachedGeometry = settings.meshes.clearChachedGeometry;
    }
    if (settings.meshes.seralize) {
      this.seralize = true;
    }
  }

  _clearCached(mesh: Mesh) {
    if (!this.clearCachedGeometry) return;
    mesh.geometry!.clearCachedData();
    if (mesh.subMeshes) {
      for (const sm of mesh.subMeshes) {
        sm.setBoundingInfo(this.defaultBb);
      }
    }
  }
}
