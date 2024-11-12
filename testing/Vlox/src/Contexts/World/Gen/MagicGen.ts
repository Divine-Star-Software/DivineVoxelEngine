import { VoxParser } from "@divinevoxel/magic/index";
import { AdvancedBrush } from "@divinevoxel/vlox/Tools/Brush/AdvancedBrushTool";
const brush = new AdvancedBrush();

export const MagicGen = {
  async generate() {
    const vox = await (await fetch("/nature.vox")).arrayBuffer();
    console.log("got vox buffer", vox.byteLength);
    const parsed = new VoxParser(vox);
    parsed.parse();
    const { x: sx, y: sy, z: sz } = parsed.size!;
    const {voxelGrid} = parsed.getGPUData();
    for (let z = 0; z < 128; z++) {
      for (let x = 0; x < 128; x++) {
        for (let y = 0; y < 60; y++) {
          const value =  voxelGrid[parsed.getIndex(x,y,z)]
          if(value == 255) {
            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint(); 
          }
        }

      }
    }

/*     console.log("CREATE MAGIC VOXEL SCENE", sx, sy, sz);
    for (const { x, y, z } of parsed.voxels) {
      brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
    } */
  },
};
