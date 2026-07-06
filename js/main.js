/* ==========================================================================
   YOSHITHA'S REAL RISE - INTERACTIVE & ANIMATION CONTROLLER (GSAP)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  // Link Lenis to GSAP ScrollTrigger updates
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;



  // 3. Magnetic Hover Buttons (Magnet Effect)
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-arrow-btn');
  if (window.innerWidth > 1024) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const bound = btn.getBoundingClientRect();
        const x = e.clientX - bound.left - (bound.width / 2);
        const y = e.clientY - bound.top - (bound.height / 2);
        
        // Move button toward cursor slightly
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        // Snap back to origin
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  // 4. Mobile Menu Navigation panel toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (mobileToggle && mobileMenu) {
    const toggleMenu = () => {
      const isActive = mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open', isActive);
      
      // Animate line state
      const spans = mobileToggle.querySelectorAll('span');
      if (isActive) {
        gsap.to(spans[0], { y: 7, rotate: 45, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, duration: 0.2 });
        gsap.to(spans[2], { y: -7, rotate: -45, duration: 0.3 });
        
        // Stagger list elements in Mobile Menu
        gsap.fromTo(mobileLinks, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, delay: 0.3, duration: 0.5, ease: 'power3.out' }
        );
      } else {
        gsap.to(spans[0], { y: 0, rotate: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.2 });
        gsap.to(spans[2], { y: 0, rotate: 0, duration: 0.3 });
      }
    };

    mobileToggle.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // 5. Header Scroll Effect
  const header = document.querySelector('header');
  ScrollTrigger.create({
    start: 'top -50',
    onUpdate: (self) => {
      if (self.direction === 1) {
        header.classList.add('scrolled');
      } else if (self.scroll() < 50) {
        header.classList.remove('scrolled');
      }
    }
  });

  // 6. Hero Entrance Animations
  const heroTL = gsap.timeline();
  heroTL.fromTo('header', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
        .fromTo('.hero-tag', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5')
        .fromTo('.hero-title span', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power4.out' }, '-=0.4')
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-actions', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-visual', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
        .fromTo('.stat-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, '-=0.8');

  // Parallax zoom effect on Hero Image
  gsap.to('.hero-main-img', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // 6b. Hero title — cycling word animation ("Ventures" → "Investments" → "Communities")
  (function initChangingWord() {
    const wordEl = document.getElementById('changing-word');
    if (!wordEl) return;

    const words = ['Ventures', 'Investments', 'Communities'];
    let idx = 0;

    // Set initial state (visible, no filter)
    gsap.set(wordEl, { yPercent: 0, opacity: 1, filter: 'blur(0px)' });

    function cycleWord() {
      // Exit: slide up + blur out
      gsap.to(wordEl, {
        duration: 0.45,
        yPercent: -100,
        opacity: 0,
        filter: 'blur(8px)',
        ease: 'power3.in',
        onComplete: () => {
          idx = (idx + 1) % words.length;
          wordEl.textContent = words[idx];

          // Enter: slide up from below + blur in
          gsap.fromTo(wordEl,
            { yPercent: 100, opacity: 0, filter: 'blur(8px)' },
            { duration: 0.6, yPercent: 0, opacity: 1, filter: 'blur(0px)', ease: 'power4.out' }
          );
        }
      });
    }

    // Start after hero entrance animation has settled
    setTimeout(() => {
      setInterval(cycleWord, 2000);
    }, 2000);
  })();

  // 6c. Services title — cycling word animation ("Infrastructure" → "Portfolios" → "Assets")
  (function initServicesChangingWord() {
    const wordEl = document.getElementById('changing-word-services');
    if (!wordEl) return;

    const words = ['Infrastructure', 'Portfolios', 'Assets'];
    let idx = 0;

    // Set initial state
    gsap.set(wordEl, { yPercent: 0, opacity: 1, filter: 'blur(0px)' });

    function cycleWord() {
      gsap.to(wordEl, {
        duration: 0.45,
        yPercent: -100,
        opacity: 0,
        filter: 'blur(8px)',
        ease: 'power3.in',
        onComplete: () => {
          idx = (idx + 1) % words.length;
          wordEl.textContent = words[idx];

          gsap.fromTo(wordEl,
            { yPercent: 100, opacity: 0, filter: 'blur(8px)' },
            { duration: 0.6, yPercent: 0, opacity: 1, filter: 'blur(0px)', ease: 'power4.out' }
          );
        }
      });
    }

    setTimeout(() => {
      setInterval(cycleWord, 2000);
    }, 2000);
  })();

  // Stat Numbers Count-up
  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number-val');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 2.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          stat.textContent = Math.floor(counter.val);
        }
      });
    });
  };
  animateStats();

  // 6b. Horizontal Scroll Text Reveal — pinned section below hero stats
  (function initHScroll() {
    const hSection = document.getElementById('hscrollSection');
    const hTrack   = document.getElementById('hscrollTrack');
    const hPhrase  = document.getElementById('hscrollPhrase');
    if (!hSection || !hTrack || !hPhrase) return;

    // Phrase config: word → accent class ('' = default navy)
    const segments = [
      { text: 'Secure',  accent: 'hs-accent'  },
      { text: 'Land',    accent: ''            },
      { text: '·',       dot: true             },
      { text: 'Grow',    accent: 'hs-accent2'  },
      { text: 'Wealth',  accent: ''            },
      { text: '·',       dot: true             },
      { text: 'Build',   accent: ''            },
      { text: 'Legacy',  accent: 'hs-accent'   },
    ];

    segments.forEach((seg, si) => {
      if (seg.dot) {
        const dot = document.createElement('span');
        dot.className = 'hscroll-dot';
        dot.textContent = '·';
        hPhrase.appendChild(dot);
        return;
      }
      // letter by letter
      [...seg.text].forEach(ch => {
        const span = document.createElement('span');
        span.className = 'hscroll-letter' + (seg.accent ? ' ' + seg.accent : '');
        span.setAttribute('aria-hidden', 'true');
        span.textContent = ch;
        hPhrase.appendChild(span);
      });
      // space between words (not after last)
      if (si < segments.length - 1 && !segments[si + 1].dot) {
        const sp = document.createElement('span');
        sp.className = 'hscroll-space';
        hPhrase.appendChild(sp);
      }
    });

    // Entrance + horizontal drive tween
    const enterDist  = window.innerHeight * 0.8;
    const pinnedDist = 3000;

    const scrollTween = gsap.timeline({
      scrollTrigger: {
        trigger: hSection,
        start: 'top bottom',
        end: () => `+=${enterDist + pinnedDist}`,
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    scrollTween
      .fromTo(hTrack,
        { x: window.innerWidth },
        { x: window.innerWidth * 0.45, ease: 'none', duration: enterDist }
      )
      .to(hTrack,
        { x: () => -(hTrack.scrollWidth - window.innerWidth * 0.45), ease: 'none', duration: pinnedDist }
      );

    // Pin the section once it reaches the top
    ScrollTrigger.create({
      trigger: hSection,
      start: 'top top',
      end: () => `+=${pinnedDist}`,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
    });

    // Per-letter sleek reveal driven by containerAnimation
    hTrack.querySelectorAll('.hscroll-letter').forEach((letter, i) => {
      gsap.from(letter, {
        yPercent: 60,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: letter,
          containerAnimation: scrollTween,
          start: 'left 88%',
          end: 'left 52%',
          scrub: 1,
        }
      });
    });

    // Sticker clean reveal
    hTrack.querySelectorAll('[data-hsticker]').forEach(sticker => {
      gsap.from(sticker, {
        scale: 0.4,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sticker,
          containerAnimation: scrollTween,
          start: 'left 85%',
          end: 'left 40%',
          scrub: 1,
        }
      });
    });
  })();

  // 7. About Section Reveal Scroll Animations
  gsap.from('.about-photo-card', {
    x: -50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 75%'
    }
  });

  gsap.from('.about-content > *', {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%'
    }
  });

  // 7b. About Photo Card — hover zoom + lift (desktop only)
  const aboutPhotoCard = document.querySelector('.about-photo-card');
  if (aboutPhotoCard && window.innerWidth > 1024) {
    const aboutPhotoImg = aboutPhotoCard.querySelector('img');

    aboutPhotoCard.addEventListener('mouseenter', () => {
      gsap.to(aboutPhotoImg, { scale: 1.1, duration: 0.9, ease: 'power3.out' });
      gsap.to(aboutPhotoCard, { y: -8, borderColor: 'rgba(255, 255, 255, 0.35)', duration: 0.6, ease: 'power3.out' });
    });

    aboutPhotoCard.addEventListener('mouseleave', () => {
      gsap.to(aboutPhotoImg, { scale: 1, duration: 0.7, ease: 'power3.out' });
      gsap.to(aboutPhotoCard, { y: 0, borderColor: 'rgba(255, 255, 255, 0.15)', duration: 0.6, ease: 'power3.out' });
    });
  }

  // 8. Bento Grid Card Tilting mouse hover (3D Perspective)
  const bentoCards = document.querySelectorAll('.bento-card');
  if (window.innerWidth > 1024) {
    bentoCards.forEach(card => {
      const inner = card.querySelector('.bento-card-inner') || card;
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate offsets relative to card center (-0.5 to 0.5 range)
        const dx = (x / rect.width) - 0.5;
        const dy = (y / rect.height) - 0.5;
        
        // Perform 3D rotation based on mouse offset
        gsap.to(inner, {
          rotateY: dx * 10,   // horizontal tilt
          rotateX: -dy * 10,  // vertical tilt
          transformPerspective: 1000,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        // Reset coordinates
        gsap.to(inner, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    });
  }

  // Bento Scroll Entrance animation
  gsap.from('.bento-card', {
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.bento',
      start: 'top 75%'
    }
  });

  // 9. Features Section Entrance scroll
  gsap.from('.feature-item', {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.features',
      start: 'top 75%'
    }
  });

  // 10. Showcase Slider Gallery Controller (GSAP)
  (function () {
    const sliderWrapper = document.getElementById('sg-slider-wrapper');
    const slides = document.querySelectorAll('.sg-slide');
    const prevBtn = document.getElementById('sg-prev-btn');
    const nextBtn = document.getElementById('sg-next-btn');
    const progressBar = document.getElementById('sg-progress-bar');
    
    if (!sliderWrapper || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let progressTween = null;
    let zoomTween = null;
    let isTransitioning = false;

    // Helper to get active slide elements
    function getSlideElements(slide) {
      return {
        img: slide.querySelector('.sg-img'),
        title: slide.querySelector('.sg-title'),
        desc: slide.querySelector('.sg-desc'),
        counter: slide.querySelector('.sg-counter'),
        tag: slide.querySelector('.sg-tag')
      };
    }

    // Function to run transition
    function goToSlide(nextIndex) {
      if (isTransitioning || nextIndex === currentIndex) return;
      isTransitioning = true;

      const currentSlide = slides[currentIndex];
      const nextSlide = slides[nextIndex];

      const currentEl = getSlideElements(currentSlide);
      const nextEl = getSlideElements(nextSlide);

      // Reset progress bar tween
      if (progressTween) {
        progressTween.kill();
      }
      if (zoomTween) {
        zoomTween.kill();
      }

      // 1. Prepare next slide state
      gsap.set(nextSlide, { zIndex: 3, opacity: 0 });
      gsap.set(nextEl.img, { scale: 1 });
      gsap.set([nextEl.tag, nextEl.counter, nextEl.title, nextEl.desc], { opacity: 0, y: 20 });

      // 2. Animate out current slide
      gsap.set(currentSlide, { zIndex: 2 });
      gsap.to(currentSlide, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          currentSlide.classList.remove('active');
          isTransitioning = false;
        }
      });

      // 3. Animate in next slide
      nextSlide.classList.add('active');
      gsap.to(nextSlide, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Zoom effect on new slide image over 5s duration
      zoomTween = gsap.to(nextEl.img, {
        scale: 1.05,
        duration: 5,
        ease: 'none'
      });

      // Animate text elements independently
      gsap.to([nextEl.tag, nextEl.counter], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 0.2
      });

      gsap.to(nextEl.title, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3
      });

      gsap.to(nextEl.desc, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.4
      });

      // Update current index
      currentIndex = nextIndex;

      // Restart progress bar autoplay
      startAutoplay();
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % totalSlides;
      goToSlide(nextIndex);
    }

    function prevSlide() {
      const nextIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      goToSlide(nextIndex);
    }

    // Start progress bar animation
    function startAutoplay() {
      progressTween = gsap.fromTo(progressBar, 
        { width: '0%' },
        {
          width: '100%',
          duration: 5,
          ease: 'none',
          onComplete: nextSlide
        }
      );
    }

    // Initialize first slide's zoom animation
    const firstEl = getSlideElements(slides[0]);
    gsap.set(slides[0], { opacity: 1, zIndex: 3 });
    gsap.set(firstEl.img, { scale: 1 });
    zoomTween = gsap.to(firstEl.img, {
      scale: 1.05,
      duration: 5,
      ease: 'none'
    });

    startAutoplay();

    // Hover listeners
    sliderWrapper.addEventListener('mouseenter', () => {
      if (progressTween) progressTween.pause();
      if (zoomTween) zoomTween.pause();
    });

    sliderWrapper.addEventListener('mouseleave', () => {
      if (progressTween) progressTween.play();
      if (zoomTween) zoomTween.play();
    });

    // Navigation Click listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
  })();

  // 10b. Location Overview Accordion (single-open, with image crossfade)
  (function () {
    const accordion = document.getElementById('lo-accordion');
    if (!accordion) return;

    const items = accordion.querySelectorAll('.lo-item');
    const images = document.querySelectorAll('.lo-visual-img');

    function openItem(item, animate) {
      const content = item.querySelector('.lo-item-content');
      const icon = item.querySelector('.lo-item-icon span:last-child');
      const header = item.querySelector('.lo-item-header');
      item.classList.add('is-open');
      header.setAttribute('aria-expanded', 'true');

      if (animate) {
        gsap.to(content, { height: 'auto', duration: 0.6, ease: 'power3.inOut' });
        gsap.to(icon, { scaleY: 0, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.set(content, { height: 'auto' });
        gsap.set(icon, { scaleY: 0 });
      }
    }

    function closeItem(item) {
      const content = item.querySelector('.lo-item-content');
      const icon = item.querySelector('.lo-item-icon span:last-child');
      const header = item.querySelector('.lo-item-header');
      item.classList.remove('is-open');
      header.setAttribute('aria-expanded', 'false');

      gsap.to(content, { height: 0, duration: 0.5, ease: 'power3.inOut' });
      gsap.to(icon, { scaleY: 1, duration: 0.4, ease: 'power2.out' });
    }

    items.forEach((item) => {
      const content = item.querySelector('.lo-item-content');

      if (item.classList.contains('is-open')) {
        openItem(item, false);
      } else {
        gsap.set(content, { height: 0 });
      }

      item.querySelector('.lo-item-header').addEventListener('click', () => {
        const alreadyOpen = item.classList.contains('is-open');

        items.forEach((other) => {
          if (other !== item && other.classList.contains('is-open')) {
            closeItem(other);
          }
        });

        if (alreadyOpen) {
          closeItem(item);
        } else {
          openItem(item, true);

          const targetIndex = item.dataset.loIndex;
          images.forEach((img) => {
            img.classList.toggle('is-active', img.dataset.loImage === targetIndex);
          });
        }
      });
    });
  })();

  // 11. Testimonials — drag-to-scroll + arrow navigation
  (function () {
    const track   = document.getElementById('tm-cards-track');
    const prevBtn = document.getElementById('tm-prev-btn');
    const nextBtn = document.getElementById('tm-next-btn');

    if (!track) return;

    // ── Drag to scroll ──────────────────────────────────────────────────
    let isDown = false, startX, scrollStart;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x  = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.2;
      track.scrollLeft = scrollStart - walk;
    });

    // Touch support
    let touchStartX, touchScrollStart;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchScrollStart = track.scrollLeft;
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - touchStartX;
      track.scrollLeft = touchScrollStart - dx;
    }, { passive: true });

    // ── Arrow navigation ────────────────────────────────────────────────
    function getScrollAmount() {
      const card = track.querySelector('.tm-card');
      if (!card) return 360;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      return card.offsetWidth + gap;
    }

    function updateArrows() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
      track.addEventListener('scroll', updateArrows, { passive: true });
      updateArrows();
    }
  })();

  // 12. NRI Support — card hover zoom + expand icon (desktop only)
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.nri-card').forEach((card) => {
      const img = card.querySelector('img');
      const expandIcon = card.querySelector('.nri-card-expand');
      gsap.set(expandIcon, { scale: 0.85 });

      card.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.08, duration: 0.7, ease: 'power3.out' });
        gsap.to(expandIcon, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.6, ease: 'power3.out' });
        gsap.to(expandIcon, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  // 13. Scroll Reveal Text Color Fill Animation
  const revealTitles = document.querySelectorAll('.section-title');
  revealTitles.forEach(title => {
    const fill = title.querySelector('.title-fill');
    if (!fill) return;

    gsap.fromTo(fill,
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0.2,
        filter: "blur(8px)"
      },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        filter: "blur(0px)",
        ease: "power4.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          end: "top 10%",
          scrub: true
        }
      }
    );
  });

  // 14. Stats Description Text Scroll Reveal (Vanilla JS)
  (function initTextReveal() {
    const desc = document.querySelector('.stats-new-desc');
    if (!desc) return;

    const originalText = desc.textContent.replace(/\s+/g, ' ').trim();
    desc.innerHTML = '';
    
    // Create spans for each character to enable smooth character-by-character transition
    const spans = [...originalText].map(char => {
      const span = document.createElement('span');
      span.className = 'reveal-char';
      span.textContent = char;
      desc.appendChild(span);
      return span;
    });

    const handler = () => {
      const rect = desc.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Reveal window: starts when top of text enters 85% of screen height
      // Completes when top of text reaches 35% of screen height
      const startReveal = viewportHeight * 0.85;
      const endReveal = viewportHeight * 0.35;
      
      let progress = (startReveal - rect.top) / (startReveal - endReveal);
      progress = Math.max(0, Math.min(1, progress));
      
      const totalSpans = spans.length;
      const revealIndex = Math.floor(progress * totalSpans);
      
      for (let i = 0; i < totalSpans; i++) {
        if (i <= revealIndex) {
          spans[i].classList.add('active');
        } else {
          spans[i].classList.remove('active');
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handler();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', handler);
    // Initial paint
    handler();
  })();

  // ─── Smart Investors: Drag-to-scroll & progress bar ───
  (function () {
    const track = document.getElementById('si-cards-track');
    const bar   = document.getElementById('si-scroll-bar');
    if (!track) return;

    // Update progress bar on scroll
    const updateBar = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;
      const pct = (track.scrollLeft / maxScroll) * 100;
      if (bar) bar.style.width = pct + '%';
    };
    track.addEventListener('scroll', updateBar, { passive: true });

    // Drag-to-scroll
    let isDragging = false;
    let startX, scrollStart;

    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX     = e.clientX;
      scrollStart = track.scrollLeft;
      track.style.userSelect = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      track.scrollLeft = scrollStart - dx;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      track.style.userSelect = '';
    });

    // Touch support
    let touchStartX, touchScrollStart;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchScrollStart = track.scrollLeft;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - touchStartX;
      track.scrollLeft = touchScrollStart - dx;
    }, { passive: true });
  })();

  // ── Service Cards Arrow Navigation ──────────────────────────────────────
  (function () {
    const track   = document.getElementById('si-cards-track');
    const prevBtn = document.getElementById('si-prev-btn');
    const nextBtn = document.getElementById('si-next-btn');

    if (!track || !prevBtn || !nextBtn) return;

    /** Width of one card + gap to scroll per click */
    function getScrollAmount() {
      const card = track.querySelector('.si-card');
      if (!card) return 360;
      const style = getComputedStyle(track);
      const gap   = parseFloat(style.gap) || 24;
      return card.offsetWidth + gap;
    }

    /** Enable / disable buttons based on scroll position */
    function updateArrows() {
      const atStart = track.scrollLeft <= 4;
      const atEnd   = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      prevBtn.disabled = atStart;
      nextBtn.disabled = atEnd;
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows(); // set initial state
  })();

  // GSAP Reveal for Services Section
  (function initServicesReveal() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    // Reveal the service cards
    gsap.from('.services-grid .service-card', {
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: servicesGrid,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Also reveal the header text elements
    gsap.from('.services-header-left > *', {
      opacity: 0,
      y: 30,
      duration: 1.0,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-header-wrap',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  })();

  // ── OUR WORKS — Scroll-Driven GSAP Showcase ─────────────────────────────
  (function initWorksSection() {

    // ── Tiny SplitText utility (mimics GSAP SplitText for chars with mask) ──
    function splitChars(el) {
      const childNodes = Array.from(el.childNodes);
      el.textContent = '';

      const chars = [];
      childNodes.forEach(function(node) {
        if (node.nodeType === 3) { // Text node
          const text = node.textContent;
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];

            if (ch === ' ') {
              const sp = document.createElement('span');
              sp.innerHTML = '&nbsp;';
              sp.style.display = 'inline-block';
              el.appendChild(sp);
              continue;
            }
            if (ch === '\n' || ch === '\r') {
              continue;
            }

            const wrap = document.createElement('span');
            wrap.classList.add('char-wrap');

            const inner = document.createElement('span');
            inner.classList.add('char');
            inner.textContent = ch;

            wrap.appendChild(inner);
            el.appendChild(wrap);
            chars.push(inner);
          }
        } else if (node.nodeName.toLowerCase() === 'br') {
          el.appendChild(document.createElement('br'));
        } else {
          el.appendChild(node);
        }
      });
      return chars;
    }

    // ── Animate the section hero title on scroll-into-view ──
    const worksHeroTitle = document.querySelector('.works-hero-title');
    if (worksHeroTitle) {
      const heroChars = splitChars(worksHeroTitle);
      gsap.set(heroChars, { yPercent: 120 });
      gsap.to(heroChars, {
        yPercent: 0,
        ease: 'power3.out',
        stagger: { amount: 0.55, from: 'center' },
        scrollTrigger: {
          trigger: '.works-hero',
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // ── Per work item: clip-path image reveal + char stagger ──
    document.querySelectorAll('.work-item').forEach(function(item) {
      const img    = item.querySelector('.work-item-img');
      const nameH1 = item.querySelector('.work-item-name h1');

      if (!img || !nameH1) return;

      // ── 1. Split title into masked chars ──
      const chars = splitChars(nameH1);
      gsap.set(chars, { yPercent: 125 });

      // Per-char ScrollTrigger scrub (exact port of the React GSAP code)
      chars.forEach(function(char, index) {
        ScrollTrigger.create({
          trigger: item,
          start: 'top+=' + (index * 25 - 250) + ' top',
          end:   'top+=' + (index * 25 - 100)  + ' top',
          scrub: 1,
          animation: gsap.fromTo(
            char,
            { yPercent: 125 },
            { yPercent: 0, ease: 'none' }
          )
        });
      });

      // ── 2. Clip-path ENTRY reveal ──
      ScrollTrigger.create({
        trigger: item,
        start: 'top bottom',
        end:   'top top',
        scrub: 0.5,
        animation: gsap.fromTo(
          img,
          { clipPath: 'polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none' }
        )
      });

      // ── 3. Clip-path EXIT collapse ──
      ScrollTrigger.create({
        trigger: item,
        start: 'bottom bottom',
        end:   'bottom top',
        scrub: 0.5,
        animation: gsap.fromTo(
          img,
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)', ease: 'none' }
        )
      });
    });

  })();

});
