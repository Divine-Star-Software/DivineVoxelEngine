class InterCommBase {
    environment = "browser";
    name = "";
    port = null;
    messageFunctions = {};
    __onSetPortRun = (port) => { };
    onSetPort(set) {
        this.__onSetPortRun = set;
    }
    setPort(port) {
        if (!port) {
            throw new Error(`DVE InterComm: ${this.name} port is not set.`);
        }
        this.port = port;
        this.__onSetPortRun(port);
        if (this.environment == "browser") {
            port.onmessage = (event) => {
                const message = event.data[0];
                if (this.messageFunctions[message]) {
                    this.messageFunctions[message](event.data, event);
                }
                this.onMessage(event);
            };
            port.onmessageerror = (event) => { };
        }
        if (this.environment == "node") {
            port.on("message", (data) => {
                const message = data[0];
                if (this.messageFunctions[message]) {
                    this.messageFunctions[message](data, data);
                }
                this.onMessage(data);
            });
        }
    }
    _errorMessage(message) {
        throw new Error(`[DVE InterComm : ${this.name}] ${message}`);
    }
    sendMessage(message, data = [], transfers) {
        if (!this.port) {
            return this._errorMessage("Port is not set.");
        }
        if (this.environment == "browser" && transfers) {
            this.port.postMessage([message, ...data], transfers);
            return;
        }
        this.port.postMessage([message, ...data]);
    }
    listenForMessage(message, run) {
        this.messageFunctions[message] = run;
    }
    onMessage(event) { }
}
export function CreateInterComm(name, mergeObject) {
    const newCom = Object.assign(new InterCommBase(), mergeObject);
    newCom.name = name;
    //@ts-ignore
    if (typeof process !== "undefined" && typeof Worker === "undefined") {
        newCom.environment = "node";
    }
    return newCom;
}
