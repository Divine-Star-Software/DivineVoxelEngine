import { Task } from "Libs/ThreadComm/Tasks/Tasks.js";
export declare const Tasks: {
    build: {
        chunk: Task<any[]>;
        entity: Task<any[]>;
        item: Task<any[]>;
    };
    rgb: {
        update: Task<any[]>;
        remove: Task<any[]>;
    };
    worldSun: {
        fillWorldColumn: Task<any[]>;
        updateAtMaxY: Task<any[]>;
        floodAtMaxY: Task<any[]>;
    };
    sun: {
        update: Task<any[]>;
        remove: Task<any[]>;
    };
    flow: {
        update: Task<any[]>;
        remove: Task<any[]>;
    };
    worldGen: {
        generate: Task<any[]>;
    };
};
