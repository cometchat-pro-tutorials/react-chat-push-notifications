"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStylesheetComponent = exports.getStylesheetString = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _cssKeyframer = require("css-keyframer");

var _cssKeyframer2 = _interopRequireDefault(_cssKeyframer);

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyframerFactory = function keyframerFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new _cssKeyframer2.default(options);
};

var mapKeyframes = function mapKeyframes(iteratee) {
  return Object.keys(_styles.keyframes).map(function (key) {
    return iteratee(_styles.keyframes[key], key);
  });
};

var getStylesheetString = exports.getStylesheetString = function getStylesheetString(userAgent) {
  var keyframer = keyframerFactory({ userAgent: userAgent });

  return mapKeyframes(function (keyframe, key) {
    return keyframer.getKeyframesStylesheet(key, keyframe);
  }).join("");
};

var getStylesheetComponent = exports.getStylesheetComponent = function getStylesheetComponent(userAgent) {
  var keyframer = keyframerFactory({ userAgent: userAgent });

  return mapKeyframes(function (keyframe, key) {
    return _react2.default.createElement("style", {
      key: key,
      type: "text/css",
      "data-keyframes": key,
      dangerouslySetInnerHTML: {
        __html: keyframer.getKeyframesString(key, keyframe)
      }
    });
  });
};