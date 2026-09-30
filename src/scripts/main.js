/* ==========================================================================
   Portfolio — Theme Toggle, Mobile Nav, Scroll Animations
   No external libraries.
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
  // Re-apply in case button wasn't rendered yet
  applyTheme(getPreferredTheme());

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  // ---- Mobile Navigation ----
  const menuBtn = document.getElementById("nav-menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Scroll-in Animation ----
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
    // Fallback: just show everything
    fadeEls.forEach((el) => el.classList.add("visible"));
  }

  // ---- Smooth scroll for anchor links (progressive) ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL without scroll jump
        history.pushState(null, "", id);
      }
    });
  });
});
