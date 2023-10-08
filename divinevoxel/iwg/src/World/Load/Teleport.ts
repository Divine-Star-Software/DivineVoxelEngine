import type { Generator } from "World/Classes/Generator";
import { IWGLoadBase } from "./LoaderBase.js";
import { IWGSafeExit } from "./SafeExit.js";
import { IWGInitalLoad } from "./InitLoad.js";
import { LocationData } from "@divinestar/voxelspaces";

export class IWGTeleport extends IWGLoadBase {
  constructor(public gen: Generator, public teleportLocation: LocationData) {
    super(gen);
  }
  async run(onCheck: (gen: Generator) => void) {
    const exit = new IWGSafeExit(this.gen);
    await exit.run(()=>{
      console.log("exiting")
    });
    console.log("SETTING DIMENSIONSS")
    this.gen.updateDimension(this.teleportLocation[0]);
    console.log([...this.gen.location],this.gen.dimension);
    this.gen.setLocation(this.teleportLocation);
    const initLoad = new IWGInitalLoad(this.gen);
    await initLoad.run((gen)=>{
      console.log(initLoad.gen._logTasks(),this.teleportLocation,this.gen.location,gen.location,initLoad.gen.location);
    });
  }
}
