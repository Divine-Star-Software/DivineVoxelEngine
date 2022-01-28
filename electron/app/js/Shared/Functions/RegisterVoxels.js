import { Dreamestone } from "../Voxels/Solid/DreamStone.js";
import { DreamGrassBlock } from "../Voxels/Solid/DreamGrassBlock.js";
import { DebugBox } from "../Voxels/Solid/DebugBox.js";
import { DreamStonePillar } from "../Voxels/Solid/DreamStonePillar.js";
import { DreamGrass } from "../Voxels/Flora/DreamGrass.js";
import { LiquidDreamEther } from "../Voxels/Fluid/LiquidDreamEther.js";
export function RegisterVoxels(DVEW, voxelPaletteMode) {
    //solid
    const debugBlock = new DebugBox(DVEW.voxelHelper);
    DVEW.voxelManager.registerVoxelData(debugBlock);
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
        DVEW.worldGeneration.registerVoxelForGlobalPalette(debugBlock);
        DVEW.worldGeneration.registerVoxelForGlobalPalette(dreamStone);
        DVEW.worldGeneration.registerVoxelForGlobalPalette(dreamStonePillar);
        DVEW.worldGeneration.registerVoxelForGlobalPalette(dreamGrassBlock);
        //flora
        DVEW.worldGeneration.registerVoxelForGlobalPalette(dreamGrass);
        //fluid
        DVEW.worldGeneration.registerVoxelForGlobalPalette(liquidDreamEther);
    }
    if (voxelPaletteMode == "per-chunk") {
        //solid
        DVEW.worldGeneration.registerVoxelForPerChunkVoxelPalette(debugBlock);
        DVEW.worldGeneration.registerVoxelForPerChunkVoxelPalette(dreamStone);
        DVEW.worldGeneration.registerVoxelForPerChunkVoxelPalette(dreamStonePillar);
        DVEW.worldGeneration.registerVoxelForPerChunkVoxelPalette(dreamGrassBlock);
        //flora
        DVEW.worldGeneration.registerVoxelForPerChunkVoxelPalette(dreamGrass);
        //fluid
        DVEW.worldGeneration.registerVoxelForPerChunkVoxelPalette(liquidDreamEther);
    }
    const chunk = DVEW.worldGeneration.getBlankChunk(true, true);
    DVEW.worldGeneration.voxelPaletteHelper.addToChunksVoxelPalette(chunk, dreamStonePillar.data.id, "default");
    const paletteId = DVEW.worldGeneration.voxelPaletteHelper.getVoxelPaletteId(chunk, dreamStonePillar.data.id, "default");
    if (paletteId) {
        const voxelData = DVEW.worldGeneration.voxelPaletteHelper.getVoxelData(chunk, paletteId);
        if (voxelData) {
            const voxelTrueId = voxelData[0];
            const voxelStateId = voxelData[1];
        }
    }
}
