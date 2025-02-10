import { VoxelCursorInterface } from "../../Cursor/VoxelCursor.interface";
import { VoxelLogicData, VoxelLogicEffects } from "../VoxelLogic.types";
import { VoxelLogicRegister } from "../VoxelLogicRegister";
import { VoxelLogicType } from "./VoxelLogicType";

export class VoxelLogic {
  types: VoxelLogicType[] = [];
  effectedTags = new Map<string, VoxelLogicType[]>();

  constructor(data: VoxelLogicData[]) {
    for (const type of data) {
      const logicType = VoxelLogicRegister.types.get(type.type)!;
      this.types.push(logicType);
      if (type.type == "powered") {
        for (const effect of type.on)
          if (effect.type == "tag")
            this.registerEffectOnTag(effect.tagId, logicType);
        for (const effect of type.off)
          if (effect.type == "tag")
            this.registerEffectOnTag(effect.tagId, logicType);
      }
      if (type.type == "state") {
        for (const effect of type.true)
          if (effect.type == "tag")
            this.registerEffectOnTag(effect.tagId, logicType);
        for (const effect of type.false)
          if (effect.type == "tag")
            this.registerEffectOnTag(effect.tagId, logicType);
      }
    }
  }

  getTagValue(tagId: string, cursor: VoxelCursorInterface): any {
    let effects = this.effectedTags.get(tagId);
    if (!effects) return null;
    let finalValue = null;
    for (let i = 0; i < effects.length; i++) {
      const effect = effects[i];
      finalValue = effect.run(cursor);
    }
    return finalValue;
  }

  registerEffectOnTag(tagId: string, effect: VoxelLogicType) {
    let effects = this.effectedTags.get(tagId);
    if (!effects) {
      effects = [];
      this.effectedTags.set(tagId, effects);
    }
    effects.push(effect);
  }

  hasTag(tag: string) {
    return this.effectedTags.has(tag);
  }
}
