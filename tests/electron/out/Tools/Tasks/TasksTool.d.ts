declare class TasksBase {
    _data: {
        dimension: number;
    };
    setDimension(dimensionId: number | string): this;
    build: {
        chunk: {
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    flow: {
        update: {
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
        remove: {
            __queueId: string;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    light: {
        rgb: {
            update: {
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        sun: {
            update: {
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                __queueId: string;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        worldSun: {
            __queueId: string;
            add(x: number, z: number, y?: number): void;
            runAndAwait(): Promise<void>;
        };
    };
}
export declare const TasksTool: () => TasksBase;
export {};
