---
id: "Contexts_Render_Scene_MeshRegister_types"
title: "Module: Contexts/Render/Scene/MeshRegister.types"
sidebar_label: "Contexts/Render/Scene/MeshRegister.types"
custom_edit_url: null
---

## Type Aliases

### MeshRegisterChunk

Ƭ **MeshRegisterChunk**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mesh` | `URIMesh` |

#### Defined in

[divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.types.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.types.ts#L4)

___

### MeshRegisterColumn

Ƭ **MeshRegisterColumn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | `Map`\<`number`, `Map`\<`string`, [`MeshRegisterChunk`](Contexts_Render_Scene_MeshRegister_types.md#meshregisterchunk)\>\> |
| `location` | [`LocationData`](Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Defined in

[divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.types.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.types.ts#L8)

___

### MeshRegisterDimensions

Ƭ **MeshRegisterDimensions**: `Map`\<`string`, `Map`\<`string`, [`MushRegisterRegion`](Contexts_Render_Scene_MeshRegister_types.md#mushregisterregion)\>\>

#### Defined in

[divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.types.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.types.ts#L16)

___

### MushRegisterRegion

Ƭ **MushRegisterRegion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columns` | `Map`\<`number`, [`MeshRegisterColumn`](Contexts_Render_Scene_MeshRegister_types.md#meshregistercolumn)\> |

#### Defined in

[divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.types.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Scene/MeshRegister.types.ts#L13)
