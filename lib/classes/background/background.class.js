import StaticObjectsClass from "../world/static-objects.class.js";

export default class BackgroundClass extends StaticObjectsClass {
    
    constructor (x, y, w, h, imgPath) {
        super(x, y, w, h, imgPath);
    }

    // draw
    draw(ctx) {
        super.drawImg(ctx);
    }
}