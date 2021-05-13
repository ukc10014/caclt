"use strict";

/*UKC 13/5/21: This is the version un-refactored into creator, primary, secondary
 *cases.  So it is closest to the original (appBart_still2.js) version and has
 *parse_URL (so theoretically can be modified via ? URL), also has legacy
 *contract/ABI info.  More importantly, it has the shadersGL3 code which
 *isn't really used in the online/NFT version but could be potentially used in 
 *a gallery/MP4 version
 */

let GL_SHADERS; //Are we using GL rendering/shaders etc., this is set in setup based on GALLERY below
let GALL_WEB ; //If true then gallery version, else web version (to be set in url, but defaults set in setup())
let DELETE_ID; //int with 3 values: creator (0), collector (1), secondary buyer (2) (Set in URL but defaults in setup())
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

  
  make_masterBuf() 
    {
      if(GL_SHADERS) {this.masterBuf = createGraphics(windowWidth,windowHeight,WEBGL);} else {this.masterBuf = createGraphics(width,height);}
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
    this.ue4img = []; //UE4 image
    this.num_ue4img;
    this.img_type; //Type of image (mosaic, serial, etc.). Initialise in constructor
    this.curr_img; //When showing images serially, where we are in the sequence
    this.sizename_ue4img; //Bodge for how long image filenames are

    this.nextimg = 0; //Counter for when images are held on the screen rather than incrementing
    this.nextimgp = 3 ; //Outer counter, see makeimgbuf_noisy

   /*Text stuff*/
    if(GALL_WEB) {this.holdtext = 2} else {this.holdtext = 2;}; //In seconds. This is persistent, used to reset textcounter after a countdown
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
      if(GL_SHADERS) {
	        myApp.masterBuf.shader(glich.sCine2);
	        glich.sCine2.setUniform("iResolution",[myApp.kludge_w,myApp.kludge_h]);
	        glich.sCine2.setUniform("tex0",imgshow); //Explicit binding is good if multiple textures
	        glich.sCine2.setUniform("iTime",second());
			   myApp.masterBuf.rect(0,0,imgWidth,imgHeight);
		  
      } else {
      
              if(DELETE_ID == 1 && random(0,1) > 0.5) {
                myApp.masterBuf.image(imgshow,-100,-100,width,height);
              } else if(DELETE_ID == 1) {
                for(let i = 0; i<min(10000,frameCount);i++) {
                  fill(glitchColour);
                  let a = random(0,width), b = random(0,height);
                  for(let j = 0; j<300;j++) {
                   if(random(0,1)>0.5) {circle(a+j,b,5);}
                  }
                }
              } else if(DELETE_ID == 0) {
            myApp.masterBuf.image(imgshow,-100,-100,width,height);
        } 
		}

      

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
        if(GALL_WEB) {
          zoomr = 60 - 30 * (frameCount / 4000); //Gradually bringing the zoom down over 4000 frames (approximately the total frames required to get through the text below as of 22/4/21)
          ulx = (-dw / 2 - imgWidth * zoomr / 2);
          uly = (-dh / 2 - imgWidth * zoomr / 2 * ((dh - dw) / dh));
        } else {
          
          let randfac = (1 + random(-1.,1.) * frameCount/100); //randomness eases in over 1000 frames
          
          if(DELETE_ID == 1) {         
            ulx = (-dw / 2 - imgWidth / 2) * randfac ;
            uly = (-dh / 2 - imgWidth / 2 * ((dh - dw) / dh)) * randfac;
            zoomr = max(dw / imgWidth , dh / imgHeight) * randfac;
          } else {
            zoomr = 60 - 30 * (frameCount / 4000); //See above
            ulx = (-dw / 2 - imgWidth * zoomr / 2);
            uly = (-dh / 2 - imgWidth * zoomr / 2 * ((dh - dw) / dh));
            //zoomr = max(dw / imgWidth , dh / imgHeight)*2;
          }

        }
        image(myApp.masterBuf,ulx,uly,imgWidth * zoomr,imgHeight * zoomr);

      } else if(dw>dh) { //28/4/21: Even in browser mode this basically will be ignored as canvas is set to be phone type
        if(GALL_WEB) {
        ulx = -dw / 2;
        uly = -dh / 2 - imgWidth / 2 * ((dw - dh) / dw);
        zoomr = max(dw / imgWidth , dh / imgHeight);
        image(myApp.masterBuf,ulx,uly,imgWidth * zoomr,imgHeight * zoomr);
      } else {
          ulx = 0; uly = 0; zoomr = 1;
          image(myApp.masterBuf,ulx,uly,imgWidth * zoomr,imgHeight * zoomr);
      }
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
    if(GALL_WEB) {imgs.curr_img = 0;} else {imgs.curr_img = int(random()*imgs.num_ue4img);} /*Initialise starting img (in gallery, 0; on web, random)*/
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


    //Parse URL
    parse_URL();

    if(GALL_WEB) {
        GL_SHADERS = true;
        /*Create new Glitch object*/
        glich = new Glitch();
    } else {
        GL_SHADERS = false;
    }

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

async function parse_URL() {
  let gw = GetURLParameter('GALL_WEB'); //Look for GALL_WEB (Boolean) in URL
  let di = GetURLParameter('DELETE_ID'); //Look for DELETE_ID (0,1,2) in URL

  //Set values for these things
  /*Logic: if GALL_WEB in URL is true then we're in gallery mode, otherwise web mode.  
   *If DELETE_ID in URL is 0, then basic online mode; if 3, then check crypt0den on ETH
   *mainnet to see what state the token is in.  If 2 (or something else), then go to default
   *case of DELETE_ID 2 (as of 4/5/21, is white screen with scrambled Japanese script)
   */
  if(gw == "true") {GALL_WEB = true;} else {GALL_WEB = false;}
  if(di == "0") {DELETE_ID = 0;} 
    else if(di == "1") {DELETE_ID = 1;}
    else if(di == "3") {
        
        await check_crypt0den(); 
        /*.then(result = await getSaleStatus())        
        .then(console.log("parse_URL>>get result ",result))
        .then(process_checkresult(result));*/
        DELETE_ID = 0; //Blockchain check is driven by button since automatic check at startup not working
    } else {DELETE_ID = 2;}
}

function process_checkresult(r) {
  if(r == true) 
          {
            DELETE_ID = 1; 
            console.log('check_crypt0den returned TRUE');
          } else if(r == false) {
            DELETE_ID = 0;
            console.log('check_crypt0den returned FALSE');
          } else {
            console.log('check_crypt0den ERROR ==>',r);}
}

function setup() {
	  let canvasw,canvash,renderer; 

    //For gallery version, use portrait mode, for web landscape 750x1334
    //NOTE: seems like a conditional declaration of 'canvas', maybe only allowed to have 1 canvas declaration, hence conditionality here is limited to the dimensions
    if(GALL_WEB) {canvasw = 750; canvash = 1334;} else {canvasw = 750 ; canvash = 1334;}
    if(GL_SHADERS) {renderer = WEBGL;} else {renderer = P2D;}
  	let canvas = createCanvas(canvasw,canvash,renderer);
    document.getElementById('app').innerHTML = '';
    canvas.parent('app');
  	myApp.make_masterBuf();

  	myApp.dpr = window.devicePixelRatio;  
	  myApp.kludge_w = windowWidth * myApp.dpr; //Supposedly helps Retina displays
  	myApp.kludge_h  = windowHeight * myApp.dpr;
 	
  	textFont(myApp.mainFont);
	textSize(normalSize);

	init_simhypo(); //Load text strings

	
	setup_glitchColour();

  if(GALL_WEB) {DELETE_ID = 0;} //Because if we're in gallery mode, we don't envision anyone other than the creator (0) running this

  if(DELETE_ID == 1) {imgs.holdtext = 0.5; BLEAK_EXIT = false;} //if in Mode 1, then have really short text holds, also enable a bleak exit if the collector owns this (case 1 of DELETE_ID)

}



function draw() {
    /*Case where work has been sold in secondary market, fuck all happens most of the time*/
    if(DELETE_ID == 2) {
      be_boring();
      return;
    }

    //If BLEAK_EXIT is true then don't execute anything else and just go to blackish screen
    if(BLEAK_EXIT) {bleak_out(); return;};

    //Once at the end, show credits; if gallery mode, then just hold the credits; if web mode, then go on with rest of code (simhypocount should loop based below modulo)
    if(simhypoCount == (simhypo.length - 1)) {
      show_credits(); 
      if(GALL_WEB) {return;}
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
        if(GALL_WEB) {
            simhypoCount++;
          } else if(!GALL_WEB && DELETE_ID == 0) {
            simhypoCount = (simhypoCount + 1)%simhypo.length; //Increment line of the text in gallery, increment & loop in web (in creator mode, but not in collector)
          } else if(!GALL_WEB && DELETE_ID == 1) {
            //Case where it is web, but in first collector
            simhypoCount++;
            if(simhypoCount+1 >= simhypo.length) {BLEAK_EXIT = true;}
        }
    } else {
        
        if(GALL_WEB) {
            background(blackColour);
        } else {
            if(pass%2 == 0) {
            //background(grey2Colour);
          }
        }
      
        //background(0);
        
    		//Japanese text
        
        if(DELETE_ID == 0) {fill(grey1Colour);} else {fill(grey2Colour);}
        textAlign(CENTER,CENTER);
        textSize(japanSize);
        noStroke();
        let jIndex = simhypo[simhypoCount].charAt(0);
        if(GL_SHADERS) {text(imgs.jstring[int(jIndex)],0,-200);} else {text(imgs.jstring[int(jIndex)],width/2,height/2);}
       
        //English simarg captions
        if(DELETE_ID == 0) {fill(whiteColour);} else {fill(grey2Colour);}
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


    if(!BLEAK_EXIT) {background(bgColour);}
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

    if(BLEAK_EXIT && creditsTimeCount == 0) {
      BLEAK_EXIT = false;
    }
  }

  //Blunt lerp function, doesn't type-check or handle errors
  /*function lerp(value, x_0, x_n, y_0, y_n) {
    return ((y_n - y_0)/(x_n - x_0))*(value - x_0) + y_0;  
  }*/

/*Algo loosely based on https://medium.com/@colinpatrickreid/creating-impressionistic-art-with-photography-and-p5-js-e073d794aa40 */
function bleak_out() {
  let tmpimg = imgs.oden_img;
  tmpimg.loadPixels();
  for (let x = 0; x < tmpimg.width; x += 4) {
   for (let y = 0; y < tmpimg.height; y += 4) {
      let index = (floor(x) + floor(y) * tmpimg.width) * 4;
      let hue = tmpimg.pixels[index]
      let sat = tmpimg.pixels[index + 1]
      let bri = tmpimg.pixels[index + 2]
      let alpha = tmpimg.pixels[index + 3]
      //pixel_brightness = (red + blue + green) / 3
      strokeWeight(9 * Math.random())
      stroke(hue,bri,sat, alpha*cos(frameCount));
      line(x + Math.random() * 40,y ,x + 50*sin(frameCount),y + 50);
    }
  }
  tmpimg.updatePixels();
  //image(tmpimg,0,0);

  show_credits();
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
          //noStroke();
          for(let j=0;j<imgs.jstring.length;j++) {
              text(imgs.jstring[j],width/2,width/6+j*100);
          }
    }
  }
}

function init_simhypo() {
  if(GALL_WEB || GL_SHADERS) {
	textboxw = width; textboxh = height * 0.8;
	textboxx = -width/2; textboxy = -height/2;
} else {
  textboxw = width; textboxh = height * 0.8;
  textboxx = -width/4*0; textboxy = -height/2*0; //If non-webgl, then origin is ULH corner
}

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

/*Below are all functions needed to interface with ETH chain (on testnet or mainnet)*/

//let web3;
/*
 async function loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  }
  */

  async function loadWeb3p() {
    if (typeof web3 !== 'undefined') 
    {
      web3 = new Web3(web3.currentProvider);
    } 
    else 
    {
     // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    //web3.eth.defaultAccount = web3.eth.accounts[0]; 
     }
    }

  async function loadWeb3pp() {
    window.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");loadWeb3p
  }  

  async function loadContract() {
    return await new window.web3.eth.Contract(ABI,address);}

  async function check_crypt0den() {
    console.log("check_crypt0den STARTED")
    await loadWeb3pp()
      //.then(console.log("result!",window.web3));
      .then(window.contract = await loadContract())
      .then(console.log("Block info ",(await window.web3.eth.getBlock('latest')).timestamp))
      .then(updateStatus('Ready!'));
  }

  /*
  async function queryBlock() {
    //Get delta between current UNIX time and block timestamp
    let block = await window.web3.eth.getBlock('latest');
    console.log("queryBlock(): Block info ",block.number);
    return block.timestamp - Date.now();
  }
  */

  function updateStatus(status) {
    const statusEl = document.getElementById('status');
    statusEl.innerHTML = status;
}


  async function getSaleStatus() {
    updateStatus('fetching sale status...');
    let status = await window.contract.methods.deleteOden(0).call();
    
    //status = status + await window.web3.eth.getBlock('latest');

    console.log("getSaleStatus()  ",status);

    process_checkresult(status); //assuming status is 'true' or 'false'

    status = status + " /////// " + await window.contract.methods.draw(0).call();
    updateStatus(status);

  }



  /*This is where we put in ABI etc.*/

  let address = '0xCeeFD27e0542aFA926B87d23936c79c276A48277';

  let ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "a",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "Generated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "es",
        "type": "string"
      }
    ],
    "name": "Hereiam",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "createOden",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "sellOden",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "deleteOden",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "draw",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOdenState",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "NOT_CURRENT_OWNER",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "_interfaceID",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOKEN_LIMIT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
