/**
 * MY CODING JOURNEY — CLIENT INTERACTIONS & VISUALIZATIONS
 * Vanilla JavaScript (ES6+) — Zero framework dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initMobileMenu();
  initBackToTop();
  initStatCounters();
  initAchievementFilters();
  initTimelineFilters();
  initStoryModals();
  initBeforeNowToggle();
  initCharts();
});

/* ==========================================================================
   1. SCROLL PROGRESS BAR & NAVBAR SCROLL STATE
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  const navbar = document.querySelector('.navbar-wrapper');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (progressBar && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollTop > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE HAMBURGER NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  if (!hamburgerBtn || !mobileDrawer) return;

  hamburgerBtn.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    hamburgerBtn.classList.toggle('is-active');
    mobileDrawer.classList.toggle('open');
  });

  // Close drawer on link click
  const mobileLinks = mobileDrawer.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.classList.remove('is-active');
      mobileDrawer.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   4. STAT COUNTERS (SMOOTH NUMBER TICKING)
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetValue = parseInt(counter.dataset.target, 10);
        if (isNaN(targetValue)) return;

        animateValue(counter, 0, targetValue, 1500);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease-out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    obj.textContent = Math.floor(easeOut * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.textContent = end;
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   5. ACHIEVEMENTS FILTERING
   ========================================================================== */
function initAchievementFilters() {
  const filterPills = document.querySelectorAll('.ach-filter-pill');
  const achievementCards = document.querySelectorAll('.achievement-card');
  const emptyState = document.getElementById('emptyFilterState');

  if (!filterPills.length || !achievementCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      let visibleCount = 0;

      achievementCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (filter === 'all' || cardCategory === filter) {
          card.style.display = 'flex';
          card.classList.add('animate-fade-in');
          visibleCount++;
        } else {
          card.style.display = 'none';
          card.classList.remove('animate-fade-in');
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}

/* ==========================================================================
   6. TIMELINE YEAR / CATEGORY FILTERING & SMOOTH JUMP
   ========================================================================== */
function initTimelineFilters() {
  const timelinePills = document.querySelectorAll('.timeline-filter-pill');
  const timelineRows = document.querySelectorAll('.timeline-item-row');

  if (!timelinePills.length || !timelineRows.length) return;

  timelinePills.forEach(pill => {
    pill.addEventListener('click', () => {
      timelinePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterYear = pill.dataset.year;

      timelineRows.forEach(row => {
        const rowYear = row.dataset.year;
        if (filterYear === 'all' || rowYear === filterYear) {
          row.style.display = 'grid';
          row.classList.add('animate-fade-in');
        } else {
          row.style.display = 'none';
          row.classList.remove('animate-fade-in');
        }
      });
    });
  });
}

/* ==========================================================================
   7. UNIVERSAL STORY MODAL (DEEP DIVE POPUP)
   ========================================================================== */
function initStoryModals() {
  const backdrop = document.getElementById('universalModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalContent = document.getElementById('modalContent');

  if (!backdrop || !closeBtn || !modalContent) return;

  // Global helper to open modal with custom HTML
  window.openStoryModal = function(htmlContent) {
    modalContent.innerHTML = htmlContent;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Attach modal trigger listeners for milestones
  document.querySelectorAll('.open-milestone-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const milestoneId = btn.dataset.milestoneId;
      renderMilestoneModal(milestoneId);
    });
  });

  // Attach modal trigger listeners for projects
  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.dataset.projectId;
      renderProjectModal(projectId);
    });
  });

  // Attach modal trigger listeners for achievements
  document.querySelectorAll('.open-achievement-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const achId = btn.dataset.achId;
      renderAchievementModal(achId);
    });
  });
}

function renderMilestoneModal(milestoneId) {
  // Find card in DOM or construct structured breakdown
  const card = document.querySelector(`[data-milestone-id="${milestoneId}"]`);
  const title = card ? card.querySelector('.milestone-title, .node-title')?.textContent : 'Milestone Reflection';
  const tagline = card ? card.querySelector('.milestone-tagline, .node-tagline')?.textContent : '';
  const desc = card ? card.querySelector('.milestone-desc')?.textContent : 'Deep dive into this inflection point of my learning curve.';
  const techPills = card ? card.querySelectorAll('.tech-tag, .mini-tech-pill') : [];
  
  let techHtml = '';
  techPills.forEach(pill => {
    techHtml += `<span class="tech-chip-pill">${pill.textContent}</span> `;
  });

  const content = `
    <h2>${escapeHtml(title)}</h2>
    <p class="modal-sub">${escapeHtml(tagline)}</p>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-compass"></i> THE ARCHITECTURAL CONTEXT</h4>
      <p>${escapeHtml(desc)}</p>
    </div>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-code"></i> KEY TOOLS & PRACTICES ENGAGED</h4>
      <div style="margin-top: 0.5rem; display: flex; gap: 0.4rem; flex-wrap: wrap;">
        ${techHtml || '<span class="tech-chip-pill">Core Engineering</span>'}
      </div>
    </div>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-lightbulb"></i> WHAT THIS CHANGED IN MY INTELLECTUAL MODEL</h4>
      <p>Before reaching this milestone, programming felt like stringing together syntax commands until something worked. Passing through this phase shifted my mental model toward thinking in terms of system boundaries, state invariants, data lifecycles, and testability.</p>
    </div>
  `;

  window.openStoryModal(content);
}

function renderProjectModal(projectId) {
  const card = document.querySelector(`[data-project-id="${projectId}"]`);
  const title = card ? card.querySelector('.project-card-title, .project-title')?.textContent : 'Project Deep Dive';
  const tagline = card ? card.querySelector('.project-card-tagline, .project-tagline')?.textContent : '';
  
  const content = `
    <h2>${escapeHtml(title)}</h2>
    <p class="modal-sub">${escapeHtml(tagline)}</p>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-bullseye"></i> THE PROBLEM SPACE</h4>
      <p>I built this project to move past simple tutorials and tackle an actual friction point. In software engineering, code quality is only meaningful if it solves a genuine operational need or provides demonstrable performance gains.</p>
    </div>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-fire-extinguisher"></i> THE HARDEST BUG ENCOUNTERED</h4>
      <p>During initial stress testing, requests with concurrent state mutations were triggering race conditions and stale cache reads. Isolating this required writing deterministic integration tests and restructuring transaction isolation levels.</p>
    </div>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-chart-line"></i> IMPACT & TAKEAWAYS</h4>
      <p>This project solidified my instincts in decoupling business logic from presentation, managing state transitions predictably, and writing defensive code with proper boundary validations.</p>
    </div>
  `;

  window.openStoryModal(content);
}

function renderAchievementModal(achId) {
  const card = document.querySelector(`[data-ach-id="${achId}"]`);
  const title = card ? card.querySelector('.ach-title')?.textContent : 'Achievement Record';
  const desc = card ? card.querySelector('.ach-desc')?.textContent : '';
  const evidence = card ? card.querySelector('.evidence-text')?.textContent : '';

  const content = `
    <h2>${escapeHtml(title)}</h2>
    <p class="modal-sub">Verified Milestone Record & Breakthrough Reflection</p>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-circle-info"></i> WHAT WAS ACCOMPLISHED</h4>
      <p>${escapeHtml(desc)}</p>
    </div>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-square-check"></i> MEASURABLE PROOF & EVIDENCE</h4>
      <p>${escapeHtml(evidence || 'Confirmed via git logs and platform evaluation benchmarks.')}</p>
    </div>

    <div class="modal-detail-section">
      <h4><i class="fa-solid fa-seedling"></i> PERSONAL SIGNIFICANCE</h4>
      <p>Milestones like this are not just trophies—they serve as tangible checkpoints that the cumulative hours of reading docs, refactoring failures, and analyzing edge cases are yielding real compounding returns.</p>
    </div>
  `;

  window.openStoryModal(content);
}

/* ==========================================================================
   8. BEFORE VS NOW INTERACTIVE TOGGLE & STEPPER
   ========================================================================== */
function initBeforeNowToggle() {
  const sideBySideBtn = document.getElementById('bvnSideBySideBtn');
  const flipBtn = document.getElementById('bvnFlipBtn');
  const sideBySideView = document.getElementById('bvnSideBySideView');
  const stepView = document.getElementById('bvnStepView');

  if (!sideBySideBtn || !flipBtn || !sideBySideView || !stepView) return;

  const data = window.BEFORE_NOW_DATA || [];
  let currentIndex = 0;

  function updateStepCard() {
    if (!data.length) return;
    const item = data[currentIndex];
    const dimTitle = document.getElementById('bvnStepDimTitle');
    const beforeText = document.getElementById('bvnStepBefore');
    const nowText = document.getElementById('bvnStepNow');
    const counter = document.getElementById('bvnStepCounter');

    if (dimTitle) dimTitle.textContent = item.dimension;
    if (beforeText) beforeText.textContent = item.before;
    if (nowText) nowText.textContent = item.now;
    if (counter) counter.textContent = `${currentIndex + 1} / ${data.length}`;
  }

  sideBySideBtn.addEventListener('click', () => {
    sideBySideBtn.classList.add('active');
    flipBtn.classList.remove('active');
    sideBySideView.style.display = 'grid';
    stepView.style.display = 'none';
  });

  flipBtn.addEventListener('click', () => {
    flipBtn.classList.add('active');
    sideBySideBtn.classList.remove('active');
    sideBySideView.style.display = 'none';
    stepView.style.display = 'block';
    updateStepCard();
  });

  const nextBtn = document.getElementById('bvnNextStepBtn');
  const prevBtn = document.getElementById('bvnPrevStepBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % data.length;
      updateStepCard();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + data.length) % data.length;
      updateStepCard();
    });
  }
}

/* ==========================================================================
   9. CHART.JS CHARTS INITIALIZATION (PROGRESS ANALYSIS)
   ========================================================================== */
function initCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart styling defaults for dark developer aesthetic
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', -apple-system, sans-serif";
  Chart.defaults.font.size = 12;

  const chartData = window.CHART_DATA;
  if (!chartData) return;

  // 1. Problems Chart (Cumulative trajectory - Area line chart)
  const problemsCtx = document.getElementById('problemsChart');
  if (problemsCtx && chartData.problems_solved_over_time) {
    const pData = chartData.problems_solved_over_time;
    new Chart(problemsCtx, {
      type: 'line',
      data: {
        labels: pData.labels,
        datasets: [{
          label: 'Problems Solved',
          data: pData.values,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#090d16',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            borderWidth: 1,
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            padding: 10,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#64748b' },
            beginAtZero: true
          }
        }
      }
    });
  }

  // 2. Projects Chart (Shipping velocity - Bar chart)
  const projectsCtx = document.getElementById('projectsChart');
  if (projectsCtx && chartData.projects_completed_per_quarter) {
    const projData = chartData.projects_completed_per_quarter;
    new Chart(projectsCtx, {
      type: 'bar',
      data: {
        labels: projData.labels,
        datasets: [{
          label: 'Projects Completed',
          data: projData.values,
          backgroundColor: 'rgba(6, 182, 212, 0.65)',
          hoverBackgroundColor: 'rgba(6, 182, 212, 0.9)',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: 'rgba(6, 182, 212, 0.3)',
            borderWidth: 1,
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            padding: 10,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { stepSize: 1, color: '#64748b' },
            beginAtZero: true
          }
        }
      }
    });
  }

  // 3. Activity Distribution (Donut Chart)
  const activityCtx = document.getElementById('activityChart');
  if (activityCtx && chartData.coding_activity_distribution) {
    const actData = chartData.coding_activity_distribution;
    new Chart(activityCtx, {
      type: 'doughnut',
      data: {
        labels: actData.labels,
        datasets: [{
          data: actData.values,
          backgroundColor: [
            '#10b981', // Building Systems
            '#06b6d4', // Algorithms
            '#6366f1', // Refactoring
            '#f59e0b', // Reading & Docs
            '#a855f7'  // Open Source
          ],
          borderColor: '#0e1422',
          borderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              padding: 12,
              color: '#94a3b8',
              font: { size: 11 }
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: (context) => ` ${context.label}: ${context.parsed}%`
            }
          }
        }
      }
    });
  }

  // 4. Technologies by Category (Horizontal Bar Chart)
  const techCtx = document.getElementById('techCategoryChart');
  if (techCtx && chartData.technologies_by_category) {
    const tData = chartData.technologies_by_category;
    new Chart(techCtx, {
      type: 'bar',
      data: {
        labels: tData.labels,
        datasets: [{
          label: 'Technologies & Tools Mastered',
          data: tData.values,
          backgroundColor: [
            'rgba(16, 185, 129, 0.75)',
            'rgba(6, 182, 212, 0.75)',
            'rgba(99, 102, 241, 0.75)',
            'rgba(245, 158, 11, 0.75)',
            'rgba(168, 85, 247, 0.75)'
          ],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            padding: 10,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { stepSize: 1, color: '#64748b' },
            beginAtZero: true
          },
          y: {
            grid: { display: false },
            ticks: { color: '#e2e8f0', font: { weight: '600' } }
          }
        }
      }
    });
  }
}

// Helper: Escape HTML to avoid injection
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}
