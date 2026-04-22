import { RED_PUFFERFISH_SWIMMING } from "../../../../storage/characters/enemies/pufferfish.storage.js";
import MovableObjectsClass from "../../../world/movable-objects.class.js";

export default class RedPufferfishClass extends MovableObjectsClass {

    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath);
        this.loadImgStorage();
    }

    // draw
    draw(ctx) {
        this.animateCharacters(RED_PUFFERFISH_SWIMMING)
        super.drawImg(ctx);
    }

    loadImgStorage() {
        this.drawFrames(RED_PUFFERFISH_SWIMMING)
    }
}
