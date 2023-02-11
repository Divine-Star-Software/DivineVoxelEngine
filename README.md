<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>

<p align="center">
<img src="https://divine-star-software.github.io/DigitalAssets/images/logo-small.png">
</p>

---

**WARNING:**
This is not finalized. Things will keep changing as development goes forward.
Use a stable release for development.

# What is this?

A truly multi-threaded JavaScript voxel game engine written in TypeScript that uses Babylon.Js.

Check out the [Wiki](https://github.com/Divine-Star-Software/DivineVoxelEngine/wiki) and visit the [DVE Testing](https://github.com/Divine-Star-Software/DVETesting) repo to get started.

Need help or want to share your creations? Join the [discord](https://discord.gg/98xEVU7TKn).

![DVE 1](https://divine-star-software.github.io/DigitalAssets/images/DVE/DVE-RM3.JPG)

## Features

- Different voxel types and shapes.
- Chunk-based rendering and meshing.
- In parallel mesh building, light updates, and other world updats.
- Multi-threaded data access.
- Ambient occlusion and smooth lighting.
- Animated and connected textures.
- Custom shaders and shader effects.
- Vertical and horizontal chunks.
- Voxel Lighting system.
  - Easy to update and remove.
  - Support for different colored lights.
  - Sunlight global illumination/
- World Data API - Easy tools to build worlds.
- Easy to use auto-update world on voxel add/remove
  - Will auto update light sources for you.

## In Development

- Headless server use.
- Physics and collision detection.
  - Working to develop some helper functions to determine what voxel the player is looking at or touching.
  - Instead of using collision detection with the actual meshes it will calculate collision in the world thread.
- Liquid flow and magma flow like Minecraft.
- Same voxel different colors
  - Set a color directly on voxel data.
  - Options to create shade gradient with neighbors.
- Well-written wiki with tutorials on how to do anything that you could possibly want.
- Standard data format for the engine that will be called either .dsd or .dved for saving the world data and or structures.

## Long Term Goals

- Dynamic Lighting system.
  - Will use Babylon's built-in dyamic lights and shadow casting.
- More shader effects and custom voxel substances
- Structure creator software.

## See In Action

![DVE 1](https://divine-star-software.github.io/DigitalAssets/images/DVE/DVE-RM1.PNG)

![DVE 1](https://divine-star-software.github.io/DigitalAssets/images/DVE/DVE-RM2.PNG)

![DVE 1](https://divine-star-software.github.io/DigitalAssets/images/DVE/DVE-RM4.PNG)

![DVE 1](https://divine-star-software.github.io/DigitalAssets/images/DVE/DVE-RM5.PNG)

See videos of development here:
[Divine Star Software YouTube Channel](https://www.youtube.com/channel/UC6n2h7qiuEHI6oLLvod5wdg)

### Want to contribute?

If you would like to contribute please read [Contributions & Code Style Guide](https://github.com/Divine-Star-Software/DivineVoxelEngine/wiki/Contributions-&-Code-Style-Guide) of the wiki.

### Asset License

Divine Voxel Engine Assets © 2022 by Lucas Damian Johnson is licensed under CC BY-NC-SA 4.0. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/

All assets for the engine are copyright by Divine Star.
You can use them for your own testing but you can not use them in any commerical product.
