#!/usr/bin/env node
/**
 * Verifies AURA_I18N key parity across en / ka / tr / ru.
 * Exit 0 if OK, 1 if missing keys or parse failure.
 */
"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..");
var file = path.join(root, "js", "i18n-data.js");

if (!fs.existsSync(file)) {
  console.error("Missing js/i18n-data.js");
  process.exit(1);
}

var code = fs.readFileSync(file, "utf8");
var sandbox = { window: {}, console: console };
vm.createContext(sandbox);
try {
  vm.runInContext(code, sandbox);
} catch (err) {
  console.error("Failed to evaluate i18n-data.js:", err.message);
  process.exit(1);
}

var I18N = sandbox.window.AURA_I18N;
if (!I18N) {
  console.error("window.AURA_I18N not found");
  process.exit(1);
}

var langs = ["en", "ka", "tr", "ru"];
var missingLang = langs.filter(function (l) {
  return !I18N[l] || typeof I18N[l] !== "object";
});
if (missingLang.length) {
  console.error("Missing language packs:", missingLang.join(", "));
  process.exit(1);
}

function keysOf(obj) {
  return Object.keys(obj).sort();
}

var base = keysOf(I18N.en);
var failed = false;

langs.forEach(function (lang) {
  var keys = keysOf(I18N[lang]);
  var missing = base.filter(function (k) {
    return keys.indexOf(k) === -1;
  });
  var extra = keys.filter(function (k) {
    return base.indexOf(k) === -1;
  });
  if (missing.length || extra.length) {
    failed = true;
    console.error("\n[" + lang + "] vs en:");
    if (missing.length) console.error("  missing (" + missing.length + "):", missing.join(", "));
    if (extra.length) console.error("  extra (" + extra.length + "):", extra.join(", "));
  } else {
    console.log("[" + lang + "] OK — " + keys.length + " keys");
  }
});

if (failed) {
  console.error("\ni18n key parity check FAILED");
  process.exit(1);
}

console.log("\ni18n key parity check passed (" + base.length + " keys × " + langs.length + " langs)");
process.exit(0);
