# Research

Making this voxel engine took a lot of time and research.
I want to post some of my sources and own thoughts.

## Original Inspiration

[SimonDev: I made an EVEN BETTER Minecraft](https://www.youtube.com/watch?v=MQt0exToUEY)

## Lighting

- [Reddit: Fast Flood Fill In A Voxel Game: Part 1](https://www.reddit.com/r/gamedev/comments/2iru8i/fast_flood_fill_lighting_in_a_blocky_voxel_game/)
- [Reddit: Fast Flood Fill In A Voxel Game: Part 2](https://www.reddit.com/r/gamedev/comments/2k7gxt/fast_flood_fill_lighting_in_a_blocky_voxel_game/)
- [0 FPS: Voxel Lighting](https://0fps.net/2018/02/21/voxel-lighting/)
- [0 FPS: Voxel AO](https://0fps.net/2013/07/03/ambient-occlusion-for-minecraft-like-worlds/)
- [Stack Exchange: How can I implement lighting in a voxel engine?](https://gamedev.stackexchange.com/questions/21245/how-can-i-implement-lighting-in-a-voxel-engine)
- [Stack Exchange: How can I implement voxel-based lighting with occlusion in a Minecraft-style game?](https://gamedev.stackexchange.com/questions/19207/how-can-i-implement-voxel-based-lighting-with-occlusion-in-a-minecraft-style-gam)
- [Stack Exchange: Minecraft-Style Voxel Sunlight Algorithm](https://gamedev.stackexchange.com/questions/170011/minecraft-style-voxel-sunlight-algorithm)

## Data Structuring

- [Reddit: What data structure should I use to store an almost infinite voxel world?](https://www.reddit.com/r/gamedev/comments/1gz0p3/what_data_structure_should_i_use_to_store_an/)
- [Reddit: Minecraft style worlds... Best way to store voxel information: Array or Octree?](https://www.reddit.com/r/VoxelGameDev/comments/f8wv5q/minecraft_style_worlds_best_way_to_store_voxel/)
- [Minecraft Wiki: Chunk Format](https://minecraft.fandom.com/wiki/Chunk_format)
- [Minecraft Wiki:  Region File Format](https://minecraft.fandom.com/wiki/Region_file_format)

## Custom Meshing

- [Babylon.Js: Create Custom Meshes From Scratch](https://doc.babylonjs.com/divingDeeper/mesh/creation/custom/custom)
- [Babylon.Js Forum: My question about its limits](https://forum.babylonjs.com/t/voxel-engine-advice-on-performance-have-i-reached-js-babylons-limit/26812)
- [0 FPS: Meshing in a Minecraft Game](https://0fps.net/2012/06/30/meshing-in-a-minecraft-game/)
- [0 FPS: Meshing in a Minecraft Game Part 2](https://0fps.net/2012/07/07/meshing-minecraft-part-2/)

## Texturing

- [Babylon.Js: WebGL suppourt - 2d Texture Arrays](https://doc.babylonjs.com/advanced_topics/webGL2#2d-array-textures)
- [Babylon.Js Forum: My quesiton about UV3 for 2d texture array](https://forum.babylonjs.com/t/uv3-not-working-properly-for-2d-texture-array/25444)

## Interaction

[Stackoverflow: Walk a line between two points in a 3D voxel space visiting all cells](https://stackoverflow.com/questions/16505905/walk-a-line-between-two-points-in-a-3d-voxel-space-visiting-all-cells)

This guy provided the function below. And it is awesome! Positing it here to save it.

```js
function visitAll(gx0, gy0, gz0, gx1, gy1, gz1, visitor) {

    var gx0idx = Math.floor(gx0);
    var gy0idx = Math.floor(gy0);
    var gz0idx = Math.floor(gz0);

    var gx1idx = Math.floor(gx1);
    var gy1idx = Math.floor(gy1);
    var gz1idx = Math.floor(gz1);

    var sx = gx1idx > gx0idx ? 1 : gx1idx < gx0idx ? -1 : 0;
    var sy = gy1idx > gy0idx ? 1 : gy1idx < gy0idx ? -1 : 0;
    var sz = gz1idx > gz0idx ? 1 : gz1idx < gz0idx ? -1 : 0;

    var gx = gx0idx;
    var gy = gy0idx;
    var gz = gz0idx;

    //Planes for each axis that we will next cross
    var gxp = gx0idx + (gx1idx > gx0idx ? 1 : 0);
    var gyp = gy0idx + (gy1idx > gy0idx ? 1 : 0);
    var gzp = gz0idx + (gz1idx > gz0idx ? 1 : 0);

    //Only used for multiplying up the error margins
    var vx = gx1 === gx0 ? 1 : gx1 - gx0;
    var vy = gy1 === gy0 ? 1 : gy1 - gy0;
    var vz = gz1 === gz0 ? 1 : gz1 - gz0;

    //Error is normalized to vx * vy * vz so we only have to multiply up
    var vxvy = vx * vy;
    var vxvz = vx * vz;
    var vyvz = vy * vz;

    //Error from the next plane accumulators, scaled up by vx*vy*vz
    // gx0 + vx * rx === gxp
    // vx * rx === gxp - gx0
    // rx === (gxp - gx0) / vx
    var errx = (gxp - gx0) * vyvz;
    var erry = (gyp - gy0) * vxvz;
    var errz = (gzp - gz0) * vxvy;

    var derrx = sx * vyvz;
    var derry = sy * vxvz;
    var derrz = sz * vxvy;

    do {
        visitor(gx, gy, gz);

        if (gx === gx1idx && gy === gy1idx && gz === gz1idx) break;

        //Which plane do we cross first?
        var xr = Math.abs(errx);
        var yr = Math.abs(erry);
        var zr = Math.abs(errz);

        if (sx !== 0 && (sy === 0 || xr < yr) && (sz === 0 || xr < zr)) {
            gx += sx;
            errx += derrx;
        }
        else if (sy !== 0 && (sz === 0 || yr < zr)) {
            gy += sy;
            erry += derry;
        }
        else if (sz !== 0) {
            gz += sz;
            errz += derrz;
        }

    } while (true);
}
```

# Physics

- [Stack Exchange: Algorithm to see if two voxels are interconnected](https://gamedev.stackexchange.com/questions/50891/algorithm-to-see-if-two-voxels-are-interconnected)
