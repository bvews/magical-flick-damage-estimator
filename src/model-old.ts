export function getDamageOld(colors: number, drops: number, attack: number, magnification: number, targets: number, growth: number, effectiveness: number) {
    const selectedIndex = effectiveness == 0.5 ? 0 : effectiveness == 2 ? 2 : 1;
    const mock = {
        input: {
            variety: { value: '' + colors },
            number: { value: '' + drops },
            attack: { value: '' + attack },
            magnification: { value: '' + magnification },
            convert: { value: '' + targets },
            growth: { value: '' + growth },
            effectiveness: {
                selectedIndex: selectedIndex,
                options: [
                    { value: '0.5' },
                    { value: '1.0' },
                    { value: '2.0' }
                ]
            }
        }
    };
    type Mock = typeof mock;
    return Math.floor(calc(mock));

    /*
     * Magical-Flick Damage Estimator
     * 
     * Copyright (c) 2015, 2017 NullRef.
     *
     * This code is released under the MIT license.
     * https://nullref.undo.jp/magical-flick-damage-estimator/license.txt
     */

    /**
     * Calculate damage value.
     */
    function calc(document: Mock) {
        // Count the generated stars
        var star = (parseInt(document.input.convert.value, 10) + 1)
            / parseInt(document.input.variety.value) * parseInt(document.input.number.value)
            * (parseInt(document.input.growth.value, 10) + 1.5);
        // @ts-ignore: Argument of type 'number' is not assignable to parameter of type 'string'.
        star = parseInt(star, 10);

        // @ts-ignore: Argument of type 'number' is not assignable to parameter of type 'string'.
        var quotient = parseInt(star / 99, 10);
        var remainder = star % 99;

        // Calculate a damage value from the inputs
        var damage = parseInt(document.input.attack.value) * parseFloat(document.input.magnification.value)
            * (quotient * getAttackRatio(99) + getAttackRatio(remainder))
            * parseFloat(document.input.effectiveness.options[document.input.effectiveness.selectedIndex].value);

        // Show a popup message
        // if (document.getElementById) {
        //     document.getElementById("star-count").textContent = star;
        //     document.getElementById("total-damage").textContent = parseInt(damage, 10).toLocaleString();
        //     $("#popup").popup("open", { transition: 'pop' });
        // }

        return damage;
    }

    /**
     * Get an attack ratio.
     * @param {number|string} star Star count
     */
    function getAttackRatio(star: any) {
        if (isNaN(star)) {
            return 0;
        } // A damage value gets immutable when a star count is at least one hundred
        if (star > 99) {
            return 0.4 * 99 - 0.65;
        }
        if (star >= 12) {
            // A damage value increases linearly when a star count is at least twelve
            return 0.4 * parseInt(star, 10) - 0.65;
        }

        switch (parseInt(star, 10)) {
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