export async function loadWasmModule(url: string): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await WebAssembly.instantiate(arrayBuffer, { env: { abort() { } } });
}

