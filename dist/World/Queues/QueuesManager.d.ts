export declare const QueuesManager: {
    $INIT(): void;
    rgb: {
        update: any;
        remove: any;
    };
    worldSun: {
        add(x: number, z: number, queueId?: string): void;
        run(): Promise<void>;
        __steps: {
            step1: any;
            step2: any;
            step3: any;
        };
    };
    sun: {
        update: any;
        remove: any;
    };
    flow: {
        update: any;
        remove: any;
    };
    build: {
        chunk: any;
    };
    generate: {
        chunk: any;
    };
};
