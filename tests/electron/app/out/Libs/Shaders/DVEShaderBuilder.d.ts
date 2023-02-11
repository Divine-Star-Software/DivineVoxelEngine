import { DVEShader } from "./Classes/DVEShader.js";
import type { ShaderCodeBody, ShaderDefinesData, ShaderFunctionData, ShaderUniformData } from "./Types/ShaderData.types";
export declare const DVEShaderBuilder: {
    buildShader(id: string): void;
    shaders: {
        _shaders: Map<string, DVEShader>;
        create(id: string): DVEShader;
    };
    functions: {
        _functions: Map<string, ShaderFunctionData<any>>;
        _functionSets: Map<string, string[]>;
        create(id: string, data: ShaderFunctionData<any>): void;
        _processFunctinos(id: string, data: ShaderFunctionData<any>): string;
        build(id: string, data?: ShaderFunctionData<any>): string;
    };
    define: {
        _process(data: ShaderDefinesData): string;
        build(data: ShaderDefinesData | ShaderDefinesData[] | Map<string, ShaderDefinesData>): string;
    };
    uniforms: {
        _process(data: ShaderUniformData): string;
        build(data: ShaderUniformData | ShaderUniformData[] | Map<string, ShaderUniformData>): string;
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
