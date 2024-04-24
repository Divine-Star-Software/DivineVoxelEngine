---
id: "index"
title: "Overview"
sidebar_label: "Overview"
sidebar_position: -1
custom_edit_url: null
---

Divine Voxel Engine is a collection of libraries centered around voxel projects. 


- **@divinevoxel/core**
  - Abstract interfaces and utilities.
- **@divinevoxel/foundation**
  - For voxel block style voxel project.
- **@divinevoxel/magic**
  - For Magic Voxel style voxel projects.
- **@divinevoxel/babylon-renderer**
  - Renderer for DVE using babylonjs.
- **@divinevoxel/three-renderer**
  - Renderer for DVE using threejs.
- **@divinevoxel/react-three**
  - DVE integration for React Three Fiber.
- **@divinevoxel/quantum-renderer**
  - Custom experimental renderer using Web GPU.

## Starting A New Project

Start a new npm project and install the libraries you want to use.

```console
npm init
....
npm install @divinevoxel/foundation @divinevoxel/babylon-renderer
```

Next Divine Voxel Engien requires a build tool such as WebPack or Vite to be used.
It is built with modern esm modules and relies on tree shaking.

For an example of how to set up webpack properly for Divine Voxel Engine please see the [example app](https://github.com/Divine-Star-Software/DVEStarterApp).

If you are using a package that does multi threading the package will be using SharedArrayBuffer's which means you have to use HTTPS and set these headers when serving the files:

```console
Cross-Origin-Embedder-Policy require-corp
Cross-Origin-Opener-Policy  same-origin
```

This does create some complications with loading into other websites and fetching content from other origins. 

But once you have everything installed what you do from is up to you and what packages you installed. 



