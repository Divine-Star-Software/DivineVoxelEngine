const commBase = {
    name: "",
    port: null,
    setPort: function (port) {
        this.port = port;
        if (port.onmessage) {
            port.onmessage = (event) => {
                const message = event.data[0];
                if (this.messageFunctions[message]) {
                    this.messageFunctions[message](event.data, event);
                }
            };
        }
        if (port.on) {
            port.on("message", (event) => {
                const message = event.data[0];
                if (this.messageFunctions[message]) {
                    this.messageFunctions[message](event.data, event);
                }
            });
        }
    },
    messageFunctions: {},
    sendMessage: function (message, data, transfers) {
        if (!this.port) {
            throw new Error(`InterComm : ${this.name} port is not set.`);
        }
        if (transfers) {
            this.port.postMessage([message, ...data], transfers);
        }
        this.port.postMessage([message, ...data]);
    },
};
export function CreateInterComm(name, mergeObject, messageFunctions) {
    const newCom = Object.assign(Object.create(commBase), mergeObject);
    newCom.name = name;
    newCom.messageFunctions = messageFunctions;
    return newCom;
}
const com2 = {
    hello: () => { },
};
const com = CreateInterComm("test-com", com2, {});
