export class LiquidMaterialPlugin extends BABYLON.MaterialPluginBase {
    onUBSet;
    _texArray;
    _textureSet = false;
    ubof = false;
    constructor(material, texArray, onUBSet) {
        var priority = 200;
        var defines = { TWOD_ARRAY_TEXTURE: false };
        super(material, "TestPlugin", priority, defines);
        this.onUBSet = onUBSet;
        this._texArray = texArray;
        this._enable(true);
    }
    prepareDefines(defines) {
        defines["TWOD_ARRAY_TEXTURE"] = true;
    }
    getClassName() {
        return "LiquidMaterialPlugin";
    }
    getSamplers(samplers) {
        samplers.push("arrayTex");
    }
    getAttributes(attributes) {
        attributes.push("cuv3");
        attributes.push("aoColors");
        attributes.push("rgbLightColors");
    }
    getUniforms() {
        return {
            ubo: [
                { name: "myColor", size: 3, type: "vec3" },
                { name: "cameraPosition", size: 3, type: "vec3" },
            ],
            fragment: `uniform vec3 myColor;
      uniform vec3 cameraPosition;`,
        };
    }
    bindForSubMesh(uniformBuffer, scene) {
        if (!this._textureSet) {
            this.ubof = uniformBuffer;
            uniformBuffer.setTexture("arrayTex", this._texArray);
            this._textureSet = true;
            console.log(this._texArray.name);
            this.onUBSet(uniformBuffer);
        }
        if (scene.activeCamera) {
            uniformBuffer.updateVector3("cameraPosition", scene.activeCamera.position);
        }
    }
    //@ts-ignore
    getCustomCode(shaderType) {
        if (shaderType === "vertex")
            return {
                CUSTOM_VERTEX_MAIN_BEGIN: `
   vUV = cuv3;
   aoColor = aoColors;
   rgbLColor = rgbLightColors;
   vC = myColor;
   TOD = 0.;
   vec2 vBumpUV = vUV.xy;
   cameraPOS = cameraPosition;
   `,
                CUSTOM_VERTEX_MAIN_END: `
clipSpace = reflectionMatrix * worldPos;
   `,
                CUSTOM_VERTEX_DEFINITIONS: `
   attribute vec3 cuv3;
   attribute vec4 aoColors;
   attribute vec4 rgbLightColors;
   varying vec4 aoColor;
   varying vec4 rgbLColor;
   varying vec3 vUV;
   varying vec3 cameraPOS;
   varying vec3 vC;
   varying float TOD;
   varying vec4 clipSpace;
   `,
            };
        if (shaderType === "fragment")
            return {
                CUSTOM_FRAGMENT_DEFINITIONS: `
   uniform highp sampler2DArray arrayTex;
   varying vec3 vUV;
   varying vec3 cameraPOS;
   varying vec4 aoColor;
   varying vec4 rgbLColor;
   varying vec3 vC;
   varying float TOD;
   varying vec4 clipSpace;
   vec2 fromClipSpace(vec4 position)
{
	return position.xy / position.w / 2.0 + 0.5;
}
   `,
                CUSTOM_FRAGMENT_MAIN_BEGIN: `
   vec2 vBumpUV = vUV.xy;
   `,
                "!baseColor\\=texture2D\\(diffuseSampler,vDiffuseUV\\+uvOffset\\);": `
   baseColor = texture(arrayTex, vec3(vUV.x,vUV.y,vUV.z));
   baseColor = vec4(vC * baseColor.rgb,baseColor.a);
   baseColor = vec4(0.,0.,.7,.1);
 //  vec2 textureCoord = fromClipSpace(clipSpace);    
  // baseColor = texture2D(diffuseSampler, textureCoord);
   lightingInfo info2;
   vec4 rgbDirection =vec4( normalize(vPositionW - cameraPOS),1.);
   info2=computeLighting(viewDirectionW,normalW,rgbDirection,rgbLColor.rgb,rgbLColor.rgb ,1.,100.);
   `,
                "!info\\=computeLighting\\(viewDirectionW\\,normalW\\,light0\\.vLightData\\,light0\\.vLightDiffuse\\.rgb\\,light0\\.vLightSpecular\\.rgb\\,light0\\.vLightDiffuse\\.a\\,glossiness\\);": `info=computeLighting(viewDirectionW,normalW,light0.vLightData,light0.vLightDiffuse.rgb,light0.vLightSpecular.rgb,light0.vLightDiffuse.a,glossiness);
   `,
                "!diffuseBase\\+\\=info\\.diffuse\\*shadow;": `specularBase+=info2.specular;
   diffuseBase+=info.diffuse*shadow + info2.diffuse;`,
                "!\\#define vBumpUV vMainUV1": ``,
                "!vec3 finalDiffuse\\=clamp\\(diffuseBase\\*diffuseColor\\+emissiveColor\\+vAmbientColor\\,0\\.0\\,1\\.0\\)\\*baseColor\\.rgb;": `
   vec3 finalDiffuse =((rgbLColor.rgb)+diffuseBase*diffuseColor+emissiveColor+vAmbientColor)*baseColor.rgb;
     `,
            };
        return null;
    }
}
/*
   
   //lightingInfo info2;
   //vec3 rgbDirection = normalize(vPositionW - cameraPOS);
   //info2=computeLighting(viewDirectionW,normalW,rgbDirection,rgbLColor,rgbLColor,1.,glossiness);
   */
export const StandardLiquidMaterial = {
    material: null,
    reflectionprobe: null,
    plugin: null,
    $INIT(texture, scene) {
        this.material = new BABYLON.StandardMaterial("#dve_liquid", scene);
        this.material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        /*   this.material.diffuseTexture = new BABYLON.Texture(
         "assets/textures/debug/default.png",
         scene
        );
      
      
        this.material.backFaceCulling = false;
        this.material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.plugin = new LiquidMaterialPlugin(this.material, texture, (ubo) => {
         ubo.updateColor3("myColor", new BABYLON.Color3(1, 1, 1));
        });  */
        this.material.alpha = 0.7;
        this.reflectionprobe = new BABYLON.RenderTargetTexture("_reflection", { width: 512, height: 512 }, scene, false, true);
        this.reflectionprobe.wrapU = BABYLON.Constants.TEXTURE_MIRROR_ADDRESSMODE;
        this.reflectionprobe.wrapV = BABYLON.Constants.TEXTURE_MIRROR_ADDRESSMODE;
        this.reflectionprobe.ignoreCameraViewport = true;
        this.reflectionprobe.coordinatesMode = 1;
        this.material.reflectionTexture = this.reflectionprobe;
    },
    getMaterial() {
        if (!this.material) {
            throw new Error("Material has not been created yet.");
        }
        return this.material;
    },
    addToRenderList(mesh) {
        if (!this.reflectionprobe)
            return;
        this.reflectionprobe.renderList?.push(mesh);
    },
};
