# Notes

This engine was developed on top of the V8 engine through severing it as an Electron app. So, it may not be computable with all browsers.

## Chunk Render Amount

The current suppourted max render amount is 225 chunks. The engine is desinged to run best with that max amount of chunks. 

It can do 20+ for more simple chunk meshes. If your world does not update often then the render distance can be higher as well.

#### Terms
- Voxel
  - Defined as a discrete element comprising a three-dimensional entity.
  - Used in the engine to create blocks, half-blocks, plants, and so on.
  - In the engine they are created as classes and registered with the shape manager. They must have certain functions.
- Voxel Substance
  - Each voxel must be defined as a type of substance. 
  - Solid and transparent voxels are rendered in the same mesh. 
  - Flora, Fluid, and Magma voxels have seperate meshes. 
- Voxel Substance Types
  - Solid
    - All solid voxels. By default they check collision. 
  - Transparent
    - Any voxel that has transparent texture. Part of the same mesh as solid voxels. 
  - Flora
    - Any plant like voxel. Shader effect for wind is applied.
  - Fluid
    - Renders as its own mesh. One mesh per world.
  - Magma
    - Like fluid but no shader effects. Gives off light and is solid.
- Voxel Pallet
  - A map of voxel state ids to numbers
  - Used to get the true voxel id for a world or chunk. 
- Voxel Shape
  - The actual base mesh shape of a voxel. 
  - In the engine they are created as classes and registered with the shape manager. They must have certain functions.
  - They are passed the current chunk meshe's data and populate it with the needed data based on the 
  chunk template.
- Chunk Template
  - Flat typed arrays that are generated from the chunk processor by going through the chunk data.
  - Represents things such as visible faces, texture uvs, shape ids and so on. 
  - Face data is stored as an 8 bit number. First 6 bits for each face.
    - If a voxel is not visible at all it is not sent. 
- Chunk
  - A section of the world. 
  - Default defined as a 16x16x128 area. 
  - Voxels area stored as a 3d array of **Voxel Data**: \[x\]\[z\]\[y\]


#### Chunk Data
The currently loaded chunks are stored in a object with the chunk's X,Z, and Y as they keys. Each chunk is an object with several properties. 

This is the current Type that defines the chunk data.
```ts
export declare type ChunkVoxels = any[][][];
export declare type ChunkData = {
    voxelPallet?: VoxelPallet;
    voxels: ChunkVoxels;
    maxMinHeight: number[];
    heightMap: number[][];
    isEmpty: boolean;
};
```
The height maps can be calculated beforehand. They help to reduce the amount of data that needs to be processed when a chunk is updated.

The main data it stores are the voxels which is stored as a 3D array. Each voxel is represented by an array of numbers. 

If the voxel pallet mode is set to per chunk the chunk will have its local pallet map. Which is a way to get the true id and state of the voxel. 

Metrics so far for total world data size is calculated to be at worst ~500 mb for 200 chunks of full blocks. I tested with different compression formats you can get it down to 50 - 300 kb.

#### Voxel DAta
 Each voxel contains an array of 3 numbers. 
  - Index 0 is its pallet id.
  - Index 1 is its shape state.
  - Index 2 is its current light value.

```ts
let dreamGrasss = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet(
  "dve:dreamgrass:defualt"
);
let dreamGrassVoxel = [dreamGrasss, 0, 0xFFFFFFFF];
```
 





