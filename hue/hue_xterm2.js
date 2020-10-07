/*
Hue control in plain JavaScript
created 11 June 2020
by Tom Igoe

UKC: Oct 2020, modify so it works from command line as node.js file
*/

let address = '192.168.86.87';       // IP address of the Hue hub
let username = 'Ju5E9TaHtBCrBOkGfcNiRERiFrB6zeTeCX2D7-bE';      // username on the hub
let lightNumber = [1,2,3];   // number of the light to control.  NOTE ARRAY INDICES 0,1,2
let lightState0 = {      // JSON with the state of the light
    on: false,
    bri: 225,
    sat: 225,
    hue: 3000
};

let lightState1 = {      // JSON with the state of the light
    on: false,
    bri: 125,
    sat: 15,
    hue: 2000
};

let lightState2 = {      // JSON with the state of the light
    on: false,
    bri: 254,
    sat: 250,
    hue: 20000
};

/*Timings*/
let sleepint = 1000; //Interval between dots & dashes
let dotdur = 10; //Length of a dot
let dashdur = 1300;
let spaceint = 1500;
let pulsedur = 4000;
let pulseint = 4000;


var morseCode = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's':'...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    'à': '.--.-',
    'å': '.--.-',
    'ä': '.-.-',
    'è': '.-..-',
    'é': '..-..',
    'ö': '---.',
    'ü': '..--',
    'ß': '...--..',
    'ñ': '--.--',
    '.': '.-.-.-',
    ',': '--..--',
    ':': '---...',
    ';': '-.-.-.',
    '?': '..--..',
    '-': '-....-',
    '_': '..--.-',
    '(': '-.--.',
    ')': '-.--.-',
    '\'': '.----.',
    '=': '-...-',
    '+': '.-.-.',
    '/': '-..-.',
    '@': '.--.-.',
    ' ': '/'
};


/*
const fetch = require('node-fetch');
run(); //Node.js execution starts here
*/

/*browser based execution*/
smol_test();

/*Define functions below*/

async function run() {

    // make the HTTP GET call to get the light data:
    // HTTP GET http://your.hue.hub.address/api/username/lights/
    
    /*
    await dot();
    await dot();
    await dash();
    */

    console.log("Morse output--> ",textToFlash("the rivers of blood speech"));
    for(var i=0;i<10;i++) {
        await pulse();
    }


    /*Finally turn all off*/
    await alloff();

}

async function smol_test() {
    textToFlash("sos");

    /*Short testing routine*/
    for(var i=0;i<3;i++) {
        await pulse();
    }


    /*Finally turn all off*/
    await alloff();
}

async function alloff() {
    lightState0.on = false;
    lightState1.on = false;
    lightState2.on = false;

    let cmdstr = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[1] + '/state/';
    let cmdstra = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[0] + '/state/';
    let cmdstrb = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[2] + '/state/';

    putData(cmdstra, lightState0);
    putData(cmdstrb, lightState2);
    putData(cmdstr,lightState1);
}

async function pulse() {
    /*Pulse the named lights*/
     /*Starting position*/
    lightState0.on = true;
    lightState2.on = true;
    
    let cmdstra = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[0] + '/state/';
    let cmdstrb = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[2] + '/state/';

    putData(cmdstra, lightState0);
    putData(cmdstrb, lightState2);

    await sleepNow(pulsedur); //Wait while light on

    /*Turn off light*/
    lightState0.on = false;
    lightState2.on = false;
    cmdstra = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[0] + '/state/';
    cmdstrb = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[2] + '/state/';
    putData(cmdstra, lightState0);
    putData(cmdstrb, lightState2);

    await sleepNow(pulseint); //Interval between dot & dash

}


//const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve,delay));

function sleepNow(delay) {
    return new Promise((resolve) => setTimeout(resolve,delay));
}

async function dot() {
    /*Starting position*/
    lightState1.on = true;
    
    let cmdstr = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[1] + '/state/';

    putData(cmdstr, lightState1);

    await sleepNow(dotdur); //Wait while light on

    /*Turn off light*/
    lightState1.on = false;
    cmdstr = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[1] + '/state/';
    putData(cmdstr, lightState1);

    await sleepNow(sleepint); //Interval between dot & dash
       
}

async function dash() {
    /*Starting position*/
    lightState1.on = true;
    
    let cmdstr = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[1] + '/state/';

    putData(cmdstr, lightState1);

    await sleepNow(dashdur); //dash interval with light on

    /*Turn off light*/
    lightState1.on = false;
    cmdstr = 'http://' + address + '/api/' + username + '/lights/' + lightNumber[1] + '/state/';
    putData(cmdstr, lightState1);

    await sleepNow(sleepint); //Interval between dash & dot
       
}





// this function makes the actual PUT request using fetch():
async function putData(url = '', data = {}) {
    console.log("Sending via fetch "+url,data.hue,data.bri,data.on);
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log("There is an error",err));
    //return response.json(); // parses JSON response into native JavaScript objects
}

/*Text to morse converter from github.com/Simsso (Timo Denk, full repository at tools.timodenk.com)*/



function textToMorseCode(text){
    var output = '';
    for (var i = 0; i < text.length; i++) {
        if (i !== 0) output += ' '; // word separator

        var lastChar = text.charAt(i - 1);
        if (typeof lastChar !== 'undefined' && lastChar === ' ' && text.charAt(i) === ' ') output += ' '; 
        var tmp = morseCode[text.charAt(i).toLowerCase()];
        if (typeof tmp === 'undefined') {
            tmp = text.charAt(i);
        }
        output += tmp;
    }

    return output;
}

async function textToFlash(text) {
   // dot();
    var output = '';    
    for (var i = 0; i < text.length; i++) {
        if (i !== 0) output += ' '; // word separator

        var lastChar = text.charAt(i - 1);
        if (typeof lastChar !== 'undefined' && lastChar === ' ' && text.charAt(i) === ' ') output += ' '; 

        var tmp = morseCode[text.charAt(i).toLowerCase()];
        if (typeof tmp === 'undefined') {
            tmp = text.charAt(i);
        }
        output += tmp;
    }

    
    for(var j = 0;j < output.length; j++) {
        /*For each character in output, check if dot or dash and async execute
         *respective function.  If neither then just sleep
         */
        if(output.charAt(j) === '.') 
        { 
            await dot(); 
            } else if(output.charAt(j) === '-') 
            {
                await dash(); 
                } else {
                    await sleepNow(spaceint);
        }
    }

    return output;

}