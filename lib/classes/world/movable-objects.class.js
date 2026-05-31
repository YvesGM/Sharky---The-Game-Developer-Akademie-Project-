import {
    setPosition,
    setMovement,
    setImage,
    setAnimationValues,
    setDeathValues,
    setDefaultOffset
} from "./movable-objects/movable-object-setup.js";

import {
    drawImg,
    canDrawImage,
    drawImageByDirection,
    drawMirroredImage,
    drawFrames,
    loadFrame
} from "./movable-objects/movable-object-drawing.js";

import {
    animateCharacters,
    canAnimate,
    setNextAnimationImage,
    animateOnce,
    initFinishedKey,
    handleFinishedAnimation,
    setLastAnimationImage,
    updateOnceAnimation,
    setNextOnceImage,
    finishOnceAnimation,
    setCurrentOnceImage
} from "./movable-objects/movable-object-animation.js";

import {
    animateDeath,
    updateDeathAnimation,
    setDeathImage,
    markDeletedAfterDeath,
    die,
    resetDeathAnimation
} from "./movable-objects/movable-object-death.js";

import {
    getHitbox,
    isColliding,
    isBoxColliding
} from "./movable-objects/movable-object-collision.js";

import {
    isNear,
    getCenter,
    getDistance
} from "./movable-objects/movable-object-distance.js";

export default class MovableObjectsClass {

    /**
     * Creates a movable object.
     *
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     * @param {number} w - The object width.
     * @param {number} h - The object height.
     * @param {number} speed - The movement speed.
     * @param {string} imgPath - The image path.
     */
    constructor(x, y, w, h, speed, imgPath) {
        this.setPosition(x, y, w, h);
        this.setMovement(speed);
        this.setImage(imgPath);
        this.setAnimationValues();
        this.setDeathValues();
        this.setDefaultOffset();
    }


    setPosition(x, y, w, h) {
        setPosition(this, x, y, w, h);
    }


    setMovement(speed) {
        setMovement(this, speed);
    }


    setImage(imgPath) {
        setImage(this, imgPath);
    }


    setAnimationValues() {
        setAnimationValues(this);
    }


    setDeathValues() {
        setDeathValues(this);
    }


    setDefaultOffset() {
        setDefaultOffset(this);
    }


    drawImg(ctx) {
        drawImg(this, ctx);
    }


    canDrawImage() {
        return canDrawImage(this);
    }


    drawImageByDirection(ctx) {
        drawImageByDirection(this, ctx);
    }


    drawMirroredImage(ctx) {
        drawMirroredImage(this, ctx);
    }


    drawFrames(storage) {
        drawFrames(this, storage);
    }


    loadFrame(path) {
        loadFrame(this, path);
    }


    animateCharacters(currentStorage) {
        animateCharacters(this, currentStorage);
    }


    canAnimate(now, lastFrameTime, delay) {
        return canAnimate(now, lastFrameTime, delay);
    }


    setNextAnimationImage(currentStorage) {
        setNextAnimationImage(this, currentStorage);
    }


    animateOnce(currentStorage, finishedKey) {
        animateOnce(this, currentStorage, finishedKey);
    }


    initFinishedKey(finishedKey) {
        initFinishedKey(this, finishedKey);
    }


    handleFinishedAnimation(currentStorage, finishedKey) {
        return handleFinishedAnimation(this, currentStorage, finishedKey);
    }


    setLastAnimationImage(currentStorage) {
        setLastAnimationImage(this, currentStorage);
    }


    updateOnceAnimation(currentStorage, finishedKey, now) {
        updateOnceAnimation(this, currentStorage, finishedKey, now);
    }


    setNextOnceImage(currentStorage, finishedKey) {
        setNextOnceImage(this, currentStorage, finishedKey);
    }


    finishOnceAnimation(finishedKey) {
        finishOnceAnimation(this, finishedKey);
    }


    setCurrentOnceImage(currentStorage) {
        setCurrentOnceImage(this, currentStorage);
    }


    animateDeath(currentStorage) {
        animateDeath(this, currentStorage);
    }


    updateDeathAnimation(currentStorage, now) {
        updateDeathAnimation(this, currentStorage, now);
    }


    setDeathImage(currentStorage) {
        setDeathImage(this, currentStorage);
    }


    markDeletedAfterDeath(currentStorage) {
        markDeletedAfterDeath(this, currentStorage);
    }


    getHitbox(camera_x = 0) {
        return getHitbox(this, camera_x);
    }


    isColliding(obj, camera_x = 0) {
        return isColliding(this, obj, camera_x);
    }


    isBoxColliding(firstBox, secondBox) {
        return isBoxColliding(firstBox, secondBox);
    }


    isNear(obj, range = 500) {
        return isNear(this, obj, range);
    }


    getCenter(obj) {
        return getCenter(obj);
    }


    getDistance(firstPoint, secondPoint) {
        return getDistance(firstPoint, secondPoint);
    }


    die() {
        die(this);
    }


    resetDeathAnimation() {
        resetDeathAnimation(this);
    }
}