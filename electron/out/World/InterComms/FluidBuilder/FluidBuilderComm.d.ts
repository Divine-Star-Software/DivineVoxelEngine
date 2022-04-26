import { ChunkTemplate } from "Meta/index.js";
declare const fluidBuilderCommBase: import("../../../Meta/Comms/InterComm.types.js").InterCommInterface & {
    fluidMeshHasBeenUpdated: boolean;
};
export declare const FluidBuilderComm: import("../../../Meta/Comms/InterComm.types.js").InterCommInterface & {
    fluidMeshHasBeenUpdated: boolean;
} & {
    fluidMeshHasBeenUpdated: boolean;
    setChunkTemplateForFluidMesh: (this: typeof fluidBuilderCommBase, chunkX: number, chunkY: number, chunkZ: number, template: ChunkTemplate) => void;
    requestFluidMeshBeReBuilt: (this: typeof fluidBuilderCommBase) => void;
    requestFullChunkBeRemoved: (this: typeof fluidBuilderCommBase, chunkX: number, chunkZ: number) => void;
};
export {};
