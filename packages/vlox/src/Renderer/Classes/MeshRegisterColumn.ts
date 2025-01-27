import { LocationData } from "../../Math";
import { ChunkMesh } from "./ChunkMesh";
export class MeshRegisterColumn {
  chunks : ChunkMesh[] = [];
  constructor(public location: LocationData) {}
}
