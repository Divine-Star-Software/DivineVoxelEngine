export interface VoxelMaterialProperties {
  [key: string]: any;
  dve_is_transparent?: boolean;
}

export type VoxelMaterialData = {
  id: string;
  properties?: VoxelMaterialProperties;
};
