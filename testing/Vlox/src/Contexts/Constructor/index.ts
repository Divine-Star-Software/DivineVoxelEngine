import { StartContrusctor } from "@divinevoxel/vlox/Init/StartConstructor";
import { DVEMesher } from "@divinevoxel/vlox/Mesher/Mesher";
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
