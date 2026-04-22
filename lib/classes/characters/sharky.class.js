import { SHARKY_WAITING, SHARKY_LONG_WAITING, SHARKY_SWIMMING } from "../../storage/characters/sharky.storage.js";
import Keyboard from "../keyboard/keyboard.class.js"
import { sharkyKbFunctions } from "../../../logic/world/keyboard/keyboard.js";
import MovableObjectsClass from "../world/movable-objects.class.js";

export default class SharkyClass extends MovableObjectsClass {

    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath);
        this.loadImgStorage();
    }

    // draw
    draw(ctx, camera_x) {
        if (Keyboard.UP || Keyboard.DOWN || Keyboard.RIGHT || Keyboard.LEFT) {
            return this.swim(ctx, camera_x);
        } else {
            this.standStill(ctx);
            return camera_x;
        }
    }


    loadImgStorage() {
        this.drawFrames(SHARKY_WAITING)
        this.drawFrames(SHARKY_SWIMMING)
    }


    // functionality
    standStill(ctx) {
        this.animateCharacters(SHARKY_WAITING);
        super.drawImg(ctx);
    }

    swim(ctx, camera_x) {
        this.animateCharacters(SHARKY_SWIMMING)

        camera_x = sharkyKbFunctions(this, camera_x);
        super.drawImg(ctx);
        return camera_x;
    }
}