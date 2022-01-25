##### Change Log
1-23-2022
- Added a research file to save links and other important information.
- Added some stuff to the notes section.
- Did a temp fix for the fluid shader to make it ignore the light system.
- Started work on the wiki. 
- The shaders for fluid, flora, and magma materials need to be re-written for the light system. But will work on that soon. 


1-22-2022
- Wrote a new set of functions for World Data called getData and setData. They take any x,y,z and can get or insert any chunk.
- With testing they reduced chunk build time by 20ms! With now an avergae of 20ms or so chunk building is really fast. 
- Chunk processor function was changed to use new commands and allow for the sun light template. 
- Changed the voxel interface to have only function that is called by the Chunk Processor. It is simply called "process".
  - In the function the texture uvs, AO light, RGB light, Sun light, and Per Color voxel per face can be calculated. 
  - It is only called if the voxel is exposed. Meaning it has one face open to view. 
- Chunk templates now consist of 4 colors sets. Them being:
  - RGB Color
    - Default is white. Used to changed the color of a voxel. 
  - RGB Light
    - Light from light sources. Such as a candle or a lamp.
  - Sun Light
    - Light calculated by global illumnation. 
    - Can be ignored in use for one dynamic light. 
      - Dynamic light not added yet but the materials are all updatable. 
      - Suppourt is planned but will take more time. 
  - AO Light
    - Linear light levels used for inter voxel shadows. 
 - May have an option to turn them off if they are not being used as they do consume more memory. 
 - Chunk size is now changeable via the WorldData class in the World thread. 
    - There are three variables in WorldData that are used to determine chunk size. 
    - They must be a power of 2. 
    - The variable names are: 
      - chunkXPow2 
      - chunkZPow2 
      - chunkYPow2 

1-21-2022
- Solid voxels no longer store a light level. All light levels are stored in an 'air' voxel.
- Air voxels have a palette id of -1. While the normal range for voxels is the positive side of a signed 32 bit int (2 billion or so).
- Light example has been updated with a brand new algorithm.
  - It populates the air around the light sourcre. From there each air voxel light level is the brightest neighbor minus 1.
  - Once an air voxel is set or updated its neighbors are check as well. 
    - It fills by y, x, then z. Broke up it into four quads around the light. 
  - If it encounters a solid block it stops filling air in that direction. So, if going along the z axis for the current x and y it will stop. 
  - But once it loops over the next layer on the y axis it can update an empty spaces that the light could wrap around into. 



1-19-2022
- Decided to add suppourt for vertical chunks. Right now each chunk is 128 meters high. Might also try 64 tall chunks.
  - This is important to reduce the amount of time to update a big chunk. 
  - This was decided upon after implementing lighting gradients for the voxels. 
- Chunks are stored in a hash map of its x-z-y positions now.
- Created a new object to help decode light values called LightByte. 
- Added fps tracker for the demo worlds.

1-18-2022
- Started implementing the lighting system. Meshes use the color set called 'full colors' to colorize. 
- Added some effects for when the player is in the fluid for the world test. 
- Added new test world just for lighting.

1-17-2022
- Normals and facet data are no longar calculated or stored on all of the voxel meshes
- Implemented a new method for voxel picking for the player example. 

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

- Voxel data is now stored in the chunk as a number. This number is used to access the real information about the voxel which is stored in something called a Voxel Palette.  

  - A voxel palette can either be "global" or "per-chunk". Global means there is one voxel palette at a given time for the world generation. While per-chunk means that the voxel palette is stored with the chunk data. 
  - Per chunk voxel palettes are good for Minecraft type games where the world data is saved and may have voxels added on later.
  - Global voxel palettes are good for when the world data is not saved and everything is just generated. 

- A set of functions are being developed to make it easy to develop a voxel palette. They will in a new class called "WorldGeneration" which is just meant to assist in generating data. 

- If you want to add a block now you have to do different things based on the voxel palettee mode:

  - If it is global you must get the index number from the global voxel palette and insert that into the chunk voxel data. 
  - If it is per-chunk first you must check to see if the voxel palette id exists in the chunk palette and add it there if it does not exist. Then you get the index number from that which you will then insert into the chunk voxel data. 

The naming convection for voxels and their voxel palette states is as follows:

```ts
const voxleParentGroup = "dve";
const voxelName = "dreamstone";
const voxelid = `${voxleParentGroup}:${voxelName}`;
//create paletteid for default voxel state
const voxelPaletteIdDefault = `${voxelid}:default`;
//Add another states like this
const voxelState = `rotated`;
const voxelPaletteIdRotated = `${voxelid}:${voxelState}`;
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