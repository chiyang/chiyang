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

  const scanStartX = '-2vw';
  const scanEndX = '102vw';

  let activeScanTimeline = null;
  let activeShell = null;
  let lastStageSwitchAt = -Infinity;
  let isStageTransitioning = false;

  const lockedScrollKeys = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ']);
  const isEditableTarget = (target) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }
    if (target.isContentEditable) {
      return true;
    }
    const tagName = target.tagName;
    return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
  };

  const preventScrollWhileTransitioning = (event) => {
    if (!isStageTransitioning) {
      return;
    }

    if (event.type === 'keydown') {
      if (isEditableTarget(event.target)) {
        return;
      }
      if (!lockedScrollKeys.has(event.key)) {
        return;
      }
    }

    event.preventDefault();
  };

  window.addEventListener('wheel', preventScrollWhileTransitioning, { passive: false });
  window.addEventListener('touchmove', preventScrollWhileTransitioning, { passive: false });
  window.addEventListener('keydown', preventScrollWhileTransitioning);

  const setStageScrollLock = (locked) => {
    isStageTransitioning = locked;
    document.body.classList.toggle('stage-scroll-locked', locked);
    document.documentElement.classList.toggle('stage-scroll-locked', locked);
  };

  const alignShellToViewport = (shell) => {
    const section = shell.closest('section');
    if (!section) {
      return;
    }

    const targetTop = Math.max(0, section.offsetTop);
    if (Math.abs(window.scrollY - targetTop) > 2) {
      window.scrollTo({
        top: targetTop,
        behavior: 'auto',
      });
    }
  };

  const playScan = () => {
    if (!scanOverlay) {
      return Promise.resolve();
    }

    if (activeScanTimeline) {
      activeScanTimeline.kill();
      activeScanTimeline = null;
    }

    gsap.killTweensOf([scanOverlay, ...scanLayers]);

    return new Promise((resolve) => {
      const timeline = gsap.timeline({
        onComplete: () => {
          activeScanTimeline = null;
          resolve();
        },
      });

      activeScanTimeline = timeline;

      timeline
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
          duration: 1.06,
          ease: 'none',
        }, 0)
        .to(scanLayers, {
          opacity: 0.52,
          duration: 0.24,
          ease: 'none',
        }, 0.76)
        .to(scanOverlay, {
          autoAlpha: 0,
          duration: 0.16,
          ease: 'none',
        }, 0.92);
    });
  };

  const playReverseScanHide = (state) => {
    if (!scanOverlay) {
      gsap.to(state.shell, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.8,
        ease: 'none',
      });
      return Promise.resolve();
    }

    if (activeScanTimeline) {
      activeScanTimeline.kill();
      activeScanTimeline = null;
    }

    gsap.killTweensOf([scanOverlay, ...scanLayers, state.shell]);

    return new Promise((resolve) => {
      const timeline = gsap.timeline({
        onComplete: () => {
          activeScanTimeline = null;
          resolve();
        },
      });

      activeScanTimeline = timeline;

      timeline
        .set(scanOverlay, {
          autoAlpha: 1,
          x: scanEndX,
        }, 0)
        .set(scanLayers, { opacity: 0.54 }, 0)
        .to(scanLayers, {
          opacity: 0.88,
          duration: 0.1,
          ease: 'none',
        }, 0)
        .to(scanOverlay, {
          x: scanStartX,
          duration: 0.82,
          ease: 'none',
        }, 0)
        .to(state.shell, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.82,
          ease: 'none',
        }, 0)
        .to(scanLayers, {
          opacity: 0.52,
          duration: 0.2,
          ease: 'none',
        }, 0.62)
        .to(scanOverlay, {
          autoAlpha: 0,
          duration: 0.16,
          ease: 'none',
        }, 0.72);
    });
  };

  const getRevealXOffset = (node) => (
    node.classList.contains('reveal-right')
      ? 50
      : node.classList.contains('reveal-left')
        ? -50
        : 0
  );

  const resetShellState = (state) => {
    gsap.killTweensOf([state.shell, ...state.horizontalDiag, ...state.vertical, ...state.revealItems]);
    gsap.set(state.shell, {
      opacity: 0.24,
      y: 60,
      clipPath: 'inset(0 100% 0 0)',
      filter: 'brightness(0.84) saturate(0.92)',
    });
    gsap.set(state.horizontalDiag, { scaleX: 0, opacity: 0.95 });
    gsap.set(state.vertical, { scaleY: 0, opacity: 0.95 });

    state.revealItems.forEach((node) => {
      gsap.set(node, {
        opacity: 0,
        x: getRevealXOffset(node),
        y: 22,
      });
    });
  };

  const playShellReveal = (state) => new Promise((resolve) => {
    gsap.timeline({
      defaults: {
        ease: 'power2.out',
      },
      onComplete: resolve,
    })
      .to(state.shell, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.06,
        ease: 'none',
      }, 0)
      .to(state.shell, {
        opacity: 1,
        y: 0,
        filter: 'brightness(1) saturate(1)',
        duration: 0.92,
      }, 0.08)
      .to(state.horizontalDiag, {
        scaleX: 1,
        duration: 0.34,
        stagger: 0.06,
      }, 0.58)
      .to(state.vertical, {
        scaleY: 1,
        duration: 0.32,
        stagger: 0.07,
      }, 0.64)
      .to(state.revealItems, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.62,
        stagger: 0.1,
      }, 0.72);
  });

  const shellStateMap = new Map();

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
      shell,
      revealed: false,
      revealItems,
      horizontalDiag,
      vertical,
    };

    shellStateMap.set(shell, state);
    resetShellState(state);
  });

  const activateShell = async (shell) => {
    const state = shellStateMap.get(shell);
    if (!state) {
      return;
    }

    const now = performance.now();
    if (activeShell === shell) {
      return;
    }
    if (isStageTransitioning) {
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

    alignShellToViewport(shell);
    setStageScrollLock(true);

    try {
      if (state.revealed) {
        await playReverseScanHide(state);
        resetShellState(state);
      }

      await Promise.all([
        playScan(),
        playShellReveal(state),
      ]);
      state.revealed = true;
    } finally {
      setStageScrollLock(false);
    }
  };

  stageShells.forEach((shell) => {
    ScrollTrigger.create({
      trigger: shell,
      start: 'top 48%',
      end: 'bottom 48%',
      onEnter: () => {
        activateShell(shell);
      },
      onEnterBack: () => {
        activateShell(shell);
      },
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
