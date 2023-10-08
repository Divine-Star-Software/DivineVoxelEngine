import { DataSync } from "./DataSync.js";

export const DataSyncManager = {

    _onDataSync : new Map<string | number,DataSync<any,any>>(),



	registerDataSync<T, K>(
		dataType: string | number,
		onSync?: (data: T) => void,
		onUnSync?: (data: K) => void
	) {
		const sync = new DataSync<T, K>();
		if (onSync) {
			sync.addOnSync(onSync);
		}
		if (onUnSync) {
			sync.addOnUnSync(onUnSync);
		}
		this._onDataSync.set(dataType,sync);
		return sync;
	},

    getDataSync(id : string | number) {
        const dataSync = this._onDataSync.get(id);
        if(!dataSync) return false; 
        return dataSync;
    }


}