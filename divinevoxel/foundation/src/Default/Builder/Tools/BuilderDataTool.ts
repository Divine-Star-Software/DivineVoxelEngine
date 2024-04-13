import { DataTool } from "../../Tools/Data/DataTool";
import { DVEDefaultBuilder } from "../Builder";

export class BuilderDataTool extends DataTool {
  getConstructor() {
    return DVEDefaultBuilder.instance.constructors.get(this.getStringId());
  }
}
