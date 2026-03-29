import { FlowNodeRegister } from "@amodx-elms/flow";
import { InputNode } from "../../../Nodes/Inputs/InputNode";
import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import { Vector2Like, Vector3Like, Vector4Like } from "@amodx/math";
import RenderComponents from "../Components/RenderComponents";
import { FloatInput } from "../../Panel/Components/FloatInput";

export default function (
  register: FlowNodeRegister,
  palette: FlowGraphEditorNodePalette
) {
  register.registerNode({
    type: InputNode.TYPE,
    renderPanel(node) {
      const flowNode = node.flowNode;
      switch (flowNode.properties.type) {
        case "Float":
          return [
            {
              name: "Properties",
              collapsed: false,
              items: [
                FloatInput("Value", {
                  value: node.flowNode.outputs[0].value,
                  onInput(value) {
                    node.flowNode.outputs[0].value = value;
                    node.renderContent();
                  },
                }),
              ],
            },
          ];

        default:
          break;
      }
      return [];
    },
    renderBody(container, node) {
      const flowNode = node.flowNode;
      switch (flowNode.properties.type) {
        case "Float": {
          container.innerHTML = `<span>${flowNode.outputs[0].value}</span>`;
        }

        default:
          break;
      }
    },
  });
  palette.register(
    {
      name: "Float",
      category: "Inputs",
      addNode(x, y, editor) {
        editor.addNode(x, y, InputNode.CreateDefault("Float", "float", 0));
      },
    },
    {
      name: "Int",
      category: "Inputs",
      addNode(x, y, editor) {
        editor.addNode(x, y, InputNode.CreateDefault("Int", "int", 0));
      },
    },
    {
      name: "Vector 2",
      category: "Inputs",
      addNode(x, y, editor) {
        editor.addNode(
          x,
          y,
          InputNode.CreateDefault("Vector 2", "vector-2", Vector2Like.Create())
        );
      },
    },
    {
      name: "Vector 3",
      category: "Inputs",
      addNode(x, y, editor) {
        editor.addNode(
          x,
          y,
          InputNode.CreateDefault("Vector 3", "vector-3", Vector3Like.Create())
        );
      },
    },
    {
      name: "Vector 4",
      category: "Inputs",
      addNode(x, y, editor) {
        editor.addNode(
          x,
          y,
          InputNode.CreateDefault("Vector 4", "vector-4", Vector4Like.Create())
        );
      },
    }
  );
}
