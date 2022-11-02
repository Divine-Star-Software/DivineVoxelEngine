declare class TasksBase {
    _data: {
        dimension: string;
        queue: string;
    };
    _thread: string;
    constructor();
    setFocalPoint(x: number, y: number, z: number, dimension?: string): void;
    build: {
        chunk: {
            _s: TasksBase;
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    flow: {
        update: {
            _s: TasksBase;
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
        remove: {
            _s: TasksBase;
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    light: {
        rgb: {
            update: {
                _s: TasksBase;
                __queueId: string;
                add(x: number, y: number, z: number, queue?: string | null): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: TasksBase;
                __queueId: string;
                add(x: number, y: number, z: number, queue?: string | null): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        sun: {
            update: {
                _s: TasksBase;
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: TasksBase;
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        worldSun: {
            _s: TasksBase;
            __queueId: string;
            add(x: number, z: number, y?: number): void;
            runAndAwait(): Promise<void>;
        };
    };
}
export declare const TasksTool: () => TasksBase;
export {};
