import Keyboard from "../../../lib/classes/keyboard/keyboard.class.js"
import { RIGHT_BOUND, LEFT_BOUND } from "../../../lib/configs/camera/camera.configs.js";

export function sharkyKbFunctions(sharky, camera) {
    if (Keyboard.RIGHT) {
        sharky.x += sharky.speed
        if (sharky.x > RIGHT_BOUND) {
            sharky.x = RIGHT_BOUND;
            camera += sharky.speed;
        } else {
            camera += sharky.speed * 0.5;
        }
        sharky.otherDirection = false;
    }

    if (Keyboard.LEFT) {
        if (camera < 0) camera = 0;
        
        sharky.x -= sharky.speed
        if (sharky.x < LEFT_BOUND) {
            sharky.x = LEFT_BOUND;
            camera -= sharky.speed;
        } else {
            camera -= sharky.speed * 0.5
        }
        sharky.otherDirection = true;
    }

    if (Keyboard.UP) {
        sharky.y -= sharky.speed
    }

    if (Keyboard.DOWN) {
        sharky.y += sharky.speed

    }
    return camera
}