function require(e, t, n) {
    var i = require.resolve(e);
    if (null == i) {
        n = n || e, t = t || "root";
        var a = new Error('Failed to require "' + n + '" from "' + t + '"');
        throw a.path = n, a.parent = t, a.require = !0, a
    }
    var r = require.modules[i];
    return r.exports || (r.exports = {}, r.client = r.component = !0, r.call(this, r.exports, require.relative(i), r)), r.exports
}
var has = Object.prototype.hasOwnProperty;
require.modules = {}, require.aliases = {}, require.resolve = function(e) {
    for (var t = e + "/index.js", n = [e, e + ".js", e + ".json", e + "/index.js", e + "/index.json"], i = 0; i < n.length; i++) {
        var e = n[i];
        if (has.call(require.modules, e)) return e
    }
    return has.call(require.aliases, t) ? require.aliases[t] : void 0
}, require.normalize = function(e, t) {
    var n = [];
    if ("." != t.charAt(0)) return t;
    e = e.split("/"), t = t.split("/");
    for (var i = 0; i < t.length; ++i) ".." == t[i] ? e.pop() : "." != t[i] && "" != t[i] && n.push(t[i]);
    return e.concat(n).join("/")
}, require.register = function(e, t) {
    require.modules[e] = t
}, require.alias = function(e, t) {
    if (!has.call(require.modules, e)) throw new Error('Failed to alias "' + e + '", it does not exist');
    require.aliases[t] = e
}, require.relative = function(e) {
    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n] === t) return n;
        return -1
    }

    function n(t) {
        var i = n.resolve(t);
        return require(i, e, t)
    }
    var i = require.normalize(e, "..");
    return n.resolve = function(n) {
        if ("." != n.charAt(0)) {
            var a = e.split("/"),
                r = t(a, "deps") + 1;
            return r || (r = 0), n = a.slice(0, r + 1).join("/") + "/deps/" + n
        }
        return require.normalize(i, n)
    }, n.exists = function(e) {
        return has.call(require.modules, n.resolve(e))
    }, n
}, require.register("component-indexof/index.js", function(e, t, n) {
    n.exports = function(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0; n < e.length; ++n)
            if (e[n] === t) return n;
        return -1
    }
}), require.register("component-emitter/index.js", function(e, t, n) {
    function i(e) {
        return e ? a(e) : void 0
    }

    function a(e) {
        for (var t in i.prototype) e[t] = i.prototype[t];
        return e
    }
    var r = t("indexof");
    n.exports = i, i.prototype.on = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this
    }, i.prototype.once = function(e, t) {
        function n() {
            i.off(e, n), t.apply(this, arguments)
        }
        var i = this;
        return this._callbacks = this._callbacks || {}, t._off = n, this.on(e, n), this
    }, i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var n = this._callbacks[e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks[e], this;
        var i = r(n, t._off || t);
        return ~i && n.splice(i, 1), this
    }, i.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1),
            n = this._callbacks[e];
        if (n) {
            n = n.slice(0);
            for (var i = 0, a = n.length; a > i; ++i) n[i].apply(this, t)
        }
        return this
    }, i.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
    }, i.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length
    }
}), require.register("component-jquery/index.js", function(e, t, n) {
    ! function(e, t) {
        function i(e) {
            var t = e.length,
                n = ct.type(e);
            return ct.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        function a(e) {
            var t = Et[e] = {};
            return ct.each(e.match(dt) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function r(e, n, i, a) {
            if (ct.acceptData(e)) {
                var r, s, o = ct.expando,
                    l = "string" == typeof n,
                    c = e.nodeType,
                    u = c ? ct.cache : e,
                    d = c ? e[o] : e[o] && o;
                if (d && u[d] && (a || u[d].data) || !l || i !== t) return d || (c ? e[o] = d = et.pop() || ct.guid++ : d = o), u[d] || (u[d] = {}, c || (u[d].toJSON = ct.noop)), ("object" == typeof n || "function" == typeof n) && (a ? u[d] = ct.extend(u[d], n) : u[d].data = ct.extend(u[d].data, n)), r = u[d], a || (r.data || (r.data = {}), r = r.data), i !== t && (r[ct.camelCase(n)] = i), l ? (s = r[n], null == s && (s = r[ct.camelCase(n)])) : s = r, s
            }
        }

        function s(e, t, n) {
            if (ct.acceptData(e)) {
                var i, a, r, s = e.nodeType,
                    o = s ? ct.cache : e,
                    c = s ? e[ct.expando] : ct.expando;
                if (o[c]) {
                    if (t && (r = n ? o[c] : o[c].data)) {
                        ct.isArray(t) ? t = t.concat(ct.map(t, ct.camelCase)) : t in r ? t = [t] : (t = ct.camelCase(t), t = t in r ? [t] : t.split(" "));
                        for (i = 0, a = t.length; a > i; i++) delete r[t[i]];
                        if (!(n ? l : ct.isEmptyObject)(r)) return
                    }(n || (delete o[c].data, l(o[c]))) && (s ? ct.cleanData([e], !0) : ct.support.deleteExpando || o != o.window ? delete o[c] : o[c] = null)
                }
            }
        }

        function o(e, n, i) {
            if (i === t && 1 === e.nodeType) {
                var a = "data-" + n.replace(At, "-$1").toLowerCase();
                if (i = e.getAttribute(a), "string" == typeof i) {
                    try {
                        i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : kt.test(i) ? ct.parseJSON(i) : i
                    } catch (r) {}
                    ct.data(e, n, i)
                } else i = t
            }
            return i
        }

        function l(e) {
            var t;
            for (t in e)
                if (("data" !== t || !ct.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
            return !0
        }

        function c() {
            return !0
        }

        function u() {
            return !1
        }

        function d(e, t) {
            do e = e[t]; while (e && 1 !== e.nodeType);
            return e
        }

        function p(e, t, n) {
            if (t = t || 0, ct.isFunction(t)) return ct.grep(e, function(e, i) {
                var a = !!t.call(e, i, e);
                return a === n
            });
            if (t.nodeType) return ct.grep(e, function(e) {
                return e === t === n
            });
            if ("string" == typeof t) {
                var i = ct.grep(e, function(e) {
                    return 1 === e.nodeType
                });
                if (Ht.test(t)) return ct.filter(t, i, !n);
                t = ct.filter(t, i)
            }
            return ct.grep(e, function(e) {
                return ct.inArray(e, t) >= 0 === n
            })
        }

        function m(e) {
            var t = Yt.split("|"),
                n = e.createDocumentFragment();
            if (n.createElement)
                for (; t.length;) n.createElement(t.pop());
            return n
        }

        function h(e, t) {
            return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
        }

        function f(e) {
            var t = e.getAttributeNode("type");
            return e.type = (t && t.specified) + "/" + e.type, e
        }

        function g(e) {
            var t = sn.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function y(e, t) {
            for (var n, i = 0; null != (n = e[i]); i++) ct._data(n, "globalEval", !t || ct._data(t[i], "globalEval"))
        }

        function v(e, t) {
            if (1 === t.nodeType && ct.hasData(e)) {
                var n, i, a, r = ct._data(e),
                    s = ct._data(t, r),
                    o = r.events;
                if (o) {
                    delete s.handle, s.events = {};
                    for (n in o)
                        for (i = 0, a = o[n].length; a > i; i++) ct.event.add(t, n, o[n][i])
                }
                s.data && (s.data = ct.extend({}, s.data))
            }
        }

        function b(e, t) {
            var n, i, a;
            if (1 === t.nodeType) {
                if (n = t.nodeName.toLowerCase(), !ct.support.noCloneEvent && t[ct.expando]) {
                    a = ct._data(t);
                    for (i in a.events) ct.removeEvent(t, i, a.handle);
                    t.removeAttribute(ct.expando)
                }
                "script" === n && t.text !== e.text ? (f(t).text = e.text, g(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ct.support.html5Clone && e.innerHTML && !ct.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && nn.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }
        }

        function _(e, n) {
            var i, a, r = 0,
                s = typeof e.getElementsByTagName !== W ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== W ? e.querySelectorAll(n || "*") : t;
            if (!s)
                for (s = [], i = e.childNodes || e; null != (a = i[r]); r++) !n || ct.nodeName(a, n) ? s.push(a) : ct.merge(s, _(a, n));
            return n === t || n && ct.nodeName(e, n) ? ct.merge([e], s) : s
        }

        function x(e) {
            nn.test(e.type) && (e.defaultChecked = e.checked)
        }

        function w(e, t) {
            if (t in e) return t;
            for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, a = An.length; a--;)
                if (t = An[a] + n, t in e) return t;
            return i
        }

        function T(e, t) {
            return e = t || e, "none" === ct.css(e, "display") || !ct.contains(e.ownerDocument, e)
        }

        function E(e, t) {
            for (var n, i, a, r = [], s = 0, o = e.length; o > s; s++) i = e[s], i.style && (r[s] = ct._data(i, "olddisplay"), n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && T(i) && (r[s] = ct._data(i, "olddisplay", S(i.nodeName)))) : r[s] || (a = T(i), (n && "none" !== n || !a) && ct._data(i, "olddisplay", a ? n : ct.css(i, "display"))));
            for (s = 0; o > s; s++) i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
            return e
        }

        function k(e, t, n) {
            var i = bn.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
        }

        function A(e, t, n, i, a) {
            for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === n && (s += ct.css(e, n + kn[r], !0, a)), i ? ("content" === n && (s -= ct.css(e, "padding" + kn[r], !0, a)), "margin" !== n && (s -= ct.css(e, "border" + kn[r] + "Width", !0, a))) : (s += ct.css(e, "padding" + kn[r], !0, a), "padding" !== n && (s += ct.css(e, "border" + kn[r] + "Width", !0, a)));
            return s
        }

        function P(e, t, n) {
            var i = !0,
                a = "width" === t ? e.offsetWidth : e.offsetHeight,
                r = pn(e),
                s = ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, r);
            if (0 >= a || null == a) {
                if (a = mn(e, t, r), (0 > a || null == a) && (a = e.style[t]), _n.test(a)) return a;
                i = s && (ct.support.boxSizingReliable || a === e.style[t]), a = parseFloat(a) || 0
            }
            return a + A(e, t, n || (s ? "border" : "content"), i, r) + "px"
        }

        function S(e) {
            var t = $,
                n = wn[e];
            return n || (n = C(e, t), "none" !== n && n || (dn = (dn || ct("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (dn[0].contentWindow || dn[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = C(e, t), dn.detach()), wn[e] = n), n
        }

        function C(e, t) {
            var n = ct(t.createElement(e)).appendTo(t.body),
                i = ct.css(n[0], "display");
            return n.remove(), i
        }

        function N(e, t, n, i) {
            var a;
            if (ct.isArray(t)) ct.each(t, function(t, a) {
                n || Sn.test(e) ? i(e, a) : N(e + "[" + ("object" == typeof a ? t : "") + "]", a, n, i)
            });
            else if (n || "object" !== ct.type(t)) i(e, t);
            else
                for (a in t) N(e + "[" + a + "]", t[a], n, i)
        }

        function I(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var i, a = 0,
                    r = t.toLowerCase().match(dt) || [];
                if (ct.isFunction(n))
                    for (; i = r[a++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
            }
        }

        function M(e, t, n, i) {
            function a(o) {
                var l;
                return r[o] = !0, ct.each(e[o] || [], function(e, o) {
                    var c = o(t, n, i);
                    return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1)
                }), l
            }
            var r = {},
                s = e === Vn;
            return a(t.dataTypes[0]) || !r["*"] && a("*")
        }

        function z(e, n) {
            var i, a, r = ct.ajaxSettings.flatOptions || {};
            for (a in n) n[a] !== t && ((r[a] ? e : i || (i = {}))[a] = n[a]);
            return i && ct.extend(!0, e, i), e
        }

        function L(e, n, i) {
            var a, r, s, o, l = e.contents,
                c = e.dataTypes,
                u = e.responseFields;
            for (o in u) o in i && (n[u[o]] = i[o]);
            for (;
                "*" === c[0];) c.shift(), r === t && (r = e.mimeType || n.getResponseHeader("Content-Type"));
            if (r)
                for (o in l)
                    if (l[o] && l[o].test(r)) {
                        c.unshift(o);
                        break
                    }
            if (c[0] in i) s = c[0];
            else {
                for (o in i) {
                    if (!c[0] || e.converters[o + " " + c[0]]) {
                        s = o;
                        break
                    }
                    a || (a = o)
                }
                s = s || a
            }
            return s ? (s !== c[0] && c.unshift(s), i[s]) : void 0
        }

        function B(e, t) {
            var n, i, a, r, s = {},
                o = 0,
                l = e.dataTypes.slice(),
                c = l[0];
            if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), l[1])
                for (a in e.converters) s[a.toLowerCase()] = e.converters[a];
            for (; i = l[++o];)
                if ("*" !== i) {
                    if ("*" !== c && c !== i) {
                        if (a = s[c + " " + i] || s["* " + i], !a)
                            for (n in s)
                                if (r = n.split(" "), r[1] === i && (a = s[c + " " + r[0]] || s["* " + r[0]])) {
                                    a === !0 ? a = s[n] : s[n] !== !0 && (i = r[0], l.splice(o--, 0, i));
                                    break
                                }
                        if (a !== !0)
                            if (a && e["throws"]) t = a(t);
                            else try {
                                t = a(t)
                            } catch (u) {
                                return {
                                    state: "parsererror",
                                    error: a ? u : "No conversion from " + c + " to " + i
                                }
                            }
                    }
                    c = i
                }
            return {
                state: "success",
                data: t
            }
        }

        function R() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {}
        }

        function q() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {}
        }

        function O() {
            return setTimeout(function() {
                ei = t
            }), ei = ct.now()
        }

        function j(e, t) {
            ct.each(t, function(t, n) {
                for (var i = (si[t] || []).concat(si["*"]), a = 0, r = i.length; r > a; a++)
                    if (i[a].call(e, t, n)) return
            })
        }

        function D(e, t, n) {
            var i, a, r = 0,
                s = ri.length,
                o = ct.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (a) return !1;
                    for (var t = ei || O(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, s = 0, l = c.tweens.length; l > s; s++) c.tweens[s].run(r);
                    return o.notifyWith(e, [c, r, n]), 1 > r && l ? n : (o.resolveWith(e, [c]), !1)
                },
                c = o.promise({
                    elem: e,
                    props: ct.extend({}, t),
                    opts: ct.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: ei || O(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = ct.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(i), i
                    },
                    stop: function(t) {
                        var n = 0,
                            i = t ? c.tweens.length : 0;
                        if (a) return this;
                        for (a = !0; i > n; n++) c.tweens[n].run(1);
                        return t ? o.resolveWith(e, [c, t]) : o.rejectWith(e, [c, t]), this
                    }
                }),
                u = c.props;
            for (F(u, c.opts.specialEasing); s > r; r++)
                if (i = ri[r].call(c, e, u, c.opts)) return i;
            return j(c, u), ct.isFunction(c.opts.start) && c.opts.start.call(e, c), ct.fx.timer(ct.extend(l, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function F(e, t) {
            var n, i, a, r, s;
            for (a in e)
                if (i = ct.camelCase(a), r = t[i], n = e[a], ct.isArray(n) && (r = n[1], n = e[a] = n[0]), a !== i && (e[i] = n, delete e[a]), s = ct.cssHooks[i], s && "expand" in s) {
                    n = s.expand(n), delete e[i];
                    for (a in n) a in e || (e[a] = n[a], t[a] = r)
                } else t[i] = r
        }

        function G(e, t, n) {
            var i, a, r, s, o, l, c, u, d, p = this,
                m = e.style,
                h = {},
                f = [],
                g = e.nodeType && T(e);
            n.queue || (u = ct._queueHooks(e, "fx"), null == u.unqueued && (u.unqueued = 0, d = u.empty.fire, u.empty.fire = function() {
                u.unqueued || d()
            }), u.unqueued++, p.always(function() {
                p.always(function() {
                    u.unqueued--, ct.queue(e, "fx").length || u.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [m.overflow, m.overflowX, m.overflowY], "inline" === ct.css(e, "display") && "none" === ct.css(e, "float") && (ct.support.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? m.zoom = 1 : m.display = "inline-block")), n.overflow && (m.overflow = "hidden", ct.support.shrinkWrapBlocks || p.always(function() {
                m.overflow = n.overflow[0], m.overflowX = n.overflow[1], m.overflowY = n.overflow[2]
            }));
            for (a in t)
                if (s = t[a], ni.exec(s)) {
                    if (delete t[a], l = l || "toggle" === s, s === (g ? "hide" : "show")) continue;
                    f.push(a)
                }
            if (r = f.length) {
                o = ct._data(e, "fxshow") || ct._data(e, "fxshow", {}), "hidden" in o && (g = o.hidden), l && (o.hidden = !g), g ? ct(e).show() : p.done(function() {
                    ct(e).hide()
                }), p.done(function() {
                    var t;
                    ct._removeData(e, "fxshow");
                    for (t in h) ct.style(e, t, h[t])
                });
                for (a = 0; r > a; a++) i = f[a], c = p.createTween(i, g ? o[i] : 0), h[i] = o[i] || ct.style(e, i), i in o || (o[i] = c.start, g && (c.end = c.start, c.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function X(e, t, n, i, a) {
            return new X.prototype.init(e, t, n, i, a)
        }

        function H(e, t) {
            var n, i = {
                    height: e
                },
                a = 0;
            for (t = t ? 1 : 0; 4 > a; a += 2 - t) n = kn[a], i["margin" + n] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function V(e) {
            return ct.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
        }
        var U, Y, W = typeof t,
            $ = e.document,
            Q = e.location,
            J = e.jQuery,
            K = e.$,
            Z = {},
            et = [],
            tt = "1.9.1",
            nt = et.concat,
            it = et.push,
            at = et.slice,
            rt = et.indexOf,
            st = Z.toString,
            ot = Z.hasOwnProperty,
            lt = tt.trim,
            ct = function(e, t) {
                return new ct.fn.init(e, t, Y)
            },
            ut = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            dt = /\S+/g,
            pt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            mt = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            ht = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            ft = /^[\],:{}\s]*$/,
            gt = /(?:^|:|,)(?:\s*\[)+/g,
            yt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            vt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            bt = /^-ms-/,
            _t = /-([\da-z])/gi,
            xt = function(e, t) {
                return t.toUpperCase()
            },
            wt = function(e) {
                ($.addEventListener || "load" === e.type || "complete" === $.readyState) && (Tt(), ct.ready())
            },
            Tt = function() {
                $.addEventListener ? ($.removeEventListener("DOMContentLoaded", wt, !1), e.removeEventListener("load", wt, !1)) : ($.detachEvent("onreadystatechange", wt), e.detachEvent("onload", wt))
            };
        ct.fn = ct.prototype = {
            jquery: tt,
            constructor: ct,
            init: function(e, n, i) {
                var a, r;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (a = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : mt.exec(e), !a || !a[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
                    if (a[1]) {
                        if (n = n instanceof ct ? n[0] : n, ct.merge(this, ct.parseHTML(a[1], n && n.nodeType ? n.ownerDocument || n : $, !0)), ht.test(a[1]) && ct.isPlainObject(n))
                            for (a in n) ct.isFunction(this[a]) ? this[a](n[a]) : this.attr(a, n[a]);
                        return this
                    }
                    if (r = $.getElementById(a[2]), r && r.parentNode) {
                        if (r.id !== a[2]) return i.find(e);
                        this.length = 1, this[0] = r
                    }
                    return this.context = $, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ct.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ct.makeArray(e, this))
            },
            selector: "",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return at.call(this)
            },
            get: function(e) {
                return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
            },
            pushStack: function(e) {
                var t = ct.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e, t) {
                return ct.each(this, e, t)
            },
            ready: function(e) {
                return ct.ready.promise().done(e), this
            },
            slice: function() {
                return this.pushStack(at.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            },
            map: function(e) {
                return this.pushStack(ct.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: it,
            sort: [].sort,
            splice: [].splice
        }, ct.fn.init.prototype = ct.fn, ct.extend = ct.fn.extend = function() {
            var e, n, i, a, r, s, o = arguments[0] || {},
                l = 1,
                c = arguments.length,
                u = !1;
            for ("boolean" == typeof o && (u = o, o = arguments[1] || {}, l = 2), "object" == typeof o || ct.isFunction(o) || (o = {}), c === l && (o = this, --l); c > l; l++)
                if (null != (r = arguments[l]))
                    for (a in r) e = o[a], i = r[a], o !== i && (u && i && (ct.isPlainObject(i) || (n = ct.isArray(i))) ? (n ? (n = !1, s = e && ct.isArray(e) ? e : []) : s = e && ct.isPlainObject(e) ? e : {}, o[a] = ct.extend(u, s, i)) : i !== t && (o[a] = i));
            return o
        }, ct.extend({
            noConflict: function(t) {
                return e.$ === ct && (e.$ = K), t && e.jQuery === ct && (e.jQuery = J), ct
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? ct.readyWait++ : ct.ready(!0)
            },
            ready: function(e) {
                if (e === !0 ? !--ct.readyWait : !ct.isReady) {
                    if (!$.body) return setTimeout(ct.ready);
                    ct.isReady = !0, e !== !0 && --ct.readyWait > 0 || (U.resolveWith($, [ct]), ct.fn.trigger && ct($).trigger("ready").off("ready"))
                }
            },
            isFunction: function(e) {
                return "function" === ct.type(e)
            },
            isArray: Array.isArray || function(e) {
                return "array" === ct.type(e)
            },
            isWindow: function(e) {
                return null != e && e == e.window
            },
            isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function(e) {
                return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? Z[st.call(e)] || "object" : typeof e
            },
            isPlainObject: function(e) {
                if (!e || "object" !== ct.type(e) || e.nodeType || ct.isWindow(e)) return !1;
                try {
                    if (e.constructor && !ot.call(e, "constructor") && !ot.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (n) {
                    return !1
                }
                var i;
                for (i in e);
                return i === t || ot.call(e, i)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            error: function(e) {
                throw new Error(e)
            },
            parseHTML: function(e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || $;
                var i = ht.exec(e),
                    a = !n && [];
                return i ? [t.createElement(i[1])] : (i = ct.buildFragment([e], t, a), a && ct(a).remove(), ct.merge([], i.childNodes))
            },
            parseJSON: function(t) {
                return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ct.trim(t), t && ft.test(t.replace(yt, "@").replace(vt, "]").replace(gt, ""))) ? new Function("return " + t)() : (ct.error("Invalid JSON: " + t), void 0)
            },
            parseXML: function(n) {
                var i, a;
                if (!n || "string" != typeof n) return null;
                try {
                    e.DOMParser ? (a = new DOMParser, i = a.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
                } catch (r) {
                    i = t
                }
                return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ct.error("Invalid XML: " + n), i
            },
            noop: function() {},
            globalEval: function(t) {
                t && ct.trim(t) && (e.execScript || function(t) {
                    e.eval.call(e, t)
                })(t)
            },
            camelCase: function(e) {
                return e.replace(bt, "ms-").replace(_t, xt)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, n) {
                var a, r = 0,
                    s = e.length,
                    o = i(e);
                if (n) {
                    if (o)
                        for (; s > r && (a = t.apply(e[r], n), a !== !1); r++);
                    else
                        for (r in e)
                            if (a = t.apply(e[r], n), a === !1) break
                } else if (o)
                    for (; s > r && (a = t.call(e[r], r, e[r]), a !== !1); r++);
                else
                    for (r in e)
                        if (a = t.call(e[r], r, e[r]), a === !1) break; return e
            },
            trim: lt && !lt.call("ï»¿Â ") ? function(e) {
                return null == e ? "" : lt.call(e)
            } : function(e) {
                return null == e ? "" : (e + "").replace(pt, "")
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (i(Object(e)) ? ct.merge(n, "string" == typeof e ? [e] : e) : it.call(n, e)), n
            },
            inArray: function(e, t, n) {
                var i;
                if (t) {
                    if (rt) return rt.call(t, e, n);
                    for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                        if (n in t && t[n] === e) return n
                }
                return -1
            },
            merge: function(e, n) {
                var i = n.length,
                    a = e.length,
                    r = 0;
                if ("number" == typeof i)
                    for (; i > r; r++) e[a++] = n[r];
                else
                    for (; n[r] !== t;) e[a++] = n[r++];
                return e.length = a, e
            },
            grep: function(e, t, n) {
                var i, a = [],
                    r = 0,
                    s = e.length;
                for (n = !!n; s > r; r++) i = !!t(e[r], r), n !== i && a.push(e[r]);
                return a
            },
            map: function(e, t, n) {
                var a, r = 0,
                    s = e.length,
                    o = i(e),
                    l = [];
                if (o)
                    for (; s > r; r++) a = t(e[r], r, n), null != a && (l[l.length] = a);
                else
                    for (r in e) a = t(e[r], r, n), null != a && (l[l.length] = a);
                return nt.apply([], l)
            },
            guid: 1,
            proxy: function(e, n) {
                var i, a, r;
                return "string" == typeof n && (r = e[n], n = e, e = r), ct.isFunction(e) ? (i = at.call(arguments, 2), a = function() {
                    return e.apply(n || this, i.concat(at.call(arguments)))
                }, a.guid = e.guid = e.guid || ct.guid++, a) : t
            },
            access: function(e, n, i, a, r, s, o) {
                var l = 0,
                    c = e.length,
                    u = null == i;
                if ("object" === ct.type(i)) {
                    r = !0;
                    for (l in i) ct.access(e, n, l, i[l], !0, s, o)
                } else if (a !== t && (r = !0, ct.isFunction(a) || (o = !0), u && (o ? (n.call(e, a), n = null) : (u = n, n = function(e, t, n) {
                        return u.call(ct(e), n)
                    })), n))
                    for (; c > l; l++) n(e[l], i, o ? a : a.call(e[l], l, n(e[l], i)));
                return r ? e : u ? n.call(e) : c ? n(e[0], i) : s
            },
            now: function() {
                return (new Date).getTime()
            }
        }), ct.ready.promise = function(t) {
            if (!U)
                if (U = ct.Deferred(), "complete" === $.readyState) setTimeout(ct.ready);
                else if ($.addEventListener) $.addEventListener("DOMContentLoaded", wt, !1), e.addEventListener("load", wt, !1);
            else {
                $.attachEvent("onreadystatechange", wt), e.attachEvent("onload", wt);
                var n = !1;
                try {
                    n = null == e.frameElement && $.documentElement
                } catch (i) {}
                n && n.doScroll && function a() {
                    if (!ct.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(a, 50)
                        }
                        Tt(), ct.ready()
                    }
                }()
            }
            return U.promise(t)
        }, ct.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            Z["[object " + t + "]"] = t.toLowerCase()
        }), Y = ct($);
        var Et = {};
        ct.Callbacks = function(e) {
            e = "string" == typeof e ? Et[e] || a(e) : ct.extend({}, e);
            var n, i, r, s, o, l, c = [],
                u = !e.once && [],
                d = function(t) {
                    for (i = e.memory && t, r = !0, o = l || 0, l = 0, s = c.length, n = !0; c && s > o; o++)
                        if (c[o].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                            i = !1;
                            break
                        }
                    n = !1, c && (u ? u.length && d(u.shift()) : i ? c = [] : p.disable())
                },
                p = {
                    add: function() {
                        if (c) {
                            var t = c.length;
                            ! function a(t) {
                                ct.each(t, function(t, n) {
                                    var i = ct.type(n);
                                    "function" === i ? e.unique && p.has(n) || c.push(n) : n && n.length && "string" !== i && a(n)
                                })
                            }(arguments), n ? s = c.length : i && (l = t, d(i))
                        }
                        return this
                    },
                    remove: function() {
                        return c && ct.each(arguments, function(e, t) {
                            for (var i;
                                (i = ct.inArray(t, c, i)) > -1;) c.splice(i, 1), n && (s >= i && s--, o >= i && o--)
                        }), this
                    },
                    has: function(e) {
                        return e ? ct.inArray(e, c) > -1 : !(!c || !c.length)
                    },
                    empty: function() {
                        return c = [], this
                    },
                    disable: function() {
                        return c = u = i = t, this
                    },
                    disabled: function() {
                        return !c
                    },
                    lock: function() {
                        return u = t, i || p.disable(), this
                    },
                    locked: function() {
                        return !u
                    },
                    fireWith: function(e, t) {
                        return t = t || [], t = [e, t.slice ? t.slice() : t], !c || r && !u || (n ? u.push(t) : d(t)), this
                    },
                    fire: function() {
                        return p.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return p
        }, ct.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", ct.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ct.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ct.Callbacks("memory")]
                    ],
                    n = "pending",
                    i = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return a.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return ct.Deferred(function(n) {
                                ct.each(t, function(t, r) {
                                    var s = r[0],
                                        o = ct.isFunction(e[t]) && e[t];
                                    a[r[1]](function() {
                                        var e = o && o.apply(this, arguments);
                                        e && ct.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n.promise() : this, o ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? ct.extend(e, i) : i
                        }
                    },
                    a = {};
                return i.pipe = i.then, ct.each(t, function(e, r) {
                    var s = r[2],
                        o = r[3];
                    i[r[1]] = s.add, o && s.add(function() {
                        n = o
                    }, t[1 ^ e][2].disable, t[2][2].lock), a[r[0]] = function() {
                        return a[r[0] + "With"](this === a ? i : this, arguments), this
                    }, a[r[0] + "With"] = s.fireWith
                }), i.promise(a), e && e.call(a, a), a
            },
            when: function(e) {
                var t, n, i, a = 0,
                    r = at.call(arguments),
                    s = r.length,
                    o = 1 !== s || e && ct.isFunction(e.promise) ? s : 0,
                    l = 1 === o ? e : ct.Deferred(),
                    c = function(e, n, i) {
                        return function(a) {
                            n[e] = this, i[e] = arguments.length > 1 ? at.call(arguments) : a, i === t ? l.notifyWith(n, i) : --o || l.resolveWith(n, i)
                        }
                    };
                if (s > 1)
                    for (t = new Array(s), n = new Array(s), i = new Array(s); s > a; a++) r[a] && ct.isFunction(r[a].promise) ? r[a].promise().done(c(a, i, r)).fail(l.reject).progress(c(a, n, t)) : --o;
                return o || l.resolveWith(i, r), l.promise()
            }
        }), ct.support = function() {
            var t, n, i, a, r, s, o, l, c, u, d = $.createElement("div");
            if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*"), i = d.getElementsByTagName("a")[0], !n || !i || !n.length) return {};
            r = $.createElement("select"), o = r.appendChild($.createElement("option")), a = d.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", t = {
                getSetAttribute: "t" !== d.className,
                leadingWhitespace: 3 === d.firstChild.nodeType,
                tbody: !d.getElementsByTagName("tbody").length,
                htmlSerialize: !!d.getElementsByTagName("link").length,
                style: /top/.test(i.getAttribute("style")),
                hrefNormalized: "/a" === i.getAttribute("href"),
                opacity: /^0.5/.test(i.style.opacity),
                cssFloat: !!i.style.cssFloat,
                checkOn: !!a.value,
                optSelected: o.selected,
                enctype: !!$.createElement("form").enctype,
                html5Clone: "<:nav></:nav>" !== $.createElement("nav").cloneNode(!0).outerHTML,
                boxModel: "CSS1Compat" === $.compatMode,
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0,
                boxSizingReliable: !0,
                pixelPosition: !1
            }, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, r.disabled = !0, t.optDisabled = !o.disabled;
            try {
                delete d.test
            } catch (p) {
                t.deleteExpando = !1
            }
            a = $.createElement("input"), a.setAttribute("value", ""), t.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "t"), a.setAttribute("name", "t"), s = $.createDocumentFragment(), s.appendChild(a), t.appendChecked = a.checked, t.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() {
                t.noCloneEvent = !1
            }), d.cloneNode(!0).click());
            for (u in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) d.setAttribute(l = "on" + u, "t"), t[u + "Bubbles"] = l in e || d.attributes[l].expando === !1;
            return d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip, ct(function() {
                var n, i, a, r = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    s = $.getElementsByTagName("body")[0];
                s && (n = $.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = d.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === a[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === d.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== s.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
                    width: "4px"
                }).width, i = d.appendChild($.createElement("div")), i.style.cssText = d.style.cssText = r, i.style.marginRight = i.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), typeof d.style.zoom !== W && (d.innerHTML = "", d.style.cssText = r + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (s.style.zoom = 1)), s.removeChild(n), n = d = a = i = null)
            }), n = r = s = o = i = a = null, t
        }();
        var kt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            At = /([A-Z])/g;
        ct.extend({
            cache: {},
            expando: "jQuery" + (tt + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(e) {
                return e = e.nodeType ? ct.cache[e[ct.expando]] : e[ct.expando], !!e && !l(e)
            },
            data: function(e, t, n) {
                return r(e, t, n)
            },
            removeData: function(e, t) {
                return s(e, t)
            },
            _data: function(e, t, n) {
                return r(e, t, n, !0)
            },
            _removeData: function(e, t) {
                return s(e, t, !0)
            },
            acceptData: function(e) {
                if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
                var t = e.nodeName && ct.noData[e.nodeName.toLowerCase()];
                return !t || t !== !0 && e.getAttribute("classid") === t
            }
        }), ct.fn.extend({
            data: function(e, n) {
                var i, a, r = this[0],
                    s = 0,
                    l = null;
                if (e === t) {
                    if (this.length && (l = ct.data(r), 1 === r.nodeType && !ct._data(r, "parsedAttrs"))) {
                        for (i = r.attributes; s < i.length; s++) a = i[s].name, a.indexOf("data-") || (a = ct.camelCase(a.slice(5)), o(r, a, l[a]));
                        ct._data(r, "parsedAttrs", !0)
                    }
                    return l
                }
                return "object" == typeof e ? this.each(function() {
                    ct.data(this, e)
                }) : ct.access(this, function(n) {
                    return n === t ? r ? o(r, e, ct.data(r, e)) : null : (this.each(function() {
                        ct.data(this, e, n)
                    }), void 0)
                }, null, n, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    ct.removeData(this, e)
                })
            }
        }), ct.extend({
            queue: function(e, t, n) {
                var i;
                return e ? (t = (t || "fx") + "queue", i = ct._data(e, t), n && (!i || ct.isArray(n) ? i = ct._data(e, t, ct.makeArray(n)) : i.push(n)), i || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = ct.queue(e, t),
                    i = n.length,
                    a = n.shift(),
                    r = ct._queueHooks(e, t),
                    s = function() {
                        ct.dequeue(e, t)
                    };
                "inprogress" === a && (a = n.shift(), i--), r.cur = a, a && ("fx" === t && n.unshift("inprogress"), delete r.stop, a.call(e, s, r)), !i && r && r.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return ct._data(e, n) || ct._data(e, n, {
                    empty: ct.Callbacks("once memory").add(function() {
                        ct._removeData(e, t + "queue"), ct._removeData(e, n)
                    })
                })
            }
        }), ct.fn.extend({
            queue: function(e, n) {
                var i = 2;
                return "string" != typeof e && (n = e, e = "fx", i--), arguments.length < i ? ct.queue(this[0], e) : n === t ? this : this.each(function() {
                    var t = ct.queue(this, e, n);
                    ct._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ct.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    ct.dequeue(this, e)
                })
            },
            delay: function(e, t) {
                return e = ct.fx ? ct.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                    var i = setTimeout(t, e);
                    n.stop = function() {
                        clearTimeout(i)
                    }
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, n) {
                var i, a = 1,
                    r = ct.Deferred(),
                    s = this,
                    o = this.length,
                    l = function() {
                        --a || r.resolveWith(s, [s])
                    };
                for ("string" != typeof e && (n = e, e = t), e = e || "fx"; o--;) i = ct._data(s[o], e + "queueHooks"), i && i.empty && (a++, i.empty.add(l));
                return l(), r.promise(n)
            }
        });
        var Pt, St, Ct = /[\t\r\n]/g,
            Nt = /\r/g,
            It = /^(?:input|select|textarea|button|object)$/i,
            Mt = /^(?:a|area)$/i,
            zt = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
            Lt = /^(?:checked|selected)$/i,
            Bt = ct.support.getSetAttribute,
            Rt = ct.support.input;
        ct.fn.extend({
            attr: function(e, t) {
                return ct.access(this, ct.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    ct.removeAttr(this, e)
                })
            },
            prop: function(e, t) {
                return ct.access(this, ct.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return e = ct.propFix[e] || e, this.each(function() {
                    try {
                        this[e] = t, delete this[e]
                    } catch (n) {}
                })
            },
            addClass: function(e) {
                var t, n, i, a, r, s = 0,
                    o = this.length,
                    l = "string" == typeof e && e;
                if (ct.isFunction(e)) return this.each(function(t) {
                    ct(this).addClass(e.call(this, t, this.className))
                });
                if (l)
                    for (t = (e || "").match(dt) || []; o > s; s++)
                        if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ct, " ") : " ")) {
                            for (r = 0; a = t[r++];) i.indexOf(" " + a + " ") < 0 && (i += a + " ");
                            n.className = ct.trim(i)
                        }
                return this
            },
            removeClass: function(e) {
                var t, n, i, a, r, s = 0,
                    o = this.length,
                    l = 0 === arguments.length || "string" == typeof e && e;
                if (ct.isFunction(e)) return this.each(function(t) {
                    ct(this).removeClass(e.call(this, t, this.className))
                });
                if (l)
                    for (t = (e || "").match(dt) || []; o > s; s++)
                        if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ct, " ") : "")) {
                            for (r = 0; a = t[r++];)
                                for (; i.indexOf(" " + a + " ") >= 0;) i = i.replace(" " + a + " ", " ");
                            n.className = e ? ct.trim(i) : ""
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e,
                    i = "boolean" == typeof t;
                return ct.isFunction(e) ? this.each(function(n) {
                    ct(this).toggleClass(e.call(this, n, this.className, t), t)
                }) : this.each(function() {
                    if ("string" === n)
                        for (var a, r = 0, s = ct(this), o = t, l = e.match(dt) || []; a = l[r++];) o = i ? o : !s.hasClass(a), s[o ? "addClass" : "removeClass"](a);
                    else(n === W || "boolean" === n) && (this.className && ct._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ct._data(this, "__className__") || "")
                })
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Ct, " ").indexOf(t) >= 0) return !0;
                return !1
            },
            val: function(e) {
                var n, i, a, r = this[0]; {
                    if (arguments.length) return a = ct.isFunction(e), this.each(function(n) {
                        var r, s = ct(this);
                        1 === this.nodeType && (r = a ? e.call(this, n, s.val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : ct.isArray(r) && (r = ct.map(r, function(e) {
                            return null == e ? "" : e + ""
                        })), i = ct.valHooks[this.type] || ct.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, r, "value") !== t || (this.value = r))
                    });
                    if (r) return i = ct.valHooks[r.type] || ct.valHooks[r.nodeName.toLowerCase()], i && "get" in i && (n = i.get(r, "value")) !== t ? n : (n = r.value, "string" == typeof n ? n.replace(Nt, "") : null == n ? "" : n)
                }
            }
        }), ct.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = e.attributes.value;
                        return !t || t.specified ? e.value : e.text
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n, i = e.options, a = e.selectedIndex, r = "select-one" === e.type || 0 > a, s = r ? null : [], o = r ? a + 1 : i.length, l = 0 > a ? o : r ? a : 0; o > l; l++)
                            if (n = i[l], !(!n.selected && l !== a || (ct.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ct.nodeName(n.parentNode, "optgroup"))) {
                                if (t = ct(n).val(), r) return t;
                                s.push(t)
                            }
                        return s
                    },
                    set: function(e, t) {
                        var n = ct.makeArray(t);
                        return ct(e).find("option").each(function() {
                            this.selected = ct.inArray(ct(this).val(), n) >= 0
                        }), n.length || (e.selectedIndex = -1), n
                    }
                }
            },
            attr: function(e, n, i) {
                var a, r, s, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === W ? ct.prop(e, n, i) : (r = 1 !== o || !ct.isXMLDoc(e), r && (n = n.toLowerCase(), a = ct.attrHooks[n] || (zt.test(n) ? St : Pt)), i === t ? a && r && "get" in a && null !== (s = a.get(e, n)) ? s : (typeof e.getAttribute !== W && (s = e.getAttribute(n)), null == s ? t : s) : null !== i ? a && r && "set" in a && (s = a.set(e, i, n)) !== t ? s : (e.setAttribute(n, i + ""), i) : (ct.removeAttr(e, n), void 0))
            },
            removeAttr: function(e, t) {
                var n, i, a = 0,
                    r = t && t.match(dt);
                if (r && 1 === e.nodeType)
                    for (; n = r[a++];) i = ct.propFix[n] || n, zt.test(n) ? !Bt && Lt.test(n) ? e[ct.camelCase("default-" + n)] = e[i] = !1 : e[i] = !1 : ct.attr(e, n, ""), e.removeAttribute(Bt ? n : i)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!ct.support.radioValue && "radio" === t && ct.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(e, n, i) {
                var a, r, s, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o) return s = 1 !== o || !ct.isXMLDoc(e), s && (n = ct.propFix[n] || n, r = ct.propHooks[n]), i !== t ? r && "set" in r && (a = r.set(e, i, n)) !== t ? a : e[n] = i : r && "get" in r && null !== (a = r.get(e, n)) ? a : e[n]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var n = e.getAttributeNode("tabindex");
                        return n && n.specified ? parseInt(n.value, 10) : It.test(e.nodeName) || Mt.test(e.nodeName) && e.href ? 0 : t
                    }
                }
            }
        }), St = {
            get: function(e, n) {
                var i = ct.prop(e, n),
                    a = "boolean" == typeof i && e.getAttribute(n),
                    r = "boolean" == typeof i ? Rt && Bt ? null != a : Lt.test(n) ? e[ct.camelCase("default-" + n)] : !!a : e.getAttributeNode(n);
                return r && r.value !== !1 ? n.toLowerCase() : t
            },
            set: function(e, t, n) {
                return t === !1 ? ct.removeAttr(e, n) : Rt && Bt || !Lt.test(n) ? e.setAttribute(!Bt && ct.propFix[n] || n, n) : e[ct.camelCase("default-" + n)] = e[n] = !0, n
            }
        }, Rt && Bt || (ct.attrHooks.value = {
            get: function(e, n) {
                var i = e.getAttributeNode(n);
                return ct.nodeName(e, "input") ? e.defaultValue : i && i.specified ? i.value : t
            },
            set: function(e, t, n) {
                return ct.nodeName(e, "input") ? (e.defaultValue = t, void 0) : Pt && Pt.set(e, t, n)
            }
        }), Bt || (Pt = ct.valHooks.button = {
            get: function(e, n) {
                var i = e.getAttributeNode(n);
                return i && ("id" === n || "name" === n || "coords" === n ? "" !== i.value : i.specified) ? i.value : t
            },
            set: function(e, n, i) {
                var a = e.getAttributeNode(i);
                return a || e.setAttributeNode(a = e.ownerDocument.createAttribute(i)), a.value = n += "", "value" === i || n === e.getAttribute(i) ? n : t
            }
        }, ct.attrHooks.contenteditable = {
            get: Pt.get,
            set: function(e, t, n) {
                Pt.set(e, "" === t ? !1 : t, n)
            }
        }, ct.each(["width", "height"], function(e, t) {
            ct.attrHooks[t] = ct.extend(ct.attrHooks[t], {
                set: function(e, n) {
                    return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                }
            })
        })), ct.support.hrefNormalized || (ct.each(["href", "src", "width", "height"], function(e, n) {
            ct.attrHooks[n] = ct.extend(ct.attrHooks[n], {
                get: function(e) {
                    var i = e.getAttribute(n, 2);
                    return null == i ? t : i
                }
            })
        }), ct.each(["href", "src"], function(e, t) {
            ct.propHooks[t] = {
                get: function(e) {
                    return e.getAttribute(t, 4)
                }
            }
        })), ct.support.style || (ct.attrHooks.style = {
            get: function(e) {
                return e.style.cssText || t
            },
            set: function(e, t) {
                return e.style.cssText = t + ""
            }
        }), ct.support.optSelected || (ct.propHooks.selected = ct.extend(ct.propHooks.selected, {
            get: function(e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            }
        })), ct.support.enctype || (ct.propFix.enctype = "encoding"), ct.support.checkOn || ct.each(["radio", "checkbox"], function() {
            ct.valHooks[this] = {
                get: function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                }
            }
        }), ct.each(["radio", "checkbox"], function() {
            ct.valHooks[this] = ct.extend(ct.valHooks[this], {
                set: function(e, t) {
                    return ct.isArray(t) ? e.checked = ct.inArray(ct(e).val(), t) >= 0 : void 0
                }
            })
        });
        var qt = /^(?:input|select|textarea)$/i,
            Ot = /^key/,
            jt = /^(?:mouse|contextmenu)|click/,
            Dt = /^(?:focusinfocus|focusoutblur)$/,
            Ft = /^([^.]*)(?:\.(.+)|)$/;
        ct.event = {
                global: {},
                add: function(e, n, i, a, r) {
                    var s, o, l, c, u, d, p, m, h, f, g, y = ct._data(e);
                    if (y) {
                        for (i.handler && (c = i, i = c.handler, r = c.selector), i.guid || (i.guid = ct.guid++), (o = y.events) || (o = y.events = {}), (d = y.handle) || (d = y.handle = function(e) {
                                return typeof ct === W || e && ct.event.triggered === e.type ? t : ct.event.dispatch.apply(d.elem, arguments)
                            }, d.elem = e), n = (n || "").match(dt) || [""], l = n.length; l--;) s = Ft.exec(n[l]) || [], h = g = s[1], f = (s[2] || "").split(".").sort(), u = ct.event.special[h] || {}, h = (r ? u.delegateType : u.bindType) || h, u = ct.event.special[h] || {}, p = ct.extend({
                            type: h,
                            origType: g,
                            data: a,
                            handler: i,
                            guid: i.guid,
                            selector: r,
                            needsContext: r && ct.expr.match.needsContext.test(r),
                            namespace: f.join(".")
                        }, c), (m = o[h]) || (m = o[h] = [], m.delegateCount = 0, u.setup && u.setup.call(e, a, f, d) !== !1 || (e.addEventListener ? e.addEventListener(h, d, !1) : e.attachEvent && e.attachEvent("on" + h, d))), u.add && (u.add.call(e, p), p.handler.guid || (p.handler.guid = i.guid)), r ? m.splice(m.delegateCount++, 0, p) : m.push(p), ct.event.global[h] = !0;
                        e = null
                    }
                },
                remove: function(e, t, n, i, a) {
                    var r, s, o, l, c, u, d, p, m, h, f, g = ct.hasData(e) && ct._data(e);
                    if (g && (u = g.events)) {
                        for (t = (t || "").match(dt) || [""], c = t.length; c--;)
                            if (o = Ft.exec(t[c]) || [], m = f = o[1], h = (o[2] || "").split(".").sort(), m) {
                                for (d = ct.event.special[m] || {}, m = (i ? d.delegateType : d.bindType) || m, p = u[m] || [], o = o[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--;) s = p[r], !a && f !== s.origType || n && n.guid !== s.guid || o && !o.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (p.splice(r, 1), s.selector && p.delegateCount--, d.remove && d.remove.call(e, s));
                                l && !p.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || ct.removeEvent(e, m, g.handle), delete u[m])
                            } else
                                for (m in u) ct.event.remove(e, m + t[c], n, i, !0);
                        ct.isEmptyObject(u) && (delete g.handle, ct._removeData(e, "events"))
                    }
                },
                trigger: function(n, i, a, r) {
                    var s, o, l, c, u, d, p, m = [a || $],
                        h = ot.call(n, "type") ? n.type : n,
                        f = ot.call(n, "namespace") ? n.namespace.split(".") : [];
                    if (l = d = a = a || $, 3 !== a.nodeType && 8 !== a.nodeType && !Dt.test(h + ct.event.triggered) && (h.indexOf(".") >= 0 && (f = h.split("."), h = f.shift(), f.sort()), o = h.indexOf(":") < 0 && "on" + h, n = n[ct.expando] ? n : new ct.Event(h, "object" == typeof n && n), n.isTrigger = !0, n.namespace = f.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = a), i = null == i ? [n] : ct.makeArray(i, [n]), u = ct.event.special[h] || {}, r || !u.trigger || u.trigger.apply(a, i) !== !1)) {
                        if (!r && !u.noBubble && !ct.isWindow(a)) {
                            for (c = u.delegateType || h, Dt.test(c + h) || (l = l.parentNode); l; l = l.parentNode) m.push(l), d = l;
                            d === (a.ownerDocument || $) && m.push(d.defaultView || d.parentWindow || e)
                        }
                        for (p = 0;
                            (l = m[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? c : u.bindType || h, s = (ct._data(l, "events") || {})[n.type] && ct._data(l, "handle"), s && s.apply(l, i), s = o && l[o], s && ct.acceptData(l) && s.apply && s.apply(l, i) === !1 && n.preventDefault();
                        if (n.type = h, !(r || n.isDefaultPrevented() || u._default && u._default.apply(a.ownerDocument, i) !== !1 || "click" === h && ct.nodeName(a, "a") || !ct.acceptData(a) || !o || !a[h] || ct.isWindow(a))) {
                            d = a[o], d && (a[o] = null), ct.event.triggered = h;
                            try {
                                a[h]()
                            } catch (g) {}
                            ct.event.triggered = t, d && (a[o] = d)
                        }
                        return n.result
                    }
                },
                dispatch: function(e) {
                    e = ct.event.fix(e);
                    var n, i, a, r, s, o = [],
                        l = at.call(arguments),
                        c = (ct._data(this, "events") || {})[e.type] || [],
                        u = ct.event.special[e.type] || {};
                    if (l[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                        for (o = ct.event.handlers.call(this, e, c), n = 0;
                            (r = o[n++]) && !e.isPropagationStopped();)
                            for (e.currentTarget = r.elem, s = 0;
                                (a = r.handlers[s++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, e.data = a.data, i = ((ct.event.special[a.origType] || {}).handle || a.handler).apply(r.elem, l), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                        return u.postDispatch && u.postDispatch.call(this, e), e.result
                    }
                },
                handlers: function(e, n) {
                    var i, a, r, s, o = [],
                        l = n.delegateCount,
                        c = e.target;
                    if (l && c.nodeType && (!e.button || "click" !== e.type))
                        for (; c != this; c = c.parentNode || this)
                            if (1 === c.nodeType && (c.disabled !== !0 || "click" !== e.type)) {
                                for (r = [], s = 0; l > s; s++) a = n[s], i = a.selector + " ", r[i] === t && (r[i] = a.needsContext ? ct(i, this).index(c) >= 0 : ct.find(i, this, null, [c]).length), r[i] && r.push(a);
                                r.length && o.push({
                                    elem: c,
                                    handlers: r
                                })
                            }
                    return l < n.length && o.push({
                        elem: this,
                        handlers: n.slice(l)
                    }), o
                },
                fix: function(e) {
                    if (e[ct.expando]) return e;
                    var t, n, i, a = e.type,
                        r = e,
                        s = this.fixHooks[a];
                    for (s || (this.fixHooks[a] = s = jt.test(a) ? this.mouseHooks : Ot.test(a) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new ct.Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
                    return e.target || (e.target = r.srcElement || $), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, n) {
                        var i, a, r, s = n.button,
                            o = n.fromElement;
                        return null == e.pageX && null != n.clientX && (a = e.target.ownerDocument || $, r = a.documentElement, i = a.body, e.pageX = n.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = n.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? n.toElement : o), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        trigger: function() {
                            return ct.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                        }
                    },
                    focus: {
                        trigger: function() {
                            if (this !== $.activeElement && this.focus) try {
                                return this.focus(), !1
                            } catch (e) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === $.activeElement && this.blur ? (this.blur(), !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            e.result !== t && (e.originalEvent.returnValue = e.result)
                        }
                    }
                },
                simulate: function(e, t, n, i) {
                    var a = ct.extend(new ct.Event, n, {
                        type: e,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    i ? ct.event.trigger(a, null, t) : ct.event.dispatch.call(t, a), a.isDefaultPrevented() && n.preventDefault()
                }
            }, ct.removeEvent = $.removeEventListener ? function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n, !1)
            } : function(e, t, n) {
                var i = "on" + t;
                e.detachEvent && (typeof e[i] === W && (e[i] = null), e.detachEvent(i, n))
            }, ct.Event = function(e, t) {
                return this instanceof ct.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? c : u) : this.type = e, t && ct.extend(this, t), this.timeStamp = e && e.timeStamp || ct.now(), this[ct.expando] = !0, void 0) : new ct.Event(e, t)
            }, ct.Event.prototype = {
                isDefaultPrevented: u,
                isPropagationStopped: u,
                isImmediatePropagationStopped: u,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = c, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = c, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = c, this.stopPropagation()
                }
            }, ct.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(e, t) {
                ct.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, i = this,
                            a = e.relatedTarget,
                            r = e.handleObj;
                        return (!a || a !== i && !ct.contains(i, a)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
                    }
                }
            }), ct.support.submitBubbles || (ct.event.special.submit = {
                setup: function() {
                    return ct.nodeName(this, "form") ? !1 : (ct.event.add(this, "click._submit keypress._submit", function(e) {
                        var n = e.target,
                            i = ct.nodeName(n, "input") || ct.nodeName(n, "button") ? n.form : t;
                        i && !ct._data(i, "submitBubbles") && (ct.event.add(i, "submit._submit", function(e) {
                            e._submit_bubble = !0
                        }), ct._data(i, "submitBubbles", !0))
                    }), void 0)
                },
                postDispatch: function(e) {
                    e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ct.event.simulate("submit", this.parentNode, e, !0))
                },
                teardown: function() {
                    return ct.nodeName(this, "form") ? !1 : (ct.event.remove(this, "._submit"), void 0)
                }
            }), ct.support.changeBubbles || (ct.event.special.change = {
                setup: function() {
                    return qt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ct.event.add(this, "propertychange._change", function(e) {
                        "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                    }), ct.event.add(this, "click._change", function(e) {
                        this._just_changed && !e.isTrigger && (this._just_changed = !1), ct.event.simulate("change", this, e, !0)
                    })), !1) : (ct.event.add(this, "beforeactivate._change", function(e) {
                        var t = e.target;
                        qt.test(t.nodeName) && !ct._data(t, "changeBubbles") && (ct.event.add(t, "change._change", function(e) {
                            !this.parentNode || e.isSimulated || e.isTrigger || ct.event.simulate("change", this.parentNode, e, !0)
                        }), ct._data(t, "changeBubbles", !0))
                    }), void 0)
                },
                handle: function(e) {
                    var t = e.target;
                    return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
                },
                teardown: function() {
                    return ct.event.remove(this, "._change"), !qt.test(this.nodeName)
                }
            }), ct.support.focusinBubbles || ct.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var n = 0,
                    i = function(e) {
                        ct.event.simulate(t, e.target, ct.event.fix(e), !0)
                    };
                ct.event.special[t] = {
                    setup: function() {
                        0 === n++ && $.addEventListener(e, i, !0)
                    },
                    teardown: function() {
                        0 === --n && $.removeEventListener(e, i, !0)
                    }
                }
            }), ct.fn.extend({
                on: function(e, n, i, a, r) {
                    var s, o;
                    if ("object" == typeof e) {
                        "string" != typeof n && (i = i || n, n = t);
                        for (s in e) this.on(s, n, i, e[s], r);
                        return this
                    }
                    if (null == i && null == a ? (a = n, i = n = t) : null == a && ("string" == typeof n ? (a = i, i = t) : (a = i, i = n, n = t)), a === !1) a = u;
                    else if (!a) return this;
                    return 1 === r && (o = a, a = function(e) {
                        return ct().off(e), o.apply(this, arguments)
                    }, a.guid = o.guid || (o.guid = ct.guid++)), this.each(function() {
                        ct.event.add(this, e, a, i, n)
                    })
                },
                one: function(e, t, n, i) {
                    return this.on(e, t, n, i, 1)
                },
                off: function(e, n, i) {
                    var a, r;
                    if (e && e.preventDefault && e.handleObj) return a = e.handleObj, ct(e.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler), this;
                    if ("object" == typeof e) {
                        for (r in e) this.off(r, n, e[r]);
                        return this
                    }
                    return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = u), this.each(function() {
                        ct.event.remove(this, e, i, n)
                    })
                },
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, i) {
                    return this.on(t, e, n, i)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                },
                trigger: function(e, t) {
                    return this.each(function() {
                        ct.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    return n ? ct.event.trigger(e, t, n, !0) : void 0
                }
            }),
            function(e, t) {
                function n(e) {
                    return ht.test(e + "")
                }

                function i() {
                    var e, t = [];
                    return e = function(n, i) {
                        return t.push(n += " ") > E.cacheLength && delete e[t.shift()], e[n] = i
                    }
                }

                function a(e) {
                    return e[j] = !0, e
                }

                function r(e) {
                    var t = I.createElement("div");
                    try {
                        return e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t = null
                    }
                }

                function s(e, t, n, i) {
                    var a, r, s, o, l, c, u, m, h, f;
                    if ((t ? t.ownerDocument || t : D) !== I && N(t), t = t || I, n = n || [], !e || "string" != typeof e) return n;
                    if (1 !== (o = t.nodeType) && 9 !== o) return [];
                    if (!z && !i) {
                        if (a = ft.exec(e))
                            if (s = a[1]) {
                                if (9 === o) {
                                    if (r = t.getElementById(s), !r || !r.parentNode) return n;
                                    if (r.id === s) return n.push(r), n
                                } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && q(t, r) && r.id === s) return n.push(r), n
                            } else {
                                if (a[2]) return J.apply(n, K.call(t.getElementsByTagName(e), 0)), n;
                                if ((s = a[3]) && F.getByClassName && t.getElementsByClassName) return J.apply(n, K.call(t.getElementsByClassName(s), 0)), n
                            }
                        if (F.qsa && !L.test(e)) {
                            if (u = !0, m = j, h = t, f = 9 === o && e, 1 === o && "object" !== t.nodeName.toLowerCase()) {
                                for (c = d(e), (u = t.getAttribute("id")) ? m = u.replace(vt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", l = c.length; l--;) c[l] = m + p(c[l]);
                                h = mt.test(e) && t.parentNode || t, f = c.join(",")
                            }
                            if (f) try {
                                return J.apply(n, K.call(h.querySelectorAll(f), 0)), n
                            } catch (g) {} finally {
                                u || t.removeAttribute("id")
                            }
                        }
                    }
                    return _(e.replace(st, "$1"), t, n, i)
                }

                function o(e, t) {
                    var n = t && e,
                        i = n && (~t.sourceIndex || W) - (~e.sourceIndex || W);
                    if (i) return i;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === t) return -1;
                    return e ? 1 : -1
                }

                function l(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function c(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function u(e) {
                    return a(function(t) {
                        return t = +t, a(function(n, i) {
                            for (var a, r = e([], n.length, t), s = r.length; s--;) n[a = r[s]] && (n[a] = !(i[a] = n[a]))
                        })
                    })
                }

                function d(e, t) {
                    var n, i, a, r, o, l, c, u = V[e + " "];
                    if (u) return t ? 0 : u.slice(0);
                    for (o = e, l = [], c = E.preFilter; o;) {
                        (!n || (i = ot.exec(o))) && (i && (o = o.slice(i[0].length) || o), l.push(a = [])), n = !1, (i = lt.exec(o)) && (n = i.shift(), a.push({
                            value: n,
                            type: i[0].replace(st, " ")
                        }), o = o.slice(n.length));
                        for (r in E.filter) !(i = pt[r].exec(o)) || c[r] && !(i = c[r](i)) || (n = i.shift(), a.push({
                            value: n,
                            type: r,
                            matches: i
                        }), o = o.slice(n.length));
                        if (!n) break
                    }
                    return t ? o.length : o ? s.error(e) : V(e, l).slice(0)
                }

                function p(e) {
                    for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
                    return i
                }

                function m(e, t, n) {
                    var i = t.dir,
                        a = n && "parentNode" === i,
                        r = X++;
                    return t.first ? function(t, n, r) {
                        for (; t = t[i];)
                            if (1 === t.nodeType || a) return e(t, n, r)
                    } : function(t, n, s) {
                        var o, l, c, u = G + " " + r;
                        if (s) {
                            for (; t = t[i];)
                                if ((1 === t.nodeType || a) && e(t, n, s)) return !0
                        } else
                            for (; t = t[i];)
                                if (1 === t.nodeType || a)
                                    if (c = t[j] || (t[j] = {}), (l = c[i]) && l[0] === u) {
                                        if ((o = l[1]) === !0 || o === T) return o === !0
                                    } else if (l = c[i] = [u], l[1] = e(t, n, s) || T, l[1] === !0) return !0
                    }
                }

                function h(e) {
                    return e.length > 1 ? function(t, n, i) {
                        for (var a = e.length; a--;)
                            if (!e[a](t, n, i)) return !1;
                        return !0
                    } : e[0]
                }

                function f(e, t, n, i, a) {
                    for (var r, s = [], o = 0, l = e.length, c = null != t; l > o; o++)(r = e[o]) && (!n || n(r, i, a)) && (s.push(r), c && t.push(o));
                    return s
                }

                function g(e, t, n, i, r, s) {
                    return i && !i[j] && (i = g(i)), r && !r[j] && (r = g(r, s)), a(function(a, s, o, l) {
                        var c, u, d, p = [],
                            m = [],
                            h = s.length,
                            g = a || b(t || "*", o.nodeType ? [o] : o, []),
                            y = !e || !a && t ? g : f(g, p, e, o, l),
                            v = n ? r || (a ? e : h || i) ? [] : s : y;
                        if (n && n(y, v, o, l), i)
                            for (c = f(v, m), i(c, [], o, l), u = c.length; u--;)(d = c[u]) && (v[m[u]] = !(y[m[u]] = d));
                        if (a) {
                            if (r || e) {
                                if (r) {
                                    for (c = [], u = v.length; u--;)(d = v[u]) && c.push(y[u] = d);
                                    r(null, v = [], c, l)
                                }
                                for (u = v.length; u--;)(d = v[u]) && (c = r ? Z.call(a, d) : p[u]) > -1 && (a[c] = !(s[c] = d))
                            }
                        } else v = f(v === s ? v.splice(h, v.length) : v), r ? r(null, s, v, l) : J.apply(s, v)
                    })
                }

                function y(e) {
                    for (var t, n, i, a = e.length, r = E.relative[e[0].type], s = r || E.relative[" "], o = r ? 1 : 0, l = m(function(e) {
                            return e === t
                        }, s, !0), c = m(function(e) {
                            return Z.call(t, e) > -1
                        }, s, !0), u = [function(e, n, i) {
                            return !r && (i || n !== C) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i))
                        }]; a > o; o++)
                        if (n = E.relative[e[o].type]) u = [m(h(u), n)];
                        else {
                            if (n = E.filter[e[o].type].apply(null, e[o].matches), n[j]) {
                                for (i = ++o; a > i && !E.relative[e[i].type]; i++);
                                return g(o > 1 && h(u), o > 1 && p(e.slice(0, o - 1)).replace(st, "$1"), n, i > o && y(e.slice(o, i)), a > i && y(e = e.slice(i)), a > i && p(e))
                            }
                            u.push(n)
                        }
                    return h(u)
                }

                function v(e, t) {
                    var n = 0,
                        i = t.length > 0,
                        r = e.length > 0,
                        o = function(a, o, l, c, u) {
                            var d, p, m, h = [],
                                g = 0,
                                y = "0",
                                v = a && [],
                                b = null != u,
                                _ = C,
                                x = a || r && E.find.TAG("*", u && o.parentNode || o),
                                w = G += null == _ ? 1 : Math.random() || .1;
                            for (b && (C = o !== I && o, T = n); null != (d = x[y]); y++) {
                                if (r && d) {
                                    for (p = 0; m = e[p++];)
                                        if (m(d, o, l)) {
                                            c.push(d);
                                            break
                                        }
                                    b && (G = w, T = ++n)
                                }
                                i && ((d = !m && d) && g--, a && v.push(d))
                            }
                            if (g += y, i && y !== g) {
                                for (p = 0; m = t[p++];) m(v, h, o, l);
                                if (a) {
                                    if (g > 0)
                                        for (; y--;) v[y] || h[y] || (h[y] = Q.call(c));
                                    h = f(h)
                                }
                                J.apply(c, h), b && !a && h.length > 0 && g + t.length > 1 && s.uniqueSort(c)
                            }
                            return b && (G = w, C = _), v
                        };
                    return i ? a(o) : o
                }

                function b(e, t, n) {
                    for (var i = 0, a = t.length; a > i; i++) s(e, t[i], n);
                    return n
                }

                function _(e, t, n, i) {
                    var a, r, s, o, l, c = d(e);
                    if (!i && 1 === c.length) {
                        if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && 9 === t.nodeType && !z && E.relative[r[1].type]) {
                            if (t = E.find.ID(s.matches[0].replace(_t, xt), t)[0], !t) return n;
                            e = e.slice(r.shift().value.length)
                        }
                        for (a = pt.needsContext.test(e) ? 0 : r.length; a-- && (s = r[a], !E.relative[o = s.type]);)
                            if ((l = E.find[o]) && (i = l(s.matches[0].replace(_t, xt), mt.test(r[0].type) && t.parentNode || t))) {
                                if (r.splice(a, 1), e = i.length && p(r), !e) return J.apply(n, K.call(i, 0)), n;
                                break
                            }
                    }
                    return P(e, c)(i, t, z, n, mt.test(e)), n
                }

                function x() {}
                var w, T, E, k, A, P, S, C, N, I, M, z, L, B, R, q, O, j = "sizzle" + -new Date,
                    D = e.document,
                    F = {},
                    G = 0,
                    X = 0,
                    H = i(),
                    V = i(),
                    U = i(),
                    Y = typeof t,
                    W = 1 << 31,
                    $ = [],
                    Q = $.pop,
                    J = $.push,
                    K = $.slice,
                    Z = $.indexOf || function(e) {
                        for (var t = 0, n = this.length; n > t; t++)
                            if (this[t] === e) return t;
                        return -1
                    },
                    et = "[\\x20\\t\\r\\n\\f]",
                    tt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    nt = tt.replace("w", "w#"),
                    it = "([*^$|!~]?=)",
                    at = "\\[" + et + "*(" + tt + ")" + et + "*(?:" + it + et + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + nt + ")|)|)" + et + "*\\]",
                    rt = ":(" + tt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + at.replace(3, 8) + ")*)|.*)\\)|)",
                    st = new RegExp("^" + et + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et + "+$", "g"),
                    ot = new RegExp("^" + et + "*," + et + "*"),
                    lt = new RegExp("^" + et + "*([\\x20\\t\\r\\n\\f>+~])" + et + "*"),
                    ut = new RegExp(rt),
                    dt = new RegExp("^" + nt + "$"),
                    pt = {
                        ID: new RegExp("^#(" + tt + ")"),
                        CLASS: new RegExp("^\\.(" + tt + ")"),
                        NAME: new RegExp("^\\[name=['\"]?(" + tt + ")['\"]?\\]"),
                        TAG: new RegExp("^(" + tt.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + at),
                        PSEUDO: new RegExp("^" + rt),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et + "*(even|odd|(([+-]|)(\\d*)n|)" + et + "*(?:([+-]|)" + et + "*(\\d+)|))" + et + "*\\)|)", "i"),
                        needsContext: new RegExp("^" + et + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et + "*((?:-\\d)?\\d*)" + et + "*\\)|)(?=[^-]|$)", "i")
                    },
                    mt = /[\x20\t\r\n\f]*[+~]/,
                    ht = /^[^{]+\{\s*\[native code/,
                    ft = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    gt = /^(?:input|select|textarea|button)$/i,
                    yt = /^h\d$/i,
                    vt = /'|\\/g,
                    bt = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    _t = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
                    xt = function(e, t) {
                        var n = "0x" + t - 65536;
                        return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
                    };
                try {
                    K.call(D.documentElement.childNodes, 0)[0].nodeType
                } catch (wt) {
                    K = function(e) {
                        for (var t, n = []; t = this[e++];) n.push(t);
                        return n
                    }
                }
                A = s.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName : !1
                }, N = s.setDocument = function(e) {
                    var i = e ? e.ownerDocument || e : D;
                    return i !== I && 9 === i.nodeType && i.documentElement ? (I = i, M = i.documentElement, z = A(i), F.tagNameNoComments = r(function(e) {
                        return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
                    }), F.attributes = r(function(e) {
                        e.innerHTML = "<select></select>";
                        var t = typeof e.lastChild.getAttribute("multiple");
                        return "boolean" !== t && "string" !== t
                    }), F.getByClassName = r(function(e) {
                        return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
                    }), F.getByName = r(function(e) {
                        e.id = j + 0, e.innerHTML = "<a name='" + j + "'></a><div name='" + j + "'></div>", M.insertBefore(e, M.firstChild);
                        var t = i.getElementsByName && i.getElementsByName(j).length === 2 + i.getElementsByName(j + 0).length;
                        return F.getIdNotName = !i.getElementById(j), M.removeChild(e), t
                    }), E.attrHandle = r(function(e) {
                        return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== Y && "#" === e.firstChild.getAttribute("href")
                    }) ? {} : {
                        href: function(e) {
                            return e.getAttribute("href", 2)
                        },
                        type: function(e) {
                            return e.getAttribute("type")
                        }
                    }, F.getIdNotName ? (E.find.ID = function(e, t) {
                        if (typeof t.getElementById !== Y && !z) {
                            var n = t.getElementById(e);
                            return n && n.parentNode ? [n] : []
                        }
                    }, E.filter.ID = function(e) {
                        var t = e.replace(_t, xt);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (E.find.ID = function(e, n) {
                        if (typeof n.getElementById !== Y && !z) {
                            var i = n.getElementById(e);
                            return i ? i.id === e || typeof i.getAttributeNode !== Y && i.getAttributeNode("id").value === e ? [i] : t : []
                        }
                    }, E.filter.ID = function(e) {
                        var t = e.replace(_t, xt);
                        return function(e) {
                            var n = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), E.find.TAG = F.tagNameNoComments ? function(e, t) {
                        return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
                    } : function(e, t) {
                        var n, i = [],
                            a = 0,
                            r = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = r[a++];) 1 === n.nodeType && i.push(n);
                            return i
                        }
                        return r
                    }, E.find.NAME = F.getByName && function(e, t) {
                        return typeof t.getElementsByName !== Y ? t.getElementsByName(name) : void 0
                    }, E.find.CLASS = F.getByClassName && function(e, t) {
                        return typeof t.getElementsByClassName === Y || z ? void 0 : t.getElementsByClassName(e)
                    }, B = [], L = [":focus"], (F.qsa = n(i.querySelectorAll)) && (r(function(e) {
                        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || L.push("\\[" + et + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || L.push(":checked")
                    }), r(function(e) {
                        e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && L.push("[*^$]=" + et + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
                    })), (F.matchesSelector = n(R = M.matchesSelector || M.mozMatchesSelector || M.webkitMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && r(function(e) {
                        F.disconnectedMatch = R.call(e, "div"), R.call(e, "[s!='']:x"), B.push("!=", rt)
                    }), L = new RegExp(L.join("|")), B = new RegExp(B.join("|")), q = n(M.contains) || M.compareDocumentPosition ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                    } : function(e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, O = M.compareDocumentPosition ? function(e, t) {
                        var n;
                        return e === t ? (S = !0, 0) : (n = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & n || e.parentNode && 11 === e.parentNode.nodeType ? e === i || q(D, e) ? -1 : t === i || q(D, t) ? 1 : 0 : 4 & n ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                    } : function(e, t) {
                        var n, a = 0,
                            r = e.parentNode,
                            s = t.parentNode,
                            l = [e],
                            c = [t];
                        if (e === t) return S = !0, 0;
                        if (!r || !s) return e === i ? -1 : t === i ? 1 : r ? -1 : s ? 1 : 0;
                        if (r === s) return o(e, t);
                        for (n = e; n = n.parentNode;) l.unshift(n);
                        for (n = t; n = n.parentNode;) c.unshift(n);
                        for (; l[a] === c[a];) a++;
                        return a ? o(l[a], c[a]) : l[a] === D ? -1 : c[a] === D ? 1 : 0
                    }, S = !1, [0, 0].sort(O), F.detectDuplicates = S, I) : I
                }, s.matches = function(e, t) {
                    return s(e, null, null, t)
                }, s.matchesSelector = function(e, t) {
                    if ((e.ownerDocument || e) !== I && N(e), t = t.replace(bt, "='$1']"), !(!F.matchesSelector || z || B && B.test(t) || L.test(t))) try {
                        var n = R.call(e, t);
                        if (n || F.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                    } catch (i) {}
                    return s(t, I, null, [e]).length > 0
                }, s.contains = function(e, t) {
                    return (e.ownerDocument || e) !== I && N(e), q(e, t)
                }, s.attr = function(e, t) {
                    var n;
                    return (e.ownerDocument || e) !== I && N(e), z || (t = t.toLowerCase()), (n = E.attrHandle[t]) ? n(e) : z || F.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
                }, s.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, s.uniqueSort = function(e) {
                    var t, n = [],
                        i = 1,
                        a = 0;
                    if (S = !F.detectDuplicates, e.sort(O), S) {
                        for (; t = e[i]; i++) t === e[i - 1] && (a = n.push(i));
                        for (; a--;) e.splice(n[a], 1)
                    }
                    return e
                }, k = s.getText = function(e) {
                    var t, n = "",
                        i = 0,
                        a = e.nodeType;
                    if (a) {
                        if (1 === a || 9 === a || 11 === a) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += k(e)
                        } else if (3 === a || 4 === a) return e.nodeValue
                    } else
                        for (; t = e[i]; i++) n += k(t);
                    return n
                }, E = s.selectors = {
                    cacheLength: 50,
                    createPseudo: a,
                    match: pt,
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(_t, xt), e[3] = (e[4] || e[5] || "").replace(_t, xt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || s.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && s.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[5] && e[2];
                            return pt.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && ut.test(n) && (t = d(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            return "*" === e ? function() {
                                return !0
                            } : (e = e.replace(_t, xt).toLowerCase(), function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            })
                        },
                        CLASS: function(e) {
                            var t = H[e + " "];
                            return t || (t = new RegExp("(^|" + et + ")" + e + "(" + et + "|$)")) && H(e, function(e) {
                                return t.test(e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, t, n) {
                            return function(i) {
                                var a = s.attr(i, e);
                                return null == a ? "!=" === t : t ? (a += "", "=" === t ? a === n : "!=" === t ? a !== n : "^=" === t ? n && 0 === a.indexOf(n) : "*=" === t ? n && a.indexOf(n) > -1 : "$=" === t ? n && a.slice(-n.length) === n : "~=" === t ? (" " + a + " ").indexOf(n) > -1 : "|=" === t ? a === n || a.slice(0, n.length + 1) === n + "-" : !1) : !0
                            }
                        },
                        CHILD: function(e, t, n, i, a) {
                            var r = "nth" !== e.slice(0, 3),
                                s = "last" !== e.slice(-4),
                                o = "of-type" === t;
                            return 1 === i && 0 === a ? function(e) {
                                return !!e.parentNode
                            } : function(t, n, l) {
                                var c, u, d, p, m, h, f = r !== s ? "nextSibling" : "previousSibling",
                                    g = t.parentNode,
                                    y = o && t.nodeName.toLowerCase(),
                                    v = !l && !o;
                                if (g) {
                                    if (r) {
                                        for (; f;) {
                                            for (d = t; d = d[f];)
                                                if (o ? d.nodeName.toLowerCase() === y : 1 === d.nodeType) return !1;
                                            h = f = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [s ? g.firstChild : g.lastChild], s && v) {
                                        for (u = g[j] || (g[j] = {}), c = u[e] || [], m = c[0] === G && c[1], p = c[0] === G && c[2], d = m && g.childNodes[m]; d = ++m && d && d[f] || (p = m = 0) || h.pop();)
                                            if (1 === d.nodeType && ++p && d === t) {
                                                u[e] = [G, m, p];
                                                break
                                            }
                                    } else if (v && (c = (t[j] || (t[j] = {}))[e]) && c[0] === G) p = c[1];
                                    else
                                        for (;
                                            (d = ++m && d && d[f] || (p = m = 0) || h.pop()) && ((o ? d.nodeName.toLowerCase() !== y : 1 !== d.nodeType) || !++p || (v && ((d[j] || (d[j] = {}))[e] = [G, p]), d !== t)););
                                    return p -= a, p === i || 0 === p % i && p / i >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, t) {
                            var n, i = E.pseudos[e] || E.setFilters[e.toLowerCase()] || s.error("unsupported pseudo: " + e);
                            return i[j] ? i(t) : i.length > 1 ? (n = [e, e, "", t], E.setFilters.hasOwnProperty(e.toLowerCase()) ? a(function(e, n) {
                                for (var a, r = i(e, t), s = r.length; s--;) a = Z.call(e, r[s]), e[a] = !(n[a] = r[s])
                            }) : function(e) {
                                return i(e, 0, n)
                            }) : i
                        }
                    },
                    pseudos: {
                        not: a(function(e) {
                            var t = [],
                                n = [],
                                i = P(e.replace(st, "$1"));
                            return i[j] ? a(function(e, t, n, a) {
                                for (var r, s = i(e, null, a, []), o = e.length; o--;)(r = s[o]) && (e[o] = !(t[o] = r))
                            }) : function(e, a, r) {
                                return t[0] = e, i(t, null, r, n), !n.pop()
                            }
                        }),
                        has: a(function(e) {
                            return function(t) {
                                return s(e, t).length > 0
                            }
                        }),
                        contains: a(function(e) {
                            return function(t) {
                                return (t.textContent || t.innerText || k(t)).indexOf(e) > -1
                            }
                        }),
                        lang: a(function(e) {
                            return dt.test(e || "") || s.error("unsupported lang: " + e), e = e.replace(_t, xt).toLowerCase(),
                                function(t) {
                                    var n;
                                    do
                                        if (n = z ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                    while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === M
                        },
                        focus: function(e) {
                            return e === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !E.pseudos.empty(e)
                        },
                        header: function(e) {
                            return yt.test(e.nodeName)
                        },
                        input: function(e) {
                            return gt.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(e, t) {
                            return [t - 1]
                        }),
                        eq: u(function(e, t, n) {
                            return [0 > n ? n + t : n]
                        }),
                        even: u(function(e, t) {
                            for (var n = 0; t > n; n += 2) e.push(n);
                            return e
                        }),
                        odd: u(function(e, t) {
                            for (var n = 1; t > n; n += 2) e.push(n);
                            return e
                        }),
                        lt: u(function(e, t, n) {
                            for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                            return e
                        }),
                        gt: u(function(e, t, n) {
                            for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                            return e
                        })
                    }
                };
                for (w in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) E.pseudos[w] = l(w);
                for (w in {
                        submit: !0,
                        reset: !0
                    }) E.pseudos[w] = c(w);
                P = s.compile = function(e, t) {
                    var n, i = [],
                        a = [],
                        r = U[e + " "];
                    if (!r) {
                        for (t || (t = d(e)), n = t.length; n--;) r = y(t[n]), r[j] ? i.push(r) : a.push(r);
                        r = U(e, v(a, i))
                    }
                    return r
                }, E.pseudos.nth = E.pseudos.eq, E.filters = x.prototype = E.pseudos, E.setFilters = new x, N(), s.attr = ct.attr, ct.find = s, ct.expr = s.selectors, ct.expr[":"] = ct.expr.pseudos, ct.unique = s.uniqueSort, ct.text = s.getText, ct.isXMLDoc = s.isXML, ct.contains = s.contains
            }(e);
        var Gt = /Until$/,
            Xt = /^(?:parents|prev(?:Until|All))/,
            Ht = /^.[^:#\[\.,]*$/,
            Vt = ct.expr.match.needsContext,
            Ut = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ct.fn.extend({
            find: function(e) {
                var t, n, i, a = this.length;
                if ("string" != typeof e) return i = this, this.pushStack(ct(e).filter(function() {
                    for (t = 0; a > t; t++)
                        if (ct.contains(i[t], this)) return !0
                }));
                for (n = [], t = 0; a > t; t++) ct.find(e, this[t], n);
                return n = this.pushStack(a > 1 ? ct.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
            },
            has: function(e) {
                var t, n = ct(e, this),
                    i = n.length;
                return this.filter(function() {
                    for (t = 0; i > t; t++)
                        if (ct.contains(this, n[t])) return !0
                })
            },
            not: function(e) {
                return this.pushStack(p(this, e, !1))
            },
            filter: function(e) {
                return this.pushStack(p(this, e, !0))
            },
            is: function(e) {
                return !!e && ("string" == typeof e ? Vt.test(e) ? ct(e, this.context).index(this[0]) >= 0 : ct.filter(e, this).length > 0 : this.filter(e).length > 0)
            },
            closest: function(e, t) {
                for (var n, i = 0, a = this.length, r = [], s = Vt.test(e) || "string" != typeof e ? ct(e, t || this.context) : 0; a > i; i++)
                    for (n = this[i]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
                        if (s ? s.index(n) > -1 : ct.find.matchesSelector(n, e)) {
                            r.push(n);
                            break
                        }
                        n = n.parentNode
                    }
                return this.pushStack(r.length > 1 ? ct.unique(r) : r)
            },
            index: function(e) {
                return e ? "string" == typeof e ? ct.inArray(this[0], ct(e)) : ct.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                var n = "string" == typeof e ? ct(e, t) : ct.makeArray(e && e.nodeType ? [e] : e),
                    i = ct.merge(this.get(), n);
                return this.pushStack(ct.unique(i))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), ct.fn.andSelf = ct.fn.addBack, ct.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return ct.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return ct.dir(e, "parentNode", n)
            },
            next: function(e) {
                return d(e, "nextSibling")
            },
            prev: function(e) {
                return d(e, "previousSibling")
            },
            nextAll: function(e) {
                return ct.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return ct.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return ct.dir(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return ct.dir(e, "previousSibling", n)
            },
            siblings: function(e) {
                return ct.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return ct.sibling(e.firstChild)
            },
            contents: function(e) {
                return ct.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ct.merge([], e.childNodes)
            }
        }, function(e, t) {
            ct.fn[e] = function(n, i) {
                var a = ct.map(this, t, n);
                return Gt.test(e) || (i = n), i && "string" == typeof i && (a = ct.filter(i, a)), a = this.length > 1 && !Ut[e] ? ct.unique(a) : a, this.length > 1 && Xt.test(e) && (a = a.reverse()), this.pushStack(a)
            }
        }), ct.extend({
            filter: function(e, t, n) {
                return n && (e = ":not(" + e + ")"), 1 === t.length ? ct.find.matchesSelector(t[0], e) ? [t[0]] : [] : ct.find.matches(e, t)
            },
            dir: function(e, n, i) {
                for (var a = [], r = e[n]; r && 9 !== r.nodeType && (i === t || 1 !== r.nodeType || !ct(r).is(i));) 1 === r.nodeType && a.push(r), r = r[n];
                return a
            },
            sibling: function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        });
        var Yt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Wt = / jQuery\d+="(?:null|\d+)"/g,
            $t = new RegExp("<(?:" + Yt + ")[\\s/>]", "i"),
            Qt = /^\s+/,
            Jt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Kt = /<([\w:]+)/,
            Zt = /<tbody/i,
            en = /<|&#?\w+;/,
            tn = /<(?:script|style|link)/i,
            nn = /^(?:checkbox|radio)$/i,
            an = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rn = /^$|\/(?:java|ecma)script/i,
            sn = /^true\/(.*)/,
            on = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            ln = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: ct.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            cn = m($),
            un = cn.appendChild($.createElement("div"));
        ln.optgroup = ln.option, ln.tbody = ln.tfoot = ln.colgroup = ln.caption = ln.thead, ln.th = ln.td, ct.fn.extend({
            text: function(e) {
                return ct.access(this, function(e) {
                    return e === t ? ct.text(this) : this.empty().append((this[0] && this[0].ownerDocument || $).createTextNode(e))
                }, null, e, arguments.length)
            },
            wrapAll: function(e) {
                if (ct.isFunction(e)) return this.each(function(t) {
                    ct(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = ct(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                return ct.isFunction(e) ? this.each(function(t) {
                    ct(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = ct(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = ct.isFunction(e);
                return this.each(function(n) {
                    ct(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    ct.nodeName(this, "body") || ct(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(e) {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(e) {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
                })
            },
            before: function() {
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function(e, t) {
                for (var n, i = 0; null != (n = this[i]); i++)(!e || ct.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || ct.cleanData(_(n)), n.parentNode && (t && ct.contains(n.ownerDocument, n) && y(_(n, "script")), n.parentNode.removeChild(n)));
                return this
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && ct.cleanData(_(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                    e.options && ct.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            },
            clone: function(e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                    return ct.clone(this, e, t)
                })
            },
            html: function(e) {
                return ct.access(this, function(e) {
                    var n = this[0] || {},
                        i = 0,
                        a = this.length;
                    if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Wt, "") : t;
                    if (!("string" != typeof e || tn.test(e) || !ct.support.htmlSerialize && $t.test(e) || !ct.support.leadingWhitespace && Qt.test(e) || ln[(Kt.exec(e) || ["", ""])[1].toLowerCase()])) {
                        e = e.replace(Jt, "<$1></$2>");
                        try {
                            for (; a > i; i++) n = this[i] || {}, 1 === n.nodeType && (ct.cleanData(_(n, !1)), n.innerHTML = e);
                            n = 0
                        } catch (r) {}
                    }
                    n && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function(e) {
                var t = ct.isFunction(e);
                return t || "string" == typeof e || (e = ct(e).not(this).detach()), this.domManip([e], !0, function(e) {
                    var t = this.nextSibling,
                        n = this.parentNode;
                    n && (ct(this).remove(), n.insertBefore(e, t))
                })
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, n, i) {
                e = nt.apply([], e);
                var a, r, s, o, l, c, u = 0,
                    d = this.length,
                    p = this,
                    m = d - 1,
                    y = e[0],
                    v = ct.isFunction(y);
                if (v || !(1 >= d || "string" != typeof y || ct.support.checkClone) && an.test(y)) return this.each(function(a) {
                    var r = p.eq(a);
                    v && (e[0] = y.call(this, a, n ? r.html() : t)), r.domManip(e, n, i)
                });
                if (d && (c = ct.buildFragment(e, this[0].ownerDocument, !1, this), a = c.firstChild, 1 === c.childNodes.length && (c = a), a)) {
                    for (n = n && ct.nodeName(a, "tr"), o = ct.map(_(c, "script"), f), s = o.length; d > u; u++) r = c, u !== m && (r = ct.clone(r, !0, !0), s && ct.merge(o, _(r, "script"))), i.call(n && ct.nodeName(this[u], "table") ? h(this[u], "tbody") : this[u], r, u);
                    if (s)
                        for (l = o[o.length - 1].ownerDocument, ct.map(o, g), u = 0; s > u; u++) r = o[u], rn.test(r.type || "") && !ct._data(r, "globalEval") && ct.contains(l, r) && (r.src ? ct.ajax({
                            url: r.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        }) : ct.globalEval((r.text || r.textContent || r.innerHTML || "").replace(on, "")));
                    c = a = null
                }
                return this
            }
        }), ct.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            ct.fn[e] = function(e) {
                for (var n, i = 0, a = [], r = ct(e), s = r.length - 1; s >= i; i++) n = i === s ? this : this.clone(!0), ct(r[i])[t](n), it.apply(a, n.get());
                return this.pushStack(a)
            }
        }), ct.extend({
            clone: function(e, t, n) {
                var i, a, r, s, o, l = ct.contains(e.ownerDocument, e);
                if (ct.support.html5Clone || ct.isXMLDoc(e) || !$t.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (un.innerHTML = e.outerHTML, un.removeChild(r = un.firstChild)), !(ct.support.noCloneEvent && ct.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ct.isXMLDoc(e)))
                    for (i = _(r), o = _(e), s = 0; null != (a = o[s]); ++s) i[s] && b(a, i[s]);
                if (t)
                    if (n)
                        for (o = o || _(e), i = i || _(r), s = 0; null != (a = o[s]); s++) v(a, i[s]);
                    else v(e, r);
                return i = _(r, "script"), i.length > 0 && y(i, !l && _(e, "script")), i = o = a = null, r
            },
            buildFragment: function(e, t, n, i) {
                for (var a, r, s, o, l, c, u, d = e.length, p = m(t), h = [], f = 0; d > f; f++)
                    if (r = e[f], r || 0 === r)
                        if ("object" === ct.type(r)) ct.merge(h, r.nodeType ? [r] : r);
                        else if (en.test(r)) {
                    for (o = o || p.appendChild(t.createElement("div")), l = (Kt.exec(r) || ["", ""])[1].toLowerCase(), u = ln[l] || ln._default, o.innerHTML = u[1] + r.replace(Jt, "<$1></$2>") + u[2], a = u[0]; a--;) o = o.lastChild;
                    if (!ct.support.leadingWhitespace && Qt.test(r) && h.push(t.createTextNode(Qt.exec(r)[0])), !ct.support.tbody)
                        for (r = "table" !== l || Zt.test(r) ? "<table>" !== u[1] || Zt.test(r) ? 0 : o : o.firstChild, a = r && r.childNodes.length; a--;) ct.nodeName(c = r.childNodes[a], "tbody") && !c.childNodes.length && r.removeChild(c);
                    for (ct.merge(h, o.childNodes), o.textContent = ""; o.firstChild;) o.removeChild(o.firstChild);
                    o = p.lastChild
                } else h.push(t.createTextNode(r));
                for (o && p.removeChild(o), ct.support.appendChecked || ct.grep(_(h, "input"), x), f = 0; r = h[f++];)
                    if ((!i || -1 === ct.inArray(r, i)) && (s = ct.contains(r.ownerDocument, r), o = _(p.appendChild(r), "script"), s && y(o), n))
                        for (a = 0; r = o[a++];) rn.test(r.type || "") && n.push(r);
                return o = null, p
            },
            cleanData: function(e, t) {
                for (var n, i, a, r, s = 0, o = ct.expando, l = ct.cache, c = ct.support.deleteExpando, u = ct.event.special; null != (n = e[s]); s++)
                    if ((t || ct.acceptData(n)) && (a = n[o], r = a && l[a])) {
                        if (r.events)
                            for (i in r.events) u[i] ? ct.event.remove(n, i) : ct.removeEvent(n, i, r.handle);
                        l[a] && (delete l[a], c ? delete n[o] : typeof n.removeAttribute !== W ? n.removeAttribute(o) : n[o] = null, et.push(a))
                    }
            }
        });
        var dn, pn, mn, hn = /alpha\([^)]*\)/i,
            fn = /opacity\s*=\s*([^)]*)/,
            gn = /^(top|right|bottom|left)$/,
            yn = /^(none|table(?!-c[ea]).+)/,
            vn = /^margin/,
            bn = new RegExp("^(" + ut + ")(.*)$", "i"),
            _n = new RegExp("^(" + ut + ")(?!px)[a-z%]+$", "i"),
            xn = new RegExp("^([+-])=(" + ut + ")", "i"),
            wn = {
                BODY: "block"
            },
            Tn = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            En = {
                letterSpacing: 0,
                fontWeight: 400
            },
            kn = ["Top", "Right", "Bottom", "Left"],
            An = ["Webkit", "O", "Moz", "ms"];
        ct.fn.extend({
            css: function(e, n) {
                return ct.access(this, function(e, n, i) {
                    var a, r, s = {},
                        o = 0;
                    if (ct.isArray(n)) {
                        for (r = pn(e), a = n.length; a > o; o++) s[n[o]] = ct.css(e, n[o], !1, r);
                        return s
                    }
                    return i !== t ? ct.style(e, n, i) : ct.css(e, n)
                }, e, n, arguments.length > 1)
            },
            show: function() {
                return E(this, !0)
            },
            hide: function() {
                return E(this)
            },
            toggle: function(e) {
                var t = "boolean" == typeof e;
                return this.each(function() {
                    (t ? e : T(this)) ? ct(this).show(): ct(this).hide()
                })
            }
        }), ct.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = mn(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": ct.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(e, n, i, a) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var r, s, o, l = ct.camelCase(n),
                        c = e.style;
                    if (n = ct.cssProps[l] || (ct.cssProps[l] = w(c, l)), o = ct.cssHooks[n] || ct.cssHooks[l], i === t) return o && "get" in o && (r = o.get(e, !1, a)) !== t ? r : c[n];
                    if (s = typeof i, "string" === s && (r = xn.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(ct.css(e, n)), s = "number"), !(null == i || "number" === s && isNaN(i) || ("number" !== s || ct.cssNumber[l] || (i += "px"), ct.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (c[n] = "inherit"), o && "set" in o && (i = o.set(e, i, a)) === t))) try {
                        c[n] = i
                    } catch (u) {}
                }
            },
            css: function(e, n, i, a) {
                var r, s, o, l = ct.camelCase(n);
                return n = ct.cssProps[l] || (ct.cssProps[l] = w(e.style, l)), o = ct.cssHooks[n] || ct.cssHooks[l], o && "get" in o && (s = o.get(e, !0, i)), s === t && (s = mn(e, n, a)), "normal" === s && n in En && (s = En[n]), "" === i || i ? (r = parseFloat(s), i === !0 || ct.isNumeric(r) ? r || 0 : s) : s
            },
            swap: function(e, t, n, i) {
                var a, r, s = {};
                for (r in t) s[r] = e.style[r], e.style[r] = t[r];
                a = n.apply(e, i || []);
                for (r in t) e.style[r] = s[r];
                return a
            }
        }), e.getComputedStyle ? (pn = function(t) {
            return e.getComputedStyle(t, null)
        }, mn = function(e, n, i) {
            var a, r, s, o = i || pn(e),
                l = o ? o.getPropertyValue(n) || o[n] : t,
                c = e.style;
            return o && ("" !== l || ct.contains(e.ownerDocument, e) || (l = ct.style(e, n)), _n.test(l) && vn.test(n) && (a = c.width, r = c.minWidth, s = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, l = o.width, c.width = a, c.minWidth = r, c.maxWidth = s)), l
        }) : $.documentElement.currentStyle && (pn = function(e) {
            return e.currentStyle
        }, mn = function(e, n, i) {
            var a, r, s, o = i || pn(e),
                l = o ? o[n] : t,
                c = e.style;
            return null == l && c && c[n] && (l = c[n]), _n.test(l) && !gn.test(n) && (a = c.left, r = e.runtimeStyle, s = r && r.left, s && (r.left = e.currentStyle.left), c.left = "fontSize" === n ? "1em" : l, l = c.pixelLeft + "px", c.left = a, s && (r.left = s)), "" === l ? "auto" : l
        }), ct.each(["height", "width"], function(e, t) {
            ct.cssHooks[t] = {
                get: function(e, n, i) {
                    return n ? 0 === e.offsetWidth && yn.test(ct.css(e, "display")) ? ct.swap(e, Tn, function() {
                        return P(e, t, i)
                    }) : P(e, t, i) : void 0
                },
                set: function(e, n, i) {
                    var a = i && pn(e);
                    return k(e, n, i ? A(e, t, i, ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, a), a) : 0)
                }
            }
        }), ct.support.opacity || (ct.cssHooks.opacity = {
            get: function(e, t) {
                return fn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var n = e.style,
                    i = e.currentStyle,
                    a = ct.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                    r = i && i.filter || n.filter || "";
                n.zoom = 1, (t >= 1 || "" === t) && "" === ct.trim(r.replace(hn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = hn.test(r) ? r.replace(hn, a) : r + " " + a)
            }
        }), ct(function() {
            ct.support.reliableMarginRight || (ct.cssHooks.marginRight = {
                get: function(e, t) {
                    return t ? ct.swap(e, {
                        display: "inline-block"
                    }, mn, [e, "marginRight"]) : void 0
                }
            }), !ct.support.pixelPosition && ct.fn.position && ct.each(["top", "left"], function(e, t) {
                ct.cssHooks[t] = {
                    get: function(e, n) {
                        return n ? (n = mn(e, t), _n.test(n) ? ct(e).position()[t] + "px" : n) : void 0
                    }
                }
            })
        }), ct.expr && ct.expr.filters && (ct.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ct.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ct.css(e, "display"))
        }, ct.expr.filters.visible = function(e) {
            return !ct.expr.filters.hidden(e)
        }), ct.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            ct.cssHooks[e + t] = {
                expand: function(n) {
                    for (var i = 0, a = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) a[e + kn[i] + t] = r[i] || r[i - 2] || r[0];
                    return a
                }
            }, vn.test(e) || (ct.cssHooks[e + t].set = k)
        });
        var Pn = /%20/g,
            Sn = /\[\]$/,
            Cn = /\r?\n/g,
            Nn = /^(?:submit|button|image|reset|file)$/i,
            In = /^(?:input|select|textarea|keygen)/i;
        ct.fn.extend({
            serialize: function() {
                return ct.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = ct.prop(this, "elements");
                    return e ? ct.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !ct(this).is(":disabled") && In.test(this.nodeName) && !Nn.test(e) && (this.checked || !nn.test(e))
                }).map(function(e, t) {
                    var n = ct(this).val();
                    return null == n ? null : ct.isArray(n) ? ct.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Cn, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Cn, "\r\n")
                    }
                }).get()
            }
        }), ct.param = function(e, n) {
            var i, a = [],
                r = function(e, t) {
                    t = ct.isFunction(t) ? t() : null == t ? "" : t, a[a.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (n === t && (n = ct.ajaxSettings && ct.ajaxSettings.traditional), ct.isArray(e) || e.jquery && !ct.isPlainObject(e)) ct.each(e, function() {
                r(this.name, this.value)
            });
            else
                for (i in e) N(i, e[i], n, r);
            return a.join("&").replace(Pn, "+")
        }, ct.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            ct.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), ct.fn.hover = function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        };
        var Mn, zn, Ln = ct.now(),
            Bn = /\?/,
            Rn = /#.*$/,
            qn = /([?&])_=[^&]*/,
            On = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            jn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Dn = /^(?:GET|HEAD)$/,
            Fn = /^\/\//,
            Gn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            Xn = ct.fn.load,
            Hn = {},
            Vn = {},
            Un = "*/".concat("*");
        try {
            zn = Q.href
        } catch (Yn) {
            zn = $.createElement("a"), zn.href = "", zn = zn.href
        }
        Mn = Gn.exec(zn.toLowerCase()) || [], ct.fn.load = function(e, n, i) {
            if ("string" != typeof e && Xn) return Xn.apply(this, arguments);
            var a, r, s, o = this,
                l = e.indexOf(" ");
            return l >= 0 && (a = e.slice(l, e.length), e = e.slice(0, l)), ct.isFunction(n) ? (i = n, n = t) : n && "object" == typeof n && (s = "POST"), o.length > 0 && ct.ajax({
                url: e,
                type: s,
                dataType: "html",
                data: n
            }).done(function(e) {
                r = arguments, o.html(a ? ct("<div>").append(ct.parseHTML(e)).find(a) : e)
            }).complete(i && function(e, t) {
                o.each(i, r || [e.responseText, t, e])
            }), this
        }, ct.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            ct.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), ct.each(["get", "post"], function(e, n) {
            ct[n] = function(e, i, a, r) {
                return ct.isFunction(i) && (r = r || a, a = i, i = t), ct.ajax({
                    url: e,
                    type: n,
                    dataType: r,
                    data: i,
                    success: a
                })
            }
        }), ct.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: zn,
                type: "GET",
                isLocal: jn.test(Mn[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Un,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": e.String,
                    "text html": !0,
                    "text json": ct.parseJSON,
                    "text xml": ct.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? z(z(e, ct.ajaxSettings), t) : z(ct.ajaxSettings, e)
            },
            ajaxPrefilter: I(Hn),
            ajaxTransport: I(Vn),
            ajax: function(e, n) {
                function i(e, n, i, a) {
                    var r, d, v, b, x, T = n;
                    2 !== _ && (_ = 2, l && clearTimeout(l), u = t, o = a || "", w.readyState = e > 0 ? 4 : 0, i && (b = L(p, w, i)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (ct.lastModified[s] = x), x = w.getResponseHeader("etag"), x && (ct.etag[s] = x)), 204 === e ? (r = !0, T = "nocontent") : 304 === e ? (r = !0, T = "notmodified") : (r = B(p, b), T = r.state, d = r.data, v = r.error, r = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (n || T) + "", r ? f.resolveWith(m, [d, T, w]) : f.rejectWith(m, [w, T, v]), w.statusCode(y), y = t, c && h.trigger(r ? "ajaxSuccess" : "ajaxError", [w, p, r ? d : v]), g.fireWith(m, [w, T]), c && (h.trigger("ajaxComplete", [w, p]), --ct.active || ct.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (n = e, e = t), n = n || {};
                var a, r, s, o, l, c, u, d, p = ct.ajaxSetup({}, n),
                    m = p.context || p,
                    h = p.context && (m.nodeType || m.jquery) ? ct(m) : ct.event,
                    f = ct.Deferred(),
                    g = ct.Callbacks("once memory"),
                    y = p.statusCode || {},
                    v = {},
                    b = {},
                    _ = 0,
                    x = "canceled",
                    w = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === _) {
                                if (!d)
                                    for (d = {}; t = On.exec(o);) d[t[1].toLowerCase()] = t[2];
                                t = d[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === _ ? o : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return _ || (e = b[n] = b[n] || e, v[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return _ || (p.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (2 > _)
                                    for (t in e) y[t] = [y[t], e[t]];
                                else w.always(e[w.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || x;
                            return u && u.abort(t), i(0, t), this
                        }
                    };
                if (f.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, p.url = ((e || p.url || zn) + "").replace(Rn, "").replace(Fn, Mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ct.trim(p.dataType || "*").toLowerCase().match(dt) || [""], null == p.crossDomain && (a = Gn.exec(p.url.toLowerCase()), p.crossDomain = !(!a || a[1] === Mn[1] && a[2] === Mn[2] && (a[3] || ("http:" === a[1] ? 80 : 443)) == (Mn[3] || ("http:" === Mn[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = ct.param(p.data, p.traditional)), M(Hn, p, n, w), 2 === _) return w;
                c = p.global, c && 0 === ct.active++ && ct.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Dn.test(p.type), s = p.url, p.hasContent || (p.data && (s = p.url += (Bn.test(s) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = qn.test(s) ? s.replace(qn, "$1_=" + Ln++) : s + (Bn.test(s) ? "&" : "?") + "_=" + Ln++)), p.ifModified && (ct.lastModified[s] && w.setRequestHeader("If-Modified-Since", ct.lastModified[s]), ct.etag[s] && w.setRequestHeader("If-None-Match", ct.etag[s])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && w.setRequestHeader("Content-Type", p.contentType), w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Un + "; q=0.01" : "") : p.accepts["*"]);
                for (r in p.headers) w.setRequestHeader(r, p.headers[r]);
                if (p.beforeSend && (p.beforeSend.call(m, w, p) === !1 || 2 === _)) return w.abort();
                x = "abort";
                for (r in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) w[r](p[r]);
                if (u = M(Vn, p, n, w)) {
                    w.readyState = 1, c && h.trigger("ajaxSend", [w, p]), p.async && p.timeout > 0 && (l = setTimeout(function() {
                        w.abort("timeout")
                    }, p.timeout));
                    try {
                        _ = 1, u.send(v, i)
                    } catch (T) {
                        if (!(2 > _)) throw T;
                        i(-1, T)
                    }
                } else i(-1, "No Transport");
                return w
            },
            getScript: function(e, n) {
                return ct.get(e, t, n, "script")
            },
            getJSON: function(e, t, n) {
                return ct.get(e, t, n, "json")
            }
        }), ct.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    return ct.globalEval(e), e
                }
            }
        }), ct.ajaxPrefilter("script", function(e) {
            e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), ct.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var n, i = $.head || ct("head")[0] || $.documentElement;
                return {
                    send: function(t, a) {
                        n = $.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
                            (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || a(200, "success"))
                        }, i.insertBefore(n, i.firstChild)
                    },
                    abort: function() {
                        n && n.onload(t, !0)
                    }
                }
            }
        });
        var Wn = [],
            $n = /(=)\?(?=&|$)|\?\?/;
        ct.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Wn.pop() || ct.expando + "_" + Ln++;
                return this[e] = !0, e
            }
        }), ct.ajaxPrefilter("json jsonp", function(n, i, a) {
            var r, s, o, l = n.jsonp !== !1 && ($n.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && $n.test(n.data) && "data");
            return l || "jsonp" === n.dataTypes[0] ? (r = n.jsonpCallback = ct.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace($n, "$1" + r) : n.jsonp !== !1 && (n.url += (Bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + r), n.converters["script json"] = function() {
                return o || ct.error(r + " was not called"), o[0]
            }, n.dataTypes[0] = "json", s = e[r], e[r] = function() {
                o = arguments
            }, a.always(function() {
                e[r] = s, n[r] && (n.jsonpCallback = i.jsonpCallback, Wn.push(r)), o && ct.isFunction(s) && s(o[0]), o = s = t
            }), "script") : void 0
        });
        var Qn, Jn, Kn = 0,
            Zn = e.ActiveXObject && function() {
                var e;
                for (e in Qn) Qn[e](t, !0)
            };
        ct.ajaxSettings.xhr = e.ActiveXObject ? function() {
            return !this.isLocal && R() || q()
        } : R, Jn = ct.ajaxSettings.xhr(), ct.support.cors = !!Jn && "withCredentials" in Jn, Jn = ct.support.ajax = !!Jn, Jn && ct.ajaxTransport(function(n) {
            if (!n.crossDomain || ct.support.cors) {
                var i;
                return {
                    send: function(a, r) {
                        var s, o, l = n.xhr();
                        if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
                            for (o in n.xhrFields) l[o] = n.xhrFields[o];
                        n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || a["X-Requested-With"] || (a["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (o in a) l.setRequestHeader(o, a[o])
                        } catch (c) {}
                        l.send(n.hasContent && n.data || null), i = function(e, a) {
                            var o, c, u, d;
                            try {
                                if (i && (a || 4 === l.readyState))
                                    if (i = t, s && (l.onreadystatechange = ct.noop, Zn && delete Qn[s]), a) 4 !== l.readyState && l.abort();
                                    else {
                                        d = {}, o = l.status, c = l.getAllResponseHeaders(), "string" == typeof l.responseText && (d.text = l.responseText);
                                        try {
                                            u = l.statusText
                                        } catch (p) {
                                            u = ""
                                        }
                                        o || !n.isLocal || n.crossDomain ? 1223 === o && (o = 204) : o = d.text ? 200 : 404
                                    }
                            } catch (m) {
                                a || r(-1, m)
                            }
                            d && r(o, u, d, c)
                        }, n.async ? 4 === l.readyState ? setTimeout(i) : (s = ++Kn, Zn && (Qn || (Qn = {}, ct(e).unload(Zn)), Qn[s] = i), l.onreadystatechange = i) : i()
                    },
                    abort: function() {
                        i && i(t, !0)
                    }
                }
            }
        });
        var ei, ti, ni = /^(?:toggle|show|hide)$/,
            ii = new RegExp("^(?:([+-])=|)(" + ut + ")([a-z%]*)$", "i"),
            ai = /queueHooks$/,
            ri = [G],
            si = {
                "*": [function(e, t) {
                    var n, i, a = this.createTween(e, t),
                        r = ii.exec(t),
                        s = a.cur(),
                        o = +s || 0,
                        l = 1,
                        c = 20;
                    if (r) {
                        if (n = +r[2], i = r[3] || (ct.cssNumber[e] ? "" : "px"), "px" !== i && o) {
                            o = ct.css(a.elem, e, !0) || n || 1;
                            do l = l || ".5", o /= l, ct.style(a.elem, e, o + i); while (l !== (l = a.cur() / s) && 1 !== l && --c)
                        }
                        a.unit = i, a.start = o, a.end = r[1] ? o + (r[1] + 1) * n : n
                    }
                    return a
                }]
            };
        ct.Animation = ct.extend(D, {
            tweener: function(e, t) {
                ct.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var n, i = 0, a = e.length; a > i; i++) n = e[i], si[n] = si[n] || [], si[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? ri.unshift(e) : ri.push(e)
            }
        }), ct.Tween = X, X.prototype = {
            constructor: X,
            init: function(e, t, n, i, a, r) {
                this.elem = e, this.prop = n, this.easing = a || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (ct.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = X.propHooks[this.prop];
                return e && e.get ? e.get(this) : X.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = X.propHooks[this.prop];
                return this.pos = t = this.options.duration ? ct.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : X.propHooks._default.set(this), this
            }
        }, X.prototype.init.prototype = X.prototype, X.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ct.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function(e) {
                    ct.fx.step[e.prop] ? ct.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ct.cssProps[e.prop]] || ct.cssHooks[e.prop]) ? ct.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, X.propHooks.scrollTop = X.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, ct.each(["toggle", "show", "hide"], function(e, t) {
            var n = ct.fn[t];
            ct.fn[t] = function(e, i, a) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(H(t, !0), e, i, a)
            }
        }), ct.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(T).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var a = ct.isEmptyObject(e),
                    r = ct.speed(t, n, i),
                    s = function() {
                        var t = D(this, ct.extend({}, e), r);
                        s.finish = function() {
                            t.stop(!0)
                        }, (a || ct._data(this, "finish")) && t.stop(!0)
                    };
                return s.finish = s, a || r.queue === !1 ? this.each(s) : this.queue(r.queue, s)
            },
            stop: function(e, n, i) {
                var a = function(e) {
                    var t = e.stop;
                    delete e.stop, t(i)
                };
                return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        n = null != e && e + "queueHooks",
                        r = ct.timers,
                        s = ct._data(this);
                    if (n) s[n] && s[n].stop && a(s[n]);
                    else
                        for (n in s) s[n] && s[n].stop && ai.test(n) && a(s[n]);
                    for (n = r.length; n--;) r[n].elem !== this || null != e && r[n].queue !== e || (r[n].anim.stop(i), t = !1, r.splice(n, 1));
                    (t || !i) && ct.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = ct._data(this),
                        i = n[e + "queue"],
                        a = n[e + "queueHooks"],
                        r = ct.timers,
                        s = i ? i.length : 0;
                    for (n.finish = !0, ct.queue(this, e, []), a && a.cur && a.cur.finish && a.cur.finish.call(this), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                    for (t = 0; s > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), ct.each({
            slideDown: H("show"),
            slideUp: H("hide"),
            slideToggle: H("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            ct.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), ct.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? ct.extend({}, e) : {
                complete: n || !n && t || ct.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !ct.isFunction(t) && t
            };
            return i.duration = ct.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ct.fx.speeds ? ct.fx.speeds[i.duration] : ct.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                ct.isFunction(i.old) && i.old.call(this), i.queue && ct.dequeue(this, i.queue)
            }, i
        }, ct.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, ct.timers = [], ct.fx = X.prototype.init, ct.fx.tick = function() {
            var e, n = ct.timers,
                i = 0;
            for (ei = ct.now(); i < n.length; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
            n.length || ct.fx.stop(), ei = t
        }, ct.fx.timer = function(e) {
            e() && ct.timers.push(e) && ct.fx.start()
        }, ct.fx.interval = 13, ct.fx.start = function() {
            ti || (ti = setInterval(ct.fx.tick, ct.fx.interval))
        }, ct.fx.stop = function() {
            clearInterval(ti), ti = null
        }, ct.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ct.fx.step = {}, ct.expr && ct.expr.filters && (ct.expr.filters.animated = function(e) {
            return ct.grep(ct.timers, function(t) {
                return e === t.elem
            }).length
        }), ct.fn.offset = function(e) {
            if (arguments.length) return e === t ? this : this.each(function(t) {
                ct.offset.setOffset(this, e, t)
            });
            var n, i, a = {
                    top: 0,
                    left: 0
                },
                r = this[0],
                s = r && r.ownerDocument;
            if (s) return n = s.documentElement, ct.contains(n, r) ? (typeof r.getBoundingClientRect !== W && (a = r.getBoundingClientRect()), i = V(s), {
                top: a.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                left: a.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
            }) : a
        }, ct.offset = {
            setOffset: function(e, t, n) {
                var i = ct.css(e, "position");
                "static" === i && (e.style.position = "relative");
                var a, r, s = ct(e),
                    o = s.offset(),
                    l = ct.css(e, "top"),
                    c = ct.css(e, "left"),
                    u = ("absolute" === i || "fixed" === i) && ct.inArray("auto", [l, c]) > -1,
                    d = {},
                    p = {};
                u ? (p = s.position(), a = p.top, r = p.left) : (a = parseFloat(l) || 0, r = parseFloat(c) || 0), ct.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (d.top = t.top - o.top + a), null != t.left && (d.left = t.left - o.left + r), "using" in t ? t.using.call(e, d) : s.css(d)
            }
        }, ct.fn.extend({
            position: function() {
                if (this[0]) {
                    var e, t, n = {
                            top: 0,
                            left: 0
                        },
                        i = this[0];
                    return "fixed" === ct.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ct.nodeName(e[0], "html") || (n = e.offset()), n.top += ct.css(e[0], "borderTopWidth", !0), n.left += ct.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - n.top - ct.css(i, "marginTop", !0),
                        left: t.left - n.left - ct.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || $.documentElement; e && !ct.nodeName(e, "html") && "static" === ct.css(e, "position");) e = e.offsetParent;
                    return e || $.documentElement
                })
            }
        }), ct.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, n) {
            var i = /Y/.test(n);
            ct.fn[e] = function(a) {
                return ct.access(this, function(e, a, r) {
                    var s = V(e);
                    return r === t ? s ? n in s ? s[n] : s.document.documentElement[a] : e[a] : (s ? s.scrollTo(i ? ct(s).scrollLeft() : r, i ? r : ct(s).scrollTop()) : e[a] = r, void 0)
                }, e, a, arguments.length, null)
            }
        }), ct.each({
            Height: "height",
            Width: "width"
        }, function(e, n) {
            ct.each({
                padding: "inner" + e,
                content: n,
                "": "outer" + e
            }, function(i, a) {
                ct.fn[a] = function(a, r) {
                    var s = arguments.length && (i || "boolean" != typeof a),
                        o = i || (a === !0 || r === !0 ? "margin" : "border");
                    return ct.access(this, function(n, i, a) {
                        var r;
                        return ct.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (r = n.documentElement, Math.max(n.body["scroll" + e], r["scroll" + e], n.body["offset" + e], r["offset" + e], r["client" + e])) : a === t ? ct.css(n, i, o) : ct.style(n, i, a, o)
                    }, n, s ? a : t, s, null)
                }
            })
        }), n.exports = ct, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
            return ct
        })
    }(window)
});