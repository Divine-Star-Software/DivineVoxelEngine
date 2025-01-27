import { DataSyncData } from "../Remote/DataSync.types";
import { InitVoxelDataProps } from "Voxels/InitVoxelData";

export type DataGeneratorData = {
  threads: DataSyncData["threads"];
} & InitVoxelDataProps;
