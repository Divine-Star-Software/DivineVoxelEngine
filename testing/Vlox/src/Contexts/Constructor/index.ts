import { StartContrusctor } from "@divinevoxel/vlox/Init/StartConstructor";
import { GetLightDebugBox } from "./Voxels/LightDebugBox";
import { GetMarkerBox } from "./Voxels/MarkerBox";
import { GetDreamEther } from "./Voxels/LiquidDreamEther";
import { Flat3DIndex } from "@amodx/math";
import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
import { DVEMesher } from "@divinevoxel/vlox/Mesher/Mesher";
import { DataTool } from "@divinevoxel/vlox/Tools/Data/DataTool";
const defaults = DVEMesher.defaults;
await StartContrusctor({
  mesherData: {
    constructors: [
/*       GetLightDebugBox(),
      GetMarkerBox(),
      GetDreamEther(),

      defaults.liquid.simple("dve_liquid_dread_ether", [
        ["#dve_voxel", "dve_liquid_dread_ether", "still-1"],
        ["#dve_voxel", "dve_liquid_dread_ether", "still-1"],
      ]),

 */
    ],
  },
});
