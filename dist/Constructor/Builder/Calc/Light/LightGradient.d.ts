import type { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool";
import type { DirectionNames } from "Meta";
export declare const LightGradient: {
    tool: VoxelMesherDataTool;
    settings: {
        doAO: boolean;
        doRGB: boolean;
        doSun: boolean;
    };
    calculate(face: DirectionNames, tool: VoxelMesherDataTool, ignoreAO?: boolean): void;
};
