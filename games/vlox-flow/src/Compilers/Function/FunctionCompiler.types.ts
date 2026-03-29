import { NodeData, NodeInputData } from "@amodx/flow";
import { FunctionCompiler } from "./FunctionCompiler";
export type FunctionCompilerNodeTypes = "flow" | "input" | "expression";

export type FunctionCompilerRegisterData =
  | {
      node: string;
      type: "flow";
      preProcess?(data: NodeData, compiler: FunctionCompiler): void;
      compile(node: NodeData, compiler: FunctionCompiler): string;
    }
  | {
      node: string;
      type: "input";
      preProcess?(data: NodeData, compiler: FunctionCompiler): void;
      compile(
        node: NodeData,
        input: NodeInputData,
        compiler: FunctionCompiler
      ): string;
    }
  | {
      node: string;
      type: "expression";
      preProcess?(data: NodeData, compiler: FunctionCompiler): void;
      compile(node: NodeData, compiler: FunctionCompiler): string;
    };

export type FunctionCompilerDepedency = {
  name: string;
  node: NodeData;
  set: (data: any) => void;
};
