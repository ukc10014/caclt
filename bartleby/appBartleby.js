"use strict";

let SLOWGLITCH = true; //Movie pixels based glitching

let movie;
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

function setup() {
	createCanvas(windowWidth, windowHeight);
  // specify multiple formats for different browsers
  	movie = createVideo(['assets/bartleby.mp4'],vidLoad);
  	movie.hide(); // by default video shows up in separate dom
 	moview = width; movieh = movie.height * width / movie.width;
 	moviex = 0 ; moviey = 0;
  // element. hide it and draw it to the canvas
  // instead

	textSize(48);

	init_simhypo(); //Load text strings

	//rectMode(CENTER);
	//noStroke();

	setup_glitchColour();

}

function vidLoad() {
	//movie.loop();
	movie.play();
	movie.volume(0);
}

function draw() {
	//console.log(frameCount,playing,movieFrac(),textCount,textHold,simhypoCount,simhypo.length);
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
				/*For some reason, the time(startMovie) never worked,
				 *always ended up assigning movie.elt.CurrentTime as zero (in p5.js) 
				 *so movieEndFraction actually defines the end of the movie in the randomiser*/

				//let startMovie = random(0, movieStartFraction * movie.duration()); //Get random starting point
				
				
				simhypoCount = (simhypoCount + 1)%simhypo.length;
			}
		}
	} 


}


function init_simhypo() {
	textboxw = width * 0.8; textboxh = height;
	textboxx = 20; textboxy = 100;

	simhypo[0] = "0.0: None of the following notions are especially novel: (a) that computers might some day think; (b) that we might live in a simulated or virtual world; or (c) that humans might go extinct.";

	simhypo[1] = "0.1: However, when jointly cast into a specific philosophical form - the Simulation Argument - they become an artistically fertile meeting-ground for videogames, critical theory, and eschatology.";

	simhypo[2] = "1.0: Existential risk (ER) studies often consider long-timeframes (millions or billions of years), work at a large scale (planetary, solar system, or interstellar), and view humanity as unitary entity or concept.";

	simhypo[3] = "1.1: Yet current lived experience is fragmented geographically (the impact of climate-change is unevenly distributed) and temporally (present suffering is less abstract than future extinction).";

	simhypo[4] = "1.2: How do we reconcile the urgent priorities of the present with the long-term planning and thoughtful action needed to mitigate existential risk?";

	simhypo[5] = "2.0: If this is indeed the \'time of perils\', what can we realistically do?";

	simhypo[6] = "2.1: Is it a problem (that/if) funding for intergenerational public goods come from private philanthropy?";

	simhypo[7] = "End";
}

function movieFrac() {
	if(movie != null) {
		if(movie.time() == 0) {return 0;} 
		else {return movie.time() / movie.duration();}
	}
}

function setup_glitchColour() {
	colorMode(HSB);
	glitchColour = color(359,100,100,1);
}

function incr_glitchColour() {
	//change the colour of glitches slightly
	glitchColour = color(max(0,hue(glitchColour) - 10),100,100,1);
}