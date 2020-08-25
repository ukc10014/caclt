precision mediump float;


uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

//uniform mat4 modelViewProjectionMatrix;

attribute vec3 aPosition;


void main(){
    
    vec4 positio = vec4(aPosition,1.0); 
	//gl_Position = modelViewProjectionMatrix * position;
	
	//Uncomment this to have the clouds cover the screen
    positio.xy = positio.xy * 2.0 - 1.0;

	gl_Position = positio;
    

    /*This weirdness is needed bec position can't be passed as both out and in, and frag can't take position directly (it applies only to vertices*/
}
