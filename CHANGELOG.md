##### Change Log

1-15-2022
- Added ocean test world.
- Fluid voxels are all made into mesh.
- Fluid meshes are built in their own thread now. 
- Added back animations. All should work now. 
- Built out the shader builder and added magma material and mesh.

1-14-2022
- Flora and Fluid voxels are now seperate meshes. 
  - Each chunk is built of at most 4 meshes.
- Each flora and fluid material has built in shader effects that can be turned on or off. 
- Voxel can use strings for the shape id. 
- Voxel has control over it's AO and light calc.


1-12-2022

- Voxel data is now stored in the chunk as a number. This number is used to access the real information about the voxel which is stored in something called a Voxel Pallet.  

  - A voxel pallet can either be "global" or "per-chunk". Global means there is one voxel pallet at a given time for the world generation. While per-chunk means that the voxel pallet is stored with the chunk data. 
  - Per chunk voxel pallets are good for Minecraft type games where the world data is saved and may have voxels added on later.
  - Global voxel pallets are good for when the world data is not saved and everything is just generated. 

- A set of functions are being developed to make it easy to develop a voxel pallet. They will in a new class called "WorldGeneration" which is just meant to assist in generating data. 

- If you want to add a block now you have to do different things based on the voxel pallete mode:

  - If it is global you must get the index number from the global voxel pallet and insert that into the chunk voxel data. 
  - If it is per-chunk first you must check to see if the voxel pallet id exists in the chunk pallet and add it there if it does not exist. Then you get the index number from that which you will then insert into the chunk voxel data. 

The naming convection for voxels and their voxel pallet states is as follows:

```ts
const voxleParentGroup = "dve";
const voxelName = "dreamstone";
const voxelid = `${voxleParentGroup}:${voxelName}`;
//create palletid for default voxel state
const voxelPalletIdDefault = `${voxelid}:default`;
//Add another states like this
const voxelState = `rotated`;
const voxelPalletIdRotated = `${voxelid}:${voxelState}`;
```

 

1-10-2022 

- Focus of this project is now defined as building a voxel engine that handles rendering only.
  - There will be ways to handle world generation, players, game logic, and so on.
- Actual voxel data is stored as an array. The chunk itself is stored in a 3d array. 
  - The current structure for voxel data is not finalized but currently the first index of the array will always be the voxel's id.  
- Support for different voxel types and shapes was finally added.
  - Shapes are defined in the mesh builder thread. They hold the information to build the actual voxel mesh. 
  - Voxels are defined in the world thread. They hold the basic template information such as the shape type and the texture indexes for the faces.
- Moved repeated complex logic into a shared function. 
- Decided to move liquids to its own mesh rather than including it in the chunk mesh.
- Greedy meshing is no longer being considered right now. 
  - Decided it was not worth it right now to add. Reason being this engine may be used to create voxel worlds with many different textures rather repetitive ones that can be easily combined.