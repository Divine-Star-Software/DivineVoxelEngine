import { URIShaderBuilder } from "@amodx/uri/Shaders/URIShaderBuilder.js";
import {
  ShaderAttributeData,
  ShaderConstantData,
  ShaderUniformData,
  ShaderVaryingData,
} from "@amodx/uri/Shaders/Types/ShaderData.types.js";

import { RegisterFragFunctions } from "./Code/Functions/FragmentFunctions.js";
import { RegisterVertexFunctions } from "./Code/Functions/VertexFunctions.js";
import { RegisterVertexSnippets } from "./Code/Snippets/VertexSnippets.js";
import { RegisterFragmentSnippets } from "./Code/Snippets/FragmentSnippets.js";
import { RegisterFogShaders } from "./Code/Functions/FogShaders.js";
import { RegisterNoiseFunctions } from "./Code/Functions/UtilShaders.js";
import { RegisterVoxelSnippets } from "./Code/Snippets/VoxelSnippets.js";
import { DVEShaderRegister } from "./DVEShaderRegister.js";
import { URIShader } from "@amodx/uri/Shaders/Classes/URIShader.js";
export class DVEShaders {
  static register = new DVEShaderRegister();
  static builder = URIShaderBuilder;
  static voxelAttributes: ShaderAttributeData[] = [
    ["position", "vec3"],
    ["normal", "vec3"],
    ["indices", "float"],
    ["faceData", "float"],
    ["voxelData", "float"],
    ["textureIndex", "vec3"],
    ["uv", "vec2"],
    ["colors", "vec3"],
  ];
  static voxelSharedUniforms: ShaderUniformData[] = [
    ["time", "float"],
    ["fogOptions", "vec4"],
    ["vFogColor", "vec3"],
    ["sunLightLevel", "float"],
    ["baseLevel", "float"],
    ["doAO", "float"],
    ["doSun", "float"],
    ["doRGB", "float"],
    ["doColor", "float"],
    ["doEffects", "float"],
    ["mipMapBias", "float"],
  ];
  static voxelVertexUniforms: ShaderUniformData[] = [
    ["world", "mat4"],
    ["viewProjection", "mat4"],

    ["worldOrigin", "vec3"],
    ["cameraPosition", "vec3"],

    ["lightGradient", "float", 16],
  ];

  static voxelConstants: ShaderConstantData[] = [
    {
      id: "voxelConstants",
      body: {
        GLSL: /* glsl */ `
const uint lightMask = uint(0xf);
const uint aoMask = uint(0xf);
const uint animMask = uint(0xfff);
const uint sVLIndex = uint(0);
const uint rVLIndex = uint(4);
const uint gVLIndex = uint(8);
const uint bVLIndex = uint(12);
const uint aoIndex = uint(16);
const uint animIndex = uint(20);
const float aoValue =  pow( .5, 2.2);
        `,
      },
    },
  ];

  static voxelVarying: ShaderVaryingData<any>[] = [
    {
      id: "VOXEL",
      type: "mat4",
      body: {
        GLSL: () => /* glsl */ `
mat4 vData;
uint vUID = uint(voxelData);
float sVL = lightGradient[int(((lightMask << sVLIndex) & vUID) >> sVLIndex)];

int redValue = int(((lightMask << rVLIndex) & vUID) >> rVLIndex);

int greenValue = int(((lightMask << gVLIndex) & vUID) >> gVLIndex);

int blueValue = int(((lightMask << bVLIndex) & vUID) >> bVLIndex);


float AOVL = float(((aoMask << aoIndex) & vUID) >> aoIndex);
if(AOVL > 0.) {
  AOVL = aoValue;
} else {
  AOVL = 1.;
}

float animVL = float(((animMask << animIndex) & vUID) >> animIndex);


vData[0] = vec4(
    max(
        ( ( vec3(lightGradient[redValue], lightGradient[greenValue], lightGradient[blueValue]) * doRGB) 
        +  (sVL * doSun * sunLightLevel) ), 
        baseLevel
    ),
    1.0
);

/*
vData[0] = vec4(
      lightGradient[redValue] * doRGB, 
      lightGradient[greenValue] * doRGB, 
      lightGradient[blueValue] * doRGB,
      (sVL * doSun * sunLightLevel) 
);
   
*/

vData[1] = vec4(AOVL,animVL,baseLevel,0.);     


VOXEL = vData;
`,
      },
    },
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
        GLSL: () => /* glsl */ `vec4 worldPOSTemp =  world * vec4(position, 1.0);
      worldPOS = vec3(worldPOSTemp.x,worldPOSTemp.y,worldPOSTemp.z);`,
      },
    },
    {
      id: "vDistance",
      type: "float",
      body: {
        GLSL: () => "vDistance = distance(cameraPOS , worldPOS );\n",
      },
    },
    {
      id: "worldPOSNoOrigin",
      type: "vec3",
      body: {
        GLSL: () => /* glsl */ `mat4 a;
a[0] = world[0];
a[1] = world[1];
a[2] = world[2];
a[3] = vec4(world[3].xyz - worldOrigin.xyz, 1.);
vec4 temp =  a * vec4(position , 1.0);
worldPOSNoOrigin =  vec3(temp.x,temp.y,temp.z);`,
      },
    },
    {
      id: "vNormal",
      type: "vec3",
      body: {
        GLSL: () => "vNormal = normal;\n",
      },
    },
    {
      id: "vColors",
      type: "vec4",
      body: {
        GLSL: () => /* glsl */ `if(doColor == 1.0){
     vColors = vec4(1.0,1.0,1.0,1.0); 
} else {
     vColors = vec4(1.0,1.0,1.0,1.0); 
}`,
      },
    },
    {
      id: "vFlow",
      type: "float",
      body: {
        GLSL: () => ``,
      },
    },
  ];
  static voxelFragFunctions: string[] = [];
  static voxelVertexFunctions: string[] = [];

  static _defaultShader: URIShader = {} as any;

  static init() {
    RegisterVoxelSnippets(URIShaderBuilder);
    RegisterVertexSnippets(URIShaderBuilder);
    RegisterFragmentSnippets(URIShaderBuilder);
    RegisterNoiseFunctions(URIShaderBuilder);
    RegisterFogShaders(URIShaderBuilder);
    RegisterVertexFunctions(URIShaderBuilder);
    RegisterFragFunctions(URIShaderBuilder);
    this.voxelFragFunctions = [
      "#dve_fmb2",
      "#dve_fmb3",
      "#dve_fog",
      "#dve_frag",
    ];
    this.voxelVertexFunctions = ["#dve_fmb2", "#dve_fmb3", "#dve_vertex"];

    const shader = URIShaderBuilder.shaders.create("default");
    shader.addAttributes(this.voxelAttributes);
    shader.addUniform(this.voxelSharedUniforms, "shared");
    shader.addUniform(this.voxelVertexUniforms, "vertex");
    shader.addVarying(this.voxelVarying);
    shader.loadInFunctions(this.voxelFragFunctions, "frag");
    shader.loadInFunctions(this.voxelVertexFunctions, "vertex");
    shader.addConstants(this.voxelConstants, "vertex");
    shader.setCodeBody("vertex", `@standard_position`);
    shader.setCodeBody("frag", `@standard_color`);

    this._defaultShader = shader;
  }

  static _addInstances(shader: URIShader) {
    shader.data.vertexBeforeMain.GLSL = /* glsl */ `
  #ifdef INSTANCES
  //matricies
  in vec4 world0;
  in vec4 world1;
  in vec4 world2;
  in vec4 world3;
  //custom attributes
  #endif
`;
  }

  static createVoxelShader(id: string) {
    const shader = this._defaultShader.clone(id);
    this._addInstances(shader);
    return shader;
  }

  static createBasicTextureShader(id: string) {
    const shader = URIShaderBuilder.shaders.create(id);
    this._addInstances(shader);

    shader.addAttributes([
      ["position", "vec3"],
      ["normal", "vec3"],
      ["indices", "float"],
      ["uv", "vec3"],
      ["textureIndex", "vec4"],
    ]);
    shader.loadInFunctions(
      [
        "#dve_fmb2",
        "#dve_fmb3",
        "#dve_fog",
        "doFog",
        "getBase",
        "getMainColor",
      ],
      "frag"
    );
    shader.addUniform([...this.voxelVertexUniforms], "vertex");
    shader.addUniform([...this.voxelSharedUniforms], "shared");
    shader.addVarying([
      {
        id: "vNormal",
        type: "vec3",
        body: {
          GLSL: () => "vNormal = normal;\n",
        },
      },
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
          GLSL: () => /* glsl */ `vec4 worldPOSTemp =  world * vec4(position, 1.0);
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
        id: "vBrightness",
        type: "float",
        body: {
          GLSL: () => /* glsl */ `vBrightness = 1.0;
if (normal.y > 0.0) {
  vBrightness += .5; 
} else if (normal.y < 0.0) {
  vBrightness -= .5; 
}`,
        },
      },
    ]);

    shader.setCodeBody("vertex", `@standard_position`);
    shader.setCodeBody(
      "frag",
      /* glsl */ `
  
/*  
//view normals 
 vec3 color = (vNormal + 1.0) * 0.5;
FragColor = vec4(color, 1.0);
*/
/* 
vec4 rgb = getMainColor(-100.);
  if (rgb.a < 0.5) { 
    rgb.a = 1.;
    rgb.r = 1.;
}
vec3 finalColor = doFog(rgb);
FragColor = vec4(finalColor.rgb * vBrightness,rgb.a);
*/


vec4 rgb = getMainColor(-100.);
if (rgb.a < 0.5) { 
  discard;
}
vec3 finalColor = doFog(rgb);
FragColor = vec4(finalColor.rgb * vBrightness,rgb.a);

`
    );

    return shader;
  }

  static createSkyBoxShader(id: string) {
    const shader = URIShaderBuilder.shaders.create(id);
    shader.addAttributes([
      ["position", "vec3"],
      ["indices", "float"],
      ["normal", "vec3"],
    ]);
    shader.loadInFunctions(["#dve_fmb2", "#dve_fmb3", "#dve_fog", "doFog"]);
    shader.addUniform(
      [
        ["doEffects", "float"],
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
          GLSL: () => /* glsl */ `vec4 worldPOSTemp =  world * vec4(position, 1.0);
worldPOS = vec3(worldPOSTemp.x,worldPOSTemp.y,worldPOSTemp.z);`,
        },
      },
      {
        id: "vDistance",
        type: "float",
        body: {
          GLSL: () => /* glsl */ `
     vDistance = distance(cameraPOS , worldPOS );
     `,
        },
      },
    ]);
    shader.addUniform(
      [
        ["world", "mat4"],
        ["viewProjection", "mat4"],
      ],
      "vertex"
    );
    shader.setCodeBody("vertex", `@standard_position`);
    shader.setCodeBody("frag", `@skybox_frag`);
    shader.compile();

    return shader;
  }
}

DVEShaders.init();
