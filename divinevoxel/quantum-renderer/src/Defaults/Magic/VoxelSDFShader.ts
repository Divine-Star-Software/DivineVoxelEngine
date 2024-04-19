export class VoxelSDFShader {
  static define = /*wgsl */ `

    
    struct VoxelSDF {
        distances: array<f32> // Assuming distances are stored as uint
    };
        

    `;
  static functions = /*wgsl */ `
  const AA = 1;
  const ZERO = 0;
  const iResolution = vec2<f32>(1920.0, 1080.0);

  fn mincomp(v: vec3<f32>) -> f32 {
    return min(min(v.x, v.y), v.z);
}



fn voxelCast(rayOrigin: vec3<f32>, rayDirection: vec3<f32>) -> vec2<f32> {
    var t: f32 = 0.0;
    var res: vec2<f32> = vec2<f32>(0., -1.);
    let gridSize: f32 = voxelParams.voxelGridSize.x;
    let invDir: vec3<f32> = 1.0 / rayDirection; // Inverse direction to handle division by zero
    let interSectionCheck: vec2<f32> = intersectVoxelCheck(rayOrigin,rayDirection, boundsMin, boundsMax);
    
    if(interSectionCheck.x > 0) {
        t =  interSectionCheck.x;
    }

    loop {
        if (t > voxelParams.maxDistToCheck +  interSectionCheck.x ) {
            break;
        }
        
        let p: vec3<f32> = rayOrigin + t * rayDirection;
        if(p.y < 0.){
            if (rayDirection.y != 0.0) {
                let tFloor: f32 = -rayOrigin.y / rayDirection.y;
                if (tFloor > 0.0) {
                    res.x = tFloor;
                    res.y = 1.0;
                    return res;
                }
            }
            return res; 
        } else if (withinBounds(p)) {

                let vres = voxelSDFQuery(p);
                if(vres.x < 1.5) {
                    res.x = t -  vres.x;
                    res.y = 2.;
                    return res;
                }

                
                t += vres.x; 
            } 
        
            t += voxelParams.epsilon;  
            
        } 
    
    
    return res;
}

/*
Voxel SDF Query
---
res.x -> Voxel SDF value or -1
res.y -> Voxel material id 
*/
fn voxelSDFQuery(p:vec3<f32>) -> vec2<f32>{
if (withinBounds(p)) {
    let voxelIndex: u32 = getIndex(p);
    let voxelValue: f32 = voxelSDF.distances[voxelIndex];
    
       // Simple trilinear interpolation can be performed here if needed
       let interpolatedValue = trilinearInterpolate(p);
       return vec2(interpolatedValue, 1.);

    }

    return vec2<f32>(0.,0.);
}


fn lerp(v0: f32, v1: f32, t: f32) -> f32 {
    return mix(v0, v1, t);
};
// Trilinear interpolation for smoother transitions between voxels
fn trilinearInterpolate(p: vec3<f32>) -> f32 {
    let base = floor(p);
    let frac = fract(p);

    let val000 = getVoxelValue(base);
    let val001 = getVoxelValue(base + vec3<f32>(0, 0, 1));
    let val010 = getVoxelValue(base + vec3<f32>(0, 1, 0));
    let val011 = getVoxelValue(base + vec3<f32>(0, 1, 1));
    let val100 = getVoxelValue(base + vec3<f32>(1, 0, 0));
    let val101 = getVoxelValue(base + vec3<f32>(1, 0, 1));
    let val110 = getVoxelValue(base + vec3<f32>(1, 1, 0));
    let val111 = getVoxelValue(base + vec3<f32>(1, 1, 1));


    let lerpz0 = lerp(lerp(val000, val100, frac.x), lerp(val010, val110, frac.x), frac.y);
    let lerpz1 = lerp(lerp(val001, val101, frac.x), lerp(val011, val111, frac.x), frac.y);
    return lerp(lerpz0, lerpz1, frac.z);
}

// A mockup for fetching voxel values based on their coordinates
fn getVoxelValue(coord: vec3<f32>) -> f32 {
    if (withinBounds(coord)) {
        return voxelSDF.distances[getIndex(coord)];
    }
    return 1e10; // Large value for out of bounds
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

    let nor: vec3<f32> = select( voxelNormal(pos), vec3<f32>(0.0, 1.0, 0.0) ,    (m < 1.5));

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
        let nor: vec3<f32> = calcNormal(pos);

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
    return  voxelSDFQuery(vec3<f32>(p.xyz));
}


fn voxelMap(v : vec3<f32>, l : vec3<f32>) -> vec2<f32> {
   return  voxelSDFQuery(vec3<f32>(v.xyz));
}


fn voxelNormal(p: vec3<f32>) -> vec3<f32> {
    let h = EPSILON;
    let k = vec2<f32>(1,-1);
    return normalize(k.xyy*map(p + k.xyy*h).x +
                     k.yyx*map(p + k.yyx*h).x +
                     k.yxy*map(p + k.yxy*h).x +
                     k.xxx*map(p + k.xxx*h).x );
}
fn calcVoxelNormal(p: vec3<f32>) -> vec3<f32> {
    let h = EPSILON; // Small offset for finite difference
    let k = vec2<f32>(1.0, -1.0); // For central difference calculation

    // Compute gradient components by finite differences
    let grad_x = (voxelSDFQuery(p + vec3<f32>(h, 0.0, 0.0)).x - voxelSDFQuery(p - vec3<f32>(h, 0.0, 0.0)).x) * 0.5;
    let grad_y = (voxelSDFQuery(p + vec3<f32>(0.0, h, 0.0)).x - voxelSDFQuery(p - vec3<f32>(0.0, h, 0.0)).x) * 0.5;
    let grad_z = (voxelSDFQuery(p + vec3<f32>(0.0, 0.0, h)).x - voxelSDFQuery(p - vec3<f32>(0.0, 0.0, h)).x) * 0.5;

    // Construct the normal vector from the gradient and normalize it
    let normal = normalize(vec3<f32>(grad_x, grad_y, grad_z));

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
    let cameraTarget = vec3<f32>( vec3<f32>(f32(voxelParams.gridDimensions.x)/2.,30.,0.) );

    let rayOrigin =  vec3<f32>(f32(voxelParams.gridDimensions.x)/2 + 10.,30.,-90. );
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
