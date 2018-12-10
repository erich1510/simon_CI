var eventCount = 0;
var eventProperty = [];

var TrackMouse = function (mouseEvent) {
    eventProperty[eventCount++] = {
        type: 'mouse',
        ts: Date.now(),
        x: mouseEvent.x,
        y: mouseEvent.y
    };
    console.log( "X: " + mouseEvent.x + ", Y: " + mouseEvent.y + "\n");
};

// document.addEventListener = () => {
//     console.log("Custom document event occured");
// };

window.addEventListener = function() {
    if (arguments.length > 1) {
        if (arguments[0] === 'click') {
            console.log("Custom window event occurred");
        }
    }
};

// game.canvas.addEventListener = () => {
//     if (arguments.length > 1) {
//         if (arguments[0] === 'click') {
//             console.log("Custom game event occurred");
//         }
//     }
// };

// Phaser.MSPointer.prototype.game.canvas.addEventListener = () => {
//     if (arguments.length >= 2) {
//         if (arguments[0] === 'click') {
//             console.log("Custom canvas event occured");
//         }
//     }
// };
// Phaser.Mouse.prototype.game.canvas.addEventListener = () => {
//     if (arguments.length >= 2) {
//         if (arguments[0] === 'click') {
//             console.log("Custom canvas event occured");
//         }
//     }
// };

//document.getElementById("gameContainer").__proto__.__proto__.__proto__.__proto__.__proto__.addEventListener = () => console.log("YARRRR");

let originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = (event, handler, option) => {
    let wrappedHandler = (a, b, c) => {
        console.log("got event", a, b, c);
        handler(a, b, c);
    };
    originalAddEventListener(event, wrappedHandler, option);
};
// this.game.canvas.addEventListener = function () {
//     if (arguments.length >= 2) {
//         if (arguments[0] === 'click') {
//             console.log("Custom canvas event occured");
//         }
//     }
// };

// document.addEventListener('mousemove', TrackMouse);
// document.addEventListener('mousedown', TrackMouse);
// document.addEventListener('mouseup', TrackMouse);