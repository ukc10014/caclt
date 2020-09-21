"use strict";

/*Debug flag*/
let DEBUG = false;
let LIVE = true; //When this goes live, mainly this influences whether setup() uses real or fake date
let CREDITS = 1; //Should credits be shewn


/*These must be declared/promised globally, and then defined in setup(), so that they can be accessed in draw()*/
let myApp;
let imgs;
let glich;


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
    this.breakpoint_ease1; //The easing windows around breakpoints to have alpha change smoothly and not have dark time
    this.breakpoint_ease2;
    this.ts; //Timestamp for when the ofApp::update() last changed days_elapsed
    this.timeshift; //This is for testing, the shift of hour relative to actual time
    this.interval_current_start; //This is the date/time (in ms), in the non-LIVE case, between the date the sim is starting and t_0 in JS (1 Jan 1970)
    this.grab; //Screengrab image
    this.bTestLoop = false; //Should the test_loop be run, this is changed in setup()
    this.t_incr; //The increment for any testing, measured in milliseconds, can be set by URL or there is a default in the URL handler
    this.start_ts = new Date(); //Get starting time, in Javascript format (Wed Aug 12 2020 08:07:39 GMT-0400 (Eastern Daylight Time))

    this.path = 'data/'; //Lets us use a single path everywhere, in case the filestructure changes, only one change hopefully

    this.myFont;
    this.fontsize_credits = 24; //Respective fontsizes for credits and stux code
    this.fontsize_stux = 28;

    this.masterBuf; 
    //this.masterBuf.show();
    //this.grabimg_mBuf; //Need a second (image type object) to hold get() of masterBuf because tint() doesn't affect createGraphics objects but does affect image objects

    this.fc_credits = 0; //Framecount for credits onscreen hold

    /*UKC 16/9: These kludges allow the display width/height to be overriden through URL, to accommodate resolution isues (eg Retina disps)*/
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

    test_loop()
    {
      /*Below is a testing loop to quickly see how things change over entire 30 days*/

    //Increment days_elapsed ever z seconds
    let z = 100; //Expressed in frames
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
           
            //if(DEBUG) {console.log("ofApp::test_loop() "+this.ts+" "+this.days_elapsed)};

          }
        }
      }


    GetElapsedTimef()
    {
      //Function to replace ofGetElapsedTime from openframeworks, return milliseconds
      let curr_ts;
      curr_ts = new Date();
      //if(DEBUG) {console.log("GetElapsedTimef ",curr_ts - this.start_ts)};
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
      let days_diff = (Date.parse(date2) - Date.parse(date1))/this.day_ms; //Diff in ms converted to fractional days
      //console.log("get_dayselapsed  ",days_diff,Date.UTC(date1.getYear(),date1.getMonth(),date1.getDate(),date1.getHours(),date1.getMinutes(),date1.getSeconds(),date1.getMilliseconds()) 
      //  - Date.UTC(date2.getYear(),date2.getMonth(),date2.getDate(),date2.getHours(),date2.getMinutes(),date2.getSeconds(),date2.getMilliseconds()));
      return days_diff;
    }

    propagate_dayselapsed()
    {
      /*Propagate updated day/time to letious places that need it*/
      //Note: pass_time in Content.h has two implementations, one includes the breakpoint ease
      if(imgs != null) {imgs.pass_time(this.days_elapsed,this.max_days,this.breakpoint1,this.breakpoint2,this.breakpoint_ease1);}
      if(glich != null) {glich.pass_time(this.days_elapsed,this.max_days,this.breakpoint1,this.breakpoint2,this.breakpoint_ease2);}
    }


    get_days() 
    {
      /*Return days elapsed*/
      return this.days_elapsed;
    }; 

   /*UKC: This is being set based on URL above, with defaults set there.  Note, as in all date stuff here,
         *the assumption is we are working in UTC, however the Date object will always have local timezone offset
         *and label.  So must be careful to just use the numbers and interpret them consistently as UTC. In the 
         *bloody_painful_UTC_utility the getUTCTimezoneOffset() is used to retrieve the TZO info and effectively
         *reverse out the new Date() function used in line 770 (myApp.show_start) which seems in JS unavoidably
         *to hold local TZ.  In other words, there seems to be no way to a) create a UTC date object with the 
         *current (i.e. Now()) time, or b) to explicitly change the TZ in an existing Date object to UTC*/

    bloody_painful_UTC_utility(e) 
    {
      /*Basically just a shithell that takes a Date object in and creates a new Date object out but in UTC hours (albeit might still have a local TZ marker 'cuz that's what Date constructor does)*/
      let offset = e.getTimezoneOffset(); //Pull out timezone offset and subtract it (note e MUST be a Date object, this fx is part of Date prototype)
      const utcDate3 = new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes()+offset,e.getUTCSeconds(),e.getUTCMilliseconds()));

      return utcDate3;
    }
    
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

    update_JSmodel()
    {
      if(LIVE)
      {
        /* If LIVE then current_date is just the actual current Date(). Note sure how to handle
         * end of show.
         */
         let tmp, tmp2; //Use for setting the currnet date
         /*bTestloop is set through URL as test_loop=true*/
         if(this.bTestLoop) {
          /*In DEBUG mode we want to increment from a specific date by the t_incr above*/
          tmp2 = this.current_date.getMilliseconds(); //If t_incr < 1 second, need to work in ms
          tmp = new Date(this.current_date.getFullYear(),
            this.current_date.getMonth(),this.current_date.getDate(),this.current_date.getHours(),
            this.current_date.getMinutes(),this.current_date.getSeconds(),tmp2+this.t_incr);
         } else {
          /*If not debugging then just use the present date/time*/
         tmp = this.bloody_painful_UTC_utility(new Date());
       }
        this.current_date = tmp;
      } else {
        /*In non-LIVE case where we are simulating behaviour a certain interval after start date (say 5 days into the sim)*/
        let tmp = this.bloody_painful_UTC_utility(new Date(this.interval_current_start * this.day_ms + Date.parse(new Date())));
        console.log("  sending date", this.interval_current_start, this.day_ms, Date.parse(new Date()));
        this.current_date = tmp;
      }

      this.days_elapsed = this.get_dayselapsed(this.show_start,this.current_date);
      this.propagate_dayselapsed();

        if(DEBUG && frameCount%60 == 0) {
          console.log("frameCount current_date days_elapsed",frameCount,this.current_date,this.days_elapsed);
        }

    }

    update() 
    {
      /*Switcher function, directs to the old update() before JS version is written*/
      //this.update_OFmodel();
      this.update_JSmodel();

      /*TEST CODE Remove this when testing is done*/
      if(Boolean(this.bTestLoop) && !LIVE) {this.test_loop();}
    }


    update_OFmodel()
    {
      /* The update() is part of openframeworks but not in p5js.  So its included here.  Its supposed to be stuff
       * not explicitly draw related.  Probably not needed as everything can be within draw().
       */
      /*Main purpose is to update the time/date, which JS seems to have good support for (vs OF)
       * hence we have a newer version above that uses JS native stuff*/

      let h,m,s; //Hours, minutes, seconds in whatever (local time?) that OF/C++ return
      let day_frac; //Fraction of day
      let intpart;
      let d = new Date(); //Date

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
      let vars = {};
      let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
      });
      return vars;
    }

    getUrlParam(parameter, defaultvalue){
      let urlparameter = defaultvalue;
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

    credits() {
  //    background(0);
//      fill(255,255,255);
      textSize(this.fontsize_credits);
      let credx = width*0.1; //Location x as proportion of screen width
      let credw = width*0.8; //Portion of screen width
      let credh = 200; //Portion of screen height for a given block of credits
      let leading = 40; //Text leading
      let myInfo = "U. Kanad Chakrabarti, 2020 \n\n Center for Contemporary Art (Vilnius, Lithuania)";
      let bookInfo = "Sources: \n\n \'The Land of Kings\', Massoudi, Ali (ed.), Ministry of Foreign Affairs, Tehran 1974."; //Shah book for imgs in makeimgbuf
      let shaderInfo = "Shaders based upon those by: \n\n Ian McEwan, Ashima Arts; \n jmpep @ https://www.shadertoy.com/view/Xdl3D8;\n nimitz @ https://www.shadertoy.com/view/3l23Rh;\n Full credits in GLSL sources.";
      let otherInfo = "Images of Marshall Islands, Moruroa/Fangataufa, et cetera from online sources."
      let softInfo = "Software: Processing/p5.js, WebGL, OpenFrameworks.  Font: Inconsolata-VariableFont_wdth."

      textAlign(RIGHT);
      text(myInfo,credx,100,credw,credh);

      //Other material used
      textLeading(leading);
      fill(250,243,51);
      textSize(max(1,this.fontsize_credits - 4));
      textAlign(LEFT);
      text(bookInfo,credx,400,credw,credh);
      text(shaderInfo,credx,500,credw,credh*4);
      text(otherInfo,credx,700,credw,credh);
      text(softInfo,credx,800,credw,credh);
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
  this.nextimgp = 0; //Outer counter, see makeimgbuf_noisy

  this.images = [];


  /*First time through?*/
  this.firsttime = true;

  /*Fraction of period through Content/imgs/shah section. Equivalent to sProtean and sSimplex.*/
  this.imgs_df;
  }

   makeimgs()
    {
     /*Creates array of images from files on disk*/
     let fn;
     let tmpnum = 4692; //Starting hardwire name of files from Google downloaded from Shah book

      for(let i=0;i<this.num_imgs;i++) 
      {
          //fn = "shah/test"+ofToString(i)+".jpeg";
          fn = myApp.path+"shah_book2/IMG_" + tmpnum + ".jpg";
          tmpnum++;
          
          this.images[i] = loadImage(fn);
        }

    }



    makeimgbuf_noisy()
    {

      /*19/8/20: Shah images but with lots of glitching, warping, noise*/      

      /*Time elapsed as a proportion of the shah imgs period. Simple version of sSimplex_df because we assume
       *shah imgs come first and therefore the start of that period is always zero (whereas sSimplex and sProtean
       *are bounded by their respective LHS breakpoints)
       */
 
      this.imgs_df = (myApp.days_elapsed)/(myApp.breakpoint1);         

      /*Stuff to get images to stutter and randomly hold rather than incrementing*/
      if(this.nextimg == 0) { //Do all gubbins below only if inner loop is completed (i.e. image is up for specified num frames)
        if(random()<0.002 && this.nextimgp == 1) { //So smol prob of time, outer loop will be set to [60] frames of hold
          this.nextimgp = 60; //Maximum num frames to hold an image for 
        } else {
          this.nextimgp = max(1,this.nextimgp - 1);  //Smoothly decrement from max frames
        } //Outer counter that determines setting of inner counter
        this.nextimg = this.nextimgp; //Inner counter that counts how long image is up for
        this.curr_img = (this.curr_img + 1)%this.images.length; //Increment image
      } else {
        this.nextimg = max(0,this.nextimg - 1); //Decrement inner loop
      }


      let imgWidth = this.images[this.curr_img].width;
      let imgHeight = this.images[this.curr_img].height;
      let imgshow = this.images[this.curr_img];
      let ulx = width/2 - imgWidth*0.5; //upper left-hand corner x (0.75 is based on 1.5x size [below] x 50%)
      let uly = height/2 - imgHeight*0.5; //Upper left-hand corner y
  
      //myApp.masterBuf.clear();
      
      myApp.masterBuf.shader(glich.sCine);
      //glich.sCine.setUniform("iResolution",[windowWidth,windowHeight]);
      glich.sCine.setUniform("iResolution",[myApp.kludge_w,myApp.kludge_h]);
      glich.sCine.setUniform("tex0",imgshow); //Explicit binding is good if multiple textures
      glich.sCine.setUniform("iTime",second());
      myApp.masterBuf.rect(0,0,imgWidth,imgHeight);
      //image(myApp.masterBuf,-myApp.offsetw/2,-myApp.offseth/2-150,imgWidth*0.25,imgHeight*0.25);
      image(myApp.masterBuf,ulx,uly,imgWidth,imgHeight);


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
      this.firsttime = true; //Utility let for resetting buffer to desired colour or other one-time draw things
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
      let d = new Date();
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
      this.sFireball.setUniform("iResolution",[myApp.kludge_w,myApp.kludge_h]);
      this.sFireball.setUniform("iMouse",[mouseX,mouseY]); 
      //myApp.masterBuf.rect(0,0,windowWidth,windowHeight);
      myApp.masterBuf.rect(0,0,width,height);
    }

    sSimplex_setup()
    {
        /*Shader loaded in constuctor()*/
      }

   
    sSimplex_setup_array()
    {
      /*Creates array of images from files on disk*/
      let i_tmpimg;
      let s_fn;
      let n_imgs = this.sSimplex_n_imgs; //This is hardwired awkwardly, need to make it self-setting

      for(let i=0;i<n_imgs;i++) {
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
        if(this.counter >= 50) {
            this.counter = 0;
            //Set an index for each draw, and locations for draw
            this.current_img =  int(random()*this.img_array.length);
            this.imgx = random()*width*0.5;
            this.imgy = random()*height*0.5;
        } else {
            this.counter++;
        }

        //Time elapsed as a proportion of the simplex period uniform for simplex.frag 
        this.simplex_df = (myApp.days_elapsed - myApp.breakpoint1)/(myApp.breakpoint2 - myApp.breakpoint1);
        
        //Bring image up around breakpoint1 and down by breakpoint2
        /*
        let alpha_sigmoid_1 = (myApp.smootherstep(max(0.0,this.breakpoint1-1.0),this.breakpoint2+1.0,this.days_elapsed));
        let alpha_sigmoid_2 = 1.0 - (myApp.smootherstep(0.0,this.breakpoint2+1.0,this.days_elapsed));
        */
        

        //See above draw for general comments (this was shabbily ported from Shadertoy)
        //this.simplexFbo.shader(this.sSimplex); //Using glitch.fbo to stack glitches
        //this.glitchFbo.shader(this.sSimplex); //First do the simplex shader
        myApp.masterBuf.shader(this.sSimplex); //Using the masterBuf, instead of the local buffers above


        //this.sSimplex.setUniform("iResolution",[windowWidth,windowHeight]);
        this.sSimplex.setUniform("iResolution",[myApp.kludge_w,myApp.kludge_h]);
        //this.sSimplex.setUniform("iTime", (new Date).getMilliseconds());
        this.sSimplex.setUniform("iTime", second());
        this.sSimplex.setUniform("tex0",this.img_array[this.current_img]); //Explicit binding is good if multiple textures
        this.sSimplex.setUniform("uDayFrac",this.simplex_df); //Pass the fraction of interval (bp1-ease,bp2+ease)
      
        myApp.masterBuf.rect(0,0,windowWidth,windowHeight);
    
        image(myApp.masterBuf,0,0,windowWidth,windowHeight);
    }

    pass_time(days,  maxd,  b1,  b2)
    {
        //Incoming from ofApp, setting internal variable on time varying parameters
        this.days_elapsed = days;
        this.max_days = maxd;
        this.breakpoint1 = b1;
        this.breakpoint2 = b2;
    }

    clear_buf()
    {
      myApp.masterBuf.background(0,0,0,0);
    }

    sProtean_setup()
    {
        /*Shaders are loaded in constructor*/
    }

    sProtean_draw()
    {
        //Bring image up around breakpoint2
        let alpha_sigmoid_2 = (myApp.smootherstep(this.breakpoint2-1.0,this.max_days,this.days_elapsed));

        //Time elapsed as a proportion of the simplex period uniform for simplex.frag. NB: for no good reason this is a local, while simplex_df is class member 
        let protean_df = (myApp.days_elapsed - myApp.breakpoint2)/(myApp.max_days - myApp.breakpoint2);

        //tint(255,255,255,255);
        
        // center screen.
        let cx = width / 2.0;
        let cy = height / 2.0;

        // the plane is being positioned in the middle of the screen,
        // so we have to apply the same offset to the mouse coordinates before passing into the sProtean.
        //let x = mouseX - cx;
        //let y = mouseY - cy;
        let x = cx;
        let y = cy;

         myApp.masterBuf.shader(this.sProtean);
        
        // we can pass in two values into the shader at the same time by using the setUniform2 function.
        // inside the shader these two values are set inside a vec2 object.
        this.sProtean.setUniform("iMouse", [x, y]);  // SET A UNIFORM
        //this.sProtean.setUniform("iResolution",[windowWidth*protean_df,windowHeight*protean_df]);
        this.sProtean.setUniform("iResolution",[myApp.kludge_w*protean_df,myApp.kludge_h*protean_df]); 
                                                                                  /*Vary between 2 and 0.33 for movement around the cloud
                                                                                  *Higher numbers (1-2) gives a softer, less cloudy, more hazy look
                                                                                  *Lower numbers (0.33-1) is more distinctly cloudy, but also
                                                                                  *moves out of the cloud centre 
                                                                                  */ 
        /*Need this iTime scaled in range (0.1,1), affects speed/violence, but also colours,
         *so orders of magnitude less result in monochrome.  Maybe vary this factor based on a market seed 
         *(i.e. URA ETF price or vol)*/
        this.sProtean.setUniform("iTime", (new Date()).getMilliseconds()*(0.1 * (1 - protean_df) + 0.9 * protean_df)); 
//        this.sProtean.setUniform("iTime", second());
        //fill(255,255,255);
        myApp.masterBuf.rect(0,0,windowWidth);
  


        
        //image(myApp.masterBuf,-2500,-600,windowWidth*3,windowHeight*3);
        image(myApp.masterBuf,0,0,windowWidth,windowHeight);

        fill(220,255,255);
        if(frameCount%60 == 0) {
           //Display stux text on top of buffer so it stays
          textSize(myApp.fontsize_stux);
          text(this.stuxtoks[int(random()*this.stuxtoks.length)],20,random()*height*0.9);
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
      let rawFile = new XMLHttpRequest();
      let txt;
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

  /*Bring in image files*/
  load_Content();

  /*Create new Glitch object*/
  glich = new Glitch();

  /*Awkward hardwire on number of glitch images, is also done in the constructor()*/
  glich.sSimplex_n_imgs = 35;
  glich.sSimplex_setup_array();

  /*Load up stux file*/
  glich.loadcode();

}

function load_Content() {
  /*Create Content class and load up files*/
  /*Need this to ensure the images load before anything else happens*/
  imgs = new Content();

  /*All stuff for Shah images below this*/
  imgs.img_type = 1; /*Type of img: 0 mosaic; 1 series; 2 none*/
  imgs.curr_img = 0; /*Initialise current image in case we show serially*/
  imgs.num_imgs = 144; /*Number of images*/

  imgs.makeimgs(); //Make an array of images
}

function delete_Content() {
  /*Shabby way of deleting Content object which is instantiated as a memory-hogging 'imgs'.  Don't know of an in-class destructor*/
  imgs = null;
}

function setup() {
  /*Note that preload() automatically goes first, hence images aren't explicitly loaded*/
  // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen

  //URL fetchers
  let cd_y,cd_m,cd_d,cd_h,cd_u,cd_s,bTestLoop,test_incr;

  //console.log("Test URL stuff");  console.log("Local date & UTC ",Date.now(),(new Date).toUTCString());
  let queryString = window.location.href;
  let urlParams = new URLSearchParams(queryString);
  let bURL = false; //Boolean on whether URL contains params
  
  let pdensity = window.devicePixelRatio;

  /*Validate if URL contains this stuff and otherwise set defaults*/
  /*UKC 16/9: see help line for correct format.  FOR HELP MUST TYPE - ukc10014.github.io/cacweb/index.html?&help NOT .../cacweb/index.html?help*/
  if(urlParams.has('help')) 
  {
    let str = "Correct URL usage is \n\n";
    str = str.concat("http:ukc10014.github.io/cacweb/index.html?yr=2020&mo=8&dt=17&ho=15&mi=1&se=1&incr=0.01667&dw=2560&dh=1390&test_loop=true \n\n"); 
    str = str.concat("corresponds to simulating code as of 17 Sep 2020 (months start at zero in JS)," + 
      "15:01:01 UTC, and hardwired resolution of 2560,1390. \n\n " +
      "The simulation steps forward at a rate of 0.01667 sim seconds per frame, at 60fps that is 1 sim " +
      "second per 1 real second, specified in 'incr'.");
    //alert(str);
    bURL = true;
    } //Popup gives correct syntax

  

  if(urlParams.has('yr')) {cd_y = urlParams.get('yr');bURL = true;} else {cd_y = 2020;}
  if(urlParams.has('mo')) {cd_m = urlParams.get('mo');bURL = true;} else {cd_m = 9;}
  if(urlParams.has('dt')) {cd_d = urlParams.get('dt');bURL = true;} else {cd_d = 20;}
  if(urlParams.has('ho')) {cd_h = urlParams.get('ho');bURL = true;} else {cd_h = 13;}
  if(urlParams.has('mi')) {cd_u = urlParams.get('mi');bURL = true;} else {cd_u = 1;}
  if(urlParams.has('se')) {cd_s = urlParams.get('se');bURL = true;} else {cd_s = 1;}
  if(urlParams.has('test_loop')) {bTestLoop = true;bURL = true;} else {bTestLoop = "";}
  if(urlParams.has('incr')) {test_incr = float(urlParams.get('incr'));bURL = true;} else {test_incr = 60;} /*Seconds*/
  if(urlParams.has('dw')) {myApp.kludge_w = urlParams.get('dw');bURL = true;} else {myApp.kludge_w = windowWidth * pdensity;}
  if(urlParams.get('dh') != null) {myApp.kludge_h = urlParams.get('dh');bURL = true;} else {myApp.kludge_h = windowHeight * pdensity;}


  if(bURL) {
    let tmp = "URL params entered (note, if bTestLoop is off, then date/time are default & test_incr is meaningless): \n \n" +
    "cd_y " + cd_y + "\n" +
    "cd_m " + cd_m + "\n" +
    "cd_d " + cd_d + "\n" +
    "cd_h " + cd_h + "\n" +
    "cd_u " + cd_u + "\n" +
    "cd_s " + cd_s + "\n" +
    "bTestLoop " + bTestLoop + "\n" +
    "test_incr " + test_incr + "\n" +
    "kludge_w " + myApp.kludge_w + "\n" +
    "kludge_h " + myApp.kludge_h + "\n" +
    "help " + urlParams.has('help');

    //alert(tmp); 
  }         

  //console.log("current_date ",cd_y,cd_m,cd_d,cd_h,cd_u,cd_s,bTestLoop);


  // put setup code here
  //createCanvas(1024,768,WEBGL);
  createCanvas(windowWidth,windowHeight);
  //myApp.offsetw = windowWidth/2*0; myApp.offseth = windowHeight/2*0; //Offset to get images to cover window, handle resize, etc.
  console.log("Setup width/height windowWidth/windowHeight  ",width,height,windowWidth,windowHeight);  


  /*Make masterbuffer once the canvas has been created since createGraphics effectively generates an HTML canvas*/  
  myApp.make_masterBuf(); //Create the mastebufffer


  /* When in LIVE mode, this uses actual start date of the show, otherwise uses today() 
   * as start and increments by fixed amount 
   * which can be changed in testing */

  if(LIVE) {
      /*UKC: 3/9/20 setting show_start to 2 Sep 2020 1700h UTC so that we can test out LIVE.  Line below is commented out therefore.*/
      
      //let b = new Date(Date.UTC(2020,8,18, 18,0,0,0)); //REMEMBER: MONTHS START AT ZERO SO 8 IS SEP
      let b = new Date(Date.UTC(2020,8,18,17,0,0,0)); //UKC: 3/9/20 --> DURING SHOW, MUST RESTORE LINE ABOVE
      myApp.show_start = myApp.bloody_painful_UTC_utility(b); //Necessary to use fx because new Date() always returns timeshifted to local time
      
      let a;

      /*UKC: Note, if in LIVE mode the URL thing is a little weird.  Namely, the dates etc are ignored UNLESS 
       *test_loop is true (and therefore myApp.bTestLoop is true).  Might as well just put in URL without any stuff.
       *In other words, in LIVE mode, the way to check how code behaves as real-time passes (1 sim second
       *equals 1 real second) at some hypothetical
       *point in the future is to set t_incr to 1 second. Again, this only applies to LIVE mode   
       */


      if(bTestLoop) {
        /*If in DEBUG mode then set the current_date to the date set in the browser*/
        a = myApp.bloody_painful_UTC_utility(new Date(Date.UTC(cd_y,cd_m,cd_d,cd_h,cd_u,cd_s))); 
        myApp.t_incr = test_incr*1000.0; /*This only is set by URL if bTestLoop is true ie it is meaningless otherwise*/   
      } else {
        /*If in non-test looping then the current_date is just the actual current date (adjusted back to UTC)*/
      a = myApp.bloody_painful_UTC_utility(new Date());  //Need this utility as no other obvious way to ensure a non-current (i.e. now()) date carries UTC TZ 
      } 
      myApp.current_date = a; //Need this utility as no other obvious way to ensure a non-current (i.e. now()) date carries UTC TZ      
      myApp.bTestLoop = bTestLoop;
    } else {
      /*If not running LIVE, this is essentially a testing branch, because current_date is set relative to some arbitrary current_start*/
      //myApp.interval_current_start = 5 * myApp.day_ms; //Days between date assumed for testing and (testing) current date, expressed in ms (in order to work with JS code)
      let f = new Date();
      myApp.show_start = myApp.bloody_painful_UTC_utility(f);  //This basically creates a UTC offset
      //myApp.current_date = new Date(Date.parse(myApp.show_start) + myApp.interval_current_start);     
      /*UKC: This is being set based on URL above, with defaults set there.  Note, as in all date stuff here,
       *the assumption is we are working in UTC, however the Date object will always have local timezone offset
       *and label.  So must be careful to just use the numbers and interpret them consistently as UTC. In the 
       *bloody_painful_UTC_utility the getUTCTimezoneOffset() is used to retrieve the TZO info and effectively
       *reverse out the new Date() function used in line 770 (myApp.show_start) which seems in JS unavoidably
       *to hold local TZ.  In other words, there seems to be no way to a) create a UTC date object with the 
       *current (i.e. Now()) time, or b) to explicitly change the TZ in an existing Date object to UTC*/
      myApp.current_date = new Date(cd_y,cd_m,cd_d,cd_h,cd_u,cd_s); 
      myApp.interval_current_start = myApp.get_dayselapsed(myApp.show_start,myApp.current_date);
      myApp.bTestLoop = bTestLoop;
    }

    myApp.max_days = 39;
    myApp.show_end = myApp.bloody_painful_UTC_utility(new Date(Date.parse(myApp.show_start) + myApp.max_days * myApp.day_ms));
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

    myApp.breakpoint_ease1 = 0; //Number of days around breakpoints to ease in/out
    myApp.breakpoint_ease2 = 1;
    myApp.breakpoint1 = 13;
    myApp.breakpoint2 = 26;
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



    
  /* Note this is probably somewhat inefficient, all 3 (images, simplex glitch, protean
   * glitch) are being rendered, even though current plan is that only one would be
   * really visible at one time, albeit with zones of transition where multiples might
   * shew up. Need some sort of exponential mixing routine */
    
   /*If we are in night then run the fire sim, otherwise move on to daytime stuff*/ 
   if(myApp.isNight() == true) {
        /*Stuff to do if the exhibition is shut*/
        //background(frameCount%4 == 0 ? 0 : 255); //flashing screen placeholder
        //if(DEBUG) {console.log("Night is here draw")};
        
        /*Set glich.first_time true so that when night passess into any Glitch (in practice,
         *currently defined only for Protean), we delete the masterBuf and re-create it
         *so that ghost of night blue ball doesn't show up
         */
         glich.firsttime = true;

        if(CREDITS == 1 && myApp.fc_credits == 0) {
            myApp.fc_credits = 255; //Time to hold credits on screen for
            CREDITS = 0;
          } 

          if(myApp.fc_credits > 0) {
            myApp.credits();
            myApp.fc_credits = max(0,myApp.fc_credits - 1); //Decrement
            if(myApp.fc_credits == 0) {CREDITS = 1};
          }
          



          if(frameCount%int(random()*120) == 0)  
          {
            glich.sNoisy_draw(); 
            //image(myApp.masterBuf,-myApp.offsetw,-myApp.offseth,windowWidth,windowHeight);
            image(myApp.masterBuf,0,0,windowWidth,windowHeight);
          } else {
            glich.sFire_draw(); 
            //image(myApp.masterBuf,-myApp.offsetw,-myApp.offseth+windowHeight*(cos(frameCount/1000)*0.5+0.5),windowWidth,windowHeight);
            image(myApp.masterBuf,0,height*(cos(frameCount/1000)*0.5+0.5),width,height);
          }

    } else {
      if(myApp.days_elapsed<=myApp.breakpoint1+myApp.breakpoint_ease1 && myApp.days_elapsed > 0)
        {
            let c1 = color(28,57,187); //Persian blue (lapis)
            let c2 = color(50,18,122); //Persian indigo (aka 'regimental')
            setGradient(0,0, width, height*imgs.imgs_df, c1, c2, 2);

        imgs.makeimgbuf_noisy();
        } 
    
    
      if(myApp.days_elapsed>=myApp.breakpoint1-myApp.breakpoint_ease1 && myApp.days_elapsed<=myApp.breakpoint2+myApp.breakpoint_ease2)
      {
        /*UKC 5/9/20: This is slight cheat, we are getting rid of imgs object, on assumption that sSimplex covers entire
         *screen and so there is no overlap (hence imgs can be deleted without checking whether the break_point_ease
         *period has elapsed.  But if ever time loops back to beginning or if we have a type of sSimplex that doesn't
         *occlude everthing under it then there won't be an imgs object and will get a reference error.
         */
        delete_Content(); 

        //if(DEBUG) {console.log("simplex draw")};
        glich.sSimplex_draw_array();

      }

     


      if(myApp.days_elapsed>=myApp.breakpoint2-myApp.breakpoint_ease2 && myApp.days_elapsed<=myApp.max_days)
      {
        if(glich.firsttime == true) {
          background(15,15,15);
/* UKC: 5/9/20 Have commented all this out. Somehow, delete_masterBuf() followed by a make_masterBuff() was
 * not working: the new buffer wasn't displaying.  On the face of it, nothing different, but in the Elements
 * tab on debugger it was clear that extra HTML Canvas elements with 'display: none' were being set, but 
 * deleting them (in Elements) did not change anything.  Finally gave up
 */ 
/*       myApp.delete_masterBuf();
          myApp.make_masterBuf();
*/
          glich.clear_buf();
          glich.firsttime = false;
        }
        //if(DEBUG) {console.log("protean draw")};
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
  //resizeCanvas(windowWidth, windowHeight);
  
  /*Basically using the p5js wrapper to access the resize(gl) function below*/
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#canvas");
  //var gl = canvas.getContext("webgl");
  var gl = drawingContext;
  if (!gl) {
    return;
  }

  resize(gl);

}

function resize(gl) 
{
  /*Taken from webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html*/
  var realToCSSPixels = window.devicePixelRatio;

  // Lookup the size the browser is displaying the canvas in CSS pixels
  // and compute a size needed to make our drawingbuffer match it in
  // device pixels.
  var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
  var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

  // Check if the canvas is not the same size.
  if (gl.canvas.width  !== displayWidth ||
      gl.canvas.height !== displayHeight) {

    // Make the canvas the same size
    gl.canvas.width  = displayWidth;
    gl.canvas.height = displayHeight;
  }

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

}