import { LocationData } from "Meta/Data/CommonTypes.js";
import { SetRichVoxel } from "Meta/Data/RichWorldData.types.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";

const richWorldCommBase = ThreadComm.createComm("rich-world");
const richWorldComm = Object.assign(richWorldCommBase, {
 setInitalData(data: SetRichVoxel) {
  richWorldComm.runTasks<SetRichVoxel>("set-voxel", data);
 },
 removeRichData(data: LocationData) {
  richWorldComm.runTasks<LocationData>("remove-voxel", data);
 },
});

export const RichWorldComm = richWorldComm;
