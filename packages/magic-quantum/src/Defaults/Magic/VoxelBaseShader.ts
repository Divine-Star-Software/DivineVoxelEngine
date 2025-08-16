export class VoxelBaseShader {
  static define = /*wgsl */ `
const EPSILON = 0.001;
const EmptyVoxel = 50.;
const AA = 1;
const ZERO = 0;
const iResolution = vec2<f32>(1920.0, 1080.0);
struct VoxelData {
    data: array<u32>
};
struct VoxelLookUp {
    distance: array<f32>
};
struct VoxelMaterials {
 
    color: vec4<f32>,
    /*
    x -> roughness
    y -> metallic
    z -> emissive
    w -> voxel size
    */
    material: vec4<f32>,
};  
struct VoxelParameters {
    /*
    x -> maxDistacne
    y -> elpision
    */
    scene: vec4<f32>,
    /*
    x -> gridSize x
    y -> gridSize y
    z -> gridSize z
    w -> voxel size
    */
    grid: vec4<f32>,
};  
    `;

  static functions = (code: string) => /*wgsl*/ `


fn checkersGradBox(p: vec2<f32>, dpdx: vec2<f32>, dpdy: vec2<f32>) -> f32 {
let w: vec2<f32> = abs(dpdx) + abs(dpdy) + 0.001;
let i: vec2<f32> = 2.0 * (abs(fract((p - 0.5 * w) * 0.5) - 0.5) - abs(fract((p + 0.5 * w) * 0.5) - 0.5)) / w;
return 0.5 - 0.5 * i.x * i.y;
}

fn withinBounds(point: vec3<f32>) -> bool {
return all(point >= vec3<f32>(0.0, 0.0, 0.0)) && all(point < vec3<f32>(voxelParams.grid.xyz  * voxelParams.grid.w));
}

fn getIndex(p: vec3<f32>) -> u32 {
let voxPosition = p / voxelParams.grid.w;
return u32(voxPosition.x) +
u32(voxPosition.y) * u32(voxelParams.grid.x) +
u32(voxPosition.z) * u32(voxelParams.grid.x) * u32(voxelParams.grid.y);
}

/*
Voxel Query
---
res.x -> Voxel id or -1
res.y -> Voxel material id 
*/
fn voxelQuery(p:vec3<f32>) -> vec2<f32>{
if (withinBounds(p)) {

    let voxelIndex: u32 = getIndex(p);
    let voxelValue: u32 = voxelGrid.data[voxelIndex];
    
    if (voxelValue > 0) {
        return vec2(f32(voxelValue),1.);
    }
    }

    return vec2<f32>(-1.,0.);
}
fn isVoxelEmpty(p:vec3<f32>) -> bool {
    if (withinBounds(p)) {
        let voxelIndex: u32 = getIndex(p);
        let voxelValue: u32 = voxelGrid.data[voxelIndex];

        if (voxelValue > 0) {
            return true;
        }
    }

    return false;
}


fn intersectVoxelCheck(rayOrigin: vec3<f32>,rayDirection: vec3<f32>, box_min: vec3<f32>, box_max: vec3<f32>) -> vec2<f32> {
    let inv_dir: vec3<f32> = 1.0 / rayDirection;
    let t_min_tmp: vec3<f32> = (box_min - rayOrigin) * inv_dir;
    let t_max_tmp: vec3<f32> = (box_max - rayOrigin) * inv_dir;
    let t_min: vec3<f32> = min(t_min_tmp, t_max_tmp);
    let t_max: vec3<f32> = max(t_min_tmp, t_max_tmp);
    let t0: f32 = max(max(t_min.x, t_min.y), t_min.z);
    let t1: f32 = min(min(t_max.x, t_max.y), t_max.z);
    if (t1 >= max(t0, 0.0)) {
        return vec2<f32>(t0, t1);
    }
    return vec2<f32>(-1.0, -1.0); // No intersection
}

fn calcSoftshadow(ro: vec3<f32>, rd: vec3<f32>, mint: f32, tmax: f32) -> f32 {
    var local_tmax = tmax; 
    var tp: f32 = (0.8 - ro.y) / rd.y;
    if tp > 0.0 {
        local_tmax = min(local_tmax, tp);
    }
    
    var res: f32 = 1.0;
    var t: f32 = mint;
    for( var i = ZERO; i < 24; i++) {
        let h: f32 = map(ro + rd * t).x;
        let s: f32 = clamp(8.0 * h / t, 0.0, 1.0);
        res = min(res, s);
        t += clamp(h, 0.01, 0.2);
        if res < 0.004 || t > local_tmax {
            break;
        }
    }
    res = clamp(res, 0.0, 1.0);
    return res * res * (3.0 - 2.0 * res);
    }
// https://iquilezles.org/articles/normalsSDF
fn calcNormal(pos: vec3<f32>) -> vec3<f32> {
    var n: vec3<f32> = vec3<f32>(0.0);
    for( var i = ZERO; i < 4; i++ ){
        let e: vec3<f32> = 0.5773 * (2.0 * vec3<f32>(
            f32(((i + 3) >> 1) & 1), 
            f32((i >> 1) & 1), 
            f32(i & 1)
        ) - 1.0);
        n += e * map(pos + 0.0005 * e).x;
    }
    return normalize(n);
    }
// https://iquilezles.org/articles/nvscene2008/rwwtt.pdf
fn calcAO(pos: vec3<f32>, nor: vec3<f32>) -> f32 {
    var occ: f32 = 0.0;
    var sca: f32 = 1.0;
    for( var i = ZERO; i < 5; i++) {
        let h: f32 = 0.01 + 0.12 * f32(i) / 4.0;
        let d: f32 = map(pos + h * nor).x;
        occ += (h - d) * sca;
        sca *= 0.95;
        if occ > 0.35 {
            break;
        }
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
    }
    

    
fn voxelNormal(p: vec3<f32>) -> vec3<f32> {
    let h = .000001;
    let k = vec2<f32>(1.,-1.);
    return normalize(k.xyy*map(p + k.xyy*h).x +
                     k.yyx*map(p + k.yyx*h).x +
                     k.yxy*map(p + k.yxy*h).x +
                     k.xxx*map(p + k.xxx*h).x ) ;
}
    


    ${code}
    
    fn setCamera(rayOrigin: vec3<f32>, cameraTarget: vec3<f32>, cameraRoll: f32) -> mat3x3<f32> {
        // Calculate the forward direction from the origin to the target.
        let cameraForward = normalize(cameraTarget - rayOrigin);
        // Construct a roll rotation vector.
        let cameraPlane = vec3<f32>(sin(cameraRoll), cos(cameraRoll), 0.0);
        // Compute the up direction of the camera.
        let cameraUp = normalize(cross(cameraForward, cameraPlane));
        // Calculate the right direction of the camera.
        let cameraRight = cross(cameraUp, cameraForward);
        // Return the camera orientation matrix.
        return mat3x3<f32>(cameraUp, cameraRight, cameraForward);
    }
    
    
    fn mainFragment(fragCoord: vec2<f32>) -> vec4<f32>
    {
    
        // Define the camera's target and position relative to the target.
        let cameraTarget = vec3<f32>( vec3<f32>(f32(voxelParams.grid.x  * voxelParams.grid.w)/2.,5.,0.) );
    
        let rayOrigin =  vec3<f32>(f32(voxelParams.grid.x  * voxelParams.grid.w)/2 - 10. ,10.,-20. );
        // Get camera-to-world transformation matrix.
        let cameraToWorld = setCamera(rayOrigin, cameraTarget, 0.0);
    
        var totalColor = vec3<f32>(0.0);
    
        let box_min: vec3<f32> = vec3<f32>(-10.0, -10.0, -10.0);
        let box_max: vec3<f32> = vec3<f32>(10.0, 10.0, 10.0);
        
        // Anti-aliasing loops.
        for (var m = 0; m < AA; m++) {
            for (var n = 0; n < AA; n++) {
                // Calculate sub-pixel offsets for anti-aliasing.
                let pixelOffset = vec2<f32>(f32(m), f32(n)) / f32(AA) - 0.5;
                let pixelCoord = (2.0 * (fragCoord + pixelOffset) - iResolution.xy) / iResolution.y;
    
                // Define focal length for perspective projection.
                let focalLength = 2.5;
                // Calculate the ray direction using the camera matrix.
                let rayDirection = cameraToWorld * normalize(vec3<f32>(pixelCoord, focalLength));
    
             
                // Calculate ray differentials for texture filtering or LOD.
                let pixelX = (2.0 * (fragCoord + vec2<f32>(1.0, 0.0)) - iResolution.xy) / iResolution.y;
                let pixelY = (2.0 * (fragCoord + vec2<f32>(0.0, 1.0)) - iResolution.xy) / iResolution.y;
                let rayDirectionX = cameraToWorld * normalize(vec3<f32>(pixelX, focalLength));
                let rayDirectionY = cameraToWorld * normalize(vec3<f32>(pixelY, focalLength));
    
                // Render the scene using the calculated ray.
                var color = render(rayOrigin, rayDirection, rayDirectionX, rayDirectionY);
    
                // Apply gamma correction.
                color = pow(color, vec3<f32>(0.4545));
    
                // Accumulate color contributions from each sub-pixel.
                totalColor += color;
            }
        }
    
        // Normalize color by the number of samples taken.
        totalColor /= f32(AA * AA);
    
        // Return the color with full opacity.
        return vec4<f32>(totalColor, 1.0);
    }
    
        
    
    `;
}
