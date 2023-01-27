export declare const PromiseTasks: {
    _waiting: Map<string | number, Map<string | number, (data: any) => void>>;
    addPromiseTakss(tasksId: string | number, tasksRequestsId: string | number, onDone: (data: any) => void): void;
    completePromiseTasks(tasksId: string | number, tasksRequestsId: string | number, data: any): void;
};
