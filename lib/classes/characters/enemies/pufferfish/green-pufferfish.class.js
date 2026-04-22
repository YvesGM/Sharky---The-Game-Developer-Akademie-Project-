import { GREEN_PUFFERFISH_SWIMMING } from "../../../../storage/characters/enemies/pufferfish.storage.js";
import MovableObjectsClass from "../../../world/movable-objects.class.js";

export default class GreenPufferfishClass extends MovableObjectsClass {

    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath);
        this.loadImgStorage();
    }

    // draw
    draw(ctx) {
        this.animateCharacters(GREEN_PUFFERFISH_SWIMMING)
        super.drawImg(ctx);
    }

    loadImgStorage() {
        this.drawFrames(GREEN_PUFFERFISH_SWIMMING)
    }
}
