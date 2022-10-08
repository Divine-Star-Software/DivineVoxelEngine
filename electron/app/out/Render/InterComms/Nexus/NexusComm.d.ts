export declare const NexusComm: {
    environment: "node" | "browser";
    name: string;
    port: import("../../../Comms/InterComm.types.js").InterCommPortTypes | null;
    messageFunctions: Record<string | number, (data: any, event?: MessageEvent<any> | undefined) => void>;
    __onSetPortRun: (port: import("../../../Comms/InterComm.types.js").InterCommPortTypes) => void;
    onSetPort(set: (port: import("../../../Comms/InterComm.types.js").InterCommPortTypes) => void): void;
    setPort(port: import("../../../Comms/InterComm.types.js").InterCommPortTypes): void;
    _errorMessage(message: string): void;
    sendMessage(message: string | number, data?: any[], transfers?: any[] | undefined): void;
    listenForMessage(message: string | number, run: (data: any[], event?: MessageEvent<any> | undefined) => void): void;
    onMessage(event: any): void;
} & {
    $INIT(): void;
};
