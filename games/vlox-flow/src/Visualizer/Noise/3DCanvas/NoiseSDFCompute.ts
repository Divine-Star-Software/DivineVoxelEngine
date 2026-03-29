export default function (device: GPUDevice) {
  const code = /* wgsl */ `
const WORLD_SIZE_X: u32 = 256;
const WORLD_SIZE_Y: u32 = 256;
const WORLD_SIZE_Z: u32 = 256;

const SECTOR_SIZE_X: u32 = 16;
const SECTOR_SIZE_Y: u32 = 256;
const SECTOR_SIZE_Z: u32 = 16;

const SECTOR_VOLUME: u32 = SECTOR_SIZE_X * SECTOR_SIZE_Y * SECTOR_SIZE_Z;

const SECTORS_X: u32 = WORLD_SIZE_X / SECTOR_SIZE_X; 
const SECTORS_Z: u32 = WORLD_SIZE_Z / SECTOR_SIZE_Z; 
const WORLD_OFFSET_X: f32 = -128;
const WORLD_OFFSET_Y: f32 = 0;
const WORLD_OFFSET_Z: f32 = -128;
const INFINITY = 100000000.0;

@group(0) @binding(0) 
var outImage : texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(1)
var<storage, read> voxelData: array<u32>;
@group(0) @binding(2)
var<uniform> cameraPosition: vec3<f32>;
@group(0) @binding(3)
var<uniform> sunPosition: vec3<f32>;


/** 
TESTING
*/
fn sdfSphere(position: vec3f, center: vec3f, radius: f32) -> f32 {
  return length(position - center) - radius;
}

fn testScene(origin: vec3f, dir: vec3f) -> vec4<f32> {
  var totalDist = 0.0;
  let maxSteps = 128;
  let maxDist = 100.0;
  let minDist = 0.01;

  for (var i = 0; i < maxSteps; i++) {
    let pos = origin + dir * totalDist;
    let dist = sdfSphere(pos, vec3f(0.0, 0.0, 0.0), 1.0);
    if (dist < minDist) {
      return vec4<f32>(1.,1.,1.,1.); 
    }
    if (totalDist > maxDist) {
        return vec4<f32>(1.,1.,1.,1.); 
    }
    totalDist += dist;
  }

  return vec4<f32>(0.,0.,0.,0.);
}

/** 
VOXEL SCENE
*/
struct VoxelPickResult {
  hit: bool,
  t: f32
};

fn getVoxelBit(voxelIndex : u32) -> u32 {
  let wordIndex = voxelIndex / 32u;
  let bitOffset = voxelIndex % 32u;
  return (voxelData[wordIndex] >> bitOffset) & 1u;
}



fn getVoxelIndex(x: u32, y: u32, z: u32) -> u32 {
  let sectorX = x / SECTOR_SIZE_X;
  let sectorZ = z / SECTOR_SIZE_Z;

  let sectorIndex = sectorZ + SECTORS_Z * sectorX;

  let localX = x % SECTOR_SIZE_X;
  let localY = y;
  let localZ = z % SECTOR_SIZE_Z;

  let localIndex = localZ + SECTOR_SIZE_Z * (localX + SECTOR_SIZE_X * localY);

  return sectorIndex * SECTOR_VOLUME + localIndex;
}

fn BoundingBoxIntersect(  minCorner: vec3f,  maxCorner: vec3f, rayOrigin: vec3f, invDir: vec3f ) -> f32 {
  let near = (minCorner - rayOrigin) * invDir;
  let far  = (maxCorner - rayOrigin) * invDir;

  let tmin = min(near, far);
  let tmax = max(near, far);

  let t0 = max( max(tmin.x, tmin.y), tmin.z);
  let t1 = min( min(tmax.x, tmax.y), tmax.z);

   if(max(t0, 0.0) > t1) { 
    return INFINITY; 
  } 
   
   return t0; 
}

fn isSolid(voxelPos: vec3<i32>) -> u32 {
  let worldX = voxelPos.x - i32(WORLD_OFFSET_X);
  let worldY = voxelPos.y - i32(WORLD_OFFSET_Y);
  let worldZ = voxelPos.z - i32(WORLD_OFFSET_Z);

  if (worldX < 0 || worldX >= i32(WORLD_SIZE_X) ||
      worldY < 0 || worldY >= i32(WORLD_SIZE_Y) ||
      worldZ < 0 || worldZ >= i32(WORLD_SIZE_Z)) {
    return 0u;
  }

  let index = getVoxelIndex(u32(worldX), u32(worldY), u32(worldZ));
  return getVoxelBit(index);
}

fn computeAO(hitPos: vec3f, normal: vec3f) -> f32 {
  let basePos = vec3<i32>(floor(hitPos + normal * 0.01));

  var axes = array<vec2<i32>, 4>(
    vec2<i32>(1, 1),
    vec2<i32>(-1, 1),
    vec2<i32>(-1, -1),
    vec2<i32>(1, -1)
  );

  var aoSum = 0.0;

  for (var i = 0; i < 4; i++) {
    let offset = axes[i];

    var sideA = vec3<i32>(0);
    var sideB = vec3<i32>(0);

    if (abs(normal.x) > 0.0) {
      sideA = vec3<i32>(0, offset.x, 0);
      sideB = vec3<i32>(0, 0, offset.y);
    } else if (abs(normal.y) > 0.0) {
      sideA = vec3<i32>(offset.x, 0, 0);
      sideB = vec3<i32>(0, 0, offset.y);
    } else {
      sideA = vec3<i32>(offset.x, 0, 0);
      sideB = vec3<i32>(0, offset.y, 0);
    }

    let cornerOffset = sideA + sideB;

    let side1 = isSolid(basePos + sideA);
    let side2 = isSolid(basePos + sideB);
    let corner = isSolid(basePos + cornerOffset);

  
    var ao = 0.0;
    if (side1 == 1u && side2 == 1u) {
      ao = 0.9;
    } else {
      ao += f32(side1) * 0.4;
      ao += f32(side2) * 0.4;
      ao += f32(corner) * 0.2;
    }

    aoSum += ao;
  }

  return clamp(1.0 - (aoSum / 4.0), 0.0, 1.0);
}

struct VoxelDDAResult {
  hit: bool,
  normal: vec3f,
  position: vec3f,
  t: f32,
}

fn voxelDDA(rayOrigin: vec3<f32>, rayDir: vec3<f32>) -> VoxelDDAResult {
  let maxDist = 600.0;

  let worldMin = vec3f(f32(WORLD_OFFSET_X), f32(WORLD_OFFSET_Y), f32(WORLD_OFFSET_Z));
  let worldMax = worldMin + vec3f(f32(WORLD_SIZE_X), f32(WORLD_SIZE_Y), f32(WORLD_SIZE_Z));
  let safeDir = vec3f(
    select(rayDir.x, 1e-5, abs(rayDir.x) < 1e-5),
    select(rayDir.y, 1e-5, abs(rayDir.y) < 1e-5),
    select(rayDir.z, 1e-5, abs(rayDir.z) < 1e-5)
  );

  let invDir = 1.0 / safeDir;
  let tDelta = abs(1.0 / safeDir);

  let tEnter = BoundingBoxIntersect(worldMin, worldMax, rayOrigin, invDir);
  if (tEnter == INFINITY) {
    return VoxelDDAResult(false, vec3f(0.0), vec3f(0.0), 0.0);
  }

  var traveled = max(tEnter - .5, 0.0);
  var pos = rayOrigin + rayDir * traveled;
  var voxel = vec3<i32>(floor(pos));

  let step = vec3<i32>(
    select(-1, 1, rayDir.x >= 0.0),
    select(-1, 1, rayDir.y >= 0.0),
    select(-1, 1, rayDir.z >= 0.0)
  );


  var tMax = vec3<f32>(
    (select(pos.x - f32(voxel.x), f32(voxel.x + 1) - pos.x, rayDir.x >= 0.0)) * tDelta.x + traveled,
    (select(pos.y - f32(voxel.y), f32(voxel.y + 1) - pos.y, rayDir.y >= 0.0)) * tDelta.y + traveled,
    (select(pos.z - f32(voxel.z), f32(voxel.z + 1) - pos.z, rayDir.z >= 0.0)) * tDelta.z + traveled
  );

  var normal = vec3f(0.0);

  for (var i = 0; i < 512; i++) {
    let worldX = voxel.x - i32(WORLD_OFFSET_X);
    let worldY = voxel.y - i32(WORLD_OFFSET_Y);
    let worldZ = voxel.z - i32(WORLD_OFFSET_Z);

    if (worldX >= 0 && worldX < i32(WORLD_SIZE_X) &&
        worldY >= 0 && worldY < i32(WORLD_SIZE_Y) &&
        worldZ >= 0 && worldZ < i32(WORLD_SIZE_Z)) {

      let voxelIndex = getVoxelIndex(u32(worldX), u32(worldY), u32(worldZ));
      if (getVoxelBit(voxelIndex) == 1u) {
        let hitPoint = rayOrigin + rayDir * traveled;
        return VoxelDDAResult(true, normal, hitPoint, traveled);
      }
    }

    if (tMax.x < tMax.y && tMax.x < tMax.z) {
      traveled = tMax.x;
      tMax.x += tDelta.x;
      voxel.x += step.x;
      normal = vec3f(-f32(step.x), 0.0, 0.0);
    } else if (tMax.y < tMax.z) {
      traveled = tMax.y;
      tMax.y += tDelta.y;
      voxel.y += step.y;
      normal = vec3f(0.0, -f32(step.y), 0.0);
    } else {
      traveled = tMax.z;
      tMax.z += tDelta.z;
      voxel.z += step.z;
      normal = vec3f(0.0, 0.0, -f32(step.z));
    }

    if ((traveled - tEnter) > maxDist) {
      break;
    }
  }

  return VoxelDDAResult(false, vec3f(0.0), vec3f(0.0), 0.0);
}

/** 
MAIN
*/

fn setCamera(rayOrigin: vec3<f32>, cameraTarget: vec3<f32>, cameraRoll: f32) -> mat3x3<f32> {
    let cameraForward = normalize(cameraTarget - rayOrigin);
    let cameraPlane = vec3<f32>(sin(cameraRoll), cos(cameraRoll), 0.0);
    let cameraUp = normalize(cross(cameraForward, cameraPlane));
    let cameraRight = cross(cameraUp, cameraForward);
    return mat3x3<f32>(cameraUp, cameraRight, cameraForward);
}


fn mainFragment(fragCoord: vec2<f32>) -> vec4<f32> {
  let dims = vec2f(textureDimensions(outImage));
  let uv = (fragCoord / dims) * 2.0 - 1.0;
  let aspect = dims.x / dims.y;

  let cameraTarget = vec3f(0., 0., 0.);
  let rayOrigin = vec3f(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  let cameraToWorld = setCamera(rayOrigin, cameraTarget, 0.0);

  let focalLength = 1.8;
  let sensorX = uv.x * aspect;
  let sensorY = uv.y;
  let rayDirection = cameraToWorld * normalize(vec3f(sensorX, sensorY, focalLength));

let result = voxelDDA(rayOrigin, rayDirection);
if (!result.hit) {
  return vec4f(0.0, 0.0, 0.0, 1.0);
}

let sunDir = normalize(sunPosition - result.position);
let shadowRay = voxelDDA(result.position + sunDir * 0.01, sunDir); 

let inShadow = shadowRay.hit;
let base = result.normal * 0.5 + vec3f(0.5);

let ao = computeAO(result.position + result.normal * 0.01, result.normal);
let light = select(0.2, 1.0, !inShadow);

let finalColor = base * light * ao;

return vec4f(finalColor, 1.0);
}


@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
  let dims = textureDimensions(outImage);
  if (global_id.x >= dims.x || global_id.y >= dims.y) {
    return;
  }
  let color = mainFragment(vec2f(global_id.xy));
  textureStore(outImage, vec2<i32>(global_id.xy), color);
} 

/*
//Test to display the entire noise display at a specifc y slice
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
  let dims = textureDimensions(outImage);

  if (global_id.x >= dims.x || global_id.y >= dims.y) {
    return;
  }

  let x = global_id.x;
  let z = global_id.y;
  let y = 0u;

  let index = getVoxelIndex(x, y, z);
  let bit = getVoxelBit(index);

  var color = vec4f(1.0, 0.0, 0.0, 1.0); 
  if (bit == 1u) {
    color = vec4f(0.0, 1.0, 0.0, 1.0);
  }

  textureStore(outImage, vec2<i32>(global_id.xy), color);
}
*/
`;
  return device.createShaderModule({
    code,
  });
}
