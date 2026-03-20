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
const heroCtaLinks = document.querySelectorAll('.hero-actions a[href^="#"]');
const themeToggle = document.querySelector('.theme-toggle');
const langToggle = document.querySelector('.lang-toggle');
const i18nTextNodes = document.querySelectorAll('[data-i18n]');
const i18nHtmlNodes = document.querySelectorAll('[data-i18n-html]');
const i18nAriaNodes = document.querySelectorAll('[data-i18n-aria-label]');
const i18nMetaNode = document.querySelector('meta[data-i18n-meta]');
const i18nTitleNode = document.querySelector('title[data-i18n-title]');

const THEME_STORAGE_KEY = 'chi-site-theme';
const LANG_STORAGE_KEY = 'chi-site-lang';

const i18nDict = {
  zh: {
    pageTitle: '楊崎 Chi Yang | 個人網站',
    metaDescription: '楊崎 Chi Yang 的個人學術網站，專注於人工智慧、蛋白體學與質譜學研究。',
    navMainAria: '主選單',
    brandSub: '學術檔案',
    navAbout: '關於我',
    navInterests: '研究興趣',
    navWorks: '論文 / 計畫',
    navContact: '聯絡方式',
    toggleLanguageAria: '切換語言',
    toggleThemeAria: '切換明暗主題',
    navToggleOpenAria: '開啟選單',
    navToggleCloseAria: '關閉選單',
    themeSwitchToDark: '深色',
    themeSwitchToLight: '淺色',
    heroSystemTag: '研究節點 01',
    heroNameMain: '楊崎 <span>學術檔案</span>',
    heroTitle: '助理研究員',
    heroTagline: '以人工智慧重塑蛋白體與質譜分析流程，建立高可重現、可轉譯的研究管線。',
    heroBtnWorks: '瀏覽研究成果',
    heroBtnContact: '聯絡我',
    heroFocusTitle: '研究焦點',
    heroFocus1: 'AI 驅動的 MRM / Targeted MS 資料品質評估',
    heroFocus2: '蛋白體生物標記探索與精準醫療應用',
    heroFocus3: '自動化 peak-picking 與可重現分析流程設計',
    heroFooterLeft: '系統啟用中',
    heroFooterRight: '學術介面',
    aboutKicker: '關於我',
    aboutTitle: '研究者簡介',
    aboutBody1: '我是楊崎（Chi Yang），目前任職於長庚大學，專注於人工智慧、蛋白體學與質譜學交叉研究。研究上聚焦於將機器學習方法導入生醫資料流程，提升蛋白質定量準確性與分析效率。',
    aboutBody2: '在教學與研究管理中，我重視可重現性與跨域協作，致力於建立可延續、可驗證、可轉譯的研究方法。',
    aboutQuickProfileTitle: 'Quick Profile',
    aboutQuickProfileRole: '<strong>職稱：</strong>助理研究員',
    aboutQuickProfileExpertise: '<strong>專長：</strong>人工智慧、蛋白體、質譜學',
    aboutQuickProfileHobbies: '<strong>興趣：</strong>跑步、羽球、單車',
    interestsKicker: '研究興趣',
    interestsTitle: '研究興趣',
    interestCard1Title: '人工智慧',
    interestCard1Body: '深度學習、強化學習與生成式方法，應用於生醫訊號與多維質譜資料分析。',
    interestCard2Title: '蛋白體學',
    interestCard2Body: '以標靶蛋白體與生物標記開發為核心，建立可驗證且可落地的研究流程。',
    interestCard3Title: '質譜學',
    interestCard3Body: '聚焦 MRM/LC-MS 資料品質控管與 peak-picking 自動化，強化研究重現性。',
    worksKicker: '論文 / 計畫',
    worksTitle: '代表論文與計畫',
    workCard1Body: '參與毒蛇抗蛇毒血清效力提升研究，涵蓋蛋白體與分析化學協作。',
    workCard2Body: '以變分自編碼器進行質譜峰品質判讀，降低人工檢視成本並提升準確度。',
    workCard3Body: '提出自動化峰值選取管線，結合 2D heatmap 與 CNN，提升蛋白體分析效率。',
    workCard4Meta: '2025-2026 | 國科會計畫（PI）',
    workCard4Body: '使用生成式 AI 協助 signature peptide 與 fragment ion 選擇，加速 assay 設計流程。',
    worksNote: '資料來源：Chang Gung University Academic Capacity Ensemble（Chi Yang Profile，擷取重點整理）。',
    contactKicker: '聯絡方式',
    contactTitle: '聯絡方式',
    contactName: '<strong>姓名：</strong>楊崎 Chi Yang',
    contactRole: '<strong>職稱：</strong>助理研究員',
    contactExpertise: '<strong>研究專長：</strong>人工智慧、蛋白體、質譜學',
    contactHobbies: '<strong>興趣：</strong>跑步、羽球、單車',
    contactEmail: '<strong>Email：</strong><a href="mailto:chiyang@example.edu.tw">chiyang@example.edu.tw</a>',
    contactOffice: '<strong>辦公室：</strong>桃園市龜山區文化一路 259 號（示意）',
    footerName: '楊崎 Chi Yang',
    footerBackToTop: '回到頂部',
  },
  en: {
    pageTitle: 'Chi Yang | Personal Academic Site',
    metaDescription: 'Chi Yang personal academic website focused on AI, proteomics, and mass spectrometry.',
    navMainAria: 'Main menu',
    brandSub: 'Academic Profile',
    navAbout: 'About me',
    navInterests: 'Research interests',
    navWorks: 'Publications / Projects',
    navContact: 'Contact',
    toggleLanguageAria: 'Switch language',
    toggleThemeAria: 'Toggle theme',
    navToggleOpenAria: 'Open menu',
    navToggleCloseAria: 'Close menu',
    themeSwitchToDark: 'Dark',
    themeSwitchToLight: 'Light',
    heroSystemTag: 'Research Node 01',
    heroNameMain: 'CHI YANG <span>Academic Profile</span>',
    heroTitle: 'Assistant Researcher',
    heroTagline: 'Reframing proteomics and mass spectrometry workflows with AI to build reproducible and translatable research pipelines.',
    heroBtnWorks: 'View Research',
    heroBtnContact: 'Contact',
    heroFocusTitle: 'Research Focus',
    heroFocus1: 'AI-powered quality assessment for MRM / Targeted MS data',
    heroFocus2: 'Proteomic biomarker discovery and precision medicine applications',
    heroFocus3: 'Automated peak-picking and reproducible analysis workflow design',
    heroFooterLeft: 'Systems Active',
    heroFooterRight: 'Academic Interface',
    aboutKicker: 'About me',
    aboutTitle: 'Researcher Profile',
    aboutBody1: 'I am Chi Yang, currently working at Chang Gung University, focusing on interdisciplinary research in AI, proteomics, and mass spectrometry. My work emphasizes introducing machine learning into biomedical data pipelines to improve protein quantification accuracy and analytical efficiency.',
    aboutBody2: 'In teaching and research operations, I value reproducibility and interdisciplinary collaboration, aiming to develop methods that are sustainable, verifiable, and translatable.',
    aboutQuickProfileTitle: 'Quick Profile',
    aboutQuickProfileRole: '<strong>Title:</strong> Assistant Researcher',
    aboutQuickProfileExpertise: '<strong>Expertise:</strong> Artificial Intelligence, Proteomics, Mass Spectrometry',
    aboutQuickProfileHobbies: '<strong>Interests:</strong> Running, Badminton, Cycling',
    interestsKicker: 'Research interests',
    interestsTitle: 'Research Interests',
    interestCard1Title: 'Artificial Intelligence',
    interestCard1Body: 'Applying deep learning, reinforcement learning, and generative methods to biomedical signals and high-dimensional MS data.',
    interestCard2Title: 'Proteomics',
    interestCard2Body: 'Developing targeted proteomics and biomarker workflows that are verifiable and deployable.',
    interestCard3Title: 'Mass Spectrometry',
    interestCard3Body: 'Focusing on MRM/LC-MS quality control and automated peak-picking to improve reproducibility.',
    worksKicker: 'Publications / Projects',
    worksTitle: 'Selected Papers & Projects',
    workCard1Body: 'Contributed to antivenom potency enhancement research involving proteomics and analytical chemistry collaboration.',
    workCard2Body: 'Used a variational autoencoder to assess MS peak quality, reducing manual review effort and improving accuracy.',
    workCard3Body: 'Proposed an automatic peak-picking pipeline combining 2D heatmap transformation and CNN for targeted proteomics.',
    workCard4Meta: '2025-2026 | NSTC Project (PI)',
    workCard4Body: 'Applying generative AI to assist signature peptide and fragment ion selection for faster MRM assay design.',
    worksNote: 'Source: Chang Gung University Academic Capacity Ensemble (Chi Yang profile, summarized).',
    contactKicker: 'Contact',
    contactTitle: 'Contact',
    contactName: '<strong>Name:</strong> Chi Yang',
    contactRole: '<strong>Title:</strong> Assistant Researcher',
    contactExpertise: '<strong>Expertise:</strong> Artificial Intelligence, Proteomics, Mass Spectrometry',
    contactHobbies: '<strong>Interests:</strong> Running, Badminton, Cycling',
    contactEmail: '<strong>Email:</strong><a href="mailto:chiyang@example.edu.tw">chiyang@example.edu.tw</a>',
    contactOffice: '<strong>Office:</strong> No. 259, Wenhua 1st Rd., Guishan Dist., Taoyuan (sample)',
    footerName: 'Chi Yang',
    footerBackToTop: 'Back to top',
  },
};

let currentLang = 'zh';
let currentTheme = 'light';
let hasManualTheme = false;
let updateNavToggleAria = () => {};

const getSaved = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setSaved = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore storage failures
  }
};

const detectLang = () => (
  navigator.language && navigator.language.toLowerCase().startsWith('zh')
    ? 'zh'
    : 'en'
);

const getCurrentDict = () => i18nDict[currentLang] || i18nDict.zh;

const updateControlLabels = () => {
  const dict = getCurrentDict();
  if (langToggle) {
    langToggle.textContent = currentLang === 'zh' ? 'EN' : '中';
  }
  if (themeToggle) {
    themeToggle.textContent = currentTheme === 'dark'
      ? dict.themeSwitchToLight
      : dict.themeSwitchToDark;
  }
};

const applyLanguage = (lang, { persist = false } = {}) => {
  if (!i18nDict[lang]) {
    return;
  }

  currentLang = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
  const dict = getCurrentDict();

  i18nTextNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (key && dict[key] !== undefined) {
      node.textContent = dict[key];
    }
  });

  i18nHtmlNodes.forEach((node) => {
    const key = node.dataset.i18nHtml;
    if (key && dict[key] !== undefined) {
      node.innerHTML = dict[key];
    }
  });

  i18nAriaNodes.forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    if (key && dict[key] !== undefined) {
      node.setAttribute('aria-label', dict[key]);
    }
  });

  if (i18nMetaNode) {
    const key = i18nMetaNode.dataset.i18nMeta;
    if (key && dict[key] !== undefined) {
      i18nMetaNode.setAttribute('content', dict[key]);
    }
  }

  if (i18nTitleNode) {
    const key = i18nTitleNode.dataset.i18nTitle;
    if (key && dict[key] !== undefined) {
      document.title = dict[key];
    }
  }

  updateNavToggleAria(navMenu ? navMenu.classList.contains('open') : false);
  updateControlLabels();

  if (persist) {
    setSaved(LANG_STORAGE_KEY, lang);
  }
};

const applyTheme = (theme, { persist = false, manual = false } = {}) => {
  if (theme !== 'light' && theme !== 'dark') {
    return;
  }

  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  updateControlLabels();

  if (manual) {
    hasManualTheme = true;
  }
  if (persist) {
    setSaved(THEME_STORAGE_KEY, theme);
  }
};

updateNavToggleAria = (isOpen) => {
  if (!navToggle) {
    return;
  }
  const dict = getCurrentDict();
  const key = isOpen ? 'navToggleCloseAria' : 'navToggleOpenAria';
  navToggle.setAttribute('aria-label', dict[key]);
};

const savedLang = getSaved(LANG_STORAGE_KEY);
const initialLang = i18nDict[savedLang] ? savedLang : detectLang();
applyLanguage(initialLang);

const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = getSaved(THEME_STORAGE_KEY);
if (savedTheme === 'dark' || savedTheme === 'light') {
  hasManualTheme = true;
  applyTheme(savedTheme);
} else {
  applyTheme(colorSchemeQuery.matches ? 'dark' : 'light');
}

if (typeof colorSchemeQuery.addEventListener === 'function') {
  colorSchemeQuery.addEventListener('change', (event) => {
    if (!hasManualTheme) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
} else if (typeof colorSchemeQuery.addListener === 'function') {
  colorSchemeQuery.addListener((event) => {
    if (!hasManualTheme) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const nextLang = currentLang === 'zh' ? 'en' : 'zh';
    applyLanguage(nextLang, { persist: true });
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, { persist: true, manual: true });
  });
}

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
  updateNavToggleAria(false);
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
    updateNavToggleAria(isOpen);
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

  const waitForShellAligned = (shell, { timeoutMs = 420, tolerance = 2 } = {}) => {
    const section = shell.closest('section');
    if (!section) {
      return Promise.resolve();
    }

    const targetTop = Math.max(0, section.offsetTop);
    const startedAt = performance.now();

    return new Promise((resolve) => {
      const checkAligned = () => {
        const currentTop = window.scrollY || window.pageYOffset;
        if (Math.abs(currentTop - targetTop) <= tolerance) {
          resolve();
          return;
        }

        if (performance.now() - startedAt >= timeoutMs) {
          resolve();
          return;
        }

        window.requestAnimationFrame(checkAligned);
      };

      window.requestAnimationFrame(checkAligned);
    });
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
          duration: 0.56,
          ease: 'none',
        }, 0)
        .to(scanLayers, {
          opacity: 0.52,
          duration: 0.12,
          ease: 'none',
        }, 0.42)
        .to(scanOverlay, {
          autoAlpha: 0,
          duration: 0.08,
          ease: 'none',
        }, 0.48);
    });
  };

  const playReverseScanHide = (state) => {
    if (!scanOverlay) {
      gsap.to(state.shell, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.34,
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
          duration: 0.34,
          ease: 'none',
        }, 0)
        .to(state.shell, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.34,
          ease: 'none',
        }, 0)
        .to(scanLayers, {
          opacity: 0.52,
          duration: 0.1,
          ease: 'none',
        }, 0.2)
        .to(scanOverlay, {
          autoAlpha: 0,
          duration: 0.08,
          ease: 'none',
        }, 0.26);
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
        duration: 0.56,
        ease: 'none',
      }, 0)
      .to(state.shell, {
        opacity: 1,
        y: 0,
        filter: 'brightness(1) saturate(1)',
        duration: 0.6,
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
      if (node !== shell) {
        const inactiveState = shellStateMap.get(node);
        if (inactiveState && inactiveState.revealed) {
          hideVisitedShellContentAtStart(inactiveState);
        }
      }
    });

    if (state.revealed) {
      hideVisitedShellContentAtStart(state);
    }

    alignShellToViewport(shell);
    setStageScrollLock(true);

    try {
      if (state.revealed) {
        await playReverseScanHide(state);
        resetShellState(state);
      }

      alignShellToViewport(shell);
      await waitForShellAligned(shell);

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
        if (shell !== targetShell) {
          const inactiveState = shellStateMap.get(shell);
          if (inactiveState && inactiveState.revealed) {
            hideVisitedShellContentAtStart(inactiveState);
          }
        }
      });
      activeShell = targetShell;

      alignShellToViewport(targetShell);
      await waitForShellAligned(targetShell);

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

  const resolveHashTarget = (hash) => {
    if (!hash || !hash.startsWith('#')) {
      return null;
    }
    if (hash === '#top') {
      return topTarget;
    }
    return document.querySelector(`main ${hash}`) || document.querySelector(hash);
  };

  const stageNavigationLinks = [
    ...Array.from(navLinks),
    ...Array.from(heroCtaLinks),
  ];

  stageNavigationLinks.forEach((link) => {
    const hash = link.getAttribute('href');
    const targetSection = resolveHashTarget(hash);
    if (!targetSection) {
      return;
    }

    link.addEventListener('click', (event) => {
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

  const isCompactViewport = () => window.matchMedia('(max-width: 1024px)').matches;
  const getStageTriggerStart = () => (isCompactViewport() ? 'top 72%' : 'top 48%');
  const getStageTriggerEnd = () => (isCompactViewport() ? 'bottom 28%' : 'bottom 48%');

  const ensureCurrentShellVisible = () => {
    if (isProgrammaticNavigation || isStageTransitioning) {
      return;
    }

    const currentIndex = getCurrentShellIndex();
    if (currentIndex < 0) {
      return;
    }

    const shell = stageShellList[currentIndex];
    if (!shell || shell === activeShell) {
      return;
    }

    activateShell(shell);
  };

  let syncShellRaf = null;
  let postSuppressSyncTimer = null;
  const requestShellSyncFromScroll = () => {
    if (syncShellRaf !== null) {
      return;
    }

    syncShellRaf = window.requestAnimationFrame(() => {
      syncShellRaf = null;
      if (performance.now() < suppressScrollTriggerUntil) {
        return;
      }
      ensureCurrentShellVisible();
    });
  };

  const schedulePostSuppressShellSync = () => {
    window.clearTimeout(postSuppressSyncTimer);
    const wait = Math.max(0, suppressScrollTriggerUntil - performance.now()) + 28;
    postSuppressSyncTimer = window.setTimeout(() => {
      ensureCurrentShellVisible();
    }, wait);
  };

  let refreshTimer = null;
  const scheduleScrollTriggerRefresh = (delay = 120, { revealCurrent = false } = {}) => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (revealCurrent) {
        ensureCurrentShellVisible();
      }
    }, delay);
  };

  scheduleScrollTriggerRefresh(180, { revealCurrent: true });
  window.addEventListener('load', () => {
    scheduleScrollTriggerRefresh(220, { revealCurrent: true });
  });
  window.addEventListener('resize', () => {
    scheduleScrollTriggerRefresh(150, { revealCurrent: true });
  });
  window.addEventListener('orientationchange', () => {
    scheduleScrollTriggerRefresh(260, { revealCurrent: true });
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      scheduleScrollTriggerRefresh(180, { revealCurrent: true });
    });
  }
  window.addEventListener('scroll', requestShellSyncFromScroll, { passive: true });

  stageShells.forEach((shell) => {
    ScrollTrigger.create({
      trigger: shell,
      start: getStageTriggerStart,
      end: getStageTriggerEnd,
      invalidateOnRefresh: true,
      onEnter: () => {
        if (performance.now() < suppressScrollTriggerUntil) {
          schedulePostSuppressShellSync();
          return;
        }
        if (isProgrammaticNavigation) {
          return;
        }
        activateShell(shell);
      },
      onEnterBack: () => {
        if (performance.now() < suppressScrollTriggerUntil) {
          schedulePostSuppressShellSync();
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
