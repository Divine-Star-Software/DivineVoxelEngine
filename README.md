<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---
**WARNING:**
This is not finalized. Things will keep changing as development goes forward.
Check out the releases for stable working verions. The main repo may be broken at times.

# What is this?

A JavaScript voxel game engine written in TypeScript that uses Babylon.Js. 

Check out the [Wiki](https://github.com/Divine-Star-Software/DivineVoxelEngine/wiki) to get started.

# Current Features

- Different voxel types and shapes.
- Chunk based rendering and meshing.
- Multi threaded mesh building.
- Ambient occlusion.
- Animated textures.
- Connected textures.
- Custom shaders and shader effects.
- Vertical and horizontal chunks.
- Pre-Baking Lighting system.
  - Flood fill lighting system for local sources.
  - Suppourt for different colored lights.
  - Sun light calculation for global illumanitation (like MineCraft) 
- World Data API - Easy way to create chunks and the needed data for it.


# In Dev
- Easy to use light API and light options
- Easy to use auto update world on voxel add/remove 
  - Will auto update light sources for you. 
- Same voxel different colors
  - Set a color directly on voxel data. 
  - Options to create shade gradient with neighbors. 
- Dynamic Lighting system.
  - Will use Babylon's built in dyamic lights and shadow casting.
- One mesh mode
  - If the world does not need to update a lot all the worlds chunk meshes can be combined into one for each substance.
- Well written wiki with tutorials on how to do anything that you could possibably want.
- Standard data format for the engine either called .dsd or .dved for saving the world data and or structures.


# Future Ideas
- Basic physics and collision detection. 
  - Working to develop some helper functions to determine what voxel the player is looking at or touching. 
  - Instead of using collision detection with the actual meshes it will calculate collision in the world thread. 
- More shader effects and custom voxel substances
- Structure creator software. 



#### See In Action

See videos of development here:
[Divine Star Software YouTube Channel](https://www.youtube.com/channel/UC6n2h7qiuEHI6oLLvod5wdg)

Sceen shots:
![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss11.jpg)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss9.jpg)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss8.jpg)


### Want to contribute?

If you would like to contribute please first read the CodeStyles file in the root directory. 

Then get a hold of me through github or other social media. 

I don't need much help but if you want to provide example worlds, more shader effects, and other improvments let me know. 



 
