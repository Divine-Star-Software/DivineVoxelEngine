import { DataTool } from "../../Tools/Data/DataTool";
import { DVEMesher } from "../Mesher";

export class BuilderDataTool extends DataTool {
  getConstructor() {
    return DVEMesher.instance.constructors.get(this.getStringId());
  }
}
