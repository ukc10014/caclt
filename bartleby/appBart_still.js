"use strict";

let SLOWGLITCH = true; //Movie pixels based glitching
let GL_SHADERS = true; //Are we using GL rendering/shaders etc.

let myApp;
let imgs;
let glich;

let playing = true;
let textCount = 0; let textHold = 200; //Frames to hold text on-screen, and counter
let movieThresh = 0.1; //Fraction of movie to play before going to text
let movieEndFraction = 0.2; //fraction of total duration used as upper bound of random() on each play
let movieEndFloor = 0.05; //so a movie doesn't not appear (ie. two text pieces alongside)
/*NOTE: movieEndFraction > movieStartFraction*/

let moview, movieh, moviex, moviey; //width, height, coords of movie player


let simhypo = []; //Lines of text
let simhypoCount = 0; //Where we are in the simhypo array
let textboxw, textboxh; //How wide the textbox
let textboxx, textboxy; //Where to put the textbox

let pass = 0; //How many times we've been through this

let glitchColour; //Colour object for the glitches

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
    this.showimg; //0: img, 1: text, 2:...

    /*These kludges allow the display width/height to be overriden through URL, to accommodate resolution isues (eg Retina disps)*/
    this.kludge_w;
    this.kludge_h;

	 /*Pixel ratio for Retina*/
    this.dpr;

  }

  
  make_masterBuf() 
    {
      if(GL_SHADERS) {this.masterBuf = createGraphics(windowWidth,windowHeight,WEBGL);} else {this.masterBuf = createGraphics(windowWidth,windowHeight);}
    }

  delete_masterBuf()
    {
      this.masterBuf = null;
    }
    
}


class Glitch {
  constructor() {
    /*Cinematic vignette/scratch shader*/
    if(GL_SHADERS) {this.sCine2 = loadShader(myApp.shadpath + 'cinematic_colour.vert',myApp.shadpath + 'cinematic_colour.frag');}    
  } 

}

class Content {

  constructor() {
    this.ue4img = []; //UE4 images
    this.num_ue4img;
    this.img_type; //Type of image (mosaic, serial, etc.). Initialise in constructor
    this.curr_img; //When showing images serially, where we are in the sequence
    this.sizename_ue4img; //Bodge for how long image filenames are

    this.nextimg = 0; //Counter for when images are held on the screen rather than incrementing
    this.nextimgp = 120; //Outer counter, see makeimgbuf_noisy

   /*Text stuff*/
    this.holdtext = 2; //In seconds. This is persistent, used to reset textcounter after a countdown
    this.textcounter = this.holdtext * 10; //In frames, how long to hold text on screen for
   
  }


  makeimgs() {
    /*Creates array of images from files on disk*/
    let fn;
    let tmpnum = 1;

    for(let i=0;i<this.num_ue4img;i++) 
    {
      fn = myApp.medpath+"ue4pics_smol/img" + padLeadingZeros(tmpnum,imgs.sizename_ue4img) + ".jpg"; //Need to pad the zeroes to find the file
      tmpnum++;

      this.ue4img[i] = loadImage(fn);
    	}
  	}	

	makeimgbuf_noisy() {
    
     /*Stuff to get images to stutter and randomly hold rather than incrementing*/
      if(this.nextimg == 0) { //Do all gubbins below only if inner loop is completed (i.e. image is up for specified num frames)
        if(random()<0.5) { //So smol prob of time, outer loop will be set to [60] frames of hold
          this.nextimgp = 60; //Maximum num frames to hold an image for 
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
        if(GL_SHADERS) {
	        myApp.masterBuf.shader(glich.sCine2);
	        glich.sCine2.setUniform("iResolution",[myApp.kludge_w,myApp.kludge_h]);
	        glich.sCine2.setUniform("tex0",imgshow); //Explicit binding is good if multiple textures
	        glich.sCine2.setUniform("iTime",second());
			myApp.masterBuf.rect(0,0,imgWidth,imgHeight);
		} else {
			myApp.masterBuf.image(imgshow,-100,-100,windowWidth,windowHeight);
		}

      

      //Some weird shit to accommodate phone portrait, landscape, etc.
     let dw = drawingContext.canvas.width;
     let dh = drawingContext.canvas.height;
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

        ulx = -dw / 2 - imgWidth / 2 ;
        uly = -dh / 2 - imgWidth / 2 * ((dh - dw) / dh);
        zoomr = max(dw / imgWidth , dh / imgHeight);
        image(myApp.masterBuf,ulx,uly,imgWidth * zoomr,imgHeight * zoomr);

      } else { //This is desktop/landscape case

        ulx = -dw / 2;
        uly = -dh / 2 - imgWidth / 2 * ((dw - dh) / dw);
        zoomr = max(dw / imgWidth , dh / imgHeight); 
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
    imgs.num_ue4img = 156; /*Number of images*/
    imgs.curr_img = int(random()*imgs.num_ue4img); /*Initialise current image in case we show serially*/
    imgs.sizename_ue4img = 3; //Real bodge, this is size we need to pad to
    imgs.makeimgs(); //Make an array of images
    } 

function preload() {
	/*Placeholder message*/
    document.getElementById("app").innerHTML = "Testing version 6/4/21: probably won't work on iPhone, but might on landscape mode.  Seems to work on Mac desktop.";


	//movie = createVideo(['assets/bartleby.mp4'],vidLoad);	
	myApp = new App();

	 /*Bring in image files*/
    load_Content();

	 /*Load font*/
    myApp.fonty = loadFont(myApp.fontpath + 'Inconsolata.otf');
    //myApp.fonty = loadFont(myApp.fontpath + 'MarkaziText-VariableFont_wght.ttf');


    /*Create new Glitch object*/
    glich = new Glitch();

}

function setup() {
	//if(GL_SHADERS) {let canvas = createCanvas(windowWidth, windowHeight,WEBGL);} else {let canvas = createCanvas(windowWidth,windowHeight);}
  	let canvas = createCanvas(windowWidth, windowHeight,WEBGL);
  	canvas.parent('app');
  	myApp.make_masterBuf();

  	myApp.dpr = window.devicePixelRatio;  
	myApp.kludge_w = windowWidth * myApp.dpr; //Supposedly helps Retina displays
  	myApp.kludge_h  = windowHeight * myApp.dpr;


 	moview = width; movieh = height;
 	moviex = 0 ; moviey = 0;
  	
  	textFont(myApp.fonty);
	textSize(48);

	init_simhypo(); //Load text strings

	
	setup_glitchColour();

}

/*
function vidLoad() {
	//movie.loop();
	movie.play();
	movie.volume(0);
}
*/

function draw() {

	myApp.runtime = millis();

  	if(myApp.first_time === true) {
    	/*Remove placeholder*/
    	//document.getElementById("placeholder").parentElement.remove();
    	myApp.first_time = false;
  	}

  	if(myApp.showimg == 0) { //Alternate between showing images and text
    	imgs.makeimgbuf_noisy();
    	myApp.showimg = 1;
    
  	} else {
      if(imgs.textcounter <= 0) {
        myApp.showimg = 0;
        imgs.textcounter = imgs.holdtext * frameRate(); //Reset counter based on realised framerate
        if(simhypoCount == simhypo.length-1) {pass++;console.log("pass ",pass);}
        simhypoCount = (simhypoCount + 1)%simhypo.length; //Increment line of the text
    } else {
        //Uncomment this to get brief glimpse of images
        if(pass%2 == 0) {(myApp.runtime < 10000) ? background(202*sin(myApp.runtime),10,50,1) : (cos(myApp.runtime) > 0.8 ? background(202,10,40,1) : background(200,10,35,0.9))};
        
        //background(0);
		fill(0,20,10,1);	
		text(simhypo[simhypoCount],textboxx,textboxy,textboxw,textboxh);

       	 imgs.textcounter--;
      }
    
    } 
  }

/*
	if(movieFrac() < movieThresh || playing == true) {
		if(playing == true) {
			background(0);
			image(movie, moviex, moviey, moview, movieh);
			
			if(SLOWGLITCH == true) {
			fill(glitchColour);
			movie.loadPixels();
  			for (var y = moviey; y < movieh + moviey; y += 50 - pass * 2) {
    			for (var x = moviex; x < moview; x += 49 - pass * 3) {
      				var offset = min(movie.pixels.length,((y*width)+x)*4);
      				rect(x, y, 10, 10 * (movie.pixels[offset+1]/255));
    			}
  			}
  		}
		}

		if(movieFrac() >= movieThresh) {
			playing = false;

			if(textCount >= textHold) {
				textCount = 0;
				simhypoCount = (simhypoCount + 1)%simhypo.length;
				movieThresh = random(movieEndFloor,movieEndFraction);
				movie.time(0);
				if(SLOWGLITCH == true) {incr_glitchColour();}
				pass++; //increment the counter for how many times video has played			
			} else {
				movie.stop();
				movieThresh = random(movieEndFloor,movieEndFraction);
				movie.time(0);
			}
		}		
	} 


	if(textCount < textHold || playing == false) {
		if(playing == false) {
			background(0);
			fill(255);	
			text(simhypo[simhypoCount],textboxx,textboxy,textboxw,textboxh);
			textCount++;
		}

		if(textCount >= textHold) {
			playing = true;
			movie.play();
			if(movieFrac() >= movieThresh) {
				//For some reason, the time(startMovie) never worked,
				//always ended up assigning movie.elt.CurrentTime as zero (in p5.js) 
				//so movieEndFraction actually defines the end of the movie in the randomiser

				//let startMovie = random(0, movieStartFraction * movie.duration()); //Get random starting point
				
				
				simhypoCount = (simhypoCount + 1)%simhypo.length;
			}
		}
	} 
	*/





function init_simhypo() {
	textboxw = width * 0.8; textboxh = height;
	textboxx = -500; textboxy = -300;

	simhypo[0] = "0.0: \n \n \n  None of the following notions are especially novel: (a) that computers might some day think; (b) that we might live in a simulated or virtual world; or (c) that humans might go extinct.";

	simhypo[1] = "0.1: \n \n \n  However, when jointly cast into a specific philosophical form - the Simulation Argument - they become an artistically fertile meeting-ground for videogames, critical theory, and eschatology.";

	simhypo[2] = "1.0: \n \n \n  Existential risk (ER) studies often consider long-timeframes (millions or billions of years), work at a large scale (planetary, solar system, or interstellar), and view humanity as unitary entity or concept.";

	simhypo[3] = "1.1: \n \n \n  Yet current lived experience is fragmented geographically (the impact of climate-change is unevenly distributed) and temporally (present suffering is less abstract than future extinction).";

	simhypo[4] = "1.2: \n \n \n  How do we reconcile the urgent priorities of the present with the long-term planning and thoughtful action needed to mitigate existential risk?";

	simhypo[5] = "2.0: \n \n \n  If this is indeed the \'time of perils\', what can we realistically do?";

	simhypo[6] = "2.1: \n \n \n  Is it a problem (that/if) funding for intergenerational public goods come from private philanthropy?";

	simhypo[7] = "3.0: \n \n \n  How does one quantify very long-term questions in ER, such as the harm caused by future lives that would be lost (or rendered much less worth-living) if humanity went extinct?";

	simhypo[8] = "3.1: \n \n \n  One of the assumptions in the analysis is that humanity eventually settles space, and therefore the maximum number of humans that may ever live is much higher than the Earth's current population.";

	simhypo[9] = "3.2: \n \n \n  Should concrete action on space settlement be deferred until humans have \'fixed\' our current flawed condition on Earth, or is it all the more important that we develop species-level resilience to ER by spreading out (keeping in mind that any expansion off the planet could take decades or centuries).";

	simhypo[10] = "4.0: \n \n \n A malevolent or misaligned Artificial General Intelligence (AGI) is a principal source of identified ER.";

	simhypo[11] = "4.1: \n \n \n In addition, certain features closely associated with AGI, such as computers developing consciousness, are a central feature of the Simulation Argument.";

	simhypo[12] = "4.1.1: \n \n \n How far away is an AGI (whether benevolent, malevolent, or indifferent)?";

	simhypo[13] = "4.1.2: \n \n \n Is it an all-or-nothing thing, are there intermediate steps that we could watch for, such as whole-brain emulation?  Are there specific algorithmic advances (aside from the large dataset and massive-compute approaches of current machine-learning)?";

	simhypo[14] = "4.2: \n \n \n Would any of these have an impact on relative probabilities of the Simulation Argument's three limbs?";

	simhypo[15] = "5.0: \n \n \n Is it wise, from an ER perspective, to pursue some of the proposed tests for the Simulation Hypothesis?";

	simhypo[16] = "5.1: \n \n \n We create characters within the simulated worlds of videogames, and don't worry too much about their suffering.";

	simhypo[17] = "5.2: \n \n \n Does ancestor simulation present ethical issues, for instance: intentional suffering of conscious (simulated) beings; or identity-erasure when a simulation is shut down?";

	simhypo[18] = "6.0: \n \n \n Why might our posthuman successors wish to simulate us at all?";

	simhypo[19] = "7.0: \n \n \n The Simulation Hypothesis suggests the possibility of an infinity of nested (simulated) worlds.";

	simhypo[20] = "7.1: \n \n \n What is the role of an Universal Turing Machine in handling this infinite regression?";

	simhypo[21] = "7.2: \n \n \n Does the Simulation Hypothesis tell us anything about the problem of evil and the existence of God?";


}

function movieFrac() {
	if(movie != null) {
		if(movie.time() == 0) {return 0;} 
		else {return movie.time() / movie.duration();}
	}
}

function setup_glitchColour() {
	colorMode(HSB);
	//glitchColour = color(359,100,100,1);
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

