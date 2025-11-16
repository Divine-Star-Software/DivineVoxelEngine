<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>

<p align="center">
<img src="assets/logo-small.png">
</p>

---

# What is this?

A multi-threaded, renderer independent, fully customizable TypeScript voxel engine. 

![DVE 1](assets/Screenshots/Foundation/PBR/2.PNG)

Join the Divine Star community here to get updates: [discord](https://discord.gg/98xEVU7TKn).

See videos of development here:
[Divine Star Software YouTube Channel](https://www.youtube.com/channel/UC6n2h7qiuEHI6oLLvod5wdg)


## To Init This Project

This project is a monorepo that holds all the Divine Voxel Engine packages and required libraries from Amodx. To initialize the project, just run the following commands:

```console
git clone https://github.com/Divine-Star-Software/DivineVoxelEngine.git
cd ./DivineVoxelEngine
git pull
git lfs pull
git submodule update --init --recursive
git submodule foreach git checkout main
git submodule foreach git pull
npm run init:all
npm install
cd ./testing/Vlox
npm run start
```


## Core Packages

- **@divinevoxel/vlox**  
  - Minecraft-like voxel data handling and meshing.  
  - Lighting, flow, power, and secondary state/voxelsystems.
  - **Vlox Model System**  
    - Similar to Blockbench models  
    - AO, lighting, and advanced texture handling  
    - Particle emitters and other custom effects  
    - Easily extensible to create custom meshed voxels  
  - World simulation engine for generation and update handling  
  - Archiving API for exporting worlds and templates as JSON  
  - **Multi-threaded**  
    - All meshing and world updates run in parallel  
    - Shared memory is optional—engine can run anywhere  

- **@divinevoxel/vlox-babylon**  
  - Renderer for DVE Vlox using Babylon.js, including Classic and PBR shaders

- **@divinevoxel/vlox-three**  
  - Renderer for DVE Vlox using Three.js, including Classic and PBR shaders

- **@divinevoxel/vlox-quantum**  
  - Custom renderer for DVE Vlox using WebGPU

## Packages for Game Development

- **@dvegames/vlox**  
  - A library of components for building games with Babylon.js and `@divinevoxel/vlox`

- **@dvegames/vlox-tools**  
  - A library for creating tool panels for any `@divinevoxel/vlox` project


# Screenshots 

## Vlox Babylon

### PBR

![DVE 1](assets/Screenshots/Foundation/PBR/3.PNG)
![DVE 1](assets/Screenshots/Foundation/PBR/1.PNG)


### Classic

![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM3.JPG)
![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM1.PNG)
![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM2.PNG)
![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM4.PNG)
![DVE 1](assets/Screenshots/Foundation/Classic/DVE-RM5.PNG)





