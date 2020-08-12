#ifdef GL_ES

precision mediump float;

#endif


attribute vec3 aPosition;
attribute vec2 aTexCoord;

//UKC: Two we need to pass to frag

varying vec2 varyingtexcoord;


void main(){
	vec4 positio = vec4(aPosition,1.0); 
	/*This weirdness is needed bec position can't be passed as both out and in, and frag can't take position directly (it applies only to vertices*/
    
    positio.xy = positio.xy * 2.0 - 1.0;

    varyingtexcoord = aTexCoord;
    
    //gl_Position = modelViewProjectionMatrix * position;

    gl_Position = positio;
}
