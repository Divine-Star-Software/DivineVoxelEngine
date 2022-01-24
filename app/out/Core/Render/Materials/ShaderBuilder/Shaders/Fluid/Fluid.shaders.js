//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html
export const fluidShaders = {
    vertexTop: `
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
 
  uniform float time;
  `,
    vertexMain: `
  
  void main(void) {
      vec3 p = position;

//    p.y += sin(p.x * 4.0 + time) * cos(p.z * 2.0 + time) * 0.1;


    float height = fbm(p.xz * 0.08 + time);
      p.y += height * 0.1 - .3;

      vec4 worldPosition = world * vec4(p, 1.0);
      fFogDistance = (view * worldPosition).z;
      gl_Position = viewProjection * worldPosition; 
      
 
      animIndex = getUVFace(cuv3.z);
      vUV = cuv3;
      //vColors = colors;
    //  vNormal = normal;
  }
  
  `,
    fragTop: `
  precision highp float;
  precision highp sampler2DArray;
 
  uniform vec4 baseLightColor;
 
 
  varying vec3 vUV;
  varying vec4 vColors;
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


      //mix with ao
    //  vec4 mixVertex = mix(rgb, vec4(1,1,1,1) , 1.0);
      //apply to texture color
    //  vec4 newBase = rgb * mixVertex;

      vec4 mixLight  = rgb;

      float fog = CalcFogFactor();
      vec3 finalColor = fog * mixLight.rgb + (1.0 - fog) * vFogColor;

      gl_FragColor = vec4(finalColor.rgb , mixLight.w ); 
  }`
};
