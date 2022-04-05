/**# Render Comm
 * ---
 * Handles communication with the main/render thread.
 */
export class RenderComm {
    port = self;
    messageFunctions = {};
    $INIT() { }
    _onMessage(event) {
        const message = event.data[0];
        if (this.messageFunctions[message]) {
            this.messageFunctions[message](event.data, event);
        }
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
