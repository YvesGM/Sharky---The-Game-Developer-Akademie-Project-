import MovableObjectsClass from "../../../world/movable-objects.class.js";
import { applyPufferfishMethods } from "./functions/pufferfish-methods.js";

/**
 * Represents a shared base pufferfish enemy.
 *
 * @extends MovableObjectsClass
 */
class BasePufferfishClass extends MovableObjectsClass {

    /**
     * Creates a base pufferfish enemy.
     *
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     * @param {number} w - The width.
     * @param {number} h - The height.
     * @param {number} speed - The movement speed.
     * @param {string} imgPath - The image path.
     * @param {Object} config - The pufferfish config.
     */
    constructor(x, y, w, h, speed, imgPath, config) {
        super(x, y, w, h, speed, imgPath);
        this.config = config;
        this.initMovementValues(x, y, speed);
        this.initInflateValues();
        this.initOffset();
        this.loadImgStorage();
    }
}

applyPufferfishMethods(BasePufferfishClass);

export default BasePufferfishClass;