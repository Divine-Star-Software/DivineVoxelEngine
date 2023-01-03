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
vec4 posWorld = world * vec4(position, 1.0);
vec3 p = position + worldOrigin;
int animationType = getAnimationType();

//if(vDistance < 16.) {
if(doEffects == 1.){
  if(animationType == 1) {
    p.xz = animType1(posWorld, p).xz;
  }
  if(animationType == 2) {
      p.xz = animType2(posWorld, p).xz;
  }
  if(animationType == 3) {
    p.xz = animType3(posWorld, p).xz;
  }
}
//}

vec4 worldPosition = world * vec4(p, 1.0);
gl_Position = viewProjection * worldPosition; `,
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
vec4 posWorld = world * vec4(position, 1.0);
vec3 p = position;
if(doEffects == 1.){
float height = fbm(posWorld.xz * 0.08 + time);
  p.y += (height * 0.03) - .05;
}
vec4 worldPosition = world * vec4(p + worldOrigin, 1.0);
gl_Position = viewProjection * worldPosition; `,
        fragVars: `varying float vFlow;`,
        fragMain: `
float y = vUV.y - time * 4. * vFlow;
vec4 rgb = getAnimatedBaseColor(vec2(vUV.x,y));
rgb = getColor(rgb);
vec4 mixLight = getLight(rgb);
vec3 finalColor = doFog(mixLight);
gl_FragColor = vec4(finalColor.rgb , .6 );`,
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
