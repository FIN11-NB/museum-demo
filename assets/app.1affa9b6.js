(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const l of s)
      if (l.type === "childList")
        for (const o of l.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const l = {};
    return (
      s.integrity && (l.integrity = s.integrity),
      s.referrerpolicy && (l.referrerPolicy = s.referrerpolicy),
      s.crossorigin === "use-credentials"
        ? (l.credentials = "include")
        : s.crossorigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const l = n(s);
    fetch(s.href, l);
  }
})();
function ds(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function hs(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = Ie(r) ? ma(r) : hs(r);
      if (s) for (const l in s) t[l] = s[l];
    }
    return t;
  } else {
    if (Ie(e)) return e;
    if (_e(e)) return e;
  }
}
const fa = /;(?![^(]*\))/g,
  da = /:([^]+)/,
  ha = /\/\*.*?\*\//gs;
function ma(e) {
  const t = {};
  return (
    e
      .replace(ha, "")
      .split(fa)
      .forEach((n) => {
        if (n) {
          const r = n.split(da);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function ir(e) {
  let t = "";
  if (Ie(e)) t = e;
  else if (J(e))
    for (let n = 0; n < e.length; n++) {
      const r = ir(e[n]);
      r && (t += r + " ");
    }
  else if (_e(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const pa =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  ga = ds(pa);
function bo(e) {
  return !!e || e === "";
}
const Yn = (e) =>
    Ie(e)
      ? e
      : e == null
      ? ""
      : J(e) || (_e(e) && (e.toString === To || !ee(e.toString)))
      ? JSON.stringify(e, yo, 2)
      : String(e),
  yo = (e, t) =>
    t && t.__v_isRef
      ? yo(e, t.value)
      : Jt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : Eo(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : _e(t) && !J(t) && !Co(t)
      ? String(t)
      : t,
  ge = {},
  qt = [],
  tt = () => {},
  _a = () => !1,
  ba = /^on[^a-z]/,
  Sn = (e) => ba.test(e),
  ms = (e) => e.startsWith("onUpdate:"),
  He = Object.assign,
  ps = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  ya = Object.prototype.hasOwnProperty,
  oe = (e, t) => ya.call(e, t),
  J = Array.isArray,
  Jt = (e) => ar(e) === "[object Map]",
  Eo = (e) => ar(e) === "[object Set]",
  ee = (e) => typeof e == "function",
  Ie = (e) => typeof e == "string",
  gs = (e) => typeof e == "symbol",
  _e = (e) => e !== null && typeof e == "object",
  vo = (e) => _e(e) && ee(e.then) && ee(e.catch),
  To = Object.prototype.toString,
  ar = (e) => To.call(e),
  Ea = (e) => ar(e).slice(8, -1),
  Co = (e) => ar(e) === "[object Object]",
  _s = (e) =>
    Ie(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  bn = ds(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  cr = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  va = /-(\w)/g,
  ut = cr((e) => e.replace(va, (t, n) => (n ? n.toUpperCase() : ""))),
  Ta = /\B([A-Z])/g,
  cn = cr((e) => e.replace(Ta, "-$1").toLowerCase()),
  ur = cr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  kr = cr((e) => (e ? `on${ur(e)}` : "")),
  kn = (e, t) => !Object.is(e, t),
  Or = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Zn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Lo = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Js;
const Ca = () =>
  Js ||
  (Js =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let Ve;
class Io {
  constructor(t = !1) {
    (this.detached = t),
      (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ve),
      !t && Ve && (this.index = (Ve.scopes || (Ve.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Ve;
      try {
        return (Ve = this), t();
      } finally {
        Ve = n;
      }
    }
  }
  on() {
    Ve = this;
  }
  off() {
    Ve = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this.active = !1);
    }
  }
}
function bs(e) {
  return new Io(e);
}
function La(e, t = Ve) {
  t && t.active && t.effects.push(e);
}
function Ia() {
  return Ve;
}
function ka(e) {
  Ve && Ve.cleanups.push(e);
}
const ys = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  ko = (e) => (e.w & Ot) > 0,
  Oo = (e) => (e.n & Ot) > 0,
  Oa = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ot;
  },
  Pa = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        ko(s) && !Oo(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Ot),
          (s.n &= ~Ot);
      }
      t.length = n;
    }
  },
  Ur = new WeakMap();
let _n = 0,
  Ot = 1;
const Wr = 30;
let ze;
const xt = Symbol(""),
  jr = Symbol("");
class Es {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      La(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ze,
      n = Lt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ze),
        (ze = this),
        (Lt = !0),
        (Ot = 1 << ++_n),
        _n <= Wr ? Oa(this) : Qs(this),
        this.fn()
      );
    } finally {
      _n <= Wr && Pa(this),
        (Ot = 1 << --_n),
        (ze = this.parent),
        (Lt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ze === this
      ? (this.deferStop = !0)
      : this.active &&
        (Qs(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Qs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Lt = !0;
const Po = [];
function un() {
  Po.push(Lt), (Lt = !1);
}
function fn() {
  const e = Po.pop();
  Lt = e === void 0 ? !0 : e;
}
function Ye(e, t, n) {
  if (Lt && ze) {
    let r = Ur.get(e);
    r || Ur.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = ys())), wo(s);
  }
}
function wo(e, t) {
  let n = !1;
  _n <= Wr ? Oo(e) || ((e.n |= Ot), (n = !ko(e))) : (n = !e.has(ze)),
    n && (e.add(ze), ze.deps.push(e));
}
function pt(e, t, n, r, s, l) {
  const o = Ur.get(e);
  if (!o) return;
  let i = [];
  if (t === "clear") i = [...o.values()];
  else if (n === "length" && J(e)) {
    const a = Lo(r);
    o.forEach((f, d) => {
      (d === "length" || d >= a) && i.push(f);
    });
  } else
    switch ((n !== void 0 && i.push(o.get(n)), t)) {
      case "add":
        J(e)
          ? _s(n) && i.push(o.get("length"))
          : (i.push(o.get(xt)), Jt(e) && i.push(o.get(jr)));
        break;
      case "delete":
        J(e) || (i.push(o.get(xt)), Jt(e) && i.push(o.get(jr)));
        break;
      case "set":
        Jt(e) && i.push(o.get(xt));
        break;
    }
  if (i.length === 1) i[0] && Br(i[0]);
  else {
    const a = [];
    for (const f of i) f && a.push(...f);
    Br(ys(a));
  }
}
function Br(e, t) {
  const n = J(e) ? e : [...e];
  for (const r of n) r.computed && Zs(r);
  for (const r of n) r.computed || Zs(r);
}
function Zs(e, t) {
  (e !== ze || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const wa = ds("__proto__,__v_isRef,__isVue"),
  Ao = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(gs)
  ),
  Aa = vs(),
  Na = vs(!1, !0),
  Ra = vs(!0),
  zs = Sa();
function Sa() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = fe(this);
        for (let l = 0, o = this.length; l < o; l++) Ye(r, "get", l + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(fe)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        un();
        const r = fe(this)[t].apply(this, n);
        return fn(), r;
      };
    }),
    e
  );
}
function vs(e = !1, t = !1) {
  return function (r, s, l) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && l === (e ? (t ? qa : Fo) : t ? Mo : So).get(r))
      return r;
    const o = J(r);
    if (!e && o && oe(zs, s)) return Reflect.get(zs, s, l);
    const i = Reflect.get(r, s, l);
    return (gs(s) ? Ao.has(s) : wa(s)) || (e || Ye(r, "get", s), t)
      ? i
      : ye(i)
      ? o && _s(s)
        ? i
        : i.value
      : _e(i)
      ? e
        ? xo(i)
        : dn(i)
      : i;
  };
}
const Ma = No(),
  Fa = No(!0);
function No(e = !1) {
  return function (n, r, s, l) {
    let o = n[r];
    if (en(o) && ye(o) && !ye(s)) return !1;
    if (
      !e &&
      (!zn(s) && !en(s) && ((o = fe(o)), (s = fe(s))), !J(n) && ye(o) && !ye(s))
    )
      return (o.value = s), !0;
    const i = J(n) && _s(r) ? Number(r) < n.length : oe(n, r),
      a = Reflect.set(n, r, s, l);
    return (
      n === fe(l) && (i ? kn(s, o) && pt(n, "set", r, s) : pt(n, "add", r, s)),
      a
    );
  };
}
function xa(e, t) {
  const n = oe(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && pt(e, "delete", t, void 0), r;
}
function Da(e, t) {
  const n = Reflect.has(e, t);
  return (!gs(t) || !Ao.has(t)) && Ye(e, "has", t), n;
}
function $a(e) {
  return Ye(e, "iterate", J(e) ? "length" : xt), Reflect.ownKeys(e);
}
const Ro = { get: Aa, set: Ma, deleteProperty: xa, has: Da, ownKeys: $a },
  Ha = {
    get: Ra,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Ua = He({}, Ro, { get: Na, set: Fa }),
  Ts = (e) => e,
  fr = (e) => Reflect.getPrototypeOf(e);
function Fn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = fe(e),
    l = fe(t);
  n || (t !== l && Ye(s, "get", t), Ye(s, "get", l));
  const { has: o } = fr(s),
    i = r ? Ts : n ? Is : On;
  if (o.call(s, t)) return i(e.get(t));
  if (o.call(s, l)) return i(e.get(l));
  e !== s && e.get(t);
}
function xn(e, t = !1) {
  const n = this.__v_raw,
    r = fe(n),
    s = fe(e);
  return (
    t || (e !== s && Ye(r, "has", e), Ye(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Dn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ye(fe(e), "iterate", xt), Reflect.get(e, "size", e)
  );
}
function el(e) {
  e = fe(e);
  const t = fe(this);
  return fr(t).has.call(t, e) || (t.add(e), pt(t, "add", e, e)), this;
}
function tl(e, t) {
  t = fe(t);
  const n = fe(this),
    { has: r, get: s } = fr(n);
  let l = r.call(n, e);
  l || ((e = fe(e)), (l = r.call(n, e)));
  const o = s.call(n, e);
  return (
    n.set(e, t), l ? kn(t, o) && pt(n, "set", e, t) : pt(n, "add", e, t), this
  );
}
function nl(e) {
  const t = fe(this),
    { has: n, get: r } = fr(t);
  let s = n.call(t, e);
  s || ((e = fe(e)), (s = n.call(t, e))), r && r.call(t, e);
  const l = t.delete(e);
  return s && pt(t, "delete", e, void 0), l;
}
function rl() {
  const e = fe(this),
    t = e.size !== 0,
    n = e.clear();
  return t && pt(e, "clear", void 0, void 0), n;
}
function $n(e, t) {
  return function (r, s) {
    const l = this,
      o = l.__v_raw,
      i = fe(o),
      a = t ? Ts : e ? Is : On;
    return (
      !e && Ye(i, "iterate", xt), o.forEach((f, d) => r.call(s, a(f), a(d), l))
    );
  };
}
function Hn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      l = fe(s),
      o = Jt(l),
      i = e === "entries" || (e === Symbol.iterator && o),
      a = e === "keys" && o,
      f = s[e](...r),
      d = n ? Ts : t ? Is : On;
    return (
      !t && Ye(l, "iterate", a ? jr : xt),
      {
        next() {
          const { value: g, done: h } = f.next();
          return h
            ? { value: g, done: h }
            : { value: i ? [d(g[0]), d(g[1])] : d(g), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function _t(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Wa() {
  const e = {
      get(l) {
        return Fn(this, l);
      },
      get size() {
        return Dn(this);
      },
      has: xn,
      add: el,
      set: tl,
      delete: nl,
      clear: rl,
      forEach: $n(!1, !1),
    },
    t = {
      get(l) {
        return Fn(this, l, !1, !0);
      },
      get size() {
        return Dn(this);
      },
      has: xn,
      add: el,
      set: tl,
      delete: nl,
      clear: rl,
      forEach: $n(!1, !0),
    },
    n = {
      get(l) {
        return Fn(this, l, !0);
      },
      get size() {
        return Dn(this, !0);
      },
      has(l) {
        return xn.call(this, l, !0);
      },
      add: _t("add"),
      set: _t("set"),
      delete: _t("delete"),
      clear: _t("clear"),
      forEach: $n(!0, !1),
    },
    r = {
      get(l) {
        return Fn(this, l, !0, !0);
      },
      get size() {
        return Dn(this, !0);
      },
      has(l) {
        return xn.call(this, l, !0);
      },
      add: _t("add"),
      set: _t("set"),
      delete: _t("delete"),
      clear: _t("clear"),
      forEach: $n(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((l) => {
      (e[l] = Hn(l, !1, !1)),
        (n[l] = Hn(l, !0, !1)),
        (t[l] = Hn(l, !1, !0)),
        (r[l] = Hn(l, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [ja, Ba, Va, Ka] = Wa();
function Cs(e, t) {
  const n = t ? (e ? Ka : Va) : e ? Ba : ja;
  return (r, s, l) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(oe(n, s) && s in r ? n : r, s, l);
}
const Ya = { get: Cs(!1, !1) },
  Ga = { get: Cs(!1, !0) },
  Xa = { get: Cs(!0, !1) },
  So = new WeakMap(),
  Mo = new WeakMap(),
  Fo = new WeakMap(),
  qa = new WeakMap();
function Ja(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Qa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ja(Ea(e));
}
function dn(e) {
  return en(e) ? e : Ls(e, !1, Ro, Ya, So);
}
function Za(e) {
  return Ls(e, !1, Ua, Ga, Mo);
}
function xo(e) {
  return Ls(e, !0, Ha, Xa, Fo);
}
function Ls(e, t, n, r, s) {
  if (!_e(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const l = s.get(e);
  if (l) return l;
  const o = Qa(e);
  if (o === 0) return e;
  const i = new Proxy(e, o === 2 ? r : n);
  return s.set(e, i), i;
}
function It(e) {
  return en(e) ? It(e.__v_raw) : !!(e && e.__v_isReactive);
}
function en(e) {
  return !!(e && e.__v_isReadonly);
}
function zn(e) {
  return !!(e && e.__v_isShallow);
}
function Do(e) {
  return It(e) || en(e);
}
function fe(e) {
  const t = e && e.__v_raw;
  return t ? fe(t) : e;
}
function tn(e) {
  return Zn(e, "__v_skip", !0), e;
}
const On = (e) => (_e(e) ? dn(e) : e),
  Is = (e) => (_e(e) ? xo(e) : e);
function $o(e) {
  Lt && ze && ((e = fe(e)), wo(e.dep || (e.dep = ys())));
}
function Ho(e, t) {
  (e = fe(e)), e.dep && Br(e.dep);
}
function ye(e) {
  return !!(e && e.__v_isRef === !0);
}
function ke(e) {
  return Wo(e, !1);
}
function Uo(e) {
  return Wo(e, !0);
}
function Wo(e, t) {
  return ye(e) ? e : new za(e, t);
}
class za {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : fe(t)),
      (this._value = n ? t : On(t));
  }
  get value() {
    return $o(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || zn(t) || en(t);
    (t = n ? t : fe(t)),
      kn(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : On(t)), Ho(this));
  }
}
function Ke(e) {
  return ye(e) ? e.value : e;
}
const ec = {
  get: (e, t, n) => Ke(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return ye(s) && !ye(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function jo(e) {
  return It(e) ? e : new Proxy(e, ec);
}
function tc(e) {
  const t = J(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = rc(e, n);
  return t;
}
class nc {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function rc(e, t, n) {
  const r = e[t];
  return ye(r) ? r : new nc(e, t, n);
}
var Bo;
class sc {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Bo] = !1),
      (this._dirty = !0),
      (this.effect = new Es(t, () => {
        this._dirty || ((this._dirty = !0), Ho(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = fe(this);
    return (
      $o(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
Bo = "__v_isReadonly";
function lc(e, t, n = !1) {
  let r, s;
  const l = ee(e);
  return (
    l ? ((r = e), (s = tt)) : ((r = e.get), (s = e.set)),
    new sc(r, s, l || !s, n)
  );
}
function kt(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (l) {
    dr(l, t, n);
  }
  return s;
}
function nt(e, t, n, r) {
  if (ee(e)) {
    const l = kt(e, t, n, r);
    return (
      l &&
        vo(l) &&
        l.catch((o) => {
          dr(o, t, n);
        }),
      l
    );
  }
  const s = [];
  for (let l = 0; l < e.length; l++) s.push(nt(e[l], t, n, r));
  return s;
}
function dr(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let l = t.parent;
    const o = t.proxy,
      i = n;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let d = 0; d < f.length; d++) if (f[d](e, o, i) === !1) return;
      }
      l = l.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      kt(a, null, 10, [e, o, i]);
      return;
    }
  }
  oc(e, n, s, r);
}
function oc(e, t, n, r = !0) {
  console.error(e);
}
let Pn = !1,
  Vr = !1;
const Fe = [];
let at = 0;
const Qt = [];
let ht = null,
  Mt = 0;
const Vo = Promise.resolve();
let ks = null;
function hr(e) {
  const t = ks || Vo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ic(e) {
  let t = at + 1,
    n = Fe.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    wn(Fe[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Os(e) {
  (!Fe.length || !Fe.includes(e, Pn && e.allowRecurse ? at + 1 : at)) &&
    (e.id == null ? Fe.push(e) : Fe.splice(ic(e.id), 0, e), Ko());
}
function Ko() {
  !Pn && !Vr && ((Vr = !0), (ks = Vo.then(Yo)));
}
function ac(e) {
  const t = Fe.indexOf(e);
  t > at && Fe.splice(t, 1);
}
function cc(e) {
  J(e)
    ? Qt.push(...e)
    : (!ht || !ht.includes(e, e.allowRecurse ? Mt + 1 : Mt)) && Qt.push(e),
    Ko();
}
function sl(e, t = Pn ? at + 1 : 0) {
  for (; t < Fe.length; t++) {
    const n = Fe[t];
    n && n.pre && (Fe.splice(t, 1), t--, n());
  }
}
function er(e) {
  if (Qt.length) {
    const t = [...new Set(Qt)];
    if (((Qt.length = 0), ht)) {
      ht.push(...t);
      return;
    }
    for (ht = t, ht.sort((n, r) => wn(n) - wn(r)), Mt = 0; Mt < ht.length; Mt++)
      ht[Mt]();
    (ht = null), (Mt = 0);
  }
}
const wn = (e) => (e.id == null ? 1 / 0 : e.id),
  uc = (e, t) => {
    const n = wn(e) - wn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Yo(e) {
  (Vr = !1), (Pn = !0), Fe.sort(uc);
  const t = tt;
  try {
    for (at = 0; at < Fe.length; at++) {
      const n = Fe[at];
      n && n.active !== !1 && kt(n, null, 14);
    }
  } finally {
    (at = 0),
      (Fe.length = 0),
      er(),
      (Pn = !1),
      (ks = null),
      (Fe.length || Qt.length) && Yo();
  }
}
function fc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ge;
  let s = n;
  const l = t.startsWith("update:"),
    o = l && t.slice(7);
  if (o && o in r) {
    const d = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: g, trim: h } = r[d] || ge;
    h && (s = n.map((_) => (Ie(_) ? _.trim() : _))), g && (s = n.map(Lo));
  }
  let i,
    a = r[(i = kr(t))] || r[(i = kr(ut(t)))];
  !a && l && (a = r[(i = kr(cn(t)))]), a && nt(a, e, 6, s);
  const f = r[i + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[i]) return;
    (e.emitted[i] = !0), nt(f, e, 6, s);
  }
}
function Go(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const l = e.emits;
  let o = {},
    i = !1;
  if (!ee(e)) {
    const a = (f) => {
      const d = Go(f, t, !0);
      d && ((i = !0), He(o, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !l && !i
    ? (_e(e) && r.set(e, null), null)
    : (J(l) ? l.forEach((a) => (o[a] = null)) : He(o, l),
      _e(e) && r.set(e, o),
      o);
}
function mr(e, t) {
  return !e || !Sn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, cn(t)) || oe(e, t));
}
let xe = null,
  pr = null;
function tr(e) {
  const t = xe;
  return (xe = e), (pr = (e && e.type.__scopeId) || null), t;
}
function dc(e) {
  pr = e;
}
function hc() {
  pr = null;
}
function Xo(e, t = xe, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && hl(-1);
    const l = tr(t);
    let o;
    try {
      o = e(...s);
    } finally {
      tr(l), r._d && hl(1);
    }
    return o;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Pr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: l,
    propsOptions: [o],
    slots: i,
    attrs: a,
    emit: f,
    render: d,
    renderCache: g,
    data: h,
    setupState: _,
    ctx: E,
    inheritAttrs: O,
  } = e;
  let N, m;
  const y = tr(e);
  try {
    if (n.shapeFlag & 4) {
      const L = s || r;
      (N = Ze(d.call(L, L, g, l, _, h, E))), (m = a);
    } else {
      const L = t;
      (N = Ze(
        L.length > 1 ? L(l, { attrs: a, slots: i, emit: f }) : L(l, null)
      )),
        (m = t.props ? a : mc(a));
    }
  } catch (L) {
    (En.length = 0), dr(L, e, 1), (N = Ce(Ut));
  }
  let T = N;
  if (m && O !== !1) {
    const L = Object.keys(m),
      { shapeFlag: I } = T;
    L.length && I & 7 && (o && L.some(ms) && (m = pc(m, o)), (T = nn(T, m)));
  }
  return (
    n.dirs && ((T = nn(T)), (T.dirs = T.dirs ? T.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (T.transition = n.transition),
    (N = T),
    tr(y),
    N
  );
}
const mc = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Sn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  pc = (e, t) => {
    const n = {};
    for (const r in e) (!ms(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function gc(e, t, n) {
  const { props: r, children: s, component: l } = e,
    { props: o, children: i, patchFlag: a } = t,
    f = l.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return r ? ll(r, o, f) : !!o;
    if (a & 8) {
      const d = t.dynamicProps;
      for (let g = 0; g < d.length; g++) {
        const h = d[g];
        if (o[h] !== r[h] && !mr(f, h)) return !0;
      }
    }
  } else
    return (s || i) && (!i || !i.$stable)
      ? !0
      : r === o
      ? !1
      : r
      ? o
        ? ll(r, o, f)
        : !0
      : !!o;
  return !1;
}
function ll(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const l = r[s];
    if (t[l] !== e[l] && !mr(n, l)) return !0;
  }
  return !1;
}
function _c({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const bc = (e) => e.__isSuspense;
function qo(e, t) {
  t && t.pendingBranch
    ? J(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : cc(e);
}
function Gn(e, t) {
  if (Ae) {
    let n = Ae.provides;
    const r = Ae.parent && Ae.parent.provides;
    r === n && (n = Ae.provides = Object.create(r)), (n[e] = t);
  }
}
function qe(e, t, n = !1) {
  const r = Ae || xe;
  if (r) {
    const s =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && ee(t) ? t.call(r.proxy) : t;
  }
}
function yc(e, t) {
  return Ps(e, null, t);
}
const Un = {};
function mt(e, t, n) {
  return Ps(e, t, n);
}
function Ps(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: l, onTrigger: o } = ge
) {
  const i = Ae;
  let a,
    f = !1,
    d = !1;
  if (
    (ye(e)
      ? ((a = () => e.value), (f = zn(e)))
      : It(e)
      ? ((a = () => e), (r = !0))
      : J(e)
      ? ((d = !0),
        (f = e.some((T) => It(T) || zn(T))),
        (a = () =>
          e.map((T) => {
            if (ye(T)) return T.value;
            if (It(T)) return Yt(T);
            if (ee(T)) return kt(T, i, 2);
          })))
      : ee(e)
      ? t
        ? (a = () => kt(e, i, 2))
        : (a = () => {
            if (!(i && i.isUnmounted)) return g && g(), nt(e, i, 3, [h]);
          })
      : (a = tt),
    t && r)
  ) {
    const T = a;
    a = () => Yt(T());
  }
  let g,
    h = (T) => {
      g = m.onStop = () => {
        kt(T, i, 4);
      };
    },
    _;
  if (Nn)
    if (
      ((h = tt),
      t ? n && nt(t, i, 3, [a(), d ? [] : void 0, h]) : a(),
      s === "sync")
    ) {
      const T = fu();
      _ = T.__watcherHandles || (T.__watcherHandles = []);
    } else return tt;
  let E = d ? new Array(e.length).fill(Un) : Un;
  const O = () => {
    if (!!m.active)
      if (t) {
        const T = m.run();
        (r || f || (d ? T.some((L, I) => kn(L, E[I])) : kn(T, E))) &&
          (g && g(),
          nt(t, i, 3, [T, E === Un ? void 0 : d && E[0] === Un ? [] : E, h]),
          (E = T));
      } else m.run();
  };
  O.allowRecurse = !!t;
  let N;
  s === "sync"
    ? (N = O)
    : s === "post"
    ? (N = () => We(O, i && i.suspense))
    : ((O.pre = !0), i && (O.id = i.uid), (N = () => Os(O)));
  const m = new Es(a, N);
  t
    ? n
      ? O()
      : (E = m.run())
    : s === "post"
    ? We(m.run.bind(m), i && i.suspense)
    : m.run();
  const y = () => {
    m.stop(), i && i.scope && ps(i.scope.effects, m);
  };
  return _ && _.push(y), y;
}
function Ec(e, t, n) {
  const r = this.proxy,
    s = Ie(e) ? (e.includes(".") ? Jo(r, e) : () => r[e]) : e.bind(r, r);
  let l;
  ee(t) ? (l = t) : ((l = t.handler), (n = t));
  const o = Ae;
  rn(this);
  const i = Ps(s, l.bind(r), n);
  return o ? rn(o) : Dt(), i;
}
function Jo(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function Yt(e, t) {
  if (!_e(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ye(e))) Yt(e.value, t);
  else if (J(e)) for (let n = 0; n < e.length; n++) Yt(e[n], t);
  else if (Eo(e) || Jt(e))
    e.forEach((n) => {
      Yt(n, t);
    });
  else if (Co(e)) for (const n in e) Yt(e[n], t);
  return e;
}
function Wt(e) {
  return ee(e) ? { setup: e, name: e.name } : e;
}
const Zt = (e) => !!e.type.__asyncLoader,
  Qo = (e) => e.type.__isKeepAlive;
function vc(e, t) {
  Zo(e, "a", t);
}
function Tc(e, t) {
  Zo(e, "da", t);
}
function Zo(e, t, n = Ae) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((gr(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      Qo(s.parent.vnode) && Cc(r, t, n, s), (s = s.parent);
  }
}
function Cc(e, t, n, r) {
  const s = gr(t, e, r, !0);
  As(() => {
    ps(r[t], s);
  }, n);
}
function gr(e, t, n = Ae, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      l =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          un(), rn(n);
          const i = nt(t, n, e, o);
          return Dt(), fn(), i;
        });
    return r ? s.unshift(l) : s.push(l), l;
  }
}
const gt =
    (e) =>
    (t, n = Ae) =>
      (!Nn || e === "sp") && gr(e, (...r) => t(...r), n),
  zo = gt("bm"),
  ws = gt("m"),
  Lc = gt("bu"),
  Ic = gt("u"),
  ei = gt("bum"),
  As = gt("um"),
  kc = gt("sp"),
  Oc = gt("rtg"),
  Pc = gt("rtc");
function wc(e, t = Ae) {
  gr("ec", e, t);
}
function ot(e, t, n, r) {
  const s = e.dirs,
    l = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const i = s[o];
    l && (i.oldValue = l[o].value);
    let a = i.dir[r];
    a && (un(), nt(a, n, 8, [e.el, i, e, t]), fn());
  }
}
const ti = "components",
  ni = Symbol();
function wr(e) {
  return Ie(e) ? Ac(ti, e, !1) || e : e || ni;
}
function Ac(e, t, n = !0, r = !1) {
  const s = xe || Ae;
  if (s) {
    const l = s.type;
    if (e === ti) {
      const i = au(l, !1);
      if (i && (i === t || i === ut(t) || i === ur(ut(t)))) return l;
    }
    const o = ol(s[e] || l[e], t) || ol(s.appContext[e], t);
    return !o && r ? l : o;
  }
}
function ol(e, t) {
  return e && (e[t] || e[ut(t)] || e[ur(ut(t))]);
}
function Nc(e, t, n, r) {
  let s;
  const l = n && n[r];
  if (J(e) || Ie(e)) {
    s = new Array(e.length);
    for (let o = 0, i = e.length; o < i; o++)
      s[o] = t(e[o], o, void 0, l && l[o]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, l && l[o]);
  } else if (_e(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (o, i) => t(o, i, void 0, l && l[i]));
    else {
      const o = Object.keys(e);
      s = new Array(o.length);
      for (let i = 0, a = o.length; i < a; i++) {
        const f = o[i];
        s[i] = t(e[f], f, i, l && l[i]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
function Rc(e, t, n = {}, r, s) {
  if (xe.isCE || (xe.parent && Zt(xe.parent) && xe.parent.isCE))
    return t !== "default" && (n.name = t), Ce("slot", n, r && r());
  let l = e[t];
  l && l._c && (l._d = !1), ct();
  const o = l && ri(l(n)),
    i = qn(
      Se,
      { key: n.key || (o && o.key) || `_${t}` },
      o || (r ? r() : []),
      o && e._ === 1 ? 64 : -2
    );
  return (
    !s && i.scopeId && (i.slotScopeIds = [i.scopeId + "-s"]),
    l && l._c && (l._d = !0),
    i
  );
}
function ri(e) {
  return e.some((t) =>
    sr(t) ? !(t.type === Ut || (t.type === Se && !ri(t.children))) : !0
  )
    ? e
    : null;
}
const Kr = (e) => (e ? (pi(e) ? Fs(e) || e.proxy : Kr(e.parent)) : null),
  yn = He(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Kr(e.parent),
    $root: (e) => Kr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ns(e),
    $forceUpdate: (e) => e.f || (e.f = () => Os(e.update)),
    $nextTick: (e) => e.n || (e.n = hr.bind(e.proxy)),
    $watch: (e) => Ec.bind(e),
  }),
  Ar = (e, t) => e !== ge && !e.__isScriptSetup && oe(e, t),
  Sc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: l,
        accessCache: o,
        type: i,
        appContext: a,
      } = e;
      let f;
      if (t[0] !== "$") {
        const _ = o[t];
        if (_ !== void 0)
          switch (_) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return l[t];
          }
        else {
          if (Ar(r, t)) return (o[t] = 1), r[t];
          if (s !== ge && oe(s, t)) return (o[t] = 2), s[t];
          if ((f = e.propsOptions[0]) && oe(f, t)) return (o[t] = 3), l[t];
          if (n !== ge && oe(n, t)) return (o[t] = 4), n[t];
          Yr && (o[t] = 0);
        }
      }
      const d = yn[t];
      let g, h;
      if (d) return t === "$attrs" && Ye(e, "get", t), d(e);
      if ((g = i.__cssModules) && (g = g[t])) return g;
      if (n !== ge && oe(n, t)) return (o[t] = 4), n[t];
      if (((h = a.config.globalProperties), oe(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: l } = e;
      return Ar(s, t)
        ? ((s[t] = n), !0)
        : r !== ge && oe(r, t)
        ? ((r[t] = n), !0)
        : oe(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((l[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: l,
        },
      },
      o
    ) {
      let i;
      return (
        !!n[o] ||
        (e !== ge && oe(e, o)) ||
        Ar(t, o) ||
        ((i = l[0]) && oe(i, o)) ||
        oe(r, o) ||
        oe(yn, o) ||
        oe(s.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : oe(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Yr = !0;
function Mc(e) {
  const t = Ns(e),
    n = e.proxy,
    r = e.ctx;
  (Yr = !1), t.beforeCreate && il(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: l,
    methods: o,
    watch: i,
    provide: a,
    inject: f,
    created: d,
    beforeMount: g,
    mounted: h,
    beforeUpdate: _,
    updated: E,
    activated: O,
    deactivated: N,
    beforeDestroy: m,
    beforeUnmount: y,
    destroyed: T,
    unmounted: L,
    render: I,
    renderTracked: S,
    renderTriggered: w,
    errorCaptured: F,
    serverPrefetch: K,
    expose: Y,
    inheritAttrs: G,
    components: de,
    directives: ne,
    filters: j,
  } = t;
  if ((f && Fc(f, r, null, e.appContext.config.unwrapInjectedRef), o))
    for (const te in o) {
      const re = o[te];
      ee(re) && (r[te] = re.bind(n));
    }
  if (s) {
    const te = s.call(n, n);
    _e(te) && (e.data = dn(te));
  }
  if (((Yr = !0), l))
    for (const te in l) {
      const re = l[te],
        we = ee(re) ? re.bind(n, n) : ee(re.get) ? re.get.bind(n, n) : tt,
        je = !ee(re) && ee(re.set) ? re.set.bind(n) : tt,
        Re = be({ get: we, set: je });
      Object.defineProperty(r, te, {
        enumerable: !0,
        configurable: !0,
        get: () => Re.value,
        set: (Te) => (Re.value = Te),
      });
    }
  if (i) for (const te in i) si(i[te], r, n, te);
  if (a) {
    const te = ee(a) ? a.call(n) : a;
    Reflect.ownKeys(te).forEach((re) => {
      Gn(re, te[re]);
    });
  }
  d && il(d, e, "c");
  function Q(te, re) {
    J(re) ? re.forEach((we) => te(we.bind(n))) : re && te(re.bind(n));
  }
  if (
    (Q(zo, g),
    Q(ws, h),
    Q(Lc, _),
    Q(Ic, E),
    Q(vc, O),
    Q(Tc, N),
    Q(wc, F),
    Q(Pc, S),
    Q(Oc, w),
    Q(ei, y),
    Q(As, L),
    Q(kc, K),
    J(Y))
  )
    if (Y.length) {
      const te = e.exposed || (e.exposed = {});
      Y.forEach((re) => {
        Object.defineProperty(te, re, {
          get: () => n[re],
          set: (we) => (n[re] = we),
        });
      });
    } else e.exposed || (e.exposed = {});
  I && e.render === tt && (e.render = I),
    G != null && (e.inheritAttrs = G),
    de && (e.components = de),
    ne && (e.directives = ne);
}
function Fc(e, t, n = tt, r = !1) {
  J(e) && (e = Gr(e));
  for (const s in e) {
    const l = e[s];
    let o;
    _e(l)
      ? "default" in l
        ? (o = qe(l.from || s, l.default, !0))
        : (o = qe(l.from || s))
      : (o = qe(l)),
      ye(o) && r
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o);
  }
}
function il(e, t, n) {
  nt(J(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function si(e, t, n, r) {
  const s = r.includes(".") ? Jo(n, r) : () => n[r];
  if (Ie(e)) {
    const l = t[e];
    ee(l) && mt(s, l);
  } else if (ee(e)) mt(s, e.bind(n));
  else if (_e(e))
    if (J(e)) e.forEach((l) => si(l, t, n, r));
    else {
      const l = ee(e.handler) ? e.handler.bind(n) : t[e.handler];
      ee(l) && mt(s, l, e);
    }
}
function Ns(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: l,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    i = l.get(t);
  let a;
  return (
    i
      ? (a = i)
      : !s.length && !n && !r
      ? (a = t)
      : ((a = {}), s.length && s.forEach((f) => nr(a, f, o, !0)), nr(a, t, o)),
    _e(t) && l.set(t, a),
    a
  );
}
function nr(e, t, n, r = !1) {
  const { mixins: s, extends: l } = t;
  l && nr(e, l, n, !0), s && s.forEach((o) => nr(e, o, n, !0));
  for (const o in t)
    if (!(r && o === "expose")) {
      const i = xc[o] || (n && n[o]);
      e[o] = i ? i(e[o], t[o]) : t[o];
    }
  return e;
}
const xc = {
  data: al,
  props: St,
  emits: St,
  methods: St,
  computed: St,
  beforeCreate: De,
  created: De,
  beforeMount: De,
  mounted: De,
  beforeUpdate: De,
  updated: De,
  beforeDestroy: De,
  beforeUnmount: De,
  destroyed: De,
  unmounted: De,
  activated: De,
  deactivated: De,
  errorCaptured: De,
  serverPrefetch: De,
  components: St,
  directives: St,
  watch: $c,
  provide: al,
  inject: Dc,
};
function al(e, t) {
  return t
    ? e
      ? function () {
          return He(
            ee(e) ? e.call(this, this) : e,
            ee(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Dc(e, t) {
  return St(Gr(e), Gr(t));
}
function Gr(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function De(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function St(e, t) {
  return e ? He(He(Object.create(null), e), t) : t;
}
function $c(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = He(Object.create(null), e);
  for (const r in t) n[r] = De(e[r], t[r]);
  return n;
}
function Hc(e, t, n, r = !1) {
  const s = {},
    l = {};
  Zn(l, _r, 1), (e.propsDefaults = Object.create(null)), li(e, t, s, l);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = r ? s : Za(s)) : e.type.props ? (e.props = s) : (e.props = l),
    (e.attrs = l);
}
function Uc(e, t, n, r) {
  const {
      props: s,
      attrs: l,
      vnode: { patchFlag: o },
    } = e,
    i = fe(s),
    [a] = e.propsOptions;
  let f = !1;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps;
      for (let g = 0; g < d.length; g++) {
        let h = d[g];
        if (mr(e.emitsOptions, h)) continue;
        const _ = t[h];
        if (a)
          if (oe(l, h)) _ !== l[h] && ((l[h] = _), (f = !0));
          else {
            const E = ut(h);
            s[E] = Xr(a, i, E, _, e, !1);
          }
        else _ !== l[h] && ((l[h] = _), (f = !0));
      }
    }
  } else {
    li(e, t, s, l) && (f = !0);
    let d;
    for (const g in i)
      (!t || (!oe(t, g) && ((d = cn(g)) === g || !oe(t, d)))) &&
        (a
          ? n &&
            (n[g] !== void 0 || n[d] !== void 0) &&
            (s[g] = Xr(a, i, g, void 0, e, !0))
          : delete s[g]);
    if (l !== i)
      for (const g in l) (!t || (!oe(t, g) && !0)) && (delete l[g], (f = !0));
  }
  f && pt(e, "set", "$attrs");
}
function li(e, t, n, r) {
  const [s, l] = e.propsOptions;
  let o = !1,
    i;
  if (t)
    for (let a in t) {
      if (bn(a)) continue;
      const f = t[a];
      let d;
      s && oe(s, (d = ut(a)))
        ? !l || !l.includes(d)
          ? (n[d] = f)
          : ((i || (i = {}))[d] = f)
        : mr(e.emitsOptions, a) ||
          ((!(a in r) || f !== r[a]) && ((r[a] = f), (o = !0)));
    }
  if (l) {
    const a = fe(n),
      f = i || ge;
    for (let d = 0; d < l.length; d++) {
      const g = l[d];
      n[g] = Xr(s, a, g, f[g], e, !oe(f, g));
    }
  }
  return o;
}
function Xr(e, t, n, r, s, l) {
  const o = e[n];
  if (o != null) {
    const i = oe(o, "default");
    if (i && r === void 0) {
      const a = o.default;
      if (o.type !== Function && ee(a)) {
        const { propsDefaults: f } = s;
        n in f ? (r = f[n]) : (rn(s), (r = f[n] = a.call(null, t)), Dt());
      } else r = a;
    }
    o[0] &&
      (l && !i ? (r = !1) : o[1] && (r === "" || r === cn(n)) && (r = !0));
  }
  return r;
}
function oi(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const l = e.props,
    o = {},
    i = [];
  let a = !1;
  if (!ee(e)) {
    const d = (g) => {
      a = !0;
      const [h, _] = oi(g, t, !0);
      He(o, h), _ && i.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!l && !a) return _e(e) && r.set(e, qt), qt;
  if (J(l))
    for (let d = 0; d < l.length; d++) {
      const g = ut(l[d]);
      cl(g) && (o[g] = ge);
    }
  else if (l)
    for (const d in l) {
      const g = ut(d);
      if (cl(g)) {
        const h = l[d],
          _ = (o[g] = J(h) || ee(h) ? { type: h } : Object.assign({}, h));
        if (_) {
          const E = dl(Boolean, _.type),
            O = dl(String, _.type);
          (_[0] = E > -1),
            (_[1] = O < 0 || E < O),
            (E > -1 || oe(_, "default")) && i.push(g);
        }
      }
    }
  const f = [o, i];
  return _e(e) && r.set(e, f), f;
}
function cl(e) {
  return e[0] !== "$";
}
function ul(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function fl(e, t) {
  return ul(e) === ul(t);
}
function dl(e, t) {
  return J(t) ? t.findIndex((n) => fl(n, e)) : ee(t) && fl(t, e) ? 0 : -1;
}
const ii = (e) => e[0] === "_" || e === "$stable",
  Rs = (e) => (J(e) ? e.map(Ze) : [Ze(e)]),
  Wc = (e, t, n) => {
    if (t._n) return t;
    const r = Xo((...s) => Rs(t(...s)), n);
    return (r._c = !1), r;
  },
  ai = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (ii(s)) continue;
      const l = e[s];
      if (ee(l)) t[s] = Wc(s, l, r);
      else if (l != null) {
        const o = Rs(l);
        t[s] = () => o;
      }
    }
  },
  ci = (e, t) => {
    const n = Rs(t);
    e.slots.default = () => n;
  },
  jc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = fe(t)), Zn(t, "_", n)) : ai(t, (e.slots = {}));
    } else (e.slots = {}), t && ci(e, t);
    Zn(e.slots, _r, 1);
  },
  Bc = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let l = !0,
      o = ge;
    if (r.shapeFlag & 32) {
      const i = t._;
      i
        ? n && i === 1
          ? (l = !1)
          : (He(s, t), !n && i === 1 && delete s._)
        : ((l = !t.$stable), ai(t, s)),
        (o = t);
    } else t && (ci(e, t), (o = { default: 1 }));
    if (l) for (const i in s) !ii(i) && !(i in o) && delete s[i];
  };
function ui() {
  return {
    app: null,
    config: {
      isNativeTag: _a,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Vc = 0;
function Kc(e, t) {
  return function (r, s = null) {
    ee(r) || (r = Object.assign({}, r)), s != null && !_e(s) && (s = null);
    const l = ui(),
      o = new Set();
    let i = !1;
    const a = (l.app = {
      _uid: Vc++,
      _component: r,
      _props: s,
      _container: null,
      _context: l,
      _instance: null,
      version: _i,
      get config() {
        return l.config;
      },
      set config(f) {},
      use(f, ...d) {
        return (
          o.has(f) ||
            (f && ee(f.install)
              ? (o.add(f), f.install(a, ...d))
              : ee(f) && (o.add(f), f(a, ...d))),
          a
        );
      },
      mixin(f) {
        return l.mixins.includes(f) || l.mixins.push(f), a;
      },
      component(f, d) {
        return d ? ((l.components[f] = d), a) : l.components[f];
      },
      directive(f, d) {
        return d ? ((l.directives[f] = d), a) : l.directives[f];
      },
      mount(f, d, g) {
        if (!i) {
          const h = Ce(r, s);
          return (
            (h.appContext = l),
            d && t ? t(h, f) : e(h, f, g),
            (i = !0),
            (a._container = f),
            (f.__vue_app__ = a),
            Fs(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        i && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(f, d) {
        return (l.provides[f] = d), a;
      },
    });
    return a;
  };
}
function rr(e, t, n, r, s = !1) {
  if (J(e)) {
    e.forEach((h, _) => rr(h, t && (J(t) ? t[_] : t), n, r, s));
    return;
  }
  if (Zt(r) && !s) return;
  const l = r.shapeFlag & 4 ? Fs(r.component) || r.component.proxy : r.el,
    o = s ? null : l,
    { i, r: a } = e,
    f = t && t.r,
    d = i.refs === ge ? (i.refs = {}) : i.refs,
    g = i.setupState;
  if (
    (f != null &&
      f !== a &&
      (Ie(f)
        ? ((d[f] = null), oe(g, f) && (g[f] = null))
        : ye(f) && (f.value = null)),
    ee(a))
  )
    kt(a, i, 12, [o, d]);
  else {
    const h = Ie(a),
      _ = ye(a);
    if (h || _) {
      const E = () => {
        if (e.f) {
          const O = h ? (oe(g, a) ? g[a] : d[a]) : a.value;
          s
            ? J(O) && ps(O, l)
            : J(O)
            ? O.includes(l) || O.push(l)
            : h
            ? ((d[a] = [l]), oe(g, a) && (g[a] = d[a]))
            : ((a.value = [l]), e.k && (d[e.k] = a.value));
        } else
          h
            ? ((d[a] = o), oe(g, a) && (g[a] = o))
            : _ && ((a.value = o), e.k && (d[e.k] = o));
      };
      o ? ((E.id = -1), We(E, n)) : E();
    }
  }
}
let bt = !1;
const Wn = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  jn = (e) => e.nodeType === 8;
function Yc(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: s,
        nextSibling: l,
        parentNode: o,
        remove: i,
        insert: a,
        createComment: f,
      },
    } = e,
    d = (m, y) => {
      if (!y.hasChildNodes()) {
        n(null, m, y), er(), (y._vnode = m);
        return;
      }
      (bt = !1),
        g(y.firstChild, m, null, null, null),
        er(),
        (y._vnode = m),
        bt && console.error("Hydration completed but contains mismatches.");
    },
    g = (m, y, T, L, I, S = !1) => {
      const w = jn(m) && m.data === "[",
        F = () => O(m, y, T, L, I, w),
        { type: K, ref: Y, shapeFlag: G, patchFlag: de } = y;
      let ne = m.nodeType;
      (y.el = m), de === -2 && ((S = !1), (y.dynamicChildren = null));
      let j = null;
      switch (K) {
        case Ht:
          ne !== 3
            ? y.children === ""
              ? (a((y.el = s("")), o(m), m), (j = m))
              : (j = F())
            : (m.data !== y.children && ((bt = !0), (m.data = y.children)),
              (j = l(m)));
          break;
        case Ut:
          ne !== 8 || w ? (j = F()) : (j = l(m));
          break;
        case Xn:
          if ((w && ((m = l(m)), (ne = m.nodeType)), ne === 1 || ne === 3)) {
            j = m;
            const ie = !y.children.length;
            for (let Q = 0; Q < y.staticCount; Q++)
              ie && (y.children += j.nodeType === 1 ? j.outerHTML : j.data),
                Q === y.staticCount - 1 && (y.anchor = j),
                (j = l(j));
            return w ? l(j) : j;
          } else F();
          break;
        case Se:
          w ? (j = E(m, y, T, L, I, S)) : (j = F());
          break;
        default:
          if (G & 1)
            ne !== 1 || y.type.toLowerCase() !== m.tagName.toLowerCase()
              ? (j = F())
              : (j = h(m, y, T, L, I, S));
          else if (G & 6) {
            y.slotScopeIds = I;
            const ie = o(m);
            if (
              (t(y, ie, null, T, L, Wn(ie), S),
              (j = w ? N(m) : l(m)),
              j && jn(j) && j.data === "teleport end" && (j = l(j)),
              Zt(y))
            ) {
              let Q;
              w
                ? ((Q = Ce(Se)),
                  (Q.anchor = j ? j.previousSibling : ie.lastChild))
                : (Q = m.nodeType === 3 ? Ss("") : Ce("div")),
                (Q.el = m),
                (y.component.subTree = Q);
            }
          } else
            G & 64
              ? ne !== 8
                ? (j = F())
                : (j = y.type.hydrate(m, y, T, L, I, S, e, _))
              : G & 128 &&
                (j = y.type.hydrate(m, y, T, L, Wn(o(m)), I, S, e, g));
      }
      return Y != null && rr(Y, null, L, y), j;
    },
    h = (m, y, T, L, I, S) => {
      S = S || !!y.dynamicChildren;
      const { type: w, props: F, patchFlag: K, shapeFlag: Y, dirs: G } = y,
        de = (w === "input" && G) || w === "option";
      if (de || K !== -1) {
        if ((G && ot(y, null, T, "created"), F))
          if (de || !S || K & 48)
            for (const j in F)
              ((de && j.endsWith("value")) || (Sn(j) && !bn(j))) &&
                r(m, j, null, F[j], !1, void 0, T);
          else F.onClick && r(m, "onClick", null, F.onClick, !1, void 0, T);
        let ne;
        if (
          ((ne = F && F.onVnodeBeforeMount) && Xe(ne, T, y),
          G && ot(y, null, T, "beforeMount"),
          ((ne = F && F.onVnodeMounted) || G) &&
            qo(() => {
              ne && Xe(ne, T, y), G && ot(y, null, T, "mounted");
            }, L),
          Y & 16 && !(F && (F.innerHTML || F.textContent)))
        ) {
          let j = _(m.firstChild, y, m, T, L, I, S);
          for (; j; ) {
            bt = !0;
            const ie = j;
            (j = j.nextSibling), i(ie);
          }
        } else
          Y & 8 &&
            m.textContent !== y.children &&
            ((bt = !0), (m.textContent = y.children));
      }
      return m.nextSibling;
    },
    _ = (m, y, T, L, I, S, w) => {
      w = w || !!y.dynamicChildren;
      const F = y.children,
        K = F.length;
      for (let Y = 0; Y < K; Y++) {
        const G = w ? F[Y] : (F[Y] = Ze(F[Y]));
        if (m) m = g(m, G, L, I, S, w);
        else {
          if (G.type === Ht && !G.children) continue;
          (bt = !0), n(null, G, T, null, L, I, Wn(T), S);
        }
      }
      return m;
    },
    E = (m, y, T, L, I, S) => {
      const { slotScopeIds: w } = y;
      w && (I = I ? I.concat(w) : w);
      const F = o(m),
        K = _(l(m), y, F, T, L, I, S);
      return K && jn(K) && K.data === "]"
        ? l((y.anchor = K))
        : ((bt = !0), a((y.anchor = f("]")), F, K), K);
    },
    O = (m, y, T, L, I, S) => {
      if (((bt = !0), (y.el = null), S)) {
        const K = N(m);
        for (;;) {
          const Y = l(m);
          if (Y && Y !== K) i(Y);
          else break;
        }
      }
      const w = l(m),
        F = o(m);
      return i(m), n(null, y, F, w, T, L, Wn(F), I), w;
    },
    N = (m) => {
      let y = 0;
      for (; m; )
        if (
          ((m = l(m)), m && jn(m) && (m.data === "[" && y++, m.data === "]"))
        ) {
          if (y === 0) return l(m);
          y--;
        }
      return m;
    };
  return [d, g];
}
const We = qo;
function Gc(e) {
  return fi(e);
}
function Xc(e) {
  return fi(e, Yc);
}
function fi(e, t) {
  const n = Ca();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: l,
      createElement: o,
      createText: i,
      createComment: a,
      setText: f,
      setElementText: d,
      parentNode: g,
      nextSibling: h,
      setScopeId: _ = tt,
      insertStaticContent: E,
    } = e,
    O = (
      p,
      c,
      u,
      b = null,
      v = null,
      P = null,
      M = !1,
      x = null,
      D = !!c.dynamicChildren
    ) => {
      if (p === c) return;
      p && !mn(p, c) && ((b = $(p)), Te(p, v, P, !0), (p = null)),
        c.patchFlag === -2 && ((D = !1), (c.dynamicChildren = null));
      const { type: A, ref: C, shapeFlag: k } = c;
      switch (A) {
        case Ht:
          N(p, c, u, b);
          break;
        case Ut:
          m(p, c, u, b);
          break;
        case Xn:
          p == null && y(c, u, b, M);
          break;
        case Se:
          de(p, c, u, b, v, P, M, x, D);
          break;
        default:
          k & 1
            ? I(p, c, u, b, v, P, M, x, D)
            : k & 6
            ? ne(p, c, u, b, v, P, M, x, D)
            : (k & 64 || k & 128) && A.process(p, c, u, b, v, P, M, x, D, Z);
      }
      C != null && v && rr(C, p && p.ref, P, c || p, !c);
    },
    N = (p, c, u, b) => {
      if (p == null) r((c.el = i(c.children)), u, b);
      else {
        const v = (c.el = p.el);
        c.children !== p.children && f(v, c.children);
      }
    },
    m = (p, c, u, b) => {
      p == null ? r((c.el = a(c.children || "")), u, b) : (c.el = p.el);
    },
    y = (p, c, u, b) => {
      [p.el, p.anchor] = E(p.children, c, u, b, p.el, p.anchor);
    },
    T = ({ el: p, anchor: c }, u, b) => {
      let v;
      for (; p && p !== c; ) (v = h(p)), r(p, u, b), (p = v);
      r(c, u, b);
    },
    L = ({ el: p, anchor: c }) => {
      let u;
      for (; p && p !== c; ) (u = h(p)), s(p), (p = u);
      s(c);
    },
    I = (p, c, u, b, v, P, M, x, D) => {
      (M = M || c.type === "svg"),
        p == null ? S(c, u, b, v, P, M, x, D) : K(p, c, v, P, M, x, D);
    },
    S = (p, c, u, b, v, P, M, x) => {
      let D, A;
      const { type: C, props: k, shapeFlag: W, transition: V, dirs: z } = p;
      if (
        ((D = p.el = o(p.type, P, k && k.is, k)),
        W & 8
          ? d(D, p.children)
          : W & 16 &&
            F(p.children, D, null, b, v, P && C !== "foreignObject", M, x),
        z && ot(p, null, b, "created"),
        k)
      ) {
        for (const se in k)
          se !== "value" &&
            !bn(se) &&
            l(D, se, null, k[se], P, p.children, b, v, H);
        "value" in k && l(D, "value", null, k.value),
          (A = k.onVnodeBeforeMount) && Xe(A, b, p);
      }
      w(D, p, p.scopeId, M, b), z && ot(p, null, b, "beforeMount");
      const ue = (!v || (v && !v.pendingBranch)) && V && !V.persisted;
      ue && V.beforeEnter(D),
        r(D, c, u),
        ((A = k && k.onVnodeMounted) || ue || z) &&
          We(() => {
            A && Xe(A, b, p), ue && V.enter(D), z && ot(p, null, b, "mounted");
          }, v);
    },
    w = (p, c, u, b, v) => {
      if ((u && _(p, u), b)) for (let P = 0; P < b.length; P++) _(p, b[P]);
      if (v) {
        let P = v.subTree;
        if (c === P) {
          const M = v.vnode;
          w(p, M, M.scopeId, M.slotScopeIds, v.parent);
        }
      }
    },
    F = (p, c, u, b, v, P, M, x, D = 0) => {
      for (let A = D; A < p.length; A++) {
        const C = (p[A] = x ? vt(p[A]) : Ze(p[A]));
        O(null, C, c, u, b, v, P, M, x);
      }
    },
    K = (p, c, u, b, v, P, M) => {
      const x = (c.el = p.el);
      let { patchFlag: D, dynamicChildren: A, dirs: C } = c;
      D |= p.patchFlag & 16;
      const k = p.props || ge,
        W = c.props || ge;
      let V;
      u && Rt(u, !1),
        (V = W.onVnodeBeforeUpdate) && Xe(V, u, c, p),
        C && ot(c, p, u, "beforeUpdate"),
        u && Rt(u, !0);
      const z = v && c.type !== "foreignObject";
      if (
        (A
          ? Y(p.dynamicChildren, A, x, u, b, z, P)
          : M || re(p, c, x, null, u, b, z, P, !1),
        D > 0)
      ) {
        if (D & 16) G(x, c, k, W, u, b, v);
        else if (
          (D & 2 && k.class !== W.class && l(x, "class", null, W.class, v),
          D & 4 && l(x, "style", k.style, W.style, v),
          D & 8)
        ) {
          const ue = c.dynamicProps;
          for (let se = 0; se < ue.length; se++) {
            const Ee = ue[se],
              Ge = k[Ee],
              jt = W[Ee];
            (jt !== Ge || Ee === "value") &&
              l(x, Ee, Ge, jt, v, p.children, u, b, H);
          }
        }
        D & 1 && p.children !== c.children && d(x, c.children);
      } else !M && A == null && G(x, c, k, W, u, b, v);
      ((V = W.onVnodeUpdated) || C) &&
        We(() => {
          V && Xe(V, u, c, p), C && ot(c, p, u, "updated");
        }, b);
    },
    Y = (p, c, u, b, v, P, M) => {
      for (let x = 0; x < c.length; x++) {
        const D = p[x],
          A = c[x],
          C =
            D.el && (D.type === Se || !mn(D, A) || D.shapeFlag & 70)
              ? g(D.el)
              : u;
        O(D, A, C, null, b, v, P, M, !0);
      }
    },
    G = (p, c, u, b, v, P, M) => {
      if (u !== b) {
        if (u !== ge)
          for (const x in u)
            !bn(x) && !(x in b) && l(p, x, u[x], null, M, c.children, v, P, H);
        for (const x in b) {
          if (bn(x)) continue;
          const D = b[x],
            A = u[x];
          D !== A && x !== "value" && l(p, x, A, D, M, c.children, v, P, H);
        }
        "value" in b && l(p, "value", u.value, b.value);
      }
    },
    de = (p, c, u, b, v, P, M, x, D) => {
      const A = (c.el = p ? p.el : i("")),
        C = (c.anchor = p ? p.anchor : i(""));
      let { patchFlag: k, dynamicChildren: W, slotScopeIds: V } = c;
      V && (x = x ? x.concat(V) : V),
        p == null
          ? (r(A, u, b), r(C, u, b), F(c.children, u, C, v, P, M, x, D))
          : k > 0 && k & 64 && W && p.dynamicChildren
          ? (Y(p.dynamicChildren, W, u, v, P, M, x),
            (c.key != null || (v && c === v.subTree)) && di(p, c, !0))
          : re(p, c, u, C, v, P, M, x, D);
    },
    ne = (p, c, u, b, v, P, M, x, D) => {
      (c.slotScopeIds = x),
        p == null
          ? c.shapeFlag & 512
            ? v.ctx.activate(c, u, b, M, D)
            : j(c, u, b, v, P, M, D)
          : ie(p, c, D);
    },
    j = (p, c, u, b, v, P, M) => {
      const x = (p.component = ru(p, b, v));
      if ((Qo(p) && (x.ctx.renderer = Z), su(x), x.asyncDep)) {
        if ((v && v.registerDep(x, Q), !p.el)) {
          const D = (x.subTree = Ce(Ut));
          m(null, D, c, u);
        }
        return;
      }
      Q(x, p, c, u, v, P, M);
    },
    ie = (p, c, u) => {
      const b = (c.component = p.component);
      if (gc(p, c, u))
        if (b.asyncDep && !b.asyncResolved) {
          te(b, c, u);
          return;
        } else (b.next = c), ac(b.update), b.update();
      else (c.el = p.el), (b.vnode = c);
    },
    Q = (p, c, u, b, v, P, M) => {
      const x = () => {
          if (p.isMounted) {
            let { next: C, bu: k, u: W, parent: V, vnode: z } = p,
              ue = C,
              se;
            Rt(p, !1),
              C ? ((C.el = z.el), te(p, C, M)) : (C = z),
              k && Or(k),
              (se = C.props && C.props.onVnodeBeforeUpdate) && Xe(se, V, C, z),
              Rt(p, !0);
            const Ee = Pr(p),
              Ge = p.subTree;
            (p.subTree = Ee),
              O(Ge, Ee, g(Ge.el), $(Ge), p, v, P),
              (C.el = Ee.el),
              ue === null && _c(p, Ee.el),
              W && We(W, v),
              (se = C.props && C.props.onVnodeUpdated) &&
                We(() => Xe(se, V, C, z), v);
          } else {
            let C;
            const { el: k, props: W } = c,
              { bm: V, m: z, parent: ue } = p,
              se = Zt(c);
            if (
              (Rt(p, !1),
              V && Or(V),
              !se && (C = W && W.onVnodeBeforeMount) && Xe(C, ue, c),
              Rt(p, !0),
              k && X)
            ) {
              const Ee = () => {
                (p.subTree = Pr(p)), X(k, p.subTree, p, v, null);
              };
              se
                ? c.type.__asyncLoader().then(() => !p.isUnmounted && Ee())
                : Ee();
            } else {
              const Ee = (p.subTree = Pr(p));
              O(null, Ee, u, b, p, v, P), (c.el = Ee.el);
            }
            if ((z && We(z, v), !se && (C = W && W.onVnodeMounted))) {
              const Ee = c;
              We(() => Xe(C, ue, Ee), v);
            }
            (c.shapeFlag & 256 ||
              (ue && Zt(ue.vnode) && ue.vnode.shapeFlag & 256)) &&
              p.a &&
              We(p.a, v),
              (p.isMounted = !0),
              (c = u = b = null);
          }
        },
        D = (p.effect = new Es(x, () => Os(A), p.scope)),
        A = (p.update = () => D.run());
      (A.id = p.uid), Rt(p, !0), A();
    },
    te = (p, c, u) => {
      c.component = p;
      const b = p.vnode.props;
      (p.vnode = c),
        (p.next = null),
        Uc(p, c.props, b, u),
        Bc(p, c.children, u),
        un(),
        sl(),
        fn();
    },
    re = (p, c, u, b, v, P, M, x, D = !1) => {
      const A = p && p.children,
        C = p ? p.shapeFlag : 0,
        k = c.children,
        { patchFlag: W, shapeFlag: V } = c;
      if (W > 0) {
        if (W & 128) {
          je(A, k, u, b, v, P, M, x, D);
          return;
        } else if (W & 256) {
          we(A, k, u, b, v, P, M, x, D);
          return;
        }
      }
      V & 8
        ? (C & 16 && H(A, v, P), k !== A && d(u, k))
        : C & 16
        ? V & 16
          ? je(A, k, u, b, v, P, M, x, D)
          : H(A, v, P, !0)
        : (C & 8 && d(u, ""), V & 16 && F(k, u, b, v, P, M, x, D));
    },
    we = (p, c, u, b, v, P, M, x, D) => {
      (p = p || qt), (c = c || qt);
      const A = p.length,
        C = c.length,
        k = Math.min(A, C);
      let W;
      for (W = 0; W < k; W++) {
        const V = (c[W] = D ? vt(c[W]) : Ze(c[W]));
        O(p[W], V, u, null, v, P, M, x, D);
      }
      A > C ? H(p, v, P, !0, !1, k) : F(c, u, b, v, P, M, x, D, k);
    },
    je = (p, c, u, b, v, P, M, x, D) => {
      let A = 0;
      const C = c.length;
      let k = p.length - 1,
        W = C - 1;
      for (; A <= k && A <= W; ) {
        const V = p[A],
          z = (c[A] = D ? vt(c[A]) : Ze(c[A]));
        if (mn(V, z)) O(V, z, u, null, v, P, M, x, D);
        else break;
        A++;
      }
      for (; A <= k && A <= W; ) {
        const V = p[k],
          z = (c[W] = D ? vt(c[W]) : Ze(c[W]));
        if (mn(V, z)) O(V, z, u, null, v, P, M, x, D);
        else break;
        k--, W--;
      }
      if (A > k) {
        if (A <= W) {
          const V = W + 1,
            z = V < C ? c[V].el : b;
          for (; A <= W; )
            O(null, (c[A] = D ? vt(c[A]) : Ze(c[A])), u, z, v, P, M, x, D), A++;
        }
      } else if (A > W) for (; A <= k; ) Te(p[A], v, P, !0), A++;
      else {
        const V = A,
          z = A,
          ue = new Map();
        for (A = z; A <= W; A++) {
          const Be = (c[A] = D ? vt(c[A]) : Ze(c[A]));
          Be.key != null && ue.set(Be.key, A);
        }
        let se,
          Ee = 0;
        const Ge = W - z + 1;
        let jt = !1,
          Gs = 0;
        const hn = new Array(Ge);
        for (A = 0; A < Ge; A++) hn[A] = 0;
        for (A = V; A <= k; A++) {
          const Be = p[A];
          if (Ee >= Ge) {
            Te(Be, v, P, !0);
            continue;
          }
          let st;
          if (Be.key != null) st = ue.get(Be.key);
          else
            for (se = z; se <= W; se++)
              if (hn[se - z] === 0 && mn(Be, c[se])) {
                st = se;
                break;
              }
          st === void 0
            ? Te(Be, v, P, !0)
            : ((hn[st - z] = A + 1),
              st >= Gs ? (Gs = st) : (jt = !0),
              O(Be, c[st], u, null, v, P, M, x, D),
              Ee++);
        }
        const Xs = jt ? qc(hn) : qt;
        for (se = Xs.length - 1, A = Ge - 1; A >= 0; A--) {
          const Be = z + A,
            st = c[Be],
            qs = Be + 1 < C ? c[Be + 1].el : b;
          hn[A] === 0
            ? O(null, st, u, qs, v, P, M, x, D)
            : jt && (se < 0 || A !== Xs[se] ? Re(st, u, qs, 2) : se--);
        }
      }
    },
    Re = (p, c, u, b, v = null) => {
      const { el: P, type: M, transition: x, children: D, shapeFlag: A } = p;
      if (A & 6) {
        Re(p.component.subTree, c, u, b);
        return;
      }
      if (A & 128) {
        p.suspense.move(c, u, b);
        return;
      }
      if (A & 64) {
        M.move(p, c, u, Z);
        return;
      }
      if (M === Se) {
        r(P, c, u);
        for (let k = 0; k < D.length; k++) Re(D[k], c, u, b);
        r(p.anchor, c, u);
        return;
      }
      if (M === Xn) {
        T(p, c, u);
        return;
      }
      if (b !== 2 && A & 1 && x)
        if (b === 0) x.beforeEnter(P), r(P, c, u), We(() => x.enter(P), v);
        else {
          const { leave: k, delayLeave: W, afterLeave: V } = x,
            z = () => r(P, c, u),
            ue = () => {
              k(P, () => {
                z(), V && V();
              });
            };
          W ? W(P, z, ue) : ue();
        }
      else r(P, c, u);
    },
    Te = (p, c, u, b = !1, v = !1) => {
      const {
        type: P,
        props: M,
        ref: x,
        children: D,
        dynamicChildren: A,
        shapeFlag: C,
        patchFlag: k,
        dirs: W,
      } = p;
      if ((x != null && rr(x, null, u, p, !0), C & 256)) {
        c.ctx.deactivate(p);
        return;
      }
      const V = C & 1 && W,
        z = !Zt(p);
      let ue;
      if ((z && (ue = M && M.onVnodeBeforeUnmount) && Xe(ue, c, p), C & 6))
        R(p.component, u, b);
      else {
        if (C & 128) {
          p.suspense.unmount(u, b);
          return;
        }
        V && ot(p, null, c, "beforeUnmount"),
          C & 64
            ? p.type.remove(p, c, u, v, Z, b)
            : A && (P !== Se || (k > 0 && k & 64))
            ? H(A, c, u, !1, !0)
            : ((P === Se && k & 384) || (!v && C & 16)) && H(D, c, u),
          b && Je(p);
      }
      ((z && (ue = M && M.onVnodeUnmounted)) || V) &&
        We(() => {
          ue && Xe(ue, c, p), V && ot(p, null, c, "unmounted");
        }, u);
    },
    Je = (p) => {
      const { type: c, el: u, anchor: b, transition: v } = p;
      if (c === Se) {
        Qe(u, b);
        return;
      }
      if (c === Xn) {
        L(p);
        return;
      }
      const P = () => {
        s(u), v && !v.persisted && v.afterLeave && v.afterLeave();
      };
      if (p.shapeFlag & 1 && v && !v.persisted) {
        const { leave: M, delayLeave: x } = v,
          D = () => M(u, P);
        x ? x(p.el, P, D) : D();
      } else P();
    },
    Qe = (p, c) => {
      let u;
      for (; p !== c; ) (u = h(p)), s(p), (p = u);
      s(c);
    },
    R = (p, c, u) => {
      const { bum: b, scope: v, update: P, subTree: M, um: x } = p;
      b && Or(b),
        v.stop(),
        P && ((P.active = !1), Te(M, p, c, u)),
        x && We(x, c),
        We(() => {
          p.isUnmounted = !0;
        }, c),
        c &&
          c.pendingBranch &&
          !c.isUnmounted &&
          p.asyncDep &&
          !p.asyncResolved &&
          p.suspenseId === c.pendingId &&
          (c.deps--, c.deps === 0 && c.resolve());
    },
    H = (p, c, u, b = !1, v = !1, P = 0) => {
      for (let M = P; M < p.length; M++) Te(p[M], c, u, b, v);
    },
    $ = (p) =>
      p.shapeFlag & 6
        ? $(p.component.subTree)
        : p.shapeFlag & 128
        ? p.suspense.next()
        : h(p.anchor || p.el),
    B = (p, c, u) => {
      p == null
        ? c._vnode && Te(c._vnode, null, null, !0)
        : O(c._vnode || null, p, c, null, null, null, u),
        sl(),
        er(),
        (c._vnode = p);
    },
    Z = {
      p: O,
      um: Te,
      m: Re,
      r: Je,
      mt: j,
      mc: F,
      pc: re,
      pbc: Y,
      n: $,
      o: e,
    };
  let ae, X;
  return (
    t && ([ae, X] = t(Z)), { render: B, hydrate: ae, createApp: Kc(B, ae) }
  );
}
function Rt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function di(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (J(r) && J(s))
    for (let l = 0; l < r.length; l++) {
      const o = r[l];
      let i = s[l];
      i.shapeFlag & 1 &&
        !i.dynamicChildren &&
        ((i.patchFlag <= 0 || i.patchFlag === 32) &&
          ((i = s[l] = vt(s[l])), (i.el = o.el)),
        n || di(o, i)),
        i.type === Ht && (i.el = o.el);
    }
}
function qc(e) {
  const t = e.slice(),
    n = [0];
  let r, s, l, o, i;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const f = e[r];
    if (f !== 0) {
      if (((s = n[n.length - 1]), e[s] < f)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (l = 0, o = n.length - 1; l < o; )
        (i = (l + o) >> 1), e[n[i]] < f ? (l = i + 1) : (o = i);
      f < e[n[l]] && (l > 0 && (t[r] = n[l - 1]), (n[l] = r));
    }
  }
  for (l = n.length, o = n[l - 1]; l-- > 0; ) (n[l] = o), (o = t[o]);
  return n;
}
const Jc = (e) => e.__isTeleport,
  Se = Symbol(void 0),
  Ht = Symbol(void 0),
  Ut = Symbol(void 0),
  Xn = Symbol(void 0),
  En = [];
let et = null;
function ct(e = !1) {
  En.push((et = e ? null : []));
}
function Qc() {
  En.pop(), (et = En[En.length - 1] || null);
}
let An = 1;
function hl(e) {
  An += e;
}
function hi(e) {
  return (
    (e.dynamicChildren = An > 0 ? et || qt : null),
    Qc(),
    An > 0 && et && et.push(e),
    e
  );
}
function zt(e, t, n, r, s, l) {
  return hi(Me(e, t, n, r, s, l, !0));
}
function qn(e, t, n, r, s) {
  return hi(Ce(e, t, n, r, s, !0));
}
function sr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function mn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const _r = "__vInternal",
  mi = ({ key: e }) => (e != null ? e : null),
  Jn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? Ie(e) || ye(e) || ee(e)
        ? { i: xe, r: e, k: t, f: !!n }
        : e
      : null;
function Me(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  l = e === Se ? 0 : 1,
  o = !1,
  i = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mi(t),
    ref: t && Jn(t),
    scopeId: pr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: l,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: xe,
  };
  return (
    i
      ? (Ms(a, n), l & 128 && e.normalize(a))
      : n && (a.shapeFlag |= Ie(n) ? 8 : 16),
    An > 0 &&
      !o &&
      et &&
      (a.patchFlag > 0 || l & 6) &&
      a.patchFlag !== 32 &&
      et.push(a),
    a
  );
}
const Ce = Zc;
function Zc(e, t = null, n = null, r = 0, s = null, l = !1) {
  if (((!e || e === ni) && (e = Ut), sr(e))) {
    const i = nn(e, t, !0);
    return (
      n && Ms(i, n),
      An > 0 &&
        !l &&
        et &&
        (i.shapeFlag & 6 ? (et[et.indexOf(e)] = i) : et.push(i)),
      (i.patchFlag |= -2),
      i
    );
  }
  if ((cu(e) && (e = e.__vccOpts), t)) {
    t = zc(t);
    let { class: i, style: a } = t;
    i && !Ie(i) && (t.class = ir(i)),
      _e(a) && (Do(a) && !J(a) && (a = He({}, a)), (t.style = hs(a)));
  }
  const o = Ie(e) ? 1 : bc(e) ? 128 : Jc(e) ? 64 : _e(e) ? 4 : ee(e) ? 2 : 0;
  return Me(e, t, n, r, s, o, l, !0);
}
function zc(e) {
  return e ? (Do(e) || _r in e ? He({}, e) : e) : null;
}
function nn(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: l, children: o } = e,
    i = t ? eu(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && mi(i),
    ref:
      t && t.ref ? (n && s ? (J(s) ? s.concat(Jn(t)) : [s, Jn(t)]) : Jn(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Se ? (l === -1 ? 16 : l | 16) : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && nn(e.ssContent),
    ssFallback: e.ssFallback && nn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
  };
}
function Ss(e = " ", t = 0) {
  return Ce(Ht, null, e, t);
}
function Ze(e) {
  return e == null || typeof e == "boolean"
    ? Ce(Ut)
    : J(e)
    ? Ce(Se, null, e.slice())
    : typeof e == "object"
    ? vt(e)
    : Ce(Ht, null, String(e));
}
function vt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : nn(e);
}
function Ms(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (J(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Ms(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(_r in t)
        ? (t._ctx = xe)
        : s === 3 &&
          xe &&
          (xe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    ee(t)
      ? ((t = { default: t, _ctx: xe }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Ss(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function eu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = ir([t.class, r.class]));
      else if (s === "style") t.style = hs([t.style, r.style]);
      else if (Sn(s)) {
        const l = t[s],
          o = r[s];
        o &&
          l !== o &&
          !(J(l) && l.includes(o)) &&
          (t[s] = l ? [].concat(l, o) : o);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function Xe(e, t, n, r = null) {
  nt(e, t, 7, [n, r]);
}
const tu = ui();
let nu = 0;
function ru(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || tu,
    l = {
      uid: nu++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Io(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: oi(r, s),
      emitsOptions: Go(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ge,
      inheritAttrs: r.inheritAttrs,
      ctx: ge,
      data: ge,
      props: ge,
      attrs: ge,
      slots: ge,
      refs: ge,
      setupState: ge,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (l.ctx = { _: l }),
    (l.root = t ? t.root : l),
    (l.emit = fc.bind(null, l)),
    e.ce && e.ce(l),
    l
  );
}
let Ae = null;
const Pt = () => Ae || xe,
  rn = (e) => {
    (Ae = e), e.scope.on();
  },
  Dt = () => {
    Ae && Ae.scope.off(), (Ae = null);
  };
function pi(e) {
  return e.vnode.shapeFlag & 4;
}
let Nn = !1;
function su(e, t = !1) {
  Nn = t;
  const { props: n, children: r } = e.vnode,
    s = pi(e);
  Hc(e, n, s, t), jc(e, r);
  const l = s ? lu(e, t) : void 0;
  return (Nn = !1), l;
}
function lu(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = tn(new Proxy(e.ctx, Sc)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? iu(e) : null);
    rn(e), un();
    const l = kt(r, e, 0, [e.props, s]);
    if ((fn(), Dt(), vo(l))) {
      if ((l.then(Dt, Dt), t))
        return l
          .then((o) => {
            ml(e, o, t);
          })
          .catch((o) => {
            dr(o, e, 0);
          });
      e.asyncDep = l;
    } else ml(e, l, t);
  } else gi(e, t);
}
function ml(e, t, n) {
  ee(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : _e(t) && (e.setupState = jo(t)),
    gi(e, n);
}
let pl;
function gi(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && pl && !r.render) {
      const s = r.template || Ns(e).template;
      if (s) {
        const { isCustomElement: l, compilerOptions: o } = e.appContext.config,
          { delimiters: i, compilerOptions: a } = r,
          f = He(He({ isCustomElement: l, delimiters: i }, o), a);
        r.render = pl(s, f);
      }
    }
    e.render = r.render || tt;
  }
  rn(e), un(), Mc(e), fn(), Dt();
}
function ou(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Ye(e, "get", "$attrs"), t[n];
    },
  });
}
function iu(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = ou(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Fs(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(jo(tn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in yn) return yn[n](e);
        },
        has(t, n) {
          return n in t || n in yn;
        },
      }))
    );
}
function au(e, t = !0) {
  return ee(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function cu(e) {
  return ee(e) && "__vccOpts" in e;
}
const be = (e, t) => lc(e, t, Nn);
function br(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? _e(t) && !J(t)
      ? sr(t)
        ? Ce(e, null, [t])
        : Ce(e, t)
      : Ce(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && sr(n) && (n = [n]),
      Ce(e, t, n));
}
const uu = Symbol(""),
  fu = () => qe(uu),
  _i = "3.2.45",
  du = "http://www.w3.org/2000/svg",
  Ft = typeof document < "u" ? document : null,
  gl = Ft && Ft.createElement("template"),
  hu = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? Ft.createElementNS(du, e)
        : Ft.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => Ft.createTextNode(e),
    createComment: (e) => Ft.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ft.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, l) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === l || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === l || !(s = s.nextSibling));

        );
      else {
        gl.innerHTML = r ? `<svg>${e}</svg>` : e;
        const i = gl.content;
        if (r) {
          const a = i.firstChild;
          for (; a.firstChild; ) i.appendChild(a.firstChild);
          i.removeChild(a);
        }
        t.insertBefore(i, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function mu(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function pu(e, t, n) {
  const r = e.style,
    s = Ie(n);
  if (n && !s) {
    for (const l in n) qr(r, l, n[l]);
    if (t && !Ie(t)) for (const l in t) n[l] == null && qr(r, l, "");
  } else {
    const l = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = l);
  }
}
const _l = /\s*!important$/;
function qr(e, t, n) {
  if (J(n)) n.forEach((r) => qr(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = gu(e, t);
    _l.test(n)
      ? e.setProperty(cn(r), n.replace(_l, ""), "important")
      : (e[r] = n);
  }
}
const bl = ["Webkit", "Moz", "ms"],
  Nr = {};
function gu(e, t) {
  const n = Nr[t];
  if (n) return n;
  let r = ut(t);
  if (r !== "filter" && r in e) return (Nr[t] = r);
  r = ur(r);
  for (let s = 0; s < bl.length; s++) {
    const l = bl[s] + r;
    if (l in e) return (Nr[t] = l);
  }
  return t;
}
const yl = "http://www.w3.org/1999/xlink";
function _u(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(yl, t.slice(6, t.length))
      : e.setAttributeNS(yl, t, n);
  else {
    const l = ga(t);
    n == null || (l && !bo(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, l ? "" : n);
  }
}
function bu(e, t, n, r, s, l, o) {
  if (t === "innerHTML" || t === "textContent") {
    r && o(r, s, l), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const a = n == null ? "" : n;
    (e.value !== a || e.tagName === "OPTION") && (e.value = a),
      n == null && e.removeAttribute(t);
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = bo(n))
      : n == null && a === "string"
      ? ((n = ""), (i = !0))
      : a === "number" && ((n = 0), (i = !0));
  }
  try {
    e[t] = n;
  } catch {}
  i && e.removeAttribute(t);
}
function yu(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Eu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function vu(e, t, n, r, s = null) {
  const l = e._vei || (e._vei = {}),
    o = l[t];
  if (r && o) o.value = r;
  else {
    const [i, a] = Tu(t);
    if (r) {
      const f = (l[t] = Iu(r, s));
      yu(e, i, f, a);
    } else o && (Eu(e, i, o, a), (l[t] = void 0));
  }
}
const El = /(?:Once|Passive|Capture)$/;
function Tu(e) {
  let t;
  if (El.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(El)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : cn(e.slice(2)), t];
}
let Rr = 0;
const Cu = Promise.resolve(),
  Lu = () => Rr || (Cu.then(() => (Rr = 0)), (Rr = Date.now()));
function Iu(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    nt(ku(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Lu()), n;
}
function ku(e, t) {
  if (J(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const vl = /^on[a-z]/,
  Ou = (e, t, n, r, s = !1, l, o, i, a) => {
    t === "class"
      ? mu(e, r, s)
      : t === "style"
      ? pu(e, n, r)
      : Sn(t)
      ? ms(t) || vu(e, t, n, r, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Pu(e, t, r, s)
        )
      ? bu(e, t, r, l, o, i, a)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        _u(e, t, r, s));
  };
function Pu(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && vl.test(t) && ee(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (vl.test(t) && Ie(n))
    ? !1
    : t in e;
}
const bi = He({ patchProp: Ou }, hu);
let vn,
  Tl = !1;
function wu() {
  return vn || (vn = Gc(bi));
}
function Au() {
  return (vn = Tl ? vn : Xc(bi)), (Tl = !0), vn;
}
const Nu = (...e) => {
    const t = wu().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = yi(r);
        if (!s) return;
        const l = t._component;
        !ee(l) && !l.render && !l.template && (l.template = s.innerHTML),
          (s.innerHTML = "");
        const o = n(s, !1, s instanceof SVGElement);
        return (
          s instanceof Element &&
            (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
          o
        );
      }),
      t
    );
  },
  Ru = (...e) => {
    const t = Au().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = yi(r);
        if (s) return n(s, !0, s instanceof SVGElement);
      }),
      t
    );
  };
function yi(e) {
  return Ie(e) ? document.querySelector(e) : e;
}
var Su = !1;
/*!
 * pinia v2.0.26
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ let Ei;
const yr = (e) => (Ei = e),
  vi = Symbol();
function Jr(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var Tn;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(Tn || (Tn = {}));
function Mu() {
  const e = bs(!0),
    t = e.run(() => ke({}));
  let n = [],
    r = [];
  const s = tn({
    install(l) {
      yr(s),
        (s._a = l),
        l.provide(vi, s),
        (l.config.globalProperties.$pinia = s),
        r.forEach((o) => n.push(o)),
        (r = []);
    },
    use(l) {
      return !this._a && !Su ? r.push(l) : n.push(l), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return s;
}
const Ti = () => {};
function Cl(e, t, n, r = Ti) {
  e.push(t);
  const s = () => {
    const l = e.indexOf(t);
    l > -1 && (e.splice(l, 1), r());
  };
  return !n && Ia() && ka(s), s;
}
function Bt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
function Qr(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, r) => e.set(r, n)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const r = t[n],
      s = e[n];
    Jr(s) && Jr(r) && e.hasOwnProperty(n) && !ye(r) && !It(r)
      ? (e[n] = Qr(s, r))
      : (e[n] = r);
  }
  return e;
}
const Fu = Symbol();
function xu(e) {
  return !Jr(e) || !e.hasOwnProperty(Fu);
}
const { assign: Tt } = Object;
function Du(e) {
  return !!(ye(e) && e.effect);
}
function $u(e, t, n, r) {
  const { state: s, actions: l, getters: o } = t,
    i = n.state.value[e];
  let a;
  function f() {
    i || (n.state.value[e] = s ? s() : {});
    const d = tc(n.state.value[e]);
    return Tt(
      d,
      l,
      Object.keys(o || {}).reduce(
        (g, h) => (
          (g[h] = tn(
            be(() => {
              yr(n);
              const _ = n._s.get(e);
              return o[h].call(_, _);
            })
          )),
          g
        ),
        {}
      )
    );
  }
  return (
    (a = Ci(e, f, t, n, r, !0)),
    (a.$reset = function () {
      const g = s ? s() : {};
      this.$patch((h) => {
        Tt(h, g);
      });
    }),
    a
  );
}
function Ci(e, t, n = {}, r, s, l) {
  let o;
  const i = Tt({ actions: {} }, n),
    a = { deep: !0 };
  let f,
    d,
    g = tn([]),
    h = tn([]),
    _;
  const E = r.state.value[e];
  !l && !E && (r.state.value[e] = {}), ke({});
  let O;
  function N(w) {
    let F;
    (f = d = !1),
      typeof w == "function"
        ? (w(r.state.value[e]),
          (F = { type: Tn.patchFunction, storeId: e, events: _ }))
        : (Qr(r.state.value[e], w),
          (F = { type: Tn.patchObject, payload: w, storeId: e, events: _ }));
    const K = (O = Symbol());
    hr().then(() => {
      O === K && (f = !0);
    }),
      (d = !0),
      Bt(g, F, r.state.value[e]);
  }
  const m = Ti;
  function y() {
    o.stop(), (g = []), (h = []), r._s.delete(e);
  }
  function T(w, F) {
    return function () {
      yr(r);
      const K = Array.from(arguments),
        Y = [],
        G = [];
      function de(ie) {
        Y.push(ie);
      }
      function ne(ie) {
        G.push(ie);
      }
      Bt(h, { args: K, name: w, store: I, after: de, onError: ne });
      let j;
      try {
        j = F.apply(this && this.$id === e ? this : I, K);
      } catch (ie) {
        throw (Bt(G, ie), ie);
      }
      return j instanceof Promise
        ? j
            .then((ie) => (Bt(Y, ie), ie))
            .catch((ie) => (Bt(G, ie), Promise.reject(ie)))
        : (Bt(Y, j), j);
    };
  }
  const L = {
      _p: r,
      $id: e,
      $onAction: Cl.bind(null, h),
      $patch: N,
      $reset: m,
      $subscribe(w, F = {}) {
        const K = Cl(g, w, F.detached, () => Y()),
          Y = o.run(() =>
            mt(
              () => r.state.value[e],
              (G) => {
                (F.flush === "sync" ? d : f) &&
                  w({ storeId: e, type: Tn.direct, events: _ }, G);
              },
              Tt({}, a, F)
            )
          );
        return K;
      },
      $dispose: y,
    },
    I = dn(L);
  r._s.set(e, I);
  const S = r._e.run(() => ((o = bs()), o.run(() => t())));
  for (const w in S) {
    const F = S[w];
    if ((ye(F) && !Du(F)) || It(F))
      l ||
        (E && xu(F) && (ye(F) ? (F.value = E[w]) : Qr(F, E[w])),
        (r.state.value[e][w] = F));
    else if (typeof F == "function") {
      const K = T(w, F);
      (S[w] = K), (i.actions[w] = F);
    }
  }
  return (
    Tt(I, S),
    Tt(fe(I), S),
    Object.defineProperty(I, "$state", {
      get: () => r.state.value[e],
      set: (w) => {
        N((F) => {
          Tt(F, w);
        });
      },
    }),
    r._p.forEach((w) => {
      Tt(
        I,
        o.run(() => w({ store: I, app: r._a, pinia: r, options: i }))
      );
    }),
    E && l && n.hydrate && n.hydrate(I.$state, E),
    (f = !0),
    (d = !0),
    I
  );
}
function Hu(e, t, n) {
  let r, s;
  const l = typeof t == "function";
  typeof e == "string" ? ((r = e), (s = l ? n : t)) : ((s = e), (r = e.id));
  function o(i, a) {
    const f = Pt();
    return (
      (i = i || (f && qe(vi))),
      i && yr(i),
      (i = Ei),
      i._s.has(r) || (l ? Ci(r, t, s, i) : $u(r, s, i)),
      i._s.get(r)
    );
  }
  return (o.$id = r), o;
}
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const Kt = typeof window < "u";
function Uu(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const he = Object.assign;
function Sr(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = rt(s) ? s.map(e) : e(s);
  }
  return n;
}
const Cn = () => {},
  rt = Array.isArray,
  Wu = /\/$/,
  ju = (e) => e.replace(Wu, "");
function Mr(e, t, n = "/") {
  let r,
    s = {},
    l = "",
    o = "";
  const i = t.indexOf("#");
  let a = t.indexOf("?");
  return (
    i < a && i >= 0 && (a = -1),
    a > -1 &&
      ((r = t.slice(0, a)),
      (l = t.slice(a + 1, i > -1 ? i : t.length)),
      (s = e(l))),
    i > -1 && ((r = r || t.slice(0, i)), (o = t.slice(i, t.length))),
    (r = Yu(r != null ? r : t, n)),
    { fullPath: r + (l && "?") + l + o, path: r, query: s, hash: o }
  );
}
function Bu(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ll(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Vu(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    sn(t.matched[r], n.matched[s]) &&
    Li(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function sn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Li(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Ku(e[n], t[n])) return !1;
  return !0;
}
function Ku(e, t) {
  return rt(e) ? Il(e, t) : rt(t) ? Il(t, e) : e === t;
}
function Il(e, t) {
  return rt(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Yu(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/");
  let s = n.length - 1,
    l,
    o;
  for (l = 0; l < r.length; l++)
    if (((o = r[l]), o !== "."))
      if (o === "..") s > 1 && s--;
      else break;
  return (
    n.slice(0, s).join("/") +
    "/" +
    r.slice(l - (l === r.length ? 1 : 0)).join("/")
  );
}
var ln;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(ln || (ln = {}));
var $t;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})($t || ($t = {}));
const Fr = "";
function Ii(e) {
  if (!e)
    if (Kt) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), ju(e);
}
const Gu = /^[^#]+#/;
function ki(e, t) {
  return e.replace(Gu, "#") + t;
}
function Xu(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Er = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function qu(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = Xu(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function kl(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Zr = new Map();
function Ju(e, t) {
  Zr.set(e, t);
}
function Qu(e) {
  const t = Zr.get(e);
  return Zr.delete(e), t;
}
let Zu = () => location.protocol + "//" + location.host;
function Oi(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    l = e.indexOf("#");
  if (l > -1) {
    let i = s.includes(e.slice(l)) ? e.slice(l).length : 1,
      a = s.slice(i);
    return a[0] !== "/" && (a = "/" + a), Ll(a, "");
  }
  return Ll(n, e) + r + s;
}
function zu(e, t, n, r) {
  let s = [],
    l = [],
    o = null;
  const i = ({ state: h }) => {
    const _ = Oi(e, location),
      E = n.value,
      O = t.value;
    let N = 0;
    if (h) {
      if (((n.value = _), (t.value = h), o && o === E)) {
        o = null;
        return;
      }
      N = O ? h.position - O.position : 0;
    } else r(_);
    s.forEach((m) => {
      m(n.value, E, {
        delta: N,
        type: ln.pop,
        direction: N ? (N > 0 ? $t.forward : $t.back) : $t.unknown,
      });
    });
  };
  function a() {
    o = n.value;
  }
  function f(h) {
    s.push(h);
    const _ = () => {
      const E = s.indexOf(h);
      E > -1 && s.splice(E, 1);
    };
    return l.push(_), _;
  }
  function d() {
    const { history: h } = window;
    !h.state || h.replaceState(he({}, h.state, { scroll: Er() }), "");
  }
  function g() {
    for (const h of l) h();
    (l = []),
      window.removeEventListener("popstate", i),
      window.removeEventListener("beforeunload", d);
  }
  return (
    window.addEventListener("popstate", i),
    window.addEventListener("beforeunload", d),
    { pauseListeners: a, listen: f, destroy: g }
  );
}
function Ol(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Er() : null,
  };
}
function ef(e) {
  const { history: t, location: n } = window,
    r = { value: Oi(e, n) },
    s = { value: t.state };
  s.value ||
    l(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function l(a, f, d) {
    const g = e.indexOf("#"),
      h =
        g > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(g)) + a
          : Zu() + e + a;
    try {
      t[d ? "replaceState" : "pushState"](f, "", h), (s.value = f);
    } catch (_) {
      console.error(_), n[d ? "replace" : "assign"](h);
    }
  }
  function o(a, f) {
    const d = he({}, t.state, Ol(s.value.back, a, s.value.forward, !0), f, {
      position: s.value.position,
    });
    l(a, d, !0), (r.value = a);
  }
  function i(a, f) {
    const d = he({}, s.value, t.state, { forward: a, scroll: Er() });
    l(d.current, d, !0);
    const g = he({}, Ol(r.value, a, null), { position: d.position + 1 }, f);
    l(a, g, !1), (r.value = a);
  }
  return { location: r, state: s, push: i, replace: o };
}
function tf(e) {
  e = Ii(e);
  const t = ef(e),
    n = zu(e, t.state, t.location, t.replace);
  function r(l, o = !0) {
    o || n.pauseListeners(), history.go(l);
  }
  const s = he(
    { location: "", base: e, go: r, createHref: ki.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function nf(e = "") {
  let t = [],
    n = [Fr],
    r = 0;
  e = Ii(e);
  function s(i) {
    r++, r === n.length || n.splice(r), n.push(i);
  }
  function l(i, a, { direction: f, delta: d }) {
    const g = { direction: f, delta: d, type: ln.pop };
    for (const h of t) h(i, a, g);
  }
  const o = {
    location: Fr,
    state: {},
    base: e,
    createHref: ki.bind(null, e),
    replace(i) {
      n.splice(r--, 1), s(i);
    },
    push(i, a) {
      s(i);
    },
    listen(i) {
      return (
        t.push(i),
        () => {
          const a = t.indexOf(i);
          a > -1 && t.splice(a, 1);
        }
      );
    },
    destroy() {
      (t = []), (n = [Fr]), (r = 0);
    },
    go(i, a = !0) {
      const f = this.location,
        d = i < 0 ? $t.back : $t.forward;
      (r = Math.max(0, Math.min(r + i, n.length - 1))),
        a && l(this.location, f, { direction: d, delta: i });
    },
  };
  return (
    Object.defineProperty(o, "location", { enumerable: !0, get: () => n[r] }), o
  );
}
function rf(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Pi(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const yt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  wi = Symbol("");
var Pl;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(Pl || (Pl = {}));
function on(e, t) {
  return he(new Error(), { type: e, [wi]: !0 }, t);
}
function ft(e, t) {
  return e instanceof Error && wi in e && (t == null || !!(e.type & t));
}
const wl = "[^/]+?",
  sf = { sensitive: !1, strict: !1, start: !0, end: !0 },
  lf = /[.+*?^${}()[\]/\\]/g;
function of(e, t) {
  const n = he({}, sf, t),
    r = [];
  let s = n.start ? "^" : "";
  const l = [];
  for (const f of e) {
    const d = f.length ? [] : [90];
    n.strict && !f.length && (s += "/");
    for (let g = 0; g < f.length; g++) {
      const h = f[g];
      let _ = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        g || (s += "/"), (s += h.value.replace(lf, "\\$&")), (_ += 40);
      else if (h.type === 1) {
        const { value: E, repeatable: O, optional: N, regexp: m } = h;
        l.push({ name: E, repeatable: O, optional: N });
        const y = m || wl;
        if (y !== wl) {
          _ += 10;
          try {
            new RegExp(`(${y})`);
          } catch (L) {
            throw new Error(
              `Invalid custom RegExp for param "${E}" (${y}): ` + L.message
            );
          }
        }
        let T = O ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`;
        g || (T = N && f.length < 2 ? `(?:/${T})` : "/" + T),
          N && (T += "?"),
          (s += T),
          (_ += 20),
          N && (_ += -8),
          O && (_ += -20),
          y === ".*" && (_ += -50);
      }
      d.push(_);
    }
    r.push(d);
  }
  if (n.strict && n.end) {
    const f = r.length - 1;
    r[f][r[f].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? (s += "$") : n.strict && (s += "(?:/|$)");
  const o = new RegExp(s, n.sensitive ? "" : "i");
  function i(f) {
    const d = f.match(o),
      g = {};
    if (!d) return null;
    for (let h = 1; h < d.length; h++) {
      const _ = d[h] || "",
        E = l[h - 1];
      g[E.name] = _ && E.repeatable ? _.split("/") : _;
    }
    return g;
  }
  function a(f) {
    let d = "",
      g = !1;
    for (const h of e) {
      (!g || !d.endsWith("/")) && (d += "/"), (g = !1);
      for (const _ of h)
        if (_.type === 0) d += _.value;
        else if (_.type === 1) {
          const { value: E, repeatable: O, optional: N } = _,
            m = E in f ? f[E] : "";
          if (rt(m) && !O)
            throw new Error(
              `Provided param "${E}" is an array but it is not repeatable (* or + modifiers)`
            );
          const y = rt(m) ? m.join("/") : m;
          if (!y)
            if (N)
              h.length < 2 &&
                (d.endsWith("/") ? (d = d.slice(0, -1)) : (g = !0));
            else throw new Error(`Missing required param "${E}"`);
          d += y;
        }
    }
    return d || "/";
  }
  return { re: o, score: r, keys: l, parse: i, stringify: a };
}
function af(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function cf(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const l = af(r[n], s[n]);
    if (l) return l;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Al(r)) return 1;
    if (Al(s)) return -1;
  }
  return s.length - r.length;
}
function Al(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const uf = { type: 0, value: "" },
  ff = /[a-zA-Z0-9_]/;
function df(e) {
  if (!e) return [[]];
  if (e === "/") return [[uf]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(_) {
    throw new Error(`ERR (${n})/"${f}": ${_}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let l;
  function o() {
    l && s.push(l), (l = []);
  }
  let i = 0,
    a,
    f = "",
    d = "";
  function g() {
    !f ||
      (n === 0
        ? l.push({ type: 0, value: f })
        : n === 1 || n === 2 || n === 3
        ? (l.length > 1 &&
            (a === "*" || a === "+") &&
            t(
              `A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`
            ),
          l.push({
            type: 1,
            value: f,
            regexp: d,
            repeatable: a === "*" || a === "+",
            optional: a === "*" || a === "?",
          }))
        : t("Invalid state to consume buffer"),
      (f = ""));
  }
  function h() {
    f += a;
  }
  for (; i < e.length; ) {
    if (((a = e[i++]), a === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        a === "/" ? (f && g(), o()) : a === ":" ? (g(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        a === "("
          ? (n = 2)
          : ff.test(a)
          ? h()
          : (g(), (n = 0), a !== "*" && a !== "?" && a !== "+" && i--);
        break;
      case 2:
        a === ")"
          ? d[d.length - 1] == "\\"
            ? (d = d.slice(0, -1) + a)
            : (n = 3)
          : (d += a);
        break;
      case 3:
        g(), (n = 0), a !== "*" && a !== "?" && a !== "+" && i--, (d = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${f}"`), g(), o(), s;
}
function hf(e, t, n) {
  const r = of(df(e.path), n),
    s = he(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function mf(e, t) {
  const n = [],
    r = new Map();
  t = Sl({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(d) {
    return r.get(d);
  }
  function l(d, g, h) {
    const _ = !h,
      E = pf(d);
    E.aliasOf = h && h.record;
    const O = Sl(t, d),
      N = [E];
    if ("alias" in d) {
      const T = typeof d.alias == "string" ? [d.alias] : d.alias;
      for (const L of T)
        N.push(
          he({}, E, {
            components: h ? h.record.components : E.components,
            path: L,
            aliasOf: h ? h.record : E,
          })
        );
    }
    let m, y;
    for (const T of N) {
      const { path: L } = T;
      if (g && L[0] !== "/") {
        const I = g.record.path,
          S = I[I.length - 1] === "/" ? "" : "/";
        T.path = g.record.path + (L && S + L);
      }
      if (
        ((m = hf(T, g, O)),
        h
          ? h.alias.push(m)
          : ((y = y || m),
            y !== m && y.alias.push(m),
            _ && d.name && !Rl(m) && o(d.name)),
        E.children)
      ) {
        const I = E.children;
        for (let S = 0; S < I.length; S++) l(I[S], m, h && h.children[S]);
      }
      (h = h || m),
        ((m.record.components && Object.keys(m.record.components).length) ||
          m.record.name ||
          m.record.redirect) &&
          a(m);
    }
    return y
      ? () => {
          o(y);
        }
      : Cn;
  }
  function o(d) {
    if (Pi(d)) {
      const g = r.get(d);
      g &&
        (r.delete(d),
        n.splice(n.indexOf(g), 1),
        g.children.forEach(o),
        g.alias.forEach(o));
    } else {
      const g = n.indexOf(d);
      g > -1 &&
        (n.splice(g, 1),
        d.record.name && r.delete(d.record.name),
        d.children.forEach(o),
        d.alias.forEach(o));
    }
  }
  function i() {
    return n;
  }
  function a(d) {
    let g = 0;
    for (
      ;
      g < n.length &&
      cf(d, n[g]) >= 0 &&
      (d.record.path !== n[g].record.path || !Ai(d, n[g]));

    )
      g++;
    n.splice(g, 0, d), d.record.name && !Rl(d) && r.set(d.record.name, d);
  }
  function f(d, g) {
    let h,
      _ = {},
      E,
      O;
    if ("name" in d && d.name) {
      if (((h = r.get(d.name)), !h)) throw on(1, { location: d });
      (O = h.record.name),
        (_ = he(
          Nl(
            g.params,
            h.keys.filter((y) => !y.optional).map((y) => y.name)
          ),
          d.params &&
            Nl(
              d.params,
              h.keys.map((y) => y.name)
            )
        )),
        (E = h.stringify(_));
    } else if ("path" in d)
      (E = d.path),
        (h = n.find((y) => y.re.test(E))),
        h && ((_ = h.parse(E)), (O = h.record.name));
    else {
      if (((h = g.name ? r.get(g.name) : n.find((y) => y.re.test(g.path))), !h))
        throw on(1, { location: d, currentLocation: g });
      (O = h.record.name),
        (_ = he({}, g.params, d.params)),
        (E = h.stringify(_));
    }
    const N = [];
    let m = h;
    for (; m; ) N.unshift(m.record), (m = m.parent);
    return { name: O, path: E, params: _, matched: N, meta: _f(N) };
  }
  return (
    e.forEach((d) => l(d)),
    {
      addRoute: l,
      resolve: f,
      removeRoute: o,
      getRoutes: i,
      getRecordMatcher: s,
    }
  );
}
function Nl(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function pf(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: gf(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function gf(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
  return t;
}
function Rl(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function _f(e) {
  return e.reduce((t, n) => he(t, n.meta), {});
}
function Sl(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Ai(e, t) {
  return t.children.some((n) => n === e || Ai(e, n));
}
const Ni = /#/g,
  bf = /&/g,
  yf = /\//g,
  Ef = /=/g,
  vf = /\?/g,
  Ri = /\+/g,
  Tf = /%5B/g,
  Cf = /%5D/g,
  Si = /%5E/g,
  Lf = /%60/g,
  Mi = /%7B/g,
  If = /%7C/g,
  Fi = /%7D/g,
  kf = /%20/g;
function xs(e) {
  return encodeURI("" + e)
    .replace(If, "|")
    .replace(Tf, "[")
    .replace(Cf, "]");
}
function Of(e) {
  return xs(e).replace(Mi, "{").replace(Fi, "}").replace(Si, "^");
}
function zr(e) {
  return xs(e)
    .replace(Ri, "%2B")
    .replace(kf, "+")
    .replace(Ni, "%23")
    .replace(bf, "%26")
    .replace(Lf, "`")
    .replace(Mi, "{")
    .replace(Fi, "}")
    .replace(Si, "^");
}
function Pf(e) {
  return zr(e).replace(Ef, "%3D");
}
function wf(e) {
  return xs(e).replace(Ni, "%23").replace(vf, "%3F");
}
function Af(e) {
  return e == null ? "" : wf(e).replace(yf, "%2F");
}
function lr(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function Nf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const l = r[s].replace(Ri, " "),
      o = l.indexOf("="),
      i = lr(o < 0 ? l : l.slice(0, o)),
      a = o < 0 ? null : lr(l.slice(o + 1));
    if (i in t) {
      let f = t[i];
      rt(f) || (f = t[i] = [f]), f.push(a);
    } else t[i] = a;
  }
  return t;
}
function Ml(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = Pf(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (rt(r) ? r.map((l) => l && zr(l)) : [r && zr(r)]).forEach((l) => {
      l !== void 0 &&
        ((t += (t.length ? "&" : "") + n), l != null && (t += "=" + l));
    });
  }
  return t;
}
function Rf(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = rt(r)
        ? r.map((s) => (s == null ? null : "" + s))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const Sf = Symbol(""),
  Fl = Symbol(""),
  Ds = Symbol(""),
  xi = Symbol(""),
  es = Symbol("");
function pn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function Ct(e, t, n, r, s) {
  const l = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((o, i) => {
      const a = (g) => {
          g === !1
            ? i(on(4, { from: n, to: t }))
            : g instanceof Error
            ? i(g)
            : rf(g)
            ? i(on(2, { from: t, to: g }))
            : (l &&
                r.enterCallbacks[s] === l &&
                typeof g == "function" &&
                l.push(g),
              o());
        },
        f = e.call(r && r.instances[s], t, n, a);
      let d = Promise.resolve(f);
      e.length < 3 && (d = d.then(a)), d.catch((g) => i(g));
    });
}
function xr(e, t, n, r) {
  const s = [];
  for (const l of e)
    for (const o in l.components) {
      let i = l.components[o];
      if (!(t !== "beforeRouteEnter" && !l.instances[o]))
        if (Mf(i)) {
          const f = (i.__vccOpts || i)[t];
          f && s.push(Ct(f, n, r, l, o));
        } else {
          let a = i();
          s.push(() =>
            a.then((f) => {
              if (!f)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${o}" at "${l.path}"`)
                );
              const d = Uu(f) ? f.default : f;
              l.components[o] = d;
              const h = (d.__vccOpts || d)[t];
              return h && Ct(h, n, r, l, o)();
            })
          );
        }
    }
  return s;
}
function Mf(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function xl(e) {
  const t = qe(Ds),
    n = qe(xi),
    r = be(() => t.resolve(Ke(e.to))),
    s = be(() => {
      const { matched: a } = r.value,
        { length: f } = a,
        d = a[f - 1],
        g = n.matched;
      if (!d || !g.length) return -1;
      const h = g.findIndex(sn.bind(null, d));
      if (h > -1) return h;
      const _ = Dl(a[f - 2]);
      return f > 1 && Dl(d) === _ && g[g.length - 1].path !== _
        ? g.findIndex(sn.bind(null, a[f - 2]))
        : h;
    }),
    l = be(() => s.value > -1 && $f(n.params, r.value.params)),
    o = be(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        Li(n.params, r.value.params)
    );
  function i(a = {}) {
    return Df(a)
      ? t[Ke(e.replace) ? "replace" : "push"](Ke(e.to)).catch(Cn)
      : Promise.resolve();
  }
  return {
    route: r,
    href: be(() => r.value.href),
    isActive: l,
    isExactActive: o,
    navigate: i,
  };
}
const Ff = Wt({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: xl,
    setup(e, { slots: t }) {
      const n = dn(xl(e)),
        { options: r } = qe(Ds),
        s = be(() => ({
          [$l(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [$l(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const l = t.default && t.default(n);
        return e.custom
          ? l
          : br(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              l
            );
      };
    },
  }),
  xf = Ff;
function Df(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function $f(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == "string") {
      if (r !== s) return !1;
    } else if (!rt(s) || s.length !== r.length || r.some((l, o) => l !== s[o]))
      return !1;
  }
  return !0;
}
function Dl(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const $l = (e, t, n) => (e != null ? e : t != null ? t : n),
  Hf = Wt({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = qe(es),
        s = be(() => e.route || r.value),
        l = qe(Fl, 0),
        o = be(() => {
          let f = Ke(l);
          const { matched: d } = s.value;
          let g;
          for (; (g = d[f]) && !g.components; ) f++;
          return f;
        }),
        i = be(() => s.value.matched[o.value]);
      Gn(
        Fl,
        be(() => o.value + 1)
      ),
        Gn(Sf, i),
        Gn(es, s);
      const a = ke();
      return (
        mt(
          () => [a.value, i.value, e.name],
          ([f, d, g], [h, _, E]) => {
            d &&
              ((d.instances[g] = f),
              _ &&
                _ !== d &&
                f &&
                f === h &&
                (d.leaveGuards.size || (d.leaveGuards = _.leaveGuards),
                d.updateGuards.size || (d.updateGuards = _.updateGuards))),
              f &&
                d &&
                (!_ || !sn(d, _) || !h) &&
                (d.enterCallbacks[g] || []).forEach((O) => O(f));
          },
          { flush: "post" }
        ),
        () => {
          const f = s.value,
            d = e.name,
            g = i.value,
            h = g && g.components[d];
          if (!h) return Hl(n.default, { Component: h, route: f });
          const _ = g.props[d],
            E = _
              ? _ === !0
                ? f.params
                : typeof _ == "function"
                ? _(f)
                : _
              : null,
            N = br(
              h,
              he({}, E, t, {
                onVnodeUnmounted: (m) => {
                  m.component.isUnmounted && (g.instances[d] = null);
                },
                ref: a,
              })
            );
          return Hl(n.default, { Component: N, route: f }) || N;
        }
      );
    },
  });
function Hl(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Di = Hf;
function Uf(e) {
  const t = mf(e.routes, e),
    n = e.parseQuery || Nf,
    r = e.stringifyQuery || Ml,
    s = e.history,
    l = pn(),
    o = pn(),
    i = pn(),
    a = Uo(yt);
  let f = yt;
  Kt &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const d = Sr.bind(null, (R) => "" + R),
    g = Sr.bind(null, Af),
    h = Sr.bind(null, lr);
  function _(R, H) {
    let $, B;
    return (
      Pi(R) ? (($ = t.getRecordMatcher(R)), (B = H)) : (B = R), t.addRoute(B, $)
    );
  }
  function E(R) {
    const H = t.getRecordMatcher(R);
    H && t.removeRoute(H);
  }
  function O() {
    return t.getRoutes().map((R) => R.record);
  }
  function N(R) {
    return !!t.getRecordMatcher(R);
  }
  function m(R, H) {
    if (((H = he({}, H || a.value)), typeof R == "string")) {
      const p = Mr(n, R, H.path),
        c = t.resolve({ path: p.path }, H),
        u = s.createHref(p.fullPath);
      return he(p, c, {
        params: h(c.params),
        hash: lr(p.hash),
        redirectedFrom: void 0,
        href: u,
      });
    }
    let $;
    if ("path" in R) $ = he({}, R, { path: Mr(n, R.path, H.path).path });
    else {
      const p = he({}, R.params);
      for (const c in p) p[c] == null && delete p[c];
      ($ = he({}, R, { params: g(R.params) })), (H.params = g(H.params));
    }
    const B = t.resolve($, H),
      Z = R.hash || "";
    B.params = d(h(B.params));
    const ae = Bu(r, he({}, R, { hash: Of(Z), path: B.path })),
      X = s.createHref(ae);
    return he(
      { fullPath: ae, hash: Z, query: r === Ml ? Rf(R.query) : R.query || {} },
      B,
      { redirectedFrom: void 0, href: X }
    );
  }
  function y(R) {
    return typeof R == "string" ? Mr(n, R, a.value.path) : he({}, R);
  }
  function T(R, H) {
    if (f !== R) return on(8, { from: H, to: R });
  }
  function L(R) {
    return w(R);
  }
  function I(R) {
    return L(he(y(R), { replace: !0 }));
  }
  function S(R) {
    const H = R.matched[R.matched.length - 1];
    if (H && H.redirect) {
      const { redirect: $ } = H;
      let B = typeof $ == "function" ? $(R) : $;
      return (
        typeof B == "string" &&
          ((B = B.includes("?") || B.includes("#") ? (B = y(B)) : { path: B }),
          (B.params = {})),
        he(
          { query: R.query, hash: R.hash, params: "path" in B ? {} : R.params },
          B
        )
      );
    }
  }
  function w(R, H) {
    const $ = (f = m(R)),
      B = a.value,
      Z = R.state,
      ae = R.force,
      X = R.replace === !0,
      p = S($);
    if (p)
      return w(
        he(y(p), {
          state: typeof p == "object" ? he({}, Z, p.state) : Z,
          force: ae,
          replace: X,
        }),
        H || $
      );
    const c = $;
    c.redirectedFrom = H;
    let u;
    return (
      !ae &&
        Vu(r, B, $) &&
        ((u = on(16, { to: c, from: B })), je(B, B, !0, !1)),
      (u ? Promise.resolve(u) : K(c, B))
        .catch((b) => (ft(b) ? (ft(b, 2) ? b : we(b)) : te(b, c, B)))
        .then((b) => {
          if (b) {
            if (ft(b, 2))
              return w(
                he({ replace: X }, y(b.to), {
                  state: typeof b.to == "object" ? he({}, Z, b.to.state) : Z,
                  force: ae,
                }),
                H || c
              );
          } else b = G(c, B, !0, X, Z);
          return Y(c, B, b), b;
        })
    );
  }
  function F(R, H) {
    const $ = T(R, H);
    return $ ? Promise.reject($) : Promise.resolve();
  }
  function K(R, H) {
    let $;
    const [B, Z, ae] = Wf(R, H);
    $ = xr(B.reverse(), "beforeRouteLeave", R, H);
    for (const p of B)
      p.leaveGuards.forEach((c) => {
        $.push(Ct(c, R, H));
      });
    const X = F.bind(null, R, H);
    return (
      $.push(X),
      Vt($)
        .then(() => {
          $ = [];
          for (const p of l.list()) $.push(Ct(p, R, H));
          return $.push(X), Vt($);
        })
        .then(() => {
          $ = xr(Z, "beforeRouteUpdate", R, H);
          for (const p of Z)
            p.updateGuards.forEach((c) => {
              $.push(Ct(c, R, H));
            });
          return $.push(X), Vt($);
        })
        .then(() => {
          $ = [];
          for (const p of R.matched)
            if (p.beforeEnter && !H.matched.includes(p))
              if (rt(p.beforeEnter))
                for (const c of p.beforeEnter) $.push(Ct(c, R, H));
              else $.push(Ct(p.beforeEnter, R, H));
          return $.push(X), Vt($);
        })
        .then(
          () => (
            R.matched.forEach((p) => (p.enterCallbacks = {})),
            ($ = xr(ae, "beforeRouteEnter", R, H)),
            $.push(X),
            Vt($)
          )
        )
        .then(() => {
          $ = [];
          for (const p of o.list()) $.push(Ct(p, R, H));
          return $.push(X), Vt($);
        })
        .catch((p) => (ft(p, 8) ? p : Promise.reject(p)))
    );
  }
  function Y(R, H, $) {
    for (const B of i.list()) B(R, H, $);
  }
  function G(R, H, $, B, Z) {
    const ae = T(R, H);
    if (ae) return ae;
    const X = H === yt,
      p = Kt ? history.state : {};
    $ &&
      (B || X
        ? s.replace(R.fullPath, he({ scroll: X && p && p.scroll }, Z))
        : s.push(R.fullPath, Z)),
      (a.value = R),
      je(R, H, $, X),
      we();
  }
  let de;
  function ne() {
    de ||
      (de = s.listen((R, H, $) => {
        if (!Qe.listening) return;
        const B = m(R),
          Z = S(B);
        if (Z) {
          w(he(Z, { replace: !0 }), B).catch(Cn);
          return;
        }
        f = B;
        const ae = a.value;
        Kt && Ju(kl(ae.fullPath, $.delta), Er()),
          K(B, ae)
            .catch((X) =>
              ft(X, 12)
                ? X
                : ft(X, 2)
                ? (w(X.to, B)
                    .then((p) => {
                      ft(p, 20) &&
                        !$.delta &&
                        $.type === ln.pop &&
                        s.go(-1, !1);
                    })
                    .catch(Cn),
                  Promise.reject())
                : ($.delta && s.go(-$.delta, !1), te(X, B, ae))
            )
            .then((X) => {
              (X = X || G(B, ae, !1)),
                X &&
                  ($.delta && !ft(X, 8)
                    ? s.go(-$.delta, !1)
                    : $.type === ln.pop && ft(X, 20) && s.go(-1, !1)),
                Y(B, ae, X);
            })
            .catch(Cn);
      }));
  }
  let j = pn(),
    ie = pn(),
    Q;
  function te(R, H, $) {
    we(R);
    const B = ie.list();
    return (
      B.length ? B.forEach((Z) => Z(R, H, $)) : console.error(R),
      Promise.reject(R)
    );
  }
  function re() {
    return Q && a.value !== yt
      ? Promise.resolve()
      : new Promise((R, H) => {
          j.add([R, H]);
        });
  }
  function we(R) {
    return (
      Q ||
        ((Q = !R),
        ne(),
        j.list().forEach(([H, $]) => (R ? $(R) : H())),
        j.reset()),
      R
    );
  }
  function je(R, H, $, B) {
    const { scrollBehavior: Z } = e;
    if (!Kt || !Z) return Promise.resolve();
    const ae =
      (!$ && Qu(kl(R.fullPath, 0))) ||
      ((B || !$) && history.state && history.state.scroll) ||
      null;
    return hr()
      .then(() => Z(R, H, ae))
      .then((X) => X && qu(X))
      .catch((X) => te(X, R, H));
  }
  const Re = (R) => s.go(R);
  let Te;
  const Je = new Set(),
    Qe = {
      currentRoute: a,
      listening: !0,
      addRoute: _,
      removeRoute: E,
      hasRoute: N,
      getRoutes: O,
      resolve: m,
      options: e,
      push: L,
      replace: I,
      go: Re,
      back: () => Re(-1),
      forward: () => Re(1),
      beforeEach: l.add,
      beforeResolve: o.add,
      afterEach: i.add,
      onError: ie.add,
      isReady: re,
      install(R) {
        const H = this;
        R.component("RouterLink", xf),
          R.component("RouterView", Di),
          (R.config.globalProperties.$router = H),
          Object.defineProperty(R.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Ke(a),
          }),
          Kt &&
            !Te &&
            a.value === yt &&
            ((Te = !0), L(s.location).catch((Z) => {}));
        const $ = {};
        for (const Z in yt) $[Z] = be(() => a.value[Z]);
        R.provide(Ds, H), R.provide(xi, dn($)), R.provide(es, a);
        const B = R.unmount;
        Je.add(R),
          (R.unmount = function () {
            Je.delete(R),
              Je.size < 1 &&
                ((f = yt),
                de && de(),
                (de = null),
                (a.value = yt),
                (Te = !1),
                (Q = !1)),
              B();
          });
      },
    };
  return Qe;
}
function Vt(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function Wf(e, t) {
  const n = [],
    r = [],
    s = [],
    l = Math.max(t.matched.length, e.matched.length);
  for (let o = 0; o < l; o++) {
    const i = t.matched[o];
    i && (e.matched.find((f) => sn(f, i)) ? r.push(i) : n.push(i));
    const a = e.matched[o];
    a && (t.matched.find((f) => sn(f, a)) || s.push(a));
  }
  return [n, r, s];
}
function ts(e, t = {}, n) {
  for (const r in e) {
    const s = e[r],
      l = n ? `${n}:${r}` : r;
    typeof s == "object" && s !== null
      ? ts(s, t, l)
      : typeof s == "function" && (t[l] = s);
  }
  return t;
}
function jf(e, t) {
  return e.reduce(
    (n, r) => n.then(() => r.apply(void 0, t)),
    Promise.resolve()
  );
}
function Bf(e, t) {
  return Promise.all(e.map((n) => n.apply(void 0, t)));
}
function Dr(e, t) {
  for (const n of e) n(t);
}
class Vf {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != "function") return () => {};
    const s = t;
    let l;
    for (; this._deprecatedHooks[t]; )
      (l = this._deprecatedHooks[t]), (t = l.to);
    if (l && !r.allowDeprecated) {
      let o = l.message;
      o ||
        (o =
          `${s} hook has been deprecated` +
          (l.to ? `, please use ${l.to}` : "")),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(o) ||
          (console.warn(o), this._deprecatedMessages.add(o));
    }
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let r,
      s = (...l) => (
        typeof r == "function" && r(), (r = void 0), (s = void 0), n(...l)
      );
    return (r = this.hook(t, s)), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const r = this._hooks[t] || [];
    this._hooks[t] = void 0;
    for (const s of r) this.hook(t, s);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = ts(t),
      r = Object.keys(n).map((s) => this.hook(s, n[s]));
    return () => {
      for (const s of r.splice(0, r.length)) s();
    };
  }
  removeHooks(t) {
    const n = ts(t);
    for (const r in n) this.removeHook(r, n[r]);
  }
  callHook(t, ...n) {
    return this.callHookWith(jf, t, ...n);
  }
  callHookParallel(t, ...n) {
    return this.callHookWith(Bf, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const s =
      this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && Dr(this._before, s);
    const l = t(this._hooks[n] || [], r);
    return l instanceof Promise
      ? l.finally(() => {
          this._after && s && Dr(this._after, s);
        })
      : (this._after && s && Dr(this._after, s), l);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        const n = this._before.indexOf(t);
        n !== -1 && this._before.splice(n, 1);
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        const n = this._after.indexOf(t);
        n !== -1 && this._after.splice(n, 1);
      }
    );
  }
}
function Kf() {
  return new Vf();
}
const Yf = ["script", "style", "noscript"],
  Gf = ["base", "meta", "link", "style", "script", "noscript"],
  Xf = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function qf(e, t) {
  const { props: n, tag: r } = e;
  if (Xf.includes(r)) return r;
  if (r === "link" && n.rel === "canonical") return "canonical";
  if (n.charset) return "charset";
  const s = ["id"];
  r === "meta" && s.push("name", "property", "http-equiv");
  for (const l of s)
    if (typeof n[l] < "u") {
      const o = String(n[l]);
      return t && !t(o) ? !1 : `${r}:${l}:${o}`;
    }
  return !1;
}
const Bn = (e, t) => {
  const { tag: n, $el: r } = e;
  !r ||
    (Object.entries(n.props).forEach(([s, l]) => {
      l = String(l);
      const o = `attr:${s}`;
      if (s === "class") {
        if (!l) return;
        for (const i of l.split(" ")) {
          const a = `${o}:${i}`;
          t && t(e, a, () => r.classList.remove(i)),
            r.classList.contains(i) || r.classList.add(i);
        }
        return;
      }
      t && !s.startsWith("data-h-") && t(e, o, () => r.removeAttribute(s)),
        r.getAttribute(s) !== l && r.setAttribute(s, l);
    }),
    Yf.includes(n.tag) &&
      r.innerHTML !== (n.children || "") &&
      (r.innerHTML = n.children || ""));
};
function $s(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function $i(e, t = {}) {
  var d, g;
  const n = { shouldRender: !0 };
  if ((await e.hooks.callHook("dom:beforeRender", n), !n.shouldRender)) return;
  const r = t.document || window.document,
    s = e._popSideEffectQueue();
  e.headEntries()
    .map((h) => h._sde)
    .forEach((h) => {
      Object.entries(h).forEach(([_, E]) => {
        s[_] = E;
      });
    });
  const l = async (h) => {
      const _ = e.headEntries().find((O) => O._i === h._e),
        E = {
          renderId:
            h._d || $s(JSON.stringify({ ...h, _e: void 0, _p: void 0 })),
          $el: null,
          shouldRender: !0,
          tag: h,
          entry: _,
          staleSideEffects: s,
        };
      return await e.hooks.callHook("dom:beforeRenderTag", E), E;
    },
    o = [],
    i = { body: [], head: [] },
    a = (h, _, E) => {
      (_ = `${h.renderId}:${_}`), h.entry && (h.entry._sde[_] = E), delete s[_];
    },
    f = (h) => {
      (e._elMap[h.renderId] = h.$el),
        o.push(h),
        a(h, "el", () => {
          var _;
          (_ = h.$el) == null || _.remove(), delete e._elMap[h.renderId];
        });
    };
  for (const h of await e.resolveTags()) {
    const _ = await l(h);
    if (!_.shouldRender) continue;
    const { tag: E } = _;
    if (E.tag === "title") {
      (r.title = E.children || ""), o.push(_);
      continue;
    }
    if (E.tag === "htmlAttrs" || E.tag === "bodyAttrs") {
      (_.$el = r[E.tag === "htmlAttrs" ? "documentElement" : "body"]),
        Bn(_, a),
        o.push(_);
      continue;
    }
    if (
      ((_.$el = e._elMap[_.renderId]),
      !_.$el &&
        E._hash &&
        (_.$el = r.querySelector(
          `${
            (d = E.tagPosition) != null && d.startsWith("body")
              ? "body"
              : "head"
          } > ${E.tag}[data-h-${E._hash}]`
        )),
      _.$el)
    ) {
      _.tag._d && Bn(_), f(_);
      continue;
    }
    (_.$el = r.createElement(E.tag)),
      Bn(_),
      i[
        (g = E.tagPosition) != null && g.startsWith("body") ? "body" : "head"
      ].push(_);
  }
  Object.entries(i).forEach(([h, _]) => {
    if (!!_.length) {
      for (const E of [...r[h].children].reverse()) {
        const O = E.tagName.toLowerCase();
        if (!Gf.includes(O)) continue;
        const N = qf({
            tag: O,
            props: E.getAttributeNames().reduce(
              (y, T) => ({ ...y, [T]: E.getAttribute(T) }),
              {}
            ),
          }),
          m = _.findIndex((y) => y && (y.tag._d === N || E.isEqualNode(y.$el)));
        if (m !== -1) {
          const y = _[m];
          (y.$el = E), Bn(y), f(y), delete _[m];
        }
      }
      _.forEach((E) => {
        if (!!E.$el) {
          switch (E.tag.tagPosition) {
            case "bodyClose":
              r.body.appendChild(E.$el);
              break;
            case "bodyOpen":
              r.body.insertBefore(E.$el, r.body.firstChild);
              break;
            case "head":
            default:
              r.head.appendChild(E.$el);
              break;
          }
          f(E);
        }
      });
    }
  });
  for (const h of o) await e.hooks.callHook("dom:renderTag", h);
  Object.values(s).forEach((h) => h());
}
let Qn = null;
async function Jf(e, t = {}) {
  function n() {
    return (Qn = null), $i(e, t);
  }
  const r = t.delayFn || ((s) => setTimeout(s, 10));
  return (Qn = Qn || new Promise((s) => r(() => s(n()))));
}
const Qf = {
    __proto__: null,
    debouncedRenderDOMHead: Jf,
    get domUpdatePromise() {
      return Qn;
    },
    hashCode: $s,
    renderDOMHead: $i,
  },
  Zf = [
    "title",
    "titleTemplate",
    "base",
    "htmlAttrs",
    "bodyAttrs",
    "meta",
    "link",
    "style",
    "script",
    "noscript",
  ],
  zf = ["tagPosition", "tagPriority", "tagDuplicateStrategy"];
async function ed(e, t) {
  const n = { tag: e, props: {} };
  return e === "title" || e === "titleTemplate"
    ? ((n.children = t instanceof Promise ? await t : t), n)
    : ((n.props = await td({ ...t })),
      ["children", "innerHtml", "innerHTML"].forEach((r) => {
        typeof n.props[r] < "u" &&
          ((n.children = n.props[r]), delete n.props[r]);
      }),
      Object.keys(n.props)
        .filter((r) => zf.includes(r))
        .forEach((r) => {
          (n[r] = n.props[r]), delete n.props[r];
        }),
      typeof n.props.class == "object" &&
        !Array.isArray(n.props.class) &&
        (n.props.class = Object.keys(n.props.class).filter(
          (r) => n.props.class[r]
        )),
      Array.isArray(n.props.class) && (n.props.class = n.props.class.join(" ")),
      n.props.content && Array.isArray(n.props.content)
        ? n.props.content.map((r, s) => {
            const l = { ...n, props: { ...n.props } };
            return (
              (l.props.content = r),
              (l.key = `${n.props.name || n.props.property}:${s}`),
              l
            );
          })
        : n);
}
async function td(e) {
  for (const t of Object.keys(e))
    e[t] instanceof Promise && (e[t] = await e[t]),
      String(e[t]) === "true"
        ? (e[t] = "")
        : String(e[t]) === "false" && delete e[t];
  return e;
}
const Ul = (e) => {
    if (typeof e.tagPriority == "number") return e.tagPriority;
    switch (e.tagPriority) {
      case "critical":
        return 2;
      case "high":
        return 9;
      case "low":
        return 12;
    }
    switch (e.tag) {
      case "base":
        return -1;
      case "title":
        return 1;
      case "meta":
        return e.props.charset
          ? -2
          : e.props["http-equiv"] === "content-security-policy"
          ? 0
          : 10;
      default:
        return 10;
    }
  },
  nd = (e, t) => Ul(e) - Ul(t),
  rd = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function sd(e, t) {
  const { props: n, tag: r } = e;
  if (rd.includes(r)) return r;
  if (r === "link" && n.rel === "canonical") return "canonical";
  if (n.charset) return "charset";
  const s = ["id"];
  r === "meta" && s.push("name", "property", "http-equiv");
  for (const l of s)
    if (typeof n[l] < "u") {
      const o = String(n[l]);
      return t && !t(o) ? !1 : `${r}:${l}:${o}`;
    }
  return !1;
}
const Wl = (e, t) =>
  e == null
    ? t || null
    : typeof e == "function"
    ? e(t)
    : e.replace("%s", t != null ? t : "");
function ld(e) {
  let t = e.findIndex((r) => r.tag === "titleTemplate");
  const n = e.findIndex((r) => r.tag === "title");
  if (n !== -1 && t !== -1) {
    const r = Wl(e[t].children, e[n].children);
    r !== null ? (e[n].children = r || e[n].children) : delete e[n];
  } else if (t !== -1) {
    const r = Wl(e[t].children);
    r !== null && ((e[t].children = r), (e[t].tag = "title"), (t = -1));
  }
  return t !== -1 && delete e[t], e.filter(Boolean);
}
const od = (e) => {
    e = e || {};
    const t = e.dedupeKeys || ["hid", "vmid", "key"];
    return {
      hooks: {
        "tag:normalise": function ({ tag: n }) {
          t.forEach((s) => {
            n.props[s] && ((n.key = n.props[s]), delete n.props[s]);
          });
          const r = n.key ? `${n.tag}:${n.key}` : sd(n);
          r && (n._d = r);
        },
        "tags:resolve": function (n) {
          const r = {};
          n.tags.forEach((s) => {
            let l = s._d || s._p;
            const o = r[l];
            if (o) {
              let i = s == null ? void 0 : s.tagDuplicateStrategy;
              if (
                (!i &&
                  (s.tag === "htmlAttrs" || s.tag === "bodyAttrs") &&
                  (i = "merge"),
                i === "merge")
              ) {
                const f = o.props;
                ["class", "style"].forEach((d) => {
                  s.props[d] &&
                    f[d] &&
                    (d === "style" && !f[d].endsWith(";") && (f[d] += ";"),
                    (s.props[d] = `${f[d]} ${s.props[d]}`));
                }),
                  (r[l].props = { ...f, ...s.props });
                return;
              } else s._e === o._e && (l = s._d = `${l}:${s._p}`);
              const a = Object.keys(s.props).length;
              if (
                (a === 0 || (a === 1 && typeof s.props["data-h-key"] < "u")) &&
                !s.children
              ) {
                delete r[l];
                return;
              }
            }
            r[l] = s;
          }),
            (n.tags = Object.values(r));
        },
      },
    };
  },
  id = () => ({
    hooks: {
      "tags:resolve": (e) => {
        const t = (n) => {
          var r;
          return (r = e.tags.find((s) => s._d === n)) == null ? void 0 : r._p;
        };
        for (const n of e.tags) {
          if (!n.tagPriority || typeof n.tagPriority == "number") continue;
          const r = [
            { prefix: "before:", offset: -1 },
            { prefix: "after:", offset: 1 },
          ];
          for (const { prefix: s, offset: l } of r)
            if (n.tagPriority.startsWith(s)) {
              const o = n.tagPriority.replace(s, ""),
                i = t(o);
              typeof i < "u" && (n._p = i + l);
            }
        }
        e.tags.sort((n, r) => n._p - r._p).sort(nd);
      },
    },
  }),
  ad = () => ({
    hooks: {
      "tags:resolve": (e) => {
        e.tags = ld(e.tags);
      },
    },
  }),
  cd = () => ({
    hooks: {
      "tag:normalise": function ({ tag: e }) {
        typeof e.props.body < "u" &&
          ((e.tagPosition = "bodyClose"), delete e.props.body);
      },
    },
  }),
  ud = typeof window < "u",
  fd = () => ({
    hooks: {
      "tag:normalise": (e) => {
        var s, l;
        const { tag: t, entry: n } = e,
          r = typeof t.props._dynamic < "u";
        !Hi.includes(t.tag) ||
          !t.key ||
          ((t._hash = $s(JSON.stringify({ tag: t.tag, key: t.key }))),
          !(
            ud ||
            ((l = (s = Wi()) == null ? void 0 : s.resolvedOptions) == null
              ? void 0
              : l.document)
          ) &&
            (n._m === "server" || r) &&
            (t.props[`data-h-${t._hash}`] = ""));
      },
      "tags:resolve": (e) => {
        e.tags = e.tags.map((t) => (delete t.props._dynamic, t));
      },
    },
  }),
  dd = (e) => ({
    hooks: {
      "entries:updated": function (t) {
        if (
          typeof (e == null ? void 0 : e.document) > "u" &&
          typeof window > "u"
        )
          return;
        let n = e == null ? void 0 : e.delayFn;
        !n && typeof requestAnimationFrame < "u" && (n = requestAnimationFrame),
          Promise.resolve()
            .then(function () {
              return Qf;
            })
            .then(({ debouncedRenderDOMHead: r }) => {
              r(t, {
                document: (e == null ? void 0 : e.document) || window.document,
                delayFn: n,
              });
            });
      },
    },
  }),
  hd = () => {
    const e = (t, n) => {
      const r = {},
        s = {};
      Object.entries(n.props).forEach(([o, i]) => {
        o.startsWith("on") && typeof i == "function" ? (s[o] = i) : (r[o] = i);
      });
      let l;
      return (
        t === "dom" &&
          n.tag === "script" &&
          typeof r.src == "string" &&
          typeof s.onload < "u" &&
          ((l = r.src), delete r.src),
        { props: r, eventHandlers: s, delayedSrc: l }
      );
    };
    return {
      hooks: {
        "ssr:render": function (t) {
          t.tags = t.tags.map((n) => ((n.props = e("ssr", n).props), n));
        },
        "dom:beforeRenderTag": function (t) {
          const { props: n, eventHandlers: r, delayedSrc: s } = e("dom", t.tag);
          !Object.keys(r).length ||
            ((t.tag.props = n),
            (t.tag._eventHandlers = r),
            (t.tag._delayedSrc = s));
        },
        "dom:renderTag": function (t) {
          const n = t.$el;
          if (!t.tag._eventHandlers || !n) return;
          const r =
            t.tag.tag === "bodyAttrs" && typeof window < "u" ? window : n;
          Object.entries(t.tag._eventHandlers).forEach(([s, l]) => {
            const o = `${t.tag._d || t.tag._p}:${s}`,
              i = s.slice(2).toLowerCase(),
              a = `data-h-${i}`;
            if ((delete t.staleSideEffects[o], n.hasAttribute(a))) return;
            const f = l;
            n.setAttribute(a, ""),
              r.addEventListener(i, f),
              t.entry &&
                (t.entry._sde[o] = () => {
                  r.removeEventListener(i, f), n.removeAttribute(a);
                });
          }),
            t.tag._delayedSrc && n.setAttribute("src", t.tag._delayedSrc);
        },
      },
    };
  };
function md(e) {
  return Array.isArray(e) ? e : [e];
}
const Hi = ["base", "meta", "link", "style", "script", "noscript"];
let Ui;
const pd = (e) => (Ui = e),
  Wi = () => Ui,
  gd = 10;
async function _d(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput || e.input)
      .filter(([n, r]) => typeof r < "u" && Zf.includes(n))
      .forEach(([n, r]) => {
        const s = md(r);
        t.push(...s.map((l) => ed(n, l)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .map((n, r) => ((n._e = e._i), (n._p = (e._i << gd) + r), n))
  );
}
const bd = () => [od(), id(), ad(), fd(), hd(), cd()],
  yd = (e = {}) => [
    dd({
      document: e == null ? void 0 : e.document,
      delayFn: e == null ? void 0 : e.domDelayFn,
    }),
  ];
function Ed(e = {}) {
  const t = vd({
    ...e,
    plugins: [...yd(e), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return pd(t), t;
}
function vd(e = {}) {
  let t = [],
    n = {},
    r = 0;
  const s = Kf();
  e != null && e.hooks && s.addHooks(e.hooks),
    (e.plugins = [...bd(), ...((e == null ? void 0 : e.plugins) || [])]),
    e.plugins.forEach((i) => i.hooks && s.addHooks(i.hooks));
  const l = () => s.callHook("entries:updated", o),
    o = {
      resolvedOptions: e,
      headEntries() {
        return t;
      },
      get hooks() {
        return s;
      },
      push(i, a) {
        const f = { _i: r++, input: i, _sde: {} };
        return (
          a != null && a.mode && (f._m = a == null ? void 0 : a.mode),
          t.push(f),
          l(),
          {
            dispose() {
              t = t.filter((d) =>
                d._i !== f._i
                  ? !0
                  : ((n = { ...n, ...(d._sde || {}) }), (d._sde = {}), l(), !1)
              );
            },
            patch(d) {
              t = t.map(
                (g) => (g._i === f._i && ((f.input = g.input = d), l()), g)
              );
            },
          }
        );
      },
      async resolveTags() {
        const i = { tags: [], entries: [...t] };
        await s.callHook("entries:resolve", i);
        for (const a of i.entries)
          for (const f of await _d(a)) {
            const d = { tag: f, entry: a };
            await s.callHook("tag:normalise", d), i.tags.push(d.tag);
          }
        return await s.callHook("tags:resolve", i), i.tags;
      },
      _elMap: {},
      _popSideEffectQueue() {
        const i = { ...n };
        return (n = {}), i;
      },
    };
  return o.hooks.callHook("init", o), o;
}
function Td(e) {
  return typeof e == "function" ? e() : Ke(e);
}
function or(e, t = "") {
  if (e instanceof Promise) return e;
  const n = Td(e);
  if (!e || !n) return n;
  if (Array.isArray(n)) return n.map((r) => or(r, t));
  if (typeof n == "object") {
    let r = !1;
    const s = Object.fromEntries(
      Object.entries(n).map(([l, o]) =>
        l === "titleTemplate" || l.startsWith("on")
          ? [l, Ke(o)]
          : ((typeof o == "function" || ye(o)) && (r = !0), [l, or(o, l)])
      )
    );
    return r && Hi.includes(String(t)) && (s._dynamic = !0), s;
  }
  return n;
}
const Cd = _i.startsWith("3"),
  Ld = typeof window < "u",
  ji = "usehead";
function Hs() {
  return (Pt() && qe(ji)) || Wi();
}
function Id(e = {}) {
  const t = Ed({
      ...e,
      domDelayFn: (r) => setTimeout(() => hr(() => r()), 10),
      plugins: [kd(), ...((e == null ? void 0 : e.plugins) || [])],
    }),
    n = {
      install(r) {
        Cd && ((r.config.globalProperties.$unhead = t), r.provide(ji, t));
      },
    };
  return (t.install = n.install), t;
}
const kd = () => ({
  hooks: {
    "entries:resolve": function (e) {
      for (const t of e.entries) t.resolvedInput = or(t.input);
    },
  },
});
function Od(e, t = {}) {
  const n = Hs();
  if (!Pt()) return n.push(e, t);
  const s = ke({});
  yc(() => {
    s.value = or(e);
  });
  const l = n.push(s.value, t);
  return (
    mt(s, (o) => l.patch(o)),
    ei(() => {
      l.dispose();
    }),
    l
  );
}
function Pd(e, t = {}) {
  return Hs().push(e, t);
}
function wd(e, t = {}) {
  var s;
  const n = Hs(),
    r = Ld || !!((s = n.resolvedOptions) != null && s.document);
  if (!((t.mode === "server" && r) || (t.mode === "client" && !r)))
    return r ? Od(e, t) : Pd(e, t);
}
const Ad = ["script", "style", "noscript"],
  Nd = ["base", "meta", "link", "style", "script", "noscript"],
  Rd = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function Sd(e, t) {
  const { props: n, tag: r } = e;
  if (Rd.includes(r)) return r;
  if (r === "link" && n.rel === "canonical") return "canonical";
  if (n.charset) return "charset";
  const s = ["id"];
  r === "meta" && s.push("name", "property", "http-equiv");
  for (const l of s)
    if (typeof n[l] < "u") {
      const o = String(n[l]);
      return t && !t(o) ? !1 : `${r}:${l}:${o}`;
    }
  return !1;
}
const Vn = (e, t) => {
  const { tag: n, $el: r } = e;
  !r ||
    (Object.entries(n.props).forEach(([s, l]) => {
      l = String(l);
      const o = `attr:${s}`;
      if (s === "class") {
        if (!l) return;
        for (const i of l.split(" ")) {
          const a = `${o}:${i}`;
          t && t(e, a, () => r.classList.remove(i)),
            r.classList.contains(i) || r.classList.add(i);
        }
        return;
      }
      t && !s.startsWith("data-h-") && t(e, o, () => r.removeAttribute(s)),
        r.getAttribute(s) !== l && r.setAttribute(s, l);
    }),
    Ad.includes(n.tag) &&
      r.innerHTML !== (n.children || "") &&
      (r.innerHTML = n.children || ""));
};
function Md(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function Bi(e, t = {}) {
  var d, g;
  const n = { shouldRender: !0 };
  if ((await e.hooks.callHook("dom:beforeRender", n), !n.shouldRender)) return;
  const r = t.document || window.document,
    s = e._popSideEffectQueue();
  e.headEntries()
    .map((h) => h._sde)
    .forEach((h) => {
      Object.entries(h).forEach(([_, E]) => {
        s[_] = E;
      });
    });
  const l = async (h) => {
      const _ = e.headEntries().find((O) => O._i === h._e),
        E = {
          renderId:
            h._d || Md(JSON.stringify({ ...h, _e: void 0, _p: void 0 })),
          $el: null,
          shouldRender: !0,
          tag: h,
          entry: _,
          staleSideEffects: s,
        };
      return await e.hooks.callHook("dom:beforeRenderTag", E), E;
    },
    o = [],
    i = { body: [], head: [] },
    a = (h, _, E) => {
      (_ = `${h.renderId}:${_}`), h.entry && (h.entry._sde[_] = E), delete s[_];
    },
    f = (h) => {
      (e._elMap[h.renderId] = h.$el),
        o.push(h),
        a(h, "el", () => {
          var _;
          (_ = h.$el) == null || _.remove(), delete e._elMap[h.renderId];
        });
    };
  for (const h of await e.resolveTags()) {
    const _ = await l(h);
    if (!_.shouldRender) continue;
    const { tag: E } = _;
    if (E.tag === "title") {
      (r.title = E.children || ""), o.push(_);
      continue;
    }
    if (E.tag === "htmlAttrs" || E.tag === "bodyAttrs") {
      (_.$el = r[E.tag === "htmlAttrs" ? "documentElement" : "body"]),
        Vn(_, a),
        o.push(_);
      continue;
    }
    if (
      ((_.$el = e._elMap[_.renderId]),
      !_.$el &&
        E._hash &&
        (_.$el = r.querySelector(
          `${
            (d = E.tagPosition) != null && d.startsWith("body")
              ? "body"
              : "head"
          } > ${E.tag}[data-h-${E._hash}]`
        )),
      _.$el)
    ) {
      _.tag._d && Vn(_), f(_);
      continue;
    }
    (_.$el = r.createElement(E.tag)),
      Vn(_),
      i[
        (g = E.tagPosition) != null && g.startsWith("body") ? "body" : "head"
      ].push(_);
  }
  Object.entries(i).forEach(([h, _]) => {
    if (!!_.length) {
      for (const E of [...r[h].children].reverse()) {
        const O = E.tagName.toLowerCase();
        if (!Nd.includes(O)) continue;
        const N = Sd({
            tag: O,
            props: E.getAttributeNames().reduce(
              (y, T) => ({ ...y, [T]: E.getAttribute(T) }),
              {}
            ),
          }),
          m = _.findIndex((y) => y && (y.tag._d === N || E.isEqualNode(y.$el)));
        if (m !== -1) {
          const y = _[m];
          (y.$el = E), Vn(y), f(y), delete _[m];
        }
      }
      _.forEach((E) => {
        if (!!E.$el) {
          switch (E.tag.tagPosition) {
            case "bodyClose":
              r.body.appendChild(E.$el);
              break;
            case "bodyOpen":
              r.body.insertBefore(E.$el, r.body.firstChild);
              break;
            case "head":
            default:
              r.head.appendChild(E.$el);
              break;
          }
          f(E);
        }
      });
    }
  });
  for (const h of o) await e.hooks.callHook("dom:renderTag", h);
  Object.values(s).forEach((h) => h());
}
let $r = null;
async function Fd(e, t = {}) {
  function n() {
    return ($r = null), Bi(e, t);
  }
  const r = t.delayFn || ((s) => setTimeout(s, 10));
  return ($r = $r || new Promise((s) => r(() => s(n()))));
}
function xd(e) {
  const t = Id(),
    n = {
      unhead: t,
      install(r) {
        r.config.globalProperties && (r.config.globalProperties.$head = t),
          r.provide("usehead", t);
      },
      resolveTags() {
        return t.resolveTags();
      },
      headEntries() {
        return t.headEntries();
      },
      headTags() {
        return t.resolveTags();
      },
      push(r, s) {
        return t.push(r, s);
      },
      addEntry(r, s) {
        return t.push(r, s);
      },
      addHeadObjs(r, s) {
        return t.push(r, s);
      },
      addReactiveEntry(r, s) {
        const l = wd(r, s);
        return typeof l < "u" ? l.dispose : () => {};
      },
      removeHeadObjs() {},
      updateDOM(r, s) {
        s
          ? Bi(t, { document: r })
          : Fd(t, { delayFn: (l) => setTimeout(() => l(), 50), document: r });
      },
      internalHooks: t.hooks,
      hooks: { "before:dom": [], "resolved:tags": [], "resolved:entries": [] },
    };
  return (
    (t.addHeadObjs = n.addHeadObjs),
    (t.updateDOM = n.updateDOM),
    t.hooks.hook("dom:beforeRender", (r) => {
      for (const s of n.hooks["before:dom"])
        s() === !1 && (r.shouldRender = !1);
    }),
    e && n.addHeadObjs(e),
    n
  );
}
function Dd(e) {
  try {
    return JSON.parse(e || "{}");
  } catch (t) {
    return console.error("[SSG] On state deserialization -", t, e), {};
  }
}
function $d(e) {
  return document.readyState === "loading"
    ? new Promise((t) => {
        document.addEventListener("DOMContentLoaded", () => t(e));
      })
    : Promise.resolve(e);
}
const Hd = Wt({
  setup(e, { slots: t }) {
    const n = ke(!1);
    return (
      ws(() => (n.value = !0)),
      () =>
        n.value
          ? t.default && t.default({})
          : t.placeholder && t.placeholder({})
    );
  },
});
function Ud(e, t, n, r = {}) {
  const {
      transformState: s,
      registerComponents: l = !0,
      useHead: o = !0,
      rootContainer: i = "#app",
    } = r,
    a = typeof window < "u";
  async function f(d = !1, g) {
    var w;
    const h = d ? Nu(e) : Ru(e);
    let _;
    o && ((_ = xd()), h.use(_));
    const E = Uf({ history: d ? tf(t.base) : nf(t.base), ...t }),
      { routes: O } = t;
    l && h.component("ClientOnly", Hd);
    const N = [],
      T = {
        app: h,
        head: _,
        isClient: a,
        router: E,
        routes: O,
        onSSRAppRendered: d ? () => {} : (F) => N.push(F),
        triggerOnSSRAppRendered: () => Promise.all(N.map((F) => F())),
        initialState: {},
        transformState: s,
        routePath: g,
      };
    d &&
      (await $d(),
      (T.initialState =
        (s == null ? void 0 : s(window.__INITIAL_STATE__ || {})) ||
        Dd(window.__INITIAL_STATE__))),
      await (n == null ? void 0 : n(T)),
      h.use(E);
    let L,
      I = !0;
    if (
      (E.beforeEach((F, K, Y) => {
        (I || (L && L === F.path)) &&
          ((I = !1), (L = F.path), (F.meta.state = T.initialState)),
          Y();
      }),
      !d)
    ) {
      const F = (w = T.routePath) != null ? w : "/";
      E.push(F),
        await E.isReady(),
        (T.initialState = E.currentRoute.value.meta.state || {});
    }
    const S = T.initialState;
    return { ...T, initialState: S };
  }
  return (
    a &&
      (async () => {
        const { app: d, router: g } = await f(!0);
        await g.isReady(), d.mount(i, !0);
      })(),
    f
  );
}
/*!
 * shared v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const ns = typeof window < "u",
  Wd = typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
  At = (e) => (Wd ? Symbol(e) : e),
  jd = (e, t, n) => Bd({ l: e, k: t, s: n }),
  Bd = (e) =>
    JSON.stringify(e)
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
      .replace(/\u0027/g, "\\u0027"),
  Oe = (e) => typeof e == "number" && isFinite(e),
  Vd = (e) => Ws(e) === "[object Date]",
  wt = (e) => Ws(e) === "[object RegExp]",
  vr = (e) => q(e) && Object.keys(e).length === 0;
function Kd(e, t) {
  typeof console < "u" &&
    (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Ne = Object.assign;
let jl;
const Ln = () =>
  jl ||
  (jl =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Bl(e) {
  return e
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
const Yd = Object.prototype.hasOwnProperty;
function Us(e, t) {
  return Yd.call(e, t);
}
const me = Array.isArray,
  ve = (e) => typeof e == "function",
  U = (e) => typeof e == "string",
  le = (e) => typeof e == "boolean",
  pe = (e) => e !== null && typeof e == "object",
  Vi = Object.prototype.toString,
  Ws = (e) => Vi.call(e),
  q = (e) => Ws(e) === "[object Object]",
  Gd = (e) =>
    e == null
      ? ""
      : me(e) || (q(e) && e.toString === Vi)
      ? JSON.stringify(e, null, 2)
      : String(e);
/*!
 * message-compiler v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const ce = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  __EXTEND_POINT__: 15,
};
function Tr(e, t, n = {}) {
  const { domain: r, messages: s, args: l } = n,
    o = e,
    i = new SyntaxError(String(o));
  return (i.code = e), t && (i.location = t), (i.domain = r), i;
}
function Xd(e) {
  throw e;
}
function qd(e, t, n) {
  return { line: e, column: t, offset: n };
}
function rs(e, t, n) {
  const r = { start: e, end: t };
  return n != null && (r.source = n), r;
}
const dt = " ",
  Jd = "\r",
  $e = `
`,
  Qd = String.fromCharCode(8232),
  Zd = String.fromCharCode(8233);
function zd(e) {
  const t = e;
  let n = 0,
    r = 1,
    s = 1,
    l = 0;
  const o = (w) => t[w] === Jd && t[w + 1] === $e,
    i = (w) => t[w] === $e,
    a = (w) => t[w] === Zd,
    f = (w) => t[w] === Qd,
    d = (w) => o(w) || i(w) || a(w) || f(w),
    g = () => n,
    h = () => r,
    _ = () => s,
    E = () => l,
    O = (w) => (o(w) || a(w) || f(w) ? $e : t[w]),
    N = () => O(n),
    m = () => O(n + l);
  function y() {
    return (l = 0), d(n) && (r++, (s = 0)), o(n) && n++, n++, s++, t[n];
  }
  function T() {
    return o(n + l) && l++, l++, t[n + l];
  }
  function L() {
    (n = 0), (r = 1), (s = 1), (l = 0);
  }
  function I(w = 0) {
    l = w;
  }
  function S() {
    const w = n + l;
    for (; w !== n; ) y();
    l = 0;
  }
  return {
    index: g,
    line: h,
    column: _,
    peekOffset: E,
    charAt: O,
    currentChar: N,
    currentPeek: m,
    next: y,
    peek: T,
    reset: L,
    resetPeek: I,
    skipToPeek: S,
  };
}
const Et = void 0,
  Vl = "'",
  eh = "tokenizer";
function th(e, t = {}) {
  const n = t.location !== !1,
    r = zd(e),
    s = () => r.index(),
    l = () => qd(r.line(), r.column(), r.index()),
    o = l(),
    i = s(),
    a = {
      currentType: 14,
      offset: i,
      startLoc: o,
      endLoc: o,
      lastType: 14,
      lastOffset: i,
      lastStartLoc: o,
      lastEndLoc: o,
      braceNest: 0,
      inLinked: !1,
      text: "",
    },
    f = () => a,
    { onError: d } = t;
  function g(c, u, b, ...v) {
    const P = f();
    if (((u.column += b), (u.offset += b), d)) {
      const M = rs(P.startLoc, u),
        x = Tr(c, M, { domain: eh, args: v });
      d(x);
    }
  }
  function h(c, u, b) {
    (c.endLoc = l()), (c.currentType = u);
    const v = { type: u };
    return (
      n && (v.loc = rs(c.startLoc, c.endLoc)), b != null && (v.value = b), v
    );
  }
  const _ = (c) => h(c, 14);
  function E(c, u) {
    return c.currentChar() === u
      ? (c.next(), u)
      : (g(ce.EXPECTED_TOKEN, l(), 0, u), "");
  }
  function O(c) {
    let u = "";
    for (; c.currentPeek() === dt || c.currentPeek() === $e; )
      (u += c.currentPeek()), c.peek();
    return u;
  }
  function N(c) {
    const u = O(c);
    return c.skipToPeek(), u;
  }
  function m(c) {
    if (c === Et) return !1;
    const u = c.charCodeAt(0);
    return (u >= 97 && u <= 122) || (u >= 65 && u <= 90) || u === 95;
  }
  function y(c) {
    if (c === Et) return !1;
    const u = c.charCodeAt(0);
    return u >= 48 && u <= 57;
  }
  function T(c, u) {
    const { currentType: b } = u;
    if (b !== 2) return !1;
    O(c);
    const v = m(c.currentPeek());
    return c.resetPeek(), v;
  }
  function L(c, u) {
    const { currentType: b } = u;
    if (b !== 2) return !1;
    O(c);
    const v = c.currentPeek() === "-" ? c.peek() : c.currentPeek(),
      P = y(v);
    return c.resetPeek(), P;
  }
  function I(c, u) {
    const { currentType: b } = u;
    if (b !== 2) return !1;
    O(c);
    const v = c.currentPeek() === Vl;
    return c.resetPeek(), v;
  }
  function S(c, u) {
    const { currentType: b } = u;
    if (b !== 8) return !1;
    O(c);
    const v = c.currentPeek() === ".";
    return c.resetPeek(), v;
  }
  function w(c, u) {
    const { currentType: b } = u;
    if (b !== 9) return !1;
    O(c);
    const v = m(c.currentPeek());
    return c.resetPeek(), v;
  }
  function F(c, u) {
    const { currentType: b } = u;
    if (!(b === 8 || b === 12)) return !1;
    O(c);
    const v = c.currentPeek() === ":";
    return c.resetPeek(), v;
  }
  function K(c, u) {
    const { currentType: b } = u;
    if (b !== 10) return !1;
    const v = () => {
        const M = c.currentPeek();
        return M === "{"
          ? m(c.peek())
          : M === "@" ||
            M === "%" ||
            M === "|" ||
            M === ":" ||
            M === "." ||
            M === dt ||
            !M
          ? !1
          : M === $e
          ? (c.peek(), v())
          : m(M);
      },
      P = v();
    return c.resetPeek(), P;
  }
  function Y(c) {
    O(c);
    const u = c.currentPeek() === "|";
    return c.resetPeek(), u;
  }
  function G(c) {
    const u = O(c),
      b = c.currentPeek() === "%" && c.peek() === "{";
    return c.resetPeek(), { isModulo: b, hasSpace: u.length > 0 };
  }
  function de(c, u = !0) {
    const b = (P = !1, M = "", x = !1) => {
        const D = c.currentPeek();
        return D === "{"
          ? M === "%"
            ? !1
            : P
          : D === "@" || !D
          ? M === "%"
            ? !0
            : P
          : D === "%"
          ? (c.peek(), b(P, "%", !0))
          : D === "|"
          ? M === "%" || x
            ? !0
            : !(M === dt || M === $e)
          : D === dt
          ? (c.peek(), b(!0, dt, x))
          : D === $e
          ? (c.peek(), b(!0, $e, x))
          : !0;
      },
      v = b();
    return u && c.resetPeek(), v;
  }
  function ne(c, u) {
    const b = c.currentChar();
    return b === Et ? Et : u(b) ? (c.next(), b) : null;
  }
  function j(c) {
    return ne(c, (b) => {
      const v = b.charCodeAt(0);
      return (
        (v >= 97 && v <= 122) ||
        (v >= 65 && v <= 90) ||
        (v >= 48 && v <= 57) ||
        v === 95 ||
        v === 36
      );
    });
  }
  function ie(c) {
    return ne(c, (b) => {
      const v = b.charCodeAt(0);
      return v >= 48 && v <= 57;
    });
  }
  function Q(c) {
    return ne(c, (b) => {
      const v = b.charCodeAt(0);
      return (
        (v >= 48 && v <= 57) || (v >= 65 && v <= 70) || (v >= 97 && v <= 102)
      );
    });
  }
  function te(c) {
    let u = "",
      b = "";
    for (; (u = ie(c)); ) b += u;
    return b;
  }
  function re(c) {
    N(c);
    const u = c.currentChar();
    return u !== "%" && g(ce.EXPECTED_TOKEN, l(), 0, u), c.next(), "%";
  }
  function we(c) {
    let u = "";
    for (;;) {
      const b = c.currentChar();
      if (b === "{" || b === "}" || b === "@" || b === "|" || !b) break;
      if (b === "%")
        if (de(c)) (u += b), c.next();
        else break;
      else if (b === dt || b === $e)
        if (de(c)) (u += b), c.next();
        else {
          if (Y(c)) break;
          (u += b), c.next();
        }
      else (u += b), c.next();
    }
    return u;
  }
  function je(c) {
    N(c);
    let u = "",
      b = "";
    for (; (u = j(c)); ) b += u;
    return (
      c.currentChar() === Et && g(ce.UNTERMINATED_CLOSING_BRACE, l(), 0), b
    );
  }
  function Re(c) {
    N(c);
    let u = "";
    return (
      c.currentChar() === "-" ? (c.next(), (u += `-${te(c)}`)) : (u += te(c)),
      c.currentChar() === Et && g(ce.UNTERMINATED_CLOSING_BRACE, l(), 0),
      u
    );
  }
  function Te(c) {
    N(c), E(c, "'");
    let u = "",
      b = "";
    const v = (M) => M !== Vl && M !== $e;
    for (; (u = ne(c, v)); ) u === "\\" ? (b += Je(c)) : (b += u);
    const P = c.currentChar();
    return P === $e || P === Et
      ? (g(ce.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, l(), 0),
        P === $e && (c.next(), E(c, "'")),
        b)
      : (E(c, "'"), b);
  }
  function Je(c) {
    const u = c.currentChar();
    switch (u) {
      case "\\":
      case "'":
        return c.next(), `\\${u}`;
      case "u":
        return Qe(c, u, 4);
      case "U":
        return Qe(c, u, 6);
      default:
        return g(ce.UNKNOWN_ESCAPE_SEQUENCE, l(), 0, u), "";
    }
  }
  function Qe(c, u, b) {
    E(c, u);
    let v = "";
    for (let P = 0; P < b; P++) {
      const M = Q(c);
      if (!M) {
        g(
          ce.INVALID_UNICODE_ESCAPE_SEQUENCE,
          l(),
          0,
          `\\${u}${v}${c.currentChar()}`
        );
        break;
      }
      v += M;
    }
    return `\\${u}${v}`;
  }
  function R(c) {
    N(c);
    let u = "",
      b = "";
    const v = (P) => P !== "{" && P !== "}" && P !== dt && P !== $e;
    for (; (u = ne(c, v)); ) b += u;
    return b;
  }
  function H(c) {
    let u = "",
      b = "";
    for (; (u = j(c)); ) b += u;
    return b;
  }
  function $(c) {
    const u = (b = !1, v) => {
      const P = c.currentChar();
      return P === "{" || P === "%" || P === "@" || P === "|" || !P || P === dt
        ? v
        : P === $e
        ? ((v += P), c.next(), u(b, v))
        : ((v += P), c.next(), u(!0, v));
    };
    return u(!1, "");
  }
  function B(c) {
    N(c);
    const u = E(c, "|");
    return N(c), u;
  }
  function Z(c, u) {
    let b = null;
    switch (c.currentChar()) {
      case "{":
        return (
          u.braceNest >= 1 && g(ce.NOT_ALLOW_NEST_PLACEHOLDER, l(), 0),
          c.next(),
          (b = h(u, 2, "{")),
          N(c),
          u.braceNest++,
          b
        );
      case "}":
        return (
          u.braceNest > 0 &&
            u.currentType === 2 &&
            g(ce.EMPTY_PLACEHOLDER, l(), 0),
          c.next(),
          (b = h(u, 3, "}")),
          u.braceNest--,
          u.braceNest > 0 && N(c),
          u.inLinked && u.braceNest === 0 && (u.inLinked = !1),
          b
        );
      case "@":
        return (
          u.braceNest > 0 && g(ce.UNTERMINATED_CLOSING_BRACE, l(), 0),
          (b = ae(c, u) || _(u)),
          (u.braceNest = 0),
          b
        );
      default:
        let P = !0,
          M = !0,
          x = !0;
        if (Y(c))
          return (
            u.braceNest > 0 && g(ce.UNTERMINATED_CLOSING_BRACE, l(), 0),
            (b = h(u, 1, B(c))),
            (u.braceNest = 0),
            (u.inLinked = !1),
            b
          );
        if (
          u.braceNest > 0 &&
          (u.currentType === 5 || u.currentType === 6 || u.currentType === 7)
        )
          return (
            g(ce.UNTERMINATED_CLOSING_BRACE, l(), 0), (u.braceNest = 0), X(c, u)
          );
        if ((P = T(c, u))) return (b = h(u, 5, je(c))), N(c), b;
        if ((M = L(c, u))) return (b = h(u, 6, Re(c))), N(c), b;
        if ((x = I(c, u))) return (b = h(u, 7, Te(c))), N(c), b;
        if (!P && !M && !x)
          return (
            (b = h(u, 13, R(c))),
            g(ce.INVALID_TOKEN_IN_PLACEHOLDER, l(), 0, b.value),
            N(c),
            b
          );
        break;
    }
    return b;
  }
  function ae(c, u) {
    const { currentType: b } = u;
    let v = null;
    const P = c.currentChar();
    switch (
      ((b === 8 || b === 9 || b === 12 || b === 10) &&
        (P === $e || P === dt) &&
        g(ce.INVALID_LINKED_FORMAT, l(), 0),
      P)
    ) {
      case "@":
        return c.next(), (v = h(u, 8, "@")), (u.inLinked = !0), v;
      case ".":
        return N(c), c.next(), h(u, 9, ".");
      case ":":
        return N(c), c.next(), h(u, 10, ":");
      default:
        return Y(c)
          ? ((v = h(u, 1, B(c))), (u.braceNest = 0), (u.inLinked = !1), v)
          : S(c, u) || F(c, u)
          ? (N(c), ae(c, u))
          : w(c, u)
          ? (N(c), h(u, 12, H(c)))
          : K(c, u)
          ? (N(c), P === "{" ? Z(c, u) || v : h(u, 11, $(c)))
          : (b === 8 && g(ce.INVALID_LINKED_FORMAT, l(), 0),
            (u.braceNest = 0),
            (u.inLinked = !1),
            X(c, u));
    }
  }
  function X(c, u) {
    let b = { type: 14 };
    if (u.braceNest > 0) return Z(c, u) || _(u);
    if (u.inLinked) return ae(c, u) || _(u);
    switch (c.currentChar()) {
      case "{":
        return Z(c, u) || _(u);
      case "}":
        return g(ce.UNBALANCED_CLOSING_BRACE, l(), 0), c.next(), h(u, 3, "}");
      case "@":
        return ae(c, u) || _(u);
      default:
        if (Y(c))
          return (b = h(u, 1, B(c))), (u.braceNest = 0), (u.inLinked = !1), b;
        const { isModulo: P, hasSpace: M } = G(c);
        if (P) return M ? h(u, 0, we(c)) : h(u, 4, re(c));
        if (de(c)) return h(u, 0, we(c));
        break;
    }
    return b;
  }
  function p() {
    const { currentType: c, offset: u, startLoc: b, endLoc: v } = a;
    return (
      (a.lastType = c),
      (a.lastOffset = u),
      (a.lastStartLoc = b),
      (a.lastEndLoc = v),
      (a.offset = s()),
      (a.startLoc = l()),
      r.currentChar() === Et ? h(a, 14) : X(r, a)
    );
  }
  return { nextToken: p, currentOffset: s, currentPosition: l, context: f };
}
const nh = "parser",
  rh = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function sh(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "\uFFFD";
    }
  }
}
function lh(e = {}) {
  const t = e.location !== !1,
    { onError: n } = e;
  function r(m, y, T, L, ...I) {
    const S = m.currentPosition();
    if (((S.offset += L), (S.column += L), n)) {
      const w = rs(T, S),
        F = Tr(y, w, { domain: nh, args: I });
      n(F);
    }
  }
  function s(m, y, T) {
    const L = { type: m, start: y, end: y };
    return t && (L.loc = { start: T, end: T }), L;
  }
  function l(m, y, T, L) {
    (m.end = y), L && (m.type = L), t && m.loc && (m.loc.end = T);
  }
  function o(m, y) {
    const T = m.context(),
      L = s(3, T.offset, T.startLoc);
    return (L.value = y), l(L, m.currentOffset(), m.currentPosition()), L;
  }
  function i(m, y) {
    const T = m.context(),
      { lastOffset: L, lastStartLoc: I } = T,
      S = s(5, L, I);
    return (
      (S.index = parseInt(y, 10)),
      m.nextToken(),
      l(S, m.currentOffset(), m.currentPosition()),
      S
    );
  }
  function a(m, y) {
    const T = m.context(),
      { lastOffset: L, lastStartLoc: I } = T,
      S = s(4, L, I);
    return (
      (S.key = y),
      m.nextToken(),
      l(S, m.currentOffset(), m.currentPosition()),
      S
    );
  }
  function f(m, y) {
    const T = m.context(),
      { lastOffset: L, lastStartLoc: I } = T,
      S = s(9, L, I);
    return (
      (S.value = y.replace(rh, sh)),
      m.nextToken(),
      l(S, m.currentOffset(), m.currentPosition()),
      S
    );
  }
  function d(m) {
    const y = m.nextToken(),
      T = m.context(),
      { lastOffset: L, lastStartLoc: I } = T,
      S = s(8, L, I);
    return y.type !== 12
      ? (r(m, ce.UNEXPECTED_EMPTY_LINKED_MODIFIER, T.lastStartLoc, 0),
        (S.value = ""),
        l(S, L, I),
        { nextConsumeToken: y, node: S })
      : (y.value == null &&
          r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, lt(y)),
        (S.value = y.value || ""),
        l(S, m.currentOffset(), m.currentPosition()),
        { node: S });
  }
  function g(m, y) {
    const T = m.context(),
      L = s(7, T.offset, T.startLoc);
    return (L.value = y), l(L, m.currentOffset(), m.currentPosition()), L;
  }
  function h(m) {
    const y = m.context(),
      T = s(6, y.offset, y.startLoc);
    let L = m.nextToken();
    if (L.type === 9) {
      const I = d(m);
      (T.modifier = I.node), (L = I.nextConsumeToken || m.nextToken());
    }
    switch (
      (L.type !== 10 &&
        r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(L)),
      (L = m.nextToken()),
      L.type === 2 && (L = m.nextToken()),
      L.type)
    ) {
      case 11:
        L.value == null &&
          r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(L)),
          (T.key = g(m, L.value || ""));
        break;
      case 5:
        L.value == null &&
          r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(L)),
          (T.key = a(m, L.value || ""));
        break;
      case 6:
        L.value == null &&
          r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(L)),
          (T.key = i(m, L.value || ""));
        break;
      case 7:
        L.value == null &&
          r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(L)),
          (T.key = f(m, L.value || ""));
        break;
      default:
        r(m, ce.UNEXPECTED_EMPTY_LINKED_KEY, y.lastStartLoc, 0);
        const I = m.context(),
          S = s(7, I.offset, I.startLoc);
        return (
          (S.value = ""),
          l(S, I.offset, I.startLoc),
          (T.key = S),
          l(T, I.offset, I.startLoc),
          { nextConsumeToken: L, node: T }
        );
    }
    return l(T, m.currentOffset(), m.currentPosition()), { node: T };
  }
  function _(m) {
    const y = m.context(),
      T = y.currentType === 1 ? m.currentOffset() : y.offset,
      L = y.currentType === 1 ? y.endLoc : y.startLoc,
      I = s(2, T, L);
    I.items = [];
    let S = null;
    do {
      const K = S || m.nextToken();
      switch (((S = null), K.type)) {
        case 0:
          K.value == null &&
            r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(K)),
            I.items.push(o(m, K.value || ""));
          break;
        case 6:
          K.value == null &&
            r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(K)),
            I.items.push(i(m, K.value || ""));
          break;
        case 5:
          K.value == null &&
            r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(K)),
            I.items.push(a(m, K.value || ""));
          break;
        case 7:
          K.value == null &&
            r(m, ce.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, lt(K)),
            I.items.push(f(m, K.value || ""));
          break;
        case 8:
          const Y = h(m);
          I.items.push(Y.node), (S = Y.nextConsumeToken || null);
          break;
      }
    } while (y.currentType !== 14 && y.currentType !== 1);
    const w = y.currentType === 1 ? y.lastOffset : m.currentOffset(),
      F = y.currentType === 1 ? y.lastEndLoc : m.currentPosition();
    return l(I, w, F), I;
  }
  function E(m, y, T, L) {
    const I = m.context();
    let S = L.items.length === 0;
    const w = s(1, y, T);
    (w.cases = []), w.cases.push(L);
    do {
      const F = _(m);
      S || (S = F.items.length === 0), w.cases.push(F);
    } while (I.currentType !== 14);
    return (
      S && r(m, ce.MUST_HAVE_MESSAGES_IN_PLURAL, T, 0),
      l(w, m.currentOffset(), m.currentPosition()),
      w
    );
  }
  function O(m) {
    const y = m.context(),
      { offset: T, startLoc: L } = y,
      I = _(m);
    return y.currentType === 14 ? I : E(m, T, L, I);
  }
  function N(m) {
    const y = th(m, Ne({}, e)),
      T = y.context(),
      L = s(0, T.offset, T.startLoc);
    return (
      t && L.loc && (L.loc.source = m),
      (L.body = O(y)),
      T.currentType !== 14 &&
        r(
          y,
          ce.UNEXPECTED_LEXICAL_ANALYSIS,
          T.lastStartLoc,
          0,
          m[T.offset] || ""
        ),
      l(L, y.currentOffset(), y.currentPosition()),
      L
    );
  }
  return { parse: N };
}
function lt(e) {
  if (e.type === 14) return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "\u2026" : t;
}
function oh(e, t = {}) {
  const n = { ast: e, helpers: new Set() };
  return { context: () => n, helper: (l) => (n.helpers.add(l), l) };
}
function Kl(e, t) {
  for (let n = 0; n < e.length; n++) js(e[n], t);
}
function js(e, t) {
  switch (e.type) {
    case 1:
      Kl(e.cases, t), t.helper("plural");
      break;
    case 2:
      Kl(e.items, t);
      break;
    case 6:
      js(e.key, t), t.helper("linked"), t.helper("type");
      break;
    case 5:
      t.helper("interpolate"), t.helper("list");
      break;
    case 4:
      t.helper("interpolate"), t.helper("named");
      break;
  }
}
function ih(e, t = {}) {
  const n = oh(e);
  n.helper("normalize"), e.body && js(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function ah(e, t) {
  const { sourceMap: n, filename: r, breakLineCode: s, needIndent: l } = t,
    o = {
      source: e.loc.source,
      filename: r,
      code: "",
      column: 1,
      line: 1,
      offset: 0,
      map: void 0,
      breakLineCode: s,
      needIndent: l,
      indentLevel: 0,
    },
    i = () => o;
  function a(O, N) {
    o.code += O;
  }
  function f(O, N = !0) {
    const m = N ? s : "";
    a(l ? m + "  ".repeat(O) : m);
  }
  function d(O = !0) {
    const N = ++o.indentLevel;
    O && f(N);
  }
  function g(O = !0) {
    const N = --o.indentLevel;
    O && f(N);
  }
  function h() {
    f(o.indentLevel);
  }
  return {
    context: i,
    push: a,
    indent: d,
    deindent: g,
    newline: h,
    helper: (O) => `_${O}`,
    needIndent: () => o.needIndent,
  };
}
function ch(e, t) {
  const { helper: n } = e;
  e.push(`${n("linked")}(`),
    an(e, t.key),
    t.modifier
      ? (e.push(", "), an(e, t.modifier), e.push(", _type"))
      : e.push(", undefined, _type"),
    e.push(")");
}
function uh(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n("normalize")}([`), e.indent(r());
  const s = t.items.length;
  for (let l = 0; l < s && (an(e, t.items[l]), l !== s - 1); l++) e.push(", ");
  e.deindent(r()), e.push("])");
}
function fh(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n("plural")}([`), e.indent(r());
    const s = t.cases.length;
    for (let l = 0; l < s && (an(e, t.cases[l]), l !== s - 1); l++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function dh(e, t) {
  t.body ? an(e, t.body) : e.push("null");
}
function an(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      dh(e, t);
      break;
    case 1:
      fh(e, t);
      break;
    case 2:
      uh(e, t);
      break;
    case 6:
      ch(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
  }
}
const hh = (e, t = {}) => {
  const n = U(t.mode) ? t.mode : "normal",
    r = U(t.filename) ? t.filename : "message.intl",
    s = !!t.sourceMap,
    l =
      t.breakLineCode != null
        ? t.breakLineCode
        : n === "arrow"
        ? ";"
        : `
`,
    o = t.needIndent ? t.needIndent : n !== "arrow",
    i = e.helpers || [],
    a = ah(e, {
      mode: n,
      filename: r,
      sourceMap: s,
      breakLineCode: l,
      needIndent: o,
    });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"),
    a.indent(o),
    i.length > 0 &&
      (a.push(`const { ${i.map((g) => `${g}: _${g}`).join(", ")} } = ctx`),
      a.newline()),
    a.push("return "),
    an(a, e),
    a.deindent(o),
    a.push("}");
  const { code: f, map: d } = a.context();
  return { ast: e, code: f, map: d ? d.toJSON() : void 0 };
};
function mh(e, t = {}) {
  const n = Ne({}, t),
    s = lh(n).parse(e);
  return ih(s, n), hh(s, n);
}
/*!
 * devtools-if v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Ki = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate",
};
/*!
 * core-base v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Nt = [];
Nt[0] = { w: [0], i: [3, 0], ["["]: [4], o: [7] };
Nt[1] = { w: [1], ["."]: [2], ["["]: [4], o: [7] };
Nt[2] = { w: [2], i: [3, 0], [0]: [3, 0] };
Nt[3] = {
  i: [3, 0],
  [0]: [3, 0],
  w: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  o: [7, 1],
};
Nt[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [4, 2],
  ["]"]: [1, 3],
  o: 8,
  l: [4, 0],
};
Nt[5] = { ["'"]: [4, 0], o: 8, l: [5, 0] };
Nt[6] = { ['"']: [4, 0], o: 8, l: [6, 0] };
const ph = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function gh(e) {
  return ph.test(e);
}
function _h(e) {
  const t = e.charCodeAt(0),
    n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function bh(e) {
  if (e == null) return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function yh(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e))
    ? !1
    : gh(t)
    ? _h(t)
    : "*" + t;
}
function Eh(e) {
  const t = [];
  let n = -1,
    r = 0,
    s = 0,
    l,
    o,
    i,
    a,
    f,
    d,
    g;
  const h = [];
  (h[0] = () => {
    o === void 0 ? (o = i) : (o += i);
  }),
    (h[1] = () => {
      o !== void 0 && (t.push(o), (o = void 0));
    }),
    (h[2] = () => {
      h[0](), s++;
    }),
    (h[3] = () => {
      if (s > 0) s--, (r = 4), h[0]();
      else {
        if (((s = 0), o === void 0 || ((o = yh(o)), o === !1))) return !1;
        h[1]();
      }
    });
  function _() {
    const E = e[n + 1];
    if ((r === 5 && E === "'") || (r === 6 && E === '"'))
      return n++, (i = "\\" + E), h[0](), !0;
  }
  for (; r !== null; )
    if ((n++, (l = e[n]), !(l === "\\" && _()))) {
      if (
        ((a = bh(l)),
        (g = Nt[r]),
        (f = g[a] || g.l || 8),
        f === 8 ||
          ((r = f[0]),
          f[1] !== void 0 && ((d = h[f[1]]), d && ((i = l), d() === !1))))
      )
        return;
      if (r === 7) return t;
    }
}
const Yl = new Map();
function vh(e, t) {
  return pe(e) ? e[t] : null;
}
function Th(e, t) {
  if (!pe(e)) return null;
  let n = Yl.get(t);
  if ((n || ((n = Eh(t)), n && Yl.set(t, n)), !n)) return null;
  const r = n.length;
  let s = e,
    l = 0;
  for (; l < r; ) {
    const o = s[n[l]];
    if (o === void 0) return null;
    (s = o), l++;
  }
  return s;
}
const Ch = (e) => e,
  Lh = (e) => "",
  Ih = "text",
  kh = (e) => (e.length === 0 ? "" : e.join("")),
  Oh = Gd;
function Gl(e, t) {
  return (
    (e = Math.abs(e)),
    t === 2 ? (e ? (e > 1 ? 1 : 0) : 1) : e ? Math.min(e, 2) : 0
  );
}
function Ph(e) {
  const t = Oe(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Oe(e.named.count) || Oe(e.named.n))
    ? Oe(e.named.count)
      ? e.named.count
      : Oe(e.named.n)
      ? e.named.n
      : t
    : t;
}
function wh(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Ah(e = {}) {
  const t = e.locale,
    n = Ph(e),
    r =
      pe(e.pluralRules) && U(t) && ve(e.pluralRules[t]) ? e.pluralRules[t] : Gl,
    s = pe(e.pluralRules) && U(t) && ve(e.pluralRules[t]) ? Gl : void 0,
    l = (m) => m[r(n, m.length, s)],
    o = e.list || [],
    i = (m) => o[m],
    a = e.named || {};
  Oe(e.pluralIndex) && wh(n, a);
  const f = (m) => a[m];
  function d(m) {
    const y = ve(e.messages)
      ? e.messages(m)
      : pe(e.messages)
      ? e.messages[m]
      : !1;
    return y || (e.parent ? e.parent.message(m) : Lh);
  }
  const g = (m) => (e.modifiers ? e.modifiers[m] : Ch),
    h =
      q(e.processor) && ve(e.processor.normalize) ? e.processor.normalize : kh,
    _ =
      q(e.processor) && ve(e.processor.interpolate)
        ? e.processor.interpolate
        : Oh,
    E = q(e.processor) && U(e.processor.type) ? e.processor.type : Ih,
    N = {
      list: i,
      named: f,
      plural: l,
      linked: (m, ...y) => {
        const [T, L] = y;
        let I = "text",
          S = "";
        y.length === 1
          ? pe(T)
            ? ((S = T.modifier || S), (I = T.type || I))
            : U(T) && (S = T || S)
          : y.length === 2 && (U(T) && (S = T || S), U(L) && (I = L || I));
        let w = d(m)(N);
        return I === "vnode" && me(w) && S && (w = w[0]), S ? g(S)(w, I) : w;
      },
      message: d,
      type: E,
      interpolate: _,
      normalize: h,
    };
  return N;
}
let Rn = null;
function Nh(e) {
  Rn = e;
}
function Rh(e, t, n) {
  Rn &&
    Rn.emit(Ki.I18nInit, {
      timestamp: Date.now(),
      i18n: e,
      version: t,
      meta: n,
    });
}
const Sh = Mh(Ki.FunctionTranslate);
function Mh(e) {
  return (t) => Rn && Rn.emit(e, t);
}
const Fh = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  __EXTEND_POINT__: 7,
};
function xh(e, t, n) {
  return [
    ...new Set([n, ...(me(t) ? t : pe(t) ? Object.keys(t) : U(t) ? [t] : [n])]),
  ];
}
function Yi(e, t, n) {
  const r = U(n) ? n : Mn,
    s = e;
  s.__localeChainCache || (s.__localeChainCache = new Map());
  let l = s.__localeChainCache.get(r);
  if (!l) {
    l = [];
    let o = [n];
    for (; me(o); ) o = Xl(l, o, t);
    const i = me(t) || !q(t) ? t : t.default ? t.default : null;
    (o = U(i) ? [i] : i), me(o) && Xl(l, o, !1), s.__localeChainCache.set(r, l);
  }
  return l;
}
function Xl(e, t, n) {
  let r = !0;
  for (let s = 0; s < t.length && le(r); s++) {
    const l = t[s];
    U(l) && (r = Dh(e, t[s], n));
  }
  return r;
}
function Dh(e, t, n) {
  let r;
  const s = t.split("-");
  do {
    const l = s.join("-");
    (r = $h(e, l, n)), s.splice(-1, 1);
  } while (s.length && r === !0);
  return r;
}
function $h(e, t, n) {
  let r = !1;
  if (!e.includes(t) && ((r = !0), t)) {
    r = t[t.length - 1] !== "!";
    const s = t.replace(/!/g, "");
    e.push(s), (me(n) || q(n)) && n[s] && (r = n[s]);
  }
  return r;
}
const Hh = "9.2.2",
  Cr = -1,
  Mn = "en-US",
  ql = "",
  Jl = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Uh() {
  return {
    upper: (e, t) =>
      t === "text" && U(e)
        ? e.toUpperCase()
        : t === "vnode" && pe(e) && "__v_isVNode" in e
        ? e.children.toUpperCase()
        : e,
    lower: (e, t) =>
      t === "text" && U(e)
        ? e.toLowerCase()
        : t === "vnode" && pe(e) && "__v_isVNode" in e
        ? e.children.toLowerCase()
        : e,
    capitalize: (e, t) =>
      t === "text" && U(e)
        ? Jl(e)
        : t === "vnode" && pe(e) && "__v_isVNode" in e
        ? Jl(e.children)
        : e,
  };
}
let Gi;
function Wh(e) {
  Gi = e;
}
let Xi;
function jh(e) {
  Xi = e;
}
let qi;
function Bh(e) {
  qi = e;
}
let Ji = null;
const Ql = (e) => {
    Ji = e;
  },
  Vh = () => Ji;
let Qi = null;
const Zl = (e) => {
    Qi = e;
  },
  Kh = () => Qi;
let zl = 0;
function Yh(e = {}) {
  const t = U(e.version) ? e.version : Hh,
    n = U(e.locale) ? e.locale : Mn,
    r =
      me(e.fallbackLocale) ||
      q(e.fallbackLocale) ||
      U(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : n,
    s = q(e.messages) ? e.messages : { [n]: {} },
    l = q(e.datetimeFormats) ? e.datetimeFormats : { [n]: {} },
    o = q(e.numberFormats) ? e.numberFormats : { [n]: {} },
    i = Ne({}, e.modifiers || {}, Uh()),
    a = e.pluralRules || {},
    f = ve(e.missing) ? e.missing : null,
    d = le(e.missingWarn) || wt(e.missingWarn) ? e.missingWarn : !0,
    g = le(e.fallbackWarn) || wt(e.fallbackWarn) ? e.fallbackWarn : !0,
    h = !!e.fallbackFormat,
    _ = !!e.unresolving,
    E = ve(e.postTranslation) ? e.postTranslation : null,
    O = q(e.processor) ? e.processor : null,
    N = le(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    m = !!e.escapeParameter,
    y = ve(e.messageCompiler) ? e.messageCompiler : Gi,
    T = ve(e.messageResolver) ? e.messageResolver : Xi || vh,
    L = ve(e.localeFallbacker) ? e.localeFallbacker : qi || xh,
    I = pe(e.fallbackContext) ? e.fallbackContext : void 0,
    S = ve(e.onWarn) ? e.onWarn : Kd,
    w = e,
    F = pe(w.__datetimeFormatters) ? w.__datetimeFormatters : new Map(),
    K = pe(w.__numberFormatters) ? w.__numberFormatters : new Map(),
    Y = pe(w.__meta) ? w.__meta : {};
  zl++;
  const G = {
    version: t,
    cid: zl,
    locale: n,
    fallbackLocale: r,
    messages: s,
    modifiers: i,
    pluralRules: a,
    missing: f,
    missingWarn: d,
    fallbackWarn: g,
    fallbackFormat: h,
    unresolving: _,
    postTranslation: E,
    processor: O,
    warnHtmlMessage: N,
    escapeParameter: m,
    messageCompiler: y,
    messageResolver: T,
    localeFallbacker: L,
    fallbackContext: I,
    onWarn: S,
    __meta: Y,
  };
  return (
    (G.datetimeFormats = l),
    (G.numberFormats = o),
    (G.__datetimeFormatters = F),
    (G.__numberFormatters = K),
    __INTLIFY_PROD_DEVTOOLS__ && Rh(G, t, Y),
    G
  );
}
function Bs(e, t, n, r, s) {
  const { missing: l, onWarn: o } = e;
  if (l !== null) {
    const i = l(e, n, t, s);
    return U(i) ? i : t;
  } else return t;
}
function gn(e, t, n) {
  const r = e;
  (r.__localeChainCache = new Map()), e.localeFallbacker(e, n, t);
}
const Gh = (e) => e;
let eo = Object.create(null);
function Xh(e, t = {}) {
  {
    const r = (t.onCacheKey || Gh)(e),
      s = eo[r];
    if (s) return s;
    let l = !1;
    const o = t.onError || Xd;
    t.onError = (f) => {
      (l = !0), o(f);
    };
    const { code: i } = mh(e, t),
      a = new Function(`return ${i}`)();
    return l ? a : (eo[r] = a);
  }
}
let Zi = ce.__EXTEND_POINT__;
const Hr = () => ++Zi,
  Gt = {
    INVALID_ARGUMENT: Zi,
    INVALID_DATE_ARGUMENT: Hr(),
    INVALID_ISO_DATE_ARGUMENT: Hr(),
    __EXTEND_POINT__: Hr(),
  };
function Xt(e) {
  return Tr(e, null, void 0);
}
const to = () => "",
  it = (e) => ve(e);
function no(e, ...t) {
  const {
      fallbackFormat: n,
      postTranslation: r,
      unresolving: s,
      messageCompiler: l,
      fallbackLocale: o,
      messages: i,
    } = e,
    [a, f] = ss(...t),
    d = le(f.missingWarn) ? f.missingWarn : e.missingWarn,
    g = le(f.fallbackWarn) ? f.fallbackWarn : e.fallbackWarn,
    h = le(f.escapeParameter) ? f.escapeParameter : e.escapeParameter,
    _ = !!f.resolvedMessage,
    E =
      U(f.default) || le(f.default)
        ? le(f.default)
          ? l
            ? a
            : () => a
          : f.default
        : n
        ? l
          ? a
          : () => a
        : "",
    O = n || E !== "",
    N = U(f.locale) ? f.locale : e.locale;
  h && qh(f);
  let [m, y, T] = _ ? [a, N, i[N] || {}] : zi(e, a, N, o, g, d),
    L = m,
    I = a;
  if (
    (!_ && !(U(L) || it(L)) && O && ((L = E), (I = L)),
    !_ && (!(U(L) || it(L)) || !U(y)))
  )
    return s ? Cr : a;
  let S = !1;
  const w = () => {
      S = !0;
    },
    F = it(L) ? L : ea(e, a, y, L, I, w);
  if (S) return L;
  const K = Zh(e, y, T, f),
    Y = Ah(K),
    G = Jh(e, F, Y),
    de = r ? r(G, a) : G;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const ne = {
      timestamp: Date.now(),
      key: U(a) ? a : it(L) ? L.key : "",
      locale: y || (it(L) ? L.locale : ""),
      format: U(L) ? L : it(L) ? L.source : "",
      message: de,
    };
    (ne.meta = Ne({}, e.__meta, Vh() || {})), Sh(ne);
  }
  return de;
}
function qh(e) {
  me(e.list)
    ? (e.list = e.list.map((t) => (U(t) ? Bl(t) : t)))
    : pe(e.named) &&
      Object.keys(e.named).forEach((t) => {
        U(e.named[t]) && (e.named[t] = Bl(e.named[t]));
      });
}
function zi(e, t, n, r, s, l) {
  const { messages: o, onWarn: i, messageResolver: a, localeFallbacker: f } = e,
    d = f(e, r, n);
  let g = {},
    h,
    _ = null;
  const E = "translate";
  for (
    let O = 0;
    O < d.length &&
    ((h = d[O]),
    (g = o[h] || {}),
    (_ = a(g, t)) === null && (_ = g[t]),
    !(U(_) || ve(_)));
    O++
  ) {
    const N = Bs(e, t, h, l, E);
    N !== t && (_ = N);
  }
  return [_, h, g];
}
function ea(e, t, n, r, s, l) {
  const { messageCompiler: o, warnHtmlMessage: i } = e;
  if (it(r)) {
    const f = r;
    return (f.locale = f.locale || n), (f.key = f.key || t), f;
  }
  if (o == null) {
    const f = () => r;
    return (f.locale = n), (f.key = t), f;
  }
  const a = o(r, Qh(e, n, s, r, i, l));
  return (a.locale = n), (a.key = t), (a.source = r), a;
}
function Jh(e, t, n) {
  return t(n);
}
function ss(...e) {
  const [t, n, r] = e,
    s = {};
  if (!U(t) && !Oe(t) && !it(t)) throw Xt(Gt.INVALID_ARGUMENT);
  const l = Oe(t) ? String(t) : (it(t), t);
  return (
    Oe(n)
      ? (s.plural = n)
      : U(n)
      ? (s.default = n)
      : q(n) && !vr(n)
      ? (s.named = n)
      : me(n) && (s.list = n),
    Oe(r) ? (s.plural = r) : U(r) ? (s.default = r) : q(r) && Ne(s, r),
    [l, s]
  );
}
function Qh(e, t, n, r, s, l) {
  return {
    warnHtmlMessage: s,
    onError: (o) => {
      throw (l && l(o), o);
    },
    onCacheKey: (o) => jd(t, n, o),
  };
}
function Zh(e, t, n, r) {
  const {
      modifiers: s,
      pluralRules: l,
      messageResolver: o,
      fallbackLocale: i,
      fallbackWarn: a,
      missingWarn: f,
      fallbackContext: d,
    } = e,
    h = {
      locale: t,
      modifiers: s,
      pluralRules: l,
      messages: (_) => {
        let E = o(n, _);
        if (E == null && d) {
          const [, , O] = zi(d, _, t, i, a, f);
          E = o(O, _);
        }
        if (U(E)) {
          let O = !1;
          const m = ea(e, _, t, E, _, () => {
            O = !0;
          });
          return O ? to : m;
        } else return it(E) ? E : to;
      },
    };
  return (
    e.processor && (h.processor = e.processor),
    r.list && (h.list = r.list),
    r.named && (h.named = r.named),
    Oe(r.plural) && (h.pluralIndex = r.plural),
    h
  );
}
function ro(e, ...t) {
  const {
      datetimeFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: l,
      localeFallbacker: o,
    } = e,
    { __datetimeFormatters: i } = e,
    [a, f, d, g] = ls(...t),
    h = le(d.missingWarn) ? d.missingWarn : e.missingWarn;
  le(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn;
  const _ = !!d.part,
    E = U(d.locale) ? d.locale : e.locale,
    O = o(e, s, E);
  if (!U(a) || a === "") return new Intl.DateTimeFormat(E, g).format(f);
  let N = {},
    m,
    y = null;
  const T = "datetime format";
  for (
    let S = 0;
    S < O.length && ((m = O[S]), (N = n[m] || {}), (y = N[a]), !q(y));
    S++
  )
    Bs(e, a, m, h, T);
  if (!q(y) || !U(m)) return r ? Cr : a;
  let L = `${m}__${a}`;
  vr(g) || (L = `${L}__${JSON.stringify(g)}`);
  let I = i.get(L);
  return (
    I || ((I = new Intl.DateTimeFormat(m, Ne({}, y, g))), i.set(L, I)),
    _ ? I.formatToParts(f) : I.format(f)
  );
}
const ta = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits",
];
function ls(...e) {
  const [t, n, r, s] = e,
    l = {};
  let o = {},
    i;
  if (U(t)) {
    const a = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!a) throw Xt(Gt.INVALID_ISO_DATE_ARGUMENT);
    const f = a[3]
      ? a[3].trim().startsWith("T")
        ? `${a[1].trim()}${a[3].trim()}`
        : `${a[1].trim()}T${a[3].trim()}`
      : a[1].trim();
    i = new Date(f);
    try {
      i.toISOString();
    } catch {
      throw Xt(Gt.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Vd(t)) {
    if (isNaN(t.getTime())) throw Xt(Gt.INVALID_DATE_ARGUMENT);
    i = t;
  } else if (Oe(t)) i = t;
  else throw Xt(Gt.INVALID_ARGUMENT);
  return (
    U(n)
      ? (l.key = n)
      : q(n) &&
        Object.keys(n).forEach((a) => {
          ta.includes(a) ? (o[a] = n[a]) : (l[a] = n[a]);
        }),
    U(r) ? (l.locale = r) : q(r) && (o = r),
    q(s) && (o = s),
    [l.key || "", i, l, o]
  );
}
function so(e, t, n) {
  const r = e;
  for (const s in n) {
    const l = `${t}__${s}`;
    !r.__datetimeFormatters.has(l) || r.__datetimeFormatters.delete(l);
  }
}
function lo(e, ...t) {
  const {
      numberFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: l,
      localeFallbacker: o,
    } = e,
    { __numberFormatters: i } = e,
    [a, f, d, g] = os(...t),
    h = le(d.missingWarn) ? d.missingWarn : e.missingWarn;
  le(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn;
  const _ = !!d.part,
    E = U(d.locale) ? d.locale : e.locale,
    O = o(e, s, E);
  if (!U(a) || a === "") return new Intl.NumberFormat(E, g).format(f);
  let N = {},
    m,
    y = null;
  const T = "number format";
  for (
    let S = 0;
    S < O.length && ((m = O[S]), (N = n[m] || {}), (y = N[a]), !q(y));
    S++
  )
    Bs(e, a, m, h, T);
  if (!q(y) || !U(m)) return r ? Cr : a;
  let L = `${m}__${a}`;
  vr(g) || (L = `${L}__${JSON.stringify(g)}`);
  let I = i.get(L);
  return (
    I || ((I = new Intl.NumberFormat(m, Ne({}, y, g))), i.set(L, I)),
    _ ? I.formatToParts(f) : I.format(f)
  );
}
const na = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay",
];
function os(...e) {
  const [t, n, r, s] = e,
    l = {};
  let o = {};
  if (!Oe(t)) throw Xt(Gt.INVALID_ARGUMENT);
  const i = t;
  return (
    U(n)
      ? (l.key = n)
      : q(n) &&
        Object.keys(n).forEach((a) => {
          na.includes(a) ? (o[a] = n[a]) : (l[a] = n[a]);
        }),
    U(r) ? (l.locale = r) : q(r) && (o = r),
    q(s) && (o = s),
    [l.key || "", i, l, o]
  );
}
function oo(e, t, n) {
  const r = e;
  for (const s in n) {
    const l = `${t}__${s}`;
    !r.__numberFormatters.has(l) || r.__numberFormatters.delete(l);
  }
}
typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" &&
  (Ln().__INTLIFY_PROD_DEVTOOLS__ = !1);
/*!
 * vue-i18n v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const zh = "9.2.2";
function em() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" &&
    (Ln().__VUE_I18N_FULL_INSTALL__ = !0),
    typeof __VUE_I18N_LEGACY_API__ != "boolean" &&
      (Ln().__VUE_I18N_LEGACY_API__ = !0),
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" &&
      (Ln().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
Fh.__EXTEND_POINT__;
let ra = ce.__EXTEND_POINT__;
const Ue = () => ++ra,
  Le = {
    UNEXPECTED_RETURN_TYPE: ra,
    INVALID_ARGUMENT: Ue(),
    MUST_BE_CALL_SETUP_TOP: Ue(),
    NOT_INSLALLED: Ue(),
    NOT_AVAILABLE_IN_LEGACY_MODE: Ue(),
    REQUIRED_VALUE: Ue(),
    INVALID_VALUE: Ue(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Ue(),
    NOT_INSLALLED_WITH_PROVIDE: Ue(),
    UNEXPECTED_ERROR: Ue(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: Ue(),
    BRIDGE_SUPPORT_VUE_2_ONLY: Ue(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Ue(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Ue(),
    __EXTEND_POINT__: Ue(),
  };
function Pe(e, ...t) {
  return Tr(e, null, void 0);
}
const is = At("__transrateVNode"),
  as = At("__datetimeParts"),
  cs = At("__numberParts"),
  sa = At("__setPluralRules");
At("__intlifyMeta");
const la = At("__injectWithOption");
function us(e) {
  if (!pe(e)) return e;
  for (const t in e)
    if (!!Us(e, t))
      if (!t.includes(".")) pe(e[t]) && us(e[t]);
      else {
        const n = t.split("."),
          r = n.length - 1;
        let s = e;
        for (let l = 0; l < r; l++) n[l] in s || (s[n[l]] = {}), (s = s[n[l]]);
        (s[n[r]] = e[t]), delete e[t], pe(s[n[r]]) && us(s[n[r]]);
      }
  return e;
}
function Lr(e, t) {
  const { messages: n, __i18n: r, messageResolver: s, flatJson: l } = t,
    o = q(n) ? n : me(r) ? {} : { [e]: {} };
  if (
    (me(r) &&
      r.forEach((i) => {
        if ("locale" in i && "resource" in i) {
          const { locale: a, resource: f } = i;
          a ? ((o[a] = o[a] || {}), In(f, o[a])) : In(f, o);
        } else U(i) && In(JSON.parse(i), o);
      }),
    s == null && l)
  )
    for (const i in o) Us(o, i) && us(o[i]);
  return o;
}
const Kn = (e) => !pe(e) || me(e);
function In(e, t) {
  if (Kn(e) || Kn(t)) throw Pe(Le.INVALID_VALUE);
  for (const n in e)
    Us(e, n) && (Kn(e[n]) || Kn(t[n]) ? (t[n] = e[n]) : In(e[n], t[n]));
}
function oa(e) {
  return e.type;
}
function ia(e, t, n) {
  let r = pe(t.messages) ? t.messages : {};
  "__i18nGlobal" in n &&
    (r = Lr(e.locale.value, { messages: r, __i18n: n.__i18nGlobal }));
  const s = Object.keys(r);
  s.length &&
    s.forEach((l) => {
      e.mergeLocaleMessage(l, r[l]);
    });
  {
    if (pe(t.datetimeFormats)) {
      const l = Object.keys(t.datetimeFormats);
      l.length &&
        l.forEach((o) => {
          e.mergeDateTimeFormat(o, t.datetimeFormats[o]);
        });
    }
    if (pe(t.numberFormats)) {
      const l = Object.keys(t.numberFormats);
      l.length &&
        l.forEach((o) => {
          e.mergeNumberFormat(o, t.numberFormats[o]);
        });
    }
  }
}
function io(e) {
  return Ce(Ht, null, e, 0);
}
const ao = "__INTLIFY_META__";
let co = 0;
function uo(e) {
  return (t, n, r, s) => e(n, r, Pt() || void 0, s);
}
const tm = () => {
  const e = Pt();
  let t = null;
  return e && (t = oa(e)[ao]) ? { [ao]: t } : null;
};
function Vs(e = {}, t) {
  const { __root: n } = e,
    r = n === void 0;
  let s = le(e.inheritLocale) ? e.inheritLocale : !0;
  const l = ke(n && s ? n.locale.value : U(e.locale) ? e.locale : Mn),
    o = ke(
      n && s
        ? n.fallbackLocale.value
        : U(e.fallbackLocale) ||
          me(e.fallbackLocale) ||
          q(e.fallbackLocale) ||
          e.fallbackLocale === !1
        ? e.fallbackLocale
        : l.value
    ),
    i = ke(Lr(l.value, e)),
    a = ke(q(e.datetimeFormats) ? e.datetimeFormats : { [l.value]: {} }),
    f = ke(q(e.numberFormats) ? e.numberFormats : { [l.value]: {} });
  let d = n
      ? n.missingWarn
      : le(e.missingWarn) || wt(e.missingWarn)
      ? e.missingWarn
      : !0,
    g = n
      ? n.fallbackWarn
      : le(e.fallbackWarn) || wt(e.fallbackWarn)
      ? e.fallbackWarn
      : !0,
    h = n ? n.fallbackRoot : le(e.fallbackRoot) ? e.fallbackRoot : !0,
    _ = !!e.fallbackFormat,
    E = ve(e.missing) ? e.missing : null,
    O = ve(e.missing) ? uo(e.missing) : null,
    N = ve(e.postTranslation) ? e.postTranslation : null,
    m = n ? n.warnHtmlMessage : le(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    y = !!e.escapeParameter;
  const T = n ? n.modifiers : q(e.modifiers) ? e.modifiers : {};
  let L = e.pluralRules || (n && n.pluralRules),
    I;
  (I = (() => {
    r && Zl(null);
    const C = {
      version: zh,
      locale: l.value,
      fallbackLocale: o.value,
      messages: i.value,
      modifiers: T,
      pluralRules: L,
      missing: O === null ? void 0 : O,
      missingWarn: d,
      fallbackWarn: g,
      fallbackFormat: _,
      unresolving: !0,
      postTranslation: N === null ? void 0 : N,
      warnHtmlMessage: m,
      escapeParameter: y,
      messageResolver: e.messageResolver,
      __meta: { framework: "vue" },
    };
    (C.datetimeFormats = a.value),
      (C.numberFormats = f.value),
      (C.__datetimeFormatters = q(I) ? I.__datetimeFormatters : void 0),
      (C.__numberFormatters = q(I) ? I.__numberFormatters : void 0);
    const k = Yh(C);
    return r && Zl(k), k;
  })()),
    gn(I, l.value, o.value);
  function w() {
    return [l.value, o.value, i.value, a.value, f.value];
  }
  const F = be({
      get: () => l.value,
      set: (C) => {
        (l.value = C), (I.locale = l.value);
      },
    }),
    K = be({
      get: () => o.value,
      set: (C) => {
        (o.value = C), (I.fallbackLocale = o.value), gn(I, l.value, C);
      },
    }),
    Y = be(() => i.value),
    G = be(() => a.value),
    de = be(() => f.value);
  function ne() {
    return ve(N) ? N : null;
  }
  function j(C) {
    (N = C), (I.postTranslation = C);
  }
  function ie() {
    return E;
  }
  function Q(C) {
    C !== null && (O = uo(C)), (E = C), (I.missing = O);
  }
  const te = (C, k, W, V, z, ue) => {
    w();
    let se;
    if (__INTLIFY_PROD_DEVTOOLS__)
      try {
        Ql(tm()), r || (I.fallbackContext = n ? Kh() : void 0), (se = C(I));
      } finally {
        Ql(null), r || (I.fallbackContext = void 0);
      }
    else se = C(I);
    if (Oe(se) && se === Cr) {
      const [Ee, Ge] = k();
      return n && h ? V(n) : z(Ee);
    } else {
      if (ue(se)) return se;
      throw Pe(Le.UNEXPECTED_RETURN_TYPE);
    }
  };
  function re(...C) {
    return te(
      (k) => Reflect.apply(no, null, [k, ...C]),
      () => ss(...C),
      "translate",
      (k) => Reflect.apply(k.t, k, [...C]),
      (k) => k,
      (k) => U(k)
    );
  }
  function we(...C) {
    const [k, W, V] = C;
    if (V && !pe(V)) throw Pe(Le.INVALID_ARGUMENT);
    return re(k, W, Ne({ resolvedMessage: !0 }, V || {}));
  }
  function je(...C) {
    return te(
      (k) => Reflect.apply(ro, null, [k, ...C]),
      () => ls(...C),
      "datetime format",
      (k) => Reflect.apply(k.d, k, [...C]),
      () => ql,
      (k) => U(k)
    );
  }
  function Re(...C) {
    return te(
      (k) => Reflect.apply(lo, null, [k, ...C]),
      () => os(...C),
      "number format",
      (k) => Reflect.apply(k.n, k, [...C]),
      () => ql,
      (k) => U(k)
    );
  }
  function Te(C) {
    return C.map((k) => (U(k) || Oe(k) || le(k) ? io(String(k)) : k));
  }
  const Qe = { normalize: Te, interpolate: (C) => C, type: "vnode" };
  function R(...C) {
    return te(
      (k) => {
        let W;
        const V = k;
        try {
          (V.processor = Qe), (W = Reflect.apply(no, null, [V, ...C]));
        } finally {
          V.processor = null;
        }
        return W;
      },
      () => ss(...C),
      "translate",
      (k) => k[is](...C),
      (k) => [io(k)],
      (k) => me(k)
    );
  }
  function H(...C) {
    return te(
      (k) => Reflect.apply(lo, null, [k, ...C]),
      () => os(...C),
      "number format",
      (k) => k[cs](...C),
      () => [],
      (k) => U(k) || me(k)
    );
  }
  function $(...C) {
    return te(
      (k) => Reflect.apply(ro, null, [k, ...C]),
      () => ls(...C),
      "datetime format",
      (k) => k[as](...C),
      () => [],
      (k) => U(k) || me(k)
    );
  }
  function B(C) {
    (L = C), (I.pluralRules = L);
  }
  function Z(C, k) {
    const W = U(k) ? k : l.value,
      V = p(W);
    return I.messageResolver(V, C) !== null;
  }
  function ae(C) {
    let k = null;
    const W = Yi(I, o.value, l.value);
    for (let V = 0; V < W.length; V++) {
      const z = i.value[W[V]] || {},
        ue = I.messageResolver(z, C);
      if (ue != null) {
        k = ue;
        break;
      }
    }
    return k;
  }
  function X(C) {
    const k = ae(C);
    return k != null ? k : n ? n.tm(C) || {} : {};
  }
  function p(C) {
    return i.value[C] || {};
  }
  function c(C, k) {
    (i.value[C] = k), (I.messages = i.value);
  }
  function u(C, k) {
    (i.value[C] = i.value[C] || {}), In(k, i.value[C]), (I.messages = i.value);
  }
  function b(C) {
    return a.value[C] || {};
  }
  function v(C, k) {
    (a.value[C] = k), (I.datetimeFormats = a.value), so(I, C, k);
  }
  function P(C, k) {
    (a.value[C] = Ne(a.value[C] || {}, k)),
      (I.datetimeFormats = a.value),
      so(I, C, k);
  }
  function M(C) {
    return f.value[C] || {};
  }
  function x(C, k) {
    (f.value[C] = k), (I.numberFormats = f.value), oo(I, C, k);
  }
  function D(C, k) {
    (f.value[C] = Ne(f.value[C] || {}, k)),
      (I.numberFormats = f.value),
      oo(I, C, k);
  }
  co++,
    n &&
      ns &&
      (mt(n.locale, (C) => {
        s && ((l.value = C), (I.locale = C), gn(I, l.value, o.value));
      }),
      mt(n.fallbackLocale, (C) => {
        s && ((o.value = C), (I.fallbackLocale = C), gn(I, l.value, o.value));
      }));
  const A = {
    id: co,
    locale: F,
    fallbackLocale: K,
    get inheritLocale() {
      return s;
    },
    set inheritLocale(C) {
      (s = C),
        C &&
          n &&
          ((l.value = n.locale.value),
          (o.value = n.fallbackLocale.value),
          gn(I, l.value, o.value));
    },
    get availableLocales() {
      return Object.keys(i.value).sort();
    },
    messages: Y,
    get modifiers() {
      return T;
    },
    get pluralRules() {
      return L || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return d;
    },
    set missingWarn(C) {
      (d = C), (I.missingWarn = d);
    },
    get fallbackWarn() {
      return g;
    },
    set fallbackWarn(C) {
      (g = C), (I.fallbackWarn = g);
    },
    get fallbackRoot() {
      return h;
    },
    set fallbackRoot(C) {
      h = C;
    },
    get fallbackFormat() {
      return _;
    },
    set fallbackFormat(C) {
      (_ = C), (I.fallbackFormat = _);
    },
    get warnHtmlMessage() {
      return m;
    },
    set warnHtmlMessage(C) {
      (m = C), (I.warnHtmlMessage = C);
    },
    get escapeParameter() {
      return y;
    },
    set escapeParameter(C) {
      (y = C), (I.escapeParameter = C);
    },
    t: re,
    getLocaleMessage: p,
    setLocaleMessage: c,
    mergeLocaleMessage: u,
    getPostTranslationHandler: ne,
    setPostTranslationHandler: j,
    getMissingHandler: ie,
    setMissingHandler: Q,
    [sa]: B,
  };
  return (
    (A.datetimeFormats = G),
    (A.numberFormats = de),
    (A.rt = we),
    (A.te = Z),
    (A.tm = X),
    (A.d = je),
    (A.n = Re),
    (A.getDateTimeFormat = b),
    (A.setDateTimeFormat = v),
    (A.mergeDateTimeFormat = P),
    (A.getNumberFormat = M),
    (A.setNumberFormat = x),
    (A.mergeNumberFormat = D),
    (A[la] = e.__injectWithOption),
    (A[is] = R),
    (A[as] = $),
    (A[cs] = H),
    A
  );
}
function nm(e) {
  const t = U(e.locale) ? e.locale : Mn,
    n =
      U(e.fallbackLocale) ||
      me(e.fallbackLocale) ||
      q(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : t,
    r = ve(e.missing) ? e.missing : void 0,
    s =
      le(e.silentTranslationWarn) || wt(e.silentTranslationWarn)
        ? !e.silentTranslationWarn
        : !0,
    l =
      le(e.silentFallbackWarn) || wt(e.silentFallbackWarn)
        ? !e.silentFallbackWarn
        : !0,
    o = le(e.fallbackRoot) ? e.fallbackRoot : !0,
    i = !!e.formatFallbackMessages,
    a = q(e.modifiers) ? e.modifiers : {},
    f = e.pluralizationRules,
    d = ve(e.postTranslation) ? e.postTranslation : void 0,
    g = U(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0,
    h = !!e.escapeParameterHtml,
    _ = le(e.sync) ? e.sync : !0;
  let E = e.messages;
  if (q(e.sharedMessages)) {
    const I = e.sharedMessages;
    E = Object.keys(I).reduce((w, F) => {
      const K = w[F] || (w[F] = {});
      return Ne(K, I[F]), w;
    }, E || {});
  }
  const { __i18n: O, __root: N, __injectWithOption: m } = e,
    y = e.datetimeFormats,
    T = e.numberFormats,
    L = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: E,
    flatJson: L,
    datetimeFormats: y,
    numberFormats: T,
    missing: r,
    missingWarn: s,
    fallbackWarn: l,
    fallbackRoot: o,
    fallbackFormat: i,
    modifiers: a,
    pluralRules: f,
    postTranslation: d,
    warnHtmlMessage: g,
    escapeParameter: h,
    messageResolver: e.messageResolver,
    inheritLocale: _,
    __i18n: O,
    __root: N,
    __injectWithOption: m,
  };
}
function fs(e = {}, t) {
  {
    const n = Vs(nm(e)),
      r = {
        id: n.id,
        get locale() {
          return n.locale.value;
        },
        set locale(s) {
          n.locale.value = s;
        },
        get fallbackLocale() {
          return n.fallbackLocale.value;
        },
        set fallbackLocale(s) {
          n.fallbackLocale.value = s;
        },
        get messages() {
          return n.messages.value;
        },
        get datetimeFormats() {
          return n.datetimeFormats.value;
        },
        get numberFormats() {
          return n.numberFormats.value;
        },
        get availableLocales() {
          return n.availableLocales;
        },
        get formatter() {
          return {
            interpolate() {
              return [];
            },
          };
        },
        set formatter(s) {},
        get missing() {
          return n.getMissingHandler();
        },
        set missing(s) {
          n.setMissingHandler(s);
        },
        get silentTranslationWarn() {
          return le(n.missingWarn) ? !n.missingWarn : n.missingWarn;
        },
        set silentTranslationWarn(s) {
          n.missingWarn = le(s) ? !s : s;
        },
        get silentFallbackWarn() {
          return le(n.fallbackWarn) ? !n.fallbackWarn : n.fallbackWarn;
        },
        set silentFallbackWarn(s) {
          n.fallbackWarn = le(s) ? !s : s;
        },
        get modifiers() {
          return n.modifiers;
        },
        get formatFallbackMessages() {
          return n.fallbackFormat;
        },
        set formatFallbackMessages(s) {
          n.fallbackFormat = s;
        },
        get postTranslation() {
          return n.getPostTranslationHandler();
        },
        set postTranslation(s) {
          n.setPostTranslationHandler(s);
        },
        get sync() {
          return n.inheritLocale;
        },
        set sync(s) {
          n.inheritLocale = s;
        },
        get warnHtmlInMessage() {
          return n.warnHtmlMessage ? "warn" : "off";
        },
        set warnHtmlInMessage(s) {
          n.warnHtmlMessage = s !== "off";
        },
        get escapeParameterHtml() {
          return n.escapeParameter;
        },
        set escapeParameterHtml(s) {
          n.escapeParameter = s;
        },
        get preserveDirectiveContent() {
          return !0;
        },
        set preserveDirectiveContent(s) {},
        get pluralizationRules() {
          return n.pluralRules || {};
        },
        __composer: n,
        t(...s) {
          const [l, o, i] = s,
            a = {};
          let f = null,
            d = null;
          if (!U(l)) throw Pe(Le.INVALID_ARGUMENT);
          const g = l;
          return (
            U(o) ? (a.locale = o) : me(o) ? (f = o) : q(o) && (d = o),
            me(i) ? (f = i) : q(i) && (d = i),
            Reflect.apply(n.t, n, [g, f || d || {}, a])
          );
        },
        rt(...s) {
          return Reflect.apply(n.rt, n, [...s]);
        },
        tc(...s) {
          const [l, o, i] = s,
            a = { plural: 1 };
          let f = null,
            d = null;
          if (!U(l)) throw Pe(Le.INVALID_ARGUMENT);
          const g = l;
          return (
            U(o)
              ? (a.locale = o)
              : Oe(o)
              ? (a.plural = o)
              : me(o)
              ? (f = o)
              : q(o) && (d = o),
            U(i) ? (a.locale = i) : me(i) ? (f = i) : q(i) && (d = i),
            Reflect.apply(n.t, n, [g, f || d || {}, a])
          );
        },
        te(s, l) {
          return n.te(s, l);
        },
        tm(s) {
          return n.tm(s);
        },
        getLocaleMessage(s) {
          return n.getLocaleMessage(s);
        },
        setLocaleMessage(s, l) {
          n.setLocaleMessage(s, l);
        },
        mergeLocaleMessage(s, l) {
          n.mergeLocaleMessage(s, l);
        },
        d(...s) {
          return Reflect.apply(n.d, n, [...s]);
        },
        getDateTimeFormat(s) {
          return n.getDateTimeFormat(s);
        },
        setDateTimeFormat(s, l) {
          n.setDateTimeFormat(s, l);
        },
        mergeDateTimeFormat(s, l) {
          n.mergeDateTimeFormat(s, l);
        },
        n(...s) {
          return Reflect.apply(n.n, n, [...s]);
        },
        getNumberFormat(s) {
          return n.getNumberFormat(s);
        },
        setNumberFormat(s, l) {
          n.setNumberFormat(s, l);
        },
        mergeNumberFormat(s, l) {
          n.mergeNumberFormat(s, l);
        },
        getChoiceIndex(s, l) {
          return -1;
        },
        __onComponentInstanceCreated(s) {
          const { componentInstanceCreatedListener: l } = e;
          l && l(s, r);
        },
      };
    return r;
  }
}
const Ks = {
  tag: { type: [String, Object] },
  locale: { type: String },
  scope: {
    type: String,
    validator: (e) => e === "parent" || e === "global",
    default: "parent",
  },
  i18n: { type: Object },
};
function rm({ slots: e }, t) {
  return t.length === 1 && t[0] === "default"
    ? (e.default ? e.default() : []).reduce(
        (r, s) => (r = [...r, ...(me(s.children) ? s.children : [s])]),
        []
      )
    : t.reduce((n, r) => {
        const s = e[r];
        return s && (n[r] = s()), n;
      }, {});
}
function aa(e) {
  return Se;
}
const fo = {
  name: "i18n-t",
  props: Ne(
    {
      keypath: { type: String, required: !0 },
      plural: { type: [Number, String], validator: (e) => Oe(e) || !isNaN(e) },
    },
    Ks
  ),
  setup(e, t) {
    const { slots: n, attrs: r } = t,
      s = e.i18n || Ys({ useScope: e.scope, __useComponent: !0 });
    return () => {
      const l = Object.keys(n).filter((g) => g !== "_"),
        o = {};
      e.locale && (o.locale = e.locale),
        e.plural !== void 0 && (o.plural = U(e.plural) ? +e.plural : e.plural);
      const i = rm(t, l),
        a = s[is](e.keypath, i, o),
        f = Ne({}, r),
        d = U(e.tag) || pe(e.tag) ? e.tag : aa();
      return br(d, f, a);
    };
  },
};
function sm(e) {
  return me(e) && !U(e[0]);
}
function ca(e, t, n, r) {
  const { slots: s, attrs: l } = t;
  return () => {
    const o = { part: !0 };
    let i = {};
    e.locale && (o.locale = e.locale),
      U(e.format)
        ? (o.key = e.format)
        : pe(e.format) &&
          (U(e.format.key) && (o.key = e.format.key),
          (i = Object.keys(e.format).reduce(
            (h, _) => (n.includes(_) ? Ne({}, h, { [_]: e.format[_] }) : h),
            {}
          )));
    const a = r(e.value, o, i);
    let f = [o.key];
    me(a)
      ? (f = a.map((h, _) => {
          const E = s[h.type],
            O = E ? E({ [h.type]: h.value, index: _, parts: a }) : [h.value];
          return sm(O) && (O[0].key = `${h.type}-${_}`), O;
        }))
      : U(a) && (f = [a]);
    const d = Ne({}, l),
      g = U(e.tag) || pe(e.tag) ? e.tag : aa();
    return br(g, d, f);
  };
}
const ho = {
    name: "i18n-n",
    props: Ne(
      {
        value: { type: Number, required: !0 },
        format: { type: [String, Object] },
      },
      Ks
    ),
    setup(e, t) {
      const n = e.i18n || Ys({ useScope: "parent", __useComponent: !0 });
      return ca(e, t, na, (...r) => n[cs](...r));
    },
  },
  mo = {
    name: "i18n-d",
    props: Ne(
      {
        value: { type: [Number, Date], required: !0 },
        format: { type: [String, Object] },
      },
      Ks
    ),
    setup(e, t) {
      const n = e.i18n || Ys({ useScope: "parent", __useComponent: !0 });
      return ca(e, t, ta, (...r) => n[as](...r));
    },
  };
function lm(e, t) {
  const n = e;
  if (e.mode === "composition") return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function om(e) {
  const t = (o) => {
    const { instance: i, modifiers: a, value: f } = o;
    if (!i || !i.$) throw Pe(Le.UNEXPECTED_ERROR);
    const d = lm(e, i.$),
      g = po(f);
    return [Reflect.apply(d.t, d, [...go(g)]), d];
  };
  return {
    created: (o, i) => {
      const [a, f] = t(i);
      ns &&
        e.global === f &&
        (o.__i18nWatcher = mt(f.locale, () => {
          i.instance && i.instance.$forceUpdate();
        })),
        (o.__composer = f),
        (o.textContent = a);
    },
    unmounted: (o) => {
      ns &&
        o.__i18nWatcher &&
        (o.__i18nWatcher(), (o.__i18nWatcher = void 0), delete o.__i18nWatcher),
        o.__composer && ((o.__composer = void 0), delete o.__composer);
    },
    beforeUpdate: (o, { value: i }) => {
      if (o.__composer) {
        const a = o.__composer,
          f = po(i);
        o.textContent = Reflect.apply(a.t, a, [...go(f)]);
      }
    },
    getSSRProps: (o) => {
      const [i] = t(o);
      return { textContent: i };
    },
  };
}
function po(e) {
  if (U(e)) return { path: e };
  if (q(e)) {
    if (!("path" in e)) throw Pe(Le.REQUIRED_VALUE, "path");
    return e;
  } else throw Pe(Le.INVALID_VALUE);
}
function go(e) {
  const { path: t, locale: n, args: r, choice: s, plural: l } = e,
    o = {},
    i = r || {};
  return (
    U(n) && (o.locale = n),
    Oe(s) && (o.plural = s),
    Oe(l) && (o.plural = l),
    [t, i, o]
  );
}
function im(e, t, ...n) {
  const r = q(n[0]) ? n[0] : {},
    s = !!r.useI18nComponentName;
  (le(r.globalInstall) ? r.globalInstall : !0) &&
    (e.component(s ? "i18n" : fo.name, fo),
    e.component(ho.name, ho),
    e.component(mo.name, mo)),
    e.directive("t", om(t));
}
function am(e, t, n) {
  return {
    beforeCreate() {
      const r = Pt();
      if (!r) throw Pe(Le.UNEXPECTED_ERROR);
      const s = this.$options;
      if (s.i18n) {
        const l = s.i18n;
        s.__i18n && (l.__i18n = s.__i18n),
          (l.__root = t),
          this === this.$root
            ? (this.$i18n = _o(e, l))
            : ((l.__injectWithOption = !0), (this.$i18n = fs(l)));
      } else
        s.__i18n
          ? this === this.$root
            ? (this.$i18n = _o(e, s))
            : (this.$i18n = fs({
                __i18n: s.__i18n,
                __injectWithOption: !0,
                __root: t,
              }))
          : (this.$i18n = e);
      s.__i18nGlobal && ia(t, s, s),
        e.__onComponentInstanceCreated(this.$i18n),
        n.__setInstance(r, this.$i18n),
        (this.$t = (...l) => this.$i18n.t(...l)),
        (this.$rt = (...l) => this.$i18n.rt(...l)),
        (this.$tc = (...l) => this.$i18n.tc(...l)),
        (this.$te = (l, o) => this.$i18n.te(l, o)),
        (this.$d = (...l) => this.$i18n.d(...l)),
        (this.$n = (...l) => this.$i18n.n(...l)),
        (this.$tm = (l) => this.$i18n.tm(l));
    },
    mounted() {},
    unmounted() {
      const r = Pt();
      if (!r) throw Pe(Le.UNEXPECTED_ERROR);
      delete this.$t,
        delete this.$rt,
        delete this.$tc,
        delete this.$te,
        delete this.$d,
        delete this.$n,
        delete this.$tm,
        n.__deleteInstance(r),
        delete this.$i18n;
    },
  };
}
function _o(e, t) {
  (e.locale = t.locale || e.locale),
    (e.fallbackLocale = t.fallbackLocale || e.fallbackLocale),
    (e.missing = t.missing || e.missing),
    (e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn),
    (e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn),
    (e.formatFallbackMessages =
      t.formatFallbackMessages || e.formatFallbackMessages),
    (e.postTranslation = t.postTranslation || e.postTranslation),
    (e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage),
    (e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml),
    (e.sync = t.sync || e.sync),
    e.__composer[sa](t.pluralizationRules || e.pluralizationRules);
  const n = Lr(e.locale, { messages: t.messages, __i18n: t.__i18n });
  return (
    Object.keys(n).forEach((r) => e.mergeLocaleMessage(r, n[r])),
    t.datetimeFormats &&
      Object.keys(t.datetimeFormats).forEach((r) =>
        e.mergeDateTimeFormat(r, t.datetimeFormats[r])
      ),
    t.numberFormats &&
      Object.keys(t.numberFormats).forEach((r) =>
        e.mergeNumberFormat(r, t.numberFormats[r])
      ),
    e
  );
}
const cm = At("global-vue-i18n");
function um(e = {}, t) {
  const n =
      __VUE_I18N_LEGACY_API__ && le(e.legacy)
        ? e.legacy
        : __VUE_I18N_LEGACY_API__,
    r = le(e.globalInjection) ? e.globalInjection : !0,
    s = __VUE_I18N_LEGACY_API__ && n ? !!e.allowComposition : !0,
    l = new Map(),
    [o, i] = fm(e, n),
    a = At("");
  function f(h) {
    return l.get(h) || null;
  }
  function d(h, _) {
    l.set(h, _);
  }
  function g(h) {
    l.delete(h);
  }
  {
    const h = {
      get mode() {
        return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition";
      },
      get allowComposition() {
        return s;
      },
      async install(_, ...E) {
        (_.__VUE_I18N_SYMBOL__ = a),
          _.provide(_.__VUE_I18N_SYMBOL__, h),
          !n && r && Em(_, h.global),
          __VUE_I18N_FULL_INSTALL__ && im(_, h, ...E),
          __VUE_I18N_LEGACY_API__ && n && _.mixin(am(i, i.__composer, h));
        const O = _.unmount;
        _.unmount = () => {
          h.dispose(), O();
        };
      },
      get global() {
        return i;
      },
      dispose() {
        o.stop();
      },
      __instances: l,
      __getInstance: f,
      __setInstance: d,
      __deleteInstance: g,
    };
    return h;
  }
}
function Ys(e = {}) {
  const t = Pt();
  if (t == null) throw Pe(Le.MUST_BE_CALL_SETUP_TOP);
  if (
    !t.isCE &&
    t.appContext.app != null &&
    !t.appContext.app.__VUE_I18N_SYMBOL__
  )
    throw Pe(Le.NOT_INSLALLED);
  const n = dm(t),
    r = mm(n),
    s = oa(t),
    l = hm(e, s);
  if (__VUE_I18N_LEGACY_API__ && n.mode === "legacy" && !e.__useComponent) {
    if (!n.allowComposition) throw Pe(Le.NOT_AVAILABLE_IN_LEGACY_MODE);
    return _m(t, l, r, e);
  }
  if (l === "global") return ia(r, e, s), r;
  if (l === "parent") {
    let a = pm(n, t, e.__useComponent);
    return a == null && (a = r), a;
  }
  const o = n;
  let i = o.__getInstance(t);
  if (i == null) {
    const a = Ne({}, e);
    "__i18n" in s && (a.__i18n = s.__i18n),
      r && (a.__root = r),
      (i = Vs(a)),
      gm(o, t),
      o.__setInstance(t, i);
  }
  return i;
}
function fm(e, t, n) {
  const r = bs();
  {
    const s =
      __VUE_I18N_LEGACY_API__ && t ? r.run(() => fs(e)) : r.run(() => Vs(e));
    if (s == null) throw Pe(Le.UNEXPECTED_ERROR);
    return [r, s];
  }
}
function dm(e) {
  {
    const t = qe(e.isCE ? cm : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw Pe(e.isCE ? Le.NOT_INSLALLED_WITH_PROVIDE : Le.UNEXPECTED_ERROR);
    return t;
  }
}
function hm(e, t) {
  return vr(e)
    ? "__i18n" in t
      ? "local"
      : "global"
    : e.useScope
    ? e.useScope
    : "local";
}
function mm(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function pm(e, t, n = !1) {
  let r = null;
  const s = t.root;
  let l = t.parent;
  for (; l != null; ) {
    const o = e;
    if (e.mode === "composition") r = o.__getInstance(l);
    else if (__VUE_I18N_LEGACY_API__) {
      const i = o.__getInstance(l);
      i != null && ((r = i.__composer), n && r && !r[la] && (r = null));
    }
    if (r != null || s === l) break;
    l = l.parent;
  }
  return r;
}
function gm(e, t, n) {
  ws(() => {}, t),
    As(() => {
      e.__deleteInstance(t);
    }, t);
}
function _m(e, t, n, r = {}) {
  const s = t === "local",
    l = Uo(null);
  if (s && e.proxy && !(e.proxy.$options.i18n || e.proxy.$options.__i18n))
    throw Pe(Le.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
  const o = le(r.inheritLocale) ? r.inheritLocale : !0,
    i = ke(s && o ? n.locale.value : U(r.locale) ? r.locale : Mn),
    a = ke(
      s && o
        ? n.fallbackLocale.value
        : U(r.fallbackLocale) ||
          me(r.fallbackLocale) ||
          q(r.fallbackLocale) ||
          r.fallbackLocale === !1
        ? r.fallbackLocale
        : i.value
    ),
    f = ke(Lr(i.value, r)),
    d = ke(q(r.datetimeFormats) ? r.datetimeFormats : { [i.value]: {} }),
    g = ke(q(r.numberFormats) ? r.numberFormats : { [i.value]: {} }),
    h = s
      ? n.missingWarn
      : le(r.missingWarn) || wt(r.missingWarn)
      ? r.missingWarn
      : !0,
    _ = s
      ? n.fallbackWarn
      : le(r.fallbackWarn) || wt(r.fallbackWarn)
      ? r.fallbackWarn
      : !0,
    E = s ? n.fallbackRoot : le(r.fallbackRoot) ? r.fallbackRoot : !0,
    O = !!r.fallbackFormat,
    N = ve(r.missing) ? r.missing : null,
    m = ve(r.postTranslation) ? r.postTranslation : null,
    y = s ? n.warnHtmlMessage : le(r.warnHtmlMessage) ? r.warnHtmlMessage : !0,
    T = !!r.escapeParameter,
    L = s ? n.modifiers : q(r.modifiers) ? r.modifiers : {},
    I = r.pluralRules || (s && n.pluralRules);
  function S() {
    return [i.value, a.value, f.value, d.value, g.value];
  }
  const w = be({
      get: () => (l.value ? l.value.locale.value : i.value),
      set: (u) => {
        l.value && (l.value.locale.value = u), (i.value = u);
      },
    }),
    F = be({
      get: () => (l.value ? l.value.fallbackLocale.value : a.value),
      set: (u) => {
        l.value && (l.value.fallbackLocale.value = u), (a.value = u);
      },
    }),
    K = be(() => (l.value ? l.value.messages.value : f.value)),
    Y = be(() => d.value),
    G = be(() => g.value);
  function de() {
    return l.value ? l.value.getPostTranslationHandler() : m;
  }
  function ne(u) {
    l.value && l.value.setPostTranslationHandler(u);
  }
  function j() {
    return l.value ? l.value.getMissingHandler() : N;
  }
  function ie(u) {
    l.value && l.value.setMissingHandler(u);
  }
  function Q(u) {
    return S(), u();
  }
  function te(...u) {
    return l.value
      ? Q(() => Reflect.apply(l.value.t, null, [...u]))
      : Q(() => "");
  }
  function re(...u) {
    return l.value ? Reflect.apply(l.value.rt, null, [...u]) : "";
  }
  function we(...u) {
    return l.value
      ? Q(() => Reflect.apply(l.value.d, null, [...u]))
      : Q(() => "");
  }
  function je(...u) {
    return l.value
      ? Q(() => Reflect.apply(l.value.n, null, [...u]))
      : Q(() => "");
  }
  function Re(u) {
    return l.value ? l.value.tm(u) : {};
  }
  function Te(u, b) {
    return l.value ? l.value.te(u, b) : !1;
  }
  function Je(u) {
    return l.value ? l.value.getLocaleMessage(u) : {};
  }
  function Qe(u, b) {
    l.value && (l.value.setLocaleMessage(u, b), (f.value[u] = b));
  }
  function R(u, b) {
    l.value && l.value.mergeLocaleMessage(u, b);
  }
  function H(u) {
    return l.value ? l.value.getDateTimeFormat(u) : {};
  }
  function $(u, b) {
    l.value && (l.value.setDateTimeFormat(u, b), (d.value[u] = b));
  }
  function B(u, b) {
    l.value && l.value.mergeDateTimeFormat(u, b);
  }
  function Z(u) {
    return l.value ? l.value.getNumberFormat(u) : {};
  }
  function ae(u, b) {
    l.value && (l.value.setNumberFormat(u, b), (g.value[u] = b));
  }
  function X(u, b) {
    l.value && l.value.mergeNumberFormat(u, b);
  }
  const p = {
    get id() {
      return l.value ? l.value.id : -1;
    },
    locale: w,
    fallbackLocale: F,
    messages: K,
    datetimeFormats: Y,
    numberFormats: G,
    get inheritLocale() {
      return l.value ? l.value.inheritLocale : o;
    },
    set inheritLocale(u) {
      l.value && (l.value.inheritLocale = u);
    },
    get availableLocales() {
      return l.value ? l.value.availableLocales : Object.keys(f.value);
    },
    get modifiers() {
      return l.value ? l.value.modifiers : L;
    },
    get pluralRules() {
      return l.value ? l.value.pluralRules : I;
    },
    get isGlobal() {
      return l.value ? l.value.isGlobal : !1;
    },
    get missingWarn() {
      return l.value ? l.value.missingWarn : h;
    },
    set missingWarn(u) {
      l.value && (l.value.missingWarn = u);
    },
    get fallbackWarn() {
      return l.value ? l.value.fallbackWarn : _;
    },
    set fallbackWarn(u) {
      l.value && (l.value.missingWarn = u);
    },
    get fallbackRoot() {
      return l.value ? l.value.fallbackRoot : E;
    },
    set fallbackRoot(u) {
      l.value && (l.value.fallbackRoot = u);
    },
    get fallbackFormat() {
      return l.value ? l.value.fallbackFormat : O;
    },
    set fallbackFormat(u) {
      l.value && (l.value.fallbackFormat = u);
    },
    get warnHtmlMessage() {
      return l.value ? l.value.warnHtmlMessage : y;
    },
    set warnHtmlMessage(u) {
      l.value && (l.value.warnHtmlMessage = u);
    },
    get escapeParameter() {
      return l.value ? l.value.escapeParameter : T;
    },
    set escapeParameter(u) {
      l.value && (l.value.escapeParameter = u);
    },
    t: te,
    getPostTranslationHandler: de,
    setPostTranslationHandler: ne,
    getMissingHandler: j,
    setMissingHandler: ie,
    rt: re,
    d: we,
    n: je,
    tm: Re,
    te: Te,
    getLocaleMessage: Je,
    setLocaleMessage: Qe,
    mergeLocaleMessage: R,
    getDateTimeFormat: H,
    setDateTimeFormat: $,
    mergeDateTimeFormat: B,
    getNumberFormat: Z,
    setNumberFormat: ae,
    mergeNumberFormat: X,
  };
  function c(u) {
    (u.locale.value = i.value),
      (u.fallbackLocale.value = a.value),
      Object.keys(f.value).forEach((b) => {
        u.mergeLocaleMessage(b, f.value[b]);
      }),
      Object.keys(d.value).forEach((b) => {
        u.mergeDateTimeFormat(b, d.value[b]);
      }),
      Object.keys(g.value).forEach((b) => {
        u.mergeNumberFormat(b, g.value[b]);
      }),
      (u.escapeParameter = T),
      (u.fallbackFormat = O),
      (u.fallbackRoot = E),
      (u.fallbackWarn = _),
      (u.missingWarn = h),
      (u.warnHtmlMessage = y);
  }
  return (
    zo(() => {
      if (e.proxy == null || e.proxy.$i18n == null)
        throw Pe(Le.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
      const u = (l.value = e.proxy.$i18n.__composer);
      t === "global"
        ? ((i.value = u.locale.value),
          (a.value = u.fallbackLocale.value),
          (f.value = u.messages.value),
          (d.value = u.datetimeFormats.value),
          (g.value = u.numberFormats.value))
        : s && c(u);
    }),
    p
  );
}
const bm = ["locale", "fallbackLocale", "availableLocales"],
  ym = ["t", "rt", "d", "n", "tm"];
function Em(e, t) {
  const n = Object.create(null);
  bm.forEach((r) => {
    const s = Object.getOwnPropertyDescriptor(t, r);
    if (!s) throw Pe(Le.UNEXPECTED_ERROR);
    const l = ye(s.value)
      ? {
          get() {
            return s.value.value;
          },
          set(o) {
            s.value.value = o;
          },
        }
      : {
          get() {
            return s.get && s.get();
          },
        };
    Object.defineProperty(n, r, l);
  }),
    (e.config.globalProperties.$i18n = n),
    ym.forEach((r) => {
      const s = Object.getOwnPropertyDescriptor(t, r);
      if (!s || !s.value) throw Pe(Le.UNEXPECTED_ERROR);
      Object.defineProperty(e.config.globalProperties, `$${r}`, s);
    });
}
Wh(Xh);
jh(Th);
Bh(Yi);
em();
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = Ln();
  (e.__INTLIFY__ = !0), Nh(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const ua = Hu("toolbar", () => {
    const e = ke(!1),
      t = ke(void 0),
      n = ke(void 0),
      r = ke(void 0);
    function s() {
      (e.value = !1),
        (t.value = void 0),
        (n.value = void 0),
        (r.value = void 0);
    }
    function l(o) {
      for (const i in o)
        if (typeof o[i] < "u")
          switch (i) {
            case "showBack":
              e.value = o.showBack;
              break;
            case "leftChildren":
              t.value = o.leftChildren;
              break;
            case "centerChildren":
              n.value = o.centerChildren;
              break;
            case "rightChildren":
              r.value = o.rightChildren;
              break;
          }
        else
          switch (i) {
            case "leftChildren":
              t.value = void 0;
              break;
            case "centerChildren":
              n.value = void 0;
              break;
            case "rightChildren":
              r.value = void 0;
              break;
          }
    }
    return {
      reset: s,
      fromObject: l,
      showBack: e,
      leftChildren: t,
      centerChildren: n,
      rightChildren: r,
    };
  }),
  vm = (e) => (dc("data-v-26617e4b"), (e = e()), hc(), e),
  Tm = { class: "container" },
  Cm = vm(() => Me("div", { class: "background" }, null, -1)),
  Lm = Wt({
    __name: "ToolBar",
    setup(e) {
      const t = ua();
      return (n, r) => (
        ct(),
        zt("header", null, [
          Me("nav", null, [
            Me("div", Tm, [
              Me("div", null, [(ct(), qn(wr(Ke(t).leftChildren)))]),
              Me("div", null, [(ct(), qn(wr(Ke(t).centerChildren)))]),
              Me("div", null, [(ct(), qn(wr(Ke(t).rightChildren)))]),
            ]),
            Cm,
          ]),
        ])
      );
    },
  });
const Ir = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  Im = Ir(Lm, [["__scopeId", "data-v-26617e4b"]]),
  km = Wt({
    __name: "App",
    setup(e) {
      return (t, n) => (
        ct(),
        zt(
          Se,
          null,
          [
            Ce(Im),
            Me("main", null, [Ce(Ke(Di))]),
            Me("footer", null, [Me("span", null, Yn(t.$t("footer")), 1)]),
          ],
          64
        )
      );
    },
  });
const Om = Ir(km, [["__scopeId", "data-v-b097ee1d"]]);
const Pm = { class: "card" },
  wm = ["src"],
  Am = Wt({
    __name: "MCard",
    props: { src: null },
    setup(e) {
      return (t, n) => (
        ct(),
        zt("div", Pm, [
          Me("img", { src: e.src }, null, 8, wm),
          Me("div", null, [Rc(t.$slots, "default", {}, void 0, !0)]),
        ])
      );
    },
  });
const Nm = Ir(Am, [["__scopeId", "data-v-6569d6ab"]]),
  Rm = "assets/mac-original.48d42a51.jpg",
  Sm = {
    icon: Rm,
    title: "Macintosh 128K",
    text: "Der Macintosh 128K oder auch Macintosh 1984 war das erste Modell der Apple Macintosh-Baureihe und der erste erfolgreiche PC mit grafischer Benutzeroberfl\xE4che. Er wurde am 24. Januar 1984 eingef\xFChrt und war bis Oktober 1985 im Programm. Der Verkaufspreis lag bei 2.495 US-Dollar (nach heutiger Kaufkraft etwa 4.790 Euro).",
  },
  Mm = "assets/atari.cb33ebf4.jpg",
  Fm = {
    icon: Mm,
    title: "Atari Falcon",
    text: `Der Atari Falcon 030 (alternative Schreibweise Falcon030) war ein ab 1992 verkaufter Heimcomputer mit 32-Bit-Architektur der Atari Corporation.

Als Nachfolger des 1040 STE gedacht, wurde der Falcon 030 jedoch nur in geringen St\xFCckzahlen verkauft. Dies lag zum einen am mangelnden und verfehlten Marketing, der zu sp\xE4ten Markteinf\xFChrung und an der Verbreitung der MS-DOS-kompatiblen Computer, die den klassischen Heimcomputer verdr\xE4ngten. `,
  },
  xm = "assets/commodore-pet.04d35668.jpg",
  Dm = {
    icon: xm,
    title: "Commodore PET",
    text: "Der Commodore PET 2001 (Personal Electronic Transactor; deutsch etwa pers\xF6nlicher elektronischer Handlungsbeauftragter) wurde im Januar 1977 vorgestellt und seit Juni 1977 f\xFCr 795 US-Dollar vertrieben. Er ist damit der weltweit zweite f\xFCr Privathaushalte erschwingliche und in Serie hergestellte pers\xF6nliche Computer.",
  },
  $m = "assets/fm-towns.c8d21976.jpg",
  Hm = {
    icon: $m,
    title: "FM Towns",
    text: "Es wurde von Fujitsu gebaut und orientierte sich an der Hardware der damals g\xE4ngigen PCs, ohne jedoch zu diesen kompatibel zu sein. Obwohl das Ger\xE4t f\xFCr die Zeit um 1990 eine sehr gute technische Ausstattung hatte, unter anderem bereits ein CD-ROM-Laufwerk, lange bevor sich dies im restlichen PC-Markt durchsetzen sollte, wurde es nie \xFCber Japan hinaus bekannt und ist heute eine extreme Rarit\xE4t.",
  },
  Um = "assets/ibm-ps1.65888912.jpg",
  Wm = {
    icon: Um,
    title: "IBM PS/1",
    text: "Mit dem IBM PS/1 Personal Computer unternahm IBM im Jahr 1990, f\xFCnf Jahre nach dem IBM PCjr einen erneuten Versuch, sich im Heimcomputer-Markt zu etablieren. Im September 1994 wurde der PS/1 durch den IBM Aptiva ersetzt. Alle PS/1- und Aptiva-Modelle hatten ein eingebautes Modem zum Zugriff auf Online-Hilfe und vorinstallierte Software.",
  },
  jm = "assets/pcjr.b35558b9.jpg",
  Bm = {
    icon: jm,
    title: "IBM PCjr",
    text: "Er wurde von IBM entwickelt, nachdem sich der vergleichsweise teure PC nicht als Rechner f\xFCr den durchschnittlichen Heimanwender durchgesetzt hatte. Der am 1. November 1983 der \xD6ffentlichkeit vorgestellte Rechner wurde jedoch aufgrund seines beschr\xE4nkten Leistungsumfanges und immer noch hohen Preises ein Misserfolg, den IBM sp\xE4ter vergeblich mit dem IBM PC JX wiedergutzumachen versuchte.",
  },
  Vm = "assets/x68000.efbf7f01.jpg",
  Km = {
    icon: Vm,
    title: "Sharp X68000",
    text: `Der X68000 war ein Heimcomputer der Firma Sharp, welcher nahezu ausschlie\xDFlich auf dem japanischen Markt verkauft wurde. Daher sind auch alle origin\xE4ren Programme und das Betriebssystem in japanischer Sprache, was die Verbreitung au\xDFerhalb Japans verhinderte.

Markteinf\xFChrung war im Jahre 1987 als Nachfolger des Sharp X1 und die letzten Modelle kamen 1993 auf den Markt. Der Rechner fuhr sogar auf Knopfdruck in den Standby-Modus und gab so Anwendungen Zeit, ordentlich herunterzufahren und Daten auf die Festplatte zu schreiben.

F\xFCr den Computer gibt es neuentwickelte Betriebssysteme oder Portierungen wie Minix oder Unix NetBSD. Es gibt auch Ko-Windows, eine neue grafische Benutzeroberfl\xE4che und eine Ethernetkarte namens XNeptune.

Die Hardware wurde auch f\xFCr Spielautomaten verwendet und es gibt Portierungen von Spielhallenspielen auf dieses System. `,
  },
  Ym = [Sm, Fm, Dm, Hm, Wm, Bm, Km],
  Gm = { class: "about" },
  Xm = { class: "cards" },
  qm = ["onClick"],
  Jm = { class: "card-text" },
  Qm = Wt({
    __name: "HomeView",
    setup(e) {
      function t() {
        return document.querySelector(".cards > .card-container > .details");
      }
      function n(r) {
        let s = t();
        if (s && (s.classList.remove("details"), (s = t()), t())) {
          n(r);
          return;
        }
        const l = document.querySelector(`.cards > .cc-${r} > .card`);
        l && l.classList.add("details");
      }
      return (r, s) => (
        ct(),
        zt(
          Se,
          null,
          [
            Me("p", Gm, Yn(r.$t("about")), 1),
            Me("div", Xm, [
              (ct(!0),
              zt(
                Se,
                null,
                Nc(
                  Ke(Ym),
                  (l, o) => (
                    ct(),
                    zt(
                      "div",
                      {
                        key: o,
                        class: ir("card-container cc-" + o),
                        onClick: (i) => n(o),
                      },
                      [
                        Ce(
                          Nm,
                          { src: l.icon },
                          {
                            default: Xo(() => [Me("p", Jm, Yn(l.text), 1)]),
                            _: 2,
                          },
                          1032,
                          ["src"]
                        ),
                        Me("h1", null, Yn(l.title), 1),
                      ],
                      10,
                      qm
                    )
                  )
                ),
                128
              )),
            ]),
          ],
          64
        )
      );
    },
  });
const Zm = Ir(Qm, [["__scopeId", "data-v-1c3a59f3"]]),
  zm = ep(
    { path: "/", name: "Home", component: Zm },
    {
      leftChildren: Ce(
        "h1",
        { style: { "font-weight": "bold", color: "var(--color-heading)" } },
        [Ss("Museum")]
      ),
    }
  );
function ep(e, t) {
  return {
    ...e,
    beforeEnter: () => {
      const n = ua();
      n.reset(), typeof t < "u" && n.fromObject(t);
    },
  };
}
const tp = [zm],
  np = { routes: tp },
  rp = {
    about: "This is the inventory of the museum of GeSoTec NB",
    footer: "A project from FIN11 at GeSoTec NB",
  },
  sp = {
    about: "Dies ist das Inventar des Museums der GeSoTec NB",
    footer: "Ein Projekt der Klasse FIN11, der GeSoTec NB",
  },
  lp = { en: rp, de: sp };
Ud(Om, np, ({ app: e }) => {
  const t = Mu();
  e.use(t);
  const n = um({ locale: "de", messages: { ...lp } });
  e.use(n);
});
