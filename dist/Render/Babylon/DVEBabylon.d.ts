import type { BoundingBox, BoundingInfo, Color3, Effect, Engine, Mesh, RawTexture2DArray, Scene, ShaderMaterial, Texture, TransformNode, UniversalCamera, Vector3, Vector4, VertexData } from "babylonjs";
export declare type DVEBabylonSystem = {
    Scene: typeof Scene;
    Engine: typeof Engine;
    RawTexture2DArray: typeof RawTexture2DArray;
    Texture: typeof Texture;
    Vector3: typeof Vector3;
    Vector4: typeof Vector4;
    UniversalCamera: typeof UniversalCamera;
    TransformNode: typeof TransformNode;
    ShaderMaterial: typeof ShaderMaterial;
    Mesh: typeof Mesh;
    BoundingBox: typeof BoundingBox;
    BoundingInfo: typeof BoundingInfo;
    VertexData: typeof VertexData;
    Effect: typeof Effect;
    Color3: typeof Color3;
};
export declare const DVEBabylon: {
    system: DVEBabylonSystem;
    $INIT(system: DVEBabylonSystem): void;
};
