import MovableObjectsClass from "../world/movable-objects.class.js";
import { applySharkyMethods } from "./sharky/sharky-methods.js";

/**
 * Represents the main playable Sharky character.
 *
 * @extends MovableObjectsClass
 */
class SharkyClass extends MovableObjectsClass {

    /**
     * Creates Sharky.
     *
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     * @param {number} w - The width.
     * @param {number} h - The height.
     * @param {number} speed - The movement speed.
     * @param {string} imgPath - The image path.
     */
    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath);
        this.initStats();
        this.initTimers();
        this.initShockValues();
        this.initAttackValues();
        this.initOffset();
        this.loadImgStorage();
    }
}

applySharkyMethods(SharkyClass);

export default SharkyClass;