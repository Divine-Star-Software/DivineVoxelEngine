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
    };
    materials: {
        materials: import("../../Global/Util/UtilMap.js").UtilMap<string, import("./Materials/NodeMaterial.js").NodeMaterial>;
        get(id: string): import("./Materials/NodeMaterial.js").NodeMaterial | null;
        create(materials: import("./types/RenderNode.types.js").NodeMaterialData[]): void;
        updateFogOptions(data: import("@babylonjs/core").Vector4): void;
        setSunLevel(level: number): void;
        setBaseLevel(level: number): void;
    };
    $INIT(): void;
};
