"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ssrBehavior = undefined;

var _ssrBehavior2 = require("./ssr-behavior");

var _ssrBehavior = _interopRequireWildcard(_ssrBehavior2);

var _MDSpinner = require("./MDSpinner");

var _MDSpinner2 = _interopRequireDefault(_MDSpinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.ssrBehavior = _ssrBehavior;
exports.default = _MDSpinner2.default;