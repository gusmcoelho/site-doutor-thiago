document.addEventListener('DOMContentLoaded', () => {
  // ─── TELA DE INTRODUÇÃO (PRELOADER COM VÍDEO) ───
  const preloader = document.getElementById('preloader');
  const preloaderVideo = document.getElementById('preloader-video');
  const skipIntro = document.getElementById('skip-intro');

  if (preloader) {
    const fadeOutPreloader = () => {
      preloader.classList.add('fade-out');
    };

    if (preloaderVideo) {
      preloaderVideo.playbackRate = 1.5;
      preloaderVideo.muted = true;
      preloaderVideo.setAttribute('muted', '');
      preloaderVideo.setAttribute('playsinline', '');

      // Garante a reprodução automática
      preloaderVideo.play().catch(() => {
        // No mobile, espera o primeiro toque do usuário pra tocar o vídeo
        const playOnTouch = () => {
          preloaderVideo.play().then(() => {
            document.removeEventListener('touchstart', playOnTouch);
          }).catch(fadeOutPreloader); // Se ainda falhar, pula
        };
        document.addEventListener('touchstart', playOnTouch, { once: true });
      });

      // Quando o vídeo acabar, esconde o preloader
      preloaderVideo.addEventListener('ended', fadeOutPreloader);

      // Tempo limite de segurança de 8.5 segundos
      setTimeout(fadeOutPreloader, 8500);
    } else {
      setTimeout(fadeOutPreloader, 2500);
    }

    if (skipIntro) {
      skipIntro.addEventListener('click', fadeOutPreloader);
    }
  }


  // ─── SCROLL PROGRESS BAR ───
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
    });
  }

  // ─── NAVBAR EFEITO SCROLLED ───
  const mainNav = document.getElementById('main-nav');
  if (mainNav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    });
  }

  // ─── MENU MOBILE ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  if (hamburger && mobileMenu && mobileClose) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
    });

    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });

    // Expor função globalmente para clicks inline nos links
    window.closeMobile = function () {
      mobileMenu.classList.remove('open');
    };
  }

  // ─── SCROLL REVEAL (INTERSECTION OBSERVER) ───
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Para de observar depois que anima
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Ativa um pouco antes do elemento aparecer totalmente
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ─── INSTAGRAM CAROUSEL ───
  const instaCarousel = document.querySelector('.instagram-carousel');
  const btnPrev = document.querySelector('.insta-nav.prev');
  const btnNext = document.querySelector('.insta-nav.next');

  if (instaCarousel && btnPrev && btnNext) {
    btnNext.addEventListener('click', () => {
      const scrollAmount = instaCarousel.clientWidth * 0.9;
      instaCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    btnPrev.addEventListener('click', () => {
      const scrollAmount = instaCarousel.clientWidth * 0.9;
      instaCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
});
