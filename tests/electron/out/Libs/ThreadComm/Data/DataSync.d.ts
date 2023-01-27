declare type OnSyncFunction<T> = (data: T) => void;
declare type OnUnSyncFunction<T> = (data: T) => void;
export declare class DataSync<T, K> {
    __onSyncFunctions: OnSyncFunction<T>[];
    __onUnSyncFunctions: OnUnSyncFunction<K>[];
    constructor();
    addOnSync(func: OnSyncFunction<T>): void;
    addOnUnSync(func: OnUnSyncFunction<K>): void;
    sync(data: T): void;
    unSync(data: K): void;
}
export {};
