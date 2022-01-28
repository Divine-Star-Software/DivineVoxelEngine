export declare type DVEWInitData = {
    voxelPaletteMode: "per-chunk" | "global";
    onReady: Function;
    onMessage: (message: string, data: any[]) => void;
    onRestart?: Function;
};
