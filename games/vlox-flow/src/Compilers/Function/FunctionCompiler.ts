import { FlowGraphData, NodeData, NodeInputData } from "@amodx/flow";
import { FunctionCompilerRegister } from "./FunctionCompilerRegister";
import { FunctionCompilerDepedency } from "./FunctionCompiler.types";

export class FunctionCompiler {
  private _nodeData: NodeData[] = [];
  private func!: (
    args: Record<string, any>,
    inputs: Record<string, any>
  ) => any;
  private inputs: Record<string, any> = {};
  private compiled = new Set<number>();
  private generatedCode: string[] = [];
  private visited = new Set<number>();
  args: Record<string, any> = {};
  dependencies: FunctionCompilerDepedency[] = [];
  constructor(public data: FlowGraphData) {
    this.buildData();
  }

  run() {
    return this.func(this.args, this.inputs);
  }

  private buildData() {
    let startNode: NodeData | undefined;

    for (const node of this.data.nodes) {
      this._nodeData[node.id] = node;
      if (node.type === "FunctionNode") {
        startNode = node;
        continue;
      }
      const nodeType = FunctionCompilerRegister.get(node.type);
      if (nodeType.preProcess) {
        nodeType.preProcess(node, this);
      }
    }

    if (!startNode) throw new Error("No function node found.");

    console.warn("BUILT ARGS", this.args);
    const functionBody = this.compileFunction(startNode.id);
    console.warn(functionBody);
    this.func = new Function("args", "inputs", functionBody) as any;
  }

  compileFunction(functionNodeId: number): string {
    const startNode = this._nodeData[functionNodeId];
    if (!startNode) throw new Error("Function node not found");

    const flowOut = startNode.outputs.find((o) => o.valueType === "flow");
    if (!flowOut) throw new Error("Function node missing flow output");

    const startId = flowOut.value;
    if (typeof startId !== "number") throw new Error("Invalid flow output id");

    const flowCode = this.compileFlowBranch(startId);
    return [...this.generatedCode, flowCode].join("\n");
  }

  compileFlowBranch(nodeId: number): string {
    if (this.visited.has(nodeId)) return "";
    this.visited.add(nodeId);

    const node = this._nodeData[nodeId];
    if (!node) throw new Error(`Node ${nodeId} not found`);

    const nodeType = FunctionCompilerRegister.get(node.type);
    if (nodeType.type !== "flow") {
      throw new Error(`Graph is not correct. Flow connection is wrong`);
    }
    return nodeType.compile(node, this);
  }

  getInputValue(node: NodeData, inputName: string): string {
    const input = node.inputs.find((i) => i.name === inputName);
    if (!input) throw new Error(`Missing input '${inputName}'`);

    if (input.targetNodeId != null && input.targetOutputName) {
      const sourceNode = this._nodeData[input.targetNodeId];
      if (!sourceNode)
        throw new Error(`Target node ${input.targetNodeId} not found`);
      const nodeType = FunctionCompilerRegister.get(sourceNode.type);
      if (nodeType.type == "input") {
        return nodeType.compile(sourceNode, input, this);
      }

      if (!this.compiled.has(sourceNode.id)) {
        const code = nodeType.compile(sourceNode, this);
        if (code) {
          this.generatedCode.push(code);
        }
        this.compiled.add(sourceNode.id);
      }

      return this.outputVar(sourceNode);
    }

    return JSON.stringify(input.value);
  }

  getOutputFlowValue(node: NodeData, outputName: string): number | null {
    const out = node.outputs.find(
      (o) => o.name === outputName && o.valueType === "flow"
    );
    return out?.value ?? null;
  }

  outputVar(node: NodeData): string {
    return `v${node.id}`;
  }

  indent(code: string): string {
    return code
      .split("\n")
      .map((line) => "  " + line)
      .join("\n");
  }
}
