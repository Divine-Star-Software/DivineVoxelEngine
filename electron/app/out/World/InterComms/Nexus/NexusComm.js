/**# Nexus Comm
 * ---
 * Handles communication with the nexus thread.
 */
export class NexusComm {
    DVEW;
    port;
    messageFunctions = {};
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    setNexusPort(port) {
        this.port = port;
        this.DVEW.matrixCentralHub.registerThread("nexus", port);
        port.onmessage = (event) => {
            const message = event.data[0];
            if (this.messageFunctions[message]) {
                this.messageFunctions[message](event.data, event);
            }
        };
    }
    sendMessage(message, data, transfers) {
        if (transfers) {
            this.port.postMessage([message, ...data], transfers);
        }
        this.port.postMessage([message, ...data]);
    }
    listenForMessage(message, run) {
        this.messageFunctions[message] = run;
    }
}
