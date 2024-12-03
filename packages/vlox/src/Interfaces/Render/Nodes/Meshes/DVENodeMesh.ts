import type { EngineSettingsData } from "Types/EngineSettings.types.js";

import { URIMesh } from "@amodx/uri/Meshes/URIMesh.js";
import { NodeMeshData } from "../DVERenderNode.types";
import { Vec3Array } from "@amodx/math";
import { CompactMeshData } from "../../../../Mesher/Types/Mesher.types";

export abstract class DVENodeMesh {
  constructor(public data: NodeMeshData) {}

  abstract createMesh(position: Vec3Array, data: CompactMeshData): URIMesh;
  abstract returnMesh(mesh: URIMesh): void;
  abstract updateVertexData(
    position: Vec3Array,
    data: CompactMeshData,
    mesh: URIMesh
  ): void;
  abstract syncSettings(settings: EngineSettingsData): void;

  abstract _clearCached(mesh: URIMesh): void;
}
