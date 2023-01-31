import { DVEShader } from "./Classes/DVEShader.js";
import type { ShaderCodeBody, ShaderFunctionData } from "./Types/ShaderData.types";
export declare const DVEShaderBuilder: {
    buildShader(id: string): void;
    shaders: {
        _shaders: Map<string, DVEShader>;
        create(id: string): DVEShader;
    };
    functions: {
        _functions: Map<string, ShaderFunctionData>;
        _functionSets: Map<string, string[]>;
        create(id: string, data: ShaderFunctionData): void;
        _processFunctinos(id: string, data: ShaderFunctionData): string;
        build(id: string, data?: ShaderFunctionData): string;
    };
    snippets: {
        _snippets: Map<string, ShaderCodeBody>;
        create(id: string, data: ShaderCodeBody): void;
        override(id: string, data: ShaderCodeBody): boolean;
        get(id: string): string;
        _process(text: string): {
            newBody: string;
            foundSnippet: boolean;
        };
        build(text: string): string;
    };
};
