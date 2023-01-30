import { DVEShader } from "./Classes/DVEShader.js";
import type { ShaderCodeBody, ShaderFunctionData } from "./Types/ShaderData.types";
export declare const DVEShaderBuilder: {
    shaders: Map<string, DVEShader>;
    functions: Map<string, ShaderFunctionData>;
    snippets: Map<string, ShaderCodeBody>;
    buildShader(id: string): void;
    _process(text: string): {
        newBody: string;
        foundSnippet: boolean;
    };
    _replaceSnippets(text: string): string;
    _buildFunction(id: string, data: ShaderFunctionData): string;
    buildFunction(id: string, data?: ShaderFunctionData): string;
    buildSnippet(id: string): string;
    createShader(id: string): DVEShader;
    createFunction(id: string, data: ShaderFunctionData): void;
    createSnippet(id: string, data: ShaderCodeBody): void;
};
