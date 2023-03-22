import { DataTool } from "../../../Tools/Data/DataTool.js";
import { Builder } from "../Builder.js";

export class BuilderDataTool extends DataTool {

 getConstructor() {
  return Builder.constructors.get(this.getStringId());
 }
}
