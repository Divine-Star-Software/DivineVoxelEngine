//types
import { RenderedSubstances } from "./RenderedSubstances.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";
import { SubstancePaletteReader } from "@divinevoxel/core/Data/Substance/SubstancePalette.js";

export class SubstanceRules {
  static mappedRules = new Map<number, Map<number, boolean>>();

  static mappedParents = new Map<number, number>();

  static $BuildRules() {
    const rules = new Map<string, Map<string, boolean>>();
    const parents = new Map<string, string>();
    const substanceTool = new SubstanceDataTool();
    const allSubstances = SubstancePaletteReader._palette;
    for (const substnace of allSubstances) {
      substanceTool.setSubstanceFromString(substnace);
      const parent = substanceTool.getParent()!;
      const rendered = substanceTool.getRendered()!;
      const culled = substanceTool.getCulled()!;

      if (!RenderedSubstances.meshers.has(rendered)) {
        RenderedSubstances.add(rendered);
      }
      const map = new Map();
      rules.set(substnace, map);
      if (culled) {
        for (const culls of culled) {
          map.set(culls, true);
        }
      }
      if (parent) {
        parents.set(substnace, parent);
        continue;
      }
      parents.set(substnace, substnace);

    }

    for (const [substanceId, rule] of rules) {
      const substanceNumberId =
        SubstancePaletteReader.id.numberFromString(substanceId);
      const mappedRules = new Map<number, boolean>();
      this.mappedRules.set(substanceNumberId, mappedRules);
      for (const [otherSubstanceId, culled] of rule) {
        const otherNumberSubstanceId =
          SubstancePaletteReader.id.numberFromString(otherSubstanceId);
        mappedRules.set(otherNumberSubstanceId, culled);
      }
    }
    for (const [substanceId, parentSubstanceId] of parents) {
      const substanceNumberId =
        SubstancePaletteReader.id.numberFromString(substanceId);
      const parentSubstanceNumberId =
        SubstancePaletteReader.id.numberFromString(parentSubstanceId);
      this.mappedParents.set(substanceNumberId, parentSubstanceNumberId);
    }


  }

  static exposedCheck(subject: number, neightborVoxel: number) {
    const rules = this.mappedRules.get(subject);
    if (!rules) return true;
    if (rules.has(neightborVoxel)) return false;
    return true;
  }

  static getSubstanceParent(id: number) {
    return this.mappedParents.get(id)!;
  }
}
