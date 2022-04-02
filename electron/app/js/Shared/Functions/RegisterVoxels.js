//voxels
import { Dreamestone } from "../Voxels/Solid/DreamStone.js";
import { DreamGrassBlock } from "../Voxels/Solid/DreamGrassBlock.js";
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
    //flora
    const dreamGrass = new DreamGrass(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(dreamGrass);
    //fluid
    const liquidDreamEther = new LiquidDreamEther(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(liquidDreamEther);
    if (voxelPaletteMode == "global") {
        //solid
        DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(debugBox);
        DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(lightDebugBox);
        DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(dreamStone);
        DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(dreamStonePillar);
        DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(dreamGrassBlock);
        //flora
        DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(dreamGrass);
        //fluid
        DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(liquidDreamEther);
    }
    if (voxelPaletteMode == "per-region") {
        //solid
        DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(debugBox);
        DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(lightDebugBox);
        DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(dreamStone);
        DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(dreamStonePillar);
        DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(dreamGrassBlock);
        //flora
        DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(dreamGrass);
        //fluid
        DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(liquidDreamEther);
    }
}
