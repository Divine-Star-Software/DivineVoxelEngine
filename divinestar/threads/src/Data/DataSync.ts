type OnSyncFunction<T> = (data: T) => void;
type OnUnSyncFunction<T> = (data: T) => void;

export class DataSync<T, K> {
	__onSyncFunctions: OnSyncFunction<T>[] = [];
	__onUnSyncFunctions: OnUnSyncFunction<K>[] = [];
	constructor(

	) {}

	addOnSync(func: OnSyncFunction<T>) {
		this.__onSyncFunctions.push(func);
	}

	addOnUnSync(func: OnUnSyncFunction<K>) {
		this.__onUnSyncFunctions.push(func);
	}

	sync(data: T) {
		for (const func of this.__onSyncFunctions) {
			func(data);
		}
	}

	unSync(data: K) {
		for (const func of this.__onUnSyncFunctions) {
			func(data);
		}
	}


}
