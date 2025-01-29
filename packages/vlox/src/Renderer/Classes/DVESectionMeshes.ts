import { Vec3Array } from "@amodx/math";
import { CompactMeshData } from "../../Mesher/Types/Mesher.types";
import { SectionMesh } from "./SectionMesh";

export abstract class DVESectionMeshes {
  abstract updateVertexData(
    section: SectionMesh,
    position: Vec3Array,
    data: CompactMeshData
  ): SectionMesh;
}
