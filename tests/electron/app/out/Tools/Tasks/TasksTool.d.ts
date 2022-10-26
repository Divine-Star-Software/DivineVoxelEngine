declare class TasksBase {
    _data: {
        dimension: string;
    };
    _thread: string;
    constructor();
    setDimension(dimensionId: string): this;
    build: {
        chunk: {
            __this: TasksBase;
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    flow: {
        update: {
            __this: TasksBase;
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
        remove: {
            __this: TasksBase;
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    light: {
        rgb: {
            update: {
                __this: TasksBase;
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                __this: TasksBase;
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        sun: {
            update: {
                __this: TasksBase;
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                __this: TasksBase;
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        worldSun: {
            __this: TasksBase;
            __queueId: string;
            add(x: number, z: number, y?: number): void;
            runAndAwait(): Promise<void>;
        };
    };
}
export declare const TasksTool: () => TasksBase;
export {};
