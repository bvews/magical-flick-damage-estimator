import { getDamage } from './model';
import { getDamageOld } from './model-old';
import { loadWasmModule } from './wasm-loader-local';
import path from 'path';

describe('Damage calculation test', () => {
    let getDamageWasm: Function | undefined;

    it('WASM module loading test', async () => {
        getDamageWasm = await getGetDamageFunctionFromWasm();
        expect(getDamageWasm).toBeInstanceOf(Function);
    });

    it('Damage calculation test', () => {
        let result = false;
        if (getDamageWasm instanceof Function) {
            result = damageCalculationTest(getDamage, getDamageWasm, getDamageOld);
        }
        expect(result).toBeTruthy();
    });
});

async function getGetDamageFunctionFromWasm(): Promise<Function | undefined> {
    try {
        const module = await loadWasmModule(path.resolve(path.join(__dirname, '../dist/wasm/optimized.wasm')));
        if (module.instance.exports.getDamage instanceof Function) {
            return module.instance.exports.getDamage;
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined;
    }
}

function damageCalculationTest(...methods: Function[]): boolean {
    const testData = generateTestData(getParams());
    let count = 0;
    let successCount = 0;
    let invalidCount = 0;
    testData.forEach(args => {
        let prevValue: any;
        let isValid = true;
        methods.forEach(method => {
            const value = method(...args);
            if (prevValue != undefined && prevValue != value) {
                console.warn('Args: ', args, ', ', prevValue, '!=', value);
                isValid = false
            }
            prevValue = value;
        });

        count++;
        if (isValid) {
            successCount++;
        } else {
            invalidCount++;
        }
    });

    // console.log(`Tested ${count} times. Success: ${successCount}, Invalid: ${invalidCount}`);
    return invalidCount === 0;
}

interface NameValuesPair {
    name: string,
    values: number[]
}

function getParams(): NameValuesPair[] {
    return [
        { name: 'colors', values: [1, 3, 6] },
        { name: 'drops', values: [1, 12, 25] },
        { name: 'attack', values: [0, 5000, 10000] },
        { name: 'magnification', values: [1, 2.56, 4] },
        { name: 'targets', values: [0, 3, 5] },
        { name: 'growth', values: [0, 30, 60] },
        { name: 'effectiveness', values: [0.5, 1, 2] }
    ];
}

function generateTestData(params: NameValuesPair[]) {
    const length = params
        .map(p => p.values.length)
        .reduce((prev, current) => prev * current);

    const result = [];
    for (let i = 0; i < params[0].values.length; i++) {
        for (let j = 0; j < params[1].values.length; j++) {
            for (let k = 0; k < params[2].values.length; k++) {
                for (let l = 0; l < params[3].values.length; l++) {
                    for (let m = 0; m < params[4].values.length; m++) {
                        for (let n = 0; n < params[5].values.length; n++) {
                            for (let o = 0; o < params[6].values.length; o++) {
                                result.push([
                                    params[0].values[i],
                                    params[1].values[j],
                                    params[2].values[k],
                                    params[3].values[l],
                                    params[4].values[m],
                                    params[5].values[n],
                                    params[6].values[o],
                                ]);
                            }
                        }
                    }
                }
            }
        }
    }

    return result;
}