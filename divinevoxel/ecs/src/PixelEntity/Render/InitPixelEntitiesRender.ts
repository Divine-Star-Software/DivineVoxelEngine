import { DivineShaderBuilder } from "@divinestar/shaders/";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Render/DivineVoxelEngineRender.js";

export async function InitPixelEntitesRender() {
  const shader = DivineShaderBuilder.shaders.create("#dve_pixel_entity");
  shader.addAttributes([
    ["position", "vec3"],
    ["normal", "vec3"],

    ["cuv3", "vec3"],

    ["indices", "float"],
    ["voxelData", "float"],

    ["faceData0", "vec4"],
    ["faceData1", "vec4"],
    ["faceData2", "vec4"],
    ["faceData3", "vec4"],
    ["faceData4", "vec4"],
    ["faceData5", "vec4"],
  ]);
  shader.addUniform(
    [
      ["world", "mat4"],
      ["viewProjection", "mat4"],

      ["worldView", "mat4"],
      ["view", "mat4"],
      ["projection", "mat4"],
      ["viewProjection", "mat4"],

      ["lightGradient", "float", 16],

      ["sunLightLevel", "float"],
      ["baseLevel", "float"],
      ["doColor", "float"],
      ["doLight", "float"],
    ],
    "vertex"
  );

  shader.addVarying([
    {
      id: "cameraPOS",
      type: "vec3",
      body: {
        GLSL: () => "cameraPOS = cameraPosition;\n",
      },
    },
    {
      id: "worldPOS",
      type: "vec3",
      body: {
        GLSL: () => `vec4 worldPOSTemp =  world * vec4(position, 1.0);
           worldPOS = vec3(worldPOSTemp.x,worldPOSTemp.y,worldPOSTemp.z);`,
      },
    },
    {
      id: "vDistance",
      type: "float",
      body: {
        GLSL: () => " vDistance = distance(cameraPOS , worldPOS );\n",
      },
    },
    {
      id: "mipMapLevel",
      type: "float",
      body: {
        GLSL: () => `
         mipMapLevel = 0.;
         if(vDistance <= 30.) {
          mipMapLevel = 0.;
         }
         if(vDistance > 50. &&  vDistance <= 70.) {
          mipMapLevel = 1.;
         }
         if(vDistance > 70. && vDistance < 90.) {
           mipMapLevel = 2.;
         }
         if(vDistance >= 90.) {
          mipMapLevel = 3.;
          }
         `,
      },
    },
  ]);

  shader.addUniform(
    [
      ["fogOptions", "vec4"],
      ["vFogInfos", "vec4"],
      ["vFogColor", "vec3"],
      ["time", "float"],
      ["cameraPosition", "vec3"],
      ["cameraDirection", "vec3"],
    ],
    "shared"
  );

  shader.addVarying([
    {
      id: "VOXEL",
      type: "mat4",
      body: {
        GLSL: () => `
 mat4 vData;
 
 uint vUID = uint(voxelData);
 uint lightMask = uint(${0xf});
 uint aoMask = uint(${0b11});
 uint animMask = uint(${0b1111_1111_1111_11});
 uint index = uint(0);
 if(doLight == 1.) {


 float sVL = lightGradient[int(((lightMask << index) & vUID) >> index)];

 index = uint(4);
 float rVL = lightGradient[int(((lightMask << index) & vUID) >> index)];

 index = uint(4);
 float gVL = lightGradient[int(((lightMask << index) & vUID) >> index)];

 index = uint(12);
 float bVL = lightGradient[int(((lightMask << index) & vUID) >> index)];



 vData[0] = vec4(
      ( (
 (vec3(rVL,gVL,bVL)) 
 +  ((sVL   * sunLightLevel))  ) 
 + baseLevel).rgb,
 1.) ;



} else {
  vData[0] = vec4(1., 1., 1., 1.) ;
}

index = uint(16);
float AOVL = float(((aoMask << index) & vUID) >> index);
if(AOVL > 1.) {
     AOVL = pow( pow(.65, AOVL - 1. ), 2.2);
}



index = uint(18);
float animVL = float(((animMask << index) & vUID) >> index);



vData[1] = vec4(AOVL,animVL,0.,0.);     

 VOXEL = vData;
 `,
      },
    },
  ]);

  shader.data.vertexBeforeMain.GLSL = `
  #ifdef INSTANCES
  //matricies
  in vec4 world0;
  in vec4 world1;
  in vec4 world2;
  in vec4 world3;
  //custom attributes
  #endif
`;
  /*
[ STORING ALL TEXTURE ROTATIONS IN A SINGLE NUMBER ]

[
  0b00 0b00 0b00 0b00 0b00
  0b00 0b00 0b00 0b00 0b00
]
[
  0b00 0b00 0b00 0b00 0b00
  0b00 0b00 0b00 0b00 0b00
]
[
  0b00 0b00 0b00 0b00 0b00
  0b00 0b00 0b00 0b00 0b00
]
[
  0b00 0b00 0b00 0b00 0b00
  0b00 0b00 0b00 0b00 0b00
] 


*/

  DivineShaderBuilder.snippets.create({
    id: "pixel_entity_uvs",
    body: {
      GLSL: () => `
      vec4 faceData = vec4(0.,0.,0.,0.);
      //top
      if(normal.y == 1.) {
        faceData = faceData0;
      } 
      //bottom
      if(normal.y == -1.) {
        faceData = faceData1;
      } 
      //east
      if(normal.x == 1.) {
        faceData = faceData2;
      } 
      //west
      if(normal.x == -1.) {
        faceData = faceData3;
      } 
      //north
      if(normal.z == 1.) {
        faceData = faceData4;
      } 
      //south
      if(normal.z == -1.) {
        faceData = faceData5;
      } 
     
      uint uvMask = uint(0xffff);
    
      uint xStart = ~(uvMask << uint(0xf)) & uint(faceData.x);
      uint yStart = uvMask & (uint(faceData.x) >> uint(0xf) );
    
      uint xEnd = ~(uvMask << uint(0xf)) & uint(faceData.y);
      uint yEnd = uvMask & (uint(faceData.y) >> uint(0xf) );
    
      uint xDom = ~(uvMask << uint(0xf)) & uint(faceData.z);
      uint yDom = uvMask & (uint(faceData.z) >> uint(0xf) );
    
      float uvXs = float(xStart) / float(xDom);
      float uvYs = float(yStart) / float(yDom);
    
      float uvXe = float(xEnd) / float(xDom);
      float uvYe = float(yEnd) / float(xDom);
    
    
      if(cuv3.x == 0.) {
        dve_pixel_entity_main_texture_index.x = uvXs;
      }
      if(cuv3.y == 0.) {
        dve_pixel_entity_main_texture_index.y = uvYs;
      }
      
      if(cuv3.x == 1.) {
        dve_pixel_entity_main_texture_index.x = uvXe;
      }
      if(cuv3.y == 1.) {
        dve_pixel_entity_main_texture_index.y = uvYe;
      }
      dve_pixel_entity_main_texture_index.z = faceData.w;      
`,
    },
  });
  shader.data.vertexMain.GLSL = `
  #ifdef INSTANCES
  mat4 finalWorld=mat4(world0,world1,world2,world3);
  #endif
  @pixel_entity_uvs
  gl_Position = viewProjection *  world * finalWorld * vec4(position, 1.0);  
`;

  const DVER = DivineVoxelEngineRender.instance;

  DVER.nodes.shaders.create([shader]);
  DVER.nodes.materials.create([
    {
      id: "#dve_pixel_entity",
      alphaBlending: false,
      alphaTesting: true,
      shaderId: "#dve_pixel_entity",
      textureTypeId: "#dve_pixel_entity",
    },
  ]);

  shader.loadInFunctions(
    [
      "#dve_fmb2",
      "#dve_fmb3",
      "#dve_fog",
      "doFog",
      "getAO",
      "getLight",
      "getBase",
      "getMainColor",
    ],
    "frag"
  );

  shader.setCodeBody(
    "frag",
    `
    vec4 rgb = getMainColor();
    if (rgb.a < 0.85) { 
    discard;
   }

 //  rgb = getAO(rgb);
    rgb = getLight(rgb);
    vec3 finalColor = doFog(rgb);
    FragColor = vec4(finalColor.rgb,rgb.a);`
  );

  const material = DVER.nodes.materials.get("#dve_pixel_entity")!;

  material.afterCreate.push((material) => {
    material.setFloat("doLight", 1);
    material.setFloats(
      "lightGradient",
      DVER.nodes.materials.unifrosm.lightGradient
    );
  });

  DVER.nodes.meshes.add([
    {
      id: "#dve_pixel_entity",
      boundingBoxMaxSize: [10, 10, 10],
      materialId: "#dve_pixel_entity",
    },
  ]);
}
