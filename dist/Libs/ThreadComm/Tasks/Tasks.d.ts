export declare class Task<T> {
    name: string;
    run: (data: T) => void;
    constructor(name: string, run: (data: T) => void);
}
