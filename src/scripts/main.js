/* ==========================================================================
   Portfolio — Theme Toggle, Mobile Nav, Projects Carousel, Scroll Animations
   Vanilla JavaScript — zero dependencies.
   ========================================================================== */

// ---- Theme Toggle ----
const THEME_KEY = "portfolio-theme";

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

// Apply theme before paint to prevent flash
applyTheme(getPreferredTheme());

document.addEventListener("DOMContentLoaded", () => {
  // Re-apply theme in case button wasn't rendered yet
  applyTheme(getPreferredTheme());

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  // =========================================================================
  // ---- Mobile Navigation (Solid Backdrop, No Overlaps) ----
  // =========================================================================
  const nav = document.querySelector(".nav");
  const menuBtn = document.getElementById("nav-menu-btn");
  const navLinks = document.getElementById("nav-links");

  function closeMobileNav() {
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      if (nav) nav.classList.remove("menu-open");
      document.body.classList.remove("nav-open");
      if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", "false");
      }
    }
  }

  function openMobileNav() {
    if (navLinks) {
      navLinks.classList.add("open");
      if (nav) nav.classList.add("menu-open");
      document.body.classList.add("nav-open");
      if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", "true");
      }
    }
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains("open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileNav();
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileNav();
      }
    });

    // Close if clicking outside the nav while open
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("open") && !nav.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  // =========================================================================
  // ---- Smooth scroll for anchor links with Fixed Header Offset ----
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navHeight = 72; // 64px navbar + 8px breathing space
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL hash without abrupt scroll jump
        history.pushState(null, "", id);
      }
    });
  });

  // =========================================================================
  // ---- Projects Carousel (3 Cards per View, Swipe & Drag Gestures) ----
  // =========================================================================
  const track = document.getElementById("projects-track");
  const prevBtn = document.getElementById("proj-prev-btn");
  const nextBtn = document.getElementById("proj-next-btn");
  const counterEl = document.getElementById("projects-counter");
  const dotsContainer = document.getElementById("projects-dots");

  if (track) {
    const cards = Array.from(track.querySelectorAll(".project-card"));
    const totalProjects = cards.length;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let scrollTimeout;

    // Helper: calculate how many cards are visible in one screen/page
    function getMetrics() {
      if (!cards.length) return { cardsPerPage: 3, cardWidth: 320, stepSize: 320, totalPages: 1 };
      const trackWidth = track.clientWidth;
      const firstCardWidth = cards[0].offsetWidth;
      const gap = 24; // 1.5rem
      let cardsPerPage = 1;

      if (window.innerWidth > 1024) {
        cardsPerPage = 3;
      } else if (window.innerWidth > 680) {
        cardsPerPage = 2;
      } else {
        cardsPerPage = 1;
      }

      const stepSize = (firstCardWidth + gap) * cardsPerPage;
      const totalPages = Math.ceil(totalProjects / cardsPerPage);

      return { trackWidth, firstCardWidth, gap, cardsPerPage, stepSize, totalPages };
    }

    // Render navigation dots
    function renderDots() {
      if (!dotsContainer) return;
      const { totalPages } = getMetrics();
      dotsContainer.innerHTML = "";

      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("button");
        dot.className = `projects__dot ${i === 0 ? "active" : ""}`;
        dot.setAttribute("type", "button");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Go to slide ${i + 1} of ${totalPages}`);
        dot.dataset.page = String(i);

        dot.addEventListener("click", () => {
          goToPage(i);
        });

        dotsContainer.appendChild(dot);
      }
    }

    // Scroll directly to a specific page
    function goToPage(pageIndex) {
      const { cardsPerPage, firstCardWidth, gap, totalPages } = getMetrics();
      const targetCardIndex = Math.min(pageIndex * cardsPerPage, totalProjects - 1);
      const targetCard = cards[targetCardIndex];

      if (targetCard) {
        const scrollTarget = targetCard.offsetLeft - track.offsetLeft;
        track.scrollTo({
          left: scrollTarget,
          behavior: "smooth",
        });
      }
    }

    // Update Counter ("1–3 of 9") and active dot based on current scroll position
    function updateCarouselState() {
      const { cardsPerPage, totalPages } = getMetrics();
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;

      // Find the card currently closest to the left edge
      let activeCardIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          activeCardIndex = index;
        }
      });

      const currentPage = Math.min(
        Math.floor(activeCardIndex / cardsPerPage),
        totalPages - 1
      );

      // Update counter text
      if (counterEl) {
        if (cardsPerPage > 1) {
          const startNum = Math.min(activeCardIndex + 1, totalProjects);
          const endNum = Math.min(activeCardIndex + cardsPerPage, totalProjects);
          counterEl.textContent = `${startNum}–${endNum} of ${totalProjects}`;
        } else {
          counterEl.textContent = `Project ${activeCardIndex + 1} of ${totalProjects}`;
        }
      }

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll(".projects__dot");
        dots.forEach((dot, idx) => {
          dot.classList.toggle("active", idx === currentPage);
        });
      }

      // Update arrow button disabled state
      if (prevBtn) {
        prevBtn.disabled = scrollLeft <= 10;
      }
      if (nextBtn) {
        nextBtn.disabled = scrollLeft >= maxScroll - 10;
      }
    }

    // Arrow button click handlers
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const { stepSize } = getMetrics();
        track.scrollBy({ left: -stepSize, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const { stepSize } = getMetrics();
        track.scrollBy({ left: stepSize, behavior: "smooth" });
      });
    }

    // Scroll listener with throttle
    track.addEventListener(
      "scroll",
      () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateCarouselState, 50);
      },
      { passive: true }
    );

    // Mouse Drag support on desktop
    track.addEventListener("mousedown", (e) => {
      // Don't drag if clicking links or interactive elements
      if (e.target.closest("a, button")) return;
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
      track.classList.add("is-dragging");
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag speed multiplier
      track.scrollLeft = scrollStart - walk;
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove("is-dragging");
      updateCarouselState();
    });

    // Keyboard navigation (Arrow keys when focused on track)
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const { stepSize } = getMetrics();
        track.scrollBy({ left: -stepSize, behavior: "smooth" });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const { stepSize } = getMetrics();
        track.scrollBy({ left: stepSize, behavior: "smooth" });
      }
    });

    // Recompute on window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderDots();
        updateCarouselState();
      }, 100);
    });

    // Initial setup
    renderDots();
    updateCarouselState();
  }

  // =========================================================================
  // ---- Scroll-in Animation ----
  // =========================================================================
  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("visible"));
  }
});
