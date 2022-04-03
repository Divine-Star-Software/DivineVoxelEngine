import type { DivineVoxelEngineWorld } from "index";
/**# Nexus Comm
 * ---
 * Handles communication with the nexus thread.
 */
export declare class NexusComm {
    private DVEW;
    port: MessagePort;
    constructor(DVEW: DivineVoxelEngineWorld);
    setNexusPort(port: MessagePort): void;
    nexusLoadChunk(chunkX: number, chunkY: number, chunkZ: number): false | undefined;
    removeChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number): false | undefined;
}
