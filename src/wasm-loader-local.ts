// wasmLoadingState = 'initial';
// wasmLoadingState = 'loading';
// fetch('build/optimized.wasm')
//     .then(response => response.arrayBuffer())
//     .then(arrayBuffer => WebAssembly.instantiate(arrayBuffer))
//     .then(module => {
//         const exports = module.instance.exports;
//         // exports.method();
//         // wasmLoadingState = 'success';
//     })
//     .catch(error => {
//         // wasmLoadingState = 'error';
//         // ASMモジュールの読み込みに失敗しました。
//     });

import fs from 'fs';

export async function loadWasmModule(url: string): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
    const buffer = fs.readFileSync(url);
    const arrayBuffer = toArrayBuffer(buffer);
    return await WebAssembly.instantiate(arrayBuffer, { env: { abort() { } } });
}

function toArrayBuffer(buffer: Buffer) {
    let ab = new ArrayBuffer(buffer.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}
