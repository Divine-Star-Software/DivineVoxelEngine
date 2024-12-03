import { VoxelMeshTypes } from "@divinevoxel/vlox/Mesher/Types/VoxelMesh.types";
import { VoxelCommon } from "./VoxelCommon";
import { VoxelMeshQuery } from "./VoxelMeshQuery";

export class VoxelRayRender {
  static Create() {
    const shader = /* wgsl */ `
const INFINITY = 100000000.0;


${VoxelCommon.CommonStructs}

//data
struct VoxelMeshVertex {
    position: vec3f,
    normal: vec3f,
    voxelData: f32,
    textureIndex: vec3f,
    uv: vec2f,
    colors: vec3f,
    _padding: vec3f, 
};




${VoxelMeshQuery.MeshStruct}

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


@group(2) @binding(0) var output_texture: texture_storage_2d<rgba32float, write>;


@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    textureStore(
    output_texture, 
    vec2<i32>(global_id.xy), 
    mainFragment(vec2<f32>(f32(global_id.x),f32(global_id.y))) 
    );
}




/*
Ray Functions
*/

${VoxelMeshQuery.MeshQueryCode}



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

fn mainFragment(fragCoord: vec2f) -> vec4f {

  let worldUp = vec3(0.0, 1.0, 0.0);
  var color = vec4f(1.,1.,1.,1.);


  let finalCoord = fragCoord;
  var sunPosition =scene_props.sunPosition;

  var screenCoord = (finalCoord.xy / scene_props.resolution.xy) * 2.0 - 1.0;
  screenCoord.y *= -1.0;
  let tanHalfFov = tan(camera.settings.x * 0.5);
  var rayDirection = normalize(
      screenCoord.x * -camera.right * tanHalfFov * camera.settings.y +
      screenCoord.y * camera.up * tanHalfFov +
      camera.forward
  );
  var rayOrigin = camera.position;
  var rayRight = normalize(cross(rayDirection, worldUp));

  const elipse = f32(1e-6);

  if(rayDirection.x == 0){ rayDirection.x = elipse;}
  if(rayDirection.y == 0){ rayDirection.y = elipse;}
  if(rayDirection.z == 0) {rayDirection.z =elipse;}
  

  if(rayRight.x == 0){ rayRight.x = elipse;}
  if(rayRight.y == 0){ rayRight.y = elipse;}
  if(rayRight.z == 0) {rayRight.z =elipse;}
  

  var rayUp = normalize(cross(rayRight, rayDirection));
  if(rayUp.x == 0){ rayUp.x = elipse;}
  if(rayUp.y == 0) {rayUp.y = elipse;}
  if(rayUp.z == 0) { rayUp.z = elipse;}
  
  let meshLookUp = voxelMeshQuery(camera.position,rayDirection,rayRight,rayUp);
  if(meshLookUp.error) {
      return vec4f(1.,0.,0.,1);
  }
  if(
    meshLookUp.found 
  ) {
    let normal = meshLookUp.triangle.normal;
    
  /*   let baseColor = vec4f(
      abs(normal.x),  // Red for X-axis
      abs(normal.y),  // Green for Y-axis
      abs(normal.z)   // Blue for Z-axis,
      ,1.0
  );

  // Compute the tint for negative directions
  var tint = vec4f(0.0, 0.0, 0.0,1.0);
  if (normal.x < 0.0) {
      tint.x = 0.5;
  }
  if (normal.y < 0.0) {
      tint.y = 0.5;
  }
  if (normal.z < 0.0) {
      tint.z = 0.5;
  }

  // Combine base color with the tint
   color = (baseColor - tint);  */


   let hitPosition = meshLookUp.triangle.position;

let sunDirection = normalize(sunPosition - hitPosition);

let epsilon = 0.01;
let newHitPosition = hitPosition + normal * epsilon;

//let angle = max(dot(normal, sunDirection), 0.0);
//let epsilon = 0.0001 * (1.0 / angle); // Adjust epsilon based on angle
//let newHitPosition = hitPosition + normal * epsilon;

let sunRight = normalize(cross(sunDirection, worldUp));
let sunUp = normalize(cross(sunRight, sunDirection));


let distanceToSun = length(sunPosition - newHitPosition);


let sunLookUp = voxelMeshQuery(newHitPosition, sunDirection, sunRight, sunUp);

if (sunLookUp.found) {
   color.r = 0.25;
   color.g = 0.25;
    color.b = 0.25;
    
}

 }
 return color;

}

`;
    return shader;
  }
}

/*


fn BoundingBoxIntersect(  minCorner: vec3f,  maxCorner: vec3f, rayOrigin: vec3f, invDir: vec3f ) -> f32 {


  let near = (minCorner - rayOrigin) * invDir;
  let far  = (maxCorner - rayOrigin) * invDir;

  let tmin = min(near, far);
  let tmax = max(near, far);

  let t0 = max( max(tmin.x, tmin.y), tmin.z);
  let t1 = min( min(tmax.x, tmax.y), tmax.z);

  //return t1 >= max(t0, 0.0) ? t0 : INFINITY;
   if(max(t0, 0.0) > t1) { 
    return INFINITY; 
  } 
   
   return t0; 
}
*/
/*   const MAX_STEPS = 100;
  const HIT_THRESHOLD = 0.01; // Minimum distance to consider a hit
  const MAX_DISTANCE = 100.0;

  var totalDistance = 0.0;
  for (var i = 0; i < MAX_STEPS; i++) {
      let distanceToSphere = sdfSphere(rayPosition, vec3f(0.0, 0.0, 0.0), .5);
  
      if (distanceToSphere < HIT_THRESHOLD) {
          color = vec4f(1.0, 0.0, 0.0, 1.0); // Hit the sphere
          break;
      }
  
      totalDistance += distanceToSphere;
  
      if (totalDistance > MAX_DISTANCE) {
          // Exceeded maximum ray distance
          break;
      }
  
      rayPosition += rayDirection * distanceToSphere;
  }
 */
