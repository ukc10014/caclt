"use strict";

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

   
    /*Fonts*/
    this.mainFont; //Main font
    this.creditFont;

  }

  
  make_masterBuf() 
    {
      this.masterBuf = createGraphics(width,height);
    }

  delete_masterBuf()
    {
      this.masterBuf = null;
    }
    
}


class Glitch {
  constructor() {
    
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


  makeimgs() {
    /*Creates array of images from files on disk*/
    let fn, fn_oden;
    let tmpnum = 79;

    for(let i=0;i<this.num_ue4img;i++) 
    {
      //fn = myApp.medpath+"ue4pics_smol/img" + padLeadingZeros(tmpnum,imgs.sizename_ue4img) + ".jpg"; //Need to pad the zeroes to find the file
      fn = myApp.medpath+"bart_stills/bart_" + padLeadingZeros(tmpnum,imgs.sizename_ue4img) + ".png"; //Need to pad the zeroes to find the file
      tmpnum++;

      this.ue4img[i] = loadImage(fn);
    	}


     //Load oden image
     fn_oden = myApp.medpath+"oden.jpeg";
     this.oden_img = loadImage(fn_oden); 
  	}	

	makeimgbuf_noisy() {
    
     /*Stuff to get images to stutter and randomly hold rather than incrementing*/
      if(this.nextimg == 0) { //Do all gubbins below only if inner loop is completed (i.e. image is up for specified num frames)
        if(random()<0.5) { //So smol prob of time, outer loop will be set to [60] frames of hold
          this.nextimgp = 10; //Maximum num frames to hold an image for 
        } else {
          this.nextimgp = max(1,this.nextimgp - 1);  //Smoothly decrement from max frames
        } //Outer counter that determines setting of inner counter
        this.nextimg = this.nextimgp; //Inner counter that counts how long image is up for
        this.curr_img = (this.curr_img + 1)%this.ue4img.length; //Increment image
      } else {
        this.nextimg = max(0,this.nextimg - 1); //Decrement inner loop
      }


      let imgWidth = this.ue4img[this.curr_img].width/4;
      let imgHeight = this.ue4img[this.curr_img].height/4;
      let imgshow = this.ue4img[this.curr_img];
      
      var ulx,uly;

      /*Colour shader*/
       console.log('ab1.js width height ',width,height,imgWidth,imgHeight);
            myApp.masterBuf.image(imgshow,-100,-100,width,height);
         
		

      

      //Some weird shit to accommodate phone portrait, landscape, etc.
     let dw = drawingContext.canvas.width;
     let dh = drawingContext.canvas.height;
/*     let dw = width;
     let dh = height;*/
     let zoomr; //zooming ratio
     
     /*Have done 2 principal cases: smartphone portrait & desktop landscape.
      *Need to do smartphone & ipad landscape.  Also need to handle
      *transition from landscape to portrait
      */
      if(dh>=dw) { //Think of this as smartphone/portrait case
        /*Normally seems like buffer LH top corner is middle of canvas, 
         *so translating to canvas LH top and half the image dimensions 
         *(plus a bit in y axis)
         */

        
        //If in gallery mode then tweak zoom/origin a bit to make it more 'painterly', also only do this here since Owen wants portrait mode screen
        
          
          let randfac = (1 + random(-1.,1.) * frameCount/100); //randomness eases in over 1000 frames
          
          
            zoomr = 60 - 30 * (frameCount / 4000); //See above
            ulx = (-dw / 2 - imgWidth * zoomr / 2);
            uly = (-dh / 2 - imgWidth * zoomr / 2 * ((dh - dw) / dh));
            //zoomr = max(dw / imgWidth , dh / imgHeight)*2;
          
  zoomr = 1;ulx=uly=0;

        image(myApp.masterBuf,ulx,uly,imgWidth * zoomr,imgHeight * zoomr);

      } else if(dw>dh) { //28/4/21: Even in browser mode this basically will be ignored as canvas is set to be phone type
         
          ulx = 0; uly = 0; zoomr = 1;
          image(myApp.masterBuf,ulx,uly,imgWidth * zoomr,imgHeight * zoomr);
      
    }
	}
}

function load_Content() {
    /*Create Content class and load up files*/
    /*Need this to ensure the images load before anything else happens*/
    imgs = new Content();


    /*All stuff for UE4 images below this*/
    imgs.img_type = 1; /*Type of img: 0 mosaic; 1 series; 2 none*/
    imgs.num_ue4img = 78; /*Number of images*/
    imgs.curr_img = int(random()*imgs.num_ue4img);
    imgs.sizename_ue4img = 4; //Real bodge, this is size we need to pad to
    imgs.makeimgs(); //Make an array of images
    } 

function preload() {
	/*Placeholder message*/
    //document.getElementById("app").innerHTML = "Testing version 21/4/21: probably won't work on iPhone, but might on landscape mode.  Seems to work on Mac desktop.";

	myApp = new App();


	 /*Bring in image files*/
    load_Content();

	 /*Load font*/
    //myApp.mainFont = loadFont(myApp.fontpath + 'Inconsolata.otf');
    //myApp.mainFont = loadFont(myApp.fontpath + 'MarkaziText-VariableFont_wght.ttf');
    //myApp.mainFont = loadFont(myApp.fontpath + 'HachiMaruPop-Regular.ttf');
    myApp.mainFont = loadFont(myApp.fontpath + 'NewTegomin-Regular.ttf');
    myApp.creditFont = loadFont(myApp.fontpath + 'CourierPrime-Regular.ttf');

    

}

/*Decodes URL to work out if its online mode 0,1,2 for testing*/
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
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
  	myApp.make_masterBuf();

  
  	textFont(myApp.mainFont);
	textSize(normalSize);

	init_simhypo(); //Load text strings

	
	setup_glitchColour();



}



function draw() {
   

    
    //Once at the end, show credits; if gallery mode, then just hold the credits; if web mode, then go on with rest of code (simhypocount should loop based below modulo)
    if(simhypoCount == (simhypo.length - 1)) {
      show_credits(); 
    }


	myApp.runtime = millis();

  	if(myApp.first_time === true) {
    	/*Remove placeholder*/
    	//document.getElementById("placeholder").parentElement.remove();
    	myApp.first_time = false;
  	}

  	if(myApp.showimg == 0) { //Alternate between showing images and text
    	imgs.makeimgbuf_noisy();
    	//myApp.showimg = 1;
    
  	} else {

      if(imgs.textcounter <= 0) {
        //myApp.showimg = 0;
        imgs.textcounter = imgs.holdtext * frameRate(); //Reset counter based on realised framerate
        if(simhypoCount == simhypo.length-1) {pass++;}
         
        simhypoCount = (simhypoCount + 1)%simhypo.length; //Increment line of the text in gallery, increment & loop in web (in creator mode, but not in collector)
         
      } else {
      
      	//Japanese text
        
        fill(grey1Colour);
        textAlign(CENTER,CENTER);
        textSize(japanSize);
        noStroke();
        let jIndex = simhypo[simhypoCount].charAt(0);
        text(imgs.jstring[int(jIndex)],width/2,height/2);
       
        //English simarg captions
        fill(whiteColour);
        textSize(normalSize);	
    		text(simhypo[simhypoCount],textboxx,textboxy,textboxw,textboxh);
        
        
       	 imgs.textcounter--;
      }
    
    }

    //Every [x] milliseconds of runtime, toggle whether we're in image or text  
    if(frameCount%10 == 0) {toggle_showimg();}

  }

  function toggle_showimg() {
    //Assumes only two possibilities for showimg (0 or 1)
    (myApp.showimg == 0) ? myApp.showimg = 1 : myApp.showimg = 0;
  }


  function show_credits() {
    let lhsMargin = 100; //pixels from left side
    let amt = 1 - creditsTimeCount/creditsDelayIn; //How far into the credits phase-in are we? used in colour things
    let bgColour = blackColour;


    background(bgColour);
    textAlign(LEFT,BOTTOM);
    textSize(creditsSize);
    textFont(myApp.creditFont);
    //imgs.oden_img.filter(GRAY);
    
    if(amt > 0.5) {
      //imgs.oden_img.filter(BLUR,lerp(0,2,amt/0.2));
      image(imgs.oden_img,(1-amt)*200,-height/3,imgs.oden_img.width/4,imgs.oden_img.height/4);
    }


    fill(lerpColor(bgColour,redColour,amt));  
    text(".deleteIdentity()",textboxx + lhsMargin,textboxy-500,textboxw,textboxh);

    fill(lerpColor(bgColour,whiteColour,amt));
   
    text("Kanad Chakrabarti, 2021",textboxx + lhsMargin,textboxy,textboxw,textboxh);

    creditsTimeCount = max(0,creditsTimeCount-1);
  }

  //Blunt lerp function, doesn't type-check or handle errors
  /*function lerp(value, x_0, x_n, y_0, y_n) {
    return ((y_n - y_0)/(x_n - x_0))*(value - x_0) + y_0;  
  }*/





function init_simhypo() {
  textboxw = width; textboxh = height * 0.8;
  textboxx = -width/4*0; textboxy = -height/2*0; //If non-webgl, then origin is ULH corner


	simhypo[0] = "0.0: \n \n \n  None of the following notions are especially novel: (a) that computers might some day think; (b) that we might live in a simulated or virtual world; or (c) that humans might go extinct.";

	simhypo[1] = "0.1: \n \n \n  However, when jointly cast into a specific philosophical form - the Simulation Argument (SA) - they become an fertile meeting-ground for videogames, critical theory, and eschatology.";

	simhypo[2] = "1.0: \n \n \n  Existential risk (ER) studies often consider long-timeframes (millions or billions of years), work at a large scale (planetary, solar system, or interstellar), and view humanity as unitary entity or concept.";

	simhypo[3] = "1.1: \n \n \n  Yet current lived experience is fragmented geographically (the impact of climate-change is unevenly distributed) and temporally (present suffering is less abstract than future extinction).";

	simhypo[4] = "1.2: \n \n \n  How do we reconcile the urgent priorities of the present with the long-term planning and thoughtful action needed to mitigate existential risk?";

	simhypo[5] = "2.0: \n \n \n  If this is indeed the \'time of perils\', what can we realistically do?";

	simhypo[6] = "2.1: \n \n \n  How does one value Intergenerational Public Goods (IPGs), such as the harm caused by future lives that would be lost (or rendered much less worth-living) if humanity went extinct?";

	simhypo[7] = "3.0: \n \n \n  Is it a problem (that/if) funding for IPGs come from private philanthropy?";

	simhypo[8] = "3.1: \n \n \n  One of the assumptions in the analysis is that humanity eventually settles space, and therefore the maximum number of humans that may ever live is much higher than the Earth's current population.";

	simhypo[9] = "3.2: \n \n \n  Should concrete action on space settlement be deferred until humans have \'fixed\' our current flawed condition on Earth?";

  simhypo[10] = "3.3 \n \n \n  Or is it all the more important that we develop species-level resilience to ER by spreading out (keeping in mind that any expansion off the planet could take decades or centuries)?"

	simhypo[11] = "4.0: \n \n \n Certain features closely associated with Artificial General Intelligence (AGI), such as computers developing consciousness, are a central feature of the SA.";

	simhypo[12] = "4.1: \n \n \n A malevolent or misaligned AGI is also a principal source of identified ER.";

	simhypo[13] = "4.1.1: \n \n \n How far away is an AGI (whether benevolent, malevolent, or indifferent)?";

	simhypo[14] = "4.1.2: \n \n \n Is it an all-or-nothing thing, are there intermediate steps that we could watch for, such as whole-brain emulation?";

  simhypo[15] = "4.1.3: \n \n \n Are there specific algorithmic advances (aside from the large dataset and massive-compute approaches of current machine-learning)?";

	simhypo[16] = "4.2: \n \n \n Would any of these have an impact on relative probabilities of the SA's three limbs?";

	simhypo[17] = "5.0: \n \n \n Is it wise, from an ER perspective, to pursue some of the proposed tests for the SA?";

	simhypo[18] = "5.1: \n \n \n We create characters within the simulated worlds of videogames, and don't worry too much about their suffering.";

	simhypo[19] = "5.2: \n \n \n Does ancestor simulation present ethical issues, for instance: intentional suffering of conscious (simulated) beings; or identity-erasure when a simulation is shut down?";

	simhypo[20] = "6.0: \n \n \n Why might our posthuman successors wish to simulate us at all?";

	simhypo[21] = "7.0: \n \n \n The SA suggests the possibility of an infinity of nested (simulated) worlds.";

	simhypo[22] = "7.1: \n \n \n What is the role of a Universal Non-Infinite Turing Machine (UNITA) in handling this regression?";

	simhypo[23] = "7.2: \n \n \n Does the SA tell us anything about the problem of evil?";


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


