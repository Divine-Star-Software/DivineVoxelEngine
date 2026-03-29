import "@amodx-elms/flow";
import "./index";
import "./Editor/index";
import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import {
  DVEFlowNodeRegister,
  DVEFlowNodePaletteRegister,
} from "./Editor/index";
import RegisterArgumentNodes from "./Editor/Nodes/Arguments";
import RegisterMathNodes from "./Editor/Nodes/Math";
import RegisterInputNodes from "./Editor/Nodes/Inputs";
import RegisterLogicNodes from "./Editor/Nodes/Logic";
import RegisterOutputNodes from "./Editor/Nodes/Functions";
import RegisterNoiseNodes from "./Editor/Nodes/Noise";
import RegisterIO from "./Editor/IO/index";
import { JSONFileAPI } from "../Util/JSONFileAPI";
export default function () {
  JSONFileAPI.init();
  const editor = document.createElement("flow-editor");
  RegisterOutputNodes(DVEFlowNodeRegister, DVEFlowNodePaletteRegister);
  RegisterLogicNodes(DVEFlowNodeRegister, DVEFlowNodePaletteRegister);
  RegisterInputNodes(DVEFlowNodeRegister, DVEFlowNodePaletteRegister);
  RegisterNoiseNodes(DVEFlowNodeRegister, DVEFlowNodePaletteRegister);
  RegisterArgumentNodes(DVEFlowNodeRegister, DVEFlowNodePaletteRegister, [
    {
      name: "position",
      defaultValue: { x: 0, y: 0, z: 0 },
      outputs: [
        {
          name: "x",
          valueType: "float",
          value: 0,
        },
        {
          name: "y",
          valueType: "float",
          value: 0,
        },
        {
          name: "z",
          valueType: "float",
          value: 0,
        },
      ],
    },
  ]);
  RegisterMathNodes(DVEFlowNodeRegister, DVEFlowNodePaletteRegister);
  RegisterIO(DVEFlowNodeRegister);

  editor.flowNodeRegsiter = DVEFlowNodeRegister;
  editor.flowNodePalette = DVEFlowNodePaletteRegister;
  editor.flowGraph = new FlowGraph({
    editorData: {
      locations: [],
      x: 0,
      y: 0,
      zoom: 1,
    },
    type: "",
    outputNodeId: 0,
    nodes: [],
  });
  document.body.append(editor);
  const noiseVisualizer = document.createElement("noise-visualizer");
  noiseVisualizer.editor = editor;
  editor.visualizerContainer.append(noiseVisualizer);
}
