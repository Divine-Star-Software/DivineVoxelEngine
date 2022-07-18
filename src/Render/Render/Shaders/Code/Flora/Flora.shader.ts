//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html

export const floraShaders = {
 setPosition: `
 vec4 posWorld = world * vec4(position, 1.0);
 vec3 p = position;

 int animationType = getAnimationType();

 
    if(animationType == 1) {
        p.xz = animType1(posWorld, p).xz;
    }
    if(animationType == 2) {
        p.xz = animType2(posWorld, p).xz;
    }
    if(animationType == 3) {
        p.xz = animType3(posWorld, p).xz;
    }


 vec4 worldPosition = world * vec4(p, 1.0);
 gl_Position = viewProjection * worldPosition; 
        `,

 fragMain: `

 vec4 rgb =  texture(arrayTex, vec3(vUV.x,vUV.y,animIndex)) ;
// vec4 oRGB = rgb;
// oRGB =  texture(overlayTex, vec3(vOVUV.x,vOVUV.y,overlayAnimIndex)) ;
 
  
if (rgb.a < 0.85 ) { 
     discard;
}

//if(oRGB.a > 0.85) {
//    rgb = oRGB;
//}
 
 rgb = getColor(rgb);
 rgb = getAO(rgb);
 vec4 mixLight = getLight(rgb);
 vec3 finalColor = doVFog(mixLight);
 gl_FragColor = vec4(finalColor.rgb , rgb.w ); `,
};
