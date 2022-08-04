import { DebugItemConstructorObject } from "../Items/Debug/Debug.item.constructor.js";
import { DreamVineItemConstructorObject } from "../Items/DreamVine/DreamVine.item.constructor.js";
export function RegisterItemForConstructor(DVEC) {
    DVEC.itemManager.registerItem(DebugItemConstructorObject);
    DVEC.itemManager.registerItem(DreamVineItemConstructorObject);
}
