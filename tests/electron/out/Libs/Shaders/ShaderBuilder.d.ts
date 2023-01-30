import { ShaderCodeBody, ShaderData, ShaderFunctionData } from "./Types/ShaderData.types";
export declare const DVEShaderBuilder: {
    shaders: Map<string, ShaderData>;
    functions: Map<string, ShaderFunctionData>;
    snippets: Map<string, ShaderCodeBody>;
    buildShader(id: string): false | {
        vertex: void;
        frag: void;
    };
    _replaceSnippets(text: string): void;
    buildFunction(id: string): string;
    buildSnippet(id: string): string;
    createShader(id: string, data: ShaderData): void;
    createFunction(id: string, data: ShaderFunctionData): void;
    createSnippet(id: string, data: ShaderCodeBody): void;
};
