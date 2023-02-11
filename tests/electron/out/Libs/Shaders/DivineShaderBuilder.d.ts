import { DivineShader } from "./Classes/DivineShader.js";
import type { ShaderDefinesData, ShaderFunctionData, ShaderSnippetData, ShaderUniformData } from "./Types/ShaderData.types";
export declare const DivineShaderBuilder: {
    shaders: {
        _shaders: Map<string, DivineShader>;
        create(id: string): DivineShader;
    };
    functions: {
        _functions: Map<string, ShaderFunctionData<any>>;
        _functionSets: Map<string, string[]>;
        create(id: string, data: ShaderFunctionData<any>): void;
        _processFunctinos(id: string, data: ShaderFunctionData<any>, shader?: DivineShader | null): string;
        build(id: string, data?: ShaderFunctionData<any> | null, shader?: DivineShader | null): string;
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
        _snippets: Map<string, ShaderSnippetData<any>>;
        create(data: ShaderSnippetData<any>): void;
        override(id: string, data: ShaderSnippetData<any>): boolean;
        get(id: string, args?: any): string;
        _process(text: string, shader?: DivineShader): {
            newBody: string;
            foundSnippet: boolean;
        };
        build(text: string, shader?: DivineShader): string;
    };
};
