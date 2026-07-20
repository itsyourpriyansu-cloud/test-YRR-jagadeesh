/* ==========================================================================
   FLOATING CONTACT WIDGET
   Self-contained module: builds contact links from CONFIG, wires up the
   open/close toggle, keyboard + outside-click dismissal, and a one-time
   entrance pulse. No globals leaked beyond the IIFE.
   ========================================================================== */
(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // CONFIGURATION — edit these four values to update every link.
  // ─────────────────────────────────────────────────────────────
  var contactLinks = {
    phone: '+919290673542',
    whatsapp: '919290673542',
    facebook: 'https://www.facebook.com/yoshithajagadishdonkana/',
    twitter: 'https://x.com/jagadishdonkana',
    instagram: 'https://www.instagram.com/yoshithajagadishdonkana/',
    linkedin: 'https://www.linkedin.com/company/yoshithajagadishdonkana/',
    youtube: 'https://www.youtube.com/@yoshithajagadishdonkana/'
  };
  // ─────────────────────────────────────────────────────────────

  function init() {
    var widget = document.getElementById('floating-contact-widget');
    if (!widget || widget.dataset.fcwInitialized === 'true') {
      return; // already initialized, or markup not present on this page
    }
    widget.dataset.fcwInitialized = 'true';

    var toggle = document.getElementById('floating-contact-widget-toggle');
    var hideBtn = document.getElementById('floating-contact-widget-hide');
    var stack = document.getElementById('floating-contact-widget-stack');
    var links = Array.prototype.slice.call(stack.querySelectorAll('.floating-contact-widget__link'));

    var phoneLink = document.getElementById('fcw-link-phone');
    var whatsappLink = document.getElementById('fcw-link-whatsapp');
    var facebookLink = document.getElementById('fcw-link-facebook');
    var twitterLink = document.getElementById('fcw-link-twitter');
    var instagramLink = document.getElementById('fcw-link-instagram');
    var linkedinLink = document.getElementById('fcw-link-linkedin');
    var youtubeLink = document.getElementById('fcw-link-youtube');

    if (phoneLink) phoneLink.href = 'tel:' + contactLinks.phone;
    if (whatsappLink) whatsappLink.href = 'https://wa.me/' + contactLinks.whatsapp;
    if (facebookLink) facebookLink.href = contactLinks.facebook;
    if (twitterLink) twitterLink.href = contactLinks.twitter;
    if (instagramLink) instagramLink.href = contactLinks.instagram;
    if (linkedinLink) linkedinLink.href = contactLinks.linkedin;
    if (youtubeLink) youtubeLink.href = contactLinks.youtube;

    var isOpen = false;
    var focusableEls = [hideBtn].concat(links);

    function prefersReducedMotion() {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function setExpandedState(open) {
      isOpen = open;
      widget.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close contact options' : 'Open contact options');

      focusableEls.forEach(function (el) {
        if (!el) return;
        if (open) {
          el.removeAttribute('tabindex');
        } else {
          el.setAttribute('tabindex', '-1');
        }
      });
    }

    function open(focusFirst) {
      if (isOpen) return;
      setExpandedState(true);
      if (focusFirst && links[0]) {
        links[0].focus();
      }
    }

    function close(returnFocus) {
      if (!isOpen) return;
      setExpandedState(false);
      if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function (event) {
      var openedByKeyboard = event.detail === 0; // 0 = triggered via keyboard/AT, not mouse
      if (isOpen) {
        close(false);
      } else {
        open(openedByKeyboard);
      }
    });

    hideBtn.addEventListener('click', function () {
      close(true);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) {
        close(true);
      }
    });

    document.addEventListener('click', function (event) {
      if (!isOpen) return;
      if (!widget.contains(event.target)) {
        close(false);
      }
    });

    // ─── One-time gentle pulse, ~1.5s after load ───
    if (!prefersReducedMotion()) {
      window.setTimeout(function () {
        if (isOpen) return;
        toggle.classList.add('floating-contact-widget__toggle--pulse');
        toggle.addEventListener('animationend', function onPulseEnd() {
          toggle.classList.remove('floating-contact-widget__toggle--pulse');
          toggle.removeEventListener('animationend', onPulseEnd);
        });
      }, 1500);
    }

    trackThirdPartyChatBubble(widget);
  }

  // The site also loads a third-party chat bubble (CollectChat, injected
  // asynchronously by collectcdn.com/launcher.js as #chat-bot-frame-wrap).
  // Its size and position aren't ours to control, and it can mount late,
  // move, or resize without any event we can hook into — so instead of
  // hardcoding a pixel offset, poll its rect and stack this widget 12px
  // above it via a CSS custom property. Polling (not ResizeObserver) is
  // used deliberately: ResizeObserver only reacts to size changes, but the
  // bubble can also just reposition without resizing.
  function trackThirdPartyChatBubble(widget) {
    var GAP = 12;
    var MAX_BUBBLE_SIZE = 140; // above this, treat it as an opened chat panel, not the idle bubble
    var POLL_MS = 1000;

    function findBubble() {
      return document.getElementById('chat-bot-frame-wrap') || document.getElementById('chat-bot-iframe');
    }

    function update() {
      var bubble = findBubble();
      if (!bubble) {
        widget.style.removeProperty('--fcw-bottom');
        widget.style.removeProperty('--fcw-right');
        return;
      }
      var rect = bubble.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.width > MAX_BUBBLE_SIZE || rect.height > MAX_BUBBLE_SIZE) {
        widget.style.removeProperty('--fcw-bottom');
        widget.style.removeProperty('--fcw-right');
        return;
      }

      var isDesktop = window.innerWidth > 768;
      
      // Calculate vertical offset (bottom)
      // The CollectChat iframe usually has transparent padding at the top. On desktop,
      // we adjust the visual offset to pull the toggle closer to the chatbot circle
      // for a perfectly balanced visual gap (~12px to 16px between the circles).
      var verticalGap = GAP;
      if (isDesktop) {
        verticalGap = -8; 
      }
      
      var offset = Math.round((window.innerHeight - rect.top) + verticalGap);
      widget.style.setProperty('--fcw-bottom', offset + 'px');

      // Calculate horizontal alignment (right) to center the widget over the chatbot on desktop
      if (isDesktop) {
        var widgetToggleWidth = 60; // floating-contact-widget__toggle width is 60px
        var rightOffset = Math.round((window.innerWidth - rect.right) + (rect.width - widgetToggleWidth) / 2);
        widget.style.setProperty('--fcw-right', rightOffset + 'px');
      } else {
        widget.style.removeProperty('--fcw-right');
      }
    }

    update();
    window.addEventListener('resize', update);
    window.setInterval(update, POLL_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
