import { Scene } from "@babylonjs/core";
export declare const NodeManager: {
    shaders: {
        shaders: import("../../Global/Util/UtilMap.js").UtilMap<string, import("divine-shaders").DivineShader>;
        create(shaders: import("divine-shaders").DivineShader[]): void;
        get(id: string): import("divine-shaders").DivineShader | undefined;
        getBulder(): {
            shaders: {
                _shaders: Map<string, import("divine-shaders").DivineShader>;
                create(id: string): import("divine-shaders").DivineShader;
            };
            functions: {
                _functions: Map<string, import("divine-shaders").ShaderFunctionData<any>>;
                _functionSets: Map<string, string[]>;
                create(id: string, data: import("divine-shaders").ShaderFunctionData<any>): void;
                _processFunctinos(id: string, data: import("divine-shaders").ShaderFunctionData<any>, shader?: import("divine-shaders").DivineShader | null | undefined): string;
                build(id: string, data?: import("divine-shaders").ShaderFunctionData<any> | null | undefined, shader?: import("divine-shaders").DivineShader | null | undefined): string;
            };
            define: {
                _process(data: import("divine-shaders").ShaderDefinesData): string;
                build(data: import("divine-shaders").ShaderDefinesData | import("divine-shaders").ShaderDefinesData[] | Map<string, import("divine-shaders").ShaderDefinesData>): string;
            };
            uniforms: {
                _process(data: import("divine-shaders").ShaderUniformData): string;
                build(data: import("divine-shaders").ShaderUniformData | import("divine-shaders").ShaderUniformData[] | Map<string, import("divine-shaders").ShaderUniformData>): string;
            };
            snippets: {
                _snippets: Map<string, import("divine-shaders").ShaderSnippetData<any>>;
                create(data: import("divine-shaders").ShaderSnippetData<any>): void;
                override(id: string, data: import("divine-shaders").ShaderSnippetData<any>): boolean;
                get(id: string, args?: any): string;
                _process(text: string, shader?: import("divine-shaders").DivineShader | undefined): {
                    newBody: string;
                    foundSnippet: boolean;
                };
                build(text: string, shader?: import("divine-shaders").DivineShader | undefined): string;
            };
        };
    };
    meshes: {
        meshes: import("../../Global/Util/UtilMap.js").UtilMap<string, import("./Meshes/NodeMesh.js").NodeMesh>;
        add(meshes: import("./types/RenderNode.types.js").NodeMeshData[]): void;
        create(id: string, data: import("../../Meta/Tasks/RenderTasks.types.js").SetNodeMesh): false | import("@babylonjs/core").Mesh;
        get(id: string): import("./Meshes/NodeMesh.js").NodeMesh | undefined;
    };
    materials: {
        materials: import("../../Global/Util/UtilMap.js").UtilMap<string, import("./Materials/NodeMaterial.js").NodeMaterial>;
        fogOptions: import("../../Meta/Render/Render/Render.options.types.js").RenderFogOptions;
        fogData: import("@babylonjs/core").Vector4;
        unifrosm: {
            lightGradient: number[];
        };
        init(): void;
        get(id: string): import("./Materials/NodeMaterial.js").NodeMaterial | null;
        create(materials: import("./types/RenderNode.types.js").NodeMaterialData[]): void;
        _updateFogData(data: import("@babylonjs/core").Vector4): void;
        setSunLevel(level: number): void;
        setBaseLevel(level: number): void;
        setOption(id: string, value: boolean): void;
        updateFogOptions(options: import("../../index.js").RecursivePartial<import("../../Meta/Render/Render/Render.options.types.js").RenderFogOptions>): void;
    };
    textures: {
        defaultTexturePath: string;
        textureTypes: Map<string, import("./Textures/TextureType.js").TextureType>;
        uvMap: import("../../index.js").TextureTypeUVMap;
        getTextureIndex(data: import("../../index.js").ConstructorTextureData, overlay?: boolean): number;
        _ready: boolean;
        isReady(): boolean;
        $INIT(): Promise<void>;
        $START_ANIMATIONS(): void;
        generateTextureUVMap(): import("../../index.js").TextureTypeUVMap;
        defineDefaultTexturePath(path: string): void;
        getTextureType(id: string): false | import("./Textures/TextureType.js").TextureType;
        addTextureType(id: string): import("./Textures/TextureType.js").TextureType;
        clearTextureData(): void;
        registerTexture(textureData: import("../../index.js").TextureData | import("../../index.js").TextureData[]): void;
        createRawDataMap(): Promise<Map<string, Uint8ClampedArray>>;
    };
    _scene: Scene;
    init(): void;
};
