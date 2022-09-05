/// <reference types="babylonjs" />
import type { DVERInitData } from "Meta/Render/DVER";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export declare const DVER: {
    worldBounds: {
        __maxChunkYSize: number;
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
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
        getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
        getWorldColumnKey(x: number, z: number): string;
        getWorldColumnPosition(x: number, z: number): {
            x: number;
            z: number;
        };
    };
    worldComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
    nexusComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        $INIT(): void;
    };
    dataComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        $INIT(): void;
    };
    fxComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        $INIT(): void;
    };
    richWorldComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        $INIT(): void;
    };
    constructorCommManager: {
        count: number;
        constructors: import("../Meta/Comms/InterComm.types.js").InterCommInterface[];
        $INIT(): void;
        createConstructors(path: string, numBuilders?: number): void;
        setConstructors(constructors: Worker[]): void;
        syncSettings(data: any): void;
    };
    settings: {
        context: "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "DVEFX" | "DVERW" | "MatrixLoadedThread";
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
        setContext(context: "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "DVEFX" | "DVERW" | "MatrixLoadedThread"): void;
        getSettings(): EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        syncWithWorldBounds(worldBounds: {
            __maxChunkYSize: number;
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            chunkXPow2: number;
            chunkYPow2: number;
            chunkZPow2: number;
            chunkXSize: number;
            chunkYSize: number;
            chunkZSize: number;
            chunkTotalVoxels: number;
            chunkArea: number;
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
            getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
            getWorldColumnKey(x: number, z: number): string;
            getWorldColumnPosition(x: number, z: number): {
                x: number;
                z: number;
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
    };
    renderManager: {
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
            getMaterial(): BABYLON.ShaderMaterial | null;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
            overrideMaterial(material: any): void;
        };
        floraMaterial: {
            material: BABYLON.ShaderMaterial | null;
            getMaterial(): BABYLON.ShaderMaterial | null;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        };
        fluidMaterial: {
            material: BABYLON.ShaderMaterial | null;
            getMaterial(): BABYLON.ShaderMaterial | null;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        };
        magmaMaterial: {
            material: BABYLON.ShaderMaterial | null;
            getMaterial(): BABYLON.ShaderMaterial | null;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        };
        itemMaterial: {
            material: BABYLON.ShaderMaterial | null;
            context: CanvasRenderingContext2D | null;
            getMaterial(): BABYLON.ShaderMaterial | null;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(data: import("../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
            overrideMaterial(material: any): void;
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
            getMaterial(): BABYLON.ShaderMaterial | null;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(scene: BABYLON.Scene): BABYLON.ShaderMaterial;
            overrideMaterial(material: any): void;
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
        syncSettings(settings: EngineSettingsData): void;
        getScene(): BABYLON.Scene | null;
        createSkyBoxMaterial(scene?: BABYLON.Scene | undefined): BABYLON.ShaderMaterial | null;
        setSunLevel(level: number): void;
        setBaseLevel(level: number): void;
    };
    meshManager: {
        scene: BABYLON.Scene | null;
        runningUpdate: boolean;
        meshes: Record<import("../Meta/index.js").VoxelSubstanceType, Record<string, BABYLON.Mesh>>;
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
        removeChunkMesh(type: import("../Meta/index.js").VoxelSubstanceType, chunkKey: string): void;
        handleItemUpdate(x: number, y: number, z: number, data: any): void;
        handleEntityUpdate(x: number, y: number, z: number, data: any): void;
        handleChunkUpdate(type: import("../Meta/index.js").VoxelSubstanceType, chunkKey: string, data: any): void;
        requestChunkBeRemoved(chunkKey: string): void;
        _updateMesh(type: import("../Meta/index.js").VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
        _buildNewMesh(type: import("../Meta/index.js").VoxelSubstanceType, chunkKey: string, data: any): Promise<void>;
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
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getWorkerPort: (environment: "node" | "browser") => Promise<any>;
        getEnviorment(): "node" | "browser";
        getChunkReader(): {
            chunkByteSize: number;
            indexSizes: {
                header: number;
                states: number;
                position: number;
                minMax: number;
                heightMap: number;
                voxelData: number;
                voxelStateData: number;
            };
            indexes: {
                header: number;
                states: number;
                position: number;
                minMax: number;
                heightMap: number;
                voxelData: number;
                voxelStateData: number;
            };
            byteLengths: {
                heightMapData: number;
                voxelData: number;
                voxelStateData: number;
            };
            syncSettings(): void;
            _getVoxelDataIndex(x: number, y: number, z: number): number;
            _getVoxelStateDataIndex(x: number, y: number, z: number): number;
            _chunkPositon: {
                x: number;
                y: number;
                z: number;
            };
            getChunkPosition(chunk: DataView): {
                x: number;
                y: number;
                z: number;
            };
            setChunkPosition(chunk: DataView, position: import("../Meta/Util.types.js").Position3Matrix): void;
            getVoxelChunkDataIndex(x: number, y: number, z: number, secondary?: boolean): number;
            hmBounds: {
                x: number;
                y: number;
                z: number;
            };
            _getHeightMapIndex(x: number, y: number, z: number): number;
            getHeightMapIndex(x: number, y: number, z: number): number;
            getVoxelData(chunkData: DataView, x: number, y: number, z: number, secondary?: boolean): number;
            setVoxelData(chunkData: DataView, x: number, y: number, z: number, data: number, secondary?: boolean): void;
            getVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
            setVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): void;
            getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
            setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
            getChunkMinData(chunkData: DataView): number;
            setChunkMinData(chunkData: DataView, data: number): void;
            getChunkMaxData(chunkData: DataView): number;
            setChunkMaxData(chunkData: DataView, data: number): void;
        };
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        getEntityFlat3dArray(): {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
        };
        getDataEncoder(): {
            setData(raw: number, value: number, offset: number, numBits: number): number;
            getData(raw: number, offset: number, numBits: number): number;
        };
        getMeshFaceDataByte(): {
            setAnimationType(animationType: number, rawData: number): number;
            getAnimationType(rawData: number): number;
        };
        getFlat3DArray(): {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
        };
        getFaceByte(): {
            _rotationMap: Record<import("../Meta/Constructor/Mesher.types.js").Rotations, number>;
            _rotationReverseMap: Record<number, import("../Meta/Constructor/Mesher.types.js").Rotations>;
            _setFaceTextureState: Record<import("../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceTextureState: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _setFaceRotateState: Record<import("../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceRotateState: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _markExposedFace: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _checkExposedFace: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => boolean>;
            markFaceAsExposed(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): number;
            isFaceExposed(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): boolean;
            setFaceRotateState(direction: import("../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
            getFaceRotateState(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): number;
            setFaceTextureState(direction: import("../Meta/Util.types.js").DirectionNames, rotation: import("../Meta/Constructor/Mesher.types.js").Rotations, rawData: number): number;
            getFaceTextureState(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): import("../Meta/Constructor/Mesher.types.js").Rotations;
        };
        getHeightMapArray(): {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
        };
        getHeightByte(): {
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            initalizeChunk(chunkData: DataView): void;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, chunkData: DataView): void;
            getChunkMin(chunkData: DataView): number;
            getChunkMax(chunkData: DataView): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
            getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
            isSubstanceExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
            markSubstanceAsExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            markSubstanceAsNotExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            setMinYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMinYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            setMaxYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMaxYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
        };
        getVoxelByte(): {
            setId(id: number, value: number): number;
            getId(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            decodeLevelFromVoxelData(stateData: number): number;
            encodeLevelIntoVoxelData(stateData: number, level: number): number;
            decodeLevelStateFromVoxelData(stateData: number): number;
            encodeLevelStateIntoVoxelData(stateData: number, levelState: number): number;
            getShapeState(voxelData: number): number;
            setShapeState(voxelData: number, shapeState: number): number;
        };
        getLightByte(): {
            SRS: number;
            _lightValues: number[];
            getS(value: number): number;
            getR(value: number): number;
            getG(value: number): number;
            getB(value: number): number;
            setS(value: number, sl: number): number;
            setR(value: number, sl: number): number;
            setG(value: number, sl: number): number;
            setB(value: number, sl: number): number;
            removeS(sl: number): number;
            hasRGBLight(sl: number): boolean;
            getRGB(sl: number): number;
            setRGB(value: number, sl: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): number[];
            isLessThanForRGBRemove(n1: number, n2: number): boolean;
            isLessThanForRGBAdd(n1: number, n2: number): boolean;
            isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
            getMinusOneForRGB(sl: number, nl: number): number;
            removeRGBLight(sl: number): number;
            getFullSunLight(sl: number): number;
            isLessThanForSunAdd(n1: number, n2: number): boolean;
            isLessThanForSunAddDown(n1: number, n2: number): boolean;
            isLessThanForSunAddUp(n1: number, n2: number): boolean;
            getSunLightForUnderVoxel(sl: number, nl: number): number;
            getMinusOneForSun(sl: number, nl: number): number;
            isLessThanForSunRemove(n1: number, sl: number): boolean;
            isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
            sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
            removeSunLight(sl: number): number;
        };
        getWorldBounds(): {
            __maxChunkYSize: number;
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            chunkXPow2: number;
            chunkYPow2: number;
            chunkZPow2: number;
            chunkXSize: number;
            chunkYSize: number;
            chunkZSize: number;
            chunkTotalVoxels: number;
            chunkArea: number;
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
            getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
            getWorldColumnKey(x: number, z: number): string;
            getWorldColumnPosition(x: number, z: number): {
                x: number;
                z: number;
            };
        };
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
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
