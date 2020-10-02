"use strict"

let mel;
let medpath = '../media/';
let navh = 73;
let dpr;
let yoff = 0.0;

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


function makefunstuff() {
	

    let dw = drawingContext.canvas.width / dpr;
    let dh = drawingContext.canvas.height / dpr;

    
  
    /*Fun stuff*/
    
      let locX = mouseX - dh / 2;
      let locY = mouseY - dw / 2;

      ambientLight(190,70,70);
      directionalLight(2, 100, 50, 0.25, 0.25, 0);
      pointLight(300, 100, 100, locX, locY, 250);
      stroke(0,50,50);
      push();
      translate(0, 100, 0);
      rotateZ(frameCount * 0.02);
      rotateX(frameCount * 0.02);
      specularMaterial(20,50,50);
      //box(50, 50, 50);
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