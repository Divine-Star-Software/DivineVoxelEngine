---
id: "Types_Voxel_types"
title: "Module: Types/Voxel.types"
sidebar_label: "Types/Voxel.types"
custom_edit_url: null
---

## Type Aliases

### RawVoxelData

Ƭ **RawVoxelData**: [id: number, light: number, state: number, secondaryId: number]

#### Defined in

[divinevoxel/core/src/Types/Voxel.types.ts:49](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/Voxel.types.ts#L49)

___

### VoxelData

Ƭ **VoxelData**: `Object`

# Voxel Data
---
This the needed information for each voxel.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `states?` | `number` |
| `tags` | ([id: string, value: string \| number \| boolean \| number[]] \| [id: "#dve\_substance", value: VoxelSubstanceType] \| [id: "#dve\_shape\_id", value: string] \| [id: "#dve\_is\_light\_source", value: boolean] \| [id: "#dve\_light\_value", value: [r: number, g: number, z: number]] \| [id: "#dve\_collider\_id", value: string] \| [id: "#dve\_check\_collisions", value: boolean] \| [id: "#dve\_material", value: string] \| [id: "#dve\_hardness", value: number] \| [id: "#dve\_is\_rich", value: boolean])[] |

#### Defined in

[divinevoxel/core/src/Types/Voxel.types.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/Voxel.types.ts#L32)

___

### VoxelPalette

Ƭ **VoxelPalette**: `string`[]

#### Defined in

[divinevoxel/core/src/Types/Voxel.types.ts:2](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/Voxel.types.ts#L2)

___

### VoxelPaletteMap

Ƭ **VoxelPaletteMap**: `Record`\<`string`, `number`\>

#### Defined in

[divinevoxel/core/src/Types/Voxel.types.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/Voxel.types.ts#L3)

___

### VoxelSubstanceType

Ƭ **VoxelSubstanceType**: ``"#dve_solid"`` \| ``"#dve_transparent"`` \| ``"#dve_flora"`` \| ``"#dve_liquid"`` \| ``"#dve_magma"`` \| `string`

# Voxel Substance Type
---
All solid and "#dve_transparent" voxels are grouped together in the same mesh per chunk.
While the the liquid and magma will chunks will have their own seperate meshes per chunk.
Transparent voxels will not cause the faces of solid voxels next to them to be culled they also have double sided rendering.

#### Defined in

[divinevoxel/core/src/Types/Voxel.types.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/Voxel.types.ts#L11)

___

### VoxelTemplateSubstanceType

Ƭ **VoxelTemplateSubstanceType**: ``"#dve_solid"`` \| ``"#dve_flora"`` \| ``"#dve_liquid"`` \| ``"#dve_magma"`` \| `string`

VoxelT emplateS ubstance Type
---
Basically same as Voxel Substance Type but only has the substances which have their own generated mesh.

#### Defined in

[divinevoxel/core/src/Types/Voxel.types.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Types/Voxel.types.ts#L22)
