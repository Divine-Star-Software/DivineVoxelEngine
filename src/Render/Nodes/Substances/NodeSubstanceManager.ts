import type { NodeSubstanceData } from "../types/RenderNode.types";
import { NodeSubstance } from "./NodeSubstance.js";
import { UtilMap } from "../../../Global/Util/UtilMap.js";

export const NodeSubstanceManager = {
 substances: new UtilMap<string, NodeSubstance>(),

 add(meshes: NodeSubstanceData[]) {
  for (const mesh of meshes) {
   this.substances.add([[mesh.id, new NodeSubstance(mesh)]]);
  }
 },
 buldAll() {
  for (const [key, substance] of this.substances._map) {
   substance.build();
  }
 },

 get(id: string) {
  return this.substances.get(id);
 },
};
