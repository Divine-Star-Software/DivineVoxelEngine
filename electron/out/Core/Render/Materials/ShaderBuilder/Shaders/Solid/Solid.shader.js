//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html
export const solidShaders = {
    vertexTop: `
    precision highp float;
   
    // Attributes
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec3 cuv3;
    attribute vec4 aoColors;
    attribute vec4 rgbLightColors;
    attribute vec4 sunLightColors;
    attribute vec4 colors;

    // Uniforms
    uniform mat4 worldViewProjection;
    uniform mat4 world;                    
    uniform mat4 view;                    
    uniform mat4 viewProjection;           
   
   
    varying vec2 vUV2;

    varying vec4 colorOptions;
    // Varying
    varying vec3 vUV;
    varying vec3 vNormal;
    varying vec4 aoColor;
    varying vec4 rgbLColor;
    varying vec4 sunLColor;
    varying vec4 vColors;

    varying float vDoSun;
    varying float vDoRGB;


    varying float fFogDistance;
   
    varying float animIndex;


    uniform float doAO;
    uniform float doRGB;
    uniform float doSun;
    uniform float doColor;
    `,
    vertexMain: `
    
    void main(void) {
         vec4 worldPosition = world * vec4(position, 1.0);
         fFogDistance = (view * worldPosition).z;
         gl_Position = worldViewProjection * vec4(position, 1.0); 
         animIndex = getUVFace(cuv3.z);
         vUV = cuv3;

         if(doAO == 1.0){
            aoColor = aoColors;
         } else {
            aoColor = vec4(1.0,1.0,1.0,1.0); 
         }
  
         if(doRGB == 1.0){
            vDoRGB = 1.0;
            rgbLColor = rgbLightColors;
         } else {
            vDoRGB = 0.0;
         }

         if(doSun == 1.0){
            vDoSun = 1.0;
            sunLColor = sunLightColors;
         } else {
            vDoSun = 0.0;
         }

         if(doColor == 1.0){
            vColors = vec4(1.0,1.0,1.0,1.0); 
         } else {
            vColors = vec4(1.0,1.0,1.0,1.0); 
         }

         vNormal = normal;
     }
    
    `,
    fragTop: `
    precision highp float;
    precision highp sampler2DArray;
   
    uniform float sunLightLevel;
    uniform float baseLevel;
   
    varying vec3 vUV;
    varying vec4 aoColor;
    varying vec4 rgbLColor;
    varying vec4 sunLColor;
    varying vec4 vColors;

    varying float vDoSun;
    varying float vDoRGB;

    varying vec3 vNormal;
   
    varying float animIndex;
   
    uniform sampler2DArray arrayTex;
    `,
    fragMain: `
     vec4 getLight(vec4 base) {
       return base * ( ((rgbLColor * vDoRGB)  +  (sunLColor * vDoSun)  * sunLightLevel) + baseLevel );
     }
     vec4 getAO(vec4 base) {
    return  base * mix(base, aoColor , 1.0);
  }
    void main(void) {
        vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex)) ;

        if (rgb.a < 0.5) {
            discard;
        }
        
       //mix with colors
       vec4 mixColors = rgb * vColors;

        vec4 newBase = getAO(mixColors);
        vec4 mixLight = getLight(newBase);

        //do fog
        float fog = CalcFogFactor();
        vec3 finalColor = fog * mixLight.rgb + (1.0 - fog) * vFogColor;

        gl_FragColor = vec4(finalColor.rgb , rgb.w ); 
    }`,
};
