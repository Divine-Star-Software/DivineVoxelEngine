import { VoxelSchema } from "../../State/Schema/VoxelSchema";
import { VoxelCursorInterface } from "../../Cursor/VoxelCursor.interface";
import { VoxelLogicData } from "../VoxelLogic.types";
import { VoxelLogicRegister } from "../VoxelLogicRegister";
import { VoxelLogicType } from "./VoxelLogicType";
import { SchemaRegister } from "../../State/SchemaRegister";

export class VoxelLogic {
  types: VoxelLogicType<any>[] = [];
  effectedTags = new Map<string, VoxelLogicType<any>[]>();

  schema: VoxelSchema;
  constructor(
    public voxelId: string,
    data: VoxelLogicData[]
  ) {
    this.schema = SchemaRegister.getVoxelSchemas(voxelId);
    for (const logicData of data) {
      const LogicTypeClass = VoxelLogicRegister.get(logicData.type);
      const newLogicType = new LogicTypeClass(this, logicData);
      this.types.push(newLogicType);
      for (const effect of newLogicType.getEffects()) {
        if (effect.type == "tag") {
          let effects = this.effectedTags.get(effect.tagId);
          if (!effects) {
            effects = [];
            this.effectedTags.set(effect.tagId, effects);
          }
          if (!effects.includes(newLogicType)) {
            effects.push(newLogicType);
          }
        }
      }
    }
    for (const type of this.types) {
      type.init();
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

  registerEffectOnTag(tagId: string, effect: VoxelLogicType<any>) {}

  hasTag(tag: string) {
    return this.effectedTags.has(tag);
  }
}
