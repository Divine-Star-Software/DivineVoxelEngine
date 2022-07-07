export type DVENInitData = {
 onReady?: Function;
 onMessage?: (message: string, data: any[]) => void;
 onRestart?: Function;
};
