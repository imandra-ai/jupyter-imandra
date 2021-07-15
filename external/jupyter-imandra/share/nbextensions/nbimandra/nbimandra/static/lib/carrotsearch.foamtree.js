/**
 * Carrot Search FoamTree HTML5 (commercial variant)
 * v3.4.4, 36955f78f6b79223438db3b18b9b64b5aad799bb/36955f78, build FOAMTREE-SOFTWARE4-DIST-26, Sep 23, 2016
 * 
 * Carrot Search confidential.
 * Copyright 2002-2016, Carrot Search s.c, All Rights Reserved.
 */
(function() {
  var v = (function() {
    var f = window.navigator.userAgent,
      m;
    try {
      window.localStorage.setItem('ftap5caavc', 'ftap5caavc'),
        window.localStorage.removeItem('ftap5caavc'),
        (m = !0);
    } catch (g) {
      m = !1;
    }
    return {
      sf: function() {
        return /webkit/i.test(f);
      },
      qf: function() {
        return /Mac/.test(f);
      },
      pf: function() {
        return /iPad|iPod|iPhone/.test(f);
      },
      mf: function() {
        return /Android/.test(f);
      },
      ki: function() {
        return (
          'ontouchstart' in window ||
          (!!window.DocumentTouch && document instanceof window.DocumentTouch)
        );
      },
      ji: function() {
        return m;
      },
      ii: function() {
        var e = document.createElement('canvas');
        return !(!e.getContext || !e.getContext('2d'));
      },
      Fd: function(e, b) {
        return [].forEach && v.ii() ? e && e() : b && b();
      }
    };
  })();
  var aa = (function() {
    function f() {
      return (
        (window.performance &&
          (window.performance.now ||
            window.performance.mozNow ||
            window.performance.msNow ||
            window.performance.oNow ||
            window.performance.webkitNow)) ||
        Date.now
      );
    }
    var m = f();
    return {
      create: function() {
        return {
          now: (function() {
            var g = f();
            return function() {
              return g.call(window.performance);
            };
          })()
        };
      },
      now: function() {
        return m.call(window.performance);
      }
    };
  })();
  function ba() {
    function f() {
      if (!d) throw 'AF0';
      var e = aa.now();
      0 !== k && (g.Md = e - k);
      k = e;
      b = b.filter(function(a) {
        return null !== a;
      });
      g.frames++;
      for (var c = 0; c < b.length; c++) {
        var a = b[c];
        null !== a &&
          (!0 === a.Ce.call(a.$g)
            ? (b[c] = null)
            : D.Tc(a.repeat) && ((a.repeat = a.repeat - 1), 0 >= a.repeat && (b[c] = null)));
      }
      b = b.filter(function(a) {
        return null !== a;
      });
      d = !1;
      m();
      e = aa.now() - e;
      0 !== e && (g.Ld = e);
      g.totalTime += e;
      g.Se = 1e3 * g.frames / g.totalTime;
      k = 0 === b.length ? 0 : aa.now();
    }
    function m() {
      0 < b.length && !d && ((d = !0), e(f));
    }
    var g = (this.tg = {
      frames: 0,
      totalTime: 0,
      Ld: 0,
      Md: 0,
      Se: 0
    });
    da = g;
    var e = (function() {
        return v.pf()
          ? function(b) {
              window.setTimeout(b, 0);
            }
          : window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              (function() {
                var b = aa.create();
                return function(c) {
                  var a = 0;
                  window.setTimeout(function() {
                    var d = b.now();
                    c();
                    a = b.now() - d;
                  }, 16 > a ? 16 - a : 0);
                };
              })();
      })(),
      b = [],
      d = !1,
      k = 0;
    this.repeat = function(d, c, a) {
      this.cancel(d);
      b.push({ Ce: d, $g: a, repeat: c });
      m();
    };
    this.d = function(b, c) {
      this.repeat(b, 1, c);
    };
    this.cancel = function(d) {
      for (var c = 0; c < b.length; c++) {
        var a = b[c];
        null !== a && a.Ce === d && (b[c] = null);
      }
    };
    this.k = function() {
      b = [];
    };
  }
  var da;
  var ea = v.Fd(function() {
    function f() {
      this.buffer = [];
      this.na = 0;
      this.Hc = D.extend({}, k);
    }
    function m(b) {
      return function() {
        var c,
          a = this.buffer,
          d = this.na;
        a[d++] = 'call';
        a[d++] = b;
        a[d++] = arguments.length;
        for (c = 0; c < arguments.length; c++) a[d++] = arguments[c];
        this.na = d;
      };
    }
    function g(d) {
      return function() {
        return b[d].apply(b, arguments);
      };
    }
    var e = document.createElement('canvas');
    e.width = 1;
    e.height = 1;
    var b = e.getContext('2d'),
      e = ['font'],
      d = 'fillStyle globalAlpha globalCompositeOperation lineCap lineDashOffset lineJoin lineWidth miterLimit shadowBlur shadowColor shadowOffsetX shadowOffsetY strokeStyle textAlign textBaseline'.split(
        ' '
      ),
      k = {};
    d.concat(e).forEach(function(d) {
      k[d] = b[d];
    });
    f.prototype.clear = function() {
      this.na = 0;
    };
    f.prototype.Na = function() {
      return 0 === this.na;
    };
    f.prototype.Ta = function(b) {
      function c(a, c, b) {
        for (var d = 0, e = a.na, g = a.buffer; d < b; ) g[e++] = c[d++];
        a.na = e;
      }
      function a(a, c, b, d) {
        for (var e = 0; e < b; )
          switch (c[e++]) {
            case 'set':
              a[c[e++]] = c[e++];
              break;
            case 'setGlobalAlpha':
              a[c[e++]] = c[e++] * d;
              break;
            case 'call':
              var g = c[e++];
              switch (c[e++]) {
                case 0:
                  a[g]();
                  break;
                case 1:
                  a[g](c[e++]);
                  break;
                case 2:
                  a[g](c[e++], c[e++]);
                  break;
                case 3:
                  a[g](c[e++], c[e++], c[e++]);
                  break;
                case 4:
                  a[g](c[e++], c[e++], c[e++], c[e++]);
                  break;
                case 5:
                  a[g](c[e++], c[e++], c[e++], c[e++], c[e++]);
                  break;
                case 6:
                  a[g](c[e++], c[e++], c[e++], c[e++], c[e++], c[e++]);
                  break;
                case 7:
                  a[g](c[e++], c[e++], c[e++], c[e++], c[e++], c[e++], c[e++]);
                  break;
                case 8:
                  a[g](c[e++], c[e++], c[e++], c[e++], c[e++], c[e++], c[e++], c[e++]);
                  break;
                case 9:
                  a[g](c[e++], c[e++], c[e++], c[e++], c[e++], c[e++], c[e++], c[e++], c[e++]);
                  break;
                default:
                  throw 'CB0';
              }
          }
      }
      b instanceof ea
        ? c(b, this.buffer, this.na)
        : a(b, this.buffer, this.na, D.B(b.globalAlpha, 1));
    };
    f.prototype.replay = f.prototype.Ta;
    f.prototype.d = function() {
      return new f();
    };
    f.prototype.scratch = f.prototype.d;
    'arc arcTo beginPath bezierCurveTo clearRect clip closePath drawImage fill fillRect fillText lineTo moveTo putImageData quadraticCurveTo rect rotate scale setLineDash setTransform stroke strokeRect strokeText transform translate'
      .split(' ')
      .forEach(function(b) {
        f.prototype[b] = m(b);
      });
    [
      'measureText',
      'createLinearGradient',
      'createRadialGradient',
      'createPattern',
      'getLineDash'
    ].forEach(function(b) {
      f.prototype[b] = g(b);
    });
    ['save', 'restore'].forEach(function(b) {
      f.prototype[b] = (function(c, a) {
        return function() {
          c.apply(this, arguments);
          a.apply(this, arguments);
        };
      })(m(b), g(b));
    });
    e.forEach(function(d) {
      Object.defineProperty(f.prototype, d, {
        set: function(c) {
          b[d] = c;
          this.Hc[d] = c;
          var a = this.buffer;
          a[this.na++] = 'set';
          a[this.na++] = d;
          a[this.na++] = c;
        },
        get: function() {
          return this.Hc[d];
        }
      });
    });
    d.forEach(function(b) {
      Object.defineProperty(f.prototype, b, {
        set: function(c) {
          this.Hc[b] = c;
          var a = this.buffer;
          a[this.na++] = 'globalAlpha' === b ? 'setGlobalAlpha' : 'set';
          a[this.na++] = b;
          a[this.na++] = c;
        },
        get: function() {
          return this.Hc[b];
        }
      });
    });
    f.prototype.roundRect = function(b, c, a, d, e) {
      this.beginPath();
      this.moveTo(b + e, c);
      this.lineTo(b + a - e, c);
      this.quadraticCurveTo(b + a, c, b + a, c + e);
      this.lineTo(b + a, c + d - e);
      this.quadraticCurveTo(b + a, c + d, b + a - e, c + d);
      this.lineTo(b + e, c + d);
      this.quadraticCurveTo(b, c + d, b, c + d - e);
      this.lineTo(b, c + e);
      this.quadraticCurveTo(b, c, b + e, c);
      this.closePath();
    };
    f.prototype.fillPolygonWithText = function(b, c, a, d, e) {
      e || (e = {});
      var g = {
          sb: D.B(e.maxFontSize, G.Da.sb),
          $c: D.B(e.minFontSize, G.Da.$c),
          lineHeight: D.B(e.lineHeight, G.Da.lineHeight),
          pb: D.B(e.horizontalPadding, G.Da.pb),
          fb: D.B(e.verticalPadding, G.Da.fb),
          tb: D.B(e.maxTotalTextHeight, G.Da.tb),
          fontFamily: D.B(e.fontFamily, G.Da.fontFamily),
          fontStyle: D.B(e.fontStyle, G.Da.fontStyle),
          fontVariant: D.B(e.fontVariant, G.Da.fontVariant),
          fontWeight: D.B(e.fontWeight, G.Da.fontWeight),
          verticalAlign: D.B(e.verticalAlign, G.Da.verticalAlign)
        },
        k = e.cache;
      if (k && D.M(e, 'area')) {
        k.kd || (k.kd = new ea());
        var f = e.area,
          s = D.B(e.cacheInvalidationThreshold, 0.05);
        b = G.Be(
          g,
          this,
          d,
          b,
          L.q(b, {}),
          { x: c, y: a },
          e.allowForcedSplit || !1,
          e.allowEllipsis || !1,
          k,
          f,
          s,
          e.invalidateCache
        );
      } else
        b = G.Pe(
          g,
          this,
          d,
          b,
          L.q(b, {}),
          { x: c, y: a },
          e.allowForcedSplit || !1,
          e.allowEllipsis || !1
        );
      return b.la
        ? {
            fit: !0,
            lineCount: b.oc,
            fontSize: b.fontSize,
            box: { x: b.da.x, y: b.da.y, w: b.da.f, h: b.da.i },
            ellipsis: b.gc
          }
        : { fit: !1 };
    };
    return f;
  });
  var ga = v.Fd(function() {
    function f(a) {
      this.P = a;
      this.d = [];
      this.Jb = [void 0];
      this.Oc = ['#SIZE#px sans-serif'];
      this.Nd = [0];
      this.Od = [1];
      this.le = [0];
      this.me = [0];
      this.ne = [0];
      this.Td = [10];
      this.jc = [10];
      this.Tb = [this.Jb, this.Oc, this.jc, this.Nd, this.Od, this.le, this.Td, this.me, this.ne];
      this.ga = [1, 0, 0, 1, 0, 0];
    }
    function m(a) {
      var c = a.P,
        b = a.Tb[0].length - 1;
      a.Jb[b] && (c.setLineDash(a.Jb[b]), (c.Pj = a.Nd[b]));
      c.miterLimit = a.Td[b];
      c.lineWidth = a.Od[b];
      c.shadowBlur = a.le[b];
      c.shadowOffsetX = a.me[b];
      c.shadowOffsetY = a.ne[b];
      c.font = a.Oc[b].replace('#SIZE#', a.jc[b].toString());
    }
    function g(a) {
      return function() {
        return this.P[a].apply(this.P, arguments);
      };
    }
    function e(a) {
      return function(c, b) {
        var e = this.ga;
        return this.P[a].call(this.P, d(c, b, e), k(c, b, e));
      };
    }
    function b(a) {
      return function(c, b, e, g) {
        var f = this.ga;
        return this.P[a].call(this.P, d(c, b, f), k(c, b, f), e * f[0], g * f[3]);
      };
    }
    function d(a, c, b) {
      return a * b[0] + c * b[2] + b[4];
    }
    function k(a, c, b) {
      return a * b[1] + c * b[3] + b[5];
    }
    function l(a, c) {
      for (var b = 0; b < a.length; b++) a[b] *= c[0];
      return a;
    }
    f.prototype.save = function() {
      this.d.push(this.ga.slice(0));
      for (var a = 0; a < this.Tb.length; a++) {
        var b = this.Tb[a];
        b.push(b[b.length - 1]);
      }
      this.P.save();
    };
    f.prototype.restore = function() {
      this.ga = this.d.pop();
      for (var a = 0; a < this.Tb.length; a++) this.Tb[a].pop();
      this.P.restore();
      m(this);
    };
    f.prototype.scale = function(a, b) {
      var c = this.ga;
      c[0] *= a;
      c[1] *= a;
      c[2] *= b;
      c[3] *= b;
      var c = this.ga,
        d = this.Tb,
        e = d[0].length - 1,
        g = this.Jb[e];
      g && l(g, c);
      for (g = 2; g < d.length; g++) {
        var f = d[g];
        f[e] *= c[0];
      }
      m(this);
    };
    f.prototype.translate = function(a, c) {
      var b = this.ga;
      b[4] += b[0] * a + b[2] * c;
      b[5] += b[1] * a + b[3] * c;
    };
    ['moveTo', 'lineTo'].forEach(function(a) {
      f.prototype[a] = e(a);
    });
    ['clearRect', 'fillRect', 'strokeRect', 'rect'].forEach(function(a) {
      f.prototype[a] = b(a);
    });
    'fill stroke beginPath closePath clip createImageData createPattern getImageData putImageData getLineDash setLineDash'
      .split(' ')
      .forEach(function(a) {
        f.prototype[a] = g(a);
      });
    [
      {
        vb: 'lineDashOffset',
        zb: function(a) {
          return a.Nd;
        }
      },
      {
        vb: 'lineWidth',
        zb: function(a) {
          return a.Od;
        }
      },
      {
        vb: 'miterLimit',
        zb: function(a) {
          return a.Td;
        }
      },
      {
        vb: 'shadowBlur',
        zb: function(a) {
          return a.le;
        }
      },
      {
        vb: 'shadowOffsetX',
        zb: function(a) {
          return a.me;
        }
      },
      {
        vb: 'shadowOffsetY',
        zb: function(a) {
          return a.ne;
        }
      }
    ].forEach(function(a) {
      Object.defineProperty(f.prototype, a.vb, {
        set: function(b) {
          var c = a.zb(this);
          b *= this.ga[0];
          c[c.length - 1] = b;
          this.P[a.vb] = b;
        }
      });
    });
    var c = /(\d+(?:\.\d+)?)px/;
    Object.defineProperty(f.prototype, 'font', {
      set: function(a) {
        var b = c.exec(a);
        if (1 < b.length) {
          var d = this.jc.length - 1;
          this.jc[d] = parseFloat(b[1]);
          this.Oc[d] = a.replace(c, '#SIZE#px');
          this.P.font = this.Oc[d].replace('#SIZE#', (this.jc[d] * this.ga[0]).toString());
        }
      }
    });
    'fillStyle globalAlpha globalCompositeOperation lineCap lineJoin shadowColor strokeStyle textAlign textBaseline'
      .split(' ')
      .forEach(function(a) {
        Object.defineProperty(f.prototype, a, {
          set: function(b) {
            this.P[a] = b;
          }
        });
      });
    f.prototype.arc = function(a, b, c, e, g, f) {
      var s = this.ga;
      this.P.arc(d(a, b, s), k(a, b, s), c * s[0], e, g, f);
    };
    f.prototype.arcTo = function(a, b, c, e, g) {
      var f = this.ga;
      this.P.arc(d(a, b, f), k(a, b, f), d(c, e, f), k(c, e, f), g * f[0]);
    };
    f.prototype.bezierCurveTo = function(a, b, c, e, g, f) {
      var s = this.ga;
      this.P.bezierCurveTo(d(a, b, s), k(a, b, s), d(c, e, s), k(c, e, s), d(g, f, s), k(g, f, s));
    };
    f.prototype.drawImage = function(a, b, c, e, g, f, s, l, m) {
      function x(b, c, e, g) {
        C.push(d(b, c, y));
        C.push(k(b, c, y));
        e = D.V(e) ? a.width : e;
        g = D.V(g) ? a.height : g;
        C.push(e * y[0]);
        C.push(g * y[3]);
      }
      var y = this.ga,
        C = [a];
      D.V(f) ? x(b, c, e, g) : x(f, s, l, m);
      this.P.drawImage.apply(this.P, C);
    };
    f.prototype.quadraticCurveTo = function(a, b, c, e) {
      var g = this.ga;
      this.P.quadraticCurveTo(d(a, b, g), k(a, b, g), d(c, e, g), k(c, e, g));
    };
    f.prototype.fillText = function(a, b, c, e) {
      var g = this.ga;
      this.P.fillText(a, d(b, c, g), k(b, c, g), D.Tc(e) ? e * g[0] : 1e20);
    };
    f.prototype.setLineDash = function(a) {
      a = l(a.slice(0), this.ga);
      this.Jb[this.Jb.length - 1] = a;
      this.P.setLineDash(a);
    };
    return f;
  });
  var ia = (function() {
    var f = !v.sf() || v.pf() || v.mf() ? 1 : 7;
    return {
      gh: function() {
        function m(a) {
          a.beginPath();
          ha.oe(a, l);
        }
        var g = document.createElement('canvas');
        g.width = 800;
        g.height = 600;
        var e = g.getContext('2d'),
          b = g.width,
          g = g.height,
          d,
          k = 0,
          l = [{ x: 0, y: 100 }];
        for (d = 1; 6 >= d; d++)
          (k = 2 * d * Math.PI / 6), l.push({ x: 0 + 100 * Math.sin(k), y: 0 + 100 * Math.cos(k) });
        d = {
          polygonPlainFill: [
            m,
            function(a) {
              a.fillStyle = 'rgb(255, 0, 0)';
              a.fill();
            }
          ],
          polygonPlainStroke: [
            m,
            function(a) {
              a.strokeStyle = 'rgb(128, 0, 0)';
              a.lineWidth = 2;
              a.closePath();
              a.stroke();
            }
          ],
          polygonGradientFill: [
            m,
            function(a) {
              var b = a.createRadialGradient(0, 0, 10, 0, 0, 60);
              b.addColorStop(0, 'rgb(255, 0, 0)');
              b.addColorStop(1, 'rgb(255, 255, 0)');
              a.fillStyle = b;
              a.fill();
            }
          ],
          polygonGradientStroke: [
            m,
            function(a) {
              var b = a.createLinearGradient(-100, -100, 100, 100);
              b.addColorStop(0, 'rgb(224, 0, 0)');
              b.addColorStop(1, 'rgb(32, 0, 0)');
              a.strokeStyle = b;
              a.lineWidth = 2;
              a.closePath();
              a.stroke();
            }
          ],
          polygonExposureShadow: [
            m,
            function(a) {
              a.shadowBlur = 50;
              a.shadowColor = 'rgba(0, 0, 0, 1)';
              a.fillStyle = 'rgba(0, 0, 0, 1)';
              a.globalCompositeOperation = 'source-over';
              a.fill();
              a.shadowBlur = 0;
              a.shadowColor = 'transparent';
              a.globalCompositeOperation = 'destination-out';
              a.fill();
            }
          ],
          labelPlainFill: [
            function(a) {
              a.fillStyle = '#000';
              a.font = '24px sans-serif';
              a.textAlign = 'center';
            },
            function(a) {
              a.fillText('Some text', 0, -16);
              a.fillText('for testing purposes', 0, 16);
            }
          ]
        };
        var k = 100 / Object.keys(d).length,
          c = aa.now(),
          a = {},
          h;
        for (h in d) {
          var n = d[h],
            r = aa.now(),
            p,
            q = 0;
          do {
            e.save();
            e.translate(Math.random() * b, Math.random() * g);
            p = 3 * Math.random() + 0.5;
            e.scale(p, p);
            for (p = 0; p < n.length; p++) n[p](e);
            e.restore();
            q++;
            p = aa.now();
          } while (p - r < k);
          a[h] = f * (p - r) / q;
        }
        a.total = aa.now() - c;
        return a;
      }
    };
  })();
  var ha = {
    oe: function(f, m) {
      var g = m[0];
      f.moveTo(g.x, g.y);
      for (var e = m.length - 1; 0 < e; e--) (g = m[e]), f.lineTo(g.x, g.y);
    },
    sj: function(f, m, g, e) {
      var b,
        d,
        k,
        l = [],
        c = 0,
        a = m.length;
      for (k = 0; k < a; k++)
        (b = m[k]), (d = m[(k + 1) % a]), (b = L.d(b, d)), (b = Math.sqrt(b)), l.push(b), (c += b);
      g = e * (g + 0.5 * e * c / a);
      var h, n;
      e = {};
      var c = {},
        r = {},
        p = 0;
      for (k = 0; k < a; k++)
        (b = m[k]),
          (d = m[(k + 1) % a]),
          (h = m[(k + 2) % a]),
          (n = l[(k + 1) % a]),
          (n = Math.min(0.5, g / n)),
          L.za(1 - n, d, h, c),
          L.za(n, d, h, r),
          p++,
          0 == k && ((h = Math.min(0.5, g / l[0])), L.za(h, b, d, e), p++, f.moveTo(e.x, e.y)),
          f.quadraticCurveTo(d.x, d.y, c.x, c.y),
          f.lineTo(r.x, r.y);
      return !0;
    }
  };
  function ja(f) {
    function m(a) {
      h[a].style.opacity = r * n[a];
    }
    function g(a) {
      a.width = Math.round(d * a.n);
      a.height = Math.round(k * a.n);
    }
    function e() {
      return /relative|absolute|fixed/.test(
        window.getComputedStyle(b, null).getPropertyValue('position')
      );
    }
    var b,
      d,
      k,
      l,
      c,
      a = [],
      h = {},
      n = {},
      r = 0;
    this.H = function(a) {
      b = a;
      e() || (b.style.position = 'relative');
      (0 != b.clientWidth && 0 != b.clientHeight) ||
        na.Pa('element has zero dimensions: ' + b.clientWidth + ' x ' + b.clientHeight + '.');
      b.innerHTML = '';
      d = b.clientWidth;
      k = b.clientHeight;
      l = 0 !== d ? d : void 0;
      c = 0 !== k ? k : void 0;
      'embedded' === b.getAttribute('data-foamtree') &&
        na.Pa('visualization already embedded in the element.');
      b.setAttribute('data-foamtree', 'embedded');
      f.c.p('stage:initialized', this, b, d, k);
    };
    this.lb = function() {
      b.removeAttribute('data-foamtree');
      a = [];
      h = {};
      f.c.p('stage:disposed', this, b);
    };
    this.k = function() {
      e() || (b.style.position = 'relative');
      d = b.clientWidth;
      k = b.clientHeight;
      if (0 !== d && 0 !== k && (d !== l || k !== c)) {
        for (var h = a.length - 1; 0 <= h; h--) g(a[h]);
        f.c.p('stage:resized', l, c, d, k);
        l = d;
        c = k;
      }
    };
    this.gj = function(a, b) {
      a.n = b;
      g(a);
    };
    this.qc = function(c, d, e) {
      var k = document.createElement('canvas');
      k.setAttribute(
        'style',
        'position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;'
      );
      k.n = d;
      g(k);
      a.push(k);
      h[c] = k;
      n[c] = 1;
      m(c);
      e || b.appendChild(k);
      f.c.p('stage:newLayer', c, k);
      return k;
    };
    this.mc = function(a, b) {
      D.V(b) || ((n[a] = b), m(a));
      return n[a];
    };
    this.d = function(a) {
      D.V(a) ||
        ((r = a),
        D.Fa(h, function(a, b) {
          m(b);
        }));
      return r;
    };
  }
  function oa(f) {
    function m(a, c, e) {
      x = !0;
      r.x = 0;
      r.y = 0;
      p.x = 0;
      p.y = 0;
      b = h;
      d.x = n.x;
      d.y = n.y;
      c();
      k *= a;
      l = e ? k / b : a;
      l = Math.max(0.25 / b, l);
      return !0;
    }
    function g(a, b) {
      b.x = a.x / h + n.x;
      b.y = a.y / h + n.y;
      return b;
    }
    function e(a, b, c, d, e, g, h, f, k) {
      var s = (a - c) * (g - f) - (b - d) * (e - h);
      if (1e-5 > Math.abs(s)) return !1;
      k.x = ((a * d - b * c) * (e - h) - (a - c) * (e * f - g * h)) / s;
      k.y = ((a * d - b * c) * (g - f) - (b - d) * (e * f - g * h)) / s;
      return !0;
    }
    var b = 1,
      d = { x: 0, y: 0 },
      k = 1,
      l = 1,
      c = 1,
      a = { x: 0, y: 0 },
      h = 1,
      n = { x: 0, y: 0 },
      r = { x: 0, y: 0 },
      p = { x: 0, y: 0 },
      q,
      s,
      u = { x: 0, y: 0, f: 0, i: 0 },
      w = { x: 0, y: 0, f: 0, i: 0, scale: 1 },
      x = !0;
    f.c.j('stage:initialized', function(a, b, c, d) {
      q = c;
      s = d;
      u.x = 0;
      u.y = 0;
      u.f = c;
      u.i = d;
      w.x = 0;
      w.y = 0;
      w.f = c;
      w.i = d;
      w.scale = 1;
    });
    f.c.j('stage:resized', function(b, c, e, g) {
      function h(a) {
        a.x *= k;
        a.y *= l;
      }
      function f(a) {
        h(a);
        a.f *= k;
        a.i *= l;
      }
      q = e;
      s = g;
      var k = e / b,
        l = g / c;
      h(d);
      h(n);
      h(a);
      h(r);
      h(p);
      f(u);
      f(w);
    });
    this.$b = function(b, c) {
      return m(
        c,
        function() {
          g(b, a);
        },
        !0
      );
    };
    this.Y = function(b, c) {
      if (1 === Math.round(1e4 * c) / 1e4) {
        var d = u.x - n.x,
          g = u.y - n.y;
        m(1, function() {}, !0);
        return this.d(-d, -g);
      }
      return m(
        c,
        function() {
          for (var c = !1; !c; )
            var c = Math.random(),
              d = Math.random(),
              g = Math.random(),
              h = Math.random(),
              c = e(
                b.x + c * b.f,
                b.y + d * b.i,
                u.x + c * u.f,
                u.y + d * u.i,
                b.x + g * b.f,
                b.y + h * b.i,
                u.x + g * u.f,
                u.y + h * u.i,
                a
              );
        },
        !0
      );
    };
    this.uc = function(b, c) {
      var d, g, f, k;
      d = b.f / b.i;
      g = q / s;
      d < g
        ? ((f = b.i * g), (k = b.i), (d = b.x - 0.5 * (f - b.f)), (g = b.y))
        : d > g
          ? ((f = b.f), (k = b.f * s / q), (d = b.x), (g = b.y - 0.5 * (k - b.i)))
          : ((d = b.x), (g = b.y), (f = b.f), (k = b.i));
      d -= f * c;
      g -= k * c;
      f *= 1 + 2 * c;
      if (e(d, g, n.x, n.y, d + f, g, n.x + q / h, n.y, a)) return m(q / h / f, D.sa, !1);
      x = !1;
      return this.d(h * (n.x - d), h * (n.y - g));
    };
    this.d = function(a, b) {
      var c = Math.round(1e4 * a) / 1e4,
        d = Math.round(1e4 * b) / 1e4;
      p.x += c / h;
      p.y += d / h;
      return 0 !== c || 0 !== d;
    };
    this.reset = function(a) {
      a && this.content(0, 0, q, s);
      return this.Y({ x: u.x + n.x, y: u.y + n.y, f: u.f / h, i: u.i / h }, c / k);
    };
    this.Rb = function(a) {
      c = Math.min(1, Math.round(1e4 * (a || k)) / 1e4);
    };
    this.k = function() {
      return n.x < u.x
        ? (u.x - n.x) * h
        : n.x + q / h > u.x + u.f ? -(n.x + q / h - u.x - u.f) * h : 0;
    };
    this.A = function() {
      return n.y < u.y
        ? (u.y - n.y) * h
        : n.y + s / h > u.y + u.i ? -(n.y + s / h - u.y - u.i) * h : 0;
    };
    this.update = function(c) {
      var e = Math.abs(Math.log(l));
      6 > e ? (e = 2) : ((e /= 4), (e += 3 * e * (1 < l ? c : 1 - c)));
      e = 1 < l ? Math.pow(c, e) : 1 - Math.pow(1 - c, e);
      e = (x ? e : 1) * (l - 1) + 1;
      h = b * e;
      n.x = a.x - (a.x - d.x) / e;
      n.y = a.y - (a.y - d.y) / e;
      n.x -= r.x * (1 - c) + p.x * c;
      n.y -= r.y * (1 - c) + p.y * c;
      1 === c && ((r.x = p.x), (r.y = p.y));
      w.x = n.x;
      w.y = n.y;
      w.f = q / h;
      w.i = s / h;
      w.scale = h;
    };
    this.S = function(a) {
      a.x = w.x;
      a.y = w.y;
      a.scale = w.scale;
      return a;
    };
    this.absolute = function(a, b) {
      return g(a, b || {});
    };
    this.od = function(a, b) {
      var c = b || {};
      c.x = (a.x - n.x) * h;
      c.y = (a.y - n.y) * h;
      return c;
    };
    this.Ic = function(a) {
      return this.scale() < c / a;
    };
    this.Ud = function() {
      return D.Hd(h, 1);
    };
    this.scale = function() {
      return Math.round(1e4 * h) / 1e4;
    };
    this.content = function(a, b, c, d) {
      u.x = a;
      u.y = b;
      u.f = c;
      u.i = d;
    };
    this.Kc = function(a, b) {
      var c;
      for (c = a.length - 1; 0 <= c; c--) {
        var d = a[c];
        d.save();
        d.scale(h, h);
        d.translate(-n.x, -n.y);
      }
      b(w);
      for (c = a.length - 1; 0 <= c; c--) (d = a[c]), d.restore();
    };
  }
  var T = new function() {
    function f(g) {
      if ('hsl' == g.model || 'hsla' == g.model) return g;
      var e = (g.r /= 255),
        b = (g.g /= 255),
        d = (g.b /= 255),
        f = Math.max(e, b, d),
        l = Math.min(e, b, d),
        c,
        a = (f + l) / 2;
      if (f == l) c = l = 0;
      else {
        var h = f - l,
          l = 0.5 < a ? h / (2 - f - l) : h / (f + l);
        switch (f) {
          case e:
            c = (b - d) / h + (b < d ? 6 : 0);
            break;
          case b:
            c = (d - e) / h + 2;
            break;
          case d:
            c = (e - b) / h + 4;
        }
        c /= 6;
      }
      g.h = 360 * c;
      g.s = 100 * l;
      g.l = 100 * a;
      g.model = 'hsl';
      return g;
    }
    var m = { h: 0, s: 0, l: 0, a: 1, model: 'hsla' };
    this.Aa = function(g) {
      return D.Uc(g) ? f(T.Ig(g)) : D.lc(g) ? f(g) : m;
    };
    this.Ig = function(g) {
      var e;
      return (e = /rgba\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(
        g
      )) && 5 == e.length
        ? {
            r: parseFloat(e[1]),
            g: parseFloat(e[2]),
            b: parseFloat(e[3]),
            a: parseFloat(e[4]),
            model: 'rgba'
          }
        : (e = /hsla\(\s*([^,\s]+)\s*,\s*([^,%\s]+)%\s*,\s*([^,\s%]+)%\s*,\s*([^,\s]+)\s*\)/.exec(
            g
          )) && 5 == e.length
          ? {
              h: parseFloat(e[1]),
              s: parseFloat(e[2]),
              l: parseFloat(e[3]),
              a: parseFloat(e[4]),
              model: 'hsla'
            }
          : (e = /rgb\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(g)) && 4 == e.length
            ? { r: parseFloat(e[1]), g: parseFloat(e[2]), b: parseFloat(e[3]), a: 1, model: 'rgb' }
            : (e = /hsl\(\s*([^,\s]+)\s*,\s*([^,\s%]+)%\s*,\s*([^,\s%]+)%\s*\)/.exec(g)) &&
              4 == e.length
              ? {
                  h: parseFloat(e[1]),
                  s: parseFloat(e[2]),
                  l: parseFloat(e[3]),
                  a: 1,
                  model: 'hsl'
                }
              : (e = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(g)) && 4 == e.length
                ? {
                    r: parseInt(e[1], 16),
                    g: parseInt(e[2], 16),
                    b: parseInt(e[3], 16),
                    a: 1,
                    model: 'rgb'
                  }
                : (e = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(g)) && 4 == e.length
                  ? {
                      r: 17 * parseInt(e[1], 16),
                      g: 17 * parseInt(e[2], 16),
                      b: 17 * parseInt(e[3], 16),
                      a: 1,
                      model: 'rgb'
                    }
                  : m;
    };
    this.Dg = function(g) {
      function e(b, a, d) {
        0 > d && (d += 1);
        1 < d && (d -= 1);
        return d < 1 / 6
          ? b + 6 * (a - b) * d
          : 0.5 > d ? a : d < 2 / 3 ? b + (a - b) * (2 / 3 - d) * 6 : b;
      }
      if ('rgb' == g.model || 'rgba' == g.model)
        return Math.sqrt(g.r * g.r * 0.241 + g.g * g.g * 0.691 + g.b * g.b * 0.068) / 255;
      var b, d;
      b = g.l / 100;
      var f = g.s / 100;
      d = g.h / 360;
      if (0 == g.Sj) b = g = d = b;
      else {
        var f = 0.5 > b ? b * (1 + f) : b + f - b * f,
          l = 2 * b - f;
        b = e(l, f, d + 1 / 3);
        g = e(l, f, d);
        d = e(l, f, d - 1 / 3);
      }
      return Math.sqrt(65025 * b * b * 0.241 + 65025 * g * g * 0.691 + 65025 * d * d * 0.068) / 255;
    };
    this.Og = function(g) {
      if (D.Uc(g)) return g;
      if (D.lc(g))
        switch (g.model) {
          case 'hsla':
            return T.Jg(g);
          case 'hsl':
            return T.Bc(g);
          case 'rgba':
            return T.Mg(g);
          case 'rgb':
            return T.Lg(g);
          default:
            return '#000';
        }
      else return '#000';
    };
    this.Mg = function(g) {
      return (
        'rgba(' +
        ((0.5 + g.r) | 0) +
        ',' +
        ((0.5 + g.g) | 0) +
        ',' +
        ((0.5 + g.b) | 0) +
        ',' +
        g.a +
        ')'
      );
    };
    this.Lg = function(g) {
      return 'rgba(' + ((0.5 + g.r) | 0) + ',' + ((0.5 + g.g) | 0) + ',' + ((0.5 + g.b) | 0) + ')';
    };
    this.Jg = function(g) {
      return (
        'hsla(' +
        ((0.5 + g.h) | 0) +
        ',' +
        ((0.5 + g.s) | 0) +
        '%,' +
        ((0.5 + g.l) | 0) +
        '%,' +
        g.a +
        ')'
      );
    };
    this.Bc = function(g) {
      return 'hsl(' + ((0.5 + g.h) | 0) + ',' + ((0.5 + g.s) | 0) + '%,' + ((0.5 + g.l) | 0) + '%)';
    };
    this.Y = function(g, e, b) {
      return 'hsl(' + ((0.5 + g) | 0) + ',' + ((0.5 + e) | 0) + '%,' + ((0.5 + b) | 0) + '%)';
    };
  }();
  function V() {
    var f = !1,
      m,
      g = [],
      e = this,
      b = new function() {
        this.O = function(b) {
          b && (f ? b.apply(e, m) : g.push(b));
          return this;
        };
        this.kh = function(b) {
          e = b;
          return { then: this.O };
        };
      }();
    this.J = function() {
      m = arguments;
      for (var b = 0; b < g.length; b++) g[b].apply(e, m);
      f = !0;
      return this;
    };
    this.L = function() {
      return b;
    };
  }
  function pa(f) {
    var m = new V(),
      g = f.length;
    if (0 < f.length)
      for (var e = f.length - 1; 0 <= e; e--)
        f[e].O(function() {
          0 === --g && m.J();
        });
    else m.J();
    return m.L();
  }
  function qa(f) {
    var m = 0;
    this.d = function() {
      m++;
    };
    this.k = function() {
      m--;
      0 === m && f();
    };
    this.clear = function() {
      m = 0;
    };
    this.A = function() {
      return 0 === m;
    };
  }
  var ra = {
    Me: function(f, m, g, e) {
      e = e || {};
      f = f.getBoundingClientRect();
      e.x = m - f.left;
      e.y = g - f.top;
      return e;
    }
  };
  function sa() {
    var f = document,
      m = {};
    this.addEventListener = function(g, e) {
      var b = m[g];
      b || ((b = []), (m[g] = b));
      b.push(e);
      f.addEventListener(g, e);
    };
    this.d = function() {
      D.Fa(m, function(g, e) {
        for (var b = g.length - 1; 0 <= b; b--) f.removeEventListener(e, g[b]);
      });
    };
  }
  function ta(f) {
    function m(a) {
      return function(b) {
        g(b) && a.apply(this, arguments);
      };
    }
    function g(a) {
      for (a = a.target; a; ) {
        if (a === f) return !0;
        a = a.parentElement;
      }
      return !1;
    }
    function e(a, c, d) {
      d = d || {};
      b(a, d);
      for (var e = 0; e < c.length; e++) c[e].call(a.target, d);
      ((void 0 === d.Nb && d.Ai) || 'prevent' === d.Nb) && a.preventDefault();
      return d;
    }
    function b(a, b) {
      ra.Me(f, a.clientX, a.clientY, b);
      b.altKey = a.altKey;
      b.metaKey = a.metaKey;
      b.ctrlKey = a.ctrlKey;
      b.shiftKey = a.shiftKey;
      b.xb = 3 === a.which;
      return b;
    }
    var d = new sa(),
      k = [],
      l = [],
      c = [],
      a = [],
      h = [],
      n = [],
      r = [],
      p = [],
      q = [],
      s = [],
      u = [];
    this.d = function(a) {
      k.push(a);
    };
    this.k = function(a) {
      h.push(a);
    };
    this.xa = function(a) {
      l.push(a);
    };
    this.Aa = function(a) {
      c.push(a);
    };
    this.Pa = function(b) {
      a.push(b);
    };
    this.za = function(a) {
      u.push(a);
    };
    this.ya = function(a) {
      n.push(a);
    };
    this.Ia = function(a) {
      r.push(a);
    };
    this.Y = function(a) {
      p.push(a);
    };
    this.A = function(a) {
      q.push(a);
    };
    this.S = function(a) {
      s.push(a);
    };
    this.lb = function() {
      d.d();
    };
    var w,
      x,
      y,
      C,
      B = { x: 0, y: 0 },
      K = { x: 0, y: 0 },
      A = !1,
      I = !1;
    d.addEventListener(
      'mousedown',
      m(function(a) {
        if (a.target !== f) {
          var b = e(a, c);
          K.x = b.x;
          K.y = b.y;
          B.x = b.x;
          B.y = b.y;
          A = !0;
          e(a, p);
          x = !1;
          w = window.setTimeout(function() {
            100 > L.d(B, b) && (window.clearTimeout(C), e(a, l), (x = !0));
          }, 400);
        }
      })
    );
    d.addEventListener('mouseup', function(b) {
      function c(a) {
        var b = {};
        b.x = a.pageX;
        b.y = a.pageY;
        return b;
      }
      e(b, a);
      if (A) {
        I && e(b, s);
        window.clearTimeout(w);
        if (!x && !I && g(b)) {
          var d = c(b);
          y && 100 > L.d(d, y) ? e(b, h) : e(b, k);
          y = d;
          C = window.setTimeout(function() {
            y = null;
          }, 350);
        }
        I = A = !1;
      }
    });
    d.addEventListener('mousemove', function(a) {
      var c = b(a, {});
      g(a) && e(a, n, { type: 'move' });
      B.x = c.x;
      B.y = c.y;
      A && !I && 100 < L.d(K, B) && (I = !0);
      I && e(a, q, c);
    });
    d.addEventListener(
      'mouseout',
      m(function(a) {
        e(a, r, { type: 'out' });
      })
    );
    d.addEventListener(
      void 0 !== document.onmousewheel ? 'mousewheel' : 'MozMousePixelScroll',
      m(function(a) {
        var b = a.wheelDelta,
          c = a.detail;
        e(a, u, {
          yd: (c ? (b ? (0 < b / c / 40 * c ? 1 : -1) : -c / (v.qf() ? 40 : 19)) : b / 40) / 3,
          Ai: !0
        });
      })
    );
    d.addEventListener(
      'contextmenu',
      m(function(a) {
        a.preventDefault();
      })
    );
  }
  var X = (function() {
    function f(b) {
      return function(d) {
        return Math.pow(d, b);
      };
    }
    function m(b) {
      return function(d) {
        return 1 - Math.pow(1 - d, b);
      };
    }
    function g(b) {
      return function(d) {
        return 1 > (d *= 2) ? 0.5 * Math.pow(d, b) : 1 - 0.5 * Math.abs(Math.pow(2 - d, b));
      };
    }
    function e(b) {
      return function(d) {
        for (var e = 0; e < b.length; e++) d = (0, b[e])(d);
        return d;
      };
    }
    return {
      oa: function(b) {
        switch (b) {
          case 'linear':
            return X.Kb;
          case 'bounce':
            return X.Xg;
          case 'squareIn':
            return X.qg;
          case 'squareOut':
            return X.Sb;
          case 'squareInOut':
            return X.rg;
          case 'cubicIn':
            return X.ah;
          case 'cubicOut':
            return X.De;
          case 'cubicInOut':
            return X.bh;
          case 'quadIn':
            return X.Si;
          case 'quadOut':
            return X.Ui;
          case 'quadInOut':
            return X.Ti;
          default:
            return X.Kb;
        }
      },
      Kb: function(b) {
        return b;
      },
      Xg: e([
        g(2),
        function(b) {
          return 0 === b
            ? 0
            : 1 === b ? 1 : b * (b * (b * (b * (25.9425 * b - 85.88) + 105.78) - 58.69) + 13.8475);
        }
      ]),
      qg: f(2),
      Sb: m(2),
      rg: g(2),
      ah: f(3),
      De: m(3),
      bh: g(3),
      Si: f(2),
      Ui: m(2),
      Ti: g(2),
      d: e
    };
  })();
  var D = {
    V: function(f) {
      return void 0 === f;
    },
    rf: function(f) {
      return null === f;
    },
    Tc: function(f) {
      return '[object Number]' === Object.prototype.toString.call(f);
    },
    Uc: function(f) {
      return '[object String]' === Object.prototype.toString.call(f);
    },
    Id: function(f) {
      return 'function' === typeof f;
    },
    lc: function(f) {
      return f === Object(f);
    },
    Hd: function(f, m) {
      return 1e-6 > f - m && -1e-6 < f - m;
    },
    nf: function(f) {
      return D.V(f) || D.rf(f) || (D.Uc(f) && !/\S/.test(f));
    },
    M: function(f, m) {
      return f && f.hasOwnProperty(m);
    },
    ob: function(f, m) {
      if (f) for (var g = m.length - 1; 0 <= g; g--) if (f.hasOwnProperty(m[g])) return !0;
      return !1;
    },
    extend: function(f) {
      D.fh(Array.prototype.slice.call(arguments, 1), function(m) {
        if (m) for (var g in m) m.hasOwnProperty(g) && (f[g] = m[g]);
      });
      return f;
    },
    A: function(f, m) {
      return f.map(function(g) {
        return g[m];
      }, []);
    },
    fh: function(f, m, g) {
      null != f && (f.forEach ? f.forEach(m, g) : D.Fa(f, m, g));
    },
    Fa: function(f, m, g) {
      for (var e in f) if (f.hasOwnProperty(e) && !1 === m.call(g, f[e], e, f)) break;
    },
    B: function() {
      for (var f = 0; f < arguments.length; f++) {
        var m = arguments[f];
        if (!(D.V(m) || (D.Tc(m) && isNaN(m)) || (D.Uc(m) && D.nf(m)))) return m;
      }
    },
    fg: function(f, m) {
      var g = f.indexOf(m);
      0 <= g && f.splice(g, 1);
    },
    dh: function(f, m, g) {
      var e;
      return function() {
        var b = this,
          d = arguments,
          k = g && !e;
        clearTimeout(e);
        e = setTimeout(function() {
          e = null;
          g || f.apply(b, d);
        }, m);
        k && f.apply(b, d);
      };
    },
    defer: function(f) {
      setTimeout(f, 1);
    },
    k: function(f) {
      return f;
    },
    sa: function() {}
  };
  var ua = {
    li: function(f, m, g) {
      return v.ji()
        ? function() {
            var e = m + ':' + JSON.stringify(arguments),
              b = window.localStorage.getItem(e);
            b && (b = JSON.parse(b));
            if (b && Date.now() - b.t < g) return b.v;
            b = f.apply(this, arguments);
            window.localStorage.setItem(e, JSON.stringify({ v: b, t: Date.now() }));
            return b;
          }
        : f;
    }
  };
  var va = {
    m: function(f, m) {
      function g() {
        var e = [];
        if (Array.isArray(f))
          for (var b = 0; b < f.length; b++) {
            var d = f[b];
            d && e.push(d.apply(m, arguments));
          }
        else f && e.push(f.apply(m, arguments));
        return e;
      }
      g.empty = function() {
        return 0 === f.length && !D.Id(f);
      };
      return g;
    }
  };
  function wa() {
    var f = {};
    this.j = function(m, g) {
      var e = f[m];
      e || ((e = []), (f[m] = e));
      e.push(g);
    };
    this.p = function(m, g) {
      var e = f[m];
      if (e)
        for (var b = Array.prototype.slice.call(arguments, 1), d = 0; d < e.length; d++)
          e[d].apply(this, b);
    };
  }
  function xa(f) {
    function m(a, b, g) {
      var m = this,
        p,
        q = 0;
      this.id = k++;
      this.name = g ? g : '{unnamed on ' + a + '}';
      this.target = function() {
        return a;
      };
      this.Hb = function() {
        return -1 != c.indexOf(m);
      };
      this.start = function() {
        if (!m.Hb()) {
          if (-1 == c.indexOf(m)) {
            var a = l.now();
            !0 === m.Af(a) && ((c = c.slice()), c.push(m));
          }
          0 < c.length && f.repeat(e);
        }
        return this;
      };
      this.stop = function() {
        for (d(m); p < b.length; p++) {
          var a = b[p];
          a.jb && a.Ya.call();
        }
        return this;
      };
      this.hg = function() {
        p = void 0;
      };
      this.Af = function(a) {
        q++;
        if (0 !== b.length) {
          var c;
          D.V(p) ? ((p = 0), (c = b[p]), c.W && c.W.call(c, a, q, m)) : (c = b[p]);
          for (; p < b.length; ) {
            if (c.Ya && c.Ya.call(c, a, q, m)) return !0;
            c.Ca && c.Ca.call(c, a, q, m);
            D.V(p) && (p = -1);
            ++p < b.length && ((c = b[p]), c.W && c.W.call(c, a, q, m));
          }
        }
        return !1;
      };
    }
    function g(a) {
      return D.V(a)
        ? c.slice()
        : c.filter(function(b) {
            return b.target() === a;
          });
    }
    function e() {
      b();
      0 == c.length && f.cancel(e);
    }
    function b() {
      var a = l.now();
      c.forEach(function(b) {
        !0 !== b.Af(a) && d(b);
      });
    }
    function d(a) {
      c = c.filter(function(b) {
        return b !== a;
      });
    }
    var k = 0,
      l = aa.create(),
      c = [];
    this.d = function() {
      for (var a = c.length - 1; 0 <= a; a--) c[a].stop();
      c = [];
    };
    this.D = (function() {
      function a() {}
      function b(a) {
        var c = a.target,
          d = a.duration,
          e = a.ca,
          g,
          f;
        this.W = function() {
          g = {};
          for (var b in a.G)
            c.hasOwnProperty(b) &&
              (g[b] = {
                start: D.V(a.G[b].start)
                  ? c[b]
                  : D.Id(a.G[b].start) ? a.G[b].start.call(void 0) : a.G[b].start,
                end: D.V(a.G[b].end)
                  ? c[b]
                  : D.Id(a.G[b].end) ? a.G[b].end.call(void 0) : a.G[b].end,
                Q: D.V(a.G[b].Q) ? X.Kb : a.G[b].Q
              });
          f = l.now();
        };
        this.Ya = function() {
          var a = l.now() - f,
            a = 0 === d ? 1 : Math.min(d, a) / d,
            b;
          for (b in g) {
            var h = g[b];
            c[b] = h.start + (h.end - h.start) * h.Q(a);
          }
          e && e.call(c, a);
          return 1 > a;
        };
      }
      function c(a, b, d) {
        this.jb = d;
        this.Ya = function() {
          a.call(b);
          return !1;
        };
      }
      function d(a) {
        var b;
        this.W = function(c, d) {
          b = d + a;
        };
        this.Ya = function(a, c) {
          return c < b;
        };
      }
      function e(a) {
        var b;
        this.W = function(c) {
          b = c + a;
        };
        this.Ya = function(a) {
          return a < b;
        };
      }
      function f(a) {
        this.W = function() {
          a.forEach(function(a) {
            a.start();
          });
        };
        this.Ya = function() {
          for (var b = 0; b < a.length; b++) if (a[b].Hb()) return !0;
          return !1;
        };
      }
      a.m = function(a, g) {
        return new function() {
          function k(b, d, e, g) {
            return d ? (D.V(e) && (e = a), b.Bb(new c(d, e, g))) : b;
          }
          var l = [];
          this.Bb = function(a) {
            l.push(a);
            return this;
          };
          this.gb = function(a) {
            return this.Bb(new e(a));
          };
          this.re = function(a) {
            return this.Bb(new d(a || 1));
          };
          this.call = function(a, b) {
            return k(this, a, b, !1);
          };
          this.jb = function(a, b) {
            return k(this, a, b, !0);
          };
          this.ia = function(c) {
            D.V(c.target) && (c.target = a);
            return this.Bb(new b(c));
          };
          this.Za = function(a) {
            return this.Bb(new f(a));
          };
          this.hg = function() {
            return this.Bb({
              Ya: function(a, b) {
                b.hg();
                return !0;
              }
            });
          };
          this.wa = function() {
            return new m(a, l, g);
          };
          this.start = function() {
            return this.wa().start();
          };
          this.Hg = function() {
            var a = new V();
            this.re()
              .call(a.J)
              .wa();
            return a.L();
          };
          this.cb = function() {
            var a = this.Hg();
            this.start();
            return a;
          };
        }();
      };
      a.vc = function(b) {
        g(b).forEach(function(a) {
          a.stop();
        });
        return a.m(b, void 0);
      };
      return a;
    })();
  }
  var Y = (function() {
    var f = {
      Le: function(f, g) {
        if (f.e) for (var e = f.e, b = 0; b < e.length; b++) g(e[b], b);
      },
      Lc: function(m, g) {
        if (m.e)
          for (var e = m.e, b = 0; b < e.length; b++)
            if (!1 === f.Lc(e[b], g) || !1 === g(e[b], b)) return !1;
      }
    };
    f.F = f.Lc;
    f.Mc = function(m, g) {
      if (m.e)
        for (var e = m.e, b = 0; b < e.length; b++)
          if (!1 === g(e[b], b) || !1 === f.Mc(e[b], g)) return !1;
    };
    f.Ea = function(m, g) {
      if (m.e) for (var e = m.e, b = 0; b < e.length; b++) if (!1 === f.Ea(e[b], g)) return !1;
      return g(m);
    };
    f.Jj = f.Ea;
    f.zd = function(m, g) {
      !1 !== g(m) && f.Mc(m, g);
    };
    f.Nc = function(m, g) {
      var e = [];
      f.Mc(m, function(b) {
        e.push(b);
      });
      return g ? e.filter(g) : e;
    };
    f.Ke = function(f, g) {
      for (var e = f.parent; e && !1 !== g(e); ) e = e.parent;
    };
    f.mi = function(f, g) {
      for (var e = f.parent; e && e !== g; ) e = e.parent;
      return !!e;
    };
    return f;
  })();
  var L = new function() {
    function f(g, e) {
      var b = g.x - e.x,
        d = g.y - e.y;
      return b * b + d * d;
    }
    function m(g, e, b) {
      for (var d = 0; d < g.length; d++) {
        var f = L.ya(g[d], g[d + 1] || g[0], e, b, !0);
        if (f) return f;
      }
    }
    this.ya = function(g, e, b, d, f) {
      var l = g.x;
      g = g.y;
      var c = e.x - l;
      e = e.y - g;
      var a = b.x,
        h = b.y;
      b = d.x - a;
      var n = d.y - h;
      d = c * n - b * e;
      if (
        !(1e-12 >= d && -1e-12 <= d) &&
        ((a = a - l),
        (h = h - g),
        (b = (a * n - b * h) / d),
        (d = (a * e - c * h) / d),
        0 <= d && (f || 1 >= d) && 0 <= b && 1 >= b)
      )
        return { x: l + c * b, y: g + e * b };
    };
    this.Kg = function(g, e, b, d) {
      var f = g.x;
      g = g.y;
      var l = e.x - f;
      e = e.y - g;
      var c = b.x;
      b = b.y;
      var a = d.x - c;
      d = d.y - b;
      var h = l * d - a * e;
      if (!(1e-12 >= h && -1e-12 <= h) && ((d = ((c - f) * d - a * (b - g)) / h), 0 <= d && 1 >= d))
        return { x: f + l * d, y: g + e * d };
    };
    this.Cc = function(g, e, b) {
      for (
        var d = L.k(e, {}), f = L.k(b, {}), l, c = f.x - d.x, a = f.y - d.y, h = [], f = 0;
        f < b.length;
        f++
      )
        (l = b[f]), h.push({ x: l.x - c, y: l.y - a });
      b = [];
      l = [];
      for (f = 0; f < g.length; f++) {
        var n = g[f],
          r = m(e, d, n);
        r ? (b.push(r), l.push(m(h, d, n))) : (b.push(null), l.push(null));
      }
      for (f = 0; f < g.length; f++)
        if (((r = b[f]), (n = l[f]), r && n)) {
          e = g[f];
          var h = d,
            p = r.x - d.x,
            r = r.y - d.y,
            r = Math.sqrt(p * p + r * r);
          if (1e-12 < r) {
            var p = e.x - d.x,
              q = e.y - d.y,
              r = Math.sqrt(p * p + q * q) / r;
            e.x = h.x + r * (n.x - h.x);
            e.y = h.y + r * (n.y - h.y);
          } else (e.x = h.x), (e.y = h.y);
        }
      for (f = 0; f < g.length; f++) (l = g[f]), (l.x += c), (l.y += a);
    };
    this.q = function(g, e) {
      if (0 !== g.length) {
        var b, d, f, l;
        b = d = g[0].x;
        f = l = g[0].y;
        for (var c = g.length; 0 < --c; )
          (b = Math.min(b, g[c].x)),
            (d = Math.max(d, g[c].x)),
            (f = Math.min(f, g[c].y)),
            (l = Math.max(l, g[c].y));
        e.x = b;
        e.y = f;
        e.f = d - b;
        e.i = l - f;
        return e;
      }
    };
    this.A = function(g) {
      return [
        { x: g.x, y: g.y },
        { x: g.x + g.f, y: g.y },
        { x: g.x + g.f, y: g.y + g.i },
        { x: g.x, y: g.y + g.i }
      ];
    };
    this.k = function(g, e) {
      for (var b = 0, d = 0, f = g.length, l = g[0], c = 0, a = 1; a < f - 1; a++)
        var h = g[a],
          n = g[a + 1],
          m = l.y + h.y + n.y,
          p = (h.x - l.x) * (n.y - l.y) - (n.x - l.x) * (h.y - l.y),
          b = b + p * (l.x + h.x + n.x),
          d = d + p * m,
          c = c + p;
      e.x = b / (3 * c);
      e.y = d / (3 * c);
      e.ja = c / 2;
      return e;
    };
    this.ue = function(g, e) {
      this.k(g, e);
      e.Pb = Math.sqrt(e.ja / Math.PI);
    };
    this.Ua = function(g, e) {
      for (var b = 0; b < g.length; b++) {
        var d = g[b],
          f = g[b + 1] || g[0];
        if (0 > (e.y - d.y) * (f.x - d.x) - (e.x - d.x) * (f.y - d.y)) return !1;
      }
      return !0;
    };
    this.Ng = function(g, e, b) {
      var d = g.x,
        f = e.x;
      g.x > e.x && ((d = e.x), (f = g.x));
      f > b.x + b.f && (f = b.x + b.f);
      d < b.x && (d = b.x);
      if (d > f) return !1;
      var l = g.y,
        c = e.y,
        a = e.x - g.x;
      1e-7 < Math.abs(a) &&
        ((c = (e.y - g.y) / a), (g = g.y - c * g.x), (l = c * d + g), (c = c * f + g));
      l > c && ((d = c), (c = l), (l = d));
      c > b.y + b.i && (c = b.y + b.i);
      l < b.y && (l = b.y);
      return l <= c;
    };
    this.ve = function(g, e, b, d, k) {
      var l, c;
      function a(a, b, d) {
        if (e.x === n.x && e.y === n.y) return d;
        var k = m(g, e, n),
          p = Math.sqrt(f(k, e) / (a * a + b * b));
        return p < h
          ? ((h = p),
            (l = k.x),
            (c = k.y),
            0 !== b ? Math.abs(c - e.y) / Math.abs(b) : Math.abs(l - e.x) / Math.abs(a))
          : d;
      }
      d = D.B(d, 0.5);
      k = D.B(k, 0.5);
      b = D.B(b, 1);
      var h = Number.MAX_VALUE;
      c = l = 0;
      var n = { x: 0, y: 0 },
        r,
        p = d * b;
      b = (1 - d) * b;
      d = 1 - k;
      n.x = e.x - p;
      n.y = e.y - k;
      r = a(p, k, r);
      n.x = e.x + b;
      n.y = e.y - k;
      r = a(b, k, r);
      n.x = e.x - p;
      n.y = e.y + d;
      r = a(p, d, r);
      n.x = e.x + b;
      n.y = e.y + d;
      return (r = a(b, d, r));
    };
    this.Gg = function(f, e) {
      function b(a, b, c) {
        var d = b.x,
          e = c.x;
        b = b.y;
        c = c.y;
        var f = e - d,
          g = c - b;
        return Math.abs(g * a.x - f * a.y - d * c + e * b) / Math.sqrt(f * f + g * g);
      }
      for (var d = f.length, k = b(e, f[d - 1], f[0]), l = 0; l < d - 1; l++) {
        var c = b(e, f[l], f[l + 1]);
        c < k && (k = c);
      }
      return k;
    };
    this.Yb = function(f, e, b) {
      var d;
      b = { x: e.x + Math.cos(b), y: e.y - Math.sin(b) };
      var k = [],
        l = [],
        c = f.length;
      for (d = 0; d < c; d++) {
        var a = L.Kg(f[d], f[(d + 1) % c], e, b);
        if (a && (k.push(a), 2 == l.push(d))) break;
      }
      if (2 == k.length) {
        var a = k[0],
          k = k[1],
          h = l[0],
          l = l[1],
          n = [k, a];
        for (d = h + 1; d <= l; d++) n.push(f[d]);
        for (d = [a, k]; l != h; ) (l = (l + 1) % c), d.push(f[l]);
        f = [n, d];
        c = b.x - e.x;
        d = k.x - a.x;
        0 === c && ((c = b.y - e.y), (d = k.y - a.y));
        (0 > c ? -1 : 0 < c ? 1 : 0) !== (0 > d ? -1 : 0 < d ? 1 : 0) && f.reverse();
        return f;
      }
    };
    this.za = function(f, e, b, d) {
      d.x = f * (e.x - b.x) + b.x;
      d.y = f * (e.y - b.y) + b.y;
      return d;
    };
    this.d = f;
    this.te = function(f, e, b) {
      if (D.Tc(e)) e = 2 * Math.PI * e / 360;
      else {
        var d = L.q(f, {});
        switch (e) {
          case 'random':
            e = Math.random() * Math.PI * 2;
            break;
          case 'top':
            e = Math.atan2(-d.i, 0);
            break;
          case 'bottom':
            e = Math.atan2(d.i, 0);
            break;
          case 'topleft':
            e = Math.atan2(-d.i, -d.f);
            break;
          default:
            e = Math.atan2(d.i, d.f);
        }
      }
      d = L.k(f, {});
      return L.za(b, m(f, d, { x: d.x + Math.cos(e), y: d.y + Math.sin(e) }), d, {});
    };
    return this;
  }();
  var ya = new function() {
    function f(b, e) {
      this.face = b;
      this.ld = e;
      this.rc = this.ed = null;
    }
    function m(b, e, f) {
      this.ma = [b, e, f];
      this.C = Array(3);
      var c = e.y - b.y,
        a = f.z - b.z,
        g = e.x - b.x;
      e = e.z - b.z;
      var n = f.x - b.x;
      b = f.y - b.y;
      this.Oa = { x: c * a - e * b, y: e * n - g * a, z: g * b - c * n };
      this.kb = [];
      this.vd = this.visible = !1;
    }
    this.S = function(d) {
      function e(a, b, d) {
        var g,
          h,
          k = a.ma[0],
          l = a.Oa,
          s = l.x,
          q = l.y,
          l = l.z,
          m = Array(n);
        b = b.kb;
        g = b.length;
        for (c = 0; c < g; c++)
          (h = b[c].ld),
            (m[h.index] = !0),
            0 > s * (h.x - k.x) + q * (h.y - k.y) + l * (h.z - k.z) && f.d(a, h);
        b = d.kb;
        g = b.length;
        for (c = 0; c < g; c++)
          (h = b[c].ld),
            !0 !== m[h.index] &&
              0 > s * (h.x - k.x) + q * (h.y - k.y) + l * (h.z - k.z) &&
              f.d(a, h);
      }
      var l,
        c,
        a,
        h,
        n = d.length;
      for (l = 0; l < n; l++) (d[l].index = l), (d[l].bc = null);
      var r = [],
        p;
      if (
        0 <
        (p = (function() {
          function a(b, c, d, e) {
            var f = (c.y - b.y) * (d.z - b.z) - (c.z - b.z) * (d.y - b.y),
              g = (c.z - b.z) * (d.x - b.x) - (c.x - b.x) * (d.z - b.z),
              h = (c.x - b.x) * (d.y - b.y) - (c.y - b.y) * (d.x - b.x);
            return f * e.x + g * e.y + h * e.z > f * b.x + g * b.y + h * b.z
              ? new m(b, c, d)
              : new m(d, c, b);
          }
          function b(a, c, d, e) {
            function f(a, b, c) {
              a = a.ma;
              b = a[0] == b ? 0 : a[1] == b ? 1 : 2;
              return a[(b + 1) % 3] != c ? (b + 2) % 3 : b;
            }
            c.C[f(c, d, e)] = a;
            a.C[f(a, e, d)] = c;
          }
          if (4 > n) return 0;
          var c = d[0],
            e = d[1],
            g = d[2],
            h = d[3],
            k = a(c, e, g, h),
            l = a(c, g, h, e),
            s = a(c, e, h, g),
            q = a(e, g, h, c);
          b(k, l, g, c);
          b(k, s, c, e);
          b(k, q, e, g);
          b(l, s, h, c);
          b(l, q, g, h);
          b(s, q, h, e);
          r.push(k, l, s, q);
          for (c = 4; c < n; c++)
            for (e = d[c], g = 0; 4 > g; g++)
              (h = r[g]),
                (k = h.ma[0]),
                (l = h.Oa),
                0 > l.x * (e.x - k.x) + l.y * (e.y - k.y) + l.z * (e.z - k.z) && f.d(h, e);
          return 4;
        })())
      ) {
        for (; p < n; ) {
          a = d[p];
          if (a.bc) {
            for (l = a.bc; null !== l; ) (l.face.visible = !0), (l = l.rc);
            var q, s;
            l = 0;
            a: for (; l < r.length; l++)
              if (((h = r[l]), !1 === h.visible)) {
                var u = h.C;
                for (c = 0; 3 > c; c++)
                  if (!0 === u[c].visible) {
                    q = h;
                    s = c;
                    break a;
                  }
              }
            h = [];
            var u = [],
              w = q,
              x = s;
            do
              if ((h.push(w), u.push(x), (x = (x + 1) % 3), !1 === w.C[x].visible)) {
                do for (l = w.ma[x], w = w.C[x], c = 0; 3 > c; c++) w.ma[c] == l && (x = c);
                while (!1 === w.C[x].visible && (w !== q || x !== s));
              }
            while (w !== q || x !== s);
            var y = null,
              C = null;
            for (l = 0; l < h.length; l++) {
              var w = h[l],
                x = u[l],
                B = w.C[x],
                K = w.ma[(x + 1) % 3],
                A = w.ma[x],
                I = K.y - a.y,
                R = A.z - a.z,
                O = K.x - a.x,
                P = K.z - a.z,
                F = A.x - a.x,
                U = A.y - a.y,
                N;
              0 < b.length
                ? ((N = b.pop()),
                  (N.ma[0] = a),
                  (N.ma[1] = K),
                  (N.ma[2] = A),
                  (N.Oa.x = I * R - P * U),
                  (N.Oa.y = P * F - O * R),
                  (N.Oa.z = O * U - I * F),
                  (N.kb.length = 0),
                  (N.visible = !1),
                  (N.vd = !0))
                : (N = {
                    ma: [a, K, A],
                    C: Array(3),
                    Oa: { x: I * R - P * U, y: P * F - O * R, z: O * U - I * F },
                    kb: [],
                    visible: !1
                  });
              r.push(N);
              w.C[x] = N;
              N.C[1] = w;
              null !== C && ((C.C[0] = N), (N.C[2] = C));
              C = N;
              null === y && (y = N);
              e(N, w, B);
            }
            C.C[0] = y;
            y.C[2] = C;
            l = [];
            for (c = 0; c < r.length; c++)
              if (((h = r[c]), !0 === h.visible)) {
                u = h.kb;
                w = u.length;
                for (a = 0; a < w; a++)
                  (x = u[a]),
                    (y = x.ed),
                    (C = x.rc),
                    null !== y && (y.rc = C),
                    null !== C && (C.ed = y),
                    null === y && (x.ld.bc = C),
                    g.push(x);
                h.vd && b.push(h);
              } else l.push(h);
            r = l;
          }
          p++;
        }
        for (l = 0; l < r.length; l++) (h = r[l]), h.vd && b.push(h);
      }
      return { Ne: r };
    };
    f.d = function(b, e) {
      var l;
      0 < g.length
        ? ((l = g.pop()), (l.face = b), (l.ld = e), (l.rc = null), (l.ed = null))
        : (l = new f(b, e));
      b.kb.push(l);
      var c = e.bc;
      null !== c && (c.ed = l);
      l.rc = c;
      e.bc = l;
    };
    for (var g = Array(2e3), e = 0; e < g.length; e++) g[e] = new f(null, null);
    for (var b = Array(1e3), e = 0; e < b.length; e++)
      b[e] = { ma: Array(3), C: Array(3), Oa: { x: 0, y: 0, z: 0 }, kb: [], visible: !1 };
  }();
  var za = new function() {
    function f(f, e, b, d, k, l, c, a) {
      var h = (f - b) * (l - a) - (e - d) * (k - c);
      return Math.abs(h) < m
        ? void 0
        : {
            x: ((f * d - e * b) * (k - c) - (f - b) * (k * a - l * c)) / h,
            y: ((f * d - e * b) * (l - a) - (e - d) * (k * a - l * c)) / h
          };
    }
    var m = 1e-12;
    this.eb = function(g, e) {
      for (var b = g[0], d = b.x, k = b.y, l = b.x, c = b.y, a = g.length - 1; 0 < a; a--)
        (b = g[a]),
          (d = Math.min(d, b.x)),
          (k = Math.min(k, b.y)),
          (l = Math.max(l, b.x)),
          (c = Math.max(c, b.y));
      if (l - d < 3 * e || c - k < 3 * e) b = void 0;
      else {
        a: {
          b = !0;
          void 0 == b && (b = !1);
          d = [];
          k = g.length;
          for (l = 0; l <= k; l++) {
            var c = g[l % k],
              a = g[(l + 1) % k],
              h = g[(l + 2) % k],
              n,
              r,
              p;
            n = a.x - c.x;
            r = a.y - c.y;
            p = Math.sqrt(n * n + r * r);
            var q = e * n / p,
              s = e * r / p;
            n = h.x - a.x;
            r = h.y - a.y;
            p = Math.sqrt(n * n + r * r);
            n = e * n / p;
            r = e * r / p;
            if ((c = f(c.x - s, c.y + q, a.x - s, a.y + q, a.x - r, a.y + n, h.x - r, h.y + n)))
              if (
                (d.push(c),
                (h = d.length),
                b &&
                  3 <= h &&
                  ((c = d[h - 3]),
                  (a = d[h - 2]),
                  (h = d[h - 1]),
                  0 > (a.x - c.x) * (h.y - c.y) - (h.x - c.x) * (a.y - c.y)))
              ) {
                b = void 0;
                break a;
              }
          }
          d.shift();
          b = 3 > d.length ? void 0 : d;
        }
        if (!b)
          a: {
            d = g.slice(0);
            for (b = 0; b < g.length; b++) {
              l = g[b % g.length];
              a = g[(b + 1) % g.length];
              h = a.x - l.x;
              k = a.y - l.y;
              c = Math.sqrt(h * h + k * k);
              h = e * h / c;
              c = e * k / c;
              k = l.x - c;
              l = l.y + h;
              c = a.x - c;
              a = a.y + h;
              if (0 != d.length) {
                s = k - c;
                r = l - a;
                h = [];
                n = p = !0;
                q = void 0;
                for (q = 0; q < d.length; q++) {
                  var u = s * (l - d[q].y) - (k - d[q].x) * r;
                  u <= m && u >= -m && (u = 0);
                  h.push(u);
                  0 < u && (p = !1);
                  0 > u && (n = !1);
                }
                if (p) d = [];
                else if (!n) {
                  s = [];
                  for (q = 0; q < d.length; q++)
                    (r = (q + 1) % d.length),
                      (p = h[q]),
                      (n = h[r]),
                      0 <= p && s.push(d[q]),
                      ((0 < p && 0 > n) || (0 > p && 0 < n)) &&
                        s.push(f(d[q].x, d[q].y, d[r].x, d[r].y, k, l, c, a));
                  d = s;
                }
              }
              if (3 > d.length) {
                b = void 0;
                break a;
              }
            }
            b = d;
          }
      }
      return b;
    };
    return this;
  }();
  var Aa = new function() {
    function f(f) {
      for (var e = f[0].x, b = f[0].y, d = e, k = b, l = 1; l < f.length; l++)
        var c = f[l],
          e = Math.min(e, c.x),
          b = Math.min(b, c.y),
          d = Math.max(d, c.x),
          k = Math.max(k, c.y);
      f = d - e;
      k = k - b;
      return [
        { x: e + 2 * f, y: b + 2 * k, f: 0 },
        { x: e + 2 * f, y: b - 2 * k, f: 0 },
        { x: e - 2 * f, y: b + 2 * k, f: 0 }
      ];
    }
    var m = 1e-12;
    this.S = function(g, e) {
      function b() {
        for (a = 0; a < p.length; a++) {
          var b = p[a],
            c = b.ma,
            d = c[0],
            e = c[1],
            f = c[2],
            c = d.x,
            g = d.y,
            d = d.z,
            h = e.x,
            k = e.y,
            e = e.z,
            l = f.x,
            n = f.y,
            f = f.z,
            s = c * (k - n) + h * (n - g) + l * (g - k);
          b.ha = {
            x: -(g * (e - f) + k * (f - d) + n * (d - e)) / s / 2,
            y: -(d * (h - l) + e * (l - c) + f * (c - h)) / s / 2
          };
        }
      }
      function d(b) {
        for (a = 0; a < p.length; a++) {
          var c = p[a];
          c.ub = !L.Ua(b, c.ha);
        }
      }
      function k(a, b) {
        var c = Array(b.length),
          d;
        for (d = 0; d < c.length; d++) c[d] = [];
        for (d = 0; d < a.length; d++) {
          var e = a[d];
          if (!(0 > e.Oa.z))
            for (var f = e.C, g = 0; g < f.length; g++) {
              var h = f[g];
              if (!(0 > h.Oa.z)) {
                var k = e.ma,
                  l = k[(g + 1) % 3].index,
                  k = k[g].index;
                2 < l && c[l - 3].push([e, h, 2 < k ? b[k - 3] : null]);
              }
            }
        }
        return c;
      }
      function l(a) {
        var b = [a[0]],
          c = a[0][0],
          d = a[0][1],
          e = a.length,
          f = 1;
        a: for (; f < e; f++)
          for (var g = 1; g < e; g++) {
            var h = a[g];
            if (null !== h) {
              if (h[1] === c)
                if ((b.unshift(h), (c = h[0]), (a[g] = null), b.length === e)) break a;
                else continue;
              if (h[0] === d && (b.push(h), (d = h[1]), (a[g] = null), b.length === e)) break a;
            }
          }
        b[0][0] != b[e - 1][1] && b.push([b[e - 1][1], b[0][0]]);
        return b;
      }
      function c(a, b, c, d) {
        var e = [],
          f = [],
          g = c.length,
          h,
          k = b.length,
          l = 0,
          n = -1,
          s = -1,
          q = -1,
          p = null,
          u = d;
        for (d = 0; d < g; d++) {
          var r = (u + 1) % g,
            w = c[u][0],
            E = c[r][0];
          if (L.d(w.ha, E.ha) > m)
            if (w.ub && E.ub) {
              var J = [],
                M = [];
              for (h = 0; h < k; h++) {
                n = (l + 1) % k;
                if ((p = L.ya(b[l], b[n], w.ha, E.ha, !1))) if ((M.push(l), 2 === J.push(p))) break;
                l = n;
              }
              if (2 === J.length) {
                n = J[1];
                p = L.d(w.ha, J[0]);
                n = L.d(w.ha, n);
                w = p < n ? 0 : 1;
                p = p < n ? 1 : 0;
                n = M[w];
                -1 === s && (s = n);
                if (-1 !== q) for (; n != q; ) (q = (q + 1) % k), e.push(b[q]), f.push(null);
                e.push(J[w], J[p]);
                f.push(c[u][2], null);
                q = M[p];
              }
            } else if (w.ub && !E.ub)
              for (h = 0; h < k; h++) {
                n = (l + 1) % k;
                if ((p = L.ya(b[l], b[n], w.ha, E.ha, !1))) {
                  if (-1 !== q) for (J = q; l != J; ) (J = (J + 1) % k), e.push(b[J]), f.push(null);
                  e.push(p);
                  f.push(c[u][2]);
                  -1 === s && (s = l);
                  break;
                }
                l = n;
              }
            else if (!w.ub && E.ub)
              for (h = 0; h < k; h++) {
                n = (l + 1) % k;
                if ((p = L.ya(b[l], b[n], w.ha, E.ha, !1))) {
                  e.push(w.ha, p);
                  f.push(c[u][2], null);
                  q = l;
                  break;
                }
                l = n;
              }
            else e.push(w.ha), f.push(c[u][2]);
          u = r;
        }
        if (0 == e.length) f = e = null;
        else if (-1 !== q) for (; s != q; ) (q = (q + 1) % k), e.push(b[q]), f.push(null);
        a.o = e;
        a.C = f;
      }
      if (1 === g.length) (g[0].o = e.slice(0)), (g[0].C = []);
      else {
        var a, h;
        h = f(e);
        var n = [],
          r;
        for (a = 0; a < h.length; a++)
          (r = h[a]), n.push({ x: r.x, y: r.y, z: r.x * r.x + r.y * r.y - r.f });
        for (a = 0; a < g.length; a++)
          (r = g[a]), (r.o = null), n.push({ x: r.x, y: r.y, z: r.x * r.x + r.y * r.y - r.f });
        var p = ya.S(n).Ne;
        b();
        d(e);
        n = k(p, g);
        for (a = 0; a < g.length; a++)
          if (((r = n[a]), 0 !== r.length)) {
            var q = g[a];
            r = l(r);
            var s = r.length,
              u = -1;
            for (h = 0; h < s; h++) r[h][0].ub && (u = h);
            if (0 <= u) c(q, e, r, u);
            else {
              var u = [],
                w = [];
              for (h = 0; h < s; h++)
                L.d(r[h][0].ha, r[(h + 1) % s][0].ha) > m && (u.push(r[h][0].ha), w.push(r[h][2]));
              q.o = u;
              q.C = w;
            }
            q.o && 3 > q.o.length && ((q.o = null), (q.C = null));
          }
      }
    };
    this.Ac = function(g, e) {
      var b,
        d,
        k = !1,
        l = g.length;
      for (d = 0; d < l; d++) (b = g[d]), null === b.o && (k = !0), (b.se = b.f);
      if (k) {
        var k = f(e),
          c = [],
          a,
          h;
        d = g.length;
        for (b = 0; b < k.length; b++)
          (a = k[b]), c.push({ x: a.x, y: a.y, z: a.x * a.x + a.y * a.y });
        for (b = 0; b < d; b++) (a = g[b]), c.push({ x: a.x, y: a.y, z: a.x * a.x + a.y * a.y });
        a = ya.S(c).Ne;
        k = Array(d);
        for (b = 0; b < d; b++) k[b] = {};
        c = a.length;
        for (b = 0; b < c; b++)
          if (((h = a[b]), 0 < h.Oa.z)) {
            var n = h.ma,
              m = n.length;
            for (h = 0; h < m - 1; h++) {
              var p = n[h].index - 3,
                q = n[h + 1].index - 3;
              0 <= p && 0 <= q && ((k[p][q] = !0), (k[q][p] = !0));
            }
            h = n[0].index - 3;
            0 <= q && 0 <= h && ((k[q][h] = !0), (k[h][q] = !0));
          }
        for (b = 0; b < d; b++) {
          h = k[b];
          a = g[b];
          var q = Number.MAX_VALUE,
            c = null,
            s;
          for (s in h) (h = g[s]), (n = L.d(a, h)), q > n && ((q = n), (c = h));
          a.Qj = c;
          a.yf = Math.sqrt(q);
        }
        for (d = 0; d < l; d++)
          (b = g[d]), (s = Math.min(Math.sqrt(b.f), 0.95 * b.yf)), (b.f = s * s);
        this.S(g, e);
        for (d = 0; d < l; d++)
          (b = g[d]),
            b.se !== b.f && 0 < b.wc && ((s = Math.min(b.wc, b.se - b.f)), (b.f += s), (b.wc -= s));
      }
    };
  }();
  var Ba = new function() {
    this.Fg = function(f) {
      f = f.e;
      for (var m = 0, g = f.length, e = 0; e < g; e++) {
        var b = f[e];
        if (b.o) {
          var d = b.x,
            k = b.y;
          L.k(b.o, b);
          d = d - b.x;
          b = k - b.y;
          b = (0 < d ? d : -d) + (0 < b ? b : -b);
          m < b && (m = b);
        }
      }
      return m;
    };
    this.xa = function(f, m) {
      var g = f.e,
        e,
        b,
        d,
        k;
      switch (m) {
        case 'random':
          return f.e[Math.floor(g.length * Math.random())];
        case 'topleft':
          e = g[0];
          var l = e.x + e.y;
          for (k = 1; k < g.length; k++) (b = g[k]), (d = b.x + b.y), d < l && ((l = d), (e = b));
          return e;
        case 'bottomright':
          e = g[0];
          l = e.x + e.y;
          for (k = 1; k < g.length; k++) (b = g[k]), (d = b.x + b.y), d > l && ((l = d), (e = b));
          return e;
        default:
          e = g[0];
          d = b = L.d(f, e);
          for (k = g.length - 1; 1 <= k; k--)
            (l = g[k]), (b = L.d(f, l)), b < d && ((d = b), (e = l));
          return e;
      }
    };
    this.Ia = function(f, m, g) {
      var e = f.e;
      if (e[0].C) {
        var b = e.length;
        for (f = 0; f < b; f++) (e[f].md = !1), (e[f].kc = 0);
        var b = [],
          d,
          k;
        k = d = 0;
        b[d++] = m || e[0];
        for (m = m.kc = 0; k < d; )
          if (((e = b[k++]), !e.md && e.C)) {
            g(e, m++, e.kc);
            e.md = !0;
            var l = e.C,
              c = l.length;
            for (f = 0; f < c; f++) {
              var a = l[f];
              a && !0 !== a.md && (0 === a.kc && (a.kc = e.kc + 1), (b[d++] = a));
            }
          }
      } else for (f = 0; f < e.length; f++) g(e[f], f, 1);
    };
  }();
  var G = (function() {
    function f(c, f, h, s, q, p, u, P) {
      var F = D.extend({}, l, c);
      1 > c.lineHeight && (c.lineHeight = 1);
      c = F.fontFamily;
      var U = F.fontStyle + ' ' + F.fontVariant + ' ' + F.fontWeight,
        N = F.sb,
        S = F.$c,
        t = U + ' ' + c;
      F.Re = t;
      var z = { la: !1, oc: 0, fontSize: 0 };
      f.save();
      f.font = U + ' ' + y + 'px ' + c;
      f.textBaseline = 'middle';
      f.textAlign = 'center';
      m(f, F);
      h = h.trim();
      w.text = h;
      b(s, q, p, x);
      if (
        /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(h)
      )
        e(w), g(f, w, t), d(F, w, x, S, N, !0, z);
      else if ((g(f, w, t), d(F, w, x, S, N, !1, z), !z.la && (u && (e(w), g(f, w, t)), P || u)))
        P && (z.gc = !0), d(F, w, x, S, S, !0, z);
      if (z.la) {
        var H = '',
          E = 0,
          J = Number.MAX_VALUE,
          M = Number.MIN_VALUE;
        k(
          F,
          w,
          z.oc,
          z.fontSize,
          x,
          z.gc,
          function(b, c) {
            0 < H.length && c === a && (H += a);
            H += b;
          },
          function(a, b, c, e, d) {
            e === r && (H += n);
            f.save();
            f.translate(p.x, b);
            a = z.fontSize / y;
            f.scale(a, a);
            f.fillText(H, 0, 0);
            f.restore();
            H = c;
            E < d && (E = d);
            J > b && (J = b);
            M < b && (M = b);
          }
        );
        z.da = { x: p.x - E / 2, y: J - z.fontSize / 2, f: E, i: M - J + z.fontSize };
        f.restore();
      } else f.clear && f.clear();
      return z;
    }
    function m(b, e) {
      var d = e.Re,
        f = c[d];
      void 0 === f && ((f = {}), (c[d] = f));
      f[a] = b.measureText(a).width;
      f[h] = b.measureText(h).width;
    }
    function g(a, b, e) {
      var d,
        f = b.text.split(/(\n|[ \f\r\t\v\u2028\u2029]+|\u00ad+|\u200b+)/),
        g = [],
        h = [],
        k = f.length >>> 1;
      for (d = 0; d < k; d++) g.push(f[2 * d]), h.push(f[2 * d + 1]);
      2 * d < f.length && (g.push(f[2 * d]), h.push(void 0));
      e = c[e];
      for (d = 0; d < g.length; d++)
        (f = g[d]), (k = e[f]), void 0 === k && ((k = a.measureText(f).width), (e[f] = k));
      b.nd = g;
      b.ng = h;
    }
    function e(b) {
      for (
        var c = b.text.split(/\s+/),
          d = [],
          e = { '.': !0, ',': !0, ';': !0, '?': !0, '!': !0, ':': !0, '\u3002': !0 },
          f = 0;
        f < c.length;
        f++
      ) {
        var g = c[f];
        if (3 < g.length) {
          for (var h = '', h = h + g.charAt(0), h = h + g.charAt(1), k = 2; k < g.length - 2; k++) {
            var l = g.charAt(k);
            e[l] || (h += p);
            h += l;
          }
          h += p;
          h += g.charAt(g.length - 2);
          h += g.charAt(g.length - 1);
          d.push(h);
        } else d.push(g);
      }
      b.text = d.join(a);
    }
    function b(a, b, c, d) {
      for (var e, f, g = 0; g < a.length; g++) a[g].y === b.y && (void 0 === e ? (e = g) : (f = g));
      void 0 === f && (f = e);
      e !== f && a[f].x < a[e].x && ((g = e), (e = f), (f = g));
      d.o = a;
      d.q = b;
      d.xd = c;
      d.wf = e;
      d.xf = f;
    }
    function d(a, b, c, d, e, f, g) {
      var h = a.lineHeight,
        l = Math.max(a.fb, 0.001),
        n = a.tb,
        s = b.nd,
        q = c.xd,
        p = c.q,
        m = void 0,
        u = void 0;
      switch (a.verticalAlign) {
        case 'top':
          q = p.y + p.i - q.y;
          break;
        case 'bottom':
          q = q.y - p.y;
          break;
        default:
          q = 2 * Math.min(q.y - p.y, p.y + p.i - q.y);
      }
      n = Math.min(q, n * c.q.i);
      if (0 >= n) g.la = !1;
      else {
        q = d;
        e = Math.min(e, n);
        p = Math.min(1, n / Math.max(20, b.nd.length));
        do {
          var r = (q + e) / 2,
            x = Math.min(s.length, Math.floor((n + r * (h - 1 - 2 * l)) / (r * h))),
            w = void 0;
          if (0 < x) {
            var y = 1,
              $ = x;
            do {
              var Z = Math.floor((y + $) / 2);
              if (k(a, b, Z, r, c, f && r === d && Z === x, null, null)) {
                if ((($ = m = w = Z), y === $)) break;
              } else if (((y = Z + 1), y > $)) break;
            } while (1);
          }
          void 0 !== w ? (q = u = r) : (e = r);
        } while (e - q > p);
        void 0 === u
          ? ((g.la = !1), (g.fontSize = 0))
          : ((g.la = !0), (g.fontSize = u), (g.oc = m), (g.gc = f && r === q));
      }
    }
    function k(b, e, d, f, g, k, l, n) {
      var p = b.pb,
        m = f * (b.lineHeight - 1),
        r = b.verticalAlign,
        x = Math.max(b.fb, 0.001);
      b = c[b.Re];
      var w = e.nd;
      e = e.ng;
      var z = g.o,
        H = g.xd,
        E = g.wf,
        J = g.xf,
        M;
      switch (r) {
        case 'top':
          g = H.y + f / 2 + f * x;
          M = 1;
          break;
        case 'bottom':
          g = H.y - (f * d + m * (d - 1)) + f / 2 - f * x;
          M = -1;
          break;
        default:
          (g = H.y - (f * (d - 1) / 2 + m * (d - 1) / 2)), (M = 1);
      }
      r = g;
      for (x = 0; x < d; x++)
        (q[2 * x] = g - f / 2), (q[2 * x + 1] = g + f / 2), (g += M * f), (g += M * m);
      for (; s.length < q.length; ) s.push(Array(2));
      x = q;
      g = 2 * d;
      M = s;
      for (var Q = z.length, $ = E, E = (E - 1 + Q) % Q, Z = J, J = (J + 1) % Q, W = 0; W < g; ) {
        for (var ca = x[W], ka = z[E]; ka.y < ca; ) ($ = E), (E = (E - 1 + Q) % Q), (ka = z[E]);
        for (var fa = z[J]; fa.y < ca; ) (Z = J), (J = (J + 1) % Q), (fa = z[J]);
        var la = z[$],
          ma = z[Z],
          fa = ma.x + (fa.x - ma.x) * (ca - ma.y) / (fa.y - ma.y);
        M[W][0] = la.x + (ka.x - la.x) * (ca - la.y) / (ka.y - la.y);
        M[W][1] = fa;
        W++;
      }
      for (x = 0; x < d; x++)
        (z = 2 * x),
          (g = H.x),
          (M = g - s[z][0]),
          (Q = s[z][1] - g),
          (M = M < Q ? M : Q),
          (Q = g - s[z + 1][0]),
          (z = s[z + 1][1] - g),
          (z = Q < z ? Q : z),
          (u[x] = 2 * (M < z ? M : z) - p * f);
      $ = b[a] * f / y;
      M = b[h] * f / y;
      p = 0;
      E = u[p];
      H = 0;
      z = void 0;
      for (x = 0; x < w.length; x++) {
        g = w[x];
        Z = e[x];
        Q = b[g] * f / y;
        if (H + Q < E && w.length - x >= d - p && '\n' != z)
          (H += Q), ' ' === Z && (H += $), l && l(g, z);
        else {
          if (Q > E && (p !== d - 1 || !k)) return !1;
          if (p + 1 >= d) {
            if (k) {
              d = E - H - M;
              if (d > M || Q > M)
                (d = Math.floor(g.length * d / Q)), 0 < d && l && l(g.substring(0, d), z);
              l && l(h, void 0);
              n && n(p, r, g, z, H);
              return !0;
            }
            return !1;
          }
          p++;
          n && n(p, r, g, z, H);
          r += f;
          r += m;
          E = u[p];
          H = Q;
          ' ' === Z && (H += $);
          if (Q > E && (p !== d || !k)) return !1;
        }
        z = Z;
      }
      n && n(p, r, void 0, void 0, H);
      return !0;
    }
    var l = {
        sb: 72,
        $c: 0,
        lineHeight: 1.05,
        pb: 1,
        fb: 0.5,
        tb: 0.9,
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontVariant: 'normal',
        verticalAlign: 'center'
      },
      c = {},
      a = ' ',
      h = '\u2026',
      n = '\u2010',
      r = '\u00ad',
      p = '\u200b',
      q = [],
      s = [],
      u = [],
      w = { text: '', nd: void 0, ng: void 0 },
      x = { o: void 0, q: void 0, xd: void 0, wf: 0, xf: 0 },
      y = 100;
    return {
      Pe: f,
      Be: function(a, b, c, d, e, g, h, k, l, n, q, s) {
        var p,
          m = 0,
          u = 0;
        c = c.toString().trim();
        !s &&
          l.result &&
          c === l.ug &&
          Math.abs(n - l.xe) / n <= q &&
          ((p = l.result),
          p.la &&
            ((m = g.x - l.Bg),
            (u = g.y - l.Cg),
            (q = l.kd),
            b.save(),
            b.translate(m, u),
            q.Ta(b),
            b.restore()));
        p ||
          ((q = l.kd),
          q.clear(),
          (p = f(a, q, c, d, e, g, h, k)),
          p.la && q.Ta(b),
          (l.xe = n),
          (l.Bg = g.x),
          (l.Cg = g.y),
          (l.result = p),
          (l.ug = c));
        return p.la
          ? {
              la: !0,
              oc: p.oc,
              fontSize: p.fontSize,
              da: { x: p.da.x + m, y: p.da.y + u, f: p.da.f, i: p.da.i },
              gc: p.gc
            }
          : { la: !1 };
      },
      zi: function() {
        return { xe: 0, Bg: 0, Cg: 0, result: void 0, kd: new ea(), ug: void 0 };
      },
      Da: l
    };
  })();
  var Ca = new function() {
    function f(e, b) {
      return function(d, f, l, c) {
        function a(c, d, e, f, k) {
          if (0 != c.length) {
            var n = c.shift(),
              q = g(n),
              s,
              p,
              m,
              r;
            if (b(f, k)) {
              s = d;
              m = q / f;
              do {
                q = n.shift();
                p = q.xc;
                r = p / m;
                p = q;
                var P = e,
                  F = m;
                p.x = s + r / 2;
                p.y = P + F / 2;
                l && h(q, s, e, r, m);
                s += r;
              } while (0 < n.length);
              return a(c, d, e + m, f, k - m);
            }
            s = e;
            r = q / k;
            do
              (q = n.shift()),
                (p = q.xc),
                (m = p / r),
                (p = q),
                (P = s),
                (F = m),
                (p.x = d + r / 2),
                (p.y = P + F / 2),
                l && h(q, d, s, r, m),
                (s += m);
            while (0 < n.length);
            return a(c, d + r, e, f - r, k);
          }
        }
        function h(a, b, c, d, e) {
          a.o = [{ x: b, y: c }, { x: b + d, y: c }, { x: b + d, y: c + e }, { x: b, y: c + e }];
        }
        var n = f.x,
          m = f.y,
          p = f.f;
        f = f.i;
        if (0 != d.length)
          if (1 == d.length)
            (d[0].x = n + p / 2), (d[0].y = m + f / 2), (d[0].Gd = 0), l && h(d[0], n, m, p, f);
          else {
            d = d.slice(0);
            for (var q = 0, s = 0; s < d.length; s++) q += d[s].T;
            q = p * f / q;
            for (s = 0; s < d.length; s++) d[s].xc = d[s].T * q;
            c = e(d, p, f, [[d.shift()]], c);
            a(c, n, m, p, f);
          }
      };
    }
    function m(e, b, d, f) {
      function l(b) {
        return Math.max(Math.pow(h * b / a, d), Math.pow(a / (h * b), f));
      }
      var c = g(e),
        a = c * c,
        h = b * b;
      b = l(e[0].xc);
      for (c = 1; c < e.length; c++) b = Math.max(b, l(e[c].xc));
      return b;
    }
    function g(e) {
      for (var b = 0, d = 0; d < e.length; d++) b += e[d].xc;
      return b;
    }
    this.we = f(
      function(e, b, d, f, l) {
        l = Math.pow(2, l);
        for (var c = 1 / l, a = b < d; 0 < e.length; ) {
          var h = f[f.length - 1],
            n = e.shift(),
            r = a ? b : d,
            p = a ? l : c,
            q = a ? c : l,
            s = m(h, r, p, q);
          h.push(n);
          r = m(h, r, p, q);
          s < r && (h.pop(), f.push([n]), a ? (d -= g(h) / b) : (b -= g(h) / d), (a = b < d));
        }
        return f;
      },
      function(e, b) {
        return e < b;
      }
    );
    this.Zb = f(
      function(e, b, d, f, g) {
        function c(c) {
          if (1 < f.length) {
            for (var d = f[f.length - 1], e = f[f.length - 2].slice(0), g = 0; g < d.length; g++)
              e.push(d[g]);
            m(e, b, a, h) < c && f.splice(-2, 2, e);
          }
        }
        for (var a = Math.pow(2, g), h = 1 / a; 0 < e.length; ) {
          d = f[f.length - 1];
          g = m(d, b, a, h);
          if (0 == e.length) return;
          var n = e.shift();
          d.push(n);
          var r = m(d, b, a, h);
          g < r && (d.pop(), c(g), f.push([n]));
        }
        c(m(f[f.length - 1], b, a, h));
        return f;
      },
      function() {
        return !0;
      }
    );
  }();
  function Da(f) {
    var m = {},
      g = f.Xd,
      e;
    f.c.j('model:loaded', function(b) {
      e = b;
    });
    this.H = function() {
      f.c.p('api:initialized', this);
    };
    this.Ec = function(b, d, e, f) {
      this.qd(m, d);
      this.rd(m, d);
      this.pd(m, d, !1);
      f && f(m);
      b(g, m, e);
    };
    this.wd = function(b, d, f, g, c, a, h) {
      if (b) {
        for (b = d.length - 1; 0 <= b; b--) {
          var n = d[b],
            m = D.extend({ group: n.group }, c);
          m[f] = g(n);
          a(m);
        }
        0 < d.length &&
          h(
            D.extend(
              {
                groups: Y.Nc(e, g).map(function(a) {
                  return a.group;
                })
              },
              c
            )
          );
      }
    };
    this.rd = function(b, d) {
      b.selected = d.selected;
      b.hovered = d.Fb;
      b.open = d.open;
      b.openness = d.Mb;
      b.exposed = d.U;
      b.exposure = d.ka;
      b.transitionProgress = d.ta;
      b.revealed = !d.ba.Na();
      b.browseable = d.Qa ? d.N : void 0;
      b.visible = d.ea;
      b.labelDrawn = d.qa && d.qa.la;
      return b;
    };
    this.qd = function(b, d) {
      var e = d.parent;
      b.group = d.group;
      b.parent = e && e.group;
      b.weightNormalized = d.zg;
      b.level = d.R - 1;
      b.siblingCount = e && e.e.length;
      b.hasChildren = !d.empty();
      b.index = d.index;
      b.indexByWeight = d.Gd;
      b.description = d.description;
      b.attribution = d.Ra;
      return b;
    };
    this.pd = function(b, d, e) {
      b.polygonCenterX = d.K.x;
      b.polygonCenterY = d.K.y;
      b.polygonArea = d.K.ja;
      b.boxLeft = d.q.x;
      b.boxTop = d.q.y;
      b.boxWidth = d.q.f;
      b.boxHeight = d.q.i;
      if (d.qa && d.qa.la) {
        var f = d.qa.da;
        b.labelBoxLeft = f.x;
        b.labelBoxTop = f.y;
        b.labelBoxWidth = f.f;
        b.labelBoxHeight = f.i;
        b.labelFontSize = d.qa.fontSize;
      }
      e &&
        d.aa &&
        ((b.polygon = d.aa.map(function(b) {
          return { x: b.x, y: b.y };
        })),
        (b.neighbors =
          d.C &&
          d.C.map(function(b) {
            return b && b.group;
          })));
      return b;
    };
  }
  var na = new function() {
    var f = window.console;
    this.Pa = function(f) {
      throw 'FoamTree: ' + f;
    };
    this.info = function(m) {
      f.info('FoamTree: ' + m);
    };
    this.warn = function(m) {
      f.warn('FoamTree: ' + m);
    };
  }();
  function Ea(f) {
    function m(a, c) {
      a.e = [];
      a.Ka = !0;
      var d = b(c),
        e = 0;
      if ('flattened' == f.bb && 0 < c.length && 0 < a.R) {
        var h = c.reduce(function(a, b) {
            return a + D.B(b.weight, 1);
          }, 0),
          l = g(a.group, !1);
        l.description = !0;
        l.T = h * f.ec;
        l.index = e++;
        l.parent = a;
        l.R = a.R + 1;
        l.id = l.id + '_d';
        a.e.push(l);
      }
      for (h = 0; h < c.length; h++) {
        var k = c[h],
          l = D.B(k.weight, 1);
        if (0 >= l)
          if (f.vj) l = 0.9 * d;
          else continue;
        k = g(k, !0);
        k.T = l;
        k.index = e;
        k.parent = a;
        k.R = a.R + 1;
        a.e.push(k);
        e++;
      }
    }
    function g(a, b) {
      var c = new Fa();
      e(a);
      c.id = a.__id;
      c.group = a;
      b && (n[a.__id] = c);
      return c;
    }
    function e(a) {
      D.M(a, '__id') ||
        (Object.defineProperty(a, '__id', {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: h
        }),
        h++);
    }
    function b(a) {
      for (var b = Number.MAX_VALUE, c = 0; c < a.length; c++) {
        var d = a[c].weight;
        0 < d && b > d && (b = d);
      }
      b === Number.MAX_VALUE && (b = 1);
      return b;
    }
    function d(a) {
      if (!a.empty()) {
        a = a.e;
        var b = 0,
          c;
        for (c = a.length - 1; 0 <= c; c--) {
          var d = a[c].T;
          b < d && (b = d);
        }
        for (c = a.length - 1; 0 <= c; c--) (d = a[c]), (d.zg = d.T / b);
      }
    }
    function k(a) {
      if (!a.empty()) {
        a = a.e.slice(0).sort(function(a, b) {
          return a.T < b.T ? 1 : a.T > b.T ? -1 : a.index - b.index;
        });
        for (var b = 0; b < a.length; b++) a[b].Gd = b;
      }
    }
    function l() {
      for (
        var b = a.e.reduce(function(a, b) {
            return a + b.T;
          }, 0),
          c = 0;
        c < a.e.length;
        c++
      ) {
        var d = a.e[c];
        d.Ra && (d.T = Math.max(0, f.Wg) * b);
      }
    }
    var c = this,
      a = new Fa(),
      h,
      n,
      r,
      p,
      q;
    this.H = function() {
      return a;
    };
    this.S = function(a) {
      var b = a.group.groups,
        c = f.ri;
      return !a.e && !a.description && b && 0 < b.length && q + b.length <= c
        ? ((q += b.length), m(a, b), d(a), k(a), !0)
        : !1;
    };
    this.Y = function(b) {
      function c(a) {
        var b = a.groups;
        if (b)
          for (var d = 0; d < b.length; d++) {
            var f = b[d];
            e(f);
            var g = f.__id;
            n[g] = null;
            p[g] = a;
            g = f.id;
            D.V(g) || (r[g] = f);
            c(f);
          }
      }
      function w(a, b) {
        if (!a) return b;
        var c = Math.max(b, a.__id || 0),
          d = a.groups;
        if (d && 0 < d.length) for (var e = d.length - 1; 0 <= e; e--) c = w(d[e], c);
        return c;
      }
      a.group = b;
      a.Ba = !1;
      a.N = !1;
      a.Qa = !1;
      a.open = !0;
      a.Mb = 1;
      h = w(b, 0) + 1;
      n = {};
      r = {};
      p = {};
      q = 0;
      b && (e(b), (n[b.__id] = a), D.V(b.id) || (r[b.id] = b), c(b));
      m(a, (b && b.groups) || []);
      (function(a) {
        if (!a.empty() && (f.ze || f.Cb)) {
          var b = g({ attribution: !0 });
          b.index = a.e.length;
          f.Cb || (b.group.label = f.ze);
          b.parent = a;
          b.R = a.R + 1;
          b.Ra = !0;
          a.e.push(b);
        }
      })(a);
      d(a);
      l();
      k(a);
    };
    this.update = function() {
      Y.Ea(a, function(a) {
        if (!a.empty()) {
          a = a.e;
          for (
            var c = b(
                a.map(function(a) {
                  return a.group;
                })
              ),
              d = 0;
            d < a.length;
            d++
          ) {
            var e = a[d];
            e.T = 0 < e.group.weight ? e.group.weight : 0.9 * c;
          }
        }
      });
      d(a);
      l();
      k(a);
    };
    this.A = function(b) {
      return (function() {
        if (D.V(b) || D.rf(b)) return [];
        if (Array.isArray(b)) return b.map(c.d, c);
        if (D.lc(b)) {
          if (D.M(b, '__id')) return [c.d(b)];
          if (D.M(b, 'all')) {
            var d = [];
            Y.F(a, function(a) {
              d.push(a);
            });
            return d;
          }
          if (D.M(b, 'groups')) return c.A(b.groups);
        }
        return [c.d(b)];
      })().filter(function(a) {
        return void 0 !== a;
      });
    };
    this.d = function(a) {
      if (D.lc(a) && D.M(a, '__id')) {
        if (((a = a.__id), D.M(n, a))) {
          if (null === n[a]) {
            for (var b = p[a], c = []; b; ) {
              b = b.__id;
              c.push(b);
              if (n[b]) break;
              b = p[b];
            }
            for (b = c.length - 1; 0 <= b; b--) this.S(n[c[b]]);
          }
          return n[a];
        }
      } else if (D.M(r, a)) return this.d(r[a]);
    };
    this.k = function(a, b, d) {
      return { e: c.A(a), Ha: D.B(a && a[b], !0), Ga: D.B(a && a.keepPrevious, d) };
    };
  }
  function Ga(f, m, g) {
    var e = {};
    m.Ga &&
      Y.F(f, function(b) {
        g(b) && (e[b.id] = b);
      });
    f = m.e;
    m = m.Ha;
    for (var b = f.length - 1; 0 <= b; b--) {
      var d = f[b];
      e[d.id] = m ? d : void 0;
    }
    var k = [];
    D.Fa(e, function(b) {
      void 0 !== b && k.push(b);
    });
    return k;
  }
  function Ha(f) {
    function m(a, b) {
      var c = a.ka;
      b.opacity = 1;
      b.Ja = 1;
      b.ua = 0 > c ? 1 - p.gi / 100 * c : 1;
      b.va = 0 > c ? 1 - p.hi / 100 * c : 1;
      b.fa = 0 > c ? 1 + 0.5 * c : 1;
    }
    function g(a) {
      a = a.ka;
      return Math.max(0.001, 0 === a ? 1 : 1 + a * (p.Wa - 1));
    }
    function e(a, b) {
      for (
        var c = a.reduce(function(a, b) {
            a[b.id] = b;
            return a;
          }, {}),
          d = a.length - 1;
        0 <= d;
        d--
      )
        Y.F(a[d], function(a) {
          c[a.id] = void 0;
        });
      var e = [];
      D.Fa(c, function(a) {
        a &&
          Y.Ke(a, function(a) {
            a.open || e.push(a);
          });
      });
      var f = [];
      D.Fa(c, function(a) {
        a && a.open && f.push(a);
      });
      d = [];
      0 !== e.length && d.push(y.Lb({ e: e, Ha: !0, Ga: !0 }, b, !0));
      return pa(d);
    }
    function b(b, e, g, n) {
      var m = l();
      if (0 === b.length && !m) return new V().J().L();
      var s = b.reduce(function(a, b) {
          a[b.id] = !0;
          return a;
        }, {}),
        r = [];
      b = [];
      if (
        C.reduce(function(a, b) {
          return (
            a ||
            (s[b.id] && (!b.U || 1 !== b.ka)) ||
            (!s[b.id] && !b.parent.U && (b.U || -1 !== b.ka))
          );
        }, !1)
      ) {
        var y = [],
          A = {};
        C.forEach(function(b) {
          s[b.id] &&
            (b.U || r.push(b),
            (b.U = !0),
            Y.Ea(b, function(b) {
              y.push(a(b, 1));
              A[b.id] = !0;
            }));
        });
        0 < y.length
          ? (Y.F(q, function(b) {
              s[b.id] || (b.U && r.push(b), (b.U = !1));
              A[b.id] || y.push(a(b, -1));
            }),
            b.push(
              x.D
                .m({})
                .Za(y)
                .call(h)
                .cb()
            ),
            d(s),
            b.push(k(m)),
            g && (w.uc(B, p.Rc, p.Va, X.oa(p.ic)), w.Rb()))
          : (b.push(c(g)),
            e &&
              Y.F(q, function(a) {
                a.U && r.push(a);
              }));
      }
      return pa(b).O(function() {
        u.wd(
          e,
          r,
          'exposed',
          function(a) {
            return a.U;
          },
          { indirect: n },
          f.options.Hf,
          f.options.Gf
        );
      });
    }
    function d(a) {
      C.reduce(
        n(!0, void 0, function(b) {
          return b.U || a[b.id];
        }),
        r(B)
      );
      B.x -= B.f * (p.Wa - 1) / 2;
      B.y -= B.i * (p.Wa - 1) / 2;
      B.f *= p.Wa;
      B.i *= p.Wa;
    }
    function k(a) {
      if (a || !w.Ud())
        return x.D
          .m(s)
          .ia({
            duration: 0.7 * p.Va,
            G: {
              x: { end: B.x + B.f / 2, Q: X.oa(p.ic) },
              y: { end: B.y + B.i / 2, Q: X.oa(p.ic) }
            },
            ca: function() {
              f.c.p('foamtree:dirty', !0);
            }
          })
          .cb();
      s.x = B.x + B.f / 2;
      s.y = B.y + B.i / 2;
      return new V().J().L();
    }
    function l() {
      return (
        !!C &&
        C.reduce(function(a, b) {
          return a || 0 !== b.ka;
        }, !1)
      );
    }
    function c(b) {
      var c = [],
        d = [];
      Y.F(q, function(b) {
        0 !== b.ka &&
          d.push(
            a(b, 0, function() {
              this.U = !1;
            })
          );
      });
      c.push(
        x.D
          .m({})
          .Za(d)
          .cb()
      );
      w.content(0, 0, K, A);
      b && (c.push(w.reset(p.Va, X.oa(p.ic))), w.Rb());
      return pa(c);
    }
    function a(a, b, c) {
      var d = x.D.m(a);
      0 === a.ka &&
        0 !== b &&
        d.call(function() {
          this.Dc(I);
          this.Ab(m);
        });
      d.ia({
        duration: p.Va,
        G: { ka: { end: b, Q: X.oa(p.ic) } },
        ca: function() {
          q.I = !0;
          q.Ma = !0;
          f.c.p('foamtree:dirty', !0);
        }
      });
      0 === b &&
        d.call(function() {
          this.Pd();
          this.pc();
          this.gd(I);
          this.fd(m);
        });
      return d.call(c).wa();
    }
    function h() {
      var a = q.e.reduce(n(!1, I.Vb, void 0), r({})).da,
        b = p.Rc,
        c = Math.min(a.x, B.x - B.f * b),
        d = Math.max(a.x + a.f, B.x + B.f * (1 + b)),
        e = Math.min(a.y, B.y - B.i * b),
        a = Math.max(a.y + a.i, B.y + B.i * (1 + b));
      w.content(c, e, d - c, a - e);
    }
    function n(a, b, c) {
      var d = {};
      return function(e, f) {
        if (!c || c(f)) {
          for (var g = a ? f.aa || f.o : f.o, h, k = g.length - 1; 0 <= k; k--)
            (h = void 0 !== b ? b(f, g[k], d) : g[k]),
              (e.ad = Math.min(e.ad, h.x)),
              (e.Rd = Math.max(e.Rd, h.x)),
              (e.bd = Math.min(e.bd, h.y)),
              (e.Sd = Math.max(e.Sd, h.y));
          e.da.x = e.ad;
          e.da.y = e.bd;
          e.da.f = e.Rd - e.ad;
          e.da.i = e.Sd - e.bd;
        }
        return e;
      };
    }
    function r(a) {
      return {
        ad: Number.MAX_VALUE,
        Rd: Number.MIN_VALUE,
        bd: Number.MAX_VALUE,
        Sd: Number.MIN_VALUE,
        da: a
      };
    }
    var p = f.options,
      q,
      s,
      u,
      w,
      x,
      y,
      C,
      B,
      K,
      A,
      I = {
        vf: function(a, b) {
          b.scale = g(a);
          return !1;
        },
        Ub: function(a, b) {
          var c = g(a),
            d = s.x,
            e = s.y;
          b.translate(d, e);
          b.scale(c, c);
          b.translate(-d, -e);
        },
        Wb: function(a, b, c) {
          a = g(a);
          var d = s.x,
            e = s.y;
          c.x = (b.x - d) / a + d;
          c.y = (b.y - e) / a + e;
        },
        Vb: function(a, b, c) {
          a = g(a);
          var d = s.x,
            e = s.y;
          c.x = (b.x - d) * a + d;
          c.y = (b.y - e) * a + e;
          return c;
        }
      };
    f.c.j('stage:initialized', function(a, b, c, d) {
      s = { x: c / 2, y: d / 2 };
      K = c;
      A = d;
      B = { x: 0, y: 0, f: K, i: A };
    });
    f.c.j('stage:resized', function(a, b, c, d) {
      s.x *= c / a;
      s.y *= d / b;
      K = c;
      A = d;
    });
    f.c.j('api:initialized', function(a) {
      u = a;
    });
    f.c.j('zoom:initialized', function(a) {
      w = a;
    });
    f.c.j('model:loaded', function(a, b) {
      q = a;
      C = b;
    });
    f.c.j('model:childrenAttached', function(a) {
      C = a;
    });
    f.c.j('timeline:initialized', function(a) {
      x = a;
    });
    f.c.j('openclose:initialized', function(a) {
      y = a;
    });
    var R = ['groupExposureScale', 'groupUnexposureScale', 'groupExposureZoomMargin'];
    f.c.j('options:changed', function(a) {
      D.ob(a, R) && l() && (d({}), w.Cj(B, p.Rc), w.Rb());
    });
    this.H = function() {
      f.c.p('expose:initialized', this);
    };
    this.hc = function(a, c, d, f) {
      var g = a.e.reduce(function(a, b) {
          for (var c = b; (c = c.parent); ) a[c.id] = !0;
          return a;
        }, {}),
        h = Ga(q, a, function(a) {
          return a.U && !a.open && !g[a.id];
        }),
        k = new V();
      e(h, c).O(function() {
        b(
          h.filter(function(a) {
            return a.o && a.aa;
          }),
          c,
          d,
          f
        ).O(k.J);
      });
      return k.L();
    };
  }
  function Ia(f) {
    function m(b) {
      function a(a, b) {
        var c = Math.min(1, Math.max(0, a.ta));
        b.opacity = c;
        b.ua = 1;
        b.va = c;
        b.Ja = c;
        b.fa = a.Ib;
      }
      var g = f.options,
        n = g.qj,
        m = g.rj,
        p = g.nj,
        q = g.oj,
        s = g.pj,
        u = g.ie,
        w = n + m + p + q + s,
        x = 0 < w ? u / w : 0,
        y = [];
      l.hb(g.kg, g.jg, g.lg, g.mg, g.ig);
      if (0 === x && b.e && b.N) {
        u = b.e;
        for (w = 0; w < u.length; w++) {
          var C = u[w];
          C.ta = 1;
          C.Ib = 1;
          C.Ab(a);
          C.pc();
          C.fd(a);
        }
        b.I = !0;
        f.c.p('foamtree:dirty', 0 < x);
        return new V().J().L();
      }
      if (b.e && b.N) {
        Ba.Ia(b, Ba.xa(b, f.options.ke), function(b, c, d) {
          b.Dc(l);
          b.Ab(a);
          d = 'groups' === f.options.je ? d : c;
          c = e.D
            .m(b)
            .gb(d * x * n)
            .ia({
              duration: x * m,
              G: { ta: { end: 1, Q: X.oa(g.mj) } },
              ca: function() {
                this.I = !0;
                f.c.p('foamtree:dirty', 0 < x);
              }
            })
            .wa();
          d = e.D
            .m(b)
            .gb(k ? x * (p + d * q) : 0)
            .ia({
              duration: k ? x * s : 0,
              G: { Ib: { end: 1, Q: X.Kb } },
              ca: function() {
                this.I = !0;
                f.c.p('foamtree:dirty', 0 < x);
              }
            })
            .wa();
          b = e.D
            .m(b)
            .Za([c, d])
            .re()
            .jb(function() {
              this.Pd();
              this.pc();
              this.gd(l);
              this.fd(a);
            })
            .wa();
          y.push(b);
        });
        d.d();
        var B = new V();
        e.D
          .m({})
          .Za(y)
          .call(function() {
            d.k();
            B.J();
          })
          .start();
        return B.L();
      }
      return new V().J().L();
    }
    var g,
      e,
      b = [],
      d = new qa(D.sa);
    f.c.j('stage:initialized', function() {});
    f.c.j('stage:resized', function() {});
    f.c.j('stage:newLayer', function(c, a) {
      b.push(a);
    });
    f.c.j('model:loaded', function(b) {
      g = b;
      d.clear();
    });
    f.c.j('zoom:initialized', function() {});
    f.c.j('timeline:initialized', function(b) {
      e = b;
    });
    var k = !1;
    f.c.j('render:renderers:resolved', function(b) {
      k = b.labelPlainFill || !1;
    });
    var l = new function() {
      var b = 0,
        a = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0;
      this.hb = function(k, l, m, w, x) {
        b = 1 + l;
        a = 1 - b;
        d = m;
        e = w;
        f = x;
        g = k;
      };
      this.vf = function(g, k) {
        k.scale = b + a * g.ta;
        return 0 !== f || 0 !== d || 0 !== e;
      };
      this.Ub = function(k, l) {
        var m = b + a * k.ta,
          w = k.parent,
          x = g * k.x + (1 - g) * w.x,
          y = g * k.y + (1 - g) * w.y;
        l.translate(x, y);
        l.scale(m, m);
        m = 1 - k.ta;
        l.rotate(f * Math.PI * m);
        l.translate(-x, -y);
        l.translate(w.q.f * d * m, w.q.i * e * m);
      };
      this.Wb = function(f, k, l) {
        var m = b + a * f.ta,
          r = g * f.x + (1 - g) * f.parent.x,
          y = g * f.y + (1 - g) * f.parent.y,
          C = 1 - f.ta;
        f = f.parent;
        l.x = (k.x - r) / m + r - f.q.f * d * C;
        l.y = (k.y - y) / m + y - f.q.i * e * C;
      };
      this.Vb = function(f, k, l) {
        var m = b + a * f.ta,
          r = g * f.x + (1 - g) * f.parent.x,
          y = g * f.y + (1 - g) * f.parent.y,
          C = 1 - f.ta;
        f = f.parent;
        l.x = (k.x - r) * m + r - f.q.f * d * C;
        l.y = (k.y - y) * m + y - f.q.i * e * C;
      };
    }();
    this.H = function() {};
    this.k = function() {
      function b(a, c) {
        var d = Math.min(1, Math.max(0, a.ta));
        c.opacity = d;
        c.ua = 1;
        c.va = d;
        c.Ja = d;
        c.fa = a.Ib;
      }
      function a(a, b) {
        var c = Math.min(1, Math.max(0, a.be));
        b.opacity = c;
        b.Ja = c;
        b.ua = 1;
        b.va = 1;
        b.fa = a.Ib;
      }
      var h = f.options,
        n = h.ae,
        m = h.Ji,
        p = h.Ki,
        q = h.Li,
        s = h.Fi,
        u = h.Gi,
        w = h.Hi,
        x = h.Bi,
        y = h.Ci,
        C = h.Di,
        B = s + u + w + x + y + C + m + p + q,
        K = 0 < B ? n / B : 0,
        A = [];
      d.A() ? l.hb(h.Pi, h.Ni, h.Qi, h.Ri, h.Mi) : l.hb(h.kg, h.jg, h.lg, h.mg, h.ig);
      Ba.Ia(g, Ba.xa(g, f.options.Oi), function(d, g, n) {
        var B = 'groups' === f.options.Ii ? n : g;
        A.push(
          e.D
            .m(d)
            .call(function() {
              this.Ab(b);
            })
            .gb(k ? K * (s + B * u) : 0)
            .ia({
              duration: k ? K * w : 0,
              G: { Ib: { end: 0, Q: X.Kb } },
              ca: function() {
                this.I = !0;
                f.c.p('foamtree:dirty', !0);
              }
            })
            .wa()
        );
        Y.F(d, function(b) {
          A.push(
            e.D
              .m(b)
              .call(function() {
                this.Dc(l);
                this.Ab(a);
              })
              .gb(K * (x + y * B))
              .ia({
                duration: K * C,
                G: { be: { end: 0, Q: X.Kb } },
                ca: function() {
                  this.I = !0;
                  f.c.p('foamtree:dirty', !0);
                }
              })
              .jb(function() {
                this.selected = !1;
                this.gd(l);
              })
              .wa()
          );
        });
        A.push(
          e.D
            .m(d)
            .call(function() {
              this.Dc(l);
            })
            .gb(K * (m + p * B))
            .ia({
              duration: K * q,
              G: { ta: { end: 0, Q: X.oa(h.Ei) } },
              ca: function() {
                this.I = !0;
                f.c.p('foamtree:dirty', !0);
              }
            })
            .jb(function() {
              this.selected = !1;
              this.gd(l);
            })
            .wa()
        );
      });
      return e.D
        .m({})
        .Za(A)
        .cb();
    };
    this.d = function(b) {
      return m(b);
    };
  }
  function Ja(f) {
    function m(b, a) {
      var e = [];
      Y.F(k, function(a) {
        if (a.e) {
          var d = D.M(b, a.id);
          a.open !== d &&
            (d ||
              a.U ||
              Y.F(a, function(b) {
                if (b.U) return e.push(a), !1;
              }));
        }
      });
      if (0 === e.length) return new V().J().L();
      var f;
      for (f = e.length - 1; 0 <= f; f--) e[f].open = !1;
      var g = d.hc({ e: e, Ha: !0, Ga: !0 }, a, !0, !0);
      for (f = e.length - 1; 0 <= f; f--) e[f].open = !0;
      return g;
    }
    function g(c, a, d) {
      function g(a, c) {
        a.Ab(m);
        var d = b.D
          .m(a)
          .ia({
            duration: f.options.dd,
            G: { Mb: { end: c ? 1 : 0, Q: X.De } },
            ca: function() {
              this.I = !0;
              f.c.p('foamtree:dirty', !0);
            }
          })
          .call(function() {
            this.open = c;
            a.Xb = !1;
          })
          .jb(function() {
            this.pc();
            this.fd(m);
            delete e[this.id];
          })
          .wa();
        return (e[a.id] = d);
      }
      function m(a, b) {
        b.opacity = 1 - a.Mb;
        b.ua = 1;
        b.va = 1;
        b.fa = 1;
        b.Ja = 1;
      }
      var p = [],
        q = [];
      Y.F(k, function(a) {
        if (a.N && a.X) {
          var b = D.M(c, a.id),
            d = e[a.id];
          if (d && d.Hb()) d.stop();
          else if (a.open === b) return;
          a.Xb = b;
          b || ((a.open = b), (a.Wd = !1));
          q.push(a);
          p.push(g(a, b));
        }
      });
      return 0 < p.length
        ? (f.c.p('openclose:changing'),
          b.D
            .m({})
            .Za(p)
            .cb()
            .O(function() {
              l.wd(
                a,
                q,
                'open',
                function(a) {
                  return a.open;
                },
                { indirect: d },
                f.options.Pf,
                f.options.Of
              );
            }))
        : new V().J().L();
    }
    var e, b, d, k, l;
    f.c.j('api:initialized', function(b) {
      l = b;
    });
    f.c.j('model:loaded', function(b) {
      k = b;
      e = {};
    });
    f.c.j('timeline:initialized', function(c) {
      b = c;
    });
    f.c.j('expose:initialized', function(b) {
      d = b;
    });
    this.H = function() {
      f.c.p('openclose:initialized', this);
    };
    this.Lb = function(b, a, d) {
      if ('flattened' == f.options.bb) return new V().J().L();
      b = Ga(k, b, function(a) {
        return a.open || a.Xb;
      });
      for (var e = new V(), l = 0; l < b.length; l++) b[l].Xb = !0;
      0 < b.length && f.c.p('foamtree:attachChildren');
      var p = b.reduce(function(a, b) {
        a[b.id] = !0;
        return a;
      }, {});
      m(p, a).O(function() {
        g(p, a, d).O(e.J);
      });
      return e.L();
    };
  }
  function Ka(f) {
    function m(b, d) {
      var k = Ga(g, b, function(a) {
        return a.selected;
      });
      Y.F(g, function(a) {
        !0 === a.selected && ((a.selected = !a.selected), (a.I = !a.I), (a.ab = !a.ab));
      });
      var l;
      for (l = k.length - 1; 0 <= l; l--) {
        var c = k[l];
        c.selected = !c.selected;
        c.I = !c.I;
        c.ab = !c.ab;
      }
      var a = [];
      Y.F(g, function(b) {
        b.I && a.push(b);
      });
      0 < a.length && f.c.p('foamtree:dirty', !1);
      e.wd(
        d,
        a,
        'selected',
        function(a) {
          return a.selected;
        },
        {},
        f.options.Rf,
        f.options.Qf
      );
    }
    var g, e;
    f.c.j('api:initialized', function(b) {
      e = b;
    });
    f.c.j('model:loaded', function(b) {
      g = b;
    });
    this.H = function() {
      f.c.p('select:initialized', this);
    };
    this.select = function(b, d) {
      return m(b, d);
    };
  }
  function La(f) {
    function m(a) {
      return function(b) {
        a.call(this, {
          x: b.x,
          y: b.y,
          scale: b.scale,
          yd: b.delta,
          ctrlKey: b.ctrlKey,
          metaKey: b.metaKey,
          altKey: b.altKey,
          shiftKey: b.shiftKey,
          xb: b.secondary,
          touches: b.touches
        });
      };
    }
    function g() {
      function a(b) {
        return function(a) {
          a.x *= N / r.clientWidth;
          a.y *= S / r.clientHeight;
          return b(a);
        };
      }
      'external' !== n.lf &&
        ('hammerjs' === n.lf &&
          D.M(window, 'Hammer') &&
          (E.H(r),
          E.m('tap', a(h.d), !0),
          E.m('doubletap', a(h.k), !0),
          E.m('hold', a(h.xa), !0),
          E.m('touch', a(h.za), !1),
          E.m('release', a(h.Aa), !1),
          E.m('dragstart', a(h.Y), !0),
          E.m('drag', a(h.A), !0),
          E.m('dragend', a(h.S), !0),
          E.m('transformstart', a(h.Ua), !0),
          E.m('transform', a(h.Ia), !0),
          E.m('transformend', a(h.eb), !0)),
        (F = new ta(r)),
        (U = new sa()),
        F.d(a(h.d)),
        F.k(a(h.k)),
        F.xa(a(h.xa)),
        F.Aa(a(h.za)),
        F.Pa(a(h.Aa)),
        F.Y(a(h.Y)),
        F.A(a(h.A)),
        F.S(a(h.S)),
        F.ya(a(h.ya)),
        F.Ia(a(h.ya)),
        F.za(a(h.Pa)),
        U.addEventListener('keyup', function(a) {
          var b = !1,
            c = void 0,
            d = n.Vf({
              keyCode: a.keyCode,
              preventDefault: function() {
                b = !0;
              },
              preventOriginalEventDefault: function() {
                c = 'prevent';
              },
              allowOriginalEventDefault: function() {
                c = 'allow';
              }
            });
          'prevent' === c && a.preventDefault();
          (b = b || 0 <= d.indexOf(!1)) || (27 === a.keyCode && f.c.p('interaction:reset'));
        }));
    }
    function e() {
      p.Ic(2) ? f.c.p('interaction:reset') : p.normalize(n.yc, X.oa(n.zc));
    }
    function b(a) {
      return function() {
        y.empty() || a.apply(this, arguments);
      };
    }
    function d(a, b, d) {
      var e = {},
        f = {};
      return function(g) {
        var h;
        switch (a) {
          case 'click':
            h = n.Bf;
            break;
          case 'doubleclick':
            h = n.Cf;
            break;
          case 'hold':
            h = n.If;
            break;
          case 'hover':
            h = n.Jf;
            break;
          case 'mousemove':
            h = n.Lf;
            break;
          case 'mousewheel':
            h = n.Nf;
            break;
          case 'mousedown':
            h = n.Kf;
            break;
          case 'mouseup':
            h = n.Mf;
            break;
          case 'dragstart':
            h = n.Ff;
            break;
          case 'drag':
            h = n.Df;
            break;
          case 'dragend':
            h = n.Ef;
            break;
          case 'transformstart':
            h = n.Uf;
            break;
          case 'transform':
            h = n.Sf;
            break;
          case 'transformend':
            h = n.Tf;
        }
        var k = !1,
          m = !h.empty(),
          q = p.absolute(g, e),
          r = (b || m) && l(q),
          s = (b || m) && c(q);
        m &&
          ((m = r ? r.group : null),
          (q = r ? r.Wb(q, f) : q),
          (g.Nb = void 0),
          (h = h({
            type: a,
            group: m,
            topmostClosedGroup: m,
            bottommostOpenGroup: s ? s.group : null,
            x: g.x,
            y: g.y,
            xAbsolute: q.x,
            yAbsolute: q.y,
            scale: D.B(g.scale, 1),
            secondary: g.xb,
            touches: D.B(g.touches, 1),
            delta: D.B(g.yd, 0),
            ctrlKey: g.ctrlKey,
            metaKey: g.metaKey,
            altKey: g.altKey,
            shiftKey: g.shiftKey,
            preventDefault: function() {
              k = !0;
            },
            preventOriginalEventDefault: function() {
              g.Nb = 'prevent';
            },
            allowOriginalEventDefault: function() {
              g.Nb = 'allow';
            }
          })),
          (k = k || 0 <= h.indexOf(!1)));
        k || (d && d({ Fc: r, Yg: s }, g));
      };
    }
    function k(a) {
      function b(a, c) {
        var d = c.e;
        if (d) {
          for (var e = -Number.MAX_VALUE, f, g = 0; g < d.length; g++) {
            var h = d[g];
            !h.description && h.ea && J(h, a) && h.scale > e && ((f = h), (e = h.scale));
          }
          var k;
          f && (k = b(a, f));
          return k || f;
        }
      }
      return b(a, y);
    }
    function l(a, b) {
      var c;
      if ('flattened' == n.bb) c = k(a);
      else {
        c = b || 0;
        for (var d = t.length, e = void 0, f = 0; f < d; f++) {
          var g = t[f];
          g.scale > c && !1 === g.open && g.ea && J(g, a) && ((e = g), (c = g.scale));
        }
        c = e;
      }
      return c;
    }
    function c(a) {
      var b = void 0,
        c = 0;
      Y.Lc(y, function(d) {
        !0 === d.open && d.ea && d.scale > c && J(d, a) && ((b = d), (c = d.scale));
      });
      return b;
    }
    var a = v.qf(),
      h = this,
      n = f.options,
      r,
      p,
      q,
      s,
      u,
      w,
      x,
      y,
      C = !1,
      B,
      K,
      A,
      I,
      R,
      O,
      P,
      F,
      U,
      N,
      S;
    f.c.j('stage:initialized', function(a, b, c, d) {
      r = b;
      N = c;
      S = d;
      g();
    });
    f.c.j('stage:resized', function(a, b, c, d) {
      N = c;
      S = d;
    });
    f.c.j('stage:disposed', function() {
      F.lb();
      E.lb();
      U.d();
    });
    f.c.j('expose:initialized', function(a) {
      s = a;
    });
    f.c.j('zoom:initialized', function(a) {
      p = a;
    });
    f.c.j('openclose:initialized', function(a) {
      u = a;
    });
    f.c.j('select:initialized', function(a) {
      w = a;
    });
    f.c.j('titlebar:initialized', function(a) {
      x = a;
    });
    f.c.j('timeline:initialized', function(a) {
      q = a;
    });
    var t;
    f.c.j('model:loaded', function(a, b) {
      y = a;
      t = b;
    });
    f.c.j('model:childrenAttached', function(a) {
      t = a;
    });
    this.H = function() {};
    this.za = b(
      d('mousedown', !1, function() {
        p.wi();
      })
    );
    this.Aa = b(d('mouseup', !1, void 0));
    this.d = b(
      d('click', !0, function(a, b) {
        if (!b.xb && !b.shiftKey) {
          var c = a.Fc;
          c &&
            (c.Ra && n.td
              ? n.td && (document.location.href = n.td)
              : w.select({ e: [c], Ha: !c.selected, Ga: b.metaKey || b.ctrlKey }, !0));
        }
      })
    );
    this.k = b(
      d('doubleclick', !0, function(a, b) {
        var c, d;
        if (b.xb || b.shiftKey) {
          if ((c = a.Fc))
            c.parent.U && (c = c.parent),
              (d = { e: c.parent !== y ? [c.parent] : [], Ha: !0, Ga: !1 }),
              w.select(d, !0),
              s.hc(d, !0, !0, !1);
        } else if ((c = a.Fc)) (d = { e: [c], Ha: !0, Ga: !1 }), (c.Xb = !0), f.c.p('foamtree:attachChildren'), s.hc(d, !0, !0, !1);
        c &&
          q.D
            .m({})
            .gb(n.Va / 2)
            .call(function() {
              u.Lb(
                {
                  e: Y.Nc(y, function(a) {
                    return a.Wd && !Y.mi(c, a);
                  }),
                  Ha: !1,
                  Ga: !0
                },
                !0,
                !0
              );
              c.Wd = !0;
              u.Lb({ e: [c], Ha: !(b.xb || b.shiftKey), Ga: !0 }, !0, !0);
            })
            .start();
      })
    );
    this.xa = b(
      d('hold', !0, function(a, b) {
        var c = !(b.metaKey || b.ctrlKey || b.shiftKey) && !b.xb,
          d;
        (d = c ? a.Fc : a.Yg) && d !== y && !d.empty() && u.Lb({ e: [d], Ha: c, Ga: !0 }, !0, !1);
      })
    );
    this.Y = b(
      d('dragstart', !1, function(a, b) {
        B = b.x;
        K = b.y;
        A = Date.now();
        C = !0;
      })
    );
    this.A = b(
      d('drag', !1, function(a, b) {
        if (C) {
          var c = Date.now();
          O = Math.min(1, c - A);
          A = c;
          var c = b.x - B,
            d = b.y - K;
          p.ui(c, d);
          I = c;
          R = d;
          B = b.x;
          K = b.y;
        }
      })
    );
    this.S = b(
      d('dragend', !1, function() {
        if (C) {
          C = !1;
          var a = Math.sqrt(I * I + R * R) / O;
          4 <= a ? p.vi(a, I, R) : p.zf();
        }
      })
    );
    this.Ua = b(
      d('transformstart', !1, function(a, b) {
        P = 1;
        B = b.x;
        K = b.y;
      })
    );
    var z = 1,
      H = !1;
    this.Ia = b(
      d('transform', !1, function(a, b) {
        var c = b.scale - 0.01;
        p.Rg(b, c / P, b.x - B, b.y - K);
        P = c;
        B = b.x;
        K = b.y;
        z = P;
        H = H || 2 < b.touches;
      })
    );
    this.eb = b(
      d('transformend', !1, function() {
        H && 0.8 > z ? f.c.p('interaction:reset') : e();
        H = !1;
      })
    );
    this.Pa = b(
      d(
        'mousewheel',
        !1,
        (function() {
          var b = D.dh(function() {
            e();
          }, 300);
          return function(c, d) {
            var f = n.Ij;
            1 !== f &&
              ((f = Math.pow(f, d.yd)), a ? (p.Sg(d, f), b()) : p.$b(d, f, n.yc, X.oa(n.zc)).O(e));
          };
        })()
      )
    );
    this.ya = b(
      (function() {
        var a = void 0,
          b = {},
          c = !1,
          e,
          g = d('hover', !1, function() {
            a && ((a.Fb = !1), (a.I = !0));
            e && ((e.Fb = !0), (e.I = !0));
            x.update(e);
            f.c.p('foamtree:dirty', !1);
          }),
          h = d('mousemove', !1, void 0);
        return function(d) {
          if ('out' === d.type) (e = void 0), (c = e !== a);
          else if ((p.absolute(d, b), a && !a.open && J(a, b))) {
            var f = l(b, a.scale);
            f && f != a ? ((c = !0), (e = f)) : (c = !1);
          } else (e = l(b)), (c = e !== a);
          c && (g(d), (a = e), (c = !1));
          a && h(d);
        };
      })()
    );
    this.hb = {
      click: m(this.d),
      doubleclick: m(this.k),
      hold: m(this.xa),
      mouseup: m(this.Aa),
      mousedown: m(this.za),
      dragstart: m(this.Y),
      drag: m(this.A),
      dragend: m(this.S),
      transformstart: m(this.Ua),
      transform: m(this.Ia),
      transformend: m(this.eb),
      hover: m(this.ya),
      mousewheel: m(this.Pa)
    };
    var E = (function() {
        function a(b, c) {
          return function(a) {
            a = a.gesture;
            var d = a.center,
              d = ra.Me(r, d.pageX, d.pageY, {});
            d.scale = a.scale;
            d.xb = 1 < a.touches.length;
            d.touches = a.touches.length;
            b.call(r, d);
            ((void 0 === d.Nb && c) || 'prevent' === d.Nb) && a.preventDefault();
          };
        }
        var b,
          c = {};
        return {
          H: function(a) {
            b = window.Hammer(a, {
              doubletap_interval: 350,
              hold_timeout: 400,
              doubletap_distance: 10
            });
          },
          m: function(d, e, f) {
            c[d] = e;
            b.on(d, a(e, f));
          },
          lb: function() {
            b &&
              D.Fa(c, function(a, c) {
                b.off(c, a);
              });
          }
        };
      })(),
      J = (function() {
        var a = {};
        return function(b, c) {
          b.Wb(c, a);
          return b.aa && L.Ua(b.aa, a);
        };
      })();
  }
  function Ma(f) {
    function m(b, d, e, f) {
      var c,
        a = 0,
        g = [];
      for (c = 0; c < d.length; c++) {
        var n = Math.sqrt(L.d(d[c], d[(c + 1) % d.length]));
        g.push(n);
        a += n;
      }
      for (c = 0; c < g.length; c++) g[c] /= a;
      b[0].x = e.x;
      b[0].y = e.y;
      var m = (n = a = 0);
      for (c = 1; c < b.length; c++) {
        for (var p = b[c], q = 0.95 * Math.pow(c / b.length, f), a = a + 0.3819; n < a; )
          (n += g[m]), (m = (m + 1) % g.length);
        var s = (m - 1 + g.length) % g.length,
          u = 1 - (n - a) / g[s],
          w = d[s].x,
          s = d[s].y,
          x = d[m].x,
          y = d[m].y,
          w = (w - e.x) * q + e.x,
          s = (s - e.y) * q + e.y,
          x = (x - e.x) * q + e.x,
          y = (y - e.y) * q + e.y;
        p.x = w * (1 - u) + x * u;
        p.y = s * (1 - u) + y * u;
      }
    }
    var g = {
      random: {
        Gb: function(b, d) {
          for (var e = 0; e < b.length; e++) {
            var f = b[e];
            f.x = d.x + Math.random() * d.f;
            f.y = d.y + Math.random() * d.i;
          }
        },
        ac: 'box'
      },
      ordered: {
        Gb: function(b, d) {
          var f = b.slice(0);
          e.nc && f.sort(Na);
          Ca.Zb(f, d, !1, e.fe);
        },
        ac: 'box'
      },
      squarified: {
        Gb: function(b, d) {
          var f = b.slice(0);
          e.nc && f.sort(Na);
          Ca.we(f, d, !1, e.fe);
        },
        ac: 'box'
      },
      fisheye: {
        Gb: function(b, d, f) {
          b = b.slice(0);
          e.nc && b.sort(Na);
          m(b, d, f, 0.25);
        },
        ac: 'polygon'
      },
      blackhole: {
        Gb: function(b, d, f) {
          b = b.slice(0);
          e.nc && b.sort(Na).reverse();
          m(b, d, f, 1);
        },
        ac: 'polygon'
      }
    };
    g.order = g.ordered;
    g.treemap = g.squarified;
    var e = f.options;
    this.d = function(b, d, f) {
      if (0 < b.length) {
        f = g[f.relaxationInitializer || f.initializer || e.hj || 'random'];
        if ('box' === f.ac) {
          var l = L.q(d, {});
          f.Gb(b, l);
          L.Cc(b, L.A(l), d);
        } else f.Gb(b, d, L.k(d, {}));
        for (l = b.length - 1; 0 <= l; l--) {
          f = b[l];
          if (f.description) {
            b = L.te(d, e.Jc, e.eh);
            f.x = b.x;
            f.y = b.y;
            break;
          }
          if (f.Ra) {
            b = L.te(d, e.ye, e.Tg);
            f.x = b.x;
            f.y = b.y;
            break;
          }
        }
      }
    };
  }
  function Oa(f) {
    var m,
      g = f.options,
      e = new Pa(f, this),
      b = new Qa(f, this),
      d = { relaxed: e, ordered: b, squarified: b },
      k = d[f.options.Xc] || e;
    this.Eg = 5e-5;
    f.c.j('model:loaded', function(b) {
      m = b;
    });
    f.c.j('options:changed', function(b) {
      b.layout && D.M(d, g.Xc) && (k = d[g.Xc]);
    });
    this.step = function(b, c, a, d) {
      return k.step(b, c, a, d);
    };
    this.complete = function(b) {
      k.complete(b);
    };
    this.of = function(b) {
      return b === m ? !0 : 2 * Math.sqrt(b.K.ja / (Math.PI * b.e.length)) >= Math.max(g.Ze, 5e-5);
    };
    this.Ad = function(b, c) {
      for (
        var a = Math.pow(g.Sa, b.R), d = g.mb * a, a = g.Cd * a, e = b.e, f = e.length - 1;
        0 <= f;
        f--
      ) {
        var m = e[f];
        k.Ae(m, a);
        var q = m;
        q.aa = 0 < d ? za.eb(q.o, d) : q.o;
        q.aa && (L.q(q.aa, q.q), L.ue(q.aa, q.K));
        m.e && c.push(m);
      }
    };
    this.sc = function(b) {
      k.sc(b);
    };
    this.Ob = function(b) {
      k.Ob(b);
    };
  }
  function Pa(f, m) {
    function g(a) {
      if (a.e) {
        a = a.e;
        for (var b = 0; b < a.length; b++) {
          var c = a[b];
          c.wc = c.tc * n.Th;
        }
      }
    }
    function e(c, d) {
      m.of(c) &&
        (c.u ||
          ((c.u = za.eb(c.o, n.Cd * Math.pow(n.Sa, c.R - 1))),
          c.u && 'flattened' == n.bb && 'stab' == n.fc && l(c)),
        c.u && (a.Ob(c), r.d(b(c), c.u, c.group), (c.N = !0), d(c)),
        g(c));
    }
    function b(a) {
      return 'stab' == n.fc && 0 < a.e.length && a.e[0].description ? a.e.slice(1) : a.e;
    }
    function d(a) {
      var c = b(a);
      Aa.S(c, a.u);
      Aa.Ac(c, a.u);
      return Ba.Fg(a) * Math.sqrt(h.K.ja / a.K.ja);
    }
    function k(a) {
      return a < n.eg || 1e-4 > a;
    }
    function l(a) {
      var b = n.ec / (1 + n.ec),
        c = L.q(a.u, {}),
        d = { x: c.x, y: 0 },
        e = c.y,
        f = c.i,
        g = n.Ge * Math.pow(n.Sa, a.R - 1),
        h = f * n.Fe,
        k = n.Jc;
      'bottom' == k || (0 <= k && 180 > k)
        ? ((k = Math.PI), (e += f), (f = -1))
        : ((k = 0), (f = 1));
      for (
        var l, m = a.u, p = k, r = 0, P = 1, F = L.k(m, {}), U = F.ja, b = U * b, N = 0;
        r < P && 20 > N++;

      ) {
        var S = (r + P) / 2;
        d.y = c.y + c.i * S;
        l = L.Yb(m, d, p);
        L.k(l[0], F);
        var t = F.ja - b;
        if (0.01 >= Math.abs(t) / U) break;
        else 0 < (0 == p ? 1 : -1) * t ? (P = S) : (r = S);
      }
      L.q(l[0], c);
      if (c.i < g || c.i > h)
        (d.y = c.i < g ? e + f * Math.min(g, h) : e + f * h), (l = L.Yb(a.u, d, k));
      a.e[0].o = l[0];
      a.u = l[1];
    }
    function c(a) {
      a !== h &&
        2 * Math.sqrt(a.K.ja / (Math.PI * a.e.length)) < Math.max(0.85 * n.Ze, m.Eg) &&
        ((a.N = !1), (a.Ba = !1), (a.Qa = !0), (a.u = null));
    }
    var a = this,
      h,
      n = f.options,
      r = new Ma(f),
      p = 0;
    f.c.j('model:loaded', function(a) {
      h = a;
      p = 0;
    });
    this.step = function(a, f, g, l) {
      function r(f) {
        f.N && f.Ba
          ? c(f)
          : f.Qa &&
            f.o &&
            e(f, function() {
              var c = b(f);
              Aa.S(c, f.u);
              Aa.Ac(c, f.u);
              a(f);
            });
        if (!f.u || !f.N) return 0;
        var g;
        (f.parent && f.parent.Z) || f.Ka
          ? ((g = d(f)), l && l(f), (f.Ka = !k(g)), (f.Z = !0))
          : (g = 0);
        m.Ad(f, B);
        return g;
      }
      function y(a, b, c) {
        p < a && (p = a);
        var d = n.eg;
        n.Vd(b ? 1 : 1 - (a - d) / (p - d || 1), b, c);
        b && (p = 0);
      }
      for (var C = 0, B = [h]; 0 < B.length; ) C = Math.max(C, r(B.shift()));
      var K = k(C);
      f && y(C, K, g);
      return K;
    };
    this.complete = function(a) {
      for (var b = [h]; 0 < b.length; ) {
        var c = b.shift();
        !c.N && c.Qa && c.o && e(c, a);
        if (c.u) {
          if ((c.parent && c.parent.Z) || c.Ka) {
            for (var f = 1e-4 > c.K.ja, g = 0; !(k(d(c)) || (f && 32 < g++)); );
            c.Z = !0;
            c.Ka = !1;
          }
          m.Ad(c, b);
        }
      }
    };
    this.sc = function(a) {
      Y.F(a, g);
    };
    this.Ae = function(a, c) {
      if (a.N) {
        var d = a.u;
        d && (a.$d = d);
        a.u = za.eb(a.o, c);
        a.u && 'flattened' == n.bb && 'stab' == n.fc && l(a);
        d && !a.u && (a.Z = !0);
        a.u && a.$d && L.Cc(b(a), a.$d, a.u);
      }
    };
    this.Ob = function(a) {
      for (var c = b(a), d = a.ja, e, f = (e = 0); f < c.length; f++) e += c[f].T;
      a.Xj = e;
      for (a = 0; a < c.length; a++)
        (f = c[a]), (f.sg = f.f), (f.tc = d / Math.PI * (0 < e ? f.T / e : 1 / c.length));
    };
  }
  function Qa(f, m) {
    function g(a, c) {
      if (m.of(a)) {
        if (!a.u || (a.parent && a.parent.Z)) {
          var d = l.Cd * Math.pow(l.Sa, a.R - 1);
          a.u = L.A(b(L.q(a.o, {}), d));
        }
        a.u && ((a.N = !0), c(a));
      } else
        (a.N = !1),
          Y.Ea(a, function(a) {
            a.u = null;
          });
    }
    function e(a) {
      function b(a) {
        function c() {
          e.o = L.A(f);
          e.x = f.x + f.f / 2;
          e.y = f.y + f.i / 2;
        }
        var d = l.ec / (1 + l.ec),
          e = a.e[0],
          f = L.q(a.u, {}),
          g = f.i,
          d = Math.min(Math.max(g * d, l.Ge * Math.pow(l.Sa, a.R - 1)), g * l.Fe),
          h = l.Jc;
        'bottom' == h || (0 <= h && 180 > h)
          ? ((f.i = g - d), (a.u = L.A(f)), (f.y += g - d), (f.i = d), c())
          : ((f.i = d), c(), (f.y += d), (f.i = g - d), (a.u = L.A(f)));
      }
      var e;
      'stab' == l.fc && 0 < a.e.length && a.e[0].description
        ? ((e = a.e.slice(1)), b(a))
        : (e = a.e);
      l.nc && e.sort(Na);
      'floating' == l.fc &&
        d(e, l.Jc, function(a) {
          return a.description;
        });
      d(e, l.ye, function(a) {
        return a.Ra;
      });
      var f = L.q(a.u, {});
      (c[l.Xc] || Ca.Zb)(e, f, !0, l.fe);
      a.Ka = !1;
      a.Z = !0;
      a.I = !0;
      a.Ma = !0;
    }
    function b(a, b) {
      var c = 2 * b;
      a.x += b;
      a.y += b;
      a.f -= c;
      a.i -= c;
      return a;
    }
    function d(a, b, c) {
      for (var d = 0; d < a.length; d++) {
        var e = a[d];
        if (c(e)) {
          a.splice(d, 1);
          'topleft' == b || (135 <= b && 315 > b) ? a.unshift(e) : a.push(e);
          break;
        }
      }
    }
    var k,
      l = f.options,
      c = { squarified: Ca.we, ordered: Ca.Zb };
    f.c.j('model:loaded', function(a) {
      k = a;
    });
    this.step = function(a, b, c) {
      this.complete(a);
      b && l.Vd(1, !0, c);
      return !0;
    };
    this.complete = function(a) {
      for (var b = [k]; 0 < b.length; ) {
        var c = b.shift();
        (!c.N || (c.parent && c.parent.Z)) && c.Qa && c.o && g(c, a);
        c.u && (((c.parent && c.parent.Z) || c.Ka) && e(c), m.Ad(c, b));
      }
    };
    this.Ob = this.sc = this.Ae = D.sa;
  }
  function Ra(f, m) {
    function g(a, b) {
      var c = a.K.Pb,
        d = c / 15,
        e = 0.5 * c / 15,
        c = c / 5,
        f = a.K.x,
        g = a.K.y;
      b.fillRect(f - e, g - e, d, d);
      b.fillRect(f - e - c, g - e, d, d);
      b.fillRect(f - e + c, g - e, d, d);
    }
    function e(a, b, c, d) {
      null === a && c.clearRect(0, 0, I, R);
      var e,
        f = Array(W.length);
      for (e = W.length - 1; 0 <= e; e--) f[e] = W[e].pa(c, d);
      for (e = W.length - 1; 0 <= e; e--) f[e] && W[e].W(c, d);
      U.Kc([c, A], function(d) {
        var e;
        if (null !== a) {
          c.save();
          c.globalCompositeOperation = 'destination-out';
          c.fillStyle = c.strokeStyle = 'rgba(255, 255, 255, 1)';
          for (e = a.length - 1; 0 <= e; e--) {
            var g = a[e],
              h = g.o;
            h &&
              (c.save(),
              c.beginPath(),
              g.Ub(c),
              ha.oe(c, h),
              c.fill(),
              (g = t.mb * Math.pow(t.Sa, g.R - 1)),
              0 < g && ((c.lineWidth = g / 2), c.stroke()),
              c.restore());
          }
          c.restore();
        }
        d = d.scale;
        if (0 !== b.length) {
          e = {};
          for (h = W.length - 1; 0 <= h; h--) W[h].Pg(e);
          for (g = Z.length - 1; 0 <= g; g--)
            if (((h = Z[g]), e[h.id]))
              for (var l = h.ee, h = 0; h < b.length; h++) {
                var k = b[h];
                !k.parent || (k.parent.Ba && k.parent.N) ? l(k, d) : k.ba.clear();
              }
        }
        for (e = W.length - 1; 0 <= e; e--) (g = W[e]), f[e] && g.he(b, c, d);
      });
      for (e = W.length - 1; 0 <= e; e--) f[e] && W[e].Ca(c);
      t.sd &&
        ((c.canvas.style.opacity = 0.99),
        setTimeout(function() {
          c.canvas.style.opacity = 1;
        }, 1));
    }
    function b(a) {
      s === w ? a < 0.9 * r && ((s = u), (y = C), c()) : a >= r && ((s = w), (y = B), c());
    }
    function d() {
      function a(b, c, d) {
        b.Db = Math.floor(1e3 * b.scale) - d * c;
        0 < b.opacity && !b.open && c++;
        var e = b.e;
        if (e) for (var f = e.length - 1; 0 <= f; f--) b.$ && a(e[f], c, d);
      }
      var c = null,
        d = null,
        e = null;
      U.Kc([], function(f) {
        b(f.scale);
        var g = !1;
        Y.F(z, function(a) {
          a.$ && ((g = a.Pd() || g), a.pc(), (a.Xa = P.d(a) || a.Xa));
        });
        g && (z.I = !0);
        var h = 'onSurfaceDirty' === t.qh;
        Y.zd(z, function(a) {
          a.parent && a.parent.Z && (a.ba.clear(), (a.Xa = !0), h || ((a.Gc = !0), a.cc.clear()));
          h && ((a.Gc = !0), a.cc.clear());
        });
        var l = f.scale * f.scale;
        Y.zd(z, function(a) {
          if (a.N) {
            for (var b = a.e, c = 0; c < b.length; c++)
              if (5 < b[c].K.ja * l) {
                a.X = !0;
                return;
              }
            a.X = !1;
          }
        });
        n(f);
        e = [];
        Y.Mc(z, function(a) {
          if (a.parent.X && a.ea && a.$) {
            e.push(a);
            for (var b = a.parent; b !== z && (b.open || 0 === b.opacity); ) b = b.parent;
            b !== z && 0.02 > Math.abs(b.scale - a.scale) && (a.scale = Math.min(a.scale, b.scale));
          }
        });
        a(z, 0, 'flattened' == t.bb ? -1 : 1);
        e.sort(function(a, b) {
          return a.Db - b.Db;
        });
        if (k()) (c = e), (d = null);
        else {
          var m = {},
            p = {},
            q = 'none' != t.Ed && t.mb < t.nb / 2,
            r = t.mb < t.Sc / 2 + t.Dd * t.af.a;
          Y.F(z, function(a) {
            if (a.$ && !a.description && (a.Z || a.I || (a.Zc && a.parent.X && a.Xa))) {
              var b,
                c,
                d = [a],
                e = a.C || a.parent.e;
              if (q) for (b = 0; b < e.length; b++) (c = e[b]) && d.push(c);
              else if (r)
                if (!a.selected && a.ab) {
                  c = !0;
                  for (b = 0; b < e.length; b++) e[b] ? d.push(e[b]) : (c = !1);
                  !c && 1 < a.R && d.push(a.parent);
                } else for (b = 0; b < e.length; b++) (c = e[b]) && c.selected && d.push(c);
              var f;
              for (b = a.parent; b != z; ) b.selected && (f = b), (b = b.parent);
              f && d.push(f);
              for (b = 0; b < d.length; b++) {
                f = d[b];
                for (a = f.parent; a && a !== z; ) 0 < a.opacity && (f = a), (a = a.parent);
                p[f.id] = !0;
                Y.Ea(f, function(a) {
                  m[a.id] = !0;
                });
              }
            }
          });
          c = e.filter(function(a) {
            return m[a.id];
          });
          d = c.filter(function(a) {
            return p[a.id];
          });
        }
      });
      (function() {
        var a = !1;
        t.dg &&
          Y.F(z, function(b) {
            if (b.$ && 0 !== b.ra.a && 1 !== b.ra.a) return (a = !0), !1;
          });
        a
          ? (Y.Lc(z, function(a) {
              if (a.$ && (a.opacity !== a.cd || a.Ma)) {
                var b = a.e;
                if (b) {
                  for (var c = 0, d = b.length - 1; 0 <= d; d--) c = Math.max(c, b[d].Yc);
                  a.Yc = c + a.opacity * a.ra.a;
                } else a.Yc = a.opacity * a.ra.a;
              }
            }),
            Y.F(z, function(a) {
              if (a.$ && (a.opacity !== a.cd || a.Ma)) {
                for (var b = a.Yc, c = a; (c = c.parent) && c !== z; )
                  b += c.opacity * c.ra.a * t.bg;
                a.ud = 0 < b ? 1 - Math.pow(1 - a.ra.a, 1 / b) : 0;
                a.cd = a.opacity;
              }
            }))
          : Y.F(z, function(a) {
              a.$ && ((a.ud = 1), (a.cd = -1));
            });
      })();
      return { yg: c, xg: d, ea: e };
    }
    function k() {
      var a = z.Z || z.I || 'none' == t.jf;
      if (!a && !z.empty()) {
        var b = z.e[0].scale;
        Y.F(z, function(c) {
          if (c.$ && c.ea && c.scale !== b) return (a = !0), !1;
        });
      }
      !a &&
        0 < t.Ve &&
        1 != t.Wa &&
        Y.F(z, function(b) {
          if (b.$ && 0 < b.ka) return (a = !0), !1;
        });
      'accurate' == t.jf &&
        ((a = (a = a || 0 === t.mb) || ('none' != t.Ed && t.mb < t.nb / 2)),
        !a &&
          t.mb < t.Sc / 2 + t.Dd * t.af.a &&
          Y.F(z, function(b) {
            if (b.$ && ((b.selected && !b.ab) || (!b.selected && b.ab))) return (a = !0), !1;
          }));
      return a;
    }
    function l() {
      if (t.n !== t.yb) return !0;
      var a = 'polygonPlainFill polygonPlainStroke polygonGradientFill polygonGradientStroke labelPlainFill contentDecoration'.split(
        ' '
      );
      Y.F(z, function(b) {
        if (b.$ && b.U) return a.push('polygonExposureShadow'), !1;
      });
      for (var b = a.length - 1; 0 <= b; b--) {
        var c = a[b];
        if (!!E[c] !== !!M[c]) return !0;
      }
      return !1;
    }
    function c() {
      function a(c, d, e, f, g) {
        function h(a, b, c, d, e) {
          a[d] && ((b -= c * p[d]), (a[d] = !1), e && ((b += c * p[e]), (a[e] = !0)));
          return b;
        }
        c = D.extend({}, c);
        switch (e) {
          case 'never':
            c.labelPlainFill = !1;
            break;
          case 'always':
          case 'auto':
            c.labelPlainFill = !0;
        }
        if (t.Qc)
          switch (f) {
            case 'never':
              c.contentDecoration = !1;
              break;
            case 'always':
            case 'auto':
              c.contentDecoration = !0;
          }
        else c.contentDecoration = !1;
        var k = 0;
        D.Fa(c, function(a, b) {
          a && (k += d * p['contentDecoration' === b ? 'labelPlainFill' : b]);
        });
        c.polygonExposureShadow = b;
        k += 2 * p.polygonExposureShadow;
        if (
          k <= g ||
          (k = h(c, k, 2, 'polygonExposureShadow')) <= g ||
          (k = h(c, k, d, 'polygonGradientFill', 'polygonPlainFill')) <= g ||
          (k = h(c, k, d, 'polygonGradientStroke')) <= g ||
          (k = h(c, k, d, 'polygonPlainStroke')) <= g ||
          ('auto' === f && (k = h(c, k, d, 'contentDecoration')) <= g)
        )
          return c;
        'auto' === e && (k = h(c, k, d, 'labelPlainFill'));
        return c;
      }
      var b = s === u,
        c = 0,
        d = 0;
      Y.Le(z, function(a) {
        var b = 1;
        Y.F(a, function() {
          b++;
        });
        c += b;
        d = Math.max(d, b);
      });
      var e = {};
      switch (t.zh) {
        case 'plain':
          e.polygonPlainFill = !0;
          break;
        case 'gradient':
          (e.polygonPlainFill = !b), (e.polygonGradientFill = b);
      }
      switch (t.Ed) {
        case 'plain':
          e.polygonPlainStroke = !0;
          break;
        case 'gradient':
          (e.polygonPlainStroke = !b), (e.polygonGradientStroke = b);
      }
      E = a(e, c, t.Gj, t.Ej, t.Fj);
      M = a(e, 2 * d, 'always', 'always', t.jh);
      J = a(e, c, 'always', 'always', t.ih);
    }
    function a(a) {
      return function(b, c) {
        return b === s ? !0 === E[a] : !0 === (c ? M : J)[a];
      };
    }
    function h(a, b) {
      return function(c, d) {
        return a(c, d) && b(c, d);
      };
    }
    function n(a) {
      z.ea = !0;
      Y.zd(z, function(b) {
        if (b.$ && b.X && b.Ba && b.N && (z.I || b.Z || b.pe)) {
          b.pe = !1;
          var c = b.e,
            d = { x: 0, y: 0, f: 0, i: 0 },
            e = !!b.u;
          if (1 < I / a.f) {
            var f;
            for (f = c.length - 1; 0 <= f; f--) c[f].ea = !1;
            if (b.ea && e)
              for (f = c.length - 1; 0 <= f; f--)
                if (
                  ((b = c[f]),
                  1 !== b.scale && (b.Wb(a, d), (d.f = a.f / b.scale), (d.i = a.i / b.scale)),
                  !1 === b.ea && b.o)
                ) {
                  var e = b.o,
                    g = e.length;
                  if (L.Ua(b.o, 1 === b.scale ? a : d)) b.ea = !0;
                  else
                    for (var h = 0; h < g; h++)
                      if (L.Ng(e[h], e[(h + 1) % g], 1 === b.scale ? a : d)) {
                        b.ea = !0;
                        b.C && (b = b.C[h]) && (c[b.index].ea = !0);
                        break;
                      }
                }
          } else for (f = 0; f < c.length; f++) c[f].ea = e;
        }
      });
    }
    var r = v.sf() ? 50 : 1e4,
      p,
      q,
      s,
      u,
      w,
      x,
      y,
      C,
      B,
      K,
      A,
      I,
      R,
      O,
      P = new Sa(f),
      F = new Ta(f),
      U,
      N,
      S,
      t = f.options,
      z,
      H,
      E,
      J,
      M;
    f.c.j('stage:initialized', function(a, b, c, d) {
      O = a;
      I = c;
      R = d;
      q = O.qc('wireframe', t.yb, !1);
      u = q.getContext('2d');
      w = new ga(u);
      x = O.qc('hifi', t.n, !1);
      C = x.getContext('2d');
      B = new ga(C);
      s = u;
      y = C;
      u.n = t.yb;
      w.n = t.yb;
      C.n = t.n;
      B.n = t.n;
      K = O.qc('tmp', Math.max(t.n, t.yb), !0);
      A = K.getContext('2d');
      A.n = 1;
      [u, C, A].forEach(function(a) {
        a.scale(a.n, a.n);
      });
    });
    f.c.j('stage:resized', function(a, b, c, d) {
      I = c;
      R = d;
      [u, C, A].forEach(function(a) {
        a.scale(a.n, a.n);
      });
    });
    f.c.j('model:loaded', function(a) {
      function b(a) {
        var c = 0;
        if (!a.empty()) {
          for (var d = a.e, e = d.length - 1; 0 <= e; e--) c = Math.max(c, b(d[e]));
          c += 1;
        }
        return (a.pg = c);
      }
      z = a;
      H = !0;
      b(z);
      c();
      f.c.p('render:renderers:resolved', E, M, J);
    });
    var Q = 'groupFillType groupStrokeType wireframeDrawMaxDuration wireframeLabelDrawing wireframeContentDecorationDrawing finalCompleteDrawMaxDuration finalIncrementalDrawMaxDuration groupContentDecorator'.split(
        ' '
      ),
      $ = [
        'groupLabelLightColor',
        'groupLabelDarkColor',
        'groupLabelColorThreshold',
        'groupUnexposureLabelColorThreshold'
      ];
    f.c.j('options:changed', function(a) {
      function b(a, c, d, e) {
        O.gj(a, d);
        c.n = d;
        e && c.scale(d, d);
      }
      a.dataObject ||
        (D.ob(a, Q) && c(),
        D.ob(a, $) &&
          Y.F(z, function(a) {
            a.Bd = -1;
          }));
      var d = D.M(a, 'pixelRatio');
      a = D.M(a, 'wireframePixelRatio');
      if (d || a) d && b(x, y, t.n, !0), a && b(q, s, t.yb, !0), b(K, A, Math.max(t.n, t.yb), !1);
    });
    f.c.j('zoom:initialized', function(a) {
      U = a;
    });
    f.c.j('timeline:initialized', function(a) {
      N = a;
    });
    f.c.j('api:initialized', function(a) {
      S = a;
    });
    var Z = [
        {
          id: 'offsetPolygon',
          ee: function(a) {
            if ((a.selected || (0 < a.opacity && !1 === a.open) || !a.X) && a.ba.Na()) {
              var b = a.ba;
              b.clear();
              if (a.aa) {
                var c = a.aa,
                  d = t.lh;
                0 < d
                  ? ((d = Math.min(1, d * Math.pow(1 - t.mh * d, a.pg))),
                    ha.sj(b, c, a.parent.K.Pb / 32, d))
                  : ha.oe(b, c);
              }
              a.Yd = !0;
            }
          }
        },
        {
          id: 'label',
          ee: function(a) {
            a.Xa && a.Zc && P.k(a);
          }
        },
        {
          id: 'custom',
          ee: function(a, b) {
            if (
              a.aa &&
              ((0 < a.opacity && (!1 === a.open || !0 === a.selected)) || !a.X) &&
              a.Gc &&
              f.options.Qc
            ) {
              var c = {};
              S.qd(c, a);
              S.rd(c, a);
              S.pd(c, a, !0);
              c.context = a.cc;
              c.polygonContext = a.ba;
              c.labelContext = a.Vc;
              c.shapeDirty = a.Yd;
              c.viewportScale = b;
              var d = { groupLabelDrawn: !0, groupPolygonDrawn: !0 };
              f.options.ph(f.Xd, c, d);
              d.groupLabelDrawn || (a.tf = !1);
              d.groupPolygonDrawn || (a.Zd = !1);
              a.Yd = !1;
              a.Gc = !1;
            }
          }
        }
      ].reverse(),
      W = [
        new function(a) {
          var b = Array(a.length);
          this.he = function(c, d, e) {
            if (0 !== c.length) {
              var f,
                g,
                h = [],
                k = c[0].Db;
              for (f = 0; f < c.length; f++) (g = c[f]), g.Db !== k && (h.push(f), (k = g.Db));
              h.push(f);
              for (var l = (k = 0); l < h.length; l++) {
                for (var m = h[l], n = a.length - 1; 0 <= n; n--)
                  if (b[n]) {
                    var p = a[n];
                    d.save();
                    for (f = k; f < m; f++)
                      (g = c[f]), d.save(), g.Ub(d), p.wb.call(p, g, d, e), d.restore();
                    p.ib.call(p, d, e);
                    d.restore();
                  }
                k = m;
              }
            }
          };
          this.pa = function(c, d) {
            for (var e = !1, f = a.length - 1; 0 <= f; f--) (b[f] = a[f].pa(c, d)), (e |= b[f]);
            return e;
          };
          this.W = function(c, d) {
            for (var e = a.length - 1; 0 <= e; e--)
              if (b[e]) {
                var f = a[e];
                f.W.call(f, c, d);
              }
          };
          this.Ca = function(c) {
            for (var d = a.length - 1; 0 <= d; d--)
              if (b[d]) {
                var e = a[d];
                e.Ca.call(e, c);
              }
          };
          this.Pg = function(c) {
            for (var d = a.length - 1; 0 <= d; d--) {
              var e = a[d];
              if (b[d]) for (var f = e.$a.length - 1; 0 <= f; f--) c[e.$a[f]] = !0;
            }
          };
        }(
          [
            {
              $a: ['offsetPolygon'],
              pa: a('polygonExposureShadow'),
              W: function(a) {
                A.save();
                A.scale(a.n, a.n);
              },
              Ca: function() {
                A.restore();
              },
              d: function() {},
              ib: function(a) {
                this.og &&
                  ((this.og = !1),
                  a.save(),
                  a.setTransform(1, 0, 0, 1, 0, 0),
                  a.drawImage(
                    K,
                    0,
                    0,
                    a.canvas.width,
                    a.canvas.height,
                    0,
                    0,
                    a.canvas.width,
                    a.canvas.height
                  ),
                  a.restore(),
                  A.save(),
                  A.setTransform(1, 0, 0, 1, 0, 0),
                  A.clearRect(0, 0, K.width, K.height),
                  A.restore());
              },
              wb: function(a, b, c) {
                if (!((a.open && a.X) || a.ba.Na())) {
                  var d =
                    t.Ve *
                    a.opacity *
                    a.ka *
                    ('flattened' == t.bb ? 1 - a.parent.ka : (1 - a.Mb) * a.parent.Mb) *
                    (1.1 <= t.Wa ? 1 : (t.Wa - 1) / 0.1);
                  0 < d &&
                    (A.save(),
                    A.beginPath(),
                    a.Ub(A),
                    a.ba.Ta(A),
                    (A.shadowBlur = c * b.n * d),
                    (A.shadowColor = t.rh),
                    (A.fillStyle = 'rgba(0, 0, 0, 1)'),
                    (A.globalCompositeOperation = 'source-over'),
                    (A.globalAlpha = a.opacity),
                    A.fill(),
                    (A.shadowBlur = 0),
                    (A.shadowColor = 'transparent'),
                    (A.globalCompositeOperation = 'destination-out'),
                    A.fill(),
                    A.restore(),
                    (this.og = !0));
                }
              }
            },
            {
              $a: ['offsetPolygon'],
              pa: function() {
                return !0;
              },
              W: (function() {
                function b(a) {
                  var d = a.ra,
                    e = a.Fb,
                    f = a.selected,
                    g = c(d.l * a.ua + (e ? t.Eh : 0) + (f ? t.Vh : 0)),
                    h = c(d.s * a.va + (e ? t.Fh : 0) + (f ? t.Wh : 0));
                  a = a.Ue;
                  a.h = (d.h + (e ? t.Dh : 0) + (f ? t.Uh : 0)) % 360;
                  a.s = h;
                  a.l = g;
                  return a;
                }
                function c(a) {
                  return 100 < a ? 100 : 0 > a ? 0 : a;
                }
                var d = [
                    {
                      type: 'fill',
                      pa: a('polygonPlainFill'),
                      jd: function(a, c) {
                        c.fillStyle = T.Bc(b(a));
                      }
                    },
                    {
                      type: 'fill',
                      pa: a('polygonGradientFill'),
                      jd: function(a, d) {
                        var e = a.K.Pb,
                          f = b(a),
                          e = d.createRadialGradient(a.x, a.y, 0, a.x, a.y, e * t.vh);
                        e.addColorStop(0, T.Y((f.h + t.sh) % 360, c(f.s + t.uh), c(f.l + t.th)));
                        e.addColorStop(1, T.Y((f.h + t.wh) % 360, c(f.s + t.yh), c(f.l + t.xh)));
                        a.ba.Ta(d);
                        d.fillStyle = e;
                      }
                    },
                    {
                      type: 'stroke',
                      pa: h(a('polygonPlainStroke'), function() {
                        return 0 < t.nb;
                      }),
                      jd: function(a, b) {
                        var d = a.ra,
                          e = a.Fb,
                          f = a.selected;
                        b.strokeStyle = T.Y(
                          (d.h + t.ef + (e ? t.We : 0) + (f ? t.bf : 0)) % 360,
                          c(d.s * a.va + t.gf + (e ? t.Ye : 0) + (f ? t.df : 0)),
                          c(d.l * a.ua + t.ff + (e ? t.Xe : 0) + (f ? t.cf : 0))
                        );
                        b.lineWidth = t.nb * Math.pow(t.Sa, a.R - 1);
                      }
                    },
                    {
                      type: 'stroke',
                      pa: h(a('polygonGradientStroke'), function() {
                        return 0 < t.nb;
                      }),
                      jd: function(a, b) {
                        var d = a.K.Pb * t.bi,
                          e = a.ra,
                          f = Math.PI * t.Yh / 180,
                          d = b.createLinearGradient(
                            a.x + d * Math.cos(f),
                            a.y + d * Math.sin(f),
                            a.x + d * Math.cos(f + Math.PI),
                            a.y + d * Math.sin(f + Math.PI)
                          ),
                          g = a.Fb,
                          h = a.selected,
                          f = (e.h + t.ef + (g ? t.We : 0) + (h ? t.bf : 0)) % 360,
                          k = c(e.s * a.va + t.gf + (g ? t.Ye : 0) + (h ? t.df : 0)),
                          e = c(e.l * a.ua + t.ff + (g ? t.Xe : 0) + (h ? t.cf : 0));
                        d.addColorStop(0, T.Y((f + t.Zh) % 360, c(k + t.ai), c(e + t.$h)));
                        d.addColorStop(1, T.Y((f + t.ci) % 360, c(k + t.ei), c(e + t.di)));
                        b.strokeStyle = d;
                        b.lineWidth = t.nb * Math.pow(t.Sa, a.R - 1);
                      }
                    }
                  ],
                  e = Array(d.length);
                return function(a, b) {
                  for (var c = d.length - 1; 0 <= c; c--) e[c] = d[c].pa(a, b);
                  this.wj = d;
                  this.Zg = e;
                };
              })(),
              Ca: function() {},
              d: function() {},
              ib: function() {},
              wb: function(a, b) {
                if (
                  a.Zd &&
                  !(((0 === a.opacity || a.open) && a.X) || a.ba.Na() || (!t.He && a.description))
                ) {
                  var c = this.wj,
                    d = this.Zg;
                  b.beginPath();
                  a.ba.Ta(b);
                  for (var e = !1, f = !1, g = c.length - 1; 0 <= g; g--) {
                    var h = c[g];
                    if (d[g])
                      switch ((h.jd(a, b), h.type)) {
                        case 'fill':
                          e = !0;
                          break;
                        case 'stroke':
                          f = !0;
                      }
                  }
                  c = (a.X ? a.opacity : 1) * a.ra.a;
                  d = !a.empty();
                  g = t.dg ? a.ud : 1;
                  e &&
                    ((e =
                      d && a.X && a.N && a.e[0].$
                        ? 1 -
                          a.e.reduce(function(a, b) {
                            return a + b.ta * b.be;
                          }, 0) /
                            a.e.length *
                            (1 - t.bg)
                        : 1),
                    (b.globalAlpha = c * e * g),
                    Ua(b));
                  f && ((b.globalAlpha = c * (d ? t.xi : 1) * g), b.closePath(), Va(b), b.stroke());
                }
              }
            },
            {
              $a: ['offsetPolygon'],
              pa: function() {
                return 0 < t.Sc;
              },
              W: function() {},
              Ca: function() {},
              d: function() {},
              ib: function() {},
              wb: function(a, b, c) {
                if (a.Zd && a.selected && !a.ba.Na()) {
                  b.globalAlpha = a.Ja;
                  b.beginPath();
                  var d = Math.pow(t.Sa, a.R - 1);
                  b.lineWidth = t.Sc * d;
                  b.strokeStyle = t.Xh;
                  var e = t.Dd;
                  0 < e && ((b.shadowBlur = e * d * c * b.n), (b.shadowColor = t.$e));
                  a.ba.Ta(b);
                  b.closePath();
                  b.stroke();
                }
              }
            },
            {
              $a: [],
              pa: function() {
                return t.La;
              },
              W: function() {},
              Ca: function() {},
              d: function() {},
              ib: function() {},
              wb: function(a, b) {
                function c(d, e, f) {
                  var g = L.ve(a.aa, a.K, d / e),
                    h = t.Ug,
                    g = Math.min(Math.min(0.9 * g, h * a.q.i) / e, h * a.q.f / d);
                  b.save();
                  b.translate(a.x, a.y);
                  b.globalAlpha = a.opacity * a.fa;
                  b.scale(g, g);
                  b.translate(-d / 2, -e / 2);
                  f(b);
                  b.restore();
                }
                a.Ra &&
                  !a.ba.Na() &&
                  t.La &&
                  0 < t.La.width &&
                  0 < t.La.height &&
                  c(t.La.width, t.La.height, function(a) {
                    a.drawImage(t.La, 0, 0);
                  });
              }
            },
            {
              $a: [],
              pa: (function(a, b) {
                return function(c, d) {
                  return a(c, d) || b(c, d);
                };
              })(
                a('labelPlainFill'),
                h(a('contentDecoration'), function() {
                  return t.Qc;
                })
              ),
              W: function() {},
              Ca: function() {},
              d: function() {},
              ib: function() {},
              wb: function(a, b, c) {
                ((0 < a.opacity && 0 < a.fa && !a.open) || !a.X) &&
                  !a.ba.Na() &&
                  ((a.Wc = a.qa && a.qa.la && t.n * a.qa.fontSize * a.scale * c >= t.Rh),
                  !t.He && a.description
                    ? (a.rb = a.parent.rb)
                    : 'auto' === a.Jd
                      ? ((b = a.Ue),
                        (c = b.h + (b.s << 9) + (b.l << 16)),
                        a.Bd !== c &&
                          ((a.rb = T.Dg(b) > (0 > a.ka ? t.fi : t.Gh) ? t.Hh : t.Qh), (a.Bd = c)))
                      : (a.rb = a.Jd));
              }
            },
            {
              $a: ['custom'],
              pa: h(a('contentDecoration'), function() {
                return t.Qc;
              }),
              W: function() {},
              Ca: function() {},
              d: function() {},
              ib: function() {},
              wb: function(a, b) {
                !((0 < a.opacity && 0 < a.fa && !a.open) || !a.X) ||
                  a.cc.Na() ||
                  a.ba.Na() ||
                  (a.Wc || void 0 === a.qa
                    ? ((b.globalAlpha = a.fa * (a.X ? a.opacity : 1) * (a.empty() ? 1 : t.cg)),
                      (b.fillStyle = a.rb),
                      (b.strokeStyle = a.rb),
                      a.cc.Ta(b))
                    : g(a, b));
              }
            },
            {
              $a: ['label'],
              pa: a('labelPlainFill'),
              W: function() {},
              Ca: function() {},
              d: function() {},
              ib: function() {},
              wb: function(a, b, c) {
                a.tf &&
                  a.Zc &&
                  ((0 < a.opacity && 0 < a.fa && !a.open) || !a.X) &&
                  !a.ba.Na() &&
                  a.qa &&
                  ((b.fillStyle = a.rb),
                  (b.globalAlpha = a.fa * (a.X ? a.opacity : 1) * (a.empty() ? 1 : t.cg)),
                  a.Wc ? Wa(a, b, c) : g(a, b));
              }
            }
          ].reverse()
        )
      ];
    this.H = function() {
      p = ua.li(
        function() {
          return ia.gh();
        },
        'CarrotSearchFoamTree',
        12096e5
      )(Ya());
      F.H();
    };
    this.clear = function() {
      s.clearRect(0, 0, I, R);
      y.clearRect(0, 0, I, R);
    };
    this.he = (function() {
      function a() {
        window.clearTimeout(b);
        b = setTimeout(function() {
          if (l()) {
            var a = !k();
            e(null, c.ea, y, a);
            D.defer(function() {
              ca.tj();
            });
          }
        }, Math.max(t.Hj, 3 * m.tg.Md, 3 * m.tg.Ld));
      }
      var b, c;
      return function(b) {
        Za(F);
        c = d();
        var f = null !== c.xg,
          g = 0 < O.mc('hifi'),
          h = g && (f || !b);
        b = f || H || !b;
        H = !1;
        g && !h && ca.uj();
        e(c.xg, c.yg, h ? y : s, b);
        Y.Ea(z, function(a) {
          a.Z = !1;
          a.I = !1;
          a.ab = !1;
        });
        h || a();
        t.Yf(f);
      };
    })();
    this.d = function(a) {
      a = a || {};
      Za(F);
      z.I = !0;
      var b = d(),
        c = t.n;
      try {
        var f = D.B(a.pixelRatio, t.n);
        t.n = f;
        var g = O.qc('export', f, !0),
          h = g.getContext('2d');
        s === w && (h = new ga(h));
        h.scale(f, f);
        var k = D.M(a, 'backgroundColor');
        k && (h.save(), (h.fillStyle = a.backgroundColor), h.fillRect(0, 0, I, R), h.restore());
        e(k ? [] : null, b.yg, h, !0);
      } finally {
        t.n = c;
      }
      return g.toDataURL(D.B(a.format, 'image/png'), D.B(a.quality, 0.8));
    };
    var ca = (function() {
      function a(b, d, e, f) {
        function g(a, b, c, d) {
          return N.D
            .m({ opacity: O.mc(a) })
            .ia({
              duration: c,
              G: { opacity: { end: b, Q: d } },
              ca: function() {
                O.mc(a, this.opacity);
              }
            })
            .wa();
        }
        var h = D.Hd(O.mc(b), 1),
          k = D.Hd(O.mc(e), 0);
        if (!h || !k) {
          for (var l = c.length - 1; 0 <= l; l--) c[l].stop();
          c = [];
          h || c.push(g(b, 1, d, X.Sb));
          k || c.push(g(e, 0, f, X.qg));
          return N.D
            .m({})
            .Za(c)
            .start();
        }
      }
      var b,
        c = [];
      return {
        uj: function() {
          t.sd
            ? 1 !== q.style.opacity &&
              ((q.style.visibility = 'visible'),
              (x.style.visibility = 'hidden'),
              (q.style.opacity = 1),
              (x.style.opacity = 0))
            : (b && b.Hb()) || (b = a('wireframe', t.Qe, 'hifi', t.Qe));
        },
        tj: function() {
          t.sd
            ? ((x.style.visibility = 'visible'),
              (q.style.visibility = 'hidden'),
              (q.style.opacity = 0),
              (x.style.opacity = 1))
            : a('hifi', t.Ag, 'wireframe', t.Ag);
        }
      };
    })();
    Za = function(a) {
      a.apply();
    };
    Ua = function(a) {
      a.fill();
    };
    Va = function(a) {
      a.stroke();
    };
    return this;
  }
  var Ua, Va, Za;
  function Sa(f) {
    function m(a) {
      return e.Ph
        ? ((c.fontFamily = b.fontFamily),
          (c.fontStyle = b.fontStyle),
          (c.fontVariant = b.fontVariant),
          (c.fontWeight = b.fontWeight),
          (c.lineHeight = b.lineHeight),
          (c.horizontalPadding = b.pb),
          (c.verticalPadding = b.fb),
          (c.maxTotalTextHeight = b.tb),
          (c.maxFontSize = b.sb),
          k.Ec(e.Oh, a, c),
          (d.fontFamily = c.fontFamily),
          (d.fontStyle = c.fontStyle),
          (d.fontVariant = c.fontVariant),
          (d.fontWeight = c.fontWeight),
          (d.lineHeight = c.lineHeight),
          (d.pb = c.horizontalPadding),
          (d.fb = c.verticalPadding),
          (d.tb = c.maxTotalTextHeight),
          (d.sb = c.maxFontSize),
          d)
        : b;
    }
    function g(a) {
      'undefined' !== typeof a.groupLabelFontFamily && (b.fontFamily = a.groupLabelFontFamily);
      'undefined' !== typeof a.groupLabelFontStyle && (b.fontStyle = a.groupLabelFontStyle);
      'undefined' !== typeof a.groupLabelFontVariant && (b.fontVariant = a.groupLabelFontVariant);
      'undefined' !== typeof a.groupLabelFontWeight && (b.fontWeight = a.groupLabelFontWeight);
      'undefined' !== typeof a.groupLabelLineHeight && (b.lineHeight = a.groupLabelLineHeight);
      'undefined' !== typeof a.groupLabelHorizontalPadding &&
        (b.pb = a.groupLabelHorizontalPadding);
      'undefined' !== typeof a.groupLabelVerticalPadding && (b.fb = a.groupLabelVerticalPadding);
      'undefined' !== typeof a.groupLabelMaxTotalHeight && (b.tb = a.groupLabelMaxTotalHeight);
      'undefined' !== typeof a.groupLabelMaxFontSize && (b.sb = a.groupLabelMaxFontSize);
    }
    var e = f.options,
      b = {},
      d = {},
      k,
      l = { groupLabel: '' },
      c = {};
    f.c.j('api:initialized', function(a) {
      k = a;
    });
    f.c.j('options:changed', g);
    g(f.Xd);
    this.d = function(a) {
      if (!a.aa) return !1;
      var b = a.group.label;
      e.Jh && ((l.labelText = b), k.Ec(e.Ih, a, l), (b = l.labelText));
      a.uf = b;
      return a.Kd != b;
    };
    this.k = function(a) {
      var b = a.uf;
      a.Kd = b;
      a.Vc.clear();
      a.qa = void 0;
      !a.aa ||
        D.nf(b) ||
        ('flattened' == e.bb && !a.empty() && a.N) ||
        (a.qa = G.Be(m(a), a.Vc, b, a.aa, a.q, a.K, !1, !1, a.ni, a.K.ja, e.Sh, a.Xa));
      a.Xa = !1;
    };
    Wa = this.A = function(a, b) {
      a.Vc.Ta(b);
    };
  }
  var Wa;
  function Ta(f) {
    function m(a, b) {
      var c = a.e,
        d = c.length,
        e,
        f,
        g = l.K.Pb;
      for (e = 0; e < d; e++)
        (f = c[e]),
          (f.Eb = (180 * (Math.atan2(f.x - a.x, f.y - a.y) + b) / Math.PI + 180) / 360),
          (f.Pc = Math.min(1, Math.sqrt(L.d(f, a)) / g));
    }
    function g(a, b) {
      var c = a.e,
        d = c.length;
      if (1 === d || (2 === d && c[0].description)) c[0].Eb = 0.5;
      else {
        var e,
          f,
          g = 0,
          k = Number.MAX_VALUE,
          l = Math.sin(b),
          m = Math.cos(b);
        for (e = 0; e < d; e++) {
          f = c[e];
          var y = f.x * l + f.y * m;
          g < y && (g = y);
          k > y && (k = y);
          f.Eb = y;
          f.Pc = 1;
        }
        for (e = 0; e < d; e++) (f = c[e]), (f.Eb = (f.Eb - k) / (g - k));
      }
    }
    function e(a, b, c, d) {
      b = b[d];
      return b + (c[d] - b) * a;
    }
    var b = { radial: m, linear: g },
      d = f.options,
      k,
      l,
      c = { groupColor: null, labelColor: null };
    f.c.j('model:loaded', function(a) {
      l = a;
    });
    f.c.j('api:initialized', function(a) {
      k = a;
    });
    this.H = function() {};
    this.apply = function() {
      function a(b) {
        if (b.N && b.Ba) {
          var g = b.e,
            l,
            m;
          if (b.Z || b.Ma || u) {
            0 === b.R ? n(b, d.Wi * Math.PI / 180) : r(b, d.$i * Math.PI / 180);
            for (l = g.length - 1; 0 <= l; l--) {
              m = g[l];
              m.Ma = !0;
              var A = m.Eb,
                I,
                R,
                O,
                P,
                F = m.Te;
              0 === b.R
                ? ((I = e(A, p, q, 'h')),
                  (R = (x + (1 - x) * m.Pc) * e(A, p, q, 's')),
                  (O = (1 + (0 > m.ka ? w * (m.ka + 1) : w) * (1 - m.Pc)) * e(A, p, q, 'l')),
                  (P = e(A, p, q, 'a')))
                : ((O = b.ra), (I = O.h), (R = O.s), (O = f(O.l, A, d.aj, d.bj)), (P = b.Te.a));
              F.h = I;
              F.s = R;
              F.l = O;
              F.a = P;
              I = m.ra;
              m.Ra
                ? ((I.h = 0), (I.s = 0), (I.l = 'light' == d.Vg ? 90 : 10), (I.a = 1))
                : ((I.h = F.h), (I.s = F.s), (I.l = F.l), (I.a = F.a));
              u &&
                ((c.groupColor = I),
                (c.labelColor = 'auto'),
                k.Ec(s, m, c, function(a) {
                  a.ratio = A;
                }),
                (m.ra = T.Aa(c.groupColor)),
                (m.ra.a = D.M(c.groupColor, 'a') ? c.groupColor.a : 1),
                'auto' !== c.labelColor && (m.Jd = T.Og(c.labelColor)));
            }
            b.Ma = !1;
          }
          for (l = g.length - 1; 0 <= l; l--) a(g[l]);
        }
      }
      function f(a, b, c, d) {
        var e = 0 > a + c * d ? 0 : 100 < a + c * d ? 100 : a + c * d;
        return (
          e + b * ((0 > a - c * (1 - d) ? 0 : 100 < a - c * (1 - d) ? 100 : a - c * (1 - d)) - e)
        );
      }
      var n = b[d.Vi] || m,
        r = g,
        p = d.ej,
        q = d.Yi,
        s = d.nh,
        u = d.oh,
        w = d.Zi,
        x = d.cj;
      a(l);
    };
    return this;
  }
  function Fa() {
    this.wc = this.se = this.tc = this.sg = this.f = this.zg = this.T = this.y = this.x = this.id = 0;
    this.o = this.parent = this.e = null;
    this.q = { x: 0, y: 0, f: 0, i: 0 };
    this.C = null;
    this.Kd = this.uf = void 0;
    this.md = !1;
    this.Pc = this.Eb = 0;
    this.Te = { h: 0, s: 0, l: 0, a: 0, model: 'hsla' };
    this.ra = { h: 0, s: 0, l: 0, a: 0, model: 'hsla' };
    this.Ue = { h: 0, s: 0, l: 0, model: 'hsl' };
    this.Bd = -1;
    this.Jd = 'auto';
    this.rb = '#000';
    this.pg = this.R = this.Gd = this.index = 0;
    this.Ra = !1;
    this.ja = this.yf = 0;
    this.ea = !1;
    this.aa = null;
    this.K = { x: 0, y: 0, ja: 0, Pb: 0 };
    this.$d = this.u = null;
    this.Zc = this.$ = this.ab = this.Gc = this.pe = this.Yd = this.Xa = this.Ma = this.I = this.Z = this.Ka = this.Ba = this.N = this.Qa = !1;
    this.va = this.ua = this.Ja = this.fa = this.opacity = this.scale = 1;
    this.ta = 0;
    this.be = 1;
    this.Mb = this.ka = this.Ib = 0;
    this.description = this.selected = this.Fb = this.Wd = this.open = this.U = !1;
    this.Db = 0;
    this.tf = this.Zd = this.X = !0;
    this.qa = void 0;
    this.Wc = !1;
    this.Vc = new ea();
    this.ba = new ea();
    this.cc = new ea();
    this.ni = G.zi();
    this.Yc = 0;
    this.ud = 1;
    this.cd = -1;
    this.empty = function() {
      return !this.e || 0 === this.e.length;
    };
    var f = [];
    this.Dc = function(b) {
      f.push(b);
    };
    this.gd = function(b) {
      D.fg(f, b);
    };
    var m = { scale: 1 };
    this.Pd = function() {
      var b = !1;
      this.scale = 1;
      for (var d = 0; d < f.length; d++) (b = f[d].vf(this, m) || b), (this.scale *= m.scale);
      return b;
    };
    this.Ub = function(b) {
      for (var d = 0; d < f.length; d++) f[d].Ub(this, b);
    };
    this.Vb = function(b, d) {
      d.x = b.x;
      d.y = b.y;
      for (var e = 0; e < f.length; e++) f[e].Vb(this, d, d);
      return d;
    };
    this.Wb = function(b, d) {
      d.x = b.x;
      d.y = b.y;
      for (var e = 0; e < f.length; e++) f[e].Wb(this, d, d);
      return d;
    };
    var g = [];
    this.Ab = function(b) {
      g.push(b);
    };
    this.fd = function(b) {
      D.fg(g, b);
    };
    var e = { opacity: 1, va: 1, ua: 1, fa: 1, Ja: 1 };
    this.pc = function() {
      if (0 !== g.length) {
        this.Ja = this.fa = this.ua = this.va = this.opacity = 1;
        for (var b = g.length - 1; 0 <= b; b--)
          (0, g[b])(this, e),
            (this.opacity *= e.opacity),
            (this.ua *= e.ua),
            (this.va *= e.va),
            (this.fa *= e.fa),
            (this.Ja *= e.Ja);
      }
    };
  }
  function Na(f, m) {
    return m.T > f.T ? 1 : m.T < f.T ? -1 : f.index - m.index;
  }
  function $a(f) {
    var m = this,
      g,
      e,
      b,
      d,
      k = f.options,
      l,
      c;
    f.c.j('stage:initialized', function(a, c, l, r) {
      b = l;
      d = r;
      g = a.qc('titlebar', k.n, !1);
      e = g.getContext('2d');
      e.n = k.n;
      e.scale(e.n, e.n);
      f.c.p('titlebar:initialized', m);
    });
    f.c.j('stage:resized', function(a, c, f, g) {
      b = f;
      d = g;
      e.scale(e.n, e.n);
    });
    f.c.j('zoom:initialized', function(a) {
      c = a;
    });
    f.c.j('api:initialized', function(a) {
      l = a;
    });
    f.c.j('model:loaded', function() {
      e.clearRect(0, 0, b, d);
    });
    this.update = function(a) {
      e.clearRect(0, 0, b, d);
      if (a) {
        !a.empty() && a.e[0].description && (a = a.e[0]);
        var f = k.Bj,
          g = k.Aj,
          m = Math.min(d / 2, k.qe + 2 * f),
          p = m - 2 * f,
          q = b - 2 * g;
        if (!(0 >= p || 0 >= q)) {
          var s = a.Wc ? a.qa.fontSize * a.scale * c.scale() : 0,
            u,
            w = {
              titleBarText: a.Kd,
              titleBarTextColor: k.wg,
              titleBarBackgroundColor: k.vg,
              titleBarMaxFontSize: k.qe,
              titleBarShown: s < k.si
            };
          l.Ec(k.xj, a, w, function(a) {
            a.titleBarWidth = q;
            a.titleBarHeight = p;
            a.labelFontSize = s;
            a.viewportScale = c.scale();
          });
          (u = w.titleBarText) &&
            0 !== u.length &&
            w.titleBarShown &&
            ((a = c.od(a.Vb(a, {}), {}).y > d / 2),
            (f = { x: g, y: a ? f : d - m + f, f: q, i: p }),
            (g = L.A(f)),
            (e.fillStyle = k.vg),
            e.fillRect(0, a ? 0 : d - m, b, m),
            (e.fillStyle = k.wg),
            G.Pe(
              {
                fontFamily: k.yj || k.Kh,
                fontStyle: k.Uj || k.Lh,
                fontWeight: k.Wj || k.Nh,
                fontVariant: k.Vj || k.Mh,
                sb: k.qe,
                $c: k.zj,
                pb: 0,
                fb: 0,
                tb: 1
              },
              e,
              u,
              g,
              f,
              { x: f.x + f.f / 2, y: f.y + f.i / 2 },
              !0,
              !0
            ).la || e.clearRect(0, 0, b, d));
        }
      }
    };
  }
  function ab(f) {
    function m(a, b, d) {
      w = !0;
      h && h.stop();
      r && r.stop();
      return k(c.reset(a), b, d).O(function() {
        w = !1;
      });
    }
    function g(a) {
      c.update(a);
      s.I = !0;
      f.c.p('foamtree:dirty', !0);
    }
    function e(a, b) {
      return c.d((0 !== c.k() ? 0.35 : 1) * a, (0 !== c.A() ? 0.35 : 1) * b);
    }
    function b() {
      if (1 === a.Qb) {
        var b = Math.round(1e4 * c.k()) / 1e4;
        0 !== b &&
          ((n.ce = b),
          (h = u.D
            .vc(n)
            .ia({
              duration: 500,
              G: { x: { start: b, end: 0, Q: X.Sb } },
              ca: function() {
                c.d(n.x - n.ce, 0);
                g(1);
                n.ce = n.x;
              }
            })
            .start()));
      }
    }
    function d() {
      if (1 === a.Qb) {
        var b = Math.round(1e4 * c.A()) / 1e4;
        0 !== b &&
          ((p.de = b),
          (r = u.D
            .vc(p)
            .ia({
              duration: 500,
              G: { y: { start: b, end: 0, Q: X.Sb } },
              ca: function() {
                c.d(0, p.y - p.de);
                g(1);
                p.de = p.y;
              }
            })
            .start()));
      }
    }
    function k(b, c, d) {
      return b
        ? u.D
            .vc(a)
            .ia({
              duration: void 0 === c ? 700 : c,
              G: { Qb: { start: 0, end: 1, Q: d || X.rg } },
              ca: function() {
                g(a.Qb);
              }
            })
            .cb()
        : new V().J().L();
    }
    function l(a) {
      return function() {
        return w ? new V().J().L() : a.apply(this, arguments);
      };
    }
    var c = new oa(f),
      a = { Qb: 1 },
      h,
      n = { Ie: 0, x: 0, ce: 0 },
      r,
      p = { Je: 0, y: 0, de: 0 },
      q = this,
      s,
      u,
      w = !1;
    f.c.j('model:loaded', function(a) {
      s = a;
      c.reset(!1);
      c.update(1);
    });
    f.c.j('timeline:initialized', function(a) {
      u = a;
    });
    this.H = function() {
      f.c.p('zoom:initialized', this);
    };
    this.reset = function(a, b) {
      c.Rb(1);
      return m(!0, a, b);
    };
    this.normalize = l(function(a, b) {
      c.Ic(1) ? m(!1, a, b) : q.zf();
    });
    this.zf = function() {
      b();
      d();
    };
    this.k = l(function(a, b, c, d) {
      return q.uc(a.q, b, c, d);
    });
    this.$b = l(function(a, b, d, e) {
      return k(c.$b(a, b), d, e);
    });
    this.uc = l(function(a, b, d, e) {
      return k(c.uc(a, b), d, e);
    });
    this.Cj = l(function(a, b) {
      c.uc(a, b) && g(1);
    });
    this.ui = l(function(b, c) {
      1 === a.Qb && e(b, c) && g(1);
    });
    this.Sg = l(function(a, b) {
      c.$b(a, b) && g(1);
    });
    this.Rg = l(function(a, b, d, f) {
      a = 0 | c.$b(a, b);
      (a |= e(d, f)) && g(1);
    });
    this.vi = l(function(f, k, l) {
      1 === a.Qb &&
        ((h = u.D
          .vc(n)
          .ia({
            duration: f / 0.03,
            G: { Ie: { start: k, end: 0, Q: X.Sb } },
            ca: function() {
              c.d(n.Ie, 0) && g(1);
              b();
            }
          })
          .start()),
        (r = u.D
          .vc(p)
          .ia({
            duration: f / 0.03,
            G: { Je: { start: l, end: 0, Q: X.Sb } },
            ca: function() {
              e(0, p.Je) && g(1);
              d();
            }
          })
          .start()));
    });
    this.wi = function() {
      h && 0 === c.k() && h.stop();
      r && 0 === c.A() && r.stop();
    };
    this.Kc = function(a, b) {
      c.Kc(a, b);
    };
    this.Rb = function(a) {
      return c.Rb(a);
    };
    this.Ic = function(a) {
      return c.Ic(a);
    };
    this.Ud = function() {
      return c.Ud();
    };
    this.absolute = function(a, b) {
      return c.absolute(a, b);
    };
    this.od = function(a, b) {
      return c.od(a, b);
    };
    this.scale = function() {
      return c.scale();
    };
    this.d = function(a) {
      return c.S(a);
    };
    this.content = function(a, b, d, e) {
      c.content(a, b, d, e);
    };
  }
  function bb(f, m, g) {
    function e(a) {
      var b = [];
      Y.F(n, function(c) {
        a(c) && b.push(c.group);
      });
      return { groups: b };
    }
    function b(a, b) {
      var c = h.options,
        d = c.lj,
        e = c.kj,
        c = c.ie,
        f = 0 < d + e ? c : 0,
        g = [];
      Ba.Ia(a, Ba.xa(a, h.options.ke), function(a, c, k) {
        c = 'groups' === h.options.je ? k : c;
        a.e &&
          ((a = p.D
            .m(a)
            .gb(f * (e + d * c))
            .call(b)
            .wa()),
          g.push(a));
      });
      return p.D
        .m({})
        .Za(g)
        .cb();
    }
    function d(a) {
      Q ||
        ((Q = !0),
        r.d(
          function() {
            Q = !1;
            h.c.p('repaint:before');
            C.he(this.Qg);
          },
          { Qg: a }
        ));
    }
    function k() {
      function a(d, e) {
        var f = d.$;
        d.$ = e <= b;
        d.Zc = e <= c;
        d.$ != f &&
          Y.Ke(d, function(a) {
            a.pe = !0;
          });
        d.open || d.Xb || e++;
        if ((f = d.e)) for (var g = 0; g < f.length; g++) a(f[g], e);
      }
      var b = h.options.Qd,
        c = Math.min(h.options.Qd, h.options.qi);
      a(n, 1);
    }
    function l() {
      var a = [],
        b = c();
      b.ti && h.c.p('model:childrenAttached', Y.Nc(n));
      b.fj &&
        y.complete(function(b) {
          J.qb(b);
          a.push(b);
        });
      for (b = 0; b < a.length; b++) {
        var d = a[b];
        d.Ba = !0;
        A.d(d);
      }
    }
    function c() {
      var a = h.options.Qd,
        b = !1,
        c = !1;
      u.scale();
      u.scale();
      for (var d = [n, 1]; 0 < d.length; ) {
        var e = d.shift(),
          f = d.shift(),
          g = !e.Ra && f < a,
          c = c || g;
        e.Qa = e.Qa || g;
        e.open || e.Xb || f++;
        var k = e.e;
        !k && g && ((b = x.S(e) || b), (k = e.e));
        if (k) for (e = 0; e < k.length; e++) d.push(k[e], f);
      }
      return { ti: b, fj: c };
    }
    var a = this,
      h = { c: new wa(), options: m, Xd: g },
      n,
      r = new ba(),
      p = new xa(r),
      q = aa.create(),
      s = new ja(h),
      u = new ab(h),
      w = new Da(h),
      x = new Ea(h.options),
      y = new Oa(h),
      C = new Ra(h, r),
      B = new La(h);
    new $a(h);
    var K = new Ha(h),
      A = new Ia(h),
      I = new Ja(h),
      R = new Ka(h);
    h.c.j('stage:initialized', function(a, b, c, d) {
      S.kf(c, d);
    });
    h.c.j('stage:resized', function(a, b, c, d) {
      S.jj(a, b, c, d);
    });
    h.c.j('foamtree:attachChildren', l);
    h.c.j('openclose:changing', k);
    h.c.j('interaction:reset', function() {
      M(!0);
    });
    h.c.j('foamtree:dirty', d);
    this.H = function() {
      h.c.p('timeline:initialized', p);
      n = x.H();
      s.H(f);
      w.H();
      C.H();
      B.H();
      K.H();
      A.H();
      u.H();
      I.H();
      R.H();
    };
    this.lb = function() {
      p.d();
      E.stop();
      r.k();
      s.lb();
    };
    var O = 'groupLabelFontFamily groupLabelFontStyle groupLabelFontVariant groupLabelFontWeight groupLabelLineHeight groupLabelHorizontalPadding groupLabelVerticalPadding groupLabelDottingThreshold groupLabelMaxTotalHeight groupLabelMinFontSize groupLabelMaxFontSize groupLabelDecorator'.split(
        ' '
      ),
      P = 'rainbowColorDistribution rainbowLightnessDistribution rainbowColorDistributionAngle rainbowLightnessDistributionAngle rainbowColorModelStartPoint rainbowLightnessCorrection rainbowSaturationCorrection rainbowStartColor rainbowEndColor rainbowHueShift rainbowHueShiftCenter rainbowSaturationShift rainbowSaturationShiftCenter rainbowLightnessShift rainbowLightnessShiftCenter attributionTheme'.split(
        ' '
      ),
      F = !1,
      U = [
        'groupBorderRadius',
        'groupBorderRadiusCorrection',
        'groupBorderWidth',
        'groupInsetWidth',
        'groupBorderWidthScaling'
      ],
      N = ['maxGroupLevelsDrawn', 'maxGroupLabelLevelsDrawn'];
    this.Yb = function(a) {
      h.c.p('options:changed', a);
      D.ob(a, O) &&
        Y.F(n, function(a) {
          a.Xa = !0;
        });
      D.ob(a, P) && (n.Ma = !0);
      D.ob(a, U) && (F = !0);
      D.ob(a, N) && (k(), l());
    };
    this.reload = function() {
      t.reload();
    };
    this.Zb = function(a, b) {
      D.defer(function() {
        if (F) S.oi(a), (F = !1);
        else {
          if (b) for (var c = x.A(b), e = c.length - 1; 0 <= e; e--) c[e].I = !0;
          else n.I = !0;
          d(a);
        }
      });
    };
    this.Y = function() {
      s.k();
    };
    this.update = function() {
      x.update();
      S.Dj();
    };
    this.reset = function() {
      return M(!1);
    };
    this.S = C.d;
    this.Aa = (function() {
      var a = {};
      return function(b, c) {
        var d = x.d(b);
        return d ? w.pd(a, d, c) : null;
      };
    })();
    this.za = (function() {
      var a = { x: 0, y: 0 },
        b = { x: 0, y: 0 };
      return function(c, d) {
        var e = x.d(c);
        return e
          ? ((a.x = d.x), (a.y = d.y), e.Vb(a, a), u.od(a, a), (b.x = a.x), (b.y = a.y), b)
          : null;
      };
    })();
    this.xa = (function() {
      var a = {};
      return function(b) {
        return (b = x.d(b)) ? w.rd(a, b) : null;
      };
    })();
    this.hb = (function() {
      var a = {};
      return function(b) {
        return (b = x.d(b)) ? w.qd(a, b) : null;
      };
    })();
    this.ya = (function() {
      var a = {};
      return function() {
        return u.d(a);
      };
    })();
    this.Ac = function() {
      this.A({
        groups: e(function(a) {
          return a.group.selected;
        }),
        newState: !0,
        keepPrevious: !1
      });
      this.k({
        groups: e(function(a) {
          return a.group.open;
        }),
        newState: !0,
        keepPrevious: !1
      });
      this.d({
        groups: e(function(a) {
          return a.group.exposed;
        }),
        newState: !0,
        keepPrevious: !1
      });
    };
    this.Ia = function() {
      return e(function(a) {
        return a.U;
      });
    };
    this.d = function(a) {
      return t.submit(function() {
        return K.hc(x.k(a, 'exposed', !1), !1, !0, !1);
      });
    };
    this.Pa = function() {
      return e(function(a) {
        return a.open;
      });
    };
    this.k = function(a) {
      return t.submit(function() {
        return I.Lb(x.k(a, 'open', !0), !1, !1);
      });
    };
    this.eb = function() {
      return e(function(a) {
        return a.selected;
      });
    };
    this.A = function(a) {
      return t.submit(function() {
        R.select(x.k(a, 'selected', !0), !1);
        return new V().J().L();
      });
    };
    this.Cc = function(a) {
      return (a = x.d(a))
        ? a === n ? u.reset(m.yc, X.oa(m.zc)) : u.k(a, m.Rc, m.yc, X.oa(m.zc))
        : new V().J().L();
    };
    this.Ua = function(a) {
      return B.hb[a];
    };
    this.Bc = function() {
      var a = da;
      return {
        frames: a.frames,
        totalTime: a.totalTime,
        lastFrameTime: a.Ld,
        lastInterFrameTime: a.Md,
        fps: a.Se
      };
    };
    var S = (function() {
        function a(d, f) {
          var g = d || c,
            h = f || e;
          c = g;
          e = h;
          var k = m.dc && m.dc.boundary;
          k && 2 < k.length
            ? (n.o = k.map(function(a) {
                return {
                  x: g * a.x,
                  y: h * a.y
                };
              }))
            : (n.o = [{ x: 0, y: 0 }, { x: g, y: 0 }, { x: g, y: h }, { x: 0, y: h }]);
          b();
        }
        function b() {
          n.Z = !0;
          n.u = n.o;
          n.q = L.q(n.o, n.q);
          n.K = n;
          L.ue(n.o, n.K);
        }
        var c, e;
        return {
          kf: a,
          jj: function(b, c, e, f) {
            J.stop();
            var g = e / b,
              k = f / c;
            Y.Le(n, function(a) {
              a.x = a.x * g + (Math.random() - 0.5) * e / 1e3;
              a.y = a.y * k + (Math.random() - 0.5) * f / 1e3;
            });
            a(e, f);
            n.Ka = !0;
            y.step(J.qb, !0, !1, function(a) {
              var b = a.e;
              if (b) {
                y.Ob(a);
                for (var c = b.length - 1; 0 <= c; c--) {
                  var d = b[c];
                  d.f = d.tc;
                }
                a.Ka = !0;
              }
            })
              ? d(!1)
              : (y.sc(n),
                h.options.ge ? (d(!1), E.gg(), E.hd()) : (y.complete(J.qb), (n.Ma = !0), d(!1)));
          },
          oi: function(a) {
            var c = !1;
            n.empty() || (b(), E.Hb() || ((c = y.step(J.qb, !1, !1)), d(a)));
            return c;
          },
          Dj: function() {
            Y.Ea(n, function(a) {
              a.empty() || y.Ob(a);
            });
            y.sc(n);
            h.options.ge
              ? (E.gg(),
                Y.Ea(n, function(a) {
                  a.empty() || J.hf(a);
                }))
              : (Y.Ea(n, function(a) {
                  a.empty() || J.qb(n);
                }),
                y.complete(J.qb),
                (n.Ma = !0),
                d(!1));
          }
        };
      })(),
      t = (function() {
        function d() {
          0 === m.ae && u.reset(0);
          h.options.Xf(m.dc);
          S.kf();
          x.Y(m.dc);
          c();
          k();
          h.c.p('model:loaded', n, Y.Nc(n));
          var a;
          n.empty() ||
            ((n.open = !0),
            (n.Qa = !0),
            m.ge ? (a = E.hd()) : (E.yi(), (a = g())),
            e(),
            0 < m.ie ? (C.clear(), s.d(1)) : (a = pa([a, f(1)])));
          h.options.Wf(m.dc);
          a &&
            (h.options.$f(),
            a.O(function() {
              r.d(h.options.Zf);
            }));
        }
        function e() {
          var b = m.Va,
            c = m.dd;
          m.Va = 0;
          m.dd = 0;
          a.Ac();
          m.Va = b;
          m.dd = c;
        }
        function f(a, b) {
          return 0 === m.Oe || b
            ? (s.d(a), new V().J().L())
            : p.D
                .m({ opacity: s.d() })
                .re(2)
                .ia({
                  duration: m.Oe,
                  G: { opacity: { end: a, Q: X.oa(m.hh) } },
                  ca: function() {
                    s.d(this.opacity);
                  }
                })
                .cb();
        }
        function g() {
          Y.Ea(n, function(a) {
            a.Ba = !1;
          });
          var a = new V(),
            c = new qa(a.J);
          c.d();
          n.Ba = !0;
          A.d(n).O(c.k);
          b(n, function Xa() {
            this.N &&
              this.o &&
              ((this.Z = this.Ba = !0), c.d(), A.d(this).O(c.k), c.d(), b(this, Xa).O(c.k));
          });
          return a.L();
        }
        function l() {
          for (var a = 0; a < t.length; a++) {
            var b = t[a],
              c = b.action();
            D.M(c, 'then') ? c.O(b.Ee.J) : b.Ee.J();
          }
          t = [];
        }
        var q = !1,
          t = [];
        return {
          reload: function() {
            q ||
              (n.empty()
                ? d()
                : (J.stop(),
                  p.d(),
                  E.stop(),
                  (q = !0),
                  pa(0 < m.ae ? [A.k(), M(!1)] : [f(0)]).O(function() {
                    f(0, !0);
                    q = !1;
                    d();
                    D.defer(l);
                  })));
          },
          submit: function(a) {
            if (q) {
              var b = new V();
              t.push({ action: a, Ee: b });
              return b.L();
            }
            return a();
          }
        };
      })(),
      z,
      H = new qa(function() {
        z.J();
      }),
      E = (function() {
        function a() {
          f || (H.A() && (z = new V()), H.d(), c(), (f = !0), r.repeat(e));
          return z.L();
        }
        function c() {
          g = q.now();
        }
        function e() {
          var c = q.now() - g > m.ij,
            c =
              y.step(
                function(c) {
                  c.Ba = !0;
                  J.hf(c);
                  H.d();
                  A.d(c).O(H.k);
                  H.d();
                  b(c, function() {
                    this.Qa = !0;
                    a();
                  }).O(H.k);
                },
                !0,
                c
              ) || c;
          d(!0);
          c && ((f = !1), H.k());
          return c;
        }
        var f = !1,
          g;
        return {
          yi: function() {
            y.complete(J.qb);
          },
          hd: a,
          gg: c,
          Hb: function() {
            return !H.A();
          },
          stop: function() {
            r.cancel(e);
            f = !1;
            H.clear();
          }
        };
      })(),
      J = (function() {
        function a(b) {
          var c = !b.empty();
          b.Ba = !0;
          if (c) {
            for (var d = b.e, e = d.length - 1; 0 <= e; e--) {
              var f = d[e];
              f.f = f.tc;
            }
            b.Ka = !0;
          }
          return c;
        }
        var b = [];
        return {
          hf: function(c) {
            var d = h.options,
              e = d.Bh;
            0 < e
              ? Ba.Ia(c, Ba.xa(c, h.options.ke), function(a, c, f) {
                  c = 'groups' === h.options.je ? f : c;
                  H.d();
                  b.push(
                    p.D
                      .m(a)
                      .gb(c * d.Ah * e)
                      .ia({
                        duration: e,
                        G: { f: { start: a.sg, end: a.tc, Q: X.oa(d.Ch) } },
                        ca: function() {
                          this.f = Math.max(0, this.f);
                          this.parent.Ka = !0;
                          E.hd();
                        }
                      })
                      .jb(H.k)
                      .start()
                  );
                })
              : a(c) && E.hd();
          },
          qb: a,
          stop: function() {
            for (var a = b.length - 1; 0 <= a; a--) b[a].stop();
            b = [];
          }
        };
      })(),
      M = (function() {
        var a = !1;
        return function(b) {
          if (a) return new V().J().L();
          a = !0;
          var c = [];
          c.push(u.reset(m.yc, X.oa(m.zc)));
          var d = new V();
          K.hc(
            {
              e: [],
              Ha: !1,
              Ga: !1
            },
            b,
            !1,
            !0
          ).O(function() {
            I.Lb({ e: [], Ha: !1, Ga: !1 }, b, !1).O(d.J);
          });
          c.push(d.L());
          return pa(c).O(function() {
            a = !1;
            b && m.ag();
          });
        };
      })(),
      Q = !1;
  }
  function Ya() {
    return {
      version: '3.4.4',
      build: '36955f78f6b79223438db3b18b9b64b5aad799bb/36955f78',
      brandingAllowed: !0
    };
  }
  v.Fd(
    function() {
      window.CarrotSearchFoamTree = function(f) {
        function m(a, b) {
          if (!l || l.exists(a))
            switch (a) {
              case 'selection':
                return h.eb();
              case 'open':
                return h.Pa();
              case 'exposure':
                return h.Ia();
              case 'state':
                return h.xa.apply(this, b);
              case 'geometry':
                return h.Aa.apply(this, b);
              case 'hierarchy':
                return h.hb.apply(this, b);
              case 'containerCoordinates':
                return h.za.apply(this, b);
              case 'imageData':
                return h.S.apply(this, b);
              case 'viewport':
                return h.ya();
              case 'times':
                return h.Bc();
              case 'onModelChanged':
              case 'onRedraw':
              case 'onRolloutStart':
              case 'onRolloutComplete':
              case 'onRelaxationStep':
              case 'onGroupHover':
              case 'onGroupOpenOrCloseChanging':
              case 'onGroupExposureChanging':
              case 'onGroupSelectionChanging':
              case 'onGroupSelectionChanged':
              case 'onGroupClick':
              case 'onGroupDoubleClick':
              case 'onGroupHold':
                var d = c[a];
                return Array.isArray(d) ? d : [d];
              default:
                return c[a];
            }
        }
        function g(d) {
          function e(a, b) {
            return D.M(f, a) ? (b(f[a]), delete f[a], 1) : 0;
          }
          var f;
          if (0 === arguments.length) return 0;
          1 === arguments.length
            ? (f = D.extend({}, arguments[0]))
            : 2 === arguments.length && ((f = {}), (f[arguments[0]] = arguments[1]));
          l && l.validate(f, a.pi);
          var g = 0;
          h && ((g += e('selection', h.A)), (g += e('open', h.k)), (g += e('exposure', h.d)));
          var k = {};
          D.Fa(f, function(a, b) {
            if (c[b] !== a || D.lc(a)) (k[b] = a), g++;
            c[b] = a;
          });
          0 < g && b(k);
          return g;
        }
        function e(a, d) {
          var e = 'on' + a.charAt(0).toUpperCase() + a.slice(1),
            f = c[e];
          c[e] = d(Array.isArray(f) ? f : [f]);
          f = {};
          f[e] = c[e];
          b(f);
        }
        function b(b) {
          (function() {
            function d(a, e) {
              return D.M(b, a) || void 0 === e ? va.m(c[a], k) : e;
            }
            a.pi = c.logging;
            a.dc = c.dataObject;
            a.n = c.pixelRatio;
            a.yb = c.wireframePixelRatio;
            a.bb = c.stacking;
            a.fc = c.descriptionGroupType;
            a.Jc = c.descriptionGroupPosition;
            a.eh = c.descriptionGroupDistanceFromCenter;
            a.ec = c.descriptionGroupSize;
            a.Ge = c.descriptionGroupMinHeight;
            a.Fe = c.descriptionGroupMaxHeight;
            a.He = c.descriptionGroupPolygonDrawn;
            a.Xc = c.layout;
            a.nc = c.layoutByWeightOrder;
            a.vj = c.showZeroWeightGroups;
            a.Ze = c.groupMinDiameter;
            a.fe = c.rectangleAspectRatioPreference;
            a.hj = c.initializer || c.relaxationInitializer;
            a.ij = c.relaxationMaxDuration;
            a.ge = c.relaxationVisible;
            a.eg = c.relaxationQualityThreshold;
            a.Th = c.groupResizingBudget;
            a.Bh = c.groupGrowingDuration;
            a.Ah = c.groupGrowingDrag;
            a.Ch = c.groupGrowingEasing;
            a.lh = c.groupBorderRadius;
            a.mb = c.groupBorderWidth;
            a.Sa = c.groupBorderWidthScaling;
            a.Cd = c.groupInsetWidth;
            a.mh = c.groupBorderRadiusCorrection;
            a.nb = c.groupStrokeWidth;
            a.Sc = c.groupSelectionOutlineWidth;
            a.Xh = c.groupSelectionOutlineColor;
            a.Dd = c.groupSelectionOutlineShadowSize;
            a.$e = c.groupSelectionOutlineShadowColor;
            a.Uh = c.groupSelectionFillHueShift;
            a.Wh = c.groupSelectionFillSaturationShift;
            a.Vh = c.groupSelectionFillLightnessShift;
            a.bf = c.groupSelectionStrokeHueShift;
            a.df = c.groupSelectionStrokeSaturationShift;
            a.cf = c.groupSelectionStrokeLightnessShift;
            a.zh = c.groupFillType;
            a.vh = c.groupFillGradientRadius;
            a.sh = c.groupFillGradientCenterHueShift;
            a.uh = c.groupFillGradientCenterSaturationShift;
            a.th = c.groupFillGradientCenterLightnessShift;
            a.wh = c.groupFillGradientRimHueShift;
            a.yh = c.groupFillGradientRimSaturationShift;
            a.xh = c.groupFillGradientRimLightnessShift;
            a.Ed = c.groupStrokeType;
            a.nb = c.groupStrokeWidth;
            a.ef = c.groupStrokePlainHueShift;
            a.gf = c.groupStrokePlainSaturationShift;
            a.ff = c.groupStrokePlainLightnessShift;
            a.bi = c.groupStrokeGradientRadius;
            a.Yh = c.groupStrokeGradientAngle;
            a.ci = c.groupStrokeGradientUpperHueShift;
            a.ei = c.groupStrokeGradientUpperSaturationShift;
            a.di = c.groupStrokeGradientUpperLightnessShift;
            a.Zh = c.groupStrokeGradientLowerHueShift;
            a.ai = c.groupStrokeGradientLowerSaturationShift;
            a.$h = c.groupStrokeGradientLowerLightnessShift;
            a.Dh = c.groupHoverFillHueShift;
            a.Fh = c.groupHoverFillSaturationShift;
            a.Eh = c.groupHoverFillLightnessShift;
            a.We = c.groupHoverStrokeHueShift;
            a.Ye = c.groupHoverStrokeSaturationShift;
            a.Xe = c.groupHoverStrokeLightnessShift;
            a.Wa = c.groupExposureScale;
            a.rh = c.groupExposureShadowColor;
            a.Ve = c.groupExposureShadowSize;
            a.Rc = c.groupExposureZoomMargin;
            a.gi = c.groupUnexposureLightnessShift;
            a.hi = c.groupUnexposureSaturationShift;
            a.fi = c.groupUnexposureLabelColorThreshold;
            a.Va = c.exposeDuration;
            a.ic = c.exposeEasing;
            a.dd = c.openCloseDuration;
            a.nh = va.m(c.groupColorDecorator, k);
            a.oh = c.groupColorDecorator !== D.sa;
            a.Ih = va.m(c.groupLabelDecorator, k);
            a.Jh = c.groupLabelDecorator !== D.sa;
            a.Oh = va.m(c.groupLabelLayoutDecorator, k);
            a.Ph = c.groupLabelLayoutDecorator !== D.sa;
            a.ph = va.m(c.groupContentDecorator, k);
            a.Qc = c.groupContentDecorator !== D.sa;
            a.qh = c.groupContentDecoratorTriggering;
            a.dj = c.rainbowStartColor;
            a.Xi = c.rainbowEndColor;
            a.Vi = c.rainbowColorDistribution;
            a.Wi = c.rainbowColorDistributionAngle;
            a.$i = c.rainbowLightnessDistributionAngle;
            a.aj = c.rainbowLightnessShift;
            a.bj = c.rainbowLightnessShiftCenter;
            a.cj = c.rainbowSaturationCorrection;
            a.Zi = c.rainbowLightnessCorrection;
            a.bg = c.parentFillOpacity;
            a.xi = c.parentStrokeOpacity;
            a.cg = c.parentLabelOpacity;
            a.dg = c.parentOpacityBalancing;
            a.Sh = c.groupLabelUpdateThreshold;
            a.Kh = c.groupLabelFontFamily;
            a.Lh = c.groupLabelFontStyle;
            a.Mh = c.groupLabelFontVariant;
            a.Nh = c.groupLabelFontWeight;
            a.Rh = c.groupLabelMinFontSize;
            a.Mj = c.groupLabelMaxFontSize;
            a.Lj = c.groupLabelLineHeight;
            a.Kj = c.groupLabelHorizontalPadding;
            a.Oj = c.groupLabelVerticalPadding;
            a.Nj = c.groupLabelMaxTotalHeight;
            a.Hh = c.groupLabelDarkColor;
            a.Qh = c.groupLabelLightColor;
            a.Gh = c.groupLabelColorThreshold;
            a.Fj = c.wireframeDrawMaxDuration;
            a.Gj = c.wireframeLabelDrawing;
            a.Ej = c.wireframeContentDecorationDrawing;
            a.Ag = c.wireframeToFinalFadeDuration;
            a.Hj = c.wireframeToFinalFadeDelay;
            a.ih = c.finalCompleteDrawMaxDuration;
            a.jh = c.finalIncrementalDrawMaxDuration;
            a.Qe = c.finalToWireframeFadeDuration;
            a.sd = c.androidStockBrowserWorkaround;
            a.jf = c.incrementalDraw;
            a.ri = c.maxGroups;
            a.Qd = c.maxGroupLevelsDrawn;
            a.qi = c.maxGroupLabelLevelsDrawn;
            a.ke = c.rolloutStartPoint;
            a.je = c.rolloutMethod;
            a.mj = c.rolloutEasing;
            a.ie = c.rolloutDuration;
            a.jg = c.rolloutScalingStrength;
            a.lg = c.rolloutTranslationXStrength;
            a.mg = c.rolloutTranslationYStrength;
            a.ig = c.rolloutRotationStrength;
            a.kg = c.rolloutTransformationCenter;
            a.qj = c.rolloutPolygonDrag;
            a.rj = c.rolloutPolygonDuration;
            a.nj = c.rolloutLabelDelay;
            a.oj = c.rolloutLabelDrag;
            a.pj = c.rolloutLabelDuration;
            a.lj = c.rolloutChildGroupsDrag;
            a.kj = c.rolloutChildGroupsDelay;
            a.Oi = c.pullbackStartPoint;
            a.Ii = c.pullbackMethod;
            a.Ei = c.pullbackEasing;
            a.Rj = c.pullbackType;
            a.ae = c.pullbackDuration;
            a.Ni = c.pullbackScalingStrength;
            a.Qi = c.pullbackTranslationXStrength;
            a.Ri = c.pullbackTranslationYStrength;
            a.Mi = c.pullbackRotationStrength;
            a.Pi = c.pullbackTransformationCenter;
            a.Ji = c.pullbackPolygonDelay;
            a.Ki = c.pullbackPolygonDrag;
            a.Li = c.pullbackPolygonDuration;
            a.Fi = c.pullbackLabelDelay;
            a.Gi = c.pullbackLabelDrag;
            a.Hi = c.pullbackLabelDuration;
            a.Bi = c.pullbackChildGroupsDelay;
            a.Ci = c.pullbackChildGroupsDrag;
            a.Di = c.pullbackChildGroupsDuration;
            a.Oe = c.fadeDuration;
            a.hh = c.fadeEasing;
            a.Ij = c.zoomMouseWheelFactor;
            a.yc = c.zoomMouseWheelDuration;
            a.zc = c.zoomMouseWheelEasing;
            a.si = c.maxLabelSizeForTitleBar;
            a.yj = c.titleBarFontFamily;
            a.vg = c.titleBarBackgroundColor;
            a.wg = c.titleBarTextColor;
            a.zj = c.titleBarMinFontSize;
            a.qe = c.titleBarMaxFontSize;
            a.Aj = c.titleBarTextPaddingLeftRight;
            a.Bj = c.titleBarTextPaddingTopBottom;
            a.xj = c.titleBarDecorator;
            a.ze = c.attributionText;
            a.Cb = c.attributionLogo;
            a.Ug = c.attributionLogoScale;
            a.td = c.attributionUrl;
            a.ye = c.attributionPosition;
            a.Tg = c.attributionDistanceFromCenter;
            a.Wg = c.attributionWeight;
            a.Vg = c.attributionTheme;
            a.lf = c.interactionHandler;
            a.Xf = d('onModelChanging', a.Xf);
            a.Wf = d('onModelChanged', a.Wf);
            a.Yf = d('onRedraw', a.Yf);
            a.$f = d('onRolloutStart', a.$f);
            a.Zf = d('onRolloutComplete', a.Zf);
            a.Vd = d('onRelaxationStep', a.Vd);
            a.ag = d('onViewReset', a.ag);
            a.Pf = d('onGroupOpenOrCloseChanging', a.Pf);
            a.Of = d('onGroupOpenOrCloseChanged', a.Of);
            a.Hf = d('onGroupExposureChanging', a.Hf);
            a.Gf = d('onGroupExposureChanged', a.Gf);
            a.Rf = d('onGroupSelectionChanging', a.Rf);
            a.Qf = d('onGroupSelectionChanged', a.Qf);
            a.Jf = d('onGroupHover', a.Jf);
            a.Lf = d('onGroupMouseMove', a.Lf);
            a.Bf = d('onGroupClick', a.Bf);
            a.Cf = d('onGroupDoubleClick', a.Cf);
            a.If = d('onGroupHold', a.If);
            a.Nf = d('onGroupMouseWheel', a.Nf);
            a.Mf = d('onGroupMouseUp', a.Mf);
            a.Kf = d('onGroupMouseDown', a.Kf);
            a.Ff = d('onGroupDragStart', a.Ff);
            a.Df = d('onGroupDrag', a.Df);
            a.Ef = d('onGroupDragEnd', a.Ef);
            a.Uf = d('onGroupTransformStart', a.Uf);
            a.Sf = d('onGroupTransform', a.Sf);
            a.Tf = d('onGroupTransformEnd', a.Tf);
            a.Vf = d('onKeyUp', a.Vf);
          })();
          a.ej = T.Aa(a.dj);
          a.Yi = T.Aa(a.Xi);
          a.af = T.Aa(a.$e);
          a.Cb
            ? D.M(b, 'attributionLogo') &&
              (a.Cb instanceof Image ? (a.La = a.Cb) : ((a.La = new Image()), (a.La.src = a.Cb)))
            : (a.La = null);
          h && (h.Yb(b), D.M(b, 'dataObject') && h.reload());
        }
        function d(a) {
          return function() {
            return a.apply(this, arguments).kh(k);
          };
        }
        var k = this,
          l = window.CarrotSearchFoamTree.asserts,
          c = D.extend({}, window.CarrotSearchFoamTree.defaults),
          a = {};
        g(f);
        (f = c.element || document.getElementById(c.id)) ||
          na.Pa('Element to embed FoamTree in not found.');
        c.element = f;
        var h = new bb(f, a, c);
        h.H();
        var n = {
          get: function(a) {
            return 0 === arguments.length
              ? D.extend({}, c)
              : m(arguments[0], Array.prototype.slice.call(arguments, 1));
          },
          set: g,
          on: function(a, b) {
            e(a, function(a) {
              a.push(b);
              return a;
            });
          },
          off: function(a, b) {
            e(a, function(a) {
              return a.filter(function(a) {
                return a !== b;
              });
            });
          },
          resize: h.Y,
          redraw: h.Zb,
          update: h.update,
          select: d(h.A),
          expose: d(h.d),
          open: d(h.k),
          reset: d(h.reset),
          zoom: d(h.Cc),
          trigger: function(a, b) {
            var c = h.Ua(a);
            c && c(b);
          },
          dispose: function() {
            function a() {
              throw 'FoamTree instance disposed';
            }
            h.lb();
            D.Fa(n, function(b, c) {
              'dispose' !== c && (k[c] = a);
            });
          }
        };
        D.Fa(n, function(a, b) {
          k[b] = a;
        });
        h.reload();
      };
      window['CarrotSearchFoamTree.asserts'] &&
        ((window.CarrotSearchFoamTree.asserts = window['CarrotSearchFoamTree.asserts']),
        delete window['CarrotSearchFoamTree.asserts']);
      window.CarrotSearchFoamTree.supported = !0;
      window.CarrotSearchFoamTree.version = Ya;
      window.CarrotSearchFoamTree.defaults = Object.freeze({
        id: void 0,
        element: void 0,
        logging: !1,
        dataObject: void 0,
        pixelRatio: 1,
        wireframePixelRatio: 1,
        layout: 'relaxed',
        layoutByWeightOrder: !0,
        showZeroWeightGroups: !0,
        groupMinDiameter: 10,
        rectangleAspectRatioPreference: -1,
        relaxationInitializer: 'fisheye',
        relaxationMaxDuration: 3e3,
        relaxationVisible: !1,
        relaxationQualityThreshold: 1,
        stacking: 'hierarchical',
        descriptionGroupType: 'stab',
        descriptionGroupPosition: 225,
        descriptionGroupDistanceFromCenter: 1,
        descriptionGroupSize: 0.125,
        descriptionGroupMinHeight: 35,
        descriptionGroupMaxHeight: 0.5,
        descriptionGroupPolygonDrawn: !1,
        maxGroups: 5e4,
        maxGroupLevelsDrawn: 4,
        maxGroupLabelLevelsDrawn: 3,
        groupGrowingDuration: 0,
        groupGrowingEasing: 'bounce',
        groupGrowingDrag: 0,
        groupResizingBudget: 2,
        groupBorderRadius: 0.15,
        groupBorderWidth: 4,
        groupBorderWidthScaling: 0.6,
        groupInsetWidth: 6,
        groupBorderRadiusCorrection: 1,
        groupSelectionOutlineWidth: 5,
        groupSelectionOutlineColor: '#222',
        groupSelectionOutlineShadowSize: 0,
        groupSelectionOutlineShadowColor: '#fff',
        groupSelectionFillHueShift: 0,
        groupSelectionFillSaturationShift: 0,
        groupSelectionFillLightnessShift: 0,
        groupSelectionStrokeHueShift: 0,
        groupSelectionStrokeSaturationShift: 0,
        groupSelectionStrokeLightnessShift: -10,
        groupFillType: 'gradient',
        groupFillGradientRadius: 1,
        groupFillGradientCenterHueShift: 0,
        groupFillGradientCenterSaturationShift: 0,
        groupFillGradientCenterLightnessShift: 20,
        groupFillGradientRimHueShift: 0,
        groupFillGradientRimSaturationShift: 0,
        groupFillGradientRimLightnessShift: -5,
        groupStrokeType: 'plain',
        groupStrokeWidth: 1.5,
        groupStrokePlainHueShift: 0,
        groupStrokePlainSaturationShift: 0,
        groupStrokePlainLightnessShift: -10,
        groupStrokeGradientRadius: 1,
        groupStrokeGradientAngle: 45,
        groupStrokeGradientUpperHueShift: 0,
        groupStrokeGradientUpperSaturationShift: 0,
        groupStrokeGradientUpperLightnessShift: 20,
        groupStrokeGradientLowerHueShift: 0,
        groupStrokeGradientLowerSaturationShift: 0,
        groupStrokeGradientLowerLightnessShift: -20,
        groupHoverFillHueShift: 0,
        groupHoverFillSaturationShift: 0,
        groupHoverFillLightnessShift: 20,
        groupHoverStrokeHueShift: 0,
        groupHoverStrokeSaturationShift: 0,
        groupHoverStrokeLightnessShift: -10,
        groupExposureScale: 1.15,
        groupExposureShadowColor: 'rgba(0, 0, 0, 0.5)',
        groupExposureShadowSize: 50,
        groupExposureZoomMargin: 0.1,
        groupUnexposureLightnessShift: 65,
        groupUnexposureSaturationShift: -65,
        groupUnexposureLabelColorThreshold: 0.35,
        exposeDuration: 700,
        exposeEasing: 'squareInOut',
        groupColorDecorator: D.sa,
        groupLabelDecorator: D.sa,
        groupLabelLayoutDecorator: D.sa,
        groupContentDecorator: D.sa,
        groupContentDecoratorTriggering: 'onLayoutDirty',
        openCloseDuration: 500,
        rainbowColorDistribution: 'radial',
        rainbowColorDistributionAngle: -45,
        rainbowLightnessDistributionAngle: 45,
        rainbowSaturationCorrection: 0.1,
        rainbowLightnessCorrection: 0.4,
        rainbowStartColor: 'hsla(0, 100%, 55%, 1)',
        rainbowEndColor: 'hsla(359, 100%, 55%, 1)',
        rainbowLightnessShift: 30,
        rainbowLightnessShiftCenter: 0.4,
        parentFillOpacity: 0.7,
        parentStrokeOpacity: 1,
        parentLabelOpacity: 1,
        parentOpacityBalancing: !0,
        wireframeDrawMaxDuration: 15,
        wireframeLabelDrawing: 'auto',
        wireframeContentDecorationDrawing: 'auto',
        wireframeToFinalFadeDuration: 500,
        wireframeToFinalFadeDelay: 300,
        finalCompleteDrawMaxDuration: 80,
        finalIncrementalDrawMaxDuration: 100,
        finalToWireframeFadeDuration: 200,
        androidStockBrowserWorkaround: v.mf(),
        incrementalDraw: 'fast',
        groupLabelFontFamily: 'sans-serif',
        groupLabelFontStyle: 'normal',
        groupLabelFontWeight: 'normal',
        groupLabelFontVariant: 'normal',
        groupLabelLineHeight: 1.05,
        groupLabelHorizontalPadding: 1,
        groupLabelVerticalPadding: 1,
        groupLabelMinFontSize: 6,
        groupLabelMaxFontSize: 160,
        groupLabelMaxTotalHeight: 0.9,
        groupLabelUpdateThreshold: 0.05,
        groupLabelDarkColor: '#000',
        groupLabelLightColor: '#fff',
        groupLabelColorThreshold: 0.35,
        rolloutStartPoint: 'center',
        rolloutEasing: 'squareOut',
        rolloutMethod: 'groups',
        rolloutDuration: 2e3,
        rolloutScalingStrength: -0.7,
        rolloutTranslationXStrength: 0,
        rolloutTranslationYStrength: 0,
        rolloutRotationStrength: -0.7,
        rolloutTransformationCenter: 0.7,
        rolloutPolygonDrag: 0.1,
        rolloutPolygonDuration: 0.5,
        rolloutLabelDelay: 0.8,
        rolloutLabelDrag: 0.1,
        rolloutLabelDuration: 0.5,
        rolloutChildGroupsDrag: 0.1,
        rolloutChildGroupsDelay: 0.2,
        pullbackStartPoint: 'center',
        pullbackEasing: 'squareIn',
        pullbackMethod: 'groups',
        pullbackDuration: 1500,
        pullbackScalingStrength: -0.7,
        pullbackTranslationXStrength: 0,
        pullbackTranslationYStrength: 0,
        pullbackRotationStrength: -0.7,
        pullbackTransformationCenter: 0.7,
        pullbackPolygonDelay: 0.3,
        pullbackPolygonDrag: 0.1,
        pullbackPolygonDuration: 0.8,
        pullbackLabelDelay: 0,
        pullbackLabelDrag: 0.1,
        pullbackLabelDuration: 0.3,
        pullbackChildGroupsDelay: 0.1,
        pullbackChildGroupsDrag: 0.1,
        pullbackChildGroupsDuration: 0.3,
        fadeDuration: 700,
        fadeEasing: 'cubicInOut',
        zoomMouseWheelFactor: 1.5,
        zoomMouseWheelDuration: 500,
        zoomMouseWheelEasing: 'squareOut',
        maxLabelSizeForTitleBar: 8,
        titleBarFontFamily: null,
        titleBarFontStyle: 'normal',
        titleBarFontWeight: 'normal',
        titleBarFontVariant: 'normal',
        titleBarBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        titleBarTextColor: 'rgba(255, 255, 255, 1)',
        titleBarMinFontSize: 10,
        titleBarMaxFontSize: 40,
        titleBarTextPaddingLeftRight: 20,
        titleBarTextPaddingTopBottom: 15,
        titleBarDecorator: D.sa,
        attributionText: null,
        attributionLogo: null,
        attributionLogoScale: 0.5,
        attributionUrl: null,
        attributionPosition: 'bottom-right',
        attributionDistanceFromCenter: 1,
        attributionWeight: 0.025,
        attributionTheme: 'light',
        interactionHandler: v.ki() ? 'hammerjs' : 'builtin',
        onModelChanging: [],
        onModelChanged: [],
        onRedraw: [],
        onRolloutStart: [],
        onRolloutComplete: [],
        onRelaxationStep: [],
        onViewReset: [],
        onGroupOpenOrCloseChanging: [],
        onGroupOpenOrCloseChanged: [],
        onGroupExposureChanging: [],
        onGroupExposureChanged: [],
        onGroupSelectionChanging: [],
        onGroupSelectionChanged: [],
        onGroupHover: [],
        onGroupMouseMove: [],
        onGroupClick: [],
        onGroupDoubleClick: [],
        onGroupHold: [],
        onGroupMouseWheel: [],
        onGroupMouseUp: [],
        onGroupMouseDown: [],
        onGroupDragStart: [],
        onGroupDrag: [],
        onGroupDragEnd: [],
        onGroupTransformStart: [],
        onGroupTransform: [],
        onGroupTransformEnd: [],
        onKeyUp: [],
        selection: null,
        open: null,
        exposure: null,
        imageData: null,
        hierarchy: null,
        geometry: null,
        containerCoordinates: null,
        state: null,
        viewport: null,
        times: null
      });
      window.CarrotSearchFoamTree.geometry = Object.freeze(
        (function() {
          return {
            rectangleInPolygon: function(f, m, g, e, b, d, k) {
              b = D.B(b, 1);
              d = D.B(d, 0.5);
              k = D.B(k, 0.5);
              f = L.ve(f, { x: m, y: g }, e, d, k) * b;
              return { x: m - f * e * d, y: g - f * k, w: f * e, h: f };
            },
            circleInPolygon: function(f, m, g) {
              return L.Gg(f, { x: m, y: g });
            },
            stabPolygon: function(f, m, g, e) {
              return L.Yb(f, { x: m, y: g }, e);
            },
            polygonCentroid: function(f) {
              f = L.k(f, {});
              return { x: f.x, y: f.y, area: f.ja };
            },
            boundingBox: function(f) {
              for (var m = f[0].x, g = f[0].y, e = f[0].x, b = f[0].y, d = 1; d < f.length; d++) {
                var k = f[d];
                k.x < m && (m = k.x);
                k.y < g && (g = k.y);
                k.x > e && (e = k.x);
                k.y > b && (b = k.y);
              }
              return { x: m, y: g, w: e - m, h: b - g };
            }
          };
        })()
      );
    },
    function() {
      window.CarrotSearchFoamTree = function() {
        window.console.error('FoamTree is not supported on this browser.');
      };
      window.CarrotSearchFoamTree.Tj = !1;
    }
  );
})();
