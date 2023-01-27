import { Priorities } from "Meta/Tasks/Tasks.types";
export declare const TasksQueue: {
    tasks: Map<Priorities, [id: string, data: any][]>;
    addTasks(priority: Priorities, data: any, run: (data: any) => void): void;
    $INIT(): void;
};
