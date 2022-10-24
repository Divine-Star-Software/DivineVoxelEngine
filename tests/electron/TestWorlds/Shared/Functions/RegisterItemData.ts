import { DebugItemData } from "../Items/Debug/Debug.item.data.js";
import type { DivineVoxelEngineWorld } from "../../../out/World/DivineVoxelEngineWorld";
import { DreamvineItemData } from "../../Shared/Items/DreamVine/DreamVine.item.data.js";

export function RegisterItemData(DVEW: DivineVoxelEngineWorld) {
 DVEW.itemManager.registerItemData(DebugItemData);
 DVEW.itemManager.registerItemData(DreamvineItemData);
}
