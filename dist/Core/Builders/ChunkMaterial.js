export class ChunkMaterial {
    material;
    context;
    scene;
    constructor() { }
    setScene(scene) {
        this.scene = scene;
    }
    setUpImageCreation() {
        const TwoDcanvas = document.createElement("canvas");
        const context = TwoDcanvas.getContext("2d");
        if (!context) {
            throw new Error("Context did not load for texture creation.");
        }
        this.context = context;
    }
    async createMaterialTexture(images, width = 16, height = 16) {
        const resolvedImages = [];
        //create blank fill
        let index = 0;
        const data = [];
        for (let i = 0; i < width * 2; i++) {
            for (let j = 0; j < height * 2; j++) {
                if (index % 4 == 0) {
                    data[index] = 1;
                }
                else {
                    data[index] = 0;
                }
                index++;
            }
        }
        resolvedImages.push(new Uint8ClampedArray(data));
        for (const image of images) {
            const data = await this._loadImages(image, width, height);
            resolvedImages.push(data);
        }
        resolvedImages.push(new Uint8ClampedArray(data));
        let totalLength = images.length * width * height * 4 + width * height * 4 * 2;
        const combinedImages = this._combineImageData(totalLength, resolvedImages);
        const _2DTextureArray = new BABYLON.RawTexture2DArray(combinedImages, width, height, images.length + 2, BABYLON.Engine.TEXTUREFORMAT_RGBA, this.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        return _2DTextureArray;
    }
    _loadImages(imgPath, width, height) {
        const self = this;
        const prom = new Promise((resolve) => {
            const loadedImage = new Image();
            loadedImage.src = imgPath;
            loadedImage.onload = function () {
                self.context.drawImage(loadedImage, 0, 0, width, height);
                const imgData = self.context.getImageData(0, 0, width, height);
                resolve(imgData.data);
            };
        });
        return prom;
    }
    _combineImageData(totalLength, arrays) {
        const combinedImagedata = new Uint8ClampedArray(totalLength);
        const length = arrays[0].length;
        for (let i = 0; i < arrays.length; i++) {
            const array = arrays[i];
            const previousArrayIndex = length * i;
            combinedImagedata.set(array, previousArrayIndex);
        }
        return combinedImagedata;
    }
    getMaterial(texture) {
        BABYLON.Effect.ShadersStore["aVertexShader"] = `
        precision highp float;
      
        // Attributes
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec3 cuv3;
        attribute vec4 colors;
        // Uniforms
        uniform mat4 worldViewProjection;
        uniform mat4 world;                    
        uniform mat4 view;                    
        uniform mat4 viewProjection;          

      
        varying vec2 vUV2;
        // Varying
        varying vec3 vUV;
        varying vec3 vNormal;
        varying vec4 vColors;



        varying float fFogDistance;

        varying float animIndex;

        //anims
        uniform float anim1Index;
        uniform float anim2Index;

        float getUVFace(float uv) {

            if(uv == 0.0) {
                return anim1Index;
            }

            if(uv == 0.0) {
                return anim2Index;
            }
         
            return uv;

        }
      
      
        void main(void) {

            vec4 worldPosition = world * vec4(position, 1.0);
            fFogDistance = (view * worldPosition).z;
            gl_Position = worldViewProjection * vec4(position, 1.0); 


            animIndex = getUVFace(cuv3.z);
            vUV = cuv3;
            vColors = colors;
            vNormal = normal;
        }
        `;
        BABYLON.Effect.ShadersStore["aFragmentShader"] = `

        #define FOGMODE_NONE 0.
        #define FOGMODE_EXP 1.
        #define FOGMODE_EXP2 2.
        #define FOGMODE_LINEAR 3.
        #define E 2.71828
    
     
        precision highp float;
        precision highp sampler2DArray;
      
      
        uniform vec4 vFogInfos;
        uniform vec3 vFogColor;
        varying float fFogDistance;

        uniform vec4 baseLightColor;


        varying vec3 vUV;
        varying vec4 vColors;
        varying vec3 vNormal;

        varying float animIndex;
      
        uniform sampler2DArray arrayTex;

     

        float CalcFogFactor()
        {
            float fogCoeff = 1.0;
            float fogStart = vFogInfos.y;
            float fogEnd = vFogInfos.z;
            float fogDensity = vFogInfos.w;
    
            if (FOGMODE_LINEAR == vFogInfos.x)
            {
                fogCoeff = (fogEnd - fFogDistance) / (fogEnd - fogStart);
            }
            else if (FOGMODE_EXP == vFogInfos.x)
            {
                fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity);
            }
            else if (FOGMODE_EXP2 == vFogInfos.x)
            {
                fogCoeff = 1.0 / pow(E, fFogDistance * fFogDistance * fogDensity * fogDensity);
            }
    
            return clamp(fogCoeff, 0.0, 1.0);
        }



      
        void main(void) {
            gl_FragColor = vec4(0,0,0,0);   
         vec4 lightIntensity = vec4(.5,.5,.5,1);



      
         vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex)) ;
         //mix with supplied vertex colors
         vec4 mixVertex = mix(rgb, vColors , 1.0);
         //apply to texture color
         vec4 newBase = rgb * mixVertex;

         vec4 mixLight  = newBase * baseLightColor;

         float fog = CalcFogFactor();
         vec3 finalColor = fog * mixLight.rgb + (1.0 - fog) * vFogColor;

         gl_FragColor = vec4(finalColor.rgb , mixLight.w );
        }
        `;
        const shaderMaterial = new BABYLON.ShaderMaterial("a", this.scene, "a", {
            attributes: ["position", "normal", "cuv3", "colors"],
            uniforms: [
                "world",
                "view",
                "viewProjection",
                "worldView",
                "worldViewProjection",
                "vFogInfos",
                "vFogColor",
                "baseLightColor",
                "projection",
                "anim1Index",
                "arrayTex",
            ],
            needAlphaBlending: true,
            needAlphaTesting: true,
        });
        shaderMaterial.fogEnabled = true;
        shaderMaterial.setTexture("arrayTex", texture);
        //shaderMaterial.disableDepthWrite = true;
        shaderMaterial.needDepthPrePass = true;
        shaderMaterial.separateCullingPass = true;
        shaderMaterial.onBind = (mesh) => {
            var effect = shaderMaterial.getEffect();
            if (!effect)
                return;
            effect.setFloat4("vFogInfos", this.scene.fogMode, this.scene.fogStart, this.scene.fogEnd, this.scene.fogDensity);
            effect.setColor3("vFogColor", this.scene.fogColor);
            effect.setColor4("baseLightColor", new BABYLON.Color3(0.15, 0.15, 0.15), 1);
        };
        this.material = shaderMaterial;
        return this.material;
    }
    runAnimations(num) {
        this.material.setFloat("anim1Index", num);
        this.material.setFloat("anim2Index", num - 3);
    }
}
