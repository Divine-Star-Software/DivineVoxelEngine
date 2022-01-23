# Notes

This engine was developed on top of the V8 engine through severing it as an Electron app. So, it may not be computable with all browsers.

## Can I use this for my game project?

Yes of course! You are free to download the code and do whatever you want with it. 

But please don't just copy the engine and said you wrote it. A lot of work went into this that is not just my own. Without the help of many people online this would not be possible. I tried to give credit and sight as many sources as I could when developing this engine. We as developers stand on the shoulder of giants and I think it is important to acknowledge that.

The only other rule would be don't take the logo cause that is a copyrighted logo from my company Divine Star. 

If you would like to provide a credit for the voxel engine and use the logo that is fine. 

## Why did I make this?

Well, as of this writing I only first played Minecraft in 2020. Before then I was too busy with college and my own projects. I then became very curious
about how it all works. I also love pixel art, comptuer science, and programming. I chose to write it in TypeScript because it is my favorite language. I knew with web workers that JavaScript could pull it off. 

I also saw that a voxel engine could be used to make basically any type of game. I have a few projects in mind that require an engine like this. I did not set out to make a Minecraft clone per say. Though I love the game for its technical mastery I do not feel it is my mission to copy it but rather make something inspired by it. And it is not just basic Minecraft I was inspired by. I was also inspired by mods like Optifine which adds connected textures and shaders. 

I decided to share this with the public because I can see actual games being made with it. Beyond just my own. 

You may be able to steal my code by you will never take my style and flare. But also you never grow big by making others small. If this engine empowers and inspires others to make beautiful things then my life was worth it. 

Will you be brave enough to wield its power and make something truly unique? 

## Why Babylon.Js?

Babylon.Js has a very nice API and the creator and maintainers work very hard to create a realiable feature rich engine. Plus it is the only current 3d js engine that is preparing to suppourt WebGPU. My choice is one based on the future of the engine as well as web tech and I feel Babylon.Js is currenlty the best option. Though actually most of the vovxel engine could be replaced with pure WebGL cause the mesh data is the same. 

## Chunk Render Amount

The current suppourted max render amount is 225 chunks. The engine is desinged to run best with that max amount of chunks. 

It can do 400+ for more simple chunks. If your world does not update often then the render distance can be higher as well.

### Vocab Terms

Terms I use in the readme and change log that may be confusing. 
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


### Chunk Data
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

### Voxel DAta
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
 





