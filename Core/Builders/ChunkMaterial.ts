export class ChunkMaterial {
  material: BABYLON.ShaderMaterial;
  context: CanvasRenderingContext2D;
  scene: BABYLON.Scene;

  constructor() {}

  setScene(scene: BABYLON.Scene) {
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

  async createMaterialTexture(
    images: string[],
    width: number = 16,
    height: number = 16
  ) {
    const resolvedImages: Uint8ClampedArray[] = [];
    for (const image of images) {
     const data = await  this._loadImages(image, width, height);
     resolvedImages.push(data);
    }



    const combinedImages = this._combineImageData(resolvedImages);

    const _2DTextureArray = new BABYLON.RawTexture2DArray(
      combinedImages,
      width,
      height,
      images.length,
      BABYLON.Engine.TEXTUREFORMAT_RGBA,
      this.scene,
      false,
      false,
      BABYLON.Texture.NEAREST_SAMPLINGMODE
    );

    return _2DTextureArray;
  }

  _loadImages(
    imgPath: string,
    width: number,
    height: number
  ): Promise<Uint8ClampedArray> {
    const self = this;
    const prom: Promise<Uint8ClampedArray> = new Promise((resolve) => {
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

  _combineImageData(arrays: Uint8ClampedArray[]) {
    let totalLength = 0;
    for (const array of arrays) {
      totalLength += array.length;
    }

    const combinedImagedata = new Uint8ClampedArray(totalLength);
    const length = arrays[0].length;
    for (let i = 0; i < arrays.length; i++) {
      const array = arrays[i];
      const previousArrayIndex = length * i;
        combinedImagedata.set(array, previousArrayIndex);
    }
    return combinedImagedata;
  }

  getMaterial(texture: BABYLON.RawTexture2DArray): BABYLON.ShaderMaterial {
    BABYLON.Effect.ShadersStore["aVertexShader"] = `
        precision highp float;
      
        // Attributes
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec3 myuvs;
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


            animIndex = getUVFace(myuvs.z);
            vUV = myuvs;
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

         vec4 mixLight  = newBase * lightIntensity;

         float fog = CalcFogFactor();
         vec3 finalColor = fog * mixLight.rgb + (1.0 - fog) * vFogColor;

    //    gl_FragColor = vec4(rgb);
         gl_FragColor = vec4(finalColor.rgb , mixLight.w );
        }
        `;

    const shaderMaterial = new BABYLON.ShaderMaterial("a", this.scene, "a", {
      attributes: ["position", "normal", "myuvs", "colors"],
      uniforms: [
        "world",
        "view",
        "viewProjection",
        "worldView",
        "worldViewProjection",
        "vFogInfos",
        "vFogColor",
        "projection",
        "anim1Index",
        "arrayTex",
      ],
      needAlphaBlending: true,
      needAlphaTesting : true
    });
    shaderMaterial.fogEnabled = true;

    shaderMaterial.setTexture("arrayTex", texture);

    //shaderMaterial.disableDepthWrite = true;
    shaderMaterial.needDepthPrePass = true;
    shaderMaterial.separateCullingPass = true;

    shaderMaterial.onBind = (mesh) => {
      var effect = shaderMaterial.getEffect();
      if (!effect) return;

      effect.setFloat4(
        "vFogInfos",
        this.scene.fogMode,
        this.scene.fogStart,
        this.scene.fogEnd,
        this.scene.fogDensity
      );
      effect.setColor3("vFogColor", this.scene.fogColor);
    };

    this.material = shaderMaterial;
    return this.material;
  }

  runAnimations(num: number) {
    this.material.setFloat("anim1Index", num);
    this.material.setFloat("anim2Index", num - 3);
  }
}
