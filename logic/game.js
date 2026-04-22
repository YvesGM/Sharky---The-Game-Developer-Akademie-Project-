import Keyboard from "../lib/classes/keyboard/keyboard.class.js";
import loadCanvas from "./world/world.js"

function initializeElPoloLoco() {
    loadCanvas();
}

window.onload = initializeElPoloLoco();

window.addEventListener("keydown", (e) => {
  
    // console.log(e);
    if (e.keyCode == 32) {
        Keyboard.SPACE = true
    }
    if (e.keyCode == 38) {
        Keyboard.UP = true
    }
    if (e.keyCode == 39) {
        Keyboard.RIGHT = true
    }
    if (e.keyCode == 37) {
        Keyboard.LEFT = true
    }
    if (e.keyCode == 40) {
        Keyboard.DOWN = true
    }
    if (e.keyCode == 68) {
        Keyboard.D = true
    }

    // console.log('PRESSDOWN SPACE:' + Keyboard.SPACE);
    // console.log('PRESSDOWN UP:' + Keyboard.UP);
    // console.log('PRESSDOWN RIGHT:' + Keyboard.RIGHT);
    // console.log('PRESSDOWN LEFT:' + Keyboard.LEFT);
    // console.log('PRESSDOWN DOWN:' + Keyboard.DOWN);
    // console.log('PRESSDOWN D:' + Keyboard.D);
})

window.addEventListener("keyup", (e) => {
    
    if (e.keyCode == 32) {
        Keyboard.SPACE = false
    }
    if (e.keyCode == 38) {
        Keyboard.UP = false
    }
    if (e.keyCode == 39) {
        Keyboard.RIGHT = false
    }
    if (e.keyCode == 37) {
        Keyboard.LEFT = false
    }
    if (e.keyCode == 40) {
        Keyboard.DOWN = false
    }
    if (e.keyCode == 68) {
        Keyboard.D = false
    }

    // console.log('PRESSUP SPACE:' + Keyboard.SPACE);
    // console.log('PRESSUP UP:' + Keyboard.UP);
    // console.log('PRESSUP RIGHT:' + Keyboard.RIGHT);
    // console.log('PRESSUP LEFT:' + Keyboard.LEFT);
    // console.log('PRESSUP DOWN:' + Keyboard.DOWN);
    // console.log('PRESSUP D:' + Keyboard.D);
})