//types
import type { VoxelSubstanceType } from "Meta/index";

export const SubstanceRules = {
 rules: <Map<string, Map<string, boolean>>>new Map(),

 registerSubstance(id: string, substanceCulls?: string[]) {
  const map = new Map();
  this.rules.set(id, map);
  if (substanceCulls) {
   for (const culls of substanceCulls) {
    map.set(culls, true);
   }
  }
 },



 $INIT() {
  SubstanceRules.registerSubstance("solid", ["solid"]);
  SubstanceRules.registerSubstance("flora");
  SubstanceRules.registerSubstance("transparent", ["transparent"]);
  SubstanceRules.registerSubstance("liquid", ["solid", "liquid"]);
  SubstanceRules.registerSubstance("magma", ["solid", "magma"]);

 },

 exposedCheck(
  subject: VoxelSubstanceType,
  neightborVoxel: VoxelSubstanceType
 ) {
  const rules = this.rules.get(subject);
  if (!rules) return true;
  if (rules.has(neightborVoxel)) return false;
  return true;
 },
};
