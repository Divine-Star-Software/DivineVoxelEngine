import type { VoxelTemplater } from "../../Constructor/Builder/Tools/VoxelTemplater";
export interface VoxelConstructor {
    id: string;
    process(templater: typeof VoxelTemplater): void;
}
