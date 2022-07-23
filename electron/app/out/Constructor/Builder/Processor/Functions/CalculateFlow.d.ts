import type { VoxelData } from "Meta/index";
import type { Processor } from "../Processor";
export declare function CalculateFlow(this: typeof Processor, voxelData: VoxelData, faceFlipped: boolean, x: number, y: number, z: number, flowTemplate: number[]): void;
