/* tslint:disable */
import * as wasm from "./react_rust_wasm_bg";

const lTextDecoder =
  typeof TextDecoder === "undefined"
    ? require("util").TextDecoder
    : TextDecoder;

let cachedTextDecoder = new lTextDecoder("utf-8");

let cachegetUint8Memory = null;
function getUint8Memory() {
  if (
    cachegetUint8Memory === null ||
    cachegetUint8Memory.buffer !== wasm.memory.buffer
  ) {
    cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_alert_42c5391edfd46cdc(arg0, arg1) {
  let varg0 = getStringFromWasm(arg0, arg1);
  alert(varg0);
}
/**
 * @returns {void}
 */
export function big_computation() {
  return wasm.big_computation();
}
