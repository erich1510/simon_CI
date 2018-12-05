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

document.getElementById("gameContainer").addEventListener('click', TrackMouse);
// document.addEventListener('mousemove', TrackMouse);
// document.addEventListener('mousedown', TrackMouse);
// document.addEventListener('mouseup', TrackMouse);