export function InitNexusWorker(DVEW, onReady, onMessage, onRestart) {
    addEventListener("message", (event) => {
        const eventData = event.data;
        const message = eventData[0];
        onMessage(message, eventData);
    });
}
