import { LocationData } from "voxelspaces";
export declare const Builder: {
    constructors: {
        constructors: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../index.js").VoxelConstructor>;
        get(id: string): import("../index.js").VoxelConstructor;
        registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
        defaults: {
            box: {
                simple(id: string, textures: import("../../index.js").ConstructorTextureData | Record<import("../../index.js").DirectionNames, import("../../index.js").ConstructorTextureData>): import("./Constructors/Classes/Box/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                pillar(id: string, textures: import("./Constructors/Classes/Box/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("./Constructors/Classes/Box/PillarBox.constructor.js").PillarBoxVoxelConstructor;
            };
            stair: {
                simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("./Constructors/Classes/Stair/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
            };
            panel: {
                simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("./Constructors/Classes/Panel/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
            };
            crossedPanel: {
                simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("./Constructors/Classes/Panel/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
            };
            liquid: {
                simple(id: string, textures: [import("../../index.js").ConstructorTextureData, import("../../index.js").ConstructorTextureData]): import("./Constructors/Classes/Liquid/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
            };
        };
    };
    textureManager: {
        textureDataHasBeenSet: boolean;
        data: import("../../index.js").TextureTypeUVMap;
        getTextureUV(data: import("../../index.js").ConstructorTextureData, overlay?: boolean): number;
        setUVTextureMap(data: import("../../index.js").TextureTypeUVMap): void;
        releaseTextureData(): void;
        isReady(): boolean;
    };
    processor: {
        relative: {
            x: number;
            y: number;
            z: number;
        };
        nLocation: LocationData;
        _process(doSecondCheck?: boolean): void;
        build(location: LocationData): void;
    };
    overrides: {
        overrides: Record<import("./Types/Override.types.js").OverrideTypes, Map<string, Map<string, (data: import("./Types/Override.types.js").FaceDataOverride) => boolean>>>;
        registerOverride(type: import("./Types/Override.types.js").OverrideTypes, subjectId: string, neighborShapeId: string, run: (data: import("./Types/Override.types.js").FaceDataOverride) => boolean): void;
        hasOverride(type: import("./Types/Override.types.js").OverrideTypes, shapeId: string, neighborShapeId: string): boolean;
        runOverride(type: import("./Types/Override.types.js").OverrideTypes, firstId: string, secondOverride: string, data: import("./Types/Override.types.js").FaceDataOverride): boolean;
    };
    renderedSubstances: {
        meshers: import("../../Global/Util/UtilMap.js").UtilMap<string, import("./Tools/VoxelMesherDataTool.js").VoxelMesherDataTool>;
    };
    $INIT(): void;
    buildChunk(location: LocationData, LOD?: number): boolean;
};
