(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "jquery", "react", "express"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("jquery"), require("react"), require("express"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jquery, global.react, global.express);
    global.sum = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _jquery, _react, _express) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _jquery = _interopRequireDefault(_jquery);
  _react = _interopRequireDefault(_react);
  _express = _interopRequireDefault(_express);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = 42;
  _exports.default = _default;
});