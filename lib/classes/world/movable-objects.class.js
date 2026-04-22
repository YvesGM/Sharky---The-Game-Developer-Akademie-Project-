export default class MovableObjectsClass {
    constructor(x, y, w, h, imgPath) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = new Image();
        this.img.src = imgPath;
        this.imageCache = {};
        this.currentImg = 0;
        this.lastFrameTime;
    }

    drawImg(ctx) {
        if (!this.img.complete) {
            console.log(this.img + 'could not be loaded')
        };
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    drawFrames(storage) {
        storage.forEach(path => {
            let storageImg = new Image();
            storageImg.src = path;
            this.imageCache[path] = storageImg;
        });
    }

    animateCharacters(currentStorage) {
        let now = Date.now();

        if (!this.lastFrameTime) this.lastFrameTime = now;

        if (now - this.lastFrameTime > 100) {
            let imgIndex = this.currentImg % currentStorage.length;
            let currentImgPath = currentStorage[imgIndex];
            this.img = this.imageCache[currentImgPath];
            this.currentImg++;
            this.lastFrameTime = now;
        }
    }
}