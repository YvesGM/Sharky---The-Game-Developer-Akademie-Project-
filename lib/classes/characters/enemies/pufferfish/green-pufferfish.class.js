import {
    GREEN_PUFFERFISH_SWIMMING,
    GREEN_PUFFERFISH_DEAD,
    GREEN_PUFFERFISH_TRANSITION,
    GREEN_PUFFERFISH_BUBBLE_SWIMMING
} from "../../../../storage/characters/enemies/pufferfish.storage.js";
import BasePufferfishClass from "./base-pufferfish.class.js";

const GREEN_PUFFERFISH_CONFIG = {
    swimming: GREEN_PUFFERFISH_SWIMMING,
    dead: GREEN_PUFFERFISH_DEAD,
    transition: GREEN_PUFFERFISH_TRANSITION,
    bubbleSwimming: GREEN_PUFFERFISH_BUBBLE_SWIMMING,
    speedMin: 0.4,
    speedMax: 0.8,
    verticalSpeedMin: 0.18,
    verticalSpeedMax: 0.35
};

/**
 * Represents a green pufferfish enemy.
 *
 * @extends BasePufferfishClass
 */
export default class GreenPufferfishClass extends BasePufferfishClass {

    /**
     * Creates a green pufferfish enemy.
     *
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     * @param {number} w - The width.
     * @param {number} h - The height.
     * @param {number} speed - The movement speed.
     * @param {string} imgPath - The image path.
     */
    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath, GREEN_PUFFERFISH_CONFIG);
    }
}