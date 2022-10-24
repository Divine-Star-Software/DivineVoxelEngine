export declare const CreatePromiseCheck: (data: {
    check: () => boolean;
    onReady?: () => any;
    checkInterval: number;
    failTimeOut?: number;
    onFail?: () => any;
}) => Promise<boolean>;
