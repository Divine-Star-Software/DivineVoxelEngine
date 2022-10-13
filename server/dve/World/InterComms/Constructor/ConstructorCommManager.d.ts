export declare const CCM: import("../../../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
    $INIT(statesSAB: SharedArrayBuffer): void;
    syncChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
    releaseChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
    syncRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
    releaseRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
    tasks: {
        build: {
            chunk: (data: any) => number | undefined;
            entity: (x: number, y: number, z: number, width: number, depth: number, height: number, composed: number, voxelData: Uint32Array[], voxelStateData: Uint32Array[]) => number | undefined;
            item: (data: any) => number | undefined;
        };
        rgb: {
            update: (data: any) => number | undefined;
            remove: (data: any) => number | undefined;
        };
        worldSun: {
            fillWorldColumn: (data: any) => number | undefined;
            updateAtMaxY: (data: any) => number | undefined;
            floodAtMaxY: (data: any, threadNumber: number) => number | undefined;
        };
        sun: {
            update: (data: any) => number | undefined;
            remove: (data: any) => number | undefined;
        };
        flow: {
            update: (data: any) => number | undefined;
            remove: (data: any) => number | undefined;
        };
        worldGen: {
            generate: (data: any) => number | undefined;
        };
    };
};
