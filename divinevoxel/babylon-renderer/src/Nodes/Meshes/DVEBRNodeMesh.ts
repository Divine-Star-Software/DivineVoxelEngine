import type { Scene, Engine } from "@babylonjs/core";
import { Geometry } from "@babylonjs/core/Meshes/geometry.js";
import { Vector3 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import type { Vec3Array } from "@divinevoxel/core/Math/Types/Math.types";
import type { EngineSettingsData } from "@divinevoxel/core/Types/EngineSettings.types";

import type {
  DVENodeMeshAttributes,
  NodeMeshData,
} from "@divinevoxel/core/Interfaces/Render/Nodes/DVERenderNode.types.js";

import { VertexBuffer } from "@babylonjs/core/Meshes/buffer.js";
import { DVENodeMesh } from "@divinevoxel/core/Interfaces/Render/Nodes/Meshes/DVENodeMesh.js";
import { DVEBabylonRenderer } from "../../DVEBabylonRenderer";
import { DVEBRMesh } from "./DVEBRMesh";
export class DVEBRNodeMesh extends DVENodeMesh {
  pickable = false;
  checkCollisions = false;
  serialize = false;
  clearCachedGeometry = true;
  defaultBb: BoundingInfo;
  scene: Scene;
  engine: Engine;
  constructor(public data: NodeMeshData) {
    super(data);
  }

  createMesh(location: Vec3Array, data: DVENodeMeshAttributes) {
    if (!this.scene) {
      const scene = DVEBabylonRenderer.instance.scene._scene;
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

    const dveMesh = new DVEBRMesh(DVEBabylonRenderer.instance.scene);
    const mesh = new Mesh(this.data.id, this.scene);
    dveMesh._mesh = mesh;
    mesh.hasVertexAlpha = false;

    const mat = DVEBabylonRenderer.instance.nodes.materials.get(this.data.id);
    if (!mat) {
      throw new Error(`Material: ${this.data.id} does not exist`);
    }

    if (DVEBabylonRenderer.instance.foManager.activeNode) {
      mesh.parent = DVEBabylonRenderer.instance.foManager.activeNode;
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
    mesh.doNotSerialize = this.serialize;
    mesh.alwaysSelectAsActiveMesh = true;

    this.updateVertexData(location, data, dveMesh);
    mesh.setEnabled(true);
    mesh.isVisible = true;
    mesh.material = mat._material;
    DVEBabylonRenderer.instance.observers.meshCreated.notify(dveMesh);
    return dveMesh;
  }

  returnMesh(mesh: DVEBRMesh) {
    mesh._mesh.dispose();
    DVEBabylonRenderer.instance.observers.meshDisposed.notify(mesh);
  }
  updateVertexData(
    location: Vec3Array,
    data: DVENodeMeshAttributes,
    dveMesh: DVEBRMesh
  ) {
    const mesh = dveMesh._mesh;
    mesh.unfreezeWorldMatrix();
    mesh.position.x = location[0];
    mesh.position.y = location[1];
    mesh.position.z = location[2];

    for (const [id, attribute, stride] of data) {
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
    this._clearCached(dveMesh);
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

  _clearCached(dveMesh: DVEBRMesh) {
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
