import { FlowNodeElement, FlowNodeRegister } from "@amodx-elms/flow";
import { FlowGraphEditorNodePalette } from "./Nodes/FlowGraphEditorNodePalette";
import { FlowEditorPanelData } from "./Panel/FlowEditorPanel.types";
export const DVEFlowNodeRegister = new FlowNodeRegister();
export const DVEFlowNodePaletteRegister = new FlowGraphEditorNodePalette();
declare module "@amodx-elms/flow" {
  interface FlowNodeTypeData {
    category?: string;
    renderPanel?(node: FlowNodeElement): FlowEditorPanelData[];
  }

  interface FlowNodeIOTypeData {}
}
