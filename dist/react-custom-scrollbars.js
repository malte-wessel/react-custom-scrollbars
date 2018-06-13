(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactCustomScrollbars"] = factory(require("react"));
	else
		root["ReactCustomScrollbars"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Scrollbars = undefined;

	var _Scrollbars = __webpack_require__(9);

	var _Scrollbars2 = _interopRequireDefault(_Scrollbars);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Scrollbars2.default;
	exports.Scrollbars = _Scrollbars2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var prefix = __webpack_require__(17)
	var toCamelCase = __webpack_require__(23)
	var cache = { 'float': 'cssFloat' }
	var addPxToStyle = __webpack_require__(7)

	function style (element, property, value) {
	  var camel = cache[property]
	  if (typeof camel === 'undefined') {
	    camel = detect(property)
	  }

	  // may be false if CSS prop is unsupported
	  if (camel) {
	    if (value === undefined) {
	      return element.style[camel]
	    }

	    element.style[camel] = addPxToStyle(camel, value)
	  }
	}

	function each (element, properties) {
	  for (var k in properties) {
	    if (properties.hasOwnProperty(k)) {
	      style(element, k, properties[k])
	    }
	  }
	}

	function detect (cssProp) {
	  var camel = toCamelCase(cssProp)
	  var result = prefix(camel)
	  cache[camel] = cache[cssProp] = cache[result] = result
	  return result
	}

	function set () {
	  if (arguments.length === 2) {
	    if (typeof arguments[1] === 'string') {
	      arguments[0].style.cssText = arguments[1]
	    } else {
	      each(arguments[0], arguments[1])
	    }
	  } else {
	    style(arguments[0], arguments[1], arguments[2])
	  }
	}

	module.exports = set
	module.exports.set = set

	module.exports.get = function (element, properties) {
	  if (Array.isArray(properties)) {
	    return properties.reduce(function (obj, prop) {
	      obj[prop] = style(element, prop || '')
	      return obj
	    }, {})
	  } else {
	    return style(element, properties || '')
	  }
	}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (true) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(3);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (true) {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/* The following list is defined in React's core */
	var IS_UNITLESS = {
	  animationIterationCount: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridColumn: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  stopOpacity: true,
	  strokeDashoffset: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	module.exports = function(name, value) {
	  if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
	    return value + 'px';
	  } else {
	    return value;
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.renderViewDefault = renderViewDefault;
	exports.renderTrackHorizontalDefault = renderTrackHorizontalDefault;
	exports.renderTrackVerticalDefault = renderTrackVerticalDefault;
	exports.renderThumbHorizontalDefault = renderThumbHorizontalDefault;
	exports.renderThumbVerticalDefault = renderThumbVerticalDefault;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/* eslint-disable react/prop-types */

	function renderViewDefault(props) {
	    return _react2.default.createElement('div', props);
	}

	function renderTrackHorizontalDefault(_ref) {
	    var style = _ref.style,
	        props = _objectWithoutProperties(_ref, ['style']);

	    var finalStyle = _extends({}, style, {
	        right: 2,
	        bottom: 2,
	        left: 2,
	        borderRadius: 3
	    });
	    return _react2.default.createElement('div', _extends({ style: finalStyle }, props));
	}

	function renderTrackVerticalDefault(_ref2) {
	    var style = _ref2.style,
	        props = _objectWithoutProperties(_ref2, ['style']);

	    var finalStyle = _extends({}, style, {
	        right: 2,
	        bottom: 2,
	        top: 2,
	        borderRadius: 3
	    });
	    return _react2.default.createElement('div', _extends({ style: finalStyle }, props));
	}

	function renderThumbHorizontalDefault(_ref3) {
	    var style = _ref3.style,
	        props = _objectWithoutProperties(_ref3, ['style']);

	    var finalStyle = _extends({}, style, {
	        cursor: 'pointer',
	        borderRadius: 'inherit',
	        backgroundColor: 'rgba(0,0,0,.2)'
	    });
	    return _react2.default.createElement('div', _extends({ style: finalStyle }, props));
	}

	function renderThumbVerticalDefault(_ref4) {
	    var style = _ref4.style,
	        props = _objectWithoutProperties(_ref4, ['style']);

	    var finalStyle = _extends({}, style, {
	        cursor: 'pointer',
	        borderRadius: 'inherit',
	        backgroundColor: 'rgba(0,0,0,.2)'
	    });
	    return _react2.default.createElement('div', _extends({ style: finalStyle }, props));
	}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _raf2 = __webpack_require__(22);

	var _raf3 = _interopRequireDefault(_raf2);

	var _domCss = __webpack_require__(1);

	var _domCss2 = _interopRequireDefault(_domCss);

	var _react = __webpack_require__(6);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _isString = __webpack_require__(14);

	var _isString2 = _interopRequireDefault(_isString);

	var _getScrollbarWidth = __webpack_require__(13);

	var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);

	var _returnFalse = __webpack_require__(15);

	var _returnFalse2 = _interopRequireDefault(_returnFalse);

	var _getInnerWidth = __webpack_require__(12);

	var _getInnerWidth2 = _interopRequireDefault(_getInnerWidth);

	var _getInnerHeight = __webpack_require__(11);

	var _getInnerHeight2 = _interopRequireDefault(_getInnerHeight);

	var _styles = __webpack_require__(10);

	var _defaultRenderElements = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Scrollbars = function (_Component) {
	    _inherits(Scrollbars, _Component);

	    function Scrollbars(props) {
	        var _ref;

	        _classCallCheck(this, Scrollbars);

	        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            rest[_key - 1] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, (_ref = Scrollbars.__proto__ || Object.getPrototypeOf(Scrollbars)).call.apply(_ref, [this, props].concat(rest)));

	        _this.getScrollLeft = _this.getScrollLeft.bind(_this);
	        _this.getScrollTop = _this.getScrollTop.bind(_this);
	        _this.getScrollWidth = _this.getScrollWidth.bind(_this);
	        _this.getScrollHeight = _this.getScrollHeight.bind(_this);
	        _this.getClientWidth = _this.getClientWidth.bind(_this);
	        _this.getClientHeight = _this.getClientHeight.bind(_this);
	        _this.getValues = _this.getValues.bind(_this);
	        _this.getThumbHorizontalWidth = _this.getThumbHorizontalWidth.bind(_this);
	        _this.getThumbVerticalHeight = _this.getThumbVerticalHeight.bind(_this);
	        _this.getScrollLeftForOffset = _this.getScrollLeftForOffset.bind(_this);
	        _this.getScrollTopForOffset = _this.getScrollTopForOffset.bind(_this);

	        _this.scrollLeft = _this.scrollLeft.bind(_this);
	        _this.scrollTop = _this.scrollTop.bind(_this);
	        _this.scrollToLeft = _this.scrollToLeft.bind(_this);
	        _this.scrollToTop = _this.scrollToTop.bind(_this);
	        _this.scrollToRight = _this.scrollToRight.bind(_this);
	        _this.scrollToBottom = _this.scrollToBottom.bind(_this);

	        _this.handleTrackMouseEnter = _this.handleTrackMouseEnter.bind(_this);
	        _this.handleTrackMouseLeave = _this.handleTrackMouseLeave.bind(_this);
	        _this.handleHorizontalTrackMouseDown = _this.handleHorizontalTrackMouseDown.bind(_this);
	        _this.handleVerticalTrackMouseDown = _this.handleVerticalTrackMouseDown.bind(_this);
	        _this.handleHorizontalThumbMouseDown = _this.handleHorizontalThumbMouseDown.bind(_this);
	        _this.handleVerticalThumbMouseDown = _this.handleVerticalThumbMouseDown.bind(_this);
	        _this.handleWindowResize = _this.handleWindowResize.bind(_this);
	        _this.handleScroll = _this.handleScroll.bind(_this);
	        _this.handleDrag = _this.handleDrag.bind(_this);
	        _this.handleDragEnd = _this.handleDragEnd.bind(_this);

	        _this.state = {
	            didMountUniversal: false
	        };
	        return _this;
	    }

	    _createClass(Scrollbars, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.addListeners();
	            this.update();
	            this.componentDidMountUniversal();
	        }
	    }, {
	        key: 'componentDidMountUniversal',
	        value: function componentDidMountUniversal() {
	            // eslint-disable-line react/sort-comp
	            var universal = this.props.universal;

	            if (!universal) return;
	            this.setState({ didMountUniversal: true });
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.update();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.removeListeners();
	            (0, _raf2.cancel)(this.requestFrame);
	            clearTimeout(this.hideTracksTimeout);
	            clearInterval(this.detectScrollingInterval);
	        }
	    }, {
	        key: 'getScrollLeft',
	        value: function getScrollLeft() {
	            if (!this.view) return 0;
	            return this.view.scrollLeft;
	        }
	    }, {
	        key: 'getScrollTop',
	        value: function getScrollTop() {
	            if (!this.view) return 0;
	            return this.view.scrollTop;
	        }
	    }, {
	        key: 'getScrollWidth',
	        value: function getScrollWidth() {
	            if (!this.view) return 0;
	            return this.view.scrollWidth;
	        }
	    }, {
	        key: 'getScrollHeight',
	        value: function getScrollHeight() {
	            if (!this.view) return 0;
	            return this.view.scrollHeight;
	        }
	    }, {
	        key: 'getClientWidth',
	        value: function getClientWidth() {
	            if (!this.view) return 0;
	            return this.view.clientWidth;
	        }
	    }, {
	        key: 'getClientHeight',
	        value: function getClientHeight() {
	            if (!this.view) return 0;
	            return this.view.clientHeight;
	        }
	    }, {
	        key: 'getValues',
	        value: function getValues() {
	            var _ref2 = this.view || {},
	                _ref2$scrollLeft = _ref2.scrollLeft,
	                scrollLeft = _ref2$scrollLeft === undefined ? 0 : _ref2$scrollLeft,
	                _ref2$scrollTop = _ref2.scrollTop,
	                scrollTop = _ref2$scrollTop === undefined ? 0 : _ref2$scrollTop,
	                _ref2$scrollWidth = _ref2.scrollWidth,
	                scrollWidth = _ref2$scrollWidth === undefined ? 0 : _ref2$scrollWidth,
	                _ref2$scrollHeight = _ref2.scrollHeight,
	                scrollHeight = _ref2$scrollHeight === undefined ? 0 : _ref2$scrollHeight,
	                _ref2$clientWidth = _ref2.clientWidth,
	                clientWidth = _ref2$clientWidth === undefined ? 0 : _ref2$clientWidth,
	                _ref2$clientHeight = _ref2.clientHeight,
	                clientHeight = _ref2$clientHeight === undefined ? 0 : _ref2$clientHeight;

	            return {
	                left: scrollLeft / (scrollWidth - clientWidth) || 0,
	                top: scrollTop / (scrollHeight - clientHeight) || 0,
	                scrollLeft: scrollLeft,
	                scrollTop: scrollTop,
	                scrollWidth: scrollWidth,
	                scrollHeight: scrollHeight,
	                clientWidth: clientWidth,
	                clientHeight: clientHeight
	            };
	        }
	    }, {
	        key: 'getThumbHorizontalWidth',
	        value: function getThumbHorizontalWidth() {
	            var _props = this.props,
	                thumbSize = _props.thumbSize,
	                thumbMinSize = _props.thumbMinSize;
	            var _view = this.view,
	                scrollWidth = _view.scrollWidth,
	                clientWidth = _view.clientWidth;

	            var trackWidth = (0, _getInnerWidth2.default)(this.trackHorizontal);
	            var width = Math.ceil(clientWidth / scrollWidth * trackWidth);
	            if (trackWidth === width) return 0;
	            if (thumbSize) return thumbSize;
	            return Math.max(width, thumbMinSize);
	        }
	    }, {
	        key: 'getThumbVerticalHeight',
	        value: function getThumbVerticalHeight() {
	            var _props2 = this.props,
	                thumbSize = _props2.thumbSize,
	                thumbMinSize = _props2.thumbMinSize;
	            var _view2 = this.view,
	                scrollHeight = _view2.scrollHeight,
	                clientHeight = _view2.clientHeight;

	            var trackHeight = (0, _getInnerHeight2.default)(this.trackVertical);
	            var height = Math.ceil(clientHeight / scrollHeight * trackHeight);
	            if (trackHeight === height) return 0;
	            if (thumbSize) return thumbSize;
	            return Math.max(height, thumbMinSize);
	        }
	    }, {
	        key: 'getScrollLeftForOffset',
	        value: function getScrollLeftForOffset(offset) {
	            var _view3 = this.view,
	                scrollWidth = _view3.scrollWidth,
	                clientWidth = _view3.clientWidth;

	            var trackWidth = (0, _getInnerWidth2.default)(this.trackHorizontal);
	            var thumbWidth = this.getThumbHorizontalWidth();
	            return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
	        }
	    }, {
	        key: 'getScrollTopForOffset',
	        value: function getScrollTopForOffset(offset) {
	            var _view4 = this.view,
	                scrollHeight = _view4.scrollHeight,
	                clientHeight = _view4.clientHeight;

	            var trackHeight = (0, _getInnerHeight2.default)(this.trackVertical);
	            var thumbHeight = this.getThumbVerticalHeight();
	            return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
	        }
	    }, {
	        key: 'scrollLeft',
	        value: function scrollLeft() {
	            var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	            if (!this.view) return;
	            this.view.scrollLeft = left;
	        }
	    }, {
	        key: 'scrollTop',
	        value: function scrollTop() {
	            var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	            if (!this.view) return;
	            this.view.scrollTop = top;
	        }
	    }, {
	        key: 'scrollToLeft',
	        value: function scrollToLeft() {
	            if (!this.view) return;
	            this.view.scrollLeft = 0;
	        }
	    }, {
	        key: 'scrollToTop',
	        value: function scrollToTop() {
	            if (!this.view) return;
	            this.view.scrollTop = 0;
	        }
	    }, {
	        key: 'scrollToRight',
	        value: function scrollToRight() {
	            if (!this.view) return;
	            this.view.scrollLeft = this.view.scrollWidth;
	        }
	    }, {
	        key: 'scrollToBottom',
	        value: function scrollToBottom() {
	            if (!this.view) return;
	            this.view.scrollTop = this.view.scrollHeight;
	        }
	    }, {
	        key: 'addListeners',
	        value: function addListeners() {
	            /* istanbul ignore if */
	            if (typeof document === 'undefined' || !this.view) return;
	            var view = this.view,
	                trackHorizontal = this.trackHorizontal,
	                trackVertical = this.trackVertical,
	                thumbHorizontal = this.thumbHorizontal,
	                thumbVertical = this.thumbVertical;
	            var alwaysShowTracksWhenMouseOver = this.props.alwaysShowTracksWhenMouseOver;

	            view.addEventListener('scroll', this.handleScroll);
	            if (!(0, _getScrollbarWidth2.default)()) return;

	            if (alwaysShowTracksWhenMouseOver) {
	                view.addEventListener('mouseenter', this.handleTrackMouseEnter);
	                view.addEventListener('mouseleave', this.handleTrackMouseLeave);
	            } else {
	                trackHorizontal.addEventListener('mouseenter', this.handleTrackMouseEnter);
	                trackHorizontal.addEventListener('mouseleave', this.handleTrackMouseLeave);
	                trackVertical.addEventListener('mouseenter', this.handleTrackMouseEnter);
	                trackVertical.addEventListener('mouseleave', this.handleTrackMouseLeave);
	            }
	            trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
	            trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
	            thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
	            thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
	            window.addEventListener('resize', this.handleWindowResize);
	        }
	    }, {
	        key: 'removeListeners',
	        value: function removeListeners() {
	            /* istanbul ignore if */
	            if (typeof document === 'undefined' || !this.view) return;
	            var view = this.view,
	                trackHorizontal = this.trackHorizontal,
	                trackVertical = this.trackVertical,
	                thumbHorizontal = this.thumbHorizontal,
	                thumbVertical = this.thumbVertical;
	            var alwaysShowTracksWhenMouseOver = this.props.alwaysShowTracksWhenMouseOver;

	            view.removeEventListener('scroll', this.handleScroll);
	            if (!(0, _getScrollbarWidth2.default)()) return;
	            if (alwaysShowTracksWhenMouseOver) {
	                view.removeEventListener('mouseenter', this.handleTrackMouseEnter);
	                view.removeEventListener('mouseleave', this.handleTrackMouseLeave);
	            } else {
	                trackHorizontal.removeEventListener('mouseenter', this.handleTrackMouseEnter);
	                trackHorizontal.removeEventListener('mouseleave', this.handleTrackMouseLeave);
	                trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
	                trackVertical.removeEventListener('mouseenter', this.handleTrackMouseEnter);
	                trackVertical.removeEventListener('mouseleave', this.handleTrackMouseLeave);
	            }
	            trackVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
	            thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
	            thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
	            window.removeEventListener('resize', this.handleWindowResize);
	            // Possibly setup by `handleDragStart`
	            this.teardownDragging();
	        }
	    }, {
	        key: 'handleScroll',
	        value: function handleScroll(event) {
	            var _this2 = this;

	            var _props3 = this.props,
	                onScroll = _props3.onScroll,
	                onScrollFrame = _props3.onScrollFrame;

	            if (onScroll) onScroll(event);
	            this.update(function (values) {
	                var scrollLeft = values.scrollLeft,
	                    scrollTop = values.scrollTop;

	                _this2.viewScrollLeft = scrollLeft;
	                _this2.viewScrollTop = scrollTop;
	                if (onScrollFrame) onScrollFrame(values);
	            });
	            this.detectScrolling();
	        }
	    }, {
	        key: 'handleScrollStart',
	        value: function handleScrollStart() {
	            var onScrollStart = this.props.onScrollStart;

	            if (onScrollStart) onScrollStart();
	            this.handleScrollStartAutoHide();
	        }
	    }, {
	        key: 'handleScrollStartAutoHide',
	        value: function handleScrollStartAutoHide() {
	            var autoHide = this.props.autoHide;

	            if (!autoHide) return;
	            this.showTracks();
	        }
	    }, {
	        key: 'handleScrollStop',
	        value: function handleScrollStop() {
	            var onScrollStop = this.props.onScrollStop;

	            if (onScrollStop) onScrollStop();
	            this.handleScrollStopAutoHide();
	        }
	    }, {
	        key: 'handleScrollStopAutoHide',
	        value: function handleScrollStopAutoHide() {
	            var autoHide = this.props.autoHide;

	            if (!autoHide) return;
	            this.hideTracks();
	        }
	    }, {
	        key: 'handleWindowResize',
	        value: function handleWindowResize() {
	            this.update();
	        }
	    }, {
	        key: 'handleHorizontalTrackMouseDown',
	        value: function handleHorizontalTrackMouseDown(event) {
	            event.preventDefault();
	            var target = event.target,
	                clientX = event.clientX;

	            var _target$getBoundingCl = target.getBoundingClientRect(),
	                targetLeft = _target$getBoundingCl.left;

	            var thumbWidth = this.getThumbHorizontalWidth();
	            var offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
	            this.view.scrollLeft = this.getScrollLeftForOffset(offset);
	        }
	    }, {
	        key: 'handleVerticalTrackMouseDown',
	        value: function handleVerticalTrackMouseDown(event) {
	            event.preventDefault();
	            var target = event.target,
	                clientY = event.clientY;

	            var _target$getBoundingCl2 = target.getBoundingClientRect(),
	                targetTop = _target$getBoundingCl2.top;

	            var thumbHeight = this.getThumbVerticalHeight();
	            var offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
	            this.view.scrollTop = this.getScrollTopForOffset(offset);
	        }
	    }, {
	        key: 'handleHorizontalThumbMouseDown',
	        value: function handleHorizontalThumbMouseDown(event) {
	            event.preventDefault();
	            this.handleDragStart(event);
	            var target = event.target,
	                clientX = event.clientX;
	            var offsetWidth = target.offsetWidth;

	            var _target$getBoundingCl3 = target.getBoundingClientRect(),
	                left = _target$getBoundingCl3.left;

	            this.prevPageX = offsetWidth - (clientX - left);
	        }
	    }, {
	        key: 'handleVerticalThumbMouseDown',
	        value: function handleVerticalThumbMouseDown(event) {
	            event.preventDefault();
	            this.handleDragStart(event);
	            var target = event.target,
	                clientY = event.clientY;
	            var offsetHeight = target.offsetHeight;

	            var _target$getBoundingCl4 = target.getBoundingClientRect(),
	                top = _target$getBoundingCl4.top;

	            this.prevPageY = offsetHeight - (clientY - top);
	        }
	    }, {
	        key: 'setupDragging',
	        value: function setupDragging() {
	            (0, _domCss2.default)(document.body, _styles.disableSelectStyle);
	            document.addEventListener('mousemove', this.handleDrag);
	            document.addEventListener('mouseup', this.handleDragEnd);
	            document.onselectstart = _returnFalse2.default;
	        }
	    }, {
	        key: 'teardownDragging',
	        value: function teardownDragging() {
	            (0, _domCss2.default)(document.body, _styles.disableSelectStyleReset);
	            document.removeEventListener('mousemove', this.handleDrag);
	            document.removeEventListener('mouseup', this.handleDragEnd);
	            document.onselectstart = undefined;
	        }
	    }, {
	        key: 'handleDragStart',
	        value: function handleDragStart(event) {
	            this.dragging = true;
	            event.stopImmediatePropagation();
	            this.setupDragging();
	        }
	    }, {
	        key: 'handleDrag',
	        value: function handleDrag(event) {
	            if (this.prevPageX) {
	                var clientX = event.clientX;

	                var _trackHorizontal$getB = this.trackHorizontal.getBoundingClientRect(),
	                    trackLeft = _trackHorizontal$getB.left;

	                var thumbWidth = this.getThumbHorizontalWidth();
	                var clickPosition = thumbWidth - this.prevPageX;
	                var offset = -trackLeft + clientX - clickPosition;
	                this.view.scrollLeft = this.getScrollLeftForOffset(offset);
	            }
	            if (this.prevPageY) {
	                var clientY = event.clientY;

	                var _trackVertical$getBou = this.trackVertical.getBoundingClientRect(),
	                    trackTop = _trackVertical$getBou.top;

	                var thumbHeight = this.getThumbVerticalHeight();
	                var _clickPosition = thumbHeight - this.prevPageY;
	                var _offset = -trackTop + clientY - _clickPosition;
	                this.view.scrollTop = this.getScrollTopForOffset(_offset);
	            }
	            return false;
	        }
	    }, {
	        key: 'handleDragEnd',
	        value: function handleDragEnd() {
	            this.dragging = false;
	            this.prevPageX = this.prevPageY = 0;
	            this.teardownDragging();
	            this.handleDragEndAutoHide();
	        }
	    }, {
	        key: 'handleDragEndAutoHide',
	        value: function handleDragEndAutoHide() {
	            var autoHide = this.props.autoHide;

	            if (!autoHide) return;
	            this.hideTracks();
	        }
	    }, {
	        key: 'handleTrackMouseEnter',
	        value: function handleTrackMouseEnter() {
	            this.trackMouseOver = true;
	            this.handleTrackMouseEnterAutoHide();
	        }
	    }, {
	        key: 'handleTrackMouseEnterAutoHide',
	        value: function handleTrackMouseEnterAutoHide() {
	            var autoHide = this.props.autoHide;

	            if (!autoHide) return;
	            this.showTracks();
	        }
	    }, {
	        key: 'handleTrackMouseLeave',
	        value: function handleTrackMouseLeave() {
	            this.trackMouseOver = false;
	            this.handleTrackMouseLeaveAutoHide();
	        }
	    }, {
	        key: 'handleTrackMouseLeaveAutoHide',
	        value: function handleTrackMouseLeaveAutoHide() {
	            var autoHide = this.props.autoHide;

	            if (!autoHide) return;
	            this.hideTracks();
	        }
	    }, {
	        key: 'showTracks',
	        value: function showTracks() {
	            clearTimeout(this.hideTracksTimeout);
	            (0, _domCss2.default)(this.trackHorizontal, { opacity: 1 });
	            (0, _domCss2.default)(this.trackVertical, { opacity: 1 });
	        }
	    }, {
	        key: 'hideTracks',
	        value: function hideTracks() {
	            var _this3 = this;

	            if (this.dragging) return;
	            if (this.scrolling) return;
	            if (this.trackMouseOver) return;
	            var autoHideTimeout = this.props.autoHideTimeout;

	            clearTimeout(this.hideTracksTimeout);
	            this.hideTracksTimeout = setTimeout(function () {
	                (0, _domCss2.default)(_this3.trackHorizontal, { opacity: 0 });
	                (0, _domCss2.default)(_this3.trackVertical, { opacity: 0 });
	            }, autoHideTimeout);
	        }
	    }, {
	        key: 'detectScrolling',
	        value: function detectScrolling() {
	            var _this4 = this;

	            if (this.scrolling) return;
	            this.scrolling = true;
	            this.handleScrollStart();
	            this.detectScrollingInterval = setInterval(function () {
	                if (_this4.lastViewScrollLeft === _this4.viewScrollLeft && _this4.lastViewScrollTop === _this4.viewScrollTop) {
	                    clearInterval(_this4.detectScrollingInterval);
	                    _this4.scrolling = false;
	                    _this4.handleScrollStop();
	                }
	                _this4.lastViewScrollLeft = _this4.viewScrollLeft;
	                _this4.lastViewScrollTop = _this4.viewScrollTop;
	            }, 100);
	        }
	    }, {
	        key: 'raf',
	        value: function raf(callback) {
	            var _this5 = this;

	            if (this.requestFrame) _raf3.default.cancel(this.requestFrame);
	            this.requestFrame = (0, _raf3.default)(function () {
	                _this5.requestFrame = undefined;
	                callback();
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update(callback) {
	            var _this6 = this;

	            this.raf(function () {
	                return _this6._update(callback);
	            });
	        }
	    }, {
	        key: '_update',
	        value: function _update(callback) {
	            var _props4 = this.props,
	                onUpdate = _props4.onUpdate,
	                hideTracksWhenNotNeeded = _props4.hideTracksWhenNotNeeded;

	            var values = this.getValues();
	            if ((0, _getScrollbarWidth2.default)()) {
	                var scrollLeft = values.scrollLeft,
	                    clientWidth = values.clientWidth,
	                    scrollWidth = values.scrollWidth;

	                var trackHorizontalWidth = (0, _getInnerWidth2.default)(this.trackHorizontal);
	                var thumbHorizontalWidth = this.getThumbHorizontalWidth();
	                var thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
	                var thumbHorizontalStyle = {
	                    width: thumbHorizontalWidth,
	                    transform: 'translateX(' + thumbHorizontalX + 'px)'
	                };
	                var scrollTop = values.scrollTop,
	                    clientHeight = values.clientHeight,
	                    scrollHeight = values.scrollHeight;

	                var trackVerticalHeight = (0, _getInnerHeight2.default)(this.trackVertical);
	                var thumbVerticalHeight = this.getThumbVerticalHeight();
	                var thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
	                var thumbVerticalStyle = {
	                    height: thumbVerticalHeight,
	                    transform: 'translateY(' + thumbVerticalY + 'px)'
	                };
	                if (hideTracksWhenNotNeeded) {
	                    var trackHorizontalStyle = {
	                        visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
	                    };
	                    var trackVerticalStyle = {
	                        visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
	                    };
	                    (0, _domCss2.default)(this.trackHorizontal, trackHorizontalStyle);
	                    (0, _domCss2.default)(this.trackVertical, trackVerticalStyle);
	                }
	                (0, _domCss2.default)(this.thumbHorizontal, thumbHorizontalStyle);
	                (0, _domCss2.default)(this.thumbVertical, thumbVerticalStyle);
	            }
	            if (onUpdate) onUpdate(values);
	            if (typeof callback !== 'function') return;
	            callback(values);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this7 = this;

	            var scrollbarWidth = (0, _getScrollbarWidth2.default)();
	            /* eslint-disable no-unused-vars */

	            var _props5 = this.props,
	                onScroll = _props5.onScroll,
	                onScrollFrame = _props5.onScrollFrame,
	                onScrollStart = _props5.onScrollStart,
	                onScrollStop = _props5.onScrollStop,
	                onUpdate = _props5.onUpdate,
	                renderView = _props5.renderView,
	                renderTrackHorizontal = _props5.renderTrackHorizontal,
	                renderTrackVertical = _props5.renderTrackVertical,
	                renderThumbHorizontal = _props5.renderThumbHorizontal,
	                renderThumbVertical = _props5.renderThumbVertical,
	                tagName = _props5.tagName,
	                hideTracksWhenNotNeeded = _props5.hideTracksWhenNotNeeded,
	                autoHide = _props5.autoHide,
	                autoHideTimeout = _props5.autoHideTimeout,
	                autoHideDuration = _props5.autoHideDuration,
	                thumbSize = _props5.thumbSize,
	                thumbMinSize = _props5.thumbMinSize,
	                universal = _props5.universal,
	                autoHeight = _props5.autoHeight,
	                autoHeightMin = _props5.autoHeightMin,
	                autoHeightMax = _props5.autoHeightMax,
	                style = _props5.style,
	                children = _props5.children,
	                props = _objectWithoutProperties(_props5, ['onScroll', 'onScrollFrame', 'onScrollStart', 'onScrollStop', 'onUpdate', 'renderView', 'renderTrackHorizontal', 'renderTrackVertical', 'renderThumbHorizontal', 'renderThumbVertical', 'tagName', 'hideTracksWhenNotNeeded', 'autoHide', 'autoHideTimeout', 'autoHideDuration', 'thumbSize', 'thumbMinSize', 'universal', 'autoHeight', 'autoHeightMin', 'autoHeightMax', 'style', 'children']);
	            /* eslint-enable no-unused-vars */

	            var didMountUniversal = this.state.didMountUniversal;


	            var containerStyle = _extends({}, _styles.containerStyleDefault, autoHeight && _extends({}, _styles.containerStyleAutoHeight, {
	                minHeight: autoHeightMin,
	                maxHeight: autoHeightMax
	            }), style);

	            var viewStyle = _extends({}, _styles.viewStyleDefault, {
	                // Hide scrollbars by setting a negative margin
	                marginRight: scrollbarWidth ? -scrollbarWidth : 0,
	                marginBottom: scrollbarWidth ? -scrollbarWidth : 0
	            }, autoHeight && _extends({}, _styles.viewStyleAutoHeight, {
	                // Add scrollbarWidth to autoHeight in order to compensate negative margins
	                minHeight: (0, _isString2.default)(autoHeightMin) ? 'calc(' + autoHeightMin + ' + ' + scrollbarWidth + 'px)' : autoHeightMin + scrollbarWidth,
	                maxHeight: (0, _isString2.default)(autoHeightMax) ? 'calc(' + autoHeightMax + ' + ' + scrollbarWidth + 'px)' : autoHeightMax + scrollbarWidth
	            }), autoHeight && universal && !didMountUniversal && {
	                minHeight: autoHeightMin,
	                maxHeight: autoHeightMax
	            }, universal && !didMountUniversal && _styles.viewStyleUniversalInitial);

	            var trackAutoHeightStyle = {
	                transition: 'opacity ' + autoHideDuration + 'ms',
	                opacity: 0
	            };

	            var trackHorizontalStyle = _extends({}, _styles.trackHorizontalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
	                display: 'none'
	            });

	            var trackVerticalStyle = _extends({}, _styles.trackVerticalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
	                display: 'none'
	            });

	            return (0, _react.createElement)(tagName, _extends({}, props, { style: containerStyle, ref: function ref(_ref3) {
	                    _this7.container = _ref3;
	                } }), [(0, _react.cloneElement)(renderView({ style: viewStyle }), { key: 'view', ref: function ref(_ref4) {
	                    _this7.view = _ref4;
	                } }, children), (0, _react.cloneElement)(renderTrackHorizontal({ style: trackHorizontalStyle }), { key: 'trackHorizontal', ref: function ref(_ref5) {
	                    _this7.trackHorizontal = _ref5;
	                } }, (0, _react.cloneElement)(renderThumbHorizontal({ style: _styles.thumbHorizontalStyleDefault }), { ref: function ref(_ref6) {
	                    _this7.thumbHorizontal = _ref6;
	                } })), (0, _react.cloneElement)(renderTrackVertical({ style: trackVerticalStyle }), { key: 'trackVertical', ref: function ref(_ref7) {
	                    _this7.trackVertical = _ref7;
	                } }, (0, _react.cloneElement)(renderThumbVertical({ style: _styles.thumbVerticalStyleDefault }), { ref: function ref(_ref8) {
	                    _this7.thumbVertical = _ref8;
	                } }))]);
	        }
	    }]);

	    return Scrollbars;
	}(_react.Component);

	exports.default = Scrollbars;


	Scrollbars.propTypes = {
	    onScroll: _propTypes2.default.func,
	    onScrollFrame: _propTypes2.default.func,
	    onScrollStart: _propTypes2.default.func,
	    onScrollStop: _propTypes2.default.func,
	    onUpdate: _propTypes2.default.func,
	    renderView: _propTypes2.default.func,
	    renderTrackHorizontal: _propTypes2.default.func,
	    renderTrackVertical: _propTypes2.default.func,
	    renderThumbHorizontal: _propTypes2.default.func,
	    renderThumbVertical: _propTypes2.default.func,
	    tagName: _propTypes2.default.string,
	    thumbSize: _propTypes2.default.number,
	    thumbMinSize: _propTypes2.default.number,
	    hideTracksWhenNotNeeded: _propTypes2.default.bool,
	    alwaysShowTracksWhenMouseOver: _propTypes2.default.bool,
	    autoHide: _propTypes2.default.bool,
	    autoHideTimeout: _propTypes2.default.number,
	    autoHideDuration: _propTypes2.default.number,
	    autoHeight: _propTypes2.default.bool,
	    autoHeightMin: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	    autoHeightMax: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	    universal: _propTypes2.default.bool,
	    style: _propTypes2.default.object,
	    children: _propTypes2.default.node
	};

	Scrollbars.defaultProps = {
	    renderView: _defaultRenderElements.renderViewDefault,
	    renderTrackHorizontal: _defaultRenderElements.renderTrackHorizontalDefault,
	    renderTrackVertical: _defaultRenderElements.renderTrackVerticalDefault,
	    renderThumbHorizontal: _defaultRenderElements.renderThumbHorizontalDefault,
	    renderThumbVertical: _defaultRenderElements.renderThumbVerticalDefault,
	    tagName: 'div',
	    thumbMinSize: 30,
	    hideTracksWhenNotNeeded: false,
	    alwaysShowTracksWhenMouseOver: true,
	    autoHide: false,
	    autoHideTimeout: 1000,
	    autoHideDuration: 200,
	    autoHeight: false,
	    autoHeightMin: 0,
	    autoHeightMax: 200,
	    universal: false
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var containerStyleDefault = exports.containerStyleDefault = {
	    position: 'relative',
	    overflow: 'hidden',
	    width: '100%',
	    height: '100%'
	};

	// Overrides containerStyleDefault properties
	var containerStyleAutoHeight = exports.containerStyleAutoHeight = {
	    height: 'auto'
	};

	var viewStyleDefault = exports.viewStyleDefault = {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	    overflow: 'scroll',
	    WebkitOverflowScrolling: 'touch'
	};

	// Overrides viewStyleDefault properties
	var viewStyleAutoHeight = exports.viewStyleAutoHeight = {
	    position: 'relative',
	    top: undefined,
	    left: undefined,
	    right: undefined,
	    bottom: undefined
	};

	var viewStyleUniversalInitial = exports.viewStyleUniversalInitial = {
	    overflow: 'hidden',
	    marginRight: 0,
	    marginBottom: 0
	};

	var trackHorizontalStyleDefault = exports.trackHorizontalStyleDefault = {
	    position: 'absolute',
	    height: 6
	};

	var trackVerticalStyleDefault = exports.trackVerticalStyleDefault = {
	    position: 'absolute',
	    width: 6
	};

	var thumbHorizontalStyleDefault = exports.thumbHorizontalStyleDefault = {
	    position: 'relative',
	    display: 'block',
	    height: '100%'
	};

	var thumbVerticalStyleDefault = exports.thumbVerticalStyleDefault = {
	    position: 'relative',
	    display: 'block',
	    width: '100%'
	};

	var disableSelectStyle = exports.disableSelectStyle = {
	    userSelect: 'none'
	};

	var disableSelectStyleReset = exports.disableSelectStyleReset = {
	    userSelect: ''
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getInnerHeight;
	function getInnerHeight(el) {
	    var clientHeight = el.clientHeight;

	    var _getComputedStyle = getComputedStyle(el),
	        paddingTop = _getComputedStyle.paddingTop,
	        paddingBottom = _getComputedStyle.paddingBottom;

	    return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getInnerWidth;
	function getInnerWidth(el) {
	    var clientWidth = el.clientWidth;

	    var _getComputedStyle = getComputedStyle(el),
	        paddingLeft = _getComputedStyle.paddingLeft,
	        paddingRight = _getComputedStyle.paddingRight;

	    return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getScrollbarWidth;

	var _domCss = __webpack_require__(1);

	var _domCss2 = _interopRequireDefault(_domCss);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var scrollbarWidth = false;

	function getScrollbarWidth() {
	    if (scrollbarWidth !== false) return scrollbarWidth;
	    /* istanbul ignore else */
	    if (typeof document !== 'undefined') {
	        var div = document.createElement('div');
	        (0, _domCss2.default)(div, {
	            width: 100,
	            height: 100,
	            position: 'absolute',
	            top: -9999,
	            overflow: 'scroll',
	            MsOverflowStyle: 'scrollbar'
	        });
	        document.body.appendChild(div);
	        scrollbarWidth = div.offsetWidth - div.clientWidth;
	        document.body.removeChild(div);
	    } else {
	        scrollbarWidth = 0;
	    }
	    return scrollbarWidth || 0;
	}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = isString;
	function isString(maybe) {
	    return typeof maybe === 'string';
	}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = returnFalse;
	function returnFalse() {
	    return false;
	}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
	(function() {
	  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - nodeLoadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    moduleLoadTime = getNanoSeconds();
	    upTime = process.uptime() * 1e9;
	    nodeLoadTime = moduleLoadTime - upTime;
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(this);

	//# sourceMappingURL=performance-now.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	var div = null
	var prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ]

	module.exports = function prefixStyle (prop) {
	  // re-use a dummy div
	  if (!div) {
	    div = document.createElement('div')
	  }

	  var style = div.style

	  // prop exists without prefix
	  if (prop in style) {
	    return prop
	  }

	  // borderRadius -> BorderRadius
	  var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1)

	  // find the vendor-prefixed prop
	  for (var i = prefixes.length; i >= 0; i--) {
	    var name = prefixes[i] + titleCase
	    // e.g. WebkitBorderRadius or webkitBorderRadius
	    if (name in style) {
	      return name
	    }
	  }

	  return false
	}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	if (true) {
	  var invariant = __webpack_require__(4);
	  var warning = __webpack_require__(5);
	  var ReactPropTypesSecret = __webpack_require__(2);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (true) {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(3);
	var invariant = __webpack_require__(4);
	var warning = __webpack_require__(5);

	var ReactPropTypesSecret = __webpack_require__(2);
	var checkPropTypes = __webpack_require__(19);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (true) {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (("development") !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (true) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(20)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = require('./factoryWithThrowingShims')();
	}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(16)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}

	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function() {
	  root.requestAnimationFrame = raf
	  root.cancelAnimationFrame = caf
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	
	var space = __webpack_require__(25)

	/**
	 * Export.
	 */

	module.exports = toCamelCase

	/**
	 * Convert a `string` to camel case.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function toCamelCase(string) {
	  return space(string).replace(/\s(\w)/g, function (matches, letter) {
	    return letter.toUpperCase()
	  })
	}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	
	/**
	 * Export.
	 */

	module.exports = toNoCase

	/**
	 * Test whether a string is camel-case.
	 */

	var hasSpace = /\s/
	var hasSeparator = /(_|-|\.|:)/
	var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

	/**
	 * Remove any starting case from a `string`, like camel or snake, but keep
	 * spaces and punctuation that may be important otherwise.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function toNoCase(string) {
	  if (hasSpace.test(string)) return string.toLowerCase()
	  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
	  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
	  return string.toLowerCase()
	}

	/**
	 * Separator splitter.
	 */

	var separatorSplitter = /[\W_]+(.|$)/g

	/**
	 * Un-separate a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function unseparate(string) {
	  return string.replace(separatorSplitter, function (m, next) {
	    return next ? ' ' + next : ''
	  })
	}

	/**
	 * Camelcase splitter.
	 */

	var camelSplitter = /(.)([A-Z]+)/g

	/**
	 * Un-camelcase a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function uncamelize(string) {
	  return string.replace(camelSplitter, function (m, previous, uppers) {
	    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
	  })
	}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	
	var clean = __webpack_require__(24)

	/**
	 * Export.
	 */

	module.exports = toSpaceCase

	/**
	 * Convert a `string` to space case.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function toSpaceCase(string) {
	  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
	    return match ? ' ' + match : ''
	  }).trim()
	}


/***/ })
/******/ ])
});
;