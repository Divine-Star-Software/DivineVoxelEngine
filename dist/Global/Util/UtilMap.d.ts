export declare class UtilMap<T, K> {
    _map: Map<T, K>;
    constructor(data?: [id: T, value: K][]);
    set(id: T, value: K): void;
    get(id: T): NonNullable<K> | undefined;
    add(data: [id: T, value: K][]): void;
    has(id: T): boolean;
    remove(id: T): void;
}
