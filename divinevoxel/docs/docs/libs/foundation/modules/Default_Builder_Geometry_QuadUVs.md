---
id: "Default_Builder_Geometry_QuadUVs"
title: "Module: Default/Builder/Geometry/QuadUVs"
sidebar_label: "Default/Builder/Geometry/QuadUVs"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### QuadUVs

• `Const` **QuadUVs**: `Object`

|||||||||||||||||||||||||||||||||||||
[TOP & BOTTOM]
Not Flipped

2: w 0,h 0        3: w 1, h 0
         |--------|
         |      / |
         |   /    |
         |/       |
         |--------|
1: w 0,h 1        4: w 1,h 1

===============================
Flipped

4: w 1,h 0        3: w 0, h 0
         |--------|
         |\       |
         |   \    |
         |      \ |
         |--------|
1: w 1,h 1        2: w 0, h 1

||||||||||||||||||||||||||||||||||||||||
[Sides]
Not Flipped
4: w 1,h 0        3: w 0, h 0
         |--------|
         |\       |
         |   \    |
         |      \ |
         |--------|
1: w 1,h 1        2: w 0, h 1

===============================
Flipped
2: w 0,h 0        3: w 1, h 0
         |--------|
         |      / |
         |   /    |
         |/       |
         |--------|
1: w 0,h 1        4: w 1,h 1

#### Type declaration

| Name | Type |
| :------ | :------ |
| `advancedUVs` | `Record`\<`UVFaceTypes`, (`uv`: `number`, `data`: [`AdvancedUVs`](Default_Builder_Types_Geometry_types.md#advanceduvs), `uvs`: `number`[], `flipped`: `boolean`) => `void`\> |
| `uvFunctions` | `Record`\<`DirectionNames`, (`data`: [`AddQuadUVsData`](Default_Builder_Types_Geometry_types.md#addquaduvsdata)) => `void`\> |
| `uvRotations` | `Record`\<`UVFaceTypes`, `Record`\<[`TextureRotations`](Default_Builder_Types_Geometry_types.md#texturerotations), (`uv`: `number`, `ws`: `number`, `we`: `number`, `hs`: `number`, `he`: `number`, `flipped`: `boolean`, `uvs`: `number`[]) => `void`\>\> |
| `addAdvancedUVs` | (`direction`: `DirectionNames`, `uv`: `number`, `uvs`: `number`[], `data`: [`AdvancedUVs`](Default_Builder_Types_Geometry_types.md#advanceduvs), `flipped`: `boolean`) => `void` |
| `addUVs` | (`data`: [`AddQuadUVsData`](Default_Builder_Types_Geometry_types.md#addquaduvsdata)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/QuadUVs.ts:56](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/QuadUVs.ts#L56)
