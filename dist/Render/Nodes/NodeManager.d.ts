export declare const NodeManager: {
    shaders: {
        shaders: import("../../Global/Util/UtilMap.js").UtilMap<string, import("divine-shaders").DivineShader>;
        create(shaders: import("divine-shaders").DivineShader[]): void;
        get(id: string): import("divine-shaders").DivineShader | undefined;
    };
    meshes: {
        meshes: import("../../Global/Util/UtilMap.js").UtilMap<string, import("./Meshes/NodeMesh.js").NodeMesh>;
        add(meshes: import("./types/RenderNode.types.js").NodeMeshData[]): void;
        create(id: string, data: import("../../Meta/Tasks/RenderTasks.types.js").SetNodeMesh): false | import("@babylonjs/core").Mesh;
        get(id: string): import("./Meshes/NodeMesh.js").NodeMesh | undefined;
    };
    materials: {
        materials: import("../../Global/Util/UtilMap.js").UtilMap<string, import("./Materials/NodeMaterial.js").NodeMaterial>;
        get(id: string): import("./Materials/NodeMaterial.js").NodeMaterial | null;
        create(materials: import("./types/RenderNode.types.js").NodeMaterialData[]): void;
        updateFogOptions(data: import("@babylonjs/core").Vector4): void;
        setSunLevel(level: number): void;
        setBaseLevel(level: number): void;
        setOption(id: string, value: boolean): void;
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
    $INIT(): void;
};
