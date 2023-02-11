/**# Voxel Substance Type
 * ---
 * All solid and "#dve_transparent" voxels are grouped together in the same mesh per chunk.
 * While the the liquid and magma will chunks will have their own seperate meshes per chunk.
 * Transparent voxels will not cause the faces of solid voxels next to them to be culled they also have double sided rendering.
 */
export declare type VoxelSubstanceType = "#dve_solid" | "#dve_transparent" | "#dve_flora" | "#dve_liquid" | "#dve_magma" | string;
/**VoxelT emplateS ubstance Type
 * ---
 * Basically same as Voxel Substance Type but only has the substances which have their own generated mesh.
 */
export declare type VoxelTemplateSubstanceType = "#dve_solid" | "#dve_flora" | "#dve_liquid" | "#dve_magma" | string;
/**# Voxel Data
 * ---
 * This the needed information for each voxel.
 */
export declare type VoxelData = {
    id: string;
    states?: number;
    tags: ([id: string, value: string | number | boolean | number[]] | [id: "#dve_substance", value: VoxelSubstanceType] | [id: "#dve_shape_id", value: string] | [id: "#dve_is_light_source", value: boolean] | [id: "#dve_light_value", value: [r: number, g: number, z: number]] | [id: "#dve_collider_id", value: string] | [id: "#dve_check_collisions", value: boolean] | [id: "#dve_material", value: string] | [id: "#dve_hardness", value: number] | [id: "#dve_is_rich", value: boolean])[];
};
export declare type RawVoxelData = [
    id: number,
    light: number,
    state: number,
    secondaryId: number
];
