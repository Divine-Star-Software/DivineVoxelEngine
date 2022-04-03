/**# World Comm
 * ---
 * Handles communcation with the world thread.
 */
export class WorldComm {
 port: MessagePort;
 setWorldPort(messagePort: MessagePort) {
     this.port = messagePort;
 }


 
}
