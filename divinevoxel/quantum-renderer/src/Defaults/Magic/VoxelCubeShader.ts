import { VoxelBaseShader } from "./VoxelBaseShader";

export class VoxelCubeShader {
  static define = /*wgsl */ `
      
      ${VoxelBaseShader.define}
      
      `;
  static functions = VoxelBaseShader.functions(/*wgsl */ `

    fn mincomp(v: vec3<f32>) -> f32 {
      return min(min(v.x, v.y), v.z);
  }
  
  
  const faceNormals: array<vec3<f32>, 6> = array<vec3<f32>, 6>(
    vec3<f32>(1.0, 0.0, 0.0),  // +X face
    vec3<f32>(-1.0, 0.0, 0.0), // -X face
    vec3<f32>(0.0, 1.0, 0.0),  // +Y face
    vec3<f32>(0.0, -1.0, 0.0), // -Y face
    vec3<f32>(0.0, 0.0, 1.0),  // +Z face
    vec3<f32>(0.0, 0.0, -1.0)  // -Z face
);

  struct VoxelCastResult {
    res: vec2<f32>,
    normal: vec3<f32>,
    ao: f32
  }
  const boundsMin: vec3<f32> = vec3<f32>(0.,0.,0.);
  fn voxelCast(rayOrigin: vec3<f32>, rayDirection: vec3<f32>) -> VoxelCastResult {
    var t: f32 = 0.0;
    var res = VoxelCastResult(vec2<f32>(-1.,0.),vec3<f32>(0.,0.,0.),0.);
    let gridSize: f32 = voxelParams.grid.w;
    let invDir: vec3<f32> = 1.0 / rayDirection; // Inverse direction to handle division by zero
    let interSectionCheck: vec2<f32> = intersectVoxelCheck(rayOrigin,rayDirection, boundsMin, vec3<f32>(voxelParams.grid.xyz * voxelParams.grid.w));
   var epsilon = voxelParams.scene.y; 
    if(interSectionCheck.x > 0) {
        t =  interSectionCheck.x;;
        epsilon = .001;
    } else {
        if (rayDirection.y != 0.0) {
            let tFloor: f32 = -rayOrigin.y / rayDirection.y; // Solve for when y component of the ray equals 0
            if(tFloor > 90) {
                return res;
            }
            if (tFloor > 0.0) {
                res.res.x = tFloor;
                res.res.y = 1.0; // Using 1.0 to denote the floor plane
                return res;
            }
        }
    }

    loop {
        if (t > voxelParams.scene.x * voxelParams.grid.w +  interSectionCheck.x ) {
            break;
        }
        
        let p: vec3<f32> = rayOrigin + t * rayDirection;
        if(p.y < 0.){
            if (rayDirection.y != 0.0) {
                let tFloor: f32 = -rayOrigin.y / rayDirection.y; // Solve for when y component of the ray equals 0
                if(tFloor > 90) {
                    return res;
                }
                if (tFloor > 0.0) {
                    res.res.x = tFloor;
                    res.res.y = 1.0; // Using 1.0 to denote the floor plane
                    return res;
                }
            }
            return res; // Return with no intersection if direction y is 0 or intersection is behind the ray
        } 
          
        if(!withinBounds(p)) {
            t +=  epsilon;
            continue;
          }
       
          
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
                if (tEnter < tExit  && t < tExit) {
                    res.res.x = tEnter;
                    res.res.y = f32(voxelValue );
                    let voxelCenter = voxelMin +  gridSize*.5;
                    let dist = distance(vec3(0.),voxelCenter);
                    let dir = normalize(voxelCenter - vec3(0.));

                    let pointOnFace = vec3<f32>(rayOrigin + tEnter * rayDirection) - dist * dir;
                    var normal = vec3<f32>(0.);
                  
                    var maxComp = max(max(abs(pointOnFace.x),abs(pointOnFace.y)),abs(pointOnFace.z));
         
                    res.normal = vec3<f32>(
                        select(0.,select(1.,-1.,pointOnFace.x < 0), abs(pointOnFace.x) == maxComp),
                        select(0.,select(1.,-1.,pointOnFace.y < 0), abs(pointOnFace.y) == maxComp),
                        select(0.,select(1.,-1.,pointOnFace.z < 0), abs(pointOnFace.z) == maxComp)
                    );
              
                    return res; 
                }
                let voxelIndex: u32 = getIndex(p);
                let voxelValue: f32 = voxelLookUp.distance[voxelIndex] * voxelParams.grid.w;
          
                t += epsilon;
            } else {

                let voxelIndex: u32 = getIndex(p);
                let voxelValue: f32 = voxelLookUp.distance[voxelIndex];
    
                t += max(epsilon , voxelValue * voxelParams.grid.w * .01);
            }
    
    
    }
    
    return res;
}


  fn applyAttenuation(color: vec3<f32>, t: f32) -> vec3<f32> {
    let attenuation = 1.0 / (1.0 + 10. * t + 10. * t * t);
    return color * attenuation;
}
  fn debugRender(ro: vec3<f32>, rd: vec3<f32>, rdx: vec3<f32>, rdy: vec3<f32>) -> vec3<f32>  {
    var col: vec3<f32> = vec3<f32>(0.01, 0.01, 0.01) - max(rd.y, 0.0) * 0.3;
    
    let res = voxelCast(ro, rd);
    let t: f32 = res.res.x;
    let m: f32 = res.res.y;
    if m > -0. {
        let pos: vec3<f32> = ro + t * rd;
        let nor: vec3<f32> = res.normal;
   
      //  col = applyAttenuation(col,t);
      //  col.b = 1.;

     
        if (nor.x > 0.) {
            col = vec3<f32>(1., 0., 0.); // Red for +X
        } else if (nor.x < 0.) {
            col = vec3<f32>(0., 1., 0.); // Green for -X
        }

        if (nor.y > 0.) {
            col = vec3<f32>(0., 0., 1.); // Blue for +Y
        } else if (nor.y < 0.) {
            col = vec3<f32>(1., 1., 0.); // Yellow for -Y
        }

        if (nor.z > 0.) {
            col = vec3<f32>(0.5, 0., 0.5); // Purple for +Z
        } else if (nor.z < -0.) {
            col = vec3<f32>(1., 0.5, 0.); // Orange for -Z
        }
   
    } 
       
    

    return clamp(col, vec3<f32>(0.0, 0.0, 0.0), vec3<f32>(1.0, 1.0, 1.0));
}
fn toLinear(c: f32) -> f32 {
    if (c <= 0.04045) {
        return c / 12.92;
    } else {
        return pow((c + 0.055) / 1.055, 2.4);
    }
}

fn toSRGB(c: f32) -> f32 {
    if (c <= 0.0031308) {
        return 12.92 * c;
    } else {
        return 1.055 * pow(c, 1.0 / 2.4) - 0.055;
    }
}

// Convert a vec3 from sRGB to linear
fn convertColorToLinear(color: vec3<f32>) -> vec3<f32> {
    return vec3<f32>(toLinear(color.r), toLinear(color.g), toLinear(color.b));
}

// Convert a vec3 from linear to sRGB
fn convertColorToSRGB(color: vec3<f32>) -> vec3<f32> {
    return vec3<f32>(toSRGB(color.r), toSRGB(color.g), toSRGB(color.b));
}
fn shadow(ro: vec3<f32>, rd: vec3<f32>) -> f32 
{
    let res = voxelCast(ro, rd);
    return select(0.,1.,res.res.x < 0.);
}
  fn render(ro: vec3<f32>, rd: vec3<f32>, rdx: vec3<f32>, rdy: vec3<f32>) -> vec3<f32>  {
      var col: vec3<f32> = vec3<f32>(0.8, 0.8, 0.8) - max(rd.y, 0.0) * 0.3;
      
      let res = voxelCast(ro, rd);
      let t: f32 = res.res.x;
      let m: f32 = res.res.y;
      let pos: vec3<f32> = ro + t * rd;
      if m > -0. {
  
      let nor: vec3<f32> = select( res.normal, vec3<f32>(0.0, 1.0, 0.0) ,    (m == 1.));
  
      let refr: vec3<f32> = reflect(rd, nor);
  
      var ks: f32 = 1.0;
      if(m == 1.) {

      col = convertColorToLinear(vec3(.3,.3,.3));
      ks = .01;
      } else {
          col =  convertColorToLinear(vec3(voxelMaterials[u32(m - 1.)].color.rgb));
      }
  
  
      let occ: f32 = calcAO(pos, nor);
  
      var lin: vec3<f32> = vec3<f32>(0.0);

      // sun
      let lig: vec3<f32> = normalize(vec3<f32>(-0.9, 0.4, -0.6));
      let hal: vec3<f32> = normalize(lig - rd);
      var dif: f32 = clamp(dot(nor, lig), 0.0, 1.0);
      dif *= shadow(ro + rd * t + nor * 0.01, lig);
      var spe: f32 = pow(clamp(dot(nor, hal), 0.0, 1.0), 16.0);
      spe *= dif;
      spe *= 0.04 + 0.96 * pow(clamp(1.0 - dot(hal, lig), 0.0, 1.0), 5.0);
      lin += col * 2.20 * dif * vec3<f32>(1.30, 1.00, 0.70);
    //  lin += 5.00 * spe * vec3<f32>(1.30, 1.00, 0.70) * ks;
  
      // sky
      dif = sqrt(clamp(0.5 + 0.5 * nor.y, 0.0, 1.0));
      dif *= occ;
      spe = smoothstep(-0.2, 0.2, refr.y);
      spe *= dif;
      spe *= 0.04 + 0.96 * pow(clamp(1.0 + dot(nor, rd), 0.0, 1.0), 5.0);
      
      spe *= calcSoftshadow(pos, refr, 0.02, 2.5);
      lin += col * 0.60 * dif * vec3<f32>(0.40, 0.60, 1.15);
    //  lin += 2.00 * spe * vec3<f32>(0.40, 0.60, 1.30) * ks; 
  
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
      col = mix(col, vec3<f32>(0.8, 0.8, 0.8), 1.0 - exp(-0.000006 * t * t * t)); 
  
      }
   
    
      return convertColorToLinear(clamp(col, vec3<f32>(0.0, 0.0, 0.0), vec3<f32>(1.0, 1.0, 1.0)));
  }
  

  fn aoRender(ro: vec3<f32>, rd: vec3<f32>, rdx: vec3<f32>, rdy: vec3<f32>) -> vec3<f32>  {
    var col: vec3<f32> = vec3<f32>(0.7, 0.7, 0.9);
    
    let res = voxelCast(ro, rd);
    let t: f32 = res.res.x;
    let m: f32 = res.res.y;
    if m > -0. {
        let pos: vec3<f32> = ro + t * rd;
  
        col *= calcAO(pos,res.normal);

  
    }

    return clamp(col, vec3<f32>(0.0, 0.0, 0.0), vec3<f32>(1.0, 1.0, 1.0));
}

  
  fn sdBox(p: vec3<f32>, b: vec3<f32>) -> f32 {
      let d = abs(p) - b;
      return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, vec3<f32>(0.0, 0.0, 0.0)));
  }
  /* 

  fn map(p: vec3<f32>) -> vec2<f32> {
  
    var d = 100000.;
    let voxelSize = voxelParams.grid.w; // Actual voxel size
    // Calculate the offset based on the voxel size
    var s = p;
    var o = vec3<f32>(0);
    var m = 0.;

    // Use voxelSize to scale the loop iteration step
    for (o.z = -1.0; o.z <= 1.0; o.z += 1.0) {
        for (o.y = -1.0; o.y <= 1.0; o.y += 1.0) {
            for (o.x = -1.0; o.x <= 1.0; o.x += 1.0) {
                
                // Multiply the offset 'o' by voxelSize before adding it to 'p'
                let point = p + o * voxelSize;
                if(!withinBounds(point)) {
                    continue;
                }
                let vres = voxelMap(point);
                d = min(d, vres.x);
                if (vres.y > 0.) {
                    m = vres.y;
                }
            }
        }
    }

    return vec2(d, m);
}

fn voxelMap(v: vec3<f32>) -> vec2<f32> {
    let voxelSize = voxelParams.grid.w; // Actual voxel size
    let voxelIndex: u32 = getIndex(v);
    let voxelValue: u32 = voxelGrid.data[voxelIndex];
    
    if (voxelValue > 0) {
        let  voxelCenter =vec3(floor(v / voxelSize) * voxelSize) + voxelSize * .5;
        // Here, we adjust the SDF function to account for the voxel size
        return vec2(sdBox( voxelCenter - v , vec3(0.5 * voxelSize)), f32(voxelValue));
    }
    return vec2(10000., 0.);
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
 

 
*/



fn map(p: vec3<f32>) -> vec2<f32> { // for correct ambient occlusion sample 2x2x2 voxels (slow!)
    // I think kastorp originally suggested to sample only 2x2x2 instead of 3x3x3, thanks!
    let voxelSize = voxelParams.grid.w; // Actual voxel size
    var d = EmptyVoxel;
    var s = vec3(step(vec3(voxelSize), fract(p)));
    var o = vec3<f32>(0);
    var m = 0.;
    for (o.z = s.z - voxelSize; o.z < s.z + voxelSize; o.z = o.z + voxelSize) {
        for (o.y = s.y - voxelSize; o.y < s.y + voxelSize; o.y = o.y + voxelSize) {
            for (o.x = s.x - voxelSize; o.x < s.x + voxelSize; o.x = o.x + voxelSize) {
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
    let voxelSize = voxelParams.grid.w;
    if(result.x > 0.) {
        return vec2(sdBox(l-.5*voxelSize, vec3(.5*voxelSize)),result.y);
    }
    return vec2(EmptyVoxel,0.);
}

      `);
}
