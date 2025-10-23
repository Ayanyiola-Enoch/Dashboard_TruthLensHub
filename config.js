tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1173d4",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E1E1E",
        "text-light": "#1F2937",
        "text-dark": "#E5E7EB",
        "subtle-light": "#6B7280",
        "subtle-dark": "#9CA3AF",
        "border-light": "#E5E7EB",
        "border-dark": "#374151",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: "Inter",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
};

/* filepath: c:\Users\USER\Documents\Mobile Dev. Works\TruthLens Dashboard\config.js */
// Global API Configuration
const BASE_URL = "https://truthlenshub-backend.onrender.com";

// API Endpoints
const API_ENDPOINTS = {
  TEXT_DETECT: `${BASE_URL}/api/text/detect`,
  IMAGE_DETECT: `${BASE_URL}/api/image/detect`,
  VIDEO_DETECT: `${BASE_URL}/api/video/detect`,
  WEBSITE_DETECT: `${BASE_URL}/api/website/detect`,
};

// Global abort controller for canceling requests
let currentAbortController = null;

// Sidebar and Mobile Navigation Management
function initializeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const toggleIcon = document.getElementById("toggleIcon");

  // Desktop sidebar toggle functionality
  if (toggleBtn && sidebar && toggleIcon) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      toggleIcon.textContent = sidebar.classList.contains("collapsed")
        ? "menu"
        : "menu_open";
    });
  }

  // Create mobile toggle button at top right (only visible on mobile)
  const mobileToggle = document.createElement("button");
  mobileToggle.id = "mobileToggle";
  mobileToggle.className =
    "fixed top-4 right-4 z-[1000] text-cyan-400 hover:text-cyan-300 transition-all items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/50 md:hidden";
  mobileToggle.innerHTML = '<span class="material-icons">menu</span>';
  document.body.appendChild(mobileToggle);

  // Create mobile navigation menu
  const mobileNav = document.createElement("div");
  mobileNav.className = "mobile-nav";
  mobileNav.id = "mobileNav";

  // Get current page for active state
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  mobileNav.innerHTML = `
        <div class="mobile-nav-header">
            <div class="flex items-center">
                <span class="material-icons text-cyan-400 text-3xl mr-2">remove_red_eye</span>
                <h1 class="text-xl font-bold text-cyan-400">TruthLensHub</h1>
            </div>
        </div>
        <nav>
            <a href="index.html" class="${
              currentPage === "index.html" || currentPage === "" ? "active" : ""
            }">
                <span class="material-icons">dashboard</span>
                <span>Dashboard</span>
            </a>
            <a href="image-upload.html" class="${
              currentPage === "image-upload.html" ? "active" : ""
            }">
                <span class="material-icons">image</span>
                <span>Image Analysis</span>
            </a>
            <a href="text-analysis.html" class="${
              currentPage === "text-analysis.html" ? "active" : ""
            }">
                <span class="material-icons">article</span>
                <span>Text Analysis</span>
            </a>
            <a href="video-upload.html" class="${
              currentPage === "video-upload.html" ? "active" : ""
            }">
                <span class="material-icons">videocam</span>
                <span>Video Analysis</span>
            </a>
            <a href="website-analysis.html" class="${
              currentPage === "website-analysis.html" ? "active" : ""
            }">
                <span class="material-icons">link</span>
                <span>Website Analysis</span>
            </a>
            <a href="#" style="margin-top: 2rem; border-top: 1px solid rgba(6, 182, 212, 0.3); padding-top: 1rem;">
                <span class="material-icons">logout</span>
                <span>Logout</span>
            </a>
        </nav>
    `;

  document.body.appendChild(mobileNav);

  // Check if mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Mobile toggle - open/close menu with same button
  mobileToggle.addEventListener("click", () => {
    const isActive = mobileNav.classList.contains("active");

    if (isActive) {
      // Close menu
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
      mobileToggle.innerHTML = '<span class="material-icons">menu</span>';
    } else {
      // Open menu
      mobileNav.classList.add("active");
      document.body.style.overflow = "hidden";
      mobileToggle.innerHTML = '<span class="material-icons">close</span>';
    }
  });

  // Close when clicking a link
  const navLinks = mobileNav.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
      mobileToggle.innerHTML = '<span class="material-icons">menu</span>';
    });
  });

  // Close when clicking outside (on the background)
  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
      mobileToggle.innerHTML = '<span class="material-icons">menu</span>';
    }
  });

  // Handle escape key to close menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
      mobileToggle.innerHTML = '<span class="material-icons">menu</span>';
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      // Close mobile nav on desktop
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
      mobileToggle.innerHTML = '<span class="material-icons">menu</span>';
    }
  });
}

// Call this when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSidebar);
} else {
  initializeSidebar();
}
