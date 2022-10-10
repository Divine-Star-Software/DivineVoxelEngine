export type MessageFunction = (data: any, event?: MessageEvent) => void;
export type MessageRecord = Record<string | number, MessageFunction>;
