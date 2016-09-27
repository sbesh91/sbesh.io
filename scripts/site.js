'use strict';

let main = new function(){
  const self = this;

  this.init = () => {
    const forward = document.getElementById("go");
    const backward = document.getElementById("back");
    forward.addEventListener("click",function(){
      go("normal");
    },false);
    backward.addEventListener("click",function(){
      go("reverse");
    },false);
  };

  const go = function (direction){
    const yellow = document.querySelector('.yellow');
    const blue = document.querySelector('.blue');
    const header = document.getElementById("header");
    const body = document.getElementById("body");

    const yellowFromRect = yellow.getBoundingClientRect();
    const yellowToRect = header.getBoundingClientRect();

    const yellowDeltaLeft = yellowFromRect.left - yellowToRect.left;
    const yellowDeltaTop = yellowFromRect.top - yellowToRect.top;
    const yellowDeltaWidth = yellowFromRect.width / yellowToRect.width;
    const yellowDeltaHeight = yellowFromRect.height / yellowToRect.height;

    const blueFromRect = blue.getBoundingClientRect();
    const blueToRect = body.getBoundingClientRect();

    const blueDeltaLeft = blueFromRect.left - blueToRect.left;
    const blueDeltaTop = blueFromRect.top - blueToRect.top;
    const blueDeltaWidth = blueFromRect.width / blueToRect.width;
    const blueDeltaHeight = blueFromRect.height / blueToRect.height;

    console.log(direction);

    if (direction === "normal") {
      header.style["visibility"] = "hidden";
      body.style["visibility"] = "hidden";
    }


    const yellowPlayer = header.animate([
      {'transform': `translate(${yellowDeltaLeft}px, ${yellowDeltaTop}px) scale(${yellowDeltaWidth},${yellowDeltaHeight})`, offset:0},
      {'transform': ` translate(50%, ${yellowDeltaTop/2}px) scale(${yellowDeltaWidth},${yellowDeltaHeight}))`, offset:.3},
      {'transform': `none` , offset:1}
    ], {
      duration: 400, //milliseconds
      easing: 'cubic-bezier(.55,0,.1,1)', //'linear', a bezier curve, etc.
      delay: 0, //milliseconds
      iterations: 1, //or a number
      direction: direction, //'normal', 'reverse', etc.
      fill: 'none' //'backwards', 'both', 'none', 'auto'
    });

    header.style["transform-origin"] = "0 0";
    header.style["visibility"] = "visible";

    const bluePlayer = body.animate([
      {'transform': `translate(${blueDeltaLeft}px, ${blueDeltaTop}px) scale(${blueDeltaWidth},${blueDeltaHeight})`, offset:0},
      {'transform': ` translate(50%, ${blueDeltaTop/2}px) scale(${blueDeltaWidth},${blueDeltaHeight})`, offset:.3},
      {'transform': `none` , offset:1}
    ], {
      duration: 400, //milliseconds
      easing: 'cubic-bezier(.55,0,.1,1)', //'linear', a bezier curve, etc.
      delay: 100, //milliseconds
      iterations: 1, //or a number
      direction: direction, //'normal', 'reverse', etc.
      fill: 'none' //'backwards', 'both', 'none', 'auto'
    });

    body.style["transform-origin"] = "0 0";
    setTimeout(function(){
      body.style["visibility"] = "visible";
    },100);

    yellowPlayer.onfinish = function(){
      if (direction === "reverse") {
        header.style["visibility"] = "hidden";
      }
    };

    bluePlayer.onfinish = function() {
      if (direction === "reverse") {
        body.style["visibility"] = "hidden";
      }
    };
  };

  return self;
};

(function() {
  main.init();
})();
