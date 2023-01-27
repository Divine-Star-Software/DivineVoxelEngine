export declare type MessageFunction = (data: any, event?: MessageEvent) => void;
export declare type MessageRecord = Record<string | number, MessageFunction[]>;
