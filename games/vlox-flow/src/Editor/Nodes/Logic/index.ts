import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import Compare from "./Compare";
import Condiotnal from "./Condiotnal";
import { FlowNodeRegister } from "@amodx-elms/flow";

export default function (
  register: FlowNodeRegister,
  palette: FlowGraphEditorNodePalette
) {
  Compare(register, palette);
  Condiotnal(register, palette);
}
