import MovableObjectsClass from "../world/movable-objects.class.js";

export default class SharkyClass extends MovableObjectsClass {
    
    constructor (x, y, w, h, imgPath) {
        super(x, y, w, h, imgPath);
    }

    draw(ctx) {
        super.drawImg(ctx)
    }

    jump() {
        console.log('Jumping')
    }

}