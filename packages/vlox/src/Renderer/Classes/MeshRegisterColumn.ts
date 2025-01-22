import { LocationData } from "Math";
import { ChunkMesh } from "./ChunkMesh";

export class MeshRegisterColumn {
  chunks = new Map<number,ChunkMesh>();
  constructor(public location: LocationData) {}
}
