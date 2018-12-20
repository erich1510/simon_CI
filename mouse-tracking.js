
/**
 * Recording Phase
 */

//Store original EventListener
let originalAddEventListener = EventTarget.prototype.addEventListener;
let clickCounter = 0;
let clickEventCounter = 0;

//Monkey-patch EventListener.
EventTarget.prototype.addEventListener = (event, handler, option) => {

    //The wrapped Event Handler logs the coordinates of the mouse clicks and properties of the Pointer Events and
    // calls the original handler.
    let wrappedHandler = (eventCallback) => {

        //This check avoids logging of initial double click required to start the game.
        if(clickCounter>=2){

            //This check helps demarcate each chunk of pointer events for better readability.
            if(event==='click'){
                console.log(" Recorded event ", event, " at X:", eventCallback.clientX, " Y: ", eventCallback.clientY , "\n", " ------Click Event Complete----" );
            } else {
                console.log(" Recorded event ", event, " at X:", eventCallback.clientX, " Y: ", eventCallback.clientY);
            }
        }

        //Since each mouse click constitutes of 3 click events we want to avoid counting
        // multiple click events for each actual mouse click.
        if(event==='click'){
            clickEventCounter++;
            if(clickEventCounter%3 === 0){
                clickCounter++;
            }
        }

        //Call Original callback handler after data is logged.
        handler(eventCallback);
    };

    //Add the original event listener with the wrapped callback.
    originalAddEventListener(event, wrappedHandler, option);
};



//
// var plays = []; // This array will hold the different indices of the boxes selected by the computer.
//
// //Monkey-Patched Phaser Random Integer Generator.
// Phaser.RandomDataGenerator.prototype.integerInRange = (min, max) => {
//
//     //Generate our own random number.
//     let currentVal = Math.floor(Math.random() * max) + min;
//     console.log(" Intercepted Function - Retrieved random number: ", currentVal);
//
//     //Record computer's plays.
//     plays.push(currentVal);
//     console.log(" Current list of computer plays", plays);
//     console.log(" _______Computer Play Done_______");
//
//     //Return the random number that was generated
//     return currentVal;
// };


/**
 * Play back Phase
 */

var clickCounter = 0;
var gameContainer = document.getElementById("gameContainer");

// Performs the five Mouse Pointer Events that constitute a mouse click at a given location on the screen.
doClickEvent = function(x, y) {

    //Create Fake Mouse Pointer Events.
    var fakePointerOverEvent = document.createEvent("MouseEvent");
    fakePointerOverEvent.initMouseEvent("pointerover", true, true, window, 0, x, y, x, y, false, false, false, false, 0, null);

    var fakeMouseEvent = document.createEvent("MouseEvent");
    fakeMouseEvent.initMouseEvent("click", true, true, window, 0, x, y, x, y, false, false, false, false, 0, null);

    var fakePointerDownEvent = document.createEvent("MouseEvent");
    fakePointerDownEvent.initMouseEvent("pointerdown", true, true, window, 0, x, y, x, y, false, false, false, false, 0, null);

    var fakePointerUpEvent = document.createEvent("MouseEvent");
    fakePointerUpEvent.initMouseEvent("pointerup", true, true, window, 0, x, y, x, y, false, false, false, false, 0, null);

    var fakePointerOutEvent = document.createEvent("MouseEvent");
    fakePointerOutEvent.initMouseEvent("pointerout", true, true, window, 0, x, y, x, y, false, false, false, false, 0, null);

    //Dispatch the fake events.
    gameContainer.dispatchEvent(fakePointerOverEvent);
    gameContainer.dispatchEvent(fakePointerDownEvent);
    gameContainer.dispatchEvent(fakePointerUpEvent);
    gameContainer.dispatchEvent(fakePointerOutEvent);
    gameContainer.dispatchEvent(fakeMouseEvent);

    //For initial double click
    // clickCounter++;
};

let x = 360;
let y = 410;

//Perform a click every second on the document at a given location.
setInterval(doClickEvent(x, y), 1000);

shouldClick = function () {
    setInterval(() => {
        if (clickCounter < 2) {
            doClickEvent(360, 410, 360, 410);
        }
    }, 200);

};

// setTimeout(shouldClick, 100);
setTimeout(shouldClick, 1000);


//Monkey-Patched Phaser Random Integer Generator.
var reproducedPlays = [0, 0, 0, 0, 0, 0]; //theoretically, this array could hold as many integers between 0 and 3 as
// possible
var indexRetrieved = 0;
var compPlaysInPlaybackMode = [];
Phaser.RandomDataGenerator.prototype.integerInRange = (min, max) => {

    //Gets the index number for the box from the list of existing data.
    let currentVal = reproducedPlays[indexRetrieved];
    compPlaysInPlaybackMode.push(currentVal);
    console.log(" Intercepted Function - Retrieved Box 0 from the pre-recorded list of Computer Plays");
    console.log(" Current list of computer plays", compPlaysInPlaybackMode );
    indexRetrieved++;

    console.log(" _______Computer Play Done_______");

    //Return the retrieved index number
    return currentVal;
};







