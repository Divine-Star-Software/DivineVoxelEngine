import { DebugItemConstructorObject } from "../Items/Debug/Debug.item.constructor.js";
import { DivineVoxelEngineConstructor } from "../../../out/Constructor/DivineVoxelEngineConstructor";
import { DreamVineItemConstructorObject } from "../Items/DreamVine/DreamVine.item.constructor.js";

export function RegisterItemForConstructor(DVEC: DivineVoxelEngineConstructor) {
 DVEC.itemManager.registerItem(DebugItemConstructorObject);
 DVEC.itemManager.registerItem(DreamVineItemConstructorObject);
}
