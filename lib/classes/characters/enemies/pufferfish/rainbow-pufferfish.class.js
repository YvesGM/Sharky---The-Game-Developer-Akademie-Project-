import {
    RAINBOW_PUFFERFISH_SWIMMING,
    RAINBOW_PUFFERFISH_DEAD,
    RAINBOW_PUFFERFISH_TRANSITION,
    RAINBOW_PUFFERFISH_BUBBLE_SWIMMING
} from "../../../../storage/characters/enemies/pufferfish.storage.js";
import BasePufferfishClass from "./base-pufferfish.class.js";

const RAINBOW_PUFFERFISH_CONFIG = {
    swimming: RAINBOW_PUFFERFISH_SWIMMING,
    dead: RAINBOW_PUFFERFISH_DEAD,
    transition: RAINBOW_PUFFERFISH_TRANSITION,
    bubbleSwimming: RAINBOW_PUFFERFISH_BUBBLE_SWIMMING,
    speedMin: 0.75,
    speedMax: 1.2,
    verticalSpeedMin: 0.08,
    verticalSpeedMax: 0.18
};

/**
 * Represents a rainbow pufferfish enemy.
 *
 * @extends BasePufferfishClass
 */
export default class RainbowPufferfishClass extends BasePufferfishClass {

    /**
     * Creates a rainbow pufferfish enemy.
     *
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     * @param {number} w - The width.
     * @param {number} h - The height.
     * @param {number} speed - The movement speed.
     * @param {string} imgPath - The image path.
     */
    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath, RAINBOW_PUFFERFISH_CONFIG);
    }
}