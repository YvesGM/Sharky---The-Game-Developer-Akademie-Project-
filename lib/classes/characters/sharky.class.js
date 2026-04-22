import { SHARKY_WAITING } from "../../storage/characters/sharky.storage.js"; 
import MovableObjectsClass from "../world/movable-objects.class.js";

export default class SharkyClass extends MovableObjectsClass {
    
    constructor (x, y, w, h, imgPath) {
        super(x, y, w, h, imgPath);
        this.loadImgStorage();
        // this.drawAnimation();
    }

    // draw
    draw(ctx) {
        this.animateCharacters(SHARKY_WAITING);
        super.drawImg(ctx);
    }

    loadImgStorage() {
        super.drawFrames(SHARKY_WAITING)
    }

    // drawAnimation() {
    //     super.animateCharacters(SHARKY_WAITING)
    // }

    // functionality
    jump() {
        console.log('Jumping')
    }

}