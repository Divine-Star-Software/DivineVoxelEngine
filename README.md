<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>

<p align="center">
<img src="assets/logo-small.png">
</p>

---

**NOTICE:**
This is not finalized. Things will keep changing as development goes forward. 
This code is public but it is used by Divine Star to make games.
Either fork or use at your own risks.

# What is this?

A multi-threaded, renderer independent, fully customizable TypeScript voxel engine. 

Need help or want to share your creations? Join the [discord](https://discord.gg/98xEVU7TKn).

![DVE 1](assets/Screenshots/Foundation/PBR/2.PNG)


## Packages 
- **@divinevoxel/vlox**
  - The original set up for DVE.
  - Different voxel types and shapes.
  - Chunk-based rendering and meshing.
  - In parallel mesh building, light updates, and other world updates.
  - Multi-threaded data access.
  - Ambient occlusion and smooth lighting.
  - Animated and connected textures.
  - Custom shaders and shader effects.
  - Vertical and horizontal chunks.
  - Voxel Lighting system.
    - Easy to update and remove.
    - Support for different colored lights.
    - Sunlight global illumination.
  - World Data API - Easy tools to build worlds.
  - Easy to use auto-update world on voxel add/remove
    - Will auto update light sources for you.
- **@divinevoxel/vlox-babylon-renderer**
  - Renderer for DVE Vlox using babylon.js including Classic and PBR shaders.
- **@divinevoxel/vlox-three-renderer**
  - Renderer for DVE Vlox using three.js including Classic and PBR shaders.
- **@divinevoxel/magic**
  -  Magic voxel parser and integration.
- **@divinevoxel/quantum-renderer**
  - Custom experimental renderer using Web GPU.
  - @divinevoxel/magic has suppourt for rendering a scene with ray marching.

More packages are on the way.

# Screenshots 

## Vlox

### PBR

![DVE 1](assets/Screenshots/Foundation/PBR/3.PNG)
![DVE 1](assets/Screenshots/Foundation/PBR/1.PNG)


### Classic

![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM3.JPG)
![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM1.PNG)
![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM2.PNG)
![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM4.PNG)
![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM5.PNG)

## Magic

### Quantum

![DVE 1](assets/Screenshots/Magic/Quantum/1.PNG)
![DVE 1](assets/Screenshots/Magic/Quantum/2.PNG)
![DVE 1](assets/Screenshots/Magic/Quantum/3.PNG)





See videos of development here:
[Divine Star Software YouTube Channel](https://www.youtube.com/channel/UC6n2h7qiuEHI6oLLvod5wdg)


