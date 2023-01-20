export const VoxelShaders = {
    solid: {
        fragMain: `
vec4 rgb = getBaseColor();
if (rgb.a < 0.5) { 
  discard;
}
rgb = getColor(rgb);
rgb = getAO(rgb);
vec4 mixLight = getLight(rgb);
vec3 finalColor = doFog(mixLight);
gl_FragColor = vec4(finalColor.rgb , rgb.w ); `,
    },
    flora: {
        setPosition: `
vec3 p = position;
vec4 worldPosition = world * vec4(p , 1.0);
int animationType = getAnimationType();
if(doEffects == 1.){
  if(vDistance < 50.) {
    if(animationType == 1) {
      p.xz = animType1(worldPosition, p).xz;
    }
    if(animationType == 2) {
      p.xz = animType2(worldPosition, p).xz;
    }
    if(animationType == 3) {
      p.xz = animType3(worldPosition, p).xz;
    }
  }
}
gl_Position = viewProjection * world * vec4(p, 1.0); 
`,
        fragMain: `
vec4 rgb = getBaseColor();

if (rgb.a < 0.85 ) { 
  discard;
}

rgb = getColor(rgb);
rgb = getAO(rgb);
vec4 mixLight = getLight(rgb);
vec3 finalColor = doFog(mixLight);
gl_FragColor = vec4(finalColor.rgb , rgb.w );`,
    },
    liquid: {
        vertexVars: `varying float vFlow;`,
        vertexWave: `
float animationTest = float(getAnimationType());
vFlow = 0.;
if(animationTest == 1.) {
  vFlow = 1.;
}
if(animationTest == 2.) {
  vFlow = -1.;
}


vec3 p = position;
vec4 worldPosition = world * vec4(p , 1.0);
if(doEffects == 1.){
float height = fbm(worldPosition.xz * 0.08 + time);
  p.y += (height * 0.03) - .05;
 }

gl_Position = viewProjection * world * vec4(p, 1.0); 
`,
        fragVars: `varying float vFlow;`,
        fragMain: `
float y = vUV.y - time * 4. * vFlow;
vec4 rgb = getAnimatedBaseColor(vec2(vUV.x,y));
rgb = getColor(rgb);
vec4 mixLight = getLight(rgb);
vec3 finalColor = doFog(mixLight);
gl_FragColor = vec4(finalColor.rgb , .6 );
`,
    },
    item: {
        fragMain: `
vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex));
if (rgb.a < 0.5) { 
  discard;
}
rgb = getColor(rgb);
vec4 mixLight = getLight(rgb);
vec3 finalColor = doFog(mixLight);
gl_FragColor = vec4(finalColor.rgb , rgb.w );`,
    },
};
