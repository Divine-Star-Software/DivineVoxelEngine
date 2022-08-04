//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html

export const itemShaders = {
 fragMain: `
 vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex)) ;
 if (rgb.a < 0.5) { 
     discard;
 }
 rgb = getColor(rgb);
 vec4 mixLight = getLight(rgb);
 vec3 finalColor = doVFog(mixLight);
 
gl_FragColor = vec4(finalColor.rgb , rgb.w );
  `,
};
