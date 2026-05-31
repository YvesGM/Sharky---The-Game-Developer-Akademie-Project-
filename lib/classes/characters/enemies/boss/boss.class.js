import MovableObjectsClass from "../../../world/movable-objects.class.js";
import { applyBossMethods } from "./functions/boss-methods.js";

/**
 * Represents the boss enemy.
 *
 * @extends MovableObjectsClass
 */
class BossClass extends MovableObjectsClass {

    /**
     * Creates the boss enemy.
     *
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     * @param {number} w - The width.
     * @param {number} h - The height.
     * @param {number} speed - The speed.
     * @param {string} imgPath - The image path.
     */
    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath);
        this.initBossStats();
        this.initBossStates();
        this.initBossMovement(x, y);
        this.initBossOffset();
        this.loadImgStorage();
    }
}

applyBossMethods(BossClass);

export default BossClass;