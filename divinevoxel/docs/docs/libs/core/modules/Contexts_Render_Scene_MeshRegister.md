---
id: "Contexts_Render_Scene_MeshRegister"
title: "Module: Contexts/Render/Scene/MeshRegister"
sidebar_label: "Contexts/Render/Scene/MeshRegister"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### MeshRegister

• `Const` **MeshRegister**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_dimensions` | [`MeshRegisterDimensions`](Contexts_Render_Scene_MeshRegister_types.md#meshregisterdimensions) |
| `chunk` | \{ `_getChunkData`: (`mesh`: `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>) => [`MeshRegisterChunk`](Contexts_Render_Scene_MeshRegister_types.md#meshregisterchunk) ; `add`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata), `mesh`: `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>, `substance`: `string`) => `Map`\<`string`, [`MeshRegisterChunk`](Contexts_Render_Scene_MeshRegister_types.md#meshregisterchunk)\> ; `get`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata), `substance`: `string`) => ``false`` \| [`MeshRegisterChunk`](Contexts_Render_Scene_MeshRegister_types.md#meshregisterchunk) ; `remove`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata), `substance`: `string`) => ``false`` \| `URIMesh`\<`URIScene`\<`unknown`\>, `unknown`\>  } |
| `chunk._getChunkData` | [object Object] |
| `chunk.add` | [object Object] |
| `chunk.get` | [object Object] |
| `chunk.remove` | [object Object] |
| `column` | \{ `_getColumnData`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata)) => [`MeshRegisterColumn`](Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn) ; `add`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata)) => [`MeshRegisterColumn`](Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn) ; `get`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata)) => `undefined` \| ``false`` \| [`MeshRegisterColumn`](Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn) ; `remove`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata)) => ``false`` \| [`MeshRegisterColumn`](Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn)  } |
| `column._getColumnData` | [object Object] |
| `column.add` | [object Object] |
| `column.get` | [object Object] |
| `column.remove` | [object Object] |
| `dimensions` | \{ `add`: (`id`: `string`) => `Map`\<`any`, `any`\> ; `get`: (`id`: `string`) => `undefined` \| `Map`\<`string`, [`MushRegisterRegion`](Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion)\> ; `getAllMeshes`: (`id`: `string`) => `Generator`\<[location: LocationData, substance: string, mesh: URIMesh\<URIScene\<unknown\>, unknown\>], `any`, `unknown`\> ; `remove`: (`id`: `string`) => `boolean`  } |
| `dimensions.add` | [object Object] |
| `dimensions.get` | [object Object] |
| `dimensions.getAllMeshes` | [object Object] |
| `dimensions.remove` | [object Object] |
| `region` | \{ `_getRegionData`: () => [`MushRegisterRegion`](Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion) ; `add`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata)) => [`MushRegisterRegion`](Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion) ; `get`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata)) => ``false`` \| [`MushRegisterRegion`](Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion) ; `remove`: (`location`: [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata)) => `boolean`  } |
| `region._getRegionData` | [object Object] |
| `region.add` | [object Object] |
| `region.get` | [object Object] |
| `region.remove` | [object Object] |
| `$INIT` | () => `void` |
| `clearAll` | () => `void` |

#### Defined in

[divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.ts#L12)
