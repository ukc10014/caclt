(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["issue"], {
        "0a49": function(t, e, i) {
            var n = i("9b43"),
                s = i("626a"),
                o = i("4bf8"),
                l = i("9def"),
                r = i("cd1c");
            t.exports = function(t, e) {
                var i = 1 == t,
                    a = 2 == t,
                    c = 3 == t,
                    h = 4 == t,
                    u = 6 == t,
                    d = 5 == t || u,
                    g = e || r;
                return function(e, r, p) {
                    for (var f, v, m = o(e), y = s(m), b = n(r, p, 3), x = l(y.length), w = 0, S = i ? g(e, x) : a ? g(e, 0) : void 0; x > w; w++)
                        if ((d || w in y) && (f = y[w], v = b(f, w, m), t))
                            if (i) S[w] = v;
                            else if (v) switch (t) {
                        case 3:
                            return !0;
                        case 5:
                            return f;
                        case 6:
                            return w;
                        case 2:
                            S.push(f)
                    } else if (h) return !1;
                    return u ? -1 : c || h ? h : S
                }
            }
        },
        "103f": function(t, e, i) {},
        "17a4": function(t, e, i) {
            "use strict";
            var n = function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("span", {
                        staticClass: "cursor-pointer",
                        on: {
                            click: t.doCopy
                        }
                    }, [t.copied ? i("span", [t._v("Link Copied")]) : i("span", [t._v("Share")])])
                },
                s = [],
                o = {
                    name: "Share",
                    data: function() {
                        return {
                            copied: !1
                        }
                    },
                    methods: {
                        doCopy: function() {
                            var t = this;
                            this.$copyText(document.location.href).then((function() {
                                t.copied = !0, window.setTimeout((function() {
                                    t.copied = !1
                                }), 3e3)
                            }), (function() {
                                alert("Can not copy")
                            }))
                        }
                    }
                },
                l = o,
                r = i("2877"),
                a = Object(r["a"])(l, n, s, !1, null, null, null);
            e["a"] = a.exports
        },
        "337d": function(t, e, i) {
            t.exports = i.p + "img/arrow-left.841b024b.svg"
        },
        "52df": function(t, e, i) {},
        "62ea": function(t, e, i) {},
        "685b": function(t, e, i) {},
        7514: function(t, e, i) {
            "use strict";
            var n = i("5ca1"),
                s = i("0a49")(5),
                o = "find",
                l = !0;
            o in [] && Array(1)[o]((function() {
                l = !1
            })), n(n.P + n.F * l, "Array", {
                find: function(t) {
                    return s(this, t, arguments.length > 1 ? arguments[1] : void 0)
                }
            }), i("9c6c")(o)
        },
        "7b60": function(t, e, i) {
            ! function(e, i) {
                t.exports = i()
            }(0, (function() {
                "use strict";

                function t(e) {
                    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    })(e)
                }

                function e(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }

                function n(t, e, n) {
                    return e && i(t.prototype, e), n && i(t, n), t
                }

                function s(t) {
                    return function(t) {
                        if (Array.isArray(t)) return o(t)
                    }(t) || function(t) {
                        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
                    }(t) || function(t, e) {
                        if (t) {
                            if ("string" == typeof t) return o(t, e);
                            var i = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? o(t, e) : void 0
                        }
                    }(t) || function() {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()
                }

                function o(t, e) {
                    (null == e || e > t.length) && (e = t.length);
                    for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
                    return n
                }
                var l = Date.now();

                function r() {
                    var t = {},
                        e = !0,
                        i = 0,
                        n = arguments.length;
                    "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], i++);
                    for (var s = function(i) {
                            for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e && "[object Object]" === Object.prototype.toString.call(i[n]) ? t[n] = r(!0, t[n], i[n]) : t[n] = i[n])
                        }; i < n; i++) {
                        var o = arguments[i];
                        s(o)
                    }
                    return t
                }

                function a(t, e) {
                    if ((A(t) || t === window || t === document) && (t = [t]), L(t) || M(t) || (t = [t]), 0 != z(t))
                        if (L(t) && !M(t))
                            for (var i = t.length, n = 0; n < i && !1 !== e.call(t[n], t[n], n, t); n++);
                        else if (M(t))
                        for (var s in t)
                            if (I(t, s) && !1 === e.call(t[s], t[s], s, t)) break
                }

                function c(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                        n = t[l] = t[l] || [],
                        s = {
                            all: n,
                            evt: null,
                            found: null
                        };
                    return e && i && z(n) > 0 && a(n, (function(t, n) {
                        if (t.eventName == e && t.fn.toString() == i.toString()) return s.found = !0, s.evt = n, !1
                    })), s
                }

                function h(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = e.onElement,
                        n = e.withCallback,
                        s = e.avoidDuplicate,
                        o = void 0 === s || s,
                        l = e.once,
                        r = void 0 !== l && l,
                        h = e.useCapture,
                        u = void 0 !== h && h,
                        d = arguments.length > 2 ? arguments[2] : void 0,
                        g = i || [];

                    function p(t) {
                        C(n) && n.call(d, t, this), r && p.destroy()
                    }
                    return E(g) && (g = document.querySelectorAll(g)), p.destroy = function() {
                        a(g, (function(e) {
                            var i = c(e, t, p);
                            i.found && i.all.splice(i.evt, 1), e.removeEventListener && e.removeEventListener(t, p, u)
                        }))
                    }, a(g, (function(e) {
                        var i = c(e, t, p);
                        (e.addEventListener && o && !i.found || !o) && (e.addEventListener(t, p, u), i.all.push({
                            eventName: t,
                            fn: p
                        }))
                    })), p
                }

                function u(t, e) {
                    a(e.split(" "), (function(e) {
                        return t.classList.add(e)
                    }))
                }

                function d(t, e) {
                    a(e.split(" "), (function(e) {
                        return t.classList.remove(e)
                    }))
                }

                function g(t, e) {
                    return t.classList.contains(e)
                }

                function p(t, e) {
                    for (; t !== document.body;) {
                        if (!(t = t.parentElement)) return !1;
                        if ("function" == typeof t.matches ? t.matches(e) : t.msMatchesSelector(e)) return t
                    }
                }

                function f(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    if (!t || "" === e) return !1;
                    if ("none" == e) return C(i) && i(), !1;
                    var n = w(),
                        s = e.split(" ");
                    a(s, (function(e) {
                        u(t, "g" + e)
                    })), h(n, {
                        onElement: t,
                        avoidDuplicate: !1,
                        once: !0,
                        withCallback: function(t, e) {
                            a(s, (function(t) {
                                d(e, "g" + t)
                            })), C(i) && i()
                        }
                    })
                }

                function v(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                    if ("" == e) return t.style.webkitTransform = "", t.style.MozTransform = "", t.style.msTransform = "", t.style.OTransform = "", t.style.transform = "", !1;
                    t.style.webkitTransform = e, t.style.MozTransform = e, t.style.msTransform = e, t.style.OTransform = e, t.style.transform = e
                }

                function m(t) {
                    t.style.display = "block"
                }

                function y(t) {
                    t.style.display = "none"
                }

                function b(t) {
                    var e = document.createDocumentFragment(),
                        i = document.createElement("div");
                    for (i.innerHTML = t; i.firstChild;) e.appendChild(i.firstChild);
                    return e
                }

                function x() {
                    return {
                        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                    }
                }

                function w() {
                    var t, e = document.createElement("fakeelement"),
                        i = {
                            animation: "animationend",
                            OAnimation: "oAnimationEnd",
                            MozAnimation: "animationend",
                            WebkitAnimation: "webkitAnimationEnd"
                        };
                    for (t in i)
                        if (void 0 !== e.style[t]) return i[t]
                }

                function S(t, e, i, n) {
                    if (t()) e();
                    else {
                        var s;
                        i || (i = 100);
                        var o = setInterval((function() {
                            t() && (clearInterval(o), s && clearTimeout(s), e())
                        }), i);
                        n && (s = setTimeout((function() {
                            clearInterval(o)
                        }), n))
                    }
                }

                function k(t, e, i) {
                    if (O(t)) console.error("Inject videos api error");
                    else {
                        var n;
                        if (C(e) && (i = e, e = !1), -1 !== t.indexOf(".css")) {
                            if ((n = document.querySelectorAll('link[href="' + t + '"]')) && n.length > 0) return void(C(i) && i());
                            var s = document.getElementsByTagName("head")[0],
                                o = s.querySelectorAll('link[rel="stylesheet"]'),
                                l = document.createElement("link");
                            return l.rel = "stylesheet", l.type = "text/css", l.href = t, l.media = "all", o ? s.insertBefore(l, o[0]) : s.appendChild(l), void(C(i) && i())
                        }
                        if ((n = document.querySelectorAll('script[src="' + t + '"]')) && n.length > 0) {
                            if (C(i)) {
                                if (E(e)) return S((function() {
                                    return void 0 !== window[e]
                                }), (function() {
                                    i()
                                })), !1;
                                i()
                            }
                        } else {
                            var r = document.createElement("script");
                            r.type = "text/javascript", r.src = t, r.onload = function() {
                                if (C(i)) {
                                    if (E(e)) return S((function() {
                                        return void 0 !== window[e]
                                    }), (function() {
                                        i()
                                    })), !1;
                                    i()
                                }
                            }, document.body.appendChild(r)
                        }
                    }
                }

                function T() {
                    return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)
                }

                function C(t) {
                    return "function" == typeof t
                }

                function E(t) {
                    return "string" == typeof t
                }

                function A(t) {
                    return !(!t || !t.nodeType || 1 != t.nodeType)
                }

                function _(t) {
                    return Array.isArray(t)
                }

                function L(t) {
                    return t && t.length && isFinite(t.length)
                }

                function M(e) {
                    return "object" === t(e) && null != e && !C(e) && !_(e)
                }

                function O(t) {
                    return null == t
                }

                function I(t, e) {
                    return null !== t && hasOwnProperty.call(t, e)
                }

                function z(t) {
                    if (M(t)) {
                        if (t.keys) return t.keys().length;
                        var e = 0;
                        for (var i in t) I(t, i) && e++;
                        return e
                    }
                    return t.length
                }

                function q(t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                }

                function P(t) {
                    if (t.events.hasOwnProperty("keyboard")) return !1;
                    t.events.keyboard = h("keydown", {
                        onElement: window,
                        withCallback: function(e, i) {
                            var n = (e = e || window.event).keyCode;
                            if (9 == n) {
                                var o = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
                                if ("input" == o || "textarea" == o || "button" == o) return;
                                e.preventDefault();
                                var l = document.querySelectorAll(".gbtn");
                                if (!l || l.length <= 0) return;
                                var r = s(l).filter((function(t) {
                                    return g(t, "focused")
                                }));
                                if (!r.length) {
                                    var a = document.querySelector('.gbtn[tabindex="0"]');
                                    return void(a && (a.focus(), u(a, "focused")))
                                }
                                l.forEach((function(t) {
                                    return d(t, "focused")
                                }));
                                var c = r[0].getAttribute("tabindex");
                                c = c || "0";
                                var h = parseInt(c) + 1;
                                h > l.length - 1 && (h = "0");
                                var p = document.querySelector('.gbtn[tabindex="'.concat(h, '"]'));
                                p && (p.focus(), u(p, "focused"))
                            }
                            39 == n && t.nextSlide(), 37 == n && t.prevSlide(), 27 == n && t.close()
                        }
                    })
                }

                function X(t) {
                    return Math.sqrt(t.x * t.x + t.y * t.y)
                }

                function Y(t, e) {
                    var i = function(t, e) {
                        var i = X(t) * X(e);
                        if (0 === i) return 0;
                        var n = function(t, e) {
                            return t.x * e.x + t.y * e.y
                        }(t, e) / i;
                        return n > 1 && (n = 1), Math.acos(n)
                    }(t, e);
                    return function(t, e) {
                        return t.x * e.y - e.x * t.y
                    }(t, e) > 0 && (i *= -1), 180 * i / Math.PI
                }
                var D = function() {
                    function t(i) {
                        e(this, t), this.handlers = [], this.el = i
                    }
                    return n(t, [{
                        key: "add",
                        value: function(t) {
                            this.handlers.push(t)
                        }
                    }, {
                        key: "del",
                        value: function(t) {
                            t || (this.handlers = []);
                            for (var e = this.handlers.length; e >= 0; e--) this.handlers[e] === t && this.handlers.splice(e, 1)
                        }
                    }, {
                        key: "dispatch",
                        value: function() {
                            for (var t = 0, e = this.handlers.length; t < e; t++) {
                                var i = this.handlers[t];
                                "function" == typeof i && i.apply(this.el, arguments)
                            }
                        }
                    }]), t
                }();

                function N(t, e) {
                    var i = new D(t);
                    return i.add(e), i
                }
                var B = function() {
                    function t(i, n) {
                        e(this, t), this.element = "string" == typeof i ? document.querySelector(i) : i, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
                            x: null,
                            y: null
                        }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
                        var s = function() {};
                        this.rotate = N(this.element, n.rotate || s), this.touchStart = N(this.element, n.touchStart || s), this.multipointStart = N(this.element, n.multipointStart || s), this.multipointEnd = N(this.element, n.multipointEnd || s), this.pinch = N(this.element, n.pinch || s), this.swipe = N(this.element, n.swipe || s), this.tap = N(this.element, n.tap || s), this.doubleTap = N(this.element, n.doubleTap || s), this.longTap = N(this.element, n.longTap || s), this.singleTap = N(this.element, n.singleTap || s), this.pressMove = N(this.element, n.pressMove || s), this.twoFingerPressMove = N(this.element, n.twoFingerPressMove || s), this.touchMove = N(this.element, n.touchMove || s), this.touchEnd = N(this.element, n.touchEnd || s), this.touchCancel = N(this.element, n.touchCancel || s), this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
                            x: null,
                            y: null
                        }
                    }
                    return n(t, [{
                        key: "start",
                        value: function(t) {
                            if (t.touches) {
                                this.now = Date.now(), this.x1 = t.touches[0].pageX, this.y1 = t.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(t, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
                                var e = this.preV;
                                if (t.touches.length > 1) {
                                    this._cancelLongTap(), this._cancelSingleTap();
                                    var i = {
                                        x: t.touches[1].pageX - this.x1,
                                        y: t.touches[1].pageY - this.y1
                                    };
                                    e.x = i.x, e.y = i.y, this.pinchStartLen = X(e), this.multipointStart.dispatch(t, this.element)
                                }
                                this._preventTap = !1, this.longTapTimeout = setTimeout(function() {
                                    this.longTap.dispatch(t, this.element), this._preventTap = !0
                                }.bind(this), 750)
                            }
                        }
                    }, {
                        key: "move",
                        value: function(t) {
                            if (t.touches) {
                                var e = this.preV,
                                    i = t.touches.length,
                                    n = t.touches[0].pageX,
                                    s = t.touches[0].pageY;
                                if (this.isDoubleTap = !1, i > 1) {
                                    var o = t.touches[1].pageX,
                                        l = t.touches[1].pageY,
                                        r = {
                                            x: t.touches[1].pageX - n,
                                            y: t.touches[1].pageY - s
                                        };
                                    null !== e.x && (this.pinchStartLen > 0 && (t.zoom = X(r) / this.pinchStartLen, this.pinch.dispatch(t, this.element)), t.angle = Y(r, e), this.rotate.dispatch(t, this.element)), e.x = r.x, e.y = r.y, null !== this.x2 && null !== this.sx2 ? (t.deltaX = (n - this.x2 + o - this.sx2) / 2, t.deltaY = (s - this.y2 + l - this.sy2) / 2) : (t.deltaX = 0, t.deltaY = 0), this.twoFingerPressMove.dispatch(t, this.element), this.sx2 = o, this.sy2 = l
                                } else {
                                    if (null !== this.x2) {
                                        t.deltaX = n - this.x2, t.deltaY = s - this.y2;
                                        var a = Math.abs(this.x1 - this.x2),
                                            c = Math.abs(this.y1 - this.y2);
                                        (a > 10 || c > 10) && (this._preventTap = !0)
                                    } else t.deltaX = 0, t.deltaY = 0;
                                    this.pressMove.dispatch(t, this.element)
                                }
                                this.touchMove.dispatch(t, this.element), this._cancelLongTap(), this.x2 = n, this.y2 = s, i > 1 && t.preventDefault()
                            }
                        }
                    }, {
                        key: "end",
                        value: function(t) {
                            if (t.changedTouches) {
                                this._cancelLongTap();
                                var e = this;
                                t.touches.length < 2 && (this.multipointEnd.dispatch(t, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (t.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout((function() {
                                    e.swipe.dispatch(t, e.element)
                                }), 0)) : (this.tapTimeout = setTimeout((function() {
                                    e._preventTap || e.tap.dispatch(t, e.element), e.isDoubleTap && (e.doubleTap.dispatch(t, e.element), e.isDoubleTap = !1)
                                }), 0), e.isDoubleTap || (e.singleTapTimeout = setTimeout((function() {
                                    e.singleTap.dispatch(t, e.element)
                                }), 250))), this.touchEnd.dispatch(t, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null
                            }
                        }
                    }, {
                        key: "cancelAll",
                        value: function() {
                            this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout)
                        }
                    }, {
                        key: "cancel",
                        value: function(t) {
                            this.cancelAll(), this.touchCancel.dispatch(t, this.element)
                        }
                    }, {
                        key: "_cancelLongTap",
                        value: function() {
                            clearTimeout(this.longTapTimeout)
                        }
                    }, {
                        key: "_cancelSingleTap",
                        value: function() {
                            clearTimeout(this.singleTapTimeout)
                        }
                    }, {
                        key: "_swipeDirection",
                        value: function(t, e, i, n) {
                            return Math.abs(t - e) >= Math.abs(i - n) ? t - e > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down"
                        }
                    }, {
                        key: "on",
                        value: function(t, e) {
                            this[t] && this[t].add(e)
                        }
                    }, {
                        key: "off",
                        value: function(t, e) {
                            this[t] && this[t].del(e)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null
                        }
                    }]), t
                }();

                function H(t) {
                    var e = function() {
                            var t, e = document.createElement("fakeelement"),
                                i = {
                                    transition: "transitionend",
                                    OTransition: "oTransitionEnd",
                                    MozTransition: "transitionend",
                                    WebkitTransition: "webkitTransitionEnd"
                                };
                            for (t in i)
                                if (void 0 !== e.style[t]) return i[t]
                        }(),
                        i = g(t, "gslide-media") ? t : t.querySelector(".gslide-media"),
                        n = t.querySelector(".gslide-description");
                    u(i, "greset"), v(i, "translate3d(0, 0, 0)"), h(e, {
                        onElement: i,
                        once: !0,
                        withCallback: function(t, e) {
                            d(i, "greset")
                        }
                    }), i.style.opacity = "", n && (n.style.opacity = "")
                }

                function $(t) {
                    if (t.events.hasOwnProperty("touch")) return !1;
                    var e, i, n, s = x(),
                        o = s.width,
                        l = s.height,
                        r = !1,
                        a = null,
                        c = null,
                        h = null,
                        f = !1,
                        m = 1,
                        y = 1,
                        b = !1,
                        w = !1,
                        S = null,
                        k = null,
                        T = null,
                        C = null,
                        E = 0,
                        A = 0,
                        _ = !1,
                        L = !1,
                        M = {},
                        O = {},
                        I = 0,
                        z = 0,
                        q = document.getElementById("glightbox-slider"),
                        P = document.querySelector(".goverlay"),
                        X = new B(q, {
                            touchStart: function(e) {
                                if (g(e.targetTouches[0].target, "ginner-container") || p(e.targetTouches[0].target, ".gslide-desc")) return r = !1, !1;
                                r = !0, O = e.targetTouches[0], M.pageX = e.targetTouches[0].pageX, M.pageY = e.targetTouches[0].pageY, I = e.targetTouches[0].clientX, z = e.targetTouches[0].clientY, a = t.activeSlide, c = a.querySelector(".gslide-media"), n = a.querySelector(".gslide-inline"), h = null, g(c, "gslide-image") && (h = c.querySelector("img")), d(P, "greset")
                            },
                            touchMove: function(s) {
                                if (r && (O = s.targetTouches[0], !b && !w)) {
                                    if (n && n.offsetHeight > l) {
                                        var a = M.pageX - O.pageX;
                                        if (Math.abs(a) <= 13) return !1
                                    }
                                    f = !0;
                                    var u, d = s.targetTouches[0].clientX,
                                        g = s.targetTouches[0].clientY,
                                        p = I - d,
                                        m = z - g;
                                    if (Math.abs(p) > Math.abs(m) ? (_ = !1, L = !0) : (L = !1, _ = !0), e = O.pageX - M.pageX, E = 100 * e / o, i = O.pageY - M.pageY, A = 100 * i / l, _ && h && (u = 1 - Math.abs(i) / l, P.style.opacity = u, t.settings.touchFollowAxis && (E = 0)), L && (u = 1 - Math.abs(e) / o, c.style.opacity = u, t.settings.touchFollowAxis && (A = 0)), !h) return v(c, "translate3d(".concat(E, "%, 0, 0)"));
                                    v(c, "translate3d(".concat(E, "%, ").concat(A, "%, 0)"))
                                }
                            },
                            touchEnd: function() {
                                if (r) {
                                    if (f = !1, w || b) return T = S, void(C = k);
                                    var e = Math.abs(parseInt(A)),
                                        i = Math.abs(parseInt(E));
                                    if (!(e > 29 && h)) return e < 29 && i < 25 ? (u(P, "greset"), P.style.opacity = 1, H(c)) : void 0;
                                    t.close()
                                }
                            },
                            multipointEnd: function() {
                                setTimeout((function() {
                                    b = !1
                                }), 50)
                            },
                            multipointStart: function() {
                                b = !0, m = y || 1
                            },
                            pinch: function(t) {
                                if (!h || f) return !1;
                                b = !0, h.scaleX = h.scaleY = m * t.zoom;
                                var e = m * t.zoom;
                                if (w = !0, e <= 1) return w = !1, e = 1, C = null, T = null, S = null, k = null, void h.setAttribute("style", "");
                                e > 4.5 && (e = 4.5), h.style.transform = "scale3d(".concat(e, ", ").concat(e, ", 1)"), y = e
                            },
                            pressMove: function(t) {
                                if (w && !b) {
                                    var e = O.pageX - M.pageX,
                                        i = O.pageY - M.pageY;
                                    T && (e += T), C && (i += C), S = e, k = i;
                                    var n = "translate3d(".concat(e, "px, ").concat(i, "px, 0)");
                                    y && (n += " scale3d(".concat(y, ", ").concat(y, ", 1)")), v(h, n)
                                }
                            },
                            swipe: function(e) {
                                if (!w)
                                    if (b) b = !1;
                                    else {
                                        if ("Left" == e.direction) {
                                            if (t.index == t.elements.length - 1) return H(c);
                                            t.nextSlide()
                                        }
                                        if ("Right" == e.direction) {
                                            if (0 == t.index) return H(c);
                                            t.prevSlide()
                                        }
                                    }
                            }
                        });
                    t.events.touch = X
                }
                var j = function() {
                        function t(i, n) {
                            var s = this,
                                o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                            if (e(this, t), this.img = i, this.slide = n, this.onclose = o, this.img.setZoomEvents) return !1;
                            this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", (function(t) {
                                return s.dragStart(t)
                            }), !1), this.img.addEventListener("mouseup", (function(t) {
                                return s.dragEnd(t)
                            }), !1), this.img.addEventListener("mousemove", (function(t) {
                                return s.drag(t)
                            }), !1), this.img.addEventListener("click", (function(t) {
                                return s.slide.classList.contains("dragging-nav") ? (s.zoomOut(), !1) : s.zoomedIn ? void(s.zoomedIn && !s.dragging && s.zoomOut()) : s.zoomIn()
                            }), !1), this.img.setZoomEvents = !0
                        }
                        return n(t, [{
                            key: "zoomIn",
                            value: function() {
                                var t = this.widowWidth();
                                if (!(this.zoomedIn || t <= 768)) {
                                    var e = this.img;
                                    if (e.setAttribute("data-style", e.getAttribute("style")), e.style.maxWidth = e.naturalWidth + "px", e.style.maxHeight = e.naturalHeight + "px", e.naturalWidth > t) {
                                        var i = t / 2 - e.naturalWidth / 2;
                                        this.setTranslate(this.img.parentNode, i, 0)
                                    }
                                    this.slide.classList.add("zoomed"), this.zoomedIn = !0
                                }
                            }
                        }, {
                            key: "zoomOut",
                            value: function() {
                                this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose()
                            }
                        }, {
                            key: "dragStart",
                            value: function(t) {
                                t.preventDefault(), this.zoomedIn ? ("touchstart" === t.type ? (this.initialX = t.touches[0].clientX - this.xOffset, this.initialY = t.touches[0].clientY - this.yOffset) : (this.initialX = t.clientX - this.xOffset, this.initialY = t.clientY - this.yOffset), t.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1
                            }
                        }, {
                            key: "dragEnd",
                            value: function(t) {
                                var e = this;
                                t.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout((function() {
                                    e.dragging = !1, e.img.isDragging = !1, e.img.classList.remove("dragging")
                                }), 100)
                            }
                        }, {
                            key: "drag",
                            value: function(t) {
                                this.active && (t.preventDefault(), "touchmove" === t.type ? (this.currentX = t.touches[0].clientX - this.initialX, this.currentY = t.touches[0].clientY - this.initialY) : (this.currentX = t.clientX - this.initialX, this.currentY = t.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY))
                            }
                        }, {
                            key: "onMove",
                            value: function(t) {
                                if (this.zoomedIn) {
                                    var e = t.clientX - this.img.naturalWidth / 2,
                                        i = t.clientY - this.img.naturalHeight / 2;
                                    this.setTranslate(this.img, e, i)
                                }
                            }
                        }, {
                            key: "setTranslate",
                            value: function(t, e, i) {
                                t.style.transform = "translate3d(" + e + "px, " + i + "px, 0)"
                            }
                        }, {
                            key: "widowWidth",
                            value: function() {
                                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                            }
                        }]), t
                    }(),
                    W = function() {
                        function t() {
                            var i = this,
                                n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            e(this, t);
                            var s = n.dragEl,
                                o = n.toleranceX,
                                l = void 0 === o ? 40 : o,
                                r = n.toleranceY,
                                a = void 0 === r ? 65 : r,
                                c = n.slide,
                                h = void 0 === c ? null : c,
                                u = n.instance,
                                d = void 0 === u ? null : u;
                            this.el = s, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = l, this.toleranceY = a, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = h, this.instance = d, this.el.addEventListener("mousedown", (function(t) {
                                return i.dragStart(t)
                            }), !1), this.el.addEventListener("mouseup", (function(t) {
                                return i.dragEnd(t)
                            }), !1), this.el.addEventListener("mousemove", (function(t) {
                                return i.drag(t)
                            }), !1)
                        }
                        return n(t, [{
                            key: "dragStart",
                            value: function(t) {
                                if (this.slide.classList.contains("zoomed")) this.active = !1;
                                else {
                                    "touchstart" === t.type ? (this.initialX = t.touches[0].clientX - this.xOffset, this.initialY = t.touches[0].clientY - this.yOffset) : (this.initialX = t.clientX - this.xOffset, this.initialY = t.clientY - this.yOffset);
                                    var e = t.target.nodeName.toLowerCase();
                                    t.target.classList.contains("nodrag") || p(t.target, ".nodrag") || -1 !== ["input", "select", "textarea", "button", "a"].indexOf(e) ? this.active = !1 : (t.preventDefault(), (t.target === this.el || "img" !== e && p(t.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = p(t.target, ".ginner-container")))
                                }
                            }
                        }, {
                            key: "dragEnd",
                            value: function(t) {
                                var e = this;
                                t && t.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, "right" == this.doSlideChange && this.instance.prevSlide(), "left" == this.doSlideChange && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout((function() {
                                    e.instance.preventOutsideClick = !1, e.toleranceReached = !1, e.lastDirection = null, e.dragging = !1, e.el.isDragging = !1, e.el.classList.remove("dragging"), e.slide.classList.remove("dragging-nav"), e.dragContainer.style.transform = "", e.dragContainer.style.transition = ""
                                }), 100)
                            }
                        }, {
                            key: "drag",
                            value: function(t) {
                                if (this.active) {
                                    t.preventDefault(), this.slide.classList.add("dragging-nav"), "touchmove" === t.type ? (this.currentX = t.touches[0].clientX - this.initialX, this.currentY = t.touches[0].clientY - this.initialY) : (this.currentX = t.clientX - this.initialX, this.currentY = t.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
                                    var e = Math.abs(this.currentX),
                                        i = Math.abs(this.currentY);
                                    if (e > 0 && e >= Math.abs(this.currentY) && (!this.lastDirection || "x" == this.lastDirection)) {
                                        this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
                                        var n = this.shouldChange();
                                        if (!this.instance.settings.dragAutoSnap && n && (this.doSlideChange = n), this.instance.settings.dragAutoSnap && n) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), "right" == n && this.instance.prevSlide(), void("left" == n && this.instance.nextSlide())
                                    }
                                    if (this.toleranceY > 0 && i > 0 && i >= e && (!this.lastDirection || "y" == this.lastDirection)) {
                                        this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
                                        var s = this.shouldClose();
                                        return !this.instance.settings.dragAutoSnap && s && (this.doSlideClose = !0), void(this.instance.settings.dragAutoSnap && s && this.instance.close())
                                    }
                                }
                            }
                        }, {
                            key: "shouldChange",
                            value: function() {
                                var t = !1;
                                if (Math.abs(this.currentX) >= this.toleranceX) {
                                    var e = this.currentX > 0 ? "right" : "left";
                                    ("left" == e && this.slide !== this.slide.parentNode.lastChild || "right" == e && this.slide !== this.slide.parentNode.firstChild) && (t = e)
                                }
                                return t
                            }
                        }, {
                            key: "shouldClose",
                            value: function() {
                                var t = !1;
                                return Math.abs(this.currentY) >= this.toleranceY && (t = !0), t
                            }
                        }, {
                            key: "setTranslate",
                            value: function(t, e, i) {
                                var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                                t.style.transition = n ? "all .2s ease" : "", t.style.transform = "translate3d(" + e + "px, " + i + "px, 0)"
                            }
                        }]), t
                    }();

                function V(t, e, i) {
                    var n = t.querySelector(".gslide-media"),
                        s = new Image,
                        o = "gSlideTitle_" + e.index,
                        l = "gSlideDesc_" + e.index;
                    s.addEventListener("load", (function() {
                        C(i) && i()
                    }), !1), s.src = e.href, s.alt = "", "" !== e.title && s.setAttribute("aria-labelledby", o), "" !== e.description && s.setAttribute("aria-describedby", l), n.insertBefore(s, n.firstChild)
                }

                function F(t, e, i) {
                    var n = this,
                        s = t.querySelector(".ginner-container"),
                        o = "gvideo" + e.index,
                        l = t.querySelector(".gslide-media"),
                        r = this.getAllPlayers();
                    u(s, "gvideo-container"), l.insertBefore(b('<div class="gvideo-wrapper"></div>'), l.firstChild);
                    var a = t.querySelector(".gvideo-wrapper");
                    k(this.settings.plyr.css);
                    var c = e.href,
                        h = location.protocol.replace(":", ""),
                        d = "",
                        g = "",
                        p = !1;
                    "file" == h && (h = "http"), l.style.maxWidth = e.width, k(this.settings.plyr.js, "Plyr", (function() {
                        if (c.match(/vimeo\.com\/([0-9]*)/)) {
                            var t = /vimeo.*\/(\d+)/i.exec(c);
                            d = "vimeo", g = t[1]
                        }
                        if (c.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || c.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
                            var s = function(t) {
                                var e = "";
                                return e = void 0 !== (t = t.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2] ? (e = t[2].split(/[^0-9a-z_\-]/i))[0] : t, e
                            }(c);
                            d = "youtube", g = s
                        }
                        if (null !== c.match(/\.(mp4|ogg|webm|mov)$/)) {
                            d = "local";
                            var l = '<video id="' + o + '" ';
                            l += 'style="background:#000; max-width: '.concat(e.width, ';" '), l += 'preload="metadata" ', l += 'x-webkit-airplay="allow" ', l += 'webkit-playsinline="" ', l += "controls ", l += 'class="gvideo-local">';
                            var h = c.toLowerCase().split(".").pop(),
                                f = {
                                    mp4: "",
                                    ogg: "",
                                    webm: ""
                                };
                            for (var v in f[h = "mov" == h ? "mp4" : h] = c, f)
                                if (f.hasOwnProperty(v)) {
                                    var m = f[v];
                                    e.hasOwnProperty(v) && (m = e[v]), "" !== m && (l += '<source src="'.concat(m, '" type="video/').concat(v, '">'))
                                }
                            p = b(l += "</video>")
                        }
                        var y = p || b('<div id="'.concat(o, '" data-plyr-provider="').concat(d, '" data-plyr-embed-id="').concat(g, '"></div>'));
                        u(a, "".concat(d, "-video gvideo")), a.appendChild(y), a.setAttribute("data-id", o), a.setAttribute("data-index", e.index);
                        var x = I(n.settings.plyr, "config") ? n.settings.plyr.config : {},
                            w = new Plyr("#" + o, x);
                        w.on("ready", (function(t) {
                            var e = t.detail.plyr;
                            r[o] = e, C(i) && i()
                        })), w.on("enterfullscreen", R), w.on("exitfullscreen", R)
                    }))
                }

                function R(t) {
                    var e = p(t.target, ".gslide-media");
                    "enterfullscreen" == t.type && u(e, "fullscreen"), "exitfullscreen" == t.type && d(e, "fullscreen")
                }

                function G(t, e, i) {
                    var n, s = this,
                        o = t.querySelector(".gslide-media"),
                        l = !(!I(e, "href") || !e.href) && e.href.split("#").pop().trim(),
                        r = !(!I(e, "content") || !e.content) && e.content;
                    if (r && (E(r) && (n = b('<div class="ginlined-content">'.concat(r, "</div>"))), A(r))) {
                        "none" == r.style.display && (r.style.display = "block");
                        var a = document.createElement("div");
                        a.className = "ginlined-content", a.appendChild(r), n = a
                    }
                    if (l) {
                        var c = document.getElementById(l);
                        if (!c) return !1;
                        var d = c.cloneNode(!0);
                        d.style.height = e.height, d.style.maxWidth = e.width, u(d, "ginlined-content"), n = d
                    }
                    if (!n) return console.error("Unable to append inline slide content", e), !1;
                    o.style.height = e.height, o.style.width = e.width, o.appendChild(n), this.events["inlineclose" + l] = h("click", {
                        onElement: o.querySelectorAll(".gtrigger-close"),
                        withCallback: function(t) {
                            t.preventDefault(), s.close()
                        }
                    }), C(i) && i()
                }

                function U(t, e, i) {
                    var n = t.querySelector(".gslide-media"),
                        s = function(t) {
                            var e = t.url,
                                i = t.allow,
                                n = t.callback,
                                s = t.appendTo,
                                o = document.createElement("iframe");
                            return o.className = "vimeo-video gvideo", o.src = e, o.style.width = "100%", o.style.height = "100%", i && o.setAttribute("allow", i), o.onload = function() {
                                u(o, "node-ready"), C(n) && n()
                            }, s && s.appendChild(o), o
                        }({
                            url: e.href,
                            callback: i
                        });
                    n.parentNode.style.maxWidth = e.width, n.parentNode.style.height = e.height, n.appendChild(s)
                }
                var Z = function() {
                        function t(i, n) {
                            e(this, t), this.element = i, this.settings = n, this.defaults = {
                                href: "",
                                title: "",
                                type: "",
                                description: "",
                                descPosition: "bottom",
                                effect: "",
                                width: "",
                                height: "",
                                node: !1,
                                content: !1,
                                zoomable: !0,
                                draggable: !0
                            }
                        }
                        return n(t, [{
                            key: "sourceType",
                            value: function(t) {
                                var e = t;
                                return null !== (t = t.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/) ? "image" : t.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || t.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || t.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) ? "video" : t.match(/vimeo\.com\/([0-9]*)/) ? "video" : null !== t.match(/\.(mp4|ogg|webm|mov)$/) ? "video" : t.indexOf("#") > -1 && "" !== e.split("#").pop().trim() ? "inline" : t.includes("gajax=true") ? "ajax" : "external"
                            }
                        }, {
                            key: "parseConfig",
                            value: function(t, e) {
                                var i = this,
                                    n = r({
                                        descPosition: e.descPosition
                                    }, this.defaults);
                                if (M(t) && !A(t)) {
                                    I(t, "type") || (I(t, "content") && t.content ? t.type = "inline" : I(t, "href") && (t.type = this.sourceType(t.href)));
                                    var s = r(n, t);
                                    return this.setSize(s, e), s
                                }
                                var o = "",
                                    l = t.getAttribute("data-glightbox"),
                                    c = t.nodeName.toLowerCase();
                                if ("a" === c && (o = t.href), "img" === c && (o = t.src), n.href = o, a(n, (function(s, o) {
                                        I(e, o) && "width" !== o && (n[o] = e[o]);
                                        var l = t.dataset[o];
                                        O(l) || (n[o] = i.sanitizeValue(l))
                                    })), n.content && (n.type = "inline"), !n.type && o && (n.type = this.sourceType(o)), O(l)) {
                                    if ("a" == c) {
                                        var h = t.title;
                                        O(h) || "" === h || (n.title = h)
                                    }
                                    if ("img" == c) {
                                        var u = t.alt;
                                        O(u) || "" === u || (n.title = u)
                                    }
                                    var d = t.getAttribute("data-description");
                                    O(d) || "" === d || (n.description = d)
                                } else {
                                    var g = [];
                                    a(n, (function(t, e) {
                                        g.push(";\\s?" + e)
                                    })), g = g.join("\\s?:|"), "" !== l.trim() && a(n, (function(t, e) {
                                        var s = l,
                                            o = new RegExp("s?" + e + "s?:s?(.*?)(" + g + "s?:|$)"),
                                            r = s.match(o);
                                        if (r && r.length && r[1]) {
                                            var a = r[1].trim().replace(/;\s*$/, "");
                                            n[e] = i.sanitizeValue(a)
                                        }
                                    }))
                                }
                                if (n.description && "." == n.description.substring(0, 1) && document.querySelector(n.description)) n.description = document.querySelector(n.description).innerHTML;
                                else {
                                    var p = t.querySelector(".glightbox-desc");
                                    p && (n.description = p.innerHTML)
                                }
                                return this.setSize(n, e), this.slideConfig = n, n
                            }
                        }, {
                            key: "setSize",
                            value: function(t, e) {
                                var i = "video" == t.type ? this.checkSize(e.videosWidth) : this.checkSize(e.width),
                                    n = this.checkSize(e.height);
                                return t.width = I(t, "width") && "" !== t.width ? this.checkSize(t.width) : i, t.height = I(t, "height") && "" !== t.height ? this.checkSize(t.height) : n, t
                            }
                        }, {
                            key: "checkSize",
                            value: function(t) {
                                return q(t) ? "".concat(t, "px") : t
                            }
                        }, {
                            key: "sanitizeValue",
                            value: function(t) {
                                return "true" !== t && "false" !== t ? t : "true" === t
                            }
                        }]), t
                    }(),
                    J = function() {
                        function t(i, n) {
                            e(this, t), this.element = i, this.instance = n
                        }
                        return n(t, [{
                            key: "setContent",
                            value: function() {
                                var t = this,
                                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                                    i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                if (g(e, "loaded")) return !1;
                                var n = this.instance.settings,
                                    s = this.slideConfig,
                                    o = T();
                                C(n.beforeSlideLoad) && n.beforeSlideLoad({
                                    index: s.index,
                                    slide: e,
                                    player: !1
                                });
                                var l = s.type,
                                    r = s.descPosition,
                                    a = e.querySelector(".gslide-media"),
                                    c = e.querySelector(".gslide-title"),
                                    h = e.querySelector(".gslide-desc"),
                                    d = e.querySelector(".gdesc-inner"),
                                    p = i,
                                    f = "gSlideTitle_" + s.index,
                                    v = "gSlideDesc_" + s.index;
                                if (C(n.afterSlideLoad) && (p = function() {
                                        C(i) && i(), n.afterSlideLoad({
                                            index: s.index,
                                            slide: e,
                                            player: t.instance.getSlidePlayerInstance(s.index)
                                        })
                                    }), "" == s.title && "" == s.description ? d && d.parentNode.parentNode.removeChild(d.parentNode) : (c && "" !== s.title ? (c.id = f, c.innerHTML = s.title) : c.parentNode.removeChild(c), h && "" !== s.description ? (h.id = v, o && n.moreLength > 0 ? (s.smallDescription = this.slideShortDesc(s.description, n.moreLength, n.moreText), h.innerHTML = s.smallDescription, this.descriptionEvents(h, s)) : h.innerHTML = s.description) : h.parentNode.removeChild(h), u(a.parentNode, "desc-".concat(r)), u(d.parentNode, "description-".concat(r))), u(a, "gslide-".concat(l)), u(e, "loaded"), "video" !== l) {
                                    if ("external" !== l) return "inline" === l ? (G.apply(this.instance, [e, s, p]), void(s.draggable && new W({
                                        dragEl: e.querySelector(".gslide-inline"),
                                        toleranceX: n.dragToleranceX,
                                        toleranceY: n.dragToleranceY,
                                        slide: e,
                                        instance: this.instance
                                    }))) : void("image" !== l ? C(p) && p() : V(e, s, (function() {
                                        var i = e.querySelector("img");
                                        s.draggable && new W({
                                            dragEl: i,
                                            toleranceX: n.dragToleranceX,
                                            toleranceY: n.dragToleranceY,
                                            slide: e,
                                            instance: t.instance
                                        }), s.zoomable && i.naturalWidth > i.offsetWidth && (u(i, "zoomable"), new j(i, e, (function() {
                                            t.instance.resize()
                                        }))), C(p) && p()
                                    })));
                                    U.apply(this, [e, s, p])
                                } else F.apply(this.instance, [e, s, p])
                            }
                        }, {
                            key: "slideShortDesc",
                            value: function(t) {
                                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
                                    i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                                    n = i;
                                if ((t = t.trim()).length <= e) return t;
                                var s = t.substr(0, e - 1);
                                return n ? s + '... <a href="#" class="desc-more">' + i + "</a>" : s
                            }
                        }, {
                            key: "descriptionEvents",
                            value: function(t, e) {
                                var i = this,
                                    n = t.querySelector(".desc-more");
                                if (!n) return !1;
                                h("click", {
                                    onElement: n,
                                    withCallback: function(t, n) {
                                        t.preventDefault();
                                        var s = document.body,
                                            o = p(n, ".gslide-desc");
                                        if (!o) return !1;
                                        o.innerHTML = e.description, u(s, "gdesc-open");
                                        var l = h("click", {
                                            onElement: [s, p(o, ".gslide-description")],
                                            withCallback: function(t, n) {
                                                "a" !== t.target.nodeName.toLowerCase() && (d(s, "gdesc-open"), u(s, "gdesc-closed"), o.innerHTML = e.smallDescription, i.descriptionEvents(o, e), setTimeout((function() {
                                                    d(s, "gdesc-closed")
                                                }), 400), l.destroy())
                                            }
                                        })
                                    }
                                })
                            }
                        }, {
                            key: "create",
                            value: function() {
                                return b(this.instance.settings.slideHtml)
                            }
                        }, {
                            key: "getConfig",
                            value: function() {
                                var t = new Z;
                                return this.slideConfig = t.parseConfig(this.element, this.instance.settings), this.slideConfig
                            }
                        }]), t
                    }(),
                    K = T(),
                    Q = null !== T() || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
                    tt = document.getElementsByTagName("html")[0],
                    et = {
                        selector: ".glightbox",
                        elements: null,
                        skin: "clean",
                        closeButton: !0,
                        startAt: null,
                        autoplayVideos: !0,
                        descPosition: "bottom",
                        width: "900px",
                        height: "506px",
                        videosWidth: "960px",
                        beforeSlideChange: null,
                        afterSlideChange: null,
                        beforeSlideLoad: null,
                        afterSlideLoad: null,
                        slideInserted: null,
                        slideRemoved: null,
                        onOpen: null,
                        onClose: null,
                        loop: !1,
                        zoomable: !0,
                        draggable: !0,
                        dragAutoSnap: !1,
                        dragToleranceX: 40,
                        dragToleranceY: 65,
                        preload: !0,
                        oneSlidePerOpen: !1,
                        touchNavigation: !0,
                        touchFollowAxis: !0,
                        keyboardNavigation: !0,
                        closeOnOutsideClick: !0,
                        plyr: {
                            css: "https://cdn.plyr.io/3.5.6/plyr.css",
                            js: "https://cdn.plyr.io/3.5.6/plyr.js",
                            config: {
                                ratio: "16:9",
                                youtube: {
                                    noCookie: !0,
                                    rel: 0,
                                    showinfo: 0,
                                    iv_load_policy: 3
                                },
                                vimeo: {
                                    byline: !1,
                                    portrait: !1,
                                    title: !1,
                                    transparent: !1
                                }
                            }
                        },
                        openEffect: "zoomIn",
                        closeEffect: "zoomOut",
                        slideEffect: "slide",
                        moreText: "See more",
                        moreLength: 60,
                        lightboxHtml: "",
                        cssEfects: {
                            fade: { in: "fadeIn",
                                out: "fadeOut"
                            },
                            zoom: { in: "zoomIn",
                                out: "zoomOut"
                            },
                            slide: { in: "slideInRight",
                                out: "slideOutLeft"
                            },
                            slide_back: { in: "slideInLeft",
                                out: "slideOutRight"
                            }
                        },
                        svg: {
                            close: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
                            next: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
                            prev: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
                        },
                        slideHtml: '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'
                    };
                et.lightboxHtml = '<div id="glightbox-body" class="glightbox-container">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gnext gbtn" tabindex="0" aria-label="Next">{nextSVG}</button>\n    <button class="gprev gbtn" tabindex="1" aria-label="Previous">{prevSVG}</button>\n    <button class="gclose gbtn" tabindex="2" aria-label="Close">{closeSVG}</button>\n</div>\n</div>';
                var it = function() {
                    function t() {
                        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        e(this, t), this.settings = r(et, i), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = {}, this.fullElementsList = !1
                    }
                    return n(t, [{
                        key: "init",
                        value: function() {
                            var t = this,
                                e = this.getSelector();
                            e && (this.baseEvents = h("click", {
                                onElement: e,
                                withCallback: function(e, i) {
                                    e.preventDefault(), t.open(i)
                                }
                            })), this.elements = this.getElements()
                        }
                    }, {
                        key: "open",
                        value: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                            if (0 == this.elements.length) return !1;
                            this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
                            var i = q(e) ? e : this.settings.startAt;
                            if (A(t)) {
                                var n = t.getAttribute("data-gallery");
                                n && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, n)), O(i) && (i = this.getElementIndex(t)) < 0 && (i = 0)
                            }
                            q(i) || (i = 0), this.build(), f(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in);
                            var s = document.body,
                                o = window.innerWidth - document.documentElement.clientWidth;
                            if (o > 0) {
                                var l = document.createElement("style");
                                l.type = "text/css", l.className = "gcss-styles", l.innerText = ".gscrollbar-fixer {margin-right: ".concat(o, "px}"), document.head.appendChild(l), u(s, "gscrollbar-fixer")
                            }
                            u(s, "glightbox-open"), u(tt, "glightbox-open"), K && (u(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i, !0), 1 == this.elements.length ? (y(this.prevButton), y(this.nextButton)) : (m(this.prevButton), m(this.nextButton)), this.lightboxOpen = !0, C(this.settings.onOpen) && this.settings.onOpen(), Q && this.settings.touchNavigation && $(this), this.settings.keyboardNavigation && P(this)
                        }
                    }, {
                        key: "openAt",
                        value: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            this.open(null, t)
                        }
                    }, {
                        key: "showSlide",
                        value: function() {
                            var t = this,
                                e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            m(this.loader), this.index = parseInt(e);
                            var n = this.slidesContainer.querySelector(".current");
                            n && d(n, "current"), this.slideAnimateOut();
                            var s = this.slidesContainer.querySelectorAll(".gslide")[e];
                            if (g(s, "loaded")) this.slideAnimateIn(s, i), y(this.loader);
                            else {
                                m(this.loader);
                                var o = this.elements[e];
                                o.instance.setContent(s, (function() {
                                    y(t.loader), t.resize(), t.slideAnimateIn(s, i)
                                }))
                            }
                            this.slideDescription = s.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && g(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(e + 1), this.preloadSlide(e - 1)), this.updateNavigationClasses(), this.activeSlide = s
                        }
                    }, {
                        key: "preloadSlide",
                        value: function(t) {
                            if (t < 0 || t > this.elements.length - 1) return !1;
                            if (O(this.elements[t])) return !1;
                            var e = this.slidesContainer.querySelectorAll(".gslide")[t];
                            if (g(e, "loaded")) return !1;
                            var i = this.elements[t],
                                n = i.type;
                            "video" == n || "external" == n ? setTimeout((function() {
                                i.instance.setContent(e)
                            }), 200) : i.instance.setContent(e)
                        }
                    }, {
                        key: "prevSlide",
                        value: function() {
                            this.goToSlide(this.index - 1)
                        }
                    }, {
                        key: "nextSlide",
                        value: function() {
                            this.goToSlide(this.index + 1)
                        }
                    }, {
                        key: "goToSlide",
                        value: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                            if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (t < 0 || t > this.elements.length - 1)) return !1;
                            t < 0 ? t = this.elements.length - 1 : t >= this.elements.length && (t = 0), this.showSlide(t)
                        }
                    }, {
                        key: "insertSlide",
                        value: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1,
                                i = new J(t, this),
                                n = i.getConfig(),
                                s = i.create(),
                                o = this.elements.length - 1;
                            if (e < 0 && (e = this.elements.length), n.index = e, n.node = !1, n.instance = i, this.elements.splice(e, 0, n), this.slidesContainer) {
                                if (e > o) this.slidesContainer.appendChild(s);
                                else {
                                    var l = this.slidesContainer.querySelectorAll(".gslide")[e];
                                    this.slidesContainer.insertBefore(s, l)
                                }(this.settings.preload && 0 == this.index && 0 == e || this.index - 1 == e || this.index + 1 == e) && this.preloadSlide(e), 0 == this.index && 0 == e && (this.index = 1), this.updateNavigationClasses()
                            }
                            C(this.settings.slideInserted) && this.settings.slideInserted({
                                index: e,
                                slide: this.slidesContainer.querySelectorAll(".gslide")[e],
                                player: this.getSlidePlayerInstance(e)
                            })
                        }
                    }, {
                        key: "removeSlide",
                        value: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                            if (t < 0 || t > this.elements.length - 1) return !1;
                            var e = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[t];
                            e && (this.getActiveSlideIndex() == t && (t == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), e.parentNode.removeChild(e)), this.elements.splice(t, 1), C(this.settings.slideRemoved) && this.settings.slideRemoved(t)
                        }
                    }, {
                        key: "slideAnimateIn",
                        value: function(t, e) {
                            var i = this,
                                n = t.querySelector(".gslide-media"),
                                s = t.querySelector(".gslide-description"),
                                o = {
                                    index: this.prevActiveSlideIndex,
                                    slide: this.prevActiveSlide,
                                    player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
                                },
                                l = {
                                    index: this.index,
                                    slide: this.activeSlide,
                                    player: this.getSlidePlayerInstance(this.index)
                                };
                            if (n.offsetWidth > 0 && s && (y(s), s.style.display = ""), d(t, this.effectsClasses), e) f(t, this.settings.openEffect, (function() {
                                !K && i.settings.autoplayVideos && i.playSlideVideo(t), C(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [o, l])
                            }));
                            else {
                                var r = this.settings.slideEffect,
                                    a = "none" !== r ? this.settings.cssEfects[r].in : r;
                                this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (a = this.settings.cssEfects.slide_back.in), f(t, a, (function() {
                                    !K && i.settings.autoplayVideos && i.playSlideVideo(t), C(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [o, l])
                                }))
                            }
                            setTimeout((function() {
                                i.resize(t)
                            }), 100), u(t, "current")
                        }
                    }, {
                        key: "slideAnimateOut",
                        value: function() {
                            if (!this.prevActiveSlide) return !1;
                            var t = this.prevActiveSlide;
                            d(t, this.effectsClasses), u(t, "prev");
                            var e = this.settings.slideEffect,
                                i = "none" !== e ? this.settings.cssEfects[e].out : e;
                            this.stopSlideVideo(t), C(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
                                index: this.prevActiveSlideIndex,
                                slide: this.prevActiveSlide,
                                player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
                            }, {
                                index: this.index,
                                slide: this.activeSlide,
                                player: this.getSlidePlayerInstance(this.index)
                            }]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (i = this.settings.cssEfects.slide_back.out), f(t, i, (function() {
                                var e = t.querySelector(".gslide-media"),
                                    i = t.querySelector(".gslide-description");
                                e.style.transform = "", d(e, "greset"), e.style.opacity = "", i && (i.style.opacity = ""), d(t, "prev")
                            }))
                        }
                    }, {
                        key: "getAllPlayers",
                        value: function() {
                            return this.videoPlayers
                        }
                    }, {
                        key: "getSlidePlayerInstance",
                        value: function(t) {
                            var e = "gvideo" + t,
                                i = this.getAllPlayers();
                            return !(!I(i, e) || !i[e]) && i[e]
                        }
                    }, {
                        key: "stopSlideVideo",
                        value: function(t) {
                            if (A(t)) {
                                var e = t.querySelector(".gvideo-wrapper");
                                e && (t = e.getAttribute("data-index"))
                            }
                            var i = this.getSlidePlayerInstance(t);
                            i && i.playing && i.pause()
                        }
                    }, {
                        key: "playSlideVideo",
                        value: function(t) {
                            if (A(t)) {
                                var e = t.querySelector(".gvideo-wrapper");
                                e && (t = e.getAttribute("data-index"))
                            }
                            var i = this.getSlidePlayerInstance(t);
                            i && !i.playing && i.play()
                        }
                    }, {
                        key: "setElements",
                        value: function(t) {
                            var e = this;
                            this.settings.elements = !1;
                            var i = [];
                            a(t, (function(t, n) {
                                var s = new J(t, e),
                                    o = s.getConfig();
                                o.instance = s, o.index = n, i.push(o)
                            })), this.elements = i, this.lightboxOpen && (this.slidesContainer.innerHTML = "", a(this.elements, (function() {
                                var t = b(e.settings.slideHtml);
                                e.slidesContainer.appendChild(t)
                            })), this.showSlide(0, !0))
                        }
                    }, {
                        key: "getElementIndex",
                        value: function(t) {
                            var e = !1;
                            return a(this.elements, (function(i, n) {
                                if (I(i, "node") && i.node == t) return e = n, !0
                            })), e
                        }
                    }, {
                        key: "getElements",
                        value: function() {
                            var t = this,
                                e = [];
                            this.elements = this.elements ? this.elements : [], !O(this.settings.elements) && _(this.settings.elements) && a(this.settings.elements, (function(i, n) {
                                var s = new J(i, t),
                                    o = s.getConfig();
                                o.node = !1, o.index = n, o.instance = s, e.push(o)
                            }));
                            var i = !1;
                            return this.getSelector() && (i = document.querySelectorAll(this.getSelector())), i ? (a(i, (function(i, n) {
                                var s = new J(i, t),
                                    o = s.getConfig();
                                o.node = i, o.index = n, o.instance = s, o.gallery = i.getAttribute("data-gallery"), e.push(o)
                            })), e) : e
                        }
                    }, {
                        key: "getGalleryElements",
                        value: function(t, e) {
                            return t.filter((function(t) {
                                return t.gallery == e
                            }))
                        }
                    }, {
                        key: "getSelector",
                        value: function() {
                            return !this.settings.elements && (this.settings.selector && "data-" == this.settings.selector.substring(0, 5) ? "*[".concat(this.settings.selector, "]") : this.settings.selector)
                        }
                    }, {
                        key: "getActiveSlide",
                        value: function() {
                            return this.slidesContainer.querySelectorAll(".gslide")[this.index]
                        }
                    }, {
                        key: "getActiveSlideIndex",
                        value: function() {
                            return this.index
                        }
                    }, {
                        key: "getAnimationClasses",
                        value: function() {
                            var t = [];
                            for (var e in this.settings.cssEfects)
                                if (this.settings.cssEfects.hasOwnProperty(e)) {
                                    var i = this.settings.cssEfects[e];
                                    t.push("g".concat(i.in)), t.push("g".concat(i.out))
                                }
                            return t.join(" ")
                        }
                    }, {
                        key: "build",
                        value: function() {
                            var t = this;
                            if (this.built) return !1;
                            var e = I(this.settings.svg, "next") ? this.settings.svg.next : "",
                                i = I(this.settings.svg, "prev") ? this.settings.svg.prev : "",
                                n = I(this.settings.svg, "close") ? this.settings.svg.close : "",
                                s = this.settings.lightboxHtml;
                            s = b(s = (s = (s = s.replace(/{nextSVG}/g, e)).replace(/{prevSVG}/g, i)).replace(/{closeSVG}/g, n)), document.body.appendChild(s);
                            var o = document.getElementById("glightbox-body");
                            this.modal = o;
                            var l = o.querySelector(".gclose");
                            this.prevButton = o.querySelector(".gprev"), this.nextButton = o.querySelector(".gnext"), this.overlay = o.querySelector(".goverlay"), this.loader = o.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.events = {}, u(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && l && (this.events.close = h("click", {
                                onElement: l,
                                withCallback: function(e, i) {
                                    e.preventDefault(), t.close()
                                }
                            })), l && !this.settings.closeButton && l.parentNode.removeChild(l), this.nextButton && (this.events.next = h("click", {
                                onElement: this.nextButton,
                                withCallback: function(e, i) {
                                    e.preventDefault(), t.nextSlide()
                                }
                            })), this.prevButton && (this.events.prev = h("click", {
                                onElement: this.prevButton,
                                withCallback: function(e, i) {
                                    e.preventDefault(), t.prevSlide()
                                }
                            })), this.settings.closeOnOutsideClick && (this.events.outClose = h("click", {
                                onElement: o,
                                withCallback: function(e, i) {
                                    t.preventOutsideClick || g(document.body, "glightbox-mobile") || p(e.target, ".ginner-container") || g(e.target, "gslider") || p(e.target, ".gbtn") || g(e.target, "gnext") || g(e.target, "gprev") || t.close()
                                }
                            })), a(this.elements, (function(e) {
                                t.slidesContainer.appendChild(e.instance.create())
                            })), Q && u(document.body, "glightbox-touch"), this.events.resize = h("resize", {
                                onElement: window,
                                withCallback: function() {
                                    t.resize()
                                }
                            }), this.built = !0
                        }
                    }, {
                        key: "resize",
                        value: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                            if ((t = t || this.activeSlide) && !g(t, "zoomed")) {
                                var e = x(),
                                    i = t.querySelector(".gvideo-wrapper"),
                                    n = t.querySelector(".gslide-image"),
                                    s = this.slideDescription,
                                    o = e.width,
                                    l = e.height;
                                if (o <= 768 ? u(document.body, "glightbox-mobile") : d(document.body, "glightbox-mobile"), i || n) {
                                    var r = !1;
                                    if (s && (g(s, "description-bottom") || g(s, "description-top")) && !g(s, "gabsolute") && (r = !0), n)
                                        if (o <= 768) {
                                            var a = n.querySelector("img");
                                            a.setAttribute("style", "")
                                        } else if (r) {
                                        var c = s.offsetHeight,
                                            h = n.querySelector("img");
                                        h.setAttribute("style", "max-height: calc(100vh - ".concat(c, "px)")), s.setAttribute("style", "max-width: ".concat(h.offsetWidth, "px;"))
                                    }
                                    if (i) {
                                        var p = I(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "16:9",
                                            f = p.split(":"),
                                            v = 900,
                                            m = v / (parseInt(f[0]) / parseInt(f[1]));
                                        if (m = Math.floor(m), r && (l -= s.offsetHeight), l < m && o > v) {
                                            var y = i.offsetWidth,
                                                b = i.offsetHeight,
                                                w = l / b,
                                                S = {
                                                    width: y * w,
                                                    height: b * w
                                                };
                                            i.parentNode.setAttribute("style", "max-width: ".concat(S.width, "px")), r && s.setAttribute("style", "max-width: ".concat(S.width, "px;"))
                                        } else i.parentNode.style.maxWidth = "".concat(v, "px"), r && s.setAttribute("style", "max-width: ".concat(v, "px;"))
                                    }
                                }
                            }
                        }
                    }, {
                        key: "reload",
                        value: function() {
                            this.init()
                        }
                    }, {
                        key: "updateNavigationClasses",
                        value: function() {
                            var t = this.loop();
                            d(this.nextButton, "disabled"), d(this.prevButton, "disabled"), 0 == this.index && this.elements.length - 1 == 0 ? (u(this.prevButton, "disabled"), u(this.nextButton, "disabled")) : 0 !== this.index || t ? this.index !== this.elements.length - 1 || t || u(this.nextButton, "disabled") : u(this.prevButton, "disabled")
                        }
                    }, {
                        key: "loop",
                        value: function() {
                            var t = I(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
                            return t = I(this.settings, "loop") ? this.settings.loop : t, t
                        }
                    }, {
                        key: "close",
                        value: function() {
                            var t = this;
                            if (!this.lightboxOpen) {
                                if (this.events) {
                                    for (var e in this.events) this.events.hasOwnProperty(e) && this.events[e].destroy();
                                    this.events = null
                                }
                                return !1
                            }
                            if (this.closing) return !1;
                            this.closing = !0, this.stopSlideVideo(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), u(this.modal, "glightbox-closing"), f(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), f(this.activeSlide, this.settings.closeEffect, (function() {
                                if (t.activeSlide = null, t.prevActiveSlideIndex = null, t.prevActiveSlide = null, t.built = !1, t.events) {
                                    for (var e in t.events) t.events.hasOwnProperty(e) && t.events[e].destroy();
                                    t.events = null
                                }
                                var i = document.body;
                                d(tt, "glightbox-open"), d(i, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), t.modal.parentNode.removeChild(t.modal), C(t.settings.onClose) && t.settings.onClose();
                                var n = document.querySelector(".gcss-styles");
                                n && n.parentNode.removeChild(n), t.lightboxOpen = !1, t.closing = null
                            }))
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.close(), this.baseEvents.destroy()
                        }
                    }]), t
                }();
                return function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        e = new it(t);
                    return e.init(), e
                }
            }))
        },
        "9b7b": function(t, e, i) {
            "use strict";
            i.r(e);
            var n = function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return t.bulletin ? i("div", {
                        staticClass: "flex-1 flex flex-wrap border-black uppercase",
                        class: {
                            "border-t": "cosmic bulletin - issue" === this.$route.name
                        }
                    }, t._l(t.contributions, (function(e, n) {
                        return i("router-link", {
                            key: e.id,
                            staticClass: "border-b flex items-center justify-center w-full md:w-1/2 border-r border-black relative py-6 md:py-16",
                            attrs: {
                                to: "/cosmic-bulletin/" + t.issue.slug + "/" + e.slug
                            }
                        }, [i("span", {
                            staticClass: "hover-color absolute top-0 left-0 flex h-8 w-8 items-center justify-center border-r border-b border-black",
                            domProps: {
                                textContent: t._s(n + 1)
                            }
                        }), i("div", {
                            staticClass: "text-center px-12"
                        }, [i("h3", {
                            staticClass: "serif text-sm"
                        }, [t._v(t._s(e.credit_simple))]), i("h2", {
                            domProps: {
                                innerHTML: t._s(t.getTitle(e))
                            }
                        }, [i("span", {
                            domProps: {
                                innerHTML: t._s(e.subtitle)
                            }
                        })])])])
                    })), 1) : t._e()
                },
                s = [],
                o = (i("7514"), i("b3e9"), i("bf51"), i("a5c0"), {
                    name: "CosmicBulletinIssue",
                    data: function() {
                        return {
                            video: !1
                        }
                    },
                    mounted: function() {
                        this.$store.dispatch("getBulletin")
                    },
                    computed: {
                        bulletin: function() {
                            return this.$store.state.bulletin
                        },
                        issueSlug: function() {
                            return this.$route.params.issue
                        },
                        issue: function() {
                            var t = this;
                            return this.$store.state.bulletin.issues.find((function(e) {
                                return e.slug === t.issueSlug
                            }))
                        },
                        contributions: function() {
                            return this.issue.contributions
                        }
                    },
                    methods: {
                        getTitle: function(t) {
                            return "" !== t.display_title ? t.display_title : t.title
                        }
                    }
                }),
                l = o,
                r = (i("b6e3"), i("2877")),
                a = Object(r["a"])(l, n, s, !1, null, "250880a1", null);
            e["default"] = a.exports
        },
        a8e8: function(t, e, i) {
            "use strict";
            var n = i("103f"),
                s = i.n(n);
            s.a
        },
        b6e3: function(t, e, i) {
            "use strict";
            var n = i("62ea"),
                s = i.n(n);
            s.a
        },
        cd1c: function(t, e, i) {
            var n = i("e853");
            t.exports = function(t, e) {
                return new(n(t))(e)
            }
        },
        d56a: function(t, e, i) {
            "use strict";
            i.r(e);
            var n = function() {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return t.contribution ? n("div", {
                        staticClass: "w-full relative"
                    }, [n("span", {
                        directives: [{
                            name: "waypoint",
                            rawName: "v-waypoint",
                            value: {
                                active: !0,
                                callback: t.onWaypoint
                            },
                            expression: "{ active: true, callback: onWaypoint }"
                        }]
                    }), n("div", {
                        staticClass: "text-sm md:text-base border-black border-t border-b w-full flex top-0 z-10 transition bg-gray-base",
                        class: {
                            relative: !t.stuck, sticky: t.stuck
                        },
                        style: t.style
                    }, [n("router-link", {
                        staticClass: "article-nav py-1 border-r border-black flex flex-grow text-center items-center",
                        attrs: {
                            to: "/cosmic-bulletin/" + t.$route.params.issue
                        }
                    }, [n("img", {
                        staticClass: "block mx-auto",
                        attrs: {
                            src: i("337d")
                        }
                    })]), t._l(t.siblings, (function(e, i) {
                        return n("router-link", {
                            key: e.id,
                            staticClass: "article-nav py-1 border-r border-black flex flex-grow text-center items-center hover-toggle",
                            attrs: {
                                to: "/" + e.uri
                            }
                        }, [n("span", {
                            staticClass: "flex-grow hover:text-red"
                        }, [t._v(t._s(i + 1))]), n("span", {
                            staticClass: "absolute left-0 top-0 w-screen mt-8 border-t border-b border-black py-1 hover-show text-center bg-gray-light"
                        }, [n("div", {
                            staticClass: "mx-auto uppercase text-sm"
                        }, [n("span", {
                            staticClass: "serif"
                        }, [t._v(t._s(e.credit_simple))]), "" !== e.credit_simple ? n("span", [t._v(" - ")]) : t._e(), n("span", {
                            staticClass: "truncate-80",
                            domProps: {
                                innerHTML: t._s(t.getSimpleTitle(e))
                            }
                        })])])])
                    }))], 2), n("div", {
                        staticClass: "mx-auto max-w-3xl mt-24 text-center px-6 has-annotations"
                    }, [n("h3", {
                        staticClass: "serif text-sm"
                    }, [t._v(t._s(t.item.credit_simple))]), n("h1", {
                        staticClass: "uppercase",
                        domProps: {
                            innerHTML: t._s(t.getTitle(t.item))
                        }
                    }), t.item.abstract ? n("div", {
                        staticClass: "mt-12 text-sm italic max-w-xl mx-auto",
                        domProps: {
                            innerHTML: t._s(t.item.abstract)
                        }
                    }) : t._e()]), n("div", {
                        staticClass: "has-annotations my-24 px-3 md:px-4 bg",
                        class: {
                            multiply: t.multiply
                        }
                    }, t._l(t.blocks, (function(e, i) {
                        return n("block", {
                            key: i,
                            attrs: {
                                block: e,
                                alignment: t.alignment,
                                typeface: t.typeface,
                                sequence: t.sequence
                            }
                        })
                    })), 1), t._m(0), t.item.footer ? n("div", {
                        staticClass: "serif text-sm max-w-3xl mx-auto mt-3 underline-links",
                        domProps: {
                            innerHTML: t._s(t.item.footer)
                        }
                    }) : t._e(), n("div", {
                        key: "footnotes",
                        ref: "footnotes",
                        staticClass: "max-w-3xl word-break mt-16 md:mt-24 text-sm px-0 mb-32 mx-auto",
                        attrs: {
                            id: "footnotes"
                        }
                    }), n("h2", {
                        staticClass: "text-center py-3 border-t border-black bg-gray-light uppercase sticky top-0 z-20 border-b border-black"
                    }, [t._v("More from the Bulletin")]), n("BulletinIssue", {
                        staticClass: "relative z-10"
                    }), n("div", {
                        staticClass: "fixed bottom-0 right-0 pr-6 pb-6"
                    }, [t.item.pdf ? n("a", {
                        staticClass: "mr-3",
                        attrs: {
                            href: t.item.pdf
                        }
                    }, [t._v("PDF")]) : t._e(), n("Share")], 1)], 1) : t._e()
                },
                s = [function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        staticClass: "mx-auto max-w-3xl mt-24"
                    }, [i("div", [t._v("✹")])])
                }],
                o = (i("7514"), i("9b7b")),
                l = i("17a4"),
                r = i("7b60"),
                a = i.n(r),
                c = i("6f9a"),
                h = (i("52df"), i("685b"), i("b3e9"), i("bf51"), i("a5c0"), function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", ["image" === t.block.type ? i("div", [t.vector ? i("img", {
                        staticClass: "mx-auto",
                        class: {
                            "max-w-5xl": t.sequence
                        },
                        attrs: {
                            src: t.block.url
                        }
                    }) : i("div", {
                        staticClass: "max-w-4xl mx-auto mb-8"
                    }, [i("figure", [i("a", {
                        staticClass: "lightbox",
                        attrs: {
                            href: t.block.attachment.url,
                            "data-glightbox": "description:" + t.block.caption + ";"
                        }
                    }, [i("div", {
                        domProps: {
                            innerHTML: t._s(t.block.attachment.srcset)
                        }
                    }), i("figcaption", {
                        staticClass: "text-sm mt-2 leading-tight",
                        domProps: {
                            innerHTML: t._s(t.block.caption)
                        }
                    })])])])]) : "paragraph" === t.block.type ? i("div", {
                        staticClass: "relative max-w-xl mx-auto mb-6",
                        class: {
                            "text-center": t.center, monospace: t.monospace, serif: t.serif
                        },
                        domProps: {
                            innerHTML: t._s(t.block.html)
                        }
                    }) : "blockquote" === t.block.type ? i("blockquote", {
                        staticClass: "relative max-w-xl mx-auto mb-6",
                        class: {
                            monospace: t.monospace, serif: t.serif
                        },
                        domProps: {
                            innerHTML: t._s(t.block.html)
                        }
                    }) : "kirbytext" === t.block.type ? i("div", {
                        staticClass: "relative max-w-xl mx-auto mb-6",
                        class: {
                            "text-center": t.center, monospace: t.monospace, serif: t.serif
                        },
                        domProps: {
                            innerHTML: t._s(t.block.html)
                        }
                    }) : t._e()])
                }),
                u = [],
                d = {
                    name: "Block",
                    props: {
                        block: Object,
                        alignment: String,
                        typeface: String,
                        sequence: Boolean
                    },
                    computed: {
                        vector: function() {
                            return "image" === this.block.type && "image/svg+xml" === this.block.mime
                        },
                        center: function() {
                            return "Center" === this.alignment
                        },
                        monospace: function() {
                            return "Monospace" === this.typeface
                        },
                        serif: function() {
                            return "Serif" === this.typeface
                        }
                    }
                },
                g = d,
                p = (i("f19e"), i("2877")),
                f = Object(p["a"])(g, h, u, !1, null, "fb2bae8a", null),
                v = f.exports,
                m = {
                    name: "CosmicBulletinContribution",
                    data: function() {
                        return {
                            tips: null,
                            annotations: [],
                            stuck: !1,
                            video: !1,
                            intersectionOptions: {
                                root: null,
                                rootMargin: "0px 0px 0px 0px",
                                threshold: [0, 1]
                            },
                            lightbox: null
                        }
                    },
                    mounted: function() {
                        this.$store.dispatch("getContribution", this.$route)
                    },
                    metaInfo: function() {
                        return !!this.contribution && {
                            title: this.seo.title,
                            meta: [{
                                name: "og:title",
                                content: this.seo.title
                            }, {
                                name: "twitter:title",
                                content: this.seo.title
                            }, {
                                name: "og:image",
                                content: this.seo.thumbnail
                            }, {
                                name: "twitter:image",
                                content: this.seo.thumbnail
                            }, {
                                name: "og:url",
                                content: "".concat(window.location.origin, "/").concat(this.$route.fullPath)
                            }, {
                                name: "og:type",
                                content: "website"
                            }, {
                                name: "og:description",
                                content: this.seo.description
                            }, {
                                name: "twitter:description",
                                content: this.seo.description
                            }]
                        }
                    },
                    computed: {
                        contribution: function() {
                            var t = this;
                            return this.$store.state.contributions.find((function(e) {
                                return e.key === t.$route.path.slice(1)
                            }))
                        },
                        seo: function() {
                            return this.item.seo
                        },
                        item: function() {
                            return this.contribution.json
                        },
                        sequence: function() {
                            return "Image Sequence" === this.item.type
                        },
                        blocks: function() {
                            return this.item.content
                        },
                        html: function() {
                            return this.item.html
                        },
                        multiply: function() {
                            return "Image Sequence" === this.item.type && "true" === this.item.multiply
                        },
                        alignment: function() {
                            return "Contribution" === this.item.type ? this.item.alignment : ""
                        },
                        typeface: function() {
                            return "Contribution" === this.item.type ? this.item.typeface : ""
                        },
                        siblings: function() {
                            return this.item.siblings
                        },
                        style: function() {
                            return !!this.$route.meta.style && {
                                backgroundColor: this.$route.meta.style.background,
                                color: this.$route.meta.style.text
                            }
                        }
                    },
                    methods: {
                        getSimpleTitle: function(t) {
                            return t.display_title ? t.display_title : t.title
                        },
                        getTitle: function(t) {
                            return "" !== t.complex_title ? t.complex_title : t.display_title ? t.display_title : t.title
                        },
                        onWaypoint: function(t) {
                            var e = t.going,
                                i = t.direction;
                            e === this.$waypointMap.GOING_OUT && i === this.$waypointMap.DIRECTION_TOP ? (this.stuck = !0, this.$store.commit("SET_FADEMENU", !0)) : e === this.$waypointMap.GOING_IN && i === this.$waypointMap.DIRECTION_BOTTOM && (this.$store.commit("SET_FADEMENU", !1), this.stuck = !1)
                        }
                    },
                    destroyed: function() {
                        this.$store.commit("SET_FADEMENU", !1), this.tips.map((function(t) {
                            return t.destroy()
                        }))
                    },
                    components: {
                        Block: v,
                        Share: l["a"],
                        BulletinIssue: o["default"]
                    },
                    watch: {
                        contribution: function() {
                            var t = this;
                            this.$nextTick((function() {
                                t.$refs.footnotes.innerHTML = "", t.setupAnnotations(), t.annotations = document.querySelectorAll(".annotation"), t.tips = Object(c["a"])("[data-tippy-content]", {
                                    theme: "cosmism",
                                    arrow: !1,
                                    allowHTML: !0
                                }), t.lightbox = a()({
                                    touchNavigation: !0,
                                    loop: !0,
                                    autoplayVideos: !0,
                                    selector: ".lightbox"
                                }), console.log(t.tips)
                            }))
                        },
                        $route: function(t) {
                            window.scrollTo(0, 0), this.$store.commit("SET_FADEMENU", !1), this.$store.dispatch("getContribution", t)
                        }
                    }
                },
                y = m,
                b = (i("a8e8"), Object(p["a"])(y, n, s, !1, null, "10799180", null));
            e["default"] = b.exports
        },
        e853: function(t, e, i) {
            var n = i("d3f4"),
                s = i("1169"),
                o = i("2b4c")("species");
            t.exports = function(t) {
                var e;
                return s(t) && (e = t.constructor, "function" != typeof e || e !== Array && !s(e.prototype) || (e = void 0), n(e) && (e = e[o], null === e && (e = void 0))), void 0 === e ? Array : e
            }
        },
        f19e: function(t, e, i) {
            "use strict";
            var n = i("fc81"),
                s = i.n(n);
            s.a
        },
        fc81: function(t, e, i) {}
    }
]);
//# sourceMappingURL=issue.a6995c36.js.map