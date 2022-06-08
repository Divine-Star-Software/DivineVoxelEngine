import type { InterCommInterface, InterCommPortTypes } from "Meta/Comms/InterComm.types";
/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export declare const ConstructorCommManager: {
    count: number;
    numConstructors: number;
    __numLightUpdates: number;
    constructors: InterCommInterface[];
    constructorsConnected: number;
    $INIT(statesSAB: SharedArrayBuffer): void;
    addThread(port: InterCommPortTypes): void;
    syncChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
    releaseChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
    syncRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
    releaseRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
    isReady(): boolean;
    __handleCount(): void;
    requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number): void;
    runRGBFloodFillAt(x: number, y: number, z: number): void;
    runRGBFloodRemoveAt(x: number, y: number, z: number): void;
    runSunLightForWorldColumn(x: number, z: number, maxY: number): void;
    runSunFillAtMaxY(x: number, y: number, maxY: number): void;
    runSunFillAt(x: number, y: number, z: number): void;
    runSunRemoveAt(x: number, y: number, z: number): void;
};
