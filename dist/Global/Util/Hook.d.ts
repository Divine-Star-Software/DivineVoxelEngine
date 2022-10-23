export declare class AsyncHook<T, K> {
    _onRun: ((data: T) => Promise<K | false>)[];
    run(data: T): Promise<K | false>;
    addToRun(run: (data: T) => Promise<K | false>): void;
}
export declare class SyncHook<T, K> {
    _onRun: ((data: T) => K | false)[];
    run(data: T): K | false;
    addToRun(run: (data: T) => K | false): void;
}
