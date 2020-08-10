"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSASS;

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _requirePackageName = _interopRequireDefault(require("require-package-name"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sass = require('sass');

function removeNodeModulesOrTildaFromPath(packagePath) {
  const nodeModulesIndex = packagePath.indexOf('node_modules/');

  if (nodeModulesIndex > -1) {
    return packagePath.substring(nodeModulesIndex + 'node_modules/'.length);
  }

  if (packagePath.indexOf(`~`) === 0) {
    return packagePath.substring(1);
  }

  return packagePath;
}

async function parseSASS(filename) {
  const includedFiles = [];
  let sassDetails = {};

  try {
    // sass processor does not respect the custom importer
    sassDetails = sass.renderSync({
      file: filename,
      includePaths: [_path.default.dirname(filename)],
      importer: [function importer(url) {
        includedFiles.push(url);
        return {
          contents: `
              h1 {
                font-size: 40px;
              }`
        };
      }]
    });
  } catch (e) {
    sassDetails.stats = {
      includedFiles
    };
  }

  const result = (0, _lodash.default)(sassDetails.stats.includedFiles).map(removeNodeModulesOrTildaFromPath).map(_requirePackageName.default).uniq().filter(x => x).value();
  return result;
}

module.exports = exports.default;