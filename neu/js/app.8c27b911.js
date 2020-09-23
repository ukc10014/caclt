
(function(e) {
    function t(t) {
        for (var r, i, o = t[0], c = t[1], l = t[2], u = 0, f = []; u < o.length; u++) i = o[u], Object.prototype.hasOwnProperty.call(s, i) && s[i] && f.push(s[i][0]), s[i] = 0;
        for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (e[r] = c[r]);
        m && m(t);
        while (f.length) f.shift()();
        return a.push.apply(a, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < a.length; t++) {
            for (var n = a[t], r = !0, i = 1; i < n.length; i++) {
                var o = n[i];
                0 !== s[o] && (r = !1)
            }
            r && (a.splice(t--, 1), e = c(c.s = n[0]))
        }
        return e
    }
    var r = {},
        i = {
            app: 0
        },
        s = {
            app: 0
        },
        a = [];

    function o(e) {
        return c.p + "js/" + ({
            about: "about",
            "bulletin~cinema~issue": "bulletin~cinema~issue",
            bulletin: "bulletin",
            cinema: "cinema",
            "issue~timeline": "issue~timeline",
            issue: "issue",
            timeline: "timeline",
            library: "library",
            museum: "museum",
            viewer: "viewer"
        }[e] || e) + "." + {
            about: "f7aebb40",
            "bulletin~cinema~issue": "23b8efe6",
            bulletin: "af7a106d",
            cinema: "15b14172",
            "issue~timeline": "01deb087",
            issue: "a6995c36",
            timeline: "5b9bd5ae",
            library: "786c1978",
            museum: "4991cac1",
            viewer: "08d69148"
        }[e] + ".js"
    }

    function c(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, c), n.l = !0, n.exports
    }
    c.e = function(e) {
        var t = [],
            n = {
                about: 1,
                bulletin: 1,
                cinema: 1,
                issue: 1,
                timeline: 1,
                library: 1,
                museum: 1,
                viewer: 1
            };
        i[e] ? t.push(i[e]) : 0 !== i[e] && n[e] && t.push(i[e] = new Promise((function(t, n) {
            for (var r = "css/" + ({
                    about: "about",
                    "bulletin~cinema~issue": "bulletin~cinema~issue",
                    bulletin: "bulletin",
                    cinema: "cinema",
                    "issue~timeline": "issue~timeline",
                    issue: "issue",
                    timeline: "timeline",
                    library: "library",
                    museum: "museum",
                    viewer: "viewer"
                }[e] || e) + "." + {
                    about: "523ec120",
                    "bulletin~cinema~issue": "31d6cfe0",
                    bulletin: "e5e183fd",
                    cinema: "d10f2ce6",
                    "issue~timeline": "31d6cfe0",
                    issue: "7b5f2103",
                    timeline: "b06c9013",
                    library: "e57362c7",
                    museum: "13cd2a79",
                    viewer: "5a241297"
                }[e] + ".css", s = c.p + r, a = document.getElementsByTagName("link"), o = 0; o < a.length; o++) {
                var l = a[o],
                    u = l.getAttribute("data-href") || l.getAttribute("href");
                if ("stylesheet" === l.rel && (u === r || u === s)) return t()
            }
            var f = document.getElementsByTagName("style");
            for (o = 0; o < f.length; o++) {
                l = f[o], u = l.getAttribute("data-href");
                if (u === r || u === s) return t()
            }
            var m = document.createElement("link");
            m.rel = "stylesheet", m.type = "text/css", m.onload = t, m.onerror = function(t) {
                var r = t && t.target && t.target.src || s,
                    a = new Error("Loading CSS chunk " + e + " failed.\n(" + r + ")");
                a.code = "CSS_CHUNK_LOAD_FAILED", a.request = r, delete i[e], m.parentNode.removeChild(m), n(a)
            }, m.href = s;
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(m)
        })).then((function() {
            i[e] = 0
        })));
        var r = s[e];
        if (0 !== r)
            if (r) t.push(r[2]);
            else {
                var a = new Promise((function(t, n) {
                    r = s[e] = [t, n]
                }));
                t.push(r[2] = a);
                var l, u = document.createElement("script");
                u.charset = "utf-8", u.timeout = 120, c.nc && u.setAttribute("nonce", c.nc), u.src = o(e);
                var f = new Error;
                l = function(t) {
                    u.onerror = u.onload = null, clearTimeout(m);
                    var n = s[e];
                    if (0 !== n) {
                        if (n) {
                            var r = t && ("load" === t.type ? "missing" : t.type),
                                i = t && t.target && t.target.src;
                            f.message = "Loading chunk " + e + " failed.\n(" + r + ": " + i + ")", f.name = "ChunkLoadError", f.type = r, f.request = i, n[1](f)
                        }
                        s[e] = void 0
                    }
                };
                var m = setTimeout((function() {
                    l({
                        type: "timeout",
                        target: u
                    })
                }), 12e4);
                u.onerror = u.onload = l, document.head.appendChild(u)
            }
        return Promise.all(t)
    }, c.m = e, c.c = r, c.d = function(e, t, n) {
        c.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, c.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, c.t = function(e, t) {
        if (1 & t && (e = c(e)), 8 & t) return e;
        if (4 & t && "object" === typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (c.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) c.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
        return n
    }, c.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return c.d(t, "a", t), t
    }, c.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, c.p = "/", c.oe = function(e) {
        throw console.error(e), e
    };
    var l = window["webpackJsonp"] = window["webpackJsonp"] || [],
        u = l.push.bind(l);
    l.push = t, l = l.slice();
    for (var f = 0; f < l.length; f++) t(l[f]);
    var m = u;
    a.push([0, "chunk-vendors"]), n()
})({
    0: function(e, t, n) {
        e.exports = n("56d7")
    },
    1: function(e, t) {},
    2: function(e, t) {},
    3: function(e, t) {},
    "37d2": function(e, t, n) {},
    4: function(e, t) {},
    4134: function(e, t, n) {},
    4360: function(e, t, n) {
        "use strict";
        var r = n("2b0e"),
            i = n("2f62"),
            s = (n("386d"), n("96cf"), n("3b8d")),
            a = "https://content.cosmos.art",
            o = {
                getBulletin: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t) {
                        var n, r, i;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.commit, this.state.bulletin) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.next = 4, fetch("".concat(a, "/v1/cosmic-bulletin"));
                                case 4:
                                    return r = e.sent, e.next = 7, r.json();
                                case 7:
                                    i = e.sent, n("SET_BULLETIN", i);
                                case 9:
                                case "end":
                                    return e.stop()
                            }
                        }), e, this)
                    })));

                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t
                }(),
                getContribution: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t, n) {
                        var r, i, s, o;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (r = t.commit, i = "".concat(n.params.issue, "/").concat(n.params.slug), this.state.contributions[i]) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.next = 5, fetch("".concat(a, "/v1/cosmic-bulletin/").concat(i));
                                case 5:
                                    return s = e.sent, e.next = 8, s.json();
                                case 8:
                                    o = e.sent, r("SET_CONTRIBUTION", {
                                        key: "cosmic-bulletin/".concat(i),
                                        json: o
                                    }), setTimeout((function() {
                                        window.prerenderReady = !0, console.log("ready")
                                    }), 1500);
                                case 11:
                                case "end":
                                    return e.stop()
                            }
                        }), e, this)
                    })));

                    function t(t, n) {
                        return e.apply(this, arguments)
                    }
                    return t
                }(),
                getEvents: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t) {
                        var n, r, i, s;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.state, r = t.commit, !n.events) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 3:
                                    return e.next = 5, fetch("".concat(a, "/v1/events"));
                                case 5:
                                    return i = e.sent, e.next = 8, i.json();
                                case 8:
                                    s = e.sent, r("SET_EVENTS", s);
                                case 10:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));

                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t
                }(),
                getLibrary: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t) {
                        var n, r, i, s;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.state, r = t.commit, !n.library) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 3:
                                    return e.next = 5, fetch("".concat(a, "/v1/library"));
                                case 5:
                                    return i = e.sent, e.next = 8, i.json();
                                case 8:
                                    s = e.sent, r("SET_LIBRARY", s);
                                case 10:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));

                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t
                }(),
                getTerms: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t) {
                        var n, r, i, s;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.state, r = t.commit, !n.terms) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 3:
                                    return e.next = 5, fetch("".concat(a, "/v1/terms"));
                                case 5:
                                    return i = e.sent, e.next = 8, i.json();
                                case 8:
                                    s = e.sent, r("SET_TERMS", s);
                                case 10:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));

                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t
                }(),
                getCinema: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t) {
                        var n, r, i;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.commit, this.state.cinema) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.next = 4, fetch("".concat(a, "/v1/cinema"));
                                case 4:
                                    return r = e.sent, e.next = 7, r.json();
                                case 7:
                                    i = e.sent, n("SET_CINEMA", i);
                                case 9:
                                case "end":
                                    return e.stop()
                            }
                        }), e, this)
                    })));

                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t
                }(),
                getSchool: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t) {
                        var n, r, i;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.commit, this.state.school) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.next = 4, fetch("".concat(a, "/v1/school"));
                                case 4:
                                    return r = e.sent, e.next = 7, r.json();
                                case 7:
                                    i = e.sent, n("SET_SCHOOL", i);
                                case 9:
                                case "end":
                                    return e.stop()
                            }
                        }), e, this)
                    })));

                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t
                }(),
                getMuseum: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t) {
                        var n, r, i;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.commit, this.state.museum) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.next = 4, fetch("".concat(a, "/v1/museum"));
                                case 4:
                                    return r = e.sent, e.next = 7, r.json();
                                case 7:
                                    i = e.sent, n("SET_MUSEUM", i);
                                case 9:
                                case "end":
                                    return e.stop()
                            }
                        }), e, this)
                    })));

                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t
                }(),
                search: function() {
                    var e = Object(s["a"])(regeneratorRuntime.mark((function e(t, n) {
                        var r, i, s;
                        return regeneratorRuntime.wrap((function(e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    if (r = t.commit, this.state.search) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.next = 4, fetch("".concat(a, "/v1/search?term=").concat(n));
                                case 4:
                                    return i = e.sent, e.next = 7, i.json();
                                case 7:
                                    s = e.sent, r("SET_SEARCH", {
                                        term: n,
                                        results: s
                                    });
                                case 9:
                                case "end":
                                    return e.stop()
                            }
                        }), e, this)
                    })));

                    function t(t, n) {
                        return e.apply(this, arguments)
                    }
                    return t
                }()
            },
            c = {
                SET_FADEMENU: function(e, t) {
                    e.fadeMenu = t
                },
                SET_CONTRIBUTION: function(e, t) {
                    e.contributions.push(t)
                },
                SET_BULLETIN: function(e, t) {
                    e.bulletin = t
                },
                SET_LIBRARY: function(e, t) {
                    e.library = t
                },
                SET_TERMS: function(e, t) {
                    e.terms = t
                },
                SET_CINEMA: function(e, t) {
                    e.cinema = t
                },
                SET_SCHOOL: function(e, t) {
                    e.school = t
                },
                SET_EVENTS: function(e, t) {
                    e.events = t
                },
                SET_MUSEUM: function(e, t) {
                    e.museum = t
                },
                SET_SEARCH: function(e, t) {
                    e.search = t
                },
                SET_HIDE_SPLASH: function(e, t) {
                    e.hideSplash = !!t, l("splash", t)
                }
            };

        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            "localStorage" in window && window.localStorage.setItem(e, t)
        }
        var u = n("75fc"),
            f = (n("55dd"), {
                library: function(e) {
                    var t = e.library;
                    return function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "year",
                            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        if (!t) return [];
                        var r = Object(u["a"])(t).sort((function(t, n) {
                            return t[e] > n[e] ? 1 : t[e] < n[e] ? -1 : 0
                        }));
                        return !n && r.reverse(), r
                    }
                }
            });
        r["a"].use(i["a"]);
        t["a"] = new i["a"].Store({
            state: {
                hideSplash: !1,
                fadeMenu: !1,
                library: null,
                terms: null,
                events: null,
                cinema: null,
                school: null,
                bulletin: null,
                museum: null,
                contributions: [],
                search: null
            },
            actions: o,
            mutations: c,
            getters: f
        })
    },
    "56d7": function(e, t, n) {
        "use strict";
        n.r(t);
        n("ac4d"), n("8a81"), n("ac6a");
        var r = n("75fc"),
            i = (n("cadf"), n("551c"), n("f751"), n("097d"), n("2b0e")),
            s = function() {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    staticClass: "transition flex flex-col min-h-screen",
                    style: e.style,
                    attrs: {
                        id: "app"
                    }
                }, [n("transition", {
                    attrs: {
                        name: "fade"
                    }
                }, [e.hideSplash ? e._e() : n("splash")], 1), e.hideMenu ? e._e() : n("div", {
                    staticClass: "z-10 transition sticky top-0 flex justify-between uppercase py-3 px-3 md:px-6 bg-gray-500",
                    class: {
                        "opacity-0": e.fadeMenu
                    },
                    style: e.style,
                    attrs: {
                        id: "nav"
                    }
                }, [e.isHome ? n("div", {
                    staticClass: "w-1/4"
                }, [n("router-link", {
                    staticClass: "hidden md:inline",
                    attrs: {
                        to: "/"
                    }
                }, [e._v("Menu")]), n("router-link", {
                    staticClass: "md:hidden",
                    attrs: {
                        to: "/about"
                    }
                }, [e._v("About")])], 1) : n("div", {
                    staticClass: "w-1/4"
                }, [n("router-link", {
                    attrs: {
                        to: "/"
                    }
                }, [e._v("Menu")])], 1), e.isHome ? n("div", {
                    staticClass: "cursor-pointer",
                    on: {
                        click: e.showSplash
                    }
                }, [n("span", {
                    staticClass: "hidden lg:inline"
                }, [e._v("Institute of the Cosmos")]), n("span", {
                    staticClass: "md:inline lg:hidden"
                }, [e._v("I.O.T.C.")])]) : n("div", {
                    staticClass: "w-1/2 text-center flex items-center justify-center"
                }, [n("router-link", {
                    attrs: {
                        to: "/"
                    }
                }, [n("span", {
                    staticClass: "hidden lg:inline"
                }, [e._v("Institute of the Cosmos")]), n("span", {
                    staticClass: "hidden md:inline lg:hidden"
                }, [e._v("I.O.T.C.")]), e.breadcrumb ? n("span", [n("svg", {
                    staticClass: "transition hidden md:inline-block mx-2 -mt-1",
                    attrs: {
                        width: "27",
                        height: "18",
                        viewBox: "0 0 27 18",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                    }
                }, [n("line", {
                    attrs: {
                        y1: "9",
                        x2: "24",
                        y2: "9",
                        stroke: e.arrowColor,
                        "stroke-width": "2"
                    }
                }), n("path", {
                    attrs: {
                        d: "M19 1L25 9L19 17",
                        stroke: e.arrowColor,
                        "stroke-width": "2"
                    }
                })]), n("span", {
                    domProps: {
                        textContent: e._s(e.breadcrumb)
                    }
                })]) : n("span", {
                    staticClass: "md:hidden"
                }, [e._v("I.O.T.C.")])])], 1), n("div", {
                    staticClass: "w-1/4 text-right"
                }, [n("router-link", {
                    staticClass: "mr-3 hidden md:inline",
                    attrs: {
                        to: "/about"
                    }
                }, [e._v("About")]), n("span", {
                    staticClass: "cursor-pointer",
                    on: {
                        click: function(t) {
                            e.showSearch = !0
                        }
                    }
                }, [e._v("Search")])], 1)]), e.hideSplash && !e.hideStars ? n("div", {
                    staticClass: "stars-wrapper"
                }, [n("div", {
                    staticClass: "stars"
                })]) : e._e(), n("transition", {
                    attrs: {
                        name: "slide-fade"
                    }
                }, [n("Search", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.showSearch,
                        expression: "showSearch"
                    }],
                    staticClass: "z-30 searchwrapper",
                    attrs: {
                        showing: e.showSearch
                    },
                    on: {
                        close: function(t) {
                            e.showSearch = !1
                        },
                        goto: e.goto
                    }
                })], 1), n("router-view")], 1)
            },
            a = [],
            o = (n("7f7f"), function() {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    staticClass: "fixed top-0 left-0 w-screen h-screen z-40 bg-black flex items-center justify-center",
                    attrs: {
                        id: "splash"
                    }
                }, [n("div", {
                    staticClass: "fixed hidden md:flex top-0 left-0 justify-center items-center border-current border-r border-b h-16 w-16 serif"
                }, [e._v("I")]), n("div", {
                    staticClass: "fixed hidden md:flex top-0 right-0 justify-center items-center border-current border-l border-b h-16 w-16 serif"
                }, [e._v("O")]), n("div", {
                    staticClass: "fixed hidden md:flex bottom-0 left-0 justify-center items-center border-current border-r border-t h-16 w-16 serif"
                }, [e._v("T")]), n("div", {
                    staticClass: "fixed hidden md:flex bottom-0 right-0 justify-center items-center border-current border-l border-t h-16 w-16 serif"
                }, [e._v("C")]), e._m(0), n("div", {
                    staticClass: "flex fixed bottom-0 left-0 right-0 justify-center z-20"
                }, [n("div", {
                    staticClass: "border-current serif uppercase text-sm border flex items-center py-4 md:py-2 mb-4 px-12 uppercase tracking-wider bg-black"
                }, [n("span", {
                    ref: "countdown"
                })])]), n("div", {
                    staticClass: "bg-black fixed border border-current relative z-20 text-center px-6 py-2 uppercase cursor-pointer",
                    on: {
                        click: e.hideSplash
                    }
                }, [e._v("Enter")]), n("div", {
                    staticClass: "fixed top-0 h-screen line-v"
                }), n("div", {
                    staticClass: "fixed left-0 w-screen line-h"
                }), e.started ? n("Celestial") : e._e()], 1)
            }),
            c = [function() {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    staticClass: "flex fixed top-0 left-0 right-0 justify-center z-20"
                }, [n("div", {
                    staticClass: "border-current border border-t-0 py-2 md:py-0 md:h-16 flex items-center px-12 uppercase md:tracking-wider bg-black text-center"
                }, [e._v("Institute of the Cosmos")])])
            }],
            l = (n("6b54"), n("456d"), n("f5766"), n("72fe")),
            u = n.n(l),
            f = function() {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    staticClass: "cursor-move",
                    attrs: {
                        id: "celestial-map"
                    }
                })
            },
            m = [],
            h = n("de2b"),
            d = n.n(h),
            p = {
                name: "Celestial",
                data: function() {
                    return {
                        index: 0,
                        zoom: 1,
                        config: {
                            width: 2 * window.outerHeight,
                            projection: "aitoff",
                            transform: "equatorial",
                            center: [0, 0, 0],
                            orientationfixed: !0,
                            follow: "zenith",
                            zoomlevel: 1.5,
                            zoomextend: 1.5,
                            adaptable: !0,
                            interactive: !0,
                            form: !1,
                            location: !1,
                            formFields: {
                                location: !0,
                                general: !0,
                                stars: !0,
                                dsos: !0,
                                constellations: !0,
                                lines: !0,
                                other: !0,
                                download: !1
                            },
                            advanced: !0,
                            daterange: [],
                            controls: !1,
                            lang: "",
                            culture: "",
                            container: "celestial-map",
                            datapath: "/data/",
                            stars: {
                                show: !0,
                                names: !1,
                                limit: 9,
                                colors: !1,
                                style: {
                                    fill: "rgb(255,255,255)",
                                    opacity: .5
                                },
                                designation: !0,
                                designationType: "desig",
                                designationStyle: {
                                    fill: "rgb(100,100,100)",
                                    font: "11px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
                                    align: "left",
                                    baseline: "top"
                                },
                                designationLimit: 2.5,
                                propername: !1,
                                propernameType: "name",
                                propernameStyle: {
                                    fill: "#000000",
                                    font: "10px 'Helvetica', sans-serif",
                                    align: "right",
                                    baseline: "bottom"
                                },
                                propernameLimit: 1.25,
                                size: 5,
                                exponent: -.28,
                                data: "stars.6.json"
                            },
                            dsos: {
                                show: !0,
                                limit: 6,
                                colors: !0,
                                style: {
                                    fill: "#cccccc",
                                    stroke: "#cccccc",
                                    width: 2,
                                    opacity: 1
                                },
                                names: !1,
                                namesType: "name",
                                nameStyle: {
                                    fill: "#cccccc",
                                    font: "11px Helvetica, Arial, serif",
                                    align: "left",
                                    baseline: "top"
                                },
                                nameLimit: 6,
                                size: null,
                                exponent: 1.4,
                                data: "dsos.bright.json",
                                symbols: {
                                    gg: {
                                        shape: "circle",
                                        fill: "#ff0000"
                                    },
                                    g: {
                                        shape: "ellipse",
                                        fill: "#ff0000"
                                    },
                                    s: {
                                        shape: "ellipse",
                                        fill: "#ff0000"
                                    },
                                    s0: {
                                        shape: "ellipse",
                                        fill: "#ff0000"
                                    },
                                    sd: {
                                        shape: "ellipse",
                                        fill: "#ff0000"
                                    },
                                    e: {
                                        shape: "ellipse",
                                        fill: "#ff0000"
                                    },
                                    i: {
                                        shape: "ellipse",
                                        fill: "#ff0000"
                                    },
                                    oc: {
                                        shape: "circle",
                                        fill: "#ffcc00",
                                        stroke: "#ffcc00",
                                        width: 1.5
                                    },
                                    gc: {
                                        shape: "circle",
                                        fill: "#ff9900"
                                    },
                                    en: {
                                        shape: "square",
                                        fill: "#ff00cc"
                                    },
                                    bn: {
                                        shape: "square",
                                        fill: "#ff00cc",
                                        stroke: "#ff00cc",
                                        width: 2
                                    },
                                    sfr: {
                                        shape: "square",
                                        fill: "#cc00ff",
                                        stroke: "#cc00ff",
                                        width: 2
                                    },
                                    rn: {
                                        shape: "square",
                                        fill: "#00ooff"
                                    },
                                    pn: {
                                        shape: "diamond",
                                        fill: "#00cccc"
                                    },
                                    snr: {
                                        shape: "diamond",
                                        fill: "#ff00cc"
                                    },
                                    dn: {
                                        shape: "square",
                                        fill: "#999999",
                                        stroke: "#999999",
                                        width: 2
                                    },
                                    pos: {
                                        shape: "marker",
                                        fill: "#cccccc",
                                        stroke: "#cccccc",
                                        width: 1.5
                                    }
                                }
                            },
                            planets: {
                                show: !0,
                                which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep"],
                                symbols: {
                                    sol: {
                                        symbol: "☉",
                                        letter: "Su",
                                        fill: "#00ff00"
                                    },
                                    mer: {
                                        symbol: "☿",
                                        letter: "Me",
                                        fill: "#00ff00"
                                    },
                                    ven: {
                                        symbol: "♀",
                                        letter: "V",
                                        fill: "#00ff00"
                                    },
                                    ter: {
                                        symbol: "⊕",
                                        letter: "T",
                                        fill: "#00ff00"
                                    },
                                    lun: {
                                        symbol: "●",
                                        letter: "L",
                                        fill: "#ffffff"
                                    },
                                    mar: {
                                        symbol: "♂",
                                        letter: "Ma",
                                        fill: "#00ff00"
                                    },
                                    cer: {
                                        symbol: "⚳",
                                        letter: "C",
                                        fill: "#00ff00"
                                    },
                                    ves: {
                                        symbol: "⚶",
                                        letter: "Ma",
                                        fill: "#00ff00"
                                    },
                                    jup: {
                                        symbol: "♃",
                                        letter: "J",
                                        fill: "#00ff00"
                                    },
                                    sat: {
                                        symbol: "♄",
                                        letter: "Sa",
                                        fill: "#00ff00"
                                    },
                                    ura: {
                                        symbol: "♅",
                                        letter: "U",
                                        fill: "#00ff00"
                                    },
                                    nep: {
                                        symbol: "♆",
                                        letter: "N",
                                        fill: "#00ff00"
                                    },
                                    plu: {
                                        symbol: "♇",
                                        letter: "P",
                                        fill: "#00ff00"
                                    },
                                    eri: {
                                        symbol: "⚪",
                                        letter: "E",
                                        fill: "#00ff00"
                                    }
                                },
                                symbolStyle: {
                                    fill: "#00ccff",
                                    font: "10px 'Lucida Sans Unicode', Consolas, sans-serif",
                                    align: "center",
                                    baseline: "middle"
                                },
                                symbolType: "symbol",
                                names: !1,
                                nameStyle: {
                                    fill: "#00ccff",
                                    font: "5px 'Lucida Sans Unicode', Consolas, sans-serif",
                                    align: "right",
                                    baseline: "top"
                                },
                                namesType: "desig"
                            },
                            constellations: {
                                names: !0,
                                namesType: "iau",
                                nameStyle: {
                                    fill: "rgb(30,30,30)",
                                    align: "center",
                                    baseline: "middle",
                                    font: ["14px Helvetica, Arial, sans-serif", "12px Helvetica, Arial, sans-serif", "11px Helvetica, Arial, sans-serif"]
                                },
                                lines: !0,
                                lineStyle: {
                                    stroke: "rgb(100,100,100)",
                                    width: 1,
                                    opacity: .1
                                },
                                bounds: !1,
                                boundStyle: {
                                    stroke: "#cccc00",
                                    width: .5,
                                    opacity: .8,
                                    dash: [2, 4]
                                }
                            },
                            mw: {
                                show: !0,
                                style: {
                                    fill: "rgb(100,100,100)",
                                    opacity: .02
                                }
                            },
                            lines: {
                                graticule: {
                                    show: !1,
                                    stroke: "#cccccc",
                                    width: .6,
                                    opacity: .8,
                                    lon: {
                                        pos: [""],
                                        fill: "#eee",
                                        font: "10px Helvetica, Arial, sans-serif"
                                    },
                                    lat: {
                                        pos: [""],
                                        fill: "#eee",
                                        font: "10px Helvetica, Arial, sans-serif"
                                    }
                                },
                                equatorial: {
                                    show: !1,
                                    stroke: "#aaaaaa",
                                    width: 1.3,
                                    opacity: .7
                                },
                                ecliptic: {
                                    show: !1,
                                    stroke: "#66cc66",
                                    width: 1.3,
                                    opacity: .7
                                },
                                galactic: {
                                    show: !1,
                                    stroke: "#cc6666",
                                    width: 1.3,
                                    opacity: .7
                                },
                                supergalactic: {
                                    show: !1,
                                    stroke: "#cc66cc",
                                    width: 1.3,
                                    opacity: .7
                                }
                            },
                            background: {
                                fill: "transparent",
                                opacity: 1
                            },
                            horizon: {
                                show: !1,
                                stroke: "#cccccc",
                                width: 1,
                                fill: "#000000",
                                opacity: .5
                            },
                            daylight: {
                                show: !1
                            }
                        }
                    }
                },
                methods: {},
                mounted: function() {
                    d.a.Celestial().display(this.config)
                }
            },
            b = p,
            v = (n("e79a"), n("2877")),
            g = Object(v["a"])(b, f, m, !1, null, null, null),
            y = g.exports,
            w = {
                components: {
                    Celestial: y
                },
                data: function() {
                    return {
                        password: null,
                        check: "458163feeff19365517db77231b0ffac",
                        countdown: null,
                        started: !1
                    }
                },
                methods: {
                    hideSplash: function() {
                        this.$store.commit("SET_HIDE_SPLASH", !0)
                    },
                    zeroPad: function(e, t) {
                        return String(e).padStart(t, "0")
                    },
                    countdownTimer: function() {
                        var e = +new Date("2020-09-01") - +new Date,
                            t = "Open!";
                        if (e > 0) {
                            var n = {
                                D: Math.floor(e / 864e5),
                                H: this.zeroPad(Math.floor(e / 36e5 % 24), 2),
                                M: this.zeroPad(Math.floor(e / 1e3 / 60 % 60), 2),
                                S: this.zeroPad(Math.floor(e / 1e3 % 60), 2)
                            };
                            t = "Public Launch " + Object.keys(n).map((function(e) {
                                if (n[e]) return "".concat(n[e]).concat(e)
                            })).join(" ")
                        } else {
                            var r = new Date;
                            t = r.toISOString()
                        }
                        this.$refs.countdown.innerHTML = t
                    },
                    start: function() {
                        this.started = !0, this.countdownTimer(), this.countdown = window.setInterval(this.countdownTimer, 1e3)
                    }
                },
                mounted: function() {
                    this.start()
                },
                destroyed: function() {
                    window.clearInterval(this.countdown)
                },
                watch: {
                    password: function() {
                        var e = this;
                        window.setTimeout((function() {
                            u()(e.password.toLowerCase()).toString() === e.check && e.$store.commit("SET_HIDE_SPLASH", e.password)
                        }), 600)
                    }
                }
            },
            x = w,
            S = (n("8022"), Object(v["a"])(x, o, c, !1, null, "9311eee0", null)),
            C = S.exports,
            k = function() {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", [n("div", {
                    staticClass: "search"
                }, [n("div", {
                    staticClass: "relative text-white"
                }, [n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.searchTerm,
                        expression: "searchTerm"
                    }],
                    ref: "search",
                    attrs: {
                        id: "search-input",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Search",
                        tabindex: "0"
                    },
                    domProps: {
                        value: e.searchTerm
                    },
                    on: {
                        keyup: function(t) {
                            return !t.type.indexOf("key") && e._k(t.keyCode, "esc", 27, t.key, ["Esc", "Escape"]) ? null : e.close(t)
                        },
                        input: function(t) {
                            t.target.composing || (e.searchTerm = t.target.value)
                        }
                    }
                }), n("div", {
                    staticClass: "search-right absolute right-0 top-0 flex items-center h-full"
                }, [e.searching ? n("span", {
                    staticClass: "pulse mr-6"
                }, [e._v("Searching...")]) : e._e(), n("transition", {
                    attrs: {
                        name: "fade"
                    }
                }, [e.searchTerm && !e.searching ? n("div", {
                    staticClass: "clear-button px-4 cursor-pointer",
                    on: {
                        click: e.resetSearch
                    }
                }, [e._v("Reset")]) : e._e()]), n("div", {
                    staticClass: "mr-4 close-button cursor-pointer",
                    on: {
                        click: e.close
                    }
                }, [n("svg", {
                    attrs: {
                        width: "28",
                        height: "28",
                        viewBox: "0 0 28 28",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                    }
                }, [n("line", {
                    attrs: {
                        x1: "1.3306",
                        y1: "1.09957",
                        x2: "27.1254",
                        y2: "26.8944",
                        stroke: "currentColor",
                        "stroke-width": "2"
                    }
                }), n("line", {
                    attrs: {
                        x1: "27.1255",
                        y1: "1.80668",
                        x2: "1.33074",
                        y2: "27.6015",
                        stroke: "currentColor",
                        "stroke-width": "2"
                    }
                })])])], 1)]), e.searchResults ? n("div", {
                    staticClass: "results-wrapper"
                }, [n("ul", {
                    staticClass: "results"
                }, [e._l(e.searchResults, (function(t, r) {
                    return n("li", {
                        key: r,
                        staticClass: "result cursor-pointer text-white",
                        on: {
                            click: e.close
                        }
                    }, [n("router-link", {
                        attrs: {
                            to: e.url(t)
                        }
                    }, [n("div", {
                        staticClass: "flex items-center py-2"
                    }, [n("div", {
                        staticClass: "serif uppercase text-sm pl-6 pr-6 w-32 flex-none"
                    }, [e._v(e._s(e.getType(t)))]), n("div", {
                        staticClass: "flex-auto"
                    }, [n("div", {
                        domProps: {
                            innerHTML: e._s(e.getTitle(t))
                        }
                    })])])])], 1)
                })), e.noResults ? n("li", {
                    staticClass: "py-3 px-6 bg-blue text-base text-gray-400"
                }, [e._v("Nothing found...")]) : e._e()], 2)]) : e._e()])])
            },
            T = [],
            _ = (n("386d"), n("b047")),
            E = n.n(_),
            j = n("bc3a"),
            O = n.n(j),
            R = "".concat("https://content.cosmos.art", "/v1/search"),
            M = null,
            L = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return e.url = R, M && M.cancel("cancel"), M = O.a.CancelToken.source(), e.cancelToken = M.token, O()(e)
            },
            A = {
                name: "Search",
                props: ["events", "showing"],
                data: function() {
                    return {
                        searchTerm: "",
                        searching: !1,
                        excerptSize: 5,
                        searchResults: null,
                        err: null
                    }
                },
                computed: {
                    noResults: function() {
                        return !(this.searching || !this.searchResults) && 0 === this.searchResults.length
                    }
                },
                methods: {
                    getType: function(e) {
                        return "Event" === e.type ? "Timeline" : "Image Sequence" === e.type || "Contribution" === e.type ? "Bulletin" : e.hasOwnProperty("type") ? e.type : "–"
                    },
                    getTitle: function(e) {
                        return "Contribution" === e.type ? "".concat(e.credit_simple, " - ").concat(e.title) : "Library" === e.type ? "".concat(e.author, " - ").concat(e.title) : "Cinema" === e.type ? "".concat(e.director, " - ").concat(e.title) : "Event" === e.type ? "".concat(e.title, " - <span>").concat(e.text.substring(0, 99), "...</span>") : e.title
                    },
                    getExcerpt: function(e) {
                        return e.text.substring(0, 180) + "..."
                    },
                    resetSearch: function() {
                        this.searching = !1, this.searchTerm = "", this.searchResults = null
                    },
                    close: function() {
                        this.resetSearch(), this.$emit("close")
                    },
                    goto: function(e) {
                        this.$emit("goto", e), this.close()
                    },
                    doSearch: E()((function() {
                        var e = this;
                        L({
                            params: {
                                term: this.searchTerm
                            }
                        }).then((function(t) {
                            var n = t.data;
                            e.searchResults = n, e.selected = 0, e.searching = !1
                        })).catch((function(t) {
                            "message" in t && "cancel" === t.message || (e.searchResults = [], e.searching = !1)
                        }))
                    }), 200),
                    url: function(e) {
                        if ("Cinema" === e.type) return "/cinema";
                        if ("School" === e.type) return "/school";
                        if ("Event" === e.type) {
                            var t = "event-".concat(e.slug);
                            return "/timeline#".concat(t)
                        }
                        if ("Library" === e.type) {
                            var n = encodeURIComponent(e.file.url),
                                r = encodeURIComponent(e.title);
                            return "/viewer?p=".concat(n, "&title=").concat(r)
                        }
                        return "/".concat(e.uri)
                    }
                },
                watch: {
                    showing: function() {
                        var e = this;
                        this.showing && this.$nextTick((function() {
                            e.$refs.search.focus()
                        }))
                    },
                    searchTerm: function() {
                        this.searchTerm && "" !== this.searchTerm ? (this.searching = !0, this.doSearch()) : this.searchResults = null
                    },
                    show: function() {
                        var e = this;
                        this.show && this.$nextTick((function() {
                            e.$refs.search.focus()
                        }))
                    }
                }
            },
            P = A,
            $ = (n("ae79"), Object(v["a"])(P, k, T, !1, null, "7205f1e9", null)),
            I = $.exports,
            H = {
                data: function() {
                    return {
                        showSearch: !1
                    }
                },
                mounted: function() {
                    "home" !== this.$route.name && this.$store.commit("SET_HIDE_SPLASH", !0)
                },
                computed: {
                    isHome: function() {
                        return "home" === this.$route.name
                    },
                    breadcrumb: function() {
                        return !!this.$route.meta.hasOwnProperty("breadcrumb") && this.$route.meta.breadcrumb
                    },
                    hideSplash: function() {
                        return "home" !== this.$route.name || this.$store.state.hideSplash
                    },
                    fadeMenu: function() {
                        return this.$store.state.fadeMenu
                    },
                    hideMenu: function() {
                        return this.$route.meta.hideMenu
                    },
                    hideStars: function() {
                        return this.$route.meta.hideStars
                    },
                    fadeStars: function() {
                        return this.$route.meta.fadeStars
                    },
                    style: function() {
                        return !!this.$route.meta.style && {
                            backgroundColor: this.$route.meta.style.background,
                            color: this.$route.meta.style.text
                        }
                    },
                    arrowColor: function() {
                        return this.$route.meta.hasOwnProperty("style") && this.$route.meta.style.text ? this.$route.meta.style.text : "rgb(0,0,0)"
                    }
                },
                methods: {
                    showSplash: function() {
                        this.$store.commit("SET_HIDE_SPLASH", !1)
                    },
                    toggleSearch: function() {
                        this.showSearch = !this.showSearch
                    },
                    goto: function(e) {
                        this.$scrollTo("#event-" + e.slug)
                    }
                },
                components: {
                    Search: I,
                    Splash: C
                }
            },
            B = H,
            N = (n("ebf3"), Object(v["a"])(B, s, a, !1, null, "3c4263c1", null)),
            z = N.exports,
            q = n("8c4f"),
            U = function() {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    staticClass: "flex-1 flex flex-wrap border-t border-black uppercase"
                }, [n("router-link", {
                    staticClass: "text-center border-b flex items-center justify-center w-1/2 border-r border-black px-2",
                    attrs: {
                        to: "/cosmic-bulletin/2020"
                    }
                }, [e._v("Cosmic Bulletin")]), n("router-link", {
                    staticClass: "text-center border-b flex items-center justify-center w-1/2 border-black px-2",
                    attrs: {
                        to: "/timeline"
                    }
                }, [e._v("Timeline of Russian Cosmism")]), n("router-link", {
                    staticClass: "text-center border-b flex items-center justify-center w-1/2 border-r border-black",
                    attrs: {
                        to: "/cinema"
                    }
                }, [e._v("Cinema")]), n("router-link", {
                    staticClass: "text-center border-b flex items-center justify-center w-1/2 border-black",
                    attrs: {
                        to: "/museum"
                    }
                }, [e._v("Museum")]), n("router-link", {
                    staticClass: "text-center flex items-center justify-center w-1/2 border-r border-black",
                    attrs: {
                        to: "/library"
                    }
                }, [e._v("Library")]), n("router-link", {
                    staticClass: "text-center flex items-center justify-center w-1/2",
                    attrs: {
                        to: "/school"
                    }
                }, [e._v("School")])], 1)
            },
            D = [],
            F = {
                name: "home"
            },
            J = F,
            V = (n("cbfa"), Object(v["a"])(J, U, D, !1, null, "58c4ec38", null)),
            Y = V.exports;
        i["a"].use(q["a"]);
        var G = new q["a"]({
                mode: "history",
                base: "/",
                routes: [{
                    path: "/",
                    name: "home",
                    component: Y,
                    meta: {
                        style: {
                            background: "rgb(145,145,155)",
                            color: "rgb(0,0,0)"
                        }
                    }
                }, {
                    path: "/timeline",
                    name: "timeline",
                    component: function() {
                        return Promise.all([n.e("issue~timeline"), n.e("timeline")]).then(n.bind(null, "f67a"))
                    },
                    meta: {
                        breadcrumb: "Timeline",
                        style: {
                            background: "rgb(255,255,255)",
                            text: "rgb(0,0,0)"
                        }
                    }
                }, {
                    path: "/cosmic-bulletin",
                    name: "cosmic bulletin",
                    component: function() {
                        return Promise.all([n.e("bulletin~cinema~issue"), n.e("bulletin")]).then(n.bind(null, "605d"))
                    },
                    meta: {
                        breadcrumb: "Cosmic Bulletin"
                    }
                }, {
                    path: "/cosmic-bulletin/:issue",
                    name: "cosmic bulletin - issue",
                    component: function() {
                        return Promise.all([n.e("bulletin~cinema~issue"), n.e("issue~timeline"), n.e("issue")]).then(n.bind(null, "9b7b"))
                    },
                    meta: {
                        breadcrumb: "Cosmic Bulletin"
                    }
                }, {
                    path: "/cosmic-bulletin/:issue/:slug",
                    name: "cosmic bulletin - contribution",
                    component: function() {
                        return Promise.all([n.e("bulletin~cinema~issue"), n.e("issue~timeline"), n.e("issue")]).then(n.bind(null, "d56a"))
                    },
                    meta: {
                        breadcrumb: "Cosmic Bulletin",
                        fadeStars: !0,
                        style: {
                            background: "rgb(203,203,208)"
                        }
                    }
                }, {
                    path: "/library",
                    name: "library",
                    component: function() {
                        return n.e("library").then(n.bind(null, "55a5"))
                    },
                    meta: {
                        breadcrumb: "Library"
                    }
                }, {
                    path: "/viewer",
                    name: "viewer",
                    component: function() {
                        return n.e("viewer").then(n.bind(null, "e1b1"))
                    },
                    meta: {
                        hideMenu: !0,
                        hideStars: !0
                    }
                }, {
                    path: "/museum",
                    name: "museum",
                    component: function() {
                        return n.e("museum").then(n.bind(null, "986c"))
                    },
                    meta: {
                        hideMenu: !1,
                        breadcrumb: "Museum"
                    }
                }, {
                    path: "/cinema",
                    name: "cinema",
                    component: function() {
                        return Promise.all([n.e("bulletin~cinema~issue"), n.e("cinema")]).then(n.bind(null, "f4f5"))
                    },
                    meta: {
                        breadcrumb: "Cinema",
                        style: {
                            background: "rgb(15,15,15)",
                            text: "rgb(145,145,155)"
                        }
                    }
                }, {
                    path: "/cinema/:slug/:id",
                    name: "cinemaPlayer",
                    component: function() {
                        return Promise.all([n.e("bulletin~cinema~issue"), n.e("cinema")]).then(n.bind(null, "bf5c"))
                    },
                    meta: {
                        hideMenu: !0,
                        hideStars: !0,
                        style: {
                            background: "rgb(0,0,0)",
                            text: "rgb(145,145,155)"
                        }
                    }
                }, {
                    path: "/school",
                    name: "school",
                    component: function() {
                        return Promise.all([n.e("bulletin~cinema~issue"), n.e("cinema")]).then(n.bind(null, "f4f5"))
                    },
                    meta: {
                        breadcrumb: "School",
                        style: {
                            background: "rgb(45,45,45)",
                            text: "rgb(145,145,155)"
                        }
                    }
                }, {
                    path: "/school/:slug/:id",
                    name: "schoolPlayer",
                    component: function() {
                        return Promise.all([n.e("bulletin~cinema~issue"), n.e("cinema")]).then(n.bind(null, "bf5c"))
                    },
                    meta: {
                        hideMenu: !0,
                        hideStars: !0,
                        style: {
                            background: "rgb(0,0,0)",
                            text: "rgb(145,145,155)"
                        }
                    }
                }, {
                    path: "/about",
                    name: "about",
                    component: function() {
                        return n.e("about").then(n.bind(null, "f820"))
                    },
                    meta: {
                        breadCrumb: "About"
                    }
                }],
                scrollBehavior: function(e, t, n) {
                    return n || (e.hash ? {
                        selector: e.hash,
                        offset: {
                            x: 0,
                            y: 200
                        }
                    } : {
                        x: 0,
                        y: 0
                    })
                }
            }),
            K = n("4360"),
            Q = (n("a869"), n("d740")),
            W = n.n(Q),
            X = n("f13c"),
            Z = n.n(X),
            ee = n("c28b"),
            te = n.n(ee),
            ne = n("4eb5"),
            re = n.n(ne),
            ie = n("58ca");
        n("5abe"), i["a"].use(Z.a, {
            offset: -24,
            duration: 300
        }), i["a"].config.productionTip = !1, i["a"].use(re.a), i["a"].use(W.a), i["a"].use(te.a), i["a"].use(ie["a"], {
            refreshOnceOnNavigation: !0
        }), i["a"].mixin({
            methods: {
                adjustAnnotations: function() {
                    var e = Object(r["a"])(document.querySelectorAll("h1 span.annotation-content"))[0],
                        t = Object(r["a"])(document.querySelectorAll(".content span.annotation-content")),
                        n = 24;
                    if (t.slice().map((function(e) {
                            e.style.paddingTop = "".concat(n, "px")
                        })), e) {
                        var i = e.offsetTop,
                            s = document.getElementById("page-content").offsetTop,
                            a = parseInt(s / 2) - parseInt(i);
                        e.style.paddingTop = "".concat(a, "px")
                    }
                    if (t.length > 1) {
                        var o = 0,
                            c = !0,
                            l = !1,
                            u = void 0;
                        try {
                            for (var f, m = t[Symbol.iterator](); !(c = (f = m.next()).done); c = !0) {
                                var h = f.value;
                                if (o > 0) {
                                    var d = t[o - 1],
                                        p = this.cumulativeOffset(d).top + d.clientHeight + n,
                                        b = this.cumulativeOffset(h).top;
                                    if (b < p) {
                                        var v = p - b;
                                        h.style.paddingTop = "".concat(v, "px")
                                    }
                                }
                                o++
                            }
                        } catch (g) {
                            l = !0, u = g
                        } finally {
                            try {
                                c || null == m.return || m.return()
                            } finally {
                                if (l) throw u
                            }
                        }
                    }
                },
                setupAnnotations: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                    this.$nextTick((function() {
                        console.log("setup");
                        var s = t,
                            a = null;
                        if (i) a = i;
                        else {
                            if (!document.getElementById("footnotes")) return !1;
                            a = document.getElementById("footnotes")
                        }
                        a.innerHTML = "";
                        var o = null;
                        if (n) o = n.querySelectorAll(".annotation");
                        else {
                            if (!document.querySelectorAll(".annotation")) return !1;
                            o = document.querySelectorAll(".annotation")
                        }
                        console.log(o);
                        var c = !0,
                            l = !1,
                            u = void 0;
                        try {
                            for (var f, m = function() {
                                    var e = f.value,
                                        t = Object(r["a"])(e.getElementsByClassName("annotation-counter"));
                                    e.getElementsByClassName("annotation-target")[0].setAttribute("id", "annotation-".concat(s)), e.getElementsByClassName("annotation-ring")[0].setAttribute("id", "annotation-ring-".concat(s)), t.forEach((function(e) {
                                        e.innerText = s
                                    })), e.querySelectorAll("a:not(.annotation-link)").forEach((function(e) {
                                        e.setAttribute("target", "_blank")
                                    }));
                                    var n = e.cloneNode(!0),
                                        i = document.createElement("a");
                                    i.classList.add("annotation-link"), i.setAttribute("href", "#annotation-".concat(s)), i.innerText = "↑";
                                    var o = "annotation-ring-".concat(s);
                                    i.addEventListener("click", (function(e) {
                                        e.preventDefault();
                                        var t = document.getElementById(o);
                                        Z.a.scrollTo(t, 150, {
                                            easing: "ease-out",
                                            offset: -250
                                        }), t.classList.remove("animate"), setTimeout((function() {
                                            t.classList.add("animate")
                                        }), 100)
                                    })), n.appendChild(i), a.appendChild(n), s += 1
                                }, h = o[Symbol.iterator](); !(c = (f = h.next()).done); c = !0) m()
                        } catch (d) {
                            l = !0, u = d
                        } finally {
                            try {
                                c || null == h.return || h.return()
                            } finally {
                                if (l) throw u
                            }
                        }
                        e.$nextTick((function() {
                            e.adjustAnnotations()
                        }))
                    }))
                }
            }
        }), new i["a"]({
            router: G,
            store: K["a"],
            render: function(e) {
                return e(z)
            }
        }).$mount("#app")
    },
    8022: function(e, t, n) {
        "use strict";
        var r = n("4134"),
            i = n.n(r);
        i.a
    },
    "921f": function(e, t, n) {},
    a869: function(e, t, n) {},
    ae79: function(e, t, n) {
        "use strict";
        var r = n("921f"),
            i = n.n(r);
        i.a
    },
    bd82: function(e, t, n) {},
    cbfa: function(e, t, n) {
        "use strict";
        var r = n("cd02"),
            i = n.n(r);
        i.a
    },
    cd02: function(e, t, n) {},
    e79a: function(e, t, n) {
        "use strict";
        var r = n("37d2"),
            i = n.n(r);
        i.a
    },
    ebf3: function(e, t, n) {
        "use strict";
        var r = n("bd82"),
            i = n.n(r);
        i.a
    }
});
//# sourceMappingURL=app.8c27b911.js.map