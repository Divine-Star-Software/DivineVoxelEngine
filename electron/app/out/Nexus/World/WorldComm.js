/**# World Comm
 * ---
 * Handles communcation with the world thread.
 */
export class WorldComm {
    port;
    setWorldPort(messagePort) {
        this.port = messagePort;
    }
}
