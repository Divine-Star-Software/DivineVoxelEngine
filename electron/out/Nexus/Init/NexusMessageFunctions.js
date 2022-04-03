export const getNexusWorkerFunctions = (resolve, DVEN, onReady) => {
    const messageFunctions = {
        "connect-world": async (data, eventData) => {
            const port = eventData.ports[0];
            DVEN.worldComm.setWorldPort(port);
            await DVEN.worldComm.awaitConnectionToWorldMatrix();
            resolve(true);
            onReady();
        },
        "sync-settings": (data, eventData) => {
            const settings = data[1];
            DVEN.syncSettings(settings);
        },
    };
    return messageFunctions;
};
