declare class QueueNode<T> {
    data: T;
    next: QueueNode<T> | null;
    constructor(data: T);
}
export declare class Queue<T> {
    size: number;
    first: QueueNode<T> | null;
    last: QueueNode<T> | null;
    enqueue(data: T): void;
    dequeue(): T | null;
}
export {};
