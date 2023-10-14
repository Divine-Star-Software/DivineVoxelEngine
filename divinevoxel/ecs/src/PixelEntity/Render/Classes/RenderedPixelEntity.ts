import type { Mesh } from "@babylonjs/core/Meshes/mesh";

import type { CreatePixelEntityReturn } from "../../Types/PixelEntities.types";
import type { LocationData } from "@divinestar/voxelspaces";

import { DivineVoxelEngineRender } from "@divinevoxel/core/Render/DivineVoxelEngineRender.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { PixelEntitesRender } from "../PixelEntitiesRender.js";
import { MeshAttributes } from "@divinevoxel/core/Constructor/Builder/Types/MeshData.types.js";
import { Vec3Array } from "@divinevoxel/core/Math/index.js";

export class RendredPixelEntity {
  mesh: Mesh;
  parent: TransformNode;
  id: string;
  constructor(
    public typeId: string,
    public location: LocationData,
    public size: Vec3Array,
    public meshAttributes: MeshAttributes,
    [animatedId, matricies, voxelData, faceData]: CreatePixelEntityReturn
  ) {
    this.id = animatedId;
    const mesh = DivineVoxelEngineRender.instance.nodes.meshes.create(
      "#dve_pixel_entity",
      [["main", 0, 0, 0], meshAttributes]
    );
    if (!mesh) return;
    (this as any).mesh = mesh;
    (this as any).parent = new TransformNode(this.id);
    (mesh as any).parent = this.parent;
    mesh.alwaysSelectAsActiveMesh = true;

    let segmentLength = faceData.byteLength / 6;
    for (let i = 0; i < 6; i++) {
      mesh.thinInstanceSetBuffer(
        `faceData${i}`,
        new Float32Array(faceData, segmentLength * i, segmentLength / 4),
        4
      );
    }

    mesh.thinInstanceSetBuffer("matrix", new Float32Array(matricies));
    mesh.thinInstanceSetBuffer("voxelData", new Float32Array(voxelData), 1);

    //@ts-ignore
    this.parent.parent = DVER.render.fo.activeNode;
    mesh.unfreezeWorldMatrix();

    this.setPosition(this.location[1], this.location[2], this.location[3]);

    PixelEntitesRender.entities.add(this);
  }

  update() {
    this.mesh.thinInstanceBufferUpdated("matrix");
    this.mesh.thinInstanceBufferUpdated("voxelData");
  }

  destroy() {
    this.parent.dispose();
    this.mesh.dispose();
    PixelEntitesRender.entities.delete(this);
    DivineVoxelEngineRender.instance.nexusComm.runTasks(
      "destroy-pixel-entity",
      this.id
    );
  }

  destroyType() {
    this.destroy();
    DivineVoxelEngineRender.instance.nexusComm.runTasks(
      "destroy-pixel-entity-type",
      this.typeId
    );
  }

  setPosition(x: number, y: number, z: number) {
    this.parent.position.set(x, y, z);
  }
}
