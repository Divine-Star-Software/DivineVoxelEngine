//voxels
import { GetLightDebugBox } from "../Voxels/LightDebugBox.js";
import { GetMarkerBox } from "../Voxels/MarkerBox.js";
import { GetDreamEther } from "../Voxels/LiquidDreamEther.js";
export function RegisterVoxelsForConstructor(DVEC) {
    GetLightDebugBox(DVEC);
    GetMarkerBox(DVEC);
    GetDreamEther(DVEC);
    const vm = DVEC.voxelManager;
    vm.registerVoxel([
        //debug
        vm.defaults.box.simple("dve_debugbox", {
            top: ["solid", "debug", "top"],
            bottom: ["solid", "debug", "bottom"],
            north: ["solid", "debug", "north"],
            south: ["solid", "debug", "south"],
            east: ["solid", "debug", "east"],
            west: ["solid", "debug", "west"],
        }),
        vm.defaults.box.simple("dve_dataholder", ["solid", "data-holder", "front"]),
        //dream
        vm.defaults.box.simple("dve_dreamgrassblock", [
            "flora",
            "dreamgrassblock",
            "grassy-top",
        ]),
        vm.defaults.box.pillar("dve_dreamstonepillar", {
            top: ["solid", "dreamstone-pillar", "top"],
            bottom: ["solid", "dreamstone-pillar", "top"],
            sideBottom: ["solid", "dreamstone-pillar", "side-bottom"],
            sideMiddle: ["solid", "dreamstone-pillar"],
            sideTop: ["solid", "dreamstone-pillar", "side-top"],
            sideFloat: ["solid", "dreamstone-pillar", "top"],
        }),
        vm.defaults.box.pillar("dve_dreamstone", {
            top: ["solid", "dreamstone", "grassy-top"],
            bottom: ["solid", "dreamstone"],
            sideBottom: ["solid", "dreamstone"],
            sideMiddle: ["solid", "dreamstone"],
            sideTop: ["solid", "dreamstone", "grassy-side"],
            sideFloat: ["solid", "dreamstone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dreamlamp", ["solid", "dreamlamp"]),
        vm.defaults.box.pillar("dve_dreamstoneslab", {
            top: ["solid", "dreamstone", "grassy-top"],
            bottom: ["solid", "dreamstone"],
            sideBottom: ["solid", "dreamstone"],
            sideMiddle: ["solid", "dreamstone"],
            sideTop: ["solid", "dreamstone", "grassy-side"],
            sideFloat: ["solid", "dreamstone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dream-log", ["solid", "dream-log"]),
        vm.defaults.box.simple("dve_dreamstone-stair", ["solid", "dreamstone"]),
        vm.defaults.panel.simple("dve_dreamgrass", ["flora", "dreamgrass"]),
        vm.defaults.panel.simple("dve_dreamvine", ["flora", "dream-vine"]),
        vm.defaults.box.simple("dve_dream-leafs", ["flora", "dream-leafs"]),
        //dread
        vm.defaults.box.pillar("dve_dreadstonepillar", {
            top: ["solid", "dreadstone-pillar", "top"],
            bottom: ["solid", "dreadstone-pillar", "top"],
            sideBottom: ["solid", "dreadstone-pillar", "side-bottom"],
            sideMiddle: ["solid", "dreadstone-pillar"],
            sideTop: ["solid", "dreadstone-pillar", "side-top"],
            sideFloat: ["solid", "dreadstone-pillar", "top"],
        }),
        vm.defaults.box.pillar("dve_dreadstone", {
            top: ["solid", "dreadstone", "grassy-top"],
            bottom: ["solid", "dreadstone"],
            sideBottom: ["solid", "dreadstone"],
            sideMiddle: ["solid", "dreadstone"],
            sideTop: ["solid", "dreadstone", "grassy-side"],
            sideFloat: ["solid", "dreadstone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dreadlamp", ["solid", "dreadlamp"]),
        vm.defaults.liquid.simple("dve_liquiddreadether", [
            ["liquid", "liquid-dread-ether"],
            ["liquid", "liquid-dread-ether"],
        ]),
        vm.defaults.panel.simple("dve_dreadgrass", ["flora", "dreadgrass"]),
    ]);
}
