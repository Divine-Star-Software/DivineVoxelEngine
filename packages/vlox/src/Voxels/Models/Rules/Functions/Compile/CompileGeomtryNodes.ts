import { CompiledGeomtryNodes } from "../../../../../Mesher/Models/Nodes/Types/GeomtryNode.types";
import { VoxelRuleGeometryData } from "../../Classes/VoxelRulesGeometry";
import { GeomtryInput } from "../../Classes/GeomtryInput";
import { CompileBoxGeometryNode } from "./Nodes/CompileBoxGeometryNode";
import { CompileQuadGeometryNode } from "./Nodes/CompileQuadGeometryNode";
import { CompileTriangleGeometryNode } from "./Nodes/CompileTriangleGeometryNode";

export function CompileGeomtryNodes(
  buildRules: boolean,
  input: GeomtryInput,
  data: VoxelRuleGeometryData["nodes"]
) {
  const compiled: CompiledGeomtryNodes[] = [];
  for (const { node, tranform } of data) {
    if (node.type == "custom") {
      compiled.push({
        type: "custom",
        id: node.id,
      });
 
      input.args.push(     {});
      const argsIndex = input.args.length - 1;
      for (const inputArg in node.inputs) {
        const value = node.inputs[inputArg];
        if (input.isArgString(value)) {
          input.args[argsIndex][inputArg] = null;
          input.onInput(value!, (value) => {
            input.args[argsIndex][inputArg] = value;
          });
        } else {
          input.args[argsIndex][inputArg] = value;
        }
      }
    }
    if (node.type == "box") {
      compiled.push(
        ...CompileBoxGeometryNode(buildRules, input, node, tranform)
      );
    }
    if (node.type == "quad") {
      compiled.push(
        CompileQuadGeometryNode(buildRules, input, node.points, node, tranform)
      );
    }
    if (node.type == "triangle") {
      compiled.push(
        CompileTriangleGeometryNode(
          buildRules,
          input,
          node.points,
          node,
          tranform
        )
      );
    }
  }

  input.orginalArgs = structuredClone(input.args);
  return compiled;
}
