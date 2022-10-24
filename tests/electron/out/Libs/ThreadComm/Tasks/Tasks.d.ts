export declare class Task<T> {
    name: string | number;
    run: (data: T) => void;
    constructor(name: string | number, run: (data: T) => void);
}
