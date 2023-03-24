import { LocationData } from "voxelspaces";
export declare const Builder: {
    constructors: {
        constructors: import("../../Global/Util/UtilMap.js").UtilMap<string, import("../index.js").VoxelConstructor>;
        get(id: string): import("../index.js").VoxelConstructor;
        registerVoxel(voxel: import("../index.js").VoxelConstructor | import("../index.js").VoxelConstructor[]): void;
        defaults: {
            box: {
                simple(id: string, textures: import("../../index.js").ConstructorTextureData | Record<import("../../index.js").DirectionNames, import("../../index.js").ConstructorTextureData>): import("./Constructors/Voxel/Classes/Box/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                pillar(id: string, textures: import("./Constructors/Voxel/Classes/Box/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("./Constructors/Voxel/Classes/Box/PillarBox.constructor.js").PillarBoxVoxelConstructor;
            };
            stair: {
                simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("./Constructors/Voxel/Classes/Stair/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
            };
            panel: {
                simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("./Constructors/Voxel/Classes/Panel/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
            };
            crossedPanel: {
                simple(id: string, texture: import("../../index.js").ConstructorTextureData): import("./Constructors/Voxel/Classes/Panel/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
            };
            liquid: {
                simple(id: string, textures: [import("../../index.js").ConstructorTextureData, import("../../index.js").ConstructorTextureData]): import("./Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
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
    chunkProcessor: {
        relative: {
            x: number;
            y: number;
            z: number;
        };
        nLocation: LocationData;
        _process(doSecondCheck?: boolean): void;
        build(location: LocationData): void;
    };
    textureProcessor: {
        visitedMap: Record<"top" | "bottom" | "west" | "east", Record<string, boolean>>;
        _resetVisitedMap(): void;
        faceMap: Record<import("../../index.js").DirectionNames, number>;
        height: number;
        width: number;
        depth: number;
        getPosition: Record<"top" | "bottom" | "west" | "east", (face: {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        }) => [number, number, number]>;
        getDimensions: Record<"top" | "bottom" | "west" | "east", (face: {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        }) => [number, number]>;
        getTruePosition(face: {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        }): {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
        };
        processTexture(buildTask: import("../../Meta/Tasks/RenderTasks.types.js").BuildNodeMesh): readonly [import("../../Meta/Tasks/RenderTasks.types.js").SetNodeMesh, ArrayBuffer[]];
        _process(data: number[][], x: number, y: number): {
            w: boolean;
            e: boolean;
            t: boolean;
            b: boolean;
        };
        gettopFace(data: number[][], sx: number, y: number): {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        };
        getbottomFace(data: number[][], sx: number, y: number): {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        };
        getwestFace(data: number[][], x: number, sy: number): {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        };
        geteastFace(data: number[][], x: number, sy: number): {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        };
        getBlankFace(x: number, y: number, face: "top" | "bottom" | "west" | "east"): {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        };
        visit(x: number, y: number, face: "top" | "bottom" | "west" | "east"): void;
        visited(x: number, y: number, face: "top" | "bottom" | "west" | "east"): boolean;
        calculateUV(face: {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        }): [number, number, number, number];
        buildFace(face: {
            xStart: number;
            xEnd: number;
            yStart: number;
            yEnd: number;
            type: "top" | "bottom" | "west" | "east";
        }): void;
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
