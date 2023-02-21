import { BuildTasks } from "Meta/Tasks/Tasks.types.js";
export declare const Tasks: {
    data: {
        syncTextures: any;
    };
    build: {
        chunk: {
            tasks: any;
            run(data: BuildTasks): Promise<void>;
        };
        column: any;
    };
    voxelUpdate: {
        erase: any;
        paint: any;
    };
    explosion: any;
    worldSun: any;
    worldGen: {
        generate: any;
    };
    anaylzer: {
        propagation: any;
        update: any;
    };
    flow: {
        update: any;
        remove: any;
    };
    rgb: {
        update: any;
        remove: any;
    };
    sun: {
        update: any;
        remove: any;
    };
};
