//document.getElementById("gameContainer").__proto__.__proto__.__proto__.__proto__.__proto__.addEventListener = () => console.log("YARRRR");

var fs = require('fs');

function loggingProxy(target) {
    let handler = {
        get: function(obj, prop) {
            if(!(prop in obj)) {
                console.log("Tried to get nonexistent property", prop, "on", obj);
            }
            return loggingProxy(obj[prop]);
        }
    };
    return new Proxy(target, handler);
};


let originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = (event, handler, option) => {
    let wrappedHandler = (eventCallback, options) => {
        if(event === 'click'){
            ///here we send the event info to separate file
            console.log(eventCallback.clientX, ':', eventCallback.clientY);
            eventCallback.clientX = 500;
            console.log(eventCallback.clientX, ':', eventCallback.clientY);
            console.log("got event", event, eventCallback);
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
    setTimeout(() => {
        // read and send a fake event that came from playback file
        handler(loggingProxy({}));
    }, 200);
};

