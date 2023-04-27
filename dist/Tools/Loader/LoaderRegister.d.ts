import { CommBase } from "threadcomm";
import { LocationData } from "voxelspaces";
import { UtilMap } from "../../Global/Util/UtilMap.js";
export declare const LoaderRegister: {
    load: UtilMap<string, Function[]>;
    dataComm: CommBase;
    $INIT(dataComm: CommBase): void;
    addToLoad(location: LocationData, run: Function): number | undefined;
    runLoad(location: LocationData, data: any): false | undefined;
};
