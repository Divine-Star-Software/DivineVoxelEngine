/**# World Comm
 * ---
 * Handles communcation with the world thread.
 */
export class WorldComm {
    DVEN;
    port;
    connectedToWorld = false;
    messageFunctions = {};
    constructor(DVEN) {
        this.DVEN = DVEN;
    }
    setWorldPort(messagePort) {
        this.port = messagePort;
        this.port.onmessage = (event) => {
            const message = event.data[0];
            if (message == "set-world-port") {
                this.connectedToWorld = true;
            }
            this.DVEN.matrixHub.onMessage(event, (messageEvent) => { });
            if (this.messageFunctions[message]) {
                this.messageFunctions[message](event.data, message);
            }
        };
    }
    awaitConnectionToWorldMatrix() {
        return new Promise((resolve, reject) => {
            let inte = 0;
            const failTimeout = setTimeout(() => {
                clearInterval(inte);
                reject(false);
            }, 60000);
            inte = setInterval(() => {
                if (this.connectedToWorld) {
                    clearInterval(inte);
                    clearTimeout(failTimeout);
                    resolve(true);
                }
            }, 20);
        });
    }
    listenForMessage(message, run) {
        this.messageFunctions[message] = run;
    }
}
