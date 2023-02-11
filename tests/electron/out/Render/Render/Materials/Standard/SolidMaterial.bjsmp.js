export class SolidMaterialPlugin extends BABYLON.MaterialPluginBase {
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
        return "SolidMaterialPlugin";
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
                CUSTOM_VERTEX_DEFINITIONS: `
attribute vec3 cuv3;
attribute vec4 aoColors;
attribute vec4 rgbLightColors;
varying vec4 aoColor;
varying vec4 rgbLColor;
varying vec3 vUV;
varying vec3 cameraPOS;
varying vec3 vC;
varying float TOD;`,
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
varying float TOD;`,
                CUSTOM_FRAGMENT_MAIN_BEGIN: `
vec2 vBumpUV = vUV.xy;
`,
                "!baseColor\\=texture2D\\(diffuseSampler,vDiffuseUV\\+uvOffset\\);": `
baseColor = texture(arrayTex, vec3(vUV.x,vUV.y,vUV.z));
baseColor =  baseColor * mix(baseColor, aoColor , 1.0);
baseColor = vec4(vC * baseColor.rgb,baseColor.a);
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
export const StandardSolidMaterial = {
    material: null,
    plugin: null,
    $INIT(texture, scnee) {
        this.material = new BABYLON.StandardMaterial("#dve_solid", scnee);
        this.material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        this.material.diffuseTexture = new BABYLON.Texture("assets/textures/debug/default.png", scnee);
        const bump = new BABYLON.Texture("assets/textures/normalmaps/dreamstone/default.png", scnee);
        bump.onLoadObservable.addOnce((txt) => {
            txt.updateSamplingMode(1);
        });
        this.material.bumpTexture = bump;
        /*
        this.material.invertNormalMapX = true;
        this.material.invertNormalMapY = true; */
        this.material.useParallax = true;
        this.material.useParallaxOcclusion = true;
        this.material.parallaxScaleBias = 0.2;
        this.material.specularPower = 1000.0;
        this.material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.plugin = new SolidMaterialPlugin(this.material, texture, (ubo) => {
            ubo.updateColor3("myColor", new BABYLON.Color3(1, 1, 1));
        });
    },
    getMaterial() {
        if (!this.material) {
            throw new Error("Material has not been created yet.");
        }
        return this.material;
    },
};
