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
            top: ["#dve_solid", "debug", "top"],
            bottom: ["#dve_solid", "debug", "bottom"],
            north: ["#dve_solid", "debug", "north"],
            south: ["#dve_solid", "debug", "south"],
            east: ["#dve_solid", "debug", "east"],
            west: ["#dve_solid", "debug", "west"],
        }),
        vm.defaults.box.simple("dve_dataholder", ["#dve_solid", "data-holder", "front"]),
        //dream
        vm.defaults.box.simple("dve_dreamgrassblock", [
            "#dve_flora",
            "dreamgrassblock",
            "grassy-top",
        ]),
        vm.defaults.box.pillar("dve_dreamstonepillar", {
            top: ["#dve_solid", "dreamstone-pillar", "top"],
            bottom: ["#dve_solid", "dreamstone-pillar", "top"],
            sideBottom: ["#dve_solid", "dreamstone-pillar", "side-bottom"],
            sideMiddle: ["#dve_solid", "dreamstone-pillar"],
            sideTop: ["#dve_solid", "dreamstone-pillar", "side-top"],
            sideFloat: ["#dve_solid", "dreamstone-pillar", "top"],
        }),
        vm.defaults.box.pillar("dve_dreamstone", {
            top: ["#dve_solid", "dreamstone", "grassy-top"],
            bottom: ["#dve_solid", "dreamstone"],
            sideBottom: ["#dve_solid", "dreamstone"],
            sideMiddle: ["#dve_solid", "dreamstone"],
            sideTop: ["#dve_solid", "dreamstone", "grassy-side"],
            sideFloat: ["#dve_solid", "dreamstone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dreamlamp", ["#dve_solid", "dreamlamp"]),
        vm.defaults.box.pillar("dve_dreamstoneslab", {
            top: ["#dve_solid", "dreamstone", "grassy-top"],
            bottom: ["#dve_solid", "dreamstone"],
            sideBottom: ["#dve_solid", "dreamstone"],
            sideMiddle: ["#dve_solid", "dreamstone"],
            sideTop: ["#dve_solid", "dreamstone", "grassy-side"],
            sideFloat: ["#dve_solid", "dreamstone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dream-log", ["#dve_solid", "dream-log"]),
        vm.defaults.box.simple("dve_dreamstone-stair", ["#dve_solid", "dreamstone"]),
        vm.defaults.panel.simple("dve_dreamgrass", ["#dve_flora", "dreamgrass"]),
        vm.defaults.panel.simple("dve_dreamvine", ["#dve_flora", "dream-vine"]),
        vm.defaults.box.simple("dve_dream-leafs", ["#dve_flora", "dream-leafs"]),
        //dread
        vm.defaults.box.pillar("dve_dreadstonepillar", {
            top: ["#dve_solid", "dreadstone-pillar", "top"],
            bottom: ["#dve_solid", "dreadstone-pillar", "top"],
            sideBottom: ["#dve_solid", "dreadstone-pillar", "side-bottom"],
            sideMiddle: ["#dve_solid", "dreadstone-pillar"],
            sideTop: ["#dve_solid", "dreadstone-pillar", "side-top"],
            sideFloat: ["#dve_solid", "dreadstone-pillar", "top"],
        }),
        vm.defaults.box.pillar("dve_dreadstone", {
            top: ["#dve_solid", "dreadstone", "grassy-top"],
            bottom: ["#dve_solid", "dreadstone"],
            sideBottom: ["#dve_solid", "dreadstone"],
            sideMiddle: ["#dve_solid", "dreadstone"],
            sideTop: ["#dve_solid", "dreadstone", "grassy-side"],
            sideFloat: ["#dve_solid", "dreadstone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dreadlamp", ["#dve_solid", "dreadlamp"]),
        vm.defaults.liquid.simple("dve_liquiddreadether", [
            ["#dve_liquid", "liquid-dread-ether", "still-1"],
            ["#dve_liquid", "liquid-dread-ether", "still-1"],
        ]),
        vm.defaults.panel.simple("dve_dreadgrass", ["#dve_flora", "dreadgrass"]),
    ]);
}
