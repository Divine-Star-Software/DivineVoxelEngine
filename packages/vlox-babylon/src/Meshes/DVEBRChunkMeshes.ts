import { type Scene, type Engine } from "@babylonjs/core";
import type { Vec3Array } from "@amodx/math";
import { Geometry } from "@babylonjs/core/Meshes/geometry.js";
import { Vector3 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import { EngineSettingsData } from "@divinevoxel/vlox/Settings/EngineSettings.types";

import { DVEChunkMeshes } from "@divinevoxel/vlox/Interfaces/Render/DVEChunkMeshes";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { DVEBRMesh } from "./DVEBRMesh";
import {
  CompactMeshData,
  CompactSubMesh,
} from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
import { EngineSettings } from "@divinevoxel/vlox/Settings/EngineSettings";
import { ChunkMeshInterface } from "@divinevoxel/vlox/Interfaces/Render/DVEChunkMeshInterface";
import { ChunkMesh } from "@divinevoxel/vlox/Contexts/Render/Scene/Classes/ChunkMesh";

export class DVEBRChunkMeshes extends DVEChunkMeshes {
  createMesh(position: Vec3Array, data: CompactMeshData): ChunkMeshInterface {
    throw new Error("Method not implemented.");
  }

  pickable = false;
  checkCollisions = false;
  serialize = false;
  clearCachedGeometry = true;
  defaultBb: BoundingInfo;

  constructor(
    public scene: Scene,
    public engine: Engine,
    public renderer: DVEBabylonRenderer
  ) {
    super();
    this.defaultBb = new BoundingInfo(Vector3.Zero(), new Vector3(16, 16, 16));
  }

  /*   createMesh(location: Vec3Array, data: CompactMeshData) {
    if (!this.scene) {
      const scene = DVEBabylonRenderer.instance.scene;
      if (!scene) {
        throw new Error(`A scene is required.`);
      }
      this.scene = scene;
      this.engine = scene.getEngine() as Engine;
    }
    if (!this.defaultBb) {
      this.defaultBb = new BoundingInfo(
        Vector3.Zero(),
        new Vector3(16, 16, 16)
      );
    }

    const mesh = new Mesh(this.data.id, this.scene);

    const dveMesh = new DVEBRMesh(mesh);
    mesh.hasVertexAlpha = false;

    //  viewer.createBoxes(0);

    const mat = DVEBabylonRenderer.instance.nodes.materials.get(this.data.id);
    if (!mat) {
      throw new Error(`Material: ${this.data.id} does not exist`);
    }

    if (DVEBabylonRenderer.instance.foManager.activeNode) {
      mesh.parent = DVEBabylonRenderer.instance.foManager.activeNode;
    }

    if (!EngineSettings.settings.meshes.checkCollisions) {
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

    mesh.checkCollisions = EngineSettings.settings.meshes.checkCollisions;

    mesh.doNotSerialize = this.serialize;
    mesh.alwaysSelectAsActiveMesh = true;

    this.updateVertexData(location, data, dveMesh);
    mesh.setEnabled(true);
    mesh.isVisible = true;
    mesh.material = mat._material;
    DVEBabylonRenderer.instance.observers.meshCreated.notify(dveMesh);
    return dveMesh;
  } */

  returnMesh(mesh: DVEBRMesh) {
    mesh.dispose();
    DVEBabylonRenderer.instance.observers.meshDisposed.notify(mesh);
  }

  updateVertexData(
    chunk: ChunkMesh,
    location: Vec3Array,
    data: CompactMeshData
  ) {
    if (data[0] == 1) return chunk;

    const found: Record<string, true> = {};
    const subMeshes = data[2];
    for (let i = 0; i < subMeshes.length; i++) {
      const subMeshMaterial = subMeshes[i][0];
      found[subMeshMaterial] = true;
      let mesh: Mesh;
      if (chunk.meshes.has(subMeshMaterial)) {
        mesh = chunk.meshes.get(subMeshMaterial);
      } else {
        mesh = new Mesh("", this.scene);
      }
      mesh.unfreezeWorldMatrix();
      mesh.position.x = location[0];
      mesh.position.y = location[1];
      mesh.position.z = location[2];

      DVEBRMesh.UpdateVertexData(mesh, this.engine, subMeshes[i]);

      mesh.material = this.renderer.materials.get(subMeshMaterial)!._material;

      mesh.freezeWorldMatrix();

      if (EngineSettings.settings.meshes.clearChachedGeometry) {
        mesh.geometry!.clearCachedData();
        if (mesh.subMeshes) {
          for (const sm of mesh.subMeshes) {
            sm.setBoundingInfo(this.defaultBb);
          }
        }
      }
    }

    for (const [key, mesh] of chunk.meshes) {
      if (!found[key]) {
        (mesh as Mesh).dispose();
        chunk.meshes.delete(key);
      }
    }


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
}
