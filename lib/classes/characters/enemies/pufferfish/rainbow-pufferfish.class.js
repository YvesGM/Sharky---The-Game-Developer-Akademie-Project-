import { RAINBOW_PUFFERFISH_SWIMMING } from "../../../../storage/characters/enemies/pufferfish.storage.js";
import MovableObjectsClass from "../../../world/movable-objects.class.js";

export default class RainbowPufferfishClass extends MovableObjectsClass {

    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath);
        this.loadImgStorage();
    }

    // draw
    draw(ctx) {
        this.animateCharacters(RAINBOW_PUFFERFISH_SWIMMING)
        super.drawImg(ctx);
    }

    loadImgStorage() {
        this.drawFrames(RAINBOW_PUFFERFISH_SWIMMING)
    }
}
