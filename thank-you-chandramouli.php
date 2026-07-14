<!DOCTYPE html>
<html lang="en" class="lenis">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You | Yoshitha's Real Rise</title>
  <meta name="robots" content="noindex, nofollow">

  <!-- SEO Meta Tags -->
  <meta name="description" content="Thank you for contacting Yoshitha's Real Rise. Our team has received your enquiry and will get back to you shortly.">
  <meta name="author" content="Yoshitha's Real Rise Partners">

  <!-- Satoshi Font (Display & Headings) -->
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap" rel="stylesheet">

  <!-- Inter Font (Body Text) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/lenis.css?v=85">
  <link rel="stylesheet" href="css/main.css?v=85">

  <style>
    .thankyou-section {
      min-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--section-padding-mobile);
      text-align: center;
    }

    .thankyou-card {
      max-width: 640px;
      margin: 0 auto;
    }

    .thankyou-icon {
      width: 84px;
      height: 84px;
      margin: 0 auto 1.75rem;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-green-light), var(--color-green-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(13, 94, 49, 0.25);
    }

    .thankyou-eyebrow {
      display: inline-block;
      font-family: var(--font-primary);
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-green-dark);
      margin-bottom: 1rem;
    }

    .thankyou-title {
      font-size: clamp(2rem, 4vw, 3rem);
      margin-bottom: 1.25rem;
    }

    .thankyou-text {
      font-size: 1.1rem;
      margin-bottom: 2.5rem;
    }

    .thankyou-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
  </style>
</head>
<body>

  <!-- Vanta Birds ambient background — sits behind everything -->
  <div id="vanta-bg"></div>

  <!-- Header Navigation -->
  <header>
    <div class="nav-wrapper">
      <a href="index.html" class="logo-link" aria-label="Yoshitha's Real Rise Home">
        <img src="Assets/Img/logo-white 1.svg" alt="Yoshitha's Real Rise Logo" class="logo-img logo-normal">
        <img src="Assets/Img/Lofo-infra.png" alt="Yoshitha's Real Rise Logo" class="logo-img logo-sticky">
      </a>

      <!-- Desktop Nav links -->
      <nav class="nav-links" aria-label="Main Navigation">
        <a href="index.html#about" class="nav-item">About Us</a>
        <a href="index.html#features" class="nav-item">Features</a>
        <a href="index.html#bento" class="nav-item">Why Us</a>
        <a href="index.html#gallery" class="nav-item">Projects</a>
        <a href="index.html#testimonials" class="nav-item">Testimonials</a>
        <a href="index.html#nri" class="nav-item">NRI</a>
      </nav>

      <!-- Desktop Call to Action -->
      <div class="nav-actions">
        <a href="index.html#contact" class="btn-secondary" role="button">
          <span>Get in Touch</span>
        </a>
      </div>

      <!-- Hamburger mobile button -->
      <button class="mobile-toggle" id="mobile-toggle" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="mobile-menu-overlay">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <!-- Mobile Menu Navigation Panel -->
  <div class="mobile-menu-overlay" id="mobile-menu-overlay" aria-hidden="true" aria-modal="true" role="dialog" aria-label="Mobile navigation menu">
    <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close Navigation Menu">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <span class="mobile-menu-eyebrow">Menu</span>
    <nav class="mobile-menu-links" aria-label="Mobile Navigation">
      <a href="index.html#about" class="mobile-menu-link">About Us</a>
      <a href="index.html#features" class="mobile-menu-link">Features</a>
      <a href="index.html#bento" class="mobile-menu-link">Why Us</a>
      <a href="index.html#gallery" class="mobile-menu-link">Projects</a>
      <a href="index.html#testimonials" class="mobile-menu-link">Testimonials</a>
      <a href="index.html#nri" class="mobile-menu-link">NRI</a>
      <a href="index.html#contact" class="mobile-menu-link">Contact</a>
    </nav>
  </div>

  <main>
    <section class="thankyou-section">
      <div class="container thankyou-card">
        <div class="thankyou-icon">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="thankyou-eyebrow">Enquiry Received</span>
        <h1 class="thankyou-title">Thank You for Reaching Out!</h1>
        <p class="thankyou-text">
          We've received your message and one of our Real Rise specialists will get in touch with you shortly.
          In the meantime, feel free to keep exploring what Yoshitha Infra has to offer.
        </p>
        <div class="thankyou-actions">
          <a href="index.html" class="btn-primary" role="button">
            <span>Back to Home</span>
          </a>
          <a href="index.html#gallery" class="btn-secondary" role="button">
            <span>Explore Projects</span>
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="cf-footer">
        <div class="container">
          <div class="cf-footer-row">
            <div class="cf-footer-brand">
              <img src="Assets/Img/logo-white 1.svg" alt="Yoshitha's Real Rise Logo" class="cf-footer-logo">
              <p>Redefining luxury living and plotting infrastructure in partnership with Yoshitha Infra.</p>
            </div>

            <nav class="cf-footer-cols" aria-label="Footer Navigation">
              <div class="cf-footer-col">
                <a href="index.html#about" class="footer-nav-link">About Us</a>
                <a href="index.html#features" class="footer-nav-link">Features</a>
                <a href="index.html#bento" class="footer-nav-link">Why Us</a>
                <a href="index.html#gallery" class="footer-nav-link">Projects</a>
              </div>
              <div class="cf-footer-col">
                <a href="index.html#testimonials" class="footer-nav-link">Testimonials</a>
                <a href="index.html#nri" class="footer-nav-link">NRI</a>
                <a href="index.html#contact" class="footer-nav-link">Get in Touch</a>
              </div>
            </nav>
          </div>

          <div class="cf-footer-bottom">
            <span>&copy; 2026 Yoshitha Inc. All rights reserved</span>
             <p>Designed by <a href="https://www.envizonstudio.com/" class="cf-footer-credit">Envizon Studio</a></p>
          </div>
        </div>
      </footer>

  <!-- CDNs for animations and smooth scroll -->
  <!-- GSAP Core & ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <!-- Lenis Smooth Scroll -->
  <script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>

  <!-- Page Scripts -->
  <script src="js/main.js?v=101"></script>

  <!-- Three.js r134 (required by Vanta) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <!-- Vanta Birds -->
  <script src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js"></script>

  <!-- Vanta Birds Initialization -->
  <script>
    (function initVantaBirds() {
      if (typeof VANTA === 'undefined' || typeof THREE === 'undefined') return;

      VANTA.BIRDS({
        el: '#vanta-bg',
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0xffffff,
        color1: 0xb9ffda,
        color2: 0xc8e6f5,
        wingSpan: 24,
        quantity: 4,
        speedLimit: 4,
        separation: 80,
        alignment: 50,
        cohesion: 50
      });

      const vantaEl = document.getElementById('vanta-bg');
      if (vantaEl) {
        document.addEventListener('mousemove', function(e) {
          vantaEl.dispatchEvent(new MouseEvent('mousemove', {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: false
          }));
        }, { passive: true });
      }
    })();
  </script>

</body>
</html>
