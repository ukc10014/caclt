/*Debug flag*/
let DEBUG = false;
let LIVE = false; //When this goes live, mainly this influences whether setup() uses real or fake date



/*These must be declared/promised globally, and then defined in setup(), so that they can be accessed in draw()*/
let myApp;
let imgs;



class App {
    
    
    constructor() 
    {
      console.log("App class created");

    /*Member fields*/
    this.days_elapsed = 0.0; //days elapsed since code started, incorporates fractional days from time
    this.show_start; //JS date object
    this.show_end; //JS date object
    this.current_date;
    this.max_days; //Total run of the code
    this.day_ms = 86400000; //milliseconds in a day, useful for incrementing & testing 
    this.breakpoint1;
    this.breakpoint2; //Two breakpoints around which behaviour of glitches/images changes
    this.breakpoint_ease; //The easing windows around breakpoints to have alpha change smoothly and not have dark time
    this.ts; //Timestamp for when the ofApp::update() last changed days_elapsed
    this.timeshift; //This is for testing, the shift of hour relative to actual time
    this.interval_current_start; //This is the date/time (in ms), in the non-LIVE case, between the date the sim is starting and t_0 in JS (1 Jan 1970)
    this.grab; //Screengrab image

    this.start_ts = new Date(); //Get starting time, in Javascript format (Wed Aug 12 2020 08:07:39 GMT-0400 (Eastern Daylight Time))

    this.path = 'data/'; //Lets us use a single path everywhere, in case the filestructure changes, only one change hopefully

    this.myFont;

    }

    test_loop()
    {
      /*Below is a testing loop to quickly see how things change over entire 30 days*/

    //Increment days_elapsed ever z seconds
    var z = 300; //Expressed in milliseconds

    if(this.days_elapsed >= 1.0 && this.days_elapsed <= this.max_days)
    {
      if(frameCount != this.ts && frameCount%z == 0)
      {
        //this.current_date = this.incr_date(this.current_date,1);
        this.interval_current_start = this.interval_current_start + 1 * this.day_ms; //Kind of weird way of forcing an increment, but this interval param what is used in update() method
        this.days_elapsed = this.get_dayselapsed(this.show_start,this.current_date);
        console.log("Incrementing date ",this.current_date);

        if(this.current_date >= this.show_end)
        {
          this.current_date = this.show_start;
        }
        this.ts = frameCount;
           
            if(DEBUG) {console.log("ofApp::test_loop() "+this.ts+" "+this.days_elapsed)};

          }
        }
      }


    GetElapsedTimef()
    {
      //Function to replace ofGetElapsedTime from openframeworks, return milliseconds
      var curr_ts;
      curr_ts = new Date();
      if(DEBUG) {console.log("GetElapsedTimef ",curr_ts - this.start_ts)};
      return (curr_ts - this.start_ts); 

    }

    incr_date(date1,incr)
    {
      /*Increment date1 (in JS Date() format) by incr (in days)*/

      return new Date(Date.parse(date1) + incr * this.day_ms);
    }

    get_dayselapsed(date1,date2)
    {
      /*Works out days + fraction of days between current and start Date() objects.  
       *Assume date2>date1.  Also, seems simply subtracting Date() objects doesn't work
       *that well if the dates are both the same (i.e. the difference is just one of time),
       *whereas parsing into milliseconds and then going back is more robust.*/
      var days_diff = (Date.parse(date2) - Date.parse(date1))/this.day_ms; //Diff in ms converted to fractional days
      return days_diff;
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

    debug_shite()
    {
      /*Debug shit on screen*/
      erase();
      circle(width/4+20,height/4-8,60);
      noErase();
      fill(0,255,0);
      text(round(this.days_elapsed,2),width/4,height/4);

      if(frameCount%1 == 0) {console.log("Debug shite (fc, days) ",frameCount,round(this.days_elapsed,2));}

    }

    update_JSmodel()
    {
      if(LIVE)
      {
        /* If LIVE then current_date is just the actual current Date(). Note sure how to handle
         * end of show.
         */
         tmp = new Date();
        this.current_date = tmp;
      } else {
        /*In non-LIVE case where we are simulating behaviour a certain interval after start date (say 5 days into the sim)*/
        var tmp = new Date(this.interval_current_start + Date.parse(new Date()));
        this.current_date = tmp;
      }

      this.days_elapsed = this.get_dayselapsed(this.show_start,this.current_date);
      //console.log("update_JSmodel ",this.days_elapsed,this.interval_current_start,this.current_date);
      this.propagate_dayselapsed();
    }

    update() 
    {
      /*Switcher function, directs to the old update() before JS version is written*/
      //this.update_OFmodel();
      this.update_JSmodel();

      /*Remove this when testing is done*/
      console.log("update() ",this.days_elapsed,this.current_date);
      this.test_loop();
    }


    update_OFmodel()
    {
      /* The update() is part of openframeworks but not in p5js.  So its included here.  Its supposed to be stuff
       * not explicitly draw related.  Probably not needed as everything can be within draw().
       */
      /*Main purpose is to update the time/date, which JS seems to have good support for (vs OF)
       * hence we have a newer version above that uses JS native stuff*/

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
          fn = myApp.path+"shah_book/IMG_" + tmpnum + ".jpg";
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


/*Main glitching class imported from OF*/

class Glitch {

    constructor() {
      /*Constructor*/
      console.log("Constructor of Glitch class");

       /*Common to all - days elapsed for time-varying glitch parameters*/
      this.max_days, this.breakpoint1, this.breakpoint2;
      this.days_elapsed;


      /*Simplex shader stuff*/
      this.plane;
      this.img;
      this.img_array = []; //In case we use the image array glitcher
      this.counter; //Number of passes through draw
      this.current_img; //The image that we are currently on (in case of _draw_array()
      this.imgx,this.imgy;

      /*Cloud tunnel shader*/
      this.sProtean = loadShader(myApp.path + 'shadersGL3/protean.vert',myApp.path + 'shadersGL3/protean.frag'); //Protean shader taken from Shadertoy, MIT 3.0 License
      //this.proteanFbo = createGraphics(windowWidth,windowHeight,WEBGL); //FBOs for combining shaders implemented as createGraphics buffer

     /*Simplex shader from Ashima - MIT License*/
      this.sSimplex = loadShader(myApp.path + 'shadersGL3/simplex.vert',myApp.path + 'shadersGL3/simplex.frag'); //Simplex noise shader
      //this.sSimplex = loadShader('data/TMP_mosaic/effect.vert','data/TMP_mosaic/effect.frag');
      //this.simplexFbo = createGraphics(windowWidth,windowHeight,WEBGL); //As above, OF FBO buffer is implemented as createGraphics
    

      /*Awkward hardwire of number of Moruroa images, note this is set through preload()*/
      this.sSimplex_n_imgs; 
    }


    sSimplex_setup()
    {
        /*Shader loaded in constuctor()*/
      }

   
    sSimplex_setup_array()
    {
      /*Creates array of images from files on disk*/
      var i_tmpimg;
      var s_fn;
      var n_imgs = this.sSimplex_n_imgs; //This is hardwired awkwardly, need to make it self-setting

      for(var i=0;i<n_imgs;i++) {
        s_fn = myApp.path + "moruroa/m_img"+i+".jpeg";
          i_tmpimg = loadImage(s_fn);
          this.img_array.push(i_tmpimg);
        }

      this.current_img = 0;
      this.counter = 0;
      this.imgx = this.imgy = 100;

    }


    sSimplex_draw_array()
    {
        if(this.counter >= 60) {
            this.counter = 0;
            //Set an index for each draw, and locations for draw
            this.current_img =  int(random(this.img_array.length));
            this.imgx = random(width)*0.5;
            this.imgy = random(height)*0.5;
        } else {
            this.counter++;
        }

        //Bring image up around breakpoint1 and down by breakpoint2
        var alpha_sigmoid_1 = (myApp.smootherstep(max(0.0,this.breakpoint1-1.0),this.breakpoint2+1.0,this.days_elapsed));
        var alpha_sigmoid_2 = 1.0 - (myApp.smootherstep(0.0,this.breakpoint2+1.0,this.days_elapsed));
        //image(this.img_array[this.current_img],0,0);
        //this.simplexFbo.shader(this.sSimplex);
        stroke(255,0,0);
       tint(255,255,255,255*(alpha_sigmoid_1+alpha_sigmoid_2));

        //See above draw for general comments (this was shabbily ported from Shadertoy)
        shader(this.sSimplex);
        
        //this.sSimplex.setUniform("iResolution",[width,height]);
        this.sSimplex.setUniform("iResolution",[width,height]);
        this.sSimplex.setUniform("iTime", second());
        this.sSimplex.setUniform("tex0",this.img_array[this.current_img]); //Explicit binding is good if multiple textures

        rect(0,0,width,height);

        //texture(this.simplexFbo);

        //img.getTexture().unbind();
    }

    pass_time(days,  maxd,  b1,  b2)
    {
        //Incoming from ofApp, setting internal variable on time varying parameters
        this.days_elapsed = days;
        this.max_days = maxd;
        this.breakpoint1 = b1;
        this.breakpoint2 = b2;
    }


    sProtean_setup()
    {
        /*Shaders are loaded in constructor*/
    }

    sProtean_draw()
    {
        //Bring image up around breakpoint2
        var alpha_sigmoid_2 = (myApp.smootherstep(this.breakpoint2-1.0,this.max_days,this.days_elapsed));


        tint(255,255,255,255);
        
        // center screen.
        var cx = width / 2.0;
        var cy = height / 2.0;

        // the plane is being positioned in the middle of the screen,
        // so we have to apply the same offset to the mouse coordinates before passing into the sProtean.
        var x = mouseX - cx;
        var y = mouseY - cy;

        shader(this.sProtean);
      
        // we can pass in two values into the shader at the same time by using the setUniform2 function.
        // inside the shader these two values are set inside a vec2 object.
        this.sProtean.setUniform("iMouse", [x, y]);  // SET A UNIFORM
        this.sProtean.setUniform("iResolution",[width,height]);
        this.sProtean.setUniform("iTime", second());
        
        rect(0,0,windowWidth,windowHeight);
    
        //texture(this.proteanFbo);    
    }

  }


/*These are the preload(), setup() and draw() that p5js mandates.  Must live outside class contexts etc.*/

function preload() {
  /*Make the App class as we do in OF*/
  myApp = new App();

  myApp.myFont = loadFont('data/fonts/Inconsolata-VariableFont_wdth,wght.ttf');

  /*Need this to ensure the images load before anything else happens*/
  imgs = new Content();

  /*All stuff for Shah images below this*/
  imgs.img_type = 1; /*Type of img: 0 mosaic; 1 series; 2 none*/
  imgs.curr_img = 0; /*Initialise current image in case we show serially*/
  imgs.num_imgs = 23; /*Number of images*/

  imgs.makeimgs(); //Make an array of images


  /*Create new Glitch object*/
  glich = new Glitch();

  /*Awkward hardwire on number of glitch images, is also done in the constructor()*/
  glich.sSimplex_n_imgs = 34;
  glich.sSimplex_setup_array();

}


function setup() {
  /*Note that preload() automatically goes first, hence images aren't explicitly loaded*/

  // put setup code here
  //createCanvas(1024,768,WEBGL);
  createCanvas(windowWidth,windowHeight,WEBGL);


  //console.log("Setup() images should be loaded: width "+" "+imgs.images[4].width +" "+imgs.images[10].height);
  


  /* When in LIVE mode, this uses actual start date of the show, otherwise uses today() 
   * as start and increments by fixed amount 
   * which can be changed in testing */

  if(LIVE) {
      myApp.show_start = new Date(2020,8,18, 18,0,0,0); //REMEMBER: MONTHS START AT ZERO SO 8 IS SEP
      myApp.current_date = new Date(); //Can play with this      
    } else {
      /*If not running LIVE, this is essentially a testing branch, because current_date is set relative to some arbitrary current_start*/
      myApp.interval_current_start = 2 * myApp.day_ms; //Days between date assumed for testing and (testing) current date, expressed in ms (in order to work with JS code)
      myApp.show_start = new Date();
      myApp.current_date = new Date(Date.parse(myApp.show_start) + myApp.interval_current_start);     
    }

    myApp.max_days = 30;
    myApp.show_end = new Date(Date.parse(myApp.show_start) + myApp.max_days * myApp.day_ms);
    
    
    /*Assign days_elapsed which is now a dependent parameter on show_start, current_date, max_days*/
    myApp.days_elapsed = myApp.get_dayselapsed(myApp.show_start,myApp.current_date);
    console.log("setup() : LIVE status, days_elapsed>>>  ", LIVE, myApp.current_date, myApp.show_start, myApp.days_elapsed);


    if(myApp.current_date > myApp.show_end || myApp.current_date < myApp.show_start)
    {
      /*Current date is before or after the show bounds, throw an exception*/
      console.log("ERROR in setup()  myapp.current_date out of bounds ",myApp.current_date,
        myApp.show_start,myApp.show_end,"*****************************");
      console.log("EXITING********************************");
      remove();
    }

    myApp.breakpoint_ease = 1; //Number of days around breakpoints to ease in/out
    myApp.breakpoint1 = 10;
    myApp.breakpoint2 = 20;
    myApp.timeshift = 0.0;
    myApp.propagate_dayselapsed();

    /*Stuff to setup glitch shaders (constructor calls automatically)*/
    //glitch.sProtean_setup();

    /*Use one of these, _setup() just loads a single image, while _setup_array() loads array.
     *The latter currently requires that the Content image array loading happens first*/
    //glitch.sSimplex_setup_array();


    /*Some debugging shit in case we want to draw on screen*/
    textFont(myApp.myFont,18); //Font was loaded in preload()
}

function draw() {
  myApp.update();
  
  if(DEBUG) {myApp.debug_shite();}
    
  /* Note this is probably somewhat inefficient, all 3 (images, simplex glitch, protean
   * glitch) are being rendered, even though current plan is that only one would be
   * really visible at one time, albeit with zones of transition where multiples might
   * shew up. Need some sort of exponential mixing routine */
   //myApp.days_elapsed = 2.0;
   //console.log("draw() days_elapsed, breakpoints 1 & 2): "+myApp.days_elapsed+" "+myApp.breakpoint1+" "+myApp.breakpoint2);
  if(myApp.days_elapsed<=myApp.breakpoint1+myApp.breakpoint_ease && myApp.days_elapsed > 0)
  {
      //imgs.buffer.image(0,0);
    
    imgs.makeimgbuf();
    //image(imgs.images[4],0,0);

    image(imgs.buffer,-400,-400);
  } else { 
    //console.log("draw() failure");
  }
  
  
  if(myApp.days_elapsed>=myApp.breakpoint1-myApp.breakpoint_ease && myApp.days_elapsed<=myApp.breakpoint2+myApp.breakpoint_ease)
  {
      glich.sSimplex_draw_array();
      //myApp.propagate_dayselapsed();
      //image(glich.simplexFbo,0,0);
      
  }


  if(myApp.days_elapsed>=myApp.breakpoint2-myApp.breakpoint_ease && myApp.days_elapsed<=myApp.max_days)
  {
      if(DEBUG) {console.log("protean draw")};
      glich.sProtean_draw();
      //glich.proteanFbo.draw(0,0);
  }
  

    
  

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}