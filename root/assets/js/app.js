themeChange();
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};


window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);

};

function themeBtn() {
  (function (theme = localStorage.getItem("theme")) {
    if (theme != undefined && theme != "") {
      if (localStorage.getItem("theme") && localStorage.getItem("theme") != "") {
        document.documentElement.setAttribute("data-theme", theme);
        var btnEl = document.querySelector("[data-set-theme='" + theme.toString() + "']");
        if (btnEl) {
          [...document.querySelectorAll("[data-set-theme]")].forEach((el) => {
            el.classList.remove(el.getAttribute("data-act-class"));
          });
          if (btnEl.getAttribute("data-act-class")) {
            btnEl.classList.add(btnEl.getAttribute("data-act-class"));
          }
        }
      } else {
        var btnEl = document.querySelector("[data-set-theme='']");
        if (btnEl.getAttribute("data-act-class")) {
          btnEl.classList.add(btnEl.getAttribute("data-act-class"));
        }
      }
    }


  })();
  [...document.querySelectorAll("[data-set-theme]")].forEach((el) => {
    el.addEventListener("click", function () {
      document.documentElement.setAttribute("data-theme", this.getAttribute("data-set-theme"));
      localStorage.setItem("theme", document.documentElement.getAttribute("data-theme"));
      [...document.querySelectorAll("[data-set-theme]")].forEach((el) => {
        el.classList.remove(el.getAttribute("data-act-class"));
      });
      if (el.getAttribute("data-act-class")) {
        el.classList.add(el.getAttribute("data-act-class"));
      }
    });
  });
}
function themeChange(attach = true) {
  if (attach === true) {
    document.addEventListener("DOMContentLoaded", function (event) {
      themeBtn();
    });
    window.addEventListener("load",function(){
      if (document.getElementsByTagName("html")[0].dataset.theme == "dark") {
        document.getElementById("zz").checked = false;
      } else {
        document.getElementById("zz").checked = true;
      }
      document.getElementById("swapper").classList.remove("hidden");
    });
  } else {
    themeBtn();
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

