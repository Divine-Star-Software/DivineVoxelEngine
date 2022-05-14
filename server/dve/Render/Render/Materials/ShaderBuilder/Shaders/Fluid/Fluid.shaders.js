//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html
export const fluidShaders = {
    vertexVars: `
  uniform float time;
  `,
    vertexWave: `
vec4 posWorld = world * vec4(position, 1.0);
vec3 p = position;
float height = fbm(posWorld.xz * 0.08 + time);
p.y += height * 0.1 - .3;
vec4 worldPosition = world * vec4(p, 1.0);
gl_Position = viewProjection * worldPosition; 
`,
    fragMain: `
  vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex)) ;
  if (rgb.a < 0.5) { 
      discard;
  }
  rgb = getColor(rgb);
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);
  gl_FragColor = vec4(finalColor.rgb , rgb.w ); 
`,
};
