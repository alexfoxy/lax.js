var cssValues;
(function (cssValues) {
    cssValues[cssValues["opacity"] = 0] = "opacity";
    cssValues[cssValues["scaleX"] = 1] = "scaleX";
    cssValues[cssValues["scaleY"] = 2] = "scaleY";
    cssValues[cssValues["scale"] = 3] = "scale";
    cssValues[cssValues["skewX"] = 4] = "skewX";
    cssValues[cssValues["skewY"] = 5] = "skewY";
    cssValues[cssValues["skew"] = 6] = "skew";
    cssValues[cssValues["rotateX"] = 7] = "rotateX";
    cssValues[cssValues["rotateY"] = 8] = "rotateY";
    cssValues[cssValues["rotate"] = 9] = "rotate";
    cssValues[cssValues["translateX"] = 10] = "translateX";
    cssValues[cssValues["translateY"] = 11] = "translateY";
    cssValues[cssValues["translateZ"] = 12] = "translateZ";
    cssValues[cssValues["blur"] = 13] = "blur";
    cssValues[cssValues["hue-rotate"] = 14] = "hue-rotate";
    cssValues[cssValues["brightness"] = 15] = "brightness";
})(cssValues || (cssValues = {}));
(function () {
    var inOutMap = function (y) {
        if (y === void 0) { y = 30; }
        return ["elInY+elHeight", "elCenterY-" + y, "elCenterY", "elCenterY+" + y, "elOutY-elHeight"];
    };
    var laxPresets = {
        fadeInOut: function (y, str) {
            if (y === void 0) { y = 30; }
            if (str === void 0) { str = 0; }
            return ({
                "opacity": [
                    inOutMap(y),
                    [str, 1, 1, 1, str]
                ],
            });
        },
        fadeIn: function (y, str) {
            if (y === void 0) { y = 'elCenterY'; }
            if (str === void 0) { str = 0; }
            return ({
                "opacity": [
                    ["elInY+elHeight", y],
                    [str, 1],
                ],
            });
        },
        fadeOut: function (y, str) {
            if (y === void 0) { y = 'elCenterY'; }
            if (str === void 0) { str = 0; }
            return ({
                "opacity": [
                    [y, "elOutY-elHeight"],
                    [1, str],
                ],
            });
        },
        blurInOut: function (y, str) {
            if (y === void 0) { y = 100; }
            if (str === void 0) { str = 20; }
            return ({
                "blur": [
                    inOutMap(y),
                    [str, 0, 0, 0, str],
                ],
            });
        },
        blurIn: function (y, str) {
            if (y === void 0) { y = 'elCenterY'; }
            if (str === void 0) { str = 20; }
            return ({
                "blur": [
                    ["elInY+elHeight", y],
                    [str, 0],
                ],
            });
        },
        blurOut: function (y, str) {
            if (y === void 0) { y = 'elCenterY'; }
            if (str === void 0) { str = 20; }
            return ({
                "opacity": [
                    [y, "elOutY-elHeight"],
                    [0, str],
                ],
            });
        },
        scaleInOut: function (y, str) {
            if (y === void 0) { y = 100; }
            if (str === void 0) { str = 0.6; }
            return ({
                "scale": [
                    inOutMap(y),
                    [str, 1, 1, 1, str],
                ],
            });
        },
        scaleIn: function (y, str) {
            if (y === void 0) { y = 'elCenterY'; }
            if (str === void 0) { str = 0.6; }
            return ({
                "scale": [
                    ["elInY+elHeight", y],
                    [str, 1],
                ],
            });
        },
        scaleOut: function (y, str) {
            if (y === void 0) { y = 'elCenterY'; }
            if (str === void 0) { str = 0.6; }
            return ({
                "scale": [
                    [y, "elOutY-elHeight"],
                    [1, str],
                ],
            });
        },
        slideX: function (y, str) {
            if (y === void 0) { y = 0; }
            if (str === void 0) { str = 500; }
            return ({
                "translateX": [
                    ['elInY', y],
                    [0, str],
                ],
            });
        },
        slideY: function (y, str) {
            if (y === void 0) { y = 0; }
            if (str === void 0) { str = 500; }
            return ({
                "translateY": [
                    ['elInY', y],
                    [0, str],
                ],
            });
        },
        spin: function (y, str) {
            if (y === void 0) { y = 1000; }
            if (str === void 0) { str = 360; }
            return ({
                "rotate": [
                    [0, y],
                    [0, str],
                    {
                        modValue: y,
                    }
                ],
            });
        },
        flipX: function (y, str) {
            if (y === void 0) { y = 1000; }
            if (str === void 0) { str = 360; }
            return ({
                "rotateX": [
                    [0, y],
                    [0, str],
                    {
                        modValue: y
                    }
                ],
            });
        },
        flipY: function (y, str) {
            if (y === void 0) { y = 1000; }
            if (str === void 0) { str = 360; }
            return ({
                "rotateY": [
                    [0, y],
                    [0, str],
                    {
                        modValue: y
                    }
                ],
            });
        },
        jiggle: function (y, str) {
            if (y === void 0) { y = 50; }
            if (str === void 0) { str = 40; }
            return ({
                "skewX": [
                    [0, y * 1, y * 2, y * 3, y * 4],
                    [0, str, 0, -str, 0],
                    {
                        modValue: y * 4,
                    }
                ],
            });
        },
        seesaw: function (y, str) {
            if (y === void 0) { y = 50; }
            if (str === void 0) { str = 40; }
            return ({
                "skewY": [
                    [0, y * 1, y * 2, y * 3, y * 4],
                    [0, str, 0, -str, 0],
                    {
                        modValue: y * 4,
                    }
                ],
            });
        },
        zigzag: function (y, str) {
            if (y === void 0) { y = 100; }
            if (str === void 0) { str = 100; }
            return ({
                "translateX": [
                    [0, y * 1, y * 2, y * 3, y * 4],
                    [0, str, 0, -str, 0],
                    {
                        modValue: y * 4,
                    }
                ],
            });
        },
        hueRotate: function (y, str) {
            if (y === void 0) { y = 600; }
            if (str === void 0) { str = 360; }
            return ({
                "hue-rotate": [
                    [0, y],
                    [0, str],
                    {
                        modValue: y,
                    }
                ],
            });
        },
    };
    var laxInstance = (function () {
        var transformKeys = ["perspective", "scaleX", "scaleY", "scale", "skewX", "skewY", "skew", "rotateX", "rotateY", "rotate"];
        var filterKeys = ["blur", "hue-rotate", "brightness"];
        var translate3dKeys = ["translateX", "translateY", "translateZ"];
        var pxUnits = ["perspective", "border-radius", "blur", "translateX", "translateY", "translateZ"];
        var degUnits = ["hue-rotate", "rotate", "rotateX", "rotateY", "skew", "skewX", "skewY"];
        function getArrayValues(arr, windowWidth) {
            if (Array.isArray(arr))
                return arr;
            var keys = Object.keys(arr).map(function (x) { return parseInt(x); }).sort(function (a, b) { return a > b ? 1 : -1; });
            var retKey = keys[keys.length - 1];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (windowWidth < key) {
                    retKey = key;
                    break;
                }
            }
            return arr[retKey];
        }
        function lerp(start, end, t) {
            return start * (1 - t) + end * t;
        }
        function invlerp(a, b, v) {
            return (v - a) / (b - a);
        }
        function interpolate(arrA, arrB, v, easingFn) {
            var k = 0;
            arrA.forEach(function (a) {
                if (a < v)
                    k++;
            });
            if (k <= 0) {
                return arrB[0];
            }
            if (k >= arrA.length) {
                return arrB[arrA.length - 1];
            }
            var j = k - 1;
            var vector = invlerp(arrA[j], arrA[k], v);
            if (easingFn)
                vector = easingFn(vector);
            var lerpVal = lerp(arrB[j], arrB[k], vector);
            return lerpVal;
        }
        var easings = {
            easeInQuad: function (t) { return t * t; },
            easeOutQuad: function (t) { return t * (2 - t); },
            easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
            easeInCubic: function (t) { return t * t * t; },
            easeOutCubic: function (t) { return (--t) * t * t + 1; },
            easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
            easeInQuart: function (t) { return t * t * t * t; },
            easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
            easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
            easeInQuint: function (t) { return t * t * t * t * t; },
            easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
            easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; },
            easeOutBounce: function (t) {
                var n1 = 7.5625;
                var d1 = 2.75;
                if (t < 1 / d1) {
                    return n1 * t * t;
                }
                else if (t < 2 / d1) {
                    return n1 * (t -= 1.5 / d1) * t + 0.75;
                }
                else if (t < 2.5 / d1) {
                    return n1 * (t -= 2.25 / d1) * t + 0.9375;
                }
                else {
                    return n1 * (t -= 2.625 / d1) * t + 0.984375;
                }
            },
            easeInBounce: function (t) {
                return 1 - easings.easeOutBounce(1 - t);
            },
            easeOutBack: function (t) {
                var c1 = 1.70158;
                var c3 = c1 + 1;
                return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
            },
            easeInBack: function (t) {
                var c1 = 1.70158;
                var c3 = c1 + 1;
                return c3 * t * t * t - c1 * t * t;
            },
        };
        function flattenStyles(styles) {
            var flattenedStyles = {
                transform: '',
                filter: ''
            };
            var translate3dValues = {
                translateX: 0.00001,
                translateY: 0.00001,
                translateZ: 0.00001
            };
            Object.keys(styles).forEach(function (key) {
                var val = styles[key];
                var unit = pxUnits.includes(key) ? 'px' : (degUnits.includes(key) ? 'deg' : '');
                if (translate3dKeys.includes(key)) {
                    translate3dValues[key] = val;
                }
                else if (transformKeys.includes(key)) {
                    flattenedStyles.transform += key + "(" + val + unit + ") ";
                }
                else if (filterKeys.includes(key)) {
                    flattenedStyles.filter += key + "(" + val + unit + ") ";
                }
                else {
                    flattenedStyles[key] = "" + val + unit + " ";
                }
            });
            flattenedStyles.transform = "translate3d(" + translate3dValues.translateX + "px, " + translate3dValues.translateY + "px, " + translate3dValues.translateZ + "px) " + flattenedStyles.transform;
            return flattenedStyles;
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
        function getScrollPosition() {
            var supportPageOffset = window.pageXOffset !== undefined;
            var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
            var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
            var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
            return [y, x];
        }
        function parseValue(val, _a, index) {
            var width = _a.width, height = _a.height, x = _a.x, y = _a.y;
            if (typeof val === 'number') {
                return val;
            }
            var pageHeight = document.body.scrollHeight;
            var pageWidth = document.body.scrollWidth;
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;
            var _b = getScrollPosition(), scrollTop = _b[0], scrollLeft = _b[1];
            var left = x + scrollLeft;
            var right = left + width;
            var top = y + scrollTop;
            var bottom = top + height;
            return Function("return " + val
                .replace(/screenWidth/g, screenWidth)
                .replace(/screenHeight/g, screenHeight)
                .replace(/pageHeight/g, pageHeight)
                .replace(/pageWidth/g, pageWidth)
                .replace(/elWidth/g, width)
                .replace(/elHeight/g, height)
                .replace(/elInY/g, top - screenHeight)
                .replace(/elOutY/g, bottom)
                .replace(/elCenterY/g, top + (height / 2) - (screenHeight / 2))
                .replace(/elInX/g, left - screenWidth)
                .replace(/elOutX/g, right)
                .replace(/elCenterX/g, left + (width / 2) - (screenWidth / 2))
                .replace(/index/g, index))();
        }
        var LaxDriver = /** @class */ (function () {
            function LaxDriver(name, getValueFn, options) {
                var _this = this;
                if (options === void 0) { options = {}; }
                this.name = '';
                this.lastValue = 0;
                this.frameStep = 1;
                this.m1 = 0;
                this.m2 = 0;
                this.inertia = 0;
                this.inertiaEnabled = false;
                this.getValue = function (frame) {
                    var value = _this.lastValue;
                    if (frame % _this.frameStep === 0) {
                        value = _this.getValueFn(frame);
                    }
                    if (_this.inertiaEnabled) {
                        var delta = value - _this.lastValue;
                        var damping = 0.8;
                        _this.m1 = _this.m1 * damping + delta * (1 - damping);
                        _this.m2 = _this.m2 * damping + _this.m1 * (1 - damping);
                        _this.inertia = Math.round(_this.m2 * 5000) / 15000;
                    }
                    _this.lastValue = value;
                    return [_this.lastValue, _this.inertia];
                };
                this.name = name;
                this.getValueFn = getValueFn;
                Object.keys(options).forEach(function (key) {
                    _this[key] = options[key];
                });
                this.lastValue = this.getValueFn(0);
            }
            return LaxDriver;
        }());
        var LaxElement = /** @class */ (function () {
            function LaxElement(selector, laxInstance, domElement, transformsData, groupIndex, options) {
                var _this = this;
                if (groupIndex === void 0) { groupIndex = 0; }
                if (options === void 0) { options = {}; }
                this.styles = {};
                this.selector = '';
                this.groupIndex = 0;
                this.update = function (driverValues, frame) {
                    var transforms = _this.transforms;
                    var styles = {};
                    for (var driverName in transforms) {
                        var styleBindings = transforms[driverName];
                        if (!driverValues[driverName]) {
                            console.error("No lax driver with name: ", driverName);
                        }
                        var _a = driverValues[driverName], value = _a[0], inertiaValue = _a[1];
                        for (var key in styleBindings) {
                            var _b = styleBindings[key], arr1 = _b[0], arr2 = _b[1], _c = _b[2], options = _c === void 0 ? {} : _c;
                            var modValue = options.modValue, _d = options.frameStep, frameStep = _d === void 0 ? 1 : _d, easing = options.easing, inertia = options.inertia, inertiaMode = options.inertiaMode, cssFn = options.cssFn, _e = options.cssUnit, cssUnit = _e === void 0 ? '' : _e;
                            var easingFn = easings[easing];
                            if (frame % frameStep === 0) {
                                var v = modValue ? value % modValue : value;
                                var interpolatedValue = interpolate(arr1, arr2, v, easingFn);
                                if (inertia) {
                                    var inertiaExtra = inertiaValue * inertia;
                                    if (inertiaMode === 'absolute')
                                        inertiaExtra = Math.abs((inertiaExtra));
                                    interpolatedValue += inertiaExtra;
                                }
                                var unit = cssUnit || pxUnits.includes(key) ? 'px' : (degUnits.includes(key) ? 'deg' : '');
                                var dp = unit === 'px' ? 0 : 3;
                                var val = interpolatedValue.toFixed(dp);
                                styles[key] = cssFn ? cssFn(val, _this.domElement) : val + cssUnit;
                            }
                        }
                    }
                    _this.applyStyles(styles);
                    if (_this.onUpdate)
                        _this.onUpdate(driverValues, _this.domElement);
                };
                this.calculateTransforms = function () {
                    _this.transforms = {};
                    var windowWidth = _this.laxInstance.windowWidth;
                    var _loop_1 = function (driverName) {
                        var styleBindings = _this.transformsData[driverName];
                        var parsedStyleBindings = {};
                        var _a = styleBindings.presets, presets = _a === void 0 ? [] : _a;
                        presets.forEach(function (presetString) {
                            var _a = presetString.split(":"), presetName = _a[0], y = _a[1], str = _a[2];
                            var presetFn = window["lax"].presets[presetName];
                            if (!presetFn) {
                                console.error("Lax preset cannot be found with name: ", presetName);
                            }
                            else {
                                var preset_1 = presetFn(y, str);
                                Object.keys(preset_1).forEach(function (key) {
                                    styleBindings[key] = preset_1[key];
                                });
                            }
                        });
                        delete styleBindings.presets;
                        var _loop_2 = function (key) {
                            var _a = styleBindings[key], _b = _a[0], arr1 = _b === void 0 ? [-1e9, 1e9] : _b, _c = _a[1], arr2 = _c === void 0 ? [-1e9, 1e9] : _c, _d = _a[2], options = _d === void 0 ? {} : _d;
                            var bounds = _this.domElement.getBoundingClientRect();
                            var parsedArr1 = getArrayValues(arr1, windowWidth).map(function (i) { return parseValue(i, bounds, _this.groupIndex); });
                            var parsedArr2 = getArrayValues(arr2, windowWidth).map(function (i) { return parseValue(i, bounds, _this.groupIndex); });
                            parsedStyleBindings[key] = [parsedArr1, parsedArr2, options];
                        };
                        for (var key in styleBindings) {
                            _loop_2(key);
                        }
                        _this.transforms[driverName] = parsedStyleBindings;
                    };
                    for (var driverName in _this.transformsData) {
                        _loop_1(driverName);
                    }
                };
                this.applyStyles = function (styles) {
                    var mergedStyles = flattenStyles(styles);
                    Object.keys(mergedStyles).forEach(function (key) {
                        _this.domElement.style.setProperty(key, mergedStyles[key]);
                    });
                };
                this.selector = selector;
                this.laxInstance = laxInstance;
                this.domElement = domElement;
                this.transformsData = transformsData;
                this.groupIndex = groupIndex;
                var _a = options.style, style = _a === void 0 ? {} : _a, onUpdate = options.onUpdate;
                Object.keys(style).forEach(function (key) {
                    domElement.style.setProperty(key, style[key]);
                });
                if (onUpdate)
                    this.onUpdate = onUpdate;
                this.calculateTransforms();
            }
            return LaxElement;
        }());
        var Lax = /** @class */ (function () {
            function Lax() {
                var _this = this;
                this.drivers = [];
                this.elements = [];
                this.frame = 0;
                this.debug = false;
                this.windowWidth = 0;
                this.windowHeight = 0;
                this.presets = laxPresets;
                this.debugData = {
                    frameLengths: []
                };
                this.init = function () {
                    _this.findAndAddElements();
                    window.requestAnimationFrame(_this.onAnimationFrame);
                    _this.windowWidth = document.body.clientWidth;
                    _this.windowHeight = document.body.clientHeight;
                    window.onresize = _this.onWindowResize;
                };
                this.onWindowResize = function () {
                    var changed = document.body.clientWidth !== _this.windowWidth ||
                        document.body.clientHeight !== _this.windowHeight;
                    if (changed) {
                        _this.windowWidth = document.body.clientWidth;
                        _this.windowHeight = document.body.clientHeight;
                        _this.elements.forEach(function (el) { return el.calculateTransforms(); });
                    }
                };
                this.onAnimationFrame = function (e) {
                    if (_this.debug) {
                        _this.debugData["frameStart"] = Date.now();
                    }
                    var driverValues = {};
                    _this.drivers.forEach(function (driver) {
                        driverValues[driver.name] = driver.getValue(_this.frame);
                    });
                    _this.elements.forEach(function (element) {
                        element.update(driverValues, _this.frame);
                    });
                    if (_this.debug) {
                        _this.debugData.frameLengths.push(Date.now() - _this.debugData["frameStart"]);
                    }
                    if (_this.frame % 60 === 0 && _this.debug) {
                        var averageFrameTime = Math.ceil((_this.debugData.frameLengths.reduce(function (a, b) { return a + b; }, 0) / 60));
                        console.log("Average frame calculation time: " + averageFrameTime + "ms");
                        _this.debugData.frameLengths = [];
                    }
                    _this.frame++;
                    window.requestAnimationFrame(_this.onAnimationFrame);
                };
                this.addDriver = function (name, getValueFn, options) {
                    if (options === void 0) { options = {}; }
                    _this.drivers.push(new LaxDriver(name, getValueFn, options));
                };
                this.removeDriver = function (name) {
                    _this.drivers = _this.drivers.filter(function (driver) { return driver.name !== name; });
                };
                this.findAndAddElements = function () {
                    _this.elements = [];
                    var elements = document.querySelectorAll(".lax");
                    elements.forEach(function (domElement) {
                        var _a;
                        var driverName = "scrollY";
                        var presets = [];
                        domElement.classList.forEach(function (className) {
                            if (className.includes("lax_preset")) {
                                var preset = className.replace("lax_preset_", "");
                                presets.push(preset);
                            }
                        });
                        var transforms = (_a = {},
                            _a[driverName] = {
                                presets: presets
                            },
                            _a);
                        _this.elements.push(new LaxElement('.lax', _this, domElement, transforms, 0));
                    });
                };
                this.addElements = function (selector, transforms, options) {
                    var domElements = document.querySelectorAll(selector);
                    domElements.forEach(function (domElement, i) {
                        _this.elements.push(new LaxElement(selector, _this, domElement, transforms, i, options));
                    });
                };
                this.removeElements = function (selector) {
                    _this.elements = _this.elements.filter(function (element) { return element.selector !== selector; });
                };
                this.addElement = function (domElement, transforms, options) {
                    _this.elements.push(new LaxElement('', _this, domElement, transforms, 0, options));
                };
                this.removeElement = function (domElement) {
                    _this.elements = _this.elements.filter(function (element) { return element.domElement !== domElement; });
                };
            }
            return Lax;
        }());
        return new Lax();
    })();
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = laxInstance;
    else
        window["lax"] = laxInstance;
})();
//# sourceMappingURL=lax.js.map