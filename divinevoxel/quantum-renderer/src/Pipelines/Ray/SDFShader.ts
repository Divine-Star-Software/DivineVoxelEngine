export class SDFShader {
  static functions = /* wgsl */ `
  const AA = 1;
const ZERO = 0;
const iResolution = vec2<f32>(1920.0, 1080.0);

fn ndot(a: vec2<f32>, b: vec2<f32>) -> f32 {
return a.x * b.x - a.y * b.y;
}

fn sdPlane(p: vec3<f32>) -> f32 {
return p.y;
}

fn sdSphere(p: vec3<f32>, s: f32) -> f32 {
return length(p) - s;
}

fn sdBox(p: vec3<f32>, b: vec3<f32>) -> f32 {
let d = abs(p) - b;
return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, vec3<f32>(0.0, 0.0, 0.0)));
}

fn sdU(p: vec3<f32>, r: f32, le: f32, w: vec2<f32>) -> f32 {
var px = p.x;
var py = p.y;
px = select(length(p.xy), abs(p.x), p.y > 0.0);
px = abs(px - r);
py = py - le;
let k: f32 = max(px, py);
let q = vec2<f32>(
    select(-k, length(max(vec2<f32>(px, py), vec2<f32>(0.0, 0.0))), k < 0.0),
    abs(p.z)
) - w;
return length(max(q, vec2<f32>(0.0, 0.0))) + min(max(q.x, q.y), 0.0);
}

fn opU(d1: vec2<f32>, d2: vec2<f32>) -> vec2<f32> {
return select(d2, d1, d1.x < d2.x);
}

fn map(pos: vec3<f32>) -> vec2<f32> {
var res: vec2<f32> = vec2<f32>(pos.y, 0.0);
res = opU(res, vec2<f32>(sdBox(pos - vec3<f32>(0.0, 0.25, 0.0), vec3<f32>(0.3, 0.25, 0.1)), 3.0));
return res;
}

fn iBox(ro: vec3<f32>, rd: vec3<f32>, rad: vec3<f32>) -> vec2<f32> {
let m: vec3<f32> = 1.0 / rd;
let n: vec3<f32> = m * ro;
let k: vec3<f32> = abs(m) * rad;
let t1: vec3<f32> = -n - k;
let t2: vec3<f32> = -n + k;
return vec2<f32>(max(max(t1.x, t1.y), t1.z),
                    min(min(t2.x, t2.y), t2.z));
}

fn raycast(ro: vec3<f32>, rd: vec3<f32>) -> vec2<f32> {
var res: vec2<f32> = vec2<f32>(-1.0, -1.0);

let tmin: f32 = 1.0;
var tmax: f32 = 20.0;

let tp1: f32 = (0.0 - ro.y) / rd.y;
if (tp1 > 0.0) {
    tmax = min(tmax, tp1);
    res = vec2<f32>(tp1, 1.0);
}

let tb: vec2<f32> = iBox(ro - vec3<f32>(0.0, 0.4, -0.5), rd, vec3<f32>(2.5, 0.41, 3.0));
if (tb.x < tb.y && tb.y > 0.0 && tb.x < tmax) {
    let tminNew: f32 = max(tb.x, tmin);
    tmax = min(tb.y, tmax);

    var t: f32 = tminNew;
    for(var i: i32 = 0; i < 70 && t < tmax; i = i + 1) {
        let h: vec2<f32> = map(ro + rd * t);
        if (abs(h.x) < (0.0001 * t)) {
            res = vec2<f32>(t, h.y);
            break;
        }
        t += h.x;
    }
}

return res;
}

// https://iquilezles.org/articles/rmshadows
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

// https://iquilezles.org/articles/checkerfiltering
fn checkersGradBox(p: vec2<f32>, dpdx: vec2<f32>, dpdy: vec2<f32>) -> f32 {
let w: vec2<f32> = abs(dpdx) + abs(dpdy) + 0.001;
let i: vec2<f32> = 2.0 * (abs(fract((p - 0.5 * w) * 0.5) - 0.5) - abs(fract((p + 0.5 * w) * 0.5) - 0.5)) / w;
return 0.5 - 0.5 * i.x * i.y;
}

fn render(ro: vec3<f32>, rd: vec3<f32>, rdx: vec3<f32>, rdy: vec3<f32>) -> vec3<f32> {
var col: vec3<f32> = vec3<f32>(0.7, 0.7, 0.9) - max(rd.y, 0.0) * 0.3;

let res: vec2<f32> = raycast(ro, rd);
let t: f32 = res.x;
let m: f32 = res.y;
if m > -0.5 {
    let pos: vec3<f32> = ro + t * rd;
    let nor: vec3<f32> = select( calcNormal(pos), vec3<f32>(0.0, 1.0, 0.0) ,    (m < 1.5));
    
    let refr: vec3<f32> = reflect(rd, nor);
    
    // material
    col = 0.2 + 0.2 * sin(m * 2.0 + vec3<f32>(0.0, 1.0, 2.0));
    var ks: f32 = 1.0;
    
    if m < 1.5 {
        // project pixel footprint into the plane
        let dpdx: vec3<f32> = ro.y * (rd / rd.y - rdx / rdx.y);
        let dpdy: vec3<f32> = ro.y * (rd / rd.y - rdy / rdy.y);

        let f: f32 = checkersGradBox(3.0 * pos.xz, 3.0 * dpdx.xz, 3.0 * dpdy.xz);
        col = 0.15 + f * vec3<f32>(0.05);
        ks = 0.4;
    }

    // lighting
    let occ: f32 = calcAO(pos, nor);
    
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

    col = mix(col, vec3<f32>(0.7, 0.7, 0.9), 1.0 - exp(-0.0001 * t * t * t));
}

return clamp(col, vec3<f32>(0.0, 0.0, 0.0), vec3<f32>(1.0, 1.0, 1.0));
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
    let cameraTarget = vec3<f32>( 0., 0., 0. );
    let rayOrigin = cameraTarget + vec3<f32>( 0., 1., -4.5);

    // Get camera-to-world transformation matrix.
    let cameraToWorld = setCamera(rayOrigin, cameraTarget, 0.0);

    var totalColor = vec3<f32>(0.0);

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
