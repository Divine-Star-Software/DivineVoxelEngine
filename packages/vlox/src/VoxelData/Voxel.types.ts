import { ConstructorTextureData } from "Textures/Constructor.types";
import { VoxelModelConstructorData } from "VoxelModels/VoxelModel.types";

export type VoxelPalette = string[];
export type VoxelPaletteMap = Record<string, number>;

export type VoxelNamedStateData = {
  id: string;
  name?: string;
  state?: string;
  mod?: string;
  tags: [id: string, data: any][];
  display:
    | {
        type: "texture";
        source: ConstructorTextureData | string;
      }
    | {
        type: "model";
        state?: string;
        mod?: string;
      };
};
/**# Voxel Data
 * ---
 * This the needed information for each voxel.
 */
export interface VoxelData {
  id: string;
  name?: string;
  title?: string;
  tags: (
    | [id: string, value: any]
    | [id: "#dve_substance", value: string]
    | [id: "#dve_shape_id", value: string]
    | [id: "#dve_is_light_source", value: boolean]
    | [id: "#dve_no_ao", value: boolean]
    | [id: "#dve_light_value", value: [r: number, g: number, z: number]]
    | [id: "#dve_collider_id", value: string]
    | [id: "#dve_check_collisions", value: boolean]
    | [id: "#dve_can_have_secondary", value: boolean]
    | [id: "#dve_material", value: string]
    | [id: "#dve_hardness", value: number]
    | [id: "#dve_is_rich", value: boolean]
    | [id: "#dve_named_states", value: VoxelNamedStateData[]]
    | [id: "#dve_model_data", value: VoxelModelConstructorData]
  )[];
}
