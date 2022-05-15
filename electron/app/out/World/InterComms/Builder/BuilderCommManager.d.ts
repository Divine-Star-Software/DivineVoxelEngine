import type { InterCommInterface, InterCommPortTypes } from "Meta/Comms/InterComm.types";
/**# Builder Comm Manager
 * ---
 * Handles all builder inter comms.
 */
export declare const BuilderCommManager: {
    count: number;
    numBuilders: number;
    builders: InterCommInterface[];
    ready: Record<string, boolean>;
    buildersConnected: number;
    addBuilder(port: InterCommPortTypes): void;
    syncChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number): void;
    releaseChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number): void;
    isReady(): boolean;
    requestFullChunkBeRemoved(chunkX: number, chunkY: number, chunkZ: number): void;
    requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number): void;
};
