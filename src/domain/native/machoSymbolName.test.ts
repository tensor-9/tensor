import { expect, it } from "vitest";

import { machoRuntimeSymbolName } from "./machoSymbolName.js";

it("removes exactly the one symbol-table underscore Darwin adds", () => {
  expect(
    [
      "_main",
      "__ZN6tensor3addEii",
      "_$s5swbin9tensorAddyS2i_SitF",
      "__T0So8NSObjectCMa",
      "_OBJC_CLASS_$_TensorThing",
      "__OBJC_$_INSTANCE_METHODS_TensorThing",
      "_objc_msgSend$addA:b:",
      "__mh_execute_header",
      "___stack_chk_fail",
    ].map(machoRuntimeSymbolName),
  ).toEqual([
    "main",
    "_ZN6tensor3addEii",
    "$s5swbin9tensorAddyS2i_SitF",
    "_T0So8NSObjectCMa",
    "OBJC_CLASS_$_TensorThing",
    "_OBJC_$_INSTANCE_METHODS_TensorThing",
    "objc_msgSend$addA:b:",
    "_mh_execute_header",
    "__stack_chk_fail",
  ]);
});

it("keeps names the compiler does not prefix and their exact spelling", () => {
  for (const name of [
    "-[TensorThing addA:b:]",
    "+[TensorThing new]",
    "ltmp0",
    "radr://5614542",
    "main",
    " _main",
    "Main",
  ])
    expect(machoRuntimeSymbolName(name)).toBe(name);
});

it("reports no runtime name when none is known or none remains", () => {
  expect(machoRuntimeSymbolName(null)).toBeNull();
  expect(machoRuntimeSymbolName("")).toBeNull();
  expect(machoRuntimeSymbolName("_")).toBeNull();
  expect(machoRuntimeSymbolName("__")).toBe("_");
});
