import type { InterCommInterface, InterCommPortTypes } from "Meta/Comms/InterComm.types";
/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export declare const PropagationCommManager: {
    count: number;
    numWorldGens: number;
    __numLightUpdates: number;
    propagators: InterCommInterface[];
    worldGensConnected: number;
    $INIT(statesSAB: SharedArrayBuffer): void;
    addPropagator(port: InterCommPortTypes): void;
    syncChunkInAllWorldGens(chunkX: number, chunkY: number, chunkZ: number): void;
    releaseChunkInAllWorldGens(chunkX: number, chunkY: number, chunkZ: number): void;
    syncRegionInAllWorldGens(regionX: number, regionY: number, regionZ: number): void;
    releaseRegionInAllWorldGens(regionX: number, regionY: number, regionZ: number): void;
    isReady(): boolean;
    __handleCount(): void;
    runRGBFloodFillAt(x: number, y: number, z: number): void;
    runRGBFloodRemoveAt(x: number, y: number, z: number): void;
    runSunLightForWorldColumn(x: number, z: number): void;
    runSunFillAt(x: number, y: number, z: number): void;
    runSunRemoveAt(x: number, y: number, z: number): void;
};
