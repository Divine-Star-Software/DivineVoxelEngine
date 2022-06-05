//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html
export const floraShaders = {
    setPosition: `
        vec3 p = position;
        p.z += cos(float(gl_VertexID) + time) * 0.05;
        vec4 worldPosition = world * vec4(p, 1.0);
        gl_Position = viewProjection * worldPosition; `,
    fragMain: `
 vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex)) ;
 if (rgb.a < 0.5) { 
     discard;
 }
 rgb = getColor(rgb);
 rgb = getAO(rgb);
 vec4 mixLight = getLight(rgb);
 vec3 finalColor = doFog(mixLight);
 gl_FragColor = vec4(finalColor.rgb , rgb.w ); 
    `,
};
