import { ConstructorTextureData } from "Textures/Constructor.types";
import { VoxelModelConstructorData } from "VoxelModels/VoxelModel.types";

export type VoxelNamedStateData = {
  id: string;
  name?: string;
  state?: string;
  mod?: string;
  properties: {
    [key: string]: any;
  };
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

/**
 * An array representing the raw data of a voxel.
 */
export type RawVoxelData = [
  /**The id of the voxel */
  id: number,
  /**The light of the voxel */
  light: number,
  /**The state of the voxel */
  state: number,
  /**The secondary id of the voxel */
  secondaryId: number,
  /**The mod of the voxel */
  mod: number,
];

interface VoxelProperties {
  [key: string]: any;
  /** The material used to render the voxel. */
  "dve_rendered_material"?: string;

  /** A description of the material used for the voxel. Not used by the engine directly. */
  "dve_voxel_material"?: string;

  /** Specifies the substance of the voxel (e.g., solid, liquid, gas). */
  "dve_substance"?: string;

  /** The shape ID defining how the voxel is rendered or interacts in the world. */
  "dve_shape_id"?: string;

  /** Indicates whether the voxel is a light source. */
  "dve_is_light_source"?: boolean;

  /** Disables ambient occlusion for this voxel if set to true. */
  "dve_no_ao"?: boolean;

  /** Defines the light value emitted by the voxel (r, g, z). */
  "dve_light_value"?: [r: number, g: number, z: number];

  /** The collider ID for the voxel, used for collision detection. */
  "dve_collider_id"?: string;

  /** Specifies if the voxel participates in collision checks. */
  "dve_check_collisions"?: boolean;

  /** Indicates if the voxel can have a secondary voxel. */
  "dve_can_have_secondary"?: boolean;

  /** The hardness level of the voxel, affecting how it is broken or interacted with. */
  "dve_hardness"?: number;

  /** Marks the voxel as "rich" for specialized interactions or rendering. */
  "dve_is_rich"?: boolean;

  /** Named states associated with the voxel. */
  "dve_named_states"?: VoxelNamedStateData[];

  /** Model data used to construct the voxel's appearance. */
  "dve_model_data"?: VoxelModelConstructorData;
}

/*
 * A register entry for a voxel.
 */
export interface VoxelData {
  /**The id of the voxel. This should not change and must be unique. Can be used durning runtime to refernce voxels. */
  id: string;
  /**The name of the voxel. This can change but must be unique. Can be used durning runtime to refernce voxels. */
  name?: string;
  /**The title of the voxel. This can change and does not have to be unique. Cannot be used to refernce a voxel.  */
  title?: string;
  /**The properties of the voxel. */
  properties: VoxelProperties;
}
