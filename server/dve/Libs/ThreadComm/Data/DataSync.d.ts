export declare class DataSync<T, K> {
    onSync: (data: T) => void;
    onUnSync: (data: K) => void;
    constructor(onSync: (data: T) => void, onUnSync: (data: K) => void);
}
