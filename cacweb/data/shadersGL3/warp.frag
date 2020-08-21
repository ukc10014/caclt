precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D tex0;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;




void main() {

  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  uv.y = 1. - uv.y;
  
  float freq = 3.0*sin(0.5*iTime);
    vec2 warp = 0.5000*cos( uv.xy*1.0*freq + vec2(0.0,1.0) + iTime ) +
                0.2500*cos( uv.yx*2.3*freq + vec2(1.0,2.0) + iTime) +
                0.1250*cos( uv.xy*4.1*freq + vec2(5.0,3.0) + iTime ) +
                0.0625*cos( uv.yx*7.9*freq + vec2(3.0,4.0) + iTime );

  
  vec2 st = uv + warp*0.5;
//gl_FragColor = texture2D(tex0, st);
//gl_FragColor = texture2D(tex0, st);


  if(iTime > 100.) {
    gl_FragColor = texture2D(tex0, st);
  } else {
    gl_FragColor = texture2D(tex0, uv);
  }
  
}