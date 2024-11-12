import { VoxelData } from "../../../../Types/index.js";
import { RegisterDataManager } from "../Classes/RegisterDataManager.js";
import { SubstanceData } from "../../../../Types/Substances.types.js";
import { SubstanceTagIds } from "../../../../Data/Constants/SubstanceTagIds.js";

export const VoxelManager = new RegisterDataManager<VoxelData>();
export const SubstanceManager = new RegisterDataManager<SubstanceData>();

VoxelManager.registerData([
  {
    id: "dve_air",
    tags: [
      ["#dve_substance", "#dve_air"],
      ["#dve_shape_id", "#dve_cube"],
    ],
  },
  {
    id: "dve_barrier",
    tags: [
      ["#dve_substance", "#dve_air"],
      ["#dve_shape_id", "#dve_cube"],
    ],
  },
]);

SubstanceManager.registerData([
  {
    id: "#dve_air",
    tags: [
      [SubstanceTagIds.parent, "#dve_air"],
      [SubstanceTagIds.rendered, "#dve_air"],
      [SubstanceTagIds.isSolid, false],
      [SubstanceTagIds.isLiquid, false],
      [SubstanceTagIds.isTransparent, true],
      [SubstanceTagIds.flowRate, 0],
      [SubstanceTagIds.culledSubstnaces, []],
    ],
  },
  {
    id: "#dve_solid",
    tags: [
      [SubstanceTagIds.parent, "#dve_solid"],
      [SubstanceTagIds.rendered, "#dve_solid"],
      [SubstanceTagIds.isSolid, true],
      [SubstanceTagIds.isLiquid, false],
      [SubstanceTagIds.isTransparent, false],
      [SubstanceTagIds.flowRate, 0],
      [SubstanceTagIds.culledSubstnaces, ["#dve_solid"]],
    ],
  },
  {
    id: "#dve_glow",
    tags: [
      [SubstanceTagIds.parent, "#dve_solid"],
      [SubstanceTagIds.rendered, "#dve_glow"],
      [SubstanceTagIds.isSolid, true],
      [SubstanceTagIds.isLiquid, false],
      [SubstanceTagIds.isTransparent, false],
      [SubstanceTagIds.flowRate, 0],
      [SubstanceTagIds.culledSubstnaces, ["#dve_solid"]],
    ],
  },
  {
    id: "#dve_translucent",
    tags: [
      [SubstanceTagIds.parent, "#dve_flora"],
      [SubstanceTagIds.rendered, "#dve_solid"],
      [SubstanceTagIds.isSolid, true],
      [SubstanceTagIds.isLiquid, false],
      [SubstanceTagIds.isTransparent, true],
      [SubstanceTagIds.flowRate, 0],
      [SubstanceTagIds.culledSubstnaces, []],
    ],
  },
  {
    id: "#dve_transparent",
    tags: [
      [SubstanceTagIds.parent, "#dve_transparent"],
      [SubstanceTagIds.rendered, "#dve_transparent"],
      [SubstanceTagIds.isSolid, true],
      [SubstanceTagIds.isLiquid, false],
      [SubstanceTagIds.isTransparent, true],
      [SubstanceTagIds.flowRate, 0],
      [SubstanceTagIds.culledSubstnaces, ["#dve_transparent"]],
    ],
  },
  {
    id: "#dve_flora",
    tags: [
      [SubstanceTagIds.parent, "#dve_flora"],
      [SubstanceTagIds.rendered, "#dve_flora"],
      [SubstanceTagIds.isSolid, true],
      [SubstanceTagIds.isLiquid, false],
      [SubstanceTagIds.isTransparent, true],
      [SubstanceTagIds.flowRate, 0],
      [SubstanceTagIds.culledSubstnaces, []],
      [SubstanceTagIds.cullDense, true],
      [SubstanceTagIds.isWindAffected, true],
      [SubstanceTagIds.isBackFaceCulled, false],
    ],
  },
  {
    id: "#dve_liquid",
    tags: [
      [SubstanceTagIds.parent, "#dve_liquid"],
      [SubstanceTagIds.rendered, "#dve_liquid"],
      [SubstanceTagIds.isSolid, false],
      [SubstanceTagIds.isLiquid, true],
      [SubstanceTagIds.isTransparent, true],
      [SubstanceTagIds.flowRate, 1],
      [
        SubstanceTagIds.culledSubstnaces,
        ["#dve_liquid", "#dve_solid", "#dve_glow"],
      ],
      [SubstanceTagIds.isBackFaceCulled, false],
    ],
  },
  {
    id: "#dve_magma",
    tags: [
      [SubstanceTagIds.parent, "#dve_liquid"],
      [SubstanceTagIds.rendered, "#dve_liquid"],
      [SubstanceTagIds.isSolid, false],
      [SubstanceTagIds.isLiquid, true],
      [SubstanceTagIds.isTransparent, false],
      [SubstanceTagIds.flowRate, 3],
      [SubstanceTagIds.culledSubstnaces, ["#dve_liquid", "#dve_solid"]],
      [SubstanceTagIds.isBackFaceCulled, false],
    ],
  },
]);
