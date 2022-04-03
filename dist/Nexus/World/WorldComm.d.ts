import type { DivineVoxelEngineNexus } from "index";
/**# World Comm
 * ---
 * Handles communcation with the world thread.
 */
export declare class WorldComm {
    private DVEN;
    port: MessagePort;
    connectedToWorld: boolean;
    messageFunctions: Record<string, (data: any[], event: MessageEvent) => void>;
    constructor(DVEN: DivineVoxelEngineNexus);
    setWorldPort(messagePort: MessagePort): void;
    awaitConnectionToWorldMatrix(): Promise<unknown>;
    listenForMessage(message: string, run: (data: any[], event: MessageEvent) => void): void;
}
