import type { EngineSettingsData } from "Types/EngineSettings.types.js";

import { URIMesh } from "@amodx/uri/Meshes/URIMesh.js";
import { NodeMeshData, DVENodeMeshAttributes } from "../DVERenderNode.types";
import { Vec3Array } from "@amodx/math";
import { Observable } from "@amodx/core/Observers/Observable";

export abstract class DVENodeMesh {

  constructor(public data: NodeMeshData) {}

  abstract createMesh(
    position: Vec3Array,
    data: DVENodeMeshAttributes
  ): URIMesh;
  abstract returnMesh(mesh: URIMesh): void;
  abstract updateVertexData(
    position: Vec3Array,
    data: DVENodeMeshAttributes,
    mesh: URIMesh
  ): void;
  abstract syncSettings(settings: EngineSettingsData): void;

  abstract _clearCached(mesh: URIMesh): void;
}
