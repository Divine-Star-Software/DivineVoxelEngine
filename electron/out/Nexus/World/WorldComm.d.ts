import type { DivineVoxelEngineNexus } from "index";
/**# World Comm
 * ---
 * Handles communcation with the world thread.
 */
export declare class WorldComm {
    private DVEN;
    port: MessagePort;
    constructor(DVEN: DivineVoxelEngineNexus);
    setWorldPort(messagePort: MessagePort): void;
}
