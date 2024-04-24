---
id: "Interfaces_World_Data_Classes_TagBuilder.TagBuilder"
title: "Class: TagBuilder"
sidebar_label: "TagBuilder"
custom_edit_url: null
---

[Interfaces/World/Data/Classes/TagBuilder](../modules/Interfaces_World_Data_Classes_TagBuilder.md).TagBuilder

## Constructors

### constructor

• **new TagBuilder**(`id`, `dataSegment`): [`TagBuilder`](Interfaces_World_Data_Classes_TagBuilder.TagBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dataSegment` | `string` |

#### Returns

[`TagBuilder`](Interfaces_World_Data_Classes_TagBuilder.TagBuilder.md)

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L39)

## Properties

### \_built

• **\_built**: `boolean` = `false`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L16)

___

### \_defaults

• **\_defaults**: `Map`\<`string`, `number`\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:36](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L36)

___

### \_initData

• **\_initData**: `RemoteTagManagerInitData`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L37)

___

### \_nodeMap

• **\_nodeMap**: `Map`\<`string`, [`TagBuilderNodes`](../modules/Types_TagBuilder_types.md#tagbuildernodes)\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L17)

___

### \_objectMaps

• **\_objectMaps**: `Map`\<`string`, \{ `allowedComms`: `string`[] ; `count`: `number` ; `found`: `Record`\<`string`, `number`\> ; `map`: `Record`\<`number`, `any`\>  }\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L27)

___

### \_stringMaps

• **\_stringMaps**: `Map`\<`string`, \{ `allowedComms`: `string`[] ; `count`: `number` ; `found`: `Record`\<`string`, `number`\> ; `map`: `string`[]  }\>

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L18)

___

### dataSegment

• **dataSegment**: `string`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L39)

___

### id

• **id**: `string`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L39)

## Methods

### addNode

▸ **addNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`TagBuilderNodes`](../modules/Types_TagBuilder_types.md#tagbuildernodes) \| [`TagBuilderNodes`](../modules/Types_TagBuilder_types.md#tagbuildernodes)[] |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:41](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L41)

___

### build

▸ **build**(`totalTagIndexes?`): `RemoteTagManagerInitData`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `totalTagIndexes` | `number` | `0` |

#### Returns

`RemoteTagManagerInitData`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:107](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L107)

___

### getNode

▸ **getNode**(`id`): `undefined` \| [`TagBuilderNodes`](../modules/Types_TagBuilder_types.md#tagbuildernodes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| [`TagBuilderNodes`](../modules/Types_TagBuilder_types.md#tagbuildernodes)

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:51](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L51)

___

### hasNode

▸ **hasNode**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:63](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L63)

___

### setDefaults

▸ **setDefaults**(`tagManager`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagManager` | `TagManagerBase` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:55](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L55)

___

### setNode

▸ **setNode**(`id`, `value`, `tagManager`): `undefined` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value` | `any` |
| `tagManager` | `TagManagerBase` |

#### Returns

`undefined` \| ``false``

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:67](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L67)

___

### sync

▸ **sync**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts:172](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/World/Data/Classes/TagBuilder.ts#L172)
