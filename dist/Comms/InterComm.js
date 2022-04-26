const commBase = {
    environment: "browser",
    name: "",
    port: null,
    __onSetPortRun: () => { },
    onSetPort: function (set) {
        this.__onSetPortRun = set;
    },
    setPort: function (port) {
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
        }
        if (this.environment == "node") {
            port.on("message", (event) => {
                const message = event.data[0];
                if (this.messageFunctions[message]) {
                    this.messageFunctions[message](event.data, event);
                }
                this.onMessage(event);
            });
        }
    },
    messageFunctions: {},
    sendMessage: function (message, data, transfers) {
        if (!this.port) {
            throw new Error(`DVE InterComm : ${this.name} port is not set.`);
        }
        if (transfers) {
            this.port.postMessage([message, ...data], transfers);
            return;
        }
        this.port.postMessage([message, ...data]);
    },
    listenForMessage: function (message, run) {
        this.messageFunctions[message] = run;
    },
    onMessage: (event) => { },
};
export function CreateInterComm(name, mergeObject) {
    const newCom = Object.assign(Object.create(commBase), mergeObject);
    newCom.name = name;
    //@ts-ignore
    if (typeof process !== "undefined" && typeof Worker === "undefined") {
        newCom.environment = "node";
    }
    return newCom;
}
const com2 = {
    hello: () => { },
};
const com = CreateInterComm("test-com", com2);
com.messageFunctions = {
    hello: (data, event) => { },
};
