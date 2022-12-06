export const TCMessageHeaders = Object.freeze({
    internal: -99,
    runTasks: -98,
    dataSync: -97,
    message: -96,
});
export const TCInternalMessages = Object.freeze({
    IsReady: -99,
    nameThread: -98,
    connectPort: -97,
    syncQueue: -96,
    unSyncQueue: -95,
    completeTasks: -94,
});
export const TCDataSyncMessages = Object.freeze({
    SyncData: -990,
    UnSyncData: -980,
});
