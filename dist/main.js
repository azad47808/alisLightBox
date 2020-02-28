! function (e) {
    var t = {};

    function n(l) {
        if (t[l]) return t[l].exports;
        var a = t[l] = {
            i: l,
            l: !1,
            exports: {}
        };
        return e[l].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }
    n.m = e, n.c = t, n.d = function (e, t, l) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: l
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var l = Object.create(null);
        if (n.r(l), Object.defineProperty(l, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var a in e) n.d(l, a, function (t) {
                return e[t]
            }.bind(null, a));
        return l
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 1)
}([function (e, t) {
    var n = document.createElement("DIV");
    n.innerHTML = '\n    <div id="alisMainContainer" class="alis-main-container">\n    <div class="alis-row alisCloseIcon">\n        X\n    </div>\n    <div class="alis-img-container text-center">\n        <img id="alisMainImg" src="src/assets/sampleImage.jpg" alt="sampleimage" draggable=false>\n    </div>\n    <div class="alis-buttons-container">\n    <div class="alis-row" style="justify-content: center">\n    <h5 id="alisImageTitle" class="text-center" style="margin: 10px;">Name of the image.jpg</h5>\n    </div>\n    <div class="buttons-div alis-row text-center">\n        <span class="alis-nav-btn" id="alisRotateLeftBtn"></span>\n        <span class="alis-nav-btn" id="alisRotateRightBtn"></span>\n        <span class="alis-nav-btn" id="alisPrevBtn"></span>\n        <span class="alis-nav-btn" id="alisNextBtn"></span>\n        <span class="alis-nav-btn" id="alisZoomInBtn"></span>\n        <span class="alis-nav-btn" id="alisZoomOutBtn"></span>\n    </div>\n    </div>\n    </div>', document.body.appendChild(n)
}, function (e, t, n) {
    "use strict";
    n.r(t);
    n(0);
    var l = document.getElementById("alisMainContainer"),
        a = document.getElementById("alisMainImg"),
        i = document.getElementById("alisRotateLeftBtn"),
        r = document.getElementById("alisRotateRightBtn"),
        s = document.getElementById("alisPrevBtn"),
        o = document.getElementById("alisNextBtn"),
        c = document.getElementById("alisZoomInBtn"),
        d = document.getElementById("alisZoomOutBtn");
    let u = [];
    document.querySelectorAll("a[alis-lb]").forEach(e => {
        u.push(e.getAttribute("alis-lb"))
    }), new Set(u).forEach(e => {
        document.querySelectorAll(`a[alis-lb=${e}]`).forEach((e, t) => {
            e.setAttribute("alisID", t)
        })
    });
    var m, f, p = document.querySelectorAll("a[alis-lb]"),
        v = document.getElementById("alisImageTitle"),
        b = 1,
        y = 0;

    function g() {
        a.style.left = window.innerWidth / 2 - a.clientWidth / 2 + "px", a.style.top = window.innerHeight / 2 - a.clientHeight / 2 - 30 + "px"
    }

    function A() {
        b = 1, y = 0, a.style.transform = "", document.querySelectorAll(`a[alis-lb=${m}]`).length - 1 <= f ? f = 0 : f++;
        let e = document.querySelectorAll(`a[alis-lb=${m}]`)[f].getAttribute("href"),
            t = document.querySelectorAll(`a[alis-lb=${m}]`)[f].getAttribute("alis-lb-title");
        a.setAttribute("src", e), v.innerText = t, g()
    }

    function E() {
        b = 1, y = 0, a.style.transform = "";
        let e = document.querySelectorAll(`a[alis-lb=${m}]`).length - 1;
        f <= 0 ? f = e : f--;
        let t = document.querySelectorAll(`a[alis-lb=${m}]`)[f].getAttribute("alis-lb-title"),
            n = document.querySelectorAll(`a[alis-lb=${m}]`)[f].getAttribute("href");
        a.setAttribute("src", n), v.innerText = t, g()
    }

    function I() {
        a.style.transform = `rotate(${y}deg) scale(${b})`
    }

    function h(e) {
        event.preventDefault ? event.preventDefault() : event.returnValue = !1, b += .2, I()
    }

    function B() {
        event.preventDefault ? event.preventDefault() : event.returnValue = !1, b <= .3 || (b -= .2, I())
    }
    a.addEventListener("mousedown", e => {
        var t = event.pageX - e.target.offsetLeft,
            n = event.pageY - e.target.offsetTop;
        document.body.onmousemove = e => {
            let l = parseInt(e.pageX),
                i = parseInt(e.pageY);
            a.clientWidth, a.clientHeight;
            a.style.left = `${l-t}px`, a.style.top = `${i-n}px`, console.log(t)
        }
    }), a.addEventListener("mouseup", e => {
        document.body.onmousemove = e => {}
    }), p.forEach(e => [e.addEventListener("click", e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            function (e) {
                b = 1, y = 0;
                let t = e.getAttribute("href");
                m = e.getAttribute("alis-lb"), f = parseInt(e.getAttribute("alisID")), a.setAttribute("src", t), a.setAttribute("alisID", e.getAttribute("alisid"));
                let n = document.querySelectorAll(`a[alis-lb=${m}]`)[f].getAttribute("alis-lb-title");
                l.style.display = "block", v.innerText = n, g()
            }(e.currentTarget)
    })]), l.addEventListener("click", e => {
        "DIV" == e.target.tagName && (a.style.transform = "", l.style.display = "none")
    }), o.addEventListener("click", () => {
        A()
    }), s.addEventListener("click", () => {
        E()
    }), c.addEventListener("click", () => {
        h()
    }), d.addEventListener("click", () => {
        B()
    }), i.addEventListener("click", () => {
        y -= 90, I()
    }), r.addEventListener("click", () => {
        y += 90, I()
    }), document.body.addEventListener("keydown", e => {
        37 == e.keyCode ? E() : 39 == e.keyCode ? A() : 38 == e.keyCode ? "block" != l.style.display || h() : 40 == e.keyCode && "block" == l.style.display && B()
    })
}]);