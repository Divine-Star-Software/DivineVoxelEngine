export class VoxelMeshQuery {
  static MeshStruct = /* wgsl */ `

  struct AABB {
    //xyz -> position , w -> active
    min: vec4f,
    //xyz -> position , w- > node type 1 for inner 2 for voxel geometry 
    max: vec4f
  }
  
    struct VoxelMesh {
      //x -> active 
      state: vec4f,
      position: vec3f,
      //x -> vertex offset, y -> indice offset, z -> bvh tree offset, w -> voxel indice offset
      indexOffets: vec4f,
      minBounds : vec3f,
      maxBounds: vec3f,
 
    }
`;
static MeshQueryCode =  /* wgsl */ `


struct TriangleIntersectResult {
  u: f32,
  v: f32,
  t: f32,
};



fn BVH_TriangleIntersect_1(  v0: vec3f,  v1:vec3f, v2:vec3f, rayOrigin:vec3f, rayDirection:vec3f) -> TriangleIntersectResult
{	
	let edge1 = v1 - v0;
	let edge2 = v2 - v0;
	let pvec = cross(rayDirection, edge2);
	let det = 1.0 / dot(edge1, pvec);
	let tvec = rayOrigin - v0;
	let u = dot(tvec, pvec) * det;
	let qvec = cross(tvec, edge1);
	let v = dot(rayDirection, qvec) * det;
	let t = dot(edge2, qvec) * det;
  if (det < 1e-8 || t <= 1e-8 || u < 0.0 || u > 1.0 || v < 0.0 || u + v > 1.0) {
    return TriangleIntersectResult(u, v, INFINITY);
}
  return TriangleIntersectResult(u,v,t);
}



fn BVH_TriangleIntersect_2(
    v0: vec3f,
    v1: vec3f,
    v2: vec3f,
    rayOrigin: vec3f,
    rayDirection: vec3f,
) -> TriangleIntersectResult {
    let n = cross(v1 - v0, v2 - v0);
    let nDotDir = dot(n, rayDirection);

    // Check if ray is parallel or pointing away from the triangle
    if nDotDir >= 0.0 {
        return TriangleIntersectResult(0.0, 0.0, INFINITY);
    }

    let nDotDirInv = 1.0 / nDotDir;
    let denom = 1.0 / dot(n, n);
    let d = -dot(n, v0);

    let t = -(dot(n, rayOrigin) + d) * nDotDirInv;
    if t < 0.0 {
        return TriangleIntersectResult(0.0, 0.0, INFINITY);
    }

    let ip = rayOrigin + t * rayDirection;

    // Inside-outside test for each edge
    let edge0 = v1 - v0;
    let c0 = cross(edge0, ip - v0);
    if dot(n, c0) < 0.0 {
        return TriangleIntersectResult(0.0, 0.0, INFINITY);
    }

    let edge1 = v2 - v1;
    let c1 = cross(edge1, ip - v1);
    let u = dot(n, c1);
    if u < 0.0 {
        return TriangleIntersectResult(0.0, 0.0, INFINITY);
    }

    let edge2 = v0 - v2;
    let c2 = cross(edge2, ip - v2);
    let v = dot(n, c2);
    if v < 0.0 {
        return TriangleIntersectResult(0.0, 0.0, INFINITY);
    }

    // Normalize u and v
    let uNorm = u * denom;
    let vNorm = v * denom;

    return TriangleIntersectResult(uNorm, vNorm, t);
}

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


/*
Voxel Mesh Lookups
*/
fn getWorldMeshIndex(position: vec3<f32> ) -> u32 {
  let relative = floor(abs(position - scene_props.worldBoundsMin)/16);
 return u32(relative.x
  + relative.y * scene_props.voxelMeshBounds.x 
  + relative.z * scene_props.voxelMeshBounds.x * scene_props.voxelMeshBounds.y); 
}


fn pointInWorldBounds(position: vec3<f32>) -> bool {
  if (position.x < scene_props.worldBoundsMin.x || position.x > scene_props.worldBoundsMax.x ||
      position.y < scene_props.worldBoundsMin.y || position.y > scene_props.worldBoundsMax.y ||
      position.z < scene_props.worldBoundsMin.z || position.z > scene_props.worldBoundsMax.z) {
      return false;
  }
  return true;
}

struct VoxelMeshSearchResult {
  found: bool,
  index: u32
}

fn getWorldMesh(position: vec3f) -> VoxelMeshSearchResult {
  if(!pointInWorldBounds(position)) {
    return VoxelMeshSearchResult(false, 0u);
  }
  let index =  getWorldMeshIndex(position);
  let mesh = voxel_meshes[index];
  if(mesh.state.x == 0.) {
     return VoxelMeshSearchResult(false, 0u);
  }
  return VoxelMeshSearchResult(true, index);
}
struct VoxelGeometryIntersectResult {
  hit: bool,
  normal: vec3f,
  position: vec3f,
  uv: vec2f,
  triangleId: u32,
  t: f32,
}

struct VoxelMeshIntersectResult {
  found: bool,
  foundObject:  u32,
  t: f32,
  error: bool,
  triangle: VoxelGeometryIntersectResult
}


fn voxelMeshQuery(
  rayOrigin: vec3f,
  rayDirection: vec3f,
  rayRight: vec3f,
  rayUp: vec3f,
  MAX_DISTANCE: f32
) -> VoxelMeshIntersectResult {
  let worldUp = vec3(0.0, 1.0, 0.0);
  var finalResult  = VoxelMeshIntersectResult(false, 0u, 0,false,
    VoxelGeometryIntersectResult(false, vec3f(0,0,0),vec3f(0,0,0),vec2f(0,0), 0u, 0.0)
  );
  let invDir = vec3<f32>(
    1.0 / (sign(rayDirection.x) * max(abs(rayDirection.x), 1e-8)),
    1.0 / ( sign(rayDirection.y) * max(abs(rayDirection.y), 1e-8)),
    1.0 / (sign(rayDirection.z) * max(abs(rayDirection.z), 1e-8))
  );
  
  let cubeSize = 16.0;
  let subCubeSize = 8.0;
  let halfSize = cubeSize / 2.0;

  let rayLength = 16.0;
  var t = INFINITY;



  var totalDistance = 0.0;


  var rayPosition = rayOrigin;

  while(true) {

   // Define the corners of the oriented bounding cube
   let cubeMinCorner = rayPosition 
      - rayDirection * halfSize 
      - rayRight * halfSize 
      - rayUp * halfSize;
    let cubeMaxCorner = rayPosition 
      + rayDirection * halfSize 
      + rayRight * halfSize 
      + rayUp * halfSize;


    // Traverse through the sub-cubes
    for (var i = 0; i < 3; i = i + 1) {
      for (var j = 0; j < 3; j = j + 1) {
          for (var k = 0; k < 3; k = k + 1) {
                // Calculate the offset for this sub-cube
                let offset = rayDirection * (f32(i) * subCubeSize)
                    + rayRight * (f32(j) * subCubeSize)
                    + rayUp * (f32(k) * subCubeSize);

                // Calculate the center of the sub-cube
                let subCubeCenter = cubeMinCorner + offset;

                // Calculate the min and max corners of the sub-cube
                let subCubeMinCorner = subCubeCenter 
                  - rayDirection * (subCubeSize / 2.0) 
                  - rayRight * (subCubeSize / 2.0) 
                  - rayUp * (subCubeSize / 2.0);

                let meshLookUp =  getWorldMesh(subCubeMinCorner);
                let chunkT =    BoundingBoxIntersect(
                  voxel_meshes[meshLookUp.index].minBounds,
                  voxel_meshes[meshLookUp.index].maxBounds,
                  rayOrigin,
                  invDir
                );

                  
                if(
                  meshLookUp.found && 
                  chunkT < t
                  && chunkT < MAX_DISTANCE
                ) {
                  let result =  VoxelMeshIntersect(rayOrigin, rayDirection, meshLookUp.index, MAX_DISTANCE);
                  if(result.found) {
                    if(result.t <= t) {
                      finalResult = result;
                      t = result.t;

                    }
                  }
                }
      
          }
      }
    }



    if(finalResult.found) {
      break;
    }   

    totalDistance += rayLength;
    if (totalDistance > MAX_DISTANCE) {
      break;
    }


    rayPosition += rayLength * rayDirection;

  };

 return finalResult;

}




fn VoxelGeometryIntersect(ro: vec3f, rd: vec3f, nodeId: u32, voxelMeshIndex: u32) -> VoxelGeometryIntersectResult {
  var intersectResult = VoxelGeometryIntersectResult(false, vec3f(0,0,0),vec3f(0,0,0),vec2f(0,0), 0u, 0.0);

  var finalTriResult = TriangleIntersectResult(0.,0.,0.);
  var triId = 0u;
  var t = INFINITY;
  let mesh = voxel_meshes[voxelMeshIndex];
  let position = mesh.position;
  let voxelIndiceOffset = u32(mesh.indexOffets.w);
 // let voxelIndiceOffset = 4096u * 2u * voxelMeshIndex;
  let indiceOffsets = voxel_indice[voxelIndiceOffset + nodeId];

  let length = indiceOffsets.y - indiceOffsets.x;
  if(length <= 0) {
    return intersectResult;
  }




  let vertexOffset = u32(mesh.indexOffets.x);
  let indiceOffset = u32(mesh.indexOffets.y) + u32(indiceOffsets.x);


  var finalIndex = 0u;
  for(var indiceIndex = 0u; indiceIndex < u32(length); indiceIndex += 3u) {
      let v1 = vertexOffset + indices[indiceOffset + indiceIndex];
      let v2 = vertexOffset + indices[indiceOffset + indiceIndex + 1u];
      let v3 = vertexOffset + indices[indiceOffset + indiceIndex + 2u];

      let triResult = BVH_TriangleIntersect_1(
        vertices[v3].position + position, 
        vertices[v2].position + position, 
        vertices[v1].position + position, 
        ro, 
        rd
      );


      if(triResult.t < t && triResult.t != INFINITY) {
        intersectResult.hit = true;
        t = triResult.t; 
        finalTriResult = triResult;
        triId = indiceIndex/3u;
        finalIndex = indiceOffset + indiceIndex;
      }



  }

  if(intersectResult.hit ) {
    var triIndex = triId * 3u;
    // Retrieve vertex normals
    let n1 = vertices[vertexOffset + indices[finalIndex]].normal;
    let n2 = vertices[vertexOffset + indices[finalIndex + 1u]].normal;
    let n3 = vertices[vertexOffset + indices[finalIndex + 2u]].normal;

    let uv1 = vertices[vertexOffset + indices[finalIndex]].uv;
    let uv2 = vertices[vertexOffset + indices[finalIndex + 1u]].uv;
    let uv3 = vertices[vertexOffset + indices[finalIndex + 2u]].uv;
    
    // Provided intersection UV
    let intersectionUV = vec2f(finalTriResult.u,finalTriResult.v);

 
    // Assign the interpolated normal

    let u = finalTriResult.u;
    let v = finalTriResult.v;
    
 
    let interpolatedNormal = normalize(
      n1 * (1.0 - u - v) + 
      n2 * u + 
      n3 * v
  );
  intersectResult.normal = interpolatedNormal;
    intersectResult.uv.x = finalTriResult.u;
    intersectResult.uv.y = finalTriResult.v;
    intersectResult.position = ro + rd * finalTriResult.t;

    intersectResult.t  =  finalTriResult.t;
  }

  return intersectResult;

}


struct StackNode {
  nodeId: u32,
  t: f32
}

const STACK_SIZE = 13;
var<private> stack: array<StackNode,STACK_SIZE> = array<StackNode,STACK_SIZE>(${new Array(13).fill(0).map((_)=>'StackNode(0u,0.0)').join(',')});

const VOXEL_NODE_INDEX = 4095u;
fn VoxelMeshIntersect(ro: vec3f, rd: vec3f, voxelMeshIndex: u32, MAX_DISTANCE: f32) -> VoxelMeshIntersectResult {
  let mesh = voxel_meshes[voxelMeshIndex];

  var intersectResult = VoxelMeshIntersectResult(false, 0u, 0,false,
    VoxelGeometryIntersectResult(false, vec3f(0,0,0),vec3f(0,0,0),vec2f(0,0), 0u, 0.0)
  );
  let position = mesh.position;

  var stackIndex = 0u;
  var currentNodeIndex = 0u;
  var currentNodeT = 0.0;

  let inverseDir = 1.0 / rd;
  let offset = u32(mesh.indexOffets.z);

 
  loop {

      // Check if current node is a leaf
      let currentNode = voxel_bvh[currentNodeIndex + offset];
      if (currentNode.max.w == 2.0) {
          // Found a leaf node check against actual triangles 
           let geometryResult = VoxelGeometryIntersect(
            ro, rd, currentNodeIndex - VOXEL_NODE_INDEX, voxelMeshIndex
          );
          if(geometryResult.hit) {
            intersectResult.found = true;
            intersectResult.t = currentNodeT;
            intersectResult.triangle = geometryResult;
            break;
          } else {
            // If stack is empty, break
            if (stackIndex == 0u) {
              break;
            }
            // Pop from stack
            stackIndex--;
            currentNodeIndex = stack[stackIndex].nodeId;
            currentNodeT = stack[stackIndex].t;
            continue;
          }

      }
   
      // Fetch left and right child IDs
      let leftChildId = 2u * currentNodeIndex + 1u;
      let rightChildId = 2u * currentNodeIndex + 2u;

      // Fetch left and right child nodes
      let leftChild = voxel_bvh[leftChildId + offset];
      let rightChild = voxel_bvh[rightChildId + offset];

      // Initialize intersection distances to INFINITY
      var leftChildT = INFINITY;
      var rightChildT = INFINITY;

      // Test left child
      if (leftChild.min.w >= 0) {
          leftChildT = BoundingBoxIntersect(
              vec3f(leftChild.min.xyz) + position,
              vec3f(leftChild.max.xyz) + position,
              ro,
              inverseDir
          );
          if(leftChildT > MAX_DISTANCE) {
            leftChildT = INFINITY;
          }
      }

      // Test right child
      if (rightChild.min.w >= 0) {
          rightChildT = BoundingBoxIntersect(
              vec3f(rightChild.min.xyz) + position,
              vec3f(rightChild.max.xyz) + position,
              ro,
              inverseDir
          );
          if(rightChildT > MAX_DISTANCE) {
            rightChildT = INFINITY;
          }
      }

      // If neither child is hit
      if (leftChildT == INFINITY && rightChildT == INFINITY) {
          // If stack is empty, break
          if (stackIndex == 0u) {
              break;
          }
          // Pop from stack
          stackIndex--;
          currentNodeIndex = stack[stackIndex].nodeId;
          currentNodeT = stack[stackIndex].t;
          continue;
      }

      // If only left child is hit
      if (leftChildT < INFINITY && rightChildT == INFINITY) {
          currentNodeIndex = leftChildId;
          currentNodeT = leftChildT;
      }
      // If only right child is hit
      else if (rightChildT < INFINITY && leftChildT == INFINITY) {
          currentNodeIndex = rightChildId;
          currentNodeT = rightChildT;
      }
      // If both children are hit
      else if (leftChildT < INFINITY && rightChildT < INFINITY) {
          // Process closer child first
          if (leftChildT <= rightChildT) {
              // Push right child onto stack
              if (stackIndex >= STACK_SIZE) {
                  intersectResult.error = true;
                  break;
              }
              stack[stackIndex] = StackNode(rightChildId, rightChildT);
              stackIndex++;
              currentNodeIndex = leftChildId;
              currentNodeT = leftChildT;
          } else {
              // Push left child onto stack
              if (stackIndex >= STACK_SIZE) {
                  intersectResult.error = true;
                  break;
              }
              stack[stackIndex] = StackNode(leftChildId, leftChildT);
              stackIndex++;
              currentNodeIndex = rightChildId;
              currentNodeT = rightChildT;
          }
      }


  }

  return intersectResult;
}



`
}
/*


  



*/