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

export async function loadWasmModule(url: string): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await WebAssembly.instantiate(arrayBuffer, { env: { abort() { } } });
}

