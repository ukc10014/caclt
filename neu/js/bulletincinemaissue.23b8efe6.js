(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["bulletin~cinema~issue"], {
        a5c0: function(t, e, n) {
            var i, a, r;
            (function(s, o) {
                if (s) {
                    o = o.bind(null, s, s.document), t.exports ? o(n("b3e9")) : (a = [n("b3e9")], i = o, r = "function" === typeof i ? i.apply(e, a) : i, void 0 === r || (t.exports = r))
                }
            })("undefined" != typeof window ? window : 0, (function(t, e, n) {
                "use strict";
                var i, a = n.cfg,
                    r = e.createElement("img"),
                    s = "sizes" in r && "srcset" in r,
                    o = /\s+\d+h/g,
                    l = function() {
                        var t = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
                            i = Array.prototype.forEach;
                        return function() {
                            var r = e.createElement("img"),
                                s = function(e) {
                                    var n, i, r = e.getAttribute(a.srcsetAttr);
                                    r && (i = r.match(t)) && (n = "w" == i[2] ? i[1] / i[3] : i[3] / i[1], n && e.setAttribute("data-aspectratio", n), e.setAttribute(a.srcsetAttr, r.replace(o, "")))
                                },
                                l = function(t) {
                                    if (t.detail.instance == n) {
                                        var e = t.target.parentNode;
                                        e && "PICTURE" == e.nodeName && i.call(e.getElementsByTagName("source"), s), s(t.target)
                                    }
                                },
                                c = function() {
                                    r.currentSrc && e.removeEventListener("lazybeforeunveil", l)
                                };
                            e.addEventListener("lazybeforeunveil", l), r.onload = c, r.onerror = c, r.srcset = "data:,a 1w 1h", r.complete && c()
                        }
                    }();
                a.supportsType || (a.supportsType = function(t) {
                    return !t
                }), t.HTMLPictureElement && s ? !n.hasHDescriptorFix && e.msElementsFromPoint && (n.hasHDescriptorFix = !0, l()) : t.picturefill || a.pf || (a.pf = function(e) {
                    var n, a;
                    if (!t.picturefill)
                        for (n = 0, a = e.elements.length; n < a; n++) i(e.elements[n])
                }, i = function() {
                    var r = function(t, e) {
                            return t.w - e.w
                        },
                        l = /^\s*\d+\.*\d*px\s*$/,
                        c = function(t) {
                            var e, n, i = t.length,
                                a = t[i - 1],
                                r = 0;
                            for (r; r < i; r++)
                                if (a = t[r], a.d = a.w / t.w, a.d >= t.d) {
                                    !a.cached && (e = t[r - 1]) && e.d > t.d - .13 * Math.pow(t.d, 2.2) && (n = Math.pow(e.d - .6, 1.6), e.cached && (e.d += .15 * n), e.d + (a.d - t.d) * n > t.d && (a = e));
                                    break
                                }
                            return a
                        },
                        u = function() {
                            var t, e = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
                                n = /\s/,
                                i = function(e, n, i, a) {
                                    t.push({
                                        c: n,
                                        u: i,
                                        w: 1 * a
                                    })
                                };
                            return function(a) {
                                return t = [], a = a.trim(), a.replace(o, "").replace(e, i), t.length || !a || n.test(a) || t.push({
                                    c: a,
                                    u: a,
                                    w: 99
                                }), t
                            }
                        }(),
                        d = function() {
                            d.init || (d.init = !0, addEventListener("resize", function() {
                                var t, n = e.getElementsByClassName("lazymatchmedia"),
                                    a = function() {
                                        var t, e;
                                        for (t = 0, e = n.length; t < e; t++) i(n[t])
                                    };
                                return function() {
                                    clearTimeout(t), t = setTimeout(a, 66)
                                }
                            }()))
                        },
                        f = function(e, i) {
                            var r, s = e.getAttribute("srcset") || e.getAttribute(a.srcsetAttr);
                            !s && i && (s = e._lazypolyfill ? e._lazypolyfill._set : e.getAttribute(a.srcAttr) || e.getAttribute("src")), e._lazypolyfill && e._lazypolyfill._set == s || (r = u(s || ""), i && e.parentNode && (r.isPicture = "PICTURE" == e.parentNode.nodeName.toUpperCase(), r.isPicture && t.matchMedia && (n.aC(e, "lazymatchmedia"), d())), r._set = s, Object.defineProperty(e, "_lazypolyfill", {
                                value: r,
                                writable: !0
                            }))
                        },
                        p = function(e) {
                            var i = t.devicePixelRatio || 1,
                                a = n.getX && n.getX(e);
                            return Math.min(a || i, 2.5, i)
                        },
                        m = function(e) {
                            return t.matchMedia ? (m = function(t) {
                                return !t || (matchMedia(t) || {}).matches
                            }, m(e)) : !e
                        },
                        h = function(t) {
                            var e, i, s, o, u, d, h;
                            if (o = t, f(o, !0), u = o._lazypolyfill, u.isPicture)
                                for (i = 0, e = t.parentNode.getElementsByTagName("source"), s = e.length; i < s; i++)
                                    if (a.supportsType(e[i].getAttribute("type"), t) && m(e[i].getAttribute("media"))) {
                                        o = e[i], f(o), u = o._lazypolyfill;
                                        break
                                    }
                            return u.length > 1 ? (h = o.getAttribute("sizes") || "", h = l.test(h) && parseInt(h, 10) || n.gW(t, t.parentNode), u.d = p(t), !u.src || !u.w || u.w < h ? (u.w = h, d = c(u.sort(r)), u.src = d) : d = u.src) : d = u[0], d
                        },
                        g = function(t) {
                            if (!s || !t.parentNode || "PICTURE" == t.parentNode.nodeName.toUpperCase()) {
                                var e = h(t);
                                e && e.u && t._lazypolyfill.cur != e.u && (t._lazypolyfill.cur = e.u, e.cached = !0, t.setAttribute(a.srcAttr, e.u), t.setAttribute("src", e.u))
                            }
                        };
                    return g.parse = u, g
                }(), a.loadedClass && a.loadingClass && function() {
                    var t = [];
                    ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach((function(e) {
                        t.push(e + a.loadedClass), t.push(e + a.loadingClass)
                    })), a.pf({
                        elements: e.querySelectorAll(t.join(", "))
                    })
                }())
            }))
        },
        b3e9: function(t, e, n) {
            (function(e, n) {
                var i = n(e, e.document, Date);
                e.lazySizes = i, t.exports && (t.exports = i)
            })("undefined" != typeof window ? window : {}, (function(t, e, n) {
                "use strict";
                var i, a;
                if (function() {
                        var e, n = {
                            lazyClass: "lazyload",
                            loadedClass: "lazyloaded",
                            loadingClass: "lazyloading",
                            preloadClass: "lazypreload",
                            errorClass: "lazyerror",
                            autosizesClass: "lazyautosizes",
                            srcAttr: "data-src",
                            srcsetAttr: "data-srcset",
                            sizesAttr: "data-sizes",
                            minSize: 40,
                            customMedia: {},
                            init: !0,
                            expFactor: 1.5,
                            hFac: .8,
                            loadMode: 2,
                            loadHidden: !0,
                            ricTimeout: 0,
                            throttleDelay: 125
                        };
                        for (e in a = t.lazySizesConfig || t.lazysizesConfig || {}, n) e in a || (a[e] = n[e])
                    }(), !e || !e.getElementsByClassName) return {
                    init: function() {},
                    cfg: a,
                    noSupport: !0
                };
                var r = e.documentElement,
                    s = t.HTMLPictureElement,
                    o = "addEventListener",
                    l = "getAttribute",
                    c = t[o].bind(t),
                    u = t.setTimeout,
                    d = t.requestAnimationFrame || u,
                    f = t.requestIdleCallback,
                    p = /^picture$/i,
                    m = ["load", "error", "lazyincluded", "_lazyloaded"],
                    h = {},
                    g = Array.prototype.forEach,
                    y = function(t, e) {
                        return h[e] || (h[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), h[e].test(t[l]("class") || "") && h[e]
                    },
                    v = function(t, e) {
                        y(t, e) || t.setAttribute("class", (t[l]("class") || "").trim() + " " + e)
                    },
                    z = function(t, e) {
                        var n;
                        (n = y(t, e)) && t.setAttribute("class", (t[l]("class") || "").replace(n, " "))
                    },
                    b = function(t, e, n) {
                        var i = n ? o : "removeEventListener";
                        n && b(t, e), m.forEach((function(n) {
                            t[i](n, e)
                        }))
                    },
                    w = function(t, n, a, r, s) {
                        var o = e.createEvent("Event");
                        return a || (a = {}), a.instance = i, o.initEvent(n, !r, !s), o.detail = a, t.dispatchEvent(o), o
                    },
                    A = function(e, n) {
                        var i;
                        !s && (i = t.picturefill || a.pf) ? (n && n.src && !e[l]("srcset") && e.setAttribute("srcset", n.src), i({
                            reevaluate: !0,
                            elements: [e]
                        })) : n && n.src && (e.src = n.src)
                    },
                    C = function(t, e) {
                        return (getComputedStyle(t, null) || {})[e]
                    },
                    E = function(t, e, n) {
                        n = n || t.offsetWidth;
                        while (n < a.minSize && e && !t._lazysizesWidth) n = e.offsetWidth, e = e.parentNode;
                        return n
                    },
                    _ = function() {
                        var t, n, i = [],
                            a = [],
                            r = i,
                            s = function() {
                                var e = r;
                                r = i.length ? a : i, t = !0, n = !1;
                                while (e.length) e.shift()();
                                t = !1
                            },
                            o = function(i, a) {
                                t && !a ? i.apply(this, arguments) : (r.push(i), n || (n = !0, (e.hidden ? u : d)(s)))
                            };
                        return o._lsFlush = s, o
                    }(),
                    N = function(t, e) {
                        return e ? function() {
                            _(t)
                        } : function() {
                            var e = this,
                                n = arguments;
                            _((function() {
                                t.apply(e, n)
                            }))
                        }
                    },
                    M = function(t) {
                        var e, i = 0,
                            r = a.throttleDelay,
                            s = a.ricTimeout,
                            o = function() {
                                e = !1, i = n.now(), t()
                            },
                            l = f && s > 49 ? function() {
                                f(o, {
                                    timeout: s
                                }), s !== a.ricTimeout && (s = a.ricTimeout)
                            } : N((function() {
                                u(o)
                            }), !0);
                        return function(t) {
                            var a;
                            (t = !0 === t) && (s = 33), e || (e = !0, a = r - (n.now() - i), a < 0 && (a = 0), t || a < 9 ? l() : u(l, a))
                        }
                    },
                    x = function(t) {
                        var e, i, a = 99,
                            r = function() {
                                e = null, t()
                            },
                            s = function() {
                                var t = n.now() - i;
                                t < a ? u(s, a - t) : (f || r)(r)
                            };
                        return function() {
                            i = n.now(), e || (e = u(s, a))
                        }
                    },
                    P = function() {
                        var s, f, m, h, E, P, F, S, L, R, W, B, k = /^img$/i,
                            H = /^iframe$/i,
                            I = "onscroll" in t && !/(gle|ing)bot/.test(navigator.userAgent),
                            $ = 0,
                            D = 0,
                            U = 0,
                            O = -1,
                            j = function(t) {
                                U--, (!t || U < 0 || !t.target) && (U = 0)
                            },
                            q = function(t) {
                                return null == B && (B = "hidden" == C(e.body, "visibility")), B || !("hidden" == C(t.parentNode, "visibility") && "hidden" == C(t, "visibility"))
                            },
                            J = function(t, n) {
                                var i, a = t,
                                    s = q(t);
                                S -= n, W += n, L -= n, R += n;
                                while (s && (a = a.offsetParent) && a != e.body && a != r) s = (C(a, "opacity") || 1) > 0, s && "visible" != C(a, "overflow") && (i = a.getBoundingClientRect(), s = R > i.left && L < i.right && W > i.top - 1 && S < i.bottom + 1);
                                return s
                            },
                            Q = function() {
                                var t, n, o, c, u, d, p, m, g, y, v, z, b = i.elements;
                                if ((h = a.loadMode) && U < 8 && (t = b.length)) {
                                    for (n = 0, O++; n < t; n++)
                                        if (b[n] && !b[n]._lazyRace)
                                            if (!I || i.prematureUnveil && i.prematureUnveil(b[n])) et(b[n]);
                                            else if ((m = b[n][l]("data-expand")) && (d = 1 * m) || (d = D), y || (y = !a.expand || a.expand < 1 ? r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370 : a.expand, i._defEx = y, v = y * a.expFactor, z = a.hFac, B = null, D < v && U < 1 && O > 2 && h > 2 && !e.hidden ? (D = v, O = 0) : D = h > 1 && O > 1 && U < 6 ? y : $), g !== d && (P = innerWidth + d * z, F = innerHeight + d, p = -1 * d, g = d), o = b[n].getBoundingClientRect(), (W = o.bottom) >= p && (S = o.top) <= F && (R = o.right) >= p * z && (L = o.left) <= P && (W || R || L || S) && (a.loadHidden || q(b[n])) && (f && U < 3 && !m && (h < 3 || O < 4) || J(b[n], d))) {
                                        if (et(b[n]), u = !0, U > 9) break
                                    } else !u && f && !c && U < 4 && O < 4 && h > 2 && (s[0] || a.preloadAfterLoad) && (s[0] || !m && (W || R || L || S || "auto" != b[n][l](a.sizesAttr))) && (c = s[0] || b[n]);
                                    c && !u && et(c)
                                }
                            },
                            X = M(Q),
                            G = function(t) {
                                var e = t.target;
                                e._lazyCache ? delete e._lazyCache : (j(t), v(e, a.loadedClass), z(e, a.loadingClass), b(e, V), w(e, "lazyloaded"))
                            },
                            K = N(G),
                            V = function(t) {
                                K({
                                    target: t.target
                                })
                            },
                            Y = function(t, e) {
                                try {
                                    t.contentWindow.location.replace(e)
                                } catch (n) {
                                    t.src = e
                                }
                            },
                            Z = function(t) {
                                var e, n = t[l](a.srcsetAttr);
                                (e = a.customMedia[t[l]("data-media") || t[l]("media")]) && t.setAttribute("media", e), n && t.setAttribute("srcset", n)
                            },
                            tt = N((function(t, e, n, i, r) {
                                var s, o, c, d, f, h;
                                (f = w(t, "lazybeforeunveil", e)).defaultPrevented || (i && (n ? v(t, a.autosizesClass) : t.setAttribute("sizes", i)), o = t[l](a.srcsetAttr), s = t[l](a.srcAttr), r && (c = t.parentNode, d = c && p.test(c.nodeName || "")), h = e.firesLoad || "src" in t && (o || s || d), f = {
                                    target: t
                                }, v(t, a.loadingClass), h && (clearTimeout(m), m = u(j, 2500), b(t, V, !0)), d && g.call(c.getElementsByTagName("source"), Z), o ? t.setAttribute("srcset", o) : s && !d && (H.test(t.nodeName) ? Y(t, s) : t.src = s), r && (o || d) && A(t, {
                                    src: s
                                })), t._lazyRace && delete t._lazyRace, z(t, a.lazyClass), _((function() {
                                    var e = t.complete && t.naturalWidth > 1;
                                    h && !e || (e && v(t, "ls-is-cached"), G(f), t._lazyCache = !0, u((function() {
                                        "_lazyCache" in t && delete t._lazyCache
                                    }), 9)), "lazy" == t.loading && U--
                                }), !0)
                            })),
                            et = function(t) {
                                if (!t._lazyRace) {
                                    var e, n = k.test(t.nodeName),
                                        i = n && (t[l](a.sizesAttr) || t[l]("sizes")),
                                        r = "auto" == i;
                                    (!r && f || !n || !t[l]("src") && !t.srcset || t.complete || y(t, a.errorClass) || !y(t, a.lazyClass)) && (e = w(t, "lazyunveilread").detail, r && T.updateElem(t, !0, t.offsetWidth), t._lazyRace = !0, U++, tt(t, e, r, i, n))
                                }
                            },
                            nt = x((function() {
                                a.loadMode = 3, X()
                            })),
                            it = function() {
                                3 == a.loadMode && (a.loadMode = 2), nt()
                            },
                            at = function() {
                                f || (n.now() - E < 999 ? u(at, 999) : (f = !0, a.loadMode = 3, X(), c("scroll", it, !0)))
                            };
                        return {
                            _: function() {
                                E = n.now(), i.elements = e.getElementsByClassName(a.lazyClass), s = e.getElementsByClassName(a.lazyClass + " " + a.preloadClass), c("scroll", X, !0), c("resize", X, !0), c("pageshow", (function(t) {
                                    if (t.persisted) {
                                        var n = e.querySelectorAll("." + a.loadingClass);
                                        n.length && n.forEach && d((function() {
                                            n.forEach((function(t) {
                                                t.complete && et(t)
                                            }))
                                        }))
                                    }
                                })), t.MutationObserver ? new MutationObserver(X).observe(r, {
                                    childList: !0,
                                    subtree: !0,
                                    attributes: !0
                                }) : (r[o]("DOMNodeInserted", X, !0), r[o]("DOMAttrModified", X, !0), setInterval(X, 999)), c("hashchange", X, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach((function(t) {
                                    e[o](t, X, !0)
                                })), /d$|^c/.test(e.readyState) ? at() : (c("load", at), e[o]("DOMContentLoaded", X), u(at, 2e4)), i.elements.length ? (Q(), _._lsFlush()) : X()
                            },
                            checkElems: X,
                            unveil: et,
                            _aLSL: it
                        }
                    }(),
                    T = function() {
                        var t, n = N((function(t, e, n, i) {
                                var a, r, s;
                                if (t._lazysizesWidth = i, i += "px", t.setAttribute("sizes", i), p.test(e.nodeName || ""))
                                    for (a = e.getElementsByTagName("source"), r = 0, s = a.length; r < s; r++) a[r].setAttribute("sizes", i);
                                n.detail.dataAttr || A(t, n.detail)
                            })),
                            i = function(t, e, i) {
                                var a, r = t.parentNode;
                                r && (i = E(t, r, i), a = w(t, "lazybeforesizes", {
                                    width: i,
                                    dataAttr: !!e
                                }), a.defaultPrevented || (i = a.detail.width, i && i !== t._lazysizesWidth && n(t, r, a, i)))
                            },
                            r = function() {
                                var e, n = t.length;
                                if (n)
                                    for (e = 0; e < n; e++) i(t[e])
                            },
                            s = x(r);
                        return {
                            _: function() {
                                t = e.getElementsByClassName(a.autosizesClass), c("resize", s)
                            },
                            checkElems: s,
                            updateElem: i
                        }
                    }(),
                    F = function() {
                        !F.i && e.getElementsByClassName && (F.i = !0, T._(), P._())
                    };
                return u((function() {
                    a.init && F()
                })), i = {
                    cfg: a,
                    autoSizer: T,
                    loader: P,
                    init: F,
                    uP: A,
                    aC: v,
                    rC: z,
                    hC: y,
                    fire: w,
                    gW: E,
                    rAF: _
                }, i
            }))
        },
        bf51: function(t, e, n) {
            var i, a, r;
            (function(s, o) {
                if (s) {
                    o = o.bind(null, s, s.document), t.exports ? o(n("b3e9")) : (a = [n("b3e9")], i = o, r = "function" === typeof i ? i.apply(e, a) : i, void 0 === r || (t.exports = r))
                }
            })("undefined" != typeof window ? window : 0, (function(t, e, n) {
                "use strict";
                if (t.addEventListener) {
                    var i = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
                        a = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
                        r = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
                        s = /^picture$/i,
                        o = n.cfg,
                        l = function(t) {
                            return getComputedStyle(t, null) || {}
                        },
                        c = {
                            getParent: function(e, n) {
                                var i = e,
                                    a = e.parentNode;
                                return n && "prev" != n || !a || !s.test(a.nodeName || "") || (a = a.parentNode), "self" != n && (i = "prev" == n ? e.previousElementSibling : n && (a.closest || t.jQuery) && (a.closest ? a.closest(n) : jQuery(a).closest(n)[0]) || a), i
                            },
                            getFit: function(t) {
                                var e, n, i = l(t),
                                    s = i.content || i.fontFamily,
                                    o = {
                                        fit: t._lazysizesParentFit || t.getAttribute("data-parent-fit")
                                    };
                                return !o.fit && s && (e = s.match(a)) && (o.fit = e[1]), o.fit ? (n = t._lazysizesParentContainer || t.getAttribute("data-parent-container"), !n && s && (e = s.match(r)) && (n = e[1]), o.parent = c.getParent(t, n)) : o.fit = i.objectFit, o
                            },
                            getImageRatio: function(e) {
                                var n, a, r, l, c, u, d, f = e.parentNode,
                                    p = f && s.test(f.nodeName || "") ? f.querySelectorAll("source, img") : [e];
                                for (n = 0; n < p.length; n++)
                                    if (e = p[n], a = e.getAttribute(o.srcsetAttr) || e.getAttribute("srcset") || e.getAttribute("data-pfsrcset") || e.getAttribute("data-risrcset") || "", r = e._lsMedia || e.getAttribute("media"), r = o.customMedia[e.getAttribute("data-media") || r] || r, a && (!r || (t.matchMedia && matchMedia(r) || {}).matches)) {
                                        l = parseFloat(e.getAttribute("data-aspectratio")), l || (c = a.match(i), c ? "w" == c[2] ? (u = c[1], d = c[3]) : (u = c[3], d = c[1]) : (u = e.getAttribute("width"), d = e.getAttribute("height")), l = u / d);
                                        break
                                    }
                                return l
                            },
                            calculateSize: function(t, e) {
                                var n, i, a, r, s = this.getFit(t),
                                    o = s.fit,
                                    l = s.parent;
                                return "width" == o || ("contain" == o || "cover" == o) && (a = this.getImageRatio(t)) ? (l ? e = l.clientWidth : l = t, r = e, "width" == o ? r = e : (i = l.clientHeight, (n = e / i) && ("cover" == o && n < a || "contain" == o && n > a) && (r = e * (a / n))), r) : e
                            }
                        };
                    n.parentFit = c, e.addEventListener("lazybeforesizes", (function(t) {
                        if (!t.defaultPrevented && t.detail.instance == n) {
                            var e = t.target;
                            t.detail.width = c.calculateSize(e, t.detail.width)
                        }
                    }))
                }
            }))
        }
    }
]);
//# sourceMappingURL=bulletin~cinema~issue.23b8efe6.js.map