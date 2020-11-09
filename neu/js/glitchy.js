"use strict";

/*These must be declared/promised globally, and then defined in setup(), so that they can be accessed in draw()*/
let myApp;
let imgs;
let glich;
let imgs_context; //Needed for radiation async function to work

class App {

  constructor()
  {
    this.medpath = '../media/';
    this.shadpath = '../shadersGL3/';
    this.txtpath = '../text/';
    this.fontpath = '../fonts/';



    /*These kludges allow the display width/height to be overriden through URL, to accommodate resolution isues (eg Retina disps)*/
    this.kludge_w;
    this.kludge_h;

    /*Height of the 'nav' element at top of all pages on the site (with date counter and red dot)*/
    this.navh = 73;

    /*Timings*/
    this.first_time = true;
    this.runtime; //How long app running

    /*Pixel ratio for Retina*/
    this.dpr;

    /*Show an image or text*/
    this.showimg; //0: img, 1: text, 2:...

  }

  make_masterBuf() 
    {
      this.masterBuf = createGraphics(windowWidth,windowHeight - this.navh,WEBGL);
    }

  delete_masterBuf()
    {
      this.masterBuf = null;
    }
}

class Glitch {
  constructor() {

    /*Cinematic vignette/scratch shader*/
    this.sCine = loadShader(myApp.shadpath + 'cinematic.vert',myApp.shadpath + 'cinematic.frag');
    this.sCine2 = loadShader(myApp.shadpath + 'cinematic_colour.vert',myApp.shadpath + 'cinematic_colour.frag');
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
    this.nextimgp = 2; //Outer counter, see makeimgbuf_noisy

    /*Textfile material*/
    this.textcont;
    this.holdtext = 2; //In seconds. This is persistent, used to reset textcounter after a countdown
    this.textcounter = this.holdtext * 60; //In frames, how long to hold text on screen for
    this.line; //What line of the text is being shown

    /*Fun stuff*/
    this.yoff = 0.0;
    this.melancolia; //Load with obj file for Durer melancolia

    /*Radiation stuff*/
    this.cpmrange = {
      /*Range of CPM sensor*/
      min: 3,
      max: 50
    };

    this.cpmdata = {
      /*Stuff from CPM sensor*/
      ts: 0,
      cpm: 10,
      altitude: 0,
      latitude: 21.50,
      longitude: 138.50
    };

    this.cpmthreshold = 12; //Used to choose between b&w and funky glitchy shader

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

  maketext() {
    /*Loads a text file*/
    let fn;
    fn = myApp.txtpath + "solaris.txt";
    this.textcont = loadStrings(fn);    
  } 

  setfirstline() {
    //this.line = int(random() * this.textcont.length); //Set up first line that the text generator displays 
    this.line = 1;
  } 

  drawtext() {
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

    textFont(myApp.fonty);
    textSize(50);
    fill(0,100,100,1);
    textAlign(RIGHT,TOP);
    text(this.textcont[this.line],ulx,uly,width,height);

  }
   
  

  makefunstuff() {
    let dw = drawingContext.canvas.width / myApp.dpr;
    let dh = drawingContext.canvas.height / myApp.dpr;

    
  
    /*Fun stuff*/
    
      let locX = mouseX - dh / 2;
      let locY = mouseY - dw / 2;

      ambientLight(190,70,70);
      directionalLight(2, 100, 50, 0.25, 0.25, 0);
      pointLight(300, 100, 100, locX, locY, 250);

      push();
      translate(-width / 4, 100, 0);
      rotateZ(frameCount * 0.02);
      rotateX(frameCount * 0.02);
      specularMaterial(250);
      //box(50, 50, 50);
      model(this.melancolia);
      pop();

      push();
      translate(width / 4, map(sin(millis()/60000),0,1,-dh,dh), 0);
      ambientMaterial(250);
      sphere(25, 25);
      pop();
    /*End fun stuff*/

// We are going to draw a polygon out of the wave points
  beginShape();
    fill(202,59,30,0.1);
    noStroke();
    let xoff = 0; // Option #1: 2D Noise
    
    // Iterate over horizontal pixels
    for (let x = -dw; x <= dw; x += 10) {
      // Calculate a y value according to noise, map to

      // Option #1: 2D Noise
      let y = map(noise(xoff, this.yoff), 0, 1, 100, 300);

      // Set the vertex
      vertex(x, y);
      // Increment x dimension for noise
      xoff += 0.05;
    }
    // increment y dimension for noise
    this.yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
  endShape(CLOSE);

  }

  makeimgbuf_noisy() {
    
     /*Stuff to get images to stutter and randomly hold rather than incrementing*/
      if(this.nextimg == 0) { //Do all gubbins below only if inner loop is completed (i.e. image is up for specified num frames)
        if(random()<0.2 && this.nextimgp == 1) { //So smol prob of time, outer loop will be set to [60] frames of hold
          this.nextimgp = 60; //Maximum num frames to hold an image for 
        } else {
          this.nextimgp = max(1,this.nextimgp - 1);  //Smoothly decrement from max frames
        } //Outer counter that determines setting of inner counter
        this.nextimg = this.nextimgp; //Inner counter that counts how long image is up for
        this.curr_img = (this.curr_img + 1)%this.ue4img.length; //Increment image
      } else {
        this.nextimg = max(0,this.nextimg - 1); //Decrement inner loop
      }


      let imgWidth = this.ue4img[this.curr_img].width;
      let imgHeight = this.ue4img[this.curr_img].height;
      let imgshow = this.ue4img[this.curr_img];
      
      var ulx,uly;

      //myApp.masterBuf.clear();
      
      /*cpmthreshold is the cpm level below/above which we pick between two different shaders*/
      if(this.cpmdata.cpm < this.cpmthreshold) {
      myApp.masterBuf.shader(glich.sCine);
      glich.sCine.setUniform("iResolution",[myApp.kludge_w,myApp.kludge_h]);
      glich.sCine.setUniform("tex0",imgshow); //Explicit binding is good if multiple textures
      glich.sCine.setUniform("iTime",second());
      /*glich.sCine.setUniform("BLACK_AND_WHITE",0.0);
      glich.sCine.setUniform("LINES_AND_FLICKER",'false');
      glich.sCine.setUniform("BLOTCHES",'false');
      glich.sCine.setUniform("GRAIN",'false');
      glich.sCine.setUniform("VIGNETTE",'false');*/

      } else {
        myApp.masterBuf.shader(glich.sCine2);
        glich.sCine2.setUniform("iResolution",[myApp.kludge_w,myApp.kludge_h]);
        glich.sCine2.setUniform("tex0",imgshow); //Explicit binding is good if multiple textures
        glich.sCine2.setUniform("iTime",second());

    }

      myApp.masterBuf.rect(0,0,imgWidth,imgHeight);
      
      //image(myApp.masterBuf,-myApp.offsetw/2,-myApp.offseth/2-150,imgWidth*0.25,imgHeight*0.25);
      //image(myApp.masterBuf,ulx,uly,imgWidth,imgHeight);
      //image(myApp.masterBuf,0,0,imgWidth*windowHeight/windowWidth,windowHeight);
      //image(myApp.masterBuf,0,0,drawingContext.canvas.width,drawingContext.canvas.height*imgHeight/imgWidth*0.5);


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


    getRadD() {
      let devID = 82000034;
      let uid = '6323';
      let key = '69a1a09c0471ae355092f4d4f2da5548';
      let sensor = 'cpm';
      let startinterval = '0'; //time from present moment to get data
      const url = '//data.uradmonitor.com/api/v1/devices/' + devID + '/' + sensor + '/' + startinterval;
      const ehr = new XMLHttpRequest();
      ehr.open('GET',url,true);
      ehr.setRequestHeader('X-User-id',uid);
      ehr.setRequestHeader('X-User-hash',key);
      ehr.onerror = function(ehr) {console.log( 'error: unable to get radiation data, using defaults', ehr  );} ;
      ehr.onprogress = function(ehr) {console.log( 'bytes loaded:', ehr.loaded  );};
      ehr.onload = ecallback;
      ehr.send(null);

    function ecallback(ehr) {
      let eresponse, radjson, elines;

      eresponse = ehr.target.response;
            //divContents.innerText = response;

            radjson = JSON.parse( eresponse );
            //document.getElementById('output').textContent += "\n Radiation sensor data --> time / CPM / lat & long   " + radjson[0]['time'] + "    " + radjson[0]['cpm'] + "    " + radjson[0]['latitude'] + "    " + radjson[0]['longitude'];


            /*Assign the global data var*/
            imgs_context.cpmdata.ts = radjson[0]['time'];
            imgs_context.cpmdata.altitude = radjson[0]['altitude'];
            imgs_context.cpmdata.latitude = radjson[0]['latitude'];
            imgs_context.cpmdata.longitude = radjson[0]['longitude'];
            imgs_context.cpmdata.cpm = radjson[0]['cpm'];
          }
        }

    drawCPM() {
          /*Put CPM reading on screen*/
          let ulx,uly;

          let dw = width;
          let dh = height;

          if(dh >= dw) {
            ulx = -dw / 2;
            uly = -dh / 2;
          } else {
            ulx = -dw / 2;
            uly = -dh / 2;
          }

          ulx = dw/2; uly = dh/2;

          textFont(myApp.fonty);
          textSize(400);
          fill(0,max(0,100*sin(frameCount/80)),max(0,100*cos(frameCount/100)),1*sin(frameCount/110));
          textAlign(CENTER,CENTER);
          
          if(minute()%2 == 0) {
            text(this.cpmdata.cpm.toString(),0,0);
          } else {          
            text(this.persian_unicode(this.cpmdata.cpm),0,0);
          }
          

          //text("\u06F5",0,0);
                  }

    persian_digit(input){
        let inputs = ""+input;
        let new_val = inputs.replace(/0/g, '۰').replace(/1/g, '۱').replace(/2/g, '۲').replace(/3/g, '۳').replace(/4/g, '۴').replace(/5/g, '۵').replace(/6/g, '۶').replace(/7/g, '۷').replace(/8/g, '۸').replace(/9/g, '۹').replace(/٤/g, '۴').replace(/٥/g, '۵').replace(/٦/g, '۶');
        return new_val;
    }

    persian_unicode(input) {
        let inputs = ""+input;
        let new_val = inputs.replace(/0/g, '\u06F0').replace(/1/g, '\u06F1').replace(/2/g, '\u06F2').replace(/3/g, '\u06F3').replace(/4/g, '\u06F4').replace(/5/g, '\u06F5').replace(/6/g, '\u06F6').replace(/7/g, '\u06F7').replace(/8/g, '\u06F8').replace(/9/g, '\u06F9').replace(/٤/g, '۴').replace(/٥/g, '۵').replace(/٦/g, '۶');
        return new_val;
    } 

  }



  function preload() {
    /*Placeholder message*/
    document.getElementById("placeholder").innerHTML = "Please wait ...loading media.";


    myApp = new App();  

    /*Bring in image files*/
    load_Content();

    /*Create new Glitch object*/
    glich = new Glitch();

    /*Load text file*/
    imgs.maketext();

    /*Load font*/
    //myApp.fonty = loadFont(myApp.fontpath + 'Inconsolata.otf');
    myApp.fonty = loadFont(myApp.fontpath + 'MarkaziText-VariableFont_wght.ttf');
  }

  function load_Content() {
    /*Create Content class and load up files*/
    /*Need this to ensure the images load before anything else happens*/
    imgs = new Content();

    /*This is unsatisfactory, but imgs_context is a Global that lets us access 'imgs' inside async in getRadD*/
    imgs_context = imgs; 

    /*All stuff for UE4 images below this*/
    imgs.img_type = 1; /*Type of img: 0 mosaic; 1 series; 2 none*/
    imgs.num_ue4img = 156; /*Number of images*/
    imgs.curr_img = int(random()*imgs.num_ue4img); /*Initialise current image in case we show serially*/
    imgs.sizename_ue4img = 3; //Real bodge, this is size we need to pad to
    imgs.makeimgs(); //Make an array of images

    /*Load Durer model*/
    //imgs.melancolia = loadModel(myApp.medpath + 'melancolia.obj',true);
    } 

function setup() {
  /*Note that preload() automatically goes first, hence images aren't explicitly loaded*/

  // put setup code here
  let canvas = createCanvas(windowWidth,windowHeight - myApp.navh,WEBGL);

  //Place it inside page (default behaviour would be to place of end of target html page)
  canvas.parent('app'); //id of the enclosing <div>

  /*Make masterbuffer once the canvas has been created since createGraphics effectively generates an HTML canvas*/  
  myApp.make_masterBuf(); //Create the mastebufffer


  myApp.dpr = window.devicePixelRatio;  
  myApp.kludge_w = windowWidth * myApp.dpr; //Supposedly helps Retina displays
  myApp.kludge_h  = windowHeight * myApp.dpr;

  /*Set up textcounter*/
  colorMode(HSB);
  imgs.setfirstline();
}

function draw() {      
  myApp.runtime = millis();


  if(myApp.first_time === true) {
    windowResized();
    /*Remove placeholder*/
    document.getElementById("placeholder").parentElement.remove();
    imgs.getRadD(); //Get radiation data on first time around
    myApp.first_time = false;
  } 



  //if(imgs.curr_img < imgs.num_ue4img) {imgs.makeimgbuf_noisy();}
  if(myApp.showimg == 0) { //Alternate between showing images and text
    imgs.makeimgbuf_noisy();
    myApp.showimg = 1;
    
  } else {
    if(imgs.textcounter <= 0) {
      myApp.showimg = 0;
      imgs.textcounter = imgs.holdtext * frameRate(); //Reset counter based on realised framerate
      imgs.line++; //Increment line of the text
    } else {
      /*Uncomment this to get brief glimpse of images*/
      (myApp.runtime < 10000 && imgs.cpmdata.cpm < imgs.cpmthreshold) ? background(202,59,0,1) : (sin(myApp.runtime) > 0.8 ? background(202,59,2,1) : {});
      
      /*Uncomment below to do Solaris text*/
      //imgs.drawtext(); //If we want to do the Solaris text
      if(frameCount%6000 == 0) {imgs.getRadD()}; //Get radiation data, this is probably too many calls
      imgs.drawCPM(); //To put CPM readings on screen
      imgs.textcounter--;
    }
    
  }
}

function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


function windowResized(){
  
  var canvas = document.querySelector("#defaultCanvas0");
  //var gl = canvas.getContext("webgl");
  if(typeof  drawingContext !== 'undefined') {
    
    var gl = drawingContext;
  
    resize(gl);
    gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
    //resizeCanvas(gl.canvas.width,gl.canvas.height);

} else {return;}

}

function resize(gl) 
{
  myApp.dpr = window.devicePixelRatio;
  
  
  // Lookup the size the browser is displaying the canvas in CSS pixels
  // and compute a size needed to make our drawingbuffer match it in
  // device pixels.
  var displayWidth  = Math.floor(gl.canvas.clientWidth  * myApp.dpr);
  var displayHeight = Math.floor(gl.canvas.clientHeight * myApp.dpr);

  myApp.kludge_w = displayWidth; //Supposedly helps Retina displays
  myApp.kludge_h  = displayHeight;

/*
  // Check if the canvas is not the same size.
  if (gl.canvas.width  !== displayWidth ||
      gl.canvas.height !== displayHeight) {

    // Make the canvas the same size
    gl.canvas.width  = displayWidth;
    gl.canvas.height = displayHeight;
    //resizeCanvas(gl.canvas.width,gl.canvas.height);
  }
  */
}
