//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html
export const fluidShaders = {
    vertexSahderTop: `
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
   
    uniform float time;
    `,
    vertexSahderMainFunciton: `
    
    void main(void) {
        vec3 p = position;

     //   p.y += sin(p.x * 4.0 + time) * sin(p.z * 2.0 + time) * 0.1;

        float height = fbm(p.xz * 0.08 + time);
        p.y += height * 0.1 - .2;

        vec4 worldPosition = world * vec4(p, 1.0);
        fFogDistance = (view * worldPosition).z;
        gl_Position = viewProjection * worldPosition; 
        
   
        animIndex = getUVFace(myuvs.z);
        vUV = myuvs;
        vColors = colors;
        vNormal = normal;
    }
    
    `,
    fragmentShaderTop: `

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
   
     if (rgb.a < 0.5) {
       discard;
   }
   
     //mix with supplied vertex colors
     vec4 mixVertex = mix(rgb, vColors , 1.0);
     //apply to texture color
     vec4 newBase = rgb * mixVertex;
   
     vec4 mixLight  = newBase * baseLightColor;
   
     float fog = CalcFogFactor();
     vec3 finalColor = fog * mixLight.rgb + (1.0 - fog) * vFogColor;
   
     gl_FragColor = vec4(finalColor.rgb , mixLight.w );
   
       
    }
    `
};
