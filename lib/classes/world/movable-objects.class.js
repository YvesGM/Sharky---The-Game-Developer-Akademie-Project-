export default class MovableObjectsClass {
    constructor(x, y, w, h, imgPath) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = new Image();
        this.img.src = imgPath;
    }

    drawImg(ctx) {
        if (!this.img.complete) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}