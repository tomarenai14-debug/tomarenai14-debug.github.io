// ===== MAIN APPLICATION CLASS =====
class FragranceApp {
  constructor() {
    this.currentPage = 'home';
    this.isLoading = true;
    this.animations = new Map();
    this.cache = new Map();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.createParticles();
    this.setupScrollAnimations();
    this.simulateLoading();
    this.initializeComponents();
  }

  // ===== LOADING MANAGEMENT =====
  simulateLoading() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        this.isLoading = false;
        this.animatePageLoad();
      }, 500);
    }, 1500);
  }

  animatePageLoad() {
    const activeSection = document.querySelector('.page-section.active');
    activeSection.style.animation = 'fadeInUp 0.8s ease';
    
    // Trigger notification
    this.showNotification('Yonemura Fragranceへようこそ！', 'success');
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Navigation clicks
    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-route')) {
        e.preventDefault();
        const route = e.target.getAttribute('data-route');
        this.navigateTo(route);
      }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', this.throttle(() => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 10));

    // Browser back/forward buttons
    window.addEventListener('popstate', () => {
      const path = window.location.hash.slice(1) || 'home';
      this.navigateTo(path, false);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  // ===== SPA NAVIGATION =====
  navigateTo(page, updateHistory = true) {
    if (this.isLoading) return;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    const targetNav = document.querySelector(`[data-route="${page}"]`);
    if (targetNav) {
      targetNav.classList.add('active');
    }

    // Page transition
    const currentSection = document.querySelector('.page-section.active');
    const targetSection = document.getElementById(page);

    if (currentSection && targetSection && currentSection !== targetSection) {
      this.performPageTransition(currentSection, targetSection);
    }

    // Update URL
    if (updateHistory) {
      history.pushState(null, null, `#${page}`);
    }

    this.currentPage = page;
  }

  performPageTransition(currentSection, targetSection) {
    // Fade out current page
    currentSection.style.opacity = '0';
    currentSection.style.transform = 'translateX(-50px)';
    
    setTimeout(() => {
      currentSection.classList.remove('active');
      targetSection.classList.add('active');
      
      // Fade in new page
      setTimeout(() => {
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateX(0)';
        targetSection.classList.add('page-transition');
        
        // Trigger scroll animations for new page
        this.triggerScrollAnimations();
        
        // Remove transition class after animation
        setTimeout(() => {
          targetSection.classList.remove('page-transition');
        }, 600);
      }, 50);
    }, 300);
  }

  // ===== PARTICLE SYSTEM =====
  createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // ===== SCROLL ANIMATIONS =====
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  triggerScrollAnimations() {
    setTimeout(() => {
      const activeSection = document.querySelector('.page-section.active');
      const animatedElements = activeSection.querySelectorAll('.animate-on-scroll');
      
      animatedElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animated');
        }, index * 100);
      });
    }, 100);
  }

  // ===== COMPONENT INITIALIZATION =====
  initializeComponents() {
    setTimeout(() => {
      this.setupServiceCardAnimations();
      this.setupFormValidation();
      this.setupAdvancedInteractions();
      this.loadDynamicContent();
    }, 2000);
  }

  // ===== SERVICE CARD INTERACTIONS =====
  setupServiceCardAnimations() {
    document.querySelectorAll('.service-card').forEach(card => {
      // Ripple effect on hover
      card.addEventListener('mouseenter', (e) => {
        this.createRippleEffect(card, e);
      });

      // Floating elements
      card.addEventListener('mouseenter', () => {
        this.createFloatingElements(card);
      });

      // Click handler for detailed view
      card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        this.showServiceDetails(serviceType);
      });
    });
  }

  createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: rgba(52, 152, 219, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  createFloatingElements(container) {
    for (let i = 0; i < 3; i++) {
      const float = document.createElement('div');
      float.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: rgba(52, 152, 219, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: floatUp 2s ease-out forwards;
        left: ${Math.random() * 100}%;
        top: 100%;
        z-index: 10;
      `;
      
      container.style.position = 'relative';
      container.appendChild(float);
      
      setTimeout(() => float.remove(), 2000);
    }
  }

  // ===== MODAL SYSTEM =====
  showServiceDetails(serviceType) {
    const serviceData = {
      diffuser: {
        title: '法人向けディフューザー',
        details: `
          <h3>🏢 法人向けディフューザー詳細</h3>
          <div class="service-detail-content">
            <h4>対象業界</h4>
            <ul>
              <li>高級ホテル・旅館</li>
              <li>オフィス・コワーキングスペース</li>
              <li>葬祭場・冠婚葬祭施設</li>
              <li>小売店・ショールーム</li>
            </ul>
            <h4>導入効果</h4>
            <ul>
              <li>ブランド認知度向上</li>
              <li>顧客滞在時間延長</li>
              <li>リピート率向上</li>
              <li>従業員満足度向上</li>
            </ul>
            <h4>料金体系</h4>
            <p>月額 ¥50,000〜（設置場所面積により変動）</p>
          </div>
        `
      },
      subscription: {
        title: 'サブスク小分け香水',
        details: `
          <h3>💝 サブスク小分け香水詳細</h3>
          <div class="service-detail-content">
            <h4>サービス内容</h4>
            <ul>
              <li>毎月3〜5種類の香水をお届け</li>
              <li>各5ml小分けボトル</li>
              <li>香りの解説カード付き</li>
              <li>気に入った香水の購入オプション</li>
            </ul>
            <h4>プラン</h4>
            <ul>
              <li>ライトプラン: ¥2,980/月（3種類）</li>
              <li>スタンダードプラン: ¥4,980/月（5種類）</li>
              <li>プレミアムプラン: ¥7,980/月（5種類+限定品）</li>
            </ul>
          </div>
        `
      },
      welfare: {
        title: '福利厚生×香り',
        details: `
          <h3>🌟 福利厚生×香り詳細</h3>
          <div class="service-detail-content">
            <h4>プログラム内容</h4>
            <ul>
              <li>従業員向け香水体験プログラム</li>
              <li>ストレス軽減のためのアロマセラピー</li>
              <li>チームビルディング香り体験</li>
              <li>香りコンサルティング</li>
            </ul>
            <h4>期待効果</h4>
            <ul>
              <li>ストレス30%軽減</li>
              <li>生産性15%向上</li>
              <li>離職率20%改善</li>
              <li>チームワーク向上</li>
            </ul>
          </div>
        `
      }
    };

    const data = serviceData[serviceType] || { title: 'サービス詳細', details: '<p>詳細情報準備中です。</p>' };
    this.createModal(data.details);
  }

  createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
        ${content}
        <div style="text-align: center; margin-top: 2rem;">
          <button class="cta-button" onclick="this.closest('.modal').remove()" style="background: var(--gradient-secondary); border: none; cursor: pointer;">閉じる</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    return modal;
  }

  closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.remove();
    });
  }

  // ===== FORM VALIDATION =====
  setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validateAndSubmitForm(form);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.type) {
      case 'email':
        isValid = this.isValidEmail(value);
        errorMessage = '有効なメールアドレスを入力してください';
        break;
      case 'text':
        isValid = value.length >= 2;
        errorMessage = '2文字以上入力してください';
        break;
      case 'textarea':
        isValid = value.length >= 10;
        errorMessage = '10文字以上入力してください';
        break;
    }

    this.updateFieldValidation(field, isValid, errorMessage);
    return isValid;
  }

  updateFieldValidation(field, isValid, errorMessage) {
    field.classList.remove('error', 'success');
    field.classList.add(isValid ? 'success' : 'error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message if needed
    if (!isValid && errorMessage) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errorMessage;
      errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.9rem; margin-top: 0.5rem;';
      field.parentNode.appendChild(errorDiv);
    }
  }

  validateAndSubmitForm(form) {
    const formData = new FormData(form);
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let allValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        allValid = false;
      }
    });

    if (allValid) {
      this.submitForm(formData);
    } else {
      this.showNotification('入力内容を確認してください', 'error');
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  submitForm(formData) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      this.showNotification('お問い合わせありがとうございます！3営業日以内にご連絡いたします。', 'success');
      
      // Reset form
      document.getElementById('contactForm').reset();
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Navigate to home
      setTimeout(() => {
        this.navigateTo('home');
      }, 2000);
    }, 1500);
  }

  // ===== NOTIFICATION SYSTEM =====
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // ===== ADVANCED INTERACTIONS =====
  setupAdvancedInteractions() {
    // Enhanced hover effects for all cards
    document.querySelectorAll('.service-card, .case-card').forEach(card => {
      card.addEventListener('mouseenter', this.debounce(() => {
        this.enhanceCardVisuals(card);
      }, 100));
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', this.throttle(() => {
      this.updateParallaxEffect();
    }, 16));

    // Dynamic background color changes
    this.setupDynamicBackgrounds();
  }

  enhanceCardVisuals(card) {
    // Add glow effect
    card.style.boxShadow = '0 20px 60px rgba(52, 152, 219, 0.3)';
    
    // Reset after hover
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    }, { once: true });
  }

  updateParallaxEffect() {
    const scrolled = window.pageYOffset;
    const heroes = document.querySelectorAll('.hero');
    
    heroes.forEach(hero => {
      if (hero.closest('.page-section.active')) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  setupDynamicBackgrounds() {
    const pages = ['home', 'services', 'cases', 'contact'];
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    ];

    pages.forEach((page, index) => {
      const pageElement = document.getElementById(page);
      if (pageElement) {
        const hero = pageElement.querySelector('.hero');
        if (hero) {
          hero.style.background = colors[index];
        }
      }
    });
  }

  // ===== DATA MANAGEMENT =====
  async loadDynamicContent() {
    try {
      // Simulate API calls for dynamic content
      const servicesData = await this.fetchMockData('services');
      const casesData = await this.fetchMockData('cases');
      
      this.updateDynamicElements(servicesData, casesData);
    } catch (error) {
      console.error('Failed to load dynamic content:', error);
      this.showNotification('一部のコンテンツが読み込めませんでした', 'error');
    }
  }

  fetchMockData(type) {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockData = {
          services: {
            stats: { totalClients: 150, satisfaction: 98, years: 5 },
            featured: ['集中力向上', 'ストレス軽減', 'ブランド体験向上']
          },
          cases: {
            totalProjects: 75,
            industries: ['ホテル', 'オフィス', '小売', '医療'],
            avgImprovement: 25
          }
        };
        resolve(mockData[type]);
      }, 500);
    });
  }

  updateDynamicElements(servicesData, casesData) {
    // Add dynamic stats to hero sections
    if (servicesData && servicesData.stats) {
      const homeHero = document.querySelector('#home .hero-content p');
      homeHero.innerHTML += `<br><small>導入実績 ${servicesData.stats.totalClients}社・満足度 ${servicesData.stats.satisfaction}%</small>`;
    }
  }

  // ===== UTILITY FUNCTIONS =====
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ===== PERFORMANCE MONITORING =====
  trackPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track page transitions
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log('Performance entry:', entry);
          });
        });
        observer.observe({ entryTypes: ['navigation', 'paint'] });
      });
    }
  }
}

// ===== UI COMPONENTS CLASS =====
class UIComponents {
  static createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
        ${content}
      </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    return modal;
  }

  static createNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
}

// ===== APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main application
  const app = new FragranceApp();
  
  // Setup performance tracking
  app.trackPerformance();

  // Handle initial route
  const initialRoute = window.location.hash.slice(1) || 'home';
  app.navigateTo(initialRoute, false);

  // Add enhanced pulse effect to CTA buttons
  setTimeout(() => {
    document.querySelectorAll('.cta-button').forEach(btn => {
      btn.classList.add('pulse');
    });
  }, 3000);

  // Setup keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case '1':
          e.preventDefault();
          app.navigateTo('home');
          break;
        case '2':
          e.preventDefault();
          app.navigateTo('services');
          break;
        case '3':
          e.preventDefault();
          app.navigateTo('cases');
          break;
        case '4':
          e.preventDefault();
          app.navigateTo('contact');
          break;
      }
    }
  });

  // Add dynamic form validation styles
  const validationStyles = document.createElement('style');
  validationStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
      border: 2px solid #e74c3c;
      background: rgba(231, 76, 60, 0.1);
    }
    
    .form-group input.success,
    .form-group textarea.success,
    .form-group select.success {
      border: 2px solid #27ae60;
      background: rgba(39, 174, 96, 0.1);
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      animation: fadeIn 0.3s ease;
    }
    
    .service-detail-content {
      text-align: left;
    }
    
    .service-detail-content h4 {
      color: var(--primary-color);
      margin: 1rem 0 0.5rem 0;
      font-size: 1.1rem;
    }
    
    .service-detail-content ul {
      margin-bottom: 1rem;
      padding-left: 1rem;
    }
    
    .service-detail-content li {
      margin: 0.3rem 0;
      color: var(--dark-gray);
    }
  `;
  document.head.appendChild(validationStyles);
});

// ===== ADVANCED ANIMATION CONTROLLER =====
class AnimationController {
  constructor() {
    this.animations = new Map();
    this.init();
  }

  init() {
    this.setupScrollTriggers();
    this.setupHoverAnimations();
    this.setupPageTransitions();
    this.setupCounterAnimations();
  }

  setupScrollTriggers() {
    const sections = document.querySelectorAll('.page-section');
    
    sections.forEach(section => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateSection(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(section);
    });
  }

  animateSection(section) {
    const elements = section.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
        el.classList.add('animated');
      }, index * 100);
    });
  }

  setupHoverAnimations() {
    document.querySelectorAll('.service-card, .case-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.createHoverEffect(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.removeHoverEffect(card);
      });
    });
  }

  createHoverEffect(card) {
    // Add animated border
    const border = document.createElement('div');
    border.style.cssText = `
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: var(--gradient-primary);
      border-radius: 22px;
      z-index: -1;
      animation: borderPulse 2s ease-in-out infinite;
    `;
    card.style.position = 'relative';
    card.appendChild(border);
  }

  removeHoverEffect(card) {
    const border = card.querySelector('div[style*="borderPulse"]');
    if (border) {
      border.remove();
    }
  }

  setupPageTransitions() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes borderPulse {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.02); }
      }
      
      .page-transition-slide {
        animation: slideFromRight 0.6s ease;
      }
      
      @keyframes slideFromRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .fade-transition {
        animation: fadeIn 0.8s ease;
      }
    `;
    document.head.appendChild(style);
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('.result-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target + (element.textContent.includes('%') ? '%' : '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
      }
    }, 16);
  }
}

// ===== DATA MANAGER =====
class DataManager {
  constructor() {
    this.cache = new Map();
    this.apiEndpoints = {
      services: '/api/services',
      cases: '/api/cases',
      contact: '/api/contact'
    };
  }

  async fetchData(endpoint) {
    if (this.cache.has(endpoint)) {
      return this.cache.get(endpoint);
    }

    const mockData = await this.getMockData(endpoint);
    this.cache.set(endpoint, mockData);
    return mockData;
  }

  async getMockData(endpoint) {
    return new Promise(resolve => {
      setTimeout(() => {
        const data = {
          '/api/services': {
            services: [
              {
                id: 'diffuser',
                title: '法人向けディフューザー',
                description: 'プロフェッショナル向けソリューション',
                features: ['24時間対応', '保守サービス', 'カスタマイズ可能'],
                price: '¥50,000〜/月',
                industries: ['ホテル', 'オフィス', '小売', '医療']
              },
              {
                id: 'subscription',
                title: 'サブスク小分け香水',
                description: '個人向け香水体験サービス',
                features: ['月3-5種類', '5ml小分け', '解説カード', '購入オプション'],
                price: '¥2,980〜/月',
                plans: ['ライト', 'スタンダード', 'プレミアム']
              },
              {
                id: 'welfare',
                title: '福利厚生×香り',
                description: '企業向けウェルビーイングプログラム',
                features: ['ストレス軽減', '生産性向上', 'チームビルディング'],
                price: '要相談',
                benefits: ['離職率改善', 'モチベーション向上', '職場環境改善']
              }
            ]
          },
          '/api/cases': {
            cases: [
              {
                id: 1,
                title: 'ホテル導入事例',
                industry: 'ホスピタリティ',
                result: 'リピート率25%向上',
                details: '都心部5つ星ホテルでの成功事例',
                metrics: { repeat: 25, satisfaction: 4.8, duration: '6ヶ月' }
              },
              {
                id: 2,
                title: 'オフィス導入事例',
                industry: 'IT',
                result: '生産性15%向上',
                details: 'オープンオフィスでの集中力向上プログラム',
                metrics: { productivity: 15, stress: -30, duration: '3ヶ月' }
              }
            ]
          }
        };
        resolve(data[endpoint] || {});
      }, 300);
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
  
  // Show user-friendly error message
  if (window.app && typeof window.app.showNotification === 'function') {
    window.app.showNotification('申し訳ありません。エラーが発生しました。', 'error');
  }
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  
  if (window.app && typeof window.app.showNotification === 'function') {
    window.app.showNotification('通信エラーが発生しました。', 'error');
  }
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
  if ('performance' in window) {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Measure page size
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      console.log(`Transfer size: ${navigation.transferSize} bytes`);
      console.log(`DOM content loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
    }
  }
});

// ===== GLOBAL UTILITIES =====
window.app = null; // Will be set by the main application

// Expose utilities globally for debugging
window.debugUtils = {
  clearCache: () => window.app && window.app.cache && window.app.cache.clear(),
  showAllAnimations: () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('animated');
    });
  },
  toggleParticles: () => {
    const particles = document.getElementById('particles');
    particles.style.display = particles.style.display === 'none' ? 'block' : 'none';
  }
};
