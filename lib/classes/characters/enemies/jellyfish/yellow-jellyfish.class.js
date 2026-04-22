import { YELLOW_JELLYFISH_SWIMMING } from "../../../../storage/characters/enemies/jellyfish.storage.js";
import MovableObjectsClass from "../../../world/movable-objects.class.js";

export default class YellowJellyfishClass extends MovableObjectsClass {

    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath);
        this.loadImgStorage();
    }

    // draw
    draw(ctx) {
        this.animateCharacters(YELLOW_JELLYFISH_SWIMMING)
        super.drawImg(ctx);
    }

    loadImgStorage() {
        this.drawFrames(YELLOW_JELLYFISH_SWIMMING)
    }
}