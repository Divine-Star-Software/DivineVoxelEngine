export declare const WorldGen: {
    chunkDepth: number;
    chunkWidth: number;
    chunkHeight: number;
    generateTree(x: number, y: number, z: number): void;
    generateSpike(xp: number, minY: number, zp: number): void;
    generateCircle(vox: string, x: number, y: number, z: number, radius: number, skipCenter?: boolean, noDestory?: boolean): void;
    generate(chunkX: number, chunkZ: number): void;
};
