//voxels
import { Dreamestone } from "../Voxels/Solid/DreamStone.js";
import { DreamGrassBlock } from "../Voxels/Solid/DreamGrass.js";
import { DreamLamp } from "../Voxels/Solid/DreamLamp.js";
import { DebugBox } from "../Voxels/Solid/DebugBox.js";
import { DreamStonePillar } from "../Voxels/Solid/DreamStonePillar.js";
import { DreamGrass } from "../Voxels/Flora/DreamGrass.js";
import { LiquidDreamEther } from "../Voxels/Fluid/LiquidDreamEther.js";
import { LightDebugBox } from "../Voxels/Solid/LightDebugBox.js";
export function RegisterVoxels(DVEW, voxelPaletteMode) {
    //solid
    const debugBox = new DebugBox(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(debugBox);
    const lightDebugBox = new LightDebugBox(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(lightDebugBox);
    const dreamStone = new Dreamestone(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamStone);
    const dreamStonePillar = new DreamStonePillar(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamStonePillar);
    const dreamGrassBlock = new DreamGrassBlock(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamGrassBlock);
    const dreamLamp = new DreamLamp(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamLamp);
    //flora
    const dreamGrass = new DreamGrass(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamGrass);
    //fluid
    const liquidDreamEther = new LiquidDreamEther(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(liquidDreamEther);
}
