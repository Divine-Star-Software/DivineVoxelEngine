---
id: "index"
title: "@divinevoxel/foundation"
sidebar_label: "@divinevoxel/foundation"
sidebar_position: 3
custom_edit_url: null
---

`@divinevoxel/foundation` is a library for making "block style" voxel projects such as Minecraft or Cubeworld. 

To use the library to its full potential it requires the use of SharedArrayBuffers and an understanding of web workers. 

The engine operates in serval context: 

- Renderer - DivineVoxelEngineRender (DVER)
- World - DivineVoxelEngineWorld (DVEW)
- Constructor - DivineVoxelEngineConsurctor (DVEC)
- Nexus - DivineVoxelEngineNexus (DVEN) - optional
- RichWorld - DivineVoxelEngineRichWorld (DVERW) - optional
- DataLoader - DivineVoxelEngineDataLoader  (DVEDK) - optional

You must supply the workers upfront to *DVER*. DVE itself will handlle connecting the workers and syncing data. 

```
import { DVEFBRCore } from "@divinevoxel/babylon-renderer/Defaults/Foundation/DVEFBRCore";

```



