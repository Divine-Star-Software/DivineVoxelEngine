//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html
export const fluidShaders = {
    vertexVars: `
  varying float vFlow;
  `,
    vertexWave: `

if(normal.y == 0.) {
  vFlow = 1.;
} else {
  vFlow = 0.;
}


vec4 posWorld = world * vec4(position, 1.0);
vec3 p = position;
float height = fbm(posWorld.xz * 0.08 + time);
p.y += height * 0.1 - .3;
vec4 worldPosition = world * vec4(p, 1.0);

gl_Position = viewProjection * worldPosition; 
`,
    fragVars: `
varying float vFlow;
`,
    fragMain: `
  float x = vUV.x - vTime * vFlow;
  vec4 rgb =  texture(arrayTex, vec3(x,vUV.y,animIndex));
  vec4 oRGB1 =  texture(overlayTex, vec3(vUV.x,vUV.y,vOVUV.x));
  vec4 oRGB2 =  texture(overlayTex, vec3(vUV.x,vUV.y,vOVUV.y));
  vec4 oRGB3 =  texture(overlayTex, vec3(vUV.x,vUV.y,vOVUV.z));
  vec4 oRGB4 =  texture(overlayTex, vec3(vUV.x,vUV.y,vOVUV.w));


  if (rgb.a < 0.85 && oRGB1.a < 0.85 && oRGB2.a < 0.85 && oRGB3.a < 0.85 && oRGB4.a < 0.85) { 
      discard;
  }
  if(oRGB1.a > 0.85) {
   //   rgb = oRGB * rgb;
        rgb = oRGB1;
  }
  if(oRGB2.a > 0.85) {
      rgb = oRGB2;
   }
   if(oRGB3.a > 0.85) {
    rgb = oRGB3;
   }
   if(oRGB4.a > 0.85) {
    rgb = oRGB4;
   }
  
  rgb = getColor(rgb);
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);
  gl_FragColor = vec4(finalColor.rgb , .8 ); 
`,
};