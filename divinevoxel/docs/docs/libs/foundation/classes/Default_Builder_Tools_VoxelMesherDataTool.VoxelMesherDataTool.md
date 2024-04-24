---
id: "Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool"
title: "Class: VoxelMesherDataTool"
sidebar_label: "VoxelMesherDataTool"
custom_edit_url: null
---

[Default/Builder/Tools/VoxelMesherDataTool](../modules/Default_Builder_Tools_VoxelMesherDataTool.md).VoxelMesherDataTool

## Hierarchy

- `MesherDataTool`

  ↳ **`VoxelMesherDataTool`**

## Constructors

### constructor

• **new VoxelMesherDataTool**(): [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)

#### Returns

[`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)

#### Overrides

MesherDataTool.constructor

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L30)

## Properties

### attributes

• **attributes**: `Map`\<`string`, [value: number[], stride: number, dataType: "8ui" \| "8i" \| "16ui" \| "16i" \| "32ui" \| "32i" \| "32f" \| "64f" \| "8uic"]\>

#### Inherited from

MesherDataTool.attributes

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:9

___

### faceDataOverride

• **faceDataOverride**: [`FaceDataOverride`](../modules/Default_Builder_Types_Override_types.md#facedataoverride)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L24)

___

### indicieIndex

• **indicieIndex**: `number`

#### Inherited from

MesherDataTool.indicieIndex

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:5

___

### nVoxel

• **nVoxel**: [`BuilderDataTool`](Default_Builder_Tools_BuilderDataTool.BuilderDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L23)

___

### quadVertexData

• **quadVertexData**: `Map`\<`string`, `QuadVertexData`\>

#### Inherited from

MesherDataTool.quadVertexData

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:8

___

### segments

• **segments**: `Map`\<`string`, `number`[]\>

#### Inherited from

MesherDataTool.segments

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:7

___

### template

• **template**: [`VoxelTemplateDataTool`](Default_Builder_Tools_VoxelTemplateDataTool.VoxelTemplateDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L21)

___

### vars

• **vars**: `Map`\<`string`, `number`\>

#### Inherited from

MesherDataTool.vars

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:6

___

### voxel

• **voxel**: [`BuilderDataTool`](Default_Builder_Tools_BuilderDataTool.BuilderDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L22)

## Methods

### addIndices

▸ **addIndices**(`...indices`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...indices` | `number`[] |

#### Returns

`this`

#### Inherited from

MesherDataTool.addIndices

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:12

___

### addNormals

▸ **addNormals**(`...normals`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...normals` | `number`[] |

#### Returns

`this`

#### Inherited from

MesherDataTool.addNormals

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:11

___

### addPositions

▸ **addPositions**(`...positions`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...positions` | `number`[] |

#### Returns

`this`

#### Inherited from

MesherDataTool.addPositions

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:10

___

### addToAttribute

▸ **addToAttribute**(`id`, `...data`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `...data` | `number`[] |

#### Returns

`this`

#### Inherited from

MesherDataTool.addToAttribute

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:13

___

### addToSegment

▸ **addToSegment**(`id`, `...normals`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `...normals` | `number`[] |

#### Returns

`this`

#### Inherited from

MesherDataTool.addToSegment

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:15

___

### calculateFlow

▸ **calculateFlow**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:78](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L78)

___

### calculateLight

▸ **calculateLight**(`direction`, `ignoreAO?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `direction` | `DirectionNames` | `undefined` |
| `ignoreAO` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:69](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L69)

___

### getAllAttributes

▸ **getAllAttributes**(): [`MeshAttributes`, `ArrayBuffer`[]]

#### Returns

[`MeshAttributes`, `ArrayBuffer`[]]

#### Inherited from

MesherDataTool.getAllAttributes

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:23

___

### getAttribute

▸ **getAttribute**(`id`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`number`[]

#### Inherited from

MesherDataTool.getAttribute

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:14

___

### getMeshData

▸ **getMeshData**(): [`TypedArrays`[], `ArrayBuffer`[], `number`[]]

#### Returns

[`TypedArrays`[], `ArrayBuffer`[], `number`[]]

#### Inherited from

MesherDataTool.getMeshData

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:22

___

### getOverlayTextures

▸ **getOverlayTextures**(): `QuadVertexData`

#### Returns

`QuadVertexData`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:106](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L106)

___

### getTexture

▸ **getTexture**(): `number`

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:115](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L115)

___

### getVar

▸ **getVar**(`id`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| `number`

#### Inherited from

MesherDataTool.getVar

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:17

___

### getWorldAO

▸ **getWorldAO**(): `QuadVertexData`

#### Returns

`QuadVertexData`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:92](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L92)

___

### getWorldLevel

▸ **getWorldLevel**(): `QuadVertexData`

#### Returns

`QuadVertexData`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:99](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L99)

___

### getWorldLight

▸ **getWorldLight**(): `QuadVertexData`

#### Returns

`QuadVertexData`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:85](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L85)

___

### isFaceExposed

▸ **isFaceExposed**(`face`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `face` | `DirectionNames` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:128](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L128)

___

### isFaceFlipped

▸ **isFaceFlipped**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:124](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L124)

___

### resetAll

▸ **resetAll**(): `this`

#### Returns

`this`

#### Inherited from

MesherDataTool.resetAll

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:18

___

### resetAttributes

▸ **resetAttributes**(): `this`

#### Returns

`this`

#### Inherited from

MesherDataTool.resetAttributes

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:20

___

### resetSegments

▸ **resetSegments**(): `this`

#### Returns

`this`

#### Inherited from

MesherDataTool.resetSegments

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:19

___

### resetVars

▸ **resetVars**(): `this`

#### Returns

`this`

#### Inherited from

MesherDataTool.resetVars

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:21

___

### setFaceFlipped

▸ **setFaceFlipped**(`value`): [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

[`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:119](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L119)

___

### setTexture

▸ **setTexture**(`uv`): [`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `uv` | `number` |

#### Returns

[`VoxelMesherDataTool`](Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts:110](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/VoxelMesherDataTool.ts#L110)

___

### setVar

▸ **setVar**(`id`, `value`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value` | `number` |

#### Returns

`this`

#### Inherited from

MesherDataTool.setVar

#### Defined in

divinevoxel/core/dist/Meshing/Tools/MesherDataTools.d.ts:16
