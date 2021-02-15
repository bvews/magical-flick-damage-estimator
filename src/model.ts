export function getDamage(colors: number, drops: number, attack: number, magnification: number, targets: number, growth: number, effectiveness: number) {
    const star = getStar(colors, drops, targets, growth);
    const quotient = Math.floor(star / 99);
    const remainder = star % 99;

    const result = attack * magnification * effectiveness
        * (quotient * getAttackRatio(99) + getAttackRatio(remainder));
    return Math.floor(result);
}

export function getStar(colors: number, drops: number, targets: number, growth: number) {
    // Count number of the generated stars
    const result = (targets + 1) / colors * drops * (growth + 1.5);
    return Math.floor(result);
}

/**
 * Get attack ratio value.
 * @param {number} star Star count
 */
export function getAttackRatio(star: number) {
    star = Math.floor(star);

    if (isNaN(star)) {
        return 0;
    } else if (star > 99) {
        // Damage value gets immutable when star count has reached 99.
        return 0.4 * 99 - 0.65;
    } else if (star >= 12) {
        // Damage value increases linearly when a star count is at least twelve.
        return 0.4 * star - 0.65;
    } else {
        switch (star) {
            case 3:
                return 1;
            case 4:
                return 1.1;
            case 5:
                return 1.2;
            case 6:
                return 2.04;
            case 7:
                return 2.14;
            case 8:
                return 2.24;
            case 9:
                return 3.09;
            case 10:
                return 3.19;
            case 11:
                return 3.29;
            default:
                return 0;
        }
    }
}
