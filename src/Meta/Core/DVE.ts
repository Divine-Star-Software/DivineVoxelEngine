

export type DVEInitData = {
    worldWorkerPath: string;
    builderWorkerPath: string;
    fluidBuilderWorkerPath: string;
} & DVEOptions;

export type DVEOptions = {
    textureOptions ?: {
        width :  number,
        height : number
    }
}

export interface DVE {


     reStart(data : DVEOptions) : Promise<void>;
     
     $INIT(data :DVEInitData) : Promise<void>;
}