/**
 * PowerX - Enhanced UI Interactions
 * Minimal, performant JavaScript
 */

document.addEventListener("DOMContentLoaded", function() {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const header = document.querySelector(".header");
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle("active", isMenuOpen);
    navLinks.classList.toggle("active", isMenuOpen);
    menuToggle.setAttribute("aria-expanded", isMenuOpen);
    
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    
    if (isMenuOpen) {
      setTimeout(() => {
        const firstLink = navLinks.querySelector("a");
        if (firstLink) firstLink.focus();
      }, 100);
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", toggleMenu);
    
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });
    
    document.addEventListener("click", (e) => {
      if (isMenuOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
    
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // Header scroll effect
  let lastScrollY = window.scrollY;
  
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    
    lastScrollY = currentScrollY;
  }, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Modal functionality
  const joinWaitlistBtns = document.querySelectorAll("#joinWaitlistBtn, #joinWaitlistBtn2");
  const formModal = document.getElementById("formModal");
  const closeModalBtn = document.getElementById("closeModal");

  function openModal() {
    if (formModal) {
      formModal.classList.add("active");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        closeModalBtn.focus();
      }, 100);
    }
  }

  function closeModalFn() {
    if (formModal) {
      formModal.classList.remove("active");
      document.body.style.overflow = "";
      if (joinWaitlistBtns[0]) { joinWaitlistBtns[0].focus(); }
    }
  }

  joinWaitlistBtns.forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  if (closeModalBtn && formModal) {
    closeModalBtn.addEventListener("click", closeModalFn);
    formModal.addEventListener("click", (e) => {
      if (e.target === formModal) {
        closeModalFn();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && formModal.classList.contains("active")) {
        closeModalFn();
      }
    });
  }

  // Button ripple effect
  document.querySelectorAll(".btn, .call-btn").forEach(button => {
    button.addEventListener("mousedown", function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
      `;
      
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframe
  if (!document.querySelector("#ripple-style")) {
    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeInElements = document.querySelectorAll(
    ".benefit-card, .contact-item, .product-card, .gallery-item, .mission-box, .eco-badge"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });
});


