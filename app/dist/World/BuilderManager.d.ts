/**# Builder Manager Worker
 * ---
 * Handles communication with the mesh builders thread.
 */
export declare class BuilderManager {
    count: number;
    numBuilders: number;
    mainThreadCom: Worker;
    builders: MessagePort[];
    setMainThreadCom(worker: Worker): void;
    addBuilder(port: MessagePort): void;
    requestChunkBeRemoved(chunkX: number, chunkZ: number): void;
    requestChunkBeBuilt(chunkX: number, chunkZ: number, chunkTemplate: number[][]): void;
}
