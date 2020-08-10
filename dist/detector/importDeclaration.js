"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectImportDeclaration;

var _extract = require("./extract");

function detectImportDeclaration(node) {
  return node.type === 'ImportDeclaration' && node.source && node.source.value ? [(0, _extract.extractInlineWebpack)(node.source.value)] : [];
}

module.exports = exports.default;