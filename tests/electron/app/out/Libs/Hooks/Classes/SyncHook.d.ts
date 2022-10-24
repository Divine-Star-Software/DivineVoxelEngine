export declare class SyncHook<T, K> {
    _onRun: ((data: T) => K | false)[];
    run(data: T): K | false;
    addToRun(run: (data: T) => K | false): void;
}
