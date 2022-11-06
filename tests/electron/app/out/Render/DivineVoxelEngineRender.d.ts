/// <reference types="babylonjs" />
import type { DVERInitData } from "Meta/Render/DVER";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
export declare const DVER: {
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getEnviorment(): "node" | "browser";
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
    };
    worldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    nexusComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        $INIT(): void;
    };
    dataComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        $INIT(): void;
    };
    fxComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        $INIT(): void;
    };
    richWorldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        $INIT(): void;
    };
    constructorCommManager: import("../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
        $INIT(): void;
        createConstructors(path: string, numBuilders?: number): void;
        setConstructors(constructors: Worker[]): void;
        syncSettings(data: any): void;
    };
    settings: {
        settings: {
            nexus: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            data: {
                enabled: boolean;
                autoSyncChunks: boolean;
            };
            fx: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            server: {
                enabled: boolean;
            };
            richWorld: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            textureOptions: {
                animationTime: number;
                width: number;
                height: number;
            };
            updating: {
                autoRebuild: boolean;
            };
            world: {
                maxX: number;
                minX: number;
                maxZ: number;
                minZ: number;
                maxY: number;
                minY: number;
            };
            regions: {
                regionXPow2: number;
                regionYPow2: number;
                regionZPow2: number;
            };
            chunks: {
                autoHeightMap: boolean;
                chunkXPow2: number;
                chunkYPow2: number;
                chunkZPow2: number;
            };
            voxels: {
                doColors: boolean;
            };
            flow: {
                enable: boolean;
            };
            lighting: {
                doAO: boolean;
                doSunLight: boolean;
                doRGBLight: boolean;
                autoRGBLight: boolean;
                autoSunLight: boolean;
            };
            meshes: {
                clearChachedGeometry: boolean;
                checkMagmaCollisions: boolean;
                checkFluidCollisions: boolean;
                checkFloraCollisions: boolean;
                checkSolidCollisions: boolean;
                seralize: boolean;
                pickable: boolean;
            };
            materials: {
                mode: string;
                doAO: boolean;
                doSunLight: boolean;
                doRGBLight: boolean;
                disableFloraShaderEffects: boolean;
                disableFluidShaderEffects: boolean;
            };
        };
        getSettings(): EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        __syncWithObjects(): void;
        syncWithWorldBounds(worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            _hashMask(n: number): number;
            hash(x: number, y: number, z: number): number;
            chunkXPow2: number;
            chunkYPow2: number;
            chunkZPow2: number;
            chunkXSize: number;
            chunkYSize: number;
            chunkZSize: number;
            chunkTotalVoxels: number;
            chunkArea: number;
            regionColumnWidth: number;
            regionXPow2: number;
            regionYPow2: number;
            regionZPow2: number;
            regionXSize: number;
            regionYSize: number;
            regionZSize: number;
            __regionPosition: {
                x: number;
                y: number;
                z: number;
            };
            __worldColumnPosition: {
                x: number;
                z: number;
                y: number;
            };
            __chunkPosition: {
                x: number;
                y: number;
                z: number;
            };
            __voxelPosition: {
                x: number;
                y: number;
                z: number;
            };
            __columnPosition: {
                x: number;
                z: number;
                y: number;
            };
            syncBoundsWithArrays(): void;
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
            isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
            isPositonInBounds(x: number, y: number, z: number): boolean;
            setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
            setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
            getRegionPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getChunkPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getRichPositionKey(x: number, y: number, z: number): string;
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            _columnIndexPosition: {
                x: number;
                y: number;
                z: number;
            };
            getColumnIndex(x: number, z: number, y: number): number;
            getChunkColumnIndex(y: number): number;
            getColumnKey(x: number, z: number, y?: number): string;
            getColumnPosition(x: number, z: number, y?: number): {
                x: number;
                z: number;
                y: number;
            };
        }): void;
        getSettingsCopy(): any;
        syncChunkInRichWorldThread(): boolean;
        richDataEnabled(): boolean;
        syncChunkInFXThread(): boolean;
        syncChunkInDataThread(): boolean;
        syncChunksInNexusThread(): boolean;
        doSunPropagation(): boolean;
        doRGBPropagation(): boolean;
        doLight(): boolean;
        doFlow(): boolean;
    };
    renderManager: {
        fogOptions: import("../Meta/Render/Render/Render.options.types.js").RenderFogOptions;
        fogData: BABYLON.Vector4;
        effectOptions: import("../Meta/Render/Render/Render.options.types.js").RenderEffectsOptions;
        shaderBuilder: {
            buildFloraVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
            buildFluidVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
            buildSolidVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
            buildItemVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
            buildMagmaVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
            buildSolidFragmentShader(): string;
            buildItemFragmentShader(): string;
            buildFluidFragmentShader(): string;
            buildFloraFragmentShader(): string;
            buildMagmaFragmentShader(): string;
            getDefaultVertexShader(voxelSubstance: import("../Meta/index.js").VoxelSubstanceType, uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, ovlerayAnimationFunction?: string): string;
            getDefaultFragmentShader(voxelSubstance: import("../Meta/index.js").VoxelSubstanceType): string;
            getSkyBoxVertexShader(): string;
            getSkyBoxFragmentShader(): string;
        };
        textureCreator: {
            context: CanvasRenderingContext2D | null;
            imgWidth: number;
            imgHeight: number;
            defineTextureDimensions(width: number, height: number): void;
            setUpImageCreation(): void;
            createMaterialTexture(name: string, scene: BABYLON.Scene, images: string[], width?: number, height?: number): Promise<BABYLON.RawTexture2DArray>;
            _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
            _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
            getTextureBuffer(imgPath: string, width?: number, height?: number): Promise<Uint8ClampedArray>;
        };
        animationManager: {
            animatedMaterials: Record<import("../Meta/index.js").VoxelSubstanceType | "Item", BABYLON.ShaderMaterial>;
            animCount: number;
            animations: {
                uniformShaderId: string;
                keys: number[];
                currentFrame: number;
                currentCount: number;
                keyCounts: number[];
                substance: import("../Meta/index.js").VoxelSubstanceType | "Item";
            }[];
            registerAnimations(voxelSubstanceType: import("../Meta/index.js").VoxelSubstanceType | "Item", animations: number[][], animationTimes: number[][], overlay?: boolean): {
                uniforms: string[];
                uniformRegisterCode: string;
                animationFunctionCode: string;
            };
            registerMaterial(voxelSubstanceType: import("../Meta/index.js").VoxelSubstanceType | "Item", material: BABYLON.ShaderMaterial): void;
            startAnimations(): void;
        };
        solidMaterial: {
            material: BABYLON.ShaderMaterial | null;
            time: number;
            getMaterial(): BABYLON.ShaderMaterial | null;
            updateFogOptions(data: BABYLON.Vector4): void;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
            overrideMaterial(material: any): void;
            runEffects(): void;
        };
        floraMaterial: {
            material: BABYLON.ShaderMaterial | null;
            doEffects: boolean;
            time: number;
            getMaterial(): BABYLON.ShaderMaterial | null;
            updateFogOptions(data: BABYLON.Vector4): void;
            updateEffects(doEffects: boolean): void;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
            runEffects(): void;
        };
        fluidMaterial: {
            material: BABYLON.ShaderMaterial | null;
            doEffects: boolean;
            time: number;
            getMaterial(): BABYLON.ShaderMaterial | null;
            updateFogOptions(data: BABYLON.Vector4): void;
            updateEffects(doEffects: boolean): void;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
            runEffects(): void;
        };
        magmaMaterial: {
            material: BABYLON.ShaderMaterial | null;
            getMaterial(): BABYLON.ShaderMaterial | null;
            time: number;
            updateFogOptions(data: BABYLON.Vector4): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
            runEffects(): void;
        };
        itemMaterial: {
            material: BABYLON.ShaderMaterial | null;
            context: CanvasRenderingContext2D | null;
            time: number;
            updateFogOptions(data: BABYLON.Vector4): void;
            getMaterial(): BABYLON.ShaderMaterial | null;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
            overrideMaterial(material: any): void;
            runEffects(): void;
        };
        solidStandardMaterial: {
            material: BABYLON.StandardMaterial | null;
            plugin: import("./Render/Materials/Solid/Standard/SolidMaterial.bjsmp.js").SolidMaterialPlugin | null;
            $INIT(texture: BABYLON.RawTexture2DArray, scnee: BABYLON.Scene): void;
            getMaterial(): BABYLON.StandardMaterial;
        };
        fluidStandardMaterial: {
            material: BABYLON.StandardMaterial | null;
            reflectionprobe: BABYLON.RenderTargetTexture | null;
            plugin: import("./Render/Materials/Fluid/Standard/FluidMaterial.bjsmp.js").FluidMaterialPlugin | null;
            $INIT(texture: BABYLON.RawTexture2DArray, scene: BABYLON.Scene): void;
            getMaterial(): BABYLON.StandardMaterial;
            addToRenderList(mesh: BABYLON.Mesh): void;
        };
        skyBoxMaterial: {
            material: BABYLON.ShaderMaterial | null;
            context: CanvasRenderingContext2D | null;
            time: number;
            getMaterial(): BABYLON.ShaderMaterial | null;
            updateFogOptions(data: BABYLON.Vector4): void;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(scene: BABYLON.Scene): BABYLON.ShaderMaterial;
            overrideMaterial(material: any): void;
            runEffects(): void;
        };
        solidMesh: import("../Meta/index.js").VoxelMeshInterface;
        floraMesh: import("../Meta/index.js").VoxelMeshInterface;
        fluidMesh: import("../Meta/index.js").VoxelMeshInterface;
        magmaMesh: import("../Meta/index.js").VoxelMeshInterface;
        itemMesh: {
            pickable: boolean;
            checkCollisions: boolean;
            seralize: boolean;
            clearCachedGeometry: boolean;
            createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
            syncSettings(settings: EngineSettingsData): void;
            _applyVertexData(mesh: BABYLON.Mesh, data: import("../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): void;
            rebuildMeshGeometory(mesh: BABYLON.Mesh, data: import("../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): Promise<BABYLON.Mesh>;
            createMesh(x: number, y: number, z: number, data: import("../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): Promise<BABYLON.Mesh>;
        };
        scene: BABYLON.Scene | null;
        reStart(): void;
        setScene(scene: BABYLON.Scene): void;
        updateFogOptions(options: import("../Meta/Util.types.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").RenderFogOptions>): void;
        _setFogData(): void;
        $INIT(): void;
        updateShaderEffectOptions(options: import("../Meta/Util.types.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").RenderEffectsOptions>): void;
        syncSettings(settings: EngineSettingsData): void;
        getScene(): BABYLON.Scene | null;
        createSkyBoxMaterial(scene?: BABYLON.Scene | undefined): BABYLON.ShaderMaterial | null;
        setSunLevel(level: number): void;
        setBaseLevel(level: number): void;
    };
    meshManager: {
        scene: BABYLON.Scene | null;
        runningUpdate: boolean;
        meshes: Record<import("../Meta/index.js").VoxelSubstanceType, Record<number, Record<string, BABYLON.Mesh>>>;
        entityMesh: {
            pickable: boolean;
            checkCollisions: boolean;
            seralize: boolean;
            clearCachedGeometry: boolean;
            createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
            syncSettings(settings: EngineSettingsData): void;
            _applyVertexData(mesh: BABYLON.Mesh, data: import("../Meta/index.js").MeshSetData): void;
            rebuildMeshGeometory(mesh: BABYLON.Mesh, data: import("../Meta/index.js").MeshSetData): Promise<BABYLON.Mesh>;
            createMesh(x: number, y: number, z: number, data: import("../Meta/index.js").MeshSetData): Promise<BABYLON.Mesh>;
        };
        itemMesh: {
            pickable: boolean;
            checkCollisions: boolean;
            seralize: boolean;
            clearCachedGeometry: boolean;
            createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
            syncSettings(settings: EngineSettingsData): void;
            _applyVertexData(mesh: BABYLON.Mesh, data: import("../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): void;
            rebuildMeshGeometory(mesh: BABYLON.Mesh, data: import("../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): Promise<BABYLON.Mesh>;
            createMesh(x: number, y: number, z: number, data: import("../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): Promise<BABYLON.Mesh>;
        };
        meshMakers: Record<import("../Meta/index.js").VoxelSubstanceType, import("../Meta/index.js").VoxelMeshInterface>;
        $INIT(): void;
        setScene(scene: BABYLON.Scene): void;
        reStart(): void;
        removeChunkMesh(dimesnion: number, type: import("../Meta/index.js").VoxelSubstanceType, chunkKey: string): void;
        handleItemUpdate(x: number, y: number, z: number, data: any): void;
        handleEntityUpdate(x: number, y: number, z: number, data: any): void;
        handleChunkUpdate(dimesnion: number, type: import("../Meta/index.js").VoxelSubstanceType, chunkKey: string, data: import("../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask): void;
        requestChunkBeRemoved(dimesnion: number, chunkKey: string): void;
        _updateMesh(dimesnion: number, type: import("../Meta/index.js").VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
        _buildNewMesh(dimesnion: number, type: import("../Meta/index.js").VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
    };
    textureManager: {
        defaultTexturePath: string;
        processedTextureData: import("../Meta/index.js").TextureProccesedData;
        overlayProcessedTextureData: import("../Meta/index.js").TextureProccesedData;
        textureData: import("../Meta/index.js").TextureData;
        textureExtension: Record<import("../Meta/index.js").TextureTypes, string>;
        textures: Record<import("../Meta/index.js").TextureTypes, import("../Meta/index.js").TextureData[]>;
        uvTextureMap: Record<import("../Meta/index.js").TextureTypes, Record<string, number>>;
        overylayTextures: Record<import("../Meta/index.js").TextureTypes, import("../Meta/index.js").TextureData[]>;
        overlayUVTextureMap: Record<import("../Meta/index.js").TextureTypes, Record<string, number>>;
        normalMapTextures: Record<import("../Meta/index.js").TextureTypes, import("../Meta/index.js").TextureData[]>;
        noramlMapUVTexturesMap: Record<import("../Meta/index.js").TextureTypes, Record<string, number>>;
        textureTypes: import("../Meta/index.js").TextureTypes[];
        _processVariations(texture: import("../Meta/index.js").TextureData, texturePaths: string[], animations: Record<import("../Meta/index.js").TextureTypes, number[][]>, textureAnimatioTimes: Record<import("../Meta/index.js").TextureTypes, number[][]>, extension: string, count: number, path: string, textureType: import("../Meta/index.js").TextureTypes, overlay?: boolean, normalMap?: boolean): number;
        generateTexturesData(overlay?: boolean, normalMap?: boolean): void;
        defineDefaultTexturePath(path: string): void;
        defineDefaultTextureExtension(textureType: import("../Meta/index.js").TextureTypes, ext: string): void;
        getTextureUV(textureType: import("../Meta/index.js").TextureTypes, textureId: string, varation?: string | undefined): number;
        registerTexture(textureType: import("../Meta/index.js").TextureTypes, textureData: import("../Meta/index.js").TextureData): void;
        releaseTextureData(): void;
    };
    renderedEntites: {
        scene: BABYLON.Scene | null;
        entityTemplate: Record<string, {
            template: import("../Meta/index.js").RenderedEntity;
            data: import("../Meta/index.js").RenderedEntityData;
        }>;
        loaedEntities: Record<import("../Meta/index.js").EntityTypes, Record<string, import("../Meta/index.js").RenderedEntityInterface>>;
        setScene(scene: BABYLON.Scene): void;
        registerEntity(id: string, entityData: import("../Meta/index.js").RenderedEntityData, renderedEntity: import("../Meta/index.js").RenderedEntity): void;
        spawnEntity(entityId: string, identiferId: string, positionSBA: SharedArrayBuffer, statesSBA: SharedArrayBuffer): void;
        deSpawnEntity(entityId: string, identiferId: string): false | undefined;
    };
    tasks: {
        setChunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask>;
        removeChunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks>;
    };
    _handleOptions(): void;
    syncSettingsWithWorkers(data: EngineSettingsData): void;
    reStart(data: EngineSettingsData): Promise<void>;
    $INIT(initData: DVERInitData): Promise<void>;
    $SCENEINIT(data: {
        scene: BABYLON.Scene;
    }): Promise<void>;
    __createWorker(path: string): Worker;
};
export declare type DivineVoxelEngineRender = typeof DVER;
