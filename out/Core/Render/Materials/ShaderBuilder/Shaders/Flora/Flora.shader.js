//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html
export const floraShaders = {
    vertexTop: `
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
    vertexMain: `void main(void) {
        vec3 p = position;

        p.z += cos(float(gl_VertexID) + time) * 0.05;
        vec4 worldPosition = world * vec4(p, 1.0);
        fFogDistance = (view * worldPosition).z;
        gl_Position = viewProjection * worldPosition; 
   
   
        animIndex = getUVFace(myuvs.z);
        vUV = myuvs;
        vColors = colors;
        vNormal = normal;
    }`,
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

        gl_FragColor = vec4(0,0,0,0);   
        vec4 lightIntensity = vec4(.5,.5,.5,1);


        //mix with supplied vertex colors
        vec4 mixVertex = mix(rgb, vColors , 1.0);
        //apply to texture color
        vec4 newBase = rgb * mixVertex;

        vec4 mixLight  = newBase * baseLightColor;

        float fog = CalcFogFactor();
        vec3 finalColor = fog * mixLight.rgb + (1.0 - fog) * vFogColor;

        gl_FragColor = vec4(finalColor.rgb , mixLight.w ); 
    }`,
};
