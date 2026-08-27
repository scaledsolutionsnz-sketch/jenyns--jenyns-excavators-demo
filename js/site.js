/* Jenyns & Jenyns Excavators - site behaviour */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Opening animation */
  function closeIntro() {
    var intro = document.getElementById('intro');
    if (intro) intro.classList.add('done');
  }
  if (document.readyState === 'complete') {
    setTimeout(closeIntro, reduced ? 0 : 550);
  } else {
    window.addEventListener('load', function () { setTimeout(closeIntro, reduced ? 0 : 550); });
    setTimeout(closeIntro, 2600);
  }

  /* Mobile menu */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Rolling hero */
  var slides = document.querySelectorAll('.hero-slides img');
  if (slides.length > 1 && !reduced) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('on');
    }, 5500);
  }

  /* Rotating hero review quotes */
  var quotes = document.querySelectorAll('.hq-slide');
  if (quotes.length > 1 && !reduced) {
    var q = 0;
    setInterval(function () {
      quotes[q].classList.remove('on');
      q = (q + 1) % quotes.length;
      quotes[q].classList.add('on');
    }, 6000);
  }

  /* Gmail compose links, assembled in JS so the address is never in the HTML */
  Array.prototype.forEach.call(document.querySelectorAll('a[data-gmail]'), function (a) {
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
      '&su=' + (a.getAttribute('data-su') || '') +
      '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Scroll reveal */
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (t) { t.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
})();
