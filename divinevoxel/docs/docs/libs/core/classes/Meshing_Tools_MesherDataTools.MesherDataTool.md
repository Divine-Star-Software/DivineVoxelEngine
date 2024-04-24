---
id: "Meshing_Tools_MesherDataTools.MesherDataTool"
title: "Class: MesherDataTool"
sidebar_label: "MesherDataTool"
custom_edit_url: null
---

[Meshing/Tools/MesherDataTools](../modules/Meshing_Tools_MesherDataTools.md).MesherDataTool

## Constructors

### constructor

• **new MesherDataTool**(): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

## Properties

### attributes

• **attributes**: `Map`\<`string`, [value: number[], stride: number, dataType: "8ui" \| "8i" \| "16ui" \| "16i" \| "32ui" \| "32i" \| "32f" \| "64f" \| "8uic"]\>

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L14)

___

### indicieIndex

• **indicieIndex**: `number` = `0`

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L10)

___

### quadVertexData

• **quadVertexData**: `Map`\<`string`, [`QuadVertexData`](Meshing_Classes_VertexData.QuadVertexData.md)\>

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L13)

___

### segments

• **segments**: `Map`\<`string`, `number`[]\>

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L12)

___

### vars

• **vars**: `Map`\<`string`, `number`\>

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L11)

## Methods

### addIndices

▸ **addIndices**(`...indices`): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...indices` | `number`[] |

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L34)

___

### addNormals

▸ **addNormals**(`...normals`): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...normals` | `number`[] |

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L30)

___

### addPositions

▸ **addPositions**(`...positions`): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...positions` | `number`[] |

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:26](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L26)

___

### addToAttribute

▸ **addToAttribute**(`id`, `...data`): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `...data` | `number`[] |

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:38](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L38)

___

### addToSegment

▸ **addToSegment**(`id`, `...normals`): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `...normals` | `number`[] |

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:47](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L47)

___

### getAllAttributes

▸ **getAllAttributes**(): [[`MeshAttributes`](../modules/Meshing_MeshData_types.md#meshattributes), `ArrayBuffer`[]]

#### Returns

[[`MeshAttributes`](../modules/Meshing_MeshData_types.md#meshattributes), `ArrayBuffer`[]]

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:108](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L108)

___

### getAttribute

▸ **getAttribute**(`id`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`number`[]

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:44](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L44)

___

### getMeshData

▸ **getMeshData**(): [`TypedArrays`[], `ArrayBuffer`[], `number`[]]

#### Returns

[`TypedArrays`[], `ArrayBuffer`[], `number`[]]

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:89](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L89)

___

### getVar

▸ **getVar**(`id`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| `number`

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:59](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L59)

___

### resetAll

▸ **resetAll**(): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:62](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L62)

___

### resetAttributes

▸ **resetAttributes**(): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:74](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L74)

___

### resetSegments

▸ **resetSegments**(): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:68](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L68)

___

### resetVars

▸ **resetVars**(): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:82](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L82)

___

### setVar

▸ **setVar**(`id`, `value`): [`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value` | `number` |

#### Returns

[`MesherDataTool`](Meshing_Tools_MesherDataTools.MesherDataTool.md)

#### Defined in

[divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Meshing/Tools/MesherDataTools.ts#L53)
