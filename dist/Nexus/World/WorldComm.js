/**# World Comm
 * ---
 * Handles communcation with the world thread.
 */
export class WorldComm {
    DVEN;
    port;
    constructor(DVEN) {
        this.DVEN = DVEN;
    }
    setWorldPort(messagePort) {
        this.port = messagePort;
        this.port.onmessage = (event) => {
            this.DVEN.matrixHub.onMessage(event, (messageEvent) => { });
        };
    }
}
