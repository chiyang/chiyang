const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('main section[id]');
const reveals = document.querySelectorAll('.reveal');
const stageShells = document.querySelectorAll('.stage-shell');
const progressBar = document.querySelector('.scroll-progress');
const header = document.querySelector('.site-header');
const yearNode = document.getElementById('year');
const cursorGlow = document.querySelector('.cursor-glow');
const parallaxNodes = document.querySelectorAll('[data-parallax]');
const scanOverlay = document.querySelector('.scan-overlay');
const topLinks = document.querySelectorAll('a[href="#top"]');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsHover = window.matchMedia('(hover: hover)').matches;
const hasGsapScroll =
  !prefersReducedMotion &&
  typeof window.gsap !== 'undefined' &&
  typeof window.ScrollTrigger !== 'undefined';

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

sections.forEach((section) => {
  const nodes = section.querySelectorAll('.reveal');
  nodes.forEach((node, index) => {
    node.style.setProperty('--delay', `${Math.min(index * 90, 420)}ms`);
  });
});

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!navMenu.contains(target) && !navToggle.contains(target)) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (topLinks.length > 0) {
  topLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      if (navMenu && navToggle) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

stageShells.forEach((shell) => {
  if (shell.querySelector('.geo-overlay')) {
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'geo-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = [
    '<span class="geo-line geo-top"></span>',
    '<span class="geo-line geo-right"></span>',
    '<span class="geo-line geo-bottom"></span>',
    '<span class="geo-line geo-left"></span>',
    '<span class="geo-line geo-diag-a"></span>',
    '<span class="geo-line geo-diag-b"></span>',
    '<span class="geo-line geo-sweep-a"></span>',
    '<span class="geo-line geo-sweep-b"></span>',
    '<span class="geo-line geo-sweep-c"></span>',
  ].join('');

  shell.appendChild(overlay);
});

if (hasGsapScroll) {
  document.body.classList.add('gsap-mode');
  reveals.forEach((node) => node.classList.add('in-view'));

  const { gsap } = window;
  const { ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const scanCore = scanOverlay ? scanOverlay.querySelector('.scan-core') : null;
  const scanLayers = scanCore ? [scanCore] : [];

  const scanStartX = '-22vw';
  const scanEndX = '122vw';

  let activeScanTimeline = null;
  let activeShell = null;
  let lastStageSwitchAt = -Infinity;

  const playScan = () => {
    if (!scanOverlay) {
      return;
    }

    if (activeScanTimeline) {
      activeScanTimeline.kill();
      activeScanTimeline = null;
    }

    gsap.killTweensOf([scanOverlay, ...scanLayers]);

    activeScanTimeline = gsap.timeline({
      onComplete: () => {
        activeScanTimeline = null;
      },
    });

    activeScanTimeline
      .set(scanOverlay, {
        autoAlpha: 1,
        x: scanStartX,
      }, 0)
      .to(scanLayers, {
        opacity: 0.88,
        duration: 0.12,
        ease: 'none',
      }, 0)
      .to(scanOverlay, {
        x: scanEndX,
        duration: 1.12,
        ease: 'none',
      }, 0.02)
      .to(scanLayers, {
        opacity: 0.52,
        duration: 0.24,
        ease: 'none',
      }, 0.78)
      .to(scanOverlay, {
        autoAlpha: 0,
        duration: 0.16,
        ease: 'none',
      }, 1.04);
  };

  if (scanOverlay) {
    gsap.set(scanOverlay, {
      autoAlpha: 0,
      x: scanStartX,
      skewX: -10,
    });
    gsap.set(scanLayers, { opacity: 0.5 });
  }

  stageShells.forEach((shell) => {
    const revealItems = shell.querySelectorAll('.reveal');
    const horizontalDiag = shell.querySelectorAll('.geo-top, .geo-bottom, .geo-diag-a, .geo-diag-b, .geo-sweep-a, .geo-sweep-b, .geo-sweep-c');
    const vertical = shell.querySelectorAll('.geo-left, .geo-right');

    const state = {
      revealed: false,
      revealItems,
      horizontalDiag,
      vertical,
    };

    gsap.set(shell, {
      opacity: 0.24,
      y: 60,
      clipPath: 'inset(0 100% 0 0)',
      filter: 'brightness(0.84) saturate(0.92)',
    });
    gsap.set(horizontalDiag, { scaleX: 0, opacity: 0.95 });
    gsap.set(vertical, { scaleY: 0, opacity: 0.95 });

    revealItems.forEach((node) => {
      const xOffset = node.classList.contains('reveal-right')
        ? 50
        : node.classList.contains('reveal-left')
          ? -50
          : 0;

      gsap.set(node, {
        opacity: 0,
        x: xOffset,
        y: 22,
      });
    });

    const activateShell = () => {
      const now = performance.now();
      if (activeShell === shell) {
        return;
      }
      if (now - lastStageSwitchAt < 420) {
        return;
      }

      lastStageSwitchAt = now;
      activeShell = shell;

      stageShells.forEach((node) => {
        node.classList.toggle('stage-active', node === shell);
      });

      playScan();

      if (!state.revealed) {
        state.revealed = true;

        gsap.timeline({
          defaults: {
            ease: 'power2.out',
          },
        })
          .to(shell, {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0 0% 0 0)',
            filter: 'brightness(1) saturate(1)',
            duration: 1.2,
          }, 0.16)
          .to(horizontalDiag, {
            scaleX: 1,
            duration: 0.34,
            stagger: 0.06,
          }, 0.72)
          .to(vertical, {
            scaleY: 1,
            duration: 0.32,
            stagger: 0.07,
          }, 0.78)
          .to(revealItems, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.62,
            stagger: 0.1,
          }, 0.94);

        return;
      }

      gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      })
        .to(shell, {
          filter: 'brightness(0.95) saturate(0.96)',
          duration: 0.1,
        }, 0)
        .to(shell, {
          filter: 'brightness(1) saturate(1)',
          duration: 0.22,
        }, 0.1)
        .fromTo(horizontalDiag, {
          opacity: 0.42,
          scaleX: 0.94,
        }, {
          opacity: 1,
          scaleX: 1,
          duration: 0.24,
          stagger: 0.03,
        }, 0.14)
        .fromTo(vertical, {
          opacity: 0.42,
          scaleY: 0.9,
        }, {
          opacity: 1,
          scaleY: 1,
          duration: 0.22,
          stagger: 0.04,
        }, 0.16);
    };

    ScrollTrigger.create({
      trigger: shell,
      start: 'top 48%',
      end: 'bottom 48%',
      onEnter: activateShell,
      onEnterBack: activateShell,
    });
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  reveals.forEach((node) => revealObserver.observe(node));

  const stageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        stageShells.forEach((node) => {
          node.classList.toggle('stage-active', node === entry.target);
        });
      });
    },
    {
      threshold: 0.35,
    }
  );

  stageShells.forEach((shell) => stageObserver.observe(shell));
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  {
    rootMargin: '-45% 0px -42% 0px',
    threshold: 0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const updateScrollEffects = () => {
  const scrollTop = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  if (header) {
    header.classList.toggle('scrolled', scrollTop > 24);
  }

  if (!prefersReducedMotion) {
    parallaxNodes.forEach((node) => {
      const speed = Number(node.getAttribute('data-parallax')) || 0;
      const rect = node.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        return;
      }

      const relative = (window.innerHeight / 2 - rect.top) / window.innerHeight;
      const offset = Math.max(-speed, Math.min(speed, relative * speed));
      node.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
    });
  }
};

window.addEventListener('scroll', updateScrollEffects, { passive: true });
window.addEventListener('resize', updateScrollEffects);
window.addEventListener('load', updateScrollEffects);
updateScrollEffects();

if (cursorGlow && supportsHover && !prefersReducedMotion) {
  const handlePointerMove = (event) => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  };

  document.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('blur', () => {
    cursorGlow.style.opacity = '0';
  });
}
