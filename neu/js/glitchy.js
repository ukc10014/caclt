"use strict";

/*These must be declared/promised globally, and then defined in setup(), so that they can be accessed in draw()*/
let myApp;
let imgs;
let glich;

class App {

  constructor()
  {
    this.medpath = '../media/';
    this.shadpath = '../shadersGL3/'

    /*These kludges allow the display width/height to be overriden through URL, to accommodate resolution isues (eg Retina disps)*/
    this.kludge_w;
    this.kludge_h;
  }

  make_masterBuf() 
    {
      this.masterBuf = createGraphics(windowWidth,windowHeight,WEBGL);
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
  }


  makeimgs() {
    /*Creates array of images from files on disk*/
    let fn;
    let tmpnum = 1;

    for(let i=0;i<this.num_ue4img;i++) 
    {
      fn = myApp.medpath+"ue4/img" + padLeadingZeros(tmpnum,imgs.sizename_ue4img) + ".png"; //Need to pad the zeroes to find the file
      tmpnum++;

      this.ue4img[i] = loadImage(fn);
    }

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
      let ulx = width/2 - imgWidth*0.5; //upper left-hand corner x (0.75 is based on 1.5x size [below] x 50%)
      let uly = height/2 - imgHeight*0.5; //Upper left-hand corner y

      //myApp.masterBuf.clear();
      
      myApp.masterBuf.shader(glich.sCine);

      glich.sCine.setUniform("iResolution",[myApp.kludge_w,myApp.kludge_h]);
      glich.sCine.setUniform("tex0",imgshow); //Explicit binding is good if multiple textures
      glich.sCine.setUniform("iTime",second());
      myApp.masterBuf.rect(0,0,imgWidth,imgHeight);
        
      //image(myApp.masterBuf,-myApp.offsetw/2,-myApp.offseth/2-150,imgWidth*0.25,imgHeight*0.25);
      image(myApp.masterBuf,ulx,uly,imgWidth,imgHeight);


    }


  }



  function preload() {
    myApp = new App();

    /*Bring in image files*/
    load_Content();

    /*Create new Glitch object*/
    glich = new Glitch();


  }

  function load_Content() {
    /*Create Content class and load up files*/
    /*Need this to ensure the images load before anything else happens*/
    imgs = new Content();

    /*All stuff for UE4 images below this*/
    imgs.img_type = 1; /*Type of img: 0 mosaic; 1 series; 2 none*/
    imgs.curr_img = 0; /*Initialise current image in case we show serially*/
    imgs.num_ue4img = 156; /*Number of images*/
    imgs.sizename_ue4img = 3; //Real bodge, this is size we need to pad to
    imgs.makeimgs(); //Make an array of images
    } 

function setup() {
  /*Note that preload() automatically goes first, hence images aren't explicitly loaded*/

  // put setup code here
  let canvas = createCanvas(windowWidth,windowHeight);

  //Place it inside page (default behaviour would be to place of end of target html page)
  canvas.parent('app'); //id of the enclosing <div>

  /*Make masterbuffer once the canvas has been created since createGraphics effectively generates an HTML canvas*/  
  myApp.make_masterBuf(); //Create the mastebufffer


 let pdensity = window.devicePixelRatio;  
  myApp.kludge_w = windowWidth * pdensity; //Supposedly helps Retina displays
  myApp.kludge_h  = windowHeight * pdensity;

}

function draw() {

  //if(imgs.curr_img < imgs.num_ue4img) {imgs.makeimgbuf_noisy();}
  imgs.makeimgbuf_noisy();



}

function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}