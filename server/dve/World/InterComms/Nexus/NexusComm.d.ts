import type { DivineVoxelEngineWorld } from "index";
/**# Nexus Comm
 * ---
 * Handles communication with the nexus thread.
 */
export declare class NexusComm {
    private DVEW;
    port: MessagePort;
    messageFunctions: Record<string, (data: any[], event: MessageEvent) => void>;
    constructor(DVEW: DivineVoxelEngineWorld);
    setNexusPort(port: MessagePort): void;
    sendMessage(message: string, data: any[], transfers?: any[]): void;
    listenForMessage(message: string, run: (data: any[], event: MessageEvent) => void): void;
}
