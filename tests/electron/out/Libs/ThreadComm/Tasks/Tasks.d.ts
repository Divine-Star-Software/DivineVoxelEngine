export declare class Task<T> {
    name: string | number;
    run: (data: T, onDone?: Function) => void;
    mode: "async" | "deffered";
    constructor(name: string | number, run: (data: T, onDone?: Function) => void, mode: "async" | "deffered");
}
