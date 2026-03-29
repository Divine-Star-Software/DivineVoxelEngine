import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import MathStandard from "./MathStandard";
import MathScientific from "./MathScientific";
import { FlowNodeRegister } from "@amodx-elms/flow";

export default function (
  register: FlowNodeRegister,
  palette: FlowGraphEditorNodePalette
) {
  MathStandard(register, palette);
  MathScientific(register, palette);
}
