---
id: "Contexts_DataLoader_Serializers_WorldDataSerializer.WorldDataSerialize"
title: "Class: WorldDataSerialize"
sidebar_label: "WorldDataSerialize"
custom_edit_url: null
---

[Contexts/DataLoader/Serializers/WorldDataSerializer](../modules/Contexts_DataLoader_Serializers_WorldDataSerializer.md).WorldDataSerialize

## Constructors

### constructor

• **new WorldDataSerialize**(): [`WorldDataSerialize`](Contexts_DataLoader_Serializers_WorldDataSerializer.WorldDataSerialize.md)

#### Returns

[`WorldDataSerialize`](Contexts_DataLoader_Serializers_WorldDataSerializer.WorldDataSerialize.md)

## Properties

### chunks

• **chunks**: [`ChunkDataTool`](Default_Tools_Data_WorldData_ChunkDataTool.ChunkDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts#L15)

___

### columns

• **columns**: [`ColumnDataTool`](Default_Tools_Data_WorldData_ColumnDataTool.ColumnDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts#L14)

___

### regions

• **regions**: [`RegionDataTool`](Default_Tools_Data_WorldData_RegionDataTool.RegionDataTool.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts#L13)

## Methods

### \_readDataIntoBuffer

▸ **_readDataIntoBuffer**(`offset`, `target`, `source`, `sourceOffset?`, `sourceLength?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `offset` | `number` | `undefined` |
| `target` | `Uint8Array` | `undefined` |
| `source` | `SharedArrayBuffer` \| `ArrayBuffer` | `undefined` |
| `sourceOffset` | `number` | `0` |
| `sourceLength` | `number` | `-1` |

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts:103](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts#L103)

___

### deSerializeColumn

▸ **deSerializeColumn**(`columnBuffer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `columnBuffer` | `SharedArrayBuffer` \| `ArrayBuffer` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `chunks` | `SharedArrayBuffer`[] |
| `column` | `SharedArrayBuffer` |

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts:58](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts#L58)

___

### deSerializeRegion

▸ **deSerializeRegion**(`regionBuffers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `regionBuffers` | `ArrayBuffer`[] \| `SharedArrayBuffer`[] |

#### Returns

`void`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts:52](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts#L52)

___

### serializeColumn

▸ **serializeColumn**(`location`): ``false`` \| `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

``false`` \| `Uint8Array`

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts:35](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts#L35)

___

### serializeRegion

▸ **serializeRegion**(`location`): ``false`` \| [location: LocationData, buffer: ArrayBuffer][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

``false`` \| [location: LocationData, buffer: ArrayBuffer][]

#### Defined in

[divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/DataLoader/Serializers/WorldDataSerializer.ts#L17)
