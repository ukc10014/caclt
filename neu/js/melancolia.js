"use strict"

let mel;
let medpath = '../media/';
let navh = 73;
let dpr;
let yoff = 0.0;
let coordpSol1 = [0,0]; //Sun 1 coordinates in spherical
let coordpSol2 = [170,40]; //Sun 2 coordinates in spherical
let bg = 0; //Flag for flashing background

function preload() {
	
	/*Load Durer model*/
    mel = loadModel(medpath + 'melancolia.obj',true);
}

function setup() {
	// put setup code here
  let canvas = createCanvas(windowWidth,windowHeight - navh,WEBGL);
  canvas.parent('app');
  dpr = window.devicePixelRatio;
  colorMode(HSB);
}

function draw() {
	makefunstuff();
}


var getPolar = function(x, y, z, r, theta, phi) {
	// Get as radians
	var fa = theta * (PI/180);
	var fb = phi * (PI/180);
	
	// Convert coordinates
	var dx = r * sin(fa) * cos(fb);
	var dy = r * sin(fa) * sin(fb);
	var dz = r * cos(fa);
	
	// Add origin values (not necessary)
	var fx = x + dx;
	var fy = y + dy;
	var fz = z + dz;

	return [fx, fy, dz];
}

function makefunstuff() {
	 if(second()%37 == 0) {
   if(bg == 0) {
      background(0,0,0,100); 
      bg=1;
    } else {
      background(100,100,100,0);
      bg = 0;
    }
  }

    let dw = drawingContext.canvas.width / dpr;
    let dh = drawingContext.canvas.height / dpr;

	let coordcSol1 = getPolar(0,0,0,1000,coordpSol1[0],coordpSol1[1]);
	let coordcSol2 = getPolar(0,0,0,500,coordpSol2[0],coordpSol2[1]);
    /*Fun stuff*/
    
      let locX = mouseX - dh / 2;
      let locY = mouseY - dw / 2;

      ambientLight(70);
	  pointLight(300, 100, 100, coordcSol1[0],coordcSol1[1],coordcSol1[2]);
	pointLight(250, 100, 80, coordcSol2[0],coordcSol2[1],coordcSol2[2]);     	
      stroke(0,50,50);
  		
 	coordpSol1[0]++;coordpSol1[1]++;
 	coordpSol2[0]++;coordpSol2[1]++;

      push();
      translate(0, 100, 0);
      rotateZ(frameCount * 0.02);
      rotateX(frameCount * 0.02);
      specularMaterial(20,50,50);
      
      shininess(100);
      model(mel);
      pop();

      push();
      translate(width / 4, map(sin(millis()/60000),0,1,-dh,dh), 0);
      ambientMaterial(100,50,80);
      sphere(25, 25);
      pop();
    /*End fun stuff*/

// We are going to draw a polygon out of the wave points
  beginShape();
    fill(202,59,30,0.1);
    //noStroke();
    let xoff = 0; // Option #1: 2D Noise
    
    // Iterate over horizontal pixels
    for (let x = -dw; x <= dw; x += 10) {
      // Calculate a y value according to noise, map to

      // Option #1: 2D Noise
      let y = map(noise(xoff, yoff), 0, 1, 100, 300);

      // Set the vertex
      vertex(x, y);
      // Increment x dimension for noise
      xoff += 0.05;
    }
    // increment y dimension for noise
    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
  endShape(CLOSE);

  }