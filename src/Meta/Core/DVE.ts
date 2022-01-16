

export type DVEInitData = {
    worldWorkerPath: string;
    builderWorkerPath: string;
    fluidBuilderWorkerPath: string;
}

export interface DVE {


     $INIT(data :DVEInitData) : Promise<void>;
}