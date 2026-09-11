/**
 * Modern Portfolio Website Logic & Interactions
 * Author: Aditya Singh
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Project Data Store for Modal Case Studies ---
  const projectsData = {
    1: {
      title: 'FinFlow — AI Financial Intelligence & Portfolio Engine',
      category: 'FinTech SaaS Platform',
      image: 'assets/images/project1.jpg',
      status: 'Production Ready',
      description: 'FinFlow is an institutional-grade financial intelligence platform designed to aggregate multi-brokerage balances, run predictive Monte Carlo simulations for cash flow runway, and surface automated tax optimization insights for modern tech enterprises and high-net-worth investors.',
      highlights: [
        'Real-time WebSocket market data integration delivering sub-50ms pricing updates',
        'Complex interactive SVG and canvas charting pipelines supporting 100,000+ continuous data points',
        'End-to-end type safety across backend microservices with GraphQL and TypeScript',
        'PCI-DSS compliant data encryption at rest and in transit'
      ],
      tags: ['TypeScript', 'React.js', 'Node.js', 'PostgreSQL', 'WebSockets', 'Tailwind']
    },
    2: {
      title: 'AuraHealth — Telehealth & Circadian Sleep Architecture',
      category: 'Mobile & Health Tech',
      image: 'assets/images/project2.jpg',
      status: 'App Store Featured',
      description: 'AuraHealth is a holistic digital health companion that synchronizes with smart wearables to compute circadian rhythm scores, guide personalized soundscapes, and deliver evidence-based cognitive behavioral therapy exercises for deeper restorative sleep.',
      highlights: [
        'Proprietary sleep debt analysis algorithm processing biometric telemetry',
        'Ultra-low power background audio playback engine using native audio buffers',
        'Accessible, high-contrast dark and calming color themes rated AAA compliant',
        'Over 120,000 active monthly wellness sessions logged'
      ],
      tags: ['React Native', 'TypeScript', 'GraphQL', 'Python', 'FastAPI', 'Figma UI/UX']
    },
    3: {
      title: 'PulseCommerce — High-End Editorial E-Commerce Storefront',
      category: 'Modern Web Application',
      image: 'assets/images/project3.jpg',
      status: 'Global Launch',
      description: 'An artfully crafted digital shopping destination for luxury home goods and modernist architecture furnishings. Built on a headless architecture delivering instant instantaneous page transitions and effortless checkout flows.',
      highlights: [
        'Sub-800ms First Contentful Paint globally via edge caching & image optimization',
        'Fluid checkout integration with Stripe Elements and localized currency conversion',
        'Intuitive multi-faceted filtering for textures, artisans, and room dimensions',
        '40% increase in checkout conversion compared to legacy monolith platform'
      ],
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Stripe API', 'Redis', 'Vercel Edge']
    },
    4: {
      title: 'DevPulse — Microservices Observability & Latency Tracing',
      category: 'Developer Tooling & Cloud',
      image: 'assets/images/project4.jpg',
      status: 'Open Source / Enterprise',
      description: 'DevPulse is a distributed infrastructure monitor that maps live microservice network topologies, traces request hops across container clusters, and utilizes heuristic anomaly detection to preempt production outages.',
      highlights: [
        'Live topology graph rendering using WebGL shaders for silky smooth 60fps interaction',
        'Zero-overhead eBPF kernel tracing agents providing actionable distributed traces',
        'Configurable automated alerts via Webhooks, Slack, and PagerDuty',
        'Reduces Mean Time to Resolution (MTTR) by an average of 54%'
      ],
      tags: ['Go (Golang)', 'TypeScript', 'Prometheus', 'Docker', 'Kubernetes', 'gRPC']
    }
  };

  // --- Dynamic Year in Footer ---
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --- Toast Notification System ---
  const toastContainer = document.getElementById('toast-container');

  function showToast(title, message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');

    const iconSvg = type === 'success'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Trigger reflow for CSS animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove toast
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // --- Light / Dark Theme Toggler ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('ar_theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If user prefers dark, apply dark
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ar_theme', newTheme);

      showToast(
        newTheme === 'dark' ? 'Dark Theme Activated' : 'Light Theme Activated',
        `Switched visual appearance to ${newTheme} mode.`,
        'success'
      );
    });
  }

  // --- Sticky Header & Active Nav Scroll Spy ---
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header background toggle
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy for nav links
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Back to top button visibility
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
      if (scrollY > 450) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // --- Back To Top Action ---
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Mobile Menu Drawer ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Animated Numbers Counter on Viewport Entry ---
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1600; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.ceil(current);
            }
          }, stepTime);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // --- Skill Progress Bars Animation ---
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // --- Filterable Projects Grid ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });

  // --- Project Modal Lightbox Logic ---
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCategory = document.getElementById('modal-category');
  const modalImage = document.getElementById('modal-image');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalTags = document.getElementById('modal-tags');
  const modalDemoBtn = document.getElementById('modal-demo-btn');
  let activeModalProjectId = null;

  function openProjectModal(id) {
    const project = projectsData[id];
    if (!project || !modalOverlay) return;

    activeModalProjectId = id;
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDesc.textContent = project.description;
    modalImage.src = project.image;
    modalImage.alt = `${project.title} Preview`;

    // Populate highlights
    modalHighlights.innerHTML = '';
    project.highlights.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${item}</span>
      `;
      modalHighlights.appendChild(li);
    });

    // Populate tags
    modalTags.innerHTML = '';
    project.tags.forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'tag';
      tagEl.textContent = tag;
      modalTags.appendChild(tagEl);
    });

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModalProjectId = null;
  }

  // Open modal trigger buttons
  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      openProjectModal(id);
    });
  });

  // Demo preview trigger buttons in project cards
  document.querySelectorAll('.demo-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const project = projectsData[id];
      if (project) {
        showToast('Launching Interactive Sandbox', `Opening live runtime simulation for ${project.title.split('—')[0]}...`, 'success');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // Modal demo button click
  if (modalDemoBtn) {
    modalDemoBtn.addEventListener('click', () => {
      if (activeModalProjectId && projectsData[activeModalProjectId]) {
        const title = projectsData[activeModalProjectId].title.split('—')[0];
        showToast('Connecting Sandbox Environment', `Connecting to cloud instance for ${title}. Live sandbox is ready!`, 'success');
      }
    });
  }

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --- Contact Form Client-Side Validation & Submission ---
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameGroup = document.getElementById('group-name');
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = document.getElementById('group-email');
      if (!validateEmail(emailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = document.getElementById('group-message');
      if (messageInput.value.trim().length < 10) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      // Disable button & show spinner state
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending Message...';

      // Simulate asynchronous server dispatch
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;
        contactForm.reset();

        showToast(
          'Message Delivered!',
          'Thank you for reaching out, Aditya will review your message and reply within 24 hours.',
          'success'
        );
      }, 900);
    });

    // Real-time error clearance on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group && group.classList.contains('has-error')) {
            group.classList.remove('has-error');
          }
        });
      }
    });
  }

  // --- Curriculum Vitae Download Button Simulation ---
  const cvBtn = document.getElementById('download-cv-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(
        'Downloading Curriculum Vitae',
        'Aditya_Singh_Senior_FullStack_Engineer_Resume.pdf prepared for download.',
        'success'
      );
    });
  }
});
