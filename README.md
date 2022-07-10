<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---
**WARNING:**
This is not finalized. Things will keep changing as development goes forward.
Check out the releases for stable working verions. The main repo may be broken at times. Breaking changes will keep happening to suppourt the evolution of the enigne.
If something is not working or broken check the [Change Log](https://github.com/Divine-Star-Software/DivineVoxelEngine/wiki/Change-Log) & [To Do](https://github.com/Divine-Star-Software/DivineVoxelEngine/wiki/To-Do).

# What is this?

A JavaScript voxel game engine written in TypeScript that uses Babylon.Js. 

Check out the [Wiki](https://github.com/Divine-Star-Software/DivineVoxelEngine/wiki) to get started.

Need help or want to share your creations? Join the discord: 
[Discord](https://discord.gg/e2tFazST)

## Features

- Different voxel types and shapes.
- Chunk-based rendering and meshing.
- In parallel mesh building.
- Multi-threaded chunk data access.
- Ambient occlusion.
- Animated textures.
- Connected Textures.
- Custom shaders and shader effects.
- Vertical and horizontal chunks.
- Pre-Baking Lighting system.
  - Flood fill lighting system for local sources.
  - Support for different colored lights.
  - Sunlight calculation for global illumination (like Minecraft) 
- World Data API - Easy way to create chunks and the needed data for it.

## In Development

- Easy to use light API and light options
- Easy to use auto-update world on voxel add/remove 
  - Will auto update light sources for you. 
- Fluid flow and magma flow like Minecraft.
- Same voxel different colors
  - Set a color directly on voxel data. 
  - Options to create shade gradient with neighbors. 
- Dynamic Lighting system.
  - Will use Babylon's built-in dyamic lights and shadow casting.
- Well-written wiki with tutorials on how to do anything that you could possibly want.
- Standard data format for the engine that will be called either .dsd or .dved for saving the world data and or structures.

## Long Term Goals

- Basic physics and collision detection. 
  - Working to develop some helper functions to determine what voxel the player is looking at or touching. 
  - Instead of using collision detection with the actual meshes it will calculate collision in the world thread. 
- More shader effects and custom voxel substances
- Structure creator software. 



## See In Action

![DVE 1](https://divine-star-software.github.io/DigitalAssets/images/DVE/DVE-new1.JPG)

![DVE 1](https://divine-star-software.github.io/DigitalAssets/images/DVE/DVE-new2.JPG)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss11.jpg)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss9.jpg)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss8.jpg)

See videos of development here:
[Divine Star Software YouTube Channel](https://www.youtube.com/channel/UC6n2h7qiuEHI6oLLvod5wdg)

### Want to contribute?

If you would like to contribute please read [Contributions & Code Style Guide](https://github.com/Divine-Star-Software/DivineVoxelEngine/wiki/Contributions-&-Code-Style-Guide) of the wiki.



 
