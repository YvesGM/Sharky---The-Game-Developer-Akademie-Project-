import {
    RED_PUFFERFISH_SWIMMING,
    RED_PUFFERFISH_DEAD,
    RED_PUFFERFISH_TRANSITION,
    RED_PUFFERFISH_BUBBLE_SWIMMING
} from "../../../../storage/characters/enemies/pufferfish.storage.js";
import BasePufferfishClass from "./base-pufferfish.class.js";

const RED_PUFFERFISH_CONFIG = {
    swimming: RED_PUFFERFISH_SWIMMING,
    dead: RED_PUFFERFISH_DEAD,
    transition: RED_PUFFERFISH_TRANSITION,
    bubbleSwimming: RED_PUFFERFISH_BUBBLE_SWIMMING,
    speedMin: 0.6,
    speedMax: 1.0,
    verticalSpeedMin: 0.18,
    verticalSpeedMax: 0.35
};

/**
 * Represents a red pufferfish enemy.
 *
 * @extends BasePufferfishClass
 */
export default class RedPufferfishClass extends BasePufferfishClass {

    /**
     * Creates a red pufferfish enemy.
     *
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     * @param {number} w - The width.
     * @param {number} h - The height.
     * @param {number} speed - The movement speed.
     * @param {string} imgPath - The image path.
     */
    constructor(x, y, w, h, speed, imgPath) {
        super(x, y, w, h, speed, imgPath, RED_PUFFERFISH_CONFIG);
    }
}