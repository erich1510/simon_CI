//document.getElementById("gameContainer").__proto__.__proto__.__proto__.__proto__.__proto__.addEventListener = () => console.log("YARRRR");

// var fs = require('fs');

// function loggingProxy(target) {
//     let handler = {
//         get: function(obj, prop) {
//             if(!(prop in obj)) {
//                 console.log("Tried to get nonexistent property", prop, "on", obj);
//             }
//             return loggingProxy(obj[prop]);
//         }
//     };
//     return new Proxy(target, handler);
// };

var gameContainer = document.getElementById("gameContainer");

let originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = (event, handler, option) => {
    let wrappedHandler = (eventCallback, options) => {
        console.log("got event", event, " at ", eventCallback.clientX, eventCallback.clientY, "with properties: ", eventCallback);

        if(event === 'click'){
            ///here we send the event info to separate file
            // console.log(eventCallback.clientX, ':', eventCallback.clientY);
            // eventCallback.clientX = 500;
            // console.log(eventCallback.clientX, ':', eventCallback.clientY);
            // console.log("got event", event, " at ", eventCallback.clientX, eventCallback.clientY, "with properties: ", eventCallback);
            // fs.writeFile("data.json", jsonData, function(err) {
            //     if (err) {
            //         console.log(err);
            //     }
            // });

        }
        handler(eventCallback);
    };
    originalAddEventListener(event, wrappedHandler, option);


console.log("-------> 0");
    // setTimeout(() => {
    //     // read and send a fake event that came from playback file
    //     handler(loggingProxy({}));
    // }, 200);
};

var clickCounter = 0;

doClickEvent = function() {
    var fakePointerOverEvent = document.createEvent("MouseEvent");
    fakePointerOverEvent.initMouseEvent("pointerover", true, true, window, 0, 360, 410, 360, 410, false, false, false, false, 0, null);

    var fakeMouseEvent = document.createEvent("MouseEvent");
    fakeMouseEvent.initMouseEvent("click", true, true, window, 0, 360, 410, 360, 410, false, false, false, false, 0, null);

    var fakePointerDownEvent = document.createEvent("MouseEvent");
    fakePointerDownEvent.initMouseEvent("pointerdown", true, true, window, 0, 360, 410, 360, 410, false, false, false, false, 0, null);

    var fakePointerUpEvent = document.createEvent("MouseEvent");
    fakePointerUpEvent.initMouseEvent("pointerup", true, true, window, 0, 360, 410, 360, 410, false, false, false, false, 0, null);

    var fakePointerOutEvent = document.createEvent("MouseEvent");
    fakePointerOutEvent.initMouseEvent("pointerout", true, true, window, 0, 360, 410, 360, 410, false, false, false, false, 0, null);

    gameContainer.dispatchEvent(fakePointerOverEvent);
    gameContainer.dispatchEvent(fakePointerDownEvent);
    gameContainer.dispatchEvent(fakePointerUpEvent);
    gameContainer.dispatchEvent(fakePointerOutEvent);
    gameContainer.dispatchEvent(fakeMouseEvent);
    clickCounter++;
};
// var gameContainer = document.getElementById("gameContainer");
//
shouldClick = function () {
    setInterval(() => {
        if (clickCounter < 2) {
            doClickEvent();
        }
    }, 200);

};

// setTimeout(shouldClick, 100);
setTimeout(shouldClick, 1000);

var currentCount = -1;
var plays = [];

// let originalRandomIntGen = Math.floor(Math.random() * 4);
Phaser.RandomDataGenerator.prototype.integerInRange = (min, max) => {
    let currentVal = 0; //Math.floor(Math.random() * 4);
    console.log("We intercepted their fucking function??? and retrieved: ", currentVal);
    plays.push(currentVal);
    console.log("current list of computer plays", plays);

    return currentVal;
    // currentCount++;
    // plays.push(currentCount);
    // return currentCount%4;
};
// setInterva


setInterval(doClickEvent, 1000);
