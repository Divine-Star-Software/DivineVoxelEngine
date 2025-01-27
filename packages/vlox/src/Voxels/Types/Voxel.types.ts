import { TextureId } from "../../Textures/index";
import { VoxelModelConstructorData } from "../../Models/VoxelModel.types";

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
        source: TextureId | string;
      }
    | {
        type: "model";
        state?: string;
        mod?: string;
      };
};

export class PaintVoxelData {
  static Create(data: Partial<PaintVoxelData>) {
    return new PaintVoxelData(
      data.id,
      data.mod,
      data.shapeState,
      data.level,
      data.levelState,
      data.secondaryVoxelId
    );
  }
  private constructor(
    public id: string = "dve_air",
    public mod: number = 0,
    public shapeState: number = 0,
    public level: number = 0,
    public levelState: number = 0,
    public secondaryVoxelId: string = "dve_air"
  ) {}
}

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

export enum VoxelStructIds {
  substance = "dve_substance",
  renderedMaterial = "dve_rendered_material",
  voxelMaterial = "dve_voxel_material",
  hardness = "dve_hardness",
  colliderID = "dve_collider_id",
  checkCollisions = "dve_check_collisions",
  isLightSource = "dve_is_light_source",
  noAO = "dve_no_ao",
  isTransparent = "dve_is_transparent",
  lightValue = "dve_light_value",
  isRich = "dve_is_rich",
  canHaveSecondary = "dve_can_have_secondary",
}

interface VoxelProperties {
  [key: string]: any;
  /** The material used to render the voxel. Used by the engine to assign meshes to the proper material. */
  [VoxelStructIds.renderedMaterial]?: string;

  /** A description of the material used for the voxel. Not used by the engine directly. */
  [VoxelStructIds.voxelMaterial]?: string;

  /** Specifies the substance of the voxel.
   * The voxel will inherit properties from the substance and change how it acts in the world.
   * Properties include being solid or liquid.
   * */
  [VoxelStructIds.substance]?: string;

  /** Indicates whether the voxel is a light source. */
  [VoxelStructIds.isLightSource]?: boolean;

  /** Indicates if the voxel lets light through */
  [VoxelStructIds.isTransparent]?: boolean;

  /** Disables ambient occlusion for this voxel if set to true. */
  [VoxelStructIds.noAO]?: boolean;

  /** Defines the light value emitted by the voxel (r, g, z). */
  [VoxelStructIds.lightValue]?: [r: number, g: number, z: number];

  /** The collider ID for the voxel, used for collision detection. */
  [VoxelStructIds.colliderID]?: string;

  /** Specifies if the voxel participates in collision checks. */
  [VoxelStructIds.checkCollisions]?: boolean;

  /** Indicates if the voxel can have a secondary voxel. */
  [VoxelStructIds.canHaveSecondary]?: boolean;

  /** The hardness level of the voxel, affecting how it is broken or interacted with. */
  [VoxelStructIds.hardness]?: number;

  /** Marks the voxel as "rich" for specialized interactions or rendering. */
  [VoxelStructIds.isRich]?: boolean;

  /** Named states associated with the voxel. */
  dve_named_states?: VoxelNamedStateData[];

  /** Model data used to construct the voxel's appearance. */
  dve_model_data?: VoxelModelConstructorData;
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
