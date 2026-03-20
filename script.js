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

const closeNavMenu = () => {
  if (!navMenu || !navToggle) {
    return;
  }
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};

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
      closeNavMenu();
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!navMenu.contains(target) && !navToggle.contains(target)) {
      closeNavMenu();
    }
  });
}

if (topLinks.length > 0) {
  topLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (hasGsapScroll) {
        return;
      }

      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      closeNavMenu();
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
  const stageShellList = Array.from(stageShells);
  const topAnchor = document.getElementById('top');
  const firstStageShell = stageShellList[0] || null;
  const firstStageSection = firstStageShell ? firstStageShell.closest('section') : null;
  const topSection = document.querySelector('main section#hero') || sections[0] || null;
  const topTarget = topAnchor || topSection;

  const scanStartX = '-2vw';
  const scanEndX = '102vw';

  let activeScanTimeline = null;
  let activeShell = null;
  let lastStageSwitchAt = -Infinity;
  let isStageTransitioning = false;
  let isProgrammaticNavigation = false;
  let suppressScrollTriggerUntil = -Infinity;
  let pendingNavigation = Promise.resolve();

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
          duration: 0.08,
          ease: 'none',
        }, 0)
        .to(scanOverlay, {
          x: scanEndX,
          duration: 0.66,
          ease: 'none',
        }, 0)
        .to(scanLayers, {
          opacity: 0.52,
          duration: 0.14,
          ease: 'none',
        }, 0.52)
        .to(scanOverlay, {
          autoAlpha: 0,
          duration: 0.08,
          ease: 'none',
        }, 0.62);
    });
  };

  const playReverseScanHide = (state) => {
    if (!scanOverlay) {
      gsap.to(state.shell, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.38,
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
          duration: 0.08,
          ease: 'none',
        }, 0)
        .to(scanOverlay, {
          x: scanStartX,
          duration: 0.38,
          ease: 'none',
        }, 0)
        .to(state.shell, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.38,
          ease: 'none',
        }, 0)
        .to(scanLayers, {
          opacity: 0.52,
          duration: 0.1,
          ease: 'none',
        }, 0.24)
        .to(scanOverlay, {
          autoAlpha: 0,
          duration: 0.08,
          ease: 'none',
        }, 0.3);
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

  const hideVisitedShellContentAtStart = (state) => {
    gsap.killTweensOf([...state.horizontalDiag, ...state.vertical, ...state.revealItems]);
    gsap.set([...state.horizontalDiag, ...state.vertical, ...state.revealItems], { opacity: 0 });
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
        duration: 0.66,
        ease: 'none',
      }, 0)
      .to(state.shell, {
        opacity: 1,
        y: 0,
        filter: 'brightness(1) saturate(1)',
        duration: 0.62,
      }, 0.02)
      .to(state.horizontalDiag, {
        scaleX: 1,
        duration: 0.24,
        stagger: 0.04,
      }, 0.28)
      .to(state.vertical, {
        scaleY: 1,
        duration: 0.22,
        stagger: 0.05,
      }, 0.3)
      .to(state.revealItems, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.46,
        stagger: 0.08,
      }, 0.36);
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

  const activateShell = async (shell, { force = false } = {}) => {
    const state = shellStateMap.get(shell);
    if (!state) {
      return;
    }

    if (!force && firstStageShell && firstStageSection && shell === firstStageShell) {
      const scrollTop = window.scrollY || window.pageYOffset;
      if (scrollTop < firstStageSection.offsetTop - 8) {
        return;
      }
    }

    const now = performance.now();
    if (activeShell === shell && !force) {
      return;
    }
    if (isStageTransitioning) {
      return;
    }
    if (!force && now - lastStageSwitchAt < 420) {
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
        hideVisitedShellContentAtStart(state);
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

  const getShellIndex = (shell) => stageShellList.indexOf(shell);

  const getCurrentShellIndex = () => {
    const activeIndex = getShellIndex(activeShell);
    if (activeIndex >= 0) {
      return activeIndex;
    }

    if (stageShellList.length === 0) {
      return -1;
    }

    const scrollTop = window.scrollY || window.pageYOffset;
    const firstSection = stageShellList[0].closest('section');
    if (firstSection && scrollTop < firstSection.offsetTop - 8) {
      return -1;
    }

    let nearestIndex = -1;
    let nearestDistance = Infinity;

    stageShellList.forEach((shell, index) => {
      const section = shell.closest('section');
      if (!section) {
        return;
      }

      const distance = Math.abs(section.offsetTop - scrollTop);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  };

  const runCrossStageNavigation = async (targetSection) => {
    if (!targetSection) {
      return;
    }

    const isTopNavigation = targetSection === topTarget || targetSection === topAnchor;
    const targetShell = targetSection.querySelector('.stage-shell');
    const currentIndex = getCurrentShellIndex();
    const currentShell = currentIndex >= 0 ? stageShellList[currentIndex] : null;
    const targetState = targetShell ? shellStateMap.get(targetShell) : null;
    const currentState = currentShell ? shellStateMap.get(currentShell) : null;

    isProgrammaticNavigation = true;
    setStageScrollLock(true);

    try {
      if (!targetShell) {
        if (currentState) {
          await playReverseScanHide(currentState);
          resetShellState(currentState);
        }
        stageShells.forEach((shell) => shell.classList.remove('stage-active'));
        activeShell = null;
        lastStageSwitchAt = performance.now();
        const targetTop = isTopNavigation ? 0 : Math.max(0, targetSection.offsetTop);
        window.scrollTo({
          top: targetTop,
          behavior: 'auto',
        });
        if (isTopNavigation) {
          window.requestAnimationFrame(() => {
            window.scrollTo({
              top: 0,
              behavior: 'auto',
            });
          });
        }
        return;
      }

      if (currentShell && currentShell !== targetShell && currentState) {
        await playReverseScanHide(currentState);
        resetShellState(currentState);
      } else if (currentShell === targetShell && currentState) {
        hideVisitedShellContentAtStart(currentState);
        await playReverseScanHide(currentState);
      }

      if (!targetState) {
        activeShell = targetShell;
        alignShellToViewport(targetShell);
        lastStageSwitchAt = performance.now();
        return;
      }

      resetShellState(targetState);
      stageShells.forEach((shell) => {
        shell.classList.toggle('stage-active', shell === targetShell);
      });
      activeShell = targetShell;

      alignShellToViewport(targetShell);

      await Promise.all([
        playScan(),
        playShellReveal(targetState),
      ]);

      targetState.revealed = true;
      lastStageSwitchAt = performance.now();
    } finally {
      suppressScrollTriggerUntil = performance.now() + (isTopNavigation ? 820 : 420);
      setStageScrollLock(false);
      isProgrammaticNavigation = false;
    }
  };

  const queueCrossStageNavigation = (targetSection) => {
    pendingNavigation = pendingNavigation
      .catch(() => {})
      .then(() => runCrossStageNavigation(targetSection));
  };

  navLinks.forEach((link) => {
    const hash = link.getAttribute('href');
    if (!hash || !hash.startsWith('#')) {
      return;
    }

    link.addEventListener('click', (event) => {
      const targetSection = hash === '#top'
        ? topTarget
        : document.querySelector(`main ${hash}`);
      if (!targetSection) {
        return;
      }

      event.preventDefault();
      closeNavMenu();
      queueCrossStageNavigation(targetSection);
    });
  });

  topLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!topTarget) {
        return;
      }

      event.preventDefault();
      closeNavMenu();
      queueCrossStageNavigation(topTarget);
    });
  });

  stageShells.forEach((shell) => {
    ScrollTrigger.create({
      trigger: shell,
      start: 'top 48%',
      end: 'bottom 48%',
      onEnter: () => {
        if (performance.now() < suppressScrollTriggerUntil) {
          return;
        }
        if (isProgrammaticNavigation) {
          return;
        }
        activateShell(shell);
      },
      onEnterBack: () => {
        if (performance.now() < suppressScrollTriggerUntil) {
          return;
        }
        if (isProgrammaticNavigation) {
          return;
        }
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
