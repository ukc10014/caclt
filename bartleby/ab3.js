"use strict";

let BLEAK_EXIT; //mostly this is false, until in collector (see DELETE_ID) case, we get to specified point when the thing basically shuts down
let J_TEXT = true; //Display Japanese text in be_boring()

let myApp;
let imgs;
let glich;

let playing = true;
let textCount = 0; let textHold = 200; //Frames to hold text on-screen, and counter

/*Text stuff*/
let simhypo = []; //Lines of text
let simhypoCount = 0; //Where we are in the simhypo array
let textboxw, textboxh; //How wide the textbox
let textboxx, textboxy; //Where to put the textbox
let normalSize = 48; //normal text size
let japanSize = 600;
let creditsSize = 36;
let creditsDelayIn = 300, creditsTimeCount = creditsDelayIn; //frames over which the credits fade in, and temporary counter variable to hold time credits are running

let pass = 0; //How many times we've been through this

/*Colour stuff*/
let glitchColour; //Colour object for the glitches
let whiteColour, blackColour, redColour, grey1Colour, grey2Colour;

function preload() {
  
  myApp = new App();
  load_Content();

   
   /*Load font*/
    //myApp.mainFont = loadFont(myApp.fontpath + 'Inconsolata.otf');
    //myApp.mainFont = loadFont(myApp.fontpath + 'MarkaziText-VariableFont_wght.ttf');
    //myApp.mainFont = loadFont(myApp.fontpath + 'HachiMaruPop-Regular.ttf');
    myApp.mainFont = loadFont(myApp.fontpath + 'NewTegomin-Regular.ttf');
    myApp.creditFont = loadFont(myApp.fontpath + 'CourierPrime-Regular.ttf');

}

class App {

  constructor()
  {
    this.medpath = 'assets/';
    this.shadpath = 'shadersGL3/';
    this.fontpath = 'fonts/';



    /*Timings*/
    this.first_time = true;
    this.runtime; //How long app running

    /*Show an image or text*/
    this.showimg = 0; //0: img, 1: text, 2:...

    /*These kludges allow the display width/height to be overriden through URL, to accommodate resolution isues (eg Retina disps)*/
    this.kludge_w;
    this.kludge_h;

	 /*Pixel ratio for Retina*/
    this.dpr;

    /*Fonts*/
    this.mainFont; //Main font
    this.creditFont;

  }

  
   
}




class Content {

  constructor() {
    this.ue4img = []; //UE4 image
    this.num_ue4img;
    this.img_type; //Type of image (mosaic, serial, etc.). Initialise in constructor
    this.curr_img; //When showing images serially, where we are in the sequence
    this.sizename_ue4img; //Bodge for how long image filenames are

    this.nextimg = 0; //Counter for when images are held on the screen rather than incrementing
    this.nextimgp = 3 ; //Outer counter, see makeimgbuf_noisy

   /*Text stuff*/
    this.holdtext = 2; //In seconds. This is persistent, used to reset textcounter after a countdown
    this.textcounter = this.holdtext * 30; //In frames, how long to hold text on screen for

    //this.jstring = '私はむしろしたくない'; //I would rather not / I rather don't want
    this.jstring = "私はしたくない.";

    //oden images
    this.oden_img; 
   
  }

	
}

function load_Content() {
    /*Create Content class and load up files*/
    /*Need this to ensure the images load before anything else happens*/
    imgs = new Content();    
} 






function setup() {
	  let canvasw,canvash,renderer; 

    //For gallery version, use portrait mode, for web landscape 750x1334
    //NOTE: seems like a conditional declaration of 'canvas', maybe only allowed to have 1 canvas declaration, hence conditionality here is limited to the dimensions
    canvasw = 750 ; canvash = 1334;
    renderer = P2D;
  	let canvas = createCanvas(canvasw,canvash,renderer);
    document.getElementById('app').innerHTML = '';
    canvas.parent('app');
  	
  	myApp.dpr = window.devicePixelRatio;  
	  myApp.kludge_w = windowWidth * myApp.dpr; //Supposedly helps Retina displays
  	myApp.kludge_h  = windowHeight * myApp.dpr;
 	
  	textFont(myApp.mainFont);
	  textSize(normalSize);

	
	setup_glitchColour();
}



function draw() {
    /*Case where work has been sold in secondary market, fuck all happens most of the time*/
      be_boring();
  }



  


/*Case where DELETE_ID (2)*/
function be_boring() {
  let boringx = 0, boringy = height - 90, namespacerx = 450, namespacery = 40; //LHS of credits plus space to separate title and name/date

  if(random(1)>0.5) {
    background(grey1Colour);
    fill(redColour);
    textSize(creditsSize - 5);
    textAlign(LEFT,TOP);
    text(".deleteIdentity()",boringx,boringy,textboxw,textboxh);
    //text(".deleteIdentity()",0,0,textboxw,textboxh);
    text("Kanad Chakrabarti",boringx + namespacerx,boringy,textboxw,textboxh);
    textAlign(RIGHT);
    text("2021",width - 60,boringy + namespacery);
  } else {

    if(J_TEXT) {
          background(whiteColour);
          /*
          for (let i = 0; i < width; i++) {
            let r = color(random(360),random(20),random(100),random());
            stroke(r);
            line(i, 0, i, height);
          }
          */

          textAlign(CENTER,CENTER);
          textSize(japanSize);
          fill(blackColour);
          for(let j=0;j<imgs.jstring.length;j++) {
              text(imgs.jstring[j],width/2,width/6+j*100);
          }
    }
  }
}




function setup_glitchColour() {
	colorMode(HSB);
	//glitchColour = color(359,100,100,1);
  whiteColour = color(0,0,100,1);
  blackColour = color(0,0,0,1);
  redColour = color(0,100,100,1);
  grey1Colour = color(200,50,50,0.1);
  grey2Colour = color(170,10,10,0.1);
  glitchColour = color(200,50,50,0.1);
}

function incr_glitchColour() {
	//change the colour of glitches slightly
	glitchColour = color(max(0,hue(glitchColour) - 10),100,100,1);
}

function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


