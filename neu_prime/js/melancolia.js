"use strict"

let mel;
let medpath = '../media/';
let navh = 73;
let dpr;
let yoff = 0.0;
let coordpSol1 = [0,0]; //Sun 1 coordinates in spherical
let coordpSol2 = [170,40]; //Sun 2 coordinates in spherical
let bg = 0; //Flag for flashing background


/*Textfile material*/
let fontpath = '../fonts/';
let txtpath = '../text/';
let fonty;
let textcont;
let holdtext = 2; //In seconds. This is persistent, used to reset textcounter after a countdown
let textcounter = holdtext * 60; //In frames, how long to hold text on screen for
let line; //What line of the text is being shown

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

  /*Text stuff*/
  fonty = loadFont(fontpath + 'Inconsolata.otf');
  maketext();
  setfirstline();
}

function draw() {
	makefunstuff();

  if(textcounter <= 0) {
      textcounter = holdtext * frameRate(); //Reset counter based on realised framerate
      line++; //Increment line of the text
    } else {
      
      /*Uncomment below to do Solaris text*/
      //drawtext(); //If we want to do the Solaris text
      textcounter--;
    }
}

function setfirstline() {
    //this.line = int(random() * this.textcont.length); //Set up first line that the text generator displays 
   line = 1;
  }

function maketext() {
    /*Loads a text file*/
    let fn;
    fn = txtpath + "solaris.txt";
    textcont = loadStrings(fn);    
  }

function drawtext() {
    let ulx,uly;
    /*
    let dw = drawingContext.canvas.width;
    let dh = drawingContext.canvas.height;
    */

    let dw = width;
    let dh = height;

    if(dh >= dw) {
      ulx = -dw / 2;
      uly = -dh / 2;
} else {
      ulx = -dw / 2;
      uly = -dh / 2;
    }

    uly = uly + (line * 10)%100;

    textFont(fonty);
    textSize(50);
    fill(line,int(sin(line)*100),int(cos(line)*100))
    //fill(0,100,100,1);
    textAlign(RIGHT,TOP);
    text(textcont[line],ulx,uly,width,height);

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
      background(0,0,0,.2); 
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