// Decorative motion for the website: a perspective grid behind the hero,
// pointer depth, card tilt with a cursor sheen, scroll reveals and a slow
// dark-mode depth field. Everything here is decoration: it is skipped for
// reduced-motion preferences and coarse pointers, and every effect is built on
// top of the existing colour tokens so light, dark and RTL pages stay in sync.

const TILT_SELECTOR = ".home-case-card, .workflow-figure, .flywheel-diagram";
const REVEAL_SELECTOR =
  ".home-case-card, .guide-entry, .article-section, .workflow-figure";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");
const wideScreen = window.matchMedia("(min-width: 900px)");

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  element.setAttribute("aria-hidden", "true");
  return element;
}

function initializeHeroScene() {
  const hero = document.querySelector(".hero");
  if (hero === null) return;

  const scene = createElement("div", "hero-scene");
  scene.append(
    createElement("div", "hero-scene-plane"),
    createElement("div", "hero-scene-glow"),
  );
  hero.prepend(scene);

  if (!finePointer.matches) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    scene.style.setProperty("--scene-x", currentX.toFixed(3));
    scene.style.setProperty("--scene-y", currentY.toFixed(3));
    frame =
      Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.001
        ? window.requestAnimationFrame(render)
        : 0;
  };

  const schedule = () => {
    if (frame === 0) frame = window.requestAnimationFrame(render);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = clamp(event.clientX / window.innerWidth - 0.5, -0.5, 0.5) * 2;
      targetY = clamp(event.clientY / window.innerHeight - 0.5, -0.5, 0.5) * 2;
      schedule();
    },
    { passive: true },
  );

  document.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    schedule();
  });
}

function initializeTilt() {
  if (!finePointer.matches) return;

  const elements = Array.from(document.querySelectorAll(TILT_SELECTOR));
  if (elements.length === 0) return;

  const states = new Map();
  elements.forEach((element) => {
    element.classList.add("has-tilt");
    states.set(element, { targetX: 0, targetY: 0, x: 0, y: 0 });
  });

  let frame = 0;

  const render = () => {
    let settled = true;
    states.forEach((state, element) => {
      state.x += (state.targetX - state.x) * 0.16;
      state.y += (state.targetY - state.y) * 0.16;
      element.style.setProperty(
        "--tilt-x",
        `${(-state.y * 2.6).toFixed(2)}deg`,
      );
      element.style.setProperty("--tilt-y", `${(state.x * 2.6).toFixed(2)}deg`);
      if (
        Math.abs(state.targetX - state.x) + Math.abs(state.targetY - state.y) >
        0.002
      ) {
        settled = false;
      }
    });
    frame = settled ? 0 : window.requestAnimationFrame(render);
  };

  const schedule = () => {
    if (frame === 0) frame = window.requestAnimationFrame(render);
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest(TILT_SELECTOR)
          : null;

      states.forEach((state, element) => {
        if (element !== target) {
          state.targetX = 0;
          state.targetY = 0;
          element.classList.remove("is-tilting");
          return;
        }
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const offsetX = (event.clientX - rect.left) / rect.width;
        const offsetY = (event.clientY - rect.top) / rect.height;
        state.targetX = clamp(offsetX - 0.5, -0.5, 0.5) * 2;
        state.targetY = clamp(offsetY - 0.5, -0.5, 0.5) * 2;
        element.style.setProperty("--spot-x", `${(offsetX * 100).toFixed(1)}%`);
        element.style.setProperty("--spot-y", `${(offsetY * 100).toFixed(1)}%`);
        element.classList.add("is-tilting");
      });

      schedule();
    },
    { passive: true },
  );

  document.addEventListener("pointerleave", () => {
    states.forEach((state, element) => {
      state.targetX = 0;
      state.targetY = 0;
      element.classList.remove("is-tilting");
    });
    schedule();
  });
}

function initializeReveals() {
  if (typeof IntersectionObserver !== "function") return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        element.classList.add("is-visible");
        observer.unobserve(element);
        // Drop the reveal classes once the transition ends so they cannot
        // override the hover tilt transform later on.
        window.setTimeout(() => {
          element.classList.remove("reveal", "is-visible");
          element.style.removeProperty("--reveal-delay");
        }, 1000);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
    // Only hide what is still below the fold, so a slow observer never blanks
    // content the reader is already looking at.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    const siblings = element.parentElement
      ? Array.from(element.parentElement.children)
      : [];
    const order = siblings.indexOf(element);
    if (order > 0) {
      element.style.setProperty("--reveal-delay", `${(order % 4) * 70}ms`);
    }
    element.classList.add("reveal");
    observer.observe(element);
  });
}

const TOKENS = [
  "0x7f45",
  "call",
  "strcmp",
  "memcpy",
  "push rbp",
  "jmp",
  "xor eax",
  "0x1f",
  "get_pan",
  "0x4000",
  "mov edx",
  "cmp",
  "ret",
  "0x2a8",
];

function initializeDepthField() {
  const canvas = createElement("canvas", "scene-field");
  document.body.append(canvas);
  const context = canvas.getContext("2d");
  if (context === null) {
    canvas.remove();
    return;
  }

  const particles = TOKENS.map((text) => ({
    text,
    depth: 0.2 + Math.random() * 0.8,
    x: Math.random(),
    y: Math.random(),
    drift: 0.004 + Math.random() * 0.008,
  }));

  let width = 0;
  let height = 0;
  let frame = 0;
  let previous = 0;
  let active = false;

  const isDark = () => document.documentElement.dataset.theme === "dark";
  const isVisible = () => document.visibilityState === "visible";

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = (time) => {
    if (!active) return;
    const delta = previous === 0 ? 0 : Math.min(time - previous, 48);
    previous = time;
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.y -= particle.drift * (delta / 1000);
      if (particle.y < -0.06) {
        particle.y = 1.06;
        particle.x = Math.random();
        particle.depth = 0.2 + Math.random() * 0.8;
      }
      const size = 9 + particle.depth * 5;
      const alpha = 0.04 + particle.depth * 0.1;
      context.font = `${size.toFixed(1)}px ui-monospace, "SFMono-Regular", "JetBrains Mono", monospace`;
      context.fillStyle =
        particle.depth > 0.62
          ? `rgba(163, 166, 255, ${alpha.toFixed(3)})`
          : `rgba(138, 143, 152, ${alpha.toFixed(3)})`;
      context.fillText(particle.text, particle.x * width, particle.y * height);
    });

    frame = window.requestAnimationFrame(draw);
  };

  const start = () => {
    if (active || !isDark() || !isVisible()) return;
    resize();
    active = true;
    previous = 0;
    frame = window.requestAnimationFrame(draw);
  };

  const stop = () => {
    active = false;
    if (frame !== 0) window.cancelAnimationFrame(frame);
    frame = 0;
    context.clearRect(0, 0, width, height);
  };

  window.addEventListener("resize", () => {
    if (active) resize();
  });
  document.addEventListener("visibilitychange", () => {
    if (isVisible()) start();
    else stop();
  });
  window.addEventListener("website-theme-change", () => {
    if (isDark()) start();
    else stop();
  });

  start();
}

function initializeScene() {
  if (reduceMotion.matches) return;

  initializeHeroScene();
  initializeTilt();
  initializeReveals();
  // The depth field only suits wide screens; narrow pages keep the grid alone.
  if (wideScreen.matches) initializeDepthField();

  reduceMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    document
      .querySelectorAll(".reveal, .has-tilt, .is-tilting")
      .forEach((element) => {
        element.classList.remove("reveal", "is-visible", "is-tilting");
        element.style.removeProperty("--tilt-x");
        element.style.removeProperty("--tilt-y");
      });
    document.querySelector(".scene-field")?.remove();
    document.querySelector(".hero-scene")?.remove();
  });
}

initializeScene();
