import type { DivineVoxelEngineWorld } from "../../out/World/DivineVoxelEngineWorld.js";
import { Dreamestone } from "../Voxels/DreamStone.js";
import { DVEVoxel2 } from "../Voxels/Voxel2.js";
import { DebugBox } from "../Voxels/DebugBox.js";
import { DreamStonePillar } from "../Voxels/DreamStonePillar.js";

export function RegisterVoxels(DVEW: DivineVoxelEngineWorld) {
 DVEW.voxelManager.registerVoxelData(new DebugBox(DVEW.voxelHelper));
 DVEW.voxelManager.registerVoxelData(new Dreamestone(DVEW.voxelHelper));
 DVEW.voxelManager.registerVoxelData(new DreamStonePillar(DVEW.voxelHelper));
 DVEW.voxelManager.registerVoxelData(new DVEVoxel2(DVEW.voxelHelper));
}
