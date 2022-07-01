const ready = { ready: false };
const socket = new WebSocket("ws://localhost:8080");
socket.addEventListener("open", function (event) {
    ready.ready = true;
    socket.send(JSON.stringify({
        action: "ready",
    }));
});
export const DataServer = {
    socket: socket,
    messageFunction: [],
    loadedRegion: "",
    awaitRegion: false,
    awaitRegionLoad(x, y, z) {
        this.socket.send(JSON.stringify({
            action: "load-region",
            name: `region-${x}-${y}-${z}`,
        }));
        const self = this;
        self.awaitRegion = true;
        return new Promise((resolve) => {
            const inte = setInterval(() => {
                if (!self.awaitRegion) {
                    clearInterval(inte);
                    resolve(self.loadedRegion);
                }
            }, 1);
        });
    },
    $INIT() {
        const self = this;
        this.socket.addEventListener("message", function (event) {
            const data = JSON.parse(event.data);
            if ((data.action = "load-region")) {
                self.awaitRegion = false;
                self.loadedRegion = data.region;
            }
        });
        return new Promise((resolve) => {
            const inte = setInterval(() => {
                if (ready.ready) {
                    clearInterval(inte);
                    resolve(true);
                }
            }, 1);
        });
    },
    addToOnMessage(func) {
        this.messageFunction.push(func);
    },
    sendMessage(data) {
        this.socket.send(data);
    },
};
