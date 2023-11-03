!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e()
}(this, (function() {
    "use strict";
    var t = 6e4
      , e = 36e5
      , n = "millisecond"
      , r = "second"
      , i = "minute"
      , s = "hour"
      , u = "day"
      , a = "week"
      , o = "month"
      , c = "quarter"
      , f = "year"
      , h = "date"
      , d = "Invalid Date"
      , l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
      , $ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
      , y = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        ordinal: function(t) {
            var e = ["th", "st", "nd", "rd"]
              , n = t % 100;
            return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]"
        }
    }
      , M = function(t, e, n) {
        var r = String(t);
        return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t
    }
      , m = {
        s: M,
        z: function(t) {
            var e = -t.utcOffset()
              , n = Math.abs(e)
              , r = Math.floor(n / 60)
              , i = n % 60;
            return (e <= 0 ? "+" : "-") + M(r, 2, "0") + ":" + M(i, 2, "0")
        },
        m: function t(e, n) {
            if (e.date() < n.date())
                return -t(n, e);
            var r = 12 * (n.year() - e.year()) + (n.month() - e.month())
              , i = e.clone().add(r, o)
              , s = n - i < 0
              , u = e.clone().add(r + (s ? -1 : 1), o);
            return +(-(r + (n - i) / (s ? i - u : u - i)) || 0)
        },
        a: function(t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
        },
        p: function(t) {
            return {
                M: o,
                y: f,
                w: a,
                d: u,
                D: h,
                h: s,
                m: i,
                s: r,
                ms: n,
                Q: c
            }[t] || String(t || "").toLowerCase().replace(/s$/, "")
        },
        u: function(t) {
            return void 0 === t
        }
    }
      , v = "en"
      , g = {};
    g[v] = y;
    var D = function(t) {
        return t instanceof O
    }
      , p = function t(e, n, r) {
        var i;
        if (!e)
            return v;
        if ("string" == typeof e) {
            var s = e.toLowerCase();
            g[s] && (i = s),
            n && (g[s] = n,
            i = s);
            var u = e.split("-");
            if (!i && u.length > 1)
                return t(u[0])
        } else {
            var a = e.name;
            g[a] = e,
            i = a
        }
        return !r && i && (v = i),
        i || !r && v
    }
      , S = function(t, e) {
        if (D(t))
            return t.clone();
        var n = "object" == typeof e ? e : {};
        return n.date = t,
        n.args = arguments,
        new O(n)
    }
      , w = m;
    w.l = p,
    w.i = D,
    w.w = function(t, e) {
        return S(t, {
            locale: e.$L,
            utc: e.$u,
            x: e.$x,
            $offset: e.$offset
        })
    }
    ;
    var O = function() {
        function y(t) {
            this.$L = p(t.locale, null, !0),
            this.parse(t)
        }
        var M = y.prototype;
        return M.parse = function(t) {
            this.$d = function(t) {
                var e = t.date
                  , n = t.utc;
                if (null === e)
                    return new Date(NaN);
                if (w.u(e))
                    return new Date;
                if (e instanceof Date)
                    return new Date(e);
                if ("string" == typeof e && !/Z$/i.test(e)) {
                    var r = e.match(l);
                    if (r) {
                        var i = r[2] - 1 || 0
                          , s = (r[7] || "0").substring(0, 3);
                        return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1],i,r[3] || 1,r[4] || 0,r[5] || 0,r[6] || 0,s)
                    }
                }
                return new Date(e)
            }(t),
            this.$x = t.x || {},
            this.init()
        }
        ,
        M.init = function() {
            var t = this.$d;
            this.$y = t.getFullYear(),
            this.$M = t.getMonth(),
            this.$D = t.getDate(),
            this.$W = t.getDay(),
            this.$H = t.getHours(),
            this.$m = t.getMinutes(),
            this.$s = t.getSeconds(),
            this.$ms = t.getMilliseconds()
        }
        ,
        M.$utils = function() {
            return w
        }
        ,
        M.isValid = function() {
            return !(this.$d.toString() === d)
        }
        ,
        M.isSame = function(t, e) {
            var n = S(t);
            return this.startOf(e) <= n && n <= this.endOf(e)
        }
        ,
        M.isAfter = function(t, e) {
            return S(t) < this.startOf(e)
        }
        ,
        M.isBefore = function(t, e) {
            return this.endOf(e) < S(t)
        }
        ,
        M.$g = function(t, e, n) {
            return w.u(t) ? this[e] : this.set(n, t)
        }
        ,
        M.unix = function() {
            return Math.floor(this.valueOf() / 1e3)
        }
        ,
        M.valueOf = function() {
            return this.$d.getTime()
        }
        ,
        M.startOf = function(t, e) {
            var n = this
              , c = !!w.u(e) || e
              , d = w.p(t)
              , l = function(t, e) {
                var r = w.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y,e,t), n);
                return c ? r : r.endOf(u)
            }
              , $ = function(t, e) {
                return w.w(n.toDate()[t].apply(n.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n)
            }
              , y = this.$W
              , M = this.$M
              , m = this.$D
              , v = "set" + (this.$u ? "UTC" : "");
            switch (d) {
            case f:
                return c ? l(1, 0) : l(31, 11);
            case o:
                return c ? l(1, M) : l(0, M + 1);
            case a:
                var g = this.$locale().weekStart || 0
                  , D = (y < g ? y + 7 : y) - g;
                return l(c ? m - D : m + (6 - D), M);
            case u:
            case h:
                return $(v + "Hours", 0);
            case s:
                return $(v + "Minutes", 1);
            case i:
                return $(v + "Seconds", 2);
            case r:
                return $(v + "Milliseconds", 3);
            default:
                return this.clone()
            }
        }
        ,
        M.endOf = function(t) {
            return this.startOf(t, !1)
        }
        ,
        M.$set = function(t, e) {
            var a, c = w.p(t), d = "set" + (this.$u ? "UTC" : ""), l = (a = {},
            a[u] = d + "Date",
            a[h] = d + "Date",
            a[o] = d + "Month",
            a[f] = d + "FullYear",
            a[s] = d + "Hours",
            a[i] = d + "Minutes",
            a[r] = d + "Seconds",
            a[n] = d + "Milliseconds",
            a)[c], $ = c === u ? this.$D + (e - this.$W) : e;
            if (c === o || c === f) {
                var y = this.clone().set(h, 1);
                y.$d[l]($),
                y.init(),
                this.$d = y.set(h, Math.min(this.$D, y.daysInMonth())).$d
            } else
                l && this.$d[l]($);
            return this.init(),
            this
        }
        ,
        M.set = function(t, e) {
            return this.clone().$set(t, e)
        }
        ,
        M.get = function(t) {
            return this[w.p(t)]()
        }
        ,
        M.add = function(n, c) {
            var h, d = this;
            n = Number(n);
            var l = w.p(c)
              , $ = function(t) {
                var e = S(d);
                return w.w(e.date(e.date() + Math.round(t * n)), d)
            };
            if (l === o)
                return this.set(o, this.$M + n);
            if (l === f)
                return this.set(f, this.$y + n);
            if (l === u)
                return $(1);
            if (l === a)
                return $(7);
            var y = (h = {},
            h[i] = t,
            h[s] = e,
            h[r] = 1e3,
            h)[l] || 1
              , M = this.$d.getTime() + n * y;
            return w.w(M, this)
        }
        ,
        M.subtract = function(t, e) {
            return this.add(-1 * t, e)
        }
        ,
        M.format = function(t) {
            var e = this
              , n = this.$locale();
            if (!this.isValid())
                return n.invalidDate || d;
            var r = t || "YYYY-MM-DDTHH:mm:ssZ"
              , i = w.z(this)
              , s = this.$H
              , u = this.$m
              , a = this.$M
              , o = n.weekdays
              , c = n.months
              , f = n.meridiem
              , h = function(t, n, i, s) {
                return t && (t[n] || t(e, r)) || i[n].slice(0, s)
            }
              , l = function(t) {
                return w.s(s % 12 || 12, t, "0")
            }
              , y = f || function(t, e, n) {
                var r = t < 12 ? "AM" : "PM";
                return n ? r.toLowerCase() : r
            }
            ;
            return r.replace($, (function(t, r) {
                return r || function(t) {
                    switch (t) {
                    case "YY":
                        return String(e.$y).slice(-2);
                    case "YYYY":
                        return w.s(e.$y, 4, "0");
                    case "M":
                        return a + 1;
                    case "MM":
                        return w.s(a + 1, 2, "0");
                    case "MMM":
                        return h(n.monthsShort, a, c, 3);
                    case "MMMM":
                        return h(c, a);
                    case "D":
                        return e.$D;
                    case "DD":
                        return w.s(e.$D, 2, "0");
                    case "d":
                        return String(e.$W);
                    case "dd":
                        return h(n.weekdaysMin, e.$W, o, 2);
                    case "ddd":
                        return h(n.weekdaysShort, e.$W, o, 3);
                    case "dddd":
                        return o[e.$W];
                    case "H":
                        return String(s);
                    case "HH":
                        return w.s(s, 2, "0");
                    case "h":
                        return l(1);
                    case "hh":
                        return l(2);
                    case "a":
                        return y(s, u, !0);
                    case "A":
                        return y(s, u, !1);
                    case "m":
                        return String(u);
                    case "mm":
                        return w.s(u, 2, "0");
                    case "s":
                        return String(e.$s);
                    case "ss":
                        return w.s(e.$s, 2, "0");
                    case "SSS":
                        return w.s(e.$ms, 3, "0");
                    case "Z":
                        return i
                    }
                    return null
                }(t) || i.replace(":", "")
            }
            ))
        }
        ,
        M.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
        }
        ,
        M.diff = function(n, h, d) {
            var l, $ = this, y = w.p(h), M = S(n), m = (M.utcOffset() - this.utcOffset()) * t, v = this - M, g = function() {
                return w.m($, M)
            };
            switch (y) {
            case f:
                l = g() / 12;
                break;
            case o:
                l = g();
                break;
            case c:
                l = g() / 3;
                break;
            case a:
                l = (v - m) / 6048e5;
                break;
            case u:
                l = (v - m) / 864e5;
                break;
            case s:
                l = v / e;
                break;
            case i:
                l = v / t;
                break;
            case r:
                l = v / 1e3;
                break;
            default:
                l = v
            }
            return d ? l : w.a(l)
        }
        ,
        M.daysInMonth = function() {
            return this.endOf(o).$D
        }
        ,
        M.$locale = function() {
            return g[this.$L]
        }
        ,
        M.locale = function(t, e) {
            if (!t)
                return this.$L;
            var n = this.clone()
              , r = p(t, e, !0);
            return r && (n.$L = r),
            n
        }
        ,
        M.clone = function() {
            return w.w(this.$d, this)
        }
        ,
        M.toDate = function() {
            return new Date(this.valueOf())
        }
        ,
        M.toJSON = function() {
            return this.isValid() ? this.toISOString() : null
        }
        ,
        M.toISOString = function() {
            return this.$d.toISOString()
        }
        ,
        M.toString = function() {
            return this.$d.toUTCString()
        }
        ,
        y
    }()
      , b = O.prototype;
    return S.prototype = b,
    [["$ms", n], ["$s", r], ["$m", i], ["$H", s], ["$W", u], ["$M", o], ["$y", f], ["$D", h]].forEach((function(t) {
        b[t[1]] = function(e) {
            return this.$g(e, t[0], t[1])
        }
    }
    )),
    S.extend = function(t, e) {
        return t.$i || (t(e, O, S),
        t.$i = !0),
        S
    }
    ,
    S.locale = p,
    S.isDayjs = D,
    S.unix = function(t) {
        return S(1e3 * t)
    }
    ,
    S.en = g[v],
    S.Ls = g,
    S.p = {},
    S
}
));
