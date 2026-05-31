/**
 * Collects coins.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {number} value - The coin value.
 * @returns {void}
 */
export function collectCoin(sharky, value = 1) {
    sharky.coins += value;
    sharky.limitCoins();
}


/**
 * Limits coin amount.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function limitCoins(sharky) {
    if (sharky.coins > 15) {
        sharky.coins = 15;
    }
}


/**
 * Collects poison.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {number} value - The poison value.
 * @returns {void}
 */
export function collectPoison(sharky, value = 1) {
    sharky.poison += value;
    sharky.totalPoisonCollected += value;
    sharky.limitPoison();
}


/**
 * Limits poison amount.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function limitPoison(sharky) {
    if (sharky.poison > 5) {
        sharky.poison = 5;
    }
}