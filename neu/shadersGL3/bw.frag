precision mediump float;


uniform sampler2D tex0;
varying vec2 vTexCoord;

//UKC: RGB to greyscale, taken from githum.com/aferris/p5jsShaderExamples repos, converted Sep 2020


// this is a common glsl function of unknown origin to convert rgb colors to luminance
// it performs a dot product of the input color against some known values that account for our eyes perception of brighness
// i pulled this one from here https://github.com/hughsk/glsl-luma/blob/master/index.glsl

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float rand(vec2 co)
{
   return fract(sin(dot(co.xy,vec2(12.9898,78.233))) * 43758.5453);
}



void main()
{
	vec2 uv = vTexCoord;
  // flipping vertical
  uv.y = 1. - uv.y;

  // get the webcam as a vec4 using texture2D
  vec4 tex = texture2D(tex0, uv);

  // convert the texture to grayscale by using the luma function  
  float gray = luma(tex.rgb);

  // output the grayscale value in all three rgb color channels
  gl_FragColor = vec4(gray, gray, gray, 1.0);
  
}