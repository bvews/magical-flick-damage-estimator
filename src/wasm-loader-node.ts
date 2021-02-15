import fs from 'fs';

export async function loadWasmModule(url: string): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
    const buffer = fs.readFileSync(url);
    const arrayBuffer = toArrayBuffer(buffer);
    return await WebAssembly.instantiate(arrayBuffer, { env: { abort() { } } });
}

function toArrayBuffer(buffer: Buffer) {
    const ab = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}
