/**# Render Comm
 * ---
 * Handles communication with the main/render thread.
 */
export declare class RenderComm {
    port: Worker;
    messageFunctions: Record<string, (data: any[], event: MessageEvent) => void>;
    $INIT(): void;
    _onMessage(event: MessageEvent): void;
    sendMessage(message: string, data: any[], transfers?: any[]): void;
    listenForMessage(message: string, run: (data: any[], event: MessageEvent) => void): void;
}
