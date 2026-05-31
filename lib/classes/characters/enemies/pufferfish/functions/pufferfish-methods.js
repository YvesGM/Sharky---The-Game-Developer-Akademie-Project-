import {
    initMovementValues,
    initDirectionValues,
    initInflateValues,
    initOffset,
    loadImgStorage,
    randomBetween,
    resetAnimation
} from "./pufferfish-setup.js";

import {
    draw,
    drawDeathIfNeeded,
    drawInflateState,
    drawInflating,
    drawDeflating,
    drawInflated,
    drawNormal
} from "./pufferfish-draw.js";

import {
    finishInflatingIfNeeded,
    finishDeflatingIfNeeded,
    updateInflateState,
    isSharkyNear,
    getDistanceToSharky,
    getSharkyCenter,
    changeInflateState,
    startInflating,
    startDeflating,
    resetInflateAnimation
} from "./pufferfish-inflate.js";

import {
    move,
    moveByDirection,
    applyHorizontalBounds,
    applyVerticalBounds,
    applyWorldBounds,
    setLeftBound,
    setRightBound,
    setTopBound,
    setBottomBound,
    setMinY,
    setMaxY
} from "./pufferfish-movement.js";

/**
 * Wraps a helper function as a pufferfish instance method.
 *
 * @param {Function} helperFunction - The helper function.
 * @returns {Function} The wrapped instance method.
 */
function createPufferfishMethod(helperFunction) {
    return function (...args) {
        return helperFunction(this, ...args);
    };
}


/**
 * Adds all pufferfish methods to the class prototype.
 *
 * @param {Function} PufferfishClass - The pufferfish class constructor.
 * @returns {void}
 */
export function applyPufferfishMethods(PufferfishClass) {
    Object.assign(PufferfishClass.prototype, getPufferfishMethods());
}


/**
 * Returns all pufferfish prototype methods.
 *
 * @returns {Object} The pufferfish methods.
 */
function getPufferfishMethods() {
    return {
        initMovementValues: createPufferfishMethod(initMovementValues),
        initDirectionValues: createPufferfishMethod(initDirectionValues),
        initInflateValues: createPufferfishMethod(initInflateValues),
        initOffset: createPufferfishMethod(initOffset),
        loadImgStorage: createPufferfishMethod(loadImgStorage),
        randomBetween: createPufferfishMethod(randomBetween),
        resetAnimation: createPufferfishMethod(resetAnimation),

        draw: createPufferfishMethod(draw),
        drawDeathIfNeeded: createPufferfishMethod(drawDeathIfNeeded),
        drawInflateState: createPufferfishMethod(drawInflateState),
        drawInflating: createPufferfishMethod(drawInflating),
        drawDeflating: createPufferfishMethod(drawDeflating),
        drawInflated: createPufferfishMethod(drawInflated),
        drawNormal: createPufferfishMethod(drawNormal),

        finishInflatingIfNeeded: createPufferfishMethod(finishInflatingIfNeeded),
        finishDeflatingIfNeeded: createPufferfishMethod(finishDeflatingIfNeeded),
        updateInflateState: createPufferfishMethod(updateInflateState),
        isSharkyNear: createPufferfishMethod(isSharkyNear),
        getDistanceToSharky: createPufferfishMethod(getDistanceToSharky),
        getSharkyCenter,
        changeInflateState: createPufferfishMethod(changeInflateState),
        startInflating: createPufferfishMethod(startInflating),
        startDeflating: createPufferfishMethod(startDeflating),
        resetInflateAnimation: createPufferfishMethod(resetInflateAnimation),

        move: createPufferfishMethod(move),
        moveByDirection: createPufferfishMethod(moveByDirection),
        applyHorizontalBounds: createPufferfishMethod(applyHorizontalBounds),
        applyVerticalBounds: createPufferfishMethod(applyVerticalBounds),
        applyWorldBounds: createPufferfishMethod(applyWorldBounds),
        setLeftBound: createPufferfishMethod(setLeftBound),
        setRightBound: createPufferfishMethod(setRightBound),
        setTopBound: createPufferfishMethod(setTopBound),
        setBottomBound: createPufferfishMethod(setBottomBound),
        setMinY: createPufferfishMethod(setMinY),
        setMaxY: createPufferfishMethod(setMaxY)
    };
}