import { DebugItemData } from "../Items/Debug/Debug.item.data.js";
import { DreamvineItemData } from "../../Shared/Items/DreamVine/DreamVine.item.data.js";
export function RegisterItemData(DVEW) {
    DVEW.itemManager.registerItemData(DebugItemData);
    DVEW.itemManager.registerItemData(DreamvineItemData);
}
