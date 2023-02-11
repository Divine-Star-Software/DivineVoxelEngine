import { DivineShaderBuilder } from "../../../Libs/Shaders/DivineShaderBuilder.js";
import { RegisterFragFunctions } from "./Code/Functions/FragmentFunctions.js";
import { RegisterVertexFunctions } from "./Code/Functions/VertexFunctions.js";
import { RegisterVertexSnippets } from "./Code/Snippets/VertexSnippets.js";
import { RegisterFragmentSnippets } from "./Code/Snippets/FragmentSnippets.js";
import { RegisterFogShaders } from "./Code/Functions/FogShaders.js";
import { RegisterNoiseFunctions } from "./Code/Functions/UtilShaders.js";
import { RegisterVoxelSnippets } from "./Code/Snippets/VoxelSnippets.js";
export const DVEShaders = {
    builder: DivineShaderBuilder,
    voxelAttributes: [
        ["position", "vec3"],
        ["normal", "vec3"],
        ["indices", "float"],
        ["faceData", "float"],
        ["ocuv3", "vec4"],
        ["cuv3", "vec3"],
        ["colors", "vec4"],
        ["aoColors", "float"],
        ["lightColors", "vec4"],
    ],
    voxelSharedUniforms: [
        ["time", "float"],
        ["fogOptions", "vec4"],
        ["vFogColor", "vec3"],
        ["sunLightLevel", "float"],
        ["baseLevel", "float"],
        ["doAO", "float"],
        ["doSun", "float"],
        ["doRGB", "float"],
        ["doColor", "float"],
    ],
    voxelVertexUniforms: [
        ["world", "mat4"],
        ["viewProjection", "mat4"],
        ["worldOrigin", "vec3"],
        ["cameraPosition", "vec3"],
        ["doEffects", "float"],
    ],
    voxelVarying: [
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
            id: "worldPOSNoOrigin",
            type: "vec3",
            body: {
                GLSL: () => `mat4 a;
a[0] = world[0];
a[1] = world[1];
a[2] = world[2];
a[3] = vec4(world[3].xyz - worldOrigin.xyz, 1.);
vec4 temp =  a * vec4(position , 1.0);
worldPOSNoOrigin =  vec3(temp.x,temp.y,temp.z);`,
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
        {
            id: "vAnimation",
            type: "float",
            body: {
                GLSL: () => " vAnimation = float(getAnimationType());\n",
            },
        },
        /*
        {
         id: "animIndex",
         type: "float",
         body: {
          GLSL: () => " animIndex = getUVFace(cuv3.z);\n",
         },
        },
        
        {
         id: "vUV",
         type: "vec3",
         body: {
          GLSL: () => "vUV = cuv3;;\n",
         },
        },
        {
         id: "vOVUV",
         type: "vec4",
         body: {
          GLSL: () => `vOVUV.x = getOverlayUVFace(ocuv3.x);
      vOVUV.y = getOverlayUVFace(ocuv3.y);
      vOVUV.z = getOverlayUVFace(ocuv3.z);
      vOVUV.w = getOverlayUVFace(ocuv3.w);`,
         },
        },
        */
        {
            id: "vNormal",
            type: "vec3",
            body: {
                GLSL: () => "vNormal = normal;\n",
            },
        },
        {
            id: "vNColor",
            type: "float",
            body: {
                GLSL: () => `if(normal.y == 1.) {
     vNColor = 1.2;
}
if(normal.y == -1.) {
     vNColor = .4;
}
if(abs(normal.x) == 1. || abs(normal.z)  == 1. ) {
     vNColor = 1.;
}`,
            },
        },
        {
            id: "rgbLColor",
            type: "vec4",
            body: {
                GLSL: () => `if(doRGB == 1.0){
     rgbLColor = vec4(lightColors.rgb,1.);
} else {
     rgbLColor = vec4(1.,1.,1.,1.);
}`,
            },
        },
        {
            id: "sunLColor",
            type: "vec4",
            body: {
                GLSL: () => `   if(doSun == 1.0){
     float s = lightColors.a;
     sunLColor = vec4(s,s,s,1.);
  } else {
     sunLColor = vec4(1.,1.,1.,1.);
  }`,
            },
        },
        {
            id: "aoColor",
            type: "vec4",
            body: {
                GLSL: () => `if(doAO == 1.0){
aoColor = vec4(aoColors,aoColors,aoColors,1.);
} else {
aoColor = vec4(1.0,1.0,1.0,1.0); 
}`,
            },
        },
        {
            id: "vColors",
            type: "vec4",
            body: {
                GLSL: () => `if(doColor == 1.0){
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
                GLSL: () => `
vFlow = 0.;
if(vAnimation == 1.) {
vFlow = 1.;
}
if(vAnimation == 2.) {
vFlow = -1.;
}`,
            },
        },
    ],
    voxelFragFunctions: [],
    voxelVertexFunctions: [],
    _defaultShader: {},
    $INIT() {
        RegisterVoxelSnippets(DivineShaderBuilder);
        RegisterVertexSnippets(DivineShaderBuilder);
        RegisterFragmentSnippets(DivineShaderBuilder);
        RegisterNoiseFunctions(DivineShaderBuilder);
        RegisterFogShaders(DivineShaderBuilder);
        RegisterVertexFunctions(DivineShaderBuilder);
        RegisterFragFunctions(DivineShaderBuilder);
        this.voxelFragFunctions = ["#dve_fmb2", "#dve_fmb3", "#dve_fog", "#dve_frag"];
        this.voxelVertexFunctions = ["#dve_fmb2", "#dve_fmb3", "#dve_vertex"];
        const shader = DivineShaderBuilder.shaders.create("default");
        shader.addAttributes(this.voxelAttributes);
        shader.addUniform(this.voxelSharedUniforms, "shared");
        shader.addUniform(this.voxelVertexUniforms, "vertex");
        shader.addVarying(this.voxelVarying);
        shader.loadInFunctions(this.voxelFragFunctions, "frag");
        shader.loadInFunctions(this.voxelVertexFunctions, "vertex");
        /*
        shader.addTextures([
         ["voxelTexture", { type: "sampler2DArray", isArray: true, arrayLength: 4 }],
         [
          "voxelOverlayTexture",
          { type: "sampler2DArray", isArray: true, arrayLength: 4 },
         ],
        ]);
        */
        shader.setCodeBody("vertex", `@standard_position`);
        shader.setCodeBody("frag", `@standard_color`);
        this._defaultShader = shader;
    },
    createVoxelShader(id) {
        const shader = this._defaultShader.clone(id);
        return shader;
    },
    createSkyBoxShader(id) {
        const shader = DivineShaderBuilder.shaders.create(id);
        shader.addAttributes([
            ["position", "vec3"],
            ["normal", "vec3"],
        ]);
        shader.loadInFunctions(["#dve_fmb2", "#dve_fmb3", "#dve_fog", "doFog"]);
        shader.addUniform([
            ["fogOptions", "vec4"],
            ["vFogInfos", "vec4"],
            ["vFogColor", "vec3"],
            ["time", "float"],
            ["cameraPosition", "vec3"],
            ["cameraDirection", "vec3"],
        ], "shared");
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
        ]);
        shader.addUniform([
            ["world", "mat4"],
            ["viewProjection", "mat4"],
        ], "vertex");
        shader.setCodeBody("vertex", `@standard_position`);
        shader.setCodeBody("frag", `vec3 c = vFogColor.rgb;
c.r -= .2;
c.g -= .2;
c.b -= .2;
vec4 skyboxColor = vec4(c.rgb,1);
vec3 finalColor = doFog(skyboxColor);
gl_FragColor = vec4(finalColor.rgb,1);`);
        return shader;
    },
};
DVEShaders.$INIT();
