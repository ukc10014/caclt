(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["issue~timeline"], {
        "6f9a": function(e, t, n) {
            "use strict";

            function r(e) {
                var t = e.getBoundingClientRect();
                return {
                    width: t.width,
                    height: t.height,
                    top: t.top,
                    right: t.right,
                    bottom: t.bottom,
                    left: t.left,
                    x: t.left,
                    y: t.top
                }
            }

            function i(e) {
                if ("[object Window]" !== e.toString()) {
                    var t = e.ownerDocument;
                    return t ? t.defaultView : window
                }
                return e
            }

            function o(e) {
                var t = i(e),
                    n = t.pageXOffset,
                    r = t.pageYOffset;
                return {
                    scrollLeft: n,
                    scrollTop: r
                }
            }

            function a(e) {
                var t = i(e).Element;
                return e instanceof t || e instanceof Element
            }

            function s(e) {
                var t = i(e).HTMLElement;
                return e instanceof t || e instanceof HTMLElement
            }

            function c(e) {
                return {
                    scrollLeft: e.scrollLeft,
                    scrollTop: e.scrollTop
                }
            }

            function u(e) {
                return e !== i(e) && s(e) ? c(e) : o(e)
            }

            function p(e) {
                return e ? (e.nodeName || "").toLowerCase() : null
            }

            function f(e) {
                return (a(e) ? e.ownerDocument : e.document).documentElement
            }

            function d(e) {
                return r(f(e)).left + o(e).scrollLeft
            }

            function l(e) {
                return i(e).getComputedStyle(e)
            }

            function m(e) {
                var t = l(e),
                    n = t.overflow,
                    r = t.overflowX,
                    i = t.overflowY;
                return /auto|scroll|overlay|hidden/.test(n + i + r)
            }

            function v(e, t, n) {
                void 0 === n && (n = !1);
                var i = f(t),
                    o = r(e),
                    a = s(t),
                    c = {
                        scrollLeft: 0,
                        scrollTop: 0
                    },
                    l = {
                        x: 0,
                        y: 0
                    };
                return (a || !a && !n) && (("body" !== p(t) || m(i)) && (c = u(t)), s(t) ? (l = r(t), l.x += t.clientLeft, l.y += t.clientTop) : i && (l.x = d(i))), {
                    x: o.left + c.scrollLeft - l.x,
                    y: o.top + c.scrollTop - l.y,
                    width: o.width,
                    height: o.height
                }
            }

            function h(e) {
                return {
                    x: e.offsetLeft,
                    y: e.offsetTop,
                    width: e.offsetWidth,
                    height: e.offsetHeight
                }
            }

            function b(e) {
                return "html" === p(e) ? e : e.assignedSlot || e.parentNode || e.host || f(e)
            }

            function g(e) {
                return ["html", "body", "#document"].indexOf(p(e)) >= 0 ? e.ownerDocument.body : s(e) && m(e) ? e : g(b(e))
            }

            function y(e, t) {
                void 0 === t && (t = []);
                var n = g(e),
                    r = "body" === p(n),
                    o = i(n),
                    a = r ? [o].concat(o.visualViewport || [], m(n) ? n : []) : n,
                    s = t.concat(a);
                return r ? s : s.concat(y(b(a)))
            }

            function w(e) {
                return ["table", "td", "th"].indexOf(p(e)) >= 0
            }

            function x(e) {
                if (!s(e) || "fixed" === l(e).position) return null;
                var t = e.offsetParent;
                if (t) {
                    var n = f(t);
                    if ("body" === p(t) && "static" === l(t).position && "static" !== l(n).position) return n
                }
                return t
            }

            function O(e) {
                var t = b(e);
                while (s(t) && ["html", "body"].indexOf(p(t)) < 0) {
                    var n = l(t);
                    if ("none" !== n.transform || "none" !== n.perspective || n.willChange && "auto" !== n.willChange) return t;
                    t = t.parentNode
                }
                return null
            }

            function E(e) {
                var t = i(e),
                    n = x(e);
                while (n && w(n) && "static" === l(n).position) n = x(n);
                return n && "body" === p(n) && "static" === l(n).position ? t : n || O(e) || t
            }
            var j = "top",
                T = "bottom",
                A = "right",
                D = "left",
                L = "auto",
                M = [j, T, A, D],
                k = "start",
                C = "end",
                S = "clippingParents",
                V = "viewport",
                B = "popper",
                P = "reference",
                H = M.reduce((function(e, t) {
                    return e.concat([t + "-" + k, t + "-" + C])
                }), []),
                W = [].concat(M, [L]).reduce((function(e, t) {
                    return e.concat([t, t + "-" + k, t + "-" + C])
                }), []),
                I = "beforeRead",
                R = "read",
                N = "afterRead",
                q = "beforeMain",
                U = "main",
                _ = "afterMain",
                F = "beforeWrite",
                z = "write",
                $ = "afterWrite",
                J = [I, R, N, q, U, _, F, z, $];

            function X(e) {
                var t = new Map,
                    n = new Set,
                    r = [];

                function i(e) {
                    n.add(e.name);
                    var o = [].concat(e.requires || [], e.requiresIfExists || []);
                    o.forEach((function(e) {
                        if (!n.has(e)) {
                            var r = t.get(e);
                            r && i(r)
                        }
                    })), r.push(e)
                }
                return e.forEach((function(e) {
                    t.set(e.name, e)
                })), e.forEach((function(e) {
                    n.has(e.name) || i(e)
                })), r
            }

            function Y(e) {
                var t = X(e);
                return J.reduce((function(e, n) {
                    return e.concat(t.filter((function(e) {
                        return e.phase === n
                    })))
                }), [])
            }

            function G(e) {
                var t;
                return function() {
                    return t || (t = new Promise((function(n) {
                        Promise.resolve().then((function() {
                            t = void 0, n(e())
                        }))
                    }))), t
                }
            }

            function K(e) {
                var t = e.reduce((function(e, t) {
                    var n = e[t.name];
                    return e[t.name] = n ? Object.assign(Object.assign(Object.assign({}, n), t), {}, {
                        options: Object.assign(Object.assign({}, n.options), t.options),
                        data: Object.assign(Object.assign({}, n.data), t.data)
                    }) : t, e
                }), {});
                return Object.keys(t).map((function(e) {
                    return t[e]
                }))
            }
            var Q = {
                placement: "bottom",
                modifiers: [],
                strategy: "absolute"
            };

            function Z() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return !t.some((function(e) {
                    return !(e && "function" === typeof e.getBoundingClientRect)
                }))
            }

            function ee(e) {
                void 0 === e && (e = {});
                var t = e,
                    n = t.defaultModifiers,
                    r = void 0 === n ? [] : n,
                    i = t.defaultOptions,
                    o = void 0 === i ? Q : i;
                return function(e, t, n) {
                    void 0 === n && (n = o);
                    var i = {
                            placement: "bottom",
                            orderedModifiers: [],
                            options: Object.assign(Object.assign({}, Q), o),
                            modifiersData: {},
                            elements: {
                                reference: e,
                                popper: t
                            },
                            attributes: {},
                            styles: {}
                        },
                        s = [],
                        c = !1,
                        u = {
                            state: i,
                            setOptions: function(n) {
                                f(), i.options = Object.assign(Object.assign(Object.assign({}, o), i.options), n), i.scrollParents = {
                                    reference: a(e) ? y(e) : e.contextElement ? y(e.contextElement) : [],
                                    popper: y(t)
                                };
                                var s = Y(K([].concat(r, i.options.modifiers)));
                                return i.orderedModifiers = s.filter((function(e) {
                                    return e.enabled
                                })), p(), u.update()
                            },
                            forceUpdate: function() {
                                if (!c) {
                                    var e = i.elements,
                                        t = e.reference,
                                        n = e.popper;
                                    if (Z(t, n)) {
                                        i.rects = {
                                            reference: v(t, E(n), "fixed" === i.options.strategy),
                                            popper: h(n)
                                        }, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach((function(e) {
                                            return i.modifiersData[e.name] = Object.assign({}, e.data)
                                        }));
                                        for (var r = 0; r < i.orderedModifiers.length; r++)
                                            if (!0 !== i.reset) {
                                                var o = i.orderedModifiers[r],
                                                    a = o.fn,
                                                    s = o.options,
                                                    p = void 0 === s ? {} : s,
                                                    f = o.name;
                                                "function" === typeof a && (i = a({
                                                    state: i,
                                                    options: p,
                                                    name: f,
                                                    instance: u
                                                }) || i)
                                            } else i.reset = !1, r = -1
                                    }
                                }
                            },
                            update: G((function() {
                                return new Promise((function(e) {
                                    u.forceUpdate(), e(i)
                                }))
                            })),
                            destroy: function() {
                                f(), c = !0
                            }
                        };
                    if (!Z(e, t)) return u;

                    function p() {
                        i.orderedModifiers.forEach((function(e) {
                            var t = e.name,
                                n = e.options,
                                r = void 0 === n ? {} : n,
                                o = e.effect;
                            if ("function" === typeof o) {
                                var a = o({
                                        state: i,
                                        name: t,
                                        instance: u,
                                        options: r
                                    }),
                                    c = function() {};
                                s.push(a || c)
                            }
                        }))
                    }

                    function f() {
                        s.forEach((function(e) {
                            return e()
                        })), s = []
                    }
                    return u.setOptions(n).then((function(e) {
                        !c && n.onFirstUpdate && n.onFirstUpdate(e)
                    })), u
                }
            }
            var te = {
                passive: !0
            };

            function ne(e) {
                var t = e.state,
                    n = e.instance,
                    r = e.options,
                    o = r.scroll,
                    a = void 0 === o || o,
                    s = r.resize,
                    c = void 0 === s || s,
                    u = i(t.elements.popper),
                    p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return a && p.forEach((function(e) {
                        e.addEventListener("scroll", n.update, te)
                    })), c && u.addEventListener("resize", n.update, te),
                    function() {
                        a && p.forEach((function(e) {
                            e.removeEventListener("scroll", n.update, te)
                        })), c && u.removeEventListener("resize", n.update, te)
                    }
            }
            var re = {
                name: "eventListeners",
                enabled: !0,
                phase: "write",
                fn: function() {},
                effect: ne,
                data: {}
            };

            function ie(e) {
                return e.split("-")[0]
            }

            function oe(e) {
                return e.split("-")[1]
            }

            function ae(e) {
                return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
            }

            function se(e) {
                var t, n = e.reference,
                    r = e.element,
                    i = e.placement,
                    o = i ? ie(i) : null,
                    a = i ? oe(i) : null,
                    s = n.x + n.width / 2 - r.width / 2,
                    c = n.y + n.height / 2 - r.height / 2;
                switch (o) {
                    case j:
                        t = {
                            x: s,
                            y: n.y - r.height
                        };
                        break;
                    case T:
                        t = {
                            x: s,
                            y: n.y + n.height
                        };
                        break;
                    case A:
                        t = {
                            x: n.x + n.width,
                            y: c
                        };
                        break;
                    case D:
                        t = {
                            x: n.x - r.width,
                            y: c
                        };
                        break;
                    default:
                        t = {
                            x: n.x,
                            y: n.y
                        }
                }
                var u = o ? ae(o) : null;
                if (null != u) {
                    var p = "y" === u ? "height" : "width";
                    switch (a) {
                        case k:
                            t[u] = Math.floor(t[u]) - Math.floor(n[p] / 2 - r[p] / 2);
                            break;
                        case C:
                            t[u] = Math.floor(t[u]) + Math.ceil(n[p] / 2 - r[p] / 2);
                            break;
                        default:
                    }
                }
                return t
            }

            function ce(e) {
                var t = e.state,
                    n = e.name;
                t.modifiersData[n] = se({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            }
            var ue = {
                    name: "popperOffsets",
                    enabled: !0,
                    phase: "read",
                    fn: ce,
                    data: {}
                },
                pe = {
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto"
                };

            function fe(e) {
                var t = e.x,
                    n = e.y,
                    r = window,
                    i = r.devicePixelRatio || 1;
                return {
                    x: Math.round(t * i) / i || 0,
                    y: Math.round(n * i) / i || 0
                }
            }

            function de(e) {
                var t, n = e.popper,
                    r = e.popperRect,
                    o = e.placement,
                    a = e.offsets,
                    s = e.position,
                    c = e.gpuAcceleration,
                    u = e.adaptive,
                    p = fe(a),
                    d = p.x,
                    l = p.y,
                    m = a.hasOwnProperty("x"),
                    v = a.hasOwnProperty("y"),
                    h = D,
                    b = j,
                    g = window;
                if (u) {
                    var y = E(n);
                    y === i(n) && (y = f(n)), o === j && (b = T, l -= y.clientHeight - r.height, l *= c ? 1 : -1), o === D && (h = A, d -= y.clientWidth - r.width, d *= c ? 1 : -1)
                }
                var w, x = Object.assign({
                    position: s
                }, u && pe);
                return c ? Object.assign(Object.assign({}, x), {}, (w = {}, w[b] = v ? "0" : "", w[h] = m ? "0" : "", w.transform = (g.devicePixelRatio || 1) < 2 ? "translate(" + d + "px, " + l + "px)" : "translate3d(" + d + "px, " + l + "px, 0)", w)) : Object.assign(Object.assign({}, x), {}, (t = {}, t[b] = v ? l + "px" : "", t[h] = m ? d + "px" : "", t.transform = "", t))
            }

            function le(e) {
                var t = e.state,
                    n = e.options,
                    r = n.gpuAcceleration,
                    i = void 0 === r || r,
                    o = n.adaptive,
                    a = void 0 === o || o,
                    s = {
                        placement: ie(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: i
                    };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign(Object.assign({}, t.styles.popper), de(Object.assign(Object.assign({}, s), {}, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: a
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign(Object.assign({}, t.styles.arrow), de(Object.assign(Object.assign({}, s), {}, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1
                })))), t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-placement": t.placement
                })
            }
            var me = {
                name: "computeStyles",
                enabled: !0,
                phase: "beforeWrite",
                fn: le,
                data: {}
            };

            function ve(e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function(e) {
                    var n = t.styles[e] || {},
                        r = t.attributes[e] || {},
                        i = t.elements[e];
                    s(i) && p(i) && (Object.assign(i.style, n), Object.keys(r).forEach((function(e) {
                        var t = r[e];
                        !1 === t ? i.removeAttribute(e) : i.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            }

            function he(e) {
                var t = e.state,
                    n = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                    function() {
                        Object.keys(t.elements).forEach((function(e) {
                            var r = t.elements[e],
                                i = t.attributes[e] || {},
                                o = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]),
                                a = o.reduce((function(e, t) {
                                    return e[t] = "", e
                                }), {});
                            s(r) && p(r) && (Object.assign(r.style, a), Object.keys(i).forEach((function(e) {
                                r.removeAttribute(e)
                            })))
                        }))
                    }
            }
            var be = {
                name: "applyStyles",
                enabled: !0,
                phase: "write",
                fn: ve,
                effect: he,
                requires: ["computeStyles"]
            };

            function ge(e, t, n) {
                var r = ie(e),
                    i = [D, j].indexOf(r) >= 0 ? -1 : 1,
                    o = "function" === typeof n ? n(Object.assign(Object.assign({}, t), {}, {
                        placement: e
                    })) : n,
                    a = o[0],
                    s = o[1];
                return a = a || 0, s = (s || 0) * i, [D, A].indexOf(r) >= 0 ? {
                    x: s,
                    y: a
                } : {
                    x: a,
                    y: s
                }
            }

            function ye(e) {
                var t = e.state,
                    n = e.options,
                    r = e.name,
                    i = n.offset,
                    o = void 0 === i ? [0, 0] : i,
                    a = W.reduce((function(e, n) {
                        return e[n] = ge(n, t.rects, o), e
                    }), {}),
                    s = a[t.placement],
                    c = s.x,
                    u = s.y;
                null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a
            }
            var we = {
                    name: "offset",
                    enabled: !0,
                    phase: "main",
                    requires: ["popperOffsets"],
                    fn: ye
                },
                xe = {
                    left: "right",
                    right: "left",
                    bottom: "top",
                    top: "bottom"
                };

            function Oe(e) {
                return e.replace(/left|right|bottom|top/g, (function(e) {
                    return xe[e]
                }))
            }
            var Ee = {
                start: "end",
                end: "start"
            };

            function je(e) {
                return e.replace(/start|end/g, (function(e) {
                    return Ee[e]
                }))
            }

            function Te(e) {
                var t = i(e),
                    n = f(e),
                    r = t.visualViewport,
                    o = n.clientWidth,
                    a = n.clientHeight,
                    s = 0,
                    c = 0;
                return r && (o = r.width, a = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (s = r.offsetLeft, c = r.offsetTop)), {
                    width: o,
                    height: a,
                    x: s + d(e),
                    y: c
                }
            }

            function Ae(e) {
                var t = f(e),
                    n = o(e),
                    r = e.ownerDocument.body,
                    i = Math.max(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0),
                    a = Math.max(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0),
                    s = -n.scrollLeft + d(e),
                    c = -n.scrollTop;
                return "rtl" === l(r || t).direction && (s += Math.max(t.clientWidth, r ? r.clientWidth : 0) - i), {
                    width: i,
                    height: a,
                    x: s,
                    y: c
                }
            }

            function De(e, t) {
                var n = Boolean(t.getRootNode && t.getRootNode().host);
                if (e.contains(t)) return !0;
                if (n) {
                    var r = t;
                    do {
                        if (r && e.isSameNode(r)) return !0;
                        r = r.parentNode || r.host
                    } while (r)
                }
                return !1
            }

            function Le(e) {
                return Object.assign(Object.assign({}, e), {}, {
                    left: e.x,
                    top: e.y,
                    right: e.x + e.width,
                    bottom: e.y + e.height
                })
            }

            function Me(e) {
                var t = r(e);
                return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t
            }

            function ke(e, t) {
                return t === V ? Le(Te(e)) : s(t) ? Me(t) : Le(Ae(f(e)))
            }

            function Ce(e) {
                var t = y(b(e)),
                    n = ["absolute", "fixed"].indexOf(l(e).position) >= 0,
                    r = n && s(e) ? E(e) : e;
                return a(r) ? t.filter((function(e) {
                    return a(e) && De(e, r) && "body" !== p(e)
                })) : []
            }

            function Se(e, t, n) {
                var r = "clippingParents" === t ? Ce(e) : [].concat(t),
                    i = [].concat(r, [n]),
                    o = i[0],
                    a = i.reduce((function(t, n) {
                        var r = ke(e, n);
                        return t.top = Math.max(r.top, t.top), t.right = Math.min(r.right, t.right), t.bottom = Math.min(r.bottom, t.bottom), t.left = Math.max(r.left, t.left), t
                    }), ke(e, o));
                return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
            }

            function Ve() {
                return {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }

            function Be(e) {
                return Object.assign(Object.assign({}, Ve()), e)
            }

            function Pe(e, t) {
                return t.reduce((function(t, n) {
                    return t[n] = e, t
                }), {})
            }

            function He(e, t) {
                void 0 === t && (t = {});
                var n = t,
                    i = n.placement,
                    o = void 0 === i ? e.placement : i,
                    s = n.boundary,
                    c = void 0 === s ? S : s,
                    u = n.rootBoundary,
                    p = void 0 === u ? V : u,
                    d = n.elementContext,
                    l = void 0 === d ? B : d,
                    m = n.altBoundary,
                    v = void 0 !== m && m,
                    h = n.padding,
                    b = void 0 === h ? 0 : h,
                    g = Be("number" !== typeof b ? b : Pe(b, M)),
                    y = l === B ? P : B,
                    w = e.elements.reference,
                    x = e.rects.popper,
                    O = e.elements[v ? y : l],
                    E = Se(a(O) ? O : O.contextElement || f(e.elements.popper), c, p),
                    D = r(w),
                    L = se({
                        reference: D,
                        element: x,
                        strategy: "absolute",
                        placement: o
                    }),
                    k = Le(Object.assign(Object.assign({}, x), L)),
                    C = l === B ? k : D,
                    H = {
                        top: E.top - C.top + g.top,
                        bottom: C.bottom - E.bottom + g.bottom,
                        left: E.left - C.left + g.left,
                        right: C.right - E.right + g.right
                    },
                    W = e.modifiersData.offset;
                if (l === B && W) {
                    var I = W[o];
                    Object.keys(H).forEach((function(e) {
                        var t = [A, T].indexOf(e) >= 0 ? 1 : -1,
                            n = [j, T].indexOf(e) >= 0 ? "y" : "x";
                        H[e] += I[n] * t
                    }))
                }
                return H
            }

            function We(e, t) {
                void 0 === t && (t = {});
                var n = t,
                    r = n.placement,
                    i = n.boundary,
                    o = n.rootBoundary,
                    a = n.padding,
                    s = n.flipVariations,
                    c = n.allowedAutoPlacements,
                    u = void 0 === c ? W : c,
                    p = oe(r),
                    f = p ? s ? H : H.filter((function(e) {
                        return oe(e) === p
                    })) : M,
                    d = f.filter((function(e) {
                        return u.indexOf(e) >= 0
                    }));
                0 === d.length && (d = f);
                var l = d.reduce((function(t, n) {
                    return t[n] = He(e, {
                        placement: n,
                        boundary: i,
                        rootBoundary: o,
                        padding: a
                    })[ie(n)], t
                }), {});
                return Object.keys(l).sort((function(e, t) {
                    return l[e] - l[t]
                }))
            }

            function Ie(e) {
                if (ie(e) === L) return [];
                var t = Oe(e);
                return [je(e), t, je(t)]
            }

            function Re(e) {
                var t = e.state,
                    n = e.options,
                    r = e.name;
                if (!t.modifiersData[r]._skip) {
                    for (var i = n.mainAxis, o = void 0 === i || i, a = n.altAxis, s = void 0 === a || a, c = n.fallbackPlacements, u = n.padding, p = n.boundary, f = n.rootBoundary, d = n.altBoundary, l = n.flipVariations, m = void 0 === l || l, v = n.allowedAutoPlacements, h = t.options.placement, b = ie(h), g = b === h, y = c || (g || !m ? [Oe(h)] : Ie(h)), w = [h].concat(y).reduce((function(e, n) {
                            return e.concat(ie(n) === L ? We(t, {
                                placement: n,
                                boundary: p,
                                rootBoundary: f,
                                padding: u,
                                flipVariations: m,
                                allowedAutoPlacements: v
                            }) : n)
                        }), []), x = t.rects.reference, O = t.rects.popper, E = new Map, M = !0, C = w[0], S = 0; S < w.length; S++) {
                        var V = w[S],
                            B = ie(V),
                            P = oe(V) === k,
                            H = [j, T].indexOf(B) >= 0,
                            W = H ? "width" : "height",
                            I = He(t, {
                                placement: V,
                                boundary: p,
                                rootBoundary: f,
                                altBoundary: d,
                                padding: u
                            }),
                            R = H ? P ? A : D : P ? T : j;
                        x[W] > O[W] && (R = Oe(R));
                        var N = Oe(R),
                            q = [];
                        if (o && q.push(I[B] <= 0), s && q.push(I[R] <= 0, I[N] <= 0), q.every((function(e) {
                                return e
                            }))) {
                            C = V, M = !1;
                            break
                        }
                        E.set(V, q)
                    }
                    if (M)
                        for (var U = m ? 3 : 1, _ = function(e) {
                                var t = w.find((function(t) {
                                    var n = E.get(t);
                                    if (n) return n.slice(0, e).every((function(e) {
                                        return e
                                    }))
                                }));
                                if (t) return C = t, "break"
                            }, F = U; F > 0; F--) {
                            var z = _(F);
                            if ("break" === z) break
                        }
                    t.placement !== C && (t.modifiersData[r]._skip = !0, t.placement = C, t.reset = !0)
                }
            }
            var Ne = {
                name: "flip",
                enabled: !0,
                phase: "main",
                fn: Re,
                requiresIfExists: ["offset"],
                data: {
                    _skip: !1
                }
            };

            function qe(e) {
                return "x" === e ? "y" : "x"
            }

            function Ue(e, t, n) {
                return Math.max(e, Math.min(t, n))
            }

            function _e(e) {
                var t = e.state,
                    n = e.options,
                    r = e.name,
                    i = n.mainAxis,
                    o = void 0 === i || i,
                    a = n.altAxis,
                    s = void 0 !== a && a,
                    c = n.boundary,
                    u = n.rootBoundary,
                    p = n.altBoundary,
                    f = n.padding,
                    d = n.tether,
                    l = void 0 === d || d,
                    m = n.tetherOffset,
                    v = void 0 === m ? 0 : m,
                    b = He(t, {
                        boundary: c,
                        rootBoundary: u,
                        padding: f,
                        altBoundary: p
                    }),
                    g = ie(t.placement),
                    y = oe(t.placement),
                    w = !y,
                    x = ae(g),
                    O = qe(x),
                    L = t.modifiersData.popperOffsets,
                    M = t.rects.reference,
                    C = t.rects.popper,
                    S = "function" === typeof v ? v(Object.assign(Object.assign({}, t.rects), {}, {
                        placement: t.placement
                    })) : v,
                    V = {
                        x: 0,
                        y: 0
                    };
                if (L) {
                    if (o) {
                        var B = "y" === x ? j : D,
                            P = "y" === x ? T : A,
                            H = "y" === x ? "height" : "width",
                            W = L[x],
                            I = L[x] + b[B],
                            R = L[x] - b[P],
                            N = l ? -C[H] / 2 : 0,
                            q = y === k ? M[H] : C[H],
                            U = y === k ? -C[H] : -M[H],
                            _ = t.elements.arrow,
                            F = l && _ ? h(_) : {
                                width: 0,
                                height: 0
                            },
                            z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ve(),
                            $ = z[B],
                            J = z[P],
                            X = Ue(0, M[H], F[H]),
                            Y = w ? M[H] / 2 - N - X - $ - S : q - X - $ - S,
                            G = w ? -M[H] / 2 + N + X + J + S : U + X + J + S,
                            K = t.elements.arrow && E(t.elements.arrow),
                            Q = K ? "y" === x ? K.clientTop || 0 : K.clientLeft || 0 : 0,
                            Z = t.modifiersData.offset ? t.modifiersData.offset[t.placement][x] : 0,
                            ee = L[x] + Y - Z - Q,
                            te = L[x] + G - Z,
                            ne = Ue(l ? Math.min(I, ee) : I, W, l ? Math.max(R, te) : R);
                        L[x] = ne, V[x] = ne - W
                    }
                    if (s) {
                        var re = "x" === x ? j : D,
                            se = "x" === x ? T : A,
                            ce = L[O],
                            ue = ce + b[re],
                            pe = ce - b[se],
                            fe = Ue(ue, ce, pe);
                        L[O] = fe, V[O] = fe - ce
                    }
                    t.modifiersData[r] = V
                }
            }
            var Fe = {
                name: "preventOverflow",
                enabled: !0,
                phase: "main",
                fn: _e,
                requiresIfExists: ["offset"]
            };

            function ze(e) {
                var t, n = e.state,
                    r = e.name,
                    i = n.elements.arrow,
                    o = n.modifiersData.popperOffsets,
                    a = ie(n.placement),
                    s = ae(a),
                    c = [D, A].indexOf(a) >= 0,
                    u = c ? "height" : "width";
                if (i && o) {
                    var p = n.modifiersData[r + "#persistent"].padding,
                        f = h(i),
                        d = "y" === s ? j : D,
                        l = "y" === s ? T : A,
                        m = n.rects.reference[u] + n.rects.reference[s] - o[s] - n.rects.popper[u],
                        v = o[s] - n.rects.reference[s],
                        b = E(i),
                        g = b ? "y" === s ? b.clientHeight || 0 : b.clientWidth || 0 : 0,
                        y = m / 2 - v / 2,
                        w = p[d],
                        x = g - f[u] - p[l],
                        O = g / 2 - f[u] / 2 + y,
                        L = Ue(w, O, x),
                        M = s;
                    n.modifiersData[r] = (t = {}, t[M] = L, t.centerOffset = L - O, t)
                }
            }

            function $e(e) {
                var t = e.state,
                    n = e.options,
                    r = e.name,
                    i = n.element,
                    o = void 0 === i ? "[data-popper-arrow]" : i,
                    a = n.padding,
                    s = void 0 === a ? 0 : a;
                null != o && ("string" !== typeof o || (o = t.elements.popper.querySelector(o), o)) && De(t.elements.popper, o) && (t.elements.arrow = o, t.modifiersData[r + "#persistent"] = {
                    padding: Be("number" !== typeof s ? s : Pe(s, M))
                })
            }
            var Je = {
                name: "arrow",
                enabled: !0,
                phase: "main",
                fn: ze,
                effect: $e,
                requires: ["popperOffsets"],
                requiresIfExists: ["preventOverflow"]
            };

            function Xe(e, t, n) {
                return void 0 === n && (n = {
                    x: 0,
                    y: 0
                }), {
                    top: e.top - t.height - n.y,
                    right: e.right - t.width + n.x,
                    bottom: e.bottom - t.height + n.y,
                    left: e.left - t.width - n.x
                }
            }

            function Ye(e) {
                return [j, A, T, D].some((function(t) {
                    return e[t] >= 0
                }))
            }

            function Ge(e) {
                var t = e.state,
                    n = e.name,
                    r = t.rects.reference,
                    i = t.rects.popper,
                    o = t.modifiersData.preventOverflow,
                    a = He(t, {
                        elementContext: "reference"
                    }),
                    s = He(t, {
                        altBoundary: !0
                    }),
                    c = Xe(a, r),
                    u = Xe(s, i, o),
                    p = Ye(c),
                    f = Ye(u);
                t.modifiersData[n] = {
                    referenceClippingOffsets: c,
                    popperEscapeOffsets: u,
                    isReferenceHidden: p,
                    hasPopperEscaped: f
                }, t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-reference-hidden": p,
                    "data-popper-escaped": f
                })
            }
            var Ke = {
                    name: "hide",
                    enabled: !0,
                    phase: "main",
                    requiresIfExists: ["preventOverflow"],
                    fn: Ge
                },
                Qe = [re, ue, me, be, we, Ne, Fe, Je, Ke],
                Ze = ee({
                    defaultModifiers: Qe
                }),
                et = "tippy-box",
                tt = "tippy-content",
                nt = "tippy-backdrop",
                rt = "tippy-arrow",
                it = "tippy-svg-arrow",
                ot = {
                    passive: !0,
                    capture: !0
                };

            function at(e, t, n) {
                if (Array.isArray(e)) {
                    var r = e[t];
                    return null == r ? Array.isArray(n) ? n[t] : n : r
                }
                return e
            }

            function st(e, t) {
                var n = {}.toString.call(e);
                return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1
            }

            function ct(e, t) {
                return "function" === typeof e ? e.apply(void 0, t) : e
            }

            function ut(e, t) {
                return 0 === t ? e : function(r) {
                    clearTimeout(n), n = setTimeout((function() {
                        e(r)
                    }), t)
                };
                var n
            }

            function pt(e) {
                return e.split(/\s+/).filter(Boolean)
            }

            function ft(e) {
                return [].concat(e)
            }

            function dt(e, t) {
                -1 === e.indexOf(t) && e.push(t)
            }

            function lt(e) {
                return e.filter((function(t, n) {
                    return e.indexOf(t) === n
                }))
            }

            function mt(e) {
                return e.split("-")[0]
            }

            function vt(e) {
                return [].slice.call(e)
            }

            function ht(e) {
                return Object.keys(e).reduce((function(t, n) {
                    return void 0 !== e[n] && (t[n] = e[n]), t
                }), {})
            }

            function bt() {
                return document.createElement("div")
            }

            function gt(e) {
                return ["Element", "Fragment"].some((function(t) {
                    return st(e, t)
                }))
            }

            function yt(e) {
                return st(e, "NodeList")
            }

            function wt(e) {
                return st(e, "MouseEvent")
            }

            function xt(e) {
                return !(!e || !e._tippy || e._tippy.reference !== e)
            }

            function Ot(e) {
                return gt(e) ? [e] : yt(e) ? vt(e) : Array.isArray(e) ? e : vt(document.querySelectorAll(e))
            }

            function Et(e, t) {
                e.forEach((function(e) {
                    e && (e.style.transitionDuration = t + "ms")
                }))
            }

            function jt(e, t) {
                e.forEach((function(e) {
                    e && e.setAttribute("data-state", t)
                }))
            }

            function Tt(e) {
                var t = ft(e),
                    n = t[0];
                return n && n.ownerDocument || document
            }

            function At(e, t) {
                var n = t.clientX,
                    r = t.clientY;
                return e.every((function(e) {
                    var t = e.popperRect,
                        i = e.popperState,
                        o = e.props,
                        a = o.interactiveBorder,
                        s = mt(i.placement),
                        c = i.modifiersData.offset;
                    if (!c) return !0;
                    var u = "bottom" === s ? c.top.y : 0,
                        p = "top" === s ? c.bottom.y : 0,
                        f = "right" === s ? c.left.x : 0,
                        d = "left" === s ? c.right.x : 0,
                        l = t.top - r + u > a,
                        m = r - t.bottom - p > a,
                        v = t.left - n + f > a,
                        h = n - t.right - d > a;
                    return l || m || v || h
                }))
            }

            function Dt(e, t, n) {
                var r = t + "EventListener";
                ["transitionend", "webkitTransitionEnd"].forEach((function(t) {
                    e[r](t, n)
                }))
            }
            var Lt = {
                    isTouch: !1
                },
                Mt = 0;

            function kt() {
                Lt.isTouch || (Lt.isTouch = !0, window.performance && document.addEventListener("mousemove", Ct))
            }

            function Ct() {
                var e = performance.now();
                e - Mt < 20 && (Lt.isTouch = !1, document.removeEventListener("mousemove", Ct)), Mt = e
            }

            function St() {
                var e = document.activeElement;
                if (xt(e)) {
                    var t = e._tippy;
                    e.blur && !t.state.isVisible && e.blur()
                }
            }

            function Vt() {
                document.addEventListener("touchstart", kt, ot), window.addEventListener("blur", St)
            }
            var Bt = "undefined" !== typeof window && "undefined" !== typeof document,
                Pt = Bt ? navigator.userAgent : "",
                Ht = /MSIE |Trident\//.test(Pt);
            var Wt = {
                    animateFill: !1,
                    followCursor: !1,
                    inlinePositioning: !1,
                    sticky: !1
                },
                It = {
                    allowHTML: !1,
                    animation: "fade",
                    arrow: !0,
                    content: "",
                    inertia: !1,
                    maxWidth: 350,
                    role: "tooltip",
                    theme: "",
                    zIndex: 9999
                },
                Rt = Object.assign({
                    appendTo: function() {
                        return document.body
                    },
                    aria: {
                        content: "auto",
                        expanded: "auto"
                    },
                    delay: 0,
                    duration: [300, 250],
                    getReferenceClientRect: null,
                    hideOnClick: !0,
                    ignoreAttributes: !1,
                    interactive: !1,
                    interactiveBorder: 2,
                    interactiveDebounce: 0,
                    moveTransition: "",
                    offset: [0, 10],
                    onAfterUpdate: function() {},
                    onBeforeUpdate: function() {},
                    onCreate: function() {},
                    onDestroy: function() {},
                    onHidden: function() {},
                    onHide: function() {},
                    onMount: function() {},
                    onShow: function() {},
                    onShown: function() {},
                    onTrigger: function() {},
                    onUntrigger: function() {},
                    onClickOutside: function() {},
                    placement: "top",
                    plugins: [],
                    popperOptions: {},
                    render: null,
                    showOnCreate: !1,
                    touch: !0,
                    trigger: "mouseenter focus",
                    triggerTarget: null
                }, Wt, {}, It),
                Nt = Object.keys(Rt),
                qt = function(e) {
                    var t = Object.keys(e);
                    t.forEach((function(t) {
                        Rt[t] = e[t]
                    }))
                };

            function Ut(e) {
                var t = e.plugins || [],
                    n = t.reduce((function(t, n) {
                        var r = n.name,
                            i = n.defaultValue;
                        return r && (t[r] = void 0 !== e[r] ? e[r] : i), t
                    }), {});
                return Object.assign({}, e, {}, n)
            }

            function _t(e, t) {
                var n = t ? Object.keys(Ut(Object.assign({}, Rt, {
                        plugins: t
                    }))) : Nt,
                    r = n.reduce((function(t, n) {
                        var r = (e.getAttribute("data-tippy-" + n) || "").trim();
                        if (!r) return t;
                        if ("content" === n) t[n] = r;
                        else try {
                            t[n] = JSON.parse(r)
                        } catch (i) {
                            t[n] = r
                        }
                        return t
                    }), {});
                return r
            }

            function Ft(e, t) {
                var n = Object.assign({}, t, {
                    content: ct(t.content, [e])
                }, t.ignoreAttributes ? {} : _t(e, t.plugins));
                return n.aria = Object.assign({}, Rt.aria, {}, n.aria), n.aria = {
                    expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
                    content: "auto" === n.aria.content ? t.interactive ? null : "describedby" : n.aria.content
                }, n
            }
            var zt = function() {
                return "innerHTML"
            };

            function $t(e, t) {
                e[zt()] = t
            }

            function Jt(e) {
                var t = bt();
                return !0 === e ? t.className = rt : (t.className = it, gt(e) ? t.appendChild(e) : $t(t, e)), t
            }

            function Xt(e, t) {
                gt(t.content) ? ($t(e, ""), e.appendChild(t.content)) : "function" !== typeof t.content && (t.allowHTML ? $t(e, t.content) : e.textContent = t.content)
            }

            function Yt(e) {
                var t = e.firstElementChild,
                    n = vt(t.children);
                return {
                    box: t,
                    content: n.find((function(e) {
                        return e.classList.contains(tt)
                    })),
                    arrow: n.find((function(e) {
                        return e.classList.contains(rt) || e.classList.contains(it)
                    })),
                    backdrop: n.find((function(e) {
                        return e.classList.contains(nt)
                    }))
                }
            }

            function Gt(e) {
                var t = bt(),
                    n = bt();
                n.className = et, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
                var r = bt();

                function i(n, r) {
                    var i = Yt(t),
                        o = i.box,
                        a = i.content,
                        s = i.arrow;
                    r.theme ? o.setAttribute("data-theme", r.theme) : o.removeAttribute("data-theme"), "string" === typeof r.animation ? o.setAttribute("data-animation", r.animation) : o.removeAttribute("data-animation"), r.inertia ? o.setAttribute("data-inertia", "") : o.removeAttribute("data-inertia"), o.style.maxWidth = "number" === typeof r.maxWidth ? r.maxWidth + "px" : r.maxWidth, r.role ? o.setAttribute("role", r.role) : o.removeAttribute("role"), n.content === r.content && n.allowHTML === r.allowHTML || Xt(a, e.props), r.arrow ? s ? n.arrow !== r.arrow && (o.removeChild(s), o.appendChild(Jt(r.arrow))) : o.appendChild(Jt(r.arrow)) : s && o.removeChild(s)
                }
                return r.className = tt, r.setAttribute("data-state", "hidden"), Xt(r, e.props), t.appendChild(n), n.appendChild(r), i(e.props, e.props), {
                    popper: t,
                    onUpdate: i
                }
            }
            Gt.$$tippy = !0;
            var Kt = 1,
                Qt = [],
                Zt = [];

            function en(e, t) {
                var n, r, i, o, a, s, c, u = Ft(e, Object.assign({}, Rt, {}, Ut(ht(t)))),
                    p = !1,
                    f = !1,
                    d = !1,
                    l = !1,
                    m = [],
                    v = ut(G, u.interactiveDebounce),
                    h = Tt(u.triggerTarget || e),
                    b = Kt++,
                    g = null,
                    y = lt(u.plugins),
                    w = {
                        isEnabled: !0,
                        isVisible: !1,
                        isDestroyed: !1,
                        isMounted: !1,
                        isShown: !1
                    },
                    x = {
                        id: b,
                        reference: e,
                        popper: bt(),
                        popperInstance: g,
                        props: u,
                        state: w,
                        plugins: y,
                        clearDelayTimeouts: ce,
                        setProps: ue,
                        setContent: pe,
                        show: fe,
                        hide: de,
                        hideWithInteractivity: le,
                        enable: ae,
                        disable: se,
                        unmount: me,
                        destroy: ve
                    };
                if (!u.render) return x;
                var O = u.render(x),
                    E = O.popper,
                    j = O.onUpdate;
                E.setAttribute("data-tippy-root", ""), E.id = "tippy-" + x.id, x.popper = E, e._tippy = x, E._tippy = x;
                var T = y.map((function(e) {
                        return e.fn(x)
                    })),
                    A = e.hasAttribute("aria-expanded");
                return J(), H(), V(), B("onCreate", [x]), u.showOnCreate && ie(), E.addEventListener("mouseenter", (function() {
                    x.props.interactive && x.state.isVisible && x.clearDelayTimeouts()
                })), E.addEventListener("mouseleave", (function(e) {
                    x.props.interactive && x.props.trigger.indexOf("mouseenter") >= 0 && (h.addEventListener("mousemove", v), v(e))
                })), x;

                function D() {
                    var e = x.props.touch;
                    return Array.isArray(e) ? e : [e, 0]
                }

                function L() {
                    return "hold" === D()[0]
                }

                function M() {
                    var e;
                    return !!(null == (e = x.props.render) ? void 0 : e.$$tippy)
                }

                function k() {
                    return c || e
                }

                function C() {
                    return Yt(E)
                }

                function S(e) {
                    return x.state.isMounted && !x.state.isVisible || Lt.isTouch || o && "focus" === o.type ? 0 : at(x.props.delay, e ? 0 : 1, Rt.delay)
                }

                function V() {
                    E.style.pointerEvents = x.props.interactive && x.state.isVisible ? "" : "none", E.style.zIndex = "" + x.props.zIndex
                }

                function B(e, t, n) {
                    var r;
                    (void 0 === n && (n = !0), T.forEach((function(n) {
                        n[e] && n[e].apply(void 0, t)
                    })), n) && (r = x.props)[e].apply(r, t)
                }

                function P() {
                    var t = x.props.aria;
                    if (t.content) {
                        var n = "aria-" + t.content,
                            r = E.id,
                            i = ft(x.props.triggerTarget || e);
                        i.forEach((function(e) {
                            var t = e.getAttribute(n);
                            if (x.state.isVisible) e.setAttribute(n, t ? t + " " + r : r);
                            else {
                                var i = t && t.replace(r, "").trim();
                                i ? e.setAttribute(n, i) : e.removeAttribute(n)
                            }
                        }))
                    }
                }

                function H() {
                    if (!A && x.props.aria.expanded) {
                        var t = ft(x.props.triggerTarget || e);
                        t.forEach((function(e) {
                            x.props.interactive ? e.setAttribute("aria-expanded", x.state.isVisible && e === k() ? "true" : "false") : e.removeAttribute("aria-expanded")
                        }))
                    }
                }

                function W() {
                    h.removeEventListener("mousemove", v), Qt = Qt.filter((function(e) {
                        return e !== v
                    }))
                }

                function I(e) {
                    if ((!Lt.isTouch || !d && "mousedown" !== e.type) && (!x.props.interactive || !E.contains(e.target))) {
                        if (k().contains(e.target)) {
                            if (Lt.isTouch) return;
                            if (x.state.isVisible && x.props.trigger.indexOf("click") >= 0) return
                        } else B("onClickOutside", [x, e]);
                        !0 === x.props.hideOnClick && (x.clearDelayTimeouts(), x.hide(), f = !0, setTimeout((function() {
                            f = !1
                        })), x.state.isMounted || U())
                    }
                }

                function R() {
                    d = !0
                }

                function N() {
                    d = !1
                }

                function q() {
                    h.addEventListener("mousedown", I, !0), h.addEventListener("touchend", I, ot), h.addEventListener("touchstart", N, ot), h.addEventListener("touchmove", R, ot)
                }

                function U() {
                    h.removeEventListener("mousedown", I, !0), h.removeEventListener("touchend", I, ot), h.removeEventListener("touchstart", N, ot), h.removeEventListener("touchmove", R, ot)
                }

                function _(e, t) {
                    z(e, (function() {
                        !x.state.isVisible && E.parentNode && E.parentNode.contains(E) && t()
                    }))
                }

                function F(e, t) {
                    z(e, t)
                }

                function z(e, t) {
                    var n = C().box;

                    function r(e) {
                        e.target === n && (Dt(n, "remove", r), t())
                    }
                    if (0 === e) return t();
                    Dt(n, "remove", a), Dt(n, "add", r), a = r
                }

                function $(t, n, r) {
                    void 0 === r && (r = !1);
                    var i = ft(x.props.triggerTarget || e);
                    i.forEach((function(e) {
                        e.addEventListener(t, n, r), m.push({
                            node: e,
                            eventType: t,
                            handler: n,
                            options: r
                        })
                    }))
                }

                function J() {
                    L() && ($("touchstart", Y, {
                        passive: !0
                    }), $("touchend", K, {
                        passive: !0
                    })), pt(x.props.trigger).forEach((function(e) {
                        if ("manual" !== e) switch ($(e, Y), e) {
                            case "mouseenter":
                                $("mouseleave", K);
                                break;
                            case "focus":
                                $(Ht ? "focusout" : "blur", Q);
                                break;
                            case "focusin":
                                $("focusout", Q);
                                break
                        }
                    }))
                }

                function X() {
                    m.forEach((function(e) {
                        var t = e.node,
                            n = e.eventType,
                            r = e.handler,
                            i = e.options;
                        t.removeEventListener(n, r, i)
                    })), m = []
                }

                function Y(e) {
                    var t, n = !1;
                    if (x.state.isEnabled && !Z(e) && !f) {
                        var r = "focus" === (null == (t = o) ? void 0 : t.type);
                        o = e, c = e.currentTarget, H(), !x.state.isVisible && wt(e) && Qt.forEach((function(t) {
                            return t(e)
                        })), "click" === e.type && (x.props.trigger.indexOf("mouseenter") < 0 || p) && !1 !== x.props.hideOnClick && x.state.isVisible ? n = !0 : ie(e), "click" === e.type && (p = !n), n && !r && oe(e)
                    }
                }

                function G(e) {
                    var t = e.target,
                        n = k().contains(t) || E.contains(t);
                    if ("mousemove" !== e.type || !n) {
                        var r = re().concat(E).map((function(e) {
                            var t, n = e._tippy,
                                r = null == (t = n.popperInstance) ? void 0 : t.state;
                            return r ? {
                                popperRect: e.getBoundingClientRect(),
                                popperState: r,
                                props: u
                            } : null
                        })).filter(Boolean);
                        At(r, e) && (W(), oe(e))
                    }
                }

                function K(e) {
                    var t = Z(e) || x.props.trigger.indexOf("click") >= 0 && p;
                    t || (x.props.interactive ? x.hideWithInteractivity(e) : oe(e))
                }

                function Q(e) {
                    x.props.trigger.indexOf("focusin") < 0 && e.target !== k() || x.props.interactive && e.relatedTarget && E.contains(e.relatedTarget) || oe(e)
                }

                function Z(e) {
                    return !!Lt.isTouch && L() !== e.type.indexOf("touch") >= 0
                }

                function ee() {
                    te();
                    var t = x.props,
                        n = t.popperOptions,
                        r = t.placement,
                        i = t.offset,
                        o = t.getReferenceClientRect,
                        a = t.moveTransition,
                        c = M() ? Yt(E).arrow : null,
                        u = o ? {
                            getBoundingClientRect: o,
                            contextElement: o.contextElement || k()
                        } : e,
                        p = {
                            name: "$$tippy",
                            enabled: !0,
                            phase: "beforeWrite",
                            requires: ["computeStyles"],
                            fn: function(e) {
                                var t = e.state;
                                if (M()) {
                                    var n = C(),
                                        r = n.box;
                                    ["placement", "reference-hidden", "escaped"].forEach((function(e) {
                                        "placement" === e ? r.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? r.setAttribute("data-" + e, "") : r.removeAttribute("data-" + e)
                                    })), t.attributes.popper = {}
                                }
                            }
                        },
                        f = [{
                            name: "offset",
                            options: {
                                offset: i
                            }
                        }, {
                            name: "preventOverflow",
                            options: {
                                padding: {
                                    top: 2,
                                    bottom: 2,
                                    left: 5,
                                    right: 5
                                }
                            }
                        }, {
                            name: "flip",
                            options: {
                                padding: 5
                            }
                        }, {
                            name: "computeStyles",
                            options: {
                                adaptive: !a
                            }
                        }, p];
                    M() && c && f.push({
                        name: "arrow",
                        options: {
                            element: c,
                            padding: 3
                        }
                    }), f.push.apply(f, (null == n ? void 0 : n.modifiers) || []), x.popperInstance = Ze(u, E, Object.assign({}, n, {
                        placement: r,
                        onFirstUpdate: s,
                        modifiers: f
                    }))
                }

                function te() {
                    x.popperInstance && (x.popperInstance.destroy(), x.popperInstance = null)
                }

                function ne() {
                    var e, t = x.props.appendTo,
                        n = k();
                    e = x.props.interactive && t === Rt.appendTo || "parent" === t ? n.parentNode : ct(t, [n]), e.contains(E) || e.appendChild(E), ee()
                }

                function re() {
                    return vt(E.querySelectorAll("[data-tippy-root]"))
                }

                function ie(e) {
                    x.clearDelayTimeouts(), e && B("onTrigger", [x, e]), q();
                    var t = S(!0),
                        r = D(),
                        i = r[0],
                        o = r[1];
                    Lt.isTouch && "hold" === i && o && (t = o), t ? n = setTimeout((function() {
                        x.show()
                    }), t) : x.show()
                }

                function oe(e) {
                    if (x.clearDelayTimeouts(), B("onUntrigger", [x, e]), x.state.isVisible) {
                        if (!(x.props.trigger.indexOf("mouseenter") >= 0 && x.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0 && p)) {
                            var t = S(!1);
                            t ? r = setTimeout((function() {
                                x.state.isVisible && x.hide()
                            }), t) : i = requestAnimationFrame((function() {
                                x.hide()
                            }))
                        }
                    } else U()
                }

                function ae() {
                    x.state.isEnabled = !0
                }

                function se() {
                    x.hide(), x.state.isEnabled = !1
                }

                function ce() {
                    clearTimeout(n), clearTimeout(r), cancelAnimationFrame(i)
                }

                function ue(t) {
                    if (!x.state.isDestroyed) {
                        B("onBeforeUpdate", [x, t]), X();
                        var n = x.props,
                            r = Ft(e, Object.assign({}, x.props, {}, t, {
                                ignoreAttributes: !0
                            }));
                        x.props = r, J(), n.interactiveDebounce !== r.interactiveDebounce && (W(), v = ut(G, r.interactiveDebounce)), n.triggerTarget && !r.triggerTarget ? ft(n.triggerTarget).forEach((function(e) {
                            e.removeAttribute("aria-expanded")
                        })) : r.triggerTarget && e.removeAttribute("aria-expanded"), H(), V(), j && j(n, r), x.popperInstance && (ee(), re().forEach((function(e) {
                            requestAnimationFrame(e._tippy.popperInstance.forceUpdate)
                        }))), B("onAfterUpdate", [x, t])
                    }
                }

                function pe(e) {
                    x.setProps({
                        content: e
                    })
                }

                function fe() {
                    var e = x.state.isVisible,
                        t = x.state.isDestroyed,
                        n = !x.state.isEnabled,
                        r = Lt.isTouch && !x.props.touch,
                        i = at(x.props.duration, 0, Rt.duration);
                    if (!(e || t || n || r) && !k().hasAttribute("disabled") && (B("onShow", [x], !1), !1 !== x.props.onShow(x))) {
                        if (x.state.isVisible = !0, M() && (E.style.visibility = "visible"), V(), q(), x.state.isMounted || (E.style.transition = "none"), M()) {
                            var o = C(),
                                a = o.box,
                                c = o.content;
                            Et([a, c], 0)
                        }
                        s = function() {
                            if (x.state.isVisible && !l) {
                                if (l = !0, E.offsetHeight, E.style.transition = x.props.moveTransition, M() && x.props.animation) {
                                    var e = C(),
                                        t = e.box,
                                        n = e.content;
                                    Et([t, n], i), jt([t, n], "visible")
                                }
                                P(), H(), dt(Zt, x), x.state.isMounted = !0, B("onMount", [x]), x.props.animation && M() && F(i, (function() {
                                    x.state.isShown = !0, B("onShown", [x])
                                }))
                            }
                        }, ne()
                    }
                }

                function de() {
                    var e = !x.state.isVisible,
                        t = x.state.isDestroyed,
                        n = !x.state.isEnabled,
                        r = at(x.props.duration, 1, Rt.duration);
                    if (!(e || t || n) && (B("onHide", [x], !1), !1 !== x.props.onHide(x))) {
                        if (x.state.isVisible = !1, x.state.isShown = !1, l = !1, p = !1, M() && (E.style.visibility = "hidden"), W(), U(), V(), M()) {
                            var i = C(),
                                o = i.box,
                                a = i.content;
                            x.props.animation && (Et([o, a], r), jt([o, a], "hidden"))
                        }
                        P(), H(), x.props.animation ? M() && _(r, x.unmount) : x.unmount()
                    }
                }

                function le(e) {
                    h.addEventListener("mousemove", v), dt(Qt, v), v(e)
                }

                function me() {
                    x.state.isVisible && x.hide(), x.state.isMounted && (te(), re().forEach((function(e) {
                        e._tippy.unmount()
                    })), E.parentNode && E.parentNode.removeChild(E), Zt = Zt.filter((function(e) {
                        return e !== x
                    })), x.state.isMounted = !1, B("onHidden", [x]))
                }

                function ve() {
                    x.state.isDestroyed || (x.clearDelayTimeouts(), x.unmount(), X(), delete e._tippy, x.state.isDestroyed = !0, B("onDestroy", [x]))
                }
            }

            function tn(e, t) {
                void 0 === t && (t = {});
                var n = Rt.plugins.concat(t.plugins || []);
                Vt();
                var r = Object.assign({}, t, {
                        plugins: n
                    }),
                    i = Ot(e),
                    o = i.reduce((function(e, t) {
                        var n = t && en(t, r);
                        return n && e.push(n), e
                    }), []);
                return gt(e) ? o[0] : o
            }
            tn.defaultProps = Rt, tn.setDefaultProps = qt, tn.currentInput = Lt;
            tn.setDefaultProps({
                render: Gt
            });
            t["a"] = tn
        }
    }
]);
//# sourceMappingURL=issue~timeline.01deb087.js.map