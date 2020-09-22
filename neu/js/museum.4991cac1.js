(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["museum"], {
        6618: function(e, t, s) {
            e.exports = s.p + "img/arrow-download.ad7362fb.svg"
        },
        "7d7d": function(e, t, s) {
            "use strict";
            var r = s("95bc"),
                i = s.n(r);
            i.a
        },
        "95bc": function(e, t, s) {},
        "986c": function(e, t, s) {
            "use strict";
            s.r(t);
            var r = function() {
                    var e = this,
                        t = e.$createElement,
                        r = e._self._c || t;
                    return e.content ? r("div", {
                        staticClass: "border-t border-black"
                    }, [r("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [e.hideSplash && e.showOverlay ? r("div", {
                        staticClass: "overlay cursor-pointer fixed top-0 left-0 w-screen h-screen md:flex items-center justify-center z-40 md:p-12"
                    }, [r("div", {
                        staticClass: "bg-gray-500 max-w-4xl border border-black"
                    }, [r("div", {
                        staticClass: "p-4 md:p-8 overlay-content text-sm md:text-base text-center"
                    }, [r("h1", {
                        staticClass: "uppercase mb-6 text-center",
                        domProps: {
                            innerHTML: e._s(e.content.museum_title)
                        }
                    }), r("p", {
                        staticClass: "mb-6"
                    }, [e._v("\n            The Museum of the Institute of the Cosmos is comprised of an infinite number of rooms. Each room contains a permanent exhibit. We invite you to visit Room #12, containing an exhibition by Arseny Zhilyaev, signed by the algorithmic artist Robert Pasternak. The sculptures presented in this exhibition can be downloaded and printed on a 3D printer. More rooms will open soon.\n          ")]), e.more ? e._e() : r("p", {
                        staticClass: "mt-2 italic text-center text-sm",
                        on: {
                            click: function(t) {
                                e.more = !0
                            }
                        }
                    }, [e._v("Read More...")]), e.more ? r("div", [r("p", {
                        staticClass: "mb-6"
                    }, [e._v("The museum occupies a central place within the cosmist worldview as an institution dedicated to the preservation, conservation, and restoration of the past. It is a singular place in human society where a broken appliance, a damaged picture, a text fragment, a ceramic shard, or unfinished poem are not discarded, but systematically preserved and maintained.")]), r("p", {
                        staticClass: "mb-6"
                    }, [e._v('The cosmist museum is encyclopedic and nonviolent. As a collection of everything, its mission is to restore life, not take it. Nikolai Fedorov writes that the museum is related to the school and the observatory. The ancestral memory it preserves in the form of artifacts, botanical specimens, animal and human remains is mirrored in the constellations of the stars. The museum is related to ancient temples and the knowledge it transmits is astronomical. According to Fedorov, the museum will be the site of resurrection once its technology of restoration is radicalized to restore life. "If a repository may be compared to a grave, then reading, or more precisely research, is a kind of exhumation, while an exhibition is, as it were, a resurrection”.'), r("sup", {
                        staticClass: "text-red"
                    }, [e._v("1")])]), r("p", {
                        staticClass: "text-sm mb-6"
                    }, [r("span", {
                        staticClass: "text-red"
                    }, [e._v("1.")]), e._v(" Nikolai Fedorov, The Museum, its Meaning and Mission, originally published in 1906")])]) : e._e()]), r("div", {
                        staticClass: "p-4 border-t border-black uppercase text-center hover:text-red",
                        on: {
                            click: function(t) {
                                e.showOverlay = !1
                            }
                        }
                    }, [e._v("\n          Continue to Room 12\n        ")])])]) : e._e()]), r("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [e.viewer ? r("div", {
                        staticClass: "video-overlay fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-40",
                        style: e.overrideBg
                    }, [r("div", {
                        staticClass: "cursor-pointer absolute top-0 left-0 pt-3 px-3 md:px-6 uppercase",
                        on: {
                            click: function(t) {
                                e.viewer = null
                            }
                        }
                    }, [e._v("Close")]), r("div", {
                        staticClass: "absolute top-0 right-0 px-6 pt-3 uppercase"
                    }, [r("a", {
                        staticClass: "hidden md:inline",
                        attrs: {
                            href: e.viewer.download.url
                        }
                    }, [e._v("Download 3D Model")])]), r("video", {
                        staticClass: "w-full -mt-6 md:max-w-2xl lg:max-w-2xl max-h-screen",
                        attrs: {
                            src: e.viewer.video.url,
                            autoplay: "",
                            muted: "",
                            loop: "",
                            playsinline: ""
                        },
                        domProps: {
                            muted: !0
                        }
                    }), r("div", {
                        staticClass: "fixed bottom-0 left-0 p-2 md:p-6 text-left m-2 md:m-8 border border-black bg-gray-500",
                        style: e.overrideBg,
                        attrs: {
                            id: "caption"
                        },
                        domProps: {
                            innerHTML: e._s(e.viewer.caption)
                        }
                    })]) : e._e()]), r("div", {
                        staticClass: "flex border-b border-black justify-between py-3 items-center sticky top-0 z-20 bg-gray-500",
                        style: e.overrideBg,
                        attrs: {
                            id: "playerbar"
                        }
                    }, [r("div", {
                        staticClass: "w-16 pl-6 cursor-pointer",
                        on: {
                            click: e.togglePlay
                        }
                    }, [e.playing ? r("span", [e._v("❙❙")]) : r("span", [e._v("▶")])]), r("div", {
                        staticClass: "flex-1 text-center serif uppercase"
                    }, [e.playing ? r("span", [r("div", {
                        ref: "progress",
                        attrs: {
                            id: "progress-track"
                        },
                        on: {
                            click: function(t) {
                                return e.seek(t)
                            }
                        }
                    }, [r("div", {
                        style: {
                            width: e.playProgress
                        },
                        attrs: {
                            id: "progress-bar"
                        }
                    })])]) : r("span", {
                        staticClass: "cursor-pointer",
                        on: {
                            click: e.togglePlay
                        }
                    }, [r("span", {
                        staticClass: "hidden md:inline"
                    }, [e._v("Listen to ")]), e._v("Interview"), r("span", {
                        staticClass: "hidden md:inline"
                    }, [e._v(" with Robert Pasternak's fabricator")]), e._v(" [6m11s]")])]), r("div", {
                        staticClass: "text-right pr-6 w-16 cursor-pointer",
                        on: {
                            click: e.toggleInterviewText
                        }
                    }, [e.showInterviewText ? r("span", [e._v("HIDE")]) : r("span", [e._v("TXT")])])]), e.showInterviewText ? r("div", {
                        ref: "interview",
                        staticClass: "border-b border-black"
                    }, [r("div", {
                        staticClass: "my-12 mx-12",
                        domProps: {
                            innerHTML: e._s(e.content.interview_text)
                        }
                    })]) : e._e(), r("audio", {
                        ref: "player",
                        attrs: {
                            id: "player",
                            controls: ""
                        }
                    }, [r("source", {
                        attrs: {
                            src: e.content.audio.url,
                            type: "audio/mp3"
                        }
                    })]), r("div", {
                        staticClass: "flex flex-wrap"
                    }, e._l(e.models, (function(t, i) {
                        return r("div", {
                            key: t.id,
                            staticClass: "w-full md:w-1/2 xl:w-1/3 border-b border-r border-black relative",
                            on: {
                                mouseenter: function(t) {
                                    return e.play(i)
                                },
                                mouseleave: function(t) {
                                    return e.pause(i)
                                }
                            }
                        }, [r("video", {
                            ref: "videos",
                            refInFor: !0,
                            staticClass: "hidden md:block",
                            attrs: {
                                src: t.video.url,
                                muted: "",
                                loop: "",
                                playsinline: ""
                            },
                            domProps: {
                                muted: !0
                            },
                            on: {
                                click: function(s) {
                                    e.viewer = t
                                }
                            }
                        }), r("img", {
                            staticClass: "md:hidden poster",
                            attrs: {
                                src: t.thumbnail.url
                            },
                            on: {
                                click: function(s) {
                                    e.viewer = t
                                }
                            }
                        }), r("div", {
                            staticClass: "absolute top-0 right-0 border-black border-l border-b"
                        }, [r("a", {
                            staticClass: "h-8 w-8 flex items-center justify-center border-b border-black",
                            attrs: {
                                href: t.usdz.url
                            }
                        }, [e._v("AR")]), r("a", {
                            staticClass: "h-8 w-8 flex items-center justify-center",
                            attrs: {
                                href: t.download.url
                            }
                        }, [r("img", {
                            attrs: {
                                src: s("6618")
                            }
                        })])]), r("div", {
                            staticClass: "absolute bottom-0 left-0 w-full mb-8 serif text-sm text-center uppercase"
                        }, [e._v("\n        " + e._s(t.title) + "\n      ")])])
                    })), 0), r("div", {
                        staticClass: "serif my-12"
                    }, [r("h1", {
                        staticClass: "uppercase mb-6 text-center",
                        domProps: {
                            innerHTML: e._s(e.content.intro_title)
                        }
                    }), r("div", {
                        staticClass: "mx-6 md:mx-12",
                        domProps: {
                            innerHTML: e._s(e.content.intro_text)
                        }
                    })])], 1) : e._e()
                },
                i = [],
                o = s("f13c"),
                n = s.n(o),
                a = {
                    name: "Museum",
                    data: function() {
                        return {
                            showOverlay: !0,
                            playing: !1,
                            progress: null,
                            playProgress: "0%",
                            showInterviewText: !1,
                            viewer: null,
                            bg: "background: rgba(145,145,155,0.9)",
                            bgOverride: null,
                            more: !1
                        }
                    },
                    mounted: function() {
                        var e = this;
                        this.$store.dispatch("getMuseum"), this.$nextTick((function() {
                            window.setTimeout((function() {
                                (-1 != navigator.appVersion.indexOf("Chrome/") || -1 != navigator.appVersion.indexOf("Safari/") && -1 != navigator.appVersion.indexOf("Macintosh")) && (e.bgOverride = "rgb(156,154,163)", document.body.style.backgroundColor = "rgb(156,154,163)", document.getElementById("nav").style.backgroundColor = "rgb(156,154,163)", document.getElementById("playerbar").style.backgroundColor = "rgb(156,154,163)")
                            }), 1e3)
                        }))
                    },
                    destroyed: function() {
                        -1 == navigator.appVersion.indexOf("Chrome/") && -1 == navigator.appVersion.indexOf("Safari/") || (document.body.style.backgroundColor = null, document.getElementById("nav").style.backgroundColor = null, document.getElementById("playerbar").style.backgroundColor = null)
                    },
                    computed: {
                        hideSplash: function() {
                            return this.$store.state.hideSplash
                        },
                        content: function() {
                            return this.$store.state.museum
                        },
                        models: function() {
                            return this.content.models
                        },
                        overrideBg: function() {
                            return !!this.bgOverride && {
                                backgroundColor: this.bgOverride
                            }
                        }
                    },
                    methods: {
                        togglePlay: function() {
                            var e = this;
                            this.$refs.player.paused ? (this.playing = !0, this.progress = window.setInterval((function() {
                                e.audioProgress()
                            }), 33), this.$refs.player.play()) : (this.playing = !1, this.$refs.player.pause(), window.clearInterval(this.progress), this.progress = null)
                        },
                        play: function(e) {
                            this.$refs["videos"][e].play()
                        },
                        pause: function(e) {
                            this.$refs["videos"][e].pause()
                        },
                        audioProgress: function() {
                            this.playProgress = "".concat(this.$refs.player.currentTime / this.$refs.player.duration * 100, "%")
                        },
                        seek: function(e) {
                            var t = this.$refs.progress;
                            this.$refs.player.currentTime = (e.clientX - t.offsetLeft) / t.offsetWidth * this.$refs.player.duration
                        },
                        toggleInterviewText: function() {
                            var e = this;
                            this.showInterviewText ? this.showInterviewText = !1 : (this.showInterviewText = !0, this.$nextTick((function() {
                                n.a.scrollTo(e.$refs.interview, {
                                    offset: -100
                                })
                            })))
                        }
                    }
                },
                l = a,
                c = (s("7d7d"), s("2877")),
                d = Object(c["a"])(l, r, i, !1, null, "20204cc8", null);
            t["default"] = d.exports
        }
    }
]);
//# sourceMappingURL=museum.4991cac1.js.map