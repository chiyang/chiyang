const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('main section[id]');
const reveals = document.querySelectorAll('.reveal');
const stageShells = document.querySelectorAll('.stage-shell');
const progressBar = document.querySelector('.scroll-progress');
const header = document.querySelector('.site-header');
const cursorGlow = document.querySelector('.cursor-glow');
const parallaxNodes = document.querySelectorAll('[data-parallax]');
const scanOverlay = document.querySelector('.scan-overlay');
const topLinks = document.querySelectorAll('a[href="#top"]');
const heroCtaLinks = document.querySelectorAll('.hero-actions a[href^="#"]');
const stageJumpButtons = document.querySelectorAll('.section-jump-btn');
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
    workCard11Body: '提出 MsTargetPeaker，結合深度強化學習與蒙地卡羅樹搜尋，於峰值辨識過程中同步優化峰品質並提升定量穩定性。',
    workCard1Body: '參與毒蛇抗蛇毒血清效力提升研究，涵蓋蛋白體與分析化學協作。',
    workCard2Body: '以變分自編碼器進行質譜峰品質判讀，降低人工檢視成本並提升準確度。',
    workCard3Body: '提出自動化峰值選取管線，結合 2D heatmap 與 CNN，提升蛋白體分析效率。',
    workCard4Meta: '2025-2026 | 國科會計畫（PI）',
    workCard4Body: '使用生成式 AI 協助 signature peptide 與 fragment ion 選擇，加速 assay 設計流程。',
    workCard5Meta: '2021 | Biomedicines',
    workCard5Body: '以機器學習建立新生兒呼吸衰竭插管後死亡風險預測模型，效能優於傳統臨床評分系統。',
    workCard6Meta: '2023-2024 | 國科會計畫（PI）',
    workCard6Body: '建置 one-stop 深度神經網路平台，優化標靶蛋白體 MRM assay 的 signature peptide 選擇流程。',
    workCard7Meta: '2022-2023 | 國科會計畫（PI）',
    workCard7Body: '開發深度強化學習框架與智慧代理人，提升 MRM/Targeted MS 資料分析品質與一致性。',
    workCard8Body: '利用 EV-miRome 全域分析找出 miR-320c，作為轉移性大腸直腸癌偵測與療效追蹤候選標記。',
    workCard10Meta: '2019 | Journal of Translational Medicine',
    workCard10Body: '提出可用於急性心肌梗塞後急性腎損傷早期辨識的循環 miRNA 標記組合，提升臨床預警能力。',
    worksNote: '資料來源：Chang Gung University Academic Capacity Ensemble（Chi Yang Profile）https://pure.lib.cgu.edu.tw/zh/persons/chi-yang/',
    contactKicker: '聯絡方式',
    contactTitle: '聯絡方式',
    contactName: '<strong>姓名：</strong>楊崎 Chi Yang',
    contactRole: '<strong>職稱：</strong>助理研究員',
    contactExpertise: '<strong>研究專長：</strong>人工智慧、蛋白體、質譜學',
    contactHobbies: '<strong>興趣：</strong>跑步、羽球、單車',
    contactEmail: '<strong>Email：</strong><a href="mailto:chiyang@example.edu.tw">chiyang@example.edu.tw</a>',
    contactOffice: '<strong>辦公室：</strong>桃園市龜山區文化一路 259 號（示意）',
    footerCredit: '本網站由 OpenAI Codex 協作生成',
    scrollHintUp: '繼續往上捲動以顯示上一個區段',
    scrollHintDown: '繼續往下捲動以顯示下一個區段',
    footerBackToTop: '回到頂部',
    stageNavTopAria: '切換到頂端區段',
    stageNavUpAria: '切換到上一個區段',
    stageNavDownAria: '切換到下一個區段',
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
    workCard11Body: 'Proposed MsTargetPeaker, combining deep reinforcement learning and Monte Carlo tree search to optimize peak quality and quantification stability during peak identification.',
    workCard1Body: 'Contributed to antivenom potency enhancement research involving proteomics and analytical chemistry collaboration.',
    workCard2Body: 'Used a variational autoencoder to assess MS peak quality, reducing manual review effort and improving accuracy.',
    workCard3Body: 'Proposed an automatic peak-picking pipeline combining 2D heatmap transformation and CNN for targeted proteomics.',
    workCard4Meta: '2025-2026 | NSTC Project (PI)',
    workCard4Body: 'Applying generative AI to assist signature peptide and fragment ion selection for faster MRM assay design.',
    workCard5Meta: '2021 | Biomedicines',
    workCard5Body: 'Developed machine learning models to predict mortality after mechanical intubation in neonates with respiratory failure, outperforming conventional clinical scores.',
    workCard6Meta: '2023-2024 | NSTC Project (PI)',
    workCard6Body: 'Built a one-stop deep neural network platform to optimize signature peptide selection for targeted proteomics MRM assays.',
    workCard7Meta: '2022-2023 | NSTC Project (PI)',
    workCard7Body: 'Developed a deep reinforcement learning framework with intelligent agents for high-quality analysis of MRM/targeted MS datasets.',
    workCard8Body: 'EV-miRome-wide profiling identified miR-320c as a candidate marker for metastatic colorectal cancer detection and therapy-response monitoring.',
    workCard10Meta: '2019 | Journal of Translational Medicine',
    workCard10Body: 'Reported a circulating miRNA signature for early diagnosis of acute kidney injury following acute myocardial infarction.',
    worksNote: 'Source: Chang Gung University Academic Capacity Ensemble (Chi Yang profile): https://pure.lib.cgu.edu.tw/zh/persons/chi-yang/',
    contactKicker: 'Contact',
    contactTitle: 'Contact',
    contactName: '<strong>Name:</strong> Chi Yang',
    contactRole: '<strong>Title:</strong> Assistant Researcher',
    contactExpertise: '<strong>Expertise:</strong> Artificial Intelligence, Proteomics, Mass Spectrometry',
    contactHobbies: '<strong>Interests:</strong> Running, Badminton, Cycling',
    contactEmail: '<strong>Email:</strong><a href="mailto:chiyang@example.edu.tw">chiyang@example.edu.tw</a>',
    contactOffice: '<strong>Office:</strong> No. 259, Wenhua 1st Rd., Guishan Dist., Taoyuan (sample)',
    footerCredit: 'This site was created with OpenAI Codex assistance',
    scrollHintUp: 'Scroll up to reveal the previous section',
    scrollHintDown: 'Scroll down to reveal the next section',
    footerBackToTop: 'Back to top',
    stageNavTopAria: 'Jump to the top section',
    stageNavUpAria: 'Jump to the previous section',
    stageNavDownAria: 'Jump to the next section',
  },
};

let currentLang = 'zh';
let currentTheme = 'light';
let hasManualTheme = false;
let updateNavToggleAria = () => {};
let refreshScrollHintText = () => {};
let refreshStageJumpButtons = () => {};

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
  refreshScrollHintText();
  refreshStageJumpButtons();

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
  const lastStageShell = stageShellList[stageShellList.length - 1] || null;
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
  let topNavigationGuardUntil = -Infinity;
  let topNavigationGuardTimer = null;
  let isStartupSyncPending = true;
  let pendingNavigation = Promise.resolve();
  let hideScrollHint = () => {};
  let lastObservedScrollTop = window.scrollY || window.pageYOffset || 0;
  let lastScrollDirection = 0;
  let pendingDownwardShell = null;
  let pendingDownwardFromShell = null;
  let pendingDownwardStartScrollTop = -Infinity;
  let pendingDownwardBottomReleaseReached = false;
  let downwardStageSettleTimer = null;
  let deferredShellSyncTimer = null;

  const DOWNWARD_STAGE_TRIGGER_RATIO = 0.8;
  const UPWARD_STAGE_TRIGGER_RATIO = 0.15;
  const DEFAULT_STAGE_TRIGGER_RATIO = 0.42;
  const FIRST_STAGE_EARLY_SCROLL_RATIO = 0.4;
  const DOWNWARD_STAGE_CONFIRM_DISTANCE = 56;
  const LONG_STAGE_BOTTOM_BRAKE_OVERFLOW_RATIO = 0.2;
  const LONG_STAGE_BOTTOM_RELEASE_RATIO = 0.18;
  const LONG_STAGE_BOTTOM_SETTLE_GAP = 24;
  const DOWNWARD_STAGE_SETTLE_REGION_RATIO = 0.3;
  const DOWNWARD_STAGE_SETTLE_DELAY_MS = 140;
  const EDGE_SETTLE_TOLERANCE = 12;

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
    if (locked) {
      hideScrollHint();
    }
  };

  const isTopNavigationGuardActive = () => performance.now() < topNavigationGuardUntil;

  const updateScrollDirection = () => {
    const currentTop = window.scrollY || window.pageYOffset || 0;
    const delta = currentTop - lastObservedScrollTop;

    if (Math.abs(delta) > 1) {
      lastScrollDirection = delta > 0 ? 1 : -1;
    }

    lastObservedScrollTop = currentTop;
  };

  const getStageViewportAnchorRatio = () => {
    if (lastScrollDirection > 0) {
      return DOWNWARD_STAGE_TRIGGER_RATIO;
    }
    if (lastScrollDirection < 0) {
      return UPWARD_STAGE_TRIGGER_RATIO;
    }
    return DEFAULT_STAGE_TRIGGER_RATIO;
  };

  const getFirstStageActivationTop = () => {
    if (!firstStageSection) {
      return Infinity;
    }

    const viewportAnchor = window.innerHeight * getStageViewportAnchorRatio();
    const anchorActivationTop = Math.max(0, firstStageSection.offsetTop - viewportAnchor);

    if (!topSection || lastScrollDirection <= 0) {
      return anchorActivationTop;
    }

    const earlyHeroActivationTop = Math.max(0, window.innerHeight * FIRST_STAGE_EARLY_SCROLL_RATIO);
    return Math.min(anchorActivationTop, earlyHeroActivationTop);
  };

  const clearPendingDownwardStageSwitch = () => {
    window.clearTimeout(downwardStageSettleTimer);
    downwardStageSettleTimer = null;
    pendingDownwardShell = null;
    pendingDownwardFromShell = null;
    pendingDownwardStartScrollTop = -Infinity;
    pendingDownwardBottomReleaseReached = false;
  };

  const getShellIndex = (shell) => stageShellList.indexOf(shell);

  const getDownwardStageConfirmDistance = () => DOWNWARD_STAGE_CONFIRM_DISTANCE;

  const needsDownwardStageBottomBrake = (shell) => {
    const section = shell ? shell.closest('section') : null;
    if (!section) {
      return false;
    }

    const overflow = Math.max(0, section.offsetHeight - window.innerHeight);
    return overflow > window.innerHeight * LONG_STAGE_BOTTOM_BRAKE_OVERFLOW_RATIO;
  };

  const hasReachedDownwardStageReleasePoint = (shell) => {
    const section = shell ? shell.closest('section') : null;
    if (!section) {
      return true;
    }

    const remainingScroll = section.offsetTop + section.offsetHeight - (window.scrollY + window.innerHeight);
    const releaseDistance = Math.max(24, window.innerHeight * LONG_STAGE_BOTTOM_RELEASE_RATIO);

    return remainingScroll <= releaseDistance;
  };

  const shouldConfirmDownwardStageSwitch = (fromShell, toShell) => {
    const fromIndex = getShellIndex(fromShell);
    const toIndex = getShellIndex(toShell);

    if (fromIndex < 0 || toIndex < 0 || toIndex <= fromIndex) {
      clearPendingDownwardStageSwitch();
      return true;
    }

    const scrollTop = window.scrollY || window.pageYOffset;
    const confirmDistance = getDownwardStageConfirmDistance(fromShell);
    const requiresBottomBrake = needsDownwardStageBottomBrake(fromShell);
    const hasReachedBottomRelease = hasReachedDownwardStageReleasePoint(fromShell);

    if (pendingDownwardShell !== toShell || pendingDownwardFromShell !== fromShell) {
      pendingDownwardShell = toShell;
      pendingDownwardFromShell = fromShell;
      pendingDownwardStartScrollTop = scrollTop;
      pendingDownwardBottomReleaseReached = !requiresBottomBrake && hasReachedBottomRelease;
      return false;
    }

    if (requiresBottomBrake && !pendingDownwardBottomReleaseReached) {
      if (!hasReachedBottomRelease) {
        return false;
      }

      pendingDownwardBottomReleaseReached = true;
      pendingDownwardStartScrollTop = scrollTop;
      return false;
    }

    if (scrollTop - pendingDownwardStartScrollTop < confirmDistance) {
      return false;
    }

    clearPendingDownwardStageSwitch();
    return true;
  };

  const setTopNavigationGuard = (durationMs = 0) => {
    window.clearTimeout(topNavigationGuardTimer);
    topNavigationGuardTimer = null;

    const enabled = durationMs > 0;
    topNavigationGuardUntil = enabled ? performance.now() + durationMs : -Infinity;

    document.documentElement.classList.toggle('top-navigation-active', enabled);
    document.body.classList.toggle('top-navigation-active', enabled);

    if (!enabled) {
      return;
    }

    hideScrollHint();
    topNavigationGuardTimer = window.setTimeout(() => {
      topNavigationGuardUntil = -Infinity;
      document.documentElement.classList.remove('top-navigation-active');
      document.body.classList.remove('top-navigation-active');
    }, durationMs);
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

  const getShellBottomViewportTop = (shell) => {
    const section = shell ? shell.closest('section') : null;
    if (!section) {
      return null;
    }

    const settleGap = needsDownwardStageBottomBrake(shell) ? LONG_STAGE_BOTTOM_SETTLE_GAP : 0;
    return Math.max(0, section.offsetTop + section.offsetHeight - window.innerHeight + settleGap);
  };

  const getShellBottomOvershootFromViewport = (shell) => {
    const targetTop = getShellBottomViewportTop(shell);
    if (targetTop === null) {
      return null;
    }

    return window.scrollY - targetTop;
  };

  const isShellNearDownwardSettleBoundary = (shell) => {
    const section = shell ? shell.closest('section') : null;
    if (!section) {
      return false;
    }

    const remainingScroll = section.offsetTop + section.offsetHeight - (window.scrollY + window.innerHeight);
    const settleDistance = Math.max(
      DOWNWARD_STAGE_CONFIRM_DISTANCE * 2,
      window.innerHeight * DOWNWARD_STAGE_SETTLE_REGION_RATIO
    );

    return remainingScroll <= settleDistance;
  };

  const getShellTopOvershootFromViewport = (shell) => {
    const section = shell ? shell.closest('section') : null;
    if (!section) {
      return null;
    }

    return section.offsetTop - window.scrollY;
  };

  const shouldSettleShellBottom = (shell) => {
    const overshoot = getShellBottomOvershootFromViewport(shell);
    if (overshoot === null) {
      return false;
    }

    if (overshoot > EDGE_SETTLE_TOLERANCE) {
      return true;
    }

    if (pendingDownwardFromShell !== shell && !isShellNearDownwardSettleBoundary(shell)) {
      return false;
    }

    return overshoot < -EDGE_SETTLE_TOLERANCE;
  };

  const shouldSettleShellTop = (shell) => {
    const overshoot = getShellTopOvershootFromViewport(shell);
    if (overshoot === null) {
      return false;
    }

    return overshoot > EDGE_SETTLE_TOLERANCE;
  };

  const isViewportAboveFirstStage = () => {
    if (!firstStageSection) {
      return false;
    }

    const scrollTop = window.scrollY || window.pageYOffset || 0;
    return scrollTop < firstStageSection.offsetTop - EDGE_SETTLE_TOLERANCE;
  };

  const shouldAutoNavigateToTopFromFirstStage = (shell) => (
    Boolean(topTarget) &&
    shell === firstStageShell &&
    isViewportAboveFirstStage()
  );

  const alignShellBottomToViewport = (shell) => {
    const targetTop = getShellBottomViewportTop(shell);
    if (targetTop === null) {
      return null;
    }

    if (Math.abs(window.scrollY - targetTop) > 2) {
      suppressScrollTriggerUntil = Math.max(suppressScrollTriggerUntil, performance.now() + 240);
      window.scrollTo({
        top: targetTop,
        behavior: 'auto',
      });
    }

    return targetTop;
  };

  const settleActiveShellEdge = (shell, direction) => {
    downwardStageSettleTimer = null;

    if (isProgrammaticNavigation || isStageTransitioning || isTopNavigationGuardActive()) {
      return;
    }

    if (!shell || !activeShell || activeShell !== shell) {
      return;
    }

    if (direction > 0) {
      if (shell === lastStageShell) {
        return;
      }

      if (!shouldSettleShellBottom(shell)) {
        return;
      }

      const targetTop = alignShellBottomToViewport(shell);
      if (targetTop === null) {
        return;
      }

      if (pendingDownwardFromShell === shell) {
        pendingDownwardStartScrollTop = targetTop;
        pendingDownwardBottomReleaseReached = true;
      }
      return;
    }

    if (direction < 0) {
      if (shouldAutoNavigateToTopFromFirstStage(shell)) {
        queueCrossStageNavigation(topTarget);
        return;
      }

      if (!shouldSettleShellTop(shell)) {
        return;
      }

      suppressScrollTriggerUntil = Math.max(suppressScrollTriggerUntil, performance.now() + 240);
      alignShellToViewport(shell);
    }
  };

  const scheduleActiveShellEdgeSettle = () => {
    window.clearTimeout(downwardStageSettleTimer);
    downwardStageSettleTimer = null;

    if (!activeShell || lastScrollDirection === 0) {
      return;
    }

    if (lastScrollDirection > 0 && activeShell === lastStageShell) {
      return;
    }

    const settleShell = activeShell;
    const settleDirection = lastScrollDirection;

    downwardStageSettleTimer = window.setTimeout(() => {
      settleActiveShellEdge(settleShell, settleDirection);
    }, DOWNWARD_STAGE_SETTLE_DELAY_MS);
  };

  const scheduleDeferredShellSync = (delayMs = 24) => {
    window.clearTimeout(deferredShellSyncTimer);

    deferredShellSyncTimer = window.setTimeout(() => {
      deferredShellSyncTimer = null;

      if (isStartupSyncPending || isTopNavigationGuardActive() || isProgrammaticNavigation || isStageTransitioning) {
        return;
      }

      const suppressRemaining = suppressScrollTriggerUntil - performance.now();
      if (suppressRemaining > 0) {
        scheduleDeferredShellSync(suppressRemaining + 24);
        return;
      }

      ensureCurrentShellVisible();
      scheduleActiveShellEdgeSettle();
    }, Math.max(0, delayMs));
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

  const syncViewportToTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'auto',
    });

    document.documentElement.scrollTop = 0;
    if (document.body) {
      document.body.scrollTop = 0;
    }

    if (topAnchor && typeof topAnchor.scrollIntoView === 'function') {
      topAnchor.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'auto',
      });
    }
  };

  const waitForViewportAtTop = ({ timeoutMs = 720, tolerance = 2 } = {}) => {
    const startedAt = performance.now();

    return new Promise((resolve) => {
      const checkViewportTop = () => {
        syncViewportToTop();

        const currentTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        if (currentTop <= tolerance) {
          resolve();
          return;
        }

        if (performance.now() - startedAt >= timeoutMs) {
          resolve();
          return;
        }

        window.requestAnimationFrame(checkViewportTop);
      };

      window.requestAnimationFrame(checkViewportTop);
    });
  };

  const forceViewportToTop = () => {
    syncViewportToTop();

    window.requestAnimationFrame(() => {
      syncViewportToTop();

      window.requestAnimationFrame(() => {
        syncViewportToTop();
      });
    });

    window.setTimeout(() => {
      syncViewportToTop();
    }, 90);

    window.setTimeout(() => {
      syncViewportToTop();
    }, 220);
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

  const clearActiveStageState = ({ resetFirstShell = false } = {}) => {
    stageShells.forEach((shell) => {
      shell.classList.remove('stage-active');
    });
    activeShell = null;

    if (!resetFirstShell || !firstStageShell) {
      return;
    }

    const firstState = shellStateMap.get(firstStageShell);
    if (!firstState) {
      return;
    }

    resetShellState(firstState);
    firstState.revealed = false;
  };

  const activateShell = async (shell, { force = false } = {}) => {
    const state = shellStateMap.get(shell);
    if (!state) {
      return;
    }

    clearPendingDownwardStageSwitch();

    if (isTopNavigationGuardActive()) {
      return;
    }

    if (!force && firstStageShell && firstStageSection && shell === firstStageShell) {
      const scrollTop = window.scrollY || window.pageYOffset;
      const firstStageActivationTop = getFirstStageActivationTop();
      if (scrollTop < firstStageActivationTop - 8) {
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

  const getCurrentShellIndex = () => {
    if (stageShellList.length === 0) {
      return -1;
    }

    const scrollTop = window.scrollY || window.pageYOffset;
    const firstSection = stageShellList[0].closest('section');
    const threshold = 8;
    if (firstSection && scrollTop < firstSection.offsetTop - threshold) {
      return -1;
    }

    for (let index = 0; index < stageShellList.length; index += 1) {
      const shell = stageShellList[index];
      const section = shell.closest('section');
      if (!section) {
        continue;
      }

      const nextShell = stageShellList[index + 1];
      const nextSection = nextShell ? nextShell.closest('section') : null;
      const sectionTop = section.offsetTop;
      const nextTop = nextSection ? nextSection.offsetTop : Infinity;

      if (scrollTop >= sectionTop - threshold && scrollTop < nextTop - threshold) {
        return index;
      }
    }

    return stageShellList.length - 1;
  };

  const getCurrentShellFromViewport = () => {
    if (stageShellList.length === 0) {
      return null;
    }

    const viewportAnchor = window.innerHeight * getStageViewportAnchorRatio();
    const firstSection = stageShellList[0].closest('section');
    if (firstSection) {
      const firstRect = firstSection.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const firstStageActivationTop = getFirstStageActivationTop();
      const shouldPreActivateFirstStage =
        lastScrollDirection > 0 &&
        scrollTop >= firstStageActivationTop - 8 &&
        firstRect.top > viewportAnchor + 8;

      if (shouldPreActivateFirstStage) {
        return stageShellList[0];
      }

      if (firstRect.top > viewportAnchor + 8) {
        return null;
      }
    }

    let containingShell = null;
    let nearestShell = null;
    let nearestDistance = Infinity;

    stageShellList.forEach((shell) => {
      const section = shell.closest('section');
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
        containingShell = shell;
        return;
      }

      const distance = rect.top > viewportAnchor
        ? rect.top - viewportAnchor
        : viewportAnchor - rect.bottom;

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestShell = shell;
      }
    });

    return containingShell || nearestShell;
  };

  const scrollHint = document.createElement('div');
  scrollHint.className = 'scroll-hint';
  scrollHint.setAttribute('aria-hidden', 'true');
  scrollHint.innerHTML = [
    '<span class="scroll-hint-label"></span>',
    '<span class="scroll-hint-arrows">',
    '<span class="scroll-hint-arrow"></span>',
    '<span class="scroll-hint-arrow"></span>',
    '<span class="scroll-hint-arrow"></span>',
    '</span>',
  ].join('');
  document.body.appendChild(scrollHint);

  const scrollHintLabel = scrollHint.querySelector('.scroll-hint-label');
  let scrollHintDirection = '';
  let scrollHintHideTimer = null;
  let lastTouchScrollHintY = null;
  const TOUCH_SCROLL_HINT_THRESHOLD = 10;

  const hasScrollTargetInDirection = (direction) => {
    const currentShell = getCurrentShellFromViewport();
    if (!currentShell) {
      return direction > 0 && Boolean(firstStageShell);
    }
    if (direction < 0) {
      return true;
    }
    return currentShell !== lastStageShell;
  };

  const syncScrollHintText = () => {
    if (!scrollHintLabel || !scrollHintDirection) {
      return;
    }
    const dict = getCurrentDict();
    scrollHintLabel.textContent = scrollHintDirection === 'up'
      ? dict.scrollHintUp
      : dict.scrollHintDown;
  };
  refreshScrollHintText = syncScrollHintText;

  hideScrollHint = () => {
    window.clearTimeout(scrollHintHideTimer);
    scrollHint.classList.remove('is-visible', 'is-up', 'is-down');
    scrollHintDirection = '';
  };

  const showScrollHint = (direction) => {
    if (isStageTransitioning || isProgrammaticNavigation || isStartupSyncPending || isTopNavigationGuardActive()) {
      hideScrollHint();
      return;
    }
    if (!hasScrollTargetInDirection(direction)) {
      hideScrollHint();
      return;
    }

    const nextDirection = direction < 0 ? 'up' : 'down';
    if (scrollHintDirection !== nextDirection) {
      scrollHintDirection = nextDirection;
      scrollHint.classList.toggle('is-up', nextDirection === 'up');
      scrollHint.classList.toggle('is-down', nextDirection === 'down');
      syncScrollHintText();
    }

    scrollHint.classList.add('is-visible');
    window.clearTimeout(scrollHintHideTimer);
    scrollHintHideTimer = window.setTimeout(() => {
      hideScrollHint();
    }, 680);
  };

  const handleScrollHintWheel = (event) => {
    if (Math.abs(event.deltaY) < 1) {
      return;
    }
    showScrollHint(event.deltaY > 0 ? 1 : -1);
  };
  window.addEventListener('wheel', handleScrollHintWheel, { passive: true });

  const resetTouchScrollHintTracking = () => {
    lastTouchScrollHintY = null;
  };

  const handleScrollHintTouchStart = (event) => {
    if (event.touches.length !== 1) {
      resetTouchScrollHintTracking();
      return;
    }

    lastTouchScrollHintY = event.touches[0].clientY;
  };

  const handleScrollHintTouchMove = (event) => {
    if (event.touches.length !== 1) {
      resetTouchScrollHintTracking();
      return;
    }

    const currentY = event.touches[0].clientY;
    if (lastTouchScrollHintY === null) {
      lastTouchScrollHintY = currentY;
      return;
    }

    const deltaY = lastTouchScrollHintY - currentY;
    if (Math.abs(deltaY) < TOUCH_SCROLL_HINT_THRESHOLD) {
      return;
    }

    showScrollHint(deltaY > 0 ? 1 : -1);
    lastTouchScrollHintY = currentY;
  };

  window.addEventListener('touchstart', handleScrollHintTouchStart, { passive: true });
  window.addEventListener('touchmove', handleScrollHintTouchMove, { passive: true });
  window.addEventListener('touchend', resetTouchScrollHintTracking, { passive: true });
  window.addEventListener('touchcancel', resetTouchScrollHintTracking, { passive: true });

  const runCrossStageNavigation = async (targetSection) => {
    if (!targetSection) {
      return;
    }

    const isTopNavigation = targetSection === topTarget || targetSection === topAnchor;
    const targetShell = targetSection.querySelector('.stage-shell');
    const currentIndex = getCurrentShellIndex();
    const currentShell = currentIndex >= 0 ? stageShellList[currentIndex] : activeShell;
    const targetState = targetShell ? shellStateMap.get(targetShell) : null;
    const currentState = currentShell ? shellStateMap.get(currentShell) : null;

    isProgrammaticNavigation = true;
    setStageScrollLock(true);

    try {
      if (!targetShell) {
        if (currentState) {
          await playReverseScanHide(currentState);
          resetShellState(currentState);
          currentState.revealed = false;
        }
        clearActiveStageState({ resetFirstShell: true });
        lastStageSwitchAt = performance.now();
        if (isTopNavigation) {
          const activeElement = document.activeElement;
          if (activeElement instanceof HTMLElement) {
            activeElement.blur();
          }
          setTopNavigationGuard(1800);
          forceViewportToTop();
          await waitForViewportAtTop();
          forceViewportToTop();
          window.setTimeout(() => {
            const firstSectionTop = firstStageSection ? firstStageSection.offsetTop : 0;
            const scrollTop = window.scrollY || window.pageYOffset;
            if (scrollTop <= Math.max(24, firstSectionTop - 8)) {
              clearActiveStageState({ resetFirstShell: true });
              forceViewportToTop();
            }
          }, 180);
        } else {
          window.scrollTo({
            top: Math.max(0, targetSection.offsetTop),
            behavior: 'auto',
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
      if (isTopNavigation) {
        setTopNavigationGuard(1400);
      } else {
        setTopNavigationGuard(0);
      }
      suppressScrollTriggerUntil = performance.now() + (isTopNavigation ? 1600 : 420);
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

  const getStageJumpTarget = (button) => {
    const direction = button.dataset.stageDirection;
    const shell = button.closest('.section-head')?.closest('.stage-shell') || null;
    const shellIndex = getShellIndex(shell);

    if (shellIndex < 0) {
      return null;
    }

    if (direction === 'up') {
      return shellIndex === 0
        ? topTarget
        : stageShellList[shellIndex - 1]?.closest('section') || null;
    }

    if (direction === 'down') {
      return stageShellList[shellIndex + 1]?.closest('section') || null;
    }

    return null;
  };

  refreshStageJumpButtons = () => {
    const dict = getCurrentDict();

    stageJumpButtons.forEach((button) => {
      const targetSection = getStageJumpTarget(button);
      const direction = button.dataset.stageDirection;
      const label = direction === 'up' && targetSection === topTarget
        ? dict.stageNavTopAria
        : direction === 'up'
          ? dict.stageNavUpAria
          : dict.stageNavDownAria;

      button.disabled = !targetSection;
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    });
  };

  stageJumpButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetSection = getStageJumpTarget(button);
      if (!targetSection || button.disabled) {
        return;
      }

      closeNavMenu();
      queueCrossStageNavigation(targetSection);
    });
  });

  refreshStageJumpButtons();

  const ensureCurrentShellVisible = ({ allowTopFallback = true, force = false } = {}) => {
    if (isProgrammaticNavigation || isStageTransitioning || isTopNavigationGuardActive()) {
      return;
    }

    const shell = getCurrentShellFromViewport();
    if (!shell) {
      clearPendingDownwardStageSwitch();

      if (
        firstStageShell &&
        activeShell === firstStageShell &&
        lastScrollDirection < 0 &&
        shouldAutoNavigateToTopFromFirstStage(firstStageShell)
      ) {
        return;
      }

      if (firstStageShell && activeShell === firstStageShell) {
        const firstState = shellStateMap.get(firstStageShell);
        if (firstState) {
          resetShellState(firstState);
          firstState.revealed = false;
        }
        stageShells.forEach((shell) => shell.classList.remove('stage-active'));
        activeShell = null;
        return;
      }
      if (allowTopFallback && firstStageShell && activeShell && activeShell !== firstStageShell) {
        activateShell(firstStageShell, { force: true });
      }
      return;
    }

    const state = shellStateMap.get(shell);
    if (shell === activeShell) {
      if (!(lastScrollDirection > 0 && pendingDownwardFromShell === shell)) {
        clearPendingDownwardStageSwitch();
      }

      if (force && state && !state.revealed) {
        activateShell(shell, { force: true });
      }
      return;
    }

    if (!force && activeShell && lastScrollDirection > 0) {
      const activeIndex = getShellIndex(activeShell);
      const targetIndex = getShellIndex(shell);

      if (targetIndex > activeIndex && !shouldConfirmDownwardStageSwitch(activeShell, shell)) {
        return;
      }
    } else {
      clearPendingDownwardStageSwitch();
    }

    activateShell(shell, { force });
  };

  let syncShellRaf = null;
  const requestShellSyncFromScroll = () => {
    updateScrollDirection();

    if (isTopNavigationGuardActive()) {
      return;
    }

    if (syncShellRaf !== null) {
      return;
    }

    syncShellRaf = window.requestAnimationFrame(() => {
      syncShellRaf = null;
      if (isStartupSyncPending) {
        return;
      }
      if (isTopNavigationGuardActive()) {
        return;
      }
      if (performance.now() < suppressScrollTriggerUntil) {
        scheduleDeferredShellSync(suppressScrollTriggerUntil - performance.now() + 24);
        return;
      }

      window.clearTimeout(deferredShellSyncTimer);
      deferredShellSyncTimer = null;
      ensureCurrentShellVisible();
      scheduleActiveShellEdgeSettle();
    });
  };

  let refreshTimer = null;
  let startupSyncFallbackTimer = null;
  const scheduleScrollTriggerRefresh = (delay = 120, { revealCurrent = false } = {}) => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      if (revealCurrent) {
        suppressScrollTriggerUntil = Math.max(suppressScrollTriggerUntil, performance.now() + 720);
      }
      ScrollTrigger.refresh();
      if (revealCurrent) {
        ensureCurrentShellVisible({ allowTopFallback: false, force: true });
      }
    }, delay);
  };

  const scheduleStartupShellSync = () => {
    window.clearTimeout(startupSyncFallbackTimer);
    isStartupSyncPending = true;

    let triggered = false;
    const releaseStartupSync = () => {
      window.setTimeout(() => {
        isStartupSyncPending = false;
      }, 460);
    };
    const runStartupSync = () => {
      if (triggered) {
        return;
      }
      triggered = true;
      window.removeEventListener('scroll', handleStartupScroll);
      scheduleScrollTriggerRefresh(0, { revealCurrent: true });
      releaseStartupSync();
    };
    const handleStartupScroll = () => {
      runStartupSync();
    };

    window.addEventListener('scroll', handleStartupScroll, { passive: true, once: true });
    startupSyncFallbackTimer = window.setTimeout(runStartupSync, 680);
  };

  window.addEventListener('pageshow', () => {
    scheduleStartupShellSync();
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
