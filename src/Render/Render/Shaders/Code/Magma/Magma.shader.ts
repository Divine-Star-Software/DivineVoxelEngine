//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html


export const magmaShaders =  {
    vertexTop :  `
    precision highp float;
   
    // Attributes
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec3 cuv3;
    attribute vec4 colors;
    attribute vec4 fullcolors;

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
    varying vec4 fColors;
   
   
    varying float fFogDistance;
   
    varying float animIndex;
    `,


    vertexMain : `
    
    void main(void) {
         vec4 worldPosition = world * vec4(position, 1.0);
         fFogDistance = (view * worldPosition).z;
         gl_Position = worldViewProjection * vec4(position, 1.0); 
         animIndex = getUVFace(cuv3.z);
         vUV = cuv3;
         vColors = colors;
         fColors = fullcolors;
         vNormal = normal;
     }
    
    `,

    fragTop :`
    precision highp float;
    precision highp sampler2DArray;
   
    uniform vec4 baseLightColor;
   
   
    varying vec3 vUV;
    varying vec4 vColors;
    varying vec4 fColors;
    varying vec3 vNormal;
   
    varying float animIndex;
   
    uniform sampler2DArray arrayTex;
    `,
    fragMain : `
    void main(void) {
        vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex)) ;

        if (rgb.a < 0.5) {
            discard;
        }

        gl_FragColor = vec4(0,0,0,0);   
        vec4 lightIntensity = vec4(.5,.5,.5,1);


        //mix with supplied vertex colors
        vec4 mixVertex = mix(rgb, vColors , 1.0);



        //apply to texture color
        vec4 newBase = rgb * mixVertex;
        vec4 newBase2 = newBase * fColors;

        vec4 mixLight  = newBase2 * baseLightColor;
  //  vec4 mixLight = mix(newBase, fColors * baseLightColor , 1.0);



        float fog = CalcFogFactor();
        vec3 finalColor = fog * mixLight.rgb + (1.0 - fog) * vFogColor;

        gl_FragColor = vec4(finalColor.rgb , mixLight.w ); 
    }`







}