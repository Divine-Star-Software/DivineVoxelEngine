---
id: "Default_Tools_Loader_LoaderRegister"
title: "Module: Default/Tools/Loader/LoaderRegister"
sidebar_label: "Default/Tools/Loader/LoaderRegister"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### LoaderRegister

• `Const` **LoaderRegister**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dataComm` | `CommBase` |
| `load` | [`UtilMap`](../classes/Util_UtilMap.UtilMap.md)\<`string`, `Function`[]\> |
| `$INIT` | (`dataComm`: `CommBase`) => `void` |
| `addToLoad` | (`location`: `LocationData`, `run`: `Function`) => `undefined` \| `number` |
| `runLoad` | (`location`: `LocationData`, `data`: `any`) => `undefined` \| ``false`` |

#### Defined in

[divinevoxel/foundation/src/Default/Tools/Loader/LoaderRegister.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Tools/Loader/LoaderRegister.ts#L5)
