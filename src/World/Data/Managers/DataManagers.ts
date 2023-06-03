import type { SubstanceData } from "../../../Meta/Data/Substances/Substances.types";
import type { VoxelData } from "../../../Meta/Data/Voxels/Voxel.types";
import { RegisterDataManager } from "../Classes/RegisterDataManager.js";

export const VoxelManager = new RegisterDataManager<VoxelData>();
export const SubstanceManager = new RegisterDataManager<SubstanceData>();

SubstanceManager.registerData([
 {
  id: "#dve_solid",
  tags: [
   ["#dve_parent_substance", "#dve_solid"],
   ["#dve_rendered_substance", "#dve_solid"],
   ["#dve_is_solid", true],
   ["#dve_is_liquid", false],
   ["#dve_flow_rate", 0],
   ["#dve_culled_substances", ["#dve_solid"]],
  ],
 },
 {
  id: "#dve_transparent",
  tags: [
   ["#dve_parent_substance", "#dve_solid"],
   ["#dve_rendered_substance", "#dve_solid"],
   ["#dve_is_solid", true],
   ["#dve_is_liquid", false],
   ["#dve_flow_rate", 0],
   ["#dve_culled_substances", ["#dve_transparent"]],
  ],
 },
 {
  id: "#dve_flora",
  tags: [
   ["#dve_parent_substance", "#dve_flora"],
   ["#dve_rendered_substance", "#dve_flora"],
   ["#dve_is_solid", true],
   ["#dve_is_liquid", false],
   ["#dve_flow_rate", 0],
   ["#dve_culled_substances", []],
  ],
 },
 {
  id: "#dve_liquid",
  tags: [
   ["#dve_parent_substance", "#dve_liquid"],
   ["#dve_rendered_substance", "#dve_liquid"],
   ["#dve_is_solid", false],
   ["#dve_is_liquid", true],
   ["#dve_flow_rate", 1],
   ["#dve_culled_substances", ["#dve_liquid", "#dve_solid"]],
  ],
 },
 {
  id: "#dve_magma",
  tags: [
   ["#dve_parent_substance", "#dve_liquid"],
   ["#dve_rendered_substance", "#dve_liquid"],
   ["#dve_is_solid", false],
   ["#dve_is_liquid", true],
   ["#dve_flow_rate", 3],
   ["#dve_culled_substances", ["#dve_liquid", "#dve_solid"]],
  ],
 },
]);
