import { FunctionCompilerRegisterData } from "./FunctionCompiler.types";

export class FunctionCompilerRegister {
  static _nodes = new Map<string, FunctionCompilerRegisterData>();

  static get(type: string) {
    const node = this._nodes.get(type);
    if (!node) throw new Error(`Unknown node in function compiler ${type}`);
    return node;
  }

  static register(...nodes: FunctionCompilerRegisterData[]) {
    for (const node of nodes) {
      this._nodes.set(node.node, node);
    }
  }
}
FunctionCompilerRegister.register(
  {
    node: "IfNode",
    type: "flow",
    compile(node, compiler) {
      const input = compiler.getInputValue(node, "input");
      const trueBranchId = compiler.getOutputFlowValue(node, "true");
      const falseBranchId = compiler.getOutputFlowValue(node, "false");

      const trueBranch =
        trueBranchId != null ? compiler.compileFlowBranch(trueBranchId) : "";
      const falseBranch =
        falseBranchId != null ? compiler.compileFlowBranch(falseBranchId) : "";

      return `if (${input}) {\n${compiler.indent(
        trueBranch
      )}\n} else {\n${compiler.indent(falseBranch)}\n}`;
    },
  },
  {
    node: "OutputNode",
    type: "flow",
    compile(node, compiler) {
      const outVal = compiler.getInputValue(node, "output");
      return `return ${outVal};`;
    },
  },
  {
    node: "InputNode",
    type: "input",
    preProcess(node, compiler) {
      compiler.args["__inputs"] ??= {};
      compiler.args["__inputs"][`v${node.id}`] = node.outputs[0].value;
    },
    compile(node) {
      return `args.__inputs.v${node.id}`;
    },
  },
  {
    node: "ArgumentsNode",
    type: "input",
    preProcess(node, compiler) {
      compiler.args[node.properties.argumentName] =
        node.properties.defaultValue;
    },
    compile(node, input) {
      return `args["${node.properties.argumentName}"]${
        input.targetOutputName == "output"
          ? ""
          : `["${input.targetOutputName}"]`
      }`;
    },
  },
  {
    node: "PerlinNoise3DNode",
    type: "expression",
    preProcess(node, compiler) {
      const key = `perlin3d_${node.properties.noiseSegment}`;
      compiler.args.__functions ??= {};
      compiler.args.__functions[key] = (x: number, y: number, z: number) => {
        throw new Error(
          `Unresolved noise function  ${node.properties.noiseSegment}`
        );
      };
      compiler.dependencies.push({
        name: `Perlin Noise 3D | ${node.properties.noiseSegment}`,
        node,
        set(data) {
          compiler.args.__functions[key] = data;
        },
      });
    },
    compile(node, compiler) {
      const x = compiler.getInputValue(node, "x");
      const y = compiler.getInputValue(node, "y");
      const z = compiler.getInputValue(node, "z");
      return `const ${compiler.outputVar(node)} = args.__functions["perlin3d_${
        node.properties.noiseSegment
      }"](${x},${y},${z});`;
    },
  },
  {
    node: "CompareNode",
    type: "expression",
    compile(node, compiler) {
      const left = compiler.getInputValue(node, "left");
      const right = compiler.getInputValue(node, "right");

      let expr = "";
      switch (node.properties.mode) {
        case "Equal":
          expr = `${left} === ${right}`;
          break;
        case "NotEqual":
          expr = `${left} !== ${right}`;
          break;
        case "GreaterThan":
          expr = `${left} > ${right}`;
          break;
        case "GreaterOrEqual":
          expr = `${left} >= ${right}`;
          break;
        case "LessThan":
          expr = `${left} < ${right}`;
          break;
        case "LessOrEqual":
          expr = `${left} <= ${right}`;
          break;
        case "Xor":
          expr = `${left} || ${right}`;
          break;
        case "Or":
          expr = `${left} || ${right}`;
          break;
        case "And":
          expr = `${left} && ${right}`;
          break;
        default:
          expr = `${left} === ${right}`;
          break;
      }
      return `const ${compiler.outputVar(node)} = ${expr};`;
    },
  },
  {
    node: "MathNode",
    type: "expression",
    compile(node, compiler) {
      const left = compiler.getInputValue(node, "left");
      const right = compiler.getInputValue(node, "right");

      let expr = "";
      switch (node.properties.mode) {
        case "Add":
          expr = `${left} + ${right}`;
          break;
        case "Subtract":
          expr = `${left} - ${right}`;
          break;
        case "Multiply":
          expr = `${left} * ${right}`;
          break;
        case "Divide":
          expr = `${left} / ${right}`;
          break;
        case "Max":
          expr = `Math.max(${left}, ${right})`;
          break;
        case "Min":
          expr = `Math.min(${left}, ${right})`;
          break;
        default:
          expr = `${left} + ${right}`;
          break;
      }

      return `const ${compiler.outputVar(node)} = ${expr};`;
    },
  },
  {
    node: "MathScientificNode",
    type: "expression",
    compile(node, compiler) {
      const input = compiler.getInputValue(node, "input");
      let expr = "";
      switch (node.properties.mode) {
        case "Cos":
          expr = `Math.cos(${input})`;
          break;
        case "Sin":
          expr = `Math.sin(${input})`;
          break;
        case "Abs":
          expr = `Math.abs(${input})`;
          break;
        case "Exp":
          expr = `Math.exp(${input})`;
          break;
        case "Exp2":
          expr = `Math.pow(2, ${input})`;
          break;
        case "Round":
          expr = `Math.round(${input})`;
          break;
        case "Floor":
          expr = `Math.floor(${input})`;
          break;
        case "Ceiling":
          expr = `Math.ceil(${input})`;
          break;
        case "Sqrt":
          expr = `Math.sqrt(${input})`;
          break;
        case "Log":
          expr = `Math.log(${input})`;
          break;
        case "Tan":
          expr = `Math.tan(${input})`;
          break;
        case "ArcTan":
          expr = `Math.atan(${input})`;
          break;
        case "ArcCos":
          expr = `Math.acos(${input})`;
          break;
        case "ArcSin":
          expr = `Math.asin(${input})`;
          break;
        case "Sign":
          expr = `Math.sign(${input})`;
          break;
        case "Negate":
          expr = `-${input}`;
          break;
        case "OneMinus":
          expr = `1 - ${input}`;
          break;
        case "Reciprocal":
          expr = `1 / ${input}`;
          break;
        case "ToDegrees":
          expr = `${input} * (180 / Math.PI)`;
          break;
        case "ToRadians":
          expr = `${input} * (Math.PI / 180)`;
          break;
        case "Fract":
          expr = `${input} - Math.floor(${input})`;
          break;
        default:
          expr = `${input}`;
          break;
      }

      return `const ${compiler.outputVar(node)} = ${expr};`;
    },
  }
);
