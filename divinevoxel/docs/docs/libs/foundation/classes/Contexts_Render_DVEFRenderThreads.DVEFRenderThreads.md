---
id: "Contexts_Render_DVEFRenderThreads.DVEFRenderThreads"
title: "Class: DVEFRenderThreads"
sidebar_label: "DVEFRenderThreads"
custom_edit_url: null
---

[Contexts/Render/DVEFRenderThreads](../modules/Contexts_Render_DVEFRenderThreads.md).DVEFRenderThreads

## Hierarchy

- `RenderThreadManager`

  ↳ **`DVEFRenderThreads`**

## Constructors

### constructor

• **new DVEFRenderThreads**(): [`DVEFRenderThreads`](Contexts_Render_DVEFRenderThreads.DVEFRenderThreads.md)

#### Returns

[`DVEFRenderThreads`](Contexts_Render_DVEFRenderThreads.DVEFRenderThreads.md)

#### Overrides

RenderThreadManager.constructor

#### Defined in

[divinevoxel/foundation/src/Contexts/Render/DVEFRenderThreads.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Render/DVEFRenderThreads.ts#L9)

## Properties

### commMap

• **commMap**: `Map`\<`string`, `CommBase` \| `CommManager`\>

#### Inherited from

RenderThreadManager.commMap

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:9

___

### comms

• **comms**: (`CommBase` \| `CommManager`)[]

#### Inherited from

RenderThreadManager.comms

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:10

___

### construcotrs

• **construcotrs**: `CommManager`

#### Inherited from

RenderThreadManager.construcotrs

#### Defined in

divinevoxel/core/dist/Interfaces/Render/Threads/RenderThreads.d.ts:4

___

### dataLoader

• **dataLoader**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Contexts/Render/DVEFRenderThreads.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Render/DVEFRenderThreads.ts#L7)

___

### nexus

• **nexus**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Contexts/Render/DVEFRenderThreads.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Render/DVEFRenderThreads.ts#L5)

___

### parent

• **parent**: `CommBase`

#### Inherited from

RenderThreadManager.parent

#### Defined in

divinevoxel/core/dist/Interfaces/Render/Threads/RenderThreads.d.ts:5

___

### pipelines

• **pipelines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `init` | `AsyncPipeline`\<`ThreadManager`\> |
| `setPorts` | `AsyncPipeline`\<`ThreadManager`\> |

#### Inherited from

RenderThreadManager.pipelines

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:5

___

### richWorld

• **richWorld**: `CommBase`

#### Defined in

[divinevoxel/foundation/src/Contexts/Render/DVEFRenderThreads.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Render/DVEFRenderThreads.ts#L6)

___

### state

• **state**: `any`

#### Inherited from

RenderThreadManager.state

#### Defined in

divinevoxel/core/dist/Interfaces/Render/Threads/RenderThreads.d.ts:3

___

### world

• **world**: `CommBase`

#### Inherited from

RenderThreadManager.world

#### Defined in

divinevoxel/core/dist/Interfaces/Render/Threads/RenderThreads.d.ts:6

## Methods

### addComm

▸ **addComm**(`comm`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comm` | `CommBase` \| `CommManager` |

#### Returns

`void`

#### Inherited from

RenderThreadManager.addComm

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:14

___

### getComm

▸ **getComm**(`id`): `CommBase` \| `CommManager`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`CommBase` \| `CommManager`

#### Inherited from

RenderThreadManager.getComm

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:15

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

RenderThreadManager.init

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:12

___

### setCommPort

▸ **setCommPort**(`id`, `ports`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `ports` | `CommPortTypes` \| `CommPortTypes`[] |

#### Returns

`void`

#### Inherited from

RenderThreadManager.setCommPort

#### Defined in

divinevoxel/core/dist/Interfaces/Classes/ThreadManager.d.ts:13
