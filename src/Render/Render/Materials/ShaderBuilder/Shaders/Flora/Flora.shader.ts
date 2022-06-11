//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html

export const floraShaders = {
 setPosition: `
 vec4 posWorld = world * vec4(position, 1.0);
 vec3 p = position;
 vec3 nP = normalize(position);

 if(abs(nP.y) > .0) {
 if(cuv3.y == 0. || cuv3.z == 1.) {
 float heightX = fbm(posWorld.xz * 0.1 + time * 0.05);
 p.xz += heightX * 0.05;
 }
} 

 //p.z += cos(float(gl_VertexID) + time) * 0.05;

 vec4 worldPosition = world * vec4(p, 1.0);
 gl_Position = viewProjection * worldPosition; 
        `,

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
