import { DataTool } from "@divinevoxel/core/Tools/Data/DataTool.js";
import { DVEDefaultBuilder } from "../Builder";

export class BuilderDataTool extends DataTool {

 getConstructor() {

  return DVEDefaultBuilder.instance.constructors.get(this.getStringId());
 }
}
