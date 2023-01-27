import { LocationData } from "Meta/Data/CommonTypes.js";
import { SetRichVoxel } from "Meta/Data/RichWorldData.types.js";
export declare const RichWorldComm: import("../../../Libs/ThreadComm/Comm/Comm.js").CommBase & {
    setInitalData(data: SetRichVoxel): void;
    removeRichData(data: LocationData): void;
};
