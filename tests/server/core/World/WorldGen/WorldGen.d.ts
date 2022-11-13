export declare const WorldGen: {
    chunkDepth: number;
    chunkWidth: number;
    worldHeight: number;
    minY: number;
    generateHoleChunk(chunkX: number, chunkZ: number): void;
    generateNormalChunk(chunkX: number, chunkZ: number): void;
    generateRoofChunk(chunkX: number, chunkZ: number): void;
    generateBoxChunk(chunkX: number, chunkZ: number): void;
    generateWorldColumn(chunkX: number, chunkZ: number): void;
};
