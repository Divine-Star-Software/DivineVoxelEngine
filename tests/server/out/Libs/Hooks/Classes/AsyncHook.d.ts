export declare class AsyncHook<T, K> {
    _onRun: ((data: T) => Promise<K | false>)[];
    run(data: T): Promise<K | false>;
    addToRun(run: (data: T) => Promise<K | false>): void;
}
