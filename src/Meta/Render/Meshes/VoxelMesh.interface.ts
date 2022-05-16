

export interface VoxelMeshInterface {
    rebuildMeshGeometory(
        chunkMesh: BABYLON.Mesh,
        positions: Float32Array,
        indicies: Int32Array,
        aoColors: Float32Array,
        rgbLightColors: Float32Array,
        sunLightColors : Float32Array,
        colors : Float32Array,
        uvs: Float32Array
       ) : void;

       createTemplateMesh(scene: BABYLON.Scene) : BABYLON.Mesh;

       
       createMeshGeometory(
        mesh: BABYLON.Mesh,
        positions: Float32Array,
        indicies: Int32Array,
        aoColors: Float32Array,
        rgbLightColors: Float32Array,
        sunLightColors : Float32Array,
        colors : Float32Array,
        uvs: Float32Array
       ) : void;
}