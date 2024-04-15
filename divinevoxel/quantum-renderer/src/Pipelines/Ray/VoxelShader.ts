export class VoxelShader {
  static define = /*wgsl */ `
    
    struct VoxelData {
        data: array<u32> // Assuming voxel IDs are uint
    };
    
    struct VoxelLookup {
        distances: array<u32> // Assuming distances are stored as uint
    };
    
    `;
  static functions = /*wgsl */ `
  const AA = 1;
  const ZERO = 0;
  const iResolution = vec2<f32>(1920.0, 1080.0);

  fn mincomp(v: vec3<f32>) -> f32 {
    return min(min(v.x, v.y), v.z);
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

  struct Params {
    maxDistToCheck: f32,
    voxelGridSize: vec3<f32>,
    gridDimensions: vec3<u32>,
    epsilon: f32
};  
const EPSILON = 0.001;
const EmptyVoxel = 50.;
const defaultParams = Params(
    1000.0,
    vec3<f32>(1.,1.,1.),
 vec3<u32>(120,60,120), // Default grid dimensions
 .01
);
const maxBounds: vec3<f32> = vec3<f32>(
    f32(defaultParams.gridDimensions.x) * defaultParams.voxelGridSize.x,
    f32(defaultParams.gridDimensions.y) * defaultParams.voxelGridSize.y,
    f32(defaultParams.gridDimensions.z) * defaultParams.voxelGridSize.z
);

fn withinBounds(point: vec3<f32>) -> bool {
    return all(point >= vec3<f32>(0.0, 0.0, 0.0)) && all(point < maxBounds);
}

fn getIndex(p: vec3<f32>) -> u32 {
  return u32(p.x * defaultParams.voxelGridSize.x) +
    u32(p.y * defaultParams.voxelGridSize.y) * defaultParams.gridDimensions.x +
    u32(p.z * defaultParams.voxelGridSize.z) * defaultParams.gridDimensions.x * defaultParams.gridDimensions.y;
}
const boundsMin: vec3<f32> = vec3<f32>(0.,0.,0.);
const boundsMax: vec3<f32> = vec3<f32>(128.,60.,128,);
fn voxelCast(rayOrigin: vec3<f32>, rayDirection: vec3<f32>) -> vec2<f32> {
    var t: f32 = 0.0;
    var res: vec2<f32> = vec2<f32>(0., -1.);
    let gridSize: f32 = defaultParams.voxelGridSize.x;
    let invDir: vec3<f32> = 1.0 / rayDirection; // Inverse direction to handle division by zero
    let interSectionCheck: vec2<f32> = intersectVoxelCheck(rayOrigin,rayDirection, boundsMin, boundsMax);
    
    if(interSectionCheck.x > 0) {
        t =  interSectionCheck.x;
    }



    loop {
        if (t > defaultParams.maxDistToCheck +  interSectionCheck.x ) {
            break;
        }
        
        let p: vec3<f32> = rayOrigin + t * rayDirection;
        if(p.y < 0.){
            if (rayDirection.y != 0.0) {
                let tFloor: f32 = -rayOrigin.y / rayDirection.y; // Solve for when y component of the ray equals 0
                if (tFloor > 0.0) {
                    res.x = tFloor;
                    res.y = 1.0; // Using 1.0 to denote the floor plane
                    return res;
                }
            }
            return res; // Return with no intersection if direction y is 0 or intersection is behind the ray
        } else if (withinBounds(p)) {

            let voxelIndex: u32 = getIndex(p);
            let voxelValue: u32 = voxelGrid.data[voxelIndex];
   
            if (voxelValue > 0 ) {
                let voxelMin: vec3<f32> = floor(p / gridSize) * gridSize;
                let voxelMax: vec3<f32> = voxelMin + vec3<f32>(gridSize, gridSize, gridSize);
                let tMin: vec3<f32> = (voxelMin - rayOrigin) * invDir;
                let tMax: vec3<f32> = (voxelMax - rayOrigin) * invDir;
                let t1: vec3<f32> = min(tMin, tMax);
                let t2: vec3<f32> = max(tMin, tMax);
                let tEnter: f32 = max(max(t1.x, t1.y), t1.z);
                let tExit: f32 = min(min(t2.x, t2.y), t2.z);
                
                // If \`tEnter\` is less than \`tExit\`, we have an intersection
                if (tEnter < tExit && tEnter < t) {
                    res.x = tEnter;
                    res.y = f32(voxelValue + 1);
                    return res; 
                }
                
                t += defaultParams.epsilon;  
            } else {
                t += defaultParams.epsilon;  
            }
        } else {
            t += defaultParams.epsilon;  
        }
    }
    
    return res;
}
fn sgn( v: vec3<f32>) -> vec3<f32>// WORKAROUND FOR COMPILER ERROR on some systems
{
    return step(vec3(0), v) * 2.0 - 1.0;
}

fn voxelTrace(rayOrigin: vec3<f32>, rayDirection: vec3<f32>) -> vec2<f32>
{
    let gridSize = 1.;
    var res: vec2<f32> = vec2<f32>(0., -1.);
    let interSectionCheck: vec2<f32> = intersectVoxelCheck(rayOrigin,rayDirection, boundsMin, boundsMax);
            
    if(interSectionCheck.x < 0) {
        return res;
    }

    var t = interSectionCheck.x;

    for(var i = 0; i < 200; i++) // finite loop originally suggested by pyBlob to avoid stalling if ray parallel to surface just above EPSILON
    {
        if(t > defaultParams.maxDistToCheck) {  break; }


        let p: vec3<f32> = rayOrigin + t * rayDirection;
        
        var h = map(p);
     
        if(h.x < EPSILON) {
            if(h.y > 0.) {
                res.y = h.y;  
            }
            return res;
        }
        let sd = (sgn(rayDirection)*gridSize/2 - (fract(p) - gridSize/2))/rayDirection; 
        let n = step(sd.xyz, min(sd.yzx, sd.zxy));
        let skip = dot(sd, vec3(n)) + EPSILON; 
        h.x = min(h.x, skip);


        t += h.x;
    }
    res.x = t;
    return res;

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

fn calculateNormalAtIntersection(p: vec3<f32>, rayOrigin: vec3<f32>, rayDirection: vec3<f32>, gridSize: f32) -> vec3<f32> {
    // Calculate the relative position of the intersection point within the voxel.
    let relativePos: vec3<f32> = p % vec3<f32>(gridSize, gridSize, gridSize);

    // Calculate distances from the center of the voxel to the intersection point along each axis.
    let distances: vec3<f32> = abs(relativePos - vec3<f32>(gridSize / 2.0, gridSize / 2.0, gridSize / 2.0));

    // Determine the axis of minimum penetration by finding the smallest distance.
    if (distances.x < distances.y && distances.x < distances.z) {
        return vec3<f32>(-sign(rayDirection.x), 0.0, 0.0);
    } else if (distances.y < distances.z) {
        return vec3<f32>(0.0, -sign(rayDirection.y), 0.0);
    } else {
        return vec3<f32>(0.0, 0.0, -sign(rayDirection.z));
    }
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
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0) * (0.5 + 0.5 * nor.y);
    }
    

    fn checkersGradBox(p: vec2<f32>, dpdx: vec2<f32>, dpdy: vec2<f32>) -> f32 {
        let w: vec2<f32> = abs(dpdx) + abs(dpdy) + 0.001;
        let i: vec2<f32> = 2.0 * (abs(fract((p - 0.5 * w) * 0.5) - 0.5) - abs(fract((p + 0.5 * w) * 0.5) - 0.5)) / w;
        return 0.5 - 0.5 * i.x * i.y;
        }
        
fn render(ro: vec3<f32>, rd: vec3<f32>, rdx: vec3<f32>, rdy: vec3<f32>) -> vec3<f32>  {
    var col: vec3<f32> = vec3<f32>(0.7, 0.7, 0.9) - max(rd.y, 0.0) * 0.3;
    
    let res: vec2<f32> = voxelCast(ro, rd);
    let t: f32 = res.x;
    let m: f32 = res.y;
    let pos: vec3<f32> = ro + t * rd;
    if m > -0. {

    let nor: vec3<f32> = select( calcNormal(pos), vec3<f32>(0.0, 1.0, 0.0) ,    (m < 1.5));

    let refr: vec3<f32> = reflect(rd, nor);

    var ks: f32 = 1.0;
    if(m == 1.) {
    let dpdx: vec3<f32> = ro.y * (rd / rd.y - rdx / rdx.y);
    let dpdy: vec3<f32> = ro.y * (rd / rd.y - rdy / rdy.y);

    let f: f32 = checkersGradBox(3.0 * pos.xz, 3.0 * dpdx.xz, 3.0 * dpdy.xz);
    col = 0.15 + f * vec3<f32>(0.05);
    ks = .4;
    } else {
        col = vec3<f32>(0.,0.,.7);
    }


    let occ: f32 = calcAO(pos, nor);

    var lin: vec3<f32> = vec3<f32>(0.0);


    // sun
    let lig: vec3<f32> = normalize(vec3<f32>(-0.9, 0.4, -0.6));
    let hal: vec3<f32> = normalize(lig - rd);
    var dif: f32 = clamp(dot(nor, lig), 0.0, 1.0);
    dif *= calcSoftshadow(pos, lig, 0.02, 2.5);
    var spe: f32 = pow(clamp(dot(nor, hal), 0.0, 1.0), 16.0);
    spe *= dif;
    spe *= 0.04 + 0.96 * pow(clamp(1.0 - dot(hal, lig), 0.0, 1.0), 5.0);
    lin += col * 2.20 * dif * vec3<f32>(1.30, 1.00, 0.70);
    lin += 5.00 * spe * vec3<f32>(1.30, 1.00, 0.70) * ks;

    // sky
    dif = sqrt(clamp(0.5 + 0.5 * nor.y, 0.0, 1.0));
    dif *= occ;
    spe = smoothstep(-0.2, 0.2, refr.y);
    spe *= dif;
    spe *= 0.04 + 0.96 * pow(clamp(1.0 + dot(nor, rd), 0.0, 1.0), 5.0);
    spe *= calcSoftshadow(pos, refr, 0.02, 2.5);
    lin += col * 0.60 * dif * vec3<f32>(0.40, 0.60, 1.15);
    lin += 2.00 * spe * vec3<f32>(0.40, 0.60, 1.30) * ks;

    // back
    dif = clamp(dot(nor, normalize(vec3<f32>(0.5, 0.0, 0.6))), 0.0, 1.0) * clamp(1.0 - pos.y, 0.0, 1.0);
    dif *= occ;
    lin += col * 0.55 * dif * vec3<f32>(0.25, 0.25, 0.25);

    // sss
    dif = pow(clamp(1.0 + dot(nor, rd), 0.0, 1.0), 2.0);
    dif *= occ;
    lin += col * 0.25 * dif * vec3<f32>(1.00, 1.00, 1.00);

    col = lin;

    //apply fog
    col = mix(col, vec3<f32>(0.7, 0.7, 0.9), 1.0 - exp(-0.000000001 * t * t * t));

    }
 
  
    return clamp(col, vec3<f32>(0.0, 0.0, 0.0), vec3<f32>(1.0, 1.0, 1.0));
}


/*
+X (positive X direction): Red
-X (negative X direction): Green
+Y (positive Y direction): Blue
-Y (negative Y direction): Yellow
+Z (positive Z direction): Purple
-Z (negative Z direction): Orange
*/
fn debugRender(ro: vec3<f32>, rd: vec3<f32>, rdx: vec3<f32>, rdy: vec3<f32>) -> vec3<f32>  {
    var col: vec3<f32> = vec3<f32>(0.7, 0.7, 0.9) - max(rd.y, 0.0) * 0.3;
    
    let res: vec2<f32> = voxelCast(ro, rd);
    let t: f32 = res.x;
    let m: f32 = res.y;
    if m > -0. {
        let pos: vec3<f32> = ro + t * rd;
        let nor: vec3<f32> = voxelNormal(pos);

        if (nor.x == 1.) {
            col = vec3<f32>(1., 0., 0.); // Red for +X
        } else if (nor.x == -1.) {
            col = vec3<f32>(0., 1., 0.); // Green for -X
        }

        if (nor.y == 1.) {
            col = vec3<f32>(0., 0., 1.); // Blue for +Y
        } else if (nor.y == -1.) {
            col = vec3<f32>(1., 1., 0.); // Yellow for -Y
        }

        if (nor.z == 1.) {
            col = vec3<f32>(0.5, 0., 0.5); // Purple for +Z
        } else if (nor.z == -1.) {
            col = vec3<f32>(1., 0.5, 0.); // Orange for -Z
        }
    }

    return clamp(col, vec3<f32>(0.0, 0.0, 0.0), vec3<f32>(1.0, 1.0, 1.0));
}

fn aoRender(ro: vec3<f32>, rd: vec3<f32>, rdx: vec3<f32>, rdy: vec3<f32>) -> vec3<f32>  {
    var col: vec3<f32> = vec3<f32>(0.7, 0.7, 0.9) - max(rd.y, 0.0) * 0.3;
    
    let res: vec2<f32> = voxelCast(ro, rd);
    let t: f32 = res.x;
    let m: f32 = res.y;
    if m > -0. {
        let pos: vec3<f32> = ro + t * rd;
        let nor: vec3<f32> = voxelNormal(pos);
    
        col *= calcAO(pos, nor);

  
    }

    return clamp(col, vec3<f32>(0.0, 0.0, 0.0), vec3<f32>(1.0, 1.0, 1.0));
}



fn sdBox(p: vec3<f32>, b: vec3<f32>) -> f32 {
    let d = abs(p) - b;
    return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, vec3<f32>(0.0, 0.0, 0.0)));
}
fn map(p: vec3<f32>) -> vec2<f32> { // for correct ambient occlusion sample 2x2x2 voxels (slow!)
    // I think kastorp originally suggested to sample only 2x2x2 instead of 3x3x3, thanks!
    var d = EmptyVoxel;
    var s = vec3(step(vec3(0.5), fract(p)));
    var o = vec3<f32>(0);
    var m = 0.;
    for (o.z = s.z - 1; o.z < s.z + 1; o.z = o.z + 1) {
        for (o.y = s.y - 1; o.y < s.y + 1; o.y = o.y + 1) {
            for (o.x = s.x - 1; o.x < s.x + 1; o.x = o.x + 1) {
                let vres = voxelMap(vec3<f32>(floor(p)) + vec3<f32>(o), fract(p) - vec3<f32>(o));
                d = min(d,vres.x );
                if(vres.y > 0.) {
                     m = vres.y;
                }
            }
        }
    }

    return vec2(d,m);
}


fn voxelMap(v : vec3<f32>, l : vec3<f32>) -> vec2<f32> {
    let result = voxelQuery(vec3<f32>(v.xyz));
    if(result.x > 0.) {
        return vec2(sdBox(l-.5, vec3(.5)),result.y);
    }
    return vec2(EmptyVoxel,0.);
}


fn voxelNormal(p: vec3<f32>) -> vec3<f32> {
    let h = EPSILON;
    let k = vec2<f32>(1,-1);
    return normalize(k.xyy*map(p + k.xyy*h).x +
                     k.yyx*map(p + k.yyx*h).x +
                     k.yxy*map(p + k.yxy*h).x +
                     k.xxx*map(p + k.xxx*h).x );
}


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
    let cameraTarget = vec3<f32>( vec3<f32>(f32(defaultParams.gridDimensions.x)/2.,30.,0.) );

    let rayOrigin =  vec3<f32>(f32(defaultParams.gridDimensions.x)/2 + 10.,30.,-90. );
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
