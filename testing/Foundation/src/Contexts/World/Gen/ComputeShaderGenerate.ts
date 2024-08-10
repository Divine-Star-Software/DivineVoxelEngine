import { DivineVoxelEngineWorld } from "@divinevoxel/core/Contexts/World";
import { VoxelPalette } from "@divinevoxel/core/Data/Voxel/VoxelPalette";
import { GPUWorldGen } from "./Compute/DVEWorldCompute";
export async function ComputeShaderGenerate() {
  const DVEW = DivineVoxelEngineWorld.instance;
  const gpuGen = new GPUWorldGen();
  await gpuGen.init();
  const t1 = performance.now();
  await gpuGen.generate({
    start: [-128, 0, -128],
    code: /* rust */ `
//put code here      
let minY: f32 = 10;

var chunk_type: f32 = 1;
if(column_position.x % 2 == 1 || column_position.z % 2 == 1) {
  chunk_type = 0;
}

let offset = vec3f(-10000,0,10000 - 64);
let height: f32 = 110;

for (var x = column_position.x; x < column_position.x + voxel_world.column_size.x; x += 1.) {
  for (var z = column_position.z; z < column_position.z + voxel_world.column_size.z; z += 1.) {
    for (var y = 0.; y < voxel_world.column_size.y; y += 1.) {

        if(y > 120) {
          continue;
        }
        var place_voxel : bool = false;
        var r = perlin_noise_3d(vec3f((x + offset.x) / 20 ,(y + offset.y) / 20,(z + offset.z) / 20)) * .2;

        if(y > 30) {
          var n = perlin_noise_3d(vec3f((x + offset.x) / 100 ,(y + offset.y) / 100,(z + offset.z) / 100)) * (50 + height);
          if((r > .1 && r < .8) && y <= n) {
            place_voxel = true;
          }
        }
  
        if(y <= 30){
          var n = perlin_noise_3d(vec3f((x + offset.x) / 50 ,(y + offset.y) / 100,(z + offset.z) / 200)) * 50;
          if((r > .1 && r < .8) || y <= n) {
            place_voxel = true;
          }
        }
        if(y == 0) {
          place_voxel = true;
        }
  
        if(place_voxel && y <= 40) {
          set_voxel(
              vec3(x,y,z),
              Voxel(
                ${VoxelPalette.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
              )
            );
        }
        if(place_voxel && y > 40) {
          if(perlin_noise_3d(vec3f(x,y,z)) < .5) {
          set_voxel(
              vec3(x,y,z),
              Voxel(
                ${VoxelPalette.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
              )
            );
           } else {
            set_voxel(
              vec3(x,y,z),
              Voxel(
                ${VoxelPalette.id.numberFromString("dve_dream_lamp")},
                0,
                Light(0,15,0,15),
                State(0,0,0)
              )
            );
           }
        }
        if( y < 40 && !place_voxel) {
          set_voxel(
              vec3(x,y,z),
              Voxel(
                ${VoxelPalette.id.numberFromString(
                  "dve_liquid_dream_ether"
                )},
                0,
                Light(0,0,0,0),
                State(0,0,0)
              )
            );
        }

    }
  }
}
`,
  });
  console.log("GEN IS DONE", performance.now() - t1);

}
