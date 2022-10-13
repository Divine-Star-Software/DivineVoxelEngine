export class DataSync {
    onSync;
    onUnSync;
    constructor(onSync, onUnSync) {
        this.onSync = onSync;
        this.onUnSync = onUnSync;
    }
}
