---
id: "Default_Builder_Geometry_QuadBuilder"
title: "Module: Default/Builder/Geometry/QuadBuilder"
sidebar_label: "Default/Builder/Geometry/QuadBuilder"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### QuadBuilder

• `Const` **QuadBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultTransform` | [`QuadTransforms`](Default_Builder_Types_Geometry_types.md#quadtransforms) |
| `faceFunctions` | `Record`\<`DirectionNames`, (`origin`: `Position3Matrix`, `tool`: `MesherDataTool`, `transform`: [`QuadTransforms`](Default_Builder_Types_Geometry_types.md#quadtransforms), `flip?`: `boolean`) => `void`\> |
| `height` | `number` |
| `width` | `number` |
| `create` | (`tool`: `MesherDataTool`, `direction`: `DirectionNames`, `origin`: `Position3Matrix`, `dimensions`: [`QuadDimensions`](Default_Builder_Types_Geometry_types.md#quaddimensions), `flip`: `boolean`, `transform?`: [`QuadTransforms`](Default_Builder_Types_Geometry_types.md#quadtransforms)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Geometry/QuadBuilder.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Geometry/QuadBuilder.ts#L6)
