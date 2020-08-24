/*These must be declared/promised globally, and then defined in setup(), so that they can be accessed in draw()*/
let myApp;
let imgs;



class App {
    
    
    constructor() 
    {
      console.log("App class created");

    /*Member fields*/
    this.days_elapsed = 0.0; //days elapsed since code started, incorporates fractional days from time
    this.max_days; //Total run of the code
    this.breakpoint1;
    this.breakpoint2; //Two breakpoints around which behaviour of glitches/images changes
    this.breakpoint_ease; //The easing windows around breakpoints to have alpha change smoothly and not have dark time
    this.ts; //Timestamp for when the ofApp::update() last changed days_elapsed
    this.timeshift; //This is for testing, the shift of hour relative to actual time
    this.grab; //Screengrab image

    this.start_ts = new Date(); //Get starting time

    }

    test_loop()
    {
      /*Below is a testing loop to quickly see how things change over entire 30 days*/

    //Increment days_elapsed ever z seconds
    var z = 10.0;

    if(this.GetElapsedTimef()>1.0)
    {
      if(this.GetElapsedTimef() != this.ts && this.GetElapsedTimef()%z == 0)
      {
        this.days_elapsed++;
        if(this.days_elapsed >= this.max_days)
        {
          this.days_elapsed = 1.0;
        }
        this.ts = this.GetElapsedTimef();
           
            console.log("ofApp::test_loop() "+this.ts+" "+this.days_elapsed);

          }
        }
      }


    GetElapsedTimef()
    {
      //Function to replace ofGetElapsedTime from openframeworks
      var curr_ts;
      curr_ts = new Date();
      return (curr_ts - this.start_ts); 

    }

    propagate_dayselapsed()
    {
      /*Propagate updated day/time to various places that need it*/
      //Note: pass_time in Content.h has two implementations, one includes the breakpoint ease
      //console.log("propagation ",this.days_elapsed,this.max_days,this.breakpoint1,this.breakpoint2,this.breakpoint_ease);
      imgs.pass_time(this.days_elapsed,this.max_days,this.breakpoint1,this.breakpoint2,this.breakpoint_ease);
    }


    get_days() 
    {
      /*Return days elapsed*/
      return this.days_elapsed;
    }; 
    
    smootherstep(edge0, edge1, x) 
    {
      // Scale, and clamp x to 0..1 range
      x = this.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      // Evaluate polynomial
      return x * x * x * (x * (x * 6 - 15) + 10);
    };
  

    clamp( x, lowerlimit, upperlimit)
    {
      if (x < lowerlimit)
        {x = lowerlimit;}
      if (x > upperlimit)
        {x = upperlimit;}
      return x;
    }

    update()
    {
      /* The update() is part of openframeworks but not in p5js.  So its included here.  Its supposed to be stuff
       * not explicitly draw related.  Probably not needed as everything can be within draw().
       */
      //return; //Temporary bodge since below isn't converted to JS

      var h,m,s; //Hours, minutes, seconds in whatever (local time?) that OF/C++ return
      var day_frac; //Fraction of day
      var intpart;
      var d = new Date(); //Date

      h = (d.getHours() + myApp.timeshift); //Add in timeshift if any
      if(h == 24) {
          h = myApp.timeshift; //If h=24, then h should be zero because we can't have 24
          this.days_elapsed = this.days_elapsed + 1.0;
      }
      m = d.getMinutes();
      s = d.getSeconds();
      day_frac = (h)/24.0 + m/1440.0 + s/86400.0; //timeshift is the adjusted time based on 'Help'
      
      intpart = this.days_elapsed - (this.days_elapsed % 1).toFixed(4); //Inelegant way of breaking into integer/fraction

      this.days_elapsed = intpart + day_frac;
      if(day_frac >= 0.9999)
      {
          console("day_frac "+day_frac+" "+h+" "+m+" "+s+" "+this.days_elapsed);
          /*Scenario where very close to midnight*/
          if(h == 0 && m == 0)
          {
              /*Maybe don't check for seconds just in case the increment is missed*/
              this.days_elapsed++;
              if(this.days_elapsed >= this.max_days)
              {
                  this.days_elapsed = 1 + day_frac;

              }
          }

      }
      //Propagate days_elapsed (wihch has changed time component if not date
      this.propagate_dayselapsed();

      /* Testing loop that increments date/time to simulate how the thing behaves over time,
       * comment this out to do manual single-day tests
       */
      //this.test_loop();


    }


}

/*Note: in OF, this was the content.h/content.cpp class*/

class  Content {
  

  constructor() 
  {
    console.log("Content class 'imgs' constructor");

  this.img_type; //Type of image (mosaic, serial, etc.). Initialise in constructor
  this.curr_img; //When showing images serially, where we are in the sequence
  this.num_imgs; //How many array images are there, at some point this should be calculated from directory operations
  this.days_elapsed; //In original C++ this was private to Content object, it is a little confusing here but is distinct from App.days_elapsed
  this.max_days; //Ditto above 
  this.breakpoint1; //Ditto above
  this.breakpoint2; //Ditto above
  this.breakpoint_ease; //Ditto above

  this.images = [];
  this.buffer = createGraphics(windowWidth,windowHeight); //framebuffer

  }

   makeimgs()
    {
     /*Creates array of images from files on disk*/
     let fn;
     let tmpnum = 4587; //Starting hardwire name of files from Google downloaded from Shah book

      for(let i=0;i<this.num_imgs;i++) 
      {
          //fn = "shah/test"+ofToString(i)+".jpeg";
          fn = "data/shah_book/IMG_" + tmpnum + ".jpg";
          tmpnum++;
          
          this.images[i] = loadImage(fn);
        }

    }

     makeimgbuf()
    {
      /* The ofApp* gubbins is getting pointer to the ofApp object, because the Perlin smootherstep
       * sigmoid implementation is there, to only have to implement that once.  Probably belongs
       * in a utility package that the entire codebase can share */
      //ofSetColor(255,255,255,255);
      var alpha_sigmoid = (1.0 - (myApp.smootherstep(0.0,this.breakpoint1+this.breakpoint_ease,this.days_elapsed)));
      tint(255,255,255,255*alpha_sigmoid);
      if(this.img_type == 0)
      {
          for(let j=0;j<this.images.length;j++)
          {
              var imgWidth = this.images[j].width;
              var imgHeight = this.images[j].height;
              this.buffer.image(images[j]);
              //images[j].draw(100,100,imgWidth,imgHeight);
          }
      } else if(this.img_type == 1)
      {
          var imgWidth = this.images[this.curr_img].width*0.25;
          var imgHeight = this.images[this.curr_img].height*0.25;
          var xpos = (windowWidth - imgWidth)/2;
          var ypos = (windowHeight - imgHeight)/2;
          //console.log("Img data " + this.curr_img +" "+this.images[this.curr_img]);
          this.buffer.image(this.images[this.curr_img],0,0,imgWidth,imgHeight);
          
          //So as to have some randomness in how the current image is incremented
          //if(random(0,1) < (exp(pow(this.days_elapsed/this.breakpoint1,2.0)) - 1.0)) {this.curr_img = (this.curr_img + 1)%this.images.length;}
      this.curr_img = (this.curr_img + 1)%this.images.length;

      } else if(this.img_type == 2)
      {
          console.log("There are no still images");
      } else {
          console.log("content.cpp: Wrong value for img_type");
          return;
      }

    }



     howmany_imgs()
    {
      /*Return value of num_imgs in array case*/
      return num_imgs;
    }

     pass_time( days, maxd, bk1, bk2)
    { /* Incoming days elapsed & maximum days in run, eventually can feed in time.  Breakpoints 1 & 2 */
      //Incoming from ofApp, setting internal variable on time varying parameters
      //Note: pass_time in Content.h has two implementations, see below

      this.days_elapsed = days;
      this.max_days = maxd;
      this.breakpoint1 = b1;
     }        

     pass_time( days,  maxd,  bk1,  bk2,  bease)
    {
      /* Don't even need any of these, because seems like private variables in JS classes aren't a thing, originally 
      *  this was done for OF in C++
      */

      this.days_elapsed = days;
      this.max_days = maxd;
      this.breakpoint1 = bk1;
      this.breakpoint_ease = bease;


    }



}


/*These are the preload(), setup() and draw() that p5js mandates.  Must live outside class contexts etc.*/

function preload() {
  /*Need this to ensure the images load before anything else happens*/
  imgs = new Content();

  /*All stuff for Shah images below this*/
  imgs.img_type = 1; /*Type of img: 0 mosaic; 1 series; 2 none*/
  imgs.curr_img = 0; /*Initialise current image in case we show serially*/
  imgs.num_imgs = 23; /*Number of images*/

  imgs.makeimgs(); //Make an array of images




}


function setup() {
  /*Note that preload() automatically goes first, hence images aren't explicitly loaded*/

  // put setup code here
  createCanvas(windowWidth, windowHeight);

  /*Make the App class as we do in OF*/
  myApp = new App();
  
  //console.log("Setup() images should be loaded: width "+" "+imgs.images[4].width +" "+imgs.images[10].height);
   
  /* Set days from start default, but eventually this can be set at command-line or automatically
  * through system date calls*/
  if(myApp.days_elapsed==0.0)
  {
    myApp.days_elapsed = 7.5;
      /* If days_elapsed haven't been defined through the
      * main() argv passing then it is 12 noon on such day*/
    }



    myApp.max_days = 30;
    myApp.breakpoint_ease = 1; //Number of days around breakpoints to ease in/out
    myApp.breakpoint1 = 10;
    myApp.breakpoint2 = 20;
    myApp.timeshift = 0.0;
    myApp.days_elapsed = min(myApp.days_elapsed,myApp.max_days); //Can't be more than max_days
    myApp.propagate_dayselapsed();

    /*Stuff to setup glitch shaders (constructor calls automatically)*/
    //glitch.sProtean_setup();

    /*Use one of these, _setup() just loads a single image, while _setup_array() loads array.
     *The latter currently requires that the Content image array loading happens first*/
    //glitch.sSimplex_setup_array();

}

function draw() {
  myApp.update();


    
  /* Note this is probably somewhat inefficient, all 3 (images, simplex glitch, protean
   * glitch) are being rendered, even though current plan is that only one would be
   * really visible at one time, albeit with zones of transition where multiples might
   * shew up. Need some sort of exponential mixing routine */
   //myApp.days_elapsed = 2.0;
   console.log("draw diagnosis: "+myApp.days_elapsed+" "+myApp.breakpoint1);
  if(myApp.days_elapsed<=myApp.breakpoint1+myApp.breakpoint_ease && myApp.days_elapsed > 0)
  {
      //imgs.buffer.image(0,0);
    
    imgs.makeimgbuf();
    //image(imgs.images[4],0,0);

    image(imgs.buffer,0,0);
  } else { 
    //console.log("draw() failure");
  }
  
  /*
  if(days_elapsed>=breakpoint1-breakpoint_ease && days_elapsed<=breakpoint2+breakpoint_ease)
  {
      glitch.sSimplex_draw_array();
      propagate_dayselapsed();
      glitch.simplexFbo.draw(0,0);
  }

  if(days_elapsed>=breakpoint2-breakpoint_ease && days_elapsed<=max_days)
  {
      glitch.sProtean_draw();
      glitch.proteanFbo.draw(0,0);
  }
  */

}