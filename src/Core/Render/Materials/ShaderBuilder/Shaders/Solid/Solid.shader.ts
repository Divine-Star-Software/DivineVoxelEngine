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
    // Varying
    varying vec3 vUV;
    varying vec3 vNormal;
    varying vec4 aoColor;
    varying vec4 rgbLColor;
    varying vec4 sunLColor;
   
    varying float fFogDistance;
   
    varying float animIndex;
    `,

 vertexMain: `
    
    void main(void) {
         vec4 worldPosition = world * vec4(position, 1.0);
         fFogDistance = (view * worldPosition).z;
         gl_Position = worldViewProjection * vec4(position, 1.0); 
         animIndex = getUVFace(cuv3.z);
         vUV = cuv3;
         aoColor = aoColors;
         rgbLColor = rgbLightColors;
         sunLColor = sunLightColors;
         vNormal = normal;
     }
    
    `,

 fragTop: `
    precision highp float;
    precision highp sampler2DArray;
   
    uniform float sunLightLevel;
   
   
    varying vec3 vUV;
    varying vec4 aoColor;
    varying vec4 rgbLColor;
    varying vec4 sunLColor;


    varying vec3 vNormal;
   
    varying float animIndex;
   
    uniform sampler2DArray arrayTex;
    `,
 fragMain: `
    void main(void) {
        vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex)) ;

        if (rgb.a < 0.5) {
            discard;
        }

        gl_FragColor = vec4(0,0,0,0);   
        vec4 lightIntensity = vec4(.5,.5,.5,1);


        //mix with supplied vertex colors
        vec4 mixVertex = mix(rgb, aoColor , 1.0);



        //apply to texture color
        vec4 newBase = rgb * mixVertex;

        vec4 light = rgbLColor +  sunLColor  * sunLightLevel;
        vec4 mixLight  = newBase * light;

        



        float fog = CalcFogFactor();
        vec3 finalColor = fog * mixLight.rgb + (1.0 - fog) * vFogColor;

        gl_FragColor = vec4(finalColor.rgb , mixLight.w ); 
    }`,
};
