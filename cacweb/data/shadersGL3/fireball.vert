precision mediump float;


attribute vec3 aPosition;


void main(){
	vec4 positio = vec4(aPosition,1.0); 
	/*This weirdness is needed bec position can't be passed as both out and in, and frag can't take position directly (it applies only to vertices*/
    
    positio.xy = positio.xy * 2.0 - 1.0;

    gl_Position = positio;
}
