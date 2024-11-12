import { URIMesh } from "@amodx/uri/Meshes/URIMesh";
import type { LocationData } from "Math/index.js";

export type MeshRegisterChunk = {
  mesh: URIMesh;
};

export type MeshRegisterColumn = {
  location: LocationData;
  chunks: Map<number, Map<string, MeshRegisterChunk>>;
};

export type MushRegisterRegion = {
  columns: Map<number, MeshRegisterColumn>;
};
export type MeshRegisterDimensions = Map<
  string,
  Map<string, MushRegisterRegion>
>;
