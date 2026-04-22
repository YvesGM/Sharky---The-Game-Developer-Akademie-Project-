import { LILA_JELLYFISH_SWIMMING } from "../../../../storage/characters/enemies/jellyfish.storage.js";
import MovableObjectsClass from "../../../world/movable-objects.class.js";

export default class LilaJellyfishClass extends MovableObjectsClass {

    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath);
        this.loadImgStorage();
    }

    // draw
    draw(ctx) {
        this.animateCharacters(LILA_JELLYFISH_SWIMMING)
        super.drawImg(ctx);
    }

    loadImgStorage() {
        this.drawFrames(LILA_JELLYFISH_SWIMMING)
    }
}