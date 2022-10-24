import { DivineVoxelEngineWorldGeneration } from "Constructor/WorldGeneration/DivineVoxelEngineWorldGeneration";
export declare type WorldGenInterface = {
    generate(DVEWG: DivineVoxelEngineWorldGeneration, x: number, z: number, data: any): Promise<void>;
};
