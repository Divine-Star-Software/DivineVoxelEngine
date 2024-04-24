---
id: "Default_Builder_Tools_OutlinedVoxelTool"
title: "Module: Default/Builder/Tools/OutlinedVoxelTool"
sidebar_label: "Default/Builder/Tools/OutlinedVoxelTool"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### OutlinedVoxelTool

• `Const` **OutlinedVoxelTool**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_currentTexts` | `number`[] |
| `addTo` | \{ `bottom`: (`tool`: [`VoxelMesherDataTool`](../classes/Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)) => `void` ; `east`: (`tool`: [`VoxelMesherDataTool`](../classes/Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)) => `void` ; `north`: (`tool`: [`VoxelMesherDataTool`](../classes/Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)) => `void` ; `south`: (`tool`: [`VoxelMesherDataTool`](../classes/Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)) => `void` ; `top`: (`tool`: [`VoxelMesherDataTool`](../classes/Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)) => `void` ; `west`: (`tool`: [`VoxelMesherDataTool`](../classes/Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)) => `void`  } |
| `addTo.bottom` | [object Object] |
| `addTo.east` | [object Object] |
| `addTo.north` | [object Object] |
| `addTo.south` | [object Object] |
| `addTo.top` | [object Object] |
| `addTo.west` | [object Object] |
| `getOutlineUVs` | (`texture`: [`ConstructorTextureData`](Textures_Constructor_types.md#constructortexturedata), `onRegister`: (`uvs`: `number`[]) => `void`) => `void` |
| `getTexture` | (`direction`: `DirectionNames` \| ``"right"`` \| ``"left"``, `face`: `DirectionNames`, `tool`: [`VoxelMesherDataTool`](../classes/Default_Builder_Tools_VoxelMesherDataTool.VoxelMesherDataTool.md)) => `number` |
| `setCurrentTextures` | (`textures`: `number`[]) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Tools/OutlinedVoxelTool.ts:82](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Tools/OutlinedVoxelTool.ts#L82)
