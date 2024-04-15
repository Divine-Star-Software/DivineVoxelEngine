export class VoxelShader {
    static define = /*wgsl */`
    
    struct VoxelData {
        data: array<u32> // Assuming voxel IDs are uint
    };
    
    struct VoxelLookup {
        distances: array<u32> // Assuming distances are stored as uint
    };
    
    `
  static functions = /*wgsl */ `
  const AA = 2;
  const ZERO = 1;
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

const defaultParams = Params(
    100.0,
    vec3<f32>(1.,1.,1.),
 vec3<u32>(120,60,120), // Default grid dimensions
 .1
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
            
    if(interSectionCheck.x < 0) {
        return res;
    }

    t =  interSectionCheck.x;

    loop {
        if (t > defaultParams.maxDistToCheck) {
            break;
        }
        
        let p: vec3<f32> = rayOrigin + t * rayDirection;
        
        if (withinBounds(p)) {
            let voxelIndex: u32 = getIndex(p);
            let voxelValue: u32 = voxelGrid.data[voxelIndex];
            
            if (voxelValue > 0) {
                // Calculate the voxel's AABB (axis-aligned bounding box) boundaries
                let voxelMin: vec3<f32> = floor(p / gridSize) * gridSize;
                let voxelMax: vec3<f32> = voxelMin + vec3<f32>(gridSize, gridSize, gridSize);
                
                // Find intersection t values for each plane of the AABB
                let tMin: vec3<f32> = (voxelMin - rayOrigin) * invDir;
                let tMax: vec3<f32> = (voxelMax - rayOrigin) * invDir;
                
                // Sort the t values, since invDir could be negative
                let t1: vec3<f32> = min(tMin, tMax);
                let t2: vec3<f32> = max(tMin, tMax);
                
                // Find the largest t at which the ray enters the box and the smallest t at which it exits
                let tEnter: f32 = max(max(t1.x, t1.y), t1.z);
                let tExit: f32 = min(min(t2.x, t2.y), t2.z);
                
                // If \`tEnter\` is less than \`tExit\`, we have an intersection
                if (tEnter < tExit && tEnter < t) {
                    res.x = tEnter;
                    res.y = f32(voxelValue);
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

fn render(ro: vec3<f32>, rd: vec3<f32>, rdx: vec3<f32>, rdy: vec3<f32>) -> vec3<f32>  {
    var col: vec3<f32> = vec3<f32>(0.7, 0.7, 0.9) - max(rd.y, 0.0) * 0.3;
    
    let res: vec2<f32> = voxelCast(ro, rd);
    let t: f32 = res.x;
    let m: f32 = res.y;
    if m > -0. {
        col = vec3<f32>(0.,0.,.7);

        let pos: vec3<f32> = ro + t * rd;
        let nor: vec3<f32> = select( calcNormal(pos), vec3<f32>(0.0, 1.0, 0.0) ,    (m < 1.5));
        
        let refr: vec3<f32> = reflect(rd, nor);
    
        let occ: f32 = calcAO(pos, nor);
        col *= occ;

        var ks: f32 = 1.0;
        var lin: vec3<f32> = vec3<f32>(0.0);

            // sun
    let lig: vec3<f32> = normalize(vec3<f32>(-0.5, 0.4, -0.6));
    let hal: vec3<f32> = normalize(lig - rd);
    var dif: f32 = clamp(dot(nor, lig), 0.0, 1.0);
    dif *= calcSoftshadow(pos, lig, 0.02, 2.5);
    var spe: f32 = pow(clamp(dot(nor, hal), 0.0, 1.0), 16.0);
    spe *= dif;
    spe *= 0.04 + 0.96 * pow(clamp(1.0 - dot(hal, lig), 0.0, 1.0), 5.0);
    lin += col * 2.20 * dif * vec3<f32>(1.30, 1.00, 0.70);
    lin += 5.00 * spe * vec3<f32>(1.30, 1.00, 0.70) * ks;



    col = lin;


    //apply fog
   // col = mix(col, vec3<f32>(0.7, 0.7, 0.9), 1.0 - exp(-0.0001 * t * t * t));



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

fn map(pos: vec3<f32>) -> vec2<f32> {
    let p: vec3<f32> = floor(pos);
    var res: vec2<f32> = vec2<f32>(1.0, -1.0); // Assume we're not within a voxel initially.
    if (withinBounds(p)) {
        let idx: u32 = getIndex(p);
        let voxelValue: u32 = voxelGrid.data[idx];
        if (voxelValue > 0) {
            // Calculate the distance to the closest face of the voxel.
            let d: vec3<f32> = min(pos - p, vec3<f32>(1.0) - (pos - p));
            let minDistToSurface: f32 = mincomp(d); // Get the smallest distance.
            res.x = minDistToSurface;
            res.y = f32(voxelValue); // Store the voxel ID if needed.
        }
    }
    // If outside of a voxel, return a large distance.
    return res;
}


fn voxelNormal(pos: vec3<f32>) -> vec3<f32> {
    // Calculate the local position within the voxel grid
    let localPos: vec3<f32> = fract(pos / defaultParams.voxelGridSize.x);

    // Determine which component of localPos is closest to 0 or 1
    let deltaX: f32 = min(localPos.x, 1.0 - localPos.x);
    let deltaY: f32 = min(localPos.y, 1.0 - localPos.y);
    let deltaZ: f32 = min(localPos.z, 1.0 - localPos.z);

    // Initialize the normal
    var normal: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);

    // Find the smallest delta to determine which face was hit
    if (deltaX < deltaY && deltaX < deltaZ) {
        normal.x = select(  -1.0,1.0 ,  localPos.x < 0.5);
    } else if (deltaY < deltaZ) {
        normal.y = select(  -1.0,1.0,   localPos.y < 0.5);
    } else {
        normal.z = select(  -1.0,1.0 ,  localPos.z < 0.5);
    }

    return normal;
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

    let rayOrigin =  vec3<f32>(f32(defaultParams.gridDimensions.x)/2.,30.,-20. );
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
            let focalLength = .5;

            // Calculate the ray direction using the camera matrix.
            let rayDirection = cameraToWorld * normalize(vec3<f32>(pixelCoord, focalLength));

         
            // Calculate ray differentials for texture filtering or LOD.
            let pixelX = (2.0 * (fragCoord + vec2<f32>(1.0, 0.0)) - iResolution.xy) / iResolution.y;
            let pixelY = (2.0 * (fragCoord + vec2<f32>(0.0, 1.0)) - iResolution.xy) / iResolution.y;
            let rayDirectionX = cameraToWorld * normalize(vec3<f32>(pixelX, focalLength));
            let rayDirectionY = cameraToWorld * normalize(vec3<f32>(pixelY, focalLength));

            // Render the scene using the calculated ray.
            var color = debugRender(rayOrigin, rayDirection, rayDirectionX, rayDirectionY);

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
