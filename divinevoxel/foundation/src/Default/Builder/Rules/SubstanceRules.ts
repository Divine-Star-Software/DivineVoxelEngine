//types
import { MappedDataRegister } from "@divinevoxel/core/Data/Register/MappedDataRegister.js";

import { RenderedSubstances } from "./RenderedSubstances.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";
import { SubstancePaletteReader } from "@divinevoxel/core/Data/Substance/SubstancePalette.js";

export const SubstanceRules = {
  rules: <Map<string, Map<string, boolean>>>new Map(),
  parents: <Map<string, string>>new Map(),

  registerSubstance(id: string, substanceCulls?: string[], parentId?: string) {
    const map = new Map();
    this.rules.set(id, map);
    if (substanceCulls) {
      for (const culls of substanceCulls) {
        map.set(culls, true);
      }
    }
    if (parentId) {
      this.parents.set(id, parentId);
      return;
    }
    this.parents.set(id, id);
  },

  $BuildRules() {
    const substanceTool = new SubstanceDataTool();
    const allSubstances = SubstancePaletteReader._palette;
    for (const substnace of allSubstances) {
      substanceTool.setSubstanceFromString(substnace);
      const parent = substanceTool.getParent();
      const rendered = substanceTool.getRendered();
      const culled = substanceTool.getCulled();
      SubstanceRules.registerSubstance(substnace, culled, parent);
      if (!RenderedSubstances.meshers.has(rendered)) {
        RenderedSubstances.add(rendered);
      }
    }


  },

  exposedCheck(subject: string, neightborVoxel: string) {
    const rules = this.rules.get(subject);
    if (!rules) return true;
    if (rules.has(neightborVoxel)) return false;
    return true;
  },

  getSubstanceParent(id: string) {
    return this.parents.get(id)!;
  },
};
