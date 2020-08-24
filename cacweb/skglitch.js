/*Debug flag*/
let DEBUG = false;
let LIVE = false; //When this goes live, mainly this influences whether setup() uses real or fake date



/*These must be declared/promised globally, and then defined in setup(), so that they can be accessed in draw()*/
let myApp;
let imgs;
//let glich;


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
    this.bTestLoop = false; //Should the test_loop be run, this is changed in setup()
    this.start_ts = new Date(); //Get starting time, in Javascript format (Wed Aug 12 2020 08:07:39 GMT-0400 (Eastern Daylight Time))

    this.path = 'data/'; //Lets us use a single path everywhere, in case the filestructure changes, only one change hopefully

    this.myFont;

    this.masterBuf = createGraphics(windowWidth,windowHeight,WEBGL);
    //this.masterBuf.show();
    //this.grabimg_mBuf; //Need a second (image type object) to hold get() of masterBuf because tint() doesn't affect createGraphics objects but does affect image objects

    }

    test_loop()
    {
      /*Below is a testing loop to quickly see how things change over entire 30 days*/

    //Increment days_elapsed ever z seconds
    var z = 300; //Expressed in frames
    if(this.days_elapsed >= 1.0 && this.days_elapsed <= this.max_days)
    {
      if(frameCount != this.ts && frameCount%z == 0)
      {
        //this.current_date = this.incr_date(this.current_date,1);
        this.interval_current_start = this.interval_current_start + 1; //Kind of weird way of forcing an increment, but this interval param what is used in update() method
        this.days_elapsed = this.get_dayselapsed(this.show_start,this.current_date);
        
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
        var tmp = new Date(this.interval_current_start * this.day_ms + Date.parse(new Date()));
        this.current_date = tmp;
      }

      this.days_elapsed = this.get_dayselapsed(this.show_start,this.current_date);
      this.propagate_dayselapsed();
    }

    update() 
    {
      /*Switcher function, directs to the old update() before JS version is written*/
      //this.update_OFmodel();
      this.update_JSmodel();

      /*TEST CODE Remove this when testing is done*/
      if(Boolean(this.bTestLoop)) {this.test_loop();}
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


    /*These fetch params from the URL line*/    
    getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
      });
      return vars;
    }

    getUrlParam(parameter, defaultvalue){
      var urlparameter = defaultvalue;
      if(window.location.href.indexOf(parameter) > -1){
        urlparameter = this.getUrlVars()[parameter];
      }
      return urlparameter;
    }


    isNight() {
      /*Work out whether it is night (timezone issue is open)*/
      /*Note also that this returns true if time is outside of museum opening hours*/

      if(this.current_date.getHours() >= this.gallery_shut_h | this.current_date.getHours() < this.gallery_open_h)
      {
        return true;
      } else {
        return false;
      }
    }


}

/*Note: in OF, this was the content.h/content.cpp class*/

class  Content {
  

  constructor() 
  {
    console.log("Content class 'imgs' constructor");

  this.img_type; //Type of image (mosaic, serial, etc.). Initialise in constructor
  this.curr_img = 0; //When showing images serially, where we are in the sequence
  this.num_imgs; //How many array images are there, at some point this should be calculated from directory operations
  this.days_elapsed; //In original C++ this was private to Content object, it is a little confusing here but is distinct from App.days_elapsed
  this.max_days; //Ditto above 
  this.breakpoint1; //Ditto above
  this.breakpoint2; //Ditto above
  this.breakpoint_ease; //Ditto above
  this.nextimg = 0; //Counter for when images are held on the screen rather than incrementing

  this.images = [];


  /*First time through?*/
  this.firsttime = true;
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
      

      if(this.img_type == 0)
      {
        console.log("makeimgbuf():  UNIMPLEMENTED CONDITION '0' ");
      } else if(this.img_type == 1)
      {
        
          var imgWidth = this.images[this.curr_img].width*0.25;
          var imgHeight = this.images[this.curr_img].height*0.25;
          /*
          var xpos = (windowWidth - imgWidth)/2;
          var ypos = (windowHeight - imgHeight)/2;
          */
          console.log("                           Image size",imgWidth,imgHeight,this.curr_img);
          myApp.masterBuf.clear();
          myApp.masterBuf.image(this.images[this.curr_img],-50,-250,imgWidth,imgHeight);
          
          image(myApp.masterBuf,-width*0.7,-height*0.6,windowWidth,windowHeight);
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


    makeimgbuf_noisy()
    {

      /*19/8/20: Shah images but with lots of glitching, warping, noise*/      

      /*Stuff to get images to stutter and randomly hold rather than incrementing*/
      if(this.nextimg == 0 && random()<0.05) {this.nextimg = int(random() * 30);} 


      var imgWidth = this.images[this.curr_img].width;
      var imgHeight = this.images[this.curr_img].height;
      var imgshow = this.images[this.curr_img];
  
      //myApp.masterBuf.clear();
      
      myApp.masterBuf.shader(glich.sCine);
      glich.sCine.setUniform("iResolution",[windowWidth,windowHeight]);
      glich.sCine.setUniform("tex0",imgshow); //Explicit binding is good if multiple textures
      glich.sCine.setUniform("iTime",second());
      myApp.masterBuf.rect(0,0,imgWidth*0.25,imgHeight*0.25);
      image(myApp.masterBuf,-myApp.offsetw/2,-myApp.offseth/2-150,imgWidth*0.25,imgHeight*0.25);

/*
      myApp.masterBuf.shader(glich.sWarp);
      glich.sWarp.setUniform("iResolution",[width,height]);
      glich.sWarp.setUniform("iTime", frameCount*0.1);
      glich.sWarp.setUniform("tex0",imgshow); //Explicit binding is good if multiple textures
      myApp.masterBuf.rect(0,0,imgWidth*0.25,imgHeight*0.25);
      image(myApp.masterBuf,-myApp.offsetw/2,-myApp.offseth/2,imgWidth*0.25,imgHeight*0.25);
*/


      if(this.nextimg == 0)
      {
        this.curr_img = (this.curr_img + 1)%this.images.length;
      } else {
        this.nextimg = max(0,this.nextimg - 1);
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
      this.simplex_df; //Time elapsed as a proportion of the simplex period uniform for simplex.frag

      /*Cloud tunnel shader*/
      this.sProtean = loadShader(myApp.path + 'shadersGL3/protean.vert',myApp.path + 'shadersGL3/protean.frag'); //Protean shader taken from Shadertoy, MIT 3.0 License
      
      /*Warp/noise shader*/
      this.sWarp = loadShader(myApp.path + 'shadersGL3/warp.vert',myApp.path + 'shadersGL3/warp.frag');

      /*Cinematic vignette/scratch shader*/
      this.sCine = loadShader(myApp.path + 'shadersGL3/cinematic.vert',myApp.path + 'shadersGL3/cinematic.frag');



     /*Simplex shader from Ashima - MIT License*/
      this.sSimplex = loadShader(myApp.path + 'shadersGL3/simplex.vert',myApp.path + 'shadersGL3/simplex.frag'); //Simplex noise shader
      

      /*Fire shader from Javier Garcia Carpio's repo @ webgl-shaders.com/fire-example.html*/
      this.sFire = loadShader(myApp.path + 'shadersGL3/fireshader.vert',myApp.path + 'shadersGL3/fireshader.frag');
      
      console.log("             fire shader loaded");

      /*Fireball shader from Duke/Ashima repo @ https://www.shadertoy.com/view/MtXSzS  accessed 24/8/20*/
      this.sFireball = loadShader(myApp.path + 'shadersGL3/fireball.vert',myApp.path + 'shadersGL3/fireball.frag');
      
      console.log("             fireball shader loaded");


      /*Noise shader from github/aferris shader repository*/
      this.sNoisy = loadShader(myApp.path + 'shadersGL3/texcoord.vert',myApp.path + 'shadersGL3/texcoord.frag');

      /*Awkward hardwire of number of Moruroa images, note this is set through preload()*/
      this.sSimplex_n_imgs; 

      /*Stuxnet code*/
      this.stuxtxt; //Unparsed
      this.stuxtoks; //Tokenised
      this.firsttime = true; //Utility var for resetting buffer to desired colour or other one-time draw things
    }

    sNoisy_setup()
    {
      /*Shader loaded in constructor*/
    }

    sNoisy_draw()
    {
      myApp.masterBuf.shader(this.sNoisy);

      this.sNoisy.setUniform("iTime",myApp.days_elapsed/myApp.max_days);
      myApp.masterBuf.rect(0,0,windowWidth,windowHeight);
    }

    sFire_setup()
    {
      /*Shader loaded in constructor*/
    }

    sFire_draw()
    {
      var d = new Date();
      /*This is all the stuff for the fireshader, remove it and the shader*/
      /*
      myApp.masterBuf.shader(this.sFire);
      this.sFire.setUniform("iTime",frameCount/60); 
      this.sFire.setUniform("iResolution",[width,height]);
      
      */
      /*Using time elapsed since sketch start seems to work better than millis() or second() 
      which are fast-periodic or lumpy respectively*/
   
      myApp.masterBuf.shader(this.sFireball);
      this.sFireball.setUniform("iTime",float(millis()/1000)); 
      this.sFireball.setUniform("iResolution",[windowWidth,windowHeight]);
      this.sFireball.setUniform("iMouse",[mouseX,mouseY]); 
      myApp.masterBuf.rect(0,0,windowWidth,windowHeight);
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

        //Time elapsed as a proportion of the simplex period uniform for simplex.frag 
        this.simplex_df = (myApp.days_elapsed - myApp.breakpoint1)/(myApp.breakpoint2 - myApp.breakpoint1);
        
        //Bring image up around breakpoint1 and down by breakpoint2
        /*
        var alpha_sigmoid_1 = (myApp.smootherstep(max(0.0,this.breakpoint1-1.0),this.breakpoint2+1.0,this.days_elapsed));
        var alpha_sigmoid_2 = 1.0 - (myApp.smootherstep(0.0,this.breakpoint2+1.0,this.days_elapsed));
        */
        

        //See above draw for general comments (this was shabbily ported from Shadertoy)
        //this.simplexFbo.shader(this.sSimplex); //Using glitch.fbo to stack glitches
        //this.glitchFbo.shader(this.sSimplex); //First do the simplex shader
        myApp.masterBuf.shader(this.sSimplex); //Using the masterBuf, instead of the local buffers above


        this.sSimplex.setUniform("iResolution",[windowWidth,windowHeight]);
        this.sSimplex.setUniform("iTime", second());
        this.sSimplex.setUniform("tex0",this.img_array[this.current_img]); //Explicit binding is good if multiple textures
        this.sSimplex.setUniform("uDayFrac",this.simplex_df); //Pass the fraction of interval (bp1-ease,bp2+ease)
      
        myApp.masterBuf.rect(0,0,windowWidth,windowHeight);
    
        image(myApp.masterBuf,-myApp.offsetw,-myApp.offseth,windowWidth,windowHeight);
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

        //Time elapsed as a proportion of the simplex period uniform for simplex.frag. NB: for no good reason this is a local, while simplex_df is class member 
        var protean_df = (myApp.days_elapsed - myApp.breakpoint2)/(myApp.show_end - myApp.breakpoint2);

        //tint(255,255,255,255);
        
        // center screen.
        var cx = width / 2.0;
        var cy = height / 2.0;

        // the plane is being positioned in the middle of the screen,
        // so we have to apply the same offset to the mouse coordinates before passing into the sProtean.
        var x = mouseX - cx;
        var y = mouseY - cy;
        //this.proteanFbo.shader(this.sProtean); //Comment out for now, using glitchFbo
        //this.glitchFbo.shader(this.sProtean); //First do the simplex shader
        fill(255,0,0);
        
        myApp.masterBuf.shader(this.sProtean);
        
        // we can pass in two values into the shader at the same time by using the setUniform2 function.
        // inside the shader these two values are set inside a vec2 object.
        this.sProtean.setUniform("iMouse", [x, y]);  // SET A UNIFORM
        this.sProtean.setUniform("iResolution",[windowWidth,windowHeight]);
        /*Need this iTime scaled in range (0.1,1), affects speed/violence, but also colours,
         *so orders of magnitude less result in monochrome.  Maybe vary this factor based on a market seed 
         *(i.e. URA ETF price or vol)*/
        this.sProtean.setUniform("iTime", (new Date()).getMilliseconds()*(0.1 * (1 - protean_df) + 0.9 * protean_df)); 
        
        /*
        this.glitchFbo.rect(0,0,width,height);
        image(this.glitchFbo,-400,-400,width,height);
        */

        /* Using a common glitchFbo for both simplex and protean shaders
        this.proteanFbo.rect(0,0,width,height);
        image(this.proteanFbo,0,0,width,height);
        */

        /*Layer a noise shader*/
        /*
        myApp.masterBuf.shader(this.sCine);
        this.sCine.setUniform("iResolution",[width,height]);
        var scrimg = myApp.masterBuf;
        this.sCine.setUniform("tex0",scrimg); //Explicit binding is good if multiple textures
        this.sCine.setUniform("iTime",second());
        myApp.masterBuf.rect(0,0,width/4,height/4);
        */

        myApp.masterBuf.rect(0,0,);
        image(myApp.masterBuf,-myApp.offsetw,-myApp.offseth,windowWidth,windowHeight);

        if(frameCount%10 == 0) {
           //Display stux text on top of buffer so it stays
          text(this.stuxtoks[int(random(this.stuxtoks.length))],-myApp.offsetw,-myApp.offseth*0.1);
        }

    }


    loadcode() 
    {
      /*Loads up Stux code file into memory*/
      this.stuxtxt = this.readTextFile(myApp.path + "stuxcode/code.txt");
      this.stuxtoks = splitTokens(this.stuxtxt,[`\n`,`\r`]); 
    }

    readTextFile(file)
    {
      var rawFile = new XMLHttpRequest();
      var txt;
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function ()
      {
        if(rawFile.readyState === 4)
        {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
            txt = rawFile.responseText;
            //alert(this.stuxtxt);
          }
        }
      }
      rawFile.send(null);
      return txt;
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

  /*Load up stux file*/
  glich.loadcode();

}


function setup() {
  /*Note that preload() automatically goes first, hence images aren't explicitly loaded*/
  

  //URL fetchers
  var cd_y,cd_m,cd_d,cd_h,cd_u,cd_s,bTestLoop;

  //console.log("Test URL stuff");  console.log("Local date & UTC ",Date.now(),(new Date).toUTCString());
  var queryString = window.location.href;
  var urlParams = new URLSearchParams(queryString);
  

  /*Validate if URL contains this stuff and otherwise set defaults*/
  if(urlParams.has('yr')) {cd_y = urlParams.get('yr');} else {cd_y = 2020;}
  if(urlParams.has('mo')) {cd_m = urlParams.get('mo');} else {cd_m = 8;}
  if(urlParams.has('dt')) {cd_d = urlParams.get('dt');} else {cd_d = 26;}
  if(urlParams.has('ho')) {cd_h = urlParams.get('ho');} else {cd_h = 13;}
  if(urlParams.has('mi')) {cd_u = urlParams.get('mi');} else {cd_u = 1;}
  if(urlParams.has('se')) {cd_s = urlParams.get('se');} else {cd_s = 1;}
  if(urlParams.get('test_loop') == 'true' ) {bTestLoop = true;} else {bTestLoop = "";}

  console.log("current_date ",cd_y,cd_m,cd_d,cd_h,cd_u,cd_s,bTestLoop);

  // put setup code here
  //createCanvas(1024,768,WEBGL);
  createCanvas(windowWidth,windowHeight,WEBGL);
  myApp.offsetw = windowWidth/2; myApp.offseth = windowHeight/2; //Offset to get images to cover window, handle resize, etc.
  console.log("Setup width/height windowWidth/windowHeight  ",width,height,windowWidth,windowHeight);  


  /* When in LIVE mode, this uses actual start date of the show, otherwise uses today() 
   * as start and increments by fixed amount 
   * which can be changed in testing */

  if(LIVE) {
      myApp.show_start = new Date(2020,8,18, 18,0,0,0); //REMEMBER: MONTHS START AT ZERO SO 8 IS SEP
      myApp.current_date = new Date(); //Can play with this      
    } else {
      /*If not running LIVE, this is essentially a testing branch, because current_date is set relative to some arbitrary current_start*/
      //myApp.interval_current_start = 5 * myApp.day_ms; //Days between date assumed for testing and (testing) current date, expressed in ms (in order to work with JS code)
      myApp.show_start = new Date();
      //myApp.current_date = new Date(Date.parse(myApp.show_start) + myApp.interval_current_start);     
      myApp.current_date = new Date(cd_y,cd_m,cd_d,cd_h,cd_u,cd_s); //This is being set based on URL above, with defaults set there
      myApp.interval_current_start = myApp.get_dayselapsed(myApp.show_start,myApp.current_date);
      myApp.bTestLoop = bTestLoop;
    }

    myApp.max_days = 31;
    myApp.show_end = new Date(Date.parse(myApp.show_start) + myApp.max_days * myApp.day_ms);
    console.log("                           show_end before adjustment",myApp.show_end);
    myApp.show_end.setHours(23);myApp.show_end.setMinutes(59);myApp.show_end.setSeconds(59);
    console.log("                           show_end after adjustment",myApp.show_end);

    
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

    /*Specs of when gallery opens/shuts, determines whether on night or day cycle. Just uses hours.*/
    myApp.gallery_open_h = 11;
    myApp.gallery_shut_h = 19;

    /*Stuff to setup glitch shaders (constructor calls automatically hence these are commented out)*/
    //glitch.sProtean_setup(); //Unnecessary call as constructor calls this automatically 
    //glitch.sSimplex_setup_array(); //This would be needed, except its called in preload() owing to file loading


    /*Some debugging shit in case we want to draw on screen*/
    textFont(myApp.myFont,48); //Font was loaded in preload()

    //console.log("stuxnet code ",glich.stuxtoks[422],glich.stuxtoks.length);

}

function draw() {
  myApp.update();
  


  if(DEBUG) {myApp.debug_shite();}
    
  /* Note this is probably somewhat inefficient, all 3 (images, simplex glitch, protean
   * glitch) are being rendered, even though current plan is that only one would be
   * really visible at one time, albeit with zones of transition where multiples might
   * shew up. Need some sort of exponential mixing routine */
    
   /*If we are in night then run the fire sim, otherwise move on to daytime stuff*/ 
   if(myApp.isNight() == true) {
    /*Stuff to do if the exhibition is shut*/
    //background(frameCount%4 == 0 ? 0 : 255); //flashing screen placeholder
    if(DEBUG) {console.log("Night is here draw")};
    frameCount%int(random(120)) == 0 ? glich.sNoisy_draw() : glich.sFire_draw();
    //glich.sNoisy_draw();
    image(myApp.masterBuf,-myApp.offsetw,-myApp.offseth,windowWidth,windowHeight);
    //glich.sNoisy_draw();
   } else {

    if(myApp.days_elapsed<=myApp.breakpoint1+myApp.breakpoint_ease && myApp.days_elapsed > 0)
    {
      if(imgs.firsttime == true) {
          var c1 = color(28,57,187); //Persian blue
          var c2 = color(50,18,122); //Persian indigo
          // Background
          setGradient(-myApp.offsetw, -myApp.offseth, width, height, c1, c2, 2);
          //setGradient(width / 2, 0, width / 2, height, c2, c1, 1);

          //background(28,57,187); //Persian blue/lapis
          //background(50,18,122); //Persian indigo aka 'regimental'
          imgs.firsttime = false; 
          }
      if(DEBUG) {console.log("shah imgs draw")};
      imgs.makeimgbuf_noisy();
    } 
  
  
      if(myApp.days_elapsed>=myApp.breakpoint1-myApp.breakpoint_ease && myApp.days_elapsed<=myApp.breakpoint2+myApp.breakpoint_ease)
      {
        if(DEBUG) {console.log("simplex draw")};
        glich.sSimplex_draw_array();

      }

     


      if(myApp.days_elapsed>=myApp.breakpoint2-myApp.breakpoint_ease && myApp.days_elapsed<=myApp.max_days)
      {
        if(glich.firsttime == true) {
          background(15,15,15);
          glich.firsttime = false;
        }
        if(DEBUG) {console.log("protean draw")};
        glich.sProtean_draw();
      }

    } 
  
}    
  
//Uitility function to do a gradient colour
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  //let rnd = random(2.5);
  if (axis === 2) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter*3.5);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === 1) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}



function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  //So that images draw in correct place
  myApp.offsetw = windowWidth/2;
  myApp.offseth = windowHeight/2;
}