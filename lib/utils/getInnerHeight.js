"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getInnerHeight;
function getInnerHeight(el) {
    var clientHeight = el.clientHeight;

    var _getComputedStyle = getComputedStyle(el),
        paddingTop = _getComputedStyle.paddingTop,
        paddingBottom = _getComputedStyle.paddingBottom;

    return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
}