'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".styles_container__2Myr5 {\n\tdisplay: inline-block;\n\tposition: relative;\n\toverflow: hidden !important;\n\t-webkit-text-size-adjust: none !important;\n}\n\n.styles_backdrop__2g-i9 {\n\tposition: absolute !important;\n\ttop: 0 !important;\n\tright: -99px !important;\n\tbottom: 0 !important;\n\tleft: 0 !important;\n\tpadding-right: 99px !important;\n\toverflow-x: hidden !important;\n\toverflow-y: auto !important;\n}\n\n.styles_highlights__3FFG4 {\n\twidth: auto !important;\n\theight: auto !important;\n\tborder-color: transparent !important;\n\twhite-space: pre-wrap !important;\n\tword-wrap: break-word !important;\n\tcolor: transparent !important;\n\toverflow: hidden !important;\n}\n\n.styles_input__rITaq {\n\tdisplay: block !important;\n\tposition: relative !important;\n\tmargin: 0;\n\tpadding: 0;\n\tborder-radius: 0;\n\tfont: inherit;\n\toverflow-x: hidden !important;\n\toverflow-y: auto !important;\n}\n\n.styles_content__2fBD2 {\n\tborder: 1px solid;\n\tbackground: none transparent !important;\n}\n\n.styles_content__2fBD2 mark {\n\tpadding: 0 !important;\n\tcolor: inherit;\n}";
var styles = {"container":"styles_container__2Myr5","backdrop":"styles_backdrop__2g-i9","highlights":"styles_highlights__3FFG4","input":"styles_input__rITaq","content":"styles_content__2fBD2"};
styleInject(css_248z);

// returns identifier strings that aren't necessarily "real" JavaScript types
function getType(instance) {
  var type = _typeof(instance);

  if (!instance) {
    return 'falsey';
  } else if (Array.isArray(instance)) {
    if (instance.length === 2 && typeof instance[0] === 'number' && typeof instance[1] === 'number') {
      return 'range';
    } else {
      return 'array';
    }
  } else if (type === 'object') {
    if (instance instanceof RegExp) {
      return 'regexp';
    } else if (instance.hasOwnProperty('highlight')) {
      return 'custom';
    }
  } else if (type === 'function' || type === 'string') {
    return type;
  }

  return 'other';
}

function getRanges(input, highlight) {
  var type = getType(highlight);

  switch (type) {
    case 'array':
      return getArrayRanges(input, highlight);

    case 'function':
      return getFunctionRanges(input, highlight);

    case 'regexp':
      return getRegExpRanges(input, highlight);

    case 'string':
      return getStringRanges(input, highlight);

    case 'range':
      return getRangeRanges(input, highlight);

    case 'custom':
      return getCustomRanges(input, highlight);

    default:
      if (!highlight) {
        // do nothing for falsey values
        return [];
      } else {
        console.error('unrecognized highlight type');
      }

  }
}

function getArrayRanges(input, arr) {
  var ranges = arr.map(getRanges.bind(this, input));
  return Array.prototype.concat.apply([], ranges);
}

function getFunctionRanges(input, func) {
  return getRanges(input, func(input));
}

function getRegExpRanges(input, regex) {
  var ranges = [];
  var match;

  while (match = regex.exec(input), match !== null) {
    ranges.push([match.index, match.index + match[0].length]);

    if (!regex.global) {
      // non-global regexes do not increase lastIndex, causing an infinite loop,
      // but we can just break manually after the first match
      break;
    }
  }

  return ranges;
}

function getStringRanges(input, str) {
  var ranges = [];
  var inputLower = input.toLowerCase();
  var strLower = str.toLowerCase();
  var index = 0;

  while (index = inputLower.indexOf(strLower, index), index !== -1) {
    ranges.push([index, index + strLower.length]);
    index += strLower.length;
  }

  return ranges;
}

function getRangeRanges(input, range) {
  return [range];
}

function getCustomRanges(input, custom) {
  var ranges = getRanges(input, custom.highlight);

  if (custom.className) {
    ranges.forEach(function (range) {
      // persist class name as a property of the array
      if (range.className) {
        range.className = custom.className + ' ' + range.className;
      } else {
        range.className = custom.className;
      }
    });
  }

  return ranges;
}

var Span = /*#__PURE__*/function () {
  function Span(text, beginIndex) {
    _classCallCheck(this, Span);

    this.beginIndex = beginIndex;
    this.endIndex = beginIndex + text.length; // Like String.slice, it is inclusive.

    this.text = text;
    this.isMark = false;
    this.markClasses = new Set();
  }

  _createClass(Span, [{
    key: "setMark",
    value: function setMark(className) {
      this.isMark = true;

      if (className) {
        var _iterator = _createForOfIteratorHelper(className.split(' ')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var c = _step.value;
            this.markClasses.add(c);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "carve",
    value: function carve(beginIndex2) {
      // Carves self to take a bit off the right and returns that carving.
      var rightText = this.text.slice(beginIndex2 - this.beginIndex);
      this.text = this.text.slice(0, beginIndex2 - this.beginIndex);
      this.endIndex = beginIndex2;
      var right = new Span(rightText, beginIndex2);
      right.isMark = this.isMark;
      right.markClasses = new Set(_toConsumableArray(this.markClasses));
      return right;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isMark) {
        var className = this.className;

        if (className) {
          return /*#__PURE__*/React__default.createElement("mark", {
            key: this.beginIndex,
            className: className
          }, this.text);
        } else {
          return /*#__PURE__*/React__default.createElement("mark", {
            key: this.beginIndex
          }, this.text);
        }
      } else {
        return /*#__PURE__*/React__default.createElement("span", {
          key: this.beginIndex
        }, this.text);
      }
    }
  }, {
    key: "className",
    get: function get() {
      if (this.markClasses && this.markClasses.size > 0) {
        return _toConsumableArray(this.markClasses).sort().join(" ");
      } else {
        return "";
      }
    }
  }]);

  return Span;
}();

function extractSpansOfClasses(value, ranges) {
  /* Returns value broken into a series of Span classes.  These
   * can be converted to JSX via the render command.
   */
  var spans = [new Span(value, 0)];

  var _iterator2 = _createForOfIteratorHelper(ranges),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var range = _step2.value;
      var beginIndex = range[0];
      var endIndex = range[1];
      var className = range.className;

      for (var i = 0; i < spans.length; i++) {
        var span = spans[i]; // since spans are sorted, So this is always true: beginIndex >= span.beginIndex.

        if (beginIndex < span.endIndex) {
          if (beginIndex == span.beginIndex) {
            if (endIndex < span.endIndex) {
              // [range]
              // [s  p  a  n]
              var span2 = span.carve(endIndex);
              span.setMark(className);
              spans.splice(i + 1, 0, span2);
              beginIndex = endIndex;
              i += 1;
            } else {
              // [range]   or   [r a n g e]
              // [span-]        [span]
              span.setMark(className);
              beginIndex = span.endIndex;
            }
          } else {
            if (endIndex < span.endIndex) {
              //   [range]
              // [s  p  a  n]
              var _span = span.carve(beginIndex);

              var span3 = _span.carve(endIndex);

              _span.setMark(className);

              spans.splice(i + 1, 0, _span, span3);
              beginIndex = endIndex;
              i += 2;
            } else {
              //   [range]  or     [range]
              // [s p a n]       [span]
              var _span2 = span.carve(beginIndex);

              _span2.setMark(className);

              spans.splice(i + 1, 0, _span2);
              beginIndex = _span2.endIndex;
              i += 1;
            }
          }
        }

        if (beginIndex == endIndex) {
          break;
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return spans;
}

var HighlighedContents = function HighlighedContents(_ref) {
  var value = _ref.value,
      highlight = _ref.highlight;
  var ranges = getRanges(value, highlight);
  var parts = extractSpansOfClasses(value, ranges);
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: "".concat(styles.highlights, " ").concat(styles.content)
  }, parts.map(function (part) {
    return part.render();
  })));
};

var HighlightWithinTextarea = function HighlightWithinTextarea(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      _ref$highlight = _ref.highlight,
      highlight = _ref$highlight === void 0 ? {} : _ref$highlight,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$containerStyle = _ref.containerStyle,
      containerStyle = _ref$containerStyle === void 0 ? {} : _ref$containerStyle,
      _ref$containerClassNa = _ref.containerClassName,
      containerClassName = _ref$containerClassNa === void 0 ? "" : _ref$containerClassNa,
      textAreaProps = _objectWithoutProperties(_ref, ["value", "onChange", "highlight", "className", "style", "containerStyle", "containerClassName"]);
  className = "".concat(styles.input, " ").concat(styles.content, " ").concat(className);
  containerClassName = "".concat(styles.container, " ").concat(containerClassName); // To properly work, value and onChange must be supplied.  Give a hint for new users.

  var _useState = React.useState("Please supply a value and an onChange parameter."),
      _useState2 = _slicedToArray(_useState, 2),
      fakeValue = _useState2[0],
      setFakeValue = _useState2[1];

  if (value == undefined) {
    value = fakeValue;

    onChange = function onChange(event) {
      setFakeValue(event.target.value);
    };
  }

  var handleScroll = function handleScroll(event) {
    console.log('handleScroll');
  };

  var blockContainerScroll = function blockContainerScroll(event) {
    console.log('blockContainerScroll');
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: containerClassName,
    style: containerStyle,
    onScroll: blockContainerScroll
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles.backdrop
  }, /*#__PURE__*/React__default.createElement(HighlighedContents, {
    value: value,
    highlight: highlight
  })), /*#__PURE__*/React__default.createElement("textarea", _extends({
    value: value,
    onChange: onChange,
    style: style,
    className: className
  }, textAreaProps, {
    onScroll: handleScroll
  })));
};

exports.HighlightWithinTextarea = HighlightWithinTextarea;
//# sourceMappingURL=index.js.map
