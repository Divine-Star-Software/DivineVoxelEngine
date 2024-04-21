import { DataRegister } from "@divinevoxel/core/Interfaces/World/Data/DataRegister";
import { DimensionsRegister } from "../../../Data/World/DimensionsRegister";
import { WorldRegister } from "../../../Data/World/WorldRegister";

export class DVEFDataReigster extends DataRegister {
  dimensions = new DimensionsRegister();
  world = new WorldRegister();
}
