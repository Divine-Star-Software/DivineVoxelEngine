import { VoxelMeshTypes } from "@divinevoxel/vlox/Mesher/Types/VoxelMesh.types";
import { VoxelCommon } from "./VoxelCommon";
import { VoxelMeshQuery } from "./VoxelMeshQuery";

export class VoxelRayRender {
  static TestCode: /* wgsl */ `
  
  
fn sdfSphere(position: vec3f, center: vec3f, radius: f32) -> f32 {
  return length(position - center) - radius;
}


fn sdfBox(point: vec3<f32>, boxPosition: vec3<f32>, boxDimensions: vec3<f32>) -> f32 {
  // Shift the point relative to the box position
  let localPoint = point - boxPosition;
  // Calculate the absolute distance from the box center
  let d = abs(localPoint) - boxDimensions;
  // Separate the distance into outside and inside components
  let outside = max(d, vec3<f32>(0.0));
  let inside = min(max(d.x, max(d.y, d.z)), 0.0);
  // Combine the outside and inside distances for the signed distance
  return length(outside) + inside;
}

// Function to compute the normal at a point using finite differences
fn computeNormal(point: vec3<f32>, boxPosition: vec3<f32>, boxDimensions: vec3<f32>) -> vec3<f32> {
  let epsilon = 0.001; // Small offset for finite difference approximation
  let dx = sdfBox(point + vec3<f32>(epsilon, 0.0, 0.0), boxPosition, boxDimensions) -
           sdfBox(point - vec3<f32>(epsilon, 0.0, 0.0), boxPosition, boxDimensions);
  let dy = sdfBox(point + vec3<f32>(0.0, epsilon, 0.0), boxPosition, boxDimensions) -
           sdfBox(point - vec3<f32>(0.0, epsilon, 0.0), boxPosition, boxDimensions);
  let dz = sdfBox(point + vec3<f32>(0.0, 0.0, epsilon), boxPosition, boxDimensions) -
           sdfBox(point - vec3<f32>(0.0, 0.0, epsilon), boxPosition, boxDimensions);
  let normal = normalize(vec3<f32>(dx, dy, dz));
  return normal;
}

fn dataTestFragment(fragCoord: vec2f) -> vec4f {
  var color = vec4f(0.,0.,0.,1.);
  let dimension  = scene_props.worldBoundsMax.x - scene_props.worldBoundsMin.x;
  let screenCoord = fragCoord.xy / scene_props.resolution.xy; // Range [0, 1]
  var position = (floor(vec3f(screenCoord.x * dimension,0.,screenCoord.y * dimension)/16) * 16)  + scene_props.worldBoundsMin;
  if(!pointInWorldBounds(position)) {
    return vec4f(1.,0.,0.,1.);;
  }
  let index = getWorldMeshIndex(position);
  color.b = voxel_meshes[index].state.x;
 // color.g = voxel_meshes[index].indexOffets.z;
 // return vec4f(normalize(floor(abs(position - scene_props.worldBoundsMin)/16)),1.) ;
 // return vec4f(normalize(position),1.);
 // return vec4f(vec3(screenCoord.x,screenCoord.y,0.),1.);
    return color;

 }

 fn sphereTestFragment(fragCoord: vec2f) -> vec4f {
  var color = vec4f(1.0, 1.0, 1.0, 1.0);

  // Screen coordinates to ray direction
  var screenCoord = (fragCoord.xy / scene_props.resolution.xy) * 2.0 - 1.0;
  screenCoord.y *= -1.0;
  let tanHalfFov = tan(camera.settings.x * 0.5);
  let rayDirection = normalize(
      screenCoord.x * -camera.right * tanHalfFov * camera.settings.y +
      screenCoord.y * camera.up * tanHalfFov +
      camera.forward
  );
  var rayOrigin = camera.position;

  // Constants for ray marching
  const MAX_STEPS = 100;
  const HIT_THRESHOLD = 0.01; 
  const MAX_DISTANCE = 100.0;

  // Box parameters
  let boxPosition = vec3<f32>(-10.0, 0.0, 0.0);  
  let boxSize = vec3<f32>(1.0, 1.0, 1.0);     

  var totalDistance = 0.0;

  for (var i = 0; i < MAX_STEPS; i++) {
      let dist = sdfBox(rayOrigin, boxPosition, boxSize);

      if (dist < HIT_THRESHOLD) {
          // Compute the normal at the hit point
          let normal = computeNormal(rayOrigin, boxPosition, boxSize);

          let baseColor = vec3f(
            abs(normal.x),  // Red for X-axis
            abs(normal.y),  // Green for Y-axis
            abs(normal.z)   // Blue for Z-axis
          );


          var tint = vec3f(0.0, 0.0, 0.0);
          if (normal.x < 0.0) {
            tint.x = 0.5;
          }
          if (normal.y < 0.0) {
            tint.y = 0.5;
          }
          if (normal.z < 0.0) {
            tint.z = 0.5;
          }

          let normalColor = (baseColor - tint);
          color = vec4f(normalColor, 1.0); // Set the fragment color to the normal-based color
          break;
      }

      totalDistance += dist;

      if (totalDistance > MAX_DISTANCE) {
          // Exceeded maximum ray distance
          break;
      }

      // Move the ray origin forward
      rayOrigin += rayDirection * dist;
  }

  return color * 2;
}

  `;

  static Create() {
    const shader = /* wgsl */ `
const INFINITY = 100000000.0;


${VoxelCommon.CommonStructs}

//data
struct VoxelMeshVertex {
  position: vec3f, 
  normal: vec3f,     
  textureIndex: vec3f,    
  uv: vec2f,    
  colors: vec3f,
  voxelData: f32,    
  _padding: vec4f
};




${VoxelMeshQuery.MeshStruct}



/*
Ray Functions
*/

${VoxelMeshQuery.MeshQueryCode}

struct Basis {
  T: vec3<f32>,
  B: vec3<f32>,
  N: vec3<f32>,
};

fn cosineWeightedHemisphereSample(u: f32, v: f32) -> vec3<f32> {
  let phi = 2.0 * 3.1415926535 * u;
  let r = sqrt(v);
  let x = r * cos(phi);
  let y = r * sin(phi);
  let z = sqrt(1.0 - v);
  return vec3<f32>(x, y, z);
}

fn buildOrthonormalBasis(N: vec3<f32>) -> Basis {
 // Select the appropriate 'up' vector based on N
 let up = select(vec3<f32>(0.0, 1.0, 0.0), vec3<f32>(0.0, 0.0, 1.0), abs(N.z) < 0.999);

 // Compute tangent and bitangent vectors
 let T = normalize(cross(up, N));
 let B = normalize(cross(N, T));

 return Basis(T, B, N);
}

fn hemisphereToWorld(localDir: vec3<f32>, T: vec3<f32>, B: vec3<f32>, N: vec3<f32>) -> vec3<f32> {
  return localDir.x * T + localDir.y * B + localDir.z * N;
}


// A basic hash function that maps a float to a pseudo-random value in [0,1).
fn hash11(p: f32) -> f32 {
  // This uses a sine function and a large constant multiplier.
  // It's a common trick in shaders, but not very high quality.
  return fract(sin(p) * 43758.5453123);
}

// You can use this to generate two random numbers u1 and u2 from a seed.
// For example, seed could be something like (frame * 1000.0 + fragCoord.x * fragCoord.y).
fn getTwoRandomNumbers(seed: f32) -> vec2<f32> {
  let u1 = hash11(seed);
  let u2 = hash11(seed + 1.0);
  return vec2<f32>(u1, u2);
}



//bindgs 
${VoxelCommon.CommonBinds}

@group(1) @binding(0) 
var<storage, read> vertices: array<VoxelMeshVertex>;

@group(1) @binding(1) 
var<storage, read> indices: array<u32>;

@group(1) @binding(2) 
var<storage, read> voxel_meshes: array<VoxelMesh>;

@group(1) @binding(3) 
var<storage, read> voxel_bvh: array<AABB>;

@group(1) @binding(4) 
var<storage, read> voxel_indice: array<vec2u>;


@group(2) @binding(0) var normal_texture: texture_2d<f32>;
@group(2) @binding(1) var position_texture: texture_2d<f32>;
@group(2) @binding(2) var light_texture: texture_storage_2d<rgba32float, write>;
@group(2) @binding(3) var ao_texture:  texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let screenTextureCords =  vec2<i32>(global_id.xy) * 2;
  let position = textureLoad(position_texture, screenTextureCords, 0);
  if(position.a <= 0) {
    textureStore(
      light_texture, 
      vec2i(global_id.xy), 
      vec4f(1.0)
      );
    
    //set ao
    textureStore(
      ao_texture, 
      vec2i(global_id.xy), 
      vec4f(1.0)
      );
    
    return;
  }
  let worldUp = vec3f(0.0, 1.0, 0.0);
  let fragCoord = vec2<f32>(screenTextureCords.xy);



  let normalColor = vec3f(textureLoad(normal_texture, screenTextureCords, 0).rgb);


  let normal = ( 2 * normalColor)   -  1;

  

let hitPosition = vec3f(position.rgb); 



var light = vec4f(1.,1.,1.,1.);
var ao = vec4f(1.,1.,1.,1.);
let nt = (normal + vec3<f32>(1)) / 2;

let seedBase = fragCoord.x * fragCoord.y + 0.1234 + time;
//DO SUN
let epsilon = 0.01;
let newHitPosition = hitPosition + normal * epsilon;
let sunDirection = normalize(  scene_props.sunPosition - newHitPosition );


let sunRight = normalize(cross(sunDirection, worldUp));
let sunUp = normalize(cross(sunRight, sunDirection));
let sunLookUp = voxelMeshQuery(newHitPosition, sunDirection, sunRight, sunUp, 300.0);

if (sunLookUp.found) {
  light.r = 0.25;
  light.g = 0.25;
  light.b = 0.25;
}

if (sunLookUp.error) {
  light.r = 1;
  light.g = 0;
  light.b = 0;
    
}

//DO AO
  let basias = buildOrthonormalBasis(normal);

  let T = basias.T;
  let B = basias.B;
  let N = basias.N;

 

  var hit = 0.0;
  for(var i = 0u; i < 4u; i++) {
    let seed = seedBase + f32(i) * (13.37 ) ; 
    let randoms = getTwoRandomNumbers(seed);
    let u1 = randoms.x; 
    let u2 = randoms.y; 
    let localSample = cosineWeightedHemisphereSample(u1, u2);
    let dir = hemisphereToWorld(localSample, T, B, N);
    let sampleRight = normalize(cross(dir, worldUp));
    let sampleUp = normalize(cross(sampleRight, dir));
    let aoLookUp = voxelMeshQuery(newHitPosition, dir, sampleRight, sampleUp, .99);


    if(aoLookUp.found) {
      hit += 1.0;
    // Apply AO to color
  
    } 

  }

  let occlusionFactor = 1.0 - (hit/4);

    ao.r *= occlusionFactor;
    ao.g *= occlusionFactor;
    ao.b *= occlusionFactor; 
  

 
  




//set light
textureStore(
  light_texture, 
  vec2i(global_id.xy), 
  light 
  );

//set ao
textureStore(
  ao_texture, 
  vec2i(global_id.xy), 
  ao
  );

}






`;
    return shader;
  }
}

/* 
  //do ray tracing 
var screenCoord = (fragCoord.xy / scene_props.resolution.xy) * 2.0 - 1.0;
  screenCoord.y *= -1.0;

  let rayOrigin = camera.position;
  let clipSpacePoint = vec4<f32>(screenCoord.x, screenCoord.y, 1, 1.0);
  let viewSpacePoint = camera.inverseViewProjection * clipSpacePoint;
  let viewSpacePos = viewSpacePoint.xyz / viewSpacePoint.w;
  let rayDirection = normalize( viewSpacePos);
  let rayRight = normalize(cross(rayDirection, worldUp));
  let rayUp = normalize(cross(rayRight, rayDirection));

  let meshLookUp = voxelMeshQuery(rayOrigin,rayDirection,rayRight,rayUp, 300.0);
  if(!meshLookUp.found ) {
    textureStore(
      light_texture, 
      vec2i(global_id.xy), 
      vec4f(1,0,0,1)
      );
    
      return;
  }

 // let normal = meshLookUp.triangle.normal;
  let hitPosition = meshLookUp.triangle.position;

  */

/**
  var sunPosition = scene_props.sunPosition;

  var screenCoord = (fragCoord.xy / scene_props.resolution.xy) * 2.0 - 1.0;
  screenCoord.y *= -1.0;
  let tanHalfFov = tan(camera.settings.x * 0.5);
  var rayDirection = normalize(
      screenCoord.x * -camera.right * tanHalfFov * camera.settings.y +
      screenCoord.y * camera.up * tanHalfFov +
      camera.forward
  );
  var rayOrigin = camera.position;
  var rayRight = normalize(cross(rayDirection, worldUp));
  var rayUp = normalize(cross(rayRight, rayDirection));

  let meshLookUp = voxelMeshQuery(camera.position,rayDirection,rayRight,rayUp, 300.0);
  if(meshLookUp.error) {
      return;
  }

  let seedBase = fragCoord.x * fragCoord.y + 0.1234 + time;

  if(
    meshLookUp.found 
  ) {
let normal = meshLookUp.triangle.normal;
    

let hitPosition = meshLookUp.triangle.position;

//DO SUN
let sunDirection = normalize(sunPosition - hitPosition);

let epsilon = 0.01;
let newHitPosition = hitPosition + normal * epsilon;

let sunRight = normalize(cross(sunDirection, worldUp));
let sunUp = normalize(cross(sunRight, sunDirection));
let sunLookUp = voxelMeshQuery(newHitPosition, sunDirection, sunRight, sunUp, 300.0);

if (sunLookUp.found) {
  light.r = 0.25;
  light.g = 0.25;
  light.b = 0.25;
    
}

//DO AO
  let basias = buildOrthonormalBasis(normal);

  let T = basias.T;
  let B = basias.B;
  let N = basias.N;

 
  let maxSamples = 8u;
  var hit = 0.0;
  for(var i = 0u; i < maxSamples; i++) {
    let seed = seedBase + f32(i) * (13.37  * 10.2) ; // Add some offset per sample
    let randoms = getTwoRandomNumbers(seed);
    let u1 = randoms.x; // pseudo-random in [0,1)
    let u2 = randoms.y; // pseudo-random in [0,1)
    let localSample = cosineWeightedHemisphereSample(u1, u2);
    let dir = hemisphereToWorld(localSample, T, B, N);
    let sampleRight = normalize(cross(dir, worldUp));
    let sampleUp = normalize(cross(sampleRight, dir));
    let aoLookUp = voxelMeshQuery(newHitPosition, dir, sampleRight, sampleUp, .99);


    if(aoLookUp.found) {
      hit += 1.0;
    // Apply AO to color
  
    } 

  }

  let occlusionFactor = 1.0 - hit/f32(maxSamples);
  ao.r *= occlusionFactor;
  ao.g *= occlusionFactor;
  ao.b *= occlusionFactor; 
 

//ao = mix(previousAO, currentAO, alpha);


}

//set light
textureStore(
  light_texture, 
  vec2i(global_id.xy), 
  light
  );

//set ao
textureStore(
  ao_texture, 
  vec2i(global_id.xy), 
  ao
  );

}



 */
